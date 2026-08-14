# Stats Final Benchmark Modules 6–8 — Implementation Plan

> **For agentic workers:** Repo file edits via Ollama handoff (`.ollama-handoff/plan.md`). Live Canvas syllabus edits via BrowserOS (parent agent). Spec: `docs/superpowers/specs/2026-08-06-stats-final-benchmark-modules-6-8-design.md`.

**Goal:** Fall 2026 PSYC 4213 online (3177) and in-person (2405) syllabi state Final Benchmark covers Modules 6–8 only (not comprehensive/cumulative).

**Architecture:** Shared Fall DOCX builder strings + companion markdown/HTML; live Canvas syllabus bodies edited in BrowserOS to match.

**Tech Stack:** Python syllabus builder, markdown/HTML companions, Canvas RCE via BrowserOS.

## Global Constraints

- Fall 2026 only (not Spring builder).
- No em dashes in new syllabus copy.
- Canonical: Modules 6–8 (LSJ Ch. 7–13); not comprehensive; not cumulative final.
- Preserve Online vs In Person modality text on Canvas.

## Tasks

### Task 1: Fall builder wording
Modify `scripts/update-statistics-syllabus-fall2026.py` BENCHMARKS, EVALUATION, TESTING, Final Exam Date string, SCHEDULE_ROWS finals tuple.

### Task 2: Companion docs
Fix schedule.md, practice-links export header + md, schedule-table.html finals cell.

### Task 3: Live Canvas 3177 + 2405
BrowserOS: replace cumulative final prose and schedule finals row/chapters cell.

### Task 4: Verify
Grep repo + BrowserOS content grep both courses.
