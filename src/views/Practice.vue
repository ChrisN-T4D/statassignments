<template>
  <div class="practice-page">
    <div class="container">
      <div class="page-header">
        <h1>Practice Problems</h1>
        <p>Test your understanding with interactive practice questions.</p>
      </div>

      <!-- Topic Filter -->
      <div class="topic-filter">
        <button
          class="filter-btn"
          :class="{ active: !selectedTopic }"
          @click="selectTopic(null)"
        >
          All Topics
        </button>
        <button
          v-for="topic in topics"
          :key="topic.id"
          class="filter-btn"
          :class="{ active: selectedTopic === topic.id }"
          @click="selectTopic(topic.id)"
        >
          {{ topic.title }}
        </button>
      </div>

      <!-- Stats (if logged in) -->
      <div v-if="isAuthenticated && stats" class="stats-bar">
        <div class="stat">
          <span class="stat-value">{{ stats.total }}</span>
          <span class="stat-label">Attempted</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ stats.correct }}</span>
          <span class="stat-label">Correct</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ stats.accuracy }}%</span>
          <span class="stat-label">Accuracy</span>
        </div>
      </div>

      <!-- Login prompt -->
      <div v-if="!isAuthenticated" class="login-prompt">
        <p>
          <router-link to="/auth">Sign in</router-link> to track your practice progress!
        </p>
      </div>

      <!-- Problem Card -->
      <div v-if="currentProblem" class="problem-card">
        <div class="problem-header">
          <span class="difficulty-badge" :class="currentProblem.difficulty">
            {{ currentProblem.difficulty }}
          </span>
          <span class="topic-badge">{{ getTopicName(currentProblem.topic_id) }}</span>
        </div>

        <h2 class="problem-question">{{ currentProblem.question }}</h2>

        <!-- Multiple Choice -->
        <div v-if="currentProblem.question_type === 'multiple_choice'" class="options">
          <button
            v-for="(option, index) in currentProblem.options"
            :key="index"
            class="option-btn"
            :class="{
              selected: selectedAnswer === option,
              correct: showResult && option === currentProblem.correct_answer,
              incorrect: showResult && selectedAnswer === option && option !== currentProblem.correct_answer
            }"
            :disabled="showResult"
            @click="selectAnswer(option)"
          >
            {{ option }}
          </button>
        </div>

        <!-- True/False -->
        <div v-else-if="currentProblem.question_type === 'true_false'" class="options">
          <button
            v-for="option in ['True', 'False']"
            :key="option"
            class="option-btn"
            :class="{
              selected: selectedAnswer === option,
              correct: showResult && option === currentProblem.correct_answer,
              incorrect: showResult && selectedAnswer === option && option !== currentProblem.correct_answer
            }"
            :disabled="showResult"
            @click="selectAnswer(option)"
          >
            {{ option }}
          </button>
        </div>

        <!-- Numeric Input -->
        <div v-else-if="currentProblem.question_type === 'numeric'" class="numeric-input">
          <input
            v-model="numericAnswer"
            type="text"
            placeholder="Enter your answer"
            :disabled="showResult"
            @keyup.enter="submitNumericAnswer"
          />
          <button
            v-if="!showResult"
            class="btn-primary"
            :disabled="!numericAnswer"
            @click="submitNumericAnswer"
          >
            Submit
          </button>
        </div>

        <!-- Hint -->
        <div v-if="currentProblem.hint && !showResult" class="hint-section">
          <button class="hint-btn" @click="showHint = !showHint">
            {{ showHint ? 'Hide Hint' : 'Show Hint' }}
          </button>
          <p v-if="showHint" class="hint-text">{{ currentProblem.hint }}</p>
        </div>

        <!-- Result -->
        <div v-if="showResult" class="result-section">
          <div class="result" :class="{ correct: isCorrect, incorrect: !isCorrect }">
            <h3>{{ isCorrect ? 'Correct!' : 'Incorrect' }}</h3>
            <p v-if="!isCorrect">
              The correct answer is: <strong>{{ currentProblem.correct_answer }}</strong>
            </p>
          </div>
          <div v-if="currentProblem.explanation" class="explanation">
            <h4>Explanation</h4>
            <p>{{ currentProblem.explanation }}</p>
          </div>
          <button class="btn-primary" @click="loadNextProblem">
            Next Question
          </button>
        </div>
      </div>

      <!-- Loading / Empty State -->
      <div v-else-if="loading" class="loading">
        Loading problems...
      </div>

      <div v-else class="empty-state">
        <p>No practice problems available for this topic yet.</p>
        <button class="btn-primary" @click="selectTopic(null)">
          Try All Topics
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { topics } from '../data/topics.js'
import { usePractice } from '../composables/usePractice'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const { isAuthenticated } = useAuth()
const {
  currentProblem,
  loading,
  fetchRandomProblem,
  submitAnswer,
  fetchUserStats
} = usePractice()

const selectedTopic = ref(null)
const selectedAnswer = ref(null)
const numericAnswer = ref('')
const showResult = ref(false)
const showHint = ref(false)
const isCorrect = ref(false)
const stats = ref(null)

function getTopicName(topicId) {
  return topics.find(t => t.id === topicId)?.title || topicId
}

async function selectTopic(topicId) {
  selectedTopic.value = topicId
  await loadNextProblem()
  if (isAuthenticated.value) {
    stats.value = await fetchUserStats(topicId)
  }
}

async function loadNextProblem() {
  showResult.value = false
  showHint.value = false
  selectedAnswer.value = null
  numericAnswer.value = ''
  isCorrect.value = false
  await fetchRandomProblem(selectedTopic.value)
}

function selectAnswer(answer) {
  if (showResult.value) return
  selectedAnswer.value = answer
  checkAnswer(answer)
}

function submitNumericAnswer() {
  if (!numericAnswer.value || showResult.value) return
  checkAnswer(numericAnswer.value.trim())
}

async function checkAnswer(answer) {
  const correct = answer.toString().toLowerCase() === currentProblem.value.correct_answer.toString().toLowerCase()
  isCorrect.value = correct
  showResult.value = true

  if (isAuthenticated.value) {
    await submitAnswer(currentProblem.value.id, answer, correct)
    stats.value = await fetchUserStats(selectedTopic.value)
  }
}

onMounted(async () => {
  if (route.params.topicId) {
    selectedTopic.value = route.params.topicId
  }
  await loadNextProblem()
  if (isAuthenticated.value) {
    stats.value = await fetchUserStats(selectedTopic.value)
  }
})

watch(() => route.params.topicId, async (newTopicId) => {
  if (newTopicId) {
    await selectTopic(newTopicId)
  }
})
</script>

<style scoped>
.topic-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 2rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.stats-bar {
  display: flex;
  gap: 2rem;
  background: var(--bg-card);
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.login-prompt {
  background: #eff6ff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.problem-card {
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  padding: 2rem;
  box-shadow: var(--shadow);
}

.problem-header {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.difficulty-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.difficulty-badge.easy {
  background: #ecfdf5;
  color: #059669;
}

.difficulty-badge.medium {
  background: #fef3c7;
  color: #d97706;
}

.difficulty-badge.hard {
  background: #fef2f2;
  color: #dc2626;
}

.topic-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  background: #f1f5f9;
  color: var(--text-secondary);
}

.problem-question {
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-btn {
  padding: 1rem 1.25rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-card);
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.option-btn:hover:not(:disabled) {
  border-color: var(--primary);
}

.option-btn.selected {
  border-color: var(--primary);
  background: #eff6ff;
}

.option-btn.correct {
  border-color: var(--success);
  background: #ecfdf5;
}

.option-btn.incorrect {
  border-color: var(--danger);
  background: #fef2f2;
}

.option-btn:disabled {
  cursor: default;
}

.numeric-input {
  display: flex;
  gap: 1rem;
}

.numeric-input input {
  flex: 1;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
}

.numeric-input input:focus {
  outline: none;
  border-color: var(--primary);
}

.hint-section {
  margin-top: 1.5rem;
}

.hint-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.875rem;
  cursor: pointer;
}

.hint-text {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fef3c7;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.result-section {
  margin-top: 1.5rem;
}

.result {
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.result.correct {
  background: #ecfdf5;
  color: #059669;
}

.result.incorrect {
  background: #fef2f2;
  color: #dc2626;
}

.result h3 {
  margin-bottom: 0.25rem;
}

.explanation {
  background: #f1f5f9;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.explanation h4 {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
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

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading, .empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}
</style>
