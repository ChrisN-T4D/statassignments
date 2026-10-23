# Student navigation plan

Audit date: 2026-10-22. Scope: every student-facing page in Methods Market, checked on the dev site as a logged-in user.

## The principle

A student should always know:

1. **What they need to do now** (this week's reading, review, deliverable, and when it is due).
2. **Where to go next** (one obvious next step, never a dead end).
3. **How to get there in few clicks** (anything they need is at most two clicks from where they are).
4. **Where to get help** (on every page, and specifically on assignments).

## What exists today

| Piece | Status |
|---|---|
| Research Methods year view (timeline, week card, Prev/Next, All weeks, Chapter library) | Built, uncommitted on `rm/semester-timeline` |
| `RmPathBar` on chapter reading and Concept Review (back to week, steps, next up, help) | Built, same branch |
| Analysis panel appears only in the weeks that list it | Built |
| `?semester=` / `?week=` / `?from=` links so pages can point back to a week | Built |

## Audit findings

Each finding says what a student runs into, and where.

### A. "What do I do now?" is only answered on the class page

1. **Home** is a course picker. A returning student has to pick the course before seeing anything about this week. There is no "continue" card.
2. **Assignment Help index** is a 44-link list ordered by course part and chapter. The 13 "Chapter N Concept Review" rows come first. Nothing says which assignment is this week's.
3. **Study Plan hub and sections** show due dates as fixed text ("Due week 4", "Due week 11") from `capstoneWorksheetSchemas.js`. These are a second source of truth next to the schedule, so they can disagree with the timeline. Nothing highlights the section due now.
4. **Study Plan section** pages are very long (Article Review is about 7,900 px tall) with no sticky progress or "what's left" summary.
5. **Profile** is titled "Your Progress" but shows only account and password settings (and says "introductory statistics"). Progress is not on it.

### B. "Where next?" is missing outside reading and Concept Review

1. Every other page has a generic Back link: "← Back to course" (Study Plan, Assignment Help, guides) or "← Assignment Help" (assignment detail). All of them **drop the week**: the student lands on the class page's current week, not the week they came from.
2. **Assignment Help detail, Study Plan sections, software lessons, Benchmark practice** have no "Next up". After finishing, the student must work out what is next themselves.
3. **Software lessons** have a bare "Back" link and no connection to the week or assignment that needs them.

### C. Clicks

1. Home to this week's tasks is 1 click (course card). From any deep page it is 2 (Menu, then class), or 1 via the path bar only on reading and review pages.
2. Resources (Assignment Help, Study Plan, Jamovi/Excel guides) appear in three places: the class page row, the Menu, and the floating Tools drawer. They differ in wording and order.
3. A dead route: `/class/:id/topics` renders the Home page.

### D. Help

1. Assignment Help **detail** pages are good: "Stuck? Get help", chapter links, tips. They are one of the few places that answer the question.
2. Help is absent or buried on Study Plan sections, software lessons, guides, and the Profile page.
3. The only visible "contact" on Home is "Professors using this platform: contact support". There is no student-facing "who do I ask, and when" (office hours, email, discussion board).
4. "Report an issue" exists in the Menu but is framed for bugs, not for "I am stuck on this assignment".

### E. Coverage

The timeline and path bar exist only for the Research Methods sequence. Statistics and Intro to Research still use the old module-list class page with no weeks.

## Plan

Each phase is shippable on its own. Effort is rough (S under half a day, M about a day, L 2-3 days).

### Phase 1 - One "you are here" bar on every Research Methods page (M) - DONE 2026-10-22 except the two items listed below

Generalise `RmPathBar` into a `WeekContextBar` that works for any item, not only chapters.

- Accept a target (chapter, assignment-help id, study-plan section id, software lesson id) and find its week in the schedule, preferring the `?from=` week.
- Show: back to your week, the week's steps with the current one highlighted, one **Next up**, one **Need help?**.
- Mount on: Assignment Help detail, Study Plan hub and sections, software lessons, Benchmark practice, Jamovi/Excel guide indexes.
- Replace the generic "← Back to course" links with "← Week N" where a week is known.
- Teach the week card to add `?from=` to every link it generates (reading and review already do).

Done when: from any Research Methods page a student can get back to their week and see their next step without using the browser Back button.

### Phase 2 - Make the schedule the single source of truth (M) - DONE 2026-10-22

- Remove the hard-coded `dueNote` strings; render due dates from `researchMethodsSchedule.js`.
- Study Plan hub: highlight the section(s) due this week, show the due date, show "not started / in progress / done".
- Study Plan section: sticky header with progress ("3 of 6 articles") and the due date.
- Add the "Analyze your data" item to any other weeks where students need the analysis tools.

Done when: changing a due date in one file changes it everywhere.

### Phase 3 - "Today" entry points (S-M) - DONE 2026-10-23 (code; not yet checked in the browser)

- Home: a signed-in student with **one course goes straight to it** (decided). A student with several courses sees a **Continue** card ("Week 10: Measures draft - due Fri Oct 23, next up: ...") above the course picker.
- Class page and Menu: a **This week** shortcut that jumps the timeline back to the current week after browsing.
- Remove or redirect the dead `/class/:id/topics` route.
- Rename Profile's heading to match its content and link "Your progress" to a real summary (chapters read, reviews done, items done this week), or drop the claim.

Done when: opening the site as a student shows this week's task and next step without a click.

### Phase 4 - Assignment Help organised by week (M) - PARTLY DONE 2026-10-23 (This week / Next week panels from the schedule; the 14 Concept Reviews are folded; not yet: week/due on every card, Study Plan started status)

- Assignment Help index: **This week** group at the top (from the schedule), then the rest by week, with the 13 chapter Concept Reviews collapsed under one heading.
- Each assignment card shows the week, due date, and whether the Study Plan section is started.
- Keep the existing detail-page content.

Done when: a student who opens Assignment Help sees their current assignment first.

### Phase 5 - A help ladder: FAQ, then professor, then peers (M + L)

Decided order for a stuck student: **1. self-serve FAQ / Stuck? page, 2. email the professor, 3. a discussion board where other students can help.** Every page's "Need help?" link opens the ladder with that page's context.

**5a. Stuck? page and professor email (M)**
- One **Stuck?** page per course, reached from every "Need help?" link. Top to bottom: search/FAQ for this assignment or chapter, then "Still stuck? Email your professor", then "Ask the class" (the board, once it exists).
- FAQ entries are tied to assignments, chapters and software steps, so the page opens pre-filtered to wherever the student came from (reuse the existing "Stuck? Get help" content on Assignment Help detail pages as the first FAQ entries).
- The email button is a prefilled `mailto:` carrying course, week, assignment and page so the professor sees the context. No new backend.
- Reword "Report an issue" into two paths: "I'm stuck" (this ladder) and "Something is broken" (the current form).

**5b. Discussion board (L)**
- New feature: threads per assignment/chapter, replies, "mark as helpful/answered", instructor badge, simple moderation (hide/delete), notifications optional.
- Needs a backend table and API (FastAPI/Postgres) and decisions below. Interim option: link to a Canvas discussion for each assignment until 5b ships, so the ladder is complete on day one.
- Decisions: anonymous or named posts; can students see each other's drafts (academic integrity); who moderates; is it per-semester.

Done when: from any page a stuck student reaches the FAQ in one click, can email the professor with context in two, and (after 5b) can ask peers in two.

### Phase 6 - Statistics and Intro to Research: semester view (L)

Decided: these are single-semester classes, so they get a **semester view only** (timeline, week card, All weeks, Chapter library) with no Fall/Spring toggle. Research Methods keeps the year view.

- Generalise the schedule data and components from `researchMethods*` to `course*`, keyed by class slug; the Fall/Spring toggle appears only when a class has more than one schedule.
- Build schedules for Statistics (4213) and Intro to Research (5033) from the instructor's plans.
- Retire each course's old module-list-first layout as its schedule lands, after checking that every module is reachable from a week or the Chapter library (as was done for Research Methods).

### Phase 7 - Verify with students, not just code (S, repeating)

- Add a script that measures **clicks to task** for these student tasks, run after each phase:
  1. See what is due this week.
  2. Start the reading for this week.
  3. Find help for this week's assignment.
  4. Finish a Concept Review and know what is next.
  5. Return to the week after using a guide.
  6. Find the course FAQ and instructor contact.
- Run it as a non-admin student account (admin views differ).
- Have two or three real students attempt the six tasks cold and note where they hesitate.

**Phase 2 status:** the hard-coded `dueNote` strings are gone; `capstoneWorksheetSchemas.js` keeps only a `submitNote` (how to submit). Due dates come from `studyPlanDue()` / `formatStudyPlanDue()` in `researchMethodsSchedule.js` (tests in `tests/studyPlanDue.test.mjs`). The Study Plan hub has a "Due this week" banner, highlights those cards and says "Canvas has the official due dates"; each section page has a sticky header with its due date and progress. Progress text moved to `src/lib/studyPlanProgress.js` so both pages share it. Not done: adding the "analyze your data" item to more weeks (add one schedule line per week when wanted).

**Naming mismatches found in Phase 2 (need Chris to confirm which is right):**
1. Study Plan section `phase-3` is "Phase 3: Elevator Speech" (distill the lit review), but the schedule calls its week "Method choice (Phase 3)", due the week of Oct 12.
2. ~~Article selection vs Article Review~~ Resolved (Chris): the schedule item and milestone are now "Article Review", matching the Study Plan section and Assignment Help.
3. ~~Phase 3 and Phase 4 both said "Submit with Phase N in Canvas"~~ Resolved (Chris): each item is anchored in the week it is due; the cross-references were removed and both now say "Submit in Canvas."

**Phase 1 status:** `WeekContextBar.vue` (generalised from the reading/review bar) is mounted on chapter reading, Concept Review, Assignment Help index and detail, Study Plan hub and sections, and Research Methods software lessons. Helpers `itemMatches`, `findTargetWeek`, `parseWeekRef`, `weekRef` live in `researchMethodsSchedule.js` with 9 tests in `tests/researchMethodsSchedule.test.mjs` (`node --test tests/researchMethodsSchedule.test.mjs`). The week card adds `?from=` to every link. Old "Back to course" links were kept as a safety net outside the school year.
Not yet done: Benchmark practice and the Jamovi/Excel guide index pages do not have the bar; the old generic Back links are still shown beside it.

## Fall week-by-week content check (2026-10-22)

"Phase N" is retired vocabulary. Each fall week was compared across the schedule, the Study Plan and Assignment Help. Decisions by Chris are applied; what is left is listed after the table.

| Week | Schedule | Study Plan section | Assignment Help | Status |
|---|---|---|---|---|
| 1 | Syllabus acknowledgment | - | Syllabus Acknowledgement | OK |
| 2 | Choose groups; Topic workshop | - | How to Choose Groups; **Topic Workshop** (was Phase 1 Workshop) | Fixed |
| 3 | **Article Review** (Sep 4; was "Article selection") | Article Review, including the problem statement and early research questions | Article Review and Problem Statement | Fixed. Problem statement stays with Article Review |
| 4 | Theory selection (Sep 11) | - | **Theory Selection** (new help page) | Fixed. Deliverable: a one-page paper on what the student understands about their theory and why it applies to their topic |
| 5 | Lit review outline (Sep 18) | Lit Review Outline | - | OK |
| 6 | Lit review draft 1 | - | Literature Review Draft 1 | OK |
| 7 | AI peer review arrives | - | - | OK |
| 8 | Lit review final (+ optional sampling lab) | - | Literature Review Final / References | OK |
| 9 | **Method choice** (week of Oct 12) | **Method Choice** (compare four pathways, choose one; was Phase 4) | **Method Choice Worksheet (Pathway Comparison)** + four path guides | Fixed |
| 10 | **Measures draft** (Oct 23) | **Measures Draft** (new; builds on Method Choice) | **Measures Draft** (new help page) | Fixed |
| 11 | IRB first draft | - | IRB First Draft for Feedback; HRT lessons 1-3 | OK |
| 12 | Methods section | - | Methods Section | OK |
| 13 | IRB submission | - | IRB Final Draft for IRB | OK (schedule says "submission", help says "final draft"; pick one) |
| 14 | IRB processing log | - | - | OK |
| 16 | IRB status update | - | IRB Status Update and Detailed Plan | OK |

**Resolved 2026-10-22 (Chris)**
1. **Measures Draft (week 10)** now flows from Method Choice: the Study Plan section carries in the chosen pathway and the IV and DV operational definitions, then asks for the survey, protocol, observation plan or data plan that matches the pathway (fields in `capstoneMeasuresDraftWorksheet.js`). Export and progress are wired; the help page is `rm-measures-draft`.
2. **Elevator Speech** is "not super necessary right now": it is retired (`retired: true`), hidden from the Study Plan hub and the Assignment Help index, and still opens by direct link. The lit review final tip no longer points to it.

**Still open**
1. **Study Plan ids** (`phase-3`, `phase-4`) still appear in URLs and saved data. Titles are renamed; the ids are kept so existing links and saved drafts keep working.
2. **Remaining "Phase N" wording** (about 60 mentions) sits inside the worksheet bodies and walkthroughs (`Phase4Section.vue`, `LitReviewOutlineSection.vue`, `capstonePhase*.js`) and in Canvas-vocabulary labels in `researchMethodsCourseNav.js` and `researchMethodsTextbook.js` (`canvasPhases` keys). They are left alone: some are matching keys, and the worksheets need a content pass with the instructor.

## Suggested order

Phase 1, then 2 (they depend on each other and fix the worst gaps), then 3 and 4, then 5a (Stuck? page and email), then 5b (board) and 6. Phase 7 runs alongside all of them.

## Decisions (2026-10-22)

1. **Help**: FAQ / Stuck? page first, then email the professor, then a student discussion board (Phase 5). Posts are **named**, not anonymous.
2. **Home**: a student with one course skips the course picker (Phase 3).
3. **Statistics and Intro to Research**: semester view only, no year toggle (Phase 6).
4. **Classic module view**: retired for Research Methods. Done: every module is reachable from a week or the Chapter library. The optional sampling lab (`rm-module-lab`) now sits in the Oct 5 week, right before Methods and measures starts; `rm-module-analyze-data` is only a legacy alias of the data-by-path module.

5. **Due dates**: Canvas stays the official source; the timeline is guidance.

## Still open

1. Discussion board: draft sharing between students and who moderates (Phase 5b). Posts are named.

## Known bug found during the audit

`src/components/ExperimentalSamplingSimulation.vue` uses `assignmentPool` but never declares it, so the lab's assignment tab throws "assignmentPool is not defined". It is in committed code (HEAD), not part of this work. The lab was previously reachable only through the old module list.
