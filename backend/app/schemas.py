from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional

class ScrapeRequest(BaseModel):
    url: HttpUrl
    fields: List[str] = Field(default=["title", "description", "images", "links"])
