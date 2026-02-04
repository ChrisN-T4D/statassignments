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
            :disabled="showResult || isSubmitting"
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
            :disabled="showResult || isSubmitting"
            @click="selectAnswer(option)"
          >
            {{ option }}
          </button>
          <button
            v-if="!showResult"
            class="btn-primary"
            :disabled="selectedAnswers.length === 0 || isSubmitting"
            @click="submitMultiSelectAnswer"
          >
            <span v-if="isSubmitting" class="spinner"></span>
            <span v-else>Submit</span>
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
            :disabled="showResult || isSubmitting"
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
            :disabled="showResult || isSubmitting"
            @keyup.enter="submitNumericAnswer"
          />
          <button
            v-if="!showResult"
            class="btn-primary"
            :disabled="!numericAnswer || isSubmitting"
            @click="submitNumericAnswer"
          >
            <span v-if="isSubmitting" class="spinner"></span>
            <span v-else>Submit</span>
          </button>
        </div>

        <!-- Matching -->
        <div v-else-if="currentProblem.question_type === 'matching'" class="matching-question">
          <div class="matching-pairs">
            <div
              v-for="(pair, index) in currentProblem.pairs"
              :key="index"
              class="matching-pair"
            >
              <div class="matching-left">{{ pair.left }}</div>
              <select
                v-model="matchingAnswers[pair.left]"
                class="matching-select"
                :disabled="showResult || isSubmitting"
                @change="trackAnswerChange"
              >
                <option value="">Select match...</option>
                <option
                  v-for="(p, i) in currentProblem.pairs"
                  :key="i"
                  :value="p.right"
                >
                  {{ p.right }}
                </option>
              </select>
              <div v-if="showResult" class="matching-result-icon">
                <span v-if="matchingAnswers[pair.left] === pair.right" class="correct-icon">✓</span>
                <span v-else class="incorrect-icon">✗</span>
              </div>
            </div>
          </div>
          <button
            v-if="!showResult"
            class="btn-primary"
            :disabled="!isMatchingComplete || isSubmitting"
            @click="submitMatchingAnswer"
          >
            <span v-if="isSubmitting" class="spinner"></span>
            <span v-else>Submit</span>
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
import { useTimeTracking } from '../composables/useTimeTracking'
import { getObjectivesForQuestion } from '../data/questionObjectiveMap'
import { getObjectiveById } from '../data/objectives'
import { pb } from '../lib/pocketbase'

const route = useRoute()
const { isAuthenticated, user } = useAuth()
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
const timeTracker = useTimeTracking('multiple-choice')

const selectedTopic = ref(null)
const selectedAnswer = ref(null)
const selectedAnswers = ref([])
const numericAnswer = ref('')
const matchingAnswers = ref({})
const showResult = ref(false)
const showHint = ref(false)
const isCorrect = ref(false)
const attemptsByProblem = ref({})
const feedbackMessage = ref('')
const hintThreshold = 2
const currentObjectives = ref([])
const objectiveMastery = ref({})
const isSubmitting = ref(false)

// Answer confidence tracking
const questionDisplayTime = ref(null)
const firstSelectionTime = ref(null)
const answerChanges = ref(0)

// Sequence/spacing context tracking
const lastTopicReadTime = ref(null)
const lastAttemptTime = ref(null)
const timeSinceReading = ref(null)
const timeSinceLastAttempt = ref(null)
const hasReadTopicBefore = ref(false)

const attemptCount = computed(() => {
  if (!currentProblem.value) return 0
  return attemptsByProblem.value[currentProblem.value.id] || 0
})

const hintText = computed(() => {
  if (!currentProblem.value) return ''
  return currentProblem.value.hint || ''
})

const isMatchingComplete = computed(() => {
  if (!currentProblem.value || currentProblem.value.question_type !== 'matching') return false
  const pairs = currentProblem.value.pairs || []
  return pairs.every(pair => matchingAnswers.value[pair.left] && matchingAnswers.value[pair.left] !== '')
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

async function loadSequenceContext() {
  // Reset sequence/spacing data
  lastTopicReadTime.value = null
  lastAttemptTime.value = null
  timeSinceReading.value = null
  timeSinceLastAttempt.value = null
  hasReadTopicBefore.value = false

  if (!isAuthenticated.value || !user.value || !currentProblem.value) return

  try {
    const topicId = currentProblem.value.topic_id
    const now = Date.now()

    // Query last time user read this topic
    const topicReadings = await pb.collection('topic_readings').getList(1, 1, {
      filter: `user = "${user.value.id}" && topic_id = "${topicId}"`,
      sort: '-created'
    })

    if (topicReadings.items.length > 0) {
      const lastReading = topicReadings.items[0]
      const readingTime = new Date(lastReading.created).getTime()
      lastTopicReadTime.value = readingTime
      timeSinceReading.value = Math.round((now - readingTime) / 1000) // seconds
      hasReadTopicBefore.value = true
    }

    // Query last attempt on this topic (any problem in the topic)
    const lastAttempts = await pb.collection('practice_attempts').getList(1, 1, {
      filter: `user = "${user.value.id}"`,
      sort: '-created',
      expand: 'problem'
    })

    for (const attempt of lastAttempts.items) {
      if (attempt.expand?.problem?.topic_id === topicId) {
        const attemptTime = new Date(attempt.created).getTime()
        lastAttemptTime.value = attemptTime
        timeSinceLastAttempt.value = Math.round((now - attemptTime) / 1000) // seconds
        break
      }
    }

    console.log('[Sequence Context]', {
      topicId,
      hasReadBefore: hasReadTopicBefore.value,
      timeSinceReading: timeSinceReading.value,
      timeSinceLastAttempt: timeSinceLastAttempt.value
    })
  } catch (err) {
    console.warn('Unable to load sequence context:', err)
  }
}

async function loadNextProblem() {
  showResult.value = false
  showHint.value = false
  selectedAnswer.value = null
  selectedAnswers.value = []
  numericAnswer.value = ''
  matchingAnswers.value = {}
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

  // Track first selection time (confidence indicator)
  if (!firstSelectionTime.value) {
    const now = Date.now()
    firstSelectionTime.value = questionDisplayTime.value ?
      Math.round((now - questionDisplayTime.value) / 1000) : null
  }

  if (currentProblem.value.question_type === 'multiple_select') {
    if (selectedAnswers.value.includes(answer)) {
      selectedAnswers.value = selectedAnswers.value.filter(item => item !== answer)
    } else {
      selectedAnswers.value = [...selectedAnswers.value, answer]
    }
    return
  }

  // Track answer changes (hesitation indicator)
  if (selectedAnswer.value && selectedAnswer.value !== answer) {
    answerChanges.value++
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

function submitMatchingAnswer() {
  if (showResult.value || !isMatchingComplete.value) return
  checkAnswer(matchingAnswers.value)
}

function recordIncorrectAnswer(topicId) {
  if (!topicId) return
  try {
    const timestamp = Date.now()
    const errorData = {
      topicId,
      timestamp,
      expiresAt: timestamp + (5 * 60 * 1000) // Expires in 5 minutes
    }
    localStorage.setItem('recentError', JSON.stringify(errorData))
    console.log('[Return Visit] Recorded error for topic:', topicId)
  } catch (err) {
    console.warn('Unable to record error for return visit tracking:', err)
  }
}

async function checkAnswer(answer) {
  isSubmitting.value = true

  // Calculate correctness immediately
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
  } else if (currentProblem.value.question_type === 'matching') {
    // Check if all pairs match correctly
    const pairs = currentProblem.value.pairs || []
    correct = pairs.every(pair => answer[pair.left] === pair.right)
  } else {
    correct = normalizeAnswerValue(answer) === normalizeAnswerValue(currentProblem.value.correct_answer)
  }

  if (!attemptsByProblem.value[currentProblem.value.id]) {
    attemptsByProblem.value[currentProblem.value.id] = 0
  }
  attemptsByProblem.value[currentProblem.value.id] += 1
  isCorrect.value = correct

  // Stop time tracking and get time data
  const timeData = timeTracker.stop()

  // Collect confidence indicators
  const confidenceData = {
    time_to_first_selection: firstSelectionTime.value,
    answer_changes: answerChanges.value,
    total_deliberation_time: timeData.activeTimeSeconds
  }

  // Collect sequence/spacing context
  const sequenceData = {
    time_since_reading: timeSinceReading.value,
    time_since_last_attempt: timeSinceLastAttempt.value,
    has_read_topic_before: hasReadTopicBefore.value,
    last_topic_read_time: lastTopicReadTime.value,
    last_attempt_time: lastAttemptTime.value
  }

  // Show result immediately to user
  if (correct) {
    showResult.value = true
    feedbackMessage.value = ''
  } else {
    // Track incorrect answer for return visit detection
    recordIncorrectAnswer(currentProblem.value.topic_id)

    feedbackMessage.value = 'Incorrect. Try again.'
    if (attemptsByProblem.value[currentProblem.value.id] >= hintThreshold) {
      showHint.value = true
    }
    selectedAnswer.value = null
    numericAnswer.value = ''
    // Don't clear matchingAnswers on incorrect - let user see what they selected
  }

  isSubmitting.value = false

  // Submit to backend in background (don't await)
  if (isAuthenticated.value) {
    const difficulty = currentProblem.value.difficulty || 'medium'
    submitAnswer(currentProblem.value.id, answer, correct, difficulty, timeData, confidenceData, sequenceData)
      .then(() => {
        // Update mastery display after answer is submitted
        return loadObjectivesForCurrentProblem()
      })
      .catch(err => {
        console.error('Error submitting answer:', err)
      })
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
  matchingAnswers.value = {}
  isCorrect.value = false
  feedbackMessage.value = ''

  // Reset confidence tracking
  questionDisplayTime.value = Date.now()
  firstSelectionTime.value = null
  answerChanges.value = 0

  // Load sequence/spacing context
  await loadSequenceContext()

  // Start time tracking for new problem
  timeTracker.start()
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
  cursor: not-allowed;
  opacity: 0.6;
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

/* Loading spinner */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Matching Question Styles */
.matching-question {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.matching-pairs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.matching-pair {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--border);
}

.matching-left {
  font-weight: 600;
  color: var(--text-primary);
}

.matching-select {
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  background: white;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.matching-select:hover:not(:disabled) {
  border-color: var(--primary);
}

.matching-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.matching-select:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.matching-result-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.correct-icon {
  color: #10b981;
}

.incorrect-icon {
  color: #ef4444;
}
</style>
