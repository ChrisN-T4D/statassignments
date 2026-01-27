// Import seed data into PocketBase
import PocketBase from 'pocketbase'
import fs from 'fs'

const pb = new PocketBase('https://pb.c.robpneu.com')

// You'll need to authenticate as admin
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'your-admin@email.com'
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || ''

async function importData() {
  console.log('Importing seed data to PocketBase...\n')

  // Step 1: Authenticate as admin (using _superusers collection)
  try {
    console.log('Authenticating as admin...')
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
    console.log('✓ Authenticated\n')
  } catch (err) {
    console.error('✗ Admin authentication failed:', err.message)
    console.log('\n⚠️  Note: You need to create an admin account first.')
    console.log('1. Go to https://pb.c.robpneu.com/_/')
    console.log('2. Create an admin account if you haven\'t already')
    console.log('3. Then run this script with your admin credentials\n')
    console.log('Alternatively, you can import the data manually through the PocketBase UI.')
    console.log('See QUICK-FIX.md for manual import instructions.\n')
    return
  }

  // Step 2: Load seed data
  const seedData = JSON.parse(fs.readFileSync('./seed-data.json', 'utf-8'))

  // Step 3: Import semesters
  console.log('Importing semesters...')
  const semesterMap = new Map() // old ID -> new ID

  for (const semester of seedData.semesters) {
    try {
      // Check if already exists
      const existing = await pb.collection('semesters').getList(1, 1, {
        filter: `code = "${semester.code}"`
      })

      if (existing.items.length > 0) {
        console.log(`  - ${semester.code} already exists, skipping`)
        semesterMap.set(semester.code, existing.items[0].id)
      } else {
        const created = await pb.collection('semesters').create(semester)
        console.log(`  ✓ Created ${semester.code}`)
        semesterMap.set(semester.code, created.id)
      }
    } catch (err) {
      console.log(`  ✗ Error creating ${semester.code}:`, err.message)
    }
  }

  // Step 4: Import modules
  console.log('\nImporting modules...')
  const moduleMap = new Map() // topic_id -> PB record ID

  for (const module of seedData.modules) {
    try {
      // Check if already exists
      const existing = await pb.collection('modules').getList(1, 1, {
        filter: `topic_id = "${module.topic_id}" && software_type = "${module.software_type}"`
      })

      if (existing.items.length > 0) {
        console.log(`  - ${module.title} already exists, skipping`)
        moduleMap.set(module.topic_id, existing.items[0].id)
      } else {
        const created = await pb.collection('modules').create(module)
        console.log(`  ✓ Created ${module.title}`)
        moduleMap.set(module.topic_id, created.id)
      }
    } catch (err) {
      console.log(`  ✗ Error creating ${module.title}:`, err.message)
    }
  }

  // Step 5: Import items
  console.log('\nImporting items...')
  let itemsCreated = 0
  let itemsSkipped = 0

  for (const item of seedData.items) {
    try {
      // Find the module ID
      const moduleId = moduleMap.get(item.module_topic)

      if (!moduleId) {
        console.log(`  ✗ Module not found for topic: ${item.module_topic}`)
        continue
      }

      // Check if item already exists (by prompt - not perfect but good enough)
      const existing = await pb.collection('items').getList(1, 1, {
        filter: `module = "${moduleId}" && prompt = "${item.prompt.replace(/"/g, '\\"')}"`
      })

      if (existing.items.length > 0) {
        itemsSkipped++
        continue
      }

      // Create the item
      const itemData = {
        module: moduleId,
        item_type: item.item_type,
        prompt: item.prompt,
        options: item.options,
        answer_key: item.answer_key,
        explanation: item.explanation || '',
        hint: item.hint || '',
        difficulty: item.difficulty || 'medium',
        order: item.order || 0,
        tags: item.tags || null
      }

      await pb.collection('items').create(itemData)
      itemsCreated++
    } catch (err) {
      console.log(`  ✗ Error creating item:`, err.message)
    }
  }

  console.log(`  ✓ Created ${itemsCreated} items (skipped ${itemsSkipped} duplicates)`)

  console.log('\n--- Import Complete ---')
  console.log('Run "node test-connection.js" to verify')
}

importData().catch(console.error)
