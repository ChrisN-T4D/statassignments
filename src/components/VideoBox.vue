<template>
  <div class="video-box">
    <div v-if="title" class="video-title">{{ title }}</div>

    <!-- YouTube iframe (primary) -->
    <div v-if="useYoutube && !youtubeError" class="video-wrapper">
      <iframe
        ref="youtubeFrame"
        :src="youtubeEmbedUrl"
        :title="title || 'Video tutorial'"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        @load="onYoutubeLoad"
        @error="onYoutubeError"
      ></iframe>

      <div v-if="loading" class="video-loading">
        <div class="spinner"></div>
        <p>Loading video...</p>
      </div>
    </div>

    <!-- Local video fallback -->
    <div v-else-if="backupSrc || localSrc" class="video-wrapper">
      <video
        v-if="!isGif"
        :controls="controls"
        :autoplay="autoplay"
        :loop="loop"
        playsinline
      >
        <source :src="backupSrc || localSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <img v-else :src="localSrc" :alt="title || 'Tutorial animation'" />
    </div>

    <!-- Error state -->
    <div v-else-if="youtubeError" class="video-error">
      <p>⚠️ Unable to load video from YouTube.</p>
      <p v-if="!backupSrc" class="error-message">No backup video available.</p>
    </div>

    <!-- Controls -->
    <div v-if="backupSrc && showBackupToggle && !youtubeError" class="video-controls">
      <button @click="toggleSource" class="toggle-btn">
        {{ useYoutube ? '📥 Watch Offline Version' : '🌐 Watch on YouTube' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  youtubeId: {
    type: String,
    default: null
  },
  backupSrc: {
    type: String,
    default: null
  },
  localSrc: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  startTime: {
    type: Number,
    default: 0
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  loop: {
    type: Boolean,
    default: false
  },
  controls: {
    type: Boolean,
    default: true
  },
  showBackupToggle: {
    type: Boolean,
    default: true
  }
})

const youtubeFrame = ref(null)
const loading = ref(true)
const youtubeError = ref(false)
const useYoutube = ref(true)
const loadTimeout = ref(null)

// Check if local source is a GIF
const isGif = computed(() => {
  const src = props.localSrc || ''
  return src.toLowerCase().endsWith('.gif')
})

// Build YouTube embed URL with parameters
const youtubeEmbedUrl = computed(() => {
  if (!props.youtubeId) return ''

  const params = new URLSearchParams({
    rel: '0', // Don't show related videos from other channels
    modestbranding: '1', // Minimal YouTube branding
    start: props.startTime.toString()
  })

  if (props.autoplay) params.append('autoplay', '1')
  if (props.loop) {
    params.append('loop', '1')
    params.append('playlist', props.youtubeId) // Required for loop
  }

  return `https://www.youtube.com/embed/${props.youtubeId}?${params.toString()}`
})

// Check localStorage for user preference
onMounted(() => {
  if (props.youtubeId && props.backupSrc) {
    try {
      const preference = localStorage.getItem('videoSource')
      if (preference === 'local') {
        useYoutube.value = false
        loading.value = false
      }
    } catch (err) {
      console.warn('Unable to read video preference:', err)
    }
  }

  // Set timeout for YouTube load
  if (props.youtubeId && useYoutube.value) {
    loadTimeout.value = setTimeout(() => {
      if (loading.value) {
        console.warn('YouTube video timed out, switching to backup')
        onYoutubeError()
      }
    }, 5000) // 5 second timeout
  } else {
    loading.value = false
  }
})

function onYoutubeLoad() {
  loading.value = false
  if (loadTimeout.value) {
    clearTimeout(loadTimeout.value)
    loadTimeout.value = null
  }
}

function onYoutubeError() {
  loading.value = false
  youtubeError.value = true

  // Auto-switch to backup if available
  if (props.backupSrc) {
    console.log('Switching to backup video')
    useYoutube.value = false
    youtubeError.value = false
  }

  if (loadTimeout.value) {
    clearTimeout(loadTimeout.value)
    loadTimeout.value = null
  }
}

function toggleSource() {
  useYoutube.value = !useYoutube.value
  loading.value = useYoutube.value
  youtubeError.value = false

  // Save preference
  try {
    localStorage.setItem('videoSource', useYoutube.value ? 'youtube' : 'local')
  } catch (err) {
    console.warn('Unable to save video preference:', err)
  }

  // Reset timeout for YouTube
  if (useYoutube.value && props.youtubeId) {
    loadTimeout.value = setTimeout(() => {
      if (loading.value) {
        onYoutubeError()
      }
    }, 5000)
  }
}

// Watch for prop changes
watch(() => props.youtubeId, () => {
  loading.value = true
  youtubeError.value = false
  if (props.youtubeId) {
    useYoutube.value = true
  }
})
</script>

<style scoped>
.video-box {
  background: var(--bg-elevated);
  border-radius: 0.5rem;
  border-left: 4px solid var(--primary);
  padding: 1rem;
  margin: 1.5rem 0;
}

.video-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background: var(--bg-main);
  border-radius: 0.375rem;
  overflow: hidden;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-main);
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.video-error {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-main);
  border-radius: 0.375rem;
}

.video-error .error-message {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.video-controls {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}

.toggle-btn {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: var(--bg-elevated);
  border-color: var(--primary);
  color: var(--primary);
}

/* Responsive */
@media (max-width: 768px) {
  .video-box {
    padding: 0.75rem;
  }

  .toggle-btn {
    font-size: 0.8125rem;
    padding: 0.4rem 0.75rem;
  }
}
</style>
