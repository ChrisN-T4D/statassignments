/**
 * Verify every Research Methods chapter module has a concept review question bank.
 * Exit 1 if any module is missing or below MIN_QUESTIONS.
 */
import { PRESSBOOKS_CHAPTERS } from '../src/data/researchMethodsTextbook.js'
import { getQuestionsByModule } from '../src/data/conceptQuestions.js'

const MIN_QUESTIONS = 10
const RM_MODULES = [
  ...PRESSBOOKS_CHAPTERS.map((ch) => ({
    moduleId: ch.moduleId,
    label: `Ch. ${ch.number}: ${ch.shortTitle}`
  })),
  { moduleId: 'rm-module-lab', label: 'Lab: Random assignment & sampling' }
]

let failed = false

console.log('Research Methods concept review coverage\n')
for (const { moduleId, label } of RM_MODULES) {
  const count = getQuestionsByModule(moduleId).length
  const ok = count >= MIN_QUESTIONS
  const mark = ok ? '✓' : '✗'
  console.log(`  ${mark} ${moduleId.padEnd(22)} ${String(count).padStart(3)} questions  ${label}`)
  if (!ok) failed = true
}

if (failed) {
  console.error(`\nAt least one module has fewer than ${MIN_QUESTIONS} questions.`)
  process.exit(1)
}

console.log(`\nAll ${RM_MODULES.length} modules meet the minimum (${MIN_QUESTIONS}+ questions each).`)
