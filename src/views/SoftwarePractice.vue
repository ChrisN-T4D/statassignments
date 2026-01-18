<template>
  <div class="software-practice-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <router-link to="/" class="back-link">← Back to Topics</router-link>
        <h1>{{ topicTitle }} Practice</h1>
        <p>Practice until you get it right. Take your time and retry as many times as needed.</p>
      </div>

      <!-- Software Selection -->
      <div class="software-selector">
        <button
          v-for="sw in availableSoftware"
          :key="sw.id"
          class="software-btn"
          :class="{ active: selectedSoftware === sw.id }"
          :style="{ '--sw-color': sw.color }"
          @click="selectSoftware(sw.id)"
        >
          {{ sw.name }}
        </button>
      </div>

      <!-- Progress Bar -->
      <div v-if="progress.total > 0" class="progress-section">
        <div class="progress-header">
          <span>Your Progress</span>
          <span class="progress-count">{{ progress.completed }} / {{ progress.total }} completed</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${(progress.completed / progress.total) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Exercise List or Current Exercise -->
      <div v-if="!currentExercise && !loading" class="exercise-list">
        <div
          v-for="exercise in progress.exercises"
          :key="exercise.id"
          class="exercise-card"
          :class="{
            completed: exercise.isCompleted,
            locked: !exercise.isUnlocked,
            current: exercise.isCurrent
          }"
          @click="exercise.isUnlocked && startExercise(exercise)"
        >
          <div class="exercise-status">
            <span v-if="exercise.isCompleted" class="status-icon completed">✓</span>
            <span v-else-if="!exercise.isUnlocked" class="status-icon locked">🔒</span>
            <span v-else class="status-icon current">→</span>
          </div>
          <div class="exercise-info">
            <h3>{{ exercise.title }}</h3>
            <p>{{ exercise.description }}</p>
          </div>
          <div class="exercise-meta">
            <span class="software-tag" :class="exercise.software_type">
              {{ getSoftwareName(exercise.software_type) }}
            </span>
          </div>
        </div>

        <div v-if="progress.exercises.length === 0" class="empty-state">
          <p>No practice exercises available for this combination yet.</p>
          <p class="hint-text">Try selecting a different software or check back later.</p>
        </div>
      </div>

      <!-- Active Exercise -->
      <div v-else-if="currentExercise" class="exercise-container">
        <!-- Exercise Header -->
        <div class="exercise-header">
          <div class="exercise-title">
            <h2>{{ currentExercise.title }}</h2>
            <span class="attempt-badge" v-if="attemptCount > 0">
              Attempt #{{ attemptCount }}
            </span>
          </div>
          <button class="btn-exit" @click="exitExercise">Exit Exercise</button>
        </div>

        <!-- Simulator Component -->
        <component
          :is="getSimulatorComponent(currentExercise.software_type)"
          :task="currentExercise"
          ref="simulatorRef"
          @correct="handleCorrect"
          @incorrect="handleIncorrect"
        />

        <!-- Mastery Celebration -->
        <div v-if="isCorrect" class="mastery-celebration">
          <div class="celebration-content">
            <div class="celebration-icon">🎉</div>
            <h3>Mastered!</h3>
            <p>Great job! You've completed this exercise.</p>
            <div class="celebration-stats">
              <span>Attempts: {{ attemptCount }}</span>
              <span v-if="hintUsed">Hint used</span>
            </div>
            <div class="celebration-actions">
              <button class="btn-primary" @click="loadNextExercise">
                Next Exercise →
              </button>
              <button class="btn-secondary" @click="retryExercise">
                Practice Again
              </button>
            </div>
          </div>
        </div>

        <!-- Retry Encouragement (after incorrect) -->
        <div v-if="showRetryPrompt" class="retry-prompt">
          <p>Don't give up! Think about what the question is asking and try again.</p>
          <button class="btn-retry" @click="resetForRetry">
            Try Again
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading exercises...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, shallowRef, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { topics, software } from '../data/topics.js'
import { useSimulation } from '../composables/useSimulation'
import { useAuth } from '../composables/useAuth'

// Async load simulator components
const JamoviSimulator = defineAsyncComponent(() =>
  import('../components/simulators/JamoviSimulator.vue')
)
const SPSSSimulator = defineAsyncComponent(() =>
  import('../components/simulators/SPSSSimulator.vue')
)
const RCodeEditor = defineAsyncComponent(() =>
  import('../components/simulators/RCodeEditor.vue')
)
const StataCodeEditor = defineAsyncComponent(() =>
  import('../components/simulators/StataCodeEditor.vue')
)

const route = useRoute()
const { isAuthenticated } = useAuth()
const {
  currentExercise,
  attemptCount,
  isCorrect,
  loading,
  hintUsed,
  fetchExercise,
  recordAttempt,
  resetExercise,
  getSimulationProgress,
  getNextExercise
} = useSimulation()

// State
const selectedSoftware = ref('jamovi')
const progress = ref({ completed: 0, total: 0, exercises: [] })
const showRetryPrompt = ref(false)
const simulatorRef = shallowRef(null)

// Computed
const topicId = computed(() => route.params.topicId || route.params.id)

const topicTitle = computed(() => {
  const topic = topics.find(t => t.id === topicId.value)
  return topic?.title || 'Practice'
})

const availableSoftware = computed(() => software)

// Methods
function getSoftwareName(id) {
  return software.find(s => s.id === id)?.name || id
}

function getSimulatorComponent(softwareType) {
  const components = {
    jamovi: JamoviSimulator,
    spss: SPSSSimulator,
    r: RCodeEditor,
    stata: StataCodeEditor,
    excel: SPSSSimulator // Use SPSS-like interface for Excel for now
  }
  return components[softwareType] || JamoviSimulator
}

async function selectSoftware(swId) {
  selectedSoftware.value = swId
  currentExercise.value = null
  await loadProgress()
}

async function loadProgress() {
  progress.value = await getSimulationProgress(topicId.value, selectedSoftware.value)
}

async function startExercise(exercise) {
  showRetryPrompt.value = false
  await fetchExercise(exercise.id)
}

async function loadNextExercise() {
  showRetryPrompt.value = false
  const next = await getNextExercise(topicId.value, selectedSoftware.value)
  if (!next) {
    // All exercises completed
    currentExercise.value = null
    await loadProgress()
  }
}

function exitExercise() {
  currentExercise.value = null
  showRetryPrompt.value = false
  loadProgress()
}

async function handleCorrect() {
  await recordAttempt(true)
  await loadProgress()
}

async function handleIncorrect() {
  await recordAttempt(false)
  showRetryPrompt.value = true
}

function resetForRetry() {
  showRetryPrompt.value = false
  if (simulatorRef.value?.reset) {
    simulatorRef.value.reset()
  }
}

function retryExercise() {
  resetExercise()
  showRetryPrompt.value = false
  if (simulatorRef.value?.reset) {
    simulatorRef.value.reset()
  }
}

// Lifecycle
onMounted(async () => {
  if (route.query.software) {
    selectedSoftware.value = route.query.software
  }
  await loadProgress()

  // Auto-start first unlocked exercise if coming from topic page
  if (route.query.autostart === 'true') {
    const current = progress.value.exercises.find(ex => ex.isCurrent)
    if (current) {
      await startExercise(current)
    }
  }
})

watch(topicId, async () => {
  currentExercise.value = null
  await loadProgress()
})
</script>

<style scoped>
.software-practice-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  margin-bottom: 2rem;
}

.back-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.back-link:hover {
  color: var(--primary);
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
}

.page-header p {
  margin: 0;
  color: var(--text-secondary);
}

.software-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.software-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border);
  border-radius: 2rem;
  background: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.software-btn:hover {
  border-color: var(--sw-color, var(--primary));
  color: var(--sw-color, var(--primary));
}

.software-btn.active {
  background: var(--sw-color, var(--primary));
  border-color: var(--sw-color, var(--primary));
  color: white;
}

.progress-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.progress-count {
  color: var(--text-secondary);
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, #10b981 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.exercise-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.exercise-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.exercise-card:hover:not(.locked) {
  border-color: var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.exercise-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.exercise-card.completed {
  background: #f0fdf4;
  border-color: #86efac;
}

.exercise-card.current {
  border-color: var(--primary);
  border-width: 2px;
}

.exercise-status {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f3f4f6;
  flex-shrink: 0;
}

.status-icon.completed {
  background: #10b981;
  color: white;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.status-icon.locked {
  font-size: 1rem;
}

.status-icon.current {
  color: var(--primary);
  font-weight: bold;
  font-size: 1.25rem;
}

.exercise-info {
  flex: 1;
}

.exercise-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.exercise-info p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.software-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
}

.software-tag.jamovi { background: #f3e8ff; color: #7c3aed; }
.software-tag.spss { background: #fee2e2; color: #dc2626; }
.software-tag.r { background: #dbeafe; color: #2563eb; }
.software-tag.stata { background: #e0e7ff; color: #4338ca; }
.software-tag.excel { background: #dcfce7; color: #16a34a; }

.exercise-container {
  position: relative;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.exercise-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.exercise-title h2 {
  margin: 0;
  font-size: 1.25rem;
}

.attempt-badge {
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.btn-exit {
  background: transparent;
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.btn-exit:hover {
  border-color: var(--danger);
  color: var(--danger);
}

.mastery-celebration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.celebration-content {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  text-align: center;
  max-width: 400px;
  animation: pop-in 0.3s ease;
}

@keyframes pop-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.celebration-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.celebration-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #10b981;
}

.celebration-content p {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
}

.celebration-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.celebration-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.retry-prompt {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 0.75rem;
  text-align: center;
}

.retry-prompt p {
  margin: 0 0 1rem 0;
  color: #92400e;
}

.btn-retry {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-retry:hover {
  background: #d97706;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hint-text {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
