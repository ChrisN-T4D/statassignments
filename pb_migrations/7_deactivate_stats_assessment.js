/// <reference path="../pb_data/types.d.ts" />

// Statistics for Assessment is no longer offered — hide existing class records.
migrate((app) => {
  try {
    const record = app.findFirstRecordByFilter('classes', 'slug = "stats-assessment"')
    record.set('is_active', false)
    app.save(record)
  } catch (_) {
    // Class may not exist in this environment
  }
})
