/**
 * Multi-pass checks for screen-recording cross-browser helpers.
 * Run: node scripts/verify-screen-recording-support.mjs
 */
import {
  getSupportedRecorderMimeType,
  fileExtensionForMime,
  getDisplayMediaConstraintAttempts,
  detectRecordingSupport
} from '../src/utils/screenRecordingSupport.js'

let failed = 0

function assert(cond, msg) {
  if (!cond) {
    failed += 1
    console.error('FAIL:', msg)
  } else {
    console.log('OK:', msg)
  }
}

// Pass 1: MIME preference — Safari-like (mp4 only)
{
  const mime = getSupportedRecorderMimeType((t) => t.startsWith('video/mp4'))
  assert(mime === 'video/mp4;codecs=avc1.42E01E,mp4a.40.2' || mime.startsWith('video/mp4'), 'Safari-like picks mp4 first')
  assert(fileExtensionForMime(mime) === 'mp4', 'mp4 mime → .mp4 extension')
}

// Pass 2: Chrome-like (webm vp9, no mp4 recorder)
{
  const mime = getSupportedRecorderMimeType((t) => t.includes('webm') && t.includes('vp9'))
  assert(mime.includes('webm') && mime.includes('vp9'), 'Chrome-like picks vp9 webm when mp4 unsupported')
  assert(fileExtensionForMime(mime) === 'webm', 'webm mime → .webm extension')
}

// Pass 3: Firefox-like (vp8 webm, no vp9)
{
  const mime = getSupportedRecorderMimeType(
    (t) => t === 'video/webm;codecs=vp8,opus' || t === 'video/webm;codecs=vp8' || t === 'video/webm'
  )
  assert(mime.includes('vp8') || mime === 'video/webm', 'Firefox-like avoids unsupported vp9')
}

// Pass 4: empty support → empty mime (caller must construct MediaRecorder without mimeType)
{
  const mime = getSupportedRecorderMimeType(() => false)
  assert(mime === '', 'No supported mime returns empty string')
  assert(fileExtensionForMime('') === 'webm', 'unknown mime defaults to webm extension')
}

// Pass 5: constraint attempts never hard-require monitor surface
{
  const attempts = getDisplayMediaConstraintAttempts()
  assert(attempts.length >= 2, 'at least video+audio and video-only attempts')
  assert(
    attempts.every((c) => c.video !== undefined),
    'every attempt includes video'
  )
  assert(
    !JSON.stringify(attempts).includes('displaySurface'),
    'constraints omit displaySurface (Safari / multi-monitor safe)'
  )
  assert(
    attempts.some((c) => c.audio === false),
    'includes audio:false fallback for browsers that reject system audio'
  )
}

// Pass 6: support detection messaging
{
  const insecure = detectRecordingSupport({
    isSecureContext: false,
    hasGetDisplayMedia: true,
    hasMediaRecorder: true,
    hasGetUserMedia: true
  })
  assert(!insecure.supported, 'insecure context unsupported')
  assert(insecure.message.toLowerCase().includes('https'), 'insecure message mentions HTTPS')

  const noApi = detectRecordingSupport({
    isSecureContext: true,
    hasGetDisplayMedia: false,
    hasMediaRecorder: true,
    hasGetUserMedia: true
  })
  assert(!noApi.supported, 'missing getDisplayMedia unsupported')
  assert(
    noApi.message.toLowerCase().includes('chrome') || noApi.message.toLowerCase().includes('safari'),
    'unsupported message names desktop browsers'
  )
  assert(noApi.message.toLowerCase().includes('iphone') || noApi.message.toLowerCase().includes('control center'), 'mentions iOS Control Center path')

  const ok = detectRecordingSupport({
    isSecureContext: true,
    hasGetDisplayMedia: true,
    hasMediaRecorder: true,
    hasGetUserMedia: true
  })
  assert(ok.supported, 'secure + APIs → supported')
  assert(ok.message === '', 'supported has empty message')
}

// Pass 7: extension edge cases
{
  assert(fileExtensionForMime('video/mp4') === 'mp4', 'plain mp4')
  assert(fileExtensionForMime('video/webm;codecs=vp8') === 'webm', 'webm with codecs')
  assert(fileExtensionForMime('VIDEO/MP4;CODECS=AVC1') === 'mp4', 'case-insensitive mime')
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}

console.log('\nAll screen-recording support passes OK')
