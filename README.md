# Global News Hub — Real Live News Website

This project converts the static news demo into a working live news aggregator.

## Requirements
- Node.js 18+
- A GNews API key

## Run

1. Open a terminal in this folder.
2. Install packages:

   npm install

3. Set your API key.

Linux/macOS:
   export GNEWS_API_KEY="YOUR_KEY"

Windows PowerShell:
   $env:GNEWS_API_KEY="YOUR_KEY"

Or copy `.env.example` to `.env` and load it with your preferred environment-variable tool.

4. Start:

   npm start

5. Open:

   http://localhost:3000

## Important
The browser never receives the API key. News is requested by the backend and returned to the frontend.

The site links users to the original publisher instead of pretending the aggregated story is original reporting.

## Production
Deploy the Node server to Render, Railway, Fly.io, a VPS, or another Node hosting service. Add GNEWS_API_KEY as a server-side environment variable.

For a larger production site, add Redis/SQLite caching, rate limiting, article deduplication, source-specific RSS feeds, analytics, authentication and a CMS/editorial workflow.
