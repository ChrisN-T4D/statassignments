<template>
  <div class="lesson-page" v-if="lesson">
    <div class="container">
      <!-- Lesson Header -->
      <div class="lesson-header">
        <router-link :to="backLink" class="back-link">Back</router-link>
        <div class="lesson-meta">
          <span class="software-badge" :class="lesson.software">{{ lesson.software }}</span>
          <span class="time-estimate">{{ lesson.estimatedTime }} min</span>
        </div>
        <h1>{{ lesson.title }}</h1>
        <div class="objectives">
          <h3>Learning Objectives</h3>
          <ul>
            <li v-for="(obj, i) in lesson.objectives" :key="i">{{ obj }}</li>
          </ul>
        </div>
      </div>

      <!-- Phase Navigation -->
      <div class="phase-nav">
        <button
          v-for="(phase, key) in phases"
          :key="key"
          class="phase-btn"
          :class="{ active: currentPhase === key, completed: completedPhases.includes(key) }"
          @click="goToPhase(key)"
        >
          <span class="phase-icon">{{ phase.icon }}</span>
          <span class="phase-label">{{ phase.label }}</span>
          <span v-if="completedPhases.includes(key)" class="check">✓</span>
        </button>
      </div>

      <!-- Phase Content -->
      <div class="phase-content">
        <!-- Learn Phase -->
        <div v-if="currentPhase === 'iDo'" class="phase i-do">
          <div class="phase-header">
            <span class="phase-badge i-do">Learn</span>
            <h2>{{ lesson.phases.iDo.title }}</h2>
          </div>

          <div class="content-blocks">
            <template v-for="(block, i) in lesson.phases.iDo.content" :key="i">
              <!-- Text Block -->
              <div v-if="block.type === 'text'" class="content-block text-block" v-html="formatText(block.content)"></div>

              <!-- Callout Block -->
              <div v-if="block.type === 'callout'" class="content-block callout" :class="block.style">
                <span class="callout-icon">{{ getCalloutIcon(block.style) }}</span>
                <p v-html="formatText(block.content)"></p>
              </div>

              <!-- Definition List -->
              <div v-if="block.type === 'definition_list'" class="content-block definition-list">
                <div v-for="(item, j) in block.items" :key="j" class="definition-item" :style="{ '--item-color': item.color }">
                  <div class="def-icon">{{ item.icon }}</div>
                  <div class="def-content">
                    <dt>{{ item.term }}</dt>
                    <dd>{{ item.definition }}</dd>
                  </div>
                </div>
              </div>

              <!-- Annotated Image -->
              <div v-if="block.type === 'annotated_image'" class="content-block annotated-image">
                <div class="image-container">
                  <div class="image-placeholder">
                    <span class="placeholder-icon">🖼️</span>
                    <span class="placeholder-text">{{ block.alt }}</span>
                    <span class="placeholder-note">(Image: {{ block.image }})</span>
                  </div>
                  <!-- Annotations shown as list for now -->
                  <div v-if="block.annotations" class="annotations-list">
                    <div v-for="(ann, j) in block.annotations" :key="j" class="annotation">
                      <span class="ann-label">{{ ann.label }}</span>
                      <span class="ann-desc">{{ ann.description }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step Sequence -->
              <div v-if="block.type === 'step_sequence'" class="content-block step-sequence">
                <div v-for="step in block.steps" :key="step.step" class="sequence-step">
                  <div class="step-number">{{ step.step }}</div>
                  <div class="step-content">
                    <h4>{{ step.title }}</h4>
                    <p>{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="phase-actions">
            <button class="btn-primary" @click="completePhase('iDo')">
              Continue to Guided Practice →
            </button>
          </div>
        </div>

        <!-- Practice Phase -->
        <div v-if="currentPhase === 'weDo'" class="phase we-do">
          <div class="phase-header">
            <span class="phase-badge we-do">Practice</span>
            <h2>{{ lesson.phases.weDo.title }}</h2>
          </div>

          <p class="phase-instructions">{{ lesson.phases.weDo.instructions }}</p>

          <div class="guided-steps">
            <div
              v-for="(step, i) in lesson.phases.weDo.steps"
              :key="i"
              class="guided-step"
              :class="{ current: currentStep === i, completed: i < currentStep, upcoming: i > currentStep }"
            >
              <div class="step-marker">
                <span v-if="i < currentStep" class="marker-check">✓</span>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <div class="step-body">
                <p class="step-instruction">{{ step.instruction }}</p>

                <div v-if="currentStep === i" class="step-active-content">
                  <div v-if="step.hint && showHint" class="hint-box">
                    <span class="hint-icon">💡</span>
                    <p>{{ step.hint }}</p>
                  </div>
                  <button v-if="step.hint && !showHint" class="btn-hint" @click="showHint = true">
                    Show Hint
                  </button>

                  <div v-if="step.checkpoint" class="checkpoint">
                    <p class="checkpoint-text">✓ {{ step.checkpoint }}</p>
                    <button class="btn-done" @click="completeStep">Done - Next Step</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentStep >= lesson.phases.weDo.steps.length" class="phase-complete">
            <div class="complete-message">
              <span class="complete-icon">🎉</span>
              <h3>Great job!</h3>
              <p>You've completed the guided practice.</p>
            </div>
            <button class="btn-primary" @click="completePhase('weDo')">
              Continue to Application →
            </button>
          </div>
        </div>

        <!-- Apply Phase -->
        <div v-if="currentPhase === 'youDo'" class="phase you-do">
          <div class="phase-header">
            <span class="phase-badge you-do">Apply</span>
            <h2>{{ lesson.phases.youDo.title }}</h2>
          </div>

          <p class="phase-instructions">{{ lesson.phases.youDo.instructions }}</p>

          <div class="assessment-questions">
            <div
              v-for="(question, i) in lesson.phases.youDo.questions"
              :key="question.id"
              class="question-card"
              :class="{ answered: answers[question.id] !== undefined }"
            >
              <div class="question-number">Question {{ i + 1 }}</div>

              <!-- Multiple Choice -->
              <QuestionMultipleChoice
                v-if="question.type === 'multiple_choice'"
                :question="question"
                :answer="answers[question.id]"
                :submitted="submitted"
                @answer="(val) => setAnswer(question.id, val)"
              />

              <!-- Multiple Select -->
              <QuestionMultipleSelect
                v-if="question.type === 'multiple_select'"
                :question="question"
                :answer="answers[question.id]"
                :submitted="submitted"
                @answer="(val) => setAnswer(question.id, val)"
              />

              <!-- Ordering -->
              <QuestionOrdering
                v-if="question.type === 'ordering'"
                :question="question"
                :answer="answers[question.id]"
                :submitted="submitted"
                @answer="(val) => setAnswer(question.id, val)"
              />

              <!-- Fill in the Blank -->
              <QuestionFillBlank
                v-if="question.type === 'fill_blank'"
                :question="question"
                :answer="answers[question.id]"
                :submitted="submitted"
                @answer="(val) => setAnswer(question.id, val)"
              />

              <!-- Matching -->
              <QuestionMatching
                v-if="question.type === 'matching'"
                :question="question"
                :answer="answers[question.id]"
                :submitted="submitted"
                @answer="(val) => setAnswer(question.id, val)"
              />

              <!-- Screenshot (placeholder) -->
              <QuestionScreenshot
                v-if="question.type === 'screenshot'"
                :question="question"
                :answer="answers[question.id]"
                :submitted="submitted"
                @answer="(val) => setAnswer(question.id, val)"
              />
            </div>
          </div>

          <div class="assessment-actions">
            <button
              v-if="!submitted"
              class="btn-primary"
              :disabled="!allQuestionsAnswered"
              @click="submitAssessment"
            >
              Submit Answers
            </button>

            <div v-if="submitted" class="results-summary" :class="{ 'is-perfect': score === totalQuestions }">
              <div class="score-display">
                <span class="score">{{ score }}/{{ totalQuestions }}</span>
                <span class="percentage">({{ Math.round(score / totalQuestions * 100) }}%)</span>
              </div>

              <!-- Perfect score - can complete -->
              <template v-if="score === totalQuestions">
                <p class="perfect">Perfect score! 🎉</p>
                <p class="completion-note">You've mastered this material.</p>
                <div class="result-actions">
                  <button class="btn-primary" @click="completeLesson">Complete Lesson →</button>
                </div>
              </template>

              <!-- Not perfect - must retry -->
              <template v-else>
                <p class="needs-work">You need 100% to complete this lesson.</p>
                <p class="retry-hint">Review the feedback above and try again.</p>
                <div class="result-actions">
                  <button class="btn-primary" @click="resetAssessment">Try Again</button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Completion Summary -->
    <div v-if="showSummary" class="summary-overlay">
      <div class="summary-card">
        <h3>Lesson Completion Summary</h3>
        <p class="summary-status">Status: Completed</p>
        <div class="summary-details">
          <div><strong>User:</strong> {{ completionSummary.username }}</div>
          <div><strong>Lesson:</strong> {{ completionSummary.title }}</div>
          <div v-if="completionSummary.moduleTitle"><strong>Module:</strong> {{ completionSummary.moduleTitle }}</div>
          <div><strong>Completed:</strong> {{ completionSummary.completedAt }}</div>
        </div>
        <div class="summary-actions print-hide">
          <button class="btn-primary" @click="printSummary">Print / Save PDF</button>
          <button class="btn-secondary" @click="copySummary">Copy Summary</button>
          <button class="btn-secondary" @click="closeSummary">Back to Software Practice</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Lesson Not Found -->
  <div v-else class="not-found">
    <div class="container">
      <h1>Lesson Not Found</h1>
      <p>The requested lesson doesn't exist.</p>
      <router-link to="/" class="btn-primary">Go Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { getLessonById } from '../data/softwareLessons'
import { getModuleById } from '../data/modules'

// Question Components
import QuestionMultipleChoice from '../components/questions/QuestionMultipleChoice.vue'
import QuestionMultipleSelect from '../components/questions/QuestionMultipleSelect.vue'
import QuestionOrdering from '../components/questions/QuestionOrdering.vue'
import QuestionFillBlank from '../components/questions/QuestionFillBlank.vue'
import QuestionMatching from '../components/questions/QuestionMatching.vue'
import QuestionScreenshot from '../components/questions/QuestionScreenshot.vue'

const route = useRoute()
const router = useRouter()
const { user } = useAuth()

// State
const lesson = ref(null)
const currentPhase = ref('iDo')
const completedPhases = ref([])
const currentStep = ref(0)
const showHint = ref(false)
const answers = ref({})
const submitted = ref(false)
const score = ref(0)
const showSummary = ref(false)
const completionSummary = ref({
  title: '',
  moduleTitle: '',
  username: '',
  completedAt: ''
})

// Phase configuration
const phases = {
  iDo: { label: 'Learn', icon: '📖' },
  weDo: { label: 'Practice', icon: '🧪' },
  youDo: { label: 'Apply', icon: '✍️' }
}

// Computed
const backLink = computed(() => {
  const classId = route.params.classId || 'statistics'
  const moduleId = lesson.value?.module || ''
  if (moduleId) {
    return `/class/${classId}?module=${moduleId}`
  }
  return `/class/${classId}`
})

const totalQuestions = computed(() => {
  return lesson.value?.phases?.youDo?.questions?.filter(q => q.type !== 'screenshot' || !q.placeholder)?.length || 0
})

const allQuestionsAnswered = computed(() => {
  if (!lesson.value?.phases?.youDo?.questions) return false
  const questions = lesson.value.phases.youDo.questions.filter(q => q.type !== 'screenshot' || !q.placeholder)
  return questions.every(q => {
    const answer = answers.value[q.id]
    if (answer === undefined || answer === null) return false

    switch (q.type) {
      case 'multiple_choice':
        return answer !== ''
      case 'multiple_select':
        return Array.isArray(answer) && answer.length > 0
      case 'ordering':
        return Array.isArray(answer) && answer.length > 0
      case 'matching':
        return Array.isArray(answer) && answer.length > 0 && answer.every(a => a !== '')
      case 'fill_blank':
        return typeof answer === 'string' && answer.trim() !== ''
      case 'screenshot':
        return answer !== null
      default:
        return true
    }
  })
})

// Methods
function loadLesson() {
  const lessonId = route.params.lessonId
  lesson.value = getLessonById(lessonId)
}

function goToPhase(phase) {
  currentPhase.value = phase
  if (phase === 'weDo') {
    currentStep.value = 0
    showHint.value = false
  }
  if (phase === 'youDo') {
    submitted.value = false
  }
}

function completePhase(phase) {
  if (!completedPhases.value.includes(phase)) {
    completedPhases.value.push(phase)
  }

  // Move to next phase
  if (phase === 'iDo') {
    currentPhase.value = 'weDo'
  } else if (phase === 'weDo') {
    currentPhase.value = 'youDo'
  }
}

function completeStep() {
  currentStep.value++
  showHint.value = false
}

function setAnswer(questionId, value) {
  answers.value = { ...answers.value, [questionId]: value }
}

function submitAssessment() {
  submitted.value = true

  // Calculate score
  let correct = 0
  const questions = lesson.value.phases.youDo.questions.filter(q => q.type !== 'screenshot' || !q.placeholder)

  questions.forEach(q => {
    const answer = answers.value[q.id]
    if (checkAnswer(q, answer)) {
      correct++
    }
  })

  score.value = correct
}

function checkAnswer(question, answer) {
  if (!answer) return false

  switch (question.type) {
    case 'multiple_choice':
      return answer === question.correct
    case 'multiple_select':
      if (!Array.isArray(answer)) return false
      return JSON.stringify([...answer].sort()) === JSON.stringify([...question.correct].sort())
    case 'ordering':
      return JSON.stringify(answer) === JSON.stringify(question.correctOrder)
    case 'fill_blank':
      const normalizedAnswer = answer.trim().toLowerCase()
      return question.answer.some(a => a.toLowerCase() === normalizedAnswer)
    case 'matching':
      // For matching, check if all pairs are correct
      if (!Array.isArray(answer)) return false
      return question.pairs.every((pair, index) => answer[index] === pair.right)
    default:
      return false
  }
}

function resetAssessment() {
  answers.value = {}
  submitted.value = false
  score.value = 0
}

function getModuleTitle(moduleId) {
  if (!moduleId) return ''
  const module = getModuleById(moduleId)
  return module?.title || moduleId
}

function formatCompletionTime(date) {
  return date.toLocaleString()
}

function buildSummaryText() {
  return [
    'Lesson Completion Summary',
    'Status: Completed',
    `User: ${completionSummary.value.username}`,
    `Lesson: ${completionSummary.value.title}`,
    completionSummary.value.moduleTitle ? `Module: ${completionSummary.value.moduleTitle}` : null,
    `Completed: ${completionSummary.value.completedAt}`
  ].filter(Boolean).join('\n')
}

function recordLessonCompletion() {
  if (!lesson.value?.id) return
  try {
    const raw = localStorage.getItem('completedSoftwareLessons')
    const parsed = raw ? JSON.parse(raw) : []
    const ids = Array.isArray(parsed) ? parsed : []
    if (!ids.includes(lesson.value.id)) {
      ids.push(lesson.value.id)
      localStorage.setItem('completedSoftwareLessons', JSON.stringify(ids))
    }
  } catch (err) {
    console.warn('Unable to save lesson completion:', err)
  }
}

function completeLesson() {
  completionSummary.value = {
    title: lesson.value?.title || 'Lesson',
    moduleTitle: getModuleTitle(lesson.value?.module),
    username: user.value?.name || user.value?.email || 'Unknown',
    completedAt: formatCompletionTime(new Date())
  }
  recordLessonCompletion()
  showSummary.value = true
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText(buildSummaryText())
  } catch (err) {
    console.warn('Unable to copy summary:', err)
  }
}

function printSummary() {
  window.print()
}

function closeSummary() {
  showSummary.value = false
  router.push(backLink.value)
}

function formatText(text) {
  // Simple markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

function getCalloutIcon(style) {
  const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️', note: '📝' }
  return icons[style] || 'ℹ️'
}

// Lifecycle
onMounted(() => {
  loadLesson()
})

watch(() => route.params.lessonId, () => {
  loadLesson()
  currentPhase.value = 'iDo'
  completedPhases.value = []
  currentStep.value = 0
  showHint.value = false
  answers.value = {}
  submitted.value = false
})
</script>

<style scoped>
.lesson-page {
  min-height: 100vh;
  padding: 2rem 0;
  background: var(--bg-main);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.back-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
}

.back-link:hover {
  color: var(--primary);
}

/* Header */
.lesson-header {
  margin-bottom: 2rem;
}

.lesson-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
}

.software-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.software-badge.jamovi { background: #f3e8ff; color: #7c3aed; }
.software-badge.spss { background: #fee2e2; color: #dc2626; }
.software-badge.r { background: #dbeafe; color: #2563eb; }

.time-estimate {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.lesson-header h1 {
  margin: 0 0 1rem 0;
  font-size: 1.75rem;
}

.objectives {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
}

.objectives h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.objectives ul {
  margin: 0;
  padding-left: 1.25rem;
}

.objectives li {
  margin: 0.25rem 0;
  font-size: 0.9375rem;
}

/* Phase Navigation */
.phase-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.5rem;
}

.phase-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9375rem;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.phase-btn:hover {
  background: var(--bg-elevated);
}

.phase-btn.active {
  background: var(--primary);
  color: white;
}

.phase-btn.completed {
  color: var(--success);
}

.phase-icon {
  font-size: 1.25rem;
}

.check {
  color: var(--success);
}

/* Phase Content */
.phase-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.phase-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.phase-badge.i-do { background: #dbeafe; color: #1d4ed8; }
.phase-badge.we-do { background: #fef3c7; color: #b45309; }
.phase-badge.you-do { background: #dcfce7; color: #16a34a; }

.phase-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

/* Content Blocks */
.content-blocks {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-block {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.text-block {
  font-size: 1rem;
  line-height: 1.7;
}

.callout {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  color: #111827;
}

.callout.tip { background: #f0fdf4; border-color: #86efac; }
.callout.warning { background: #fffbeb; border-color: #fcd34d; }
.callout.info { background: #eff6ff; border-color: #93c5fd; }

.callout-icon {
  font-size: 1.5rem;
}

.callout p {
  margin: 0;
  flex: 1;
}

/* Definition List */
.definition-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  background: transparent;
  border: none;
}

.definition-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--item-color, var(--primary));
  border-radius: 0.5rem;
}

.def-icon {
  font-size: 1.5rem;
}

.def-content dt {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.def-content dd {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

/* Annotated Image */
.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: var(--bg-elevated);
  border-radius: 0.5rem;
  text-align: center;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.placeholder-text {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.placeholder-note {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.annotations-list {
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
}

.annotation {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-elevated);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.ann-label {
  font-weight: 600;
  white-space: nowrap;
}

.ann-desc {
  color: var(--text-secondary);
}

/* Step Sequence */
.step-sequence {
  background: transparent;
  border: none;
  padding: 0;
}

.sequence-step {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.step-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

/* Guided Steps (We Do) */
.phase-instructions {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.guided-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.guided-step {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  transition: all 0.2s;
}

.guided-step.current {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}

.guided-step.completed {
  opacity: 0.7;
}

.guided-step.upcoming {
  opacity: 0.5;
}

.step-marker {
  width: 32px;
  height: 32px;
  background: var(--bg-elevated);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.guided-step.current .step-marker {
  background: var(--primary);
  color: white;
}

.guided-step.completed .step-marker {
  background: var(--success);
  color: white;
}

.marker-check {
  font-size: 1rem;
}

.step-body {
  flex: 1;
}

.step-instruction {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

.step-active-content {
  margin-top: 1rem;
}

.hint-box {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #fef3c7;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.hint-icon {
  font-size: 1.25rem;
}

.hint-box p {
  margin: 0;
  color: #92400e;
  font-size: 0.9375rem;
}

.btn-hint {
  background: transparent;
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  color: var(--text-secondary);
}

.btn-hint:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.checkpoint {
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 0.5rem;
  padding: 1rem;
}

.checkpoint-text {
  margin: 0 0 0.75rem 0;
  color: #166534;
  font-size: 0.9375rem;
}

.btn-done {
  background: var(--success);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-done:hover {
  filter: brightness(1.1);
}

/* Phase Complete */
.phase-complete {
  text-align: center;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  margin-top: 1rem;
}

.complete-message {
  margin-bottom: 1.5rem;
}

.complete-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

.complete-message h3 {
  margin: 0 0 0.5rem 0;
}

.complete-message p {
  margin: 0;
  color: var(--text-secondary);
}

/* Assessment */
.assessment-questions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.question-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.question-number {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.assessment-actions {
  text-align: center;
}

.results-summary {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}

.score-display {
  margin-bottom: 0.5rem;
}

.score {
  font-size: 2rem;
  font-weight: 700;
}

.percentage {
  color: var(--text-secondary);
  margin-left: 0.5rem;
}

.perfect { color: var(--success); font-weight: 600; }
.needs-work { color: var(--danger); font-weight: 600; }

.completion-note {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin-top: 0.25rem;
}

.retry-hint {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin-top: 0.25rem;
}

.results-summary.is-perfect {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 5%, var(--bg-card));
}

.result-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

/* Buttons */
.phase-actions {
  margin-top: 2rem;
  text-align: center;
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

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.1);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.summary-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
}

.summary-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: #111827;
}

.summary-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.summary-status {
  margin: 0 0 1rem 0;
  font-weight: 600;
  color: #111827;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #111827;
}

.summary-details strong {
  color: #111827;
}

.summary-actions {
  color: #111827;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media print {
  .lesson-page .container > :not(.summary-overlay) {
    display: none !important;
  }

  .summary-overlay {
    position: static;
    background: transparent;
    padding: 0;
  }

  .summary-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: #111827;
}

  .print-hide {
    display: none !important;
  }
}
\/\* Not Found \*\/
.not-found {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.summary-actions .btn-secondary {
  color: #111827;
}
</style>


