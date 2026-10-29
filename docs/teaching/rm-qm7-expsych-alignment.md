# Research Methods / Experimental Design — QM 7th-Ed + Experimental Psychology alignment

**Status:** partial — repo-side work done; Canvas and live Methods Market (MM) checks still open (see "Blocked / needs live access").
**Date:** 2026-10-28 · Origin: OpenClaw card c80712c0 (board methods-market).

## Source limits of this pass

This pass worked only from the repository. These sources were **not** available and nothing below was checked against them:

- QM rubric file `handoffs/qm-higher-education-rubric-seventh-edition-v2.md` (the standards below are cited from the
  published QM Higher Ed 7th Ed. General Standards structure, **not** from that file — re-check wording and numbering against it).
- Experimental Psychology syllabus (lab-library `psyc-4233-syllabus-spring-2026.md`). The only syllabus facts used are the ones in
  the card: proposal-driven; IRB; 12–14 page APA paper; class presentation; Ranger Research Day poster; 600 pts.
- The Canvas RM course (2406) and live MM PocketBase (semester `xsut2ih778ki7md`).

## What the repo showed

- RM modules in the app are **code-defined** (`src/data/modules.js`, `researchMethodsTextbook.js`), not read from the PocketBase `items`
  collection. The card's finding ("modules 1–12 are title shells, zero items") describes the live DB records; the front-end already
  renders Pressbooks chapters (rm-module-1…13 + Lab), Study Plan sections, and Assignment Help from code.
  Whether the DB `modules`/`items` rows matter to students depends on which views read them — confirm before spending effort there.
- Every RM module already had a `learningObjectives` list in code, but they were **topic phrases** ("Heuristics and bias in judgment…",
  "Reliability: forms of reliability…") rather than measurable outcomes.
- The Experimental Design course (`experimental`) contained only Ch. 4, 5, 8, 9, Lab, and Analyze — nothing for the proposal, IRB, APA paper,
  presentation, or poster that drive the course grade.

## Changes made in this pass

| Area | Change | Files |
|------|--------|-------|
| QM SRS 2.2 (module objectives measurable) / 2.3 (clearly stated, learner-centered) | Rewrote all 14 RM module objective lists (Ch. 1–13 + Lab) with observable verbs (distinguish, write, classify, interpret, select…); rewrote the 3 data-analysis module lists the same way | `src/data/researchMethodsTextbook.js`, `src/data/modules.js` |
| QM 2.3 | Objectives now sit under the lead-in "By the end of this module, you will be able to:" | `src/views/ClassHome.vue` |
| Experimental Psychology congruence | New **Proposal, ethics & dissemination** part first in the Experimental course: Ch. 2 (scientific method / proposal structure), Ch. 3 (ethics / IRB), Ch. 11 (APA, presentations, posters). Descriptions re-worded for the experimental course (no "Part 3"/Phase wording). | `src/data/researchMethodsTextbook.js`, `src/data/modules.js` |
| Regression guard | `npm run verify:rm-qm` checks every RM/Experimental module has objectives, none is topic-style, and each is placed in a course part | `scripts/verify-rm-qm-alignment.mjs`, `package.json` |

Deliberately **not** changed: `src/data/objectives.js` (the fine-grained RM*-O* items drive BKT/mastery and concept-review unlock; adding
Lab objectives there would create objectives with no question bank).

## QM 7th-Ed General Standard status (RM course, repo-visible evidence only)

| Std | Topic | Evidence in repo | Status |
|-----|-------|------------------|--------|
| 1 | Course overview & introduction | `canvas-rm-student-getting-started*.md/.html`, course nav descriptions | Needs Canvas check (navigation cues, syllabus policies, prerequisite statement, learner introductions) |
| 2 | Learning objectives | Module-level now measurable. **Course-level objectives not in repo**; no objective-to-assessment map | Module level: done. Course level + 2.4 alignment: open |
| 3 | Assessment & measurement | Assignment snapshots in `scripts/canvas-rm-assignment-snapshots/` (Phase 3/4 worksheets etc.). No rubrics/grading policy in repo | Needs Canvas check (rubrics, grading policy, variety, alignment) |
| 4 | Instructional materials | Pressbooks Jhangiani 4e (CC BY-NC-SA) mapped 1:1 to modules | Likely met; verify purpose-of-materials statements in Canvas |
| 5 | Learning activities & interaction | Concept review, sampling lab, study-plan worksheets, assignment help | Partly met; interaction/communication expectations need Canvas check |
| 6 | Course technology | MM app, jamovi/SPSS/Excel steps | Need tech-requirements and privacy-policy links in Canvas |
| 7 | Learner support | Assignment Help pages | Need support-service links in Canvas |
| 8 | Accessibility & usability | Not auditable from repo (alt text, captions, heading structure, contrast) | Needs Canvas Ally/manual check; MM contrast/keyboard check also open |

## Experimental Psychology deliverable map (from card facts only)

| Deliverable | Where students are supported in MM now | Gap |
|-------------|----------------------------------------|-----|
| Research proposal | Ch. 2 module (new in Experimental course); Study Plan worksheets exist for RM capstone only | No Experimental-course proposal worksheet/Assignment Help |
| IRB | Ch. 3 module (new); RM IRB assignment-help pages exist but are RM-only | Decide whether to expose `rm-irb-*` / HRT help under `experimental` |
| 12–14 page APA paper | Ch. 11 module (new); RM lit-review outline compiler | No paper-length/section checklist for Experimental |
| Class presentation | Ch. 11 objective 3 | No presentation guidance page |
| Ranger Research Day poster | Ch. 11 objective 3 (posters) | No poster template/checklist |
| Analysis (group comparisons) | Analyze-data module fixed to `path-3-experimental` | OK |

## Blocked / needs live access (not done)

1. **Canvas RM course audit** against QM SRS (needs a browser session or course export). Priorities: 1.1–1.4 getting started, 2.1 course-level objectives, 3.x rubrics, 8.x accessibility.
2. **Live MM DB**: the 12 RM module records have no `learning_objectives` and no items. A production write needs Chris's go-ahead (and a backup per Railway notes); first confirm the views that read DB modules/items.
3. **Rubric/syllabus reconciliation**: re-read the QM rubric file and the Exp Psych syllabus; correct standard numbers and point values above.
4. **Course naming**: the card says "PSYC 4213" for RM congruence, but 4213 is Statistics and RM is PSYC 4223 (Exp. Psych syllabus file is named 4233, the card says 4203). Confirm the course codes.
5. `vite build` was not run in this environment (command needed approval); only `node scripts/verify-rm-qm-alignment.mjs` was run.

Nothing was committed or pushed (a push to the tracked branch is a production deploy).
