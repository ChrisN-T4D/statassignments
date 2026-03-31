/**
 * Writes jamovi.html for each topic from src/data/topics.js (slug = id__moduleId).
 */
import { mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { topics } from '../src/data/topics.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outRoot = join(root, 'src', 'content', 'topics')

function slug(topic) {
  return `${topic.id}__${topic.moduleId}`
}

let n = 0
for (const topic of topics) {
  if (!topic.contentHtml || !String(topic.contentHtml).trim()) continue
  const dir = join(outRoot, slug(topic))
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    join(dir, 'jamovi.html'),
    String(topic.contentHtml).trim() + '\n',
    'utf8'
  )
  n += 1
}

if (n === 0) {
  console.warn(
    'extract-topics-jamovi: no topic.contentHtml found — leaving existing jamovi.html files unchanged (normal after migration).'
  )
} else {
  console.log(
    `extract-topics-jamovi: wrote jamovi.html for ${n} topics under src/content/topics/`
  )
}
