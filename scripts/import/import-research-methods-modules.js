// Import Research Methods modules and link to PSYC 4223
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pb.c.robpneu.com')

const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD

// Research Methods Module Data
const researchMethodsModules = [
  {
    topic_id: 'rm-module-1',
    title: 'Research Thinking: Biases, Theories, and Hypotheses',
    description: 'Research Thinking: Biases, Theories, and Hypotheses',
    order: 1,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-2',
    title: 'From Ideas to Articles: Literature Search and Question Refinement',
    description: 'From Ideas to Articles: Literature Search and Question Refinement',
    order: 2,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-3',
    title: 'Research Design Logic: Correlation, Causation, and Validity',
    description: 'Research Design Logic: Correlation, Causation, and Validity',
    order: 3,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-4',
    title: 'Ethics and Human Subjects: Consent, Risk, and IRB Basics',
    description: 'Ethics and Human Subjects: Consent, Risk, and IRB Basics',
    order: 4,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-5',
    title: 'Measurement Foundations: Reliability, Validity, and Scale Quality',
    description: 'Measurement Foundations: Reliability, Validity, and Scale Quality',
    order: 5,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-6',
    title: 'Survey Research: Item Writing, Formats, and Online Tools',
    description: 'Survey Research: Item Writing, Formats, and Online Tools',
    order: 6,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-7',
    title: 'Correlational and Group-Comparison Designs',
    description: 'Correlational and Group-Comparison Designs (Core Analytic Approaches)',
    order: 7,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-8',
    title: 'Qualitative Research: Interviews, Coding, and Trustworthiness',
    description: 'Qualitative Research: Interviews, Coding, and Trustworthiness',
    order: 8,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-9',
    title: 'Between-Subjects Experiments: Manipulation, Control, and Inference',
    description: 'Between-Subjects Experiments: Manipulation, Control, and Inference',
    order: 9,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-10',
    title: 'Within-Subjects Designs: Counterbalancing and Repeated Measures',
    description: 'Within-Subjects Designs: Counterbalancing and Repeated Measures',
    order: 10,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-11',
    title: 'Sampling and Recruiting Participants: Field and Online Strategies',
    description: 'Sampling and Recruiting Participants: Field and Online Strategies',
    order: 11,
    software_type: 'all'
  },
  {
    topic_id: 'rm-module-12',
    title: 'Bringing It Together: Applied Decisions and Research Integration',
    description: 'Bringing It Together: Applied Decisions and Research Integration',
    order: 12,
    software_type: 'all'
  }
]

async function importResearchMethodsModules() {
  console.log('=== Importing Research Methods Modules ===\n')

  // Check environment variables
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('✗ Error: PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD environment variables must be set')
    console.error('   Example: export PB_ADMIN_EMAIL="your-email@example.com"')
    console.error('            export PB_ADMIN_PASSWORD="your-password"')
    process.exit(1)
  }

  // Step 1: Authenticate
  try {
    console.log('1. Authenticating as admin...')
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
    console.log('   ✓ Authenticated\n')
  } catch (err) {
    console.error('   ✗ Admin authentication failed:', err.message)
    return
  }

  // Step 2: Get Research Methods class
  console.log('2. Finding Research Methods class (PSYC 4223)...')
  const classes = await pb.collection('classes').getFullList({
    filter: 'code = "PSYC 4223"'
  })

  if (classes.length === 0) {
    console.error('   ✗ PSYC 4223 class not found')
    return
  }

  const rmClass = classes[0]
  console.log(`   ✓ Found: ${rmClass.code} - ${rmClass.name} (ID: ${rmClass.id})\n`)

  // Step 3: Get active semester
  console.log('3. Finding active semester...')
  const semesters = await pb.collection('semesters').getList(1, 10, {
    filter: 'is_active = true'
  })

  if (semesters.items.length === 0) {
    console.error('   ✗ No active semester found')
    return
  }

  const semester = semesters.items[0]
  console.log(`   ✓ Found: ${semester.code} (${semester.name})\n`)

  // Step 4: Import modules
  console.log('4. Creating Research Methods modules...')
  let createdCount = 0
  let skippedCount = 0

  for (const moduleData of researchMethodsModules) {
    try {
      // Check if module already exists
      const existing = await pb.collection('modules').getList(1, 1, {
        filter: `class = "${rmClass.id}" && topic_id = "${moduleData.topic_id}"`
      })

      if (existing.items.length > 0) {
        console.log(`   - Module ${moduleData.order}: "${moduleData.title}" already exists, skipping`)
        skippedCount++
        continue
      }

      // Create module
      const created = await pb.collection('modules').create({
        ...moduleData,
        class: rmClass.id,
        semester: semester.id
      })

      console.log(`   ✓ Module ${moduleData.order}: "${moduleData.title}"`)
      createdCount++
    } catch (err) {
      console.log(`   ✗ Error creating module ${moduleData.order}:`, err.message)
    }
  }

  console.log()
  console.log('=== Import Complete ===')
  console.log(`Modules created: ${createdCount}`)
  console.log(`Modules skipped (already exist): ${skippedCount}`)
  console.log()

  // Step 5: Verify
  console.log('5. Verifying modules...')
  const allRMModules = await pb.collection('modules').getFullList({
    filter: `class = "${rmClass.id}"`,
    sort: 'order'
  })

  console.log(`   ✓ Total modules linked to PSYC 4223: ${allRMModules.length}`)
  allRMModules.forEach((m, i) => {
    console.log(`      ${i + 1}. ${m.title}`)
  })

  console.log()
  console.log('✓ Research Methods class now has 12 modules!')
}

importResearchMethodsModules().catch(console.error)
