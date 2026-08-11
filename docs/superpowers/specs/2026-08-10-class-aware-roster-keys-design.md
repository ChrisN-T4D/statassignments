# Design: Class-aware roster keys

**Date:** 2026-08-10  
**Status:** Approved  
**App:** Methods Market (`statassignments`)

## Problem

Roster keys are semester-scoped only. Claiming a key does not assign Research Methods vs Statistics (`user.classes`). Instructors import separate Canvas CSVs per course and need keys tied to the correct class.

## Decision

Store `class_id` on each roster row. Detect class from the **CSV filename**, show it in the import preview with a dropdown override (required before create). On claim, add that class to `user.classes` without removing others.

## Behavior

### Import
1. Instructor selects semester + uploads Canvas CSV.
2. Filename is normalized and scored against each active class `name`, `short_name`, and `slug` (aliases: `rm`→Research Methods, `stats`/`statistics`→Statistics, etc.).
3. UI shows **Detected class** + dropdown of active classes (pre-filled if matched).
4. **Create roster** disabled until a class is selected.
5. Each new roster row gets `semester_id`, `class_id`, `student_key`, Canvas ids.
6. Duplicate skip: same `bb_id` / `bb_username` within the **same semester + class** (same student may appear in RM and Stats).

### Claim
1. Student claims by `student_key` (+ semester) as today.
2. Backend links `roster.user_id` and appends `roster.class_id` to `user.classes` if missing.
3. Students may claim unclaimed rows (fix claim permission for null `user_id`).

### Export
Keys CSV includes a `class` column (slug) plus existing fields.

## Data model

- `roster.class_id` → `classes.id` (nullable for legacy rows; new imports always set it).
- API alias: `class` ↔ `class_id`; expand `class` on roster.

## Out of scope

- Separate Statistics in-person vs online classes (one `statistics` class today).
- Renaming DB columns `bb_*`.
- Stormlight home redesign.
