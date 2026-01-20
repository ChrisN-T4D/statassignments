<template>
  <div class="class-home" v-if="currentClass">
    <div class="container">
      <!-- Class Header -->
      <div class="class-header" :style="{ '--class-color': currentClass.color }">
        <div class="class-icon-large">{{ currentClass.icon }}</div>
        <div class="class-info">
          <h1>{{ currentClass.name }}</h1>
          <p>{{ currentClass.description }}</p>
        </div>
      </div>

      <!-- Module Navigation -->
      <div class="module-nav">
        <h2 class="section-title">Course Modules</h2>
        <div class="module-list">
          <button
            v-for="mod in contentModules"
            :key="mod.id"
            class="module-btn"
            :class="{ active: selectedModuleId === mod.id }"
            :style="{ '--module-color': mod.color }"
            @click="selectModule(mod.id)"
          >
            <span class="module-icon">{{ mod.icon }}</span>
            <span class="module-number" v-if="mod.number">{{ mod.number }}</span>
            <span class="module-title">{{ mod.shortTitle }}</span>
          </button>
        </div>
      </div>

      <!-- Selected Module Content -->
      <div v-if="selectedModule" class="module-content">
        <div class="module-header" :style="{ '--module-color': selectedModule.color }">
          <div class="module-header-icon">{{ selectedModule.icon }}</div>
          <div class="module-header-info">
            <h2>
              <span v-if="selectedModule.number">Module {{ selectedModule.number }}: </span>
              {{ selectedModule.title }}
            </h2>
            <p>{{ selectedModule.description }}</p>
          </div>
        </div>

        <!-- Learning Objectives -->
        <div v-if="selectedModule.learningObjectives?.length" class="learning-objectives">
          <h3>Learning Objectives</h3>
          <ul>
            <li v-for="(obj, idx) in selectedModule.learningObjectives" :key="idx">
              {{ obj }}
            </li>
          </ul>
        </div>

        <!-- Module Progress -->
        <div v-if="moduleProgress.total > 0" class="module-progress">
          <div class="module-progress-header">
            <span>Module progress</span>
            <span>{{ moduleProgress.completed }} / {{ moduleProgress.total }}</span>
          </div>
          <div class="module-progress-bar">
            <div class="module-progress-fill" :style="{ width: `${moduleProgress.percent}%` }"></div>
          </div>
          <div class="module-progress-meta">
            <span>Topics read: {{ moduleProgress.openedTopics }} / {{ moduleProgress.totalTopics }}</span>
            <span>Content review: {{ moduleProgress.contentReviewComplete ? 'Done' : 'Not yet' }}</span>
          </div>
        </div>

        <!-- Content Tabs -->
        <div class="content-tabs">
          <button
            v-for="tab in contentTabs"
            :key="tab.id"
            class="content-tab"
            :class="{ active: activeContentTab === tab.id, disabled: tab.id === 'software' && !hasSoftwareLessons }"
            :disabled="tab.id === 'software' && !hasSoftwareLessons"
            @click="activeContentTab = tab.id"
          >
            <span class="tab-icon" v-if="!tab.iconSrc">{{ tab.icon }}</span>
            <img v-else :src="tab.iconSrc" :alt="tab.label" class="tab-icon-img" />
            <span class="tab-label">{{ tab.label }}</span>
            <span class="tab-count" v-if="getTabCount(tab.id) > 0">{{ getTabCount(tab.id) }}</span>
          </button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Topics Tab -->
          <div v-if="activeContentTab === 'topics'" class="tab-panel">
            <div v-if="moduleTopics.length === 0" class="empty-state">
              <p>No topics available for this module yet.</p>
            </div>
            <div v-else class="topics-grid">
              <router-link
                v-for="topic in moduleTopics"
                :key="topic.id"
                :to="`/topic/${topic.id}`"
                class="topic-card"
                :class="{ read: isTopicRead(topic.id) }"
              >
                <img src="/topic-icon.png" alt="" class="topic-icon-img" />
                <div class="topic-info">
                  <h3>{{ topic.title }}</h3>
                  <p>{{ topic.description }}</p>
                </div>
                <span v-if="isTopicRead(topic.id)" class="topic-status">Read</span>
                <span class="card-arrow">-></span>
              </router-link>
            </div>
          </div>

          <!-- Concept Review Tab -->
          <div v-if="activeContentTab === 'concepts'" class="tab-panel">
            <div v-if="moduleTopics.length === 0" class="empty-state">
              <p>No concept review questions available for this module yet.</p>
            </div>
            <router-link
              v-else
              :to="`/class/${classId}/practice?module=${selectedModuleId}`"
              class="practice-link-card"
            >
              <div class="link-card-icon">
                <img src="/content-review-icon.png" alt="Content review" class="link-card-icon-img" />
              </div>
              <div class="link-card-content">
                <h3>Start Concept Review</h3>
                <p>Practice questions covering {{ selectedModule.shortTitle }} concepts</p>
              </div>
              <span class="card-arrow">-></span>
            </router-link>
          </div>

          <!-- Software Practice Tab -->
          <div v-if="activeContentTab === 'software'" class="tab-panel">
            <div v-if="moduleLessons.length === 0" class="empty-state">
              <p>No software lessons available for this module yet.</p>
            </div>
            <div v-else>
            <router-link
              :to="`/class/${classId}/software?module=${selectedModuleId}`"
              class="practice-link-card"
            >
              <div class="link-card-icon">
                <img src="/software-practice-icon.png" alt="Software practice" class="link-card-icon-img" />
              </div>
              <div class="link-card-content">
                <h3>Start Software Practice</h3>
                <p>Hands-on exercises for {{ selectedModule.shortTitle }}</p>
              </div>
                <span class="card-arrow">-></span>
              </router-link>
            </div>
            <div v-if="moduleLessons.length > 0" class="lessons-grid">
              <router-link
                v-for="lesson in moduleLessons"
                :key="lesson.id"
                :to="`/class/${classId}/lesson/${lesson.id}`"
                class="lesson-card"
              >
                <div class="lesson-software" :style="{ backgroundColor: getSoftwareColor(lesson.software) }">
                  {{ lesson.software }}
                </div>
                <div class="lesson-info">
                  <h3>{{ lesson.title }}</h3>
                  <p>{{ lesson.objectives[0] }}</p>
                </div>
                <span class="card-arrow">-></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress (if authenticated) -->
      <div v-if="isAuthenticated && hasProfile" class="progress-section">
        <h2>Your Progress</h2>
        <div class="progress-card">
          <div class="progress-stat">
            <span class="stat-value">{{ stats?.completed || 0 }}</span>
            <span class="stat-label">Topics Completed</span>
          </div>
          <div class="progress-stat">
            <span class="stat-value">{{ stats?.practiced || 0 }}</span>
            <span class="stat-label">Exercises Done</span>
          </div>
          <div class="progress-stat">
            <span class="stat-value">{{ stats?.accuracy || '--' }}%</span>
            <span class="stat-label">Accuracy</span>
          </div>
        </div>
      </div>

      <!-- Not authenticated prompt -->
      <div v-else-if="!isAuthenticated" class="auth-prompt">
        <p>
          <router-link to="/auth">Sign in</router-link> to track your progress in this course!
        </p>
      </div>
    </div>
  </div>

  <!-- Class not found -->
  <div v-else class="class-not-found">
    <div class="container">
      <h1>Class Not Found</h1>
      <p>The requested class doesn't exist or is not available.</p>
      <router-link to="/" class="btn-primary">Go Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useClasses } from '../composables/useClasses'
import { useAuth } from '../composables/useAuth'
import { useProfile } from '../composables/useProfile'
import { getModulesByClassId, getContentModulesByClass, getTopicsForModule } from '../data/modules'
import { software } from '../data/topics'
import { getLessonsByModule } from '../data/softwareLessons'

const route = useRoute()
const { selectClass, fetchClasses, classes } = useClasses()
const { isAuthenticated } = useAuth()
const { hasProfile } = useProfile()

const classId = computed(() => route.params.classId)
const selectedModuleId = ref(null)
const activeContentTab = ref('topics')

const contentTabs = [
  { id: 'topics', label: 'Topics', icon: 'T' },
  { id: 'concepts', label: 'Concept Review', iconSrc: '/content-review-icon.png' },
  { id: 'software', label: 'Software Practice', iconSrc: '/software-practice-icon.png' }
]

const currentClass = computed(() => {
  return classes.value.find(c => c.id === classId.value) || null
})

// Get modules for the current class
const classModules = computed(() => {
  return getModulesByClassId(classId.value)
})

// Filter modules to content modules only
const contentModules = computed(() => {
  return getContentModulesByClass(classId.value)
})

const selectedModule = computed(() => {
  return classModules.value.find(m => m.id === selectedModuleId.value)
})

// Get topics for the selected module
const moduleTopics = computed(() => {
  return getTopicsForModule(selectedModuleId.value)
})

// Get software lessons for the selected module
const moduleLessons = computed(() => {
  return getLessonsByModule(selectedModuleId.value)
})

const hasSoftwareLessons = computed(() => moduleLessons.value.length > 0)

const readTopicIds = ref(new Set())

function getReadTopicIds() {
  try {
    const raw = localStorage.getItem('readTopics')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read opened topics:', err)
    return new Set()
  }
}

function refreshReadTopics() {
  readTopicIds.value = getReadTopicIds()
}

function isTopicRead(topicId) {
  return readTopicIds.value.has(topicId)
}

function getCompletedConceptReviewIds() {
  try {
    const raw = localStorage.getItem('completedConceptReviews')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read concept reviews:', err)
    return new Set()
  }
}

const moduleProgress = computed(() => {
  const totalTopics = moduleTopics.value.length
  const openedTopics = moduleTopics.value.filter(topic => readTopicIds.value.has(topic.id)).length
  const completedSet = getCompletedConceptReviewIds()
  const contentReviewComplete = selectedModuleId.value
    ? completedSet.has(selectedModuleId.value)
    : false
  const total = totalTopics + (totalTopics > 0 ? 1 : 0)
  const completed = openedTopics + (contentReviewComplete ? 1 : 0)
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0

  return {
    total,
    completed,
    percent,
    totalTopics,
    openedTopics,
    contentReviewComplete
  }
})

// Get count for each tab
function getTabCount(tabId) {
  switch (tabId) {
    case 'topics':
      return moduleTopics.value.length
    case 'concepts':
      return moduleTopics.value.length > 0 ? 1 : 0 // 1 if there are topics to review
    case 'software':
      return moduleLessons.value.length
    default:
      return 0
  }
}

function selectModule(moduleId) {
  selectedModuleId.value = moduleId
  activeContentTab.value = 'topics'
}

function normalizeRouteValue(value) {
  if (Array.isArray(value)) return value[0] || null
  return value || null
}

function toStatsModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value
  if (value.startsWith('module-')) return value.replace('module-', 'stats-module-')
  return value
}

function syncSelectedModuleFromQuery() {
  const queryModule = normalizeRouteValue(route.query.module)
  if (!queryModule) return
  const moduleId = toStatsModuleId(queryModule)
  if (contentModules.value.find(mod => mod.id === moduleId)) {
    selectedModuleId.value = moduleId
  }
}

function getSoftwareColor(softwareId) {
  const sw = software.find(s => s.id === softwareId)
  return sw?.color || '#6366f1'
}

// Set default module when class modules load
function setDefaultModule() {
  if (contentModules.value.length > 0 && !selectedModuleId.value) {
    selectedModuleId.value = contentModules.value[0].id
  }
}

// Placeholder stats (would come from useAttempts in real implementation)
const stats = computed(() => ({
  completed: 3,
  practiced: 15,
  accuracy: 78
}))

// Sync class selection with URL
onMounted(async () => {
  await fetchClasses()
  if (classId.value) {
    selectClass(classId.value)
    setDefaultModule()
    syncSelectedModuleFromQuery()
  }
  refreshReadTopics()
})

watch(classId, (newId) => {
  if (newId) {
    selectClass(newId)
    selectedModuleId.value = null // Reset module selection
    setDefaultModule()
    syncSelectedModuleFromQuery()
  }
  refreshReadTopics()
})

// Watch for modules loading
watch(contentModules, () => {
  setDefaultModule()
  syncSelectedModuleFromQuery()
  refreshReadTopics()
})

watch(() => route.query.module, () => {
  syncSelectedModuleFromQuery()
  refreshReadTopics()
})

watch(() => route.fullPath, () => {
  refreshReadTopics()
})
</script>

<style scoped>
.class-home {
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.class-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--class-color, var(--primary));
}

.class-icon-large {
  width: 64px;
  height: 64px;
  background: color-mix(in srgb, var(--class-color, var(--primary)) 15%, transparent);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-shrink: 0;
}

.class-info h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
}

.class-info p {
  margin: 0;
  color: var(--text-secondary);
}

/* Section Title */
.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

/* Module Navigation */
.module-nav {
  margin-bottom: 2rem;
}

.module-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.module-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.module-btn:hover {
  border-color: var(--module-color, var(--primary));
  background: color-mix(in srgb, var(--module-color, var(--primary)) 5%, var(--bg-card));
}

.module-btn.active {
  border-color: var(--module-color, var(--primary));
  background: color-mix(in srgb, var(--module-color, var(--primary)) 15%, var(--bg-card));
}

.module-icon {
  font-size: 1.25rem;
}

.module-number {
  font-weight: 700;
  color: var(--module-color, var(--primary));
}

.module-title {
  color: var(--text-primary);
}

/* Module Content */
.module-content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.module-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1rem;
}

.module-header-icon {
  width: 48px;
  height: 48px;
  background: color-mix(in srgb, var(--module-color, var(--primary)) 15%, transparent);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.module-header-info h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
}

.module-header-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

/* Learning Objectives */
.learning-objectives {
  background: var(--bg-elevated);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.learning-objectives h3 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin: 0 0 0.75rem 0;
}

.learning-objectives ul {
  margin: 0;
  padding-left: 1.25rem;
}

.learning-objectives li {
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

/* Module Progress */
.module-progress {
  background: var(--bg-elevated);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}

.module-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.module-progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.module-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, #10b981 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.module-progress-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* Content Tabs */
.content-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.content-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--bg-elevated);
  border: 2px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9375rem;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.content-tab:hover {
  background: var(--bg-main);
  color: var(--text-primary);
}

.content-tab:disabled,
.content-tab.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.content-tab:disabled:hover {
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.content-tab.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.tab-icon {
  font-size: 1.125rem;
}

.tab-icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.content-tab:not(.active) .tab-count {
  background: var(--bg-main);
  color: var(--text-secondary);
}

/* Tab Content */
.tab-panel {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

/* Topics Grid */
.topics-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.topic-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.topic-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.topic-card.read {
  border-color: #10b981;
}

.topic-status {
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  background: #ecfdf5;
  border-radius: 999px;
  padding: 0.25rem 0.5rem;
}

.topic-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.topic-icon-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.topic-info {
  flex: 1;
}

.topic-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.topic-info p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-arrow {
  color: var(--text-muted);
  font-size: 1.25rem;
  transition: transform 0.2s, color 0.2s;
}

.topic-card:hover .card-arrow,
.practice-link-card:hover .card-arrow,
.lesson-card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--primary);
}

/* Practice Link Card */
.practice-link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.practice-link-card:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.link-card-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #dbeafe, #ede9fe);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
}

.link-card-icon-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.link-card-content {
  flex: 1;
}

.link-card-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
}

.link-card-content p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Lessons Grid */
.lessons-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lesson-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.lesson-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.lesson-software {
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.lesson-info {
  flex: 1;
}

.lesson-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.lesson-info p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Benchmarks Section */
/* Progress Section */
.progress-section {
  margin-top: 2rem;
}

.progress-section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.progress-card {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
}

.progress-stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.auth-prompt {
  padding: 1.5rem;
  background: var(--note-bg);
  border: 1px solid var(--primary);
  border-radius: 0.75rem;
  text-align: center;
  margin-top: 2rem;
}

.class-not-found {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.class-not-found h1 {
  margin-bottom: 0.5rem;
}

.class-not-found p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.btn-primary {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

@media (max-width: 768px) {
  .class-header {
    flex-direction: column;
    text-align: center;
  }

  .module-list {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
  }

  .module-btn {
    flex-shrink: 0;
  }

  .content-tabs {
    flex-direction: column;
  }

  .content-tab {
    justify-content: flex-start;
  }

  .progress-card {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>





