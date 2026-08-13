"""Add roster.access_mode (online_primary | offline_primary).

Revision ID: 003
Revises: 002
Create Date: 2026-08-13
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "003"
down_revision: Union[str, None] = "002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "roster",
        sa.Column(
            "access_mode",
            sa.String(32),
            nullable=False,
            server_default="online_primary",
        ),
    )


def downgrade() -> None:
    op.drop_column("roster", "access_mode")
