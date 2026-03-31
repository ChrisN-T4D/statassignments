/**
 * Generates src/data/topicsMeta.js from current topics.js (strips contentHtml).
 * Run before replacing the monolithic topics.js with a thin re-export.
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { topics } from '../src/data/topics.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'src', 'data', 'topicsMeta.js')

const meta = topics.map(
  ({ contentHtml: _c, isDynamicSoftware: _d, ...rest }) => rest
)

const header = `/**
 * Topic metadata only. Chapter HTML: \`src/content/topics/<id>__<moduleId>/<software>.html\`
 * Resolved at runtime via resolveTopicHtml() in src/content/topics/resolveTopicHtml.js
 * Regenerate: node scripts/generate-topics-meta.mjs (requires topics.js to still export full topics)
 */
`

writeFileSync(
  out,
  header + `export const topicsMeta = ${JSON.stringify(meta, null, 2)}\n`,
  'utf8'
)

console.log('generate-topics-meta: wrote', out, `(${meta.length} topics)`)
