# Student feedback & issue reporting

**Date:** 2026-09-11  
**Status:** Approved  
**Repo:** `statassignments` (Methods Market)

## Problem

Students hit bugs, confusing content, and access issues during Concept Review, Software Practice, and class work. Today the only support path is a static `mailto:support@methodsmartet.com` link on the home page. Reports are not tracked, triaged, or compiled in one place.

## Goal

Give signed-in students an in-app form to report issues and feedback. Store submissions in Postgres. Let **admins only** review, filter, resolve, and export reports for fixing.

## Decisions (approved)

| Topic | Choice |
|-------|--------|
| Who triages | Admin only (no instructor queue) |
| Identity | Always tied to signed-in user + `student_key` from roster |
| Categories | Bug, wrong/confusing content, account/access, general feedback/suggestion |
| Context capture | Auto-save page URL, route, class/module when available, user agent |
| Anonymous | Not supported |

## Non-goals (v1)

- Email notifications on new reports
- Student ticket threads / replies in-app
- Instructor visibility
- Screenshot or file attachments
- Public / unauthenticated submission

## Data model

**Collection / table:** `feedback_reports`

| Column | Type | Notes |
|--------|------|--------|
| `id` | string PK | PocketBase-style id |
| `user_id` | FK → users | Required; CASCADE delete |
| `student_key` | string | Snapshot from roster at submit; nullable if unclaimed |
| `category` | string | `bug` \| `content` \| `account` \| `feedback` |
| `subject` | string | Required; max 120 chars |
| `message` | text | Required; max 4000 chars |
| `status` | string | `open` \| `resolved`; default `open` |
| `page_url` | text | Full `window.location.href` |
| `route_path` | string | Vue route path |
| `class_id` | string | Slug from route when on `/class/:classId/*` |
| `module_id` | string | From route param or `?module=` when present |
| `context` | JSONB | `{ userAgent, questionId?, topicId? }` optional extras |
| `admin_notes` | text | Admin-only; set when resolving |
| `created`, `updated` | timestamps | `TimestampMixin` |

**Indexes:** `user_id`, `status`, `created`, `category`

## Permissions

| Role | create | list | view | update | delete |
|------|--------|------|------|--------|--------|
| student | own | own only | own | — | — |
| instructor | — | — | — | — | — |
| admin | yes | all | all | all (status, admin_notes) | optional v2 |

Students cannot change `status` or `admin_notes`. Server rejects non-admin updates to those fields.

## Student UX

### Route

`/report-issue` — `meta: { requiresAuth: true }`

### Navigation entry points

1. **Nav menu** — “Report issue” (authenticated users), above Profile
2. **Profile** — short “Something wrong?” card linking to `/report-issue`
3. **About FAQ** — one FAQ item pointing to in-app form instead of email-only

### Form fields

- Category (required select)
- Subject (required text, 120 char max)
- Message (required textarea, 4000 char max)

### Submit behavior

1. Validate client-side
2. Build payload:
   - `user` = auth user id
   - `student_key` from `useAccessMode().studentKey` or roster lookup
   - `page_url`, `route_path`, `class_id`, `module_id` from `useRoute()` + `window.location`
   - `context.userAgent` = `navigator.userAgent`
3. `pb.collection('feedback_reports').create(payload)`
4. Success state: thank-you message with short reference id (record id tail)

### Copy

Brief note: reports are linked to your account so we can follow up.

## Admin UX

### Location

New **Admin** tab: **Student feedback** (`activeTab === 'feedback'`)

### List view

Table columns: created (date/time), `student_key`, category, subject, status, route_path (truncated)

Filters:

- Status: open (default) | resolved | all
- Category: all | bug | content | account | feedback

Sort: newest first

### Detail / actions

Expand row or side panel:

- Full message
- page_url (link)
- class_id, module_id, context JSON
- Admin notes textarea
- **Mark resolved** button → PATCH `status: resolved`, `admin_notes`
- **Reopen** → PATCH `status: open` (admin only)

### Export

**Export CSV** button on tab — columns: id, created, student_key, category, subject, status, page_url, route_path, class_id, module_id, message, admin_notes

## Backend work

1. Alembic migration `005_feedback_reports.py`
2. SQLAlchemy model `FeedbackReport` in `backend/db/models.py`
3. Register in `COLLECTION_MODELS`, `FIELD_ALIASES` (`user` → `user_id`)
4. `backend/db/permissions.py` — student create/list/view own; admin all; instructor denied
5. Optional: `backend/tests/test_feedback_reports.py` — permissions + create smoke

## Frontend work

1. `src/views/ReportIssue.vue` — form + success state
2. `src/composables/useFeedbackReports.js` — `submitReport`, `fetchMyReports` (optional), admin helpers
3. `src/components/AdminFeedbackPanel.vue` — triage UI (keeps `Admin.vue` smaller)
4. `src/router/index.js` — route
5. `src/components/NavMenu.vue`, `Profile.vue`, `About.vue` — links
6. `Admin.vue` — tab + panel import

## Error handling

- Network / 403: inline error on form; do not clear fields
- Validation: required fields, max lengths
- Unauthenticated visitor hitting `/report-issue` → existing auth guard → `/auth?redirect=/report-issue`

## Acceptance criteria

1. Signed-in student submits a bug report from Concept Review → record in DB with URL, class, module, student_key
2. Student cannot list or view another student's reports
3. Instructor cannot list feedback reports via API
4. Admin sees open reports in new tab, marks one resolved with a note
5. Admin exports CSV including resolved reports when filter allows
6. Nav and Profile link reach the form; About FAQ mentions it

## Privacy

Reports contain student identity and browsing context. Admin-only access. No PII in public routes. `student_key` used in exports (consistent with existing analytics exports).
