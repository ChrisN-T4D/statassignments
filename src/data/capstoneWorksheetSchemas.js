/**
 * Study Plan aggregator: section metadata, emptyCapstoneProject().
 */

import { emptyArticleReviewSection } from './capstoneArticleReviewWorksheet.js'
import { emptyPhase3 } from './capstonePhase3Worksheet.js'
import { emptyPhase4 } from './capstonePhase4Worksheet.js'
import { emptyLitReviewOutline } from './capstoneLitReviewOutlineWorksheet.js'

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
    title: 'Lit Review Outline',
    shortTitle: 'Lit Review Outline',
    description: 'Organizing framework, theme buckets, and compiled outline for your literature review.',
    dueNote: 'Not a Canvas submission — feeds Lit Review Draft 1, Phase 3, and Phase 4.'
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

export function emptyCapstoneProject () {
  return {
    topic: '',
    searchTerms: [],
    articleReview: emptyArticleReviewSection(),
    litReviewOutline: emptyLitReviewOutline(),
    phase3: emptyPhase3(),
    phase4: emptyPhase4()
  }
}

export function getStudyPlanSection (sectionId) {
  return STUDY_PLAN_SECTIONS.find((s) => s.id === sectionId) ?? null
}

/** Resolve dotted path like litReviewOutline.gapAndTransition.workingResearchQuestion */
export function getProjectValue (project, path) {
  if (!project || !path) return ''
  return path.split('.').reduce((obj, key) => (obj && obj[key] != null ? obj[key] : ''), project) || ''
}
