/**
 * Concept Review slip unlock: two items per eligible content/hybrid objective
 * plus BKT pL >= 0.90, or the in-scope bank is exhausted.
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

export function onlineReviewComplete({ moduleId, answeredIds = [], pLByObjective = {}, questionIds } = {}) {
  const ids = inScopeQuestionIds(moduleId, questionIds)
  const eligible = eligibleObjectives(moduleId, ids)
  const bankExhausted = ids.length > 0 && ids.every((id) => answeredIds.includes(id))
  const masteryOk =
    eligible.length > 0 &&
    eligible.every((objectiveId) => {
      const n = answeredCountForObjective(objectiveId, answeredIds, ids)
      return n >= MIN_ITEMS_PER_OBJECTIVE && isMastered(pLByObjective, objectiveId)
    })
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
  const needed = eligible.filter((objectiveId) => {
    const n = answeredCountForObjective(objectiveId, answeredIds, ids)
    return n < MIN_ITEMS_PER_OBJECTIVE || !isMastered(pLByObjective, objectiveId)
  })
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
