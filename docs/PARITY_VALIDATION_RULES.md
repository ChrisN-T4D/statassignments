# Software Parity Validation Rules

This defines pass/fail checks for software-practice and concept-review parity.

## Practice parity

- Universe: rows in `statisticsExercises` with:
  - `practiceObjectiveKey` present
- `menu_navigation` rows are included if keyed (policy handling is enforced in UI for non-jamovi lessons).
- Expected software set per actionable key: `jamovi`, `r`, `spss`, `excel`, `stata`.
- A key passes when every missing software is explicitly listed in `scripts/software-parity-exceptions.json`.
- A key fails when one or more expected softwares are missing and not exempted.
- Exception rationale is documented in [`docs/PARITY_EXCEPTIONS.md`](docs/PARITY_EXCEPTIONS.md).

## Concept parity

- `conceptQuestionSoftware.js` is the source of per-software answer overrides.
- Any concept item with software-specific syntax/file-format semantics should be patched explicitly (not just label-swapped).
- Backlog detection heuristic:
  - search for software-sensitive tokens (e.g., `jamovi`, `logical operator`, `LN(`, `.omv`),
  - compare against IDs in `CONCEPT_QUESTION_SOFTWARE_PATCHES`,
  - unpatched matches are reported as candidates.

## Validation tooling

- Run:
  - `node scripts/verify-practice-parity.mjs`
- Outputs:
  - `docs/PARITY_REPORT.md` (objective matrix + concept patch backlog)
- Exit status:
  - non-zero if actionable practice parity failures exist.
