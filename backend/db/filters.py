"""Subset PocketBase filter syntax used by the frontend."""

import re
from typing import Any

from sqlalchemy import and_, or_, ColumnElement
from sqlalchemy.orm import InstrumentedAttribute

from db.models import FIELD_ALIASES

EQ_RE = re.compile(r'^(\w+)\s*=\s*("([^"]*)"|true|false|\d+(?:\.\d+)?)$')
GTE_RE = re.compile(r'^(\w+)\s*>=\s*"([^"]*)"$')
LTE_RE = re.compile(r'^(\w+)\s*<=\s*"([^"]*)"$')
CONTAINS_RE = re.compile(r'^(\w+)\s*\?~\s*(.+)$')


def _resolve_column(model, collection: str, field: str) -> InstrumentedAttribute:
    aliases = FIELD_ALIASES.get(collection, {})
    col_name = aliases.get(field, field)
    if not hasattr(model, col_name):
        raise ValueError(f"Unknown field: {field}")
    return getattr(model, col_name)


def _parse_value(raw: str) -> Any:
    if raw == "true":
        return True
    if raw == "false":
        return False
    if raw.isdigit():
        return int(raw)
    return raw


def _parse_atom(model, collection: str, expr: str) -> ColumnElement:
    expr = expr.strip()

    m = GTE_RE.match(expr)
    if m:
        col = _resolve_column(model, collection, m.group(1))
        return col >= m.group(2)

    m = LTE_RE.match(expr)
    if m:
        col = _resolve_column(model, collection, m.group(1))
        return col <= m.group(2)

    m = CONTAINS_RE.match(expr)
    if m:
        col = _resolve_column(model, collection, m.group(1))
        ids = re.findall(r'"([^"]+)"', m.group(2))
        return col.in_(ids)

    m = EQ_RE.match(expr)
    if m:
        field = m.group(1)
        raw = m.group(2)
        col = _resolve_column(model, collection, field)
        if m.group(2) == '""' or (m.group(3) == "" and m.group(2).startswith('"')):
            return or_(col.is_(None), col == "")
        if raw == "true":
            return col.is_(True)
        if raw == "false":
            return col.is_(False)
        val = m.group(3) if m.group(3) is not None else _parse_value(raw)
        return col == val

    raise ValueError(f"Unsupported filter expression: {expr}")


def _split_top(expr: str, op: str) -> list[str]:
    parts: list[str] = []
    depth = 0
    current: list[str] = []
    i = 0
    while i < len(expr):
        ch = expr[i]
        if ch == "(":
            depth += 1
            current.append(ch)
        elif ch == ")":
            depth -= 1
            current.append(ch)
        elif depth == 0 and expr[i : i + len(op)] == op:
            parts.append("".join(current).strip())
            current = []
            i += len(op) - 1
        else:
            current.append(ch)
        i += 1
    if current:
        parts.append("".join(current).strip())
    return parts


def parse_filter(model, collection: str, filter_str: str | None) -> ColumnElement | None:
    if not filter_str or not filter_str.strip():
        return None

    expr = filter_str.strip()
    if expr.startswith("(") and expr.endswith(")"):
        expr = expr[1:-1].strip()

    if " && " in expr:
        parts = _split_top(expr, " && ")
        clauses = [parse_filter(model, collection, p) for p in parts]
        return and_(*[c for c in clauses if c is not None])

    if " || " in expr:
        parts = _split_top(expr, " || ")
        clauses = [parse_filter(model, collection, p) for p in parts]
        return or_(*[c for c in clauses if c is not None])

    return _parse_atom(model, collection, expr)


def apply_sort(query, model, sort_str: str | None, collection: str | None = None):
    if not sort_str:
        return query.order_by(model.created.desc())

    coll = collection or model.__tablename__
    parts = [s.strip() for s in sort_str.split(",") if s.strip()]
    orders = []

    for part in parts:
        desc = part.startswith("-")
        field = part[1:] if desc else part
        col_name = FIELD_ALIASES.get(coll, {}).get(field, field)
        if not hasattr(model, col_name):
            col_name = field
        col = getattr(model, col_name)
        orders.append(col.desc() if desc else col.asc())

    return query.order_by(*orders)
