"""Initial Postgres schema (migrated from PocketBase collections).

Revision ID: 001
Revises:
Create Date: 2026-06-11
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("email", sa.String(255), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("name", sa.String(255)),
        sa.Column("role", sa.String(32), nullable=False, server_default="student"),
        sa.Column("verified", sa.Boolean(), server_default="false"),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_users_email", "users", ["email"])

    op.create_table(
        "classes",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("short_name", sa.String(64), nullable=False),
        sa.Column("slug", sa.String(128), unique=True),
        sa.Column("description", sa.Text()),
        sa.Column("color", sa.String(32)),
        sa.Column("icon", sa.String(16)),
        sa.Column("topics", postgresql.JSONB()),
        sa.Column("order", sa.Integer()),
        sa.Column("is_active", sa.Boolean(), server_default="true"),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )

    op.create_table(
        "user_classes",
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
        sa.Column("class_id", sa.String(32), sa.ForeignKey("classes.id", ondelete="CASCADE"), primary_key=True),
    )

    op.create_table(
        "semesters",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("code", sa.String(64), nullable=False, unique=True),
        sa.Column("name", sa.String(255)),
        sa.Column("start_date", sa.Date()),
        sa.Column("end_date", sa.Date()),
        sa.Column("is_active", sa.Boolean(), server_default="true"),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )

    op.create_table(
        "roster",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("semester_id", sa.String(32), sa.ForeignKey("semesters.id"), nullable=False),
        sa.Column("student_key", sa.String(64), nullable=False),
        sa.Column("claim_token", sa.String(128)),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="SET NULL")),
        sa.Column("claimed_at", sa.DateTime()),
        sa.Column("bb_username", sa.String(255)),
        sa.Column("bb_id", sa.String(128)),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_roster_student_key", "roster", ["student_key"])

    op.create_table(
        "modules",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("class_id", sa.String(32), sa.ForeignKey("classes.id")),
        sa.Column("topic_id", sa.String(128), nullable=False),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("description", sa.Text()),
        sa.Column("software_type", sa.String(32), server_default="all"),
        sa.Column("semester_id", sa.String(32), sa.ForeignKey("semesters.id")),
        sa.Column("order", sa.Integer()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_modules_topic_id", "modules", ["topic_id"])

    op.create_table(
        "items",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("module_id", sa.String(32), sa.ForeignKey("modules.id", ondelete="CASCADE"), nullable=False),
        sa.Column("title", sa.String(255)),
        sa.Column("question", sa.Text()),
        sa.Column("item_type", sa.String(64)),
        sa.Column("question_type", sa.String(64)),
        sa.Column("options", postgresql.JSONB()),
        sa.Column("correct_answer", sa.Text()),
        sa.Column("answer_key", sa.Text()),
        sa.Column("explanation", sa.Text()),
        sa.Column("hint", sa.Text()),
        sa.Column("difficulty", sa.String(32)),
        sa.Column("tags", postgresql.JSONB()),
        sa.Column("order", sa.Integer()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )

    op.create_table(
        "attempts",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("semester_id", sa.String(32), sa.ForeignKey("semesters.id"), nullable=False),
        sa.Column("profile_id", sa.String(32), sa.ForeignKey("roster.id"), nullable=False),
        sa.Column("module_id", sa.String(32), sa.ForeignKey("modules.id")),
        sa.Column("item_id", sa.String(32), sa.ForeignKey("items.id"), nullable=False),
        sa.Column("software_type", sa.String(32)),
        sa.Column("response", sa.Text()),
        sa.Column("is_correct", sa.Boolean(), server_default="false"),
        sa.Column("score", sa.Float()),
        sa.Column("time_spent_seconds", sa.Integer()),
        sa.Column("active_time_seconds", sa.Integer()),
        sa.Column("total_time_seconds", sa.Integer()),
        sa.Column("time_maxed_out", sa.Boolean()),
        sa.Column("idle_detected", sa.Boolean()),
        sa.Column("attempt_no", sa.Integer()),
        sa.Column("hint_used", sa.Boolean()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )

    op.create_table(
        "user_progress",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("topic_id", sa.String(128), nullable=False),
        sa.Column("completed", sa.Boolean(), server_default="false"),
        sa.Column("completed_at", sa.DateTime()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
        sa.UniqueConstraint("user_id", "topic_id", name="uq_user_progress_user_topic"),
    )

    op.create_table(
        "practice_problems",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("topic_id", sa.String(128), nullable=False),
        sa.Column("question_id", sa.String(128)),
        sa.Column("question", sa.Text(), nullable=False),
        sa.Column("question_type", sa.String(64), nullable=False),
        sa.Column("options", postgresql.JSONB()),
        sa.Column("correct_answer", sa.Text(), nullable=False),
        sa.Column("explanation", sa.Text()),
        sa.Column("hint", sa.Text()),
        sa.Column("difficulty", sa.String(32)),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_practice_problems_topic_id", "practice_problems", ["topic_id"])

    op.create_table(
        "practice_attempts",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("problem", sa.String(120), nullable=False),
        sa.Column("answer", sa.Text(), nullable=False),
        sa.Column("is_correct", sa.Boolean(), nullable=False),
        sa.Column("difficulty", sa.String(32)),
        sa.Column("active_time_seconds", sa.Integer()),
        sa.Column("total_time_seconds", sa.Integer()),
        sa.Column("time_maxed_out", sa.Boolean()),
        sa.Column("idle_detected", sa.Boolean()),
        sa.Column("time_to_first_selection", sa.Integer()),
        sa.Column("answer_changes", sa.Integer()),
        sa.Column("time_since_reading", sa.Integer()),
        sa.Column("time_since_last_attempt", sa.Integer()),
        sa.Column("has_read_topic_before", sa.Boolean()),
        sa.Column("last_topic_read_time", sa.Integer()),
        sa.Column("last_attempt_time", sa.Integer()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )

    op.create_table(
        "topic_readings",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("topic_id", sa.String(128), nullable=False),
        sa.Column("module_id", sa.String(128)),
        sa.Column("active_time_seconds", sa.Integer()),
        sa.Column("total_time_seconds", sa.Integer()),
        sa.Column("time_maxed_out", sa.Boolean()),
        sa.Column("idle_detected", sa.Boolean()),
        sa.Column("max_scroll_depth", sa.Integer()),
        sa.Column("triggered_by_error", sa.Boolean()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )

    op.create_table(
        "bkt_states",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("objective_id", sa.String(128), nullable=False),
        sa.Column("pL", sa.Float(), nullable=False),
        sa.Column("pL0", sa.Float(), nullable=False),
        sa.Column("pT", sa.Float(), nullable=False),
        sa.Column("pS", sa.Float(), nullable=False),
        sa.Column("pG", sa.Float(), nullable=False),
        sa.Column("attempts", sa.Integer(), nullable=False),
        sa.Column("correct", sa.Integer(), nullable=False),
        sa.Column("incorrect", sa.Integer(), nullable=False),
        sa.Column("last_updated", sa.DateTime(), nullable=False),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
        sa.UniqueConstraint("user_id", "objective_id", name="uq_bkt_states_user_objective"),
    )

    op.create_table(
        "software_lesson_metrics",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="SET NULL")),
        sa.Column("lesson_id", sa.String(255), nullable=False),
        sa.Column("lesson_title", sa.String(255)),
        sa.Column("module", sa.String(128)),
        sa.Column("software", sa.String(64)),
        sa.Column("event_type", sa.String(64), nullable=False),
        sa.Column("event_payload", postgresql.JSONB()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )


def downgrade() -> None:
    for table in (
        "software_lesson_metrics",
        "bkt_states",
        "topic_readings",
        "practice_attempts",
        "practice_problems",
        "user_progress",
        "attempts",
        "items",
        "modules",
        "roster",
        "semesters",
        "user_classes",
        "classes",
        "users",
    ):
        op.drop_table(table)
