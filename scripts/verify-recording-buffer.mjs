import assert from 'node:assert/strict'
import { createRecordingBuffer } from '../src/utils/recordingBuffer.js'

function fakeStorage({ failAt = -1, block } = {}) {
  const files = new Map()
  let removed = false
  let active = 0
  let maxActive = 0
  const directory = {
    async getFileHandle(name) {
      return {
        async createWritable() {
          let content
          return {
            async write(blob) {
              active++
              maxActive = Math.max(maxActive, active)
              try {
                if (Number(name) === failAt) throw new Error('Quota exceeded')
                await block
                content = blob
              } finally { active-- }
            },
            async close() { files.set(name, content) },
            async abort() {}
          }
        },
        async getFile() { return files.get(name) }
      }
    }
  }
  return {
    storage: { async getDirectory() { return {
      async *entries() {},
      async getDirectoryHandle() { return directory },
      async removeEntry() { files.clear(); removed = true }
    } } },
    files,
    get removed() { return removed },
    get maxActive() { return maxActive }
  }
}

// 3600 one-second chunks: queue ordering and final flush, independent of time.
{
  const disk = fakeStorage()
  const warnings = []
  const buffer = await createRecordingBuffer({ storage: disk.storage, onPressure: x => warnings.push(x) })
  for (let i = 0; i < 3600; i++) buffer.append(new Blob([`${i}\n`]))
  buffer.append(new Blob(['FINAL']))
  const blob = await buffer.finish('video/webm')
  const text = await blob.text()
  assert.equal(text, Array.from({ length: 3600 }, (_, i) => `${i}\n`).join('') + 'FINAL')
  assert.equal(blob.size, buffer.size)
  assert.equal(blob.type, 'video/webm')
  assert.equal(buffer.bufferedBytes, 0)
  assert.equal(disk.files.size, 3601)
  assert.equal(disk.maxActive, 1)
  assert.deepEqual(warnings, [])
  assert.throws(() => buffer.append(new Blob(['late'])), /closed/)
  await buffer.dispose()
  assert.equal(disk.removed, true)
}

// Quota failure preserves committed prefix, failed chunk and final tail.
{
  const disk = fakeStorage({ failAt: 1 })
  const warnings = []
  const buffer = await createRecordingBuffer({ storage: disk.storage, onPressure: x => warnings.push(x) })
  for (const text of ['first', 'second', 'final']) buffer.append(new Blob([text]))
  assert.equal(await (await buffer.finish('video/mp4')).text(), 'firstsecondfinal')
  assert.equal(disk.files.size, 1)
  assert.equal(buffer.bufferedBytes, 11)
  assert.deepEqual(warnings, ['storage'])
  await buffer.dispose()
}

// Missing/denied storage uses a bounded fallback, warning once, not dropping tail.
for (const storage of [{}, { getDirectory() { throw new Error('Denied') } }]) {
  const warnings = []
  const buffer = await createRecordingBuffer({ storage, limit: 5, onPressure: x => warnings.push(x) })
  assert.equal(buffer.usesDisk, false)
  buffer.append(new Blob(['12345']))
  buffer.append(new Blob(['final']))
  assert.deepEqual(warnings, ['memory'])
  assert.equal(await (await buffer.finish('video/webm')).text(), '12345final')
  await buffer.dispose()
  assert.equal(buffer.bufferedBytes, 0)
}

// Slow disk triggers backpressure while writes are pending; finish waits for them.
{
  let release
  const block = new Promise(resolve => { release = resolve })
  const disk = fakeStorage({ block })
  const warnings = []
  const buffer = await createRecordingBuffer({ storage: disk.storage, limit: 5, onPressure: x => warnings.push(x) })
  buffer.append(new Blob(['12345']))
  buffer.append(new Blob(['tail']))
  const finishing = buffer.finish('video/webm')
  assert.deepEqual(warnings, ['memory'])
  assert.equal(buffer.bufferedBytes, 9)
  release()
  assert.equal(await (await finishing).text(), '12345tail')
  assert.equal(buffer.bufferedBytes, 0)
  await buffer.dispose()
}
console.log('Recording storage regression checks passed (3600 chunks, final flush, quota failure, fallback, slow disk, cleanup).')
