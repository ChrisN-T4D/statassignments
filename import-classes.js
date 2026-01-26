// Import classes and link modules to them
import PocketBase from 'pocketbase'
import fs from 'fs'

const pb = new PocketBase('https://pb.c.robpneu.com')

const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD

async function importClasses() {
  console.log('Importing classes and linking modules...\n')

  // Step 1: Authenticate as admin
  try {
    console.log('Authenticating as admin...')
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
    console.log('✓ Authenticated\n')
  } catch (err) {
    console.error('✗ Admin authentication failed:', err.message)
    return
  }

  // Step 2: Load seed data
  const seedData = JSON.parse(fs.readFileSync('./classes-seed-data.json', 'utf-8'))

  // Step 3: Get the active semester (2026SP)
  console.log('Finding active semester...')
  const semesters = await pb.collection('semesters').getList(1, 10, {
    filter: 'code = "2026SP"'
  })

  if (semesters.items.length === 0) {
    console.error('✗ 2026SP semester not found')
    return
  }

  const semester = semesters.items[0]
  console.log(`✓ Found semester: ${semester.code} (${semester.name})\n`)

  // Step 4: Import classes
  console.log('Importing classes...')
  const classMap = new Map() // code -> PB record

  for (const classData of seedData.classes) {
    try {
      // Check if already exists
      const existing = await pb.collection('classes').getList(1, 1, {
        filter: `semester = "${semester.id}" && code = "${classData.code}"`
      })

      if (existing.items.length > 0) {
        console.log(`  - ${classData.code} already exists, skipping`)
        classMap.set(classData.code, existing.items[0])
      } else {
        const created = await pb.collection('classes').create({
          ...classData,
          semester: semester.id
        })
        console.log(`  ✓ Created ${classData.code} - ${classData.name}`)
        classMap.set(classData.code, created)
      }
    } catch (err) {
      console.log(`  ✗ Error creating ${classData.code}:`, err.message)
    }
  }

  // Step 5: Link all modules to PSY302 (default class)
  console.log('\nLinking modules to classes...')
  const psy302 = classMap.get('PSY302')

  if (!psy302) {
    console.error('✗ PSY302 class not found')
    return
  }

  const modules = await pb.collection('modules').getFullList()
  console.log(`Found ${modules.length} modules to link`)

  let linkedCount = 0
  for (const module of modules) {
    try {
      // Link module to PSY302 if not already linked
      if (!module.class) {
        await pb.collection('modules').update(module.id, {
          class: psy302.id
        })
        linkedCount++
      }
    } catch (err) {
      console.log(`  ✗ Error linking ${module.title}:`, err.message)
    }
  }

  console.log(`✓ Linked ${linkedCount} modules to ${psy302.code}\n`)

  console.log('--- Import Complete ---')
  console.log(`Classes created: ${classMap.size}`)
  console.log(`Modules linked: ${linkedCount}`)
  console.log('\nYou can now navigate to classes in the UI!')
}

importClasses().catch(console.error)
