# Content sources and licenses

Last updated 2026-10-26. Public summary: About page, "Credits and Licensing". Root `NOTICE` has the short form.

## Source register

| Source | License | Where used | Credit line |
|---|---|---|---|
| Navarro and Foxcroft, *Learning Statistics with jamovi* | CC BY-SA 4.0 | Statistics chapters, Modules 3-8, all five software tracks | `<div class="attribution">` at the end of each page, or the "software-adaptation-note" at the top of non-jamovi tracks |
| Jhangiani, Chiang, Cuttler and Leighton, *Research Methods in Psychology* 4e | CC BY-NC-SA 4.0 | `rm-chapter-*` pages | "This content is copied from..." line |
| xkcd (Randall Munroe) | CC BY-NC 2.5 | A few `rm-chapter-*` pages | Caption on each comic |
| Written for this course | Chris (Methods Market author) | Module 0, Module 3 interface chapters (`data-entry`, `variable-types`, `screen-recording-tutorial`), practice questions, sample data | Where present: "written for this course" |

## Rules when adding or editing a page

1. Adapted from Navarro/Foxcroft: keep the `attribution` div with the CC BY-SA 4.0 link. Say it was modified.
2. Copied from the RM textbook: keep the CC BY-NC-SA 4.0 line. Do not use this text in anything sold or commercial.
3. Third-party images or comics: record creator, license and source URL in the caption.
4. New original page: add a one-line "written for this course" credit, or none and list it here.
5. A combined work that includes BY-SA material must be offered under BY-SA. BY-NC-SA material cannot be mixed into BY-SA-only pages.

## Open items

- Source text: copyright stays with the named authors (confirmed by Chris 2026-10-26). Material written only for this course (Module 0, interface guides, practice questions, sample data) is held by Chris (confirmed 2026-10-26); add the full legal name to `NOTICE`.
- Check whether the SPSS/R/Excel/Stata adaptation notes should also name the exact Navarro/Foxcroft edition and chapter.
- `public/` audit (2026-10-28, from file names, headers and git history only; no reverse image search):
  - xkcd: used only as text lines ("retrieved from ... CC-BY-NC 2.5") in `rm-chapter-5/7/12/13`; no comic image files are in the repo. Credit and license are present. Stays fine while the site is free to students.
  - Lesson/self-check screenshots (50 PNGs under `public/images`) are of jamovi and SPSS windows; assumed captured by Chris. Confirm none came from the textbooks.
  - Software icons (`jamovi-icon.png`, `SPSS-icon.png`, `r-icon.png`, `rstudio-icon.png`, `excel-icon.png`, `stata-icon.png`): product logos used to name the software. Trademarks belong to their owners; consider a one-line note on the About page.
  - Data files: `bmi_and_exercise.csv`, `Normality data.csv`, `module4sampledata.csv`, `Final Benchmark Data.csv` look made for the course. **Provenance unknown, ask Chris:** `personality_data.csv` (778 rows with ethnicity) and `cleanedWide.Sample2.open.access.csv` (survey data with a REDCap-style layout). If either is a published open dataset, add its citation and license here and in the lesson that uses it.
  - `logo_gif.gif`, `under-construction.gif`: source unknown; under-construction.gif should be removed before launch if it is not shown to students.
