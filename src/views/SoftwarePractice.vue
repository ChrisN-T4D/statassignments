<template>
  <div class="software-practice-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <a href="#" @click.prevent="goBack" class="back-link">← Back</a>
        <h1>{{ pageTitle }}</h1>
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

      <!-- Scaffolded Lessons Section -->
      <div v-if="!currentExercise && filteredLessons.length > 0" class="lessons-section">
        <h2>Guided Lessons</h2>
        <p class="section-desc">Step-by-step lessons: Learn concepts, Practice with guidance, Apply independently</p>
        <div class="lessons-grid">
          <router-link
            v-for="lesson in filteredLessons"
            :key="lesson.id"
            :to="classId ? `/class/${classId}/lesson/${lesson.id}` : `/lesson/${lesson.id}`"
            class="lesson-card"
          >
            <div class="lesson-icon">📚</div>
            <div class="lesson-info">
              <h3>{{ lesson.title }}</h3>
              <p>{{ lesson.objectives[0] }}</p>
              <div class="lesson-meta">
                <span class="time-badge">{{ lesson.estimatedTime }} min</span>
                <span class="phases-badge">3 phases</span>
              </div>
            </div>
            <span class="lesson-arrow">→</span>
          </router-link>
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
import { useRoute, useRouter } from 'vue-router'
import { topics, software } from '../data/topics.js'
import { statisticsExercises, statisticsModules } from '../data/statisticsPractices.js'
import { softwareLessons, getLessonsBySoftware } from '../data/softwareLessons.js'
import { useSimulation } from '../composables/useSimulation'
import { useAuth } from '../composables/useAuth'
import { useClasses } from '../composables/useClasses'

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
const router = useRouter()
const { isAuthenticated } = useAuth()
const { selectedClass, fetchClasses } = useClasses()
const {
  currentExercise: pbExercise,
  attemptCount,
  isCorrect,
  loading: pbLoading,
  hintUsed,
  fetchExercise: pbFetchExercise,
  recordAttempt,
  resetExercise,
  getSimulationProgress: pbGetProgress,
  getNextExercise: pbGetNext
} = useSimulation()

// State
const selectedSoftware = ref('jamovi')
const progress = ref({ completed: 0, total: 0, exercises: [] })
const showRetryPrompt = ref(false)
const simulatorRef = shallowRef(null)
const currentExercise = ref(null)
const loading = ref(false)
const completedExerciseIds = ref(new Set())

// Computed
const classId = computed(() => route.params.classId)
const topicId = computed(() => route.params.topicId || route.params.id)

const pageTitle = computed(() => {
  if (classId.value && selectedClass.value) {
    return `${selectedClass.value.name} - Software Practice`
  }
  const topic = topics.find(t => t.id === topicId.value)
  return topic?.title ? `${topic.title} Practice` : 'Software Practice'
})

const availableSoftware = computed(() => software)

// Get lessons for selected software
const filteredLessons = computed(() => {
  return getLessonsBySoftware(selectedSoftware.value)
})

// Get exercises from static data based on class/topic
const staticExercises = computed(() => {
  // If we have a classId, show all exercises for that class (e.g., statistics)
  if (classId.value === 'statistics') {
    return statisticsExercises.filter(ex =>
      ex.software_type === selectedSoftware.value
    )
  }
  // If we have a topicId, filter by topic
  if (topicId.value) {
    return statisticsExercises.filter(ex =>
      ex.topic === topicId.value && ex.software_type === selectedSoftware.value
    )
  }
  // Default: show all jamovi exercises
  return statisticsExercises.filter(ex => ex.software_type === selectedSoftware.value)
})

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
  loadProgress()
}

function loadProgress() {
  // Use static exercises with simulated progress
  const exercises = staticExercises.value.map((ex, index) => {
    const uniqueId = `${ex.module}-${ex.topic}-${index}`
    const isCompleted = completedExerciseIds.value.has(uniqueId)
    // For now, all exercises are unlocked (no sequential requirement)
    const isUnlocked = true
    return {
      ...ex,
      id: uniqueId,
      isCompleted,
      isUnlocked,
      isCurrent: isUnlocked && !isCompleted
    }
  })

  progress.value = {
    completed: exercises.filter(ex => ex.isCompleted).length,
    total: exercises.length,
    exercises
  }
}

function startExercise(exercise) {
  showRetryPrompt.value = false
  // Convert static exercise to the format expected by simulators
  currentExercise.value = {
    ...exercise,
    expectedSelections: exercise.expected_selections,
    expectedCode: exercise.expected_code,
    sampleData: exercise.sample_data,
    highlightPath: exercise.highlight_path,
    successMessage: exercise.success_message
  }
}

function loadNextExercise() {
  showRetryPrompt.value = false
  // Find next uncompleted exercise
  const nextIndex = progress.value.exercises.findIndex(ex => !ex.isCompleted)
  if (nextIndex >= 0) {
    startExercise(progress.value.exercises[nextIndex])
  } else {
    // All exercises completed
    currentExercise.value = null
    loadProgress()
  }
}

function exitExercise() {
  currentExercise.value = null
  showRetryPrompt.value = false
  loadProgress()
}

function handleCorrect() {
  // Mark exercise as completed
  if (currentExercise.value?.id) {
    completedExerciseIds.value.add(currentExercise.value.id)
  }
  loadProgress()
}

function handleIncorrect() {
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

function goBack() {
  if (classId.value) {
    router.push(`/class/${classId.value}`)
  } else {
    router.push('/')
  }
}

// Lifecycle
onMounted(async () => {
  await fetchClasses()
  if (route.query.software) {
    selectedSoftware.value = route.query.software
  }
  loadProgress()

  // Auto-start first unlocked exercise if coming from topic page
  if (route.query.autostart === 'true') {
    const current = progress.value.exercises.find(ex => ex.isCurrent)
    if (current) {
      startExercise(current)
    }
  }
})

watch([classId, topicId, selectedSoftware], () => {
  currentExercise.value = null
  loadProgress()
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

/* Lessons Section */
.lessons-section {
  margin-bottom: 2rem;
}

.lessons-section h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
}

.section-desc {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.lessons-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lesson-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.lesson-card:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.lesson-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #dbeafe, #ede9fe);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.lesson-info {
  flex: 1;
}

.lesson-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.lesson-info > p {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lesson-meta {
  display: flex;
  gap: 0.75rem;
}

.time-badge,
.phases-badge {
  font-size: 0.6875rem;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.lesson-arrow {
  color: var(--text-muted);
  font-size: 1.25rem;
  transition: transform 0.2s, color 0.2s;
}

.lesson-card:hover .lesson-arrow {
  transform: translateX(4px);
  color: var(--primary);
}
</style>
