/**
 * Score a Concept Review question against a student answer.
 * Student answers are option ids (string or string[]) or a fill-in string.
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

  return { correct: false, explanation: explanation || 'Compare your written answer to the explanation after you submit.' }
}

export function questionPromptLines(question) {
  if (!question) return []
  if (question.type === 'matching' && Array.isArray(question.pairs)) {
    return question.pairs.map((p) => `${p.left}  →  ________`)
  }
  if (question.type === 'ordering' && Array.isArray(question.items)) {
    return question.items.map((item, i) => `${i + 1}. ${item}`)
  }
  return []
}
