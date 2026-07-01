# IM-Telligence Academy

A React + Vite site for IM-Telligence Academy (coding · robotics · AI for ages 4–15),
with a **3D robot** homepage hero and a **Postgres-backed admin dashboard** for managing content.

## Architecture

Two independently deployed halves:

- **Frontend** — React 19 + Vite + Tailwind + `@react-three/fiber`/`drei` (the 3D robot). Static build, hosted on **Vercel**.
- **Backend** — Express API (`pg`), hosted on **Render**, connected to a **Vercel Postgres (Neon)** database.
- **Admin** — `/admin` route, shared-password gate, CRUD for Events, Testimonials and Partner Schools, plus image uploads.

The frontend talks to the backend via `VITE_API_URL`; the backend talks to Neon via `DATABASE_URL`.

## Running locally

You need a Postgres connection string (use your Neon one — it works from anywhere).

```bash
npm install
cp .env.example .env        # then fill in DATABASE_URL and ADMIN_PASSWORD
npm run start               # API on :4000  +  Vite dev server on :5173
```

Open:

- Website → http://localhost:5173
- Admin dashboard → http://localhost:5173/admin

Locally, leave `VITE_API_URL` and `PUBLIC_URL` blank — Vite proxies `/api` and `/uploads` to the
backend on port 4000. Run the halves separately with `npm run server` and `npm run dev`.

## Environment variables

| Var | Side | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | backend | Neon / Vercel Postgres connection string |
| `ADMIN_PASSWORD` | backend | Password for `/admin` (default `imtelligence2025`) |
| `PUBLIC_URL` | backend | This backend's own origin, used to build absolute image URLs (e.g. `https://imt-api.onrender.com`) |
| `CORS_ORIGIN` | backend | Allowed frontend origin(s), comma-separated. Blank = allow all |
| `UPLOADS_DIR` | backend | Where uploads are written (point at a Render disk in prod) |
| `VITE_API_URL` | frontend | Backend origin the site calls. Blank locally (uses the Vite proxy) |

See [.env.example](.env.example).

## Content model

| Table | Where it shows |
| --- | --- |
| `events` (`category`, `featured`) | Previous Events, Workshops, Primary/Secondary Activities, Academy age pages, and Home "Featured" (when `featured` is true) |
| `testimonials` | Home "What People Say" |
| `partner_schools` | Partner Schools page |

On first boot the backend creates these tables and seeds them with the starter content.
Seed images live in `public/seed/` (served by the frontend). Admin uploads are stored on the
backend and served at `/uploads/...`.

## Deployment

### 1. Database — Vercel Postgres (Neon)
1. Vercel dashboard → **Storage → Create Database → Postgres**.
2. Copy the connection string (the pooled `...-pooler...` one). This is your `DATABASE_URL`.

### 2. Backend — Render
1. Push this repo to GitHub.
2. Render → **New → Blueprint** (uses [render.yaml](render.yaml)) or **New → Web Service** with:
   - Build: `npm install` · Start: `node server/index.js`
3. Set env vars: `DATABASE_URL` (from step 1), `ADMIN_PASSWORD`, `CORS_ORIGIN` (your Vercel URL),
   `PUBLIC_URL` (this service's own URL, e.g. `https://imt-api.onrender.com`), `NODE_VERSION=22`.
4. Deploy. The backend auto-creates + seeds the tables on first boot. Health check: `/api/health`.

> Uploaded images use the backend's local disk, which is **ephemeral on Render's free plan**
> (DB content in Neon always persists). For permanent uploads, use a paid instance with a disk —
> see the commented block in `render.yaml` and set `UPLOADS_DIR`.

### 3. Frontend — Vercel
1. Vercel → **New Project** → import the repo (uses [vercel.json](vercel.json): build `npm run build`, output `dist`).
2. Set env var `VITE_API_URL` = your Render backend URL (e.g. `https://imt-api.onrender.com`).
3. Deploy. Then make sure the backend's `CORS_ORIGIN` includes the resulting Vercel domain.
