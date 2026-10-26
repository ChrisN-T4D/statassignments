import test from 'node:test'
import assert from 'node:assert/strict'
import { studyPlanSectionsFor, getStudyPlanSection, emptyCapstoneProject } from '../src/data/capstoneWorksheetSchemas.js'
import { STUDY_PLAN_CLASSES, hasStudyPlan } from '../src/data/studyPlanClasses.js'
import { studyPlanDue, RESEARCH_METHODS_SCHEDULES } from '../src/data/researchMethodsSchedule.js'
import { countArticleCards, countTheorySelectionProgress, buildExportText } from '../src/lib/capstoneValidation.js'
import { studyPlanSectionProgress } from '../src/lib/studyPlanProgress.js'
import { THEORY_MENU } from '../src/data/capstoneTheorySelectionWorksheet.js'

test('Research Methods keeps its sections; Intro to Research gets its own, in order', () => {
  assert.deepEqual(studyPlanSectionsFor('research-methods').map((s) => s.id), ['article-review', 'study-focus', 'phase-4', 'measures-draft'])
  assert.deepEqual(studyPlanSectionsFor('intro-research').map((s) => s.id), ['article-review', 'theory-selection', 'study-focus', 'phase-4', 'measures-draft'])
  assert.deepEqual(studyPlanSectionsFor('statistics'), [])
  assert.equal(hasStudyPlan('intro-research'), true)
  assert.equal(hasStudyPlan('statistics'), false)
})

test('class wording is laid over the shared section', () => {
  assert.equal(getStudyPlanSection('article-review', 'intro-research').title, 'Annotated Bibliography')
  assert.equal(getStudyPlanSection('article-review', 'research-methods').title, 'Article Review')
  assert.equal(getStudyPlanSection('theory-selection', 'research-methods'), null, 'theory selection is Intro to Research only')
  assert.equal(getStudyPlanSection('phase-3', 'intro-research'), null, 'no elevator speech in Intro to Research')
})

test('every Study Plan item in a schedule points at a section its class shows', () => {
  for (const slug of ['intro-research']) {
    const ids = new Set(studyPlanSectionsFor(slug).map((s) => s.id))
    for (const week of RESEARCH_METHODS_SCHEDULES[slug].weeks) {
      for (const it of week.items.filter((i) => i.kind === 'study-plan')) {
        assert.ok(ids.has(it.sectionId), `${slug}: ${it.sectionId} is not a section`)
        assert.ok(it.due, `${slug}: ${it.sectionId} has no due date`)
      }
    }
  }
})

test('due dates come from the class own schedule', () => {
  assert.equal(studyPlanDue('article-review', new Date('2027-01-15T12:00:00'), 'intro-research').due, '2027-02-07')
  assert.equal(studyPlanDue('theory-selection', new Date('2027-01-15T12:00:00'), 'intro-research').due, '2027-02-07')
  assert.equal(studyPlanDue('phase-4', new Date('2027-01-15T12:00:00'), 'intro-research').due, '2027-03-14')
  // Research Methods is unchanged
  assert.equal(studyPlanDue('article-review', new Date('2026-08-20T12:00:00')).due, '2026-09-04')
  assert.equal(studyPlanDue('article-review', new Date('2026-08-20T12:00:00'), 'research-methods').due, '2026-09-04')
  assert.equal(studyPlanDue('theory-selection', new Date('2026-08-20T12:00:00')).status, 'none')
})

test('article minimum follows the class', () => {
  const p = emptyCapstoneProject()
  assert.equal(countArticleCards(p).minRequired, 6)
  assert.equal(countArticleCards(p, STUDY_PLAN_CLASSES['intro-research'].articleMin).minRequired, 5)
  assert.match(studyPlanSectionProgress(p, 'article-review', 'intro-research'), /^0\/5 complete/)
  assert.match(studyPlanSectionProgress(p, 'article-review', 'research-methods'), /^0\/6 complete/)
})

test('annotated bibliography export is just the sources', () => {
  const p = emptyCapstoneProject()
  p.articleReview.articleCards[0].apaReference = 'Smith, J. (2020). A study. Journal, 1(1), 1-10.'
  const intro = buildExportText('article-review', p, 'intro-research')
  const rm = buildExportText('article-review', p)
  assert.match(intro, /Annotated Bibliography/)
  assert.match(intro, /Source 1/)
  assert.doesNotMatch(intro, /Problem Statement|Proposed title/i)
  assert.match(rm, /Article Review and Problem Statement/)
})

test('theory selection: progress, export, and the menu', () => {
  assert.equal(THEORY_MENU.length, 16)
  const p = emptyCapstoneProject()
  assert.equal(countTheorySelectionProgress(p).ready, false)
  p.theorySelection.c1Theory = 'A'
  p.theorySelection.c2Theory = 'B'
  p.theorySelection.c3Theory = 'C'
  p.theorySelection.chosenTheory = 'B'
  assert.equal(countTheorySelectionProgress(p).ready, false, 'needs a justification')
  p.theorySelection.whyItFits = 'Because.'
  assert.equal(countTheorySelectionProgress(p).ready, true)
  assert.match(studyPlanSectionProgress(p, 'theory-selection', 'intro-research'), /chosen and justified/)
  const out = buildExportText('theory-selection', p, 'intro-research')
  assert.match(out, /Theory Selection/)
  assert.match(out, /The theory I choose\nB/)
})
