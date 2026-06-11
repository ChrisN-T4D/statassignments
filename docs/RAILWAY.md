# Deploying Methods Market on Railway

This app runs as **three Railway services** from the same repository:

| Service | Purpose | Config file |
|---------|---------|-------------|
| **pocketbase** | Database + auth API | `/pocketbase/railway.toml` |
| **backend** | Neural BKT FastAPI API | `/backend/railway.toml` |
| **frontend** | Vue static site | `/frontend/railway.toml` |

## 1. Create the Railway project

1. [Create a new Railway project](https://railway.com/new) and connect this GitHub repo.
2. Add **three empty services** (or duplicate the repo link three times).
3. For each service, open **Settings → Config-as-code** and set the config file path:
   - PocketBase: `/pocketbase/railway.toml`
   - Backend: `/backend/railway.toml`
   - Frontend: `/frontend/railway.toml`
4. Leave **Root Directory** as `/` (repo root) for all three services so Docker can access shared files (`pb_migrations`, `src`, etc.).

## 2. PocketBase service

### Volume (required)

PocketBase stores data in `/pb_data`. Without a volume, data is lost on every deploy.

1. Open the PocketBase service → **Volumes**.
2. Add a volume mounted at `/pb_data`.

### Networking

1. Generate a **public domain** (e.g. `pocketbase-production-xxxx.up.railway.app`).
2. On first deploy, visit `https://<your-pocketbase-domain>/_/` and create the admin account.
3. Migrations in `pb_migrations/` run automatically on startup.

### PocketBase CORS

In the PocketBase admin UI (**Settings → Application**), add your frontend URL to allowed origins once the frontend is deployed.

## 3. Backend (FastAPI) service

### Environment variables

| Variable | Example | Notes |
|----------|---------|-------|
| `CORS_ORIGINS` | `https://frontend-xxxx.up.railway.app,http://localhost:5173` | Comma-separated browser origins |
| `BKT_ENGINE` | `neural` | Optional; `neural` or `tabular` |
| `POCKETBASE_URL` | `https://pocketbase-xxxx.up.railway.app` | If backend needs PocketBase later |

### Networking

Generate a **public domain** for the API (e.g. `backend-production-xxxx.up.railway.app`).

Health check: `GET /health`

## 4. Frontend service

### Environment variables (build-time)

Vite bakes these into the bundle at **build** time. Set them on the frontend service **before** the first deploy (or redeploy after changing them):

| Variable | Example |
|----------|---------|
| `VITE_POCKETBASE_URL` | `https://pocketbase-xxxx.up.railway.app` |
| `VITE_FASTAPI_URL` | `https://backend-xxxx.up.railway.app` |
| `VITE_METRICS_API_URL` | *(optional)* |

### Networking

Generate a **public domain** for the frontend. This is the URL students and instructors use.

After deploy, add this URL to:

- Backend `CORS_ORIGINS`
- PocketBase allowed origins (admin UI)

## 5. Import seed data

After PocketBase is running and the admin account exists:

```bash
export PB_ADMIN_EMAIL="your-admin@email.com"
export PB_ADMIN_PASSWORD="your-password"
export VITE_POCKETBASE_URL="https://pocketbase-xxxx.up.railway.app"

node scripts/import/import-seed-data.js
```

Or import manually via the PocketBase admin UI (see [README-FULL.md](README-FULL.md)).

## 6. Deploy order

1. **PocketBase** — attach volume, deploy, create admin
2. **Backend** — set `CORS_ORIGINS` (can include localhost for local dev)
3. **Frontend** — set `VITE_*` URLs pointing at PocketBase and backend, deploy
4. Update **CORS** on backend and PocketBase with the final frontend URL
5. Import seed data

## Local Docker (optional)

For local full-stack testing before Railway:

```bash
docker compose up -d
```

This starts PocketBase on `:8090` and FastAPI on `:8000`. Run `npm run dev` separately for the Vue frontend.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Frontend can't reach PocketBase | Check `VITE_POCKETBASE_URL` and redeploy frontend; verify PocketBase CORS |
| BKT API CORS errors | Add frontend URL to backend `CORS_ORIGINS` and redeploy backend |
| PocketBase data lost | Attach a volume at `/pb_data` |
| Health check failing | Confirm public domain is generated; check service logs |
| Stale frontend API URLs | `VITE_*` vars require a **rebuild** — trigger a new frontend deploy after changing them |
