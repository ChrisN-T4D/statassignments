/**
 * Study Plan aggregator: section metadata, study-focus fields, emptyCapstoneProject().
 */

import { emptyArticleReviewSection } from './capstoneArticleReviewWorksheet.js'
import { emptyPhase3 } from './capstonePhase3Worksheet.js'
import { emptyPhase4 } from './capstonePhase4Worksheet.js'

export const STUDY_PLAN_SECTIONS = [
  {
    id: 'article-review',
    title: 'Article Review',
    shortTitle: 'Article Review',
    description: 'Unlimited article cards (minimum 6 complete for Canvas), problem statement, and early research questions.',
    dueNote: 'Due week 4 — submit in Canvas with PDF attachments.'
  },
  {
    id: 'study-focus',
    title: 'Study Focus',
    shortTitle: 'Study Focus',
    description: 'Working notes while you draft your literature review (weeks 5–10).',
    dueNote: 'Not a Canvas submission — feeds Phase 3 and Phase 4.'
  },
  {
    id: 'phase-3',
    title: 'Phase 3 — Elevator Speech',
    shortTitle: 'Phase 3',
    description: 'Distill your lit review: what we know, the gap, and your study pitch.',
    dueNote: 'Due week 11 — submit with Phase 4 in Canvas.'
  },
  {
    id: 'phase-4',
    title: 'Phase 4 — Operationalization',
    shortTitle: 'Phase 4',
    description: 'Compare four data-collection pathways and choose one.',
    dueNote: 'Due week 11 — submit with Phase 3 in Canvas.'
  }
]

export const STUDY_FOCUS_FIELDS = [
  {
    id: 'workingGap',
    label: 'Working gap',
    exportLabel: 'Working gap (draft as lit review evolves)',
    required: false,
    multiline: true,
    helpTopicId: 'rm-chapter-2',
    helpNote: 'What is still unknown or contested? Update as you read more articles.'
  },
  {
    id: 'workingResearchQuestion',
    label: 'Working research question',
    exportLabel: 'Working research question (optional)',
    required: false,
    multiline: true,
    helpTopicId: 'rm-chapter-2',
    helpNote: 'A draft question in plain language; refine in your lit review prose.'
  },
  {
    id: 'litReviewThemes',
    label: 'Lit review themes',
    exportLabel: 'What the field agrees on (theme notes)',
    required: false,
    multiline: true,
    helpTopicId: 'rm-chapter-2',
    helpNote: 'Bullet notes on consensus, disagreements, or patterns across sources.'
  },
  {
    id: 'sourcesToCite',
    label: 'Sources to cite',
    exportLabel: 'Sources to remember citing',
    required: false,
    multiline: true,
    helpTopicId: 'rm-chapter-11',
    helpNote: 'Reminder list — not a duplicate of your article cards.'
  }
]

export function emptyStudyFocus () {
  const studyFocus = {}
  for (const field of STUDY_FOCUS_FIELDS) {
    studyFocus[field.id] = ''
  }
  return studyFocus
}

export function emptyCapstoneProject () {
  return {
    topic: '',
    searchTerms: [],
    articleReview: emptyArticleReviewSection(),
    studyFocus: emptyStudyFocus(),
    phase3: emptyPhase3(),
    phase4: emptyPhase4()
  }
}

export function getStudyPlanSection (sectionId) {
  return STUDY_PLAN_SECTIONS.find((s) => s.id === sectionId) ?? null
}

/** Resolve dotted path like studyFocus.workingGap on project object. */
export function getProjectValue (project, path) {
  if (!project || !path) return ''
  return path.split('.').reduce((obj, key) => (obj && obj[key] != null ? obj[key] : ''), project) || ''
}
