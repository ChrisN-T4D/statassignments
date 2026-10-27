# Accessibility status and manual test checklist

Updated 2026-10-26. Tracked on the dashboard (card c700a4ca6).

## Done (automated, in code)
- Chapter tables: `<caption>` on all, `scope` on all `<th>`.
- Chapter headings: skipped levels fixed with `aria-level` (visuals unchanged).
- External links: `rel="noopener noreferrer"`.
- App shell: skip-to-content link, visible keyboard focus, reduced-motion support.
- Contrast: `--text-muted` and `--primary-text` tokens meet 4.5:1 in both themes (verified by calculation, not by an audit tool).
- Click-to-expand rows are keyboard operable (`role="button"`, Enter/Space, `aria-expanded`); modals have `role="dialog"`; icon-only buttons and unlabeled form controls have `aria-label`.

## Not done
- Modals (5) now trap focus, close on Escape and return focus (`v-dialog-focus`, src/lib/dialogFocus.js); not yet tested in a browser.
- Captions and transcripts: no videos yet. Every video needs both before it ships (see `public/videos/README.md`).
- Downloadable PDFs and docx files: use real headings, alt text, and a set document language; export tagged PDFs.
- UDL: "Ways to Learn Here" section added to the About page (multiple ways to engage with content, show knowledge, stay engaged). Per-module wording still not written.
- Charts and plots drawn in the app: give each a text summary.

## Manual test (needs a person)
Test with NVDA or VoiceOver on Chrome or Safari, keyboard only (no mouse):
1. Sign in; reach the course page using Tab only. Skip link works.
2. Open a chapter; list headings (NVDA: H key); outline makes sense.
3. Read one table; caption and column headers are announced.
4. Do one practice question of each type (multiple choice, fill blank, matching); every control is announced with a name.
5. Open and close each modal with the keyboard; focus returns where it started.
6. Zoom to 200%; no content is cut off.
7. Switch between dark and light themes; text stays readable.
