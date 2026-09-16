# Benchmark study guides (PDF)

Student-facing study guides for each Statistics benchmark. Download links on Class Home and Assignment Help point here.

| File | Benchmark |
|------|-----------|
| `benchmark-1-study-guide.pdf` | Modules 1–3 |
| `benchmark-2-study-guide.pdf` | Modules 4–5 |
| `final-benchmark-study-guide.pdf` | Modules 6–8 (not comprehensive) |

## Regenerate

From repo root:

```bash
# Preferred: export from Canvas wiki pages (Playwright MCP on neu1, logged-in profile)
npm run fetch:benchmark-study-guides-canvas

# Fallback: generate from src/data/benchmarkStudyGuides.js
npm run build:benchmark-study-guides
```

Source copy for generated/final guide: `src/data/benchmarkStudyGuides.js`.

Canvas wiki pages used when available (course **3177**):

| PDF | Canvas page slug |
|-----|------------------|
| `benchmark-1-study-guide.pdf` | `study-guide` |
| `benchmark-2-study-guide.pdf` | `benchmark-2-study-guide` |
| `final-benchmark-study-guide.pdf` | *(no Canvas page — generated)* |

## Optional Canvas file API pull

If study guide PDFs are uploaded as course **files** instead of wiki pages:

```bash
CANVAS_TOKEN=your-token npm run build:benchmark-study-guides -- --from-canvas
```
