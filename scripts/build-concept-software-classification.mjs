import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { allStatisticsQuestions } from '../src/data/conceptQuestions.js'
import { CONCEPT_QUESTION_SOFTWARE_PATCHES } from '../src/data/conceptQuestionSoftware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'docs', 'CONCEPT_SOFTWARE_CLASSIFICATION.md')

const patchedIds = new Set(Object.keys(CONCEPT_QUESTION_SOFTWARE_PATCHES))

function collectText(q) {
  const bits = [q.question, q.hint, q?.feedback?.correct, q?.feedback?.incorrect]
  if (Array.isArray(q.options)) {
    for (const o of q.options) bits.push(o.text)
  }
  if (Array.isArray(q.items)) {
    for (const i of q.items) bits.push(i.text)
  }
  return bits.filter(Boolean).join(' \n ')
}

function classifyQuestion(q) {
  if (patchedIds.has(q.id)) {
    return { status: 'needs-patch', reason: 'Already patched in conceptQuestionSoftware.js.' }
  }

  const t = collectText(q)
  const lower = t.toLowerCase()

  const strongSoftwareLogic = [
    'logical operator',
    'compute function',
    'natural logarithm',
    '.omv',
    '.sav',
    '.dta',
    '.xlsx',
    'log10(',
    'ln(',
    'if(',
    'vmean(',
    'z('
  ]
  if (strongSoftwareLogic.some((token) => lower.includes(token))) {
    return { status: 'needs-patch', reason: 'Software-dependent function/operator/file-format semantics likely differ.' }
  }

  const softwareMentions = ['jamovi', 'spss', 'stata', 'excel', 'rstudio', 'r / rstudio']
  if (softwareMentions.some((token) => lower.includes(token))) {
    return { status: 'label-swap', reason: 'Software name mention present; likely solvable with text substitution.' }
  }

  return { status: 'agnostic', reason: 'No software-specific wording or syntax detected.' }
}

const classified = allStatisticsQuestions.map((q) => {
  const c = classifyQuestion(q)
  return {
    id: q.id,
    moduleId: q.moduleId,
    type: q.type,
    status: c.status,
    reason: c.reason,
    question: q.question
  }
})

const backlog = classified.filter(
  (q) => q.status === 'needs-patch' && !patchedIds.has(q.id)
)

const counts = classified.reduce(
  (acc, q) => {
    acc[q.status] += 1
    return acc
  },
  { agnostic: 0, 'label-swap': 0, 'needs-patch': 0 }
)

const lines = []
lines.push('# Concept Review Software Classification')
lines.push('')
lines.push('Classification of concept-review items for cross-software correctness.')
lines.push('')
lines.push('## Summary')
lines.push('')
lines.push(`- Total questions: **${classified.length}**`)
lines.push(`- agnostic: **${counts.agnostic}**`)
lines.push(`- label-swap: **${counts['label-swap']}**`)
lines.push(`- needs-patch: **${counts['needs-patch']}**`)
lines.push('')
lines.push('## Rules used')
lines.push('')
lines.push('- `needs-patch`: existing per-software patch OR software-specific operators/functions/file formats likely change answers.')
lines.push('- `label-swap`: software-name mention without detected operator/function dependency.')
lines.push('- `agnostic`: no software-specific language detected.')
lines.push('')

for (const status of ['needs-patch', 'label-swap', 'agnostic']) {
  lines.push(`## ${status}`)
  lines.push('')
  lines.push('| ID | Module | Type | Reason | Question |')
  lines.push('|---|---|---|---|---|')
  for (const q of classified.filter((x) => x.status === status)) {
    const question = String(q.question || '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim()
    const reason = String(q.reason || '').replace(/\|/g, '\\|')
    lines.push(`| \`${q.id}\` | \`${q.moduleId}\` | \`${q.type}\` | ${reason} | ${question} |`)
  }
  lines.push('')
}

lines.push('## Immediate patch backlog candidates')
lines.push('')
if (backlog.length === 0) {
  lines.push('- None. All current `needs-patch` items are explicitly patched.')
} else {
  lines.push('- Any `needs-patch` ID not already present in `CONCEPT_QUESTION_SOFTWARE_PATCHES` should receive explicit per-software overrides.')
  lines.push('- Prioritize modules 3 and 5 first (highest software syntax density).')
}
lines.push('')

fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8')
console.log(`Wrote ${outPath}`)
