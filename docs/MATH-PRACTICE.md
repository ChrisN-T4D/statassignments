# Math Practice (Statistics Module 0)

Route `/class/:classId/math-practice` (`src/views/MathPractice.vue`). Replaces Concept Review for Module 0
(`/class/:classId/practice?module=stats-module-0` redirects here). Written 2026-10-25.

## What a student does
1. Reads the Module 0 pages (algebra only; statistics notation is introduced in the modules that use it).
2. Practices each of 7 topics (objectives M0-O1..O7) with generated questions, typed answers, a symbol keypad and an in-page calculator.
3. A topic is **practice-mastered** when BKT `pL >= 0.9` AND the last 3 answers were correct (`lib/mathPractice/session.js`).
4. Practice mastery unlocks that topic's **Mastery Check**: 5 timed questions, no worked steps until the end, pass = 4 of 5, retry after 10 minutes (opening a check counts as an attempt).
5. The "road to mastery" bar counts 14 steps (7 practice + 7 checks).

## Files
- `src/lib/mathPractice/grade.js` lenient grader (no eval): 6, x = 6, 3/4, .75, 75%, 2^3, 2³, √25, 1.2E-4, "1,200".
- `src/lib/mathPractice/generators.js` question banks per objective and level (easy/medium/hard), `generateQuestion`, `generateCheck`.
- `src/lib/mathPractice/graphs.js` SVG bar chart, scatterplot, histogram.
- `src/lib/mathPractice/session.js` mastery rule, evidence quality, check scoring.
- `src/composables/useMathPractice.js` BKT update + `practice_attempts` rows; streaks and check state live in localStorage (per user).
- `tests/mathPractice.test.mjs`: 13 tests incl. 5,250 generated questions whose answers are re-derived independently.

## AI-use handling (cannot be eliminated on a student's own device)
- Paste is blocked; a paste attempt, leaving the page during a question, or an answer faster than 2 s is **weak evidence**: a correct answer is sent to BKT as an easy item (high guess rate) and does not extend the streak. The student is not told they were flagged.
- Typed answers use the "hard" BKT tier (low guess rate); multiple choice uses "medium".
- Mastery Check flags per answer: `paste`, `left-page`, `inserted-text` (many characters, few input events), `instant-start` (first key < 0.8 s), `timed-out`. Two or more flagged answers on a passed check = state `unverified` (counts for the student, flagged for a spot check). Voice dictation can trigger `inserted-text`; one flag never matters.
- Instructor view: `practice_attempts.source` is `math_practice`, `math_mastery_check`, or `math_mastery_check|paste,left-page`. Filter with `source ~ "math_mastery_check"`.
- Badge state (`practice` / `unverified` / `confirmed`) is recorded on the server in `awards` (see Badges). Check retry timers are still browser-only.
- No camera or lockdown is used. Safe Exam Browser would be the real lockdown if a proctored version is ever wanted.

## Badges (server-side)
- Profile page shows a badge case: 7 topic slots plus a larger module badge ("Math Ready"); the practice page shows a compact copy. Students see `unverified` and `confirmed` the same way (Mastered, gold); locked slots are dashed, practice-mastered is bronze.
- Table `awards` (migration `backend/alembic/versions/010_awards.py`, model `Award`). Students cannot create or edit awards through the generic collections API (403). They call `POST /api/awards/claim {award_id}` and the server checks the evidence (`backend/api/awards.py`, catalog in `backend/lib/awards_catalog.py`); `GET /api/awards/mine` lists their own.
- Evidence: topic badge = BKT `pL >= 0.9` on the objective AND at least 3 correct `math_practice` attempts; upgraded when the latest 5 `math_mastery_check*` attempts are five distinct questions inside 30 minutes with at least 4 correct (`confirmed`, or `unverified` if two or more answers carry a warning flag other than `timed-out`). Module badge = all 7 topics checked (state `confirmed` only if all 7 are). Badges never downgrade; a later failed check does not remove one.
- Instructors and admins can list every student's awards through `/api/collections/awards/records` (students only see their own). `unverified` is the spot-check list; nothing yet lets an instructor mark one confirmed.
- Frontend: `src/data/badges.js` (sets), `src/components/BadgeCase.vue`, `src/composables/useAwards.js`, `pb.send()` in `src/lib/pocketbase.js`.
- Backend tests: `docker run --rm -v ~/statassignments/backend:/app -w /app <backend image> python -m pytest -q` (45 pass).

## Concept Review changes (2026-10-25, Statistics and Research Methods share the code)
- An objective is satisfied only with a clean streak: the last `STREAK_NEEDED` (3) answers on it correct (all of them for a bank of fewer than 3), plus the old test (BKT 0.9 with at least 2 correct, or every mapped item correct). Weak answers and immediate retries of a missed question are neutral for the streak; a wrong answer resets it (`src/lib/conceptReviewUnlock.js`).
- The review is complete when every eligible objective is satisfied. Answering the whole bank no longer completes it unless the module has no eligible objectives. Missed or unclean items come back (never the question just asked).
- Weak answers (too fast for the question's length, page in the background 8 s or more, or a retry) still count as answered, but go to BKT as an easy item with `source = concept_review|<reasons>` (`src/lib/answerEvidence.js`).
- Answer history is saved with the completion record (`history`) and rebuilt from the server's attempts on a new device. Records saved before this change are grandfathered: answered questions count as clean.
- The paper-packet path (offline-primary, batch entry) is unchanged.
- Deploy: this changes rules for current Fall 2026 RM students with reviews in progress; frozen slips stay frozen.
