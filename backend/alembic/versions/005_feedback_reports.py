"""Add feedback_reports for student issue reporting.

Revision ID: 005
Revises: 004
Create Date: 2026-09-11
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "005"
down_revision: Union[str, None] = "004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "feedback_reports",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("student_key", sa.String(64)),
        sa.Column("category", sa.String(32), nullable=False),
        sa.Column("subject", sa.String(120), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("status", sa.String(16), nullable=False, server_default="open"),
        sa.Column("page_url", sa.Text()),
        sa.Column("route_path", sa.String(255)),
        sa.Column("class_id", sa.String(64)),
        sa.Column("module_id", sa.String(128)),
        sa.Column("context", postgresql.JSONB()),
        sa.Column("admin_notes", sa.Text()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_feedback_reports_user_id", "feedback_reports", ["user_id"])
    op.create_index("ix_feedback_reports_status_created", "feedback_reports", ["status", "created"])


def downgrade() -> None:
    op.drop_index("ix_feedback_reports_status_created", table_name="feedback_reports")
    op.drop_index("ix_feedback_reports_user_id", table_name="feedback_reports")
    op.drop_table("feedback_reports")
