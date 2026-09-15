/**
 * Study Plan export helpers — format student text for Canvas paste.
 * No pass/fail validation; guide-only.
 */

import {
  ARTICLE_REVIEW_HEADER_FIELDS,
  ARTICLE_CARD_FIELDS,
  ARTICLE_REVIEW_PROBLEM_STATEMENT,
  ARTICLE_REVIEW_RQ_HYPOTHESIS,
  ARTICLE_REVIEW_TEMPLATE_ARTICLE_COUNT,
  ARTICLE_REVIEW_MIN_ARTICLES
} from '../data/capstoneArticleReviewWorksheet.js'
import { PHASE3_PARTS, elevatorSpeechWordCount } from '../data/capstonePhase3Worksheet.js'
import {
  PHASE4_PARTS,
  PHASE4_PATHWAYS,
  PHASE4_COMPARISON_CRITERIA
} from '../data/capstonePhase4Worksheet.js'
import { STUDY_FOCUS_FIELDS } from '../data/capstoneWorksheetSchemas.js'

function sectionHeader (title) {
  return `\n${title}\n${'='.repeat(title.length)}\n`
}

function fieldBlock (exportLabel, value) {
  const text = (value ?? '').trim()
  return `${exportLabel}\n${text || '(not filled in)'}\n`
}

export function countArticleCards (project) {
  const cards = project?.articleReview?.articleCards ?? []
  let started = 0
  for (const card of cards) {
    const hasContent = ARTICLE_CARD_FIELDS.some((f) => (card[f.id] ?? '').trim())
    if (hasContent) started++
  }
  return { started, total: ARTICLE_REVIEW_TEMPLATE_ARTICLE_COUNT, minRequired: ARTICLE_REVIEW_MIN_ARTICLES }
}

export function buildExportText (sectionId, project) {
  if (!project) return ''
  switch (sectionId) {
    case 'article-review':
      return buildArticleReviewExport(project)
    case 'study-focus':
      return buildStudyFocusExport(project)
    case 'phase-3':
      return buildPhase3Export(project)
    case 'phase-4':
      return buildPhase4Export(project)
    default:
      return ''
  }
}

function buildArticleReviewExport (project) {
  const ar = project.articleReview ?? {}
  const lines = [sectionHeader('Article Review and Problem Statement')]

  for (const field of ARTICLE_REVIEW_HEADER_FIELDS) {
    lines.push(fieldBlock(field.exportLabel, ar[field.id]))
  }

  const cards = ar.articleCards ?? []
  for (let i = 0; i < ARTICLE_REVIEW_TEMPLATE_ARTICLE_COUNT; i++) {
    const card = cards[i] ?? {}
    lines.push(sectionHeader(`Article ${i + 1}`))
    for (const field of ARTICLE_CARD_FIELDS) {
      lines.push(fieldBlock(field.exportLabel, card[field.id]))
    }
  }

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

function buildStudyFocusExport (project) {
  const sf = project.studyFocus ?? {}
  const lines = [sectionHeader('Study Focus Notes')]
  for (const field of STUDY_FOCUS_FIELDS) {
    lines.push(fieldBlock(field.exportLabel, sf[field.id]))
  }
  return lines.join('\n').trim()
}

function buildPhase3Export (project) {
  const p3 = project.phase3 ?? {}
  const lines = [sectionHeader('Phase 3 — Elevator Speech')]
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
  const lines = [sectionHeader('Phase 4 — Operationalization Exploration')]

  for (const part of PHASE4_PARTS) {
    lines.push(`\n${part.title}\n`)
    for (const field of part.fields) {
      lines.push(fieldBlock(field.exportLabel, p4[field.id]))
    }
  }

  lines.push('\nPart C: Exploration — Operational Paths\n')
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

export { elevatorSpeechWordCount }
