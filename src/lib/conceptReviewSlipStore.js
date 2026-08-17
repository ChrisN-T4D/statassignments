const STORAGE_PREFIX = 'mm-cr-slip:'

function storageKey(studentKey, moduleId) {
  return `${STORAGE_PREFIX}${studentKey || 'anon'}:${moduleId}`
}

export function loadConceptReviewCompletion(studentKey, moduleId) {
  if (!moduleId) return null
  try {
    const raw = localStorage.getItem(storageKey(studentKey, moduleId))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveConceptReviewCompletion(studentKey, moduleId, payload) {
  if (!moduleId) return
  const record = {
    moduleId,
    studentKey: studentKey || null,
    answeredIds: payload.answeredIds || [],
    correct: payload.correct ?? null,
    total: payload.total ?? null,
    completedAt: payload.completedAt || null,
    slipFrozen: Boolean(payload.slipFrozen)
  }
  try {
    localStorage.setItem(storageKey(studentKey, moduleId), JSON.stringify(record))
  } catch (err) {
    console.warn('Unable to save Concept Review completion:', err)
  }
  return record
}

export function markQuestionAnswered(studentKey, moduleId, questionId, allIds, wasCorrect) {
  const existing = loadConceptReviewCompletion(studentKey, moduleId) || {
    answeredIds: [],
    completedAt: null,
    correct: 0,
    total: allIds?.length ?? 0,
    slipFrozen: false
  }
  const prevIds = existing.answeredIds || []
  const already = prevIds.includes(questionId)
  const answeredIds = [...new Set([...prevIds, questionId])]
  const correctCount = existing.slipFrozen
    ? (existing.correct ?? 0)
    : already
      ? (existing.correct ?? 0)
      : (existing.correct ?? 0) + (wasCorrect ? 1 : 0)
  return saveConceptReviewCompletion(studentKey, moduleId, {
    ...existing,
    answeredIds,
    correct: correctCount,
    total: existing.slipFrozen ? existing.total : answeredIds.length,
    completedAt: existing.completedAt,
    slipFrozen: existing.slipFrozen
  })
}

/** First unlock wins. Later retries keep the frozen score and timestamp. */
export function freezeSlip(studentKey, moduleId, payload) {
  const existing = loadConceptReviewCompletion(studentKey, moduleId)
  if (existing?.slipFrozen && existing.completedAt) return existing
  return saveConceptReviewCompletion(studentKey, moduleId, {
    answeredIds: payload.answeredIds || existing?.answeredIds || [],
    correct: payload.correct ?? existing?.correct ?? 0,
    total: payload.total ?? payload.answeredIds?.length ?? existing?.total ?? 0,
    completedAt: payload.completedAt || existing?.completedAt || new Date().toISOString(),
    slipFrozen: true,
    studentKey,
    moduleId
  })
}
