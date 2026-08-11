import asyncio
from playwright.sync_api import sync_playwright
from urllib.parse import urljoin
from app.schemas import ScrapeResponse

def _do_sync_scrape(url: str, fields: list[str]) -> ScrapeResponse:
    """
    Synchronous scraping logic using Playwright, intended to be run in a separate thread.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        try:
            # Wait for network idle to ensure JS has mostly finished executing
            page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Auto-scroll to trigger lazy-loaded images (like on bikedekho)
            page.evaluate('''() => {
                return new Promise((resolve) => {
                    let totalHeight = 0;
                    const distance = 200;
                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight || totalHeight > 15000) {
