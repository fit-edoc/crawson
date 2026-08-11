import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from app.schemas import ScrapeResponse

async def scrape_static(url: str, fields: list[str]) -> ScrapeResponse:
    """
    Scrapes a webpage statically using httpx and BeautifulSoup.
    """
    async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
        # Define headers to mimic a real browser and avoid some basic blocks
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        response = await client.get(url, headers=headers)
        response.raise_for_status()
        
        html_content = response.text
        soup = BeautifulSoup(html_content, "html.parser")
        
        # Check if page is mostly empty or highly dynamic (heuristic)
