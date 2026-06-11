# PostgreSQL Backend

Methods Market uses **FastAPI + PostgreSQL** instead of PocketBase.

## Architecture

```
Vue frontend  →  FastAPI /api/collections/*  →  PostgreSQL
              →  FastAPI /bkt/*             →  in-memory BKT model
```

The frontend still imports `pb` from `src/lib/pocketbase.js`, which is now a **compatibility shim** over the REST API.

## Schema

- Alembic migration: `backend/alembic/versions/001_initial_schema.py`
- Models: `backend/db/models.py`
- Legacy PocketBase field docs: `docs/pocketbase-schema.md` (reference only)

## Auth

- `POST /api/collections/users/auth-with-password`
- `POST /api/collections/users/auth-refresh`
- `POST /api/collections/users/records` (signup)
- JWT stored in `localStorage` (`pb_auth_token`)

## Permissions

Enforced in `backend/db/permissions.py` (replaces PocketBase API rules).

## Seed data

```bash
cd backend
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/methods_market \
  python -m alembic upgrade head
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=secret python scripts/seed.py
```

Or set `RUN_DB_SEED=1` on backend startup (docker-compose / Railway).

## Local dev

```bash
docker compose up -d
npm run dev
```

## Migrate from live PocketBase

If your data is still on a PocketBase server (e.g. `https://pb.c.robpneu.com`):

```bash
cd backend
DATABASE_URL=postgresql://... \
POCKETBASE_URL=https://pb.c.robpneu.com \
PB_ADMIN_EMAIL=your-admin@email.com \
PB_ADMIN_PASSWORD=your-password \
python scripts/migrate_from_pocketbase.py
```

This will:

1. Run `alembic upgrade head`
2. Fetch all collections from PocketBase (preserving record IDs)
3. Copy user password hashes so existing logins still work
4. Truncate and repopulate Postgres tables in dependency order

Options:

- `DRY_RUN=1` — fetch only, no writes
- `PB_EXPORT_JSON=./export.json` — import from a JSON file instead of live API

After migration, set `RUN_DB_SEED=0` on Railway so startup does not overwrite data.

## Railway

See [RAILWAY.md](RAILWAY.md). Add Postgres plugin, wire `DATABASE_URL` to backend, remove PocketBase service.
