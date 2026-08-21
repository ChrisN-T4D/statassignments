/**
 * Cross-browser helpers for getDisplayMedia + MediaRecorder.
 * Prefer MP4 when available (Safari + QuickTime / Canvas-friendly), then WebM fallbacks.
 */

/** @param {(type: string) => boolean} [isTypeSupported] */
export function getSupportedRecorderMimeType(isTypeSupported = defaultIsTypeSupported) {
  const types = [
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4;codecs=avc1.42E01E',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm'
  ]

  for (const type of types) {
    try {
      if (isTypeSupported(type)) return type
    } catch (_) {
      /* ignore probe errors */
    }
  }

  return ''
}

export function fileExtensionForMime(mimeType = '') {
  const mime = String(mimeType).toLowerCase()
  if (mime.includes('mp4')) return 'mp4'
  if (mime.includes('webm')) return 'webm'
  if (mime.includes('ogg')) return 'ogg'
  return 'webm'
}

/**
 * Constraint attempts from most compatible → more specific.
 * Avoid hard-requiring displaySurface/monitor (fails on many laptops / Safari).
 * Retry without system audio when audio constraints are rejected.
 */
export function getDisplayMediaConstraintAttempts() {
  return [
    { video: true, audio: true },
    { video: true, audio: false },
    {
      video: {
        frameRate: { ideal: 30, max: 30 }
      },
      audio: true
    },
    {
      video: {
        frameRate: { ideal: 30, max: 30 }
      },
      audio: false
    }
  ]
}

/**
 * @param {object} [env]
 * @param {boolean} [env.isSecureContext]
 * @param {boolean} [env.hasMediaDevices]
 * @param {boolean} [env.hasGetDisplayMedia]
 * @param {boolean} [env.hasMediaRecorder]
 * @param {boolean} [env.hasGetUserMedia]
 */
export function detectRecordingSupport(env = {}) {
  const isSecureContext =
    env.isSecureContext ??
    (typeof window !== 'undefined' ? window.isSecureContext : false)
  const hasMediaDevices =
    env.hasMediaDevices ??
    (typeof navigator !== 'undefined' && !!navigator.mediaDevices)
  const hasGetDisplayMedia =
    env.hasGetDisplayMedia ??
    (hasMediaDevices &&
      typeof navigator.mediaDevices.getDisplayMedia === 'function')
  const hasMediaRecorder =
    env.hasMediaRecorder ?? typeof MediaRecorder !== 'undefined'
  const hasGetUserMedia =
    env.hasGetUserMedia ??
    (hasMediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function')

  const supported = Boolean(
    isSecureContext && hasGetDisplayMedia && hasMediaRecorder
  )

  let message = ''
  if (!isSecureContext) {
    message =
      'Screen recording needs a secure connection (HTTPS). Open Methods Market over HTTPS, or use localhost for local testing.'
  } else if (!hasGetDisplayMedia || !hasMediaRecorder) {
    message =
      'This browser cannot record the screen. Use the latest Chrome, Edge, or Firefox on Windows/Mac, or Safari 14+ on Mac. On iPhone/iPad, use the device Screen Recording control in Control Center, then upload that video to Canvas.'
  }

  return {
    supported,
    isSecureContext,
    hasGetDisplayMedia,
    hasMediaRecorder,
    hasGetUserMedia,
    message
  }
}

export function canPauseMediaRecorder() {
  return (
    typeof MediaRecorder !== 'undefined' &&
    typeof MediaRecorder.prototype.pause === 'function' &&
    typeof MediaRecorder.prototype.resume === 'function'
  )
}

function defaultIsTypeSupported(type) {
  return (
    typeof MediaRecorder !== 'undefined' &&
    typeof MediaRecorder.isTypeSupported === 'function' &&
    MediaRecorder.isTypeSupported(type)
  )
}
