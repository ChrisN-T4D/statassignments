<template>
  <div class="assignment-tools">
    <div class="tools-header">
      <h3>🎯 Assignment Tools</h3>
      <p class="tools-help">Tools to help you complete and submit your assignment</p>
    </div>

    <div class="tools-controls">
      <!-- Not Recording State -->
      <template v-if="!isRecording && !isPaused">
        <!-- Action Buttons Row (Side by Side) -->
        <div class="action-buttons-row">
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
              :disabled="isProcessing"
            >
              <span class="btn-icon">⏺</span>
              Start Recording
            </button>
            <p class="tool-hint">
              You'll be asked to select what to record (entire screen, window, or browser tab)
            </p>
          </div>
        </div>

        <!-- Audio/Video Settings Row (Below Action Buttons) -->
        <div class="av-settings-row">
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
            v-if="isRecording"
            @click="pauseRecording"
            class="btn-pause"
          >
            <span class="btn-icon">⏸</span>
            Pause
          </button>
          <button
            v-if="isPaused"
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

      <!-- Processing State -->
      <div v-if="isProcessing" class="processing-status">
        <span class="spinner"></span>
        Processing your recording...
      </div>

      <!-- Recorded Video Preview -->
      <div v-if="recordedVideoUrl && !isRecording" class="video-preview">
        <h4>Your Recording:</h4>
        <video
          :src="recordedVideoUrl"
          controls
          class="preview-video"
        ></video>

        <div class="preview-actions">
          <button @click="downloadRecording" class="btn-download">
            <span class="btn-icon">💾</span>
            Download Recording
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
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="recorder-error">
      <strong>⚠️ Error:</strong> {{ error }}
      <button @click="error = null" class="btn-dismiss">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, watch, nextTick } from 'vue'
import PopOutButton from './PopOutButton.vue'

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
  }
})

const emit = defineEmits(['recording-complete', 'upload-complete'])

// Recording state
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
const recordedChunks = ref([])
const recordedVideoUrl = ref(null)
const recordedBlob = ref(null)

// Canvas compositing for camera overlay
const compositeCanvas = ref(null)
const compositeContext = ref(null)
const compositeAnimationFrame = ref(null)

// Timer
const startTime = ref(0)
const elapsedTime = ref(0)
const timerInterval = ref(null)

// Computed
const formattedTime = computed(() => {
  const seconds = Math.floor(elapsedTime.value / 1000)
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

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
function combineAudioStreams(screenStream, microphoneStream) {
  const audioContext = new AudioContext()
  const destination = audioContext.createMediaStreamDestination()

  // Add screen audio if available
  const screenAudioTracks = screenStream.getAudioTracks()
  if (screenAudioTracks.length > 0) {
    const screenSource = audioContext.createMediaStreamSource(
      new MediaStream(screenAudioTracks)
    )
    screenSource.connect(destination)
  }

  // Add microphone audio
  if (microphoneStream) {
    const micSource = audioContext.createMediaStreamSource(microphoneStream)
    micSource.connect(destination)
  }

  return destination.stream.getAudioTracks()[0]
}

// Create composite stream with camera overlay
function createCompositeStream(screenStream, cameraVideoStream) {
  // Create canvas for compositing
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Create video elements for screen and camera
  const screenVideo = document.createElement('video')
  screenVideo.srcObject = screenStream
  screenVideo.play()

  const cameraVideo = document.createElement('video')
  cameraVideo.srcObject = cameraVideoStream
  cameraVideo.play()

  // Wait for video metadata to set canvas size
  screenVideo.onloadedmetadata = () => {
    canvas.width = screenVideo.videoWidth
    canvas.height = screenVideo.videoHeight

    compositeCanvas.value = canvas
    compositeContext.value = ctx

    // Camera bubble dimensions (bottom-right corner, 20% of screen width)
    const bubbleWidth = Math.floor(canvas.width * 0.2)
    const bubbleHeight = Math.floor(bubbleWidth * 0.75) // 4:3 aspect ratio
    const bubblePadding = 20
    const bubbleX = canvas.width - bubbleWidth - bubblePadding
    const bubbleY = canvas.height - bubbleHeight - bubblePadding

    // Animation loop to composite frames
    function drawFrame() {
      // Draw screen capture
      ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height)

      // Draw camera bubble with rounded corners and border
      if (cameraVideo.readyState >= 2) {
        // Save context state
        ctx.save()

        // Create rounded rectangle path
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

        // Draw camera feed
        ctx.drawImage(cameraVideo, bubbleX, bubbleY, bubbleWidth, bubbleHeight)

        // Restore context
        ctx.restore()

        // Draw border
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

      compositeAnimationFrame.value = requestAnimationFrame(drawFrame)
    }

    drawFrame()
  }

  // Return canvas stream
  return canvas.captureStream(30) // 30 fps
}

// Start recording
async function startRecording() {
  try {
    error.value = null

    // Request screen capture
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: 'always',
        displaySurface: 'monitor' // Can be 'monitor', 'window', 'application', or 'browser'
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    })

    // Determine final video stream (with or without camera overlay)
    let videoStream = screenStream

    if (cameraEnabled.value && cameraStream.value) {
      // Create composite stream with camera bubble overlay
      videoStream = createCompositeStream(screenStream, cameraStream.value)
    }

    // Combine audio streams if microphone is enabled
    let finalStream = videoStream

    if (micEnabled.value && micStream.value) {
      // Create a new MediaStream with video and combined audio
      const videoTrack = videoStream.getVideoTracks()[0]
      const combinedAudioTrack = combineAudioStreams(screenStream, micStream.value)

      finalStream = new MediaStream([videoTrack, combinedAudioTrack])
    }

    mediaStream.value = finalStream
    recordedChunks.value = []

    // Create MediaRecorder
    const options = {
      mimeType: getSupportedMimeType(),
      videoBitsPerSecond: 2500000 // 2.5 Mbps
    }

    mediaRecorder.value = new MediaRecorder(finalStream, options)

    // Handle data available
    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordedChunks.value.push(event.data)
      }
    }

    // Handle stop
    mediaRecorder.value.onstop = handleRecordingStop

    // Handle stream end (user stops sharing)
    finalStream.getVideoTracks()[0].addEventListener('ended', () => {
      if (isRecording.value) {
        stopRecording()
      }
    })

    // Start recording
    mediaRecorder.value.start(100) // Collect data every 100ms
    isRecording.value = true

    // Start timer
    startTime.value = Date.now()
    startTimer()

  } catch (err) {
    console.error('Error starting recording:', err)
    if (err.name === 'NotAllowedError') {
      error.value = 'Permission denied. Please allow screen recording to continue.'
    } else if (err.name === 'NotSupportedError') {
      error.value = 'Screen recording is not supported in your browser. Try Chrome, Edge, or Firefox.'
    } else {
      error.value = `Failed to start recording: ${err.message}`
    }
  }
}

// Pause recording
function pauseRecording() {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.pause()
    isRecording.value = false
    isPaused.value = true
    stopTimer()
  }
}

// Resume recording
function resumeRecording() {
  if (mediaRecorder.value && isPaused.value) {
    mediaRecorder.value.resume()
    isPaused.value = false
    isRecording.value = true
    startTimer()
  }
}

// Stop recording
function stopRecording() {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
    isPaused.value = false
    stopTimer()

    // Stop composite animation if running
    if (compositeAnimationFrame.value) {
      cancelAnimationFrame(compositeAnimationFrame.value)
      compositeAnimationFrame.value = null
    }

    // Stop all tracks
    if (mediaStream.value) {
      mediaStream.value.getTracks().forEach(track => track.stop())
    }

    // Clean up canvas
    compositeCanvas.value = null
    compositeContext.value = null
  }
}

// Handle recording stop
function handleRecordingStop() {
  isProcessing.value = true

  // Create blob from chunks
  const blob = new Blob(recordedChunks.value, {
    type: getSupportedMimeType()
  })

  recordedBlob.value = blob
  recordedVideoUrl.value = URL.createObjectURL(blob)

  isProcessing.value = false

  emit('recording-complete', {
    blob,
    url: recordedVideoUrl.value,
    duration: elapsedTime.value,
    size: blob.size
  })
}

// Download recording
function downloadRecording() {
  if (!recordedBlob.value) return

  const url = URL.createObjectURL(recordedBlob.value)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = `${props.filename}-${new Date().toISOString().slice(0, 10)}.webm`
  document.body.appendChild(a)
  a.click()

  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

// Upload recording
async function uploadRecording() {
  if (!recordedBlob.value || !props.allowUpload) return

  try {
    isUploading.value = true
    error.value = null

    const formData = new FormData()
    formData.append('recording', recordedBlob.value, `${props.filename}.webm`)
    formData.append('duration', elapsedTime.value)
    formData.append('size', recordedBlob.value.size)

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

    // Optionally clear the recording after successful upload
    // discardRecording()

  } catch (err) {
    console.error('Upload error:', err)
    error.value = `Upload failed: ${err.message}`
  } finally {
    isUploading.value = false
  }
}

// Discard recording
function discardRecording() {
  if (recordedVideoUrl.value) {
    URL.revokeObjectURL(recordedVideoUrl.value)
  }

  recordedVideoUrl.value = null
  recordedBlob.value = null
  recordedChunks.value = []
  elapsedTime.value = 0
  error.value = null
}

// Timer functions
function startTimer() {
  timerInterval.value = setInterval(() => {
    elapsedTime.value = Date.now() - startTime.value
  }, 100)
}

function stopTimer() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
}

// Get supported MIME type
function getSupportedMimeType() {
  const types = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4'
  ]

  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type
    }
  }

  return 'video/webm'
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

// Cleanup on unmount
onUnmounted(() => {
  stopTimer()

  // Stop composite animation
  if (compositeAnimationFrame.value) {
    cancelAnimationFrame(compositeAnimationFrame.value)
  }

  // Stop all streams
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach(track => track.stop())
  }
  if (micStream.value) {
    micStream.value.getTracks().forEach(track => track.stop())
  }
  if (cameraStream.value) {
    cameraStream.value.getTracks().forEach(track => track.stop())
  }

  // Clean up URLs
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
