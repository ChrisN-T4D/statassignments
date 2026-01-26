// Add slug field to classes and update with friendly URLs
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pb.c.robpneu.com')

const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD

async function addClassSlugs() {
  console.log('Adding slug field to classes...\n')

  // Authenticate
  await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
  console.log('✓ Authenticated\n')

  // Get collections
  const collections = await pb.send('/api/collections', { method: 'GET' })
  const classesId = collections.items.find(c => c.name === 'classes')?.id

  // Get full classes collection
  const fullClassesCol = await pb.send(`/api/collections/${classesId}`, { method: 'GET' })

  // Add slug field if it doesn't exist
  const hasSlugField = fullClassesCol.fields.some(f => f.name === 'slug')

  if (!hasSlugField) {
    fullClassesCol.fields.push({
      id: `text${Date.now()}`,
      name: 'slug',
      type: 'text',
      required: true,
      presentable: false,
      system: false,
      hidden: false,
      autogeneratePattern: '',
      pattern: '^[a-z0-9-]+$',
      min: 0,
      max: 0
    })

    await pb.send(`/api/collections/${classesId}`, {
      method: 'PATCH',
      body: JSON.stringify(fullClassesCol)
    })

    console.log('✓ Added slug field to classes\n')
  } else {
    console.log('⚠️  Slug field already exists\n')
  }

  // Update existing classes with slugs
  const classes = await pb.collection('classes').getFullList()
  console.log('Updating classes with slugs...')

  for (const cls of classes) {
    let slug = ''
    if (cls.code === 'PSYC 4213') {
      slug = 'statistics'
    } else if (cls.code === 'PSYC 4223') {
      slug = 'research-methods'
    }

    if (slug) {
      try {
        await pb.collection('classes').update(cls.id, { slug })
        console.log(`  ✓ Updated ${cls.code} with slug: ${slug}`)
      } catch (err) {
        console.log(`  ✗ Error updating ${cls.code}:`, err.message)
      }
    }
  }

  console.log('\n=== Class URLs ===')
  const updatedClasses = await pb.collection('classes').getFullList()
  updatedClasses.forEach(c => {
    console.log(`  ${c.code} (${c.name}): http://localhost:5173/class/${c.slug}`)
  })
}

addClassSlugs().catch(console.error)
