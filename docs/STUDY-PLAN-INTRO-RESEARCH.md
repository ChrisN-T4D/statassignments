# Study Plan for Intro to Research (PSYC 5033)

Added 2026-10-26. Intro to Research reuses the Research Methods Study Plan worksheets because its flow is now the same: read widely, narrow the question, then design a study that is never carried out.

## Where the settings live
`src/data/studyPlanClasses.js` is the one place that says which classes have a Study Plan, which sections each shows (and in what order), the section wording, the minimum number of articles, and whether the Research Methods Canvas links show. `capstoneWorksheetSchemas.js` has `studyPlanSectionsFor(classId)` and `getStudyPlanSection(sectionId, classId)`. Section ids are shared across classes, so saved drafts, walkthroughs, and export code are shared too. Drafts save per class in the browser (`study-plan-capstone:<classId>:<userId>`).

## Intro to Research sections
| Section id | Shown as | Canvas assignment | Week |
|---|---|---|---|
| `article-review` | Annotated Bibliography (5 to 7 source cards, no project title / problem statement / early question) | Annotated Bibliography | 4 |
| `theory-selection` (new) | Theory Selection: 16-theory menu with example questions, 3 candidates, a choice, a justification | Theory Selection | 4 |
| `study-focus` | Lit Review Outline; a button copies the chosen theory into the Organizing framework | Literature Review Outline | 5 |
| `phase-4` | Method Choice (four pathways), no Phase 3 / elevator speech wording | Method Choice and Measures | 9 |
| `measures-draft` | Measures | Method Choice and Measures | 9 |

Research Methods keeps `article-review`, `study-focus`, `phase-4`, `measures-draft` exactly as before (`theory-selection` has `onlyFor: ['intro-research']`).

## Wiring
- Router: `study-plan` routes are allowed for any class with a Study Plan (`hasStudyPlan`).
- Schedule: `introResearchSchedule.js` weeks 4, 5 and 9 carry `kind: 'study-plan'` items; `studyPlanDue(sectionId, today, classSlug)` reads the class's own schedule.
- Assignment Help: `studyPlanSection` on `ir-annotated-bibliography`, `ir-theory-selection`, `ir-lit-outline`, `ir-method-choice`.
- Export: `buildExportText(sectionId, project, classId)`; for `intro-research` the annotated bibliography export is just the source cards.
- Canvas: the 5033 package (`build_5033_v3.py`) links each of those assignments and week pages to the worksheet.

## Not done
- Methods Section template, sample paragraphs, ethics cases and the IRB/ethics writing guide are still Canvas pages; they could become guide pages or worksheets later.
- No Canvas assignment URLs exist for the Spring shell yet, so the Canvas links inside the worksheets are hidden for this class.
- Tests: `tests/studyPlanClasses.test.mjs`.
