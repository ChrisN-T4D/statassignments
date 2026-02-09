<template>
  <div class="topic-view" v-if="topic">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span>/</span>
        <span>{{ topic.title }}</span>
      </div>

      <div class="page-header">
        <h1>
          <img src="/topic-icon.png" alt="" class="topic-title-icon" />
          {{ pageTitle }}
        </h1>
      </div>

      <!-- Dynamic Software Content (Module 3) -->
      <div v-if="topic?.isDynamicSoftware && softwareContentComponent" class="content-section">
        <component :is="softwareContentComponent" />
      </div>

      <!-- Topic Content -->
      <div v-if="topic?.contentHtml" class="topic-content" v-html="topic.contentHtml"></div>

      <!-- Key Points -->
      <div v-if="topic?.keyPoints?.length" class="content-section key-points-section">
        <div class="key-points-header">
          <h2>Key Points</h2>
        </div>
        <ul class="key-points-list">
          <li v-for="(point, index) in topic.keyPoints" :key="index">
            {{ point }}
          </li>
        </ul>
        <div class="key-points-actions">
          <button class="btn-secondary" @click="markRead">Mark as Read</button>
        </div>
      </div>

      <!-- Topic Actions -->
      <div class="content-section topic-actions">
        <div class="topic-action-buttons">
          <button class="btn-secondary" @click="goToModule">Back to Module</button>
          <button v-if="prevTopic" class="btn-secondary" @click="goToPrev">Previous Topic</button>
          <button class="btn-primary" @click="goToNext">
            {{ nextTopic ? 'Next Topic' : 'Content Review' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineAsyncComponent, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { topics } from '../data/topics.js'
import { getModuleById } from '../data/modules.js'
import { useTimeTracking } from '../composables/useTimeTracking'
import { useAuth } from '../composables/useAuth'
import { pb } from '../lib/pocketbase'

const route = useRoute()
const router = useRouter()
const { isAuthenticated, user } = useAuth()
const timeTracker = useTimeTracking('reading') // Reading mode: 1 hour max, 10 min idle timeout

// Scroll depth tracking
const maxScrollDepth = ref(0) // Maximum scroll depth percentage (0-100)

// Return visit tracking
const triggeredByError = ref(false)
const errorProblemId = ref(null)

// Get user's preferred software from localStorage
const preferredSoftware = ref('jamovi')
try {
  const stored = localStorage.getItem('preferredSoftware')
  if (stored) preferredSoftware.value = stored
} catch (err) {
  console.warn('Unable to read preferred software:', err)
}

const topicId = computed(() => route.params.id)
const topic = computed(() => topics.find(t => t.id === topicId.value))

const pageTitle = computed(() => {
  if (topicId.value === 'intro-to-stats') return 'Why Do We Learn Statistics?'

  // Add chapter and section number for topics with chapter field
  if (topic.value?.chapter) {
    // Extract chapter number (e.g., 'chapter-12' -> '12')
    const chapterParts = topic.value.chapter.split('-')
    const chapterNum = chapterParts.length >= 2 ? chapterParts[1] : null

    if (!chapterNum) {
      return topic.value?.title || 'Topic'
    }

    // Get all topics in the same chapter to determine section number
    const chapterTopics = topics
      .filter(t => t.chapter === topic.value.chapter)
      .sort((a, b) => {
        // Sort by their order in the module
        const statsModuleId = toStatsModuleId(moduleId.value)
        const module = statsModuleId ? getModuleById(statsModuleId) : null
        if (module?.topics?.length) {
          const indexA = module.topics.indexOf(a.id)
          const indexB = module.topics.indexOf(b.id)
          return indexA - indexB
        }
        return 0
      })

    // Find section number (position in chapter)
    const sectionNum = chapterTopics.findIndex(t => t.id === topic.value.id) + 1

    if (sectionNum > 0) {
      return `${chapterNum}.${sectionNum} ${topic.value.title}`
    }
  }

  return topic.value?.title || 'Topic'
})

const moduleId = computed(() => topic.value?.moduleId || null)

const moduleInfo = computed(() => {
  const statsModuleId = toStatsModuleId(moduleId.value)
  return statsModuleId ? getModuleById(statsModuleId) : null
})

const moduleTopics = computed(() => {
  if (!moduleId.value) return []
  const statsModuleId = toStatsModuleId(moduleId.value)
  const module = statsModuleId ? getModuleById(statsModuleId) : null

  // Get all topics in the module
  let allTopics = []
  if (module?.topics?.length) {
    allTopics = module.topics
      .map(topicKey => topics.find(t => t.id === topicKey))
      .filter(Boolean)
  } else {
    allTopics = topics.filter(t => t.moduleId === moduleId.value)
  }

  // If current topic has a chapter field, filter to only that chapter
  if (topic.value?.chapter) {
    return allTopics.filter(t => t.chapter === topic.value.chapter)
  }

  return allTopics
})

const nextTopic = computed(() => {
  if (!topic.value) return null
  const index = moduleTopics.value.findIndex(t => t.id === topic.value.id)
  if (index === -1) return null
  return moduleTopics.value[index + 1] || null
})

const prevTopic = computed(() => {
  if (!topic.value) return null
  const index = moduleTopics.value.findIndex(t => t.id === topic.value.id)
  if (index <= 0) return null
  return moduleTopics.value[index - 1] || null
})

// Dynamic software content component (Module 3)
const softwareContentComponent = computed(() => {
  if (!topic.value?.isDynamicSoftware) return null

  const topicId = topic.value.id
  const software = preferredSoftware.value

  // Capitalize software name for component file naming
  const softwareCap = software.charAt(0).toUpperCase() + software.slice(1)

  // Map combinations to dynamic imports
  // Vite requires static import paths, so we map each combination explicitly
  if (topicId === 'software-interface') {
    if (software === 'spss') return defineAsyncComponent(() => import('../content/software/module-3/Interface-SPSS.vue'))
    if (software === 'jamovi') return defineAsyncComponent(() => import('../content/software/module-3/Interface-Jamovi.vue'))
    if (software === 'r') return defineAsyncComponent(() => import('../content/software/module-3/Interface-R.vue'))
    if (software === 'excel') return defineAsyncComponent(() => import('../content/software/module-3/Interface-Excel.vue'))
    if (software === 'stata') return defineAsyncComponent(() => import('../content/software/module-3/Interface-Stata.vue'))
  }
  if (topicId === 'data-entry') {
    if (software === 'spss') return defineAsyncComponent(() => import('../content/software/module-3/DataEntry-SPSS.vue'))
    if (software === 'jamovi') return defineAsyncComponent(() => import('../content/software/module-3/DataEntry-Jamovi.vue'))
    if (software === 'r') return defineAsyncComponent(() => import('../content/software/module-3/DataEntry-R.vue'))
    if (software === 'excel') return defineAsyncComponent(() => import('../content/software/module-3/DataEntry-Excel.vue'))
    if (software === 'stata') return defineAsyncComponent(() => import('../content/software/module-3/DataEntry-Stata.vue'))
  }
  if (topicId === 'variable-types') {
    if (software === 'spss') return defineAsyncComponent(() => import('../content/software/module-3/VariableTypes-SPSS.vue'))
    if (software === 'jamovi') return defineAsyncComponent(() => import('../content/software/module-3/VariableTypes-Jamovi.vue'))
    if (software === 'r') return defineAsyncComponent(() => import('../content/software/module-3/VariableTypes-R.vue'))
    if (software === 'excel') return defineAsyncComponent(() => import('../content/software/module-3/VariableTypes-Excel.vue'))
    if (software === 'stata') return defineAsyncComponent(() => import('../content/software/module-3/VariableTypes-Stata.vue'))
  }

  return null
})

// Check if this topic view was triggered by a recent error
function checkIfTriggeredByError() {
  triggeredByError.value = false
  errorProblemId.value = null

  try {
    const raw = localStorage.getItem('recentError')
    if (!raw) return

    const errorData = JSON.parse(raw)
    const now = Date.now()

    // Check if error is still valid (not expired) and matches current topic
    if (errorData.expiresAt > now && errorData.topicId === topicId.value) {
      triggeredByError.value = true
      errorProblemId.value = errorData.problemId || null
      console.log('[Return Visit] Topic view triggered by recent error')

      // Clear the error data after detecting it (one-time use)
      localStorage.removeItem('recentError')
    } else if (errorData.expiresAt <= now) {
      // Clean up expired error data
      localStorage.removeItem('recentError')
    }
  } catch (err) {
    console.warn('Unable to check return visit trigger:', err)
  }
}

// Track scroll depth
function handleScroll() {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Calculate scroll depth percentage
  const scrollableHeight = documentHeight - windowHeight
  const scrollDepth = scrollableHeight > 0 ? Math.round((scrollTop / scrollableHeight) * 100) : 100

  // Update max scroll depth
  if (scrollDepth > maxScrollDepth.value) {
    maxScrollDepth.value = Math.min(scrollDepth, 100)
  }
}

async function saveTopicReadingTime() {
  if (!isAuthenticated.value || !user.value || !topicId.value) return

  const timeData = timeTracker.stop()

  // Only save if there was meaningful engagement (> 10 seconds active time)
  if (timeData.activeTimeSeconds < 10) return

  try {
    await pb.collection('topic_readings').create({
      user: user.value.id,
      topic_id: topicId.value,
      module_id: moduleId.value,
      active_time_seconds: timeData.activeTimeSeconds,
      total_time_seconds: timeData.totalTimeSeconds,
      time_maxed_out: timeData.wasMaxedOut,
      idle_detected: timeData.idleDetected,
      max_scroll_depth: maxScrollDepth.value,
      triggered_by_error: triggeredByError.value
    })
    console.log(`[Topic Reading] Saved ${timeData.activeTimeSeconds}s for topic ${topicId.value}, scroll depth: ${maxScrollDepth.value}%, return visit: ${triggeredByError.value}`)
  } catch (err) {
    console.warn('Unable to save topic reading time:', err)
  }
}

function toStatsModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value
  if (value.startsWith('module-')) return value.replace('module-', 'stats-module-')
  return value
}

async function goToModule() {
  await saveTopicReadingTime()
  const statsModuleId = toStatsModuleId(moduleId.value)
  if (statsModuleId) {
    router.push(`/class/statistics?module=${statsModuleId}`)
    return
  }
  router.push('/class/statistics')
}

async function goToNext() {
  await saveTopicReadingTime()
  recordTopicRead(topicId.value)
  if (nextTopic.value) {
    router.push(`/topic/${nextTopic.value.id}`)
    return
  }
  const statsModuleId = toStatsModuleId(moduleId.value)
  const reviewPath = statsModuleId
    ? `/class/statistics/practice?module=${statsModuleId}`
    : '/class/statistics/practice'
  router.push(reviewPath)
}

async function goToPrev() {
  if (!prevTopic.value) return
  await saveTopicReadingTime()
  router.push(`/topic/${prevTopic.value.id}`)
}

function markRead() {
  recordTopicRead(topicId.value)
}

function recordTopicRead(topicId) {
  if (!topicId) return
  try {
    const raw = localStorage.getItem('readTopics')
    const parsed = raw ? JSON.parse(raw) : []
    const ids = Array.isArray(parsed) ? parsed : []
    if (!ids.includes(topicId)) {
      ids.push(topicId)
      localStorage.setItem('readTopics', JSON.stringify(ids))
    }
  } catch (err) {
    console.warn('Unable to save opened topic:', err)
  }
}

// Start time tracking when component mounts
onMounted(() => {
  // Check if this view was triggered by an error
  checkIfTriggeredByError()

  timeTracker.start()
  // Set up scroll tracking
  window.addEventListener('scroll', handleScroll, { passive: true })
  // Initial scroll check (in case page loads scrolled)
  handleScroll()
})

// Save time before component unmounts (e.g., user closes tab)
onUnmounted(async () => {
  await saveTopicReadingTime()
  // Clean up scroll listener
  window.removeEventListener('scroll', handleScroll)
})

// Watch for topic changes and restart timer
watch(topicId, async (newTopicId, oldTopicId) => {
  if (oldTopicId) {
    // Save time for previous topic
    await saveTopicReadingTime()
  }
  if (newTopicId) {
    // Check if new topic view was triggered by an error
    checkIfTriggeredByError()

    // Reset scroll depth for new topic
    maxScrollDepth.value = 0
    handleScroll() // Check initial scroll position
    // Start tracking new topic
    timeTracker.start()
  }
})
</script>

<style scoped>
.topic-title-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.topic-actions {
  display: flex;
  justify-content: flex-end;
}

.topic-action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  filter: brightness(1.05);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.key-points-section {
  margin-top: 1.5rem;
}

.key-points-header h2 {
  margin: 0 0 0.75rem 0;
  font-size: 1.125rem;
}

.key-points-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.key-points-list li {
  margin-bottom: 0.5rem;
}

.key-points-actions {
  margin-top: 1rem;
}

</style>
