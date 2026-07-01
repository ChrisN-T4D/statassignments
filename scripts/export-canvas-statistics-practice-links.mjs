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

const md = lines.join('\n') + '\n'
writeFileSync(outPath, md, 'utf8')
console.log(md)
console.log(`Wrote ${outPath}`)
