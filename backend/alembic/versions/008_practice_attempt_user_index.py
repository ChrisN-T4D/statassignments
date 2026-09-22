"""Index practice_attempts.user_id for per-user history fetches.

Revision ID: 008
Revises: 007
Create Date: 2026-09-22
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "008"
down_revision: Union[str, None] = "007"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index(
        "ix_practice_attempts_user_id",
        "practice_attempts",
        ["user_id"],
    )


def downgrade() -> None:
    op.drop_index("ix_practice_attempts_user_id", table_name="practice_attempts")
