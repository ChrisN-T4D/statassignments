# Pedagogy review: Methods Market + Canvas for PSYC 4223 (Fall 2026) and the RM year

Written 2026-10-23. Companion to `QM-AUDIT-RM-FA26.md` (compliance view); this one asks whether the design fits how people learn research methods. Evidence comes from the Canvas export, the syllabus, and the MM code on branch `rm/semester-timeline`. Theory names are the standard ones; I cite the idea, not page numbers.

## What is already strong

| Practice | Where it shows up |
|---|---|
| **Authentic, project-based task** (situated learning, cognitive apprenticeship) | Capstone: topic to literature review to design to IRB, in groups, with a real audience (IRB) |
| **Scaffolding with fading** (Vygotsky ZPD, Wood/Bruner/Ross) | Study Plan worksheets, Assignment Help by week, four pathway guides, Measures Draft carrying forward the Method Choice answers |
| **Draft, feedback, final cycles** (formative assessment; Hattie and Timperley's "where next?") | Lit review outline, draft 1, final; IRB first draft then final; AI peer review one week after draft 1 |
| **Retrieval practice with immediate corrective feedback** | Concept Review explanations on every item; BKT mastery per objective |
| **Student sees the path** (self-regulated learning: goal, plan, monitor; Zimmerman) | The new year view, week card, WeekContextBar, "Next up" |
| **Trust-based late policy** | Lowers extrinsic pressure, fits self-determination theory (autonomy, competence) |

## Gaps against theory, ranked by learning impact

### 1. No constructive alignment (Biggs) or backward design (Wiggins and McTighe)
Outcomes are not stated per week, per assignment, or in measurable form (QM 2.1 to 2.4 fail for the same reason). Students cannot answer "what will I be able to do after this week?", and Chris cannot show that a 100-point certificate upload measures anything beyond completion.
**Fix:** approve the draft CLOs in `workspace/outcomes/courses/psyc-4223.json`; show 2 to 3 "By the end of this week you can..." lines on the MM week card and on each Assignment Help page, using the objective IDs the Concept Reviews already track. This is the one change both reviews agree on.

### 2. Weekly reading-plus-quiz is completion-graded, not learning-graded
13 Concept Review slips at 10 points each reward uploading a slip. The mastery data is already in MM but Canvas never uses it. Research on testing and retrieval (Roediger and Karpicke) supports low-stakes quizzing, but the benefit comes from retrieval and feedback, which MM supplies; the slip adds friction without adding learning.
**Fix (needs Chris):** keep as is, or let MM mark completion directly. UI side: show "you have retrieved X of Y objectives from earlier weeks" (see 4).

### 3. Reading is sequenced by capstone need, not by concept dependency, with no explicit link back
Chapters arrive as 1, 2, 4, 5, 6, 7, 11, 8, 3, 9, 10, 12, 13. That is a defensible just-in-time order, and the schedule's "Focus" line explains why ("use this vocabulary when you read each article's Method section"). But Ethics (Ch. 3) lands in week 9, after students have already chosen topics and read studies, and the explanation exists only in the syllabus table.
**Fix:** surface that "why this chapter now" sentence on the week card and the reading page (data exists in the Canvas schedule; we need to add it to the MM schedule as `why`). Cheap and high value for transfer.

### 4. Little spacing or interleaving
Each chapter is quizzed once, the week it is read. Spaced and interleaved retrieval (Cepeda; Rohrer) improves retention for exactly this kind of cumulative course (design vocabulary reused in week 9 Method Choice).
**Fix:** a short "Revisit" card at the Method Choice and Measures Draft weeks: 3 to 5 earlier questions chosen from objectives with low BKT mastery. The schedule already has two "Revisit" chapter items; this makes them adaptive.

### 5. Assessment weight and cognitive demand are inverted
Design work (Phase 3, Phase 4, Methods Section: 550 of 2,530 points, 21.7%) carries less than completion tasks (HRT certificates 500, Concept Review 130, attendance 100, syllabus acknowledgement 100: 830 points, 32.8%). IRB Status Update is 400 points for a status report. Students optimise for points (Biggs: assessment drives learning), so the grade signal says "finish the training" more than "design a sound study".
**Fix (Chris decision):** rebalance, e.g. HRT total 100 (pass/complete), Methods Section and Method Choice up, status update down. See `QM-AUDIT` finding 5.

### 6. Feedback timing is unstated
Feedback is the strongest lever in the literature (Hattie), but only if it arrives while the student can act on it. Draft to final gaps are 2 to 3 weeks (lit review) and 1 week (IRB), which is good; the turnaround is not promised anywhere.
**Fix:** state turnaround in the syllabus and on each draft assignment; show "feedback expected by" on the MM week card for draft items.

### 7. Group work without structure (social interdependence; Johnson and Johnson)
Group capstone, but "Rate my group members" is retired and there is no group agreement, role list, or individual accountability beyond the shared document. Free-riding and uneven load are the usual failure.
**Fix:** a 1-page group agreement as a Week 2 assignment (Phase 1 workshop is the natural home), plus a brief mid-term peer evaluation. Needs a Canvas assignment, not MM.

### 8. Worked examples are thin where novices need them
`written-proposal-example` is a joke example about alien skin colour; there is no real exemplar of a good literature review outline, operational definition table, or IRB narrative. Worked examples reduce cognitive load for novices (Sweller; Renkl). Use faded examples: full, then partial, then blank.
**Fix:** one anonymised or authored exemplar per major deliverable, with annotations. 27B can draft authored exemplars; Chris must approve them.

### 9. Cognitive load and navigation in the tools
Two systems (Canvas for submission, MM for help) is the largest extraneous load; that is what the navigation work addresses. Remaining load points: duplicate template pages in Canvas; 61 wiki pages; different names for the same item (Phase 4 / Method Choice).
**Fix:** one name per deliverable everywhere (see QM audit finding 3); one front door in Canvas.

### 10. Universal Design for Learning (UDL)
Representation: text-heavy; no video or audio for current term. Action and expression: everyone writes; there is no choice of format (for example poster or recorded talk for the presentation). Engagement: choice of methodology path is a good UDL feature (four paths).
**Fix:** short screencast per pathway guide with captions; keep the choice of path; optionally allow a recorded presentation.

## UI changes this review recommends (queue for tonight)

| Id | Change | Theory | Needs Chris? |
|---|---|---|---|
| U1 | "By the end of this week you can..." objectives on the week card (from objective ids) | Alignment | Wording from approved CLOs; use existing MM objectives meanwhile |
| U2 | "Why this chapter now" sentence in schedule data, shown on week card and reading page | Transfer, coherence | No (sentences from the syllabus Focus column) |
| U3 | "Feedback expected by" on draft items | Feedback timing | Turnaround days (propose 7) |
| U4 | Revisit card with low-mastery items | Spacing/interleaving | No, but non-trivial; do after U1/U2 |
| U5 | Week context bar on Benchmark practice (Stats) | Self-regulation | No (belongs to Phase 6) |

Canvas-side changes (objectives, group agreement, rubrics, exemplars) go in the repaired package prep (item F).
