"""Add class_id to roster for class-aware student keys.

Revision ID: 002
Revises: 001
Create Date: 2026-08-10
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "roster",
        sa.Column("class_id", sa.String(32), sa.ForeignKey("classes.id"), nullable=True),
    )
    op.create_index("ix_roster_class_id", "roster", ["class_id"])


def downgrade() -> None:
    op.drop_index("ix_roster_class_id", table_name="roster")
    op.drop_column("roster", "class_id")
