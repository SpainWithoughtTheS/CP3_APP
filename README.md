# CampusConnect

CampusConnect is a production-ready, full-stack school companion platform with Supabase authentication and protected routing.

## Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database/Auth:** Supabase (PostgreSQL + Auth)
- **UI:** Mobile-first, responsive card system, dark/light theme

## What this version includes

- Supabase email/password authentication (sign in + sign up)
- Session persistence and auto-login on refresh
- Dedicated `/login` page with Sign In / Sign Up tabs
- Protected routes for all app pages (`/dashboard`, `/restrooms`, `/clubs`, `/news`, `/map`, `/forum`, `/admin`)
- Redirect guards:
  - Unauthenticated users only see auth page
  - Authenticated users are redirected to dashboard
- Logout action in top navigation
- Express JWT verification middleware for all `/api/*` routes
- Request user identity attached server-side after token verification

## Project structure

```text
.
├── backend
│   ├── src
│   │   ├── config/env.ts
│   │   ├── middleware/auth.ts
│   │   ├── routes/index.ts
│   │   ├── services
│   │   │   ├── data.ts
│   │   │   └── supabase.ts
│   │   ├── types/express.d.ts
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
│   │   │   ├── auth
│   │   │   │   ├── AuthGate.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Layout.tsx
│   │   ├── context
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/useAuth.ts
│   │   ├── lib
│   │   │   ├── api.ts
│   │   │   └── supabase.ts
│   │   ├── pages
│   │   │   ├── LoginPage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── RestroomsPage.tsx
│   │   │   ├── ClubsPage.tsx
│   │   │   ├── NewsPage.tsx
│   │   │   ├── MapPage.tsx
│   │   │   ├── ForumPage.tsx
│   │   │   └── AdminPage.tsx
│   │   ├── styles/global.css
│   │   ├── types/index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── package.json
```

## Environment variables

### `frontend/.env`

```bash
VITE_API_URL=http://localhost:4000/api
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### `backend/.env`

```bash
PORT=4000
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

## Auth flow (frontend)

- `AuthContext` initializes session via `supabase.auth.getSession()`.
- Listens to `onAuthStateChange` for session changes.
- Supports `signIn`, `signUp`, and `signOut`.
- `ProtectedRoute` blocks unauthenticated access.
- `AuthGate` prevents authenticated users from revisiting `/login`.

## Auth flow (backend)

- All `/api` routes are protected with `requireAuth` middleware.
- Middleware reads `Authorization: Bearer <token>`.
- Verifies token by calling `supabase.auth.getUser(token)`.
- Rejects invalid/missing tokens with `401`.
- Attaches validated user object to `request.user`.

## API routes

Base URL: `http://localhost:4000/api`

- `GET /health` (authenticated)
- `GET /dashboard`
- `POST /restrooms/ratings`
- `GET /safety-guides`
- `GET /map/locations`
- `GET /forum/threads`
- `GET /admin/analytics`

## Supabase DB setup

1. Create a Supabase project.
2. Run SQL files in Supabase SQL editor:
   - `backend/supabase/schema.sql`
   - `backend/supabase/seed.sql`
3. Configure env files in frontend and backend.
4. In Supabase Auth settings, enable email/password sign-in.

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
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Build

```bash
npm run build
```

## Production hardening suggestions

- Add email verification + password reset flows.
- Implement role-based authorization checks for `/admin/*` APIs.
- Move in-memory backend data service to Supabase queries.
- Add request logging, rate limiting, and security headers policy tuning.
- Add end-to-end tests for auth redirects and token-expiry behavior.
