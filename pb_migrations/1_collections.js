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
        type: 'text',
        required: true,
        options: {
          max: 120
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
      },
      {
        name: 'difficulty',
        type: 'select',
        required: false,
        options: {
          values: ['easy', 'medium', 'hard']
        }
      },
      {
        name: 'active_time_seconds',
        type: 'number',
        required: false
      },
      {
        name: 'total_time_seconds',
        type: 'number',
        required: false
      },
      {
        name: 'time_maxed_out',
        type: 'bool',
        required: false
      },
      {
        name: 'idle_detected',
        type: 'bool',
        required: false
      },
      {
        name: 'time_to_first_selection',
        type: 'number',
        required: false
      },
      {
        name: 'answer_changes',
        type: 'number',
        required: false
      },
      {
        name: 'time_since_reading',
        type: 'number',
        required: false
      },
      {
        name: 'time_since_last_attempt',
        type: 'number',
        required: false
      },
      {
        name: 'has_read_topic_before',
        type: 'bool',
        required: false
      },
      {
        name: 'last_topic_read_time',
        type: 'number',
        required: false
      },
      {
        name: 'last_attempt_time',
        type: 'number',
        required: false
      }
    ],
    listRule: '@request.auth.id = user',
    viewRule: '@request.auth.id = user',
    createRule: '@request.auth.id = user',
    updateRule: null,
    deleteRule: null
  })

  const topicReadings = new Collection({
    name: 'topic_readings',
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
        name: 'module_id',
        type: 'text',
        required: false
      },
      {
        name: 'active_time_seconds',
        type: 'number',
        required: false
      },
      {
        name: 'total_time_seconds',
        type: 'number',
        required: false
      },
      {
        name: 'time_maxed_out',
        type: 'bool',
        required: false
      },
      {
        name: 'idle_detected',
        type: 'bool',
        required: false
      },
      {
        name: 'max_scroll_depth',
        type: 'number',
        required: false
      },
      {
        name: 'triggered_by_error',
        type: 'bool',
        required: false
      }
    ],
    indexes: [
      'CREATE INDEX idx_topic_readings_user_topic ON topic_readings (user, topic_id)'
    ],
    listRule: '@request.auth.id = user || @request.auth.role = "instructor"',
    viewRule: '@request.auth.id = user || @request.auth.role = "instructor"',
    createRule: '@request.auth.id = user',
    updateRule: '@request.auth.id = user',
    deleteRule: '@request.auth.id = user'
  })

  const softwareLessonMetrics = new Collection({
    name: 'software_lesson_metrics',
    type: 'base',
    schema: [
      {
        name: 'user',
        type: 'relation',
        required: false,
        options: {
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1
        }
      },
      {
        name: 'lesson_id',
        type: 'text',
        required: true
      },
      {
        name: 'lesson_title',
        type: 'text',
        required: false
      },
      {
        name: 'module',
        type: 'text',
        required: false
      },
      {
        name: 'software',
        type: 'text',
        required: false
      },
      {
        name: 'event_type',
        type: 'text',
        required: true
      },
      {
        name: 'event_payload',
        type: 'json',
        required: false
      }
    ],
    indexes: [
      'CREATE INDEX idx_software_lesson_metrics_lesson ON software_lesson_metrics (lesson_id, event_type)'
    ],
    listRule: '@request.auth.id = user || @request.auth.role = "instructor" || @request.auth.role = "admin"',
    viewRule: '@request.auth.id = user || @request.auth.role = "instructor" || @request.auth.role = "admin"',
    createRule: '@request.auth.id != ""',
    updateRule: null,
    deleteRule: '@request.auth.role = "admin"'
  })

  return db.save(userProgress) &&
    db.save(practiceProblems) &&
    db.save(practiceAttempts) &&
    db.save(topicReadings) &&
    db.save(softwareLessonMetrics)
}, (db) => {
  // Revert
  db.delete('user_progress')
  db.delete('practice_problems')
  db.delete('practice_attempts')
  db.delete('topic_readings')
  db.delete('software_lesson_metrics')
})
