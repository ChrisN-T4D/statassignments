import { scoreConceptAnswer } from '../src/lib/conceptReviewScoring.js'
import { markQuestionAnswered, loadConceptReviewCompletion } from '../src/lib/conceptReviewSlipStore.js'

const mc = {
  type: 'multiple_choice',
  correct: 'b',
  feedback: { correct: 'yes', incorrect: 'no' }
}
const tf = {
  type: 'true_false',
  correct: true,
  feedback: { correct: 't-yes', incorrect: 't-no' }
}
const ms = {
  type: 'multiple_select',
  correct: ['a', 'c'],
  feedback: { correct: 'ms-yes', incorrect: 'ms-no' }
}

const checks = [
  scoreConceptAnswer(mc, 'b').correct === true,
  scoreConceptAnswer(mc, 'a').correct === false,
  scoreConceptAnswer(tf, true).correct === true,
  scoreConceptAnswer(tf, 'false').correct === false,
  scoreConceptAnswer(ms, ['c', 'a']).correct === true,
  scoreConceptAnswer(ms, ['a']).correct === false
]

if (!checks.every(Boolean)) {
  console.error('conceptReviewScoring failed', checks)
  process.exit(1)
}

const memory = new Map()
globalThis.localStorage = {
  getItem(key) {
    return memory.has(key) ? memory.get(key) : null
  },
  setItem(key, value) {
    memory.set(key, String(value))
  }
}

const allIds = ['q1', 'q2']
markQuestionAnswered('KEY1', 'stats-module-1', 'q1', allIds, true)
markQuestionAnswered('KEY1', 'stats-module-1', 'q1', allIds, false)
markQuestionAnswered('KEY1', 'stats-module-1', 'q2', allIds, false)
const saved = loadConceptReviewCompletion('KEY1', 'stats-module-1')
const slipChecks = [
  saved?.correct === 1,
  saved?.total === 2,
  Array.isArray(saved?.answeredIds) && saved.answeredIds.includes('q1') && saved.answeredIds.includes('q2'),
  Boolean(saved?.completedAt)
]
if (!slipChecks.every(Boolean)) {
  console.error('conceptReviewSlipStore failed', slipChecks, saved)
  process.exit(1)
}

console.log('conceptReviewScoring ok')
