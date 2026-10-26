import { test } from 'node:test'
import { ok, strictEqual, deepStrictEqual } from 'node:assert'
import {
  STREAK_NEEDED,
  eligibleObjectives,
  inScopeQuestionIds,
  objectiveSatisfied,
  objectiveStreak,
  onlineReviewComplete,
  pickNextConceptReviewQuestion,
  streakTarget
} from '../src/lib/conceptReviewUnlock.js'
import { getQuestionsForObjective } from '../src/data/questionObjectiveMap.js'
import { conceptEvidence, minPlausibleSeconds, sourceWithFlags } from '../src/lib/answerEvidence.js'
import { classifyAttemptSeen } from '../src/lib/benchmarkPracticeSample.js'
import { markQuestionAnswered, loadConceptReviewCompletion } from '../src/lib/conceptReviewSlipStore.js'

const MODULES = ['stats-module-1', 'stats-module-4', 'stats-module-8', 'rm-module-5']

const allHigh = (moduleId) => Object.fromEntries(eligibleObjectives(moduleId).map((id) => [id, 0.95]))

test('legacy records without history are grandfathered (answered items count as clean)', () => {
  for (const moduleId of MODULES) {
    const ids = inScopeQuestionIds(moduleId)
    const r = onlineReviewComplete({ moduleId, answeredIds: ids, pLByObjective: allHigh(moduleId) })
    strictEqual(r.complete, true, moduleId)
  }
})

test('a streak needs clean correct answers; weak ones and retries are neutral, a miss resets it', () => {
  const moduleId = 'stats-module-4'
  const obj = eligibleObjectives(moduleId).find((id) => getQuestionsForObjective(id).length >= 3)
  ok(obj, 'an objective with 3+ items exists')
  const q = getQuestionsForObjective(obj)
  const h = (items) => items.map(([i, correct, extra]) => ({ id: q[i], correct, ...(extra || {}) }))
  strictEqual(objectiveStreak(obj, h([[0, true], [1, true], [2, true]]), null), 3)
  strictEqual(objectiveStreak(obj, h([[0, true], [1, true, { weak: true }], [2, true]]), null), 2)
  strictEqual(objectiveStreak(obj, h([[0, true], [1, false], [2, true]]), null), 1)
  strictEqual(objectiveStreak(obj, h([[0, false], [0, true, { retry: true }], [1, true]]), null), 1)
  ok(streakTarget(obj, null) === Math.min(STREAK_NEEDED, q.length))
  const answeredIds = q
  const pL = { [obj]: 0.95 }
  strictEqual(objectiveSatisfied(obj, answeredIds, null, pL, h([[0, true], [1, true], [2, true]])), true)
  strictEqual(objectiveSatisfied(obj, answeredIds, null, pL, h([[0, true, { weak: true }], [1, true, { weak: true }], [2, true, { weak: true }]])), false)
  strictEqual(objectiveSatisfied(obj, answeredIds, null, pL, h([[0, true], [1, true], [2, false]])), false)
  strictEqual(objectiveSatisfied(obj, answeredIds, null, { [obj]: 0.5 }, h([[0, true], [1, true], [2, true]])) === (getQuestionsForObjective(obj).every((id) => answeredIds.includes(id))), true)
})

test('answering the whole bank with only weak evidence does not complete the review', () => {
  const moduleId = 'stats-module-4'
  const ids = inScopeQuestionIds(moduleId)
  const history = ids.map((id) => ({ id, correct: true, weak: true }))
  const r = onlineReviewComplete({ moduleId, answeredIds: ids, pLByObjective: allHigh(moduleId), history })
  strictEqual(r.complete, false)
  strictEqual(r.bankExhausted, true)
})

test('next question: never the one just asked; re-asks answered items when a streak is still needed', () => {
  for (const moduleId of MODULES) {
    const ids = inScopeQuestionIds(moduleId)
    const history = ids.map((id) => ({ id, correct: true, weak: true }))
    let last = null
    const seen = new Set()
    for (let i = 0; i < 12; i++) {
      const next = pickNextConceptReviewQuestion({ moduleId, answeredIds: ids, pLByObjective: allHigh(moduleId), history, lastAskedId: last })
      ok(next, `${moduleId} still has something to ask`)
      ok(next !== last, `${moduleId} repeats the last question`)
      seen.add(next)
      history.push({ id: next, correct: true, weak: true })
      last = next
    }
    ok(seen.size >= 2, `${moduleId} varies`)
  }
})

test('a simulated clean student finishes every module in a bounded number of questions', () => {
  for (const moduleId of [...MODULES, 'stats-module-2', 'stats-module-6', 'rm-module-9']) {
    const ids = inScopeQuestionIds(moduleId)
    if (!ids.length || !eligibleObjectives(moduleId).length) continue
    const answered = new Set(), history = []
    const pL = {}
    for (const o of eligibleObjectives(moduleId)) pL[o] = 0.1
    let last = null, steps = 0
    for (; steps < ids.length * 6; steps++) {
      const done = onlineReviewComplete({ moduleId, answeredIds: [...answered], pLByObjective: pL, history })
      if (done.complete) break
      const next = pickNextConceptReviewQuestion({ moduleId, answeredIds: [...answered], pLByObjective: pL, history, lastAskedId: last })
      ok(next, `${moduleId} ran out of questions before completing`)
      answered.add(next); history.push({ id: next, correct: true }); last = next
      for (const o of eligibleObjectives(moduleId)) if (getQuestionsForObjective(o).includes(next)) pL[o] = Math.min(0.99, pL[o] + (1 - pL[o]) * 0.5)
    }
    ok(steps < ids.length * 6, `${moduleId} did not finish (${steps} steps)`)
  }
})

test('a student who misses then answers cleanly still finishes', () => {
  const moduleId = 'stats-module-4'
  const ids = inScopeQuestionIds(moduleId)
  const answered = new Set(), history = []
  const pL = Object.fromEntries(eligibleObjectives(moduleId).map((o) => [o, 0.1]))
  let last = null, steps = 0
  for (; steps < ids.length * 8; steps++) {
    if (onlineReviewComplete({ moduleId, answeredIds: [...answered], pLByObjective: pL, history }).complete) break
    const next = pickNextConceptReviewQuestion({ moduleId, answeredIds: [...answered], pLByObjective: pL, history, lastAskedId: last })
    const miss = steps % 4 === 1
    history.push({ id: next, correct: !miss })
    if (!miss) answered.add(next)
    for (const o of eligibleObjectives(moduleId)) if (getQuestionsForObjective(o).includes(next)) pL[o] = miss ? pL[o] * 0.6 : Math.min(0.99, pL[o] + (1 - pL[o]) * 0.5)
    last = next
  }
  ok(steps < ids.length * 8, `did not finish after ${steps} steps`)
})

test('answer evidence: plausible speed, left page, retries, source flags', () => {
  strictEqual(minPlausibleSeconds('Short?'), 2)
  strictEqual(minPlausibleSeconds(Array(100).fill('word').join(' ')), 8)
  strictEqual(conceptEvidence({ seconds: 20, questionText: 'a b c' }).weak, false)
  deepStrictEqual(conceptEvidence({ seconds: 0.5, questionText: 'a b c' }).reasons, ['too-fast'])
  deepStrictEqual(conceptEvidence({ seconds: 20, hiddenSeconds: 9 }).reasons, ['left-page'])
  strictEqual(conceptEvidence({ seconds: 20, hiddenSeconds: 3 }).weak, false)
  deepStrictEqual(conceptEvidence({ seconds: 0.1, retry: true }).reasons, ['retry'])
  strictEqual(sourceWithFlags('concept_review'), 'concept_review')
  strictEqual(sourceWithFlags('concept_review', ['too-fast', 'left-page']), 'concept_review|too-fast,left-page')
  ok(sourceWithFlags('math_mastery_check', ['paste', 'left-page', 'inserted-text', 'instant-start', 'timed-out']).length <= 64)
  strictEqual(classifyAttemptSeen({ source: 'concept_review|too-fast' }, 'x'), 'concept_review')
  strictEqual(classifyAttemptSeen({ source: 'math_practice' }, 'x'), 'other')
})

test('the slip store keeps an answer history and grandfathers old records', () => {
  const store = {}
  globalThis.localStorage = { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v } }
  markQuestionAnswered('s1', 'stats-module-4', 'q-a', ['q-a', 'q-b'], false)
  markQuestionAnswered('s1', 'stats-module-4', 'q-a', ['q-a', 'q-b'], true, { retry: true })
  markQuestionAnswered('s1', 'stats-module-4', 'q-b', ['q-a', 'q-b'], true, { weak: true })
  const rec = loadConceptReviewCompletion('s1', 'stats-module-4')
  deepStrictEqual(rec.answeredIds, ['q-a', 'q-b'])
  deepStrictEqual(rec.history.map((h) => [h.id, h.correct, h.weak, h.retry]), [['q-a', false, false, false], ['q-a', true, false, true], ['q-b', true, true, false]])
  store['mm-cr-slip:old:stats-module-4'] = JSON.stringify({ answeredIds: ['q-a'], correct: 1, total: 1 })
  markQuestionAnswered('old', 'stats-module-4', 'q-b', ['q-a', 'q-b'], true)
  deepStrictEqual(loadConceptReviewCompletion('old', 'stats-module-4').history.map((h) => h.id), ['q-a', 'q-b'])
})
