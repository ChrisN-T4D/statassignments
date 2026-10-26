# Canvas packages and related files: shared inventory (started 2026-10-26)

One list so NOVA (this workspace) and Claude Code (repo `~/statassignments`) work from the same files. Update the "Current?" column whenever a file is superseded.
Paths are on the host; NOVA sees this folder as `/home/node/.openclaw/workspace-nova-agent/durable/canvas-packages/`. Nothing here has been imported into Canvas unless a row says so.

## Course packages (.imscc)
| File | Course | Dates in it | Current? | Notes |
|---|---|---|---|---|
| `psyc-4213-sp27-rebuild/psyc-4213-sp27-draft-fixed-v2.imscc` | PSYC 4213 Statistics, SP27 online (Z086) | SP27, old week order (Oct 20 re-date) | **YES, working copy** (Oct 24) | README.md in that folder lists open questions. Needs re-dating to the new week order (Module 1 wk2, Modules 3 and 4 one week). Output of that step goes in the same folder as `-v3`. |
| `psyc-4213-sp27-rebuild/psyc-4213-sp27-draft-fixed.imscc`, `-repaired.imscc` | same | older steps | superseded | keep for rollback only |
| `sp27-online-3861-draft.imscc` | same | FA26 dates, EMPTY modules | **DO NOT USE** | NOVA's original draft with the clean_meta bug |
| `sp27-work/working.imscc` | same | intermediate | superseded | scratch from the first build |
| `fa26-2405-export.imscc` | PSYC 4213 FA26 in-person (course 2405) | Aug-Dec 2026 | source/reference | base for the SP27 rebuild; also copied at `~/openclaw-deploy/tmp/sp27-rebuild/fa26-2405.imscc` (duplicate, 1.5 GB) |
| `rm-4223-fa26-2406-export.imscc` | PSYC 4223 Research Methods FA26 (course 2406) | Fall 2026 | source/reference | also `~/openclaw-deploy/tmp/rmbuild/course-2406-export.imscc` (duplicate) |
| `rm-sp27-work/rm-sp27-draft.imscc` | **PSYC 4223 Research Methods, FALL 2026 content** (course title still "Fall 2026 Research Methodology", 4223-E927 etc.) | Aug-Dec 2026 | **NOT a 4233 / Spring package** | 16 modules (9 live: 0 Start here ... 6 Processing & status; 7 `[retired]` empties), 33 graded items, 14 Concept Review (Methods Market) chapters. Opened 2026-10-26. Despite the name, it is the Fall RM course (also the source for the 4223 FA27 rebuild). |
| `psyc-5033-sp26-export/psyc-5033-sp26-export.imscc` | PSYC 5033 SP26 (another instructor's) | Jan-Apr 2026 | reference only | see its own INVENTORY.md (do not ship recordings or the other instructor's material) |
| `psyc-5033-sp27-work/psyc-5033-sp27-draft.imscc` | PSYC 5033 Intro to Research, SP27 draft (title "Spring 2027 Introduction to Research (PSYC 5033)") | **Spring 2027 dated** (Jan 17 to May 4) | **YES, 5033 working draft** (Oct 20) | Opened 2026-10-26: 23 modules (Week 1-15 + resource modules), 16 dated graded items (Midterm Exam and Final Exam UNPUBLISHED), Attendance 100. Assignment group weights are all 0 (needs the syllabus grading split). No Methods Market links yet. See its REVIEW.md and RESOURCE_MAP.md. |
| `sp27-canvas-exports/spring-2027-statistics-online.imscc` | **Spring 2027 Statistics, online (PSYC-4213-Z086)** | none | EMPTY Canvas shell (Oct 26) | 1 module "Online Course Information" (9 pages + Respondus practice exam), 1 group "Assignments" at 0. Target for the `psyc-4213-sp27-rebuild` package. |
| `sp27-canvas-exports/spring-2027-statistics-in-person.imscc` | **Spring 2027 Statistics, in-person (PSYC-4213-E929, A022, W063, X080)** | none | EMPTY shell (4 KB) | Course settings only: no modules, pages, or assignments. In-person needs its own package (the v2 draft is online-only, section Z086). |
| `sp27-canvas-exports/spring-2027-experimental-psychology.imscc` | **Spring 2027 Experimental Psychology (PSYC-4233-E931, A023, W065, X078)** | none | EMPTY shell (4 KB) | No content; the 4233 syllabus draft is not in Canvas. |
| `sp27-canvas-exports/spring-2027-introduction-to-research.imscc` | **Spring 2027 Introduction to Research (PSYC-5033-E940, A024, W067, X076)** | none | EMPTY shell (4 KB) | The 5033 draft in `psyc-5033-sp27-work/` has no section codes in its title; set them to match this shell before import. |
| `sp27-canvas-exports/spring-2027-psychology-of-adjustment.imscc` | Spring 2027 Psychology of Adjustment (PSYC-2113-Z102) | none | EMPTY shell (same template as Statistics online) | Not a course this project is rebuilding; listed so nobody mistakes it for one. |

## Statistics SP27 source files
| Where | What | Owner of edits |
|---|---|---|
| `~/statassignments/src/data/statisticsSchedule.js` | **Week-by-week schedule (source of truth for weeks and order)**. Canvas follows Methods Market (decided 2026-10-23). Changed 2026-10-26: Math refresher wk1, Module 1 wk2, Modules 3 and 4 one week each, Benchmarks unchanged. | Claude Code / Chris |
| `~/statassignments/docs/teaching/canvas-prep-stats-sp27/01-course-objectives.html`, `02-week-headers.html` | Canvas page HTML (week headers updated 2026-10-26 to the new order) | Claude Code |
| `.../canvas-prep-stats-sp27/03-proposed-due-dates.csv` | Proposed Sunday 11:59 pm CT due dates by item | Claude Code, Chris to confirm |
| `durable/syllabus/Psych 4213 ... Spring 2027 (Online) Syllabus - v2 S1-S8.docx` and `build.py` | SP27 online syllabus (v2 is the later file; the unsuffixed docx is older). The syllabus calendar and benchmark text should be re-checked against the new week order. | NOVA / Chris |
| `workspace-nova-agent/Psych 4213 - Neu - Statistics - Spring 2027 (Online) Syllabus.docx`, `SP27 In-Person - MWF Class Plans.docx`, `SP27 Online - Weekly Video Schedule.docx` | older copies / plans in the workspace root (Oct 14-19). The Weekly Video Schedule and MWF plans follow the OLD week order. | NOVA / Chris |
| `handoffs/psyc-4213-spring-2027-handoff-nova.md`, `psyc-4213-spring-2027-syllabus-draft.md` | earlier handoff notes | NOVA |
| `durable/psyc-4233-sp27/` | PSYC 4233 SP27 syllabus draft and handoff | NOVA / Claude Code |

## Rules so we stay in one space
1. New or changed Canvas packages go in `durable/canvas-packages/<course>-rebuild/` and get a row here. No copies under `/tmp` or `openclaw-deploy/tmp` except working files, and say so in the row.
2. The schedule lives in `statisticsSchedule.js`. If the week order changes, update that file first, then regenerate the CSV and the week headers, then re-date the package.
3. Originals are never edited in place; each step writes a new file (`-v3`, ...).
4. Importing into Canvas is Chris's step.
