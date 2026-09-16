/**
 * Local history of benchmark practice test attempts (formative; not graded Canvas benchmarks).
 */

const STORAGE_PREFIX = 'mm-benchmark-attempts:'
const MAX_HISTORY = 20

function storageKey(studentKey, slug) {
  return `${STORAGE_PREFIX}${studentKey || 'anon'}:${slug}`
}

export function loadBenchmarkAttemptHistory(studentKey, slug) {
  if (!slug) return []
  try {
    const raw = localStorage.getItem(storageKey(studentKey, slug))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * @param {object} attempt
 * @param {string} attempt.slug
 * @param {number} attempt.score
 * @param {number} attempt.total
 * @param {Record<string, { correct: number, total: number }>} attempt.moduleResults
 * @param {string[]} [attempt.questionIds]
 */
export function saveBenchmarkAttempt(studentKey, attempt) {
  if (!attempt?.slug) return null
  const record = {
    slug: attempt.slug,
    score: attempt.score,
    total: attempt.total,
    moduleResults: attempt.moduleResults || {},
    questionIds: attempt.questionIds || [],
    completedAt: attempt.completedAt || new Date().toISOString()
  }
  const prev = loadBenchmarkAttemptHistory(studentKey, attempt.slug)
  const next = [record, ...prev].slice(0, MAX_HISTORY)
  try {
    localStorage.setItem(storageKey(studentKey, attempt.slug), JSON.stringify(next))
  } catch (err) {
    console.warn('Unable to save benchmark attempt history:', err)
  }
  return record
}

/**
 * Build strengths (all correct in module) and weaknesses (any miss) for results summary.
 */
export function summarizeBenchmarkByModule(answers, questions, getConceptLabel, applyLabel) {
  const byModule = {}
  answers.forEach((a, i) => {
    const mid = questions[i]?.moduleId
    if (!mid) return
    if (!byModule[mid]) byModule[mid] = { correct: 0, total: 0 }
    byModule[mid].total += 1
    if (a.correct) byModule[mid].correct += 1
  })

  const strengths = []
  const weaknesses = []

  for (const [moduleId, stats] of Object.entries(byModule)) {
    const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0
    const raw = getConceptLabel(moduleId) || { label: moduleId }
    const entry = {
      moduleId,
      label: applyLabel ? applyLabel(raw.label) : raw.label,
      correct: stats.correct,
      total: stats.total,
      pct,
      topicIds: raw.topicIds || [],
      classModuleId: raw.classModuleId || moduleId,
      hasSoftware: Boolean(raw.hasSoftware)
    }
    if (stats.correct === stats.total && stats.total > 0) {
      strengths.push(entry)
    } else {
      weaknesses.push(entry)
    }
  }

  strengths.sort((a, b) => b.pct - a.pct)
  weaknesses.sort((a, b) => a.pct - b.pct)

  return { strengths, weaknesses, moduleResults: byModule }
}
