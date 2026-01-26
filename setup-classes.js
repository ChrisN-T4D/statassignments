// Complete setup script for classes collection and linking
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pb.c.robpneu.com')

const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD

async function setupClasses() {
  console.log('=== Setting up Classes System ===\n')

  // Step 1: Authenticate as admin
  try {
    console.log('1. Authenticating as admin...')
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
    console.log('   ✓ Authenticated\n')
  } catch (err) {
    console.error('   ✗ Admin authentication failed:', err.message)
    return
  }

  // Step 2: Get collections
  console.log('2. Getting collections...')
  let collections = await pb.send('/api/collections', { method: 'GET' })
  let classesCol = collections.items.find(c => c.name === 'classes')
  let modulesCol = collections.items.find(c => c.name === 'modules')
  const semestersCol = collections.items.find(c => c.name === 'semesters')
  const usersCol = collections.items.find(c => c.name === 'users')
  console.log('   ✓ Found collections\n')

  // Step 3: Ensure classes collection exists with proper schema
  console.log('3. Setting up classes collection...')

  if (!classesCol) {
    // Create classes collection
    classesCol = await pb.send('/api/collections', {
      method: 'POST',
      body: JSON.stringify({
        name: 'classes',
        type: 'base',
        schema: [],
        listRule: '',
        viewRule: ''
      })
    })
    console.log('   ✓ Created classes collection')
  }

  // Get full classes collection data
  const fullClassesCol = await pb.send(`/api/collections/${classesCol.id}`, { method: 'GET' })

  // Update fields with all required fields (using PocketBase API format)
  fullClassesCol.fields = fullClassesCol.fields || []

  // Helper to add field if it doesn't exist
  const addFieldIfMissing = (fieldDef) => {
    if (!fullClassesCol.fields.some(f => f.name === fieldDef.name)) {
      fullClassesCol.fields.push({ ...fieldDef, id: `${fieldDef.type}${Date.now()}${Math.random()}` })
    }
  }

  addFieldIfMissing({
    name: 'semester',
    type: 'relation',
    required: true,
    presentable: false,
    system: false,
    hidden: false,
    collectionId: semestersCol.id,
    cascadeDelete: false,
    minSelect: 0,
    maxSelect: 1
  })

  addFieldIfMissing({
    name: 'code',
    type: 'text',
    required: true,
    presentable: false,
    system: false,
    hidden: false,
    autogeneratePattern: '',
    pattern: '',
    min: 0,
    max: 0
  })

  addFieldIfMissing({
    name: 'name',
    type: 'text',
    required: true,
    presentable: false,
    system: false,
    hidden: false,
    autogeneratePattern: '',
    pattern: '',
    min: 0,
    max: 0
  })

  addFieldIfMissing({
    name: 'description',
    type: 'text',
    required: false,
    presentable: false,
    system: false,
    hidden: false,
    autogeneratePattern: '',
    pattern: '',
    min: 0,
    max: 0
  })

  addFieldIfMissing({
    name: 'instructor',
    type: 'relation',
    required: false,
    presentable: false,
    system: false,
    hidden: false,
    collectionId: usersCol.id,
    cascadeDelete: false,
    minSelect: 0,
    maxSelect: 1
  })

  addFieldIfMissing({
    name: 'is_active',
    type: 'bool',
    required: false,
    presentable: false,
    system: false,
    hidden: false
  })

  fullClassesCol.listRule = ''
  fullClassesCol.viewRule = ''

  await pb.send(`/api/collections/${classesCol.id}`, {
    method: 'PATCH',
    body: JSON.stringify(fullClassesCol)
  })
  console.log('   ✓ Updated classes schema\n')

  // Step 4: Add class field to modules collection
  console.log('4. Adding class field to modules...')

  // Get the fresh collection data individually
  collections = await pb.send('/api/collections', { method: 'GET' })
  const modulesId = collections.items.find(c => c.name === 'modules')?.id
  const classesId = collections.items.find(c => c.name === 'classes')?.id

  if (!modulesId || !classesId) {
    console.error('   ✗ Could not find modules or classes collection ID')
    return
  }

  // Fetch full modules collection data
  const fullModulesCol = await pb.send(`/api/collections/${modulesId}`, { method: 'GET' })

  // PocketBase API uses 'fields' not 'schema'
  if (!fullModulesCol || !fullModulesCol.fields) {
    console.error('   ✗ Could not fetch modules collection')
    return
  }

  const hasClassField = fullModulesCol.fields.some(f => f.name === 'class')

  if (!hasClassField) {
    // Add the class field
    fullModulesCol.fields.push({
      id: `relation${Date.now()}`,
      name: 'class',
      type: 'relation',
      required: false,
      presentable: false,
      system: false,
      hidden: false,
      collectionId: classesId,
      cascadeDelete: false,
      minSelect: 0,
      maxSelect: 1
    })

    await pb.send(`/api/collections/${modulesId}`, {
      method: 'PATCH',
      body: JSON.stringify(fullModulesCol)
    })
    console.log('   ✓ Added class field to modules')
  } else {
    console.log('   ⚠️  Class field already exists')
  }
  console.log()

  // Step 5: Get 2026SP semester
  console.log('5. Finding semester...')
  const semesters = await pb.collection('semesters').getList(1, 10, {
    filter: 'code = "2026SP"'
  })

  if (semesters.items.length === 0) {
    console.error('   ✗ 2026SP semester not found')
    return
  }

  const semester = semesters.items[0]
  console.log(`   ✓ Found semester: ${semester.code} (${semester.name})\n`)

  // Step 6: Delete any existing empty classes
  console.log('6. Cleaning up existing classes...')
  try {
    const existingClasses = await pb.collection('classes').getFullList()
    for (const cls of existingClasses) {
      await pb.collection('classes').delete(cls.id)
    }
    console.log(`   ✓ Deleted ${existingClasses.length} existing classes\n`)
  } catch (err) {
    console.log('   ⚠️  No existing classes to delete\n')
  }

  // Step 7: Create the two classes
  console.log('7. Creating classes...')

  const classesData = [
    {
      semester: semester.id,
      code: 'PSYC 4213',
      name: 'Statistics',
      description: 'Introduction to statistical methods and analysis in psychology',
      is_active: true
    },
    {
      semester: semester.id,
      code: 'PSYC 4223',
      name: 'Research Methods',
      description: 'Research methodology and experimental design in psychology',
      is_active: true
    }
  ]

  const createdClasses = []
  for (const classData of classesData) {
    try {
      const created = await pb.collection('classes').create(classData)
      console.log(`   ✓ Created: ${classData.code} - ${classData.name}`)
      createdClasses.push(created)
    } catch (err) {
      console.log(`   ✗ Error creating ${classData.code}:`, err.message)
    }
  }
  console.log()

  // Step 8: Link all modules to PSYC 4213 (Statistics)
  console.log('8. Linking modules to PSYC 4213...')

  const statsClass = createdClasses.find(c => c.code === 'PSYC 4213')

  if (!statsClass) {
    console.error('   ✗ PSYC 4213 class not found')
    return
  }

  const modules = await pb.collection('modules').getFullList()
  console.log(`   Found ${modules.length} modules`)

  let linkedCount = 0
  for (const module of modules) {
    try {
      await pb.collection('modules').update(module.id, {
        class: statsClass.id
      })
      linkedCount++
    } catch (err) {
      console.log(`   ✗ Error linking ${module.title}:`, err.message)
    }
  }

  console.log(`   ✓ Linked ${linkedCount} modules to PSYC 4213\n`)

  // Step 9: Verify everything
  console.log('9. Verifying setup...')
  const finalClasses = await pb.collection('classes').getFullList()
  const linkedModules = await pb.collection('modules').getFullList({
    filter: `class != ""`
  })

  console.log(`   ✓ Classes created: ${finalClasses.length}`)
  finalClasses.forEach(c => {
    console.log(`      - ${c.code}: ${c.name}`)
  })
  console.log(`   ✓ Modules linked: ${linkedModules.length}\n`)

  console.log('=== Setup Complete ===')
  console.log('You can now navigate to /class/<classId> in your app!')
  console.log('\nClass IDs:')
  finalClasses.forEach(c => {
    console.log(`  ${c.code}: ${c.id}`)
  })
}

setupClasses().catch(console.error)
