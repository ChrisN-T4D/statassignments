// Records Math Practice answers: BKT update + practice_attempts row, and keeps the per-topic correct-answer streak.
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'
import { updateBKT, getBKTState } from './useBKT'
import { STREAK_NEEDED, bktDifficulty, evidenceQuality, nextStreak } from '../lib/mathPractice/session.js'
import { sourceWithFlags } from '../lib/answerEvidence.js'

const CHECK_KEY = (userId, objectiveId) => `mathPractice:check:v1:${userId || 'anon'}:${objectiveId}`

const KEY = (userId, objectiveId) => `mathPractice:v1:${userId || 'anon'}:${objectiveId}`

function readLocal(userId, objectiveId) {
  try {
    const raw = localStorage.getItem(KEY(userId, objectiveId))
    return raw ? JSON.parse(raw) : { streak: 0, attempts: 0, correct: 0, weak: 0 }
  } catch {
    return { streak: 0, attempts: 0, correct: 0, weak: 0 }
  }
}

function writeLocal(userId, objectiveId, value) {
  try {
    localStorage.setItem(KEY(userId, objectiveId), JSON.stringify(value))
  } catch {
    /* storage can be blocked; the session still works */
  }
}

export function useMathPractice() {
  const { user } = useAuth()
  const userId = () => user.value?.id || null

  async function loadStatus(objectiveIds) {
    const out = {}
    for (const id of objectiveIds) {
      const local = readLocal(userId(), id)
      let pL = 0.1
      try {
        const state = await getBKTState(id)
        if (state && typeof state.pL === 'number') pL = state.pL
      } catch {
        /* keep the prior */
      }
      out[id] = { pL, streak: local.streak, attempts: local.attempts, correct: local.correct }
    }
    return out
  }

  /**
   * @param {object} question from generateQuestion
   * @param {{ typed: string, correct: boolean, timeData: object|null, signals: { pasted:boolean, leftPage:boolean, answerChanges:number } }} result
   * @returns {Promise<{ pL: number, streak: number, weak: boolean }>}
   */
  async function recordAnswer(question, { typed, correct, timeData, signals }) {
    const seconds = timeData?.activeTimeSeconds ?? Infinity
    const { weak, reasons } = evidenceQuality({ pasted: signals.pasted, leftPage: signals.leftPage, seconds })
    // Only a correct answer is discounted: a wrong answer is honest evidence either way.
    const discount = weak && correct
    const difficulty = bktDifficulty(question, { weak: discount })
    const meta = { source: 'math_practice', answer: typed, evidence: discount ? 'weak' : 'normal', reasons, kind: question.kind, level: question.level }

    let pL = null
    try {
      const state = await updateBKT(
        question.objectiveId,
        correct,
        difficulty,
        timeData,
        { time_to_first_selection: null, answer_changes: signals.answerChanges ?? 0 },
        null,
        question.id,
        meta
      )
      if (state && typeof state.pL === 'number') pL = state.pL
    } catch (err) {
      console.warn('[math practice] BKT update failed', err)
    }

    const local = readLocal(userId(), question.objectiveId)
    local.attempts += 1
    if (correct) local.correct += 1
    if (discount) local.weak += 1
    local.streak = nextStreak(local.streak, { correct, weak: discount })
    writeLocal(userId(), question.objectiveId, local)

    if (userId()) {
      try {
        await pb.collection('practice_attempts').create({
          user: userId(),
          problem: question.id,
          answer: String(typed || '(no answer)'),
          is_correct: correct,
          difficulty,
          source: 'math_practice',
          active_time_seconds: timeData?.activeTimeSeconds,
          total_time_seconds: timeData?.totalTimeSeconds,
          time_maxed_out: timeData?.wasMaxedOut,
          idle_detected: timeData?.idleDetected,
          answer_changes: signals.answerChanges ?? 0
        })
      } catch (err) {
        console.warn('[math practice] could not save attempt', err)
      }
    }
    return { pL, streak: local.streak, weak: discount }
  }

  function loadCheckStates(objectiveIds) {
    const out = {}
    for (const id of objectiveIds) {
      try {
        const raw = localStorage.getItem(CHECK_KEY(userId(), id))
        out[id] = raw ? JSON.parse(raw) : { state: null }
      } catch {
        out[id] = { state: null }
      }
    }
    return out
  }

  function saveCheckState(objectiveId, value) {
    try {
      localStorage.setItem(CHECK_KEY(userId(), objectiveId), JSON.stringify(value))
    } catch {
      /* storage can be blocked; the check still works for this visit */
    }
  }

  /** One answered (or timed-out) Mastery Check question. Warning flags make a correct answer weaker evidence. */
  async function recordCheckAnswer(question, { typed, correct, timeData, flags }) {
    const weak = flags.some((f) => f !== 'timed-out')
    const discount = weak && correct
    const difficulty = bktDifficulty(question, { weak: discount })
    const meta = { source: 'math_mastery_check', answer: typed, evidence: discount ? 'weak' : 'normal', reasons: flags, kind: question.kind, level: question.level }
    try {
      await updateBKT(question.objectiveId, correct, difficulty, timeData, { time_to_first_selection: null, answer_changes: 0 }, null, question.id, meta)
    } catch (err) {
      console.warn('[math practice] BKT update failed', err)
    }
    if (userId()) {
      try {
        await pb.collection('practice_attempts').create({
          user: userId(),
          problem: question.id,
          answer: String(typed || '(no answer)'),
          is_correct: correct,
          difficulty,
          // flags ride in the source so an instructor can filter: math_mastery_check|paste,left-page
          source: sourceWithFlags('math_mastery_check', flags),
          active_time_seconds: timeData?.activeTimeSeconds,
          total_time_seconds: timeData?.totalTimeSeconds,
          time_maxed_out: timeData?.wasMaxedOut,
          idle_detected: timeData?.idleDetected
        })
      } catch (err) {
        console.warn('[math practice] could not save check attempt', err)
      }
    }
  }

  return { loadStatus, recordAnswer, loadCheckStates, saveCheckState, recordCheckAnswer, STREAK_NEEDED }
}
