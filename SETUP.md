# Statistics Teaching Site - Setup Guide

This guide walks you through setting up the backend (PocketBase) and frontend (Vue) for the psychology statistics practice site with pseudonymous student tracking.

## Architecture Overview

- **Students** authenticate and link to a pseudonymous profile (roster entry)
- **Instructors** export analytics using only `student_key` (no PII)
- **Attempts** are logged at the event level for detailed analytics

## Quick Start

### 1. Start PocketBase with Docker (for Portainer)

**Option A: Using Portainer Stacks**

1. In Portainer, go to **Stacks → Add Stack**
2. Name it `stats-pocketbase`
3. Paste this docker-compose:

```yaml
version: '3.8'

services:
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    container_name: stats-pocketbase
    restart: unless-stopped
    ports:
      - "8090:8090"
    volumes:
      - pocketbase_data:/pb_data
    healthcheck:
      test: wget --no-verbose --tries=1 --spider http://localhost:8090/api/health || exit 1
      interval: 30s
      timeout: 5s
      retries: 3

volumes:
  pocketbase_data:
```

4. Click **Deploy the stack**

### 2. Set Up PocketBase Admin

1. Open `https://pb.c.robpneu.com/_/` in your browser
2. Create your admin account (first-time setup)

### 3. Create Collections

Create collections in this order (due to relations):

#### Collection 1: `semesters`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| code | Text | Yes | Unique, e.g., "2026SP" |
| name | Text | No | e.g., "Spring 2026" |
| start_date | Date | No | |
| end_date | Date | No | |
| is_active | Bool | No | |

**API Rules:** List/View = empty (public), Create/Update/Delete = null (admin only)

#### Collection 2: `roster`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| semester | Relation → semesters | Yes | |
| student_key | Text | Yes | Pseudonymous ID, e.g., "SP26-4KQ9P2" |
| claim_token | Text | No | One-time token for linking |
| user | Relation → users | No | Linked after student claims |
| claimed_at | Date | No | |
| bb_username | Text | No | Private, never exported |
| bb_id | Text | No | Private, never exported |

**API Rules:**
- List/View: `@request.auth.id != '' && (user = @request.auth.id || @request.auth.role = 'instructor')`
- Create/Update/Delete: null (admin only)

#### Collection 3: `modules`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| semester | Relation → semesters | No | If content varies by term |
| software_type | Select | Yes | Values: jamovi, r, stata, spss, all |
| topic_id | Text | Yes | e.g., "descriptive-stats" |
| title | Text | Yes | |
| description | Text | No | |
| order | Number | No | |

**API Rules:** List/View = empty (public), Create/Update/Delete = null (admin only)

#### Collection 4: `items`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| module | Relation → modules | Yes | Cascade delete |
| item_type | Select | Yes | Values: multiple_choice, numeric, true_false, short_answer, step_checklist |
| prompt | Text | Yes | The question text |
| options | JSON | No | For multiple choice: ["A", "B", "C", "D"] |
| answer_key | Text | Yes | Correct answer |
| explanation | Text | No | Shown after answering |
| hint | Text | No | Optional hint |
| difficulty | Select | No | Values: easy, medium, hard |
| order | Number | No | |
| tags | JSON | No | For filtering |

**API Rules:** List/View = empty (public), Create/Update/Delete = null (admin only)

#### Collection 5: `attempts`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| semester | Relation → semesters | Yes | |
| profile | Relation → roster | Yes | Links to student's pseudonymous profile |
| module | Relation → modules | No | |
| item | Relation → items | Yes | |
| software_type | Select | Yes | jamovi, r, stata, spss |
| response | Text | Yes | Student's answer |
| is_correct | Bool | Yes | |
| score | Number | No | For partial credit |
| time_spent_seconds | Number | No | |
| attempt_no | Number | No | Which attempt on this item |
| hint_used | Bool | No | |

**API Rules:**
- List/View: `@request.auth.id != '' && (profile.user = @request.auth.id || @request.auth.role = 'instructor')`
- Create: `@request.auth.id != '' && profile.user = @request.auth.id`
- Update/Delete: null (no modifications)

### 4. Add `role` field to Users collection

1. Go to the **users** collection (built-in auth collection)
2. Add a new field:
   - Name: `role`
   - Type: Select
   - Values: `student`, `instructor`
   - Default: `student`

### 5. Import Seed Data

Use the PocketBase Admin UI to import data from `seed-data.json`:

1. **Semesters**: Add your current semester(s)
2. **Modules**: Import the module definitions
3. **Items**: Import practice questions (link to module IDs)

### 6. Generate Roster with Student Keys

For each semester, generate roster entries with pseudonymous keys:

```javascript
// Example: Generate student keys
function generateStudentKey(semesterCode) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // No confusing chars
  let key = ''
  for (let i = 0; i < 6; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${semesterCode}-${key}`
}

// e.g., "SP26-4KQ9P2"
```

Import roster via CSV or create manually in admin UI.

### 7. Configure the Frontend

The `.env` file is already configured:

```
VITE_POCKETBASE_URL=https://pb.c.robpneu.com
```

Install dependencies and run:

```bash
npm install
npm run dev
```

### 8. Build for Production

```bash
npm run build
```

---

## Student Workflow

1. Student creates account at `/auth`
2. Student goes to `/claim` and enters their `student_key` (provided by instructor)
3. Student's account is linked to their roster entry
4. Student can now practice at `/practice` - all attempts are logged
5. Student views progress at `/profile`

## Instructor Workflow

1. Instructor creates account and is given `role = instructor` in admin UI
2. At start of semester:
   - Create semester in PocketBase
   - Import roster (Blackboard export → generate student_keys)
   - Distribute student_keys to students
3. During semester:
   - View analytics at `/instructor`
   - Export CSV (pseudonymous) for analysis
4. Exports contain only `student_key`, never names/emails

---

## CSV Export Fields

### Attempt-Level Export
```
semester_code, student_key, software_type, module_id, module_title,
item_id, is_correct, score, time_spent_seconds, attempt_no, hint_used, created
```

### Student Summary Export
```
semester_code, student_key, total_attempts, correct_attempts, accuracy_pct,
unique_items_attempted, avg_time_seconds,
jamovi_attempts, jamovi_accuracy, r_attempts, r_accuracy,
stata_attempts, stata_accuracy, spss_attempts, spss_accuracy
```

---

## Troubleshooting

### CORS Issues
PocketBase allows all origins by default. Check Settings → Application in admin UI.

### Student Can't Claim Profile
- Verify the student_key exists and is unclaimed (user field is empty)
- Check the semester is correct
- Verify the claim_token if using token-based claiming

### Instructor Can't See All Data
- Verify the user has `role = instructor` set in the users collection
- Check API rules allow instructor access via `@request.auth.role = 'instructor'`

### Auth Not Persisting
The PocketBase SDK stores auth in localStorage. Ensure same domain/port.
