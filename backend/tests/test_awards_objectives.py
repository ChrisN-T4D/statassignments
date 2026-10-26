from datetime import datetime, timedelta

import pytest

from db.auth import create_access_token, hash_password
from db.models import Award, BktState, LearningEvent, User
from lib import awards_catalog as cat

_clock = {"t": datetime(2026, 10, 1, 9, 0, 0)}


@pytest.fixture
def student(db_session):
    u = User(email="s@example.com", password_hash=hash_password("studentpass1"), name="S", role="student", verified=True)
    db_session.add(u)
    db_session.commit()
    db_session.refresh(u)
    return u


@pytest.fixture
def headers(student):
    return {"Authorization": f"Bearer {create_access_token(student.id, student.email, student.role)}"}


def bkt(db, user, objective, pL):
    row = db.query(BktState).filter(BktState.user_id == user.id, BktState.objective_id == objective).first()
    if row:
        row.pL = pL
    else:
        db.add(BktState(user_id=user.id, objective_id=objective, pL=pL, pL0=0.1, pT=0.15, pS=0.1, pG=0.25,
                        attempts=5, correct=4, incorrect=1, last_updated=datetime.utcnow()))
    db.commit()


def event(db, user, objective, correct=True, source="concept_review"):
    _clock["t"] += timedelta(seconds=30)
    db.add(LearningEvent(user_id=user.id, class_id="statistics", source=source, item_id=f"q-{_clock['t'].timestamp()}",
                         objective_ids=[objective], is_correct=correct, answer="x", created=_clock["t"]))
    db.commit()


def sync(client, headers):
    r = client.post("/api/awards/sync", headers=headers)
    assert r.status_code == 200, r.text
    return r.json()


def mastery(db, user, objective, n=3, source="concept_review"):
    bkt(db, user, objective, 0.95)
    for _ in range(n):
        event(db, user, objective, True, source)


def module(mod_id):
    return next(m for m in cat.CATALOG["modules"] if m["id"] == mod_id)


def test_catalog_is_consistent():
    ids = [t["award_id"] for m in cat.CATALOG["modules"] for t in m["topics"]] + [m["module_badge"]["award_id"] for m in cat.CATALOG["modules"]]
    assert len(ids) == len(set(ids))
    for m in cat.CATALOG["modules"]:
        b = m["module_badge"]
        assert 1 <= b["min_count"] <= len(m["topics"])
        assert all(a in cat.AWARDS for a in cat.AWARDS[b["award_id"]]["requires"])
    assert len(cat.CATALOG["modules"]) == 9
    assert module("stats-module-0")["module_badge"]["min_state"] == "checked"


def test_nothing_earned_without_evidence(client, headers):
    d = sync(client, headers)
    assert d["new"] == [] and d["items"] == []


def test_clean_streak_and_mastery_earn_an_objective_badge(client, db_session, student, headers):
    mastery(db_session, student, "M4-O1")
    d = sync(client, headers)
    assert [a["award_id"] for a in d["new"]] == ["objective:M4-O1"]
    assert d["new"][0]["state"] == "earned" and d["new"][0]["objective_id"] == "M4-O1"


def test_low_mastery_does_not_earn(client, db_session, student, headers):
    bkt(db_session, student, "M4-O1", 0.6)
    for _ in range(4):
        event(db_session, student, "M4-O1")
    assert sync(client, headers)["new"] == []


def test_warning_flags_are_neutral_and_a_miss_resets(client, db_session, student, headers):
    bkt(db_session, student, "M4-O1", 0.95)
    event(db_session, student, "M4-O1")
    event(db_session, student, "M4-O1", True, "concept_review|too-fast")
    event(db_session, student, "M4-O1", True, "concept_review|retry")
    event(db_session, student, "M4-O1")
    assert sync(client, headers)["new"] == []  # only 2 clean answers so far
    event(db_session, student, "M4-O1")
    assert [a["award_id"] for a in sync(client, headers)["new"]] == ["objective:M4-O1"]

    bkt(db_session, student, "M4-O2", 0.95)
    for _ in range(3):
        event(db_session, student, "M4-O2")
    event(db_session, student, "M4-O2", False)
    assert [a["award_id"] for a in sync(client, headers)["new"]] == []
    for _ in range(3):
        event(db_session, student, "M4-O2")
    assert [a["award_id"] for a in sync(client, headers)["new"]] == ["objective:M4-O2"]


def test_any_source_counts_including_benchmark_and_software(client, db_session, student, headers):
    bkt(db_session, student, "M4-S1", 0.95)
    event(db_session, student, "M4-S1", True, "software_practice")
    event(db_session, student, "M4-S1", True, "benchmark_practice")
    event(db_session, student, "M4-S1", True, "software_practice")
    assert [a["award_id"] for a in sync(client, headers)["new"]] == ["objective:M4-S1"]


def test_small_question_banks_need_every_item_not_three(client, db_session, student, headers):
    small = next(t for m in cat.CATALOG["modules"] if m["kind"] == "objectives" for t in m["topics"] if 0 < t.get("items", 0) < 3)
    bkt(db_session, student, small["objective_id"], 0.95)
    for _ in range(small["items"]):
        event(db_session, student, small["objective_id"])
    assert [a["award_id"] for a in sync(client, headers)["new"]] == [small["award_id"]]


def test_module_badge_needs_enough_objectives(client, db_session, student, headers):
    mod = module("stats-module-4")
    need = mod["module_badge"]["min_count"]
    objs = [t["objective_id"] for t in mod["topics"]]
    for o in objs[: need - 1]:
        mastery(db_session, student, o)
    d = sync(client, headers)
    assert mod["module_badge"]["award_id"] not in [a["award_id"] for a in d["items"]]
    mastery(db_session, student, objs[need - 1])
    d = sync(client, headers)
    ids = [a["award_id"] for a in d["new"]]
    assert mod["module_badge"]["award_id"] in ids
    badge = next(a for a in d["new"] if a["kind"] == "module")
    assert badge["state"] == "earned" and badge["module_id"] == "stats-module-4"


def test_sync_is_idempotent_and_never_takes_a_badge_back(client, db_session, student, headers):
    mastery(db_session, student, "M4-O1")
    assert len(sync(client, headers)["new"]) == 1
    assert sync(client, headers)["new"] == []
    event(db_session, student, "M4-O1", False)
    bkt(db_session, student, "M4-O1", 0.3)
    d = sync(client, headers)
    assert d["new"] == [] and [a["award_id"] for a in d["items"]] == ["objective:M4-O1"]


def test_other_students_evidence_does_not_count(client, db_session, student, headers):
    other = User(email="o@example.com", password_hash=hash_password("otherpass12"), name="O", role="student", verified=True)
    db_session.add(other)
    db_session.commit()
    mastery(db_session, other, "M4-O1")
    assert sync(client, headers)["new"] == []


def test_claim_works_for_objective_badges_and_409_otherwise(client, db_session, student, headers):
    assert client.post("/api/awards/claim", json={"award_id": "objective:M4-O1"}, headers=headers).status_code == 409
    mastery(db_session, student, "M4-O1")
    r = client.post("/api/awards/claim", json={"award_id": "objective:M4-O1"}, headers=headers)
    assert r.status_code == 200 and r.json()["award"]["state"] == "earned"
    assert client.post("/api/awards/claim", json={"award_id": "module:stats-module-4"}, headers=headers).status_code == 409


def test_math_badges_are_not_touched_by_sync(client, db_session, student, headers):
    bkt(db_session, student, "M0-O1", 0.95)
    for _ in range(3):
        event(db_session, student, "M0-O1", True, "math_practice")
    assert sync(client, headers)["new"] == []
