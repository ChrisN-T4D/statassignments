<template>
  <div class="assignment-tools" :class="{ embedded }">
    <div v-if="!embedded" class="tools-header">
      <h3>🎯 Assignment Tools</h3>
      <p class="tools-help">Tools to help you complete and submit your assignment</p>
    </div>

    <div class="tools-controls">
      <!-- Not Recording State -->
      <template v-if="!isRecording && !isPaused">
        <div v-if="!recordingSupport.supported" class="av-error-help recorder-unsupported">
          <div class="error-header">
            <span class="error-icon">⚠️</span>
            <strong>Screen recording unavailable here</strong>
          </div>
          <p class="error-details">{{ recordingSupport.message }}</p>
        </div>

        <!-- Action Buttons Row (Side by Side) -->
        <div v-else class="action-buttons-row">
          <!-- Pop-Out Instructions Button -->
          <div v-if="instructionsContent" class="tool-section">
            <PopOutButton
              :title="instructionsTitle"
              :content="instructionsContent"
              :width="instructionsWidth"
              :height="instructionsHeight"
            />
            <p class="tool-hint">
              Open instructions in a separate window to view alongside your work
            </p>
          </div>

          <!-- Start Recording Button -->
          <div class="tool-section">
            <button
              @click="startRecording"
              class="btn-record"
              :disabled="isStarting || isProcessing || saveFailed || !!recordedBlob"
            >
              <span class="btn-icon">⏺</span>
              Start Recording
            </button>
            <p class="tool-hint">
              You'll be asked to select what to record (entire screen, window, or browser tab). Works in Chrome, Edge, Firefox, and Safari on desktop.
            </p>
          </div>
        </div>

        <!-- Audio/Video Settings Row (Below Action Buttons) -->
        <div v-if="recordingSupport.supported && recordingSupport.hasGetUserMedia" class="av-settings-row">
          <!-- Microphone Settings -->
          <div class="tool-section av-setting">
            <label class="av-toggle">
              <input
                type="checkbox"
                v-model="micEnabled"
                @change="handleMicToggle"
              />
              <span class="toggle-icon">🎤</span>
              <span class="toggle-label">
                {{ micEnabled ? 'Microphone: ON' : 'Microphone: OFF' }}
              </span>
            </label>
            <p class="toggle-hint">
              {{ micEnabled ? 'Your voice will be recorded' : 'Enable to narrate your recording' }}
            </p>

            <!-- Permission Instructions -->
            <div v-if="!micEnabled" class="av-instructions">
              <div class="instruction-item">
                <span class="instruction-icon">ℹ️</span>
                <p class="instruction-text">
                  When you enable the microphone, your browser will ask for permission.
                  Click <strong>"Allow"</strong> to narrate your recording.
                </p>
              </div>
            </div>

            <!-- Permission Help (when enabled but no stream) -->
            <div v-if="micEnabled && !micStream && !micError" class="av-requesting">
              <div class="requesting-indicator">
                <span class="requesting-spinner"></span>
                <p>Requesting microphone...</p>
              </div>
            </div>

            <!-- Permission Denied Help -->
            <div v-if="micError" class="av-error-help">
              <div class="error-header">
                <span class="error-icon">⚠️</span>
                <strong>Microphone Access Denied</strong>
              </div>
              <p class="error-details">To enable your microphone:</p>
              <ol class="error-steps">
                <li>Click the <strong>🔒 lock icon</strong> in your browser's address bar</li>
                <li>Find <strong>"Microphone"</strong> and change to <strong>"Allow"</strong></li>
                <li>Refresh this page and try again</li>
              </ol>
            </div>
          </div>

          <!-- Camera Settings -->
          <div class="tool-section av-setting">
            <label class="av-toggle">
              <input
                type="checkbox"
                v-model="cameraEnabled"
                @change="handleCameraToggle"
              />
              <span class="toggle-icon">📷</span>
              <span class="toggle-label">
                {{ cameraEnabled ? 'Camera: ON' : 'Camera: OFF' }}
              </span>
            </label>
            <p class="toggle-hint">
              {{ cameraEnabled ? 'Your face will appear in the recording' : 'Enable to show yourself in recording' }}
            </p>

            <!-- Camera Preview Bubble -->
            <div v-if="cameraEnabled && cameraStream" class="camera-preview-bubble">
              <video
                ref="cameraPreview"
                autoplay
                playsinline
                muted
                class="preview-video-element"
              ></video>
            </div>

            <!-- Permission Instructions -->
            <div v-if="!cameraEnabled" class="av-instructions">
              <div class="instruction-item">
                <span class="instruction-icon">ℹ️</span>
                <p class="instruction-text">
                  When you enable the camera, your browser will ask for permission.
                  Click <strong>"Allow"</strong> to include yourself in the recording.
                </p>
              </div>
            </div>

            <!-- Permission Help (when enabled but no stream) -->
            <div v-if="cameraEnabled && !cameraStream && !cameraError" class="av-requesting">
              <div class="requesting-indicator">
                <span class="requesting-spinner"></span>
                <p>Requesting camera...</p>
              </div>
            </div>

            <!-- Permission Denied Help -->
            <div v-if="cameraError" class="av-error-help">
              <div class="error-header">
                <span class="error-icon">⚠️</span>
                <strong>Camera Access Denied</strong>
              </div>
              <p class="error-details">To enable your camera:</p>
              <ol class="error-steps">
                <li>Click the <strong>🔒 lock icon</strong> in your browser's address bar</li>
                <li>Find <strong>"Camera"</strong> and change to <strong>"Allow"</strong></li>
                <li>Refresh this page and try again</li>
              </ol>
            </div>
          </div>
        </div>
      </template>

      <!-- Recording State -->
      <template v-if="isRecording || isPaused">
        <div class="recording-status">
          <div class="status-left">
            <span class="recording-indicator" :class="{ pulse: isRecording }">
              {{ isRecording ? '⏺ Recording' : '⏸ Paused' }}
            </span>
            <span v-if="micEnabled" class="mic-indicator" :class="{ active: isRecording }">
              🎤 Mic
            </span>
          </div>
          <span class="recording-timer">{{ formattedTime }}</span>
        </div>

        <div class="recording-actions">
          <button
            v-if="isRecording && supportsPause"
            @click="pauseRecording"
            class="btn-pause"
          >
            <span class="btn-icon">⏸</span>
            Pause
          </button>
          <button
            v-if="isPaused && supportsPause"
            @click="resumeRecording"
            class="btn-resume"
          >
            <span class="btn-icon">▶️</span>
            Resume
          </button>
          <button
            @click="stopRecording"
            class="btn-stop"
          >
            <span class="btn-icon">⏹</span>
            Stop & Save
          </button>
        </div>
      </template>

      <p v-if="isRecording || isPaused" class="tool-hint" role="status">
        {{ storageOnDisk ? 'Recording is being stored temporarily on this device. Download it when finished.' : 'Temporary storage is unavailable. Recording will stop at the memory limit so you can save it.' }}
        Keep this page open and your computer awake.
      </p>

      <!-- Processing State -->
      <div v-if="isProcessing" class="processing-status">
        <span class="spinner"></span>
        Processing your recording...
      </div>

      <button v-if="saveFailed" @click="handleRecordingStop" :disabled="isProcessing" class="btn-download">
        Retry preparing download
      </button>
      <button v-if="saveFailed" @click="discardRecording" :disabled="isProcessing" class="btn-discard">Discard and record again</button>

      <!-- Recorded Video Preview -->
      <div v-if="recordedVideoUrl && !isRecording" class="video-preview">
        <h4>Your Recording:</h4>
        <video
          :src="recordedVideoUrl"
          controls
          class="preview-video"
        ></video>

        <div class="preview-actions">
          <button @click="downloadRecording" class="btn-download btn-download-primary">
            <span class="btn-icon">💾</span>
            {{ hasDownloaded ? 'Download Again' : 'Download Recording' }}
          </button>
          <button
            v-if="allowUpload"
            @click="uploadRecording"
            class="btn-upload"
            :disabled="isUploading"
          >
            <span class="btn-icon">☁️</span>
            {{ isUploading ? 'Uploading...' : 'Upload Recording' }}
          </button>
          <button @click="discardRecording" class="btn-discard">
            <span class="btn-icon">🗑️</span>
            Record Again
          </button>
        </div>
        <p class="download-hint">
          Save the <strong>.{{ downloadExtension }}</strong> video file, then upload that file to Canvas.
          Closing this tab or leaving the page will erase the recording — Methods Market does not keep a copy.
        </p>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="recorder-error">
      <strong>⚠️ Error:</strong> {{ error }}
      <button @click="error = null" class="btn-dismiss">✕</button>
    </div>

    <!-- Full-screen prompt so Stop always surfaces download (drawer can be small) -->
    <Teleport to="body">
      <div
        v-if="showDownloadPrompt && recordedBlob"
        class="download-prompt-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-prompt-title"
      >
        <div class="download-prompt-card">
          <h2 id="download-prompt-title">Save your recording</h2>
          <p v-if="error" role="alert">{{ error }}</p>
          <p class="download-prompt-lead">
            Your video is ready. Download it now — Methods Market does not keep a copy after you leave this page.
          </p>
          <p class="download-prompt-file">
            File: <code>{{ downloadFileName }}</code>
          </p>
          <button
            type="button"
            class="btn-download btn-download-hero"
            @click="downloadRecording"
          >
            <span class="btn-icon">💾</span>
            {{ hasDownloaded ? 'Download Again' : 'Download Recording' }}
          </button>
          <p class="download-prompt-warn">
            Closing the browser or navigating away from this page will lose the recording. Download it before you leave, then upload the video file to Canvas.
          </p>
          <button
            type="button"
            class="btn-download-dismiss"
            @click="dismissDownloadPrompt"
          >
            {{ hasDownloaded ? 'Done — I downloaded it' : 'Close (download later from Tools)' }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, watch, nextTick } from 'vue'
import { createRecordingBuffer } from '../utils/recordingBuffer.js'
import PopOutButton from './PopOutButton.vue'
import {
  getSupportedRecorderMimeType,
  fileExtensionForMime,
  getDisplayMediaConstraintAttempts,
  detectRecordingSupport,
  canPauseMediaRecorder,
  isMp4MimeType,
  RECORDER_TIMESLICE_MS
} from '../utils/screenRecordingSupport.js'

const props = defineProps({
  allowUpload: {
    type: Boolean,
    default: false
  },
  uploadEndpoint: {
    type: String,
    default: '/api/recordings/upload'
  },
  filename: {
    type: String,
    default: 'screen-recording'
  },
  // Pop-out instructions props
  instructionsTitle: {
    type: String,
    default: 'Assignment Instructions'
  },
  instructionsContent: {
    type: String,
    default: ''
  },
  instructionsWidth: {
    type: Number,
    default: 550
  },
  instructionsHeight: {
    type: Number,
    default: 700
  },
  /** Hide outer header when nested in Resources drawer */
  embedded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['recording-complete', 'upload-complete', 'active-change'])

// Recording state
const isStarting = ref(false)
const storageOnDisk = ref(false)
const saveFailed = ref(false)
let recordingBuffer = null
let stopRequested = false
let finalizing = false
let flushInterval = null
let unmounted = false
const compositeVideos = []
const isRecording = ref(false)
const isPaused = ref(false)
const isProcessing = ref(false)
const isUploading = ref(false)
const error = ref(null)

// Microphone state
const micEnabled = ref(false)
const micStream = ref(null)
const micError = ref(null)

// Camera state
const cameraEnabled = ref(false)
const cameraStream = ref(null)
const cameraError = ref(null)
const cameraPreview = ref(null)

// Media objects
const mediaRecorder = ref(null)
const mediaStream = ref(null)
const recordedVideoUrl = ref(null)
const recordedBlob = ref(null)
const activeMimeType = ref('')
const showDownloadPrompt = ref(false)
const hasDownloaded = ref(false)
const frozenDownloadName = ref('')
const mixAudioContext = ref(null)
const sourceScreenStream = ref(null)

// Canvas compositing for camera overlay
const compositeCanvas = ref(null)
const compositeContext = ref(null)
const compositeAnimationFrame = ref(null)

// Timer
const startTime = ref(0)
const elapsedTime = ref(0)
const timerInterval = ref(null)

const recordingSupport = computed(() => detectRecordingSupport())
const supportsPause = computed(() => canPauseMediaRecorder())

// Computed
const formattedTime = computed(() => {
  const seconds = Math.floor(elapsedTime.value / 1000)
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

const downloadExtension = computed(() => fileExtensionForMime(activeMimeType.value))
const downloadFileName = computed(
  () =>
    frozenDownloadName.value ||
    `${props.filename}-${new Date().toISOString().slice(0, 10)}.${downloadExtension.value}`
)

// Handle microphone toggle
async function handleMicToggle() {
  if (micEnabled.value) {
    // Request microphone permission
    try {
      micError.value = null
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })
      micStream.value = stream
    } catch (err) {
      console.error('Microphone access denied:', err)
      micEnabled.value = false
      micError.value = 'Microphone access denied. Please allow microphone permission.'
      error.value = micError.value
    }
  } else {
    // Stop microphone stream
    if (micStream.value) {
      micStream.value.getTracks().forEach(track => track.stop())
      micStream.value = null
    }
    micError.value = null
  }
}

// Handle camera toggle
async function handleCameraToggle() {
  if (cameraEnabled.value) {
    // Request camera permission
    try {
      cameraError.value = null
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 320 },
          height: { ideal: 240 },
          facingMode: 'user'
        }
      })
      cameraStream.value = stream
    } catch (err) {
      console.error('Camera access denied:', err)
      cameraEnabled.value = false
      cameraError.value = 'Camera access denied. Please allow camera permission.'
      error.value = cameraError.value
    }
  } else {
    // Stop camera stream
    if (cameraStream.value) {
      cameraStream.value.getTracks().forEach(track => track.stop())
      cameraStream.value = null
    }
    cameraError.value = null
  }
}

// Combine audio streams (screen audio + microphone)
async function combineAudioStreams(screenStream, microphoneStream) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) {
    return microphoneStream?.getAudioTracks()?.[0] || null
  }

  const audioContext = new AudioCtx()
  mixAudioContext.value = audioContext
  if (audioContext.state === 'suspended') {
    try {
      await audioContext.resume()
    } catch (_) {
      /* Safari may still allow destinations after a user gesture */
    }
  }

  const destination = audioContext.createMediaStreamDestination()

  const screenAudioTracks = screenStream.getAudioTracks()
  if (screenAudioTracks.length > 0) {
    const screenSource = audioContext.createMediaStreamSource(
      new MediaStream(screenAudioTracks)
    )
    screenSource.connect(destination)
  }

  if (microphoneStream) {
    const micSource = audioContext.createMediaStreamSource(microphoneStream)
    micSource.connect(destination)
  }

  return destination.stream.getAudioTracks()[0] || null
}

function prepareVideoElement(stream) {
  const video = document.createElement('video')
  compositeVideos.push(video)
  video.srcObject = stream
  video.muted = true
  video.playsInline = true
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
  return video
}

// Create composite stream with camera overlay (falls back to screen-only on failure)
async function createCompositeStream(screenStream, cameraVideoStream) {
  if (typeof HTMLCanvasElement === 'undefined' || !HTMLCanvasElement.prototype.captureStream) {
    return screenStream
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return screenStream

  const screenVideo = prepareVideoElement(screenStream)
  const cameraVideo = prepareVideoElement(cameraVideoStream)

  try {
    await Promise.all([
      screenVideo.play().catch(() => {}),
      cameraVideo.play().catch(() => {})
    ])
  } catch (_) {
    return screenStream
  }

  await new Promise((resolve) => {
    if (screenVideo.videoWidth > 0) {
      resolve()
      return
    }
    screenVideo.onloadedmetadata = () => resolve()
    setTimeout(resolve, 1500)
  })

  const trackSettings = screenStream.getVideoTracks()[0]?.getSettings?.() || {}
  const width = screenVideo.videoWidth || trackSettings.width || 1280
  const height = screenVideo.videoHeight || trackSettings.height || 720
  const scale = Math.min(1, 1920 / width, 1080 / height)
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)

  compositeCanvas.value = canvas
  compositeContext.value = ctx

  const bubbleWidth = Math.floor(canvas.width * 0.2)
  const bubbleHeight = Math.floor(bubbleWidth * 0.75)
  const bubblePadding = 20
  const bubbleX = canvas.width - bubbleWidth - bubblePadding
  const bubbleY = canvas.height - bubbleHeight - bubblePadding

  let lastFrame = -Infinity
  function drawFrame(now = 0) {
    compositeAnimationFrame.value = requestAnimationFrame(drawFrame)
    if (now - lastFrame < 1000 / 15) return
    lastFrame = now
    ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height)

    if (cameraVideo.readyState >= 2) {
      ctx.save()
      const radius = 10
      ctx.beginPath()
      ctx.moveTo(bubbleX + radius, bubbleY)
      ctx.lineTo(bubbleX + bubbleWidth - radius, bubbleY)
      ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + radius)
      ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - radius)
      ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - radius, bubbleY + bubbleHeight)
      ctx.lineTo(bubbleX + radius, bubbleY + bubbleHeight)
      ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - radius)
      ctx.lineTo(bubbleX, bubbleY + radius)
      ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + radius, bubbleY)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(cameraVideo, bubbleX, bubbleY, bubbleWidth, bubbleHeight)
      ctx.restore()

      ctx.strokeStyle = '#4f46e5'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(bubbleX + radius, bubbleY)
      ctx.lineTo(bubbleX + bubbleWidth - radius, bubbleY)
      ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + radius)
      ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - radius)
      ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - radius, bubbleY + bubbleHeight)
      ctx.lineTo(bubbleX + radius, bubbleY + bubbleHeight)
      ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - radius)
      ctx.lineTo(bubbleX, bubbleY + radius)
      ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + radius, bubbleY)
      ctx.closePath()
      ctx.stroke()
    }
  }

  drawFrame()
  return canvas.captureStream(15)
}

async function requestScreenStream() {
  const attempts = getDisplayMediaConstraintAttempts()
  let lastError = null

  for (const constraints of attempts) {
    try {
      return await navigator.mediaDevices.getDisplayMedia(constraints)
    } catch (err) {
      lastError = err
      // User cancelled / denied — do not keep retrying
      if (err?.name === 'NotAllowedError' || err?.name === 'AbortError') {
        throw err
      }
    }
  }

  throw lastError || new Error('Unable to start screen capture')
}

function createMediaRecorder(stream, mimeType) {
  const bitRate = { videoBitsPerSecond: 2500000 }
  // Chromium MP4 only flushes video on IDR frames; keyframe interval must
  // match timeslice or playback shows a frozen frame with continuous audio.
  const mp4Keyframe =
    mimeType && isMp4MimeType(mimeType)
      ? { videoKeyFrameIntervalDuration: RECORDER_TIMESLICE_MS }
      : {}

  const optionAttempts = []
  if (mimeType) {
    optionAttempts.push({ mimeType, ...bitRate, ...mp4Keyframe })
    if (Object.keys(mp4Keyframe).length) {
      optionAttempts.push({ mimeType, ...bitRate })
    }
  }
  optionAttempts.push(bitRate)
  optionAttempts.push({})

  for (const opts of optionAttempts) {
    try {
      return new MediaRecorder(stream, opts)
    } catch (_) {
      /* try next */
    }
  }

  return new MediaRecorder(stream)
}

function startMediaRecorder(recorder) {
  // 1s timeslice is safer than 100ms on Safari; fall back to no timeslice
  try {
    recorder.start(RECORDER_TIMESLICE_MS)
  } catch (_) {
    if (typeof recorder.requestData !== 'function') throw new Error('This browser cannot safely record long sessions.')
    recorder.start()
    flushInterval = setInterval(() => {
      if (recorder.state === 'recording') {
        try { recorder.requestData() } catch (_) { stopRecording() }
      }
    }, RECORDER_TIMESLICE_MS)
  }
}

// Start recording
async function startRecording() {
  if (isStarting.value || isRecording.value || isPaused.value || isProcessing.value || recordedBlob.value || saveFailed.value) return
  isStarting.value = true
  stopRequested = false
  try {
    error.value = null

    if (!recordingSupport.value.supported) {
      error.value = recordingSupport.value.message
      return
    }

    const screenStream = await requestScreenStream()
    if (unmounted) {
      screenStream.getTracks().forEach(track => track.stop())
      return
    }
    sourceScreenStream.value = screenStream
    recordingBuffer = await createRecordingBuffer({
      onPressure(reason) {
        error.value = reason === 'storage'
          ? 'Device storage could not keep up or is full. Recording stopped so you can download the video captured so far.'
          : 'Recording reached the temporary memory limit. Download the video captured so far, then start a new recording.'
        stopRecording()
      }
    })
    storageOnDisk.value = recordingBuffer.usesDisk
    if (unmounted) {
      await recordingBuffer.dispose()
      cleanupCaptureStreams()
      return
    }

    let videoStream = screenStream

    if (cameraEnabled.value && cameraStream.value) {
      try {
        videoStream = await createCompositeStream(screenStream, cameraStream.value)
      } catch (compositeErr) {
        console.warn('Camera overlay unavailable, recording screen only:', compositeErr)
        videoStream = screenStream
      }
    }

    let finalStream = videoStream

    if (micEnabled.value && micStream.value) {
      const videoTrack = videoStream.getVideoTracks()[0]
      const combinedAudioTrack = await combineAudioStreams(screenStream, micStream.value)
      const tracks = [videoTrack]
      if (combinedAudioTrack) {
        tracks.push(combinedAudioTrack)
      } else {
        const micTrack = micStream.value.getAudioTracks()[0]
        if (micTrack) tracks.push(micTrack)
      }
      finalStream = new MediaStream(tracks)
    }

    mediaStream.value = finalStream
    activeMimeType.value = getSupportedRecorderMimeType()

    mediaRecorder.value = createMediaRecorder(finalStream, activeMimeType.value)
    if (mediaRecorder.value.mimeType) {
      activeMimeType.value = mediaRecorder.value.mimeType
    }

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordingBuffer.append(event.data)
      }
    }

    mediaRecorder.value.onerror = (event) => {
      console.error('MediaRecorder error:', event)
      error.value = 'The browser interrupted recording. Download the video captured so far. Try turning off the camera overlay for your next recording.'
      stopRecording()
    }

    mediaRecorder.value.onstop = handleRecordingStop

    // Listen on the real screen track — canvas tracks may not fire "ended" when sharing stops
    const screenTrack = screenStream.getVideoTracks()[0]
    if (screenTrack) {
      screenTrack.addEventListener('ended', () => {
        if (isRecording.value || isPaused.value) {
          error.value = 'Screen sharing ended. Download the video captured so far.'
          stopRecording()
        }
      })
    }

    if (unmounted) {
      cleanupCaptureStreams()
      await recordingBuffer.dispose()
      return
    }
    startMediaRecorder(mediaRecorder.value)
    isRecording.value = true
    isPaused.value = false

    elapsedTime.value = 0
    startTimer()
  } catch (err) {
    console.error('Error starting recording:', err)
    cleanupCaptureStreams()
    await recordingBuffer?.dispose().catch(() => {})
    recordingBuffer = null
    if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
      error.value = 'Permission denied or cancelled. Please allow screen recording to continue.'
    } else if (err.name === 'NotSupportedError' || err.name === 'NotFoundError') {
      error.value =
        'Screen recording is not supported in this browser. Try the latest Chrome, Edge, Firefox, or Safari on a computer.'
    } else {
      error.value = `Failed to start recording: ${err.message || err.name || 'Unknown error'}`
    }
  } finally {
    isStarting.value = false
  }
}

// Pause recording
function pauseRecording() {
  if (!supportsPause.value || !mediaRecorder.value || !isRecording.value) return
  try {
    mediaRecorder.value.pause()
    isRecording.value = false
    isPaused.value = true
    stopTimer()
  } catch (err) {
    console.warn('Pause not available:', err)
    error.value = 'Pause is not supported in this browser. Click Stop & Save when you are done.'
  }
}

// Resume recording
function resumeRecording() {
  if (!supportsPause.value || !mediaRecorder.value || !isPaused.value) return
  try {
    mediaRecorder.value.resume()
    isPaused.value = false
    isRecording.value = true
    startTimer()
  } catch (err) {
    console.warn('Resume not available:', err)
  }
}

function cleanupCaptureStreams() {
  clearInterval(flushInterval)
  flushInterval = null
  if (compositeAnimationFrame.value) {
    cancelAnimationFrame(compositeAnimationFrame.value)
    compositeAnimationFrame.value = null
  }

  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((track) => {
      try {
        track.stop()
      } catch (_) {}
    })
  }

  if (sourceScreenStream.value) {
    sourceScreenStream.value.getTracks().forEach((track) => {
      try {
        track.stop()
      } catch (_) {}
    })
    sourceScreenStream.value = null
  }

  if (mixAudioContext.value) {
    mixAudioContext.value.close?.().catch?.(() => {})
    mixAudioContext.value = null
  }

  mediaStream.value = null
  for (const video of compositeVideos.splice(0)) {
    video.pause()
    video.srcObject = null
  }
  if (compositeCanvas.value) {
    compositeCanvas.value.width = 0
    compositeCanvas.value.height = 0
  }
  compositeCanvas.value = null
  compositeContext.value = null
}

// Only finalize in onstop: the browser delivers the final chunk before it.
function stopRecording() {
  if (stopRequested) return
  stopRequested = true
  isProcessing.value = true
  stopTimer()
  isRecording.value = false
  isPaused.value = false
  if (mediaRecorder.value?.state !== 'inactive') {
    try {
      mediaRecorder.value?.stop()
    } catch (err) {
      error.value = `Unable to stop recording: ${err.message}`
      cleanupCaptureStreams()
      // Ending all capture tracks also causes the recorder to flush and stop.
    }
  }
}

async function handleRecordingStop() {
  if (unmounted || recordedBlob.value || finalizing) return
  finalizing = true
  if (!stopRequested && !error.value) {
    error.value = 'The browser stopped recording unexpectedly. Download the video captured so far.'
  }
  stopRequested = true
  isProcessing.value = true
  saveFailed.value = false
  stopTimer()
  isRecording.value = false
  isPaused.value = false
  cleanupCaptureStreams()
  // Release input devices and decoders, not just the mixed destination track.
  for (const stream of [micStream.value, cameraStream.value]) {
    stream?.getTracks().forEach(track => track.stop())
  }
  micStream.value = null
  cameraStream.value = null
  micEnabled.value = false
  cameraEnabled.value = false

  try {
    const mime = activeMimeType.value || 'video/webm'
    const blob = await recordingBuffer.finish(mime)
    if (unmounted) return
    if (!blob.size) throw new Error('The browser did not capture any video.')
    recordedBlob.value = blob
    recordedVideoUrl.value = URL.createObjectURL(blob)
    hasDownloaded.value = false
    frozenDownloadName.value = `${props.filename}-${new Date().toISOString().slice(0, 10)}.${fileExtensionForMime(mime)}`
    showDownloadPrompt.value = true
    emit('recording-complete', {
      blob,
      url: recordedVideoUrl.value,
      duration: elapsedTime.value,
      size: blob.size,
      mimeType: mime
    })
    nextTick(() => {
      if (!unmounted) downloadRecording({ auto: true })
    })
  } catch (err) {
    saveFailed.value = true
    error.value = `Could not prepare your video: ${err.message}. Keep this page open and retry.`
  } finally {
    finalizing = false
    isProcessing.value = false
  }
}

// Download recording
function downloadRecording(options = {}) {
  if (!recordedBlob.value) return

  const url = recordedVideoUrl.value
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = downloadFileName.value
  document.body.appendChild(a)
  a.click()

  // Only mark success on an explicit click (auto may be blocked silently)
  if (!options.auto) {
    hasDownloaded.value = true
  }

  setTimeout(() => {
    document.body.removeChild(a)
  }, 1000)
}

function dismissDownloadPrompt() {
  showDownloadPrompt.value = false
}

// Upload recording
async function uploadRecording() {
  if (!recordedBlob.value || !props.allowUpload) return

  try {
    isUploading.value = true
    error.value = null

    const ext = downloadExtension.value
    const formData = new FormData()
    formData.append('recording', recordedBlob.value, `${props.filename}.${ext}`)
    formData.append('duration', elapsedTime.value)
    formData.append('size', recordedBlob.value.size)
    formData.append('mimeType', activeMimeType.value || recordedBlob.value.type || '')

    const response = await fetch(props.uploadEndpoint, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const result = await response.json()
    emit('upload-complete', result)
  } catch (err) {
    console.error('Upload error:', err)
    error.value = `Upload failed: ${err.message}`
  } finally {
    isUploading.value = false
  }
}

// Discard recording
async function discardRecording() {
  if (isProcessing.value || isUploading.value) return
  isProcessing.value = true
  if (recordedVideoUrl.value) {
    URL.revokeObjectURL(recordedVideoUrl.value)
  }

  recordedVideoUrl.value = null
  recordedBlob.value = null
  activeMimeType.value = ''
  showDownloadPrompt.value = false
  hasDownloaded.value = false
  frozenDownloadName.value = ''
  elapsedTime.value = 0
  saveFailed.value = false
  error.value = null
  try {
    await recordingBuffer?.dispose()
  } catch (_) {
    error.value = 'The temporary recording could not be removed from browser storage.'
  } finally {
    recordingBuffer = null
    mediaRecorder.value = null
    isProcessing.value = false
  }
}

// Timer functions
function startTimer() {
  stopTimer()
  startTime.value = Date.now() - elapsedTime.value
  timerInterval.value = setInterval(() => {
    elapsedTime.value = Date.now() - startTime.value
  }, 1000)
}

function stopTimer() {
  if (timerInterval.value) {
    elapsedTime.value = Date.now() - startTime.value
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

// Watch for camera stream changes and connect to video element
watch(cameraStream, async (newStream) => {
  if (newStream && cameraPreview.value) {
    await nextTick()
    cameraPreview.value.srcObject = newStream
  } else if (!newStream && cameraPreview.value) {
    cameraPreview.value.srcObject = null
  }
})

// Let parent keep UI mounted while recording / preview is active
watch(
  [isStarting, isRecording, isPaused, isProcessing, saveFailed, recordedVideoUrl],
  (states) => {
    emit('active-change', states.some(Boolean))
  },
  { immediate: true }
)

function warnBeforeLeaving(event) {
  if (isStarting.value || isRecording.value || isPaused.value || isProcessing.value || saveFailed.value || (recordedBlob.value && !hasDownloaded.value)) {
    event.preventDefault()
    event.returnValue = ''
  }
}
window.addEventListener('beforeunload', warnBeforeLeaving)

// Cleanup on unmount
onUnmounted(() => {
  unmounted = true
  window.removeEventListener('beforeunload', warnBeforeLeaving)
  stopTimer()

  if (mediaRecorder.value) {
    mediaRecorder.value.onstop = null
    mediaRecorder.value.ondataavailable = null
    mediaRecorder.value.onerror = null
    if (mediaRecorder.value.state !== 'inactive') {
      try { mediaRecorder.value.stop() } catch (_) {}
    }
  }

  cleanupCaptureStreams()
  void recordingBuffer?.dispose().catch(() => {})

  if (micStream.value) {
    micStream.value.getTracks().forEach((track) => track.stop())
  }
  if (cameraStream.value) {
    cameraStream.value.getTracks().forEach((track) => track.stop())
  }

  if (recordedVideoUrl.value) {
    URL.revokeObjectURL(recordedVideoUrl.value)
  }
})
</script>

<style scoped>
.assignment-tools {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.assignment-tools.embedded {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  margin-bottom: 0;
}

.assignment-tools.embedded .action-buttons-row,
.assignment-tools.embedded .av-settings-row {
  flex-direction: column;
}

.tools-header h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.tools-help {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.tools-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Action Buttons Row */
.action-buttons-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

/* Tool Sections */
.tool-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.tool-hint {
  color: var(--text-muted);
  font-size: 0.8125rem;
  margin: 0;
  padding-left: 0.25rem;
}

/* Audio/Video Settings Row */
.av-settings-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.av-setting {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
  flex: 1;
}

/* Buttons */
.btn-record,
.btn-stop,
.btn-pause,
.btn-resume,
.btn-download,
.btn-upload,
.btn-discard {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-record {
  background: var(--primary);
  color: white;
}

.btn-record:hover:not(:disabled) {
  filter: brightness(1.1);
}

.btn-record:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-stop {
  background: #dc3545;
  color: white;
}

.btn-stop:hover {
  background: #c82333;
}

.btn-pause {
  background: #ffc107;
  color: #000;
}

.btn-pause:hover {
  background: #e0a800;
}

.btn-resume {
  background: #28a745;
  color: white;
}

.btn-resume:hover {
  background: #218838;
}

.btn-download {
  background: var(--primary);
  color: white;
}

.btn-download:hover {
  filter: brightness(1.1);
}

.btn-download-primary {
  flex: 1 1 100%;
  justify-content: center;
  padding: 1rem 1.5rem;
  font-size: 1.0625rem;
  font-weight: 600;
}

.download-hint {
  margin: 0.75rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--text-secondary);
}

.download-prompt-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(15, 23, 42, 0.72);
}

.download-prompt-card {
  width: min(28rem, 100%);
  padding: 1.75rem 1.5rem;
  border-radius: 0.75rem;
  background: var(--bg-card, #fff);
  color: var(--text-primary, #111);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  text-align: center;
}

.download-prompt-card h2 {
  margin: 0 0 0.75rem;
  font-size: 1.375rem;
}

.download-prompt-lead,
.download-prompt-warn {
  margin: 0 0 1rem;
  font-size: 0.9375rem;
  line-height: 1.45;
  color: var(--text-secondary, #444);
}

.download-prompt-file {
  margin: 0 0 1.25rem;
  font-size: 0.875rem;
  color: var(--text-secondary, #444);
}

.download-prompt-file code {
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0.2rem 0.45rem;
  border-radius: 0.25rem;
  background: var(--bg-elevated, #f3f4f6);
  font-size: 0.8125rem;
  word-break: break-all;
}

.btn-download-hero {
  width: 100%;
  justify-content: center;
  padding: 1.1rem 1.25rem;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.download-prompt-warn {
  margin-bottom: 1.25rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: #fff7ed;
  color: #9a3412;
  border: 1px solid #fed7aa;
}

.btn-download-dismiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid var(--border, #d1d5db);
  border-radius: 0.5rem;
  background: transparent;
  color: var(--text-secondary, #555);
  font-size: 0.875rem;
  cursor: pointer;
}

.btn-download-dismiss:hover {
  background: var(--bg-elevated, #f9fafb);
}

.btn-upload {
  background: #17a2b8;
  color: white;
}

.btn-upload:hover:not(:disabled) {
  background: #138496;
}

.btn-upload:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-discard {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.btn-discard:hover {
  background: var(--bg-elevated);
  border-color: var(--primary);
}

.btn-icon {
  font-size: 1.125rem;
}

/* Audio/Video Toggle */
.av-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.av-toggle input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: var(--primary);
}

.toggle-icon {
  font-size: 1.25rem;
}

.toggle-label {
  font-weight: 500;
  color: var(--text-primary);
}

.toggle-hint {
  margin: 0.5rem 0 0 2rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

/* Camera Preview Bubble */
.camera-preview-bubble {
  margin-top: 1rem;
  width: 160px;
  height: 120px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid var(--primary);
  background: #000;
  position: relative;
}

.preview-video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Audio/Video Instructions */
.av-instructions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.instruction-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.instruction-icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}

.instruction-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.instruction-text strong {
  color: var(--primary);
  font-weight: 600;
}

/* Requesting Permission */
.av-requesting {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  border-radius: 0.375rem;
}

.requesting-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.requesting-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid #93c5fd;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.requesting-indicator p {
  margin: 0;
  font-size: 0.875rem;
  color: #1e40af;
}

/* Permission Denied Help */
.av-error-help {
  margin-top: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
}

.error-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #991b1b;
}

.error-icon {
  font-size: 1.125rem;
}

.error-details {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #991b1b;
  font-weight: 500;
}

.error-steps {
  margin: 0 0 0 1.5rem;
  padding: 0;
  font-size: 0.875rem;
  color: #7f1d1d;
  line-height: 1.6;
}

.error-steps li {
  margin-bottom: 0.375rem;
}

.error-steps strong {
  color: #991b1b;
  font-weight: 600;
}

/* Recording Status */
.recording-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--bg-elevated);
  border-radius: 0.5rem;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.recording-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.recording-indicator.pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.mic-indicator {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.mic-indicator.active {
  background: #dcfce7;
  border-color: #86efac;
  color: #166534;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.recording-timer {
  font-family: monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
}

.recording-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Processing */
.processing-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border-radius: 0.5rem;
  color: var(--text-primary);
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Video Preview */
.video-preview {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.video-preview h4 {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.preview-video {
  width: 100%;
  max-height: 400px;
  border-radius: 0.5rem;
  background: #000;
  margin-bottom: 1rem;
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Error */
.recorder-error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.btn-dismiss {
  background: none;
  border: none;
  color: #721c24;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.btn-dismiss:hover {
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .assignment-tools {
    padding: 1rem;
  }

  .action-buttons-row {
    flex-direction: column;
  }

  .av-settings-row {
    flex-direction: column;
  }

  .status-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .recording-status {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .recording-timer {
    align-self: flex-end;
  }

  .recording-actions,
  .preview-actions {
    flex-direction: column;
  }

  .recording-actions button,
  .preview-actions button {
    width: 100%;
  }
}
</style>
