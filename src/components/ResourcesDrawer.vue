<template>
  <div class="resources-drawer-container">
    <!-- Draggable Floating Toggle Button -->
    <button
      v-if="!isOpen"
      ref="toggleBtnRef"
      class="drawer-toggle-btn"
      :class="{
        'drawer-toggle-dragging': isDragging,
        'drawer-toggle-floating': position.edge === null
      }"
      :style="toggleButtonStyle"
      :title="'Assignment Tools & Resources — drag to move'"
      @mousedown.prevent="onTogglePointerDown($event, 'mouse')"
      @touchstart.prevent="onTogglePointerDown($event, 'touch')"
    >
      <span class="toggle-icon">🛠️</span>
      <span class="toggle-label">Tools</span>
    </button>
    <!-- Invisible overlay during drag to capture pointer events -->
    <div
      v-if="dragActive"
      class="drawer-drag-overlay"
      @mousemove="onDragMove($event, 'mouse')"
      @mouseup="onDragEnd($event, 'mouse')"
      @mouseleave="onDragEnd($event, 'mouse')"
      @touchmove.prevent="onDragMove($event, 'touch')"
      @touchend.prevent="onDragEnd($event, 'touch')"
      @touchcancel.prevent="onDragEnd($event, 'touch')"
    />

    <!-- Drawer Overlay -->
    <transition name="overlay-fade">
      <div
        v-if="isOpen"
        class="drawer-overlay"
        @click="closeDrawer"
      ></div>
    </transition>

    <!-- Drawer Panel -->
    <transition name="drawer-slide">
      <div v-if="isOpen" class="drawer-panel">
        <!-- Header -->
        <div class="drawer-header">
          <h2>📚 Resources</h2>
          <button class="close-btn" @click="closeDrawer" title="Close">×</button>
        </div>

        <!-- Content -->
        <div class="drawer-content">
          <!-- Assignment Tools Section -->
          <div v-if="showTools" class="drawer-section">
            <h3>🛠️ Assignment Tools</h3>
            <p class="section-desc">Tools to help you complete and submit your assignment</p>

            <div class="tools-grid">
              <!-- Pop Out Instructions - Always show -->
              <button
                class="tool-card"
                @click="popOutCurrentPage"
              >
                <span class="tool-icon">🔗</span>
                <div class="tool-info">
                  <div class="tool-title">Pop Out This Page</div>
                  <div class="tool-desc">View in separate window</div>
                </div>
              </button>

              <!-- Screen Recording -->
              <button
                v-if="showRecording"
                class="tool-card recording"
                @click="startRecording"
              >
                <span class="tool-icon">⏺</span>
                <div class="tool-info">
                  <div class="tool-title">Start Recording</div>
                  <div class="tool-desc">Capture your work</div>
                </div>
              </button>

              <!-- Microphone Toggle -->
              <div v-if="showRecording" class="tool-card toggle-card">
                <label class="toggle-label-wrapper">
                  <input type="checkbox" v-model="microphoneEnabled" />
                  <span class="tool-icon">🎤</span>
                  <div class="tool-info">
                    <div class="tool-title">Microphone: {{ microphoneEnabled ? 'ON' : 'OFF' }}</div>
                    <div class="tool-desc">Narrate your recording</div>
                  </div>
                </label>
              </div>

              <!-- Camera Toggle -->
              <div v-if="showRecording" class="tool-card toggle-card">
                <label class="toggle-label-wrapper">
                  <input type="checkbox" v-model="cameraEnabled" />
                  <span class="tool-icon">📹</span>
                  <div class="tool-info">
                    <div class="tool-title">Camera: {{ cameraEnabled ? 'ON' : 'OFF' }}</div>
                    <div class="tool-desc">Show yourself</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Datasets Section -->
          <div class="drawer-section">
            <h3>📊 Datasets</h3>
            <p class="section-desc">Download datasets for your assignments</p>

            <div class="tools-grid">
              <a
                v-for="dataset in datasets"
                :key="dataset.name"
                :href="dataset.url"
                :download="dataset.filename"
                class="tool-card dataset-card"
              >
                <span class="tool-icon">📄</span>
                <div class="tool-info">
                  <div class="tool-title">{{ dataset.name }}</div>
                  <div class="tool-desc">{{ dataset.description }}</div>
                </div>
                <span class="download-icon">⬇</span>
              </a>
            </div>
          </div>

          <!-- Software Links Section -->
          <div v-if="showSoftwareLinks" class="drawer-section">
            <h3>💻 Software</h3>
            <p class="section-desc">Install your statistical software</p>

            <div class="software-links">
              <a
                v-if="currentSoftware === 'jamovi'"
                href="https://www.jamovi.org/download.html"
                target="_blank"
                class="software-link"
              >
                <span class="software-icon">📊</span>
                <div class="software-info">
                  <div class="software-title">Install Jamovi</div>
                  <div class="software-desc">Download and install</div>
                </div>
                <span class="external-icon">↗</span>
              </a>
            </div>
          </div>

          <!-- Help Section -->
          <div class="drawer-section help-section">
            <h3>❓ Need Help?</h3>
            <div class="help-links">
              <button class="help-link" @click="goToSupport">
                <span>💬</span> Get Support
              </button>
              <button class="help-link" @click="goToFAQ">
                <span>📖</span> View FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const STORAGE_KEY = 'resources-drawer-position'
const DRAG_THRESHOLD = 6
const SNAP_THRESHOLD = 28
const BUTTON_WIDTH = 56
const BUTTON_HEIGHT = 72

const props = defineProps({
  // Context props
  currentLesson: {
    type: Object,
    default: null
  },
  currentExercise: {
    type: Object,
    default: null
  },
  currentSoftware: {
    type: String,
    default: 'jamovi'
  },
  // Content control
  showTools: {
    type: Boolean,
    default: true
  },
  showRecording: {
    type: Boolean,
    default: false
  },
  showSoftwareLinks: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['pop-out-instructions', 'start-recording'])

const route = useRoute()
const isOpen = ref(false)
const microphoneEnabled = ref(false)
const cameraEnabled = ref(false)

const toggleBtnRef = ref(null)
const position = ref(loadStoredPosition())
const dragActive = ref(false)
const dragStart = ref(null)
const isDragging = ref(false)

function loadStoredPosition() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { edge: 'right', top: null, left: null }
    const parsed = JSON.parse(raw)
    if (parsed && (parsed.edge === 'left' || parsed.edge === 'right' || parsed.edge === 'top' || parsed.edge === 'bottom')) {
      return { edge: parsed.edge, top: parsed.top ?? null, left: parsed.left ?? null }
    }
    if (parsed && typeof parsed.left === 'number' && typeof parsed.top === 'number') {
      return { edge: null, left: parsed.left, top: parsed.top }
    }
  } catch (_) {}
  return { edge: 'right', top: null, left: null }
}

function savePosition(pos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ edge: pos.edge, left: pos.left, top: pos.top }))
  } catch (_) {}
}

/** Snapped: sharp side on edge. Floating: fully rounded. */
const toggleButtonStyle = computed(() => {
  const p = position.value
  const base = { transition: 'border-radius 0.2s ease' }
  if (p.edge === 'right') {
    return {
      ...base,
      right: '1.5rem',
      left: 'auto',
      top: p.top != null ? `${p.top}px` : '50%',
      transform: p.top != null ? 'none' : 'translateY(-50%)',
      borderRadius: '0.75rem 0 0 0.75rem'
    }
  }
  if (p.edge === 'left') {
    return {
      ...base,
      left: '1.5rem',
      right: 'auto',
      top: p.top != null ? `${p.top}px` : '50%',
      transform: p.top != null ? 'none' : 'translateY(-50%)',
      borderRadius: '0 0.75rem 0.75rem 0'
    }
  }
  if (p.edge === 'top') {
    return {
      ...base,
      top: '1.5rem',
      left: p.left != null ? `${p.left}px` : '50%',
      transform: p.left != null ? 'none' : 'translateX(-50%)',
      borderRadius: '0.75rem 0.75rem 0 0'
    }
  }
  if (p.edge === 'bottom') {
    return {
      ...base,
      bottom: '1.5rem',
      top: 'auto',
      left: p.left != null ? `${p.left}px` : '50%',
      transform: p.left != null ? 'none' : 'translateX(-50%)',
      borderRadius: '0 0 0.75rem 0.75rem'
    }
  }
  if (p.left != null && p.top != null) {
    return {
      ...base,
      left: `${p.left}px`,
      top: `${p.top}px`,
      right: 'auto',
      bottom: 'auto',
      transform: 'none',
      borderRadius: '0.75rem'
    }
  }
  return {}
})

function getClientCoords(e, kind) {
  if (kind === 'touch') {
    const t = e.touches?.[0] ?? e.changedTouches?.[0]
    return t ? { x: t.clientX, y: t.clientY } : null
  }
  return { x: e.clientX, y: e.clientY }
}

function onTogglePointerDown(e, kind) {
  const coords = getClientCoords(e, kind)
  if (!coords || !toggleBtnRef.value) return
  const rect = toggleBtnRef.value.getBoundingClientRect()
  const p = position.value
  const left = p.edge === null && p.left != null ? p.left : rect.left
  const top = p.edge === null && p.top != null ? p.top : rect.top
  dragStart.value = { x: coords.x, y: coords.y, left, top }
  dragActive.value = true
  isDragging.value = false
}

function onDragMove(e, kind) {
  const coords = kind === 'touch' ? (e.touches?.[0] ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null) : { x: e.clientX, y: e.clientY }
  if (!coords || !dragStart.value) return
  const dx = coords.x - dragStart.value.x
  const dy = coords.y - dragStart.value.y
  if (!isDragging.value && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
    isDragging.value = true
    // Apply position via DOM so button doesn't jump; disables default right/top
    applyButtonPosition(toggleBtnRef.value, dragStart.value.left, dragStart.value.top)
  }
  if (!isDragging.value) return
  const w = typeof window !== 'undefined' ? window.innerWidth : 800
  const h = typeof window !== 'undefined' ? window.innerHeight : 600
  let left = dragStart.value.left + dx
  let top = dragStart.value.top + dy
  left = Math.max(0, Math.min(w - BUTTON_WIDTH, left))
  top = Math.max(0, Math.min(h - BUTTON_HEIGHT, top))
  dragStart.value = { ...dragStart.value, x: coords.x, y: coords.y, left, top }
  // Update position directly in DOM for immediate feedback (no Vue re-render)
  if (toggleBtnRef.value) applyButtonPosition(toggleBtnRef.value, left, top)
}

function applyButtonPosition(el, left, top) {
  if (!el) return
  el.style.left = `${left}px`
  el.style.top = `${top}px`
  el.style.right = 'auto'
  el.style.bottom = 'auto'
  el.style.transform = 'none'
}

function clearButtonPosition(el) {
  if (!el) return
  el.style.left = ''
  el.style.top = ''
  el.style.right = ''
  el.style.bottom = ''
  el.style.transform = ''
}

function computeSnappedPosition(left, top) {
  const w = typeof window !== 'undefined' ? window.innerWidth : 800
  const h = typeof window !== 'undefined' ? window.innerHeight : 600
  const distLeft = left
  const distRight = w - BUTTON_WIDTH - left
  const distTop = top
  const distBottom = h - BUTTON_HEIGHT - top
  if (distLeft <= SNAP_THRESHOLD && distLeft <= Math.min(distRight, distTop, distBottom)) {
    return { edge: 'left', left: null, top: Math.max(0, Math.min(h - BUTTON_HEIGHT, top)) }
  }
  if (distRight <= SNAP_THRESHOLD && distRight <= Math.min(distLeft, distTop, distBottom)) {
    return { edge: 'right', left: null, top: Math.max(0, Math.min(h - BUTTON_HEIGHT, top)) }
  }
  if (distTop <= SNAP_THRESHOLD && distTop <= Math.min(distLeft, distRight, distBottom)) {
    return { edge: 'top', left: Math.max(0, Math.min(w - BUTTON_WIDTH, left)), top: null }
  }
  if (distBottom <= SNAP_THRESHOLD && distBottom <= Math.min(distLeft, distRight, distTop)) {
    return { edge: 'bottom', left: Math.max(0, Math.min(w - BUTTON_WIDTH, left)), top: null }
  }
  return { edge: null, left, top }
}

function onDragEnd(e, kind) {
  if (!dragStart.value) return
  const wasDragging = isDragging.value
  const finalLeft = dragStart.value.left
  const finalTop = dragStart.value.top
  dragActive.value = false
  dragStart.value = null
  isDragging.value = false
  if (wasDragging) {
    position.value = computeSnappedPosition(finalLeft, finalTop)
    savePosition(position.value)
    clearButtonPosition(toggleBtnRef.value)
  } else {
    clearButtonPosition(toggleBtnRef.value)
    toggleDrawer()
  }
}

// Computed properties
const hasInstructions = computed(() => {
  return props.currentLesson?.phases?.iDo || props.currentExercise?.instructions
})

const datasets = computed(() => {
  // Always show standard datasets for all modules
  return [
    {
      name: 'BMI and Exercise Data',
      description: 'Body mass index and exercise habits',
      filename: 'bmi_exercise.omv',
      url: '/datasets/bmi_exercise.omv'
    },
    {
      name: 'Personality Data',
      description: 'Personality traits and demographics',
      filename: 'personality.omv',
      url: '/datasets/personality.omv'
    },
    {
      name: 'Normality Data',
      description: 'Dataset for testing statistical assumptions',
      filename: 'Normality data.csv',
      url: '/datasets/Normality data.csv'
    },
    {
      name: 'Sample Dataset 1',
      description: 'General practice dataset',
      filename: 'sample_data_1.csv',
      url: '/datasets/sample_data_1.csv'
    },
    {
      name: 'Sample Dataset 2',
      description: 'Additional practice data',
      filename: 'sample_data_2.csv',
      url: '/datasets/sample_data_2.csv'
    }
  ]
})

// Methods
function toggleDrawer() {
  isOpen.value = !isOpen.value
}

function closeDrawer() {
  isOpen.value = false
}

function popOutInstructions() {
  emit('pop-out-instructions')
}

function popOutCurrentPage() {
  // Open current page in a new window
  const currentUrl = window.location.href
  const width = 1000
  const height = 800
  const left = (window.screen.width - width) / 2
  const top = (window.screen.height - height) / 2

  window.open(
    currentUrl,
    'PopOutInstructions',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  )
  closeDrawer()
}

function startRecording() {
  emit('start-recording')
  closeDrawer()
}

function goToSupport() {
  // Navigate to support page or open support dialog
  console.log('Go to support')
}

function goToFAQ() {
  // Navigate to FAQ page
  console.log('Go to FAQ')
}

// Close drawer when route changes
watch(() => route.path, () => {
  isOpen.value = false
})

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeDrawer()
  }
})
</script>

<style scoped>
.resources-drawer-container {
  position: relative;
  z-index: 1000;
}

/* Floating Toggle Button */
.drawer-toggle-btn {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.75rem 0 0 0.75rem;
  box-shadow: -2px 2px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}

/* No transition during drag so position updates feel instant */
.drawer-toggle-btn.drawer-toggle-dragging {
  transition: none !important;
}

.drawer-toggle-btn:hover {
  transform: translateY(-50%) translateX(-4px);
}
.drawer-toggle-btn.drawer-toggle-floating:hover {
  transform: translateX(-4px);
}

/* Invisible overlay during drag */
.drawer-drag-overlay {
  position: fixed;
  inset: 0;
  z-index: 1001;
  cursor: grabbing;
}

.toggle-icon {
  font-size: 1.5rem;
}

.toggle-label {
  font-size: 0.75rem;
  font-weight: 600;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* Overlay */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  backdrop-filter: blur(2px);
}

/* Drawer Panel */
.drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 90vw;
  height: 100vh;
  background: var(--bg-card);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.2);
  z-index: 1002;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-elevated);
}

.drawer-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  font-size: 1.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--bg-card);
  color: var(--text-primary);
}

/* Content */
.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.drawer-section {
  margin-bottom: 2rem;
}

.drawer-section h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.section-desc {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Tools Grid */
.tools-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tool-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.tool-card:hover {
  border-color: var(--primary);
  transform: translateX(-4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tool-card.recording {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-color: transparent;
}

.tool-card.recording:hover {
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.tool-card.toggle-card {
  cursor: default;
}

.toggle-label-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  cursor: pointer;
}

.toggle-label-wrapper input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.tool-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tool-info {
  flex: 1;
}

.tool-title {
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 0.125rem;
}

.tool-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.tool-card.recording .tool-desc {
  color: rgba(255, 255, 255, 0.9);
}

.tool-card.dataset-card {
  text-decoration: none;
  color: inherit;
}

.tool-card.dataset-card .download-icon {
  font-size: 1.25rem;
  color: var(--primary);
  flex-shrink: 0;
}

/* Datasets List */
.datasets-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dataset-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.dataset-card:hover {
  border-color: var(--primary);
  transform: translateX(-4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dataset-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.dataset-info {
  flex: 1;
}

.dataset-title {
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 0.125rem;
}

.dataset-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.download-icon {
  font-size: 1.25rem;
  color: var(--primary);
}

/* Software Links */
.software-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.software-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.software-link:hover {
  border-color: var(--primary);
  transform: translateX(-4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.software-icon {
  font-size: 1.5rem;
}

.software-info {
  flex: 1;
}

.software-title {
  font-weight: 600;
  font-size: 0.9375rem;
  margin-bottom: 0.125rem;
}

.software-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.external-icon {
  font-size: 1.25rem;
  color: var(--text-secondary);
}

/* Help Section */
.help-section {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
}

.help-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.help-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9375rem;
}

.help-link:hover {
  background: var(--bg-elevated);
  border-color: var(--primary);
}

/* Animations */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .drawer-panel {
    width: 100%;
    max-width: 100%;
  }

  .drawer-toggle-btn {
    right: 1rem;
  }
}
</style>
