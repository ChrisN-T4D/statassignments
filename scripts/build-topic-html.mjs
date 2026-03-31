/**
 * Pipeline: extract jamovi → adapt variants → embed Module 3 from Vue.
 */
import { spawnSync } from 'child_process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const node = process.execPath

function run(script) {
  const r = spawnSync(node, [join(__dirname, script)], {
    stdio: 'inherit',
    cwd: join(__dirname, '..')
  })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

run('extract-topics-jamovi.mjs')
run('adapt-topic-variants.mjs')
run('embed-module3-vue-html.mjs')
console.log('build-topic-html: done.')
