/**
 * Lenient grading for typed math answers (Module 0 Math Practice).
 * Accepts equivalent forms: 6, 6.0, x = 6, 3/4, .75, 75%, 2^3, 2³, √25, sqrt(25), 1.2E-4, 1.2×10^-4, "1,200".
 * No eval: a small recursive-descent parser handles + - * / ^ ( ), sqrt, percent, and one optional variable.
 */

const SUPERSCRIPT = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' }

export function normalizeInput(raw) {
  let s = String(raw ?? '')
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + [...m].map((c) => SUPERSCRIPT[c]).join(''))
  s = s.replace(/[−–—‒﹣－]/g, '-')
  s = s.replace(/[×·⋅∙✕]/g, '*')
  s = s.replace(/[÷∕⁄]/g, '/')
  s = s.replace(/√/g, 'sqrt')
  s = s.replace(/\s+/g, '').toLowerCase()
  while (/\d,\d{3}/.test(s)) s = s.replace(/(\d),(\d{3})/g, '$1$2')
  s = s.replace(/^\$/, '')
  s = s.replace(/^[a-z]\w*=/, '')
  s = s.replace(/[.]+$/, '')
  s = s.replace(/(?<=[\d)%])(?!sqrt)[a-z]+$/, '')
  return s
}

function tokenize(s) {
  const tokens = []
  let i = 0
  while (i < s.length) {
    const rest = s.slice(i)
    let m
    if ((m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/.exec(rest))) {
      tokens.push({ t: 'num', v: Number(m[0]) })
      i += m[0].length
    } else if (rest.startsWith('sqrt')) {
      tokens.push({ t: 'sqrt' })
      i += 4
    } else if ('+-*/^()%'.includes(rest[0])) {
      tokens.push({ t: rest[0] })
      i += 1
    } else if (/^[a-z]$/.test(rest[0])) {
      tokens.push({ t: 'var', v: rest[0] })
      i += 1
    } else {
      return null
    }
  }
  return tokens
}

/** Parse an expression. Returns { value, percent } or null. */
export function parseExpression(raw, vars = {}) {
  const s = normalizeInput(raw)
  if (!s) return null
  const tokens = tokenize(s)
  if (!tokens) return null
  let pos = 0
  let sawPercent = false
  const peek = () => tokens[pos]
  const take = () => tokens[pos++]
  const fail = () => {
    throw new Error('parse')
  }

  function expr() {
    let v = term()
    while (peek() && (peek().t === '+' || peek().t === '-')) {
      const op = take().t
      const r = term()
      v = op === '+' ? v + r : v - r
    }
    return v
  }
  function term() {
    let v = unary()
    while (peek()) {
      const t = peek().t
      if (t === '*' || t === '/') {
        take()
        const r = unary()
        v = t === '*' ? v * r : v / r
      } else if (t === '(' || t === 'sqrt' || t === 'var') {
        v *= unary()
      } else break
    }
    return v
  }
  function unary() {
    const p = peek()
    if (p && p.t === '-') {
      take()
      return -unary()
    }
    if (p && p.t === '+') {
      take()
      return unary()
    }
    return power()
  }
  function power() {
    const base = atom()
    if (peek() && peek().t === '^') {
      take()
      return Math.pow(base, unary())
    }
    return base
  }
  function atom() {
    const p = take()
    if (!p) fail()
    if (p.t === 'num') {
      let v = p.v
      if (peek() && peek().t === '%') {
        take()
        sawPercent = true
        v /= 100
      }
      return v
    }
    if (p.t === 'var') {
      if (!(p.v in vars)) fail()
      return vars[p.v]
    }
    if (p.t === '(') {
      const v = expr()
      if (!peek() || take().t !== ')') fail()
      if (peek() && peek().t === '%') {
        take()
        sawPercent = true
        return v / 100
      }
      return v
    }
    if (p.t === 'sqrt') {
      const v = power()
      return Math.sqrt(v)
    }
    return fail()
  }

  try {
    const value = expr()
    if (pos !== tokens.length || !Number.isFinite(value)) return null
    return { value, percent: sawPercent }
  } catch {
    return null
  }
}

function gcd(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a
}

/**
 * @param {string|number} raw what the student typed (or the chosen option index for 'choice')
 * @param {object} spec
 *   { type: 'number', value, decimals?, tol?, percent?, lowestTerms?, traps?: [{ value, hint }] }
 *   { type: 'choice', correctIndex }
 * @returns {{ correct: boolean, invalid?: boolean, hint?: string, note?: string }}
 */
export function gradeAnswer(raw, spec) {
  if (spec.type === 'choice') {
    return { correct: Number(raw) === spec.correctIndex }
  }
  const parsed = parseExpression(raw)
  if (!parsed) {
    return { correct: false, invalid: true, hint: 'Type a number (you can use fractions like 3/4, or the symbol buttons).' }
  }
  const tol =
    spec.tol ??
    (spec.decimals != null ? 0.5 * Math.pow(10, -spec.decimals) + 1e-9 : 1e-9)
  const slack = Math.max(tol, Math.abs(spec.value) * 1e-9)
  // typed "75%" is stored as 0.75; a percent question wants 75
  const typed = spec.percent && parsed.percent ? parsed.value * 100 : parsed.value
  const ok = Math.abs(typed - spec.value) <= slack
  if (ok) {
    const out = { correct: true }
    const frac = /^(-?\d+)\/(\d+)$/.exec(normalizeInput(raw))
    if (spec.lowestTerms && frac && gcd(Number(frac[1]), Number(frac[2])) > 1) {
      out.note = `That value is right. In lowest terms it is ${spec.lowestTerms}.`
    }
    return out
  }
  if (spec.percent && !parsed.percent && Math.abs(parsed.value * 100 - spec.value) <= slack) {
    return { correct: false, hint: 'That is the decimal form. A percent is a number out of 100.' }
  }
  if (!spec.percent && spec.percentHint && Math.abs(typed * 100 - spec.value) <= slack) {
    return { correct: false, hint: 'Divide the percent by 100 to get the decimal.' }
  }
  for (const trap of spec.traps || []) {
    if (Math.abs(typed - trap.value) <= Math.max(tol, Math.abs(trap.value) * 1e-9)) {
      return { correct: false, hint: trap.hint }
    }
  }
  return { correct: false }
}
