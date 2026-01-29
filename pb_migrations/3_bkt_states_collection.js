/// <reference path="../pb_data/types.d.ts" />

// This migration creates the bkt_states collection for Bayesian Knowledge Tracing

migrate((db) => {
  // Create bkt_states collection
  const bktStates = new Collection({
    name: 'bkt_states',
    type: 'base',
    schema: [
      {
        name: 'user',
        type: 'relation',
        required: true,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1
        }
      },
      {
        name: 'objective_id',
        type: 'text',
        required: true
      },
      {
        name: 'pL',
        type: 'number',
        required: true
      },
      {
        name: 'pL0',
        type: 'number',
        required: true
      },
      {
        name: 'pT',
        type: 'number',
        required: true
      },
      {
        name: 'pS',
        type: 'number',
        required: true
      },
      {
        name: 'pG',
        type: 'number',
        required: true
      },
      {
        name: 'attempts',
        type: 'number',
        required: true
      },
      {
        name: 'correct',
        type: 'number',
        required: true
      },
      {
        name: 'incorrect',
        type: 'number',
        required: true
      },
      {
        name: 'last_updated',
        type: 'date',
        required: true
      }
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_user_objective ON bkt_states (user, objective_id)'
    ],
    listRule: '@request.auth.id = user',
    viewRule: '@request.auth.id = user',
    createRule: '@request.auth.id = user',
    updateRule: '@request.auth.id = user',
    deleteRule: '@request.auth.id = user'
  })

  return db.save(bktStates)
}, (db) => {
  // Revert
  db.delete('bkt_states')
})
