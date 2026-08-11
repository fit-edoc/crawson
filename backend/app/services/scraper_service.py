from app.scraper.static_scraper import scrape_static
from app.scraper.dynamic_scraper import scrape_dynamic
from app.schemas import ScrapeResponse
import logging

logger = logging.getLogger(__name__)

async def perform_scraping(url: str, fields: list[str], deep_scrape: bool = False) -> ScrapeResponse:
    """
