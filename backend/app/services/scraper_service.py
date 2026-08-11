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
