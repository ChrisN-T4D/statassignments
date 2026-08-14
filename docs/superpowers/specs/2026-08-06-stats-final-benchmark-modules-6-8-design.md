# Design: Stats Fall 2026 final benchmark = Modules 6–8 (not comprehensive)

**Date:** 2026-08-06  
**Scope:** Fall 2026 PSYC 4213 only — online Canvas **3177** and in-person Canvas **2405**  
**Out of scope:** Spring 2026 syllabus builder; Research Methods; LockDown vs in-class split for in-person Testing; assignment-group weight fixes; Blackboard link cleanup (noted only)

## Problem

Students must be told the Final Benchmark / Benchmark 3 is **not** a comprehensive/cumulative exam. It covers **Modules 6–8** (LSJ Chapters 7–13).

Live Canvas syllabi on both 3177 and 2405 still say:

- Benchmarks prose: “Benchmark 3 (cumulative final) during finals week”
- Schedule finals row: “Final Exam — Benchmark 3 (Proctored, cumulative)”
- Chapters cell: “Cumulative / Ch. 1–13”

The Fall DOCX builder (`scripts/update-statistics-syllabus-fall2026.py`) already uses Modules 6–8 in most places, but companion docs still say “cumulative,” and live Canvas was never refreshed from that builder.

## Goals

1. Make **Modules 6–8 only (not comprehensive / not cumulative)** explicit everywhere Fall students see syllabus language.
2. Align **online and in-person** Fall sources (shared builder + both Canvas syllabus bodies).
3. Fix leftover companion-doc mismatches that still say cumulative or wrong module ranges.

## Non-goals

- Changing Spring builder cumulative language.
- Changing in-person Testing to “in class only” (setup doc vs shared LockDown Testing text remains a known discrepancy).
- Fixing Canvas “Course assignments are not weighted,” duplicate Final Benchmark due dates, or Blackboard URLs in Testing (report only unless follow-up requested).

## Canonical wording

Use consistently (no em dashes):

- **Coverage:** Modules 6–8 (LSJ Chapters 7–13). Not comprehensive; does not cover Modules 1–5.
- **Schedule finals row (example):** `Benchmark 3 / Final Exam (Proctored; Modules 6–8 only, not comprehensive; Ch. 7–13)`
- **Chapters cell:** `Ch. 7–13`
- **Benchmarks / Evaluation bullets:** Benchmark 3 / Final Exam (Modules 6–8, Ch. 7–13) — not a comprehensive final.
- **Final Exam Date line:** Include Modules 6–8 only (not comprehensive) plus Dec 7–11, 2026 and proctoring note.

Remove or replace any phrase: `cumulative`, `comprehensive final`, `Cumulative / Ch. 1–13`, `cumulative final`.

## Approach

Surgical Fall sync (approved):

1. **Repo Fall builder** — Harden explicit “not comprehensive / Modules 6–8 only” in `BENCHMARKS`, `EVALUATION_AND_GRADING`, `TESTING` / Final Exam Date replacement, and `SCHEDULE_ROWS` finals entry. Regenerate online + `--in-person` DOCX.
2. **Companion docs** — Fix `scripts/canvas-statistics-syllabus-schedule.md` policy quote; fix `scripts/export-canvas-statistics-practice-links.mjs` header `1–3, 4–6, 7–8` → `1–3, 4–5, 6–8` and regenerate `scripts/canvas-statistics-practice-links.md` if needed; align `scripts/canvas-statistics-syllabus-schedule-table.html` finals wording if it differs.
3. **Live Canvas (BrowserOS)** — Edit syllabus HTML on courses **3177** and **2405**: replace cumulative Benchmarks prose and schedule finals row/chapter cell with canonical Modules 6–8 wording. Preserve Course Modality (Online vs In Person) and other modality-specific text.

## Files to touch

| File | Action |
|------|--------|
| `scripts/update-statistics-syllabus-fall2026.py` | Edit shared Fall strings; regen both DOCX |
| `scripts/canvas-statistics-syllabus-schedule.md` | Remove “cumulative final” |
| `scripts/export-canvas-statistics-practice-links.mjs` | Fix benchmarks header |
| `scripts/canvas-statistics-practice-links.md` | Regenerate / align |
| `scripts/canvas-statistics-syllabus-schedule-table.html` | Align finals cell if needed |
| Canvas 3177 syllabus body | BrowserOS edit |
| Canvas 2405 syllabus body | BrowserOS edit |

## Verification

- Grep Fall builder + companion docs: no `cumulative` / `comprehensive final` referring to Benchmark 3.
- BrowserOS content grep on both syllabus pages: Modules 6–8 present; cumulative final gone.
- Online modality still Online; in-person still In Person.
- DOCX outputs saved for online and in-person Fall 2026.

## Known discrepancies (do not fix in this change)

- In-person setup doc says in-class benchmarks; Fall Testing section still lists LockDown for both modalities.
- Live Testing sections still link to nwosu.edu/blackboard.
- Canvas sidebar: “Course assignments are not weighted” despite syllabus category weights.
- Online course summary shows multiple Final Benchmark items / due dates (Dec 11 vs Dec 13).
