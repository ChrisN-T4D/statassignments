# Spring 2027: Statistics (PSYC 4213) and Intro to Research (PSYC 5033) against QM 7th edition and pedagogy

Written 2026-10-24. Companion to `QM-AUDIT-RM-FA26.md` and `PEDAGOGY-REVIEW.md` (Research Methods). Instructor self-review, not an official QM review. Ratings: **Met / Likely met / At risk / Not met / Cannot judge**.

## What I reviewed

| Course | Canvas evidence | Methods Market |
|---|---|---|
| Statistics, online section (Z086, Canvas 3861) | `psyc-4213-sp27-draft-fixed.imscc` (NOVA's package repaired 2026-10-20) and the standalone syllabus docx | `statistics` class; new week-by-week schedule (`src/data/statisticsSchedule.js`) |
| Statistics, in-person sections (Canvas 4490) | **No SP27 in-person package exists.** The FA26 in-person syllabus table uses the same 8 modules and 16 weeks | same class and same schedule |
| Intro to Research (5033) | `psyc-5033-sp27-draft.imscc` and the 2026-10-20 pre-review in `workspace/plans/psyc-5033-sp27/qm-7th-prereview.md` (not repeated here) | `intro-research` class; new schedule (`src/data/introResearchSchedule.js`) |

Decision (Chris, 2026-10-23): Statistics has an online and an in-person version. They share one MM schedule (same modules, same weeks); due dates stay in each Canvas course, so the MM schedule shows none for Statistics.

## Statistics (online package)

### Findings that matter most

1. **The repaired `.imscc` carries a stale syllabus attachment.** The standalone syllabus docx has the right calendar (Jan 11, MLK Jan 18, break Mar 15 to 19, finals May 3 to 6) and the late-work decision (accepted with a reason), but the copy inside the package (`web_resources/Psych 4213 ... Syllabus.docx`) still says classes begin Jan 12, MLK Jan 19, break Mar 16 to 20, finals May 5 to 8, "Late assignments are not accepted", and still contains the "(draft) 15% Discussions removed, weights pending" note. Importing the package as it stands would give students the old syllabus. Replace the attachment before any import.
2. **Learner-to-learner interaction is gone (QM 5.2 Essential, 5.4).** The 15% Discussions category was removed and the docx tells students to email questions. An asynchronous online course now has no student-to-student activity and says nothing about interaction requirements. Either restore a light Q&A board or state plainly that no learner interaction is required (QM 5.4), and add one interaction opportunity (5.2).
3. **No privacy statement (6.4) and no vendor accessibility statements (8.7).** Respondus LockDown Browser with webcam and Methods Market both collect student data.
4. **Objectives are mostly there.** The docx lists course-level objectives and 6 of 8 modules have objective pages; Module 1 and Module 7 have none. The draft outcomes tree (S1 to S8) differs in wording from the docx list, so there are two objective sets to reconcile (Chris has not approved S1 to S8; RM's R1 to R9 are approved).
5. **Benchmarks are empty in the package** (0 questions). 3.1 depends on them.
6. **Housekeeping:** 46 of the 84 page files have a numbered twin (`...-2.html`); 8 of 15 images lack alt text; 2 of 4 tables lack header cells; quiz banks still mention jamovi while the syllabus teaches SPSS; item titles carry FA26 week numbers ("Week 11 Part A" is due in week 12).
7. **SPSS vs jamovi.** The syllabus and Canvas moved to SPSS; MM Concept Review objectives are software-neutral but Software Practice lessons are still jamovi (`outcomes/courses/psyc-4213.json` note). Students will read SPSS in Canvas and practice jamovi in MM until the SPSS lessons are finished.

### Standard by standard

| # | Rating | Evidence | Fix |
|---|---|---|---|
| 1.1 | Likely met | Getting Started module; syllabus; Module 1 has "Getting Started on Methods Market" | Add a numbered "Start Here" list on the front page |
| 1.2 | Likely met | Course Overview page (3,137 characters) and syllabus explain the weekly rhythm | |
| 1.3 | Likely met | Etiquette Expectations page; response time stated (24 h weekdays, 48 h weekends) | Mark confirmed |
| 1.4 | At risk | Policies are in the syllabus, but the packaged docx is stale (late work, calendar) | Replace attachment |
| 1.5 | Likely met | Minimum Technical Requirements page; SPSS license named | Page is 432 characters: add how to obtain SPSS |
| 1.6 | Met | Syllabus states expected skills (Canvas, installing software, recording your screen) | |
| 1.7 | Met | Algebra and graphs prerequisite stated; math refresher offered | |
| 1.8 | At risk | Contact Me page; instructor video marked "[CONFIRM: record video]" in the draft | Record a 2-minute welcome or rewrite the page warmly |
| 1.9 | Likely met | Introductions assignment (100 pts, in the 0% group) | Confirm points |
| 2.1 | Met | Course-level objectives in the docx are measurable | Reconcile with S1 to S8 |
| 2.2 | At risk | 6 of 8 modules have objective pages; Module 1 and 7 do not | Generated week headers (`canvas-prep-stats-sp27/02-week-headers.html`) fill all weeks |
| 2.3 | Likely met | In syllabus and module pages | Add a Course Objectives page |
| 2.4 | At risk | Stated in prose, no table | Generated alignment table (`01-course-objectives.html`) once S1 to S8 are approved |
| 2.5 | Met | Undergraduate statistics, level-appropriate | |
| 3.1 | At risk | Benchmarks have 0 questions in the package | Build benchmark banks mapped to objectives |
| 3.2 | At risk | Grading stated (benchmarks 50, assignments 50), but the packaged docx still shows the draft note | Replace attachment |
| 3.3 | Likely met | 5 rubrics in the package; syllabus says each assignment has criteria | Check each rubric is attached |
| 3.4 | Met | Benchmarks, SPSS assignments, screen recordings, quizzes, Concept Review | |
| 3.5 | Likely met | Weekly work, 3 benchmarks, immediate MM feedback | State feedback turnaround |
| 3.6 | Met | AI policy page; integrity reminders in assessments | |
| 4.1 | Met | Free SPSS tutorial text, datasets, MM | |
| 4.2 | Likely met | Readings pages per module | Some are stubs ("Readings for Module 6", 92 characters) |
| 4.3 | At risk | Textbook is open; datasets and slides carry no source line | Add sources |
| 4.4 | Likely met | Current SPSS textbook; SP27 build | |
| 4.5 | Likely met | Text, slides, datasets, interactive practice | Instructor videos are mentioned but not in the package |
| 5.1 | Met | Module sequence builds | |
| 5.2 | At risk | Essential. No learner-learner activity | See finding 2 |
| 5.3 | Met | Essential. Weekly announcements, 24/48 h replies, office hours by appointment | |
| 5.4 | Not met | Interaction requirements not stated | State them |
| 6.1 | Met | Canvas, MM, SPSS, Respondus support the objectives | |
| 6.2 | Met | Concept Review, Software Practice | |
| 6.3 | Met | | |
| 6.4 | Not met | No privacy statement for Respondus Monitor or MM | Add (drafted in the RM prep, adapt) |
| 7.1 | Met | Canvas Help, SPSS docs, MM help linked | Verify numbers |
| 7.2 | Met | ADA section with campus contacts | Verify names |
| 7.3 | At risk | Essential. Library link; tutoring is "contact Student Services or your advisor" | Name a tutoring or writing center and link it |
| 7.4 | Met | Student Services linked | |
| 8.1 | At risk | 16 modules plus Getting Started; numbered page twins | Remove twins |
| 8.2 | Likely met | No small-font spans | Visual check |
| 8.3 | Cannot judge | 2 of 4 tables lack header cells; 4 PDFs and 10 slide decks untagged-status unknown | Run the accessibility checker |
| 8.4 | At risk | 8 of 15 images lack alt text | Add alt text |
| 8.5 | Cannot judge | No video in the package | If you add instructor videos, caption them |
| 8.6 | Cannot judge | | |
| 8.7 | Not met | No vendor accessibility statements | Link Canvas, Respondus, SPSS, MM |

Essential (3-point) standards at risk: 2.2, 2.4, 3.1, 3.2, 5.2, 7.3, 8.1, and 8.3 is unchecked. The package is much closer to QM than the RM course was, because NOVA built it against the rubric.

## Intro to Research (5033)

The 2026-10-20 pre-review stands (68% if only met and likely-met items count; 88% once the at-risk ones are fixed). Checked against the new MM schedule:

- The syllabus table and the MM schedule agree on every week and due date (both come from `psyc-5033-sp27-syllabus-DRAFT.md`).
- **Chapter placement is mine, not yours.** The syllabus lists each week's focus but not which reading goes with it; I proposed the chapter-to-week mapping in `introResearchSchedule.js` (for example Ch. 3 Ethics in the ethics week, Ch. 12 and 13 with the analysis plan). Please check it.
- QM 4.2 ("explain how materials relate to assignments") is better supported now: each MM week shows the reading, the assignment help page and a one-line why.
- Still open from the pre-review: rubrics (3.3), learner support links (7.3, 7.4), accessibility (8.2 to 8.4, 8.7), privacy (6.4). The generated welcome, tech and privacy pages for RM can be reused with the 5033 contact details.

## Pedagogy across the three courses

Everything in `PEDAGOGY-REVIEW.md` for RM still applies. What differs:

| Theme | Research Methods | Statistics | Intro to Research |
|---|---|---|---|
| Constructive alignment | Approved CLOs, now on the week card | Draft S1 to S8 not yet approved; weekly objectives already exist per module | Strongest: 8 objectives on every week and assignment |
| Retrieval and spacing | Concept Review per chapter; adaptive refresher on the week card | Concept Review per module plus Software Practice; benchmarks give a built-in spaced test; the refresher card works for Statistics too | Concept Review reuses RM chapters; benchmarks are midterm and final only |
| Feedback timing | AI peer review of Draft 1; IRB first draft then final | Benchmarks are proctored, so feedback is immediate only in MM practice; no stated turnaround on SPSS assignments | Weekly scaffolded drafts; feedback time on the welcome page only (10 to 14 days), not in the syllabus |
| Interaction | Group capstone (no group agreement) | **None** after discussions were removed | Peer review workshop and roundtable (planned, not documented as activities) |
| Cognitive load | Two systems (Canvas and MM); naming drift | Two software environments (SPSS in Canvas, jamovi in MM) | Two systems; shared RM chapters add reading load for a graduate course |
| Worked examples | Missing exemplars | Datasets and instructions; no worked SPSS output exemplar | Templates exist; exemplar proposals would help |

Recommended order of work for Chris: fix the stale syllabus attachment first, because it is the only item that would reach students wrongly; then decide on learner interaction in Statistics; then approve S1 to S8; then rubrics and benchmarks.

## What I changed in code for this

Statistics and Intro to Research now have the same week-by-week page as Research Methods: timeline, week card with "why this week" and objectives, context bar on reading, practice, software and help pages, chapter library, and the adaptive refresher. Online and in-person Statistics share one schedule. Verified in the dev site as a test student enrolled in both courses. No due dates appear for Statistics because the sections differ; Intro to Research shows the syllabus dates (Canvas stays official).

## Decisions and changes, 2026-10-24

- **S1 to S8 approved by Chris.** The syllabus objectives (docx and Canvas syllabus page) now use them in place of the older six-bullet list.
- **Learner interaction (5.2, 5.4):** Introductions is the only required interaction; the Methods Market class forum is optional and not graded. Both are stated in the syllabus under Communication and Interaction.
- **Feedback turnaround:** 7 to 10 days for graded work (Statistics and Intro to Research).
- **Learner support (7.3):** Academic Services; there are no tutors. The syllabus names Academic Services without a link. Add its URL when known.
- **Stale syllabus attachment fixed** in `psyc-4213-sp27-draft-fixed-v2.imscc` (also updated: Canvas syllabus page text and the Course Overview "email me first" line). The v1 package is untouched. The standalone docx with the same edits is `durable/syllabus/... - v2 S1-S8.docx`.
- **To do (Chris):** record the welcome video. **To build:** SPSS Software Practice lessons, deeper and modeled on the weekly assignments.
