// Regression for: video froze (audio kept going) once the student tabbed away
// from Methods Market, and for audio lost when the camera overlay was on.
// Needs Vite on :5178 and playwright-core + a Chromium; see docs/testing/long-screen-recordings.md.
import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core')
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'],
  // Playwright disables background throttling by default, which hides this bug.
  ignoreDefaultArgs: ['--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--mute-audio']
})
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true })
await context.grantPermissions(['camera', 'microphone'])
const page = await context.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('dialog', (d) => d.accept())
const origin = process.env.RECORDER_TEST_ORIGIN || 'http://127.0.0.1:5178'

try {
  await page.goto(`${origin}/scripts/fixtures/screen-recorder.html`)
  await page.locator('.av-toggle input').nth(0).check() // microphone
  await page.locator('.av-toggle input').nth(1).check() // camera overlay
  await page.waitForFunction(() => window.vm.$.setupState.micStream && window.vm.$.setupState.cameraStream)
  await page.getByRole('button', { name: 'Start Recording' }).click()
  await page.getByText('Recording is being stored temporarily').waitFor()
  await page.waitForTimeout(2500)

  // Student tabs out to jamovi: another tab comes to the front.
  const other = await context.newPage()
  await other.goto('about:blank')
  await other.bringToFront()
  const hiddenState = await page.evaluate(() => document.visibilityState)
  console.log('Methods Market tab visibility while away:', hiddenState)
  if (hiddenState === 'visible') {
    // Headless Chromium never hides a tab. A hidden tab stops requestAnimationFrame
    // entirely, so simulate exactly that for the rest of the recording.
    await page.evaluate(() => { window.requestAnimationFrame = () => 0 })
  }
  await page.waitForTimeout(9000)
  await page.bringToFront()
  await page.waitForTimeout(1500)

  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Stop & Save' }).click()
  await downloadEvent
  await page.getByRole('heading', { name: 'Save your recording' }).waitFor()

  const result = await page.evaluate(async () => {
    const blob = window.vm.$.setupState.recordedBlob
    // Audio: decode and measure loudness per second.
    const buf = await blob.arrayBuffer()
    let audio = { decoded: false, loudSeconds: 0, seconds: 0 }
    try {
      const ctx = new AudioContext()
      const decoded = await ctx.decodeAudioData(buf.slice(0))
      const ch = decoded.getChannelData(0)
      const rate = decoded.sampleRate
      let loud = 0
      const seconds = Math.floor(ch.length / rate)
      for (let s = 0; s < seconds; s += 1) {
        let peak = 0
        for (let i = s * rate; i < (s + 1) * rate; i += 1) peak = Math.max(peak, Math.abs(ch[i]))
        if (peak > 0.02) loud += 1
      }
      audio = { decoded: true, loudSeconds: loud, seconds }
    } catch (e) { audio.error = String(e) }
    // Video: play it and count distinct pictures per second.
    const video = document.createElement('video')
    video.muted = true
    video.src = URL.createObjectURL(blob)
    await video.play()
    const canvas = document.createElement('canvas'); canvas.width = 32; canvas.height = 18
    const c = canvas.getContext('2d', { willReadFrequently: true })
    const perSecond = {}
    let last = null
    await new Promise((resolve) => {
      const tick = () => {
        c.drawImage(video, 0, 0, 32, 18)
        const d = c.getImageData(0, 0, 32, 18).data
        const key = Array.from(d.slice(0, 64)).join(',')
        const sec = Math.floor(video.currentTime)
        if (key !== last) perSecond[sec] = (perSecond[sec] || 0) + 1
        last = key
        if (video.ended) resolve(); else video.requestVideoFrameCallback(tick)
      }
      video.onended = resolve
      video.requestVideoFrameCallback(tick)
      setTimeout(resolve, 30000)
    })
    return { audio, perSecond }
  })
  console.log(JSON.stringify(result))
  const frozenSeconds = []
  const total = result.audio.seconds // real length of the recording, not of the motion
  for (let s = 3; s < total - 1; s += 1) if (!(result.perSecond[s] > 0)) frozenSeconds.push(s)
  assert.equal(result.audio.decoded, true, 'recording has a decodable audio track')
  assert.ok(result.audio.loudSeconds >= 3, `audio is audible (loud seconds: ${result.audio.loudSeconds})`)
  assert.deepEqual(frozenSeconds, [], `no frozen seconds while tab was in the background: ${frozenSeconds}`)
  assert.deepEqual(errors, [], 'no page errors')
  console.log('PASS: camera + mic recording stays live and audible while the page is backgrounded')

  // A shared browser tab cannot show jamovi: it must be refused before recording.
  const tabPage = await context.newPage()
  await tabPage.goto(`${origin}/scripts/fixtures/screen-recorder.html`)
  await tabPage.evaluate(() => {
    const orig = navigator.mediaDevices.getDisplayMedia
    navigator.mediaDevices.getDisplayMedia = async (...a) => {
      const stream = await orig(...a)
      const track = stream.getVideoTracks()[0]
      const real = track.getSettings.bind(track)
      track.getSettings = () => ({ ...real(), displaySurface: 'browser' })
      return stream
    }
  })
  await tabPage.getByRole('button', { name: 'Start Recording' }).click()
  await tabPage.getByText('You shared a browser tab').waitFor()
  assert.equal(await tabPage.locator('.recording-timer').count(), 0, 'tab share never starts recording')
  assert.equal(await tabPage.evaluate(() => window.capture.getTracks().every((t) => t.readyState === 'ended')), true, 'refused tab share is released')
  console.log('PASS: browser-tab share is refused and released')

  // A window share is allowed but warned about.
  const winPage = await context.newPage()
  await winPage.goto(`${origin}/scripts/fixtures/screen-recorder.html`)
  await winPage.evaluate(() => {
    const orig = navigator.mediaDevices.getDisplayMedia
    navigator.mediaDevices.getDisplayMedia = async (...a) => {
      const stream = await orig(...a)
      const track = stream.getVideoTracks()[0]
      const real = track.getSettings.bind(track)
      track.getSettings = () => ({ ...real(), displaySurface: 'window' })
      return stream
    }
  })
  await winPage.getByRole('button', { name: 'Start Recording' }).click()
  await winPage.getByText('You shared a single window').waitFor()
  await winPage.getByRole('button', { name: 'Stop & Save' }).waitFor()
  console.log('PASS: window share records with a warning')
} finally {
  await browser.close()
}
