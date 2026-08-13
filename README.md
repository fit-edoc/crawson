# Crawson Web Extractor

A production-ready full-stack web scraping application with a Python FastAPI backend and a Next.js (App Router) frontend. It dynamically switches between static scraping (fast, using BeautifulSoup) and dynamic scraping (Playwright) depending on the target website's content.

## Setup & Local Development

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

## Architecture

- **Smart Scraper:** The backend first attempts a fast static scrape using `httpx` and `BeautifulSoup4`. If the page is mostly empty or lacks content (typical of a client-side rendered app), it seamlessly falls back to spinning up a headless Chromium browser via `Playwright` to render the JavaScript and extract the DOM.
- **SSRF Protection:** The `/scrape` endpoint blocks requests to private IP addresses (e.g., localhost) to prevent Server-Side Request Forgery attacks.
- **Premium UI:** Uses Tailwind CSS, modern glassmorphism panels, React Query for efficient fetching, and a split-view JSON/Visual renderer.

---

## Deployment Instructions

### Deploying the Backend (Render / Railway)
1. Ensure `backend/requirements.txt` is updated (`pip freeze > requirements.txt`).
2. You will need to use a Dockerfile to deploy Playwright properly since it requires system dependencies (fonts, libraries). 
3. **Dockerfile Example:**
```dockerfile
FROM mcr.microsoft.com/playwright/python:v1.40.0-jammy
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```
4. Deploy the Dockerfile to Railway or Render.

### Deploying the Frontend (Vercel)
1. Push the repository to GitHub.
2. Go to Vercel and import the project.
3. Set the **Root Directory** to `frontend`.
4. Add an environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend URL. *(Note: Update the axios post request in `page.tsx` to use this environment variable instead of `127.0.0.1:8000`)*.
5. Deploy!
