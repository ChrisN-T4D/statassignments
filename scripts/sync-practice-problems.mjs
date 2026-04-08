/**
 * Upsert canonical concept review questions from src/data/conceptQuestions.js into PocketBase practice_problems.
 *
 * Usage:
 *   POCKETBASE_URL=https://your-pb.example.com node scripts/sync-practice-problems.mjs <email> <password>
 *
 * Requires admin (or rule allowing create/update on practice_problems).
 */
import PocketBase from 'pocketbase'
import { allConceptReviewQuestions } from '../src/data/conceptQuestions.js'

const baseUrl = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'
const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error('Usage: POCKETBASE_URL=<url> node scripts/sync-practice-problems.mjs <admin-email> <password>')
  console.error('Example: POCKETBASE_URL=https://pb.example.com node scripts/sync-practice-problems.mjs admin@example.com secret')
  process.exit(1)
}

function toRecord(question) {
  const correct_answer = Array.isArray(question.correct)
    ? JSON.stringify(question.correct)
    : String(question.correct)
  return {
    question_id: question.id,
    topic_id: question.moduleId,
    question: question.question,
    question_type: question.type,
    options: question.options ? JSON.stringify(question.options) : null,
    correct_answer,
    explanation: question.feedback?.correct ?? null,
    hint: question.feedback?.incorrect ?? null,
    difficulty: question.difficulty || 'medium'
  }
}

async function main() {
  const pb = new PocketBase(baseUrl)
  console.log('PocketBase:', baseUrl)
  await pb.collection('users').authWithPassword(email, password)
  console.log('Authenticated as', pb.authStore.record?.email)

  console.log('Loading existing practice_problems…')
  const existing = await pb.collection('practice_problems').getFullList({ batch: 500 })
  const byQuestionId = new Map()
  for (const r of existing) {
    if (r.question_id) byQuestionId.set(r.question_id, r)
  }

  let created = 0
  let updated = 0
  let errors = 0

  for (const question of allConceptReviewQuestions) {
    const body = toRecord(question)
    const prev = byQuestionId.get(question.id)
    try {
      if (prev) {
        await pb.collection('practice_problems').update(prev.id, body)
        updated++
      } else {
        await pb.collection('practice_problems').create(body)
        created++
      }
    } catch (err) {
      errors++
      console.error(`  ✗ ${question.id}:`, err?.message || err)
    }
    if ((created + updated) % 50 === 0 && created + updated > 0) {
      console.log(`  … ${created + updated} / ${allConceptReviewQuestions.length}`)
    }
  }

  console.log('\nDone.')
  console.log('  Created:', created)
  console.log('  Updated:', updated)
  console.log('  Errors:', errors)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
