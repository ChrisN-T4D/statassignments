import { test } from 'node:test'
import { strictEqual } from 'node:assert'
import { pickRefresher } from '../src/lib/refresher.js'

const weeks = [
  { items: [{ kind: 'chapter', moduleId: 'm1' }] },
  { items: [{ kind: 'chapter', moduleId: 'm2' }] },
  { items: [{ kind: 'chapter', moduleId: 'm3' }] }
]

const objectives = [
  { objectiveId: 'o1', objective: 'Objective 1', moduleId: 'm1' },
  { objectiveId: 'o2', objective: 'Objective 2', moduleId: 'm2' },
  { objectiveId: 'o3', objective: 'Objective 3', moduleId: 'm3' },
  { objectiveId: 'o4', objective: 'Objective 4', moduleId: 'm1' }
]

test('picks weakest earlier objectives', () => {
  const states = {
    o1: { pL: 0.3 },
    o2: { pL: 0.5 },
    o3: { pL: 0.1 }
  }
  const result = pickRefresher(states, weeks, 2, objectives)
  strictEqual(result.length, 2)
  strictEqual(result[0].objectiveId, 'o1')
  strictEqual(result[0].mastery, 30)
  strictEqual(result[1].objectiveId, 'o2')
  strictEqual(result[1].mastery, 50)
})

test('skips objectives with no state', () => {
  const states = { o1: { pL: 0.3 } }
  const result = pickRefresher(states, weeks, 2, objectives)
  strictEqual(result.length, 1)
  strictEqual(result[0].objectiveId, 'o1')
})

test('skips objectives at or above threshold', () => {
  const states = {
    o1: { pL: 0.3 },
    o2: { pL: 0.6 },
    o4: { pL: 0.7 }
  }
  const result = pickRefresher(states, weeks, 2, objectives)
  strictEqual(result.length, 1)
  strictEqual(result[0].objectiveId, 'o1')
})

test('respects limit option', () => {
  const states = {
    o1: { pL: 0.2 },
    o2: { pL: 0.3 },
    o4: { pL: 0.4 }
  }
  const result = pickRefresher(states, weeks, 2, objectives, { limit: 2 })
  strictEqual(result.length, 2)
  strictEqual(result[0].objectiveId, 'o1')
  strictEqual(result[1].objectiveId, 'o2')
})

test('returns empty for first week', () => {
  const states = { o1: { pL: 0.3 } }
  const result = pickRefresher(states, weeks, 0, objectives)
  deepStrictEqual(result, [])
})
