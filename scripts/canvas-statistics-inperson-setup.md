# PSYC 4213 Statistics — copy online shell → in-person

**Source (online, Fall 2026):** Canvas course **3177**  
**Destination:** Canvas course **2405** (multi-section in-person Fall 2026)

Methods Market URLs are **the same** for both sections (`/class/statistics/...`). Only Canvas course IDs differ.

---

## 1. Find the in-person course ID

```powershell
$env:CANVAS_TOKEN = 'your-token'   # Account → Settings → New Access Token
node scripts/list-canvas-statistics-courses.mjs
```

Pick the unpublished / in-person shell (not **3177**). Set it in the repo once you know it:

```js
// src/data/statisticsCanvasLinks.js
export const CANVAS_STATISTICS_INPERSON_COURSE_ID = 12345
```

---

## 2. Copy the online course (automated)

```powershell
node scripts/copy-canvas-statistics-to-inperson.mjs --dest=12345
```

This copies from **3177** → destination:

- Modules, pages, assignments, quizzes, discussions, syllabus body, rubrics, navigation  
- **Not** copied: calendar dates, announcements, course-level settings (so you can set in-person term dates separately)

Re-run with `--overwrite` if you need to refresh an earlier copy.

**Manual alternative:** Destination course → **Settings → Import Course Content** → **Copy a Canvas Course** → search **3177** → import all components.

---

## 3. After copy — in-person tweaks (checklist)

### Course settings

| Item | Online (3177) | In-person shell |
|------|---------------|-----------------|
| Course name | PSYC 4213 Statistics Online | PSYC 4213 Statistics (In Person) or your section label |
| Time zone | Central | Central |
| Start / end dates | Fall 2026 term | Same Fall dates |
| Home page | Modules | Modules |

### Syllabus

Online and in-person Canvas syllabi match except **Course Modality**, **Meeting Times and Location**, and **Class Attendance**.

1. Regenerate docx if needed:
   - Online: `python scripts/update-statistics-syllabus-fall2026.py`
   - In-person: `python scripts/update-statistics-syllabus-fall2026.py --in-person`
2. Paste syllabus schedule table from `canvas-statistics-syllabus-schedule-table.html` (same weekly plan as online).
3. Final exam window: Dec 7–11, 2026 (same LockDown wording on both syllabi for this shell).

### Benchmarks

| Benchmark | Online | In-person |
|-----------|--------|-----------|
| 1, 2, Final | LockDown Browser + webcam | **Same:** LockDown Browser + webcam (not unproctored in-class) |
| QTI quizzes | Same zips from `scripts/output/` | Re-import only if quizzes missing after copy |

Keep the LockDown + Webcam student instruction pages (same as online). Do not replace them with unproctored in-class exam pages.

In-person students still take Benchmarks 1, 2, and the Final in Canvas with **Respondus LockDown Browser + Webcam** on the syllabus dates. Bring a charged laptop with jamovi installed if the exam needs software work; Methods Market practice links remain optional study tools.

### Methods Market assignments

No change — same links as online (`scripts/canvas-statistics-practice-links.md`). Both sections use slug `statistics`.

### Discussions

Keep the same prompts; in-person students may post after class or from home.

### Publish

1. Spot-check Module 1 → Benchmark 1 module chain.  
2. Publish modules top-to-bottom when ready.  
3. Confirm **Quizzes** navigation is enabled if benchmarks are New Quizzes.

---

## 4. If benchmarks are missing after copy

Regenerate and import QTI (same as online):

```bash
npm run export:canvas-benchmark-1
npm run export:canvas-benchmark-2
npm run export:canvas-final-benchmark
```

Import into the **in-person** course: Settings → Import Course Content → QTI zip.

See:

- `canvas-statistics-benchmark-1-quiz.md`
- `canvas-statistics-benchmark-2-quiz.md`
- `canvas-statistics-final-benchmark-quiz.md`

---

## 5. Quick links

| Section | Canvas |
|---------|--------|
| Online (source) | https://nwosu.instructure.com/courses/3177 |
| In-person (multi-section) | https://nwosu.instructure.com/courses/2405 |
