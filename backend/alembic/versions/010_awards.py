"""Add awards (badges earned for mastery).

Revision ID: 010
Revises: 009
Create Date: 2026-10-25
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "010"
down_revision: Union[str, None] = "009"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "awards",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("award_id", sa.String(80), nullable=False),
        sa.Column("kind", sa.String(16), nullable=False),
        sa.Column("module_id", sa.String(64), nullable=False),
        sa.Column("objective_id", sa.String(128)),
        sa.Column("state", sa.String(16), nullable=False),
        sa.Column("earned_at", sa.DateTime(), nullable=False),
        sa.Column("detail", postgresql.JSONB()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
        sa.UniqueConstraint("user_id", "award_id", name="uq_awards_user_award"),
    )
    op.create_index("ix_awards_user_id", "awards", ["user_id"])


def downgrade() -> None:
    op.drop_index("ix_awards_user_id", table_name="awards")
    op.drop_table("awards")
