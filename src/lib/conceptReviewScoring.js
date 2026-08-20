/**
 * Score a Concept Review question against a student answer.
 * Student answers are option ids (string or string[]) or a fill-in string.
 * Matching answers are { [left]: rightText }.
 */

export function scoreConceptAnswer(question, answer) {
  if (!question) return { correct: false, explanation: '' }

  const explanation =
    question.feedback?.incorrect ||
    question.feedback?.correct ||
    question.explanation ||
    ''
  const correctExplanation = question.feedback?.correct || explanation

  if (question.type === 'multiple_choice') {
    const ok = answer === question.correct
    return { correct: ok, explanation: ok ? correctExplanation : explanation }
  }

  if (question.type === 'true_false') {
    const expected = question.correct === true || question.correct === 'True' || question.correct === 'true'
    const given = answer === true || answer === 'True' || answer === 'true' || answer === 'T'
    const ok = given === expected
    return { correct: ok, explanation: ok ? correctExplanation : explanation }
  }

  if (question.type === 'multiple_select') {
    const expected = [...(question.correct || [])].map(String).sort()
    const given = (Array.isArray(answer) ? answer : [answer]).filter(Boolean).map(String).sort()
    const ok = expected.length === given.length && expected.every((id, i) => id === given[i])
    return { correct: ok, explanation: ok ? correctExplanation : explanation }
  }

  if (question.type === 'fill_blank') {
    const expected = Array.isArray(question.answer) ? question.answer : [question.answer || question.correct]
    const given = String(answer || '').trim().toLowerCase()
    const ok = expected.some((a) => String(a || '').trim().toLowerCase() === given)
    return { correct: ok, explanation: ok ? correctExplanation : explanation }
  }

  if (question.type === 'matching' && Array.isArray(question.pairs)) {
    const given = answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {}
    const ok = question.pairs.every((p) => given[p.left] === p.right)
    return { correct: ok, explanation: ok ? correctExplanation : explanation }
  }

  return { correct: false, explanation: explanation || 'Compare your written answer to the explanation after you submit.' }
}

/** Deterministic shuffle so reprinting a packet keeps the same bank order. */
function seededShuffle(items, seedStr) {
  const a = [...items]
  let s = 0
  for (let i = 0; i < seedStr.length; i++) {
    s = (s * 31 + seedStr.charCodeAt(i)) | 0
  }
  s = Math.abs(s) || 1
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Print-friendly matching layout: left blanks + lettered description bank
 * (bank order is shuffled so correct order is not obvious).
 */
export function matchingPrintParts(question) {
  if (!question || question.type !== 'matching' || !Array.isArray(question.pairs)) {
    return null
  }
  const blanks = question.pairs.map((p) => `${p.left}  →  ________`)
  const rights = seededShuffle(
    question.pairs.map((p) => p.right),
    question.id || question.question || 'matching'
  )
  const bank = rights.map((text, i) => `${String.fromCharCode(65 + i)}. ${text}`)
  return { blanks, bank }
}

export function questionPromptLines(question) {
  if (!question) return []
  const matching = matchingPrintParts(question)
  if (matching) {
    return [...matching.blanks, '', 'Descriptions (use each once):', ...matching.bank]
  }
  if (question.type === 'ordering' && Array.isArray(question.items)) {
    return question.items.map((item, i) => `${i + 1}. ${item}`)
  }
  return []
}

export function usesWrittenAnswerBlank(question) {
  if (!question) return true
  // Matching uses per-term blanks + a lettered bank; a single Answer line is misleading.
  return question.type !== 'matching'
}
