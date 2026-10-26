/**
 * Study Plan aggregator: section metadata, emptyCapstoneProject().
 * Due dates are not stored here; they come from researchMethodsSchedule.js (studyPlanDue).
 */

import { emptyArticleReviewSection } from './capstoneArticleReviewWorksheet.js'
import { emptyPhase3 } from './capstonePhase3Worksheet.js'
import { emptyPhase4 } from './capstonePhase4Worksheet.js'
import { emptyMeasuresDraft } from './capstoneMeasuresDraftWorksheet.js'
import { emptyLitReviewOutline } from './capstoneLitReviewOutlineWorksheet.js'
import { studyPlanClass } from './studyPlanClasses.js'

export const STUDY_PLAN_SECTIONS = [
  {
    id: 'article-review',
    title: 'Article Review',
    shortTitle: 'Article Review',
    description: 'Unlimited article cards (minimum 6 complete for Canvas), problem statement, and early research questions.',
    submitNote: 'Submit in Canvas with PDF attachments.'
  },
  {
    id: 'study-focus',
    title: 'Lit Review Outline',
    shortTitle: 'Lit Review Outline',
    description: 'Organizing framework, theme buckets, and compiled outline for your literature review.',
    submitNote: 'Not a Canvas submission; feeds your Lit Review Draft 1 and the worksheets after it.'
  },
  {
    id: 'phase-3',
    title: 'Elevator Speech',
    shortTitle: 'Elevator Speech',
    retired: true, // not used this term; kept so saved drafts and links still open
    description: 'Distill your lit review: what we know, the gap, and your study pitch.',
    submitNote: 'Submit in Canvas.'
  },
  {
    id: 'phase-4',
    title: 'Method Choice',
    shortTitle: 'Method Choice',
    description: 'Compare four data-collection pathways and choose one.',
    submitNote: 'Submit in Canvas.'
  },
  {
    id: 'measures-draft',
    title: 'Measures Draft',
    shortTitle: 'Measures Draft',
    description: 'Turn the operational definitions you chose into the survey or protocol you will use.',
    submitNote: 'Submit in Canvas.'
  }
]

export function emptyCapstoneProject () {
  return {
    topic: '',
    searchTerms: [],
    articleReview: emptyArticleReviewSection(),
    litReviewOutline: emptyLitReviewOutline(),
    phase3: emptyPhase3(),
    phase4: emptyPhase4(),
    measuresDraft: emptyMeasuresDraft()
  }
}

/**
 * A section's metadata, with the class's wording laid over it (title, description, submit note).
 * Without a class it returns the Research Methods original.
 */
export function getStudyPlanSection (sectionId, classId = null) {
  const base = STUDY_PLAN_SECTIONS.find((s) => s.id === sectionId)
  const cfg = classId ? studyPlanClass(classId) : null
  if (cfg && cfg.sectionIds && !cfg.sectionIds.includes(sectionId)) return null
  if (!base) return null
  return { ...base, ...(cfg?.overrides?.[sectionId] ?? {}) }
}

/** The sections a class shows, in order, with the class's wording applied. */
export function studyPlanSectionsFor (classId) {
  const cfg = studyPlanClass(classId)
  if (!cfg) return []
  const ids = cfg.sectionIds ?? STUDY_PLAN_SECTIONS.filter((s) => !s.retired).map((s) => s.id)
  return ids.map((id) => getStudyPlanSection(id, classId)).filter(Boolean)
}

/** Resolve dotted path like litReviewOutline.gapAndTransition.workingResearchQuestion */
export function getProjectValue (project, path) {
  if (!project || !path) return ''
  return path.split('.').reduce((obj, key) => (obj && obj[key] != null ? obj[key] : ''), project) || ''
}
