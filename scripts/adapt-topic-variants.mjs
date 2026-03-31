/**
 * For each topic folder with jamovi.html, writes spss/r/excel/stata.html
 * using adaptJamoviHtml. Skips Module 3 software topics (filled by embed script).
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { adaptJamoviHtml } from './lib/adaptJamoviHtml.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const topicsRoot = join(root, 'src', 'content', 'topics')

const VARIANTS = ['spss', 'r', 'excel', 'stata']
const SKIP_SLUGS = new Set([
  'software-interface__module-3',
  'data-entry__module-3',
  'variable-types__module-3'
])

let folders = 0
for (const name of readdirSync(topicsRoot)) {
  const dir = join(topicsRoot, name)
  if (!statSync(dir).isDirectory()) continue
  if (!name.includes('__')) continue
  const jamoviPath = join(dir, 'jamovi.html')
  if (!existsSync(jamoviPath)) continue
  folders += 1

  const jamovi = readFileSync(jamoviPath, 'utf8')
  if (SKIP_SLUGS.has(name)) continue

  for (const sw of VARIANTS) {
    writeFileSync(
      join(dir, `${sw}.html`),
      adaptJamoviHtml(jamovi, sw),
      'utf8'
    )
  }
}

console.log(
  `adapt-topic-variants: processed ${folders} topic folders (skipped variants for Module 3 software trio)`
)
