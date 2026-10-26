/**
 * Soft signals about how an answer was produced, shared by Concept Review. Students may be getting help from an AI
 * app on their phone, and a web page cannot stop that, so a correct answer with warning signs is treated as weaker
 * evidence: BKT scores it as an easy item and it does not extend the correct-answer streak. Nothing is shown to the
 * student as an accusation.
 */

/** Total time the page was in the background during one question before it counts as "left the page". */
export const HIDDEN_SECONDS_LIMIT = 8

/** Fastest believable time to read a question and answer it: about 0.12 s per word, between 2 and 8 s. */
export function minPlausibleSeconds(questionText = '') {
  const words = String(questionText).trim().split(/\s+/).filter(Boolean).length
  return Math.min(8, Math.max(2, Math.round(words * 0.12 * 10) / 10))
}

/**
 * @param {{ seconds?: number, hiddenSeconds?: number, questionText?: string, retry?: boolean }} input
 * @returns {{ weak: boolean, reasons: string[] }}
 */
export function conceptEvidence({ seconds = Infinity, hiddenSeconds = 0, questionText = '', retry = false } = {}) {
  const reasons = []
  if (retry) reasons.push('retry')
  else if (seconds < minPlausibleSeconds(questionText)) reasons.push('too-fast')
  if (hiddenSeconds >= HIDDEN_SECONDS_LIMIT) reasons.push('left-page')
  return { weak: reasons.length > 0, reasons }
}

/** `practice_attempts.source` is limited to 64 characters. */
export function sourceWithFlags(base, flags = []) {
  const text = flags.length ? `${base}|${flags.join(',')}` : base
  return text.length > 64 ? text.slice(0, 64) : text
}
