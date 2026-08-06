#!/usr/bin/env node
/**
 * Print Canvas-ready URLs for Statistics Concept Review + Software Practice.
 * Also writes scripts/canvas-statistics-practice-links.md
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  STATISTICS_MODULE_PRACTICE_LINKS,
  STATISTICS_BENCHMARK_LINKS,
  METHODS_MARKET_BASE
} from '../src/data/statisticsCanvasLinks.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outPath = join(root, 'scripts', 'canvas-statistics-practice-links.md')

const lines = [
  '# Canvas PSYC 4213 Statistics — Methods Market practice assignments',
  '',
  `Generated ${new Date().toISOString().slice(0, 10)} from \`statisticsCanvasLinks.js\`.`,
  '',
  `**Assignment help:** ${METHODS_MARKET_BASE}/class/statistics/assignment-help`,
  '',
  '| Module | Concept Review | Software Practice |',
  '|--------|----------------|-------------------|'
]

for (const row of STATISTICS_MODULE_PRACTICE_LINKS) {
  lines.push(
    `| ${row.moduleNumber} | ${row.conceptReview} | ${row.softwarePractice ?? '—'} |`
  )
}

lines.push('')
lines.push('## Benchmarks (Modules 1–3, 4–5, 6–8)')
lines.push('')
lines.push('| Benchmark | Covers | Practice URL | Assignment help |')
lines.push('|-----------|--------|--------------|-----------------|')
for (const b of STATISTICS_BENCHMARK_LINKS) {
  lines.push(
    `| ${b.title} | ${b.modulesLabel} (${b.questionCount} Q) | ${b.practiceUrl} | ${b.helpUrl} |`
  )
}
lines.push('')
lines.push('**Canvas setup:** see `scripts/canvas-statistics-benchmark-1.md` for Benchmark 1 step-by-step.')

const md = lines.join('\n') + '\n'
writeFileSync(outPath, md, 'utf8')
console.log(md)
console.log(`Wrote ${outPath}`)
