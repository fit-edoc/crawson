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
        # If the body is very small but there are scripts, it might be a JS SPA
        body = soup.find('body')
        if not body or len(body.get_text(strip=True)) < 50:
            # Indicate that it might need dynamic scraping
            raise ValueError("Page appears to be dynamically rendered (JS-heavy).")
            
        result = ScrapeResponse(url=url, method_used="static")
        
        if "title" in fields:
            title_tag = soup.find('title')
            result.title = title_tag.string.strip() if title_tag and title_tag.string else None
            
        if "description" in fields:
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if not meta_desc:
                meta_desc = soup.find('meta', attrs={'property': 'og:description'})
            result.description = meta_desc['content'].strip() if meta_desc and meta_desc.get('content') else None
            
        if "images" in fields:
            img_tags = soup.find_all('img')
            images = set()
            for img in img_tags:
                src = img.get('src')
                if src:
                    # Convert relative URL to absolute URL
                    abs_url = urljoin(url, src)
                    if abs_url.startswith(('http://', 'https://')):
                        images.add(abs_url)
            result.images = list(images)
            
        if "links" in fields:
            a_tags = soup.find_all('a', href=True)
            links = set()
            for a in a_tags:
                href = a.get('href')
                if href and not href.startswith(('#', 'javascript:', 'mailto:')):
                    abs_url = urljoin(url, href)
                    if abs_url.startswith(('http://', 'https://')):
                        links.add(abs_url)
            result.links = list(links)
            
        return result
