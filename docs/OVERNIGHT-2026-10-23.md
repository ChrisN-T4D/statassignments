# Overnight run 2026-10-23 (Claude orchestrates, 27B drafts, reviews gate each item)

Branch: `rm/semester-timeline` (local only; NOTHING is pushed or deployed; push = production).

## Method per item
1. Plan (this file) -> 2. 27B drafts bounded pieces (`ask27b`) -> 3. I review/fix and run tests ->
4. OpenCodeReview on the diff (`local-code-review/review.sh`, 27B-backed) + my own security pass
   (no dedicated security-scan container exists; only `local-code-review-ocr` and `pragent/pr-agent`) ->
5. commit on branch -> 6. log below.

## Queue (no Chris decision needed)
- [ ] A. Nav Phase 1 leftovers: WeekContextBar on Benchmark practice + Jamovi/Excel guide indexes
- [ ] B. Nav Phase 6: Statistics (4213) + Intro (5033) semester view
- [ ] C. Nav Phase 7: click-count script as student
- [ ] D. QM 7th ed audit of extracted RM Fall 2026 Canvas course (`~/openclaw-deploy/tmp/rmbuild/pkg`) -> `docs/QM-AUDIT-RM-FA26.md`
- [ ] E. Pedagogy comparison (alignment, feedback cadence, scaffolding, UDL) of MM + Canvas RM -> `docs/PEDAGOGY-REVIEW.md`
- [ ] F. Canvas prep: repaired copy of RM pages (not imported) per audit
- [ ] G. Phase N wording sweep, safe subset only

## Needs Chris (not touched)
Push/deploy, Canvas import go/no-go, 15% grading reallocation, 5b board moderation, dev-setup files.

## Log
