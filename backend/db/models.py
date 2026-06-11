import secrets
import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    Table,
    Column,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.database import Base

ID_LEN = 32

user_classes = Table(
    "user_classes",
    Base.metadata,
    Column("user_id", String(ID_LEN), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("class_id", String(ID_LEN), ForeignKey("classes.id", ondelete="CASCADE"), primary_key=True),
)


def _new_id() -> str:
    """New record IDs (PocketBase-compatible length)."""
    return secrets.token_hex(8)[:15]


def _utcnow() -> datetime:
    return datetime.utcnow()


class TimestampMixin:
    created: Mapped[datetime] = mapped_column(DateTime, default=_utcnow, nullable=False)
    updated: Mapped[datetime] = mapped_column(DateTime, default=_utcnow, onupdate=_utcnow, nullable=False)


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str | None] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(32), default="student", nullable=False)
    verified: Mapped[bool] = mapped_column(Boolean, default=False)

    classes: Mapped[list["Class"]] = relationship(secondary=user_classes, back_populates="users")


class Class(Base, TimestampMixin):
    __tablename__ = "classes"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    short_name: Mapped[str] = mapped_column(String(64), nullable=False)
    slug: Mapped[str | None] = mapped_column(String(128), unique=True)
    description: Mapped[str | None] = mapped_column(Text)
    color: Mapped[str | None] = mapped_column(String(32))
    icon: Mapped[str | None] = mapped_column(String(16))
    topics: Mapped[dict | list | None] = mapped_column(JSONB)
    order: Mapped[int | None] = mapped_column(Integer)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    users: Mapped[list[User]] = relationship(secondary=user_classes, back_populates="classes")


class Semester(Base, TimestampMixin):
    __tablename__ = "semesters"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    code: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    name: Mapped[str | None] = mapped_column(String(255))
    start_date: Mapped[datetime | None] = mapped_column(Date)
    end_date: Mapped[datetime | None] = mapped_column(Date)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class Roster(Base, TimestampMixin):
    __tablename__ = "roster"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    semester_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("semesters.id"), nullable=False)
    student_key: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    claim_token: Mapped[str | None] = mapped_column(String(128))
    user_id: Mapped[str | None] = mapped_column(String(ID_LEN), ForeignKey("users.id", ondelete="SET NULL"))
    claimed_at: Mapped[datetime | None] = mapped_column(DateTime)
    bb_username: Mapped[str | None] = mapped_column(String(255))
    bb_id: Mapped[str | None] = mapped_column(String(128))

    semester: Mapped[Semester] = relationship()
    user: Mapped[User | None] = relationship()


class Module(Base, TimestampMixin):
    __tablename__ = "modules"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    class_id: Mapped[str | None] = mapped_column(String(ID_LEN), ForeignKey("classes.id"))
    topic_id: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    software_type: Mapped[str] = mapped_column(String(32), default="all")
    semester_id: Mapped[str | None] = mapped_column(String(ID_LEN), ForeignKey("semesters.id"))
    order: Mapped[int | None] = mapped_column(Integer)

    class_: Mapped[Class | None] = relationship(foreign_keys=[class_id])
    semester: Mapped[Semester | None] = relationship()


class Item(Base, TimestampMixin):
    __tablename__ = "items"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    module_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("modules.id", ondelete="CASCADE"))
    title: Mapped[str | None] = mapped_column(String(255))
    question: Mapped[str | None] = mapped_column(Text)
    item_type: Mapped[str | None] = mapped_column(String(64))
    question_type: Mapped[str | None] = mapped_column(String(64))
    options: Mapped[dict | list | None] = mapped_column(JSONB)
    correct_answer: Mapped[str | None] = mapped_column(Text)
    answer_key: Mapped[str | None] = mapped_column(Text)
    explanation: Mapped[str | None] = mapped_column(Text)
    hint: Mapped[str | None] = mapped_column(Text)
    difficulty: Mapped[str | None] = mapped_column(String(32))
    tags: Mapped[dict | list | None] = mapped_column(JSONB)
    order: Mapped[int | None] = mapped_column(Integer)

    module: Mapped[Module] = relationship()


class Attempt(Base, TimestampMixin):
    __tablename__ = "attempts"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    semester_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("semesters.id"))
    profile_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("roster.id"))
    module_id: Mapped[str | None] = mapped_column(String(ID_LEN), ForeignKey("modules.id"))
    item_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("items.id"))
    software_type: Mapped[str | None] = mapped_column(String(32))
    response: Mapped[str | None] = mapped_column(Text)
    is_correct: Mapped[bool] = mapped_column(Boolean, default=False)
    score: Mapped[float | None] = mapped_column(Float)
    time_spent_seconds: Mapped[int | None] = mapped_column(Integer)
    active_time_seconds: Mapped[int | None] = mapped_column(Integer)
    total_time_seconds: Mapped[int | None] = mapped_column(Integer)
    time_maxed_out: Mapped[bool | None] = mapped_column(Boolean)
    idle_detected: Mapped[bool | None] = mapped_column(Boolean)
    attempt_no: Mapped[int | None] = mapped_column(Integer)
    hint_used: Mapped[bool | None] = mapped_column(Boolean)

    semester: Mapped[Semester] = relationship()
    profile: Mapped[Roster] = relationship()
    module: Mapped[Module | None] = relationship()
    item: Mapped[Item] = relationship()


class UserProgress(Base, TimestampMixin):
    __tablename__ = "user_progress"
    __table_args__ = (UniqueConstraint("user_id", "topic_id", name="uq_user_progress_user_topic"),)

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    user_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("users.id", ondelete="CASCADE"))
    topic_id: Mapped[str] = mapped_column(String(128), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime)


class PracticeProblem(Base, TimestampMixin):
    __tablename__ = "practice_problems"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    topic_id: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    question_id: Mapped[str | None] = mapped_column(String(128), index=True)
    question: Mapped[str] = mapped_column(Text, nullable=False)
    question_type: Mapped[str] = mapped_column(String(64), nullable=False)
    options: Mapped[dict | list | None] = mapped_column(JSONB)
    correct_answer: Mapped[str] = mapped_column(Text, nullable=False)
    explanation: Mapped[str | None] = mapped_column(Text)
    hint: Mapped[str | None] = mapped_column(Text)
    difficulty: Mapped[str | None] = mapped_column(String(32))


class PracticeAttempt(Base, TimestampMixin):
    __tablename__ = "practice_attempts"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    user_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("users.id", ondelete="CASCADE"))
    problem: Mapped[str] = mapped_column(String(120), nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False)
    difficulty: Mapped[str | None] = mapped_column(String(32))
    active_time_seconds: Mapped[int | None] = mapped_column(Integer)
    total_time_seconds: Mapped[int | None] = mapped_column(Integer)
    time_maxed_out: Mapped[bool | None] = mapped_column(Boolean)
    idle_detected: Mapped[bool | None] = mapped_column(Boolean)
    time_to_first_selection: Mapped[int | None] = mapped_column(Integer)
    answer_changes: Mapped[int | None] = mapped_column(Integer)
    time_since_reading: Mapped[int | None] = mapped_column(Integer)
    time_since_last_attempt: Mapped[int | None] = mapped_column(Integer)
    has_read_topic_before: Mapped[bool | None] = mapped_column(Boolean)
    last_topic_read_time: Mapped[int | None] = mapped_column(Integer)
    last_attempt_time: Mapped[int | None] = mapped_column(Integer)


class TopicReading(Base, TimestampMixin):
    __tablename__ = "topic_readings"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    user_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("users.id", ondelete="CASCADE"))
    topic_id: Mapped[str] = mapped_column(String(128), nullable=False)
    module_id: Mapped[str | None] = mapped_column(String(128))
    active_time_seconds: Mapped[int | None] = mapped_column(Integer)
    total_time_seconds: Mapped[int | None] = mapped_column(Integer)
    time_maxed_out: Mapped[bool | None] = mapped_column(Boolean)
    idle_detected: Mapped[bool | None] = mapped_column(Boolean)
    max_scroll_depth: Mapped[int | None] = mapped_column(Integer)
    triggered_by_error: Mapped[bool | None] = mapped_column(Boolean)


class BktState(Base, TimestampMixin):
    __tablename__ = "bkt_states"
    __table_args__ = (UniqueConstraint("user_id", "objective_id", name="uq_bkt_states_user_objective"),)

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    user_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("users.id", ondelete="CASCADE"))
    objective_id: Mapped[str] = mapped_column(String(128), nullable=False)
    pL: Mapped[float] = mapped_column(Float, nullable=False)
    pL0: Mapped[float] = mapped_column(Float, nullable=False)
    pT: Mapped[float] = mapped_column(Float, nullable=False)
    pS: Mapped[float] = mapped_column(Float, nullable=False)
    pG: Mapped[float] = mapped_column(Float, nullable=False)
    attempts: Mapped[int] = mapped_column(Integer, nullable=False)
    correct: Mapped[int] = mapped_column(Integer, nullable=False)
    incorrect: Mapped[int] = mapped_column(Integer, nullable=False)
    last_updated: Mapped[datetime] = mapped_column(DateTime, nullable=False)


class SoftwareLessonMetric(Base, TimestampMixin):
    __tablename__ = "software_lesson_metrics"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    user_id: Mapped[str | None] = mapped_column(String(ID_LEN), ForeignKey("users.id", ondelete="SET NULL"))
    lesson_id: Mapped[str] = mapped_column(String(255), nullable=False)
    lesson_title: Mapped[str | None] = mapped_column(String(255))
    module: Mapped[str | None] = mapped_column(String(128))
    software: Mapped[str | None] = mapped_column(String(64))
    event_type: Mapped[str] = mapped_column(String(64), nullable=False)
    event_payload: Mapped[dict | list | None] = mapped_column(JSONB)


COLLECTION_MODELS: dict[str, type[Base]] = {
    "users": User,
    "classes": Class,
    "semesters": Semester,
    "roster": Roster,
    "modules": Module,
    "items": Item,
    "attempts": Attempt,
    "user_progress": UserProgress,
    "practice_problems": PracticeProblem,
    "practice_attempts": PracticeAttempt,
    "topic_readings": TopicReading,
    "bkt_states": BktState,
    "software_lesson_metrics": SoftwareLessonMetric,
}

FIELD_ALIASES: dict[str, dict[str, str]] = {
    "roster": {"semester": "semester_id", "user": "user_id"},
    "modules": {"class": "class_id", "semester": "semester_id"},
    "items": {"module": "module_id"},
    "attempts": {
        "semester": "semester_id",
        "profile": "profile_id",
        "module": "module_id",
        "item": "item_id",
    },
    "user_progress": {"user": "user_id"},
    "practice_attempts": {"user": "user_id"},
    "topic_readings": {"user": "user_id"},
    "bkt_states": {"user": "user_id"},
    "software_lesson_metrics": {"user": "user_id"},
}

REVERSE_ALIASES: dict[str, dict[str, str]] = {
    collection: {v: k for k, v in aliases.items()}
    for collection, aliases in FIELD_ALIASES.items()
}

EXPAND_RELATIONS: dict[str, dict[str, tuple[str, type[Base]]]] = {
    "roster": {"semester": ("semester_id", Semester)},
    "modules": {"class": ("class_id", Class), "semester": ("semester_id", Semester)},
    "items": {"module": ("module_id", Module)},
    "attempts": {
        "semester": ("semester_id", Semester),
        "profile": ("profile_id", Roster),
        "module": ("module_id", Module),
        "item": ("item_id", Item),
    },
    "users": {"classes": ("classes", Class)},
}
