from app.scraper.static_scraper import scrape_static
from app.scraper.dynamic_scraper import scrape_dynamic
from app.schemas import ScrapeResponse
import logging

logger = logging.getLogger(__name__)

async def perform_scraping(url: str, fields: list[str], deep_scrape: bool = False) -> ScrapeResponse:
    """
    Coordinates scraping by trying the static scraper first, 
    and falling back to the dynamic scraper if needed.
    """
    if deep_scrape:
        logger.info(f"Deep scrape requested for {url}, using dynamic scraper immediately")
        return await scrape_dynamic(url, fields)

    try:
        # Try static scraping first (fastest)
        logger.info(f"Attempting static scrape for {url}")
        return await scrape_static(url, fields)
    except Exception as e:
        # If static scraping fails (e.g., due to it being heavily JS-rendered or hitting a ValueError)
        logger.warning(f"Static scrape failed or indicated dynamic content for {url}: {e}")
        logger.info(f"Falling back to dynamic scrape for {url}")
        
        # Fallback to dynamic scraping (slower but handles JS)
        return await scrape_dynamic(url, fields)
