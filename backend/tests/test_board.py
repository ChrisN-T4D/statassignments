import pytest

from db.auth import create_access_token, hash_password
from db.models import Class, User


def _make_user(db, email, name, class_ids, role="student"):
    user = User(email=email, password_hash=hash_password("pass12345"), name=name, role=role, verified=True)
    user.classes = db.query(Class).filter(Class.id.in_(class_ids)).all()
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token(user.id, user.email, user.role)
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def alice(db_session):
    return _make_user(db_session, "alice@example.com", "Alice A", ["research-methods"])


@pytest.fixture
def bob(db_session):
    return _make_user(db_session, "bob@example.com", "Bob B", ["research-methods"])


@pytest.fixture
def stats_student(db_session):
    return _make_user(db_session, "sam@example.com", "Sam S", ["statistics"])


@pytest.fixture
def prof(db_session):
    return _make_user(db_session, "prof@example.com", "Prof P", [], role="instructor")


def _ask(client, headers, cls="research-methods", title="How do I pick a DV?", body="Stuck on the DV."):
    r = client.post(
        f"/api/board/{cls}/threads",
        json={"title": title, "body": body, "tag": "week:5", "tag_label": "Week 5"},
        headers=headers,
    )
    assert r.status_code == 200, r.text
    return r.json()


def test_requires_auth(client):
    assert client.get("/api/board/research-methods/threads").status_code in (401, 403)


def test_each_class_has_its_own_forum(client, alice, stats_student):
    _ask(client, alice)
    own = client.get("/api/board/research-methods/threads", headers=alice).json()["threads"]
    assert len(own) == 1
    # a statistics-only student cannot read or post in the RM forum
    assert client.get("/api/board/research-methods/threads", headers=stats_student).status_code == 403
    assert (
        client.post(
            "/api/board/research-methods/threads",
            json={"title": "x", "body": "y"},
            headers=stats_student,
        ).status_code
        == 403
    )
    # and their own forum is empty
    assert client.get("/api/board/statistics/threads", headers=stats_student).json()["threads"] == []


def test_create_validates_and_lists(client, alice):
    bad = client.post("/api/board/research-methods/threads", json={"title": " ", "body": "b"}, headers=alice)
    assert bad.status_code == 422
    too_long = client.post(
        "/api/board/research-methods/threads", json={"title": "t" * 151, "body": "b"}, headers=alice
    )
    assert too_long.status_code == 422
    t = _ask(client, alice)
    assert t["author"]["name"] == "Alice A"
    assert "email" not in t["author"]
    listing = client.get("/api/board/research-methods/threads", headers=alice).json()["threads"]
    assert [x["id"] for x in listing] == [t["id"]]
    assert listing[0]["reply_count"] == 0 and not listing[0]["answered"]


def test_reply_answer_and_filters(client, alice, bob):
    t = _ask(client, alice)
    r = client.post(f"/api/board/threads/{t['id']}/posts", json={"body": "Try the operational definition."}, headers=bob)
    assert r.status_code == 200
    post_id = r.json()["posts"][0]["id"]
    # only the asker or instructor can mark the answer
    assert client.post(f"/api/board/threads/{t['id']}/answer", json={"post_id": post_id}, headers=bob).status_code == 403
    done = client.post(f"/api/board/threads/{t['id']}/answer", json={"post_id": post_id}, headers=alice)
    assert done.status_code == 200 and done.json()["answered"] and done.json()["posts"][0]["is_answer"]
    assert client.get("/api/board/research-methods/threads?filter=unanswered", headers=bob).json()["threads"] == []
    assert len(client.get("/api/board/research-methods/threads?filter=mine", headers=alice).json()["threads"]) == 1
    assert client.get("/api/board/research-methods/threads?filter=mine", headers=bob).json()["threads"] == []
    # un-mark
    undone = client.post(f"/api/board/threads/{t['id']}/answer", json={"post_id": None}, headers=alice).json()
    assert not undone["answered"]


def test_search_and_tag_filter(client, alice):
    _ask(client, alice, title="Sampling question", body="random sample?")
    client.post(
        "/api/board/research-methods/threads",
        json={"title": "Other", "body": "unrelated", "tag": "week:6"},
        headers=alice,
    )
    assert len(client.get("/api/board/research-methods/threads?q=SAMPLING", headers=alice).json()["threads"]) == 1
    assert len(client.get("/api/board/research-methods/threads?tag=week:6", headers=alice).json()["threads"]) == 1


def test_helpful_toggle_and_not_own(client, alice, bob):
    t = _ask(client, alice)
    pid = client.post(f"/api/board/threads/{t['id']}/posts", json={"body": "idea"}, headers=bob).json()["posts"][0]["id"]
    assert client.post(f"/api/board/posts/{pid}/helpful", headers=bob).status_code == 400
    on = client.post(f"/api/board/posts/{pid}/helpful", headers=alice).json()["posts"][0]
    assert on["helpful"] == 1 and on["helpful_by_me"]
    off = client.post(f"/api/board/posts/{pid}/helpful", headers=alice).json()["posts"][0]
    assert off["helpful"] == 0 and not off["helpful_by_me"]


def test_unread_badge_for_participants(client, alice, bob):
    t = _ask(client, alice)
    assert client.get("/api/board/research-methods/unread", headers=alice).json()["unread"] == 0
    client.post(f"/api/board/threads/{t['id']}/posts", json={"body": "reply"}, headers=bob)
    assert client.get("/api/board/research-methods/unread", headers=alice).json()["unread"] == 1
    listing = client.get("/api/board/research-methods/threads", headers=alice).json()["threads"]
    assert listing[0]["unread"] is True
    client.get(f"/api/board/threads/{t['id']}", headers=alice)
    assert client.get("/api/board/research-methods/unread", headers=alice).json()["unread"] == 0
    # bob replied, so he follows it too, but his own reply is not unread for him
    assert client.get("/api/board/research-methods/unread", headers=bob).json()["unread"] == 0


def test_report_hide_delete_are_staff_only(client, alice, bob, prof):
    t = _ask(client, alice)
    pid = client.post(f"/api/board/threads/{t['id']}/posts", json={"body": "rude"}, headers=bob).json()["posts"][0]["id"]
    assert client.post(f"/api/board/posts/{pid}/report", json={"reason": "rude"}, headers=alice).status_code == 200
    # students cannot moderate or see reports
    assert client.post(f"/api/board/posts/{pid}/hide", json={"hidden": True}, headers=alice).status_code == 403
    assert client.get("/api/board/research-methods/reports", headers=alice).status_code == 403
    reports = client.get("/api/board/research-methods/reports", headers=prof).json()["reports"]
    assert len(reports) == 1 and reports[0]["reporter"] == "Alice A" and reports[0]["reason"] == "rude"
    assert client.post(f"/api/board/posts/{pid}/hide", json={"hidden": True}, headers=prof).status_code == 200
    # hidden reply disappears for students, stays visible for staff; report is resolved
    assert client.get(f"/api/board/threads/{t['id']}", headers=alice).json()["posts"] == []
    assert len(client.get(f"/api/board/threads/{t['id']}", headers=prof).json()["posts"]) == 1
    assert client.get("/api/board/research-methods/reports", headers=prof).json()["reports"] == []
    # hidden thread: gone for other students, still visible to its author and staff
    assert client.post(f"/api/board/threads/{t['id']}/hide", json={"hidden": True}, headers=prof).status_code == 200
    assert client.get("/api/board/research-methods/threads", headers=bob).json()["threads"] == []
    assert client.get(f"/api/board/threads/{t['id']}", headers=bob).status_code == 404
    assert len(client.get("/api/board/research-methods/threads", headers=alice).json()["threads"]) == 1
    assert client.delete(f"/api/board/threads/{t['id']}", headers=alice).status_code == 403
    assert client.delete(f"/api/board/threads/{t['id']}", headers=prof).status_code == 200
    assert client.get("/api/board/research-methods/threads", headers=alice).json()["threads"] == []


def test_instructor_reaches_every_class_and_is_badged(client, alice, prof):
    t = _ask(client, alice)
    out = client.post(f"/api/board/threads/{t['id']}/posts", json={"body": "See Ch 4."}, headers=prof).json()
    assert out["posts"][0]["author"]["is_staff"] is True
    assert client.get("/api/board/statistics/threads", headers=prof).status_code == 200
