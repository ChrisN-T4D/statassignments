import { ref } from 'vue'

const STORAGE_PREFIX = 'lesson-phases-'
const phaseProgressVersion = ref(0)

const phaseOrder = ['iDo', 'weDo', 'selfCheck', 'youDo']

/**
 * Get completed phase keys for a lesson from localStorage.
 * @param {string} lessonId
 * @returns {string[]}
 */
export function getCompletedPhases(lessonId) {
  if (!lessonId) return []
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + lessonId)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Persist completed phases for a lesson and bump version so other views (e.g. ClassHome) can react.
 * @param {string} lessonId
 * @param {string[]} phases - e.g. ['iDo', 'weDo']
 */
export function setCompletedPhases(lessonId, phases) {
  if (!lessonId) return
  try {
    localStorage.setItem(STORAGE_PREFIX + lessonId, JSON.stringify(Array.from(phases)))
    phaseProgressVersion.value++
  } catch (err) {
    console.warn('Unable to save lesson phase progress:', err)
  }
}

/**
 * Whether a phase is locked (previous phase not completed).
 * @param {string} phaseKey - iDo | weDo | selfCheck | youDo
 * @param {string[]} completedPhases
 * @returns {boolean}
 */
export function isPhaseLocked(phaseKey, completedPhases = []) {
  const idx = phaseOrder.indexOf(phaseKey)
  if (idx <= 0) return false
  const prevPhase = phaseOrder[idx - 1]
  return !completedPhases.includes(prevPhase)
}

export function useLessonPhaseProgress() {
  return {
    getCompletedPhases,
    setCompletedPhases,
    isPhaseLocked,
    phaseProgressVersion,
    phaseOrder
  }
}
