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

      <!-- Login prompt -->
      <div v-if="!isAuthenticated" class="login-prompt">
        <p>
          <router-link to="/auth">Sign in</router-link> to track your practice progress!
        </p>
      </div>

      <!-- Learning Objectives (BKT Mastery Tracking) -->
      <div v-if="isAuthenticated && currentObjectives.length > 0" class="objectives-tracker">
        <h3 class="objectives-title">Learning Objectives Being Assessed</h3>
        <div class="objectives-list">
          <div
            v-for="objective in currentObjectives"
            :key="objective.objectiveId"
            class="objective-card"
          >
            <div class="objective-header">
              <span class="objective-id">{{ objective.objectiveId }}</span>
              <span class="objective-type" :class="`type-${objective.objectiveType}`">
                {{ objective.objectiveType }}
              </span>
              <span class="objective-mastery-badge" :class="getMasteryClass(objectiveMastery[objective.objectiveId])">
                {{ objectiveMastery[objective.objectiveId] || 0 }}% mastery
              </span>
            </div>
            <p class="objective-text">{{ objective.objective }}</p>
            <div class="objective-progress-bar">
              <div
                class="objective-progress-fill"
                :style="{ width: `${objectiveMastery[objective.objectiveId] || 0}%` }"
              ></div>
            </div>
          </div>
        </div>
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
import { useBKT } from '../composables/useBKT'
import { getObjectivesForQuestion } from '../data/questionObjectiveMap'
import { getObjectiveById } from '../data/objectives'

const route = useRoute()
const { isAuthenticated } = useAuth()
const {
  currentProblem,
  loading,
  startMastery,
  nextMasteryProblem,
  masteryIndex,
  masteryTotal,
  submitAnswer
} = usePractice()
const { getMasteryPercent } = useBKT()

const selectedTopic = ref(null)
const selectedAnswer = ref(null)
const selectedAnswers = ref([])
const numericAnswer = ref('')
const showResult = ref(false)
const showHint = ref(false)
const isCorrect = ref(false)
const attemptsByProblem = ref({})
const feedbackMessage = ref('')
const hintThreshold = 2
const currentObjectives = ref([])
const objectiveMastery = ref({})

const attemptCount = computed(() => {
  if (!currentProblem.value) return 0
  return attemptsByProblem.value[currentProblem.value.id] || 0
})

const hintText = computed(() => {
  if (!currentProblem.value) return ''
  return currentProblem.value.hint || ''
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

async function loadObjectivesForCurrentProblem() {
  if (!currentProblem.value || !isAuthenticated.value) {
    currentObjectives.value = []
    objectiveMastery.value = {}
    return
  }

  console.log('Loading objectives for question:', currentProblem.value.id)
  const objectiveIds = getObjectivesForQuestion(currentProblem.value.id)
  console.log('Found objective IDs:', objectiveIds)

  const objectives = objectiveIds
    .map(id => getObjectiveById(id))
    .filter(Boolean)

  console.log('Loaded objectives:', objectives)
  currentObjectives.value = objectives

  // Load mastery percentages
  const masteryData = {}
  for (const obj of objectives) {
    const mastery = await getMasteryPercent(obj.objectiveId)
    masteryData[obj.objectiveId] = mastery
    console.log(`Mastery for ${obj.objectiveId}:`, mastery)
  }
  objectiveMastery.value = masteryData
  console.log('Final mastery data:', objectiveMastery.value)
}

function getMasteryClass(mastery) {
  if (mastery >= 90) return 'mastered'
  if (mastery >= 75) return 'proficient'
  if (mastery >= 60) return 'developing'
  return 'not-mastered'
}

function recordConceptReviewComplete(moduleId) {
  if (!moduleId) return
  try {
    const raw = localStorage.getItem('completedConceptReviewsV2')
    const parsed = raw ? JSON.parse(raw) : []
    const ids = Array.isArray(parsed) ? parsed : []
    if (!ids.includes(moduleId)) {
      ids.push(moduleId)
      localStorage.setItem('completedConceptReviewsV2', JSON.stringify(ids))
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

  // Reload objectives and mastery for the new problem
  await loadObjectivesForCurrentProblem()

  if (masteryTotal.value > 0 && masteryIndex.value >= masteryTotal.value) {
    const moduleFromQuery = getActiveModuleId()
    if (moduleFromQuery) {
      recordConceptReviewComplete(toStatsModuleId(moduleFromQuery))
      return
    }
    const topic = topics.find(t => t.id === selectedTopic.value)
    const moduleId = toStatsModuleId(topic?.moduleId || null)
    recordConceptReviewComplete(moduleId)
  }
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
    const difficulty = currentProblem.value.difficulty || 'medium'
    await submitAnswer(currentProblem.value.id, answer, correct, difficulty)
    // Update mastery display after answer is submitted
    await loadObjectivesForCurrentProblem()
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
})

watch(() => [route.query.module, route.params.topicId], async () => {
  selectedTopic.value = getSelectedTopicId()
  await startMastery(selectedTopic.value)
})

watch(currentProblem, async (problem) => {
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
  // Load objectives for new problem
  await loadObjectivesForCurrentProblem()
})

</script>

<style scoped>
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

/* Learning Objectives Tracker */
.objectives-tracker {
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.objectives-title {
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

.objective-card {
  padding: 1rem;
  background: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.objective-card:hover {
  border-color: var(--primary);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.objective-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
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

.objective-mastery-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-left: auto;
  transition: all 0.3s ease;
}

.objective-mastery-badge.mastered {
  background: #d1fae5;
  color: #065f46;
}

.objective-mastery-badge.proficient {
  background: #dbeafe;
  color: #1e40af;
}

.objective-mastery-badge.developing {
  background: #fef3c7;
  color: #92400e;
}

.objective-mastery-badge.not-mastered {
  background: #fee2e2;
  color: #991b1b;
}

.objective-text {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.objective-progress-bar {
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.objective-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%);
  border-radius: 999px;
  transition: width 0.5s ease;
}
</style>
