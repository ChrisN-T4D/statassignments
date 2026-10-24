"""Class discussion board ("Ask the class"): one forum per class per semester."""

from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session

from db.auth import get_current_user
from db.database import get_db
from db.models import (
    BoardHelpful,
    BoardPost,
    BoardRead,
    BoardReport,
    BoardThread,
    Class,
    Semester,
    User,
)

router = APIRouter(prefix="/api/board", tags=["board"])

TITLE_MAX = 150
BODY_MAX = 5000
LIST_LIMIT = 100


class NewThreadBody(BaseModel):
    title: str
    body: str
    tag: Optional[str] = None
    tag_label: Optional[str] = None


class NewPostBody(BaseModel):
    body: str


class AnswerBody(BaseModel):
    post_id: Optional[str] = None


class HideBody(BaseModel):
    hidden: bool = True


class ReportBody(BaseModel):
    reason: Optional[str] = None


def _is_staff(user: User) -> bool:
    return user.role in ("instructor", "admin")


def _resolve_class(db: Session, class_ref: str) -> Class:
    cls = db.query(Class).filter((Class.id == class_ref) | (Class.slug == class_ref)).first()
    if not cls:
        raise HTTPException(status_code=404, detail="Class not found")
    return cls


def _require_member(user: User, cls: Class) -> None:
    if _is_staff(user):
        return
    if cls.id not in {c.id for c in user.classes}:
        raise HTTPException(status_code=403, detail="You are not enrolled in this class")


def _active_semester_id(db: Session) -> Optional[str]:
    sem = (
        db.query(Semester)
        .filter(Semester.is_active.is_(True))
        .order_by(Semester.created.desc())
        .first()
    )
    return sem.id if sem else None


def _thread_or_404(db: Session, thread_id: str, user: User) -> tuple[BoardThread, Class]:
    thread = db.get(BoardThread, thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    cls = db.get(Class, thread.class_id)
    _require_member(user, cls)
    if thread.hidden and not _is_staff(user) and thread.user_id != user.id:
        raise HTTPException(status_code=404, detail="Thread not found")
    return thread, cls


def _clean(text: str, limit: int, label: str) -> str:
    text = (text or "").strip()
    if not text:
        raise HTTPException(status_code=422, detail=f"{label} is required")
    if len(text) > limit:
        raise HTTPException(status_code=422, detail=f"{label} must be {limit} characters or fewer")
    return text


def _author(user: User) -> dict:
    name = (user.name or "").strip() or user.email.split("@")[0]
    return {"id": user.id, "name": name, "is_staff": _is_staff(user)}


def _touch_seen(db: Session, thread_id: str, user_id: str) -> None:
    row = (
        db.query(BoardRead)
        .filter(BoardRead.thread_id == thread_id, BoardRead.user_id == user_id)
        .first()
    )
    now = datetime.utcnow()
    if row:
        row.seen_at = now
    else:
        db.add(BoardRead(thread_id=thread_id, user_id=user_id, seen_at=now))


def _thread_summary(thread: BoardThread, reply_count: int, me: User, unread: bool = False) -> dict:
    return {
        "id": thread.id,
        "class_id": thread.class_id,
        "title": thread.title,
        "tag": thread.tag,
        "tag_label": thread.tag_label,
        "author": _author(thread.author),
        "answered": thread.answered,
        "hidden": thread.hidden,
        "reply_count": reply_count,
        "unread": unread,
        "mine": thread.user_id == me.id,
        "created": thread.created.isoformat(),
        "last_activity": thread.last_activity.isoformat(),
    }


def _reply_counts(db: Session, thread_ids: list[str], staff: bool) -> dict[str, int]:
    if not thread_ids:
        return {}
    q = db.query(BoardPost.thread_id, func.count(BoardPost.id)).filter(BoardPost.thread_id.in_(thread_ids))
    if not staff:
        q = q.filter(BoardPost.hidden.is_(False))
    return dict(q.group_by(BoardPost.thread_id).all())


@router.get("/{class_ref}/threads")
def list_threads(
    class_ref: str,
    filter: str = Query("all", pattern="^(all|unanswered|mine)$"),
    tag: Optional[str] = None,
    q: Optional[str] = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    cls = _resolve_class(db, class_ref)
    _require_member(user, cls)
    query = db.query(BoardThread).filter(
        BoardThread.class_id == cls.id,
        BoardThread.semester_id == _active_semester_id(db),
    )
    if not _is_staff(user):
        query = query.filter((BoardThread.hidden.is_(False)) | (BoardThread.user_id == user.id))
    if filter == "unanswered":
        query = query.filter(BoardThread.answered.is_(False))
    elif filter == "mine":
        query = query.filter(BoardThread.user_id == user.id)
    if tag:
        query = query.filter(BoardThread.tag == tag)
    if q and q.strip():
        like = f"%{q.strip().lower()}%"
        query = query.filter(
            func.lower(BoardThread.title).like(like) | func.lower(BoardThread.body).like(like)
        )
    threads = query.order_by(BoardThread.last_activity.desc()).limit(LIST_LIMIT).all()
    seen = {
        r.thread_id: r.seen_at
        for r in db.query(BoardRead).filter(
            BoardRead.user_id == user.id, BoardRead.thread_id.in_([t.id for t in threads])
        )
    }
    counts = _reply_counts(db, [t.id for t in threads], _is_staff(user))
    return {
        "threads": [
            _thread_summary(
                t,
                counts.get(t.id, 0),
                user,
                unread=t.id in seen and t.last_activity > seen[t.id],
            )
            for t in threads
        ]
    }


@router.post("/{class_ref}/threads")
def create_thread(
    class_ref: str,
    body: NewThreadBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    cls = _resolve_class(db, class_ref)
    _require_member(user, cls)
    thread = BoardThread(
        class_id=cls.id,
        semester_id=_active_semester_id(db),
        user_id=user.id,
        title=_clean(body.title, TITLE_MAX, "Title"),
        body=_clean(body.body, BODY_MAX, "Message"),
        tag=(body.tag or None) and body.tag[:128],
        tag_label=(body.tag_label or None) and body.tag_label[:160],
        last_activity=datetime.utcnow(),
    )
    db.add(thread)
    db.flush()
    _touch_seen(db, thread.id, user.id)
    db.commit()
    db.refresh(thread)
    return _thread_summary(thread, 0, user)


@router.get("/{class_ref}/unread")
def unread_count(
    class_ref: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    cls = _resolve_class(db, class_ref)
    _require_member(user, cls)
    n = (
        db.query(func.count(BoardThread.id))
        .join(BoardRead, BoardRead.thread_id == BoardThread.id)
        .filter(
            BoardRead.user_id == user.id,
            BoardThread.class_id == cls.id,
            BoardThread.hidden.is_(False),
            BoardThread.last_activity > BoardRead.seen_at,
        )
        .scalar()
    )
    return {"unread": n or 0}


def _thread_detail(db: Session, thread: BoardThread, user: User) -> dict:
    staff = _is_staff(user)
    posts = [p for p in thread.posts if staff or not p.hidden]
    helpful = dict(
        db.query(BoardHelpful.post_id, func.count(BoardHelpful.id))
        .filter(BoardHelpful.post_id.in_([p.id for p in posts] or [""]))
        .group_by(BoardHelpful.post_id)
        .all()
    )
    mine = {
        r.post_id
        for r in db.query(BoardHelpful).filter(
            BoardHelpful.user_id == user.id, BoardHelpful.post_id.in_([p.id for p in posts] or [""])
        )
    }
    return {
        **_thread_summary(thread, len(posts), user),
        "body": thread.body,
        "answer_post_id": thread.answer_post_id,
        "posts": [
            {
                "id": p.id,
                "author": _author(p.author),
                "body": p.body,
                "hidden": p.hidden,
                "helpful": helpful.get(p.id, 0),
                "helpful_by_me": p.id in mine,
                "is_answer": p.id == thread.answer_post_id,
                "mine": p.user_id == user.id,
                "created": p.created.isoformat(),
            }
            for p in posts
        ],
    }


@router.get("/threads/{thread_id}")
def get_thread(
    thread_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    thread, _ = _thread_or_404(db, thread_id, user)
    # Reading a thread you took part in clears its badge; reading someone else's does not follow it.
    if db.query(BoardRead).filter(BoardRead.thread_id == thread.id, BoardRead.user_id == user.id).first():
        _touch_seen(db, thread.id, user.id)
        db.commit()
    return _thread_detail(db, thread, user)


@router.post("/threads/{thread_id}/posts")
def reply(
    thread_id: str,
    body: NewPostBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    thread, _ = _thread_or_404(db, thread_id, user)
    if thread.hidden and not _is_staff(user):
        raise HTTPException(status_code=403, detail="This thread is hidden")
    db.add(BoardPost(thread_id=thread.id, user_id=user.id, body=_clean(body.body, BODY_MAX, "Reply")))
    thread.last_activity = datetime.utcnow()
    db.flush()
    _touch_seen(db, thread.id, user.id)
    db.commit()
    db.refresh(thread)
    return _thread_detail(db, thread, user)


@router.post("/threads/{thread_id}/answer")
def mark_answer(
    thread_id: str,
    body: AnswerBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    thread, _ = _thread_or_404(db, thread_id, user)
    if thread.user_id != user.id and not _is_staff(user):
        raise HTTPException(status_code=403, detail="Only the asker or the instructor can mark an answer")
    if body.post_id:
        post = db.get(BoardPost, body.post_id)
        if not post or post.thread_id != thread.id or post.hidden:
            raise HTTPException(status_code=404, detail="Reply not found")
    thread.answer_post_id = body.post_id
    thread.answered = bool(body.post_id)
    db.commit()
    db.refresh(thread)
    return _thread_detail(db, thread, user)


@router.post("/posts/{post_id}/helpful")
def toggle_helpful(
    post_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    post = db.get(BoardPost, post_id)
    if not post or post.hidden:
        raise HTTPException(status_code=404, detail="Reply not found")
    thread, _ = _thread_or_404(db, post.thread_id, user)
    if post.user_id == user.id:
        raise HTTPException(status_code=400, detail="You can't mark your own reply helpful")
    mark = db.query(BoardHelpful).filter(BoardHelpful.post_id == post.id, BoardHelpful.user_id == user.id).first()
    if mark:
        db.delete(mark)
    else:
        db.add(BoardHelpful(post_id=post.id, user_id=user.id))
    db.commit()
    return _thread_detail(db, thread, user)


@router.post("/threads/{thread_id}/report")
def report_thread(
    thread_id: str,
    body: ReportBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    thread, cls = _thread_or_404(db, thread_id, user)
    db.add(
        BoardReport(
            class_id=cls.id,
            thread_id=thread.id,
            user_id=user.id,
            reason=(body.reason or "").strip()[:300] or None,
        )
    )
    db.commit()
    return {"ok": True}


@router.post("/posts/{post_id}/report")
def report_post(
    post_id: str,
    body: ReportBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    post = db.get(BoardPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Reply not found")
    thread, cls = _thread_or_404(db, post.thread_id, user)
    db.add(
        BoardReport(
            class_id=cls.id,
            thread_id=thread.id,
            post_id=post.id,
            user_id=user.id,
            reason=(body.reason or "").strip()[:300] or None,
        )
    )
    db.commit()
    return {"ok": True}


def _require_staff(user: User) -> None:
    if not _is_staff(user):
        raise HTTPException(status_code=403, detail="Instructor access required")


@router.post("/threads/{thread_id}/hide")
def hide_thread(
    thread_id: str,
    body: HideBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _require_staff(user)
    thread, _ = _thread_or_404(db, thread_id, user)
    thread.hidden = body.hidden
    db.query(BoardReport).filter(BoardReport.thread_id == thread.id).update({"resolved": True})
    db.commit()
    return {"ok": True, "hidden": thread.hidden}


@router.post("/posts/{post_id}/hide")
def hide_post(
    post_id: str,
    body: HideBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _require_staff(user)
    post = db.get(BoardPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Reply not found")
    post.hidden = body.hidden
    thread = db.get(BoardThread, post.thread_id)
    if body.hidden and thread.answer_post_id == post.id:
        thread.answer_post_id = None
        thread.answered = False
    db.query(BoardReport).filter(BoardReport.post_id == post.id).update({"resolved": True})
    db.commit()
    return {"ok": True, "hidden": post.hidden}


@router.delete("/threads/{thread_id}")
def delete_thread(
    thread_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _require_staff(user)
    thread = db.get(BoardThread, thread_id)
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    db.delete(thread)
    db.commit()
    return {"ok": True}


@router.delete("/posts/{post_id}")
def delete_post(
    post_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _require_staff(user)
    post = db.get(BoardPost, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Reply not found")
    thread = db.get(BoardThread, post.thread_id)
    if thread.answer_post_id == post.id:
        thread.answer_post_id = None
        thread.answered = False
    db.delete(post)
    db.commit()
    return {"ok": True}


@router.get("/{class_ref}/reports")
def list_reports(
    class_ref: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _require_staff(user)
    cls = _resolve_class(db, class_ref)
    rows = (
        db.query(BoardReport)
        .filter(BoardReport.class_id == cls.id, BoardReport.resolved.is_(False))
        .order_by(BoardReport.created.desc())
        .all()
    )
    out = []
    for r in rows:
        thread = db.get(BoardThread, r.thread_id)
        post = db.get(BoardPost, r.post_id) if r.post_id else None
        reporter = db.get(User, r.user_id)
        out.append(
            {
                "id": r.id,
                "thread_id": r.thread_id,
                "thread_title": thread.title if thread else None,
                "post_id": r.post_id,
                "excerpt": ((post.body if post else thread.body) or "")[:200] if thread else "",
                "reason": r.reason,
                "reporter": _author(reporter)["name"] if reporter else None,
                "created": r.created.isoformat(),
            }
        )
    return {"reports": out}
