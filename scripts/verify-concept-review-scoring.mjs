import { scoreConceptAnswer } from '../src/lib/conceptReviewScoring.js'
import {
  markQuestionAnswered,
  loadConceptReviewCompletion,
  freezeSlip
} from '../src/lib/conceptReviewSlipStore.js'
import {
  eligibleObjectives,
  objectiveBankFullyCorrect,
  onlineReviewComplete,
  pickNextConceptReviewQuestion,
  contentHybridObjectivesMissingItems
} from '../src/lib/conceptReviewUnlock.js'
import { canEnterPacketAnswers } from '../src/lib/conceptReviewAccess.js'

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
let saved = loadConceptReviewCompletion('KEY1', 'stats-module-1')
const slipChecks = [
  saved?.correct === 1,
  saved?.total === 1,
  Array.isArray(saved?.answeredIds) && saved.answeredIds.includes('q1') && !saved.answeredIds.includes('q2'),
  !saved?.completedAt,
  saved?.slipFrozen !== true
]
if (!slipChecks.every(Boolean)) {
  console.error('conceptReviewSlipStore mark failed', slipChecks, saved)
  process.exit(1)
}

freezeSlip('KEY1', 'stats-module-1', {
  answeredIds: saved.answeredIds,
  correct: saved.correct,
  total: saved.total,
  completedAt: '2026-08-17T12:00:00.000Z'
})
markQuestionAnswered('KEY1', 'stats-module-1', 'q3', ['q1', 'q2', 'q3'], true)
freezeSlip('KEY1', 'stats-module-1', {
  answeredIds: ['q1', 'q2', 'q3'],
  correct: 99,
  total: 99,
  completedAt: '2026-08-18T12:00:00.000Z'
})
saved = loadConceptReviewCompletion('KEY1', 'stats-module-1')
const freezeChecks = [
  saved?.slipFrozen === true,
  saved?.correct === 1,
  saved?.total === 1,
  saved?.completedAt === '2026-08-17T12:00:00.000Z',
  saved?.answeredIds.includes('q3')
]
if (!freezeChecks.every(Boolean)) {
  console.error('conceptReviewSlipStore freeze failed', freezeChecks, saved)
  process.exit(1)
}

const m1Mastered = {
  'M1-O1': 0.91,
  'M1-O2': 0.91,
  'M1-O3': 0.91,
  'M1-O4': 0.91
}
const m1FloorIds = ['stats-m1-q1', 'stats-m1-q2', 'stats-m1-q16', 'stats-m1-q17', 'stats-m1-q18', 'stats-m1-q19', 'stats-m1-q20', 'stats-m1-q21']
const unlockMastery = onlineReviewComplete({
  moduleId: 'stats-module-1',
  answeredIds: m1FloorIds,
  pLByObjective: m1Mastered
})
if (!unlockMastery.complete || !unlockMastery.masteryOk) {
  console.error('online mastery unlock failed', unlockMastery)
  process.exit(1)
}

const unlockLowPL = onlineReviewComplete({
  moduleId: 'stats-module-1',
  answeredIds: m1FloorIds,
  pLByObjective: { ...m1Mastered, 'M1-O2': 0.4 }
})
if (unlockLowPL.complete) {
  console.error('low pL should not unlock', unlockLowPL)
  process.exit(1)
}

const unlockOneItem = onlineReviewComplete({
  moduleId: 'stats-module-1',
  answeredIds: ['stats-m1-q1', 'stats-m1-q16', 'stats-m1-q18', 'stats-m1-q20'],
  pLByObjective: m1Mastered
})
if (unlockOneItem.complete) {
  console.error('one item per objective should not unlock', unlockOneItem)
  process.exit(1)
}

const m1All = Array.from({ length: 23 }, (_, i) => `stats-m1-q${i + 1}`)
const unlockExhausted = onlineReviewComplete({
  moduleId: 'stats-module-1',
  answeredIds: m1All,
  pLByObjective: { 'M1-O1': 0.1, 'M1-O2': 0.1, 'M1-O3': 0.1, 'M1-O4': 0.1 }
})
if (!unlockExhausted.complete || !unlockExhausted.bankExhausted) {
  console.error('exhausted bank should unlock', unlockExhausted)
  process.exit(1)
}

const m3Eligible = eligibleObjectives('stats-module-3')
if (m3Eligible.includes('M3-O1') || m3Eligible.includes('M3-O2') || m3Eligible.includes('M3-O3')) {
  console.error('software objectives must not be eligible', m3Eligible)
  process.exit(1)
}
if (!m3Eligible.includes('M3-O4') || !m3Eligible.includes('M3-O5')) {
  console.error('hybrid M3 objectives should be eligible', m3Eligible)
  process.exit(1)
}

const nextId = pickNextConceptReviewQuestion({
  moduleId: 'stats-module-1',
  answeredIds: [],
  pLByObjective: {}
})
if (!nextId) {
  console.error('pickNext returned null on empty review')
  process.exit(1)
}

const missing = []
for (let n = 1; n <= 8; n++) {
  const moduleId = `stats-module-${n}`
  const gaps = contentHybridObjectivesMissingItems(moduleId)
  if (gaps.length) missing.push(`${moduleId}: ${gaps.join(', ')}`)
}
if (missing.length) {
  console.error('content/hybrid objectives missing 2 mapped items', missing)
  process.exit(1)
}

// Small-bank fallback: an objective whose mapped items are ALL answered
// correctly is satisfied even when BKT pL has not reached MASTERY_PL.
// M1-O3 maps to 4 items (q18, q19, q22, q23): answering all four must
// complete the objective despite a low pL.
const fallbackComplete = onlineReviewComplete({
  moduleId: 'stats-module-1',
  answeredIds: [...m1FloorIds, 'stats-m1-q22', 'stats-m1-q23'],
  pLByObjective: { ...m1Mastered, 'M1-O3': 0.4 }
})
if (!fallbackComplete.complete || !fallbackComplete.masteryOk) {
  console.error('small-bank fallback should satisfy fully-corrected objective', fallbackComplete)
  process.exit(1)
}

// The fallback requires EVERY mapped item: one unanswered mapped item leaves
// the objective unsatisfied at low pL, even though q18/q19/q22 are correct.
const fallbackPartial = onlineReviewComplete({
  moduleId: 'stats-module-1',
  answeredIds: [...m1FloorIds, 'stats-m1-q22'],
  pLByObjective: { ...m1Mastered, 'M1-O3': 0.4 }
})
if (fallbackPartial.complete) {
  console.error('objective with an un-answered mapped item must not use the fallback', fallbackPartial)
  process.exit(1)
}

const bankOk = objectiveBankFullyCorrect('M1-O3', [...m1FloorIds, 'stats-m1-q22', 'stats-m1-q23'])
if (!bankOk) {
  console.error('objectiveBankFullyCorrect should be true when all mapped items are correct')
  process.exit(1)
}
const bankNotOk = objectiveBankFullyCorrect('M1-O3', ['stats-m1-q18'])
if (bankNotOk) {
  console.error('objectiveBankFullyCorrect should be false when a mapped item is unanswered')
  process.exit(1)
}
const bankDefaultScope = objectiveBankFullyCorrect('M5-O3', ['stats-m5-q17', 'stats-m5-q18', 'stats-m5-q31', 'stats-m5-q32'])
if (!bankDefaultScope) {
  console.error('objectiveBankFullyCorrect without scope should use the full mapped bank')
  process.exit(1)
}

const zeroCorrect = freezeSlip('KEY2', 'stats-module-2', {
  answeredIds: ['a'],
  correct: 0,
  total: 10,
  completedAt: '2026-08-17T12:00:00.000Z'
})
if (zeroCorrect.correct !== 0 || !zeroCorrect.slipFrozen) {
  console.error('offline zero score should freeze', zeroCorrect)
  process.exit(1)
}

const accessChecks = [
  canEnterPacketAnswers({ accessMode: 'offline_primary', role: 'student' }) === true,
  canEnterPacketAnswers({ accessMode: 'online_primary', role: 'student' }) === false,
  canEnterPacketAnswers({ accessMode: 'online_primary', role: 'admin' }) === true,
  canEnterPacketAnswers({ accessMode: 'online_primary', role: 'instructor' }) === true,
  canEnterPacketAnswers({ accessMode: 'online_primary', role: null }) === false
]
if (!accessChecks.every(Boolean)) {
  console.error('canEnterPacketAnswers failed', accessChecks)
  process.exit(1)
}

console.log('conceptReviewScoring ok')
