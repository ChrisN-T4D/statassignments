/**
 * Concept Review slip unlock. For each eligible content/hybrid objective, the
 * objective is satisfied when the student has a clean streak on it (the last
 * STREAK_NEEDED answers correct, or all of them for a small bank) AND either:
 * - MIN_ITEMS_PER_OBJECTIVE in-scope items are answered correctly AND BKT
 *   pL >= MASTERY_PL, or
 * - every in-scope item mapped to the objective is answered correctly
 *   (small-bank fallback: objectives whose mapped bank is too small to push
 *   BKT past MASTERY_PL stay achievable from correct responses alone).
 * A streak ignores answers with warning signs (weak evidence) and immediate
 * retries of a missed question; a wrong answer resets it. The review is complete
 * when every eligible objective is satisfied. Answering the whole bank only
 * completes a review that has no eligible objectives.
 */

import { getQuestionsByModule } from '../data/conceptQuestions.js'
import { getObjectivesByModule } from '../data/objectives.js'
import { getObjectivesForQuestion, getQuestionsForObjective } from '../data/questionObjectiveMap.js'

export const MASTERY_PL = 0.9
export const MIN_ITEMS_PER_OBJECTIVE = 2
export const STREAK_NEEDED = 3

export function inScopeQuestionIds(moduleId, questionIds) {
  if (Array.isArray(questionIds) && questionIds.length) return [...questionIds]
  return (getQuestionsByModule(moduleId) || []).map((q) => q.id)
}

export function eligibleObjectives(moduleId, questionIds) {
  const scope = new Set(inScopeQuestionIds(moduleId, questionIds))
  return getObjectivesByModule(moduleId)
    .filter((o) => o.objectiveType === 'content' || o.objectiveType === 'hybrid')
    .filter((o) => {
      const mapped = getQuestionsForObjective(o.objectiveId).filter((id) => scope.has(id))
      return mapped.length >= MIN_ITEMS_PER_OBJECTIVE
    })
    .map((o) => o.objectiveId)
}

export function answeredCountForObjective(objectiveId, answeredIds, questionIds) {
  const scope = new Set(questionIds || [])
  const answered = new Set(answeredIds || [])
  return getQuestionsForObjective(objectiveId).filter((id) => scope.has(id) && answered.has(id)).length
}

function isMastered(pLByObjective, objectiveId) {
  const pL = pLByObjective?.[objectiveId]
  return typeof pL === 'number' && pL >= MASTERY_PL
}

/**
 * Answer history. Records saved before history existed only have answeredIds; treat those as clean, correct
 * answers so students already part-way through a review are not penalised.
 */
export function effectiveHistory(history, answeredIds = []) {
  if (Array.isArray(history) && history.length) return history
  return (answeredIds || []).map((id) => ({ id, correct: true }))
}

/** How many most-recent answers on this objective were clean and correct, stopping at the first wrong answer. */
export function objectiveStreak(objectiveId, history, questionIds) {
  const mapped = new Set(getQuestionsForObjective(objectiveId))
  const scope = Array.isArray(questionIds) && questionIds.length ? new Set(questionIds) : null
  let streak = 0
  for (let i = history.length - 1; i >= 0; i--) {
    const h = history[i]
    if (!mapped.has(h.id) || (scope && !scope.has(h.id))) continue
    if (!h.correct) break
    if (h.weak || h.retry) continue
    streak += 1
  }
  return streak
}

export function streakTarget(objectiveId, questionIds) {
  const mapped = getQuestionsForObjective(objectiveId)
  const inScope = Array.isArray(questionIds) && questionIds.length ? mapped.filter((id) => questionIds.includes(id)) : mapped
  return Math.min(STREAK_NEEDED, inScope.length)
}

/**
 * True when every in-scope question mapped to the objective has been answered
 * correctly. Small-bank fallback: an objective whose mapped bank is too small
 * to reach MASTERY_PL can still be satisfied by answering all of its items
 * correctly.
 */
export function objectiveBankFullyCorrect(objectiveId, answeredIds, questionIds) {
  const mapped = getQuestionsForObjective(objectiveId)
  if (!mapped.length) return false
  const answered = new Set(answeredIds || [])
  const inScope =
    Array.isArray(questionIds) && questionIds.length
      ? mapped.filter((id) => questionIds.includes(id))
      : mapped
  return inScope.length > 0 && inScope.every((id) => answered.has(id))
}

export function objectiveSatisfied(objectiveId, answeredIds, questionIds, pLByObjective, history) {
  const hist = effectiveHistory(history, answeredIds)
  const streakOk = objectiveStreak(objectiveId, hist, questionIds) >= streakTarget(objectiveId, questionIds)
  if (!streakOk) return false
  if (objectiveBankFullyCorrect(objectiveId, answeredIds, questionIds)) return true
  return (
    answeredCountForObjective(objectiveId, answeredIds, questionIds) >= MIN_ITEMS_PER_OBJECTIVE &&
    isMastered(pLByObjective, objectiveId)
  )
}

export function onlineReviewComplete({ moduleId, answeredIds = [], pLByObjective = {}, questionIds, history } = {}) {
  const ids = inScopeQuestionIds(moduleId, questionIds)
  const eligible = eligibleObjectives(moduleId, ids)
  const bankExhausted = ids.length > 0 && ids.every((id) => answeredIds.includes(id))
  const masteryOk =
    eligible.length > 0 &&
    eligible.every((objectiveId) => objectiveSatisfied(objectiveId, answeredIds, ids, pLByObjective, history))
  return {
    complete: eligible.length > 0 ? masteryOk : bankExhausted,
    masteryOk,
    bankExhausted,
    eligible
  }
}

/**
 * Next question: work on the objective with the lowest mastery that is not yet satisfied. Prefer a mapped question
 * not answered yet; if none is left, bring back the one asked least recently. Never the question just asked.
 */
export function pickNextConceptReviewQuestion({
  moduleId,
  answeredIds = [],
  pLByObjective = {},
  questionIds,
  history,
  lastAskedId = null
} = {}) {
  const ids = inScopeQuestionIds(moduleId, questionIds)
  const answered = new Set(answeredIds)
  const hist = effectiveHistory(history, answeredIds)
  const eligible = eligibleObjectives(moduleId, ids)
  const needed = eligible.filter(
    (objectiveId) => !objectiveSatisfied(objectiveId, answeredIds, ids, pLByObjective, hist)
  )
  needed.sort((a, b) => (pLByObjective?.[a] ?? 0) - (pLByObjective?.[b] ?? 0))
  const lastSeenAt = (id) => {
    for (let i = hist.length - 1; i >= 0; i--) if (hist[i].id === id) return i
    return -1
  }
  for (const objectiveId of needed) {
    const mapped = getQuestionsForObjective(objectiveId).filter((id) => ids.includes(id) && id !== lastAskedId)
    const unanswered = mapped.find((id) => !answered.has(id))
    if (unanswered) return unanswered
    const oldest = [...mapped].sort((a, b) => lastSeenAt(a) - lastSeenAt(b))[0]
    if (oldest) return oldest
  }
  if (eligible.length) return null
  return ids.find((id) => !answered.has(id)) || null
}

export function contentHybridObjectivesMissingItems(moduleId) {
  const bankIds = new Set((getQuestionsByModule(moduleId) || []).map((q) => q.id))
  return getObjectivesByModule(moduleId)
    .filter((o) => o.objectiveType === 'content' || o.objectiveType === 'hybrid')
    .filter((o) => {
      const n = getQuestionsForObjective(o.objectiveId).filter((id) => bankIds.has(id)).length
      return n < MIN_ITEMS_PER_OBJECTIVE
    })
    .map((o) => o.objectiveId)
}

export function objectivesForAnsweredQuestion(questionId) {
  return getObjectivesForQuestion(questionId)
}
