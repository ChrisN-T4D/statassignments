/// <reference path="../pb_data/types.d.ts" />

// This migration creates the classes collection for organizing students into course sections

migrate((db) => {
  // Create classes collection
  const classes = new Collection({
    name: 'classes',
    type: 'base',
    schema: [
      {
        name: 'name',
        type: 'text',
        required: true
      },
      {
        name: 'short_name',
        type: 'text',
        required: true
      },
      {
        name: 'slug',
        type: 'text',
        required: false
      },
      {
        name: 'description',
        type: 'text',
        required: false
      },
      {
        name: 'color',
        type: 'text',
        required: false
      },
      {
        name: 'icon',
        type: 'text',
        required: false
      },
      {
        name: 'topics',
        type: 'json',
        required: false
      },
      {
        name: 'order',
        type: 'number',
        required: false
      },
      {
        name: 'is_active',
        type: 'bool',
        required: false
      }
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_slug ON classes (slug) WHERE slug != ""'
    ],
    listRule: '',  // Anyone can read classes
    viewRule: '',  // Anyone can read classes
    createRule: '@request.auth.role = "admin"',  // Only admins can create
    updateRule: '@request.auth.role = "admin"',  // Only admins can update
    deleteRule: '@request.auth.role = "admin"'   // Only admins can delete
  })

  return db.save(classes)
}, (db) => {
  // Revert
  db.delete('classes')
})
