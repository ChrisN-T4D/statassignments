// Test PocketBase connection and collections
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pb.c.robpneu.com')

async function testConnection() {
  console.log('Testing PocketBase connection...\n')

  // Test 1: Health check
  try {
    const health = await fetch('https://pb.c.robpneu.com/api/health')
    const data = await health.json()
    console.log('✓ Health check:', data.message)
  } catch (err) {
    console.log('✗ Health check failed:', err.message)
    return
  }

  // Test 2: Check collections exist
  const expectedCollections = ['semesters', 'roster', 'modules', 'items', 'attempts']

  for (const collectionName of expectedCollections) {
    try {
      // Try to list records (with limit 1 to be quick)
      await pb.collection(collectionName).getList(1, 1)
      console.log(`✓ Collection '${collectionName}' exists`)
    } catch (err) {
      console.log(`✗ Collection '${collectionName}' not found or not accessible`)
      console.log(`  Error: ${err.message}`)
    }
  }

  console.log('\n--- Collection Contents ---\n')

  // Test 3: Check for seed data
  try {
    const semesters = await pb.collection('semesters').getList(1, 10)
    console.log(`Semesters: ${semesters.items.length} found`)
    semesters.items.forEach(s => {
      console.log(`  - ${s.code} (${s.name || 'No name'}) ${s.is_active ? '[ACTIVE]' : ''}`)
    })
  } catch (err) {
    console.log('Could not fetch semesters:', err.message)
  }

  try {
    const modules = await pb.collection('modules').getList(1, 10)
    console.log(`\nModules: ${modules.items.length} found`)
    modules.items.forEach(m => {
      console.log(`  - ${m.title} (${m.topic_id}) - ${m.software_type}`)
    })
  } catch (err) {
    console.log('Could not fetch modules:', err.message)
  }

  try {
    const items = await pb.collection('items').getList(1, 5)
    console.log(`\nItems: ${items.totalItems} total (showing first ${items.items.length})`)
    items.items.forEach(i => {
      console.log(`  - ${i.prompt.substring(0, 60)}... (${i.item_type})`)
    })
  } catch (err) {
    console.log('Could not fetch items:', err.message)
  }

  try {
    const roster = await pb.collection('roster').getList(1, 10)
    console.log(`\nRoster: ${roster.items.length} entries found`)
    roster.items.forEach(r => {
      console.log(`  - ${r.student_key} ${r.user ? '(claimed)' : '(unclaimed)'}`)
    })
  } catch (err) {
    console.log('Could not fetch roster:', err.message)
  }

  console.log('\n--- Test Complete ---')
}

testConnection().catch(console.error)
