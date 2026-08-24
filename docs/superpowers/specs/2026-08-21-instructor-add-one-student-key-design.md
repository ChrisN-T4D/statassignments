# Instructor add-one student key

Date: 2026-08-21  
Status: approved for planning  
Workspace: Methods Market (`statassignments-1`)

## Problem

The instructor dashboard roster tab can import a Blackboard CSV and download student keys. There is no way to add a single late-add or make-up student by email and get a key immediately.

## Goal

On **Roster Management**, an instructor types one student email, gets a `SEMCODE-XXXXXX` key on the page (with copy), and that same row appears in **Download Student Keys CSV**. If the email is already on a roster, the dashboard shows where, and the instructor chooses **Show existing key** or **Create new key**.

## Data model

Add optional `class_id` on `roster` (FK to `classes.id`, nullable). Existing CSV-imported rows stay class-empty. Add-one always sets `class_id`.

Store the email in existing `bb_username`: trim, lowercase, no new email column. `bb_id` stays empty for add-one rows.

Each roster row still has its own `student_key` and `claim_token`. Multiple rows may share the same `bb_username` (the create-new-key path). Analytics exports stay pseudonymous (`student_key` only). Keys CSV already includes `bb_username`, so new rows appear there with no export-format change.

Lookup matches `bb_username` case-insensitively across **all** roster rows, not only the selected semester.

## Dashboard flow

Roster tab, after the existing semester dropdown, **Add one student** (CSV import stays below):

1. Instructor selects **class** (from `classes`) and types **email**.
2. **Generate key** is disabled until semester, class, and a non-empty email are set.
3. Email must contain `@` and a domain after trim; otherwise show `Enter a valid email.`
4. **No match:** create a roster row for the selected semester + class. Show email, new key, copy button. Refresh roster counts.
5. **Match:** for each hit show `Detected on roster (semester name, class name)`. Class label is **Unassigned** when `class_id` is null. Actions:
   - **Show existing key:** reveal that row’s `student_key` and a copy button. Create nothing.
   - **Create new key:** insert another row on the *currently selected* semester + class (not the detected row’s semester/class). Then show the new key the same way as step 4.
6. If several rows match the email, list all of them. **Show existing key** reveals every listed key. **Create new key** still adds one new row on the current semester + class.
7. Create failure (network, permission) shows the API message and does not display a key.
8. New `student_key` values are regenerated if they collide with an existing key in that semester.

CSV import is unchanged and does not set `class_id`.

## Implementation boundaries

Reuse the existing PocketBase-compatible collection API. Instructors can already create roster records. No dedicated add-one backend route. No outbound email of keys.

Frontend: `src/views/InstructorDashboard.vue` and `src/composables/useInstructorAnalytics.js`.

Backend: Alembic migration for `roster.class_id`; `Roster` model plus `FIELD_ALIASES` / `EXPAND_RELATIONS` so the API accepts and expands `class` like `modules` already do.

## Out of scope

- Emailing the key to the student
- Changing Blackboard CSV import to assign class
- Renaming `bb_username` to email
- New automated test suite

## Manual verification

- Fresh email + semester + class → key on screen, copy works, row in keys CSV, counts increment.
- Same email again → detection with semester and class; **Show existing key** does not create a row; **Create new key** adds a second row and shows the new key.
- CSV-imported row (no class) → detection class **Unassigned**.
- Invalid email or missing class/semester → generate blocked or error, no row.
