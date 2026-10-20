/**
 * Concept Review slip unlock. For each eligible content/hybrid objective, the
 * objective is satisfied when either:
 * - MIN_ITEMS_PER_OBJECTIVE in-scope items are answered correctly AND BKT
 *   pL >= MASTERY_PL, or
 * - every in-scope item mapped to the objective is answered correctly
 *   (small-bank fallback: objectives whose mapped bank is too small to push
 *   BKT past MASTERY_PL stay achievable from correct responses alone).
 * Answering the full in-scope bank also completes the review.
 */

import { getQuestionsByModule } from '../data/conceptQuestions.js'
import { getObjectivesByModule } from '../data/objectives.js'
import { getObjectivesForQuestion, getQuestionsForObjective } from '../data/questionObjectiveMap.js'

export const MASTERY_PL = 0.9
export const MIN_ITEMS_PER_OBJECTIVE = 2

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

function objectiveSatisfied(objectiveId, answeredIds, questionIds, pLByObjective) {
  if (objectiveBankFullyCorrect(objectiveId, answeredIds, questionIds)) return true
  return (
    answeredCountForObjective(objectiveId, answeredIds, questionIds) >= MIN_ITEMS_PER_OBJECTIVE &&
    isMastered(pLByObjective, objectiveId)
  )
}

export function onlineReviewComplete({ moduleId, answeredIds = [], pLByObjective = {}, questionIds } = {}) {
  const ids = inScopeQuestionIds(moduleId, questionIds)
  const eligible = eligibleObjectives(moduleId, ids)
  const bankExhausted = ids.length > 0 && ids.every((id) => answeredIds.includes(id))
  const masteryOk =
    eligible.length > 0 &&
    eligible.every((objectiveId) => objectiveSatisfied(objectiveId, answeredIds, ids, pLByObjective))
  return {
    complete: masteryOk || bankExhausted,
    masteryOk,
    bankExhausted,
    eligible
  }
}

export function pickNextConceptReviewQuestion({
  moduleId,
  answeredIds = [],
  pLByObjective = {},
  questionIds
} = {}) {
  const ids = inScopeQuestionIds(moduleId, questionIds)
  const answered = new Set(answeredIds)
  const eligible = eligibleObjectives(moduleId, ids)
  const needed = eligible.filter(
    (objectiveId) => !objectiveSatisfied(objectiveId, answeredIds, ids, pLByObjective)
  )
  needed.sort((a, b) => (pLByObjective?.[a] ?? 0) - (pLByObjective?.[b] ?? 0))
  for (const objectiveId of needed) {
    const candidate = getQuestionsForObjective(objectiveId).find((id) => ids.includes(id) && !answered.has(id))
    if (candidate) return candidate
  }
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
