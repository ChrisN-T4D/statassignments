# Deploying Methods Market on Railway

Stack: **Vue frontend** + **FastAPI backend** + **Railway Postgres** (no PocketBase).

| Service | Purpose | Config file |
|---------|---------|-------------|
| **Postgres** | Database (Railway plugin) | — add from Railway dashboard |
| **backend** | API, auth, BKT, all data | `/backend/railway.toml` |
| **frontend** | Vue static site | `/frontend/railway.toml` |

## 1. Create the Railway project

1. [Create a new Railway project](https://railway.com/new) and connect `ChrisN-T4D/statassignments`.
2. Add **Postgres** from the Railway template/plugin.
3. Add **backend** and **frontend** services (or repurpose existing services).
4. Set config-as-code paths:
   - Backend: `/backend/railway.toml`
   - Frontend: `/frontend/railway.toml`
5. Leave **Root Directory** as `/` for backend and frontend.

## 2. Postgres

1. Add the **Postgres** plugin to the project.
2. On the **backend** service, add a variable reference:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```
3. Postgres persists data in its volume automatically.

## 3. Backend service

### Required environment variables

| Variable | Example | Notes |
|----------|---------|-------|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | Reference from Postgres plugin |
| `JWT_SECRET` | *(random 32+ char string)* | Required in production |
| `CORS_ORIGINS` | `https://frontend-xxxx.up.railway.app,http://localhost:5173` | Frontend URL(s) |
| `BKT_ENGINE` | `neural` | Optional |
| `ADMIN_EMAIL` | `admin@yourdomain.com` | First admin (seeded once) |
| `ADMIN_PASSWORD` | *(strong password)* | First admin (seeded once) |
| `RUN_DB_SEED` | `1` | Set `0` after first deploy to skip re-seed |

Migrations run automatically on backend startup (`alembic upgrade head`).

Generate a **public domain** for the API.

Health check: `GET /health` (includes `database: connected`).

## 4. Frontend service

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `https://backend-xxxx.up.railway.app` |
| `VITE_FASTAPI_URL` | same as `VITE_API_URL` (BKT uses this) |

Generate a **public domain** for the frontend.

Redeploy frontend after changing `VITE_*` vars (build-time).

## 5. Deploy order

1. **Postgres** — provision plugin
2. **Backend** — set `DATABASE_URL`, `JWT_SECRET`, `ADMIN_*`, deploy
3. **Frontend** — set `VITE_API_URL`, deploy
4. Update backend `CORS_ORIGINS` with frontend URL if needed

## 6. Migrate from PocketBase (existing data)

If you have live data on PocketBase (`https://pb.c.robpneu.com` or similar):

1. Add Postgres and deploy backend with `RUN_DB_SEED=0` (skip empty seed).
2. Run migration locally or via Railway one-off shell:

```bash
DATABASE_URL=<railway-postgres-url> \
POCKETBASE_URL=https://pb.c.robpneu.com \
PB_ADMIN_EMAIL=<admin-email> \
PB_ADMIN_PASSWORD=<admin-password> \
python backend/scripts/migrate_from_pocketbase.py
```

3. Set `JWT_SECRET` on backend (users get new JWTs; password hashes are preserved).
4. Redeploy frontend with `VITE_API_URL` pointing at backend only.
5. Remove the old PocketBase Railway service when verified.

See [POSTGRES.md](POSTGRES.md) for `DRY_RUN` and JSON export options.

## 7. Default admin (fresh install only)

On first boot with `RUN_DB_SEED=1`, the backend seeds:

- Default classes, semesters, modules, items (from `scripts/seed-data/seed-data.json`)
- Admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD`

Sign in at `/auth` with those credentials, or register a new student account.

## Local development

```bash
docker compose up -d          # Postgres + backend
npm install && npm run dev    # frontend at :5173
```

API: http://localhost:8000  
Admin login: `admin@methodsmarket.local` / `changeme123` (from docker-compose)

## Retiring PocketBase

If migrating from an existing PocketBase deployment:

1. Export data from PocketBase admin (JSON per collection)
2. Import via API or extend `backend/scripts/seed.py`
3. Remove the `pocketbase` Railway service
4. Point frontend `VITE_API_URL` at the backend only

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `database: unavailable` in `/health` | Check `DATABASE_URL` reference to Postgres |
| Auth fails | Verify `JWT_SECRET` is set and consistent across deploys |
| CORS errors | Add frontend URL to `CORS_ORIGINS`, redeploy backend |
| Empty classes list | Set `RUN_DB_SEED=1` and redeploy, or run seed manually |
| Stale API URL in frontend | Rebuild frontend after changing `VITE_API_URL` |
