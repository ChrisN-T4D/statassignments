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
- A done (guide index + software practice get the bar; Benchmark practice is stats-only, moved into B)
- D done: `QM-AUDIT-RM-FA26.md` (44 standards: 7 met, 19 partial, 15 not met, 3 cannot judge). Biggest: no measurable/module objectives, template pages still published (one holds a Zoom passcode), Canvas/syllabus vs MM disagree on calendar AND chapter order.
- E done: `PEDAGOGY-REVIEW.md`, produced UI queue U1-U5.
- U1+U2 built (objectives block + "why this week" on the week card; `why` text for all 16 fall weeks, drafted by the 27B, I corrected 3 sentences). `src/lib/weekObjectives.js` + 4 tests (27B wrote the tests).
- C done: `scripts/click-count.cjs` (6 student tasks, runs as the test student). First run found two real bugs, both fixed:
  1. `selectClass` only matched by id, class pages pass the slug, so a student arriving by slug (the single-course skip) had no class items in the Menu, including "I'm stuck".
  2. Landing URL carried `?module=rm-module-4`; on reload the page jumped to Week 4 ("Earlier week") instead of this week. Week + semester now live in the URL and win when the module is in that week.
  After the fixes all 6 tasks pass within budget (0,1,1,1,2,2 clicks).
- Review pipeline finding: `local-code-review` bundle does NOT work as shipped. `review.sh` fails ("no valid LLM endpoint") because OpenCodeReview wants `OCR_LLM_*` or a config, not `OPENAI_*`; also the container needs git `safe.directory`, and the broker has no `/v1/messages` so the provider must be a custom `openai` protocol one. `ocr llm test` passes with that config. I used a wrapper in the session scratchpad; the fix for the bundle is listed in the morning summary.
