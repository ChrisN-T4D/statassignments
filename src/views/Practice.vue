<template>
  <div class="practice-page">
    <div class="container">
      <div class="page-header">
        <h1>Practice Problems</h1>
        <p>Test your understanding with interactive practice questions.</p>
        <div v-if="masteryTotal" class="mastery-progress">
          <span class="mastery-label">Mastery progress</span>
          <span class="mastery-value">{{ masteryIndex + (currentProblem ? 1 : 0) }} / {{ masteryTotal }}</span>
        </div>
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
          <span class="attempts-badge">Attempts: {{ attemptCount }}</span>
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

        <!-- Multiple Select -->
        <div v-else-if="currentProblem.question_type === 'multiple_select'" class="options">
          <button
            v-for="(option, index) in currentProblem.options"
            :key="index"
            class="option-btn"
            :class="{
              selected: selectedAnswers.includes(option),
              correct: showResult && currentProblem.correct_answer?.includes(option),
              incorrect: showResult && selectedAnswers.includes(option) && !currentProblem.correct_answer?.includes(option)
            }"
            :disabled="showResult"
            @click="selectAnswer(option)"
          >
            {{ option }}
          </button>
          <button
            v-if="!showResult"
            class="btn-primary"
            :disabled="selectedAnswers.length === 0"
            @click="submitMultiSelectAnswer"
          >
            Submit
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

        <p v-if="feedbackMessage" class="feedback-message">{{ feedbackMessage }}</p>

        <!-- Hint -->
        <div v-if="hintText && showHint && !showResult" class="hint-section">
          <p class="hint-text">{{ hintText }}</p>
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
        <p v-if="masteryTotal">You completed this mastery set.</p>
        <p v-else>No practice problems available for this topic yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { topics } from '../data/topics.js'
import { usePractice } from '../composables/usePractice'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const { isAuthenticated } = useAuth()
const {
  currentProblem,
  loading,
  startMastery,
  nextMasteryProblem,
  masteryIndex,
  masteryTotal,
  submitAnswer,
  fetchUserStats
} = usePractice()

const selectedTopic = ref(null)
const selectedAnswer = ref(null)
const selectedAnswers = ref([])
const numericAnswer = ref('')
const showResult = ref(false)
const showHint = ref(false)
const isCorrect = ref(false)
const stats = ref(null)
const attemptsByProblem = ref({})
const feedbackMessage = ref('')
const hintThreshold = 2

const attemptCount = computed(() => {
  if (!currentProblem.value) return 0
  return attemptsByProblem.value[currentProblem.value.id] || 0
})

const hintText = computed(() => {
  if (!currentProblem.value) return ''
  return currentProblem.value.hint || ''
})

const masteryCompleted = computed(() => {
  return Boolean(masteryTotal.value && !currentProblem.value)
})

function normalizeAnswerValue(value) {
  return value.toString().trim().toLowerCase()
}

function normalizeAnswerList(values) {
  return values.map(normalizeAnswerValue).sort()
}

function getTopicName(topicId) {
  return topics.find(t => t.id === topicId)?.title || topicId
}

function normalizeRouteValue(value) {
  if (Array.isArray(value)) return value[0] || null
  return value || null
}

function getActiveModuleId() {
  return normalizeRouteValue(route.query.module)
}

function getActiveTopicId() {
  return normalizeRouteValue(route.params.topicId)
}

function getSelectedTopicId() {
  return getActiveModuleId() || getActiveTopicId()
}

function toStatsModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value
  if (value.startsWith('module-')) return value.replace('module-', 'stats-module-')
  return value
}

function recordConceptReviewComplete(moduleId) {
  if (!moduleId) return
  try {
    const raw = localStorage.getItem('completedConceptReviews')
    const parsed = raw ? JSON.parse(raw) : []
    const ids = Array.isArray(parsed) ? parsed : []
    if (!ids.includes(moduleId)) {
      ids.push(moduleId)
      localStorage.setItem('completedConceptReviews', JSON.stringify(ids))
    }
  } catch (err) {
    console.warn('Unable to save concept review completion:', err)
  }
}

async function loadNextProblem() {
  showResult.value = false
  showHint.value = false
  selectedAnswer.value = null
  selectedAnswers.value = []
  numericAnswer.value = ''
  isCorrect.value = false
  feedbackMessage.value = ''
  await nextMasteryProblem()
}

function selectAnswer(answer) {
  if (showResult.value) return
  if (currentProblem.value.question_type === 'multiple_select') {
    if (selectedAnswers.value.includes(answer)) {
      selectedAnswers.value = selectedAnswers.value.filter(item => item !== answer)
    } else {
      selectedAnswers.value = [...selectedAnswers.value, answer]
    }
    return
  }
  selectedAnswer.value = answer
  checkAnswer(answer)
}

function submitNumericAnswer() {
  if (!numericAnswer.value || showResult.value) return
  checkAnswer(numericAnswer.value.trim())
}

function submitMultiSelectAnswer() {
  if (showResult.value || selectedAnswers.value.length === 0) return
  checkAnswer(selectedAnswers.value)
}

async function checkAnswer(answer) {
  let correct = false
  if (currentProblem.value.question_type === 'multiple_select') {
    const expected = Array.isArray(currentProblem.value.correct_answer)
      ? currentProblem.value.correct_answer
      : []
    const normalizedExpected = normalizeAnswerList(expected)
    const normalizedAnswer = normalizeAnswerList(Array.isArray(answer) ? answer : [])
    correct =
      normalizedExpected.length === normalizedAnswer.length &&
      normalizedExpected.every((value, index) => value === normalizedAnswer[index])
  } else {
    correct = normalizeAnswerValue(answer) === normalizeAnswerValue(currentProblem.value.correct_answer)
  }
  if (!attemptsByProblem.value[currentProblem.value.id]) {
    attemptsByProblem.value[currentProblem.value.id] = 0
  }
  attemptsByProblem.value[currentProblem.value.id] += 1
  isCorrect.value = correct

  if (isAuthenticated.value) {
    await submitAnswer(currentProblem.value.id, answer, correct)
    stats.value = await fetchUserStats(selectedTopic.value)
  }

  if (correct) {
    showResult.value = true
    feedbackMessage.value = ''
  } else {
    feedbackMessage.value = 'Incorrect. Try again.'
    if (attemptsByProblem.value[currentProblem.value.id] >= hintThreshold) {
      showHint.value = true
    }
    selectedAnswer.value = null
    numericAnswer.value = ''
  }
}

onMounted(async () => {
  selectedTopic.value = getSelectedTopicId()
  await startMastery(selectedTopic.value)
  if (isAuthenticated.value) {
    stats.value = await fetchUserStats(selectedTopic.value)
  }
})

watch(() => [route.query.module, route.params.topicId], async () => {
  selectedTopic.value = getSelectedTopicId()
  await startMastery(selectedTopic.value)
  if (isAuthenticated.value) {
    stats.value = await fetchUserStats(selectedTopic.value)
  }
})

watch(currentProblem, (problem) => {
  if (!problem) return
  if (!attemptsByProblem.value[problem.id]) {
    attemptsByProblem.value[problem.id] = 0
  }
  showResult.value = false
  showHint.value = false
  selectedAnswer.value = null
  selectedAnswers.value = []
  numericAnswer.value = ''
  isCorrect.value = false
  feedbackMessage.value = ''
})

watch([masteryCompleted, selectedTopic], ([completed]) => {
  if (!completed) return
  const moduleFromQuery = getActiveModuleId()
  if (moduleFromQuery) {
    recordConceptReviewComplete(toStatsModuleId(moduleFromQuery))
    return
  }
  const topic = topics.find(t => t.id === selectedTopic.value)
  const moduleId = toStatsModuleId(topic?.moduleId || null)
  recordConceptReviewComplete(moduleId)
})
</script>

<style scoped>
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

.mastery-progress {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.mastery-label {
  font-weight: 600;
}

.mastery-value {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: #e2e8f0;
  color: var(--text-secondary);
  font-size: 0.75rem;
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
  flex-wrap: wrap;
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

.attempts-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  background: #fff7ed;
  color: #9a3412;
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
  color: #111827;
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

.hint-text {
  padding: 0.75rem 1rem;
  background: #fef3c7;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #111827;
}

.feedback-message {
  margin-top: 1rem;
  color: #dc2626;
  font-size: 0.9rem;
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
  color: #111827;
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
