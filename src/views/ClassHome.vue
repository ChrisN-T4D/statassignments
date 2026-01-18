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

      <!-- Quick Actions -->
      <div class="quick-actions">
        <router-link
          :to="`/class/${classId}/topics`"
          class="action-card"
        >
          <div class="action-icon">📖</div>
          <div class="action-content">
            <h3>Learn Topics</h3>
            <p>Study concepts and software tutorials</p>
          </div>
          <span class="action-arrow">→</span>
        </router-link>

        <router-link
          :to="`/class/${classId}/practice`"
          class="action-card"
        >
          <div class="action-icon">✏️</div>
          <div class="action-content">
            <h3>Practice</h3>
            <p>Test your knowledge with exercises</p>
          </div>
          <span class="action-arrow">→</span>
        </router-link>

        <router-link
          :to="`/class/${classId}/software`"
          class="action-card"
        >
          <div class="action-icon">💻</div>
          <div class="action-content">
            <h3>Software Practice</h3>
            <p>Interactive software simulations</p>
          </div>
          <span class="action-arrow">→</span>
        </router-link>
      </div>

      <!-- Topics for this class -->
      <div class="topics-section">
        <h2>Topics in This Course</h2>
        <div class="topics-grid">
          <router-link
            v-for="topicId in currentClass.topics"
            :key="topicId"
            :to="`/topic/${topicId}`"
            class="topic-card"
          >
            <span class="topic-icon">{{ getTopicIcon(topicId) }}</span>
            <div class="topic-info">
              <h3>{{ getTopicTitle(topicId) }}</h3>
              <p>{{ getTopicDescription(topicId) }}</p>
            </div>
          </router-link>
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
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useClasses } from '../composables/useClasses'
import { useAuth } from '../composables/useAuth'
import { useProfile } from '../composables/useProfile'
import { topics } from '../data/topics'

const route = useRoute()
const { selectClass, syncWithRoute, getClassById, fetchClasses, classes } = useClasses()
const { isAuthenticated } = useAuth()
const { hasProfile } = useProfile()

const classId = computed(() => route.params.classId)

const currentClass = computed(() => {
  return classes.value.find(c => c.id === classId.value) || null
})

// Placeholder stats (would come from useAttempts in real implementation)
const stats = computed(() => ({
  completed: 3,
  practiced: 15,
  accuracy: 78
}))

function getTopicTitle(topicId) {
  return topics.find(t => t.id === topicId)?.title || topicId
}

function getTopicDescription(topicId) {
  return topics.find(t => t.id === topicId)?.description || ''
}

function getTopicIcon(topicId) {
  return topics.find(t => t.id === topicId)?.icon || '📝'
}

// Sync class selection with URL
onMounted(async () => {
  await fetchClasses()
  if (classId.value) {
    selectClass(classId.value)
  }
})

watch(classId, (newId) => {
  if (newId) {
    selectClass(newId)
  }
})
</script>

<style scoped>
.class-home {
  padding: 2rem 0;
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

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-card {
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

.action-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.action-icon {
  width: 48px;
  height: 48px;
  background: var(--bg-elevated);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.action-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.action-content p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.action-arrow {
  margin-left: auto;
  color: var(--text-muted);
  font-size: 1.25rem;
  transition: transform 0.2s, color 0.2s;
}

.action-card:hover .action-arrow {
  transform: translateX(4px);
  color: var(--primary);
}

.topics-section {
  margin-bottom: 2rem;
}

.topics-section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.topic-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.topic-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow);
}

.topic-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.topic-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 0.9375rem;
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

  .progress-card {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
