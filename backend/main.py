import sys
import asyncio

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import ScrapeRequest, ScrapeResponse, DownloadZipRequest
from app.services.scraper_service import perform_scraping
import ipaddress
import socket
import urllib.parse
import httpx
import io
import zipfile
import ipaddress
import socket
import urllib.parse

app = FastAPI(title="Web Crawler API", version="1.0.0")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this to the frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_private_ip(ip_str: str) -> bool:
    try:
        ip = ipaddress.ip_address(ip_str)
        return ip.is_private or ip.is_loopback or ip.is_link_local
    except ValueError:
        return False

def check_ssrf(url_str: str):
    """
    Prevents SSRF by checking if the hostname resolves to a private IP.
    """
    parsed = urllib.parse.urlparse(url_str)
    hostname = parsed.hostname
    if not hostname:
        raise HTTPException(status_code=400, detail="Invalid URL format")
        
    try:
        # Resolve hostname to IP
        ip = socket.gethostbyname(hostname)
        if is_private_ip(ip):
            raise HTTPException(status_code=403, detail="Scraping private IPs or localhost is forbidden.")
    except socket.gaierror:
        # Cannot resolve hostname, let the scraper handle the error later or block it
        pass

@app.post("/scrape", response_model=ScrapeResponse)
async def scrape_endpoint(request: ScrapeRequest):
    url_str = str(request.url)
    
    # 1. SSRF Protection
    check_ssrf(url_str)
    
    # 2. Redis Caching (Placeholder for simple caching logic)
    # In a production app, we would hash(url+fields) and check redis here
    
    # 3. Perform Scraping
    try:
        result = await perform_scraping(url_str, request.fields, request.deep_scrape)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download-image")
async def download_image(url: str = Query(..., description="URL of the image to download")):
    # Security: Ensure it's an HTTP/HTTPS URL
    if not url.startswith(("http://", "https://")):
        raise HTTPException(status_code=400, detail="Invalid image URL")
        
    try:
        # Fetch the image
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
            headers = {"User-Agent": "Mozilla/5.0"}
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            
            # Determine content type and filename
            content_type = response.headers.get("content-type", "application/octet-stream")
            filename = url.split("/")[-1] or "image.jpg"
            # In case filename has query parameters, strip them
            filename = filename.split("?")[0]
            
            return StreamingResponse(
                io.BytesIO(response.content), 
                media_type=content_type,
                headers={"Content-Disposition": f'attachment; filename="{filename}"'}
            )
