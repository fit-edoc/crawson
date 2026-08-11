#!/usr/bin/env bash
# exit on error
set -o errexit

export PLAYWRIGHT_BROWSERS_PATH=0
pip install -r requirements.txt

# Install Playwright browser and its dependencies
playwright install chromium
playwright install-deps
