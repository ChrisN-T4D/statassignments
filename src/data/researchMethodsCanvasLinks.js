/**
 * Deep links for PSYC 4223 Research Methods — Pressbooks chapters & Concept Review in Methods Market.
 * Paste full URLs into Canvas (external URL module items or assignment links).
 */

import { PRESSBOOKS_CHAPTERS } from './researchMethodsTextbook.js'

export const METHODS_MARKET_BASE = 'https://methods-market.clneu.com'
export const RESEARCH_METHODS_CLASS = 'research-methods'
export const CANVAS_RESEARCH_METHODS_COURSE_ID = 2406
export const CANVAS_RM_GETTING_STARTED_URL =
  'https://nwosu.instructure.com/courses/2406/pages/getting-started-on-methods-market'
export const PRESSBOOKS_TEXTBOOK_URL = 'https://kpu.pressbooks.pub/psychmethods4e/'

export function conceptReviewPath (moduleId) {
  return `/class/${RESEARCH_METHODS_CLASS}/practice?module=${moduleId}`
}

export function classHomeTabPath (moduleId, tab) {
  return `/class/${RESEARCH_METHODS_CLASS}?module=${moduleId}&tab=${tab}`
}

export function fullUrl (path) {
  return `${METHODS_MARKET_BASE}${path}`
}

/** rm-chapter-N or rm-lab-sampling → rm-module id */
export function topicIdToModuleId (topicId) {
  if (!topicId) return null
  if (topicId === 'rm-lab-sampling') return 'rm-module-lab'
  if (topicId.startsWith('rm-chapter-')) {
    return topicId.replace('rm-chapter-', 'rm-module-')
  }
  return null
}

export function conceptReviewPathForTopicId (topicId) {
  const moduleId = topicIdToModuleId(topicId)
  return moduleId ? conceptReviewPath(moduleId) : null
}

export function conceptReviewAssignment (chapterNumber, moduleId, shortTitle) {
  const label = shortTitle || `Chapter ${chapterNumber}`
  return {
    id: `rm-ch${chapterNumber}-concept-review`,
    name: `Chapter ${chapterNumber}: Concept Review (Methods Market)`,
    type: 'concept-review',
    methodsMarketPath: conceptReviewPath(moduleId),
    tips: [
      'Read the chapter in Methods Market first, then complete Concept Review while ideas are fresh.',
      `Sign in and link your student key so practice for ${label} is tracked.`,
      'Use wrong-answer feedback to fix gaps before capstone drafts and worksheets.'
    ],
    getHelp:
      'Open Concept Review below after reading the chapter in Methods Market (Topics tab). Stuck on a capstone assignment? Use Assignment Help for phase-specific tips.'
  }
}

export const LAB_CONCEPT_REVIEW = {
  id: 'rm-lab-concept-review',
  name: 'Lab: Random assignment & sampling — Concept Review (Methods Market)',
  type: 'concept-review',
  methodsMarketPath: conceptReviewPath('rm-module-lab'),
  tips: [
    'Run the interactive simulations in Concept Review — no separate Pressbooks chapter.',
    'Compare random vs non-random assignment and SRS vs convenience sampling.',
    'Use this lab before or while working on experimental design worksheets.'
  ],
  getHelp:
    'Open Methods Market → Lab module → Concept Review. Bring one question to office hours if the sampling vocabulary is unclear.'
}

/** All Pressbooks chapters + lab with Concept Review URLs (instructor Canvas setup). */
export const RESEARCH_METHODS_CHAPTER_PRACTICE_LINKS = [
  ...PRESSBOOKS_CHAPTERS.map((ch) => ({
    chapterNumber: ch.number,
    moduleId: ch.moduleId,
    shortTitle: ch.shortTitle,
    pressbooksUrl: ch.pressbooksUrl,
    conceptReview: fullUrl(conceptReviewPath(ch.moduleId)),
    classHomeConcepts: fullUrl(classHomeTabPath(ch.moduleId, 'concepts')),
    classHomeTopics: fullUrl(classHomeTabPath(ch.moduleId, 'topics'))
  })),
  {
    chapterNumber: 'Lab',
    moduleId: 'rm-module-lab',
    shortTitle: 'Random assignment & sampling',
    pressbooksUrl: null,
    conceptReview: fullUrl(conceptReviewPath('rm-module-lab')),
    classHomeConcepts: fullUrl(classHomeTabPath('rm-module-lab', 'concepts')),
    classHomeTopics: fullUrl(classHomeTabPath('rm-module-lab', 'lab-sampling'))
  }
]

/** Add methodsMarketPath to RM assignment-help rows that reference a chapter topic. */
export function enrichResearchMethodsAssignment (assignment) {
  if (assignment.methodsMarketPath) return assignment
  const topicId = assignment.practiceLinks?.[0]
  const path = conceptReviewPathForTopicId(topicId)
  if (!path) return assignment
  return { ...assignment, methodsMarketPath: path }
}
