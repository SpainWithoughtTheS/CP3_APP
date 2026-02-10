# CampusConnect

CampusConnect is a production-oriented, full-stack school companion platform built to improve student communication, campus transparency, and day-to-day navigation.

## Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database:** Supabase (PostgreSQL)
- **Auth:** School email gate (header-based demo flow; ready to swap to Supabase Auth / Google OAuth)
- **UI:** Mobile-first, responsive cards, dark/light mode

## Core capabilities implemented

1. Restroom status and student issue reporting (including optional photo URL)
2. Clubs discovery and follow controls
3. Campus news feed (announcements/events/alerts)
4. Drill and emergency instruction endpoint (offline-cache friendly response shape)
5. Interactive map location API + searchable UI scaffold
6. Courses & academics section in dashboard
7. Student guide tips section
8. Moderated forum feed scaffold with reporting language
9. Bell schedule and A/B-day display on home dashboard
10. Admin dashboard section + analytics endpoint

## Project structure

```text
.
├── backend
│   ├── src
│   │   ├── config/env.ts
│   │   ├── middleware/auth.ts
│   │   ├── routes/index.ts
│   │   ├── services/data.ts
│   │   ├── services/supabase.ts
│   │   └── server.ts
│   ├── supabase
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── lib
│   │   ├── pages
│   │   ├── styles
│   │   ├── types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── package.json
```

## API routes

Base URL: `http://localhost:4000/api`

- `GET /health` - API health
- `GET /dashboard` - bundled home data (`restrooms`, `clubs`, `news`)
- `POST /restrooms/ratings` - submit restroom report (**requires** `x-student-email: <name@school.edu>`)
- `GET /safety-guides` - drill instructions
- `GET /map/locations` - map points
- `GET /forum/threads` - forum thread list
- `GET /admin/analytics` - moderation/admin metrics

## Supabase setup

1. Create a new Supabase project.
2. In Supabase SQL editor, run:
   - `backend/supabase/schema.sql`
   - `backend/supabase/seed.sql`
3. Copy `backend/.env.example` to `backend/.env` and fill credentials.

## Local development

```bash
npm install
npm run dev
```

This runs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Build

```bash
npm run build
```

## Example restroom report request

```bash
curl -X POST http://localhost:4000/api/restrooms/ratings \
  -H 'Content-Type: application/json' \
  -H 'x-student-email: alex@campus.edu' \
  -d '{
    "building":"Science Hall",
    "floor":"2",
    "cleanliness":3,
    "smell":2,
    "supplies":4,
    "maintenance":2,
    "status":"Okay",
    "comment":"Needs soap refill by lunch."
  }'
```

## Scaling notes

- Replace mock header auth with Supabase Auth + Google OAuth / SSO.
- Move in-memory service data to Supabase repositories.
- Add Redis caching for high-read endpoints (`/dashboard`, `/map/locations`).
- Add background jobs for moderation, profanity checks, and image scanning.
- Add CI with lint, typecheck, tests, and migration checks.
