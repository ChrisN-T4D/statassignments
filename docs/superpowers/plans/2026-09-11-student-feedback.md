# Student Feedback & Issue Reporting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let signed-in students submit categorized feedback/bug reports with auto-captured page context; admins triage and export from a new Admin tab.

**Architecture:** New Postgres table `feedback_reports` exposed via existing PocketBase-compatible collections API. Vue form at `/report-issue`; dedicated `AdminFeedbackPanel.vue` for triage. Students create/list own rows; instructors denied; admins full access.

**Tech Stack:** Vue 3, FastAPI, SQLAlchemy, Alembic, existing `pb` client

**Spec:** `docs/superpowers/specs/2026-09-11-student-feedback-design.md`

## Global Constraints

- Collection name: `feedback_reports`
- Categories: `bug`, `content`, `account`, `feedback`
- Status values: `open`, `resolved` (default `open`)
- Subject max 120 chars; message max 4000 chars
- Admin-only triage; instructors cannot list/view
- Always attach `user_id`; snapshot `student_key` when available
- Auto-capture: `page_url`, `route_path`, `class_id`, `module_id`, `context.userAgent`

---

### Task 1: Database migration and model

**Files:**
- Create: `backend/alembic/versions/005_feedback_reports.py`
- Modify: `backend/db/models.py`
- Test: `backend/tests/test_feedback_reports.py`

**Interfaces:**
- Produces: SQLAlchemy model `FeedbackReport`; collection key `feedback_reports` in `COLLECTION_MODELS`

- [ ] **Step 1: Add Alembic migration**

```python
# backend/alembic/versions/005_feedback_reports.py
revision = "005"
down_revision = "004"

def upgrade() -> None:
    op.create_table(
        "feedback_reports",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("student_key", sa.String(64)),
        sa.Column("category", sa.String(32), nullable=False),
        sa.Column("subject", sa.String(120), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("status", sa.String(16), nullable=False, server_default="open"),
        sa.Column("page_url", sa.Text()),
        sa.Column("route_path", sa.String(255)),
        sa.Column("class_id", sa.String(64)),
        sa.Column("module_id", sa.String(128)),
        sa.Column("context", postgresql.JSONB()),
        sa.Column("admin_notes", sa.Text()),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_feedback_reports_user_id", "feedback_reports", ["user_id"])
    op.create_index("ix_feedback_reports_status_created", "feedback_reports", ["status", "created"])
```

- [ ] **Step 2: Add `FeedbackReport` model** (after `BktPrototype`, before `COLLECTION_MODELS`)

```python
class FeedbackReport(Base, TimestampMixin):
    __tablename__ = "feedback_reports"

    id: Mapped[str] = mapped_column(String(ID_LEN), primary_key=True, default=_new_id)
    user_id: Mapped[str] = mapped_column(String(ID_LEN), ForeignKey("users.id", ondelete="CASCADE"))
    student_key: Mapped[str | None] = mapped_column(String(64))
    category: Mapped[str] = mapped_column(String(32), nullable=False)
    subject: Mapped[str] = mapped_column(String(120), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="open")
    page_url: Mapped[str | None] = mapped_column(Text)
    route_path: Mapped[str | None] = mapped_column(String(255))
    class_id: Mapped[str | None] = mapped_column(String(64))
    module_id: Mapped[str | None] = mapped_column(String(128))
    context: Mapped[dict | list | None] = mapped_column(JSONB)
    admin_notes: Mapped[str | None] = mapped_column(Text)
```

Register in `COLLECTION_MODELS` and `FIELD_ALIASES`:

```python
"feedback_reports": FeedbackReport,
# FIELD_ALIASES
"feedback_reports": {"user": "user_id"},
```

- [ ] **Step 3: Run migration locally**

```bash
cd backend && python -m alembic upgrade head
```

Expected: migration 005 applies without error.

- [ ] **Step 4: Commit**

```bash
git add backend/alembic/versions/005_feedback_reports.py backend/db/models.py
git commit -m "feat: add feedback_reports table and model"
```

---

### Task 2: API permissions

**Files:**
- Modify: `backend/db/permissions.py`
- Modify: `backend/api/collections.py` (if update strips non-admin fields)
- Test: `backend/tests/test_feedback_reports.py`

**Interfaces:**
- Consumes: `FeedbackReport` model from Task 1
- Produces: students can `create`/`list`/`view` own; admin can `list`/`view`/`update` all; instructors denied

- [ ] **Step 1: Write failing permission tests**

```python
# backend/tests/test_feedback_reports.py
def test_student_can_create_feedback(client, student_token):
    r = client.post(
        "/api/collections/feedback_reports/records",
        headers={"Authorization": student_token},
        json={
            "user": "<student_user_id>",
            "category": "bug",
            "subject": "Stuck on question",
            "message": "Cannot click next after wrong answer",
            "status": "open",
        },
    )
    assert r.status_code == 200

def test_instructor_cannot_list_feedback(client, instructor_token):
    r = client.get(
        "/api/collections/feedback_reports/records",
        headers={"Authorization": instructor_token},
    )
    assert r.status_code == 403

def test_student_cannot_update_status(client, student_token, report_id):
    r = client.patch(
        f"/api/collections/feedback_reports/records/{report_id}",
        headers={"Authorization": student_token},
        json={"status": "resolved"},
    )
    assert r.status_code == 403
```

- [ ] **Step 2: Update `permissions.py`**

In `can_view` / `can_list` / `can_create` / `can_update`:

```python
if collection == "feedback_reports":
    if _is_admin(user):
        return True
    if collection op is list/view/create/update:
        return uid and str(getattr(record, "user_id", payload.get("user", ""))) == uid
    # instructors: return False for list/view
```

For `can_update`: admin only (students cannot patch).

- [ ] **Step 3: Run tests**

```bash
cd backend && python -m pytest tests/test_feedback_reports.py -v
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add backend/db/permissions.py backend/tests/test_feedback_reports.py
git commit -m "feat: feedback_reports permissions (admin triage, student submit)"
```

---

### Task 3: Student submit composable and context helper

**Files:**
- Create: `src/lib/feedbackContext.js`
- Create: `src/composables/useFeedbackReports.js`

**Interfaces:**
- Produces: `buildFeedbackContext(route)` → `{ page_url, route_path, class_id, module_id, context }`
- Produces: `submitFeedbackReport({ category, subject, message })` → Promise<record>

- [ ] **Step 1: Create context helper**

```javascript
// src/lib/feedbackContext.js
export function buildFeedbackContext(route) {
  const classId = route.params?.classId || null
  const moduleId =
    route.query?.module ||
    route.params?.topicId ||
    route.params?.moduleId ||
    null
  return {
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    route_path: route.fullPath || route.path || '',
    class_id: classId,
    module_id: moduleId,
    context: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    }
  }
}
```

- [ ] **Step 2: Create composable**

```javascript
// src/composables/useFeedbackReports.js
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'
import { useAccessMode } from './useAccessMode'
import { buildFeedbackContext } from '../lib/feedbackContext'

const CATEGORIES = [
  { value: 'bug', label: 'Bug / something broken' },
  { value: 'content', label: 'Wrong or confusing question/content' },
  { value: 'account', label: 'Account / login / access' },
  { value: 'feedback', label: 'General feedback / suggestion' }
]

export function useFeedbackReports() {
  const { user } = useAuth()
  const { studentKey, ensureLoaded } = useAccessMode()

  async function submitFeedbackReport({ category, subject, message }, route) {
    if (!user.value?.id) throw new Error('Sign in required')
    await ensureLoaded()
    const ctx = buildFeedbackContext(route)
    return pb.collection('feedback_reports').create({
      user: user.value.id,
      student_key: studentKey.value || null,
      category,
      subject: subject.trim(),
      message: message.trim(),
      status: 'open',
      ...ctx
    })
  }

  return { CATEGORIES, submitFeedbackReport }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/feedbackContext.js src/composables/useFeedbackReports.js
git commit -m "feat: feedback report submit composable and context capture"
```

---

### Task 4: Report issue page and route

**Files:**
- Create: `src/views/ReportIssue.vue`
- Modify: `src/router/index.js`

**Interfaces:**
- Consumes: `useFeedbackReports()` from Task 3

- [ ] **Step 1: Add route** in `src/router/index.js`

```javascript
import ReportIssue from '../views/ReportIssue.vue'

{ path: '/report-issue', component: ReportIssue, meta: { requiresAuth: true } }
```

- [ ] **Step 2: Create `ReportIssue.vue`**

Follow `ClaimProfile.vue` layout: card, `form-group`, category `<select>`, subject `<input maxlength="120">`, message `<textarea maxlength="4000">`, error/success states, submit disabled while loading.

On success show: “Thanks — we received your report (ref: …last 8 of id…).”

Use `useRoute()` and `submitFeedbackReport(..., route)`.

- [ ] **Step 3: Manual smoke**

```bash
npm run dev
# Sign in → /report-issue → submit → check network POST feedback_reports
```

- [ ] **Step 4: Commit**

```bash
git add src/views/ReportIssue.vue src/router/index.js
git commit -m "feat: student report issue page"
```

---

### Task 5: Navigation and profile links

**Files:**
- Modify: `src/components/NavMenu.vue`
- Modify: `src/views/Profile.vue`
- Modify: `src/views/About.vue`

- [ ] **Step 1: NavMenu** — add before Profile:

```html
<router-link v-if="isAuthenticated" to="/report-issue" class="dropdown-item" role="menuitem" @click="close">
  Report issue
</router-link>
```

- [ ] **Step 2: Profile** — card with link to `/report-issue`

- [ ] **Step 3: About FAQ** — add FAQ item linking to `/report-issue` for students (keep professor mailto separate)

- [ ] **Step 4: Commit**

```bash
git add src/components/NavMenu.vue src/views/Profile.vue src/views/About.vue
git commit -m "feat: link report issue from nav, profile, and about"
```

---

### Task 6: Admin feedback panel

**Files:**
- Create: `src/components/AdminFeedbackPanel.vue`
- Modify: `src/views/Admin.vue`

**Interfaces:**
- Consumes: `pb.collection('feedback_reports').getFullList({ sort: '-created' })`
- Produces: filterable table, resolve/reopen PATCH, CSV export

- [ ] **Step 1: Create `AdminFeedbackPanel.vue`**

State: `reports`, `statusFilter` (`open`|`resolved`|`all`), `categoryFilter`, `loading`, `selectedReport`, `adminNotes`

Load on mount (admin only). Table with expand/detail. Buttons:

- Mark resolved → `pb.collection('feedback_reports').update(id, { status: 'resolved', admin_notes })`
- Reopen → `{ status: 'open' }`

Export CSV: reuse `generateCSV` pattern from `useClassMasteryAnalytics.js`.

- [ ] **Step 2: Wire Admin tab**

In `Admin.vue` `tabs` array add `{ id: 'feedback', label: 'Student feedback' }`.

Template block:

```html
<div v-if="activeTab === 'feedback'" class="content-section">
  <AdminFeedbackPanel />
</div>
```

Add `feedback_reports` to datasets dropdown collection list (optional, for raw view).

- [ ] **Step 3: Manual smoke**

Admin login → Student feedback tab → see test submission → mark resolved → export CSV.

- [ ] **Step 4: Commit**

```bash
git add src/components/AdminFeedbackPanel.vue src/views/Admin.vue
git commit -m "feat: admin student feedback triage panel"
```

---

### Task 7: Verification and deploy

**Files:**
- Modify: `scripts/verify-concept-review-scoring.mjs` (only if needed — not required)

- [ ] **Step 1: Run backend tests**

```bash
cd backend && python -m pytest tests/ -v
```

- [ ] **Step 2: Run frontend build** (if deps installed)

```bash
npm run build
```

- [ ] **Step 3: Push and merge**

```bash
git push -u origin cursor/student-feedback-8663
```

Merge to `main` for Railway deploy.

---

## Spec coverage checklist

| Requirement | Task |
|-------------|------|
| feedback_reports table | 1 |
| Student create + own list | 2, 3, 4 |
| Admin triage + resolve | 2, 6 |
| Instructor denied | 2 |
| Auto context capture | 3 |
| Nav / Profile / About links | 5 |
| CSV export | 6 |
| Categories + subject + message | 4 |
