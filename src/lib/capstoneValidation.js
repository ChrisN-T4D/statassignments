/**
 * Study Plan export helpers: format student text for Canvas paste.
 * No pass/fail validation; guide-only.
 */

import {
  ARTICLE_REVIEW_HEADER_FIELDS,
  ARTICLE_CARD_FIELDS,
  ARTICLE_REVIEW_PROBLEM_STATEMENT,
  ARTICLE_REVIEW_RQ_HYPOTHESIS,
  ARTICLE_REVIEW_MIN_ARTICLES,
  ARTICLE_REVIEW_CANVAS_RANGE_LABEL
} from '../data/capstoneArticleReviewWorksheet.js'
import { PHASE3_PARTS, elevatorSpeechWordCount } from '../data/capstonePhase3Worksheet.js'
import { MEASURES_PATHWAYS, measuresFieldsForPathway } from '../data/capstoneMeasuresDraftWorksheet.js'
import {
  PHASE4_PARTS,
  PHASE4_PATHWAYS,
  PHASE4_COMPARISON_CRITERIA
} from '../data/capstonePhase4Worksheet.js'
import { CANDIDATE_FIELDS, CHOICE_FIELDS } from '../data/capstoneTheorySelectionWorksheet.js'
import { buildRecruitmentConsentExport } from '../data/capstoneRecruitmentConsentWorksheet.js'
import { buildGuidedExport, guidedWorksheet } from '../data/guidedWorksheets.js'
import {
  compileLitReviewOutline,
  countLitReviewOutlineProgress
} from '../data/capstoneLitReviewOutlineWorksheet.js'

function sectionHeader (title) {
  return `\n${title}\n${'='.repeat(title.length)}\n`
}

function fieldBlock (exportLabel, value) {
  const text = (value ?? '').trim()
  return `${exportLabel}\n${text || '(not filled in)'}\n`
}

export function countLitReviewOutlineProgressForProject (project) {
  return countLitReviewOutlineProgress(project?.litReviewOutline)
}

export function countPhase3Progress (project) {
  const p3 = project?.phase3 ?? {}
  const keys = ['whatWeKnow', 'theGap', 'myStudyPitch', 'elevatorSpeech']
  const filled = keys.filter((k) => (p3[k] ?? '').trim()).length
  const words = elevatorSpeechWordCount(p3.elevatorSpeech)
  return { filled, total: keys.length, words, ready: filled === keys.length && words >= 130 }
}

export function countPhase4Progress (project) {
  const p4 = project?.phase4 ?? {}
  const topFields = [
    'broadTopicArea',
    'proposedResearchQuestion',
    'ivConceptual',
    'ivOperational',
    'dvConceptual',
    'dvOperational'
  ]
  const recapFilled = topFields.filter((k) => (p4[k] ?? '').trim()).length
  const pathways = p4.pathwayResponses ?? {}
  let pathsExplored = 0
  for (const path of PHASE4_PATHWAYS) {
    const r = pathways[path.id] ?? {}
    if (r.notViable) pathsExplored++
    else if (path.fields.some((f) => (r[f.id] ?? '').trim())) pathsExplored++
  }
  const chosen = Boolean(p4.chosenPathwayId)
  return { recapFilled, recapTotal: topFields.length, pathsExplored, pathsTotal: PHASE4_PATHWAYS.length, chosen }
}

export function countArticleCards (project, minRequired = ARTICLE_REVIEW_MIN_ARTICLES, rangeLabel = ARTICLE_REVIEW_CANVAS_RANGE_LABEL) {
  const cards = project?.articleReview?.articleCards ?? []
  let started = 0
  let complete = 0
  const requiredFields = ARTICLE_CARD_FIELDS.filter((f) => f.required)
  for (const card of cards) {
    const hasContent = ARTICLE_CARD_FIELDS.some((f) => (card[f.id] ?? '').trim())
    if (hasContent) started++
    const filledRequired = requiredFields.filter((f) => (card[f.id] ?? '').trim()).length
    if (filledRequired === requiredFields.length && requiredFields.length > 0) complete++
  }
  return {
    started,
    complete,
    total: cards.length,
    minRequired,
    rangeLabel
  }
}

export function buildExportText (sectionId, project, classId = null) {
  if (!project) return ''
  switch (sectionId) {
    case 'article-review':
      return classId === 'intro-research' ? buildAnnotatedBibliographyExport(project) : buildArticleReviewExport(project)
    case 'recruitment-consent':
      return buildRecruitmentConsentExport(project)
    case 'question-hypotheses':
    case 'ethics-plan':
    case 'methods-section':
    case 'analysis-plan':
      return guidedWorksheet(sectionId) ? buildGuidedExport(sectionId, project) : ''
    case 'theory-selection':
      return buildTheorySelectionExport(project)
    case 'study-focus':
      return buildLitReviewOutlineExport(project)
    case 'phase-3':
      return buildPhase3Export(project)
    case 'phase-4':
      return buildPhase4Export(project)
    case 'measures-draft':
      return buildMeasuresDraftExport(project)
    default:
      return ''
  }
}

/** Intro to Research: just the source cards. No project title, problem statement, or early question yet: those come after the literature review. */
function buildAnnotatedBibliographyExport (project) {
  const cards = project.articleReview?.articleCards ?? []
  const lines = [sectionHeader('Annotated Bibliography')]
  cards.forEach((card, i) => {
    const hasContent = ARTICLE_CARD_FIELDS.some((f) => (card[f.id] ?? '').trim())
    if (!hasContent) return
    lines.push(sectionHeader(`Source ${i + 1}`))
    for (const field of ARTICLE_CARD_FIELDS) {
      lines.push(fieldBlock(field.exportLabel, card[field.id]))
    }
  })
  return lines.join('\n').trim()
}

function buildArticleReviewExport (project) {
  const ar = project.articleReview ?? {}
  const lines = [sectionHeader('Article Review and Problem Statement')]

  for (const field of ARTICLE_REVIEW_HEADER_FIELDS) {
    lines.push(fieldBlock(field.exportLabel, ar[field.id]))
  }

  const cards = ar.articleCards ?? []
  cards.forEach((card, i) => {
    const hasContent = ARTICLE_CARD_FIELDS.some((f) => (card[f.id] ?? '').trim())
    if (!hasContent) return
    lines.push(sectionHeader(`Article ${i + 1}`))
    for (const field of ARTICLE_CARD_FIELDS) {
      lines.push(fieldBlock(field.exportLabel, card[field.id]))
    }
  })

  lines.push(sectionHeader(ARTICLE_REVIEW_PROBLEM_STATEMENT.sectionTitle))
  if (ARTICLE_REVIEW_PROBLEM_STATEMENT.intro) {
    lines.push(`${ARTICLE_REVIEW_PROBLEM_STATEMENT.intro}\n`)
  }
  for (const field of ARTICLE_REVIEW_PROBLEM_STATEMENT.promptFields) {
    lines.push(fieldBlock(field.exportLabel, ar.problemStatement?.[field.id]))
  }

  lines.push(sectionHeader(ARTICLE_REVIEW_RQ_HYPOTHESIS.sectionTitle))
  for (const field of ARTICLE_REVIEW_RQ_HYPOTHESIS.fields) {
    lines.push(fieldBlock(field.exportLabel, ar[field.id]))
  }

  return lines.join('\n').trim()
}

export function countTheorySelectionProgress (project) {
  const t = project?.theorySelection ?? {}
  const named = [1, 2, 3].filter((n) => (t[`c${n}Theory`] ?? '').trim()).length
  const chosen = Boolean((t.chosenTheory ?? '').trim())
  const justified = Boolean((t.whyItFits ?? '').trim())
  return { named, chosen, justified, ready: named === 3 && chosen && justified }
}

function buildTheorySelectionExport (project) {
  const t = project.theorySelection ?? {}
  const lines = [sectionHeader('Theory Selection')]
  for (const f of CANDIDATE_FIELDS) lines.push(fieldBlock(f.exportLabel, t[f.id]))
  lines.push(sectionHeader('My choice'))
  for (const f of CHOICE_FIELDS) lines.push(fieldBlock(f.exportLabel, t[f.id]))
  return lines.join('\n').trim()
}

function buildLitReviewOutlineExport (project) {
  const compiled = compileLitReviewOutline(project.litReviewOutline, { forExport: true })
  return sectionHeader('Lit Review Outline').trim() + '\n\n' + compiled
}

function buildPhase3Export (project) {
  const p3 = project.phase3 ?? {}
  const lines = [sectionHeader('Phase 3: Elevator Speech')]
  for (const part of PHASE3_PARTS) {
    lines.push(`\n${part.title}\n`)
    for (const field of part.fields) {
      lines.push(fieldBlock(field.exportLabel, p3[field.id]))
    }
  }
  return lines.join('\n').trim()
}

function buildPhase4Export (project) {
  const p4 = project.phase4 ?? {}
  const lines = [sectionHeader('Phase 4: Operationalization Exploration')]

  for (const part of PHASE4_PARTS) {
    lines.push(`\n${part.title}\n`)
    for (const field of part.fields) {
      lines.push(fieldBlock(field.exportLabel, p4[field.id]))
    }
  }

  lines.push('\nPart C: Exploration, Operational Paths\n')
  for (const pathway of PHASE4_PATHWAYS) {
    lines.push(`\n${pathway.label}\n`)
    const responses = p4.pathwayResponses?.[pathway.id] ?? {}
    if (responses.notViable) {
      lines.push('(Marked not viable)\n')
      continue
    }
    for (const field of pathway.fields) {
      lines.push(fieldBlock(field.exportLabel, responses[field.id]))
    }
  }

  lines.push('\nPart D: Comparative Analysis\n')
  for (const criterion of PHASE4_COMPARISON_CRITERIA) {
    lines.push(`\n${criterion.label}\n`)
    for (const pathway of PHASE4_PATHWAYS) {
      const cell = p4.comparisonTable?.[criterion.id]?.[pathway.id] ?? ''
      lines.push(`  ${pathway.label}: ${cell.trim() || '(not filled in)'}\n`)
    }
  }

  const chosen = PHASE4_PATHWAYS.find((p) => p.id === p4.chosenPathwayId)
  lines.push('\nPart E: Final Decision\n')
  lines.push(`Chosen pathway: ${chosen?.label ?? '(not chosen)'}\n`)

  return lines.join('\n').trim()
}

export { elevatorSpeechWordCount, compileLitReviewOutline }

export function countMeasuresDraftProgress (project) {
  const picked = project?.phase4?.chosenPathwayId ?? ''
  const chosen = MEASURES_PATHWAYS[picked] ? picked : ''
  if (!chosen) {
    return { chosen: false, filled: 0, total: 0, requiredFilled: 0, requiredTotal: 0, ready: false }
  }
  const fields = measuresFieldsForPathway(chosen)
  const draft = project?.measuresDraft ?? {}
  let filled = 0
  let requiredTotal = 0
  let requiredFilled = 0
  for (const field of fields) {
    const val = (draft[field.id] ?? '').trim()
    if (val) {
      filled++
      if (field.required) {
        requiredFilled++
      }
    }
    if (field.required) {
      requiredTotal++
    }
  }
  const ready = requiredTotal > 0 && requiredFilled === requiredTotal
  return { chosen: true, filled, total: fields.length, requiredFilled, requiredTotal, ready }
}

function buildMeasuresDraftExport (project) {
  const picked = project?.phase4?.chosenPathwayId ?? ''
  const chosen = MEASURES_PATHWAYS[picked] ? picked : ''
  const lines = [sectionHeader('Measures Draft')]
  if (!chosen) {
    lines.push('(Choose your pathway in Method Choice first.)')
    return lines.join('\n').trim()
  }
  const phase4 = project.phase4 ?? {}
  const draft = project.measuresDraft ?? {}
  lines.push(fieldBlock('Pathway chosen:', MEASURES_PATHWAYS[chosen].label))
  lines.push(fieldBlock('Independent Variable (IV), operational definition:', phase4.ivOperational))
  lines.push(fieldBlock('Dependent Variable (DV), operational definition:', phase4.dvOperational))
  lines.push(`\n${MEASURES_PATHWAYS[chosen].heading}\n`)
  for (const field of measuresFieldsForPathway(chosen)) {
    lines.push(fieldBlock(field.exportLabel, draft[field.id]))
  }
  return lines.join('\n').trim()
}
