import { test } from 'node:test'
import { deepStrictEqual, strictEqual } from 'node:assert'
import { weekObjectives } from '../src/lib/weekObjectives.js'

test('splits shown and rest by limit', () => {
  const getByModule = (id) => {
    if (id === 'm1') return [{ objectiveId: 'o1', objective: 'A' }, { objectiveId: 'o2', objective: 'B' }]
    if (id === 'm2') return [{ objectiveId: 'o3', objective: 'C' }, { objectiveId: 'o4', objective: 'D' }]
    return []
  }
  const week = {
    items: [
      { kind: 'chapter', moduleId: 'm1' },
      { kind: 'chapter', moduleId: 'm2' }
    ]
  }
  const { shown, rest } = weekObjectives(week, getByModule, 3)
  strictEqual(shown.length, 3)
  strictEqual(rest.length, 1)
  deepStrictEqual(shown.map(o => o.objectiveId), ['o1', 'o2', 'o3'])
  deepStrictEqual(rest.map(o => o.objectiveId), ['o4'])
})

test('ignores non-chapter items and items without moduleId', () => {
  const getByModule = (id) => [{ objectiveId: 'o1', objective: 'A' }]
  const week = {
    items: [
      { kind: 'reading', moduleId: 'm1' },
      { kind: 'chapter' },
      { kind: 'chapter', moduleId: 'm1' }
    ]
  }
  const { shown, rest } = weekObjectives(week, getByModule)
  strictEqual(shown.length, 1)
  strictEqual(rest.length, 0)
})

test('deduplicates objectives across chapters', () => {
  const getByModule = (id) => [{ objectiveId: 'shared', objective: 'Same' }]
  const week = {
    items: [
      { kind: 'chapter', moduleId: 'm1' },
      { kind: 'chapter', moduleId: 'm2' }
    ]
  }
  const { shown, rest } = weekObjectives(week, getByModule)
  strictEqual(shown.length, 1)
  strictEqual(rest.length, 0)
  strictEqual(shown[0].objectiveId, 'shared')
})

test('empty week yields empty shown and rest', () => {
  const { shown, rest } = weekObjectives({ items: [] }, () => [])
  deepStrictEqual(shown, [])
  deepStrictEqual(rest, [])
})
