"""Add live_lab session tables for Stats Concept Labs.

Revision ID: 006
Revises: 005
Create Date: 2026-09-16
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "006"
down_revision: Union[str, None] = "005"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "live_lab_sessions",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("code", sa.String(16), nullable=False),
        sa.Column("lab_type", sa.String(32), nullable=False),
        sa.Column(
            "host_user_id",
            sa.String(32),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("class_id", sa.String(64), nullable=False),
        sa.Column("status", sa.String(16), nullable=False, server_default="open"),
        sa.Column("phase", sa.String(16), nullable=False, server_default="lobby"),
        sa.Column("applied_settings", postgresql.JSONB()),
        sa.Column("vote_locked", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("contribute_locked", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column("current_round_id", sa.String(32), nullable=False),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
        sa.Column("ended_at", sa.DateTime()),
        sa.Column("last_activity_at", sa.DateTime()),
    )
    op.create_index("ix_live_lab_sessions_code", "live_lab_sessions", ["code"], unique=True)
    op.create_index("ix_live_lab_sessions_host_user_id", "live_lab_sessions", ["host_user_id"])
    op.create_index("ix_live_lab_sessions_status", "live_lab_sessions", ["status"])

    op.create_table(
        "live_lab_participants",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column(
            "session_id",
            sa.String(32),
            sa.ForeignKey("live_lab_sessions.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("display_name", sa.String(255), nullable=False),
        sa.Column("guest_token", sa.String(64), nullable=False),
        sa.Column(
            "user_id",
            sa.String(32),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
        ),
        sa.Column("last_seen", sa.DateTime()),
    )
    op.create_index(
        "ix_live_lab_participants_guest_token",
        "live_lab_participants",
        ["guest_token"],
        unique=True,
    )

    op.create_table(
        "live_lab_votes",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column(
            "session_id",
            sa.String(32),
            sa.ForeignKey("live_lab_sessions.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "participant_id",
            sa.String(32),
            sa.ForeignKey("live_lab_participants.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("setting_key", sa.String(64), nullable=False),
        sa.Column("value", postgresql.JSONB(), nullable=False),
        sa.UniqueConstraint(
            "session_id",
            "participant_id",
            "setting_key",
            name="uq_live_lab_votes_session_participant_key",
        ),
    )
    op.create_table(
        "live_lab_contributions",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column(
            "session_id",
            sa.String(32),
            sa.ForeignKey("live_lab_sessions.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "participant_id",
            sa.String(32),
            sa.ForeignKey("live_lab_participants.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("round_id", sa.String(32), nullable=False),
        sa.Column("payload", postgresql.JSONB(), nullable=False),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )

def downgrade() -> None:
    op.drop_table("live_lab_contributions")
    op.drop_table("live_lab_votes")
    op.drop_index("ix_live_lab_participants_guest_token", table_name="live_lab_participants")
    op.drop_table("live_lab_participants")
    op.drop_index("ix_live_lab_sessions_status", table_name="live_lab_sessions")
    op.drop_index("ix_live_lab_sessions_host_user_id", table_name="live_lab_sessions")
    op.drop_index("ix_live_lab_sessions_code", table_name="live_lab_sessions")
    op.drop_table("live_lab_sessions")
