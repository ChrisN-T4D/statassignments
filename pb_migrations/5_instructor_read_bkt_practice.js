/// <reference path="../pb_data/types.d.ts" />

// Allow instructors to list/view bkt_states and practice_attempts for dashboard/early warning.
// Uses (app) API; if your PocketBase uses (db), rename the parameter to match.

migrate((app) => {
  const bkt = app.findCollectionByNameOrId('bkt_states')
  if (bkt) {
    bkt.listRule = '@request.auth.id = user || @request.auth.role = "instructor"'
    bkt.viewRule = '@request.auth.id = user || @request.auth.role = "instructor"'
    app.save(bkt)
  }

  const practice = app.findCollectionByNameOrId('practice_attempts')
  if (practice) {
    practice.listRule = '@request.auth.id = user || @request.auth.role = "instructor"'
    practice.viewRule = '@request.auth.id = user || @request.auth.role = "instructor"'
    app.save(practice)
  }
}, (app) => {
  const bkt = app.findCollectionByNameOrId('bkt_states')
  if (bkt) {
    bkt.listRule = '@request.auth.id = user'
    bkt.viewRule = '@request.auth.id = user'
    app.save(bkt)
  }

  const practice = app.findCollectionByNameOrId('practice_attempts')
  if (practice) {
    practice.listRule = '@request.auth.id = user'
    practice.viewRule = '@request.auth.id = user'
    app.save(practice)
  }
})
