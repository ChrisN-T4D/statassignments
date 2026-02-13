/**
 * Tracks software lesson metrics and sends them to PocketBase and optionally
 * to a Docker/neural-network metrics API.
 *
 * PocketBase: collection `software_lesson_metrics` with fields:
 *   - user (relation → users, optional)
 *   - lesson_id (text)
 *   - lesson_title (text)
 *   - module (text)
 *   - software (text)
 *   - event_type (text: hint_used | phase_completed | self_check_submitted | apply_exercise_completed | lesson_completed)
 *   - event_payload (json)
 *
 * Neural network: POST to VITE_METRICS_API_URL with same event shape (batch or single).
 */

import { pb } from '../lib/pocketbase'

const METRICS_API_URL = import.meta.env.VITE_METRICS_API_URL || ''
const COLLECTION = 'software_lesson_metrics'

/**
 * Build a metric event record for PocketBase.
 * @param {Object} lesson - { id, title, module, software }
 * @param {string} eventType - hint_used | phase_completed | self_check_submitted | apply_exercise_completed | lesson_completed
 * @param {Object} payload - event-specific data
 */
function buildMetric(lesson, eventType, payload = {}) {
  const record = {
    lesson_id: lesson?.id || '',
    lesson_title: lesson?.title || '',
    module: lesson?.module || '',
    software: lesson?.software || '',
    event_type: eventType,
    event_payload: payload
  }
  const userId = pb.authStore.record?.id
  if (userId) record.user = userId
  return record
}

/**
 * Save a single metric to PocketBase.
 */
async function saveToPocketBase(record) {
  try {
    await pb.collection(COLLECTION).create(record)
  } catch (err) {
    console.warn('[useSoftwareLessonMetrics] PocketBase save failed:', err.message)
  }
}

/**
 * Send metric(s) to the neural network / Docker metrics API (if URL is set).
 */
async function sendToMetricsApi(record) {
  if (!METRICS_API_URL) return
  try {
    const res = await fetch(METRICS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    })
    if (!res.ok) {
      console.warn('[useSoftwareLessonMetrics] Metrics API error:', res.status, await res.text())
    }
  } catch (err) {
    console.warn('[useSoftwareLessonMetrics] Metrics API request failed:', err.message)
  }
}

export function useSoftwareLessonMetrics() {
  /**
   * Track hint used for an Apply-phase exercise.
   */
  async function trackHintUsed(lesson, exerciseTitle) {
    const record = buildMetric(lesson, 'hint_used', { exercise_title: exerciseTitle })
    await Promise.all([saveToPocketBase(record), sendToMetricsApi(record)])
  }

  /**
   * Track phase completed (Learn, Practice, Self-Check, or advancing to Apply).
   */
  async function trackPhaseCompleted(lesson, phase) {
    const record = buildMetric(lesson, 'phase_completed', { phase })
    await Promise.all([saveToPocketBase(record), sendToMetricsApi(record)])
  }

  /**
   * Track self-check submitted with score.
   */
  async function trackSelfCheckSubmitted(lesson, score, total) {
    const record = buildMetric(lesson, 'self_check_submitted', {
      score: Number(score),
      total: Number(total),
      percent: total > 0 ? Math.round((score / total) * 100) : 0
    })
    await Promise.all([saveToPocketBase(record), sendToMetricsApi(record)])
  }

  /**
   * Track an Apply-phase exercise marked complete.
   */
  async function trackApplyExerciseCompleted(lesson, exerciseTitle) {
    const record = buildMetric(lesson, 'apply_exercise_completed', { exercise_title: exerciseTitle })
    await Promise.all([saveToPocketBase(record), sendToMetricsApi(record)])
  }

  /**
   * Track lesson completed (user clicked Complete Lesson).
   */
  async function trackLessonCompleted(lesson) {
    const record = buildMetric(lesson, 'lesson_completed', {})
    await Promise.all([saveToPocketBase(record), sendToMetricsApi(record)])
  }

  return {
    trackHintUsed,
    trackPhaseCompleted,
    trackSelfCheckSubmitted,
    trackApplyExerciseCompleted,
    trackLessonCompleted
  }
}
