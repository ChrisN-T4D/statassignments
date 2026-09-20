/**
 * Shared module progress for Class Home / Profile.
 * Counts only what students can complete in the UI for that module + software track.
 */

import { getTopicsForModule } from '../data/modules.js'
import { getLessonsByModule } from '../data/softwareLessons.js'
import { getQuestionsByModule } from '../data/conceptQuestions.js'
import { statisticsExercises } from '../data/statisticsPractices.js'

export function toPracticeModuleId (value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value.replace('stats-module-', 'module-')
  return value
}

export function exerciseProgressId (ex, index = 0) {
  const order = ex.order ?? index
  return [ex.software_type, ex.module, ex.topic, order, ex.title].join('|')
}

export function lessonsForPreferredSoftware (moduleId, preferredSoftware) {
  const all = getLessonsByModule(moduleId) || []
  if (!preferredSoftware) return all
  return all.filter((lesson) => lesson.software === preferredSoftware)
}

/**
 * The Software Practice tab shows one unified lesson when present (Apply is a phase).
 * Extra same-software lesson rows (e.g. Excel add-ons) must not pad the progress bar.
 */
export function pickSoftwareLessonForProgress (moduleId, preferredSoftware) {
  const lessons = lessonsForPreferredSoftware(moduleId, preferredSoftware)
  if (lessons.length === 0) return null
  const unified = lessons.find((l) => typeof l.id === 'string' && l.id.includes('-unified'))
  return unified || lessons[0]
}

export function todoExercisesForModule (moduleId, preferredSoftware) {
  const practiceModuleId = toPracticeModuleId(moduleId)
  if (!practiceModuleId) return []
  return statisticsExercises.filter(
    (ex) =>
      (ex.software_type === preferredSoftware || ex.software_type === 'conceptual') &&
      ex.module === practiceModuleId &&
      ex.exercise_type !== 'menu_navigation' &&
      ex.is_active !== false
  )
}

/**
 * @param {object} opts
 * @param {string} opts.moduleId
 * @param {string} [opts.preferredSoftware]
 * @param {Iterable<string>|Set<string>} [opts.readTopicIds]
 * @param {Iterable<string>|Set<string>} [opts.completedConceptReviewIds]
 * @param {Iterable<string>|Set<string>} [opts.completedSoftwareLessonIds]
 * @param {Iterable<string>|Set<string>} [opts.completedSoftwareExerciseIds]
 * @param {Iterable<string>|Set<string>|null} [opts.selectedTopicIds] Module 8 topic filter; null/empty = all
 */
export function computeModuleProgress ({
  moduleId,
  preferredSoftware = 'jamovi',
  readTopicIds = [],
  completedConceptReviewIds = [],
  completedSoftwareLessonIds = [],
  completedSoftwareExerciseIds = [],
  selectedTopicIds = null
} = {}) {
  if (!moduleId) {
    return emptyProgress()
  }

  const readSet = toSet(readTopicIds)
  const crSet = toSet(completedConceptReviewIds)
  const lessonSet = toSet(completedSoftwareLessonIds)
  const exerciseSet = toSet(completedSoftwareExerciseIds)

  let topics = getTopicsForModule(moduleId) || []
  if (selectedTopicIds && selectedTopicIds.size > 0) {
    topics = topics.filter((topic) => selectedTopicIds.has(topic.id))
  }

  const totalTopics = topics.length
  const openedTopics = topics.filter((topic) => readSet.has(topic.id)).length
  const hasConceptReview = (getQuestionsByModule(moduleId) || []).length > 0
  const contentReviewComplete = hasConceptReview && crSet.has(moduleId)

  const softwareLesson = pickSoftwareLessonForProgress(moduleId, preferredSoftware)
  const totalLessons = softwareLesson ? 1 : 0
  const completedLessons = softwareLesson && lessonSet.has(softwareLesson.id) ? 1 : 0

  const todos = todoExercisesForModule(moduleId, preferredSoftware)
  // Legacy You-Do list only when there is no unified/software lesson UI.
  const totalTodo = !softwareLesson && todos.length > 0 ? 1 : 0
  const completedTodo =
    totalTodo === 1 && todos.every((ex, index) => exerciseSet.has(exerciseProgressId(ex, index)))
      ? 1
      : 0

  const total = totalTopics + (hasConceptReview ? 1 : 0) + totalLessons + totalTodo
  const completed =
    openedTopics + (contentReviewComplete ? 1 : 0) + completedLessons + completedTodo
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0

  return {
    total,
    completed,
    percent,
    totalTopics,
    openedTopics,
    contentReviewComplete,
    hasConceptReview,
    totalLessons,
    completedLessons,
    totalTodo,
    completedTodo,
    softwareLessonId: softwareLesson?.id || null
  }
}

function toSet (value) {
  if (value instanceof Set) return value
  if (Array.isArray(value)) return new Set(value)
  if (value && typeof value[Symbol.iterator] === 'function') return new Set(value)
  return new Set()
}

function emptyProgress () {
  return {
    total: 0,
    completed: 0,
    percent: 0,
    totalTopics: 0,
    openedTopics: 0,
    contentReviewComplete: false,
    hasConceptReview: false,
    totalLessons: 0,
    completedLessons: 0,
    totalTodo: 0,
    completedTodo: 0,
    softwareLessonId: null
  }
}
