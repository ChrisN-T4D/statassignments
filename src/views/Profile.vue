<template>
  <div class="profile-page">
    <div class="container">
      <div v-if="!isAuthenticated" class="not-logged-in">
        <h1>Profile</h1>
        <p>Please sign in to view your profile and progress.</p>
        <router-link to="/auth" class="btn-primary">Sign In</router-link>
      </div>

      <div v-else>
        <div class="page-header">
          <div>
            <h1>Your Progress</h1>
            <p>Track your learning journey through introductory statistics.</p>
          </div>
          <div class="header-actions">
            <router-link v-if="user?.role === 'admin'" to="/admin" class="btn-primary">
              Admin Dashboard
            </router-link>
            <router-link to="/bkt-tester" class="btn-secondary">
              BKT Testing Interface
            </router-link>
          </div>
        </div>

        <!-- User Info -->
        <div class="user-card">
          <div class="user-info">
            <div class="user-avatar">
              {{ userInitials }}
            </div>
            <div class="user-details">
              <h2>{{ userName }}</h2>
              <p>{{ user?.email }}</p>
            </div>
          </div>
          <button class="btn-secondary" @click="handleSignOut">Sign Out</button>
        </div>

        <!-- Overall Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ readTopicsCount }}</div>
            <div class="stat-label">Topics Completed</div>
            <div class="stat-subtext">of {{ totalTopics }} total</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ practiceStats?.total || 0 }}</div>
            <div class="stat-label">Problems Attempted</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ practiceStats?.accuracy || 0 }}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
        </div>

        <!-- Learning Analytics (BKT) -->
        <div v-if="bktAnalytics" class="content-section">
          <h2>Learning Analytics</h2>
          <p class="section-subtext">
            Your learning progress tracked using Bayesian Knowledge Tracing (BKT)
          </p>

          <!-- Mastery Distribution -->
          <div class="analytics-card">
            <h3>Mastery Distribution</h3>
            <p class="analytics-subtext">Number of learning objectives at each mastery level</p>
            <div class="mastery-distribution">
              <div
                v-for="bucket in bktAnalytics.masteryBuckets"
                :key="bucket.label"
                class="mastery-bucket"
              >
                <div class="mastery-bar-container">
                  <div
                    class="mastery-bar"
                    :class="bucket.class"
                    :style="{ height: bucket.height + '%' }"
                  >
                    <span class="mastery-count">{{ bucket.count }}</span>
                  </div>
                </div>
                <div class="mastery-label">{{ bucket.label }}</div>
              </div>
            </div>
          </div>

          <!-- Learning Parameters -->
          <div class="analytics-card">
            <h3>Learning Parameters</h3>
            <p class="analytics-subtext">Average BKT model parameters across all objectives</p>
            <div class="parameters-grid">
              <div class="parameter-item">
                <div class="parameter-label">
                  <span class="parameter-name">P(L)</span>
                  <span class="parameter-desc">Current Mastery</span>
                </div>
                <div class="parameter-bar-bg">
                  <div
                    class="parameter-bar"
                    :style="{ width: bktAnalytics.avgParams.pL + '%' }"
                  ></div>
                </div>
                <div class="parameter-value">{{ bktAnalytics.avgParams.pL }}%</div>
              </div>

              <div class="parameter-item">
                <div class="parameter-label">
                  <span class="parameter-name">P(T)</span>
                  <span class="parameter-desc">Learning Rate</span>
                </div>
                <div class="parameter-bar-bg">
                  <div
                    class="parameter-bar learning-rate"
                    :style="{ width: bktAnalytics.avgParams.pT + '%' }"
                  ></div>
                </div>
                <div class="parameter-value">{{ bktAnalytics.avgParams.pT }}%</div>
              </div>

              <div class="parameter-item">
                <div class="parameter-label">
                  <span class="parameter-name">P(G)</span>
                  <span class="parameter-desc">Guess Probability</span>
                </div>
                <div class="parameter-bar-bg">
                  <div
                    class="parameter-bar guess"
                    :style="{ width: bktAnalytics.avgParams.pG + '%' }"
                  ></div>
                </div>
                <div class="parameter-value">{{ bktAnalytics.avgParams.pG }}%</div>
              </div>

              <div class="parameter-item">
                <div class="parameter-label">
                  <span class="parameter-name">P(S)</span>
                  <span class="parameter-desc">Slip Probability</span>
                </div>
                <div class="parameter-bar-bg">
                  <div
                    class="parameter-bar slip"
                    :style="{ width: bktAnalytics.avgParams.pS + '%' }"
                  ></div>
                </div>
                <div class="parameter-value">{{ bktAnalytics.avgParams.pS }}%</div>
              </div>
            </div>
          </div>

          <!-- Summary Stats -->
          <div class="analytics-summary">
            <div class="summary-stat">
              <div class="summary-value">{{ bktAnalytics.totalObjectives }}</div>
              <div class="summary-label">Objectives Tracked</div>
            </div>
            <div class="summary-stat">
              <div class="summary-value">{{ bktAnalytics.masteredCount }}</div>
              <div class="summary-label">Mastered (≥80%)</div>
            </div>
            <div class="summary-stat">
              <div class="summary-value">{{ bktAnalytics.totalAttempts }}</div>
              <div class="summary-label">Total Attempts</div>
            </div>
          </div>
        </div>

        <!-- Preferred Software -->
        <div class="content-section">
          <h2>Preferred Software</h2>
          <p class="section-subtext">
            This selection controls the software practice list and your to do items.
          </p>
          <div class="software-preference">
            <button
              v-for="sw in softwareOptions"
              :key="sw.id"
              class="software-option"
              :class="{ active: preferredSoftware === sw.id }"
              :style="{ '--sw-color': sw.color }"
              @click="setPreferredSoftware(sw.id)"
            >
              <img
                v-if="getSoftwareIcon(sw.id)"
                :src="getSoftwareIcon(sw.id)"
                :alt="`${sw.name} icon`"
                class="software-option-icon"
              />
              {{ sw.name }}
            </button>
          </div>
        </div>

        <!-- Module Progress -->
        <div class="content-section">
          <h2>Module Progress</h2>
          <div class="module-progress-list">
            <div
              v-for="module in modules"
              :key="module.id"
              class="module-progress-item"
              :class="{ expanded: expandedModules.has(module.id) }"
            >
              <div class="module-header" @click="toggleModuleExpansion(module.id)">
                <div class="module-info">
                  <span class="module-expand-icon">
                    {{ expandedModules.has(module.id) ? '▼' : '▶' }}
                  </span>
                  <span class="module-title">{{ getModuleDisplayTitle(module) }}</span>
                  <span class="module-count">{{ getModuleProgress(module).completed }} / {{ getModuleProgress(module).total }}</span>
                </div>
                <div class="module-progress-bar">
                  <div
                    class="module-progress-fill"
                    :style="{ width: `${getModuleProgress(module).percent}%` }"
                  ></div>
                </div>
              </div>

              <!-- Objectives Breakdown -->
              <div v-if="expandedModules.has(module.id)" class="objectives-section">
                <h3>Learning Objectives</h3>
                <div class="objectives-list">
                  <div
                    v-for="objective in getModuleObjectives(module)"
                    :key="objective.objectiveId"
                    class="objective-item"
                  >
                    <div class="objective-header">
                      <span class="objective-id">{{ objective.objectiveId }}</span>
                      <span class="objective-type" :class="`type-${objective.objectiveType}`">
                        {{ objective.objectiveType }}
                      </span>
                      <span class="objective-mastery">
                        {{ getObjectiveMastery(objective.objectiveId) }}% mastery
                      </span>
                    </div>
                    <p class="objective-text">{{ objective.objective }}</p>
                    <div class="objective-progress-bar">
                      <div
                        class="objective-progress-fill"
                        :style="{ width: `${getObjectiveMastery(objective.objectiveId)}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Practice -->
        <div v-if="practiceStats && practiceStats.total > 0" class="content-section">
          <h2>Practice Summary</h2>
          <div class="practice-summary">
            <div class="summary-bar">
              <div
                class="summary-correct"
                :style="{ width: practiceStats.accuracy + '%' }"
              ></div>
            </div>
            <p>
              You've answered <strong>{{ practiceStats.correct }}</strong> out of
              <strong>{{ practiceStats.total }}</strong> questions correctly.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getContentModulesByClass, getTopicsForModule, getAllTopics } from '../data/modules.js'
import { getLessonsByModule } from '../data/softwareLessons.js'
import { statisticsExercises } from '../data/statisticsPractices.js'
import { software } from '../data/topics.js'
import { getObjectivesByModule, getModuleNumber } from '../data/objectives.js'
import { useAuth } from '../composables/useAuth'
import { usePractice } from '../composables/usePractice'
import { useBKT } from '../composables/useBKT'

const router = useRouter()
const { user, isAuthenticated, signOut } = useAuth()
const { fetchUserStats } = usePractice()
const { getMasteryPercent, getAllBKTStates } = useBKT()

const practiceStats = ref(null)
const modules = computed(() => getContentModulesByClass('statistics'))
const totalTopics = computed(() => getAllTopics().length)
const readTopicIds = ref(new Set())
const readTopicsCount = computed(() => readTopicIds.value.size)
const preferredSoftware = ref('jamovi')
const softwareOptions = computed(() => software)
const preferredSoftwareName = computed(() => getSoftwareName(preferredSoftware.value))
const expandedModules = ref(new Set())
const masteryData = ref({})
const bktStates = ref({})
const bktAnalytics = computed(() => {
  const states = Object.values(bktStates.value)
  if (states.length === 0) return null

  // Calculate mastery distribution buckets
  const buckets = [
    { label: '0-20%', min: 0, max: 20, count: 0, class: 'not-mastered', height: 0 },
    { label: '20-40%', min: 20, max: 40, count: 0, class: 'developing', height: 0 },
    { label: '40-60%', min: 40, max: 60, count: 0, class: 'developing', height: 0 },
    { label: '60-80%', min: 60, max: 80, count: 0, class: 'proficient', height: 0 },
    { label: '80-100%', min: 80, max: 100, count: 0, class: 'mastered', height: 0 }
  ]

  states.forEach(state => {
    const mastery = Math.round(state.pL * 100)
    const bucket = buckets.find(b => mastery >= b.min && mastery <= b.max)
    if (bucket) bucket.count++
  })

  // Calculate heights for visualization (max height = 100%)
  const maxCount = Math.max(...buckets.map(b => b.count), 1)
  buckets.forEach(b => {
    // Show minimum 15% height for bars with 0 count (for visibility)
    // Scale bars with counts proportionally from 20% to 100%
    if (b.count === 0) {
      b.height = 15
    } else {
      b.height = 20 + ((b.count / maxCount) * 80)
    }
  })

  // Calculate average parameters
  const avgParams = {
    pL: Math.round(states.reduce((sum, s) => sum + (s.pL * 100), 0) / states.length),
    pT: Math.round(states.reduce((sum, s) => sum + (s.pT * 100), 0) / states.length),
    pG: Math.round(states.reduce((sum, s) => sum + (s.pG * 100), 0) / states.length),
    pS: Math.round(states.reduce((sum, s) => sum + (s.pS * 100), 0) / states.length)
  }

  // Calculate summary stats
  const totalObjectives = states.length
  const masteredCount = states.filter(s => s.pL >= 0.8).length
  const totalAttempts = states.reduce((sum, s) => sum + (s.attempts || 0), 0)

  return {
    masteryBuckets: buckets,
    avgParams,
    totalObjectives,
    masteredCount,
    totalAttempts
  }
})

const userName = computed(() => {
  return user.value?.user_metadata?.full_name || user.value?.email?.split('@')[0] || 'Student'
})

const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

function getModuleProgress(module) {
  const moduleTopics = getTopicsForModule(module.id)
  const totalTopicsCount = moduleTopics.length
  const completedSet = getCompletedConceptReviewIds()
  const readCount = moduleTopics.filter(topic => readTopicIds.value.has(topic.id)).length
  const contentReviewComplete = completedSet.has(module.id)
  const moduleLessons = getLessonsByModule(module.id)
  const completedLessonsSet = getCompletedSoftwareLessonIds()
  const totalLessons = moduleLessons.length
  const completedLessons = moduleLessons.filter(lesson => completedLessonsSet.has(lesson.id)).length
  const practiceModuleId = toPracticeModuleId(module.id)
  const todoExercises = statisticsExercises.filter(ex =>
    ex.software_type === preferredSoftware.value &&
    ex.module === practiceModuleId &&
    ex.exercise_type !== 'menu_navigation'
  )
  const completedExercisesSet = getCompletedSoftwareExerciseIds()
  const todoCompleted = todoExercises.length > 0 && todoExercises.every((ex, index) => {
    const order = ex.order ?? index
    const id = [ex.software_type, ex.module, ex.topic, order, ex.title].join('|')
    return completedExercisesSet.has(id)
  })
  const totalTodo = todoExercises.length > 0 ? 1 : 0
  const completedTodo = todoCompleted ? 1 : 0
  const total = totalTopicsCount + (totalTopicsCount > 0 ? 1 : 0) + totalLessons + totalTodo
  const completed = readCount + (contentReviewComplete ? 1 : 0) + completedLessons + completedTodo
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0
  return { total, completed, percent }
}

function refreshReadTopics() {
  readTopicIds.value = getReadTopicIds()
}

function getReadTopicIds() {
  try {
    const raw = localStorage.getItem('readTopics')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read readTopics:', err)
    return new Set()
  }
}

function getCompletedConceptReviewIds() {
  try {
    const raw = localStorage.getItem('completedConceptReviewsV2')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read completed concept reviews:', err)
    return new Set()
  }
}

function getCompletedSoftwareLessonIds() {
  try {
    const raw = localStorage.getItem('completedSoftwareLessons')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read completed software lessons:', err)
    return new Set()
  }
}

function getCompletedSoftwareExerciseIds() {
  try {
    const raw = localStorage.getItem('completedSoftwareExercises')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read completed software exercises:', err)
    return new Set()
  }
}

function toPracticeModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value.replace('stats-module-', 'module-')
  return value
}

function getSoftwareName(softwareId) {
  return software.find(s => s.id === softwareId)?.name || softwareId
}

function replaceJamoviLabel(text, moduleId) {
  if (!text || !moduleId || !moduleId.includes('module-3')) return text
  return text.replace(/Jamovi/gi, preferredSoftwareName.value)
}

function toggleModuleExpansion(moduleId) {
  if (expandedModules.value.has(moduleId)) {
    expandedModules.value.delete(moduleId)
  } else {
    expandedModules.value.add(moduleId)
  }
  // Force reactivity
  expandedModules.value = new Set(expandedModules.value)
}

function getModuleObjectives(module) {
  const moduleNum = getModuleNumber(module.id)
  if (!moduleNum) return []
  return getObjectivesByModule(moduleNum)
}

function getObjectiveMastery(objectiveId) {
  // Use BKT to calculate mastery percentage (from cache)
  return masteryData.value[objectiveId] || 0
}

async function loadMasteryData() {
  // Load all BKT states and cache the mastery percentages
  const states = await getAllBKTStates()
  bktStates.value = states  // Store full states for analytics
  const newMasteryData = {}
  for (const [objectiveId, state] of Object.entries(states)) {
    newMasteryData[objectiveId] = Math.round(state.pL * 100)
  }
  masteryData.value = newMasteryData
}

function getModuleDisplayTitle(module) {
  return replaceJamoviLabel(module?.title, module?.id)
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

function setPreferredSoftware(swId) {
  preferredSoftware.value = swId
  try {
    localStorage.setItem('preferredSoftware', swId)
  } catch (err) {
    console.warn('Unable to save preferred software:', err)
  }
}

function getSoftwareIcon(softwareId) {
  if (softwareId === 'jamovi') return '/jamovi-icon.png'
  if (softwareId === 'r') return '/r-icon.png'
  if (softwareId === 'spss') return '/SPSS-icon.png'
  if (softwareId === 'excel') return '/excel-icon.png'
  if (softwareId === 'stata') return '/stata-icon.png'
  return ''
}

async function handleSignOut() {
  signOut()
  // Force full page reload to clear all state and refresh auth
  window.location.href = '/'
}

async function loadData() {
  if (isAuthenticated.value) {
    practiceStats.value = await fetchUserStats()
    refreshReadTopics()
    preferredSoftware.value = getPreferredSoftwareId()
    await loadMasteryData()
  }
}

onMounted(loadData)

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    loadData()
  }
})
</script>

<style scoped>
.not-logged-in {
  text-align: center;
  padding: 4rem 2rem;
}

.not-logged-in h1 {
  margin-bottom: 1rem;
}

.not-logged-in p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.user-details h2 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.user-details p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-card);
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  padding: 1.5rem;
  text-align: center;
}

.stat-card .stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
}

.stat-card .stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.stat-card .stat-subtext {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.module-progress-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.module-progress-item {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.module-progress-item:hover {
  border-color: var(--primary);
}

.module-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
  user-select: none;
}

.module-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.module-expand-icon {
  font-size: 0.75rem;
  color: var(--text-secondary);
  transition: transform 0.2s ease;
  min-width: 1rem;
}

.module-title {
  font-weight: 600;
  flex: 1;
}

.module-count {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-left: auto;
}

.module-progress-bar {
  height: 0.5rem;
  background: var(--bg-card);
  border-radius: 999px;
  overflow: hidden;
}

.module-progress-fill {
  height: 100%;
  background: var(--success);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.practice-summary {
  text-align: center;
}

.summary-bar {
  height: 1rem;
  background: #fee2e2;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.summary-correct {
  height: 100%;
  background: var(--success);
  border-radius: 1rem;
  transition: width 0.3s;
}

.section-subtext {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
}

.software-preference {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.software-option {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border);
  border-radius: 2rem;
  background: white;
  color: #111827;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.software-option:hover {
  border-color: var(--sw-color, var(--primary));
  color: var(--sw-color, var(--primary));
}

.software-option.active {
  background: var(--sw-color, var(--primary));
  border-color: var(--sw-color, var(--primary));
  color: #111827;
}

.software-option-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.practice-summary p {
  margin-bottom: 1.5rem;
}

.objectives-section {
  padding: 1rem 1.25rem;
  background: var(--bg-main);
  border-top: 1px solid var(--border);
}

.objectives-section h3 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.objectives-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.objective-item {
  padding: 0.75rem;
  background: #374151;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
}

.objective-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.objective-id {
  font-size: 0.75rem;
  font-weight: 600;
  color: #111827;
  background: #9ca3af;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.objective-type {
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.objective-type.type-content {
  background: #dbeafe;
  color: #1e40af;
}

.objective-type.type-software {
  background: #d1fae5;
  color: #065f46;
}

.objective-type.type-hybrid {
  background: #fef3c7;
  color: #92400e;
}

.objective-mastery {
  font-size: 0.75rem;
  color: #d1d5db;
  margin-left: auto;
}

.objective-text {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #f3f4f6;
  margin-bottom: 0.5rem;
}

.objective-progress-bar {
  height: 0.375rem;
  background: var(--bg-main);
  border-radius: 999px;
  overflow: hidden;
}

.objective-progress-fill {
  height: 100%;
  background: var(--success);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn-primary {
  display: inline-block;
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary:hover {
  background: var(--primary-dark);
  text-decoration: none;
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

/* Learning Analytics Styles */
.analytics-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.analytics-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.analytics-subtext {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* Mastery Distribution Chart */
.mastery-distribution {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  height: 200px;
  padding: 1rem 0;
}

.mastery-bucket {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
}

.mastery-bar-container {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;
  min-height: 150px;
}

.mastery-bar {
  width: 100%;
  min-height: 30px;
  border-radius: 0.375rem 0.375rem 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.5rem;
  transition: height 0.3s ease;
}

.mastery-bar.not-mastered {
  background: linear-gradient(180deg, #fca5a5 0%, #ef4444 100%);
}

.mastery-bar.developing {
  background: linear-gradient(180deg, #fde047 0%, #eab308 100%);
}

.mastery-bar.proficient {
  background: linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%);
}

.mastery-bar.mastered {
  background: linear-gradient(180deg, #86efac 0%, #10b981 100%);
}

.mastery-count {
  font-weight: 700;
  font-size: 1.125rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.mastery-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
}

/* Learning Parameters */
.parameters-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.parameter-item {
  display: grid;
  grid-template-columns: 140px 1fr 60px;
  gap: 1rem;
  align-items: center;
}

.parameter-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.parameter-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.parameter-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.parameter-bar-bg {
  height: 24px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.parameter-bar {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 999px;
  transition: width 0.5s ease;
}

.parameter-bar.learning-rate {
  background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%);
}

.parameter-bar.guess {
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
}

.parameter-bar.slip {
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
}

.parameter-value {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
  text-align: right;
}

/* Analytics Summary */
.analytics-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.summary-stat {
  text-align: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 0.5rem;
}

.summary-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.summary-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}
</style>
