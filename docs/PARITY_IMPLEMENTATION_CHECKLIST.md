# Parity Implementation Checklist

Exact file-change checklist for cross-software practice/concept parity.

## Practice data + behavior

- [x] [`src/data/statisticsPractices.js`](src/data/statisticsPractices.js)
  - Added missing Module 3 equivalents for keys:
    - `m3-environment-ready` (jamovi instructional row)
    - `m3-computed-column` (jamovi, SPSS, Stata instructional rows)
    - `m3-save-or-export` (jamovi instructional row + R/SPSS/Excel save/export rows)
- [x] [`src/views/ClassHome.vue`](src/views/ClassHome.vue)
  - Included `software_type: 'conceptual'` in todo filtering so software-agnostic tasks appear on all tracks.
- [x] [`src/views/SoftwarePractice.vue`](src/views/SoftwarePractice.vue)
  - Included `software_type: 'conceptual'` in all static exercise filters (class/module/topic/default).
- [x] [`src/views/Profile.vue`](src/views/Profile.vue)
  - Included `software_type: 'conceptual'` in module progress todo filtering.

## Concept patches

- [x] [`src/data/conceptQuestionSoftware.js`](src/data/conceptQuestionSoftware.js)
  - Added per-software patches for:
    - `stats-m3-q2`
    - `stats-m3-q3`
    - `stats-m3-q8`
    - `stats-m5-q19`
    - `stats-m5-q23`
    - `stats-m5-q24`
    - `stats-m5-q28`
    - `stats-m5-q30`
  - Existing patches retained:
    - `stats-m3-q5`
    - `stats-m5-q25`

## Mapping + validation tooling

- [x] [`scripts/build-software-equivalency-map.mjs`](scripts/build-software-equivalency-map.mjs)
  - Generates objective-by-software matrix from keyed practice rows.
- [x] [`docs/SOFTWARE_EQUIVALENCY_MAP.md`](docs/SOFTWARE_EQUIVALENCY_MAP.md)
  - Generated source-of-truth matrix keyed by `practiceObjectiveKey`.
- [x] [`scripts/build-concept-software-classification.mjs`](scripts/build-concept-software-classification.mjs)
  - Classifies all concept IDs into `agnostic`, `label-swap`, `needs-patch`.
- [x] [`docs/CONCEPT_SOFTWARE_CLASSIFICATION.md`](docs/CONCEPT_SOFTWARE_CLASSIFICATION.md)
  - Generated concept classification and backlog.
- [x] [`scripts/verify-practice-parity.mjs`](scripts/verify-practice-parity.mjs)
  - Enforces parity checks and outputs `docs/PARITY_REPORT.md`.
- [x] [`scripts/software-parity-exceptions.json`](scripts/software-parity-exceptions.json)
  - Documents intentional exceptions for non-actionable conceptual objectives.
- [x] [`docs/PARITY_VALIDATION_RULES.md`](docs/PARITY_VALIDATION_RULES.md)
  - Defines acceptance criteria and verification method.
- [x] [`docs/PARITY_REPORT.md`](docs/PARITY_REPORT.md)
  - Generated pass/fail parity status.

## Regeneration commands

- `node scripts/build-software-equivalency-map.mjs`
- `node scripts/build-concept-software-classification.mjs`
- `node scripts/verify-practice-parity.mjs`
