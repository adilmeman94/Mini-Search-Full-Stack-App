# Mini Search – Full-Stack App (Frontend + Backend)

A compact search UI + API that returns the **top 3 matches** from a local JSON dataset using a simple **keyword scoring** algorithm  
(case-insensitive term frequency with extra weight for title).

Includes loading/empty/error states on the frontend and a clean, modular **Express.js architecture** on the backend.

---

## Project Overview

- **Frontend:** React + TypeScript + React Query + Material UI
- **Backend:** Node.js + Express.js
- **Dataset:** Local `data/faqs.js` (no external DB or API)
- **Scoring:** Case-insensitive term frequency, title weighted ×2, plus small substring

---

## Setup Instructions

### Backend

- cd backend
- npm i
- npm run dev

### Frontend

- cd frontend
- npm i
- npm run dev

## API Endpoint

- API: /api/search (POST)

- URL: http://localhost:4000/api/search
- Body: { "query": "string" }

Responses:
- 200 OK: results , summary, sources
- 404 Error: { "results": [], "message": "No matches found." } when nothing matches
- 400 Bad Request: { "message": "Query must not be empty." }

## Assumptions & Notes

- No external DB/APIs — dataset is bundled in the backend (data/faqs.js).
- Keyword Scoring is intentionally simple.
- CORS is permissive for local dev; restrict in production.
- Security: helmet enabled.
