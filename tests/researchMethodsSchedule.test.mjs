import { test } from 'node:test'
import { strictEqual, ok } from 'node:assert'
import {
  findTargetWeek,
  itemMatches,
  parseWeekRef,
  weekRef,
  RESEARCH_METHODS_SCHEDULES,
} from '../src/data/researchMethodsSchedule.js'

const today = new Date('2026-10-22T12:00:00')

test('itemMatches: chapter by id', () => {
  ok(itemMatches({ kind: 'chapter', moduleId: 'rm-module-4' }, { kind: 'chapter', id: 4 }))
  ok(!itemMatches({ kind: 'chapter', moduleId: 'rm-module-4' }, { kind: 'chapter', id: 5 }))
})

test('itemMatches: assignment-help by id', () => {
  ok(itemMatches({ kind: 'assignment-help', assignmentId: 'x' }, { kind: 'assignment-help', id: 'x' }))
  ok(!itemMatches({ kind: 'assignment-help', assignmentId: 'x' }, { kind: 'assignment-help', id: 'y' }))
  ok(!itemMatches({ kind: 'chapter', moduleId: 'rm-module-1' }, { kind: 'assignment-help', id: 'x' }))
})

test('parseWeekRef: valid and invalid refs', () => {
  const ref = parseWeekRef('research-methods.3')
  ok(ref)
  strictEqual(ref.weekIndex, 3)
  strictEqual(ref.schedule.slug, 'research-methods')
  ok(!parseWeekRef('nope.1'))
  ok(!parseWeekRef('research-methods.99'))
  ok(!parseWeekRef(undefined))
})

test('weekRef: builds ref string', () => {
  strictEqual(weekRef(RESEARCH_METHODS_SCHEDULES['experimental'], 2), 'experimental.2')
})

test('findTargetWeek: no target returns current week', () => {
  const ref = findTargetWeek(null, { today })
  ok(ref)
  strictEqual(ref.schedule.slug, 'research-methods')
  strictEqual(ref.weekIndex, 9)
})

test('findTargetWeek: chapter 12 resolves to experimental week 0', () => {
  const ref = findTargetWeek({ kind: 'chapter', id: 12 }, { today })
  ok(ref)
  strictEqual(ref.schedule.slug, 'experimental')
  strictEqual(ref.weekIndex, 0)
})

test('findTargetWeek: from wins when that week lists the chapter', () => {
  const ref = findTargetWeek({ kind: 'chapter', id: 4 }, { from: 'research-methods.3', today })
  ok(ref)
  strictEqual(ref.weekIndex, 3)
})

test('findTargetWeek: from ignored when that week lacks the chapter', () => {
  const ref = findTargetWeek({ kind: 'chapter', id: 4 }, { from: 'research-methods.0', today })
  ok(ref)
  // week 0 has no Ch. 4, so it falls back to the current week (9), which lists a Ch. 4 revisit
  strictEqual(ref.weekIndex, 9)
})

test('findTargetWeek: null when no schedule is active', () => {
  const ref = findTargetWeek(null, { today: new Date('2026-07-01T12:00:00') })
  ok(!ref)
})
