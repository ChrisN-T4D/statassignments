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
          <h1>Your Progress</h1>
          <p>Track your learning journey through introductory statistics.</p>
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
            >
            <div class="module-info">
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
import { useAuth } from '../composables/useAuth'
import { usePractice } from '../composables/usePractice'

const router = useRouter()
const { user, isAuthenticated, signOut } = useAuth()
const { fetchUserStats } = usePractice()

const practiceStats = ref(null)
const modules = computed(() => getContentModulesByClass('statistics'))
const totalTopics = computed(() => getAllTopics().length)
const readTopicIds = ref(new Set())
const readTopicsCount = computed(() => readTopicIds.value.size)
const preferredSoftware = ref('jamovi')
const softwareOptions = computed(() => software)
const preferredSoftwareName = computed(() => getSoftwareName(preferredSoftware.value))

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
  await signOut()
  router.push('/')
}

async function loadData() {
  if (isAuthenticated.value) {
    practiceStats.value = await fetchUserStats()
    refreshReadTopics()
    preferredSoftware.value = getPreferredSoftwareId()
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
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  background: var(--bg-main);
  border-radius: 0.5rem;
}

.module-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.module-title {
  font-weight: 600;
}

.module-count {
  font-size: 0.875rem;
  color: var(--text-secondary);
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
</style>
