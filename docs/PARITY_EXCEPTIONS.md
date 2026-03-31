# Practice Parity Exceptions

This file explains why some `practiceObjectiveKey` values are allowed to miss one or more software rows in `scripts/software-parity-exceptions.json`.

## Exception categories

- **Software-specific feature objective**: objective is intentionally tied to one package's unique UI/tooling.
  - Example: `m3-open-data-file` is a jamovi-only menu-navigation check.
- **Conceptual written objective**: no software action required; one shared conceptual row is sufficient.
  - Examples: multiple `m7-*` and `m8-*` concept/written keys in the exception map.
- **Metadata-only objective**: objective represents a package-specific metadata affordance not mirrored in all tools.
  - Example: `m3-variable-metadata` currently authored only for SPSS.

## Maintenance rule

When adding an exception key:

1. Add the key under `allowedMissingSoftwareByKey` in `scripts/software-parity-exceptions.json`.
2. Ensure the key exists in `src/data/statisticsPractices.js`.
3. Add a one-line rationale in this file.
