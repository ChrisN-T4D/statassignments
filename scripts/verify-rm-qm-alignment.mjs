/**
 * Static check for QM 7th-Ed SRS 2.2/2.3 on Research Methods + Experimental modules:
 * every module has learning objectives, and each objective starts with an observable verb
 * (not a topic noun phrase). Run: node scripts/verify-rm-qm-alignment.mjs
 */
import { modulesByClass } from '../src/data/modules.js'
import { groupModulesByCanvasPart } from '../src/data/researchMethodsTextbook.js'

const NON_MEASURABLE_STARTS = /^(understand|know|learn|appreciate|be aware|become familiar|why |how |what |who |when |laws, |humans |heuristics|generating|literature|evaluating evidence|from question|measurement as|scale types|finding measures|reliability:|validity and|correlational logic|quasi-experimental logic|choosing analyses|within-subjects logic|order and|fatigue|interpreting within|single-subject design logic|baseline|integrating|preparing)/i

let failures = 0
for (const classId of ['research-methods', 'experimental']) {
  const modules = modulesByClass[classId]
  for (const mod of modules) {
    const objs = mod.learningObjectives ?? []
    if (!objs.length) {
      console.error(`FAIL ${classId}/${mod.id}: no learning objectives`)
      failures++
      continue
    }
    for (const o of objs) {
      if (NON_MEASURABLE_STARTS.test(o.trim())) {
        console.error(`FAIL ${classId}/${mod.id}: objective is topic-style, not measurable: "${o}"`)
        failures++
      }
    }
  }
  const grouped = groupModulesByCanvasPart(modules, classId)
  const placed = new Set(grouped.flatMap((p) => p.modules.map((m) => m.id)))
  // Ch. 12-13 are read via the "Data by path" section; the analyze-data tool is opened from there.
  const placedElsewhere = new Set(['rm-module-12', 'rm-module-13', 'rm-module-analyze-data'])
  for (const mod of modules) {
    if (!placed.has(mod.id) && !placedElsewhere.has(mod.id)) {
      console.error(`FAIL ${classId}/${mod.id}: module not placed in any course part`)
      failures++
    }
  }
  console.log(`${classId}: ${modules.length} modules; parts = ${grouped.map((p) => p.id).join(', ')}`)
}

if (failures) {
  console.error(`${failures} problem(s)`)
  process.exit(1)
}
console.log('OK: RM/Experimental modules have measurable objectives and are placed in parts.')
