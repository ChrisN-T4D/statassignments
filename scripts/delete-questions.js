// Delete all practice questions from PocketBase
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pb.c.robpneu.com')

// Get credentials from command line arguments
const USER_EMAIL = process.argv[2]
const USER_PASSWORD = process.argv[3]

if (!USER_EMAIL || !USER_PASSWORD) {
  console.error('Usage: node scripts/delete-questions.js <user-email> <user-password>')
  process.exit(1)
}

async function deleteQuestions() {
  try {
    // Authenticate as user
    await pb.collection('users').authWithPassword(USER_EMAIL, USER_PASSWORD)
    console.log('✓ Authenticated as user:', pb.authStore.record?.email)

    // Get all questions
    const records = await pb.collection('practice_problems').getFullList()
    console.log(`Found ${records.length} questions to delete`)

    let deleted = 0
    for (const record of records) {
      try {
        await pb.collection('practice_problems').delete(record.id)
        deleted++
        if (deleted % 10 === 0) {
          console.log(`  Deleted ${deleted}/${records.length}...`)
        }
      } catch (err) {
        console.error(`  Error deleting question ${record.id}:`, err.message)
      }
    }

    console.log(`\n✓ Deleted ${deleted} questions`)
  } catch (err) {
    console.error('Failed to delete questions:', err.message)
    process.exit(1)
  }
}

deleteQuestions()
