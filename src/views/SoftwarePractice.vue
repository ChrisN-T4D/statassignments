<template>
  <div class="software-practice-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <a href="#" @click.prevent="goBack" class="back-link">&larr; Back</a>
        <h1>{{ pageTitle }}</h1>
        <p>Learn, Practice, Apply structure for learning how to use the software.</p>
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

      <!-- Module Selection -->
      <div v-if="availableModules.length > 0" class="module-selector">
        <button
          v-for="mod in availableModules"
          :key="mod.id"
          class="module-select-btn"
          :class="{ active: selectedModule === mod.id }"
          @click="selectModule(mod.id)"
        >
          <span class="module-select-title">{{ getPracticeModuleTitle(mod) }}</span>
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

            <!-- Learn / Practice / Apply Structure -->
      <div v-if="!currentExercise && !loading" class="practice-structure">
        <div class="module-label" v-if="selectedModuleTitle">
          Module: {{ selectedModuleTitle }}
        </div>

        <div v-if="filteredLessons.length > 0" class="lessons-section">
          <h2>Learn</h2>
          <p class="section-desc">Learn, Practice, Apply structure for learning how to use the software.</p>
          <div class="lessons-grid">
            <router-link
              v-for="lesson in filteredLessons"
              :key="lesson.id"
              :to="classId ? `/class/${classId}/lesson/${lesson.id}` : `/lesson/${lesson.id}`"
              class="lesson-card"
            >
              <div class="lesson-icon">SP</div>
              <div class="lesson-info">
                <h3>{{ lesson.title }}</h3>
                <p>{{ lesson.objectives[0] }}</p>
                <div class="lesson-meta">
                  <span class="time-badge">{{ lesson.estimatedTime }} min</span>
                  <span class="phases-badge">3 phases</span>
                </div>
              </div>
              <span class="lesson-arrow">-></span>
            </router-link>
          </div>
        </div>

        <div class="exercise-section">
          <h2>To do in {{ selectedSoftwareName }}</h2>
          <p class="section-desc">Independent tasks with submission evidence.</p>
          <div v-if="applyExercises.length > 0" class="exercise-list">
            <div
              v-for="exercise in applyExercises"
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
                <span v-if="exercise.isCompleted" class="status-icon completed">OK</span>
                <span v-else-if="!exercise.isUnlocked" class="status-icon locked">LOCK</span>
                <span v-else class="status-icon current">-></span>
              </div>
              <div class="exercise-info">
                <h3>{{ exercise.title }}</h3>
                <p>{{ exercise.description }}</p>
              </div>
              <div class="exercise-meta">
                <span class="module-badge">{{ selectedModuleTitle || exercise.module }}</span>
                <span class="software-tag" :class="exercise.software_type">
                  {{ getSoftwareName(exercise.software_type) }}
                </span>
              </div>
              <div class="dataset-links">
                <span class="dataset-label">Datasets:</span>
                <a
                  v-for="dataset in datasetLinks"
                  :key="dataset.path"
                  :href="dataset.path"
                  download
                  class="dataset-link"
                  @click.stop
                >
                  {{ dataset.name }}
                </a>
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <p>No in-software applications available yet.</p>
          </div>
        </div>

        <div v-if="filteredLessons.length === 0 && applyExercises.length === 0" class="empty-state">
          <p>No software practices available for this module yet.</p>
          <p class="hint-text">Try selecting a different module or software.</p>
        </div>
      </div>

            <!-- Active Exercise -->
      <div v-else-if="currentExercise" class="exercise-container">
        <!-- Exercise Header -->
        <div class="exercise-header">
          <div class="exercise-title">
            <h2>{{ currentExercise.title }}</h2>
          </div>
          <button class="btn-exit" @click="exitExercise">Exit Exercise</button>
        </div>

        <!-- Instructional Exercise -->
        <div class="instructional-exercise">
          <div class="instruction-card">
            <h3>Instructions</h3>
            <p>{{ currentExercise.instructions }}</p>
            <p v-if="currentExercise.hint" class="instruction-hint">
              Hint: {{ currentExercise.hint }}
            </p>
            <div v-if="currentExercise.submission" class="submission-note">
              Submit: {{ currentExercise.submission }}
            </div>
            <div class="dataset-links">
              <span class="dataset-label">Datasets:</span>
              <a
                v-for="dataset in datasetLinks"
                :key="dataset.path"
                :href="dataset.path"
                download
                class="dataset-link"
              >
                {{ dataset.name }}
              </a>
            </div>
            <div class="instruction-actions">
              <button class="btn-primary" @click="handleCorrect">Mark Complete</button>
              <button class="btn-secondary" @click="exitExercise">Back to List</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading exercises...</p>
      </div>

      <!-- Completion Summary -->
      <div v-if="showSummary" class="summary-overlay">
        <div class="summary-card">
          <h3>Exercise Completion Summary</h3>
          <p class="summary-status">Status: Completed</p>
          <div class="summary-details">
            <div><strong>User:</strong> {{ completionSummary.username }}</div>
            <div><strong>Exercise:</strong> {{ completionSummary.title }}</div>
            <div v-if="completionSummary.moduleTitle"><strong>Module:</strong> {{ completionSummary.moduleTitle }}</div>
            <div><strong>Completed:</strong> {{ completionSummary.completedAt }}</div>
          </div>
          <div class="summary-actions print-hide">
            <button class="btn-primary" @click="printSummary">Print / Save PDF</button>
            <button class="btn-secondary" @click="copySummary">Copy Summary</button>
            <button class="btn-secondary" @click="closeSummary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { topics, software } from '../data/topics.js'
import { statisticsExercises, statisticsModules } from '../data/statisticsPractices.js'
import { getLessonsBySoftware } from '../data/softwareLessons.js'
import { useAuth } from '../composables/useAuth'
import { useClasses } from '../composables/useClasses'

const route = useRoute()
const router = useRouter()
const { user } = useAuth()
const { selectedClass, fetchClasses } = useClasses()

// State
const selectedSoftware = ref('jamovi')
const selectedModule = ref(null)
const progress = ref({ completed: 0, total: 0, exercises: [] })
const currentExercise = ref(null)
const loading = ref(false)
const completedExerciseIds = ref(new Set())
const showSummary = ref(false)
const completionSummary = ref({
  title: '',
  moduleTitle: '',
  username: '',
  completedAt: ''
})
const datasetLinks = [
  { name: 'bmi_and_exercise.csv', path: '/bmi_and_exercise.csv' },
  { name: 'Normality data.csv', path: '/Normality%20data.csv' },
  { name: 'personality_data.csv', path: '/personality_data.csv' }
]

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

const lessonsForSoftware = computed(() => getLessonsBySoftware(selectedSoftware.value))

const filteredLessons = computed(() => {
  if (classId.value === 'statistics') {
    if (selectedModule.value) {
      const moduleId = toStatsModuleId(selectedModule.value)
      return lessonsForSoftware.value.filter(lesson => lesson.module === moduleId)
    }
    return lessonsForSoftware.value
  }

  if (topicId.value) {
    const topic = topics.find(t => t.id === topicId.value)
    const moduleId = toStatsModuleId(topic?.moduleId || '')
    return moduleId
      ? lessonsForSoftware.value.filter(lesson => lesson.module === moduleId)
      : lessonsForSoftware.value
  }

  return lessonsForSoftware.value
})
function normalizeRouteValue(value) {
  if (Array.isArray(value)) return value[0] || null
  return value || null
}

function normalizeModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) {
    return value.replace('stats-module-', 'module-')
  }
  return value
}

function toStatsModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value
  if (value.startsWith('module-')) return value.replace('module-', 'stats-module-')
  return value
}

const requestedModuleId = computed(() => {
  const queryModule = normalizeRouteValue(route.query.module)
  if (queryModule) return normalizeModuleId(queryModule)
  const topic = topics.find(t => t.id === topicId.value)
  return normalizeModuleId(topic?.moduleId || null)
})

const availableModules = computed(() => {
  if (classId.value !== 'statistics') return []
  const modulesWithExercises = new Set(
    statisticsExercises
      .filter(ex => ex.software_type === selectedSoftware.value)
      .map(ex => ex.module)
  )
  return statisticsModules
    .filter(mod => modulesWithExercises.has(mod.id))
    .sort((a, b) => a.order - b.order)
})

const selectedModuleTitle = computed(() => {
  const module = statisticsModules.find(mod => mod.id === selectedModule.value)
  return getPracticeModuleTitle(module)
})



const applyExercises = computed(() => {
  return progress.value.exercises
})

const selectedSoftwareName = computed(() =>
  getSoftwareName(selectedSoftware.value)
)
// Get exercises from static data based on class/topic
const staticExercises = computed(() => {
  // If we have a classId, show all exercises for that class (e.g., statistics)
  if (classId.value === 'statistics') {
    return statisticsExercises.filter(ex => {
      const matchesSoftware = ex.software_type === selectedSoftware.value
      const matchesModule = selectedModule.value ? ex.module === selectedModule.value : true
      return matchesSoftware && matchesModule && ex.exercise_type !== "menu_navigation"
    })
  }
  // If we have a topicId, filter by topic
  if (topicId.value) {
    return statisticsExercises.filter(ex =>
      ex.topic === topicId.value && ex.software_type === selectedSoftware.value && ex.exercise_type !== "menu_navigation"
    )
  }
  // Default: show all jamovi exercises
  return statisticsExercises.filter(ex => ex.software_type === selectedSoftware.value && ex.exercise_type !== "menu_navigation")
})

// Methods
function getSoftwareName(id) {
  return software.find(s => s.id === id)?.name || id
}

function getPracticeModuleTitle(module) {
  if (!module?.title) return ''
  if (!module.id || !module.id.includes('module-3')) return module.title
  return module.title.replace(/Jamovi/gi, selectedSoftwareName.value)
}


function getModuleTitle(moduleId) {
  if (!moduleId) return ''
  const module = statisticsModules.find(mod => mod.id === moduleId)
  return module?.title || moduleId
}

function formatCompletionTime(date) {
  return date.toLocaleString()
}

function getExerciseStorageId(exercise, fallbackIndex = 0) {
  if (!exercise) return ''
  const order = exercise.order ?? fallbackIndex
  return [
    exercise.software_type || 'unknown',
    exercise.module || 'module',
    exercise.topic || 'topic',
    order,
    exercise.title || 'title'
  ].join('|')
}

function getCompletedExerciseIds() {
  try {
    const raw = localStorage.getItem('completedSoftwareExercises')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read completed software exercises:', err)
    return new Set()
  }
}

function saveCompletedExerciseId(exerciseId) {
  if (!exerciseId) return
  try {
    const raw = localStorage.getItem('completedSoftwareExercises')
    const parsed = raw ? JSON.parse(raw) : []
    const ids = Array.isArray(parsed) ? parsed : []
    if (!ids.includes(exerciseId)) {
      ids.push(exerciseId)
      localStorage.setItem('completedSoftwareExercises', JSON.stringify(ids))
    }
  } catch (err) {
    console.warn('Unable to save completed software exercises:', err)
  }
}

function buildSummaryText() {
  return [
    'Exercise Completion Summary',
    'Status: Completed',
    `User: ${completionSummary.value.username}`,
    `Exercise: ${completionSummary.value.title}`,
    completionSummary.value.moduleTitle ? `Module: ${completionSummary.value.moduleTitle}` : null,
    `Completed: ${completionSummary.value.completedAt}`
  ].filter(Boolean).join('\n')
}

function getCompletedLessonIds() {
  try {
    const raw = localStorage.getItem('completedSoftwareLessons')
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed)
  } catch (err) {
    console.warn('Unable to read completed lessons:', err)
    return new Set()
  }
}

function getPreferredSoftwareId() {
  try {
    const raw = localStorage.getItem('preferredSoftware')
    if (!raw) return 'jamovi'
    return software.find(sw => sw.id === raw)?.id || 'jamovi'
  } catch (err) {
    console.warn('Unable to read preferred software:', err)
    return 'jamovi'
  }
}

function savePreferredSoftwareId(swId) {
  try {
    localStorage.setItem('preferredSoftware', swId)
  } catch (err) {
    console.warn('Unable to save preferred software:', err)
  }
}
async function selectSoftware(swId) {
  selectedSoftware.value = swId
  savePreferredSoftwareId(swId)
  currentExercise.value = null
  showSummary.value = false
  if (!availableModules.value.find(mod => mod.id === selectedModule.value)) {
    selectedModule.value = availableModules.value[0]?.id || null
  }
  loadProgress()
}

function selectModule(moduleId) {
  selectedModule.value = moduleId
  currentExercise.value = null
  showSummary.value = false
  loadProgress()
}

function loadProgress() {
  // Use static exercises with simulated progress
  const completedSet = getCompletedExerciseIds()
  const exercises = staticExercises.value.map((ex, index) => {
    const storageId = getExerciseStorageId(ex, index)
    const isCompleted = completedSet.has(storageId)
    // For now, all exercises are unlocked (no sequential requirement)
    const isUnlocked = true
    return {
      ...ex,
      id: storageId,
      isCompleted,
      isUnlocked,
      isCurrent: isUnlocked && !isCompleted
    }
  })

  completedExerciseIds.value = completedSet

  progress.value = {
    completed:
      exercises.filter(ex => ex.isCompleted).length +
      filteredLessons.value.filter(lesson => getCompletedLessonIds().has(lesson.id)).length,
    total: exercises.length + filteredLessons.value.length,
    exercises
  }
}

function startExercise(exercise) {
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
  showSummary.value = false
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
  showSummary.value = false
  loadProgress()
}

function handleCorrect() {
  // Mark exercise as completed
  if (currentExercise.value?.id) {
    completedExerciseIds.value.add(currentExercise.value.id)
    saveCompletedExerciseId(currentExercise.value.id)
  }
  loadProgress()
  completionSummary.value = {
    title: currentExercise.value?.title || 'Practice Exercise',
    moduleTitle: getModuleTitle(currentExercise.value?.module),
    username: user.value?.name || user.value?.email || 'Unknown',
    completedAt: formatCompletionTime(new Date())
  }
  showSummary.value = true
}




async function copySummary() {
  try {
    await navigator.clipboard.writeText(buildSummaryText())
  } catch (err) {
    console.warn('Unable to copy summary:', err)
  }
}

function printSummary() {
  window.print()
}

function closeSummary() {
  showSummary.value = false
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
    savePreferredSoftwareId(route.query.software)
  } else {
    selectedSoftware.value = getPreferredSoftwareId()
  }
  if (requestedModuleId.value) {
    selectedModule.value = requestedModuleId.value
  } else {
    selectedModule.value = availableModules.value[0]?.id || null
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

watch([classId, topicId, selectedSoftware, requestedModuleId], () => {
  currentExercise.value = null
  if (requestedModuleId.value) {
    selectedModule.value = requestedModuleId.value
  } else if (!availableModules.value.find(mod => mod.id === selectedModule.value)) {
    selectedModule.value = availableModules.value[0]?.id || null
  }
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
  color: #111827;
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
  color: #111827;
}


.module-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.module-select-btn {
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-card);
  font-size: 0.8125rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.module-select-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.module-select-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.module-select-title {
  font-weight: 600;
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

.practice-structure {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.module-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.exercise-section h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
}

.module-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  background: #e2e8f0;
  color: #334155;
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

.dataset-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.dataset-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dataset-link {
  font-size: 0.75rem;
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.dataset-link:hover {
  border-bottom-color: var(--primary);
}

.exercise-container {
  position: relative;
}

.instructional-exercise {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.instruction-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
}

.instruction-card p {
  margin: 0 0 0.75rem 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.instruction-hint {
  background: #fef3c7;
  color: #111827;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin: 0 0 1rem 0;
}

.submission-note {
  background: #e0f2fe;
  color: #0c4a6e;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.instruction-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
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
  color: #111827;
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

.summary-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
}

.summary-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: #111827;
}

.summary-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.summary-status {
  margin: 0 0 1rem 0;
  font-weight: 600;
  color: #111827;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #111827;
}

.summary-details strong {
  color: #111827;
}

.summary-actions {
  color: #111827;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media print {
  .software-practice-page .container > :not(.summary-overlay) {
    display: none !important;
  }

  .summary-overlay {
    position: static;
    background: transparent;
    padding: 0;
  }

  .summary-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: #111827;
}

  .print-hide {
    display: none !important;
  }
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
.summary-actions .btn-secondary {
  color: #111827;
}
</style>
















