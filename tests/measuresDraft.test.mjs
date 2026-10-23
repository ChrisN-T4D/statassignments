import { test } from 'node:test'
import assert from 'node:assert/strict'
import { countMeasuresDraftProgress, buildExportText } from '../src/lib/capstoneValidation.js'

const SURVEY_ID = 'pathway-1-survey'
const EXP_ID = 'pathway-2-experimental'

function makeProject(pathwayId, measures) {
  return {
    phase4: { chosenPathwayId: pathwayId, ivOperational: 'Hours of sleep', dvOperational: 'PSS-10 total' },
    measuresDraft: measures
  }
}

test('no pathway chosen', () => {
  const p = { phase4: {}, measuresDraft: {} }
  const r = countMeasuresDraftProgress(p)
  assert.equal(r.chosen, false)
  assert.equal(r.filled, 0)
  assert.equal(r.ready, false)
})

test('unknown pathway id', () => {
  const p = makeProject('stale-id', {})
  const r = countMeasuresDraftProgress(p)
  assert.equal(r.chosen, false)
})

test('survey all required filled', () => {
  const p = makeProject(SURVEY_ID, {
    surveyIntro: 'x', surveyIvItems: 'x', surveyDvItems: 'x', surveyScoring: 'x', surveyOther: ''
  })
  const r = countMeasuresDraftProgress(p)
  assert.equal(r.chosen, true)
  assert.equal(r.filled, 4)
  assert.equal(r.total, 5)
  assert.equal(r.requiredFilled, 4)
  assert.equal(r.requiredTotal, 4)
  assert.equal(r.ready, true)
})

test('survey partial', () => {
  const p = makeProject(SURVEY_ID, { surveyIntro: 'x', surveyIvItems: 'x' })
  const r = countMeasuresDraftProgress(p)
  assert.equal(r.filled, 2)
  assert.equal(r.requiredFilled, 2)
  assert.equal(r.ready, false)
})

test('whitespace-only not filled', () => {
  const p = makeProject(SURVEY_ID, { surveyIntro: '   ' })
  const r = countMeasuresDraftProgress(p)
  assert.equal(r.filled, 0)
})

test('experimental chosen but survey fields filled', () => {
  const p = makeProject(EXP_ID, { surveyIntro: 'x', surveyIvItems: 'x' })
  const r = countMeasuresDraftProgress(p)
  assert.equal(r.filled, 0)
  assert.equal(r.ready, false)
})

test('buildExportText survey includes key info', () => {
  const p = makeProject(SURVEY_ID, { surveyIntro: 'Hello' })
  const out = buildExportText('measures-draft', p)
  assert.ok(out.includes('Survey'))
  assert.ok(out.includes('Hours of sleep'))
  assert.ok(out.includes('PSS-10 total'))
  assert.ok(out.includes('Build your survey'))
  assert.ok(out.includes('Hello'))
  assert.ok(out.includes('(not filled in)'))
})

test('buildExportText no pathway chosen', () => {
  const out = buildExportText('measures-draft', { phase4: {} })
  assert.ok(out.includes('Choose your pathway in Method Choice first.'))
})
