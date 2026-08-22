"""Logical backup of Postgres before alembic / backend upgrades.

Writes a timestamped directory of JSON table dumps (+ manifest) so roster,
users, attempts, and other live data can be restored if a migrate goes wrong.

Usage (local, against Railway public URL):

  DATABASE_URL="postgresql://..." python backend/scripts/backup_postgres.py

Or with an explicit output root:

  DATABASE_URL="..." python backend/scripts/backup_postgres.py --out backups/postgres

Environment:
  DATABASE_URL / DATABASE_PUBLIC_URL — connection string (required)
  BACKUP_DIR — default output root when --out omitted (default: backups/postgres)
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path
from uuid import UUID

BACKEND_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = BACKEND_ROOT.parent
sys.path.insert(0, str(BACKEND_ROOT))

from sqlalchemy import create_engine, inspect, text  # noqa: E402


def _json_default(value):
    if isinstance(value, datetime):
        return value.isoformat() + ("Z" if value.tzinfo is None else "")
    if isinstance(value, date):
        return value.isoformat()
    if isinstance(value, UUID):
        return str(value)
    if isinstance(value, Decimal):
        return float(value)
    if isinstance(value, (bytes, bytearray)):
        return value.hex()
    return str(value)


def _normalize_url(url: str) -> str:
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql://", 1)
    return url


def backup_database(database_url: str, out_root: Path) -> Path:
    url = _normalize_url(database_url.strip())
    if not url:
        raise SystemExit("DATABASE_URL is required")

    stamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    out_dir = out_root / f"methods-market-{stamp}"
    out_dir.mkdir(parents=True, exist_ok=True)

    engine = create_engine(url, pool_pre_ping=True)
    table_counts: dict[str, int] = {}

    with engine.connect() as conn:
        insp = inspect(conn)
        tables = sorted(insp.get_table_names())
        if not tables:
            raise RuntimeError("No tables found — refusing empty backup")

        for table in tables:
            rows = conn.execute(text(f'SELECT * FROM "{table}"')).mappings().all()
            payload = [dict(row) for row in rows]
            (out_dir / f"{table}.json").write_text(
                json.dumps(payload, indent=2, default=_json_default),
                encoding="utf-8",
            )
            table_counts[table] = len(payload)

        # Alembic revision (if present)
        alembic_rev = None
        if "alembic_version" in table_counts:
            rev_rows = conn.execute(text("SELECT version_num FROM alembic_version")).fetchall()
            alembic_rev = [r[0] for r in rev_rows]

    manifest = {
        "created_utc": datetime.utcnow().isoformat() + "Z",
        "alembic_version": alembic_rev,
        "tables": table_counts,
        "total_rows": sum(table_counts.values()),
        "format": "per-table-json-v1",
        "note": "Logical backup for Methods Market. Restore by loading JSON into matching tables.",
    }
    (out_dir / "manifest.json").write_text(
        json.dumps(manifest, indent=2),
        encoding="utf-8",
    )

    print(
        f"Backup complete: {out_dir} "
        f"({len(tables)} tables, {manifest['total_rows']} rows, alembic={alembic_rev})",
        flush=True,
    )
    return out_dir


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Backup Methods Market Postgres")
    parser.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Output root directory (default: BACKUP_DIR or backups/postgres)",
    )
    args = parser.parse_args(argv)

    database_url = (
        os.environ.get("DATABASE_URL")
        or os.environ.get("DATABASE_PUBLIC_URL")
        or ""
    )
    out_root = args.out
    if out_root is None:
        env_dir = os.environ.get("BACKUP_DIR", "").strip()
        out_root = Path(env_dir) if env_dir else (REPO_ROOT / "backups" / "postgres")

    backup_database(database_url, out_root)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
