from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional

class ScrapeRequest(BaseModel):
    url: HttpUrl
    fields: List[str] = Field(default=["title", "description", "images", "links"])
    deep_scrape: bool = False
    
class ScrapeResponse(BaseModel):
    url: str
    title: Optional[str] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None
    links: Optional[List[str]] = None
    method_used: str = "static" # Will be either 'static' or 'dynamic'

class DownloadZipRequest(BaseModel):
    images: List[str]
