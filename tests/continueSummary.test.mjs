import { test } from 'node:test'
import assert from 'node:assert/strict'
import { continueSummary, itemLink } from '../src/lib/continueSummary.js'
import { RESEARCH_METHODS_SCHEDULES } from '../src/data/researchMethodsSchedule.js'

const fall = RESEARCH_METHODS_SCHEDULES['research-methods']

test('week of Oct 19 points at the Measures draft', () => {
  const s = continueSummary(fall, 'research-methods', new Date('2026-10-22T12:00:00'))
  assert.equal(s.weekNumber, 10)
  assert.equal(s.due.due, '2026-10-23')
  assert.ok(s.next.to.path.startsWith('/class/research-methods/study-plan/'))
  assert.equal(s.next.to.query.from, 'research-methods.9')
})

test('null before and after the semester', () => {
  assert.equal(continueSummary(fall, 'research-methods', new Date('2026-07-01T12:00:00')), null)
  assert.equal(continueSummary(fall, 'research-methods', new Date('2027-01-10T12:00:00')), null)
})

test('itemLink covers chapters, help pages and plain tasks', () => {
  assert.deepEqual(itemLink({ kind: 'chapter', moduleId: 'rm-module-4' }, 'research-methods', 'research-methods.3'),
    { path: '/topic/rm-chapter-4', query: { from: 'research-methods.3' } })
  assert.equal(itemLink({ kind: 'task' }, 'research-methods', 'x'), null)
  assert.equal(itemLink({ kind: 'assignment-help', assignmentId: 'rm-theory-selection' }, 'research-methods', 'x').path,
    '/class/research-methods/assignment-help/rm-theory-selection')
})
