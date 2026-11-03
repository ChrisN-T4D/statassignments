/**
 * Checks for freeze / silence detection and the background timer fallback.
 * Run: node scripts/verify-recording-health.mjs
 */
import {
  fingerprintDistance,
  createFreezeTracker,
  createSilenceTracker,
  peakFromTimeDomain,
  createBackgroundTimer
} from '../src/utils/recordingHealth.js'

let failed = 0
function assert(cond, msg) {
  if (!cond) { failed += 1; console.error('FAIL:', msg) } else console.log('OK:', msg)
}

const frame = (v) => new Uint8ClampedArray(32 * 18 * 4).fill(v)

assert(fingerprintDistance(frame(10), frame(10)) === 0, 'identical fingerprints have distance 0')
assert(fingerprintDistance(frame(10), frame(60)) === 50, 'distance is mean absolute difference')
assert(fingerprintDistance(frame(1), new Uint8ClampedArray(4)) === Infinity, 'size mismatch is never "frozen"')

{
  const t = createFreezeTracker({ warnAfterMs: 45000 })
  let r = t.sample(frame(10), 0)
  assert(!r.frozen, 'first sample is not frozen')
  r = t.sample(frame(10), 30000)
  assert(!r.frozen && r.unchangedMs === 30000, 'unchanged for 30s is below the 45s threshold')
  r = t.sample(frame(10), 46000)
  assert(r.frozen, 'unchanged for 46s is flagged frozen')
  r = t.sample(frame(80), 48000)
  assert(!r.frozen && r.unchangedMs === 0, 'a changed screen clears the freeze')
  t.sample(frame(80), 50000)
  r = t.sample(frame(80), 200000, { paused: true })
  assert(!r.frozen, 'paused recordings never count as frozen')
  r = t.sample(frame(80), 202000)
  assert(!r.frozen, 'clock restarts after a pause')
}

{
  const t = createSilenceTracker({ warnAfterMs: 20000, peakThreshold: 0.01 })
  assert(!t.sample(0.0, 0).silent, 'start of silence is not yet a warning')
  assert(t.sample(0.001, 21000).silent, 'continuous silence for 21s warns')
  assert(!t.sample(0.2, 22000).silent, 'speech clears the warning')
  assert(!t.sample(0.0, 23000).silent, 'silence clock restarts after speech')
  assert(!t.sample(0.0, 90000, { paused: true }).silent, 'paused is never silent')
}

{
  assert(peakFromTimeDomain(new Uint8Array([128, 128, 128])) === 0, 'flat signal has zero peak')
  assert(Math.abs(peakFromTimeDomain(new Uint8Array([128, 192, 64])) - 0.5) < 1e-9, 'peak reads amplitude around 128')
}

await new Promise((resolve) => {
  let n = 0
  const stop = createBackgroundTimer(() => { n += 1 }, 20)
  setTimeout(() => {
    stop()
    const at = n
    setTimeout(() => {
      assert(at >= 3, `background timer ticks (${at} ticks in 150ms)`)
      assert(n === at, 'background timer stops after stop()')
      resolve()
    }, 100)
  }, 150)
})

if (failed > 0) { console.error(`\n${failed} check(s) failed`); process.exit(1) }
console.log('\nAll recording-health checks OK')
