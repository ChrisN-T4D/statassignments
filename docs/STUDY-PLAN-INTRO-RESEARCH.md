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
| `question-hypotheses` (new, guided) | Research Question and Hypotheses: problem, question, hypotheses or guiding questions, rationale; copies the gap and working question from the outline | Research Question and Hypotheses | 7 |
| `recruitment-consent` (new, both classes) | Recruitment and Consent: scripts for spoken asks, fliers and social posts (with builders), social media protocol, informed consent builder, facility consent builder, survey checks, IRB packet checklist | Methods Section appendices | 11 |
| `ethics-plan` (new, guided, both classes) | Ethics and Consent Plan: risks, confidentiality, informed consent with the IRB sentence frames, the ethics cases, the questions the IRB asks | Ethics and Consent Plan | 11 |
| `methods-section` (new, guided, both classes) | Methods Section: design, participants, recruitment, instruments, procedures, with the template and sample paragraphs; copy buttons pull from Recruitment and Consent and Method Choice | Methods Section | 11 |
| `analysis-plan` (new, guided) | Analysis Plan: hypotheses and variables, a test for each, assumptions, a mock APA table | Analysis Plan | 12 |

Research Methods keeps `article-review`, `study-focus`, `phase-4`, `measures-draft` exactly as before, and gains `recruitment-consent`, `ethics-plan` and `methods-section` in its IRB and Methods weeks (Fall weeks 11 and 12). `theory-selection`, `question-hypotheses` and `analysis-plan` have `onlyFor: ['intro-research']`.

## Guided worksheets and the IRB packet
`src/data/guidedWorksheets.js` holds four worksheets as data (blocks of fields, reference panels, copy-from buttons); `GuidedWorksheetSection.vue` draws them all. Reference panels reuse the course's Canvas guides (methods template and sample paragraphs, the IRB/ethics writing guide and sentence frames, the three ethics cases). `capstoneRecruitmentConsentWorksheet.js` is built from the NWOSU IRB Application Template (revised 8-7-2025): its consent and facility-consent builders use the template's wording, the social post builder follows the template's required elements (description, IRB approval date, NWOSU student researcher, link, contacts for researcher and advisor, eligibility), and email solicitation is flagged as no longer allowed. The Study Plan hub shows an IRB packet checklist for any class that has `recruitment-consent`; Measures has a survey callout. If the IRB template changes, update the builders and the `RC_META.source` line.

## Wiring
- Router: `study-plan` routes are allowed for any class with a Study Plan (`hasStudyPlan`).
- Schedule: `introResearchSchedule.js` weeks 4, 5 and 9 carry `kind: 'study-plan'` items; `studyPlanDue(sectionId, today, classSlug)` reads the class's own schedule.
- Assignment Help: `studyPlanSection` on `ir-annotated-bibliography`, `ir-theory-selection`, `ir-lit-outline`, `ir-method-choice`.
- Export: `buildExportText(sectionId, project, classId)`; for `intro-research` the annotated bibliography export is just the source cards.
- Canvas: the 5033 package (`build_5033_v3.py`) links each of those assignments and week pages to the worksheet.

## Not done
- No Canvas assignment URLs exist for the Spring shell yet, so the Canvas links inside the worksheets are hidden for this class.
- Tests: `tests/studyPlanClasses.test.mjs`.
