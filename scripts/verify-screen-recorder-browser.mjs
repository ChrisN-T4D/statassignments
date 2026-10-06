// Optional browser integration check. Start Vite first; requires playwright-core
// and Chromium. PLAYWRIGHT_MODULE may point to an existing installation.
import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core')
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, acceptDownloads: true })
const errors = []
page.on('pageerror', e => errors.push(e.message))
page.on('dialog', dialog => dialog.accept())
const origin = process.env.RECORDER_TEST_ORIGIN || 'http://127.0.0.1:5178'
try {
  await page.goto(`${origin}/scripts/fixtures/screen-recorder.html`)
  await page.getByRole('button', { name: 'Start Recording' }).click()
  await page.getByText('Recording is being stored temporarily').waitFor()
  await page.waitForTimeout(2200)
  await page.getByRole('button', { name: 'Pause' }).click()
  const pausedTime = await page.locator('.recording-timer').textContent()
  await page.waitForTimeout(1300)
  assert.equal(await page.locator('.recording-timer').textContent(), pausedTime)
  await page.getByRole('button', { name: 'Resume' }).click()
  await page.waitForTimeout(1200)
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Stop & Save' }).click()
  const download = await downloadEvent
  assert.equal(await download.failure(), null)
  await page.getByRole('heading', { name: 'Save your recording' }).waitFor()
  console.log('Download completed; checking playback metadata')
  const video = await page.locator('.preview-video').evaluate(async video => {
    if (video.readyState < 1) await new Promise((resolve, reject) => { video.onloadedmetadata = resolve; setTimeout(() => reject(new Error('Video metadata timeout: ' + video.error?.message)), 5000) })
    return { width: video.videoWidth, height: video.videoHeight }
  })
  assert.equal(video.width, 640)
  assert.equal(video.height, 360)
  assert.equal(await page.evaluate(() => window.capture.getTracks().every(t => t.readyState === 'ended')), true)
  await page.getByRole('button', { name: 'Close (download later from Tools)' }).click()
  assert.equal(await page.getByRole('button', { name: 'Start Recording' }).isDisabled(), true)
  await page.getByRole('button', { name: 'Record Again' }).click()
  await page.waitForFunction(async () => {
    const root = await navigator.storage.getDirectory()
    for await (const [name] of root.entries()) if (name.startsWith('mm-recording-')) return false
    return true
  })
  // Browser-originated stop must finalize without a click, release resources,
  // reset recording state, and explain why only a partial video was saved.
  await page.getByRole('button', { name: 'Start Recording' }).click()
  await page.waitForTimeout(1300)
  await page.evaluate(() => {
    const track = window.capture.getVideoTracks()[0]
    track.stop()
    track.dispatchEvent(new Event('ended'))
  })
  await page.getByRole('heading', { name: 'Save your recording' }).waitFor()
  assert.match(await page.getByRole('dialog').textContent(), /Screen sharing ended/)
  await page.getByRole('button', { name: 'Close (download later from Tools)' }).click()
  await page.getByRole('button', { name: 'Record Again' }).click()
  await page.getByRole('button', { name: 'Start Recording' }).waitFor()
  await page.getByRole('button', { name: 'Start Recording' }).click()
  await page.waitForTimeout(1300)
  await page.evaluate(() => window.vm.$.setupState.mediaRecorder.stop())
  await page.getByRole('heading', { name: 'Save your recording' }).waitFor()
  assert.match(await page.getByRole('dialog').textContent(), /stopped recording unexpectedly/)
  assert.equal(await page.locator('.recording-indicator').count(), 0)
  await page.getByRole('button', { name: 'Close (download later from Tools)' }).click()
  await page.getByRole('button', { name: 'Record Again' }).click()

  // A disk write failure must stop gracefully and offer a playable partial file.
  await page.evaluate(() => {
    window.originalCreateWritable = FileSystemFileHandle.prototype.createWritable
    let writes = 0
    FileSystemFileHandle.prototype.createWritable = function (...args) {
      if (++writes === 2) throw new DOMException('Test disk full', 'QuotaExceededError')
      return window.originalCreateWritable.apply(this, args)
    }
  })
  await page.getByRole('button', { name: 'Start Recording' }).click()
  await page.getByRole('heading', { name: 'Save your recording' }).waitFor()
  assert.match(await page.getByRole('dialog').textContent(), /storage could not keep up or is full/)
  assert.ok(await page.evaluate(() => window.vm.$.setupState.recordedBlob.size > 0))
  await page.evaluate(() => { FileSystemFileHandle.prototype.createWritable = window.originalCreateWritable })
  await page.getByRole('button', { name: 'Close (download later from Tools)' }).click()
  await page.getByRole('button', { name: 'Record Again' }).click()
  // Mobile layout smoke: don't require actual mobile display capture support.
  await page.setViewportSize({ width: 375, height: 812 })
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  console.log('PASS: real Chromium recording, pause/resume, playable download, final stop, external/unexpected stop, disk-full partial save, cleanup, desktop/mobile layout')

  const storageResult = await page.evaluate(async () => {
    const { createRecordingBuffer } = await import('/src/utils/recordingBuffer.js')
    const root = await navigator.storage.getDirectory()
    await root.getDirectoryHandle('mm-recording-abandoned-test', { create: true })
    const first = await createRecordingBuffer()
    first.append(new Blob(['active tab recording']))
    const firstBlob = await first.finish('video/webm')
    const second = await createRecordingBuffer()
    const retained = await firstBlob.text()
    let abandonedRemoved = false
    try { await root.getDirectoryHandle('mm-recording-abandoned-test') } catch (_) { abandonedRemoved = true }
    await first.dispose()
    await second.dispose()
    return { retained, abandonedRemoved }
  })
  assert.equal(storageResult.retained, 'active tab recording')
  assert.equal(storageResult.abandonedRemoved, true)
  console.log('PASS: abandoned storage cleanup preserves locked active recordings')

  // Accelerated hour-sized data test: same chunk count and nominal bitrate,
  // not a wall-clock hour or a browser-wide RAM benchmark.
  const stress = await page.evaluate(async () => {
    const { createRecordingBuffer } = await import('/src/utils/recordingBuffer.js')
    let warnings = 0
    const buffer = await createRecordingBuffer({ onPressure: () => warnings++ })
    const chunkSize = 312500 // 2.5 Mb/s, one second
    let peakBuffered = 0
    const samples = []
    for (let i = 0; i < 3600; i++) {
      const bytes = new Uint8Array(chunkSize)
      bytes[0] = i % 256
      buffer.append(new Blob([bytes]))
      peakBuffered = Math.max(peakBuffered, buffer.bufferedBytes)
      while (buffer.bufferedBytes > 2 * 1024 * 1024) await new Promise(resolve => setTimeout(resolve, 2))
      if (i % 900 === 0) samples.push(performance.memory?.usedJSHeapSize)
    }
    const blob = await buffer.finish('video/webm')
    const size = blob.size
    const last = new Uint8Array(await blob.slice(3599 * chunkSize, 3599 * chunkSize + 1).arrayBuffer())[0]
    const bufferedAtEnd = buffer.bufferedBytes
    await buffer.dispose()
    return { size, last, warnings, peakBuffered, bufferedAtEnd, jsHeapSamples: samples }
  })
  assert.equal(stress.size, 1125000000)
  assert.equal(stress.last, 3599 % 256)
  assert.equal(stress.warnings, 0)
  assert.equal(stress.bufferedAtEnd, 0)
  assert.ok(stress.peakBuffered < 3 * 1024 * 1024)
  console.log('PASS: 3600-chunk / 1.125 GB real browser storage test', JSON.stringify(stress))
  assert.deepEqual(errors, [])
} finally {
  await browser.close()
}
