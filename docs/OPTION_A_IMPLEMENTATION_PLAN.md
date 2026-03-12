# Option A Implementation Plan: Structure First, Then Training

This plan has two phases: **Phase 1** adds the data structure (PocketBase schema + frontend) so that from day one, user attempts are stored in a form suitable for future BKT training. **Phase 2** (when you have enough data) covers export, training, and plugging learned params into the backend.

---

## Phase 1: Add structure (do this before users generate training data)

### 1. What to add to PocketBase (practice_attempts)

Add **optional** fields to the `practice_attempts` collection so each attempt can store time, difficulty, and confidence/sequence context. All new fields should be **required: false** so existing records and older clients keep working.

| Field name | Type | Required | Purpose |
|------------|------|----------|--------|
| `active_time_seconds` | number | false | Active engagement time (seconds). |
| `total_time_seconds` | number | false | Total time on question (seconds). |
| `time_maxed_out` | bool | false | Whether max time was reached. |
| `idle_detected` | bool | false | Whether significant idle time was detected. |
| `difficulty` | select | false | Problem difficulty for this attempt. Values: `easy`, `medium`, `hard`. |
| `time_to_first_selection` | number | false | Seconds until first answer selection (confidence proxy). |
| `answer_changes` | number | false | Number of times the answer was changed (confidence proxy). |
| `time_since_reading` | number | false | Seconds since last relevant reading (sequence/spacing). |
| `time_since_last_attempt` | number | false | Seconds since last attempt on this topic/objective (spacing). |
| `has_read_topic_before` | bool | false | Whether user had read the topic before this attempt. |

**PocketBase schema details**

- **number**: Use for all numeric fields (integers or floats). PocketBase stores these as numbers.
- **bool**: Use for `time_maxed_out`, `idle_detected`, `has_read_topic_before`.
- **select**: Use for `difficulty` with `options.values: ['easy', 'medium', 'hard']` so it matches the backend and `practice_problems.difficulty`.

**How to add them**

- **Option A (recommended): new migration file**  
  Create a new migration (e.g. `pb_migrations/4_practice_attempts_bkt_training_fields.js`) that adds these fields to the existing `practice_attempts` collection (see section 2 below). This keeps migrations repeatable and versioned.

- **Option B: PocketBase Admin UI**  
  In the Admin UI, open the `practice_attempts` collection, add each field with the name/type/required/options above, then run **Migrate → collections** to export a migration if you want it versioned.

After this, any new `practice_attempts` record can store these fields when the frontend sends them.

---

### 2. New migration file (exact PB changes)

Create **`pb_migrations/4_practice_attempts_bkt_training_fields.js`**. PocketBase migrations receive an `app` instance (some setups use `db`; if your existing migrations use `(db)`, try `(app)` for this one or use your project’s convention).

**Example migration (PocketBase API with `app` and `fields.add`):**

```javascript
/// <reference path="../pb_data/types.d.ts" />

// Adds optional BKT training fields to practice_attempts (Option A structure)

migrate((app) => {
  const collection = app.findCollectionByNameOrId('practice_attempts')
  if (!collection) return

  // Time
  collection.fields.add(new NumberField({ name: 'active_time_seconds', required: false }))
  collection.fields.add(new NumberField({ name: 'total_time_seconds', required: false }))
  collection.fields.add(new BoolField({ name: 'time_maxed_out', required: false }))
  collection.fields.add(new BoolField({ name: 'idle_detected', required: false }))

  // Difficulty (for training)
  collection.fields.add(new SelectField({
    name: 'difficulty',
    required: false,
    values: ['easy', 'medium', 'hard']
  }))

  // Confidence
  collection.fields.add(new NumberField({ name: 'time_to_first_selection', required: false }))
  collection.fields.add(new NumberField({ name: 'answer_changes', required: false }))

  // Sequence / spacing
  collection.fields.add(new NumberField({ name: 'time_since_reading', required: false }))
  collection.fields.add(new NumberField({ name: 'time_since_last_attempt', required: false }))
  collection.fields.add(new BoolField({ name: 'has_read_topic_before', required: false }))

  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId('practice_attempts')
  if (!collection) return

  const names = [
    'active_time_seconds', 'total_time_seconds', 'time_maxed_out', 'idle_detected',
    'difficulty', 'time_to_first_selection', 'answer_changes',
    'time_since_reading', 'time_since_last_attempt', 'has_read_topic_before'
  ]
  names.forEach((name) => {
    const f = collection.fields.getByName(name)
    if (f) collection.fields.remove(f)
  })
  app.save(collection)
})
```

**If your PocketBase uses the older `(db)` API** and plain `schema` arrays (like in `1_collections.js`), you may need to add fields by appending to the collection’s schema and saving with `db.save(collection)`. The exact API depends on your PocketBase version; the table in section 1 is the source of truth for field names and types.

---

### 3. Frontend: ensure all new fields are sent to PocketBase

In **`src/composables/usePractice.js`**, `submitAnswer` already builds `attemptData` with:

- `user`, `problem`, `answer`, `is_correct`
- From `timeData`: `active_time_seconds`, `total_time_seconds`, `time_maxed_out`, `idle_detected`
- From `confidenceData`: `time_to_first_selection`, `answer_changes`
- From `sequenceData`: `time_since_reading`, `time_since_last_attempt`, `has_read_topic_before`

**Add:**

- **`difficulty`** on each attempt. Set `attemptData.difficulty = difficulty` (or the problem’s difficulty) when creating the record, where `difficulty` is the same value you pass to `updateBKT(...)` (e.g. from the problem or from the caller). Use one of `'easy'`, `'medium'`, `'hard'` so it matches the new PB `select` field.

Ensure `submitAnswer` is called with `difficulty` (and time/confidence/sequence when available) so that once the PB schema is in place, every new attempt stores the full set of training fields.

---

### 4. (Optional) Extend FastAPI for future use

In **`backend/main.py`**, extend **`BKTUpdateRequest`** with optional fields so the backend could later use them (e.g. for a NN that outputs BKT params per request):

- `time_to_first_selection`, `answer_changes`, `time_since_reading`, `time_since_last_attempt`, `has_read_topic_before` (all optional numbers/booleans as appropriate).

The backend does not need to use these in the BKT update logic yet; it can ignore them until you implement a per-request model. This step is optional for Phase 1.

---

### 5. Phase 1 checklist

- [ ] Add to PocketBase: all 10 optional fields on `practice_attempts` (time, difficulty, confidence, sequence) via new migration or Admin UI.
- [ ] In `usePractice.js`: set `attemptData.difficulty` when creating a `practice_attempts` record.
- [ ] (Optional) Extend `BKTUpdateRequest` with the optional training-related fields.

After this, all new user attempts will be stored with the structure needed for training. You can deploy and collect data; no training pipeline is required yet.

---

## Phase 2: When you have enough data (training pipeline + backend)

Do this after you have a sufficient number of `practice_attempts` with the new fields populated.

1. **Export script**  
   From PocketBase, export `practice_attempts` (with `expand=problem` if you need `problem.difficulty` as fallback). Map each attempt to one or more (user_id, objective_id) using the same mapping as in `src/data/questionObjectiveMap.js`. Output training rows: user_id, objective_id, is_correct, difficulty, active_time_seconds, total_time_seconds, and any confidence/sequence fields you want to use.

2. **Training script**  
   For each objective, estimate BKT parameters (pL0, pT, pS, pG) by maximizing the likelihood of the observed response sequences (BKT forward pass + log-likelihood, then optimize). Write **`learned_bkt_params.json`** in the form:  
   `{ "objective_id": { "pL0": float, "pT": float, "pS": float, "pG": float }, ... }`.

3. **Backend integration**  
   On startup, load `learned_bkt_params.json` if present and pass it into `NeuralBKTModel`. In `update()`, use learned params for that objective when available; otherwise keep current prototype-based logic. If the file is missing, run with prototype params only (no crash).

---

## Summary: what you need to add to PB

**Collection: `practice_attempts`**

Add these 10 optional fields:

| Field | Type | Required | Options |
|-------|------|----------|--------|
| active_time_seconds | number | false | — |
| total_time_seconds | number | false | — |
| time_maxed_out | bool | false | — |
| idle_detected | bool | false | — |
| difficulty | select | false | values: ['easy', 'medium', 'hard'] |
| time_to_first_selection | number | false | — |
| answer_changes | number | false | — |
| time_since_reading | number | false | — |
| time_since_last_attempt | number | false | — |
| has_read_topic_before | bool | false | — |

No other collections need changes for Option A. After adding these and setting `attemptData.difficulty` in the frontend, you’re ready to collect training data; the rest of the pipeline can wait until you have enough data.
