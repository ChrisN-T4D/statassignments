import test from 'node:test'
import assert from 'node:assert/strict'
import { studyPlanSectionsFor, getStudyPlanSection, emptyCapstoneProject } from '../src/data/capstoneWorksheetSchemas.js'
import { STUDY_PLAN_CLASSES, hasStudyPlan } from '../src/data/studyPlanClasses.js'
import { studyPlanDue, RESEARCH_METHODS_SCHEDULES } from '../src/data/researchMethodsSchedule.js'
import { countArticleCards, countTheorySelectionProgress, buildExportText } from '../src/lib/capstoneValidation.js'
import { studyPlanSectionProgress } from '../src/lib/studyPlanProgress.js'
import { THEORY_MENU } from '../src/data/capstoneTheorySelectionWorksheet.js'

test('Research Methods keeps its sections; Intro to Research gets its own, in order', () => {
  assert.deepEqual(studyPlanSectionsFor('research-methods').map((s) => s.id), ['article-review', 'study-focus', 'phase-4', 'measures-draft', 'recruitment-consent', 'ethics-plan', 'methods-section'])
  assert.deepEqual(studyPlanSectionsFor('intro-research').map((s) => s.id), ['article-review', 'theory-selection', 'study-focus', 'question-hypotheses', 'phase-4', 'measures-draft', 'recruitment-consent', 'ethics-plan', 'methods-section', 'analysis-plan'])
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

import {
  buildSocialPost, buildFlierScript, buildConsentForm, buildFacilityConsent, postRequirementStatus, usesFacility,
  irbPacketStatus, recruitmentConsentProgress, emptyRecruitmentConsent, buildRecruitmentConsentExport
} from '../src/data/capstoneRecruitmentConsentWorksheet.js'

function filledRc () {
  const p = emptyCapstoneProject()
  Object.assign(p.recruitmentConsent, {
    participantsOfInterest: 'Adults 18+ who work in healthcare', whyAppropriate: 'They face the stress I study', facilityUse: 'No',
    marketingLine: 'Stressed at work? Help us learn what helps.', courseName: 'Research Methods (PSYC 4223)',
    projectDescription: 'how coping strategies relate to stress in healthcare workers', eligibility: '18 or older and work in healthcare',
    timeToComplete: '10-minute', surveyLink: 'https://forms.example/abc', researcherEmail: 'me@rangers.nwosu.edu', advisorEmail: 'adv@nwosu.edu',
    irbApprovalDate: '11-20-2026', researcherName: 'Pat Ranger', advisorName: 'Dr. Neu', consentTopic: 'your work stress and coping', consentBenefit: 'stress and coping at work'
  })
  p.recruitmentConsent.channels = { flier: true, social: true }
  return p
}

test('social post and flier carry the facts the IRB checks for', () => {
  const rc = filledRc().recruitmentConsent
  const post = buildSocialPost(rc)
  for (const must of ['Northwestern Oklahoma State University', '11-20-2026', 'https://forms.example/abc', 'me@rangers.nwosu.edu', 'adv@nwosu.edu', 'healthcare', '10-minute']) {
    assert.ok(post.includes(must), `post is missing ${must}`)
  }
  const flier = buildFlierScript(rc)
  assert.ok(flier.includes('Institutional Review Board'))
  assert.ok(flier.includes('adv@nwosu.edu'))
  assert.ok(postRequirementStatus(rc).every((r) => r.done))
  assert.equal(postRequirementStatus(emptyRecruitmentConsent()).filter((r) => r.done).length, 1, 'only the NWOSU statement is automatic')
  assert.match(buildSocialPost(emptyRecruitmentConsent()), /\[brief description\]/)
})

test('consent form uses the IRB wording and follows survey mode', () => {
  const rc = filledRc().recruitmentConsent
  const online = buildConsentForm(rc)
  assert.match(online, /Tandy Keenan/)
  assert.match(online, /You must be 18 years old or older/)
  assert.match(online, /possibility of tampering from an outside source/)
  assert.match(online, /By continuing with this survey, I confirm/)
  const paper = buildConsentForm({ ...rc, consentMode: 'paper' })
  assert.doesNotMatch(paper, /tampering from an outside source/)
  assert.match(paper, /Signature:/)
  assert.match(buildConsentForm({ ...rc, consentRisks: 'Some questions may be upsetting.' }), /Risks: Some questions may be upsetting\./)
})

test('facility consent appears only when a facility is named', () => {
  assert.equal(usesFacility({ facilityUse: 'No' }), false)
  assert.equal(usesFacility({ facilityUse: 'n/a' }), false)
  assert.equal(usesFacility({ facilityUse: '' }), false)
  assert.equal(usesFacility({ facilityUse: 'Alva Counseling Center' }), true)
  const out = buildFacilityConsent({ facilityName: 'Alva Counseling Center', researcherName: 'Pat Ranger', facilityPurpose: 'to study coping' })
  assert.match(out, /Alva Counseling Center/)
  assert.match(out, /Pat Ranger/)
})

test('the IRB packet checklist tracks what is missing', () => {
  const empty = emptyCapstoneProject()
  assert.equal(recruitmentConsentProgress(empty).ready, false)
  const p = filledRc()
  const ids = irbPacketStatus(p).map((i) => i.id)
  assert.deepEqual(ids, ['who', 'scripts', 'social', 'consent', 'survey'])
  assert.equal(irbPacketStatus(p).find((i) => i.id === 'scripts').done, false, 'flier and social scripts not written yet')
  p.recruitmentConsent.flierScript = 'flier'
  p.recruitmentConsent.socialPost = 'post'
  p.recruitmentConsent.socialPlatforms = 'Instagram'
  p.recruitmentConsent.socialDistribution = 'my account'
  p.recruitmentConsent.socialLogPlan = 'screenshots'
  assert.equal(irbPacketStatus(p).find((i) => i.id === 'scripts').done, true)
  assert.equal(irbPacketStatus(p).find((i) => i.id === 'social').done, true)
  p.recruitmentConsent.facilityUse = 'A clinic'
  assert.ok(irbPacketStatus(p).some((i) => i.id === 'facility'))
  assert.match(buildRecruitmentConsentExport(p), /Appendix C: Facility Consent/)
  assert.match(buildRecruitmentConsentExport(p), /Appendix A: Informed Consent/)
  assert.match(buildExportText('recruitment-consent', p), /Participant Recruitment Procedures/)
})


import { GUIDED_WORKSHEETS, guidedProgress, guidedProgressLabel, buildGuidedExport, emptyGuidedAnswers } from '../src/data/guidedWorksheets.js'

test('guided worksheets: every field is saved on the project, and every section has a worksheet', () => {
  const p = emptyCapstoneProject()
  for (const [id, ws] of Object.entries(GUIDED_WORKSHEETS)) {
    assert.ok(p[ws.key], `${id} has no saved answers on the project`)
    const ids = ws.blocks.flatMap((b) => b.fields.map((f) => f.id))
    assert.equal(new Set(ids).size, ids.length, `${id} has duplicate field ids`)
    for (const f of ids) assert.equal(p[ws.key][f], '')
    assert.ok(ws.blocks.some((b) => b.fields.some((f) => f.required)), `${id} has no required field`)
  }
  assert.deepEqual(Object.keys(emptyGuidedAnswers()).sort(), ['analysisPlan', 'ethicsPlan', 'methodsSection', 'questionHypotheses'])
})

test('guided worksheets: progress counts required fields, export lists every field', () => {
  const p = emptyCapstoneProject()
  assert.equal(guidedProgressLabel(p, 'methods-section'), 'Not started')
  p.methodsSection.design = 'A survey design.'
  assert.match(guidedProgressLabel(p, 'methods-section'), /^1\/5 required parts/)
  for (const f of ['participants', 'recruitment', 'instruments', 'procedures']) p.methodsSection[f] = 'x'
  assert.equal(guidedProgress(p, 'methods-section').ready, true)
  assert.equal(guidedProgressLabel(p, 'methods-section'), 'Required parts done')
  const out = buildExportText('methods-section', p, 'intro-research')
  assert.match(out, /Methods Section\n=+/)
  assert.match(out, /A survey design\./)
  assert.equal(studyPlanSectionProgress(p, 'methods-section', 'intro-research'), 'Required parts done')
})

test('guided worksheets: copy-from buttons only fill what is empty', () => {
  const p = emptyCapstoneProject()
  const ms = GUIDED_WORKSHEETS['methods-section']
  const fromRc = ms.prefills.find((x) => x.id === 'fromRecruitment')
  assert.equal(fromRc.when(p), false)
  p.recruitmentConsent.participantsOfInterest = 'Adults who work in healthcare.'
  p.recruitmentConsent.whyAppropriate = 'They face the stress I study.'
  p.recruitmentConsent.channels = { flier: true, social: true }
  assert.equal(fromRc.when(p), true)
  const patch = fromRc.apply(p)
  assert.match(patch.participants, /healthcare/)
  assert.match(patch.recruitment, /printed fliers, social media posts/)
  p.methodsSection.participants = 'Already written.'
  assert.equal(fromRc.apply(p).participants, undefined, 'does not overwrite')
  const qh = GUIDED_WORKSHEETS['question-hypotheses'].prefills[0]
  p.litReviewOutline.gapAndTransition.workingResearchQuestion = 'Does X relate to Y?'
  assert.equal(qh.apply(p).researchQuestion, 'Does X relate to Y?')
  const ap = GUIDED_WORKSHEETS['analysis-plan'].prefills[0]
  p.questionHypotheses.hypotheses = 'H1: X predicts Y.'
  assert.equal(ap.apply(p).hypothesisRecap, 'H1: X predicts Y.')
})
