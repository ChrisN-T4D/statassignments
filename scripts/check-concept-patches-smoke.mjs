import { allStatisticsQuestions } from '../src/data/conceptQuestions.js'
import { prepareConceptQuestionForSoftware } from '../src/data/conceptQuestionSoftware.js'

function getById(id) {
  const q = allStatisticsQuestions.find((x) => x.id === id)
  if (!q) throw new Error(`Missing question id: ${id}`)
  return q
}

const checks = [
  {
    id: 'stats-m3-q5',
    software: 'spss',
    expectCorrect: 'd',
    expectSnippet: '.sav'
  },
  {
    id: 'stats-m5-q19',
    software: 'excel',
    expectCorrect: 'a',
    expectSnippet: 'Excel formulas'
  },
  {
    id: 'stats-m5-q25',
    software: 'r',
    expectCorrect: 'b',
    expectSnippet: 'R'
  },
  {
    id: 'stats-m5-q27',
    software: 'stata',
    expectCorrect: false,
    expectSnippet: 'Stata'
  }
]

let failures = 0
for (const c of checks) {
  const q = prepareConceptQuestionForSoftware(getById(c.id), c.software)
  if (q.correct !== c.expectCorrect) {
    console.error(`FAIL ${c.id} ${c.software}: expected correct=${c.expectCorrect} got ${q.correct}`)
    failures += 1
  }
  const textBlob = [
    q.question,
    ...(Array.isArray(q.options) ? q.options.map((o) => o.text) : [])
  ].join(' ')
  if (!String(textBlob).includes(c.expectSnippet)) {
    console.error(`FAIL ${c.id} ${c.software}: content missing snippet "${c.expectSnippet}"`)
    failures += 1
  }
}

if (failures > 0) {
  console.error(`Smoke check failures: ${failures}`)
  process.exit(1)
}

console.log('Concept patch smoke checks passed.')
