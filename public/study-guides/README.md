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
npm run build:benchmark-study-guides
```

Source copy lives in `src/data/benchmarkStudyGuides.js`. PDFs are built with `scripts/build-benchmark-study-guide-pdfs.mjs`.

## Pull from Canvas (optional)

If study guide PDFs already exist in Canvas course **3177**:

```bash
CANVAS_TOKEN=your-token npm run build:benchmark-study-guides -- --from-canvas
```

When a matching Canvas file is found, it replaces the generated PDF for that benchmark.
