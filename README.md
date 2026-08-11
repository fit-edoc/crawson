# Arachne Web Extractor 🕷️

A production-ready full-stack web scraping application with a Python FastAPI backend and a Next.js (App Router) frontend. It dynamically switches between static scraping (fast, using BeautifulSoup) and dynamic scraping (Playwright) depending on the target website's content.

## 🚀 Setup & Local Development

### 1. Backend Setup

The backend handles the scraping engine.

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn pydantic redis httpx beautifulsoup4 playwright

# Install Playwright browser binaries (Required for JS-heavy sites)
playwright install

# Run the FastAPI server (starts on http://127.0.0.1:8000)
