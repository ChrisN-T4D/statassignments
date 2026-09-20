<template>
  <div class="benchmark-practice" :class="{ 'printing-packet': printFocus === 'packet' }">
    <div class="container">
      <template v-if="config">
        <!-- Back -->
        <router-link :to="backUrl" class="back-link">← Assignment Help: {{ config.title }}</router-link>

        <div v-if="benchmarkStudyGuide && !started && !finished" class="study-guide-row print-hide">
          <a :href="benchmarkStudyGuide.pdfPath" class="btn-secondary" download>
            Download {{ benchmarkStudyGuide.label }} (PDF)
          </a>
        </div>

        <div v-if="!started && !finished" class="cr-mode-bar print-hide">
          <p v-if="isOfflinePrimary">
            Offline primary: print the packet, work without internet, then enter all answers at once for scored feedback.
          </p>
          <p v-else>
            Online primary: take the practice test here, or print a packet if you want paper practice first.
          </p>
          <div class="cr-mode-actions">
            <button type="button" class="btn-secondary" @click="openPrintPacket">Print packet</button>
            <button
              v-if="canEnterPacketAnswers"
              type="button"
              class="btn-primary"
              @click="startBatchEntry"
            >
              Enter answers
            </button>
          </div>
        </div>

        <div v-if="showPrintPacket" class="print-packet-wrap">
          <div class="print-hide packet-toolbar">
            <button type="button" class="btn-primary" @click="printPacket">Print / Save PDF</button>
            <button type="button" class="btn-secondary" @click="showPrintPacket = false">Close packet</button>
          </div>
          <ConceptReviewPrintPacket
            :questions="packetQuestions"
            :module-label="packetLabel"
          />
        </div>

        <div v-if="canEnterPacketAnswers && batchMode" class="batch-entry print-hide">
          <h2>Enter answers</h2>
          <p>Submit once. You will see your score, strengths, weaknesses, and review links.</p>
          <form @submit.prevent="submitBatch">
            <fieldset v-for="(q, index) in packetQuestions" :key="q.id" class="batch-q">
              <legend>{{ index + 1 }}. {{ q.question }}</legend>
              <template v-if="q.type === 'multiple_choice' || q.type === 'true_false'">
                <label v-for="opt in batchOptions(q)" :key="opt.id">
                  <input type="radio" :name="q.id" :value="opt.id" v-model="batchAnswers[q.id]" />
                  {{ opt.text }}
                </label>
              </template>
              <template v-else-if="q.type === 'multiple_select'">
                <label v-for="opt in q.options" :key="opt.id">
                  <input type="checkbox" :value="opt.id" v-model="batchMulti[q.id]" />
                  {{ opt.text }}
                </label>
              </template>
            </fieldset>
            <button type="submit" class="btn-primary">Submit all answers</button>
          </form>
        </div>

        <!-- Intro (before start) -->
        <div v-if="!started && !finished && !showPrintPacket && !batchMode" class="intro">
          <h1>{{ config.title }}</h1>
          <p>{{ displaySubtitle }}</p>
          <p class="intro-proctor-note" v-if="benchmarkGuidance">
            {{ benchmarkGuidance.proctorNote }}
          </p>
          <p class="intro-retake-note" v-if="benchmarkGuidance">
            {{ benchmarkGuidance.retakeNote }}
          </p>
          <p>You’ll get {{ questionCount }} questions. Questions will target areas we detect you might need help on. Each answer updates your mastery model so later practice stays fresh. At the end you’ll see strengths, weaknesses, and review links.</p>
          <p v-if="priorAttempts.length" class="prior-attempts">
            Past practice on this benchmark:
            <span v-for="(a, i) in priorAttempts.slice(0, 5)" :key="i" class="prior-score">{{ a.score }}/{{ a.total }}</span>
          </p>
          <button type="button" class="btn-primary" :disabled="loading" @click="start">
            {{ loading ? 'Loading…' : 'Start practice test' }}
          </button>
        </div>

        <!-- Question -->
        <div v-else-if="started && !finished && currentQuestion && !batchMode" class="question-card">
          <div class="progress">
            Question {{ currentIndex + 1 }} of {{ questions.length }}
          </div>
          <h2 class="question-text">{{ currentQuestion.question }}</h2>

          <div v-if="currentQuestion.question_type === 'multiple_choice'" class="options">
            <button
              v-for="(opt, i) in currentQuestion.options"
              :key="i"
              type="button"
              class="option-btn"
              :class="{
                selected: selectedAnswer === opt,
                correct: showResult && opt === currentQuestion.correct_answer,
                incorrect: showResult && selectedAnswer === opt && opt !== currentQuestion.correct_answer
              }"
              :disabled="showResult"
              @click="selectAnswer(opt)"
            >
              {{ opt }}
            </button>
          </div>

          <div v-else-if="currentQuestion.question_type === 'true_false'" class="options">
            <button
              v-for="opt in ['True', 'False']"
              :key="opt"
              type="button"
              class="option-btn"
              :class="{
                selected: selectedAnswer === opt,
                correct: showResult && opt === currentQuestion.correct_answer,
                incorrect: showResult && selectedAnswer === opt && opt !== currentQuestion.correct_answer
              }"
              :disabled="showResult"
              @click="selectAnswer(opt)"
            >
              {{ opt }}
            </button>
          </div>

          <div v-else-if="currentQuestion.question_type === 'multiple_select'" class="options">
            <button
              v-for="(opt, i) in currentQuestion.options"
              :key="i"
              type="button"
              class="option-btn"
              :class="{
                selected: selectedAnswers.includes(opt),
                correct: showResult && currentQuestion.correct_answer?.includes(opt),
                incorrect: showResult && selectedAnswers.includes(opt) && !currentQuestion.correct_answer?.includes(opt)
              }"
              :disabled="showResult"
              @click="toggleMulti(opt)"
            >
              {{ opt }}
            </button>
            <button
              v-if="!showResult"
              type="button"
              class="btn-primary submit-multi"
              :disabled="selectedAnswers.length === 0"
              @click="submitMultiSelect"
            >
              Submit
            </button>
          </div>

          <div v-if="showResult" class="feedback">
            <p :class="lastCorrect ? 'correct-msg' : 'incorrect-msg'">
              {{ lastCorrect ? 'Correct!' : 'Not quite.' }}
            </p>
            <button type="button" class="btn-primary" @click="next">
              {{ isLastQuestion ? 'See results' : 'Next question' }}
            </button>
          </div>
        </div>

        <!-- Results -->
        <div v-else-if="finished" class="results">
          <h1>Practice test complete</h1>
          <p class="score">You got {{ score }} out of {{ questions.length }} correct.</p>
          <p v-if="bktSaved" class="bkt-note">Your answers were saved to your mastery profile for smarter question selection next time.</p>

          <section v-if="moduleStrengths.length" class="summary-section strengths-section">
            <h2>Strengths on this attempt</h2>
            <p>You answered every question correctly in these areas:</p>
            <ul class="summary-list">
              <li v-for="item in moduleStrengths" :key="item.moduleId" class="summary-item strength-item">
                <span class="summary-label">{{ item.label }}</span>
                <span class="summary-stat">{{ item.correct }}/{{ item.total }} correct</span>
              </li>
            </ul>
          </section>

          <section v-if="moduleWeaknesses.length" class="summary-section weaknesses-section">
            <h2>Focus areas next</h2>
            <p>Review these modules before your proctored benchmark:</p>
            <ul class="concepts-list">
              <li v-for="item in moduleWeaknesses" :key="item.moduleId" class="concept-item">
                <span class="concept-label">{{ item.label }}</span>
                <span class="summary-stat">{{ item.correct }}/{{ item.total }} correct on this test</span>
                <div class="review-links">
                  <span v-if="item.topicIds?.length" class="review-group">
                    <span class="review-group-label">Topics:</span>
                    <router-link
                      v-for="topicId in item.topicIds"
                      :key="topicId"
                      :to="`/topic/${topicId}`"
                      class="topic-link"
                    >
                      {{ formatTopicId(topicId) }}
                    </router-link>
                  </span>
                  <span v-if="item.classModuleId" class="review-group">
                    <router-link
                      :to="`/class/${classId}?module=${item.classModuleId}`"
                      class="topic-link"
                    >
                      Concept Review for this module
                    </router-link>
                  </span>
                  <span v-if="item.hasSoftware" class="review-group">
                    <router-link
                      :to="`/class/${classId}/software?module=${item.classModuleId}`"
                      class="topic-link"
                    >
                      Software practice
                    </router-link>
                  </span>
                </div>
              </li>
            </ul>
          </section>

          <section v-if="Object.keys(conceptsToReview).length > 0 && moduleWeaknesses.length === 0" class="concepts-section">
            <h2>Concepts you may want to review</h2>
            <p>Based on the questions you missed, use these links to review content:</p>
            <ul class="concepts-list">
              <li v-for="(info, key) in conceptsToReview" :key="key" class="concept-item">
                <span class="concept-label">{{ info.label }}</span>
                <div class="review-links">
                  <span v-if="info.topicIds?.length" class="review-group">
                    <span class="review-group-label">Topics:</span>
                    <router-link
                      v-for="topicId in info.topicIds"
                      :key="topicId"
                      :to="`/topic/${topicId}`"
                      class="topic-link"
                    >
                      {{ formatTopicId(topicId) }}
                    </router-link>
                  </span>
                  <span v-if="info.classModuleId" class="review-group">
                    <router-link
                      :to="`/class/${classId}?module=${info.classModuleId}`"
                      class="topic-link"
                    >
                      Open module in course
                    </router-link>
                  </span>
                  <span v-if="info.hasSoftware" class="review-group">
                    <router-link
                      :to="`/class/${classId}/software`"
                      class="topic-link"
                    >
                      Software practice
                    </router-link>
                  </span>
                </div>
              </li>
            </ul>
          </section>

          <p v-if="moduleStrengths.length && !moduleWeaknesses.length" class="all-correct">
            Strong work — you missed nothing grouped by module on this attempt. Keep reviewing Topics to stay sharp for the proctored exam.
          </p>

          <div class="results-actions">
            <button type="button" class="btn-secondary" @click="restart">Try again</button>
            <router-link :to="backUrl" class="btn-primary">Back to Assignment Help</router-link>
          </div>
        </div>
      </template>

      <div v-else class="not-found">
        <router-link :to="`/class/${classId}/assignment-help`" class="back-link">← Assignment Help</router-link>
        <p>Practice test not found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getBenchmarkPracticeConfig, getBenchmarkPacketQuestions, getQuestionsByModule } from '../data/conceptQuestions'
import { prepareConceptQuestionForSoftware } from '../data/conceptQuestionSoftware.js'
import { applySoftwareLabelsToText } from '../data/softwareObjectiveLabels.js'
import { preferredSoftware } from '../composables/usePreferredSoftware.js'
import { updateBKT, useBKT } from '../composables/useBKT'
import { usePractice } from '../composables/usePractice'
import { useProfile } from '../composables/useProfile'
import { useAuth } from '../composables/useAuth'
import { useAccessMode } from '../composables/useAccessMode'
import { getObjectivesForQuestion } from '../data/questionObjectiveMap.js'
import {
  getStatisticsBenchmarkLink,
  getBenchmarkCardGuidance,
  getBenchmarkStudyGuide
} from '../data/statisticsCanvasLinks.js'
import {
  loadBenchmarkAttemptHistory,
  saveBenchmarkAttempt,
  summarizeBenchmarkByModule
} from '../lib/benchmarkPracticeStore.js'
import { sampleBenchmarkQuestions, classifyAttemptSeen } from '../lib/benchmarkPracticeSample.js'
import { shuffleMcOptions } from '../lib/shuffleQuestionOptions.js'
import { scoreConceptAnswer } from '../lib/conceptReviewScoring.js'
import { pb } from '../lib/pocketbase'
import ConceptReviewPrintPacket from '../components/ConceptReviewPrintPacket.vue'

const route = useRoute()
const classId = computed(() => route.params.classId)
const benchmarkSlug = computed(() => route.params.benchmarkSlug)
const config = computed(() => getBenchmarkPracticeConfig(benchmarkSlug.value))
const displaySubtitle = computed(() =>
  applySoftwareLabelsToText(config.value?.subtitle || '', preferredSoftware.value || 'jamovi')
)
const backUrl = computed(() => config.value ? `/class/${classId.value}/assignment-help/${benchmarkSlug.value}` : `/class/${classId.value}/assignment-help`)
const questionCount = computed(() => getStatisticsBenchmarkLink(benchmarkSlug.value)?.questionCount ?? 15)
const benchmarkGuidance = computed(() =>
  benchmarkSlug.value ? getBenchmarkCardGuidance(benchmarkSlug.value) : null
)
const benchmarkStudyGuide = computed(() =>
  benchmarkSlug.value ? getBenchmarkStudyGuide(benchmarkSlug.value) : null
)
const packetLabel = computed(() => `${config.value?.title || 'Benchmark practice'} (print packet)`)
const packetSeed = computed(() => `${studentKey.value || 'guest'}:${benchmarkSlug.value}:packet`)

const { isOfflinePrimary, canEnterPacketAnswers, ensureLoaded } = useAccessMode()

const rawQuestions = ref([])
const questions = ref([])
const packetQuestions = ref([])
const started = ref(false)
const finished = ref(false)
const currentIndex = ref(0)
const selectedAnswer = ref(null)
const selectedAnswers = ref([])
const showResult = ref(false)
const lastCorrect = ref(false)
const answers = ref([])
const loading = ref(false)
const bktSaved = ref(false)
const moduleStrengths = ref([])
const moduleWeaknesses = ref([])
const priorAttempts = ref([])
const showPrintPacket = ref(false)
const batchMode = ref(false)
const batchAnswers = ref({})
const batchMulti = ref({})
const printFocus = ref(null)

const { getAllBKTStates } = useBKT()
const { submitAnswer } = usePractice()
const { studentKey } = useProfile()
const { isAuthenticated, user } = useAuth()

const currentQuestion = computed(() => questions.value[currentIndex.value] || null)
const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1)
const score = computed(() => answers.value.filter(a => a.correct).length)

const conceptsToReview = computed(() => {
  if (!config.value) return {}
  const missedByModule = {}
  answers.value.forEach((a, i) => {
    if (!a.correct && questions.value[i]?.moduleId) {
      const mid = questions.value[i].moduleId
      missedByModule[mid] = true
    }
  })
  const list = {}
  const sw = preferredSoftware.value || 'jamovi'
  Object.keys(missedByModule).forEach(mid => {
    const raw = config.value.getConceptLabel(mid)
    list[mid] = {
      ...raw,
      label: applySoftwareLabelsToText(raw.label, sw)
    }
  })
  return list
})

onMounted(async () => {
  await ensureLoaded()
  if (benchmarkSlug.value) {
    priorAttempts.value = loadBenchmarkAttemptHistory(studentKey.value, benchmarkSlug.value)
  }
  loadPacketQuestions()
  window.addEventListener('afterprint', afterPrint)
  if (route.query.print === '1') {
    showPrintPacket.value = true
  }
  if (route.query.batch === '1' && canEnterPacketAnswers.value) {
    startBatchEntry()
  }
})

onUnmounted(() => {
  window.removeEventListener('afterprint', afterPrint)
})

watch(
  () => [benchmarkSlug.value, studentKey.value, preferredSoftware.value],
  () => loadPacketQuestions()
)

watch(
  () => [route.query.print, route.query.batch],
  () => {
    showPrintPacket.value = route.query.print === '1'
    if (route.query.batch === '1' && canEnterPacketAnswers.value) {
      startBatchEntry()
    } else if (route.query.batch !== '1') {
      batchMode.value = false
    }
  }
)

function loadPacketQuestions() {
  if (!config.value || !benchmarkSlug.value) {
    packetQuestions.value = []
    return
  }
  const sw = preferredSoftware.value || 'jamovi'
  const qs = getBenchmarkPacketQuestions(
    benchmarkSlug.value,
    packetSeed.value,
    questionCount.value
  )
  packetQuestions.value = qs.map((q) => prepareConceptQuestionForSoftware(q, sw))
}

function batchOptions(q) {
  if (q.type === 'true_false') {
    return [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' }
    ]
  }
  return q.options || []
}

function afterPrint() {
  printFocus.value = null
}

function printPacket() {
  printFocus.value = 'packet'
  nextTick(() => window.print())
}

function openPrintPacket() {
  loadPacketQuestions()
  showPrintPacket.value = true
}

function startBatchEntry() {
  loadPacketQuestions()
  showPrintPacket.value = false
  batchMode.value = true
  const multi = {}
  for (const q of packetQuestions.value) {
    if (q.type === 'multiple_select') multi[q.id] = []
  }
  batchMulti.value = multi
  batchAnswers.value = {}
}

async function submitBatch() {
  if (!config.value || packetQuestions.value.length === 0) return
  loading.value = true
  bktSaved.value = false
  answers.value = []
  try {
    for (const q of packetQuestions.value) {
      let answer
      if (q.type === 'multiple_select') {
        answer = batchMulti.value[q.id] || []
      } else {
        answer = batchAnswers.value[q.id]
      }
      const scored = scoreConceptAnswer(
        q,
        q.type === 'true_false' ? (answer === 'true' || answer === true) : answer
      )
      answers.value.push({ correct: scored.correct, moduleId: q.moduleId, questionId: q.id })
      await persistBenchmarkAnswer(q, scored.correct)
    }
    rawQuestions.value = packetQuestions.value
    questions.value = packetQuestions.value.map((q) => convertQuestion(q)).filter(Boolean)
    batchMode.value = false
    started.value = true
    await finishBenchmark()
    finished.value = true
  } finally {
    loading.value = false
  }
}

function applyLabel(text) {
  return applySoftwareLabelsToText(text, preferredSoftware.value || 'jamovi')
}

function convertQuestion(q) {
  if (!q) return null
  const sw = preferredSoftware.value || 'jamovi'
  q = prepareConceptQuestionForSoftware(q, sw)
  let options = []
  let correct_answer = ''
  if (q.type === 'multiple_choice') {
    options = shuffleMcOptions(q.options.map(opt => opt.text))
    const correctOpt = q.options.find(opt => opt.id === q.correct)
    correct_answer = correctOpt?.text || ''
  } else if (q.type === 'multiple_select') {
    options = shuffleMcOptions(q.options.map(opt => opt.text))
    correct_answer = q.options.filter(opt => q.correct.includes(opt.id)).map(opt => opt.text)
  } else if (q.type === 'true_false') {
    options = ['True', 'False']
    correct_answer = q.correct ? 'True' : 'False'
  }
  return {
    id: q.id,
    moduleId: q.moduleId,
    question: q.question,
    question_type: q.type,
    options,
    correct_answer
  }
}

function masteryByModuleFromBKT(states) {
  if (!config.value) return {}
  const out = {}
  for (const moduleId of Object.keys(config.value.objectivesByModule)) {
    const objectiveIds = config.value.objectivesByModule[moduleId]
    let sum = 0
    let count = 0
    for (const oid of objectiveIds) {
      const state = states[oid]
      if (state && typeof state.pL === 'number') {
        sum += state.pL
        count++
      }
    }
    out[moduleId] = count > 0 ? sum / count : 0.5
  }
  return out
}

async function start() {
  if (!config.value) return
  loading.value = true
  try {
    const states = await getAllBKTStates()
    const masteryByModule = masteryByModuleFromBKT(states)
    const bankQuestions = (config.value.modules || []).flatMap(
      (mid) => getQuestionsByModule(mid) || []
    )
    const bankIds = new Set(bankQuestions.map((q) => q.id))
    const practiceSeenIds = []
    const conceptReviewSeenIds = []

    if (isAuthenticated.value && user.value?.id) {
      try {
        const attempts = await pb.collection('practice_attempts').getFullList({
          filter: `user = "${user.value.id}"`
        })
        for (const attempt of attempts) {
          if (!bankIds.has(attempt.problem)) continue
          const kind = classifyAttemptSeen(attempt, benchmarkSlug.value)
          if (kind === 'practice') practiceSeenIds.push(attempt.problem)
          else if (kind === 'concept_review') conceptReviewSeenIds.push(attempt.problem)
        }
      } catch (err) {
        console.warn('benchmark practice history fetch failed', err)
      }
    }

    rawQuestions.value = sampleBenchmarkQuestions({
      modules: config.value.modules,
      bankQuestions,
      masteryByModule,
      totalCount: questionCount.value,
      practiceSeenIds,
      conceptReviewSeenIds
    })
    if (rawQuestions.value.length === 0) {
      rawQuestions.value = config.value.getQuestions(questionCount.value)
    }
    questions.value = rawQuestions.value
      .map(q => convertQuestion(q))
      .filter(Boolean)
    started.value = true
    showResult.value = false
    selectedAnswer.value = null
    selectedAnswers.value = []
    currentIndex.value = 0
    answers.value = []
  } finally {
    loading.value = false
  }
}

function selectAnswer(opt) {
  if (showResult.value) return
  selectedAnswer.value = opt
  checkAndRecord()
}

function toggleMulti(opt) {
  if (showResult.value) return
  if (selectedAnswers.value.includes(opt)) {
    selectedAnswers.value = selectedAnswers.value.filter(x => x !== opt)
  } else {
    selectedAnswers.value = [...selectedAnswers.value, opt]
  }
}

function submitMultiSelect() {
  if (showResult.value || selectedAnswers.value.length === 0) return
  checkAndRecord()
}

function answerTextForRecord(q) {
  if (!q) return ''
  if (q.question_type === 'multiple_select') {
    return [...selectedAnswers.value].sort().join('; ')
  }
  return selectedAnswer.value || ''
}

async function persistBenchmarkAnswer(rawQ, isCorrect) {
  if (!rawQ?.id) return
  const difficulty = rawQ.difficulty || 'medium'
  const answerText = answerTextForRecord(convertQuestion(rawQ))
  const meta = {
    source: 'benchmark_practice',
    answer: answerText,
    module_id: rawQ.moduleId,
    class_id: classId.value,
    benchmark_slug: benchmarkSlug.value
  }

  const { error } = await submitAnswer(rawQ.id, answerText, isCorrect, difficulty, null, null, null, meta)
  if (!error) {
    bktSaved.value = true
    return
  }

  const objectives = getObjectivesForQuestion(rawQ.id)
  for (const objectiveId of objectives) {
    await updateBKT(
      objectiveId,
      isCorrect,
      difficulty,
      null,
      null,
      null,
      rawQ.id,
      meta
    ).catch(() => {})
  }
  if (objectives.length) bktSaved.value = true
}

async function checkAndRecord() {
  const q = currentQuestion.value
  if (!q) return
  let correct = false
  if (q.question_type === 'multiple_select') {
    const expected = Array.isArray(q.correct_answer) ? q.correct_answer : []
    correct =
      expected.length === selectedAnswers.value.length &&
      expected.every((v) => selectedAnswers.value.includes(v))
  } else {
    correct = selectedAnswer.value === q.correct_answer
  }
  lastCorrect.value = correct
  answers.value.push({ correct, moduleId: q.moduleId, questionId: q.id })
  showResult.value = true
  const rawQ = rawQuestions.value[currentIndex.value]
  await persistBenchmarkAnswer(rawQ, correct)
}

async function finishBenchmark() {
  if (!config.value) return
  const summary = summarizeBenchmarkByModule(
    answers.value,
    questions.value,
    (mid) => config.value.getConceptLabel(mid),
    applyLabel
  )
  moduleStrengths.value = summary.strengths
  moduleWeaknesses.value = summary.weaknesses

  saveBenchmarkAttempt(studentKey.value, {
    slug: benchmarkSlug.value,
    score: score.value,
    total: questions.value.length,
    moduleResults: summary.moduleResults,
    questionIds: questions.value.map((q) => q.id)
  })
  priorAttempts.value = loadBenchmarkAttemptHistory(studentKey.value, benchmarkSlug.value)
}

async function next() {
  if (!isLastQuestion.value) {
    currentIndex.value++
    showResult.value = false
    selectedAnswer.value = null
    selectedAnswers.value = []
  } else {
    await finishBenchmark()
    finished.value = true
  }
}

async function restart() {
  moduleStrengths.value = []
  moduleWeaknesses.value = []
  finished.value = false
  await start()
}

function formatTopicId(id) {
  return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
</script>

<style scoped>
.benchmark-practice {
  padding: 1.5rem 0 3rem;
  min-height: 60vh;
}

.back-link {
  display: inline-block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: var(--primary);
}

.intro {
  max-width: 36rem;
}

.intro h1 {
  font-size: 1.5rem;
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
}

.intro p {
  color: var(--text-secondary);
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
}

.intro-proctor-note,
.intro-retake-note {
  padding: 0.75rem 1rem;
  background: color-mix(in srgb, #f59e0b 12%, var(--bg-card));
  border: 1px solid color-mix(in srgb, #f59e0b 35%, var(--border));
  border-radius: 0.5rem;
  color: var(--text-primary);
}

.intro-proctor-note {
  background: color-mix(in srgb, var(--primary) 8%, var(--bg-card));
  border-color: color-mix(in srgb, var(--primary) 30%, var(--border));
}

.prior-attempts {
  font-size: 0.9rem;
}

.prior-score {
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.15rem 0.45rem;
  background: var(--bg-elevated);
  border-radius: 0.35rem;
  font-weight: 600;
}

.intro .btn-primary {
  margin-top: 1rem;
}

.question-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 40rem;
}

.progress {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.25rem 0;
  line-height: 1.45;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-btn {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.option-btn:hover:not(:disabled) {
  border-color: var(--primary);
  background: var(--bg-card);
}

.option-btn.selected {
  border-color: var(--primary);
  background: var(--primary);
  color: white;
}

.option-btn.correct {
  border-color: var(--success);
  background: var(--success-bg);
  color: var(--success);
}

.option-btn.incorrect {
  border-color: var(--danger);
  background: var(--danger-bg);
  color: var(--danger);
}

.submit-multi {
  margin-top: 0.75rem;
  align-self: flex-start;
}

.feedback {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.correct-msg {
  color: var(--success);
  font-weight: 500;
  margin: 0 0 0.75rem 0;
}

.incorrect-msg {
  color: var(--danger);
  font-weight: 500;
  margin: 0 0 0.75rem 0;
}

.results h1 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.score {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem 0;
}

.bkt-note {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0 0 1.25rem 0;
}

.summary-section {
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.strengths-section {
  background: color-mix(in srgb, var(--success) 8%, var(--bg-card));
  border: 1px solid color-mix(in srgb, var(--success) 30%, var(--border));
}

.weaknesses-section {
  background: var(--tip-bg);
  border: 1px solid var(--border);
}

.summary-section h2 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.summary-section > p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.summary-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-weight: 600;
  color: var(--text-primary);
}

.summary-stat {
  font-size: 0.875rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.concepts-section {
  background: var(--tip-bg);
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.concepts-section h2 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.concepts-section > p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.concepts-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.concept-item {
  margin-bottom: 1rem;
}

.concept-item:last-child {
  margin-bottom: 0;
}

.concept-label {
  font-weight: 600;
  color: var(--text-primary);
  display: block;
  margin-bottom: 0.35rem;
}

.review-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
}

.review-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem 0.5rem;
}

.review-group-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-right: 0.25rem;
}

.topic-link {
  display: inline-block;
  padding: 0.35rem 0.65rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  color: var(--primary);
  text-decoration: none;
  font-size: 0.85rem;
}

.topic-link:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.all-correct {
  color: var(--success);
  margin-bottom: 1.5rem;
}

.results-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.btn-primary:hover {
  filter: brightness(1.1);
}

.btn-secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border-color: var(--border);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.not-found p {
  color: var(--text-secondary);
}

.study-guide-row {
  margin-bottom: 1rem;
}

.study-guide-row .btn-secondary {
  text-decoration: none;
}

.cr-mode-bar {
  max-width: 36rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
}

.cr-mode-bar p {
  margin: 0 0 0.75rem 0;
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 0.9rem;
}

.cr-mode-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.batch-entry {
  max-width: 42rem;
  margin-bottom: 1.5rem;
}

.batch-q {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
}

.batch-q label {
  display: block;
  margin: 0.35rem 0;
}

.packet-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

@media print {
  .printing-packet .container > :not(.print-packet-wrap) {
    display: none !important;
  }

  .print-packet-wrap {
    display: block !important;
  }
}
</style>
