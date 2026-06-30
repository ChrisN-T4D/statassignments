#!/usr/bin/env python3
"""Seed Postgres from scripts/seed-data/seed-data.json and default classes."""

import json
import os
import sys
from datetime import date, datetime
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = Path(__file__).resolve().parents[2]
SEED_FILE = BACKEND_ROOT / "seed-data" / "seed-data.json"
if not SEED_FILE.exists():
    SEED_FILE = REPO_ROOT / "scripts" / "seed-data" / "seed-data.json"

sys.path.insert(0, str(BACKEND_ROOT))

from db.auth import hash_password
from db.database import SessionLocal
from db.models import Class, Item, Module, Semester, User, _new_id

DEFAULT_CLASSES = [
    {
        "slug": "research-methods",
        "name": "Research Methods",
        "short_name": "RM",
        "description": "Introduction to research methodology in psychology",
        "color": "#3b82f6",
        "icon": "🔬",
        "topics": ["sampling", "hypothesis-testing", "correlation"],
        "order": 1,
    },
    {
        "slug": "statistics",
        "name": "Statistics",
        "short_name": "Stats",
        "description": "Core statistical concepts and analysis techniques",
        "color": "#8b5cf6",
        "icon": "📊",
        "topics": ["descriptive-stats", "visualizations", "normal-distribution", "z-scores", "t-tests", "correlation", "regression"],
        "order": 2,
    },
    {
        "slug": "intro-research",
        "name": "Intro to Research",
        "short_name": "Intro",
        "description": "Foundational concepts in psychological research",
        "color": "#f59e0b",
        "icon": "📚",
        "topics": ["descriptive-stats", "visualizations", "probability"],
        "order": 3,
    },
]


def _now():
    return datetime.utcnow()


def seed():
    if not SEED_FILE.exists():
        print(f"Seed file not found: {SEED_FILE}")
        return

    data = json.loads(SEED_FILE.read_text(encoding="utf-8"))
    db = SessionLocal()
    now = _now()

    try:
        if db.query(Class).count() == 0:
            stats_class = None
            for c in DEFAULT_CLASSES:
                row = Class(
                    id=_new_id(),
                    slug=c["slug"],
                    name=c["name"],
                    short_name=c["short_name"],
                    description=c["description"],
                    color=c["color"],
                    icon=c["icon"],
                    topics=c["topics"],
                    order=c["order"],
                    is_active=True,
                    created=now,
                    updated=now,
                )
                db.add(row)
                if c["slug"] == "statistics":
                    stats_class = row
            db.flush()
            print(f"  + {len(DEFAULT_CLASSES)} classes")

        if db.query(Semester).count() == 0:
            for s in data.get("semesters", []):
                start = s.get("start_date")
                end = s.get("end_date")
                db.add(
                    Semester(
                        id=_new_id(),
                        code=s["code"],
                        name=s.get("name"),
                        start_date=date.fromisoformat(start) if isinstance(start, str) else start,
                        end_date=date.fromisoformat(end) if isinstance(end, str) else end,
                        is_active=s.get("is_active", True),
                        created=now,
                        updated=now,
                    )
                )
            print(f"  + {len(data.get('semesters', []))} semesters")

        if db.query(Module).count() == 0:
            stats_class = db.query(Class).filter(Class.slug == "statistics").first()
            module_map = {}
            for m in data.get("modules", []):
                mod = Module(
                    id=_new_id(),
                    class_id=stats_class.id if stats_class else None,
                    topic_id=m["topic_id"],
                    title=m["title"],
                    description=m.get("description"),
                    software_type=m.get("software_type", "all"),
                    order=m.get("order"),
                    created=now,
                    updated=now,
                )
                db.add(mod)
                module_map[m["topic_id"]] = mod
            db.flush()
            print(f"  + {len(module_map)} modules")

            item_count = 0
            for item in data.get("items", []):
                mod = module_map.get(item["module_topic"])
                if not mod:
                    continue
                db.add(
                    Item(
                        id=_new_id(),
                        module_id=mod.id,
                        item_type=item.get("item_type"),
                        question=item.get("prompt"),
                        answer_key=item.get("answer_key"),
                        correct_answer=item.get("answer_key"),
                        options=item.get("options"),
                        explanation=item.get("explanation"),
                        difficulty=item.get("difficulty"),
                        order=item.get("order"),
                        created=now,
                        updated=now,
                    )
                )
                item_count += 1
            print(f"  + {item_count} items")

        admin_email = os.environ.get("ADMIN_EMAIL", "admin@methodsmarket.local")
        if not db.query(User).filter(User.email == admin_email).first():
            admin_password = os.environ.get("ADMIN_PASSWORD", "changeme123")
            db.add(
                User(
                    id=_new_id(),
                    email=admin_email,
                    password_hash=hash_password(admin_password),
                    name="Admin",
                    role="admin",
                    verified=True,
                    created=now,
                    updated=now,
                )
            )
            print(f"  + admin user {admin_email}")

        db.commit()
        print("Seed complete.")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("Seeding database...")
    seed()
