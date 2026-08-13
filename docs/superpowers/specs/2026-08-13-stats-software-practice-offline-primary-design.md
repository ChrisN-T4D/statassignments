# Design: Stats Software Practice as graded path, with online/offline primary

**Date:** 2026-08-13  
**Scope:** Fall 2026 PSYC 4213 only — Methods Market `/class/statistics` plus Canvas **3177** (online) and **2405** (in-person)  
**Out of scope:** Research Methods; Spring syllabus builder; hosting or auto-grading video inside Methods Market; a second hand-authored workbook

## Problem

Methods Market already has Software Practice (Learn / Practice / Apply, jamovi and other packages) that teaches better than the weekly Canvas jamovi screen-record assignments. Those Canvas assignments are what students actually do, because they are graded. Software Practice is unused. Requiring both would overwork students. Requiring only the live website would lock out students without reliable home internet.

## Goals

1. Make Software Practice the graded software path (I do / we do / you do). Students use it because You do is turned in.
2. Do not stack it on top of the existing weekly Canvas jamovi recordings.
3. Give each student an **online-primary** or **offline-primary** tag that changes Concept Review and Software Practice.
4. Offline-primary students get print packets. Concept Review answers are entered later in one batch. You do is still a recording uploaded to Canvas.
5. Canvas instructions are identical for both modes: what to upload, and that Methods Market is where the work happens.

## Non-goals

- Building a new screen recorder (Tools already records screen, mic, and camera, then downloads a `.webm`).
- Uploading video to Methods Market as the grade (`/api/recordings/upload` is not the student turn-in path).
- Printing correct answers on the student Concept Review packet.
- Auto-grading You do videos.
- Changing PSYC 4223 Research Methods this round.

## Approach

**A (locked):** student-set profile tag, instructor can override on the roster. Online-primary keeps the current interactive UI. Offline-primary leads with printables. One software path: Software Practice replaces weekly Canvas jamovi videos.

---

## 1. Student tag

- New setting on the **claimed roster/profile** (the same record as `student_key`), not localStorage-only: `access_mode` = `online_primary` | `offline_primary`.
- Default: `online_primary`.
- Student can change it on Profile (wifi situation can change).
- Instructor can see and override it on the roster UI.
- Canvas does not store this tag. Canvas only receives files.

**Online primary:** current interactive Concept Review and Software Practice, plus Concept Review slip and required You do recording via existing Tools recorder.

**Offline primary:** each activity leads with **Print packet**. Interactive scoring (Concept Review batch entry) waits until they have a connection.

## 2. Concept Review

**Online primary:** question-by-question with immediate feedback (current). The slip is available after they have submitted an answer for every question in that module at least once.

**Offline primary:**

1. **Print packet:** all questions for that module, numbered, answer blanks. No correct answers on the paper.
2. Later, online: **Enter answers** — one screen, every question, submit once. Score the whole set. Show feedback for every item (right/wrong + existing explanation). Then generate the slip.

The answer key lives only in Methods Market and is applied on batch submit.

**Slip (Canvas deliverable for Concept Review):**

- Title: `PSYC 4213 · Methods Market completion slip`
- Student key (not legal name)
- Activity: Concept Review
- Module number and name
- Score (e.g. 18/24)
- Completed at (date/time)
- Line: `Upload this slip to the matching Canvas assignment`

Print / Save PDF and Copy. Online and offline slips look the same. Regenerating a lost slip reprints the same completion (new print, same data).

**No student key:** they may print and practice. They cannot generate a slip until they claim a key.

## 3. Software Practice (I do / we do / you do)

Replaces weekly Canvas jamovi Exploration / screen-record assignments. Modules 3–8 only (1–2 have no Software Practice).

| Phase | Role | Canvas turn-in |
|---|---|---|
| **I do** (Learn) | Lesson shows the steps | None |
| **We do** (Practice) | Follow along in real software; checkpoints | None |
| **You do** (Apply) | Independent exercises; student records | **The recording only** (no slip) |

One You do recording per module, not per exercise.

**Recording (use what already exists):**

- Online-primary (and any student with a connection): You do tells them to open **Tools → Start Recording** (existing Resources drawer: screen + optional mic/camera), complete the You do exercises, stop, **download** the video.
- Offline-primary without internet: print packet includes the same You do recording prompt; they record with phone or OS recorder while working in jamovi. If they later have a browser on campus, they may use Tools instead.
- After download (or phone recording), they upload **that file** to the Canvas Software Practice assignment. Canvas accepts the Tools `.webm` or a phone `.mp4`.
- Methods Market does not host the grade file. Do not make MM upload the student turn-in.

You do copy (online and print) must say: record these exercises, then upload the video to the Canvas assignment named **Module N: Software Practice**. Phone recording of the screen is allowed if the device cannot use Tools.

**Offline print packet** (one print-view per module, same lesson content as the online view, filtered to preferred software). No separate PDF server: a dedicated print layout and browser Print / Save as PDF (campus lab or any connected computer, then work from paper):

- I do: short read-along (text + essential screenshots). No blanks.
- We do: numbered steps with a checkpoint line under each.
- You do: independent tasks + recording instructions (same prompt as online).

Students keep I do / We do paper. Nothing from those phases is uploaded.

Switching `access_mode` mid-module is allowed. Already-submitted Concept Review answers are kept. Students do not restart the module.

## 4. Canvas (3177 and 2405)

Per module:

- **Module N: Concept Review (Methods Market)** — file upload of the slip. Modules 1–8.
- **Module N: Software Practice (Methods Market)** — file upload of the You do recording. Modules 3–8.

Assignment body, Getting Started, and syllabus use the same wording:

- Do Concept Review in Methods Market. Save or print the slip. Upload the slip here for credit.
- Do Software Practice I do and We do in Methods Market (or the print packet). Record You do with Tools (or phone). Upload the video here for credit. Due dates and points are only in Canvas.

Unpublish or remove the weekly Jamovi Exploration / screen-record assignments so students are not doing two software jobs. Discussions, quizzes, and benchmarks stay.

## 5. Grading weights

Fold the old jamovi recordings into Software Practice so there is still one software path:

- Concept Review (Modules 1–8): **10%** — credit from a valid slip (complete/incomplete; score on the slip is for spot-check).
- Software Practice (Modules 3–8): **20%** — was 5% practice + 15% jamovi videos. Credit from the You do recording. No recording = no credit for that module.
- Quizzes, discussions, benchmarks: unchanged.

No video, no Software Practice credit. No slip, no Concept Review credit.

## 6. Error cases (locked)

- Lost Concept Review slip: reopen the finished module and print again.
- Cannot use Tools recorder: phone recording of the screen; still upload to Canvas. No extra MM path.
- Instructor override of `access_mode` on roster if the student picked the wrong tag.

## Success criteria

- A student tagged offline-primary can complete Concept Review from a printed packet, enter answers in one batch, and upload a slip that looks like the online slip.
- A student tagged online-primary still gets question-by-question Concept Review, then the same slip.
- Software Practice You do uses the existing Tools recorder (or phone); Canvas receives the video; no SP slip.
- Canvas 3177 and 2405 no longer list weekly jamovi screen-record assignments alongside Software Practice.
- Research Methods is untouched.
