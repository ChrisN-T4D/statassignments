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
            <div class="stat-value">{{ completedCount }}</div>
            <div class="stat-label">Topics Completed</div>
            <div class="stat-subtext">of {{ topics.length }} total</div>
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

        <!-- Topic Progress -->
        <div class="content-section">
          <h2>Topic Progress</h2>
          <div class="topic-progress-list">
            <div
              v-for="topic in topics"
              :key="topic.id"
              class="topic-progress-item"
            >
              <div class="topic-info">
                <span class="topic-icon">{{ topic.icon }}</span>
                <span class="topic-title">{{ topic.title }}</span>
              </div>
              <div class="topic-actions">
                <button
                  class="complete-btn"
                  :class="{ completed: isTopicComplete(topic.id) }"
                  @click="toggleComplete(topic.id)"
                >
                  {{ isTopicComplete(topic.id) ? 'Completed' : 'Mark Complete' }}
                </button>
                <router-link :to="`/practice/${topic.id}`" class="practice-link">
                  Practice
                </router-link>
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
            <router-link to="/practice" class="btn-primary">Continue Practicing</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { topics } from '../data/topics.js'
import { useAuth } from '../composables/useAuth'
import { useProgress } from '../composables/useProgress'
import { usePractice } from '../composables/usePractice'

const router = useRouter()
const { user, isAuthenticated, signOut } = useAuth()
const { fetchProgress, markTopicComplete, markTopicIncomplete, isTopicComplete, completedCount } = useProgress()
const { fetchUserStats } = usePractice()

const practiceStats = ref(null)

const userName = computed(() => {
  return user.value?.user_metadata?.full_name || user.value?.email?.split('@')[0] || 'Student'
})

const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

async function toggleComplete(topicId) {
  if (isTopicComplete(topicId)) {
    await markTopicIncomplete(topicId)
  } else {
    await markTopicComplete(topicId)
  }
}

async function handleSignOut() {
  await signOut()
  router.push('/')
}

async function loadData() {
  if (isAuthenticated.value) {
    await fetchProgress()
    practiceStats.value = await fetchUserStats()
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

.topic-progress-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.topic-progress-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--bg-main);
  border-radius: 0.5rem;
}

.topic-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.topic-icon {
  font-size: 1.25rem;
}

.topic-title {
  font-weight: 500;
}

.topic-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.complete-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.complete-btn:hover {
  border-color: var(--success);
  color: var(--success);
}

.complete-btn.completed {
  background: #ecfdf5;
  border-color: var(--success);
  color: var(--success);
}

.practice-link {
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.practice-link:hover {
  text-decoration: none;
  background: var(--primary-dark);
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
