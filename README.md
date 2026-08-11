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
# Note: Do not use --reload on Windows when using Playwright, as it breaks the async event loop.
uvicorn main:app
```

### 2. Frontend Setup

The frontend provides a stunning, glassmorphism UI for visualizing the JSON data.

```bash
cd frontend

# Install dependencies
npm install

# Run the Next.js development server (starts on http://localhost:3000)
npm run dev
```

### 3. Usage

1. Open `http://localhost:3000` in your browser.
2. Enter a URL you want to scrape (e.g., `https://example.com` or a JS-heavy React SPA).
3. Select the fields you want to extract (Title, Description, Images, Links).
4. Click **Extract Data** and view the beautiful visual representation alongside the raw JSON output.

---

## 🛠️ Architecture

