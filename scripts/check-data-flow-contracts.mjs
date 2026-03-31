import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

function fail(message) {
  console.error(`FAIL: ${message}`)
  process.exitCode = 1
}

function pass(message) {
  console.log(`PASS: ${message}`)
}

function getCollection(schemaJson, name) {
  return schemaJson.find(c => c.name === name) || null
}

function getFieldMap(collection) {
  return new Map((collection?.schema || []).map(f => [f.name, f]))
}

function assertFields(collection, requiredFields) {
  const fields = getFieldMap(collection)
  for (const field of requiredFields) {
    if (!fields.has(field)) {
      fail(`${collection?.name || 'unknown'} missing required field "${field}"`)
    }
  }
}

async function main() {
  const pbImportPath = path.join(rootDir, 'pocketbase_collections_import.json')
  const seedSchemaPath = path.join(rootDir, 'scripts', 'seed-data', 'pocketbase-schema.json')
  const backendMainPath = path.join(rootDir, 'backend', 'main.py')
  const useBktPath = path.join(rootDir, 'src', 'composables', 'useBKT.js')
  const practiceViewPath = path.join(rootDir, 'src', 'views', 'Practice.vue')

  const [pbImportRaw, seedSchemaRaw, backendMainRaw, useBktRaw, practiceViewRaw] = await Promise.all([
    readFile(pbImportPath, 'utf8'),
    readFile(seedSchemaPath, 'utf8'),
    readFile(backendMainPath, 'utf8'),
    readFile(useBktPath, 'utf8'),
    readFile(practiceViewPath, 'utf8')
  ])

  const pbImport = JSON.parse(pbImportRaw)
  const seedSchema = JSON.parse(seedSchemaRaw)

  const practiceAttempts = getCollection(pbImport, 'practice_attempts')
  if (!practiceAttempts) {
    fail('pocketbase_collections_import.json missing practice_attempts collection')
  } else {
    assertFields(practiceAttempts, [
      'user',
      'problem',
      'answer',
      'is_correct',
      'difficulty',
      'active_time_seconds',
      'total_time_seconds',
      'time_maxed_out',
      'idle_detected',
      'time_to_first_selection',
      'answer_changes',
      'time_since_reading',
      'time_since_last_attempt',
      'has_read_topic_before',
      'last_topic_read_time',
      'last_attempt_time'
    ])

    const problemField = getFieldMap(practiceAttempts).get('problem')
    if (problemField?.type !== 'text') {
      fail('practice_attempts.problem must be type "text"')
    } else {
      pass('practice_attempts fields and problem type are aligned')
    }
  }

  const topicReadings = getCollection(pbImport, 'topic_readings')
  if (!topicReadings) {
    fail('pocketbase_collections_import.json missing topic_readings collection')
  } else {
    assertFields(topicReadings, [
      'user',
      'topic_id',
      'module_id',
      'active_time_seconds',
      'total_time_seconds',
      'time_maxed_out',
      'idle_detected',
      'max_scroll_depth',
      'triggered_by_error'
    ])
    pass('topic_readings collection fields are present')
  }

  const lessonMetrics = getCollection(pbImport, 'software_lesson_metrics')
  if (!lessonMetrics) {
    fail('pocketbase_collections_import.json missing software_lesson_metrics collection')
  } else {
    assertFields(lessonMetrics, [
      'user',
      'lesson_id',
      'lesson_title',
      'module',
      'software',
      'event_type',
      'event_payload'
    ])
    pass('software_lesson_metrics collection fields are present')
  }

  const attempts = getCollection(seedSchema, 'attempts')
  if (!attempts) {
    fail('scripts/seed-data/pocketbase-schema.json missing attempts collection')
  } else {
    assertFields(attempts, [
      'time_spent_seconds',
      'active_time_seconds',
      'total_time_seconds',
      'time_maxed_out',
      'idle_detected'
    ])
    pass('seed attempts schema contains timing fields used by app')
  }

  if (!backendMainRaw.includes('problem_id: Optional[str] = None')) {
    fail('backend/main.py BKTUpdateRequest is missing problem_id')
  } else {
    pass('backend BKTUpdateRequest exposes problem_id')
  }

  if (!backendMainRaw.includes('last_topic_read_time: Optional[int] = None')) {
    fail('backend/main.py BKTUpdateRequest is missing last_topic_read_time')
  } else {
    pass('backend BKTUpdateRequest exposes last_topic_read_time')
  }

  if (!backendMainRaw.includes('last_attempt_time: Optional[int] = None')) {
    fail('backend/main.py BKTUpdateRequest is missing last_attempt_time')
  } else {
    pass('backend BKTUpdateRequest exposes last_attempt_time')
  }

  if (!useBktRaw.includes('requestBody.problem_id = problemId')) {
    fail('src/composables/useBKT.js does not forward problem_id')
  } else {
    pass('frontend forwards problem_id to /bkt/update')
  }

  if (!useBktRaw.includes('requestBody.last_topic_read_time = lastTopicReadTime')) {
    fail('src/composables/useBKT.js does not forward last_topic_read_time')
  } else {
    pass('frontend forwards last_topic_read_time to /bkt/update')
  }

  if (!useBktRaw.includes('requestBody.last_attempt_time = lastAttemptTime')) {
    fail('src/composables/useBKT.js does not forward last_attempt_time')
  } else {
    pass('frontend forwards last_attempt_time to /bkt/update')
  }

  if (!practiceViewRaw.includes('last_topic_read_time') || !practiceViewRaw.includes('last_attempt_time')) {
    fail('Practice.vue missing timestamp sequence fields')
  } else {
    pass('Practice.vue includes timestamp sequence fields')
  }

  if (process.exitCode && process.exitCode !== 0) {
    console.error('\nData-flow contract check failed.')
    process.exit(process.exitCode)
  }

  console.log('\nData-flow contract check passed.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

