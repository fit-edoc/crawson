import asyncio
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
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
            # Wait for domcontentloaded instead of networkidle to avoid timeouts on sites with continuous polling
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=30000)
            except PlaywrightTimeoutError:
                print(f"Warning: Timeout exceeded while loading {url}, continuing with scraped content.")
            
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
                            clearInterval(timer);
                            resolve();
                        }
                    }, 150);
                });
            }''')
            # Wait a bit after scrolling for images to load
            page.wait_for_timeout(2000)
            
            result = ScrapeResponse(url=url, method_used="dynamic")
            
            if "title" in fields:
                result.title = page.title()
                
            if "description" in fields:
                desc = page.evaluate('''() => {
                    const meta = document.querySelector('meta[name="description"]') || 
                                 document.querySelector('meta[property="og:description"]');
                    return meta ? meta.content : null;
                }''')
                result.description = desc.strip() if desc else None
                
            if "images" in fields:
                images = page.evaluate('''() => {
                    const imgTags = Array.from(document.querySelectorAll('img'));
                    return imgTags.map(img => img.src).filter(src => src);
                }''')
                
                # Format and remove duplicates
                img_set = set()
                for src in images:
                    abs_url = urljoin(url, src)
                    if abs_url.startswith(('http://', 'https://')):
                        img_set.add(abs_url)
                result.images = list(img_set)
                
            if "links" in fields:
                links = page.evaluate('''() => {
                    const aTags = Array.from(document.querySelectorAll('a[href]'));
                    return aTags.map(a => a.href);
                }''')
                
                # Format and remove duplicates
                link_set = set()
                for href in links:
                    if href and not href.startswith(('javascript:', 'mailto:', '#')):
                        abs_url = urljoin(url, href)
                        if abs_url.startswith(('http://', 'https://')):
                            link_set.add(abs_url)
                result.links = list(link_set)
                
            return result
        finally:
            browser.close()

async def scrape_dynamic(url: str, fields: list[str]) -> ScrapeResponse:
    """
    Scrapes a webpage dynamically using Playwright by offloading the sync work to a separate thread.
    This bypasses asyncio event loop subprocess compatibility issues on Windows.
    """
    return await asyncio.to_thread(_do_sync_scrape, url, fields)
