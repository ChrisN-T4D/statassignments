"""Add class discussion board (threads, posts, helpful marks, reads, reports).

Revision ID: 009
Revises: 008
Create Date: 2026-10-24
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "009"
down_revision: Union[str, None] = "008"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _fk(col: str, target: str, ondelete: str = "CASCADE") -> sa.ForeignKey:
    return sa.ForeignKey(f"{target}.{col}", ondelete=ondelete)


def upgrade() -> None:
    op.create_table(
        "board_threads",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("class_id", sa.String(32), _fk("id", "classes"), nullable=False),
        sa.Column("semester_id", sa.String(32), _fk("id", "semesters", "SET NULL")),
        sa.Column("user_id", sa.String(32), _fk("id", "users"), nullable=False),
        sa.Column("title", sa.String(150), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("tag", sa.String(128)),
        sa.Column("tag_label", sa.String(160)),
        sa.Column("answer_post_id", sa.String(32)),
        sa.Column("answered", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("hidden", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("last_activity", sa.DateTime(), nullable=False),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_board_threads_class_activity", "board_threads", ["class_id", "semester_id", "last_activity"])
    op.create_table(
        "board_posts",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("thread_id", sa.String(32), _fk("id", "board_threads"), nullable=False),
        sa.Column("user_id", sa.String(32), _fk("id", "users"), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("hidden", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_board_posts_thread_id", "board_posts", ["thread_id"])
    op.create_table(
        "board_helpful",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("post_id", sa.String(32), _fk("id", "board_posts"), nullable=False),
        sa.Column("user_id", sa.String(32), _fk("id", "users"), nullable=False),
        sa.UniqueConstraint("post_id", "user_id", name="uq_board_helpful_post_user"),
    )
    op.create_index("ix_board_helpful_post_id", "board_helpful", ["post_id"])
    op.create_table(
        "board_reads",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("thread_id", sa.String(32), _fk("id", "board_threads"), nullable=False),
        sa.Column("user_id", sa.String(32), _fk("id", "users"), nullable=False),
        sa.Column("seen_at", sa.DateTime(), nullable=False),
        sa.UniqueConstraint("thread_id", "user_id", name="uq_board_reads_thread_user"),
    )
    op.create_index("ix_board_reads_user_id", "board_reads", ["user_id"])
    op.create_table(
        "board_reports",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("class_id", sa.String(32), _fk("id", "classes"), nullable=False),
        sa.Column("thread_id", sa.String(32), _fk("id", "board_threads"), nullable=False),
        sa.Column("post_id", sa.String(32), _fk("id", "board_posts")),
        sa.Column("user_id", sa.String(32), _fk("id", "users"), nullable=False),
        sa.Column("reason", sa.String(300)),
        sa.Column("resolved", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("board_reports")
    op.drop_index("ix_board_reads_user_id", table_name="board_reads")
    op.drop_table("board_reads")
    op.drop_index("ix_board_helpful_post_id", table_name="board_helpful")
    op.drop_table("board_helpful")
    op.drop_index("ix_board_posts_thread_id", table_name="board_posts")
    op.drop_table("board_posts")
    op.drop_index("ix_board_threads_class_activity", table_name="board_threads")
    op.drop_table("board_threads")
