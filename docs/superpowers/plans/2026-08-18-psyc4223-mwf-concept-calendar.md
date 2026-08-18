# PSYC 4223 M/W/F Concept Calendar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Instructor calendar plus OWUI `teaching_today` day cards for PSYC 4223 M/W/F 12:00–12:50, with Methods Market chapter concepts on Mon/Wed and Canvas workshops on Friday.

**Architecture:** One markdown playbook in statassignments (human). Teaching-pack generator writes one `days/psyc-4223/YYYY-MM-DD.md` per meeting so existing `teaching_today` can return it. Copy the pack into the Open WebUI container on neu1. No new OWUI tool.

**Tech Stack:** Markdown; Python day-card generator; pytest; OWUI Workspace Tool `teaching_today`; neu1 `docker cp`.

**Spec:** `docs/superpowers/specs/2026-08-18-psyc4223-mwf-concept-calendar-design.md`

## Global Constraints

- Meeting: Mon/Wed/Fri **12:00–12:50**. Statistics stays 08:00–08:50.
- No hook / fight / studio. No exit tickets.
- Only chapter = Methods Market (Jhangiani) section titles from the spec §4 tables.
- Do not change Canvas dues, Methods Market banks, or `WEEKLY_SCHEDULE_RAW`.
- Day cards keep the existing `- When:` field so `playbook_for` sorts by clock.
- Do not commit unless the user asks.

---

### Task 1: Instructor calendar markdown

**Files:**
- Create: `docs/teaching/psyc4223-fall2026-mwf-concept-calendar.md`

- [ ] Write the calendar from spec §§2–4: how-to at 11:40, semester map, every meeting stub. Pointers: Methods Market class URL + Canvas 2406.

---

### Task 2: Teaching-pack generator + courses.json + cards

**Files:**
- Modify: `$CURSOR_MEMORY/teaching/courses.json` (`psyc-4223.meeting` → `M/W/F 12:00-12:50`)
- Modify: `$CURSOR_MEMORY/teaching/scripts/generate_day_cards.py` `research_methods()`
- Create/replace: `$CURSOR_MEMORY/teaching/days/psyc-4223/*.md`

- [ ] Replace `research_methods()` with one tuple per spec §4 meeting (date, dow, topic, reading, dues, kind `concepts`|`workshop`|`no-class`). `When` is `12:00-12:50` or `no class`. Remove the weekly + extra_dues loops.
- [ ] Run `python scripts/generate_day_cards.py` from the teaching pack.
- [ ] Confirm `days/psyc-4223/2026-08-17.md` has `12:00-12:50` and Ch. 1 concepts; `2026-09-07.md` has Labor Day.

---

### Task 3: pytest for OWUI playbook lookup

**Files:**
- Modify: `$CURSOR_MEMORY/teaching/tests/test_teaching.py`

- [ ] Add tests against the real pack (`Path(__file__).resolve().parent.parent`):
  - `playbook_for("2026-08-17", "psyc-4223", root=pack)` contains `12:00-12:50` and `Methods of knowing`
  - `playbook_for("2026-09-07", "psyc-4223", root=pack)` contains `Labor Day`
  - Combined 2026-08-17 with stats 08:00 card from tmp_path plus RM 12:00 from real pack, or extend `_write_pack` with a 12:00 RM card and assert 08:00 appears before 12:00
- [ ] Run `pytest -q` in the teaching pack.

---

### Task 4: Sync pack into Open WebUI on neu1

- [ ] `git -C $CURSOR_MEMORY pull` then after local teaching edits are on disk: copy pack into the container:

```bash
docker cp ~/cursor-memory/teaching/. open-webui:/app/backend/data/teaching/
```

Use SSH to neu1 (`ProxyJump=neu2` if direct LAN fails). Do not register a new Workspace Tool.

- [ ] Update `$CURSOR_MEMORY/teaching/CONTEXT.md` changelog and `$CURSOR_MEMORY/INDEX.md` teaching row.
