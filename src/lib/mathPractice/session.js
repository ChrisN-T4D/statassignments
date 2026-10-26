/**
 * Mastery and pacing rules for Module 0 Math Practice. Pure functions; the view and composable feed in state.
 *
 * A topic (objective) is mastered when BKT says the student probably knows it (pL >= MASTERY_PL, the same line
 * Concept Review uses) AND the last STREAK_NEEDED answers on it were correct, so a lucky run cannot finish a topic.
 *
 * Because students may be getting help from an AI app, an answer that arrives with soft warning signs counts as
 * weaker evidence: BKT scores it as if guessing were likely, and it does not extend the correct-answer streak.
 * Warnings are never shown to the student as accusations; the topic simply takes a few more clean answers.
 */
import { MASTERY_PL, STREAK_NEEDED } from '../conceptReviewUnlock.js'

export { MASTERY_PL, STREAK_NEEDED }
/** Faster than this is not a plausible read-and-type time for a worked question. */
export const MIN_PLAUSIBLE_SECONDS = 2

export function isTopicMastered({ pL = 0, streak = 0 } = {}) {
  return pL >= MASTERY_PL && streak >= STREAK_NEEDED
}

/**
 * @param {{ pasted?: boolean, leftPage?: boolean, seconds?: number }} signals
 * @returns {{ weak: boolean, reasons: string[] }}
 */
export function evidenceQuality({ pasted = false, leftPage = false, seconds = Infinity } = {}) {
  const reasons = []
  if (pasted) reasons.push('paste')
  if (leftPage) reasons.push('left-page')
  if (seconds < MIN_PLAUSIBLE_SECONDS) reasons.push('too-fast')
  return { weak: reasons.length > 0, reasons }
}

/**
 * Which BKT difficulty tier to report for an answer. Typed numeric answers are hard to guess, so they carry
 * more evidence ("hard" tier: low guess rate). Multiple choice uses a middle tier. Weak evidence is reported as
 * "easy" (high guess rate) so it moves mastery only a little.
 */
export function bktDifficulty(question, { weak = false } = {}) {
  if (weak) return 'easy'
  return question.spec.type === 'number' ? 'hard' : 'medium'
}

/** Next streak after an answer. Weak-evidence correct answers keep the streak where it was. */
export function nextStreak(streak, { correct, weak }) {
  if (!correct) return 0
  return weak ? streak : streak + 1
}

/**
 * Pick the topic to practice. Stay on the current topic until it is mastered; then take the first unmastered
 * topic in module order. Returns null when every topic is mastered.
 */
export function pickTopic(objectiveIds, statusById, currentId = null) {
  if (currentId && !isTopicMastered(statusById[currentId])) return currentId
  return objectiveIds.find((id) => !isTopicMastered(statusById[id])) ?? null
}

export function allMastered(objectiveIds, statusById) {
  return objectiveIds.every((id) => isTopicMastered(statusById[id]))
}

/* ---------------------------------------------------------------- Mastery Check
 * A short, timed, no-help quiz that unlocks for a topic once practice mastery is reached. It cannot be made
 * AI-proof on a student's own device, so it is built to make that costly and visible: fresh numbers, a countdown
 * per question, no worked steps until the end, and behavior signals the instructor can see. A pass with clean
 * signals is "confirmed"; a pass with warning signs is recorded as "unverified" for a spot check.
 */
export const CHECK = {
  questions: 5,
  passMark: 4,
  /** Minutes before a failed check can be retried (practice in between is encouraged). */
  retryMinutes: 10,
  secondsChoice: 45,
  secondsTyped: 90
}

export function checkSeconds(question) {
  return question.spec.type === 'choice' ? CHECK.secondsChoice : CHECK.secondsTyped
}

/** Warning signs about how one answer was entered. `chars` is the length typed; `keystrokes` counts key presses and symbol-button taps. */
export function typingSignals({ chars = 0, keystrokes = 0, firstKeyMs = null, pasted = false, leftPage = false, timedOut = false } = {}) {
  const flags = []
  if (pasted) flags.push('paste')
  if (leftPage) flags.push('left-page')
  if (chars >= 3 && keystrokes < Math.ceil(chars / 2)) flags.push('inserted-text')
  if (firstKeyMs != null && firstKeyMs < 800 && chars >= 2) flags.push('instant-start')
  if (timedOut) flags.push('timed-out')
  return flags
}

/**
 * @param {Array<{ correct: boolean, flags: string[] }>} results one per question
 * @returns {{ score: number, total: number, passed: boolean, state: 'confirmed'|'unverified'|'failed', flagged: number }}
 */
export function scoreCheck(results) {
  const total = results.length
  const score = results.filter((r) => r.correct).length
  const passed = score >= CHECK.passMark
  const flagged = results.filter((r) => r.flags.some((f) => f !== 'timed-out')).length
  // One stray flag (a tab switch to a calculator, say) does not undo a pass; a pattern does.
  const state = !passed ? 'failed' : flagged >= 2 ? 'unverified' : 'confirmed'
  return { score, total, passed, state, flagged }
}

export function retryWaitMinutes(lastFailedAt, now = Date.now()) {
  if (!lastFailedAt) return 0
  const wait = CHECK.retryMinutes - (now - lastFailedAt) / 60000
  return wait > 0 ? Math.ceil(wait) : 0
}
