#!/usr/bin/env node
/**
 * Print Canvas-ready URLs for Research Methods Concept Review by chapter.
 * Writes scripts/canvas-research-methods-practice-links.md
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  RESEARCH_METHODS_CHAPTER_PRACTICE_LINKS,
  METHODS_MARKET_BASE,
  RESEARCH_METHODS_CLASS
} from '../src/data/researchMethodsCanvasLinks.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outPath = join(root, 'scripts', 'canvas-research-methods-practice-links.md')

const lines = [
  '# Canvas PSYC 4223 Research Methods — Methods Market links',
  '',
  `Generated ${new Date().toISOString().slice(0, 10)} from \`researchMethodsCanvasLinks.js\`.`,
  '',
  `**Course home:** ${METHODS_MARKET_BASE}/class/${RESEARCH_METHODS_CLASS}`,
  '',
  `**Assignment help:** ${METHODS_MARKET_BASE}/class/${RESEARCH_METHODS_CLASS}/assignment-help`,
  '',
  '| Chapter | Concept Review | Topics (Pressbooks) |',
  '|---------|----------------|---------------------|'
]

for (const row of RESEARCH_METHODS_CHAPTER_PRACTICE_LINKS) {
  lines.push(
    `| ${row.chapterNumber}: ${row.shortTitle} | ${row.conceptReview} | ${row.classHomeTopics} |`
  )
}

const md = lines.join('\n') + '\n'
writeFileSync(outPath, md, 'utf8')
console.log(md)
console.log(`Wrote ${outPath}`)
