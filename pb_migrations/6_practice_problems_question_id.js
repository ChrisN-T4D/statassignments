/// <reference path="../pb_data/types.d.ts" />

// Adds SQLite column + partial unique index for question_id (PocketBase sync script upserts on this).
// If your PB version exposes collection schema in JS migrations, also add `question_id` in Admin
// and extend practice_problems.question_type select to include: multiple_select, fill_blank, matching, ordering.

migrate((app) => {
  const db = app.db()
  try {
    db.newQuery('ALTER TABLE practice_problems ADD COLUMN question_id TEXT DEFAULT ""').execute()
  } catch (_) {
    // column may already exist
  }
  try {
    db.newQuery(
      'CREATE UNIQUE INDEX IF NOT EXISTS idx_practice_problems_question_id ON practice_problems (question_id) WHERE length(question_id) > 0'
    ).execute()
  } catch (_) {
    // index may already exist
  }
})
