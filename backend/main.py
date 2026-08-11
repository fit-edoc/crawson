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
