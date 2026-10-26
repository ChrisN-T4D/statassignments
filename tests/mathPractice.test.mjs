import { test } from 'node:test'
import { ok, strictEqual, deepStrictEqual } from 'node:assert'
import { gradeAnswer, parseExpression, normalizeInput } from '../src/lib/mathPractice/grade.js'
import { generateQuestion, OBJECTIVE_IDS, LEVELS, BANKS } from '../src/lib/mathPractice/generators.js'
import { getObjectivesByModule } from '../src/data/objectives.js'

const num = (value, extra = {}) => ({ type: 'number', value, ...extra })

test('typed answers: equivalent forms are accepted', () => {
  const yes = (input, spec) => ok(gradeAnswer(input, spec).correct, `"${input}" should be accepted`)
  yes('6', num(6)); yes('6.0', num(6)); yes('x = 6', num(6)); yes(' X=6 ', num(6)); yes('6.', num(6))
  yes('-9', num(-9)); yes('−9', num(-9)); yes('– 9', num(-9))
  yes('3/4', num(0.75)); yes('.75', num(0.75)); yes('0.750', num(0.75)); yes('6/8', num(0.75, { lowestTerms: '3/4' }))
  yes('75%', num(75, { percent: true })); yes('75', num(75, { percent: true }))
  yes('45%', num(0.45)); yes('0.45', num(0.45))
  yes('25', num(25)); yes('1,200', num(1200)); yes('4²', num(16)); yes('4^2', num(16)); yes('2×3', num(6)); yes('12÷4', num(3))
  yes('√25', num(5)); yes('sqrt(25)', num(5)); yes('sqrt 25', num(5))
  yes('3.16', num(Math.sqrt(10), { decimals: 2 })); yes('3.162', num(Math.sqrt(10), { decimals: 2 })); yes('3.1623', num(Math.sqrt(10), { decimals: 2 }))
  yes('0.00012', num(0.00012, { tol: 1e-7 })); yes('1.2E-4', num(0.00012, { tol: 1e-7 })); yes('1.2×10^-4', num(0.00012, { tol: 1e-7 }))
  yes('16 students', num(16)); yes('$72', num(72)); yes('3(4+1)', num(15))
})

test('typed answers: wrong answers are rejected, with hints for common slips', () => {
  const g = gradeAnswer('28', num(16, { traps: [{ value: 28, hint: 'Add last.' }] }))
  strictEqual(g.correct, false); strictEqual(g.hint, 'Add last.')
  strictEqual(gradeAnswer('3.2', num(Math.sqrt(10), { decimals: 2 })).correct, false)
  strictEqual(gradeAnswer('0.75', num(75, { percent: true })).correct, false)
  ok(/decimal form/.test(gradeAnswer('0.75', num(75, { percent: true })).hint))
  strictEqual(gradeAnswer('abc', num(1)).invalid, true)
  strictEqual(gradeAnswer('', num(1)).invalid, true)
  strictEqual(gradeAnswer('5/0', num(1)).invalid, true)
  ok(gradeAnswer('6/8', num(0.75, { lowestTerms: '3/4' })).note)
  strictEqual(gradeAnswer(2, { type: 'choice', correctIndex: 2 }).correct, true)
  strictEqual(gradeAnswer(1, { type: 'choice', correctIndex: 2 }).correct, false)
})

test('parser follows the order of operations', () => {
  const v = (s, vars) => parseExpression(s, vars).value
  strictEqual(v('4+3*2^2'), 16); strictEqual(v('(4+3)*2^2'), 28); strictEqual(v('-3^2'), -9); strictEqual(v('(-3)^2'), 9)
  strictEqual(v('2^3^2'), 512); strictEqual(v('sqrt(9+16)'), 5); strictEqual(v('3*x-6', { x: 6 }), 12)
  strictEqual(v('10^-2'), 0.01)
  strictEqual(normalizeInput('x = −6'), '-6')
})

test('every objective has a generator at every level', () => {
  const ids = getObjectivesByModule('stats-module-0').map((o) => o.objectiveId).sort()
  deepStrictEqual([...OBJECTIVE_IDS].sort(), ids)
  for (const id of OBJECTIVE_IDS) for (const lv of LEVELS) ok(BANKS[id][lv]?.length, `${id} ${lv}`)
})

test('generated questions are well formed and their answers are re-derived independently', () => {
  let n = 0
  for (const id of OBJECTIVE_IDS) {
    for (const level of LEVELS) {
      for (let seed = 1; seed <= 250; seed++) {
        const q = generateQuestion(id, { seed, level })
        n++
        ok(q.prompt && q.prompt.length > 5, `${id}/${level}/${seed} prompt`)
        ok(Array.isArray(q.steps) && q.steps.length > 0, `${q.id} steps`)
        if (q.spec.type === 'choice') {
          ok(q.spec.options.length >= 2 && new Set(q.spec.options).size === q.spec.options.length, `${q.id} options distinct`)
          ok(q.spec.correctIndex >= 0 && q.spec.correctIndex < q.spec.options.length, `${q.id} correctIndex`)
          continue
        }
        ok(Number.isFinite(q.spec.value), `${q.id} value finite`)
        if (typeof q.check === 'string') {
          const got = parseExpression(q.check).value
          ok(Math.abs(got - q.spec.value) <= Math.max(1e-6, Math.abs(q.spec.value) * 1e-6, q.spec.tol ?? 0, q.spec.decimals != null ? 0.5 * 10 ** -q.spec.decimals : 0), `${q.id}: check "${q.check}" = ${got}, spec ${q.spec.value}`)
        } else if (q.check?.eq) {
          const [l, r] = q.check.eq
          const x = q.spec.value
          const lv = parseExpression(l, { x }).value, rv = parseExpression(r, { x }).value
          ok(Math.abs(lv - rv) < 1e-9, `${q.id}: ${l} = ${r} fails at x=${x}`)
        }
        ok(gradeAnswer(String(q.spec.value), q.spec).correct || q.spec.percent, `${q.id}: its own answer is accepted`)
        for (const t of q.spec.traps || []) ok(Math.abs(t.value - q.spec.value) > 1e-9, `${q.id}: trap equals the answer`)
      }
    }
  }
  ok(n >= 5000)
})

test('same seed gives the same question; different seeds vary', () => {
  const a = generateQuestion('M0-O1', { seed: 42, level: 'easy' }), b = generateQuestion('M0-O1', { seed: 42, level: 'easy' })
  strictEqual(a.prompt, b.prompt)
  const prompts = new Set(Array.from({ length: 40 }, (_, i) => generateQuestion('M0-O1', { seed: i + 1, level: 'medium' }).prompt))
  ok(prompts.size > 20)
})

test('graph questions render svg with the chart data', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const q = generateQuestion('M0-O6', { seed, level: 'easy' })
    ok(q.figure.startsWith('<svg') && q.figure.includes('</svg>'))
    ok(!/undefined|NaN/.test(q.figure), `${q.id} svg has undefined/NaN`)
  }
})

import { isTopicMastered, evidenceQuality, nextStreak, bktDifficulty, pickTopic, allMastered, STREAK_NEEDED } from '../src/lib/mathPractice/session.js'

test('mastery needs both a high pL and a streak', () => {
  strictEqual(isTopicMastered({ pL: 0.95, streak: 2 }), false)
  strictEqual(isTopicMastered({ pL: 0.8, streak: 5 }), false)
  strictEqual(isTopicMastered({ pL: 0.9, streak: STREAK_NEEDED }), true)
})

test('answers with warning signs are weak evidence and do not extend the streak', () => {
  strictEqual(evidenceQuality({ seconds: 8 }).weak, false)
  deepStrictEqual(evidenceQuality({ pasted: true, seconds: 8 }).reasons, ['paste'])
  strictEqual(evidenceQuality({ leftPage: true, seconds: 8 }).weak, true)
  strictEqual(evidenceQuality({ seconds: 0.4 }).weak, true)
  strictEqual(nextStreak(2, { correct: true, weak: false }), 3)
  strictEqual(nextStreak(2, { correct: true, weak: true }), 2)
  strictEqual(nextStreak(2, { correct: false, weak: false }), 0)
  strictEqual(bktDifficulty({ spec: { type: 'number' } }), 'hard')
  strictEqual(bktDifficulty({ spec: { type: 'choice' } }), 'medium')
  strictEqual(bktDifficulty({ spec: { type: 'number' } }, { weak: true }), 'easy')
})

test('pickTopic stays on a topic until it is mastered, then moves on in order', () => {
  const ids = ['A', 'B', 'C']
  const done = { pL: 0.95, streak: 3 }, notYet = { pL: 0.3, streak: 1 }
  strictEqual(pickTopic(ids, { A: notYet, B: notYet, C: notYet }, null), 'A')
  strictEqual(pickTopic(ids, { A: notYet, B: done, C: notYet }, 'C'), 'C')
  strictEqual(pickTopic(ids, { A: done, B: notYet, C: notYet }, 'A'), 'B')
  strictEqual(pickTopic(ids, { A: done, B: done, C: done }, 'C'), null)
  strictEqual(allMastered(ids, { A: done, B: done, C: done }), true)
})

import { CHECK, checkSeconds, typingSignals, scoreCheck, retryWaitMinutes } from '../src/lib/mathPractice/session.js'
import { generateCheck } from '../src/lib/mathPractice/generators.js'

test('a Mastery Check has fresh, varied questions for the topic', () => {
  for (const id of OBJECTIVE_IDS) {
    const a = generateCheck(id, { seed: 100 }), b = generateCheck(id, { seed: 5000 })
    strictEqual(a.length, CHECK.questions)
    ok(a.every((q) => q.objectiveId === id))
    ok(new Set(a.map((q) => q.id)).size === a.length, `${id} distinct ids`)
    ok(new Set(a.map((q) => q.kind)).size >= 3, `${id} has at least 3 kinds`)
    ok(a.map((q) => q.prompt).join('|') !== b.map((q) => q.prompt).join('|'), `${id} differs between checks`)
    ok(a.every((q) => checkSeconds(q) > 0))
  }
})

test('typing signals flag pasted/inserted/instant answers but not normal typing', () => {
  deepStrictEqual(typingSignals({ chars: 4, keystrokes: 4, firstKeyMs: 3000 }), [])
  ok(typingSignals({ chars: 8, keystrokes: 1, firstKeyMs: 2000 }).includes('inserted-text'))
  ok(typingSignals({ chars: 3, keystrokes: 3, firstKeyMs: 200 }).includes('instant-start'))
  ok(typingSignals({ pasted: true }).includes('paste'))
  deepStrictEqual(typingSignals({ chars: 1, keystrokes: 1, firstKeyMs: 100 }), [])
})

test('check scoring: pass mark, clean vs unverified, retry wait', () => {
  const r = (correct, flags = []) => ({ correct, flags })
  strictEqual(scoreCheck([r(true), r(true), r(true), r(true), r(false)]).state, 'confirmed')
  strictEqual(scoreCheck([r(true), r(true), r(true), r(false), r(false)]).state, 'failed')
  strictEqual(scoreCheck([r(true, ['left-page']), r(true), r(true), r(true), r(true)]).state, 'confirmed')
  strictEqual(scoreCheck([r(true, ['paste']), r(true, ['left-page']), r(true), r(true), r(true)]).state, 'unverified')
  strictEqual(scoreCheck([r(true, ['timed-out']), r(true, ['timed-out']), r(true), r(true), r(true)]).state, 'confirmed')
  strictEqual(retryWaitMinutes(null), 0)
  strictEqual(retryWaitMinutes(Date.now() - 3 * 60000), 7)
  strictEqual(retryWaitMinutes(Date.now() - 20 * 60000), 0)
})
