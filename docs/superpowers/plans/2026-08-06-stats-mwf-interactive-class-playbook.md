# Stats M/W/F Interactive Class Playbook — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) or subagent-driven-development. Spec: `docs/superpowers/specs/2026-08-06-stats-mwf-interactive-class-playbook-design.md`. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship one instructor markdown playbook so an 8:00–8:50 hybrid Stats class (main room + Zoom satellites) can run Mon Hook / Wed Concept fight / Fri Studio without inventing structure each morning.

**Architecture:** Single playbook file assembled from the approved design: daily operating system (rules, skeleton, hybrid lanes, tools), repertoire cards, semester map, week prompt stubs, and special-day one-pagers. No Canvas or Mentimeter API work.

**Tech Stack:** Markdown in-repo only.

## Global Constraints

- Fall 2026 PSYC 4213 in-person Canvas **2405**; content aligned to online **3177**.
- Meeting pattern: Mon/Wed/Fri **8:00–8:50** (50 min).
- Hybrid: shared Zoom satellites; three lanes (Room / Satellite pair / Solo Zoomer); solo Zoomer is the fallback.
- Rituals only (not 41 unique full scripts); no graded in-class clicker points; no em dashes in new teaching copy if matching syllabus house style.
- Out of scope: Canvas “Class: Mon …” pages, Mentimeter deck authoring inside Mentimeter, graded date changes, RangerNet rooms.

## File structure

| File | Responsibility |
|------|----------------|
| Create: `docs/teaching/psyc4213-fall2026-mwf-interactive-playbook.md` | Instructor playbook (source of truth for class-day moves) |
| Create: `docs/superpowers/plans/2026-08-06-stats-mwf-interactive-class-playbook.md` | This plan |
| Read-only: `docs/superpowers/specs/2026-08-06-stats-mwf-interactive-class-playbook-design.md` | Approved design |

---

### Task 1: Playbook operating system + repertoire cards

**Files:**
- Create: `docs/teaching/psyc4213-fall2026-mwf-interactive-playbook.md`

**Interfaces:**
- Consumes: design §§2–6 (hard rules, skeleton, hybrid, tools, repertoire)
- Produces: playbook sections Quick start, Hard rules, 50-min skeleton, Hybrid lanes, Tool setup checklist, Repertoire cards (each move: when / how / solo path / harvest)

- [ ] **Step 1:** Create `docs/teaching/` and the playbook file with title, course header, and “How to use this at 7:40” (open today’s week stub → pick ritual move → run skeleton).
- [ ] **Step 2:** Copy/expand hard rules, skeleton table, three-lane hybrid table, tool setup checklist, and ritual→tool map from the design (no scope creep).
- [ ] **Step 3:** Write one **repertoire card** per move (Myth bust, Bad headline, Weird data, Would you bet?, Peer instruction, Spot the flaw, Sort the pile, Teach-back, Follow-along build, Bug hunt, Methods Market sprint, Assignment workshop) with: When to use, Steps (≤6), Solo Zoomer path, Harvest (90–120s then 1 local + 1 remote).
- [ ] **Step 4:** Verify file contains “Solo Zoomer” and all 12 move names (grep).
- [ ] **Step 5:** Commit playbook OS + cards (or hold commit until Task 3 if batching).

---

### Task 2: Semester map + week stubs + special-day one-pagers

**Files:**
- Modify: `docs/teaching/psyc4213-fall2026-mwf-interactive-playbook.md`

**Interfaces:**
- Consumes: design §§7–8 and special-day list in §9
- Produces: semester map table; Weeks 1–16 + Finals stub tables; one-pagers for Week 1, Benchmark 1, Benchmark 2, Week 15, Module 8, Benchmark 3

- [ ] **Step 1:** Append semester mapping table from design §7 (including holiday no-meets and built-in fixes).
- [ ] **Step 2:** Append week-by-week prompt stub tables from design §8 (all dates/stubs intact).
- [ ] **Step 3:** Append special-day one-pagers with minute marks:
  - Week 1 kickoff (belonging first, syllabus after energy)
  - Benchmark 1 week (fight / studio / LockDown dry-run)
  - Benchmark 2 week (same shape)
  - Week 15 single Monday (wrap + mini fight + flexible due)
  - Module 8 overview triage (not deep ANOVA)
  - Finals Benchmark 3 (M6–8 only, calm open)
- [ ] **Step 4:** Grep for `Labor Day`, `Fall Break`, `Thanksgiving`, `Modules 6–8` — all present.
- [ ] **Step 5:** Commit.

---

### Task 3: Spec coverage check + commit

**Files:**
- Read-only: design spec + playbook

- [ ] **Step 1:** Confirm design §9 in-scope items 1–6 each appear as headings or tables in the playbook.
- [ ] **Step 2:** Confirm out-of-scope items are listed once under “Not in this playbook.”
- [ ] **Step 3:** Commit plan + playbook if not already committed.

## Spec coverage (self-review)

| Spec section | Task |
|--------------|------|
| Hard rules, skeleton | Task 1 |
| Hybrid playbook | Task 1 |
| Tool stack | Task 1 |
| Repertoire | Task 1 |
| Semester map | Task 2 |
| Prompt stubs | Task 2 |
| Special-day one-pagers | Task 2 |
| Out of scope | Task 3 |

## Execution

User requested **implement** — execute inline in this session (Tasks 1–3), not wait for subagent choice.
