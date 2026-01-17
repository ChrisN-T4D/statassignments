/// <reference path="../pb_data/types.d.ts" />

// This migration creates the collections for the statistics teaching app
// Run this by placing in pb_migrations folder before starting PocketBase

migrate((db) => {
  // Create user_progress collection
  const userProgress = new Collection({
    name: 'user_progress',
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
        name: 'topic_id',
        type: 'text',
        required: true
      },
      {
        name: 'completed',
        type: 'bool',
        required: false
      },
      {
        name: 'completed_at',
        type: 'date',
        required: false
      }
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_user_topic ON user_progress (user, topic_id)'
    ],
    listRule: '@request.auth.id = user',
    viewRule: '@request.auth.id = user',
    createRule: '@request.auth.id = user',
    updateRule: '@request.auth.id = user',
    deleteRule: '@request.auth.id = user'
  })

  // Create practice_problems collection
  const practiceProblems = new Collection({
    name: 'practice_problems',
    type: 'base',
    schema: [
      {
        name: 'topic_id',
        type: 'text',
        required: true
      },
      {
        name: 'question',
        type: 'text',
        required: true
      },
      {
        name: 'question_type',
        type: 'select',
        required: true,
        options: {
          values: ['multiple_choice', 'numeric', 'true_false']
        }
      },
      {
        name: 'options',
        type: 'json',
        required: false
      },
      {
        name: 'correct_answer',
        type: 'text',
        required: true
      },
      {
        name: 'explanation',
        type: 'text',
        required: false
      },
      {
        name: 'hint',
        type: 'text',
        required: false
      },
      {
        name: 'difficulty',
        type: 'select',
        required: false,
        options: {
          values: ['easy', 'medium', 'hard']
        }
      }
    ],
    listRule: '',  // Anyone can read
    viewRule: '',  // Anyone can read
    createRule: null,  // Only admins
    updateRule: null,  // Only admins
    deleteRule: null   // Only admins
  })

  // Create practice_attempts collection
  const practiceAttempts = new Collection({
    name: 'practice_attempts',
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
        name: 'problem',
        type: 'relation',
        required: true,
        options: {
          collectionId: 'practice_problems',
          cascadeDelete: true,
          maxSelect: 1
        }
      },
      {
        name: 'answer',
        type: 'text',
        required: true
      },
      {
        name: 'is_correct',
        type: 'bool',
        required: true
      }
    ],
    listRule: '@request.auth.id = user',
    viewRule: '@request.auth.id = user',
    createRule: '@request.auth.id = user',
    updateRule: null,
    deleteRule: null
  })

  return db.save(userProgress) && db.save(practiceProblems) && db.save(practiceAttempts)
}, (db) => {
  // Revert
  db.delete('user_progress')
  db.delete('practice_problems')
  db.delete('practice_attempts')
})
