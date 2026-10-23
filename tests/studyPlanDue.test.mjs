import { test } from 'node:test'
import assert from 'node:assert/strict'
import { studyPlanDue, formatStudyPlanDue } from '../src/data/researchMethodsSchedule.js'

const today = new Date('2026-10-22T12:00:00')

test('article-review is past with due date', () => {
  const info = studyPlanDue('article-review', today)
  assert.equal(info.status, 'past')
  assert.equal(info.due, '2026-09-04')
  assert.equal(info.label, 'Article Review')
})

test('phase-4 (Method Choice) is past after its week, labelled by week', () => {
  const info = studyPlanDue('phase-4', today)
  assert.equal(info.status, 'past')
  assert.equal(info.due, null)
  assert.equal(info.dueLabel, 'Week of Oct 12')
  assert.equal(formatStudyPlanDue(info), 'Week of Oct 12')
})

test('phase-4 (Method Choice) is this-week during the week of Oct 12', () => {
  const info = studyPlanDue('phase-4', new Date('2026-10-14T12:00:00'))
  assert.equal(info.status, 'this-week')
  assert.equal(formatStudyPlanDue(info), 'Week of Oct 12')
})

test('a dated item formats as a weekday and date', () => {
  const info = studyPlanDue('study-focus', new Date('2026-09-16T12:00:00'))
  assert.equal(info.status, 'this-week')
  assert.equal(info.due, '2026-09-18')
  assert.equal(formatStudyPlanDue(info), 'Due Fri, Sep 18')
})

test('phase-3 (Elevator Speech) is not scheduled this semester', () => {
  const info = studyPlanDue('phase-3', today)
  assert.equal(info.status, 'none')
  assert.equal(formatStudyPlanDue(info), '')
})

test('unknown section returns none and empty format', () => {
  const info = studyPlanDue('no-such-section', today)
  assert.equal(info.status, 'none')
  assert.equal(formatStudyPlanDue(info), '')
})

test('phase-4 is upcoming before the semester', () => {
  const info = studyPlanDue('phase-4', new Date('2026-08-01T12:00:00'))
  assert.equal(info.status, 'upcoming')
})

test('phase-4 is past after the semester', () => {
  const info = studyPlanDue('phase-4', new Date('2026-12-20T12:00:00'))
  assert.equal(info.status, 'past')
})

test('formatStudyPlanDue handles null', () => {
  assert.equal(formatStudyPlanDue(null), '')
})
