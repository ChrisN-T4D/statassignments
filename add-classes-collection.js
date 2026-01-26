// Add classes collection to PocketBase
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pb.c.robpneu.com')

const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD

async function addClassesCollection() {
  console.log('Adding classes collection to PocketBase...\n')

  // Step 1: Authenticate as admin
  try {
    console.log('Authenticating as admin...')
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
    console.log('✓ Authenticated\n')
  } catch (err) {
    console.error('✗ Admin authentication failed:', err.message)
    return
  }

  // Step 2: Create classes collection
  try {
    console.log('Creating classes collection...')

    const classesCollection = {
      name: 'classes',
      type: 'base',
      schema: [
        {
          name: 'semester',
          type: 'relation',
          required: true,
          options: {
            collectionId: 'semesters',
            cascadeDelete: false,
            maxSelect: 1
          }
        },
        {
          name: 'code',
          type: 'text',
          required: true
        },
        {
          name: 'name',
          type: 'text',
          required: true
        },
        {
          name: 'description',
          type: 'text',
          required: false
        },
        {
          name: 'instructor',
          type: 'relation',
          required: false,
          options: {
            collectionId: 'users',
            cascadeDelete: false,
            maxSelect: 1
          }
        },
        {
          name: 'is_active',
          type: 'bool',
          required: false
        }
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_classes_semester_code ON classes (semester, code)'
      ],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != "" && @request.auth.role = "instructor"',
      updateRule: '@request.auth.id != "" && instructor = @request.auth.id',
      deleteRule: '@request.auth.id != "" && instructor = @request.auth.id'
    }

    await pb.send('/api/collections', {
      method: 'POST',
      body: JSON.stringify(classesCollection)
    })

    console.log('✓ Classes collection created\n')
  } catch (err) {
    if (err.message.includes('already exists')) {
      console.log('⚠️  Classes collection already exists\n')
    } else {
      console.error('✗ Error creating classes collection:', err.message)
      return
    }
  }

  // Step 3: Add class field to modules collection
  try {
    console.log('Adding class field to modules collection...')

    // Get the modules collection
    const collections = await pb.send('/api/collections', { method: 'GET' })
    const modulesCollection = collections.items.find(c => c.name === 'modules')

    if (!modulesCollection) {
      console.error('✗ Modules collection not found')
      return
    }

    // Add class field if it doesn't exist
    const hasClassField = modulesCollection.schema.some(f => f.name === 'class')

    if (!hasClassField) {
      modulesCollection.schema.push({
        name: 'class',
        type: 'relation',
        required: false,
        options: {
          collectionId: 'classes',
          cascadeDelete: false,
          maxSelect: 1
        }
      })

      await pb.send(`/api/collections/${modulesCollection.id}`, {
        method: 'PATCH',
        body: JSON.stringify(modulesCollection)
      })

      console.log('✓ Added class field to modules collection\n')
    } else {
      console.log('⚠️  Class field already exists in modules collection\n')
    }
  } catch (err) {
    console.error('✗ Error updating modules collection:', err.message)
    return
  }

  console.log('--- Setup Complete ---')
  console.log('Classes collection is ready!')
  console.log('Run "node import-classes.js" to add sample classes')
}

addClassesCollection().catch(console.error)
