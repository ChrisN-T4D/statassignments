import { softwareLessons } from '../src/data/softwareLessons.js'
import { statisticsExercises } from '../src/data/statisticsPractices.js'

const lessons = softwareLessons.filter(
  (l) => l.module === 'stats-module-6' && l.software === 'jamovi'
)

for (const l of lessons) {
  console.log('\n========', l.id, '—', l.title, '========')
  const p = l.phases || {}
  console.log('iDo type:', p.iDo?.type, '| has sections:', Boolean(p.iDo?.sections?.length))
  console.log('iDo content types:', (p.iDo?.content || []).map((c) => c.type).join(', '))
  console.log('weDo steps:', p.weDo?.steps?.length ?? 0)
  console.log('selfCheck:', p.selfCheck ? 'present' : 'MISSING')
  console.log(
    'youDo type:',
    p.youDo?.type,
    '| questions:',
    p.youDo?.questions?.length ?? 0,
    '| instructions:',
    Boolean(p.youDo?.instructions),
    '| summary:',
    Boolean(p.youDo?.summary)
  )
  const ex = statisticsExercises.filter(
    (e) => e.module === 'module-6' && e.is_active && e.software_type === 'jamovi'
  )
  console.log('statisticsPractices You-do exercises:', ex.length)
  for (const e of ex.slice(0, 12)) {
    console.log('  -', e.title || e.id)
  }
}

// Compare shape to a "good" module (M4)
const m4 = softwareLessons.find((l) => l.id === 'jamovi-descriptive-stats')
console.log('\n======== COMPARE: jamovi-descriptive-stats (M4 gold standard) ========')
console.log('iDo type:', m4.phases.iDo.type, '| sections:', m4.phases.iDo.sections?.length)
console.log('selfCheck:', Boolean(m4.phases.selfCheck))
console.log('youDo type:', m4.phases.youDo.type, '| has instructions:', Boolean(m4.phases.youDo.instructions))
