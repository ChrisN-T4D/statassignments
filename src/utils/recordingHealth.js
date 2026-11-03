/**
 * Pure helpers and small browser utilities that keep a screen recording honest:
 * freeze detection, microphone level checks, and a background-safe timer.
 */

/** Fingerprint size for freeze checks (tiny so it is cheap to compare). */
export const FINGERPRINT_W = 32
export const FINGERPRINT_H = 18

/** Seconds of an unchanged screen before we warn the student. */
export const FREEZE_WARN_SECONDS = 45
/** Seconds of microphone silence before we warn the student. */
export const MIC_SILENCE_WARN_SECONDS = 20
/** Peak (0..1) below which the microphone counts as silent. */
export const MIC_SILENCE_PEAK = 0.01

/**
 * Mean absolute difference between two RGBA fingerprints, 0..255.
 * @param {ArrayLike<number>} a
 * @param {ArrayLike<number>} b
 */
export function fingerprintDistance(a, b) {
  if (!a || !b || a.length !== b.length || a.length === 0) return Infinity
  let sum = 0
  let n = 0
  for (let i = 0; i < a.length; i += 4) {
    sum += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])
    n += 3
  }
  return sum / n
}

/**
 * Tracks how long the picture has been unchanged.
 * Feed it one fingerprint per sample; it reports when the screen has been
 * identical for `warnAfterMs`. Pass `paused: true` to hold the clock.
 */
export function createFreezeTracker({ warnAfterMs = FREEZE_WARN_SECONDS * 1000, threshold = 0.5 } = {}) {
  let last = null
  let unchangedSince = null
  return {
    /**
     * @returns {{frozen: boolean, unchangedMs: number}}
     */
    sample(fingerprint, nowMs, { paused = false } = {}) {
      if (paused) {
        last = null
        unchangedSince = null
        return { frozen: false, unchangedMs: 0 }
      }
      if (!last || fingerprintDistance(last, fingerprint) > threshold) {
        last = fingerprint
        unchangedSince = nowMs
        return { frozen: false, unchangedMs: 0 }
      }
      const unchangedMs = nowMs - unchangedSince
      return { frozen: unchangedMs >= warnAfterMs, unchangedMs }
    }
  }
}

/**
 * Tracks continuous microphone silence.
 * @returns {{silent: boolean, silentMs: number}} from sample()
 */
export function createSilenceTracker({
  warnAfterMs = MIC_SILENCE_WARN_SECONDS * 1000,
  peakThreshold = MIC_SILENCE_PEAK
} = {}) {
  let silentSince = null
  return {
    sample(peak, nowMs, { paused = false } = {}) {
      if (paused || peak >= peakThreshold) {
        silentSince = null
        return { silent: false, silentMs: 0 }
      }
      if (silentSince === null) silentSince = nowMs
      const silentMs = nowMs - silentSince
      return { silent: silentMs >= warnAfterMs, silentMs }
    }
  }
}

/** Peak amplitude 0..1 from AnalyserNode.getByteTimeDomainData output. */
export function peakFromTimeDomain(bytes) {
  let peak = 0
  for (let i = 0; i < bytes.length; i += 1) {
    const v = Math.abs(bytes[i] - 128) / 128
    if (v > peak) peak = v
  }
  return peak
}

/**
 * setInterval-like timer that is NOT throttled when the tab is hidden.
 * Browsers slow page timers and stop requestAnimationFrame in background
 * tabs, which froze the camera-overlay canvas the moment a student switched to
 * jamovi. Timers inside a dedicated Worker keep their rate.
 * Falls back to setInterval if Workers/Blob URLs are unavailable.
 *
 * @param {() => void} callback
 * @param {number} intervalMs
 * @returns {() => void} stop function
 */
export function createBackgroundTimer(callback, intervalMs) {
  try {
    if (typeof Worker !== 'undefined' && typeof Blob !== 'undefined' && typeof URL !== 'undefined') {
      const src = `let t=setInterval(()=>postMessage(0),${Math.max(1, Math.round(intervalMs))});onmessage=()=>{clearInterval(t);close()}`
      const url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }))
      const worker = new Worker(url)
      URL.revokeObjectURL(url)
      worker.onmessage = () => callback()
      worker.onerror = () => {}
      return () => {
        try { worker.postMessage(1) } catch (_) {}
        try { worker.terminate() } catch (_) {}
      }
    }
  } catch (_) {
    /* fall through to setInterval */
  }
  const id = setInterval(callback, intervalMs)
  return () => clearInterval(id)
}

/**
 * Returns an async function that yields the latest frame of a video track as a
 * CanvasImageSource, working even while the tab is hidden. Uses ImageCapture
 * where available (Chromium), otherwise a muted <video> element.
 *
 * @param {MediaStreamTrack} track
 * @param {HTMLVideoElement} fallbackVideo already playing the same stream
 * @returns {() => Promise<CanvasImageSource|null>}
 */
export function createFrameGrabber(track, fallbackVideo) {
  let capture = null
  if (typeof ImageCapture !== 'undefined') {
    try { capture = new ImageCapture(track) } catch (_) { capture = null }
  }
  let last = null
  return async function grab() {
    if (capture) {
      try {
        const bitmap = await capture.grabFrame()
        if (last && typeof last.close === 'function') last.close()
        last = bitmap
        return bitmap
      } catch (_) {
        capture = null // permanently fall back to the <video> element
      }
    }
    return fallbackVideo && fallbackVideo.readyState >= 2 ? fallbackVideo : null
  }
}
