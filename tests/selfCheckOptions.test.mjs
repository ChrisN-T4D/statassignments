import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data')
// outputInterpretation questions are free-text by design, so they are not checked.
const CHECKED = ['screenshotRecognition', 'errorDiagnostic']

function collectFailures (file, root) {
  const failures = []
  const seen = new WeakSet()
  const walk = (node) => {
    if (!node || typeof node !== 'object' || seen.has(node)) return
    seen.add(node)
    if (node.selfCheck && typeof node.selfCheck === 'object') {
      for (const category of CHECKED) {
        for (const q of node.selfCheck[category] || []) {
          const ok = Array.isArray(q.options) && q.options.length >= 2 &&
            Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length
          if (!ok) failures.push(`${file} ${node.id || ''} ${category} ${q.id}`)
        }
      }
    }
    for (const value of Object.values(node)) walk(value)
  }
  walk(root)
  return failures
}

test('multiple-choice self-check questions always have options and a valid answer index', async () => {
  const files = fs.readdirSync(dataDir).filter((f) => /^softwareLessons.*\.js$/.test(f))
  assert.ok(files.length > 0)
  const failures = []
  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(dataDir, file)).href)
    failures.push(...collectFailures(file, mod))
  }
  assert.deepEqual(failures, [], failures.join('\n'))
})
