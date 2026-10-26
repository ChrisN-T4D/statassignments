from datetime import datetime, timedelta

import pytest

from db.auth import create_access_token, hash_password
from db.models import Award, BktState, PracticeAttempt, User

OBJ = "M0-O1"
PREFIX = f"m0-{OBJ}-"


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
    db.add(BktState(user_id=user.id, objective_id=objective, pL=pL, pL0=0.1, pT=0.15, pS=0.1, pG=0.25,
                    attempts=5, correct=4, incorrect=1, last_updated=datetime.utcnow()))
    db.commit()


def attempt(db, user, problem, correct, source, at=None):
    a = PracticeAttempt(user_id=user.id, problem=problem, answer="x", is_correct=correct, source=source)
    db.add(a)
    db.flush()
    if at:
        a.created = at
    db.commit()


def practice(db, user, objective=OBJ, n=3):
    bkt(db, user, objective, 0.95)
    for i in range(n):
        attempt(db, user, f"m0-{objective}-sq-{i}", True, "math_practice")


def check(db, user, objective=OBJ, correct=(True,) * 5, sources=None, start=None, gap=40):
    start = start or datetime.utcnow() - timedelta(minutes=5)
    for i, ok in enumerate(correct):
        src = (sources or ["math_mastery_check"] * len(correct))[i]
        attempt(db, user, f"m0-{objective}-chk-{i}", ok, src, at=start + timedelta(seconds=gap * i))


def claim(client, headers, award_id):
    return client.post("/api/awards/claim", json={"award_id": award_id}, headers=headers)


def test_cannot_claim_without_evidence(client, headers):
    r = claim(client, headers, "math-topic:M0-O1")
    assert r.status_code == 409


def test_unknown_award_and_auth(client, headers):
    assert claim(client, headers, "math-topic:NOPE").status_code == 404
    assert client.post("/api/awards/claim", json={"award_id": "math-topic:M0-O1"}).status_code in (401, 403)


def test_practice_mastery_earns_the_practice_badge(client, db_session, student, headers):
    practice(db_session, student)
    r = claim(client, headers, "math-topic:M0-O1")
    assert r.status_code == 200
    assert r.json()["award"]["state"] == "practice" and r.json()["created"] is True
    assert claim(client, headers, "math-topic:M0-O1").json()["created"] is False


def test_low_mastery_or_too_few_correct_answers_do_not_count(client, db_session, student, headers):
    bkt(db_session, student, OBJ, 0.5)
    for i in range(5):
        attempt(db_session, student, f"{PREFIX}sq-{i}", True, "math_practice")
    assert claim(client, headers, "math-topic:M0-O1").status_code == 409
    db_session.query(BktState).delete()
    db_session.query(PracticeAttempt).delete()
    db_session.commit()
    practice(db_session, student, n=2)
    assert claim(client, headers, "math-topic:M0-O1").status_code == 409


def test_another_students_attempts_do_not_count(client, db_session, student, headers):
    other = User(email="o@example.com", password_hash=hash_password("otherpass12"), name="O", role="student", verified=True)
    db_session.add(other)
    db_session.commit()
    practice(db_session, other)
    assert claim(client, headers, "math-topic:M0-O1").status_code == 409


def test_a_clean_passed_check_confirms_the_badge(client, db_session, student, headers):
    practice(db_session, student)
    check(db_session, student)
    r = claim(client, headers, "math-topic:M0-O1")
    assert r.status_code == 200 and r.json()["award"]["state"] == "confirmed"


def test_pass_mark_is_four_of_five(client, db_session, student, headers):
    practice(db_session, student)
    check(db_session, student, correct=(True, True, True, False, False), start=datetime.utcnow() - timedelta(minutes=20))
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "practice"
    check(db_session, student, correct=(True, True, True, True, False), start=datetime.utcnow() - timedelta(minutes=2))
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "confirmed"


def test_warning_flags_make_it_unverified_but_one_flag_does_not(client, db_session, student, headers):
    practice(db_session, student)
    one = ["math_mastery_check|left-page"] + ["math_mastery_check"] * 4
    check(db_session, student, sources=one)
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "confirmed"
    db_session.query(Award).delete()
    db_session.query(PracticeAttempt).filter(PracticeAttempt.source.like("math_mastery_check%")).delete(synchronize_session=False)
    db_session.commit()
    two = ["math_mastery_check|paste", "math_mastery_check|left-page,instant-start"] + ["math_mastery_check"] * 3
    check(db_session, student, sources=two)
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "unverified"
    # a timeout is not a warning sign
    db_session.query(Award).delete()
    db_session.query(PracticeAttempt).filter(PracticeAttempt.source.like("math_mastery_check%")).delete(synchronize_session=False)
    db_session.commit()
    check(db_session, student, sources=["math_mastery_check|timed-out"] * 5, correct=(True, True, True, True, False))
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "confirmed"


def test_check_must_be_one_sitting_of_five_distinct_questions(client, db_session, student, headers):
    practice(db_session, student)
    # five correct answers spread over two hours are not one sitting
    check(db_session, student, start=datetime.utcnow() - timedelta(hours=3), gap=1800)
    r = claim(client, headers, "math-topic:M0-O1")
    assert r.json()["award"]["state"] == "practice"
    # a check passed earlier in one sitting still counts when claimed later
    db_session.query(PracticeAttempt).filter(PracticeAttempt.source.like("math_mastery_check%")).delete(synchronize_session=False)
    db_session.query(Award).delete()
    db_session.commit()
    check(db_session, student, start=datetime.utcnow() - timedelta(hours=3))
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "confirmed"
    # a check with the same question five times is not valid
    db_session.query(PracticeAttempt).filter(PracticeAttempt.source.like("math_mastery_check%")).delete(synchronize_session=False)
    db_session.query(Award).delete()
    db_session.commit()
    for i in range(5):
        attempt(db_session, student, f"{PREFIX}chk-0", True, "math_mastery_check")
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "practice"


def test_badges_never_downgrade_and_can_upgrade(client, db_session, student, headers):
    practice(db_session, student)
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "practice"
    check(db_session, student, sources=["math_mastery_check|paste", "math_mastery_check|left-page"] + ["math_mastery_check"] * 3)
    r = claim(client, headers, "math-topic:M0-O1")
    assert r.json()["award"]["state"] == "unverified" and r.json()["upgraded"] is True
    db_session.query(PracticeAttempt).filter(PracticeAttempt.source.like("math_mastery_check%")).delete(synchronize_session=False)
    db_session.commit()
    check(db_session, student)
    r = claim(client, headers, "math-topic:M0-O1")
    assert r.json()["award"]["state"] == "confirmed" and r.json()["upgraded"] is True
    # a later failed check does not take it away
    check(db_session, student, correct=(False,) * 5, start=datetime.utcnow())
    assert claim(client, headers, "math-topic:M0-O1").json()["award"]["state"] == "confirmed"


def test_module_badge_needs_every_topic_checked(client, db_session, student, headers):
    objectives = [f"M0-O{i}" for i in range(1, 8)]
    for o in objectives[:6]:
        practice(db_session, student, o)
        check(db_session, student, o)
        assert claim(client, headers, f"math-topic:{o}").json()["award"]["state"] == "confirmed"
    assert claim(client, headers, "math-module:stats-module-0").status_code == 409
    practice(db_session, student, "M0-O7")
    assert claim(client, headers, "math-topic:M0-O7").json()["award"]["state"] == "practice"
    assert claim(client, headers, "math-module:stats-module-0").status_code == 409  # practice-only is not enough
    check(db_session, student, "M0-O7", sources=["math_mastery_check|paste", "math_mastery_check|left-page"] + ["math_mastery_check"] * 3)
    claim(client, headers, "math-topic:M0-O7")
    r = claim(client, headers, "math-module:stats-module-0")
    assert r.status_code == 200 and r.json()["award"]["state"] == "unverified" and r.json()["award"]["kind"] == "module"
    mine = client.get("/api/awards/mine", headers=headers).json()["items"]
    assert len(mine) == 8


def test_clients_cannot_write_awards_through_the_generic_api(client, db_session, student, headers):
    body = {"user": student.id, "award_id": "math-topic:M0-O1", "kind": "topic", "module_id": "stats-module-0", "state": "confirmed"}
    r = client.post("/api/collections/awards/records", json=body, headers=headers)
    assert r.status_code == 403
    practice(db_session, student)
    award = claim(client, headers, "math-topic:M0-O1").json()["award"]
    assert client.patch(f"/api/collections/awards/records/{award['id']}", json={"state": "confirmed"}, headers=headers).status_code == 403
    assert client.delete(f"/api/collections/awards/records/{award['id']}", headers=headers).status_code == 403


def test_students_see_only_their_own_awards_instructors_see_all(client, db_session, student, headers):
    practice(db_session, student)
    claim(client, headers, "math-topic:M0-O1")
    other = User(email="o@example.com", password_hash=hash_password("otherpass12"), name="O", role="student", verified=True)
    teacher = User(email="t@example.com", password_hash=hash_password("teacherpass1"), name="T", role="instructor", verified=True)
    db_session.add_all([other, teacher])
    db_session.commit()
    oh = {"Authorization": f"Bearer {create_access_token(other.id, other.email, other.role)}"}
    th = {"Authorization": f"Bearer {create_access_token(teacher.id, teacher.email, teacher.role)}"}
    assert client.get("/api/collections/awards/records", headers=oh).json()["totalItems"] >= 0
    assert client.get("/api/collections/awards/records", headers=oh).json()["items"] == []
    assert len(client.get("/api/collections/awards/records", headers=th).json()["items"]) == 1
    assert len(client.get("/api/collections/awards/records", headers=headers).json()["items"]) == 1
