import { softwareLessons } from '../src/data/softwareLessons.js'
import { statisticsExercises } from '../src/data/statisticsPractices.js'
import fs from 'fs'
import path from 'path'

function checkIWe(l) {
  const issues = []
  const p = l.phases || {}
  if (!p.iDo) issues.push('no iDo')
  else if (!p.iDo.sections?.length && !p.iDo.content?.length) issues.push('empty iDo')
  if (!p.weDo?.steps?.length) issues.push('empty weDo.steps')
  return issues
}

function youDoExerciseCount(l) {
  const moduleId = l.module.replace('stats-module-', 'module-')
  return statisticsExercises.filter(
    (e) =>
      e.module === moduleId &&
      e.is_active &&
      e.software_type === l.software &&
      (l.software === 'jamovi' || e.exercise_type !== 'menu_navigation')
  ).length
}

const jamoviOnly = process.argv.includes('--jamovi')

console.log(
  jamoviOnly
    ? '=== Jamovi only — I Do / We Do / You Do (Modules 3–8) ===\n'
    : '=== I Do / We Do / You Do audit (Statistics Software Practice) ===\n'
)

const modules = [
  'stats-module-3',
  'stats-module-4',
  'stats-module-5',
  'stats-module-6',
  'stats-module-7',
  'stats-module-8'
]

for (const m of modules) {
  const lessons = softwareLessons.filter((l) => {
    if (l.module !== m) return false
    return jamoviOnly ? l.software === 'jamovi' : true
  })
  if (jamoviOnly && lessons.length === 0) continue
  const incomplete = []
  for (const l of lessons) {
    const iwe = checkIWe(l)
    const youCount = youDoExerciseCount(l)
    const sc = l.phases?.selfCheck
    const scEmpty =
      !sc ||
      (sc.screenshotRecognition?.length || 0) +
        (sc.errorDiagnostic?.length || 0) +
        (sc.outputInterpretation?.length || 0) +
        (sc.questions?.length || 0) ===
        0
    const json = JSON.stringify(l.phases)
    const re = /\/(?:images|lessons)\/[^"]+\.(?:png|jpg|gif)/g
    const missingImgs = []
    for (const img of new Set(json.match(re) || [])) {
      const fp = path.join('public', img.replace(/^\//, ''))
      if (!fs.existsSync(fp)) missingImgs.push(img)
    }
    if (iwe.length || youCount === 0 || (jamoviOnly && scEmpty) || missingImgs.length) {
      incomplete.push({
        id: l.id,
        title: l.title,
        software: l.software,
        iwe,
        youDoExercises: youCount,
        selfCheckMissing: jamoviOnly && scEmpty,
        missingImgs
      })
    }
  }
  const ok = lessons.length - incomplete.length
  console.log(`${m}: ${ok}/${lessons.length} fully ready`)
  for (const row of incomplete) {
    const parts = [...row.iwe]
    if (row.youDoExercises === 0) parts.push('no You-do exercises in statisticsPractices')
    if (row.selfCheckMissing) parts.push('Self-Check missing or empty')
    if (row.missingImgs.length) parts.push('missing images: ' + row.missingImgs.join(', '))
    const label = jamoviOnly ? `${row.title} (${row.id})` : `${row.id} (${row.software})`
    console.log(`  ✗ ${label}: ${parts.join('; ')}`)
  }
}

if (jamoviOnly) process.exit(0)

const imageRefs = new Set()
for (const l of softwareLessons) {
  const json = JSON.stringify(l.phases)
  const re = /\/(?:images|lessons)\/[^"]+\.(?:png|jpg|gif)/g
  for (const m of json.match(re) || []) imageRefs.add(m)
}

const missing = []
for (const img of [...imageRefs].sort()) {
  const fp = path.join('public', img.replace(/^\//, ''))
  if (!fs.existsSync(fp)) missing.push(img)
}

console.log(`\n=== Lesson images ===`)
console.log(`${missing.length} missing of ${imageRefs.size} referenced in lesson data`)
for (const img of missing) console.log(`  ${img}`)
