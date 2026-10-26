/**
 * Question generators for Module 0 Math Practice.
 * One bank of generators per objective (M0-O1 .. M0-O7); each call returns a fresh question with new numbers,
 * so a student can keep practicing a topic until BKT says it is mastered.
 *
 * A question looks like:
 *   { id, objectiveId, kind, level, prompt, figure?, spec, steps: string[], hint?, check? }
 * `spec` is passed to gradeAnswer (grade.js). `check` is machine-readable text used by the tests to
 * re-derive the answer independently of the generator.
 */
import { barChartSvg, scatterSvg, histogramSvg } from './graphs.js'

export function makeRng(seed) {
  let a = seed >>> 0
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const int = (r, a, b) => a + Math.floor(r() * (b - a + 1))
const pick = (r, arr) => arr[Math.floor(r() * arr.length)]
const shuffle = (r, arr) => {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
const sum = (xs) => xs.reduce((a, b) => a + b, 0)
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a))
const minus = (n) => (n < 0 ? `−${-n}` : `${n}`)
const paren = (n) => (n < 0 ? `(−${-n})` : `${n}`)
const sq = '²'
const round = (x, d) => Math.round(x * Math.pow(10, d)) / Math.pow(10, d)
const clean = (x) => Number(x.toFixed(10))

function num(value, extra = {}) {
  return { type: 'number', value: clean(value), ...extra }
}

/* ------------------------------------------------------------------ O1 order of operations */
const O1 = {
  easy: [
    (r) => {
      const a = int(r, 1, 9), b = int(r, 2, 6), c = int(r, 2, 5)
      return {
        kind: 'add-mul-sq',
        prompt: `Evaluate: ${a} + ${b} × ${c}${sq}`,
        check: `${a}+${b}*${c}^2`,
        spec: num(a + b * c * c, { traps: [{ value: (a + b) * c * c, hint: 'Add last. Do the exponent and the multiplication first.' }] }),
        steps: [`Exponent first: ${c}${sq} = ${c * c}`, `Then multiply: ${b} × ${c * c} = ${b * c * c}`, `Then add: ${a} + ${b * c * c} = ${a + b * c * c}`]
      }
    },
    (r) => {
      const a = int(r, 1, 9), b = int(r, 1, 9), c = int(r, 2, 6)
      return {
        kind: 'paren-mul',
        prompt: `Evaluate: (${a} + ${b}) × ${c}`,
        check: `(${a}+${b})*${c}`,
        spec: num((a + b) * c, { traps: [{ value: a + b * c, hint: 'The brackets come first: add inside them before you multiply.' }] }),
        steps: [`Brackets first: ${a} + ${b} = ${a + b}`, `Then multiply: ${a + b} × ${c} = ${(a + b) * c}`]
      }
    },
    (r) => {
      const e = int(r, 1, 6), f = int(r, 2, 6), k = int(r, 2, 8)
      const d = k * (e + f)
      return {
        kind: 'div-paren',
        prompt: `Evaluate: ${d} ÷ (${e} + ${f})`,
        check: `${d}/(${e}+${f})`,
        spec: num(k, { traps: [{ value: d / e + f, hint: 'Brackets first: add inside them before you divide.' }] }),
        steps: [`Brackets first: ${e} + ${f} = ${e + f}`, `Then divide: ${d} ÷ ${e + f} = ${k}`]
      }
    },
    (r) => {
      const a = int(r, 10, 30), c = int(r, 2, 6), k = int(r, 2, 6)
      const b = c * k
      return {
        kind: 'sub-div',
        prompt: `Evaluate: ${a} − ${b} ÷ ${c}`,
        check: `${a}-${b}/${c}`,
        spec: num(a - k, { traps: [{ value: (a - b) / c, hint: 'Divide before you subtract.' }] }),
        steps: [`Divide first: ${b} ÷ ${c} = ${k}`, `Then subtract: ${a} − ${k} = ${a - k}`]
      }
    }
  ],
  medium: [
    (r) => {
      const a = int(r, 1, 9), b = int(r, 1, 9), c = int(r, 1, 9)
      const v = (a - b) ** 2 + c
      return {
        kind: 'paren-sq',
        prompt: `Evaluate: (${a} − ${b})${sq} + ${c}`,
        check: `(${a}-${b})^2+${c}`,
        spec: num(v, { traps: [{ value: a - b * b + c, hint: 'The brackets come first: subtract inside them, then square the result.' }] }),
        steps: [`Brackets first: ${a} − ${b} = ${minus(a - b)}`, `Square it: ${paren(a - b)}${sq} = ${(a - b) ** 2}`, `Then add: ${(a - b) ** 2} + ${c} = ${v}`]
      }
    },
    (r) => {
      const n = int(r, 2, 9)
      if (r() < 0.5) {
        return {
          kind: 'neg-sq-bare',
          prompt: `Evaluate: −${n}${sq}  (the exponent applies to ${n} only)`,
          check: `-${n}^2`,
          spec: num(-(n * n), { traps: [{ value: n * n, hint: 'Here the exponent is applied to the number first, and the minus sign is applied after.' }] }),
          steps: [`Exponent first: ${n}${sq} = ${n * n}`, `Then apply the minus sign: −${n * n}`]
        }
      }
      return {
        kind: 'neg-sq-paren',
        prompt: `Evaluate: (−${n})${sq}`,
        check: `(-${n})^2`,
        spec: num(n * n, { traps: [{ value: -(n * n), hint: 'The brackets include the minus sign, so a negative number is squared. A negative times a negative is positive.' }] }),
        steps: [`(−${n}) × (−${n}) = ${n * n}`, 'A negative times a negative is positive.']
      }
    },
    (r) => {
      const a = int(r, 2, 5), b = int(r, 1, 6), c = int(r, 2, 4), d = int(r, 1, 4), e = int(r, 1, 9)
      const v = a * (b + c * d) - e
      return {
        kind: 'nested',
        prompt: `Evaluate: ${a} × (${b} + ${c} × ${d}) − ${e}`,
        check: `${a}*(${b}+${c}*${d})-${e}`,
        spec: num(v, { traps: [{ value: a * (b + c) * d - e, hint: 'Inside the brackets, multiply before you add.' }] }),
        steps: [`Inside the brackets, multiply first: ${c} × ${d} = ${c * d}`, `Add: ${b} + ${c * d} = ${b + c * d}`, `Multiply: ${a} × ${b + c * d} = ${a * (b + c * d)}`, `Subtract: ${a * (b + c * d)} − ${e} = ${v}`]
      }
    },
    (r) => {
      const n = int(r, 2, 6)
      const parts = [int(r, 1, 9), int(r, 1, 9), int(r, 1, 9)]
      const adj = (n - (sum(parts) % n)) % n
      parts[2] += adj
      const s = sum(parts)
      return {
        kind: 'frac-bar',
        prompt: `Evaluate: (${parts[0]} + ${parts[1]} + ${parts[2]}) ÷ ${n}`,
        check: `(${parts[0]}+${parts[1]}+${parts[2]})/${n}`,
        spec: num(s / n, { traps: [{ value: parts[0] + parts[1] + parts[2] / n, hint: 'Everything in the brackets is divided by ' + n + ', so add first.' }] }),
        steps: [`Brackets first: ${parts.join(' + ')} = ${s}`, `Then divide: ${s} ÷ ${n} = ${s / n}`]
      }
    }
  ],
  hard: [
    (r) => {
      // sqrt of (sum of squared distances from a middle value) / 2, built to come out whole
      for (let tries = 0; tries < 200; tries++) {
        const d = [int(r, -4, 4), int(r, -4, 4), int(r, -4, 4)]
        const ss = sum(d.map((x) => x * x))
        if (ss === 0 || ss % 2 !== 0) continue
        const q = ss / 2
        const root = Math.sqrt(q)
        if (!Number.isInteger(root)) continue
        const m = int(r, 6, 12)
        const x = d.map((v) => m + v)
        return {
          kind: 'spread-like',
          prompt: `Evaluate: √[ ( (${x[0]} − ${m})${sq} + (${x[1]} − ${m})${sq} + (${x[2]} − ${m})${sq} ) ÷ 2 ]`,
          check: `sqrt(((${x[0]}-${m})^2+(${x[1]}-${m})^2+(${x[2]}-${m})^2)/2)`,
          spec: num(root),
          steps: [`Subtract inside each bracket: ${d.map(minus).join(', ')}`, `Square each: ${d.map((v) => v * v).join(', ')}`, `Add them: ${ss}`, `Divide by 2: ${q}`, `Square root: √${q} = ${root}`]
        }
      }
      return O1.medium[0](r)
    },
    (r) => {
      const a = int(r, 2, 6), b = int(r, 1, 5), c = int(r, 2, 4), d = int(r, 1, 3)
      const v = (a + b) ** 2 - c * d ** 2
      return {
        kind: 'two-squares',
        prompt: `Evaluate: (${a} + ${b})${sq} − ${c} × ${d}${sq}`,
        check: `(${a}+${b})^2-${c}*${d}^2`,
        spec: num(v, { traps: [{ value: a * a + b * b - c * d * d, hint: 'Add inside the brackets first, then square the total.' }] }),
        steps: [`Brackets: ${a} + ${b} = ${a + b}, squared = ${(a + b) ** 2}`, `Exponent: ${d}${sq} = ${d * d}, times ${c} = ${c * d * d}`, `Subtract: ${(a + b) ** 2} − ${c * d * d} = ${v}`]
      }
    }
  ]
}

/* ------------------------------------------------------------------ O2 solving for a variable */
const eqSteps = (lines) => lines
const O2 = {
  easy: [
    (r) => {
      const x = int(r, 1, 20), a = int(r, 1, 15)
      return { kind: 'x+a', prompt: `Solve for x: x + ${a} = ${x + a}`, check: { eq: [`x+${a}`, `${x + a}`] }, spec: num(x), steps: [`Subtract ${a} from both sides: x = ${x + a} − ${a} = ${x}`] }
    },
    (r) => {
      const x = int(r, 2, 15), a = int(r, 2, 9)
      return { kind: 'ax', prompt: `Solve for x: ${a}x = ${a * x}`, check: { eq: [`${a}*x`, `${a * x}`] }, spec: num(x), steps: [`Divide both sides by ${a}: x = ${a * x} ÷ ${a} = ${x}`] }
    },
    (r) => {
      const x = int(r, 5, 25), a = int(r, 1, 12)
      return { kind: 'x-a', prompt: `Solve for x: x − ${a} = ${x - a}`, check: { eq: [`x-${a}`, `${x - a}`] }, spec: num(x), steps: [`Add ${a} to both sides: x = ${x - a} + ${a} = ${x}`] }
    }
  ],
  medium: [
    (r) => {
      const x = int(r, 1, 12), a = int(r, 2, 9), b = int(r, 1, 15)
      const c = a * x + b
      return {
        kind: 'ax+b', prompt: `Solve for x: ${a}x + ${b} = ${c}`, check: { eq: [`${a}*x+${b}`, `${c}`] }, spec: num(x),
        steps: [`Subtract ${b} from both sides: ${a}x = ${c - b}`, `Divide both sides by ${a}: x = ${x}`]
      }
    },
    (r) => {
      const x = int(r, 2, 12), a = int(r, 2, 9), b = int(r, 1, 15)
      const c = a * x - b
      return {
        kind: 'ax-b', prompt: `Solve for x: ${a}x − ${b} = ${c}`, check: { eq: [`${a}*x-${b}`, `${c}`] }, spec: num(x),
        steps: [`Add ${b} to both sides: ${a}x = ${c + b}`, `Divide both sides by ${a}: x = ${x}`]
      }
    },
    (r) => {
      const a = int(r, 2, 6), m = int(r, 2, 9), b = int(r, 1, 10)
      const x = a * m
      const c = m + b
      return {
        kind: 'x/a+b', prompt: `Solve for x: x ÷ ${a} + ${b} = ${c}`, check: { eq: [`x/${a}+${b}`, `${c}`] }, spec: num(x),
        steps: [`Subtract ${b} from both sides: x ÷ ${a} = ${c - b}`, `Multiply both sides by ${a}: x = ${c - b} × ${a} = ${x}`]
      }
    }
  ],
  hard: [
    (r) => {
      const x = int(r, -6, 8), a = int(r, 2, 6), b = int(r, 1, 7)
      const c = a * (x + b)
      return {
        kind: 'a(x+b)', prompt: `Solve for x: ${a}(x + ${b}) = ${c}`, check: { eq: [`${a}*(x+${b})`, `${c}`] }, spec: num(x),
        steps: [`Divide both sides by ${a}: x + ${b} = ${c / a}`, `Subtract ${b}: x = ${minus(x)}`]
      }
    },
    (r) => {
      const x = int(r, 1, 10), a = int(r, 2, 5), c = int(r, 1, a - 1), b = int(r, 1, 9)
      const d = a * x + b - c * x
      return {
        kind: 'ax+b=cx+d', prompt: `Solve for x: ${a}x + ${b} = ${c}x + ${d}`, check: { eq: [`${a}*x+${b}`, `${c}*x+${d}`] }, spec: num(x),
        steps: [`Subtract ${c}x from both sides: ${a - c}x + ${b} = ${d}`, `Subtract ${b}: ${a - c}x = ${d - b}`, `Divide by ${a - c}: x = ${x}`]
      }
    },
    (r) => {
      const count = pick(r, [8, 12, 16, 20, 25]), avg = int(r, 6, 40)
      return {
        kind: 'formula-words',
        prompt: `A formula says total = count × average. The total is ${count * avg} and the count is ${count}. What is the average?`,
        check: { eq: [`${count}*x`, `${count * avg}`] }, spec: num(avg),
        steps: [`Divide both sides by the count: average = total ÷ count`, `${count * avg} ÷ ${count} = ${avg}`]
      }
    },
    (r) => {
      const m = int(r, 2, 6), b = int(r, 1, 9), x = int(r, 1, 12)
      const y = m * x + b
      return {
        kind: 'y=mx+b', prompt: `Use y = ${m}x + ${b}. If y = ${y}, what is x?`, check: { eq: [`${m}*x+${b}`, `${y}`] }, spec: num(x),
        steps: [`Put in y: ${y} = ${m}x + ${b}`, `Subtract ${b}: ${y - b} = ${m}x`, `Divide by ${m}: x = ${x}`]
      }
    }
  ]
}

/* ------------------------------------------------------------------ O3 fractions, decimals, percentages */
const O3 = {
  easy: [
    (r) => {
      const d = pick(r, [2, 4, 5, 10, 20, 25, 8])
      const n = pick(r, [1, 3, 7, 9, 2, 5].filter((v) => v < d))
      return {
        kind: 'frac-to-dec', prompt: `Write ${n}/${d} as a decimal.`, check: `${n}/${d}`,
        spec: num(n / d, { decimals: 3 }),
        steps: [`Divide the top by the bottom: ${n} ÷ ${d} = ${n / d}`]
      }
    },
    (r) => {
      const p = int(r, 1, 19) * 5
      return {
        kind: 'dec-to-pct', prompt: `Write ${p / 100} as a percent.`, check: `${p / 100}*100`,
        spec: num(p, { percent: true }),
        steps: ['Multiply by 100 (move the point two places right).', `${p / 100} × 100 = ${p}%`]
      }
    },
    (r) => {
      const p = int(r, 1, 19) * 5
      return {
        kind: 'pct-to-dec', prompt: `Write ${p}% as a decimal.`, check: `${p}/100`,
        spec: num(p / 100, { percentHint: true }),
        steps: ['Divide by 100 (move the point two places left).', `${p} ÷ 100 = ${p / 100}`]
      }
    }
  ],
  medium: [
    (r) => {
      const p = pick(r, [10, 20, 25, 40, 50, 5, 15, 30, 60, 75]), base = pick(r, [40, 60, 80, 120, 200, 150, 300, 80])
      const v = (p / 100) * base
      return {
        kind: 'pct-of', prompt: `What is ${p}% of ${base}?`, check: `${p}/100*${base}`,
        spec: num(v, { decimals: 2 }),
        steps: [`Write ${p}% as a decimal: ${p / 100}`, `Multiply: ${p / 100} × ${base} = ${v}`]
      }
    },
    (r) => {
      const b = pick(r, [20, 25, 40, 50, 80, 200]), a = int(r, 1, b - 1)
      const p = (a / b) * 100
      return {
        kind: 'what-pct', prompt: `${a} out of ${b} is what percent? (Round to 2 decimals if needed.)`, check: `${a}/${b}*100`,
        spec: num(p, { decimals: 2, percent: true }),
        steps: [`Divide: ${a} ÷ ${b} = ${round(a / b, 4)}`, `Multiply by 100: ${round(p, 2)}%`]
      }
    },
    (r) => {
      const cand = pick(r, [0.6, 0.35, 0.125, 0.8, 0.45, 0.04, 0.875, 0.15, 0.75, 0.2])
      const den0 = cand.toString().split('.')[1].length
      const scale = Math.pow(10, den0)
      const top = Math.round(cand * scale)
      const g = gcd(top, scale)
      const lt = `${top / g}/${scale / g}`
      return {
        kind: 'dec-to-frac', prompt: `Write ${cand} as a fraction in lowest terms.`, check: `${top}/${scale}`,
        spec: num(cand, { lowestTerms: lt, decimals: 6 }),
        steps: [`${cand} is ${top} out of ${scale}: ${top}/${scale}`, `Divide top and bottom by ${g}: ${lt}`]
      }
    }
  ],
  hard: [
    (r) => {
      const v = round(int(r, 1000, 9999) / 1000 + int(r, 0, 9), 3)
      const rounded = round(v, 2)
      return {
        kind: 'round-2', prompt: `Round ${v} to 2 decimal places.`, check: `${rounded}`,
        spec: num(rounded, { tol: 0.0001 }),
        steps: [`Look at the third decimal place of ${v}.`, `Round ${v} to ${rounded}.`]
      }
    },
    (r) => {
      const [b1, d1] = pick(r, [[1, 4], [1, 2], [3, 4], [1, 5], [2, 5]]), [b2, d2] = pick(r, [[1, 5], [1, 10], [3, 10], [1, 4], [1, 20]])
      const v = b1 / d1 + b2 / d2
      return {
        kind: 'frac-add', prompt: `Add ${b1}/${d1} + ${b2}/${d2}. Give a decimal or a fraction.`, check: `${b1}/${d1}+${b2}/${d2}`,
        spec: num(v, { decimals: 4 }),
        steps: [`As decimals: ${b1 / d1} + ${b2 / d2} = ${round(v, 4)}`]
      }
    },
    (r) => {
      const price = pick(r, [40, 60, 80, 120, 150]), off = pick(r, [10, 20, 25, 30, 15])
      const v = price * (1 - off / 100)
      return {
        kind: 'pct-off', prompt: `A $${price} item is ${off}% off. What is the sale price in dollars?`, check: `${price}*(1-${off}/100)`,
        spec: num(v, { decimals: 2 }),
        steps: [`${off}% of ${price} = ${price * off / 100}`, `Subtract: ${price} − ${price * off / 100} = ${v}`]
      }
    }
  ]
}

/* ------------------------------------------------------------------ O4 exponents and square roots */
const O4 = {
  easy: [
    (r) => {
      const n = int(r, 2, 12)
      return { kind: 'square', prompt: `Evaluate: ${n}${sq}`, check: `${n}^2`, spec: num(n * n), steps: [`${n} × ${n} = ${n * n}`] }
    },
    (r) => {
      const n = int(r, 2, 15)
      return { kind: 'sqrt', prompt: `Evaluate: √${n * n}`, check: `sqrt(${n * n})`, spec: num(n), steps: [`${n} × ${n} = ${n * n}, so √${n * n} = ${n}`] }
    },
    (r) => {
      const n = int(r, 2, 4)
      return { kind: 'cube', prompt: `Evaluate: ${n}³`, check: `${n}^3`, spec: num(n ** 3), steps: [`${n} × ${n} × ${n} = ${n ** 3}`] }
    }
  ],
  medium: [
    (r) => {
      const trip = pick(r, [[9, 16], [16, 9], [36, 64], [25, 144], [1, 24], [10, 15], [7, 18], [5, 20]])
      const t = trip[0] + trip[1]
      const root = Math.sqrt(t)
      if (!Number.isInteger(root)) return O4.medium[1](r)
      return {
        kind: 'sqrt-sum', prompt: `Evaluate: √(${trip[0]} + ${trip[1]})`, check: `sqrt(${trip[0]}+${trip[1]})`,
        spec: num(root, { traps: [{ value: Math.sqrt(trip[0]) + Math.sqrt(trip[1]), hint: 'The root applies to the whole sum. Add first, then take the square root.' }] }),
        steps: [`Add under the root: ${trip[0]} + ${trip[1]} = ${t}`, `√${t} = ${root}`]
      }
    },
    (r) => {
      const d = pick(r, [2, 3, 4, 5, 6, 7, 8, 9]), tenth = d / 10
      return { kind: 'dec-sq', prompt: `Evaluate: ${tenth}${sq}`, check: `${tenth}^2`, spec: num(tenth * tenth, { decimals: 4 }), steps: [`${tenth} × ${tenth} = ${round(tenth * tenth, 4)}`, 'Squaring a number between 0 and 1 makes it smaller.'] }
    },
    (r) => {
      const k = int(r, -3, 3)
      return { kind: 'ten-pow', prompt: `Evaluate: 10^${k}  (write it as a decimal or whole number)`, check: `10^${k}`, spec: num(Math.pow(10, k), { decimals: 6 }), steps: [k >= 0 ? `10 multiplied by itself ${k} times = ${Math.pow(10, k)}` : `A negative exponent means divide: 1 ÷ 10^${-k} = ${Math.pow(10, k)}`] }
    },
    (r) => {
      const a = int(r, 2, 6), b = int(r, 2, 6)
      return {
        kind: 'sq-sum', prompt: `Evaluate: (${a} + ${b})${sq}`, check: `(${a}+${b})^2`,
        spec: num((a + b) ** 2, { traps: [{ value: a * a + b * b, hint: 'Square the whole sum: add inside the brackets first, then square.' }] }),
        steps: [`Brackets first: ${a} + ${b} = ${a + b}`, `Square it: ${(a + b) ** 2}`]
      }
    }
  ],
  hard: [
    (r) => {
      const n = pick(r, [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 17, 20, 30, 50])
      return { kind: 'sqrt-round', prompt: `Evaluate √${n} to 2 decimal places.`, check: `${round(Math.sqrt(n), 2)}`, spec: num(Math.sqrt(n), { decimals: 2 }), steps: [`√${n} is between ${Math.floor(Math.sqrt(n))} and ${Math.ceil(Math.sqrt(n))}.`, `Using a calculator, √${n} ≈ ${round(Math.sqrt(n), 2)}`] }
    },
    (r) => {
      const trip = pick(r, [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]])
      return {
        kind: 'sqrt-a2b2', prompt: `Evaluate: √(${trip[0]}${sq} + ${trip[1]}${sq})`, check: `sqrt(${trip[0]}^2+${trip[1]}^2)`,
        spec: num(trip[2], { traps: [{ value: trip[0] + trip[1], hint: 'Square each number first, add, and only then take the root.' }] }),
        steps: [`Squares: ${trip[0] ** 2} and ${trip[1] ** 2}`, `Add: ${trip[0] ** 2 + trip[1] ** 2}`, `Square root: ${trip[2]}`]
      }
    },
    (r) => {
      const m = pick(r, [1.2, 3.5, 4.8, 2.5, 6.1, 7.4]), e = int(r, 2, 5)
      return {
        kind: 'sci-small', prompt: `Software prints ${m}E-${e}. Write that number as a decimal.`, check: `${m}*10^-${e}`,
        spec: num(m * Math.pow(10, -e), { tol: Math.pow(10, -e - 3) }),
        steps: [`E-${e} means × 10^−${e}, which moves the decimal point ${e} places left.`, `${m}E-${e} = ${(m * Math.pow(10, -e)).toFixed(e + 1)}`]
      }
    },
    (r) => {
      const [a, b] = pick(r, [[1, 2], [3, 4], [2, 5], [3, 5], [1, 4]])
      return { kind: 'frac-sq', prompt: `Evaluate (${a}/${b})${sq}. Give a decimal or fraction.`, check: `(${a}/${b})^2`, spec: num((a / b) ** 2, { decimals: 4 }), steps: [`Square top and bottom: ${a * a}/${b * b} = ${round((a / b) ** 2, 4)}`] }
    }
  ]
}

/* ------------------------------------------------------------------ O5 summation notation */
function scoreList(r, n, lo = 1, hi = 9) {
  return Array.from({ length: n }, () => int(r, lo, hi))
}
const subList = (xs) => xs.map((v, i) => `x${'₁₂₃₄₅₆₇₈₉'[i]} = ${v}`).join(', ')
const O5 = {
  easy: [
    (r) => {
      const xs = scoreList(r, int(r, 4, 5))
      return { kind: 'sum', prompt: `The scores are ${xs.join(', ')}. Find Σx.`, check: xs.join('+'), spec: num(sum(xs)), steps: [`Add every score: ${xs.join(' + ')} = ${sum(xs)}`] }
    },
    (r) => {
      const xs = scoreList(r, 4, 1, 6)
      return {
        kind: 'sum-sq', prompt: `The scores are ${xs.join(', ')}. Find Σx${sq} (square each score, then add).`, check: xs.map((v) => `${v}^2`).join('+'),
        spec: num(sum(xs.map((v) => v * v)), { traps: [{ value: sum(xs) ** 2, hint: 'Σx² means square each score first, then add. You added first and then squared.' }] }),
        steps: [`Square each: ${xs.map((v) => v * v).join(', ')}`, `Add: ${sum(xs.map((v) => v * v))}`]
      }
    }
  ],
  medium: [
    (r) => {
      const xs = scoreList(r, 4, 1, 6)
      return {
        kind: 'sum-then-sq', prompt: `The scores are ${xs.join(', ')}. Find (Σx)${sq} (add first, then square the total).`, check: `(${xs.join('+')})^2`,
        spec: num(sum(xs) ** 2, { traps: [{ value: sum(xs.map((v) => v * v)), hint: '(Σx)² means add first and then square the total. You squared each score first.' }] }),
        steps: [`Add: ${sum(xs)}`, `Square the total: ${sum(xs)}${sq} = ${sum(xs) ** 2}`]
      }
    },
    (r) => {
      const xs = scoreList(r, 4, 2, 9)
      const c = int(r, 2, 5)
      const terms = xs.map((v) => (v - c) ** 2)
      return {
        kind: 'sum-calc', prompt: `The scores are ${xs.join(', ')}. Find Σ(x − ${c})${sq}.`, check: xs.map((v) => `(${v}-${c})^2`).join('+'),
        spec: num(sum(terms)),
        steps: [`Subtract ${c} from each: ${xs.map((v) => minus(v - c)).join(', ')}`, `Square each: ${terms.join(', ')}`, `Add: ${sum(terms)}`]
      }
    },
    (r) => {
      const xs = scoreList(r, 5, 1, 9)
      const from = int(r, 1, 2), to = int(r, from + 1, 4)
      return {
        kind: 'sub-range', prompt: `${subList(xs)}. Find the sum of xᵢ for i = ${from} to ${to}.`, check: xs.slice(from - 1, to).join('+'),
        spec: num(sum(xs.slice(from - 1, to))),
        steps: [`Use x${'₁₂₃₄₅₆₇₈₉'[from - 1]} through x${'₁₂₃₄₅₆₇₈₉'[to - 1]}: ${xs.slice(from - 1, to).join(' + ')} = ${sum(xs.slice(from - 1, to))}`]
      }
    }
  ],
  hard: [
    (r) => {
      const xs = scoreList(r, 4, 1, 7)
      const v = sum(xs.map((x) => 2 * x + 1))
      return { kind: 'sum-2x+1', prompt: `The scores are ${xs.join(', ')}. Find Σ(2x + 1).`, check: xs.map((x) => `(2*${x}+1)`).join('+'), spec: num(v), steps: [`Do 2x + 1 for each score: ${xs.map((x) => 2 * x + 1).join(', ')}`, `Add: ${v}`] }
    },
    (r) => {
      const xs = scoreList(r, 4, 1, 6)
      const a = sum(xs.map((v) => v * v)), b = sum(xs) ** 2
      return {
        kind: 'sq-diff', prompt: `The scores are ${xs.join(', ')}. Find Σx${sq} − (Σx)${sq}.`, check: `${xs.map((v) => `${v}^2`).join('+')}-(${xs.join('+')})^2`,
        spec: num(a - b), steps: [`Σx${sq} = ${a}`, `(Σx)${sq} = ${sum(xs)}${sq} = ${b}`, `Subtract: ${a} − ${b} = ${a - b}`]
      }
    },
    (r) => {
      const xs = scoreList(r, 5, 2, 9)
      const c = int(r, 3, 6)
      const t = xs.map((v) => v - c)
      return { kind: 'sum-dev', prompt: `The scores are ${xs.join(', ')}. Find Σ(x − ${c}).`, check: xs.map((v) => `(${v}-${c})`).join('+'), spec: num(sum(t)), steps: [`Subtract ${c} from each: ${t.map(minus).join(', ')}`, `Add (keep the signs): ${minus(sum(t))}`] }
    }
  ]
}

/* ------------------------------------------------------------------ O6 reading graphs */
const MAJORS = ['Psychology', 'Biology', 'Business', 'Nursing', 'Education', 'Art']
function barData(r) {
  const labels = shuffle(r, MAJORS).slice(0, 4)
  const vals = labels.map(() => int(r, 2, 11) * 5)
  const set = new Set(vals)
  if (set.size < vals.length) return barData(r)
  return { labels, vals }
}
const O6 = {
  easy: [
    (r) => {
      const { labels, vals } = barData(r)
      const i = int(r, 0, 3)
      return {
        kind: 'bar-value', prompt: `The bar chart shows how many students are in each major. How many students are in ${labels[i]}?`,
        figure: barChartSvg({ labels, values: vals, yLabel: 'Students', max: 60, step: 10, title: 'Students by major' }),
        check: `${vals[i]}`, spec: num(vals[i]), steps: [`Find the ${labels[i]} bar and read across to the vertical axis: ${vals[i]}`]
      }
    },
    (r) => {
      const { labels, vals } = barData(r)
      const idx = vals.indexOf(Math.max(...vals))
      const opts = [...labels]
      return {
        kind: 'bar-tallest', prompt: 'Which major has the most students?',
        figure: barChartSvg({ labels, values: vals, yLabel: 'Students', max: 60, step: 10, title: 'Students by major' }),
        check: `${idx}`, spec: { type: 'choice', options: opts, correctIndex: idx }, steps: [`The tallest bar is ${labels[idx]} (${vals[idx]} students).`]
      }
    },
    (r) => {
      const pts = [{ l: 'A', x: int(r, 1, 3), y: int(r, 1, 3) }, { l: 'B', x: int(r, 4, 6), y: int(r, 4, 6) }, { l: 'C', x: int(r, 7, 9), y: int(r, 1, 4) }, { l: 'D', x: int(r, 2, 8), y: int(r, 7, 9) }]
      const q = pick(r, ['rightmost', 'highest'])
      const best = q === 'rightmost' ? pts.reduce((a, b) => (b.x > a.x ? b : a)) : pts.reduce((a, b) => (b.y > a.y ? b : a))
      return {
        kind: 'scatter-which', prompt: q === 'rightmost' ? 'Which point has the largest value on the horizontal (x) axis?' : 'Which point has the largest value on the vertical (y) axis?',
        figure: scatterSvg({ points: pts, xLabel: 'Hours studied', yLabel: 'Exam score (tens)', max: 10 }),
        check: best.l, spec: { type: 'choice', options: pts.map((p) => `Point ${p.l}`), correctIndex: pts.findIndex((p) => p === best) },
        steps: [q === 'rightmost' ? 'Larger x means further to the right.' : 'Larger y means higher up.', `That is point ${best.l}.`]
      }
    }
  ],
  medium: [
    (r) => {
      const { labels, vals } = barData(r)
      const [i, j] = [0, 1].map((k) => k)
      const d = Math.abs(vals[i] - vals[j])
      return {
        kind: 'bar-diff', prompt: `How many more students are in the larger of ${labels[i]} and ${labels[j]} than in the smaller?`,
        figure: barChartSvg({ labels, values: vals, yLabel: 'Students', max: 60, step: 10, title: 'Students by major' }),
        check: `${d}`, spec: num(d), steps: [`${labels[i]}: ${vals[i]}, ${labels[j]}: ${vals[j]}`, `Subtract: ${Math.max(vals[i], vals[j])} − ${Math.min(vals[i], vals[j])} = ${d}`]
      }
    },
    (r) => {
      const pts = shuffle(r, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4).map((x, k) => ({ l: 'ABCD'[k], x, y: int(r, 1, 9) }))
      const p = pick(r, pts), axis = pick(r, ['x', 'y'])
      return {
        kind: 'scatter-coord', prompt: `What is the ${axis}-value of point ${p.l}?`,
        figure: scatterSvg({ points: pts, xLabel: 'x', yLabel: 'y', max: 10 }),
        check: `${p[axis]}`, spec: num(p[axis]), steps: axis === 'x' ? [`Go straight down from point ${p.l} to the x-axis: ${p.x}`] : [`Go straight across from point ${p.l} to the y-axis: ${p.y}`]
      }
    },
    (r) => {
      const { labels, vals } = barData(r)
      const start = pick(r, [40, 50, 100])
      const shifted = vals.map((v) => start + v / 5)
      return {
        kind: 'axis-start', prompt: 'Look at where the vertical axis begins. What number is at the bottom of the vertical axis?',
        figure: barChartSvg({ labels, values: shifted, yLabel: 'Score', min: start, max: start + 12, step: 2, title: 'Mean score by group' }),
        check: `${start}`, spec: num(start), steps: [`The lowest label on the vertical axis is ${start}.`, 'An axis that does not start at 0 makes small differences look big.']
      }
    }
  ],
  hard: [
    (r) => {
      const edges = [0, 10, 20, 30, 40, 50]
      const counts = edges.slice(0, -1).map(() => int(r, 1, 9))
      const from = pick(r, [1, 2, 3])
      const total = sum(counts.slice(from))
      return {
        kind: 'hist-count', prompt: `The histogram shows exam scores. How many scores are ${edges[from]} or higher?`,
        figure: histogramSvg({ edges, counts, title: 'Exam scores', xLabel: 'Score', yLabel: 'Students', max: 10 }),
        check: `${total}`, spec: num(total), steps: [`Add the bars from ${edges[from]} upward: ${counts.slice(from).join(' + ')} = ${total}`]
      }
    },
    (r) => {
      const { labels, vals } = barData(r)
      const total = sum(vals)
      return {
        kind: 'bar-total', prompt: 'How many students are shown in all four bars together?',
        figure: barChartSvg({ labels, values: vals, yLabel: 'Students', max: 60, step: 10, title: 'Students by major' }),
        check: vals.join('+'), spec: num(total), steps: [`Read each bar: ${vals.join(', ')}`, `Add: ${total}`]
      }
    }
  ]
}

/* ------------------------------------------------------------------ O7 algebra symbols */
const SYMBOL_BANK = [
  { q: 'The symbol Σ comes from algebra. What does it tell you to do?', right: 'Add up everything that follows', wrong: ['Square the numbers that follow', 'Find the square root', 'Multiply the numbers that follow'], why: 'Σ (capital sigma) is the summation sign.' },
  { q: 'What does x² tell you to do?', right: 'Multiply x by itself', wrong: ['Multiply x by 2', 'Add 2 to x', 'Divide x by 2'], why: 'A small raised 2 is an exponent: x² = x × x.' },
  { q: 'What does √ tell you to find?', right: 'The number that, multiplied by itself, gives the number under the sign', wrong: ['Half of the number under the sign', 'The number squared', 'The absolute value'], why: 'The radical sign asks for the square root.' },
  { q: 'What does |x| (absolute value) do to a negative number?', right: 'Drops the minus sign', wrong: ['Squares it', 'Doubles it', 'Takes its square root'], why: '|−4| = 4.' },
  { q: 'What does 10 ± 3 describe?', right: 'The range from 7 to 13', wrong: ['The number 13 only', 'The number 7 only', 'The product of 10 and 3'], why: '± means plus-or-minus: 10 − 3 and 10 + 3.' },
  { q: 'In the symbol x₄, what does the small subscript 4 mean?', right: 'The fourth item in the list', wrong: ['x to the fourth power', 'x multiplied by 4', 'x plus 4'], why: 'A subscript is only a label, not a power.' },
  { q: 'What does the symbol ≥ mean?', right: 'Greater than or equal to', wrong: ['Greater than', 'Less than or equal to', 'Not equal to'], why: '≥ includes the case where the two sides are equal.' },
  { q: 'What does the symbol ≠ mean?', right: 'Is not equal to', wrong: ['Is about equal to', 'Is less than', 'Is greater than'], why: '≠ means the two sides are different.' },
  { q: 'What does ≈ mean?', right: 'Is approximately equal to', wrong: ['Is exactly equal to', 'Is not equal to', 'Is much greater than'], why: '≈ is used after rounding, as in √10 ≈ 3.16.' }
]
const O7 = {
  easy: [
    (r) => {
      const item = pick(r, SYMBOL_BANK)
      const opts = shuffle(r, [item.right, ...item.wrong])
      return { kind: 'symbol-meaning', prompt: item.q, check: item.right, spec: { type: 'choice', options: opts, correctIndex: opts.indexOf(item.right) }, steps: [item.why] }
    },
    (r) => {
      const xs = scoreList(r, 5, 1, 9), i = int(r, 1, 5)
      return {
        kind: 'subscript-lookup', prompt: `${subList(xs)}. What is x${'₁₂₃₄₅₆₇₈₉'[i - 1]}?`, check: `${xs[i - 1]}`, spec: num(xs[i - 1]),
        steps: [`The subscript ${i} means the ${i === 1 ? 'first' : i === 2 ? 'second' : i === 3 ? 'third' : i === 4 ? 'fourth' : 'fifth'} item: ${xs[i - 1]}.`]
      }
    }
  ],
  medium: [
    (r) => {
      const a = int(r, 2, 9), b = int(r, 2, 5)
      return {
        kind: 'abs-plus-sq', prompt: `Evaluate: |−${a}| + (−${b})${sq}`, check: `${a}+(-${b})^2`, spec: num(a + b * b),
        steps: [`|−${a}| = ${a}`, `(−${b})${sq} = ${b * b}`, `Add: ${a + b * b}`]
      }
    },
    (r) => {
      const c = int(r, 8, 30), w = int(r, 2, 6)
      return { kind: 'pm-low', prompt: `A result is reported as ${c} ± ${w}. What is the smaller end of the range?`, check: `${c}-${w}`, spec: num(c - w), steps: [`Subtract: ${c} − ${w} = ${c - w}`] }
    },
    (r) => {
      const a = int(r, 2, 9)
      const s = pick(r, ['≥', '≤', '≠'])
      const b = s === '≠' ? pick(r, [a, a + 1]) : pick(r, [a, a + 1, a - 1])
      const truth = s === '≥' ? a >= b : s === '≤' ? a <= b : a !== b
      return { kind: 'ineq-truth', prompt: `True or false: ${a} ${s} ${b}`, check: truth ? 'true' : 'false', spec: { type: 'choice', options: ['True', 'False'], correctIndex: truth ? 0 : 1 }, steps: [`${a} ${s} ${b} is ${truth ? 'true' : 'false'}.`] }
    }
  ],
  hard: [
    (r) => {
      const xs = scoreList(r, 4, 1, 7), i = int(r, 1, 4), j = int(r, 1, 4)
      const v = xs[i - 1] ** 2 + xs[j - 1]
      const sub = (n) => 'x' + '₁₂₃₄₅₆₇₈₉'[n - 1]
      return {
        kind: 'subscript-calc', prompt: `${subList(xs)}. Evaluate ${sub(i)}${sq} + ${sub(j)}.`, check: `${xs[i - 1]}^2+${xs[j - 1]}`, spec: num(v),
        steps: [`${sub(i)} = ${xs[i - 1]}, so ${sub(i)}${sq} = ${xs[i - 1] ** 2}`, `${sub(j)} = ${xs[j - 1]}`, `Add: ${v}`]
      }
    },
    (r) => {
      const a = int(r, 2, 7), b = int(r, 1, 4)
      const v = Math.abs(b - a) + 2 * 3
      return { kind: 'abs-expr', prompt: `Evaluate: |${b} − ${a}| + 2 × 3`, check: `${Math.abs(b - a)}+2*3`, spec: num(v), steps: [`Inside the bars: ${b} − ${a} = ${minus(b - a)}`, `Absolute value: ${Math.abs(b - a)}`, `Multiply: 2 × 3 = 6`, `Add: ${v}`] }
    }
  ]
}

export const BANKS = { 'M0-O1': O1, 'M0-O2': O2, 'M0-O3': O3, 'M0-O4': O4, 'M0-O5': O5, 'M0-O6': O6, 'M0-O7': O7 }
export const OBJECTIVE_IDS = Object.keys(BANKS)
export const LEVELS = ['easy', 'medium', 'hard']

/** Level to serve for a given mastery probability. */
export function levelForMastery(pL) {
  if (pL < 0.4) return 'easy'
  if (pL < 0.75) return 'medium'
  return 'hard'
}

/**
 * @param {string} objectiveId e.g. 'M0-O3'
 * @param {{ seed?: number, level?: string, avoidKind?: string }} [opts]
 */
export function generateQuestion(objectiveId, { seed, level = 'easy', avoidKind } = {}) {
  const bank = BANKS[objectiveId]
  if (!bank) throw new Error(`No math generators for ${objectiveId}`)
  const useSeed = seed ?? Math.floor(Math.random() * 2 ** 31)
  const r = makeRng(useSeed)
  const fns = bank[level] || bank.easy
  let q = null
  for (let i = 0; i < 6 && (!q || q.kind === avoidKind); i++) q = pick(r, fns)(r)
  // A common-slip trap that happens to equal the right answer (for example when a factor is 1) is not a slip.
  if (q.spec.traps) q.spec.traps = q.spec.traps.filter((t) => Math.abs(t.value - q.spec.value) > 1e-9)
  return { id: `m0-${objectiveId}-${q.kind}-${useSeed}`, objectiveId, level, seed: useSeed, ...q }
}

/**
 * A Mastery Check: `count` questions on one topic with new numbers, different kinds where the bank allows,
 * mostly at the harder levels. Seeds are fresh each time so no two checks match.
 */
export function generateCheck(objectiveId, { count = 5, seed } = {}) {
  const base = seed ?? Math.floor(Math.random() * 2 ** 30)
  const levels = ['medium', 'hard', 'medium', 'hard', 'hard', 'medium']
  const out = []
  const kinds = new Set()
  for (let i = 0; out.length < count && i < count * 12; i++) {
    const level = levels[out.length % levels.length]
    const q = generateQuestion(objectiveId, { seed: base + i * 7919, level })
    if (kinds.has(q.kind) && i < count * 6) continue
    kinds.add(q.kind)
    out.push(q)
  }
  return out
}
