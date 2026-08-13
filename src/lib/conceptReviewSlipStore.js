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
    completedAt: payload.completedAt || new Date().toISOString()
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
    total: allIds?.length ?? 0
  }
  const prevIds = existing.answeredIds || []
  const already = prevIds.includes(questionId)
  const answeredIds = [...new Set([...prevIds, questionId])]
  const correctCount = already
    ? (existing.correct ?? 0)
    : (existing.correct ?? 0) + (wasCorrect ? 1 : 0)
  const complete = Array.isArray(allIds) && allIds.length > 0 && allIds.every((id) => answeredIds.includes(id))
  return saveConceptReviewCompletion(studentKey, moduleId, {
    ...existing,
    answeredIds,
    correct: correctCount,
    total: allIds?.length ?? existing.total,
    completedAt: complete ? (existing.completedAt || new Date().toISOString()) : existing.completedAt
  })
}
