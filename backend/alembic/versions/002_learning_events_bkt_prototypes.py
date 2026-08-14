"""Add learning_events and bkt_prototypes for research logging and class-split BKT.

Revision ID: 002
Revises: 001
Create Date: 2026-08-14
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "learning_events",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("class_id", sa.String(64), nullable=False),
        sa.Column("source", sa.String(64), nullable=False),
        sa.Column("item_id", sa.String(255)),
        sa.Column("lesson_id", sa.String(255)),
        sa.Column("module_id", sa.String(128)),
        sa.Column("objective_ids", postgresql.JSONB()),
        sa.Column("is_correct", sa.Boolean()),
        sa.Column("answer", postgresql.JSONB()),
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
        sa.Column("last_reading_max_scroll_depth", sa.Integer()),
        sa.Column("last_reading_triggered_by_error", sa.Boolean()),
        sa.Column("pL_before", sa.Float()),
        sa.Column("pL_after", sa.Float()),
        sa.Column("prototype_id", sa.Integer()),
        sa.Column("extra", postgresql.JSONB()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_learning_events_user_created", "learning_events", ["user_id", "created"])
    op.create_index("ix_learning_events_class_source", "learning_events", ["class_id", "source"])

    op.create_table(
        "bkt_prototypes",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("class_id", sa.String(64), nullable=False),
        sa.Column("probs", postgresql.JSONB(), nullable=False),
        sa.Column("prototype_id", sa.Integer(), nullable=False),
        sa.Column("last_updated", sa.DateTime(), nullable=False),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
        sa.UniqueConstraint("user_id", "class_id", name="uq_bkt_prototypes_user_class"),
    )


def downgrade() -> None:
    op.drop_table("bkt_prototypes")
    op.drop_index("ix_learning_events_class_source", table_name="learning_events")
    op.drop_index("ix_learning_events_user_created", table_name="learning_events")
    op.drop_table("learning_events")
