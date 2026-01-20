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

      <!-- Textbook Chapter -->
      <div v-if="textbookUrl" class="content-section textbook-section">
        <div class="textbook-header">
          <h2>Textbook Chapter</h2>
          <a class="textbook-link" :href="textbookUrl" target="_blank" rel="noopener">
            Open chapter
          </a>
        </div>
        <iframe
          class="textbook-iframe"
          :src="textbookUrl"
          title="Textbook chapter"
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-forms"
          referrerpolicy="no-referrer"
        ></iframe>
      </div>

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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { topics } from '../data/topics.js'
import { getModuleById } from '../data/modules.js'

// Concept explanations
// Software instructions
const route = useRoute()
const router = useRouter()

const topicId = computed(() => route.params.id)
const topic = computed(() => topics.find(t => t.id === topicId.value))

const pageTitle = computed(() => {
  if (topicId.value === 'intro-to-stats') return 'Why do We Learn Statistics'
  if (topicId.value === 'why-stats-matter') return 'A Brief Introduction to Research Design'
  return topic.value?.title || 'Topic'
})

const moduleId = computed(() => topic.value?.moduleId || null)

const moduleInfo = computed(() => {
  const statsModuleId = toStatsModuleId(moduleId.value)
  return statsModuleId ? getModuleById(statsModuleId) : null
})

const textbookUrl = computed(() => {
  return topic.value?.textbookUrl || moduleInfo.value?.textbookUrl || null
})

const moduleTopics = computed(() => {
  if (!moduleId.value) return []
  const statsModuleId = toStatsModuleId(moduleId.value)
  const module = statsModuleId ? getModuleById(statsModuleId) : null
  if (module?.topics?.length) {
    return module.topics
      .map(topicKey => topics.find(t => t.id === topicKey))
      .filter(Boolean)
  }
  return topics.filter(t => t.moduleId === moduleId.value)
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


function toStatsModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value
  if (value.startsWith('module-')) return value.replace('module-', 'stats-module-')
  return value
}

function goToModule() {
  const statsModuleId = toStatsModuleId(moduleId.value)
  if (statsModuleId) {
    router.push(`/class/statistics?module=${statsModuleId}`)
    return
  }
  router.push('/class/statistics')
}

function goToNext() {
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

function goToPrev() {
  if (!prevTopic.value) return
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

.textbook-section {
  margin-top: 1.5rem;
}

.textbook-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.textbook-header h2 {
  margin: 0;
  font-size: 1.125rem;
}

.textbook-link {
  color: var(--primary);
  font-size: 0.875rem;
  text-decoration: none;
}

.textbook-link:hover {
  text-decoration: underline;
}

.textbook-iframe {
  width: 100%;
  min-height: 520px;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: white;
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
