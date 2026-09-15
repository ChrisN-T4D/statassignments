/**
 * Lit Review Outline Compiler — framework, theme buckets, gap, compile helper.
 */

export const LIT_REVIEW_OUTLINE_META = {
  subtitle: 'Literature review outline compiler',
  usedWeeks: 'weeks 5–10'
}

export const ORGANIZING_FRAMEWORK_FIELDS = [
  {
    id: 'theoryName',
    label: 'Theory or model name',
    helpNote: 'e.g., Social Learning Theory, Self-Determination Theory',
    multiline: false
  },
  {
    id: 'mechanismExplanation',
    label: 'Mechanism',
    helpNote: 'How does this framework connect your IV and DV?',
    multiline: true
  },
  {
    id: 'whyThisFramework',
    label: 'Why this framework?',
    helpNote: 'Why organize the review this way instead of a purely descriptive summary?',
    multiline: true
  },
  {
    id: 'alternativeConsidered',
    label: 'Alternative considered (optional)',
    helpNote: 'What other framework did you consider and set aside?',
    multiline: true
  }
]

export const GAP_TRANSITION_FIELDS = [
  {
    id: 'gapStatement',
    label: 'Working gap',
    helpNote: 'What is still unknown or contested? Update as you read more articles.',
    multiline: true
  },
  {
    id: 'transitionToStudy',
    label: 'Transition to your study',
    helpNote: 'Bridge from the gap to your proposed project.',
    multiline: true
  },
  {
    id: 'workingResearchQuestion',
    label: 'Working research question',
    helpNote: 'Draft in plain language; can copy into Phase 4 Part A.',
    multiline: true
  }
]

export const DEFAULT_THEME_TEMPLATES = [
  { templateId: 'background', title: 'Background / context' },
  { templateId: 'theme-1', title: 'Theme 1' },
  { templateId: 'theme-2', title: 'Theme 2' }
]

let bucketIdCounter = 0

export function newThemeBucketId () {
  bucketIdCounter += 1
  return `bucket-${Date.now()}-${bucketIdCounter}`
}

export function emptyThemeBucket ({ templateId = null, title = 'New theme' } = {}) {
  return {
    id: newThemeBucketId(),
    templateId,
    title,
    synthesisNotes: '',
    connectionToFramework: '',
    linkedArticleNumbers: ''
  }
}

export function emptyOrganizingFramework () {
  return {
    theoryName: '',
    mechanismExplanation: '',
    whyThisFramework: '',
    alternativeConsidered: ''
  }
}

export function emptyGapAndTransition () {
  return {
    gapStatement: '',
    transitionToStudy: '',
    workingResearchQuestion: ''
  }
}

export function emptyLitReviewOutline () {
  return {
    organizingFramework: emptyOrganizingFramework(),
    themeBuckets: DEFAULT_THEME_TEMPLATES.map((t) =>
      emptyThemeBucket({ templateId: t.templateId, title: t.title })
    ),
    gapAndTransition: emptyGapAndTransition()
  }
}

/** Parse "1, 3, 5" → [1, 3, 5] */
export function parseLinkedArticleNumbers (raw) {
  if (!raw || typeof raw !== 'string') return []
  return raw
    .split(/[,;\s]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0)
}

export function romanNumeral (index) {
  const nums = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return nums[index] ?? String(index + 1)
}

/**
 * Compile student text into hierarchical outline (no auto-synthesis from cards).
 */
export function compileLitReviewOutline (outline, { forExport = false } = {}) {
  const o = outline ?? emptyLitReviewOutline()
  const fw = o.organizingFramework ?? emptyOrganizingFramework()
  const gap = o.gapAndTransition ?? emptyGapAndTransition()
  const buckets = o.themeBuckets ?? []
  const emptyLabel = forExport ? '(not filled in)' : ''

  const lines = []

  lines.push('ORGANIZING FRAMEWORK')
  lines.push('='.repeat(20))
  lines.push(`Theory: ${(fw.theoryName ?? '').trim() || emptyLabel}`)
  lines.push(`Mechanism: ${(fw.mechanismExplanation ?? '').trim() || emptyLabel}`)
  lines.push(`Why this framework: ${(fw.whyThisFramework ?? '').trim() || emptyLabel}`)
  if ((fw.alternativeConsidered ?? '').trim()) {
    lines.push(`Alternative considered: ${fw.alternativeConsidered.trim()}`)
  }
  lines.push('')

  lines.push('OUTLINE')
  lines.push('='.repeat(7))
  lines.push('')

  buckets.forEach((bucket, index) => {
    const title = (bucket.title ?? '').trim() || `Theme ${index + 1}`
    lines.push(`${romanNumeral(index)}. ${title}`)
    const notes = (bucket.synthesisNotes ?? '').trim()
    if (notes) {
      notes.split('\n').forEach((line) => {
        const trimmed = line.trim()
        if (trimmed) lines.push(`   ${trimmed.startsWith('-') ? trimmed : `- ${trimmed}`}`)
      })
    } else if (forExport) {
      lines.push('   (not filled in)')
    }
    const connection = (bucket.connectionToFramework ?? '').trim()
    if (connection) lines.push(`   Framework link: ${connection}`)
    const linked = parseLinkedArticleNumbers(bucket.linkedArticleNumbers)
    if (linked.length) lines.push(`   Sources: Articles ${linked.join(', ')}`)
    lines.push('')
  })

  lines.push('GAP AND TRANSITION')
  lines.push('='.repeat(18))
  lines.push(`Gap: ${(gap.gapStatement ?? '').trim() || emptyLabel}`)
  lines.push(`Transition: ${(gap.transitionToStudy ?? '').trim() || emptyLabel}`)
  lines.push(`Working RQ: ${(gap.workingResearchQuestion ?? '').trim() || emptyLabel}`)

  return lines.join('\n').trim()
}

/**
 * One-time migration from legacy studyFocus object.
 */
export function migrateStudyFocusToLitReviewOutline (project) {
  if (!project || project.litReviewOutline) return project
  const sf = project.studyFocus
  if (!sf || typeof sf !== 'object') {
    return { ...project, litReviewOutline: emptyLitReviewOutline() }
  }

  const outline = emptyLitReviewOutline()

  if (sf.workingGap?.trim()) {
    outline.gapAndTransition.gapStatement = sf.workingGap.trim()
  }
  if (sf.workingResearchQuestion?.trim()) {
    outline.gapAndTransition.workingResearchQuestion = sf.workingResearchQuestion.trim()
  }

  const themes = sf.litReviewThemes?.trim()
  if (themes) {
    const target =
      outline.themeBuckets.find((b) => b.templateId === 'theme-1') ?? outline.themeBuckets[0]
    if (target) target.synthesisNotes = themes
  }

  const sources = sf.sourcesToCite?.trim()
  if (sources) {
    const last = outline.themeBuckets[outline.themeBuckets.length - 1]
    if (last) {
      const prefix = last.synthesisNotes?.trim() ? `${last.synthesisNotes.trim()}\n\n` : ''
      last.synthesisNotes = `${prefix}Sources to cite: ${sources}`
    }
  }

  const { studyFocus, ...rest } = project
  return { ...rest, litReviewOutline: outline }
}

export function countLitReviewOutlineProgress (outline) {
  const o = outline ?? emptyLitReviewOutline()
  const fw = o.organizingFramework ?? {}
  const frameworkNamed = Boolean((fw.theoryName ?? '').trim())
  const buckets = o.themeBuckets ?? []
  const themesStarted = buckets.filter(
    (b) => (b.synthesisNotes ?? '').trim() || (b.connectionToFramework ?? '').trim()
  ).length
  const gapStarted = Boolean(
    (o.gapAndTransition?.gapStatement ?? '').trim() ||
    (o.gapAndTransition?.transitionToStudy ?? '').trim()
  )
  return {
    frameworkNamed,
    themesStarted,
    themesTotal: buckets.length,
    gapStarted,
    readyHint: frameworkNamed && themesStarted >= 2 && gapStarted
  }
}
