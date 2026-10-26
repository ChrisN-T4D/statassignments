<template>
  <div class="mp" :class="{ 'printing-slip': printFocus === 'slip' }">
    <header class="mp-head">
      <router-link :to="readingLink" class="mp-back">← Back to the Math Refresher reading</router-link>
      <h1>Math Practice</h1>
      <p class="mp-lede">
        Work each topic until you have mastered it. The questions use new numbers every time, so you can keep practicing
        until it clicks. Then earn the topic's Mastery Check to confirm it. Type your answers, and use the symbol buttons if you need Σ, √, or ².
      </p>
    </header>

    <section class="mp-road" aria-label="Your road to mastery">
      <div class="mp-road-top">
        <strong>Road to mastery</strong>
        <span>{{ roadDone }} of {{ roadTotal }} steps</span>
      </div>
      <div class="mp-bar" role="progressbar" :aria-valuenow="roadDone" aria-valuemin="0" :aria-valuemax="roadTotal">
        <span :style="{ width: `${(roadDone / roadTotal) * 100}%` }"></span>
      </div>
      <p class="mp-road-hint">Each topic has two steps: practice it to mastery, then pass its Mastery Check.</p>
    </section>

    <p v-if="newBadge" class="mp-newbadge" role="status">
      <span>🏅 {{ newBadge }}</span>
      <button type="button" class="mp-x" aria-label="Dismiss" @click="newBadge = ''">×</button>
    </p>

    <details class="mp-badges" open>
      <summary>Your badges</summary>
      <BadgeCase :set="badgeSet" :awards="awards" compact />
    </details>

    <section class="mp-topics" aria-label="Topics and your progress">
      <div
        v-for="t in topicCards"
        :key="t.id"
        class="mp-topic"
        :class="{ current: t.id === currentId && mode === 'practice', mastered: t.mastered, confirmed: t.confirmed }"
      >
        <button type="button" class="mp-topic-main" :aria-current="t.id === currentId ? 'true' : undefined" :disabled="mode === 'check'" @click="chooseTopic(t.id)">
          <span class="mp-topic-title">{{ t.title }}</span>
          <span class="mp-topic-state">{{ t.stateText }}</span>
        </button>
        <ol class="mp-steps-road" aria-label="Steps for this topic">
          <li :class="{ on: t.mastered }"><i></i>Practice <b v-if="!t.mastered && t.started">{{ t.percent }}%</b></li>
          <li :class="{ on: t.checkPassed }"><i></i>Check</li>
        </ol>
        <span v-if="!t.mastered" class="mp-streak" :aria-label="`${t.streak} of ${STREAK_NEEDED} correct in a row`">
          <i v-for="n in STREAK_NEEDED" :key="n" :class="{ on: n <= t.streak }"></i>
        </span>
        <button v-else-if="!t.checkPassed" type="button" class="mp-check-btn" :disabled="mode === 'check' || !!t.waitMinutes" @click="openCheck(t.id)">
          {{ t.waitMinutes ? `Retry in ${t.waitMinutes} min` : 'Take the Mastery Check' }}
        </button>
        <span v-else class="mp-badge">Mastery confirmed ✓</span>
      </div>
    </section>

    <p v-if="loadingStatus" class="mp-muted" role="status">Loading your progress…</p>

    <section v-else-if="mode === 'intro'" class="mp-card" aria-live="polite">
      <h2>Mastery Check: {{ currentTitle }}</h2>
      <p>You have practiced this topic to mastery. This short check confirms it.</p>
      <ul class="mp-rules">
        <li>{{ CHECK.questions }} questions with new numbers. You need {{ CHECK.passMark }} correct.</li>
        <li>Each question has a countdown. When time runs out it counts as missed.</li>
        <li>You see the worked steps at the end, not during the check.</li>
        <li>A calculator is available. Pasting is turned off.</li>
        <li>Your instructor can see how long each answer took and whether you left the page.</li>
        <li>If you do not pass, practice a little more and try again after {{ CHECK.retryMinutes }} minutes. Leaving a check partway counts as an attempt.</li>
      </ul>
      <button class="mp-btn" type="button" @click="startCheck">Start the Mastery Check</button>
      <button class="mp-btn secondary" type="button" @click="backToPractice">Not yet</button>
    </section>

    <section v-else-if="mode === 'result' && checkOutcome" class="mp-card mp-result-card" role="status">
      <h2>{{ checkOutcome.passed ? 'You passed the Mastery Check' : 'Not this time' }}</h2>
      <p class="mp-score">{{ checkOutcome.score }} of {{ checkOutcome.total }} correct</p>
      <p v-if="checkOutcome.passed">{{ currentTitle }} is mastered. 🎉</p>
      <p v-else>You need {{ CHECK.passMark }}. Review the steps below, practice this topic a bit more, and try again in {{ CHECK.retryMinutes }} minutes.</p>
      <ol class="mp-review">
        <li v-for="(r, i) in checkResults" :key="i" :class="r.correct ? 'ok' : 'no'">
          <p><strong>{{ r.correct ? '✓' : '✗' }}</strong> {{ r.question.prompt }}</p>
          <div v-if="r.question.figure" class="mp-figure small" v-html="r.question.figure"></div>
          <p class="mp-yours">You answered: {{ r.typed || '(no answer)' }}<span v-if="!r.correct"> · Correct answer: {{ answerOf(r.question) }}</span></p>
          <details v-if="!r.correct">
            <summary>How it works</summary>
            <ol><li v-for="(s, k) in r.question.steps" :key="k">{{ s }}</li></ol>
          </details>
        </li>
      </ol>
      <button class="mp-btn" type="button" @click="backToPractice">{{ checkOutcome.passed ? 'Continue' : 'Back to practice' }}</button>
    </section>

    <section v-else-if="finished" class="mp-card mp-done" role="status">
      <h2>Road complete 🎉</h2>
      <p>You have confirmed every topic. The algebra in this course will look familiar. You can keep practicing any topic above.</p>
      <router-link class="mp-btn" :to="nextStepLink">Go to Module 1</router-link>
    </section>

    <section v-else-if="question" class="mp-card" aria-live="polite">
      <div class="mp-qhead">
        <span class="mp-chip">{{ mode === 'check' ? `Mastery Check · question ${checkIndex + 1} of ${checkQuestions.length}` : currentTitle }}</span>
        <router-link v-if="mode === 'practice' && currentTopicSlug" class="mp-link" :to="`/topic/${currentTopicSlug}`">Review the reading</router-link>
        <span v-if="mode === 'check'" class="mp-timer" role="timer" aria-live="off" :class="{ low: secondsLeft <= 10 }">{{ secondsLeft }}s</span>
      </div>
      <div v-if="mode === 'check'" class="mp-bar slim" aria-hidden="true"><span :style="{ width: `${(secondsLeft / secondsTotal) * 100}%` }"></span></div>

      <p class="mp-prompt">{{ question.prompt }}</p>
      <div v-if="question.figure" class="mp-figure" v-html="question.figure"></div>

      <form v-if="mode === 'check' || !result" class="mp-form" @submit.prevent="mode === 'check' ? submitCheck(false) : submit()">
        <template v-if="question.spec.type === 'choice'">
          <fieldset class="mp-choices">
            <legend class="sr-only">Choose one answer</legend>
            <label v-for="(opt, i) in question.spec.options" :key="`${question.id}-${i}`" class="mp-choice" :class="{ picked: picked === i }">
              <input v-model="picked" type="radio" :value="i" name="mp-choice" @change="noteChange" />
              <span>{{ opt }}</span>
            </label>
          </fieldset>
        </template>
        <template v-else>
          <label class="mp-label" for="mp-answer">Your answer</label>
          <input
            id="mp-answer"
            ref="answerEl"
            v-model="typed"
            class="mp-input"
            type="text"
            inputmode="text"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Type a number or expression"
            @paste.prevent="onPaste"
            @drop.prevent
            @input="onInput"
          />
          <div class="mp-keys" role="group" aria-label="Symbol buttons">
            <button v-for="k in KEYS" :key="k.ch" type="button" class="mp-key" :aria-label="k.name" :title="k.name" @click="insert(k.ch)">
              {{ k.ch }}
            </button>
          </div>
        </template>
        <p v-if="notice" class="mp-notice" role="alert">{{ notice }}</p>
        <button class="mp-btn" type="submit" :disabled="submitting">{{ mode === 'check' ? (checkIndex + 1 < checkQuestions.length ? 'Submit and continue' : 'Submit and finish') : 'Check answer' }}</button>
      </form>

      <div v-else class="mp-result" :class="result.correct ? 'ok' : 'no'" role="status">
        <p class="mp-verdict">{{ result.correct ? 'Correct ✓' : 'Not quite' }}</p>
        <p v-if="result.note" class="mp-note">{{ result.note }}</p>
        <p v-if="result.hint" class="mp-note">{{ result.hint }}</p>
        <p v-if="!result.correct" class="mp-note">The answer is <strong>{{ answerOf(question) }}</strong>.</p>
        <details :open="!result.correct" class="mp-steps">
          <summary>How it works</summary>
          <ol>
            <li v-for="(s, i) in question.steps" :key="i">{{ s }}</li>
          </ol>
        </details>
        <p v-if="topicJustMastered" class="mp-celebrate">You have mastered {{ currentTitle }} in practice. Now earn its Mastery Check. 🎉</p>
        <button ref="nextEl" class="mp-btn" type="button" @click="next">{{ topicJustMastered ? 'Continue' : 'Next question' }}</button>
      </div>

      <details class="mp-calc">
        <summary>Calculator</summary>
        <label class="mp-label" for="mp-calc-in">Type a calculation, such as √(9+16) or 3/4</label>
        <input id="mp-calc-in" v-model="calcIn" class="mp-input" type="text" autocomplete="off" spellcheck="false" @paste.prevent />
        <p class="mp-calc-out" aria-live="polite">{{ calcOut }}</p>
      </details>
    </section>

    <p class="mp-muted mp-foot">
      A topic counts as mastered in practice after you answer {{ STREAK_NEEDED }} in a row correctly and the system is confident you know it.
      Answers that look copied or pasted from elsewhere count for less, so work each one yourself. The Mastery Check is how you show it.
    </p>

    <CompletionSlip
      :visible="slipVisible"
      :student-key="studentKey || ''"
      activity="Math Practice"
      module-label="Module 0: Math Refresher"
      score-text="All 7 topics mastered"
      :completed-at="slipCompletedAt"
      @print="printSlip"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { generateCheck, generateQuestion, levelForMastery, OBJECTIVE_IDS } from '../lib/mathPractice/generators.js'
import { gradeAnswer, parseExpression } from '../lib/mathPractice/grade.js'
import {
  CHECK,
  STREAK_NEEDED,
  allMastered,
  checkSeconds,
  isTopicMastered,
  pickTopic,
  retryWaitMinutes,
  scoreCheck,
  typingSignals
} from '../lib/mathPractice/session.js'
import { useMathPractice } from '../composables/useMathPractice.js'
import { useAwards } from '../composables/useAwards.js'
import { badgeSetForModule } from '../data/badges.js'
import BadgeCase from '../components/BadgeCase.vue'
import CompletionSlip from '../components/CompletionSlip.vue'
import { useAccessMode } from '../composables/useAccessMode.js'
import { useTimeTracking } from '../composables/useTimeTracking.js'

const route = useRoute()
const classId = computed(() => String(route.params.classId || 'statistics'))
const { loadStatus, recordAnswer, loadCheckStates, saveCheckState, recordCheckAnswer } = useMathPractice()
const timeTracker = useTimeTracking('short-answer')
const { awards, byAwardId, load: loadAwards, claim: claimAward } = useAwards()
const badgeSet = badgeSetForModule('stats-module-0')
const newBadge = ref('')
const { studentKey, ensureLoaded: loadAccessMode } = useAccessMode()

// The slip is the Canvas proof of Module 0: it appears once the server has recorded the module badge.
const moduleAward = computed(() => byAwardId.value['math-module:stats-module-0'])
const slipVisible = computed(() => Boolean(moduleAward.value))
const slipCompletedAt = computed(() => moduleAward.value?.earned_at || '')
const printFocus = ref(null)
function printSlip() {
  printFocus.value = 'slip'
  nextTick(() => window.print())
}
function afterPrint() {
  printFocus.value = null
}

const TOPICS = [
  { id: 'M0-O1', title: 'Order of operations', slug: 'order-of-operations' },
  { id: 'M0-O2', title: 'Solving for a variable', slug: 'solving-for-a-variable' },
  { id: 'M0-O3', title: 'Fractions, decimals, percents', slug: 'fractions-and-decimals' },
  { id: 'M0-O4', title: 'Exponents and roots', slug: 'exponents-and-square-roots' },
  { id: 'M0-O5', title: 'Summation (Σ)', slug: 'summation-notation' },
  { id: 'M0-O6', title: 'Reading graphs', slug: 'reading-graphs' },
  { id: 'M0-O7', title: 'Algebra symbols', slug: 'algebra-symbols' }
]
const KEYS = [
  { ch: 'Σ', name: 'sigma, sum' }, { ch: '√', name: 'square root' }, { ch: '²', name: 'squared' }, { ch: '³', name: 'cubed' },
  { ch: '^', name: 'power' }, { ch: '(', name: 'open bracket' }, { ch: ')', name: 'close bracket' }, { ch: '−', name: 'minus' },
  { ch: '×', name: 'times' }, { ch: '÷', name: 'divided by' }, { ch: '/', name: 'fraction bar' }, { ch: '±', name: 'plus or minus' },
  { ch: '|', name: 'absolute value bar' }, { ch: '%', name: 'percent' }, { ch: '≈', name: 'approximately equal' }
]

const status = ref({})
const checkStates = ref({})
const loadingStatus = ref(true)
const currentId = ref(null)
const mode = ref('practice') // practice | intro | check | result
const question = ref(null)
const lastKind = ref(null)
const typed = ref('')
const picked = ref(null)
const result = ref(null)
const notice = ref('')
const submitting = ref(false)
const topicJustMastered = ref(false)
const answerEl = ref(null)
const nextEl = ref(null)
const calcIn = ref('')
let stayOnTopic = false // practicing a topic that is already mastered

// Mastery Check state
const checkQuestions = ref([])
const checkIndex = ref(0)
const checkResults = ref([])
const checkOutcome = ref(null)
const secondsLeft = ref(0)
const secondsTotal = ref(1)
let tick = null
let questionStartedAt = 0

// Soft signals about the current question (see lib/mathPractice/session.js)
const signals = { pasted: false, leftPage: false, answerChanges: 0, keystrokes: 0, firstKeyMs: null }

const percent = (s) => Math.min(100, Math.round(((s?.pL ?? 0) / 0.9) * 100))
const topicCards = computed(() =>
  TOPICS.map((t) => {
    const s = status.value[t.id] || { pL: 0.1, streak: 0, attempts: 0 }
    const c = checkStates.value[t.id] || { state: null }
    const award = byAwardId.value[`math-topic:${t.id}`]?.state
    const mastered = isTopicMastered(s) || Boolean(award)
    const checkPassed = c.state === 'confirmed' || c.state === 'unverified' || award === 'confirmed' || award === 'unverified'
    const stateText = checkPassed ? 'Mastery confirmed' : mastered ? 'Practice mastered' : s.attempts > 0 ? `${percent(s)}% to mastery` : 'Not started'
    return {
      ...t,
      mastered,
      started: s.attempts > 0,
      percent: percent(s),
      streak: s.streak,
      checkPassed,
      confirmed: checkPassed,
      stateText,
      waitMinutes: retryWaitMinutes(c.lastFailedAt)
    }
  })
)
const roadTotal = TOPICS.length * 2
const roadDone = computed(() => topicCards.value.reduce((n, t) => n + (t.mastered ? 1 : 0) + (t.checkPassed ? 1 : 0), 0))
const finished = computed(() => !loadingStatus.value && topicCards.value.every((t) => t.checkPassed) && !question.value && mode.value === 'practice')
const currentTitle = computed(() => TOPICS.find((t) => t.id === currentId.value)?.title || '')
const currentTopicSlug = computed(() => TOPICS.find((t) => t.id === currentId.value)?.slug || '')
const readingLink = computed(() => ({ path: `/class/${classId.value}`, query: { module: 'stats-module-0', tab: 'topics' } }))
const nextStepLink = computed(() => ({ path: `/class/${classId.value}`, query: { module: 'stats-module-1', tab: 'topics' } }))
const calcOut = computed(() => {
  if (!calcIn.value.trim()) return ''
  const p = parseExpression(calcIn.value)
  if (!p) return 'Not a calculation I can read yet.'
  return `= ${Math.round(p.value * 1e8) / 1e8}`
})

function answerOf(q) {
  const spec = q?.spec
  if (!spec) return ''
  if (spec.type === 'choice') return spec.options[spec.correctIndex]
  return spec.percent ? `${spec.value}%` : String(spec.value)
}

function onVisibility() {
  if (document.hidden && question.value && (mode.value === 'check' || !result.value)) signals.leftPage = true
}
function onPaste() {
  signals.pasted = true
  notice.value = 'Please type your answer instead of pasting it.'
}
// Count typing from input events, not key presses: on-screen keyboards often report keys as "Unidentified".
function onInput(e) {
  const t = e?.inputType || ''
  if (t.startsWith('insert') || t.startsWith('delete')) {
    signals.keystrokes += 1
    if (signals.firstKeyMs === null) signals.firstKeyMs = Date.now() - questionStartedAt
  }
  noteChange()
}
function noteChange() {
  signals.answerChanges += 1
  if (notice.value && !signals.pasted) notice.value = ''
}
function resetSignals() {
  signals.pasted = false
  signals.leftPage = false
  signals.answerChanges = 0
  signals.keystrokes = 0
  signals.firstKeyMs = null
}

function showQuestion(q) {
  question.value = q
  typed.value = ''
  picked.value = null
  result.value = null
  notice.value = ''
  topicJustMastered.value = false
  resetSignals()
  questionStartedAt = Date.now()
  timeTracker.reset()
  timeTracker.start()
  nextTick(() => answerEl.value?.focus())
}

function newQuestion() {
  const id = currentId.value
  if (!id) {
    question.value = null
    return
  }
  const level = levelForMastery(status.value[id]?.pL ?? 0.1)
  const q = generateQuestion(id, { level, avoidKind: lastKind.value })
  lastKind.value = q.kind
  showQuestion(q)
}

function chooseTopic(id) {
  if (mode.value === 'check') return
  mode.value = 'practice'
  checkOutcome.value = null
  currentId.value = id
  stayOnTopic = isTopicMastered(status.value[id] || {})
  newQuestion()
}

function insert(ch) {
  const el = answerEl.value
  const start = el?.selectionStart ?? typed.value.length
  const end = el?.selectionEnd ?? typed.value.length
  typed.value = typed.value.slice(0, start) + ch + typed.value.slice(end)
  signals.keystrokes += 1
  if (signals.firstKeyMs === null) signals.firstKeyMs = Date.now() - questionStartedAt
  noteChange()
  nextTick(() => {
    el?.focus()
    el?.setSelectionRange(start + ch.length, start + ch.length)
  })
}

/* ---------------------------------------------------------------- badges */
const topicTitle = (objectiveId) => TOPICS.find((t) => t.id === objectiveId)?.title || objectiveId

async function claimTopicBadge(objectiveId, { announce } = {}) {
  const res = await claimAward(`math-topic:${objectiveId}`)
  if (res?.created && announce === 'practice') newBadge.value = `Practice badge earned: ${topicTitle(objectiveId)}. Now earn its Mastery Check.`
  if ((res?.created || res?.upgraded) && announce === 'check') newBadge.value = `Badge earned: ${topicTitle(objectiveId)} mastered!`
  return res
}

async function claimModuleBadgeIfReady() {
  const everyPassed = TOPICS.every((t) => {
    const st = byAwardId.value[`math-topic:${t.id}`]?.state
    return st === 'confirmed' || st === 'unverified'
  })
  if (!everyPassed) return
  const res = await claimAward(badgeSet.moduleBadge.awardId)
  if (res?.created) newBadge.value = `${badgeSet.moduleBadge.name}: you earned the Math Refresher module badge! 🎉`
}

/* ---------------------------------------------------------------- practice */
async function submit() {
  if (submitting.value || !question.value) return
  const isChoice = question.value.spec.type === 'choice'
  const raw = isChoice ? picked.value : typed.value
  if (isChoice ? raw === null : !String(raw).trim()) {
    notice.value = isChoice ? 'Choose an answer first.' : 'Type an answer first.'
    return
  }
  const graded = gradeAnswer(raw, question.value.spec)
  if (graded.invalid) {
    notice.value = graded.hint
    return
  }
  submitting.value = true
  const timeData = timeTracker.stop()
  const typedText = isChoice ? question.value.spec.options[raw] : String(raw)
  const was = isTopicMastered(status.value[currentId.value] || {})
  const rec = await recordAnswer(question.value, { typed: typedText, correct: graded.correct, timeData, signals: { ...signals } })
  const prev = status.value[currentId.value] || { pL: 0.1, streak: 0, attempts: 0, correct: 0 }
  status.value = {
    ...status.value,
    [currentId.value]: { pL: rec.pL ?? prev.pL, streak: rec.streak, attempts: prev.attempts + 1, correct: prev.correct + (graded.correct ? 1 : 0) }
  }
  topicJustMastered.value = !was && isTopicMastered(status.value[currentId.value])
  result.value = graded
  submitting.value = false
  nextTick(() => nextEl.value?.focus())
  if (topicJustMastered.value) claimTopicBadge(currentId.value, { announce: 'practice' })
}

function next() {
  if (stayOnTopic) {
    newQuestion()
    return
  }
  if (topicJustMastered.value) {
    const nextId = pickTopic(OBJECTIVE_IDS, status.value, null)
    if (!nextId) {
      question.value = null
      result.value = null
      return
    }
    currentId.value = nextId
    lastKind.value = null
  } else {
    currentId.value = pickTopic(OBJECTIVE_IDS, status.value, currentId.value) ?? currentId.value
  }
  newQuestion()
}

/* ---------------------------------------------------------------- mastery check */
function openCheck(id) {
  const c = checkStates.value[id] || {}
  if (retryWaitMinutes(c.lastFailedAt)) return
  currentId.value = id
  question.value = null
  result.value = null
  checkOutcome.value = null
  mode.value = 'intro'
}

function backToPractice() {
  stopTimer()
  checkOutcome.value = null
  mode.value = 'practice'
  question.value = null
  stayOnTopic = false
  const nextId = pickTopic(OBJECTIVE_IDS, status.value, null)
  const everythingDone = topicCards.value.every((t) => t.checkPassed)
  if (everythingDone) return
  currentId.value = nextId ?? currentId.value
  if (nextId) newQuestion()
}

function stopTimer() {
  if (tick) clearInterval(tick)
  tick = null
}

function startCheck() {
  const id = currentId.value
  // Opening a check counts as an attempt: leaving partway means waiting before the next one.
  checkStates.value = { ...checkStates.value, [id]: { ...(checkStates.value[id] || {}), state: checkStates.value[id]?.state ?? null, lastFailedAt: Date.now(), inProgress: true } }
  saveCheckState(id, checkStates.value[id])
  checkQuestions.value = generateCheck(id, { count: CHECK.questions })
  checkResults.value = []
  checkIndex.value = 0
  mode.value = 'check'
  beginCheckQuestion()
}

function beginCheckQuestion() {
  const q = checkQuestions.value[checkIndex.value]
  showQuestion(q)
  secondsTotal.value = checkSeconds(q)
  secondsLeft.value = secondsTotal.value
  const endsAt = Date.now() + secondsTotal.value * 1000
  stopTimer()
  tick = setInterval(() => {
    secondsLeft.value = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))
    if (secondsLeft.value <= 0) {
      stopTimer()
      submitCheck(true)
    }
  }, 250)
}

async function submitCheck(timedOut) {
  if (submitting.value || !question.value || mode.value !== 'check') return
  const q = question.value
  const isChoice = q.spec.type === 'choice'
  const raw = isChoice ? picked.value : typed.value
  const empty = isChoice ? raw === null : !String(raw).trim()
  if (empty && !timedOut) {
    notice.value = isChoice ? 'Choose an answer, or wait for the timer.' : 'Type an answer, or wait for the timer.'
    return
  }
  submitting.value = true
  stopTimer()
  const timeData = timeTracker.stop()
  const typedText = empty ? '' : isChoice ? q.spec.options[raw] : String(raw)
  const graded = empty ? { correct: false } : gradeAnswer(raw, q.spec)
  const correct = !!graded.correct && !graded.invalid
  const flags = typingSignals({
    chars: isChoice ? 0 : typedText.length,
    keystrokes: signals.keystrokes,
    firstKeyMs: signals.firstKeyMs,
    pasted: signals.pasted,
    leftPage: signals.leftPage,
    timedOut
  })
  checkResults.value = [...checkResults.value, { question: q, typed: typedText, correct, flags }]
  await recordCheckAnswer(q, { typed: typedText, correct, timeData, flags })
  submitting.value = false
  if (checkIndex.value + 1 < checkQuestions.value.length) {
    checkIndex.value += 1
    beginCheckQuestion()
  } else {
    finishCheck()
  }
}

function finishCheck() {
  stopTimer()
  const id = currentId.value
  const outcome = scoreCheck(checkResults.value.map((r) => ({ correct: r.correct, flags: r.flags })))
  checkOutcome.value = outcome
  const prev = checkStates.value[id] || {}
  const saved = outcome.passed
    ? { state: outcome.state, score: outcome.score, passedAt: Date.now(), lastFailedAt: null, inProgress: false }
    : { ...prev, state: prev.state ?? null, score: outcome.score, lastFailedAt: Date.now(), inProgress: false }
  checkStates.value = { ...checkStates.value, [id]: saved }
  saveCheckState(id, saved)
  question.value = null
  mode.value = 'result'
  if (outcome.passed) {
    claimTopicBadge(id, { announce: 'check' }).then(() => claimModuleBadgeIfReady())
  }
}

onMounted(async () => {
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('afterprint', afterPrint)
  loadAccessMode()
  status.value = await loadStatus(OBJECTIVE_IDS)
  checkStates.value = loadCheckStates(OBJECTIVE_IDS)
  await loadAwards()
  // The server is the record of badges: a check passed on another device shows here too.
  for (const t of TOPICS) {
    const st = byAwardId.value[`math-topic:${t.id}`]?.state
    if ((st === 'confirmed' || st === 'unverified') && !(checkStates.value[t.id]?.state)) {
      checkStates.value = { ...checkStates.value, [t.id]: { ...(checkStates.value[t.id] || {}), state: st } }
    }
  }
  loadingStatus.value = false
  // Students who mastered a topic before badges existed get their badge now.
  for (const t of TOPICS) {
    if (!byAwardId.value[`math-topic:${t.id}`] && isTopicMastered(status.value[t.id] || {})) await claimTopicBadge(t.id)
  }
  const wanted = String(route.query.topic || '')
  currentId.value = OBJECTIVE_IDS.includes(wanted) ? wanted : pickTopic(OBJECTIVE_IDS, status.value, null) ?? OBJECTIVE_IDS[0]
  const everyPracticed = allMastered(OBJECTIVE_IDS, status.value)
  if (!everyPracticed || OBJECTIVE_IDS.includes(wanted)) {
    stayOnTopic = OBJECTIVE_IDS.includes(wanted) && isTopicMastered(status.value[currentId.value] || {})
    newQuestion()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('afterprint', afterPrint)
  document.removeEventListener('visibilitychange', onVisibility)
  stopTimer()
  timeTracker.stop()
})
</script>

<style scoped>
.mp { max-width: 760px; margin: 0 auto; padding: 1rem 16px 3rem; color: var(--text-primary); }
.mp-back { font-size: 0.9rem; color: var(--primary); text-decoration: none; }
.mp h1 { margin: 0.5rem 0 0.25rem; font-size: 1.6rem; }
.mp h2 { margin: 0 0 0.5rem; font-size: 1.25rem; }
.mp-lede { color: var(--text-secondary); margin: 0 0 1rem; line-height: 1.5; }
.mp-road { border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card); padding: 0.75rem 1rem; margin-bottom: 0.75rem; }
.mp-road-top { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.4rem; }
.mp-road-hint { margin: 0.4rem 0 0; font-size: 0.8rem; color: var(--text-secondary); }
.mp-bar { height: 10px; border-radius: 6px; background: var(--border); overflow: hidden; }
.mp-bar.slim { height: 5px; margin-bottom: 0.5rem; }
.mp-bar span { display: block; height: 100%; background: var(--success); border-radius: 6px; transition: width 0.3s; }
.mp-topics { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 0.5rem; margin-bottom: 1rem; }
.mp-topic { padding: 0.6rem 0.7rem; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-card); display: grid; gap: 0.35rem; align-content: start; }
.mp-topic.current { border-color: var(--primary); box-shadow: 0 0 0 2px var(--focus-ring, rgba(79, 70, 229, 0.25)); }
.mp-topic.confirmed { background: var(--success-bg); }
.mp-topic-main { text-align: left; padding: 0; border: 0; background: none; color: inherit; cursor: pointer; font: inherit; display: grid; gap: 0.2rem; }
.mp-topic-main:disabled { cursor: default; }
.mp-topic-title { font-weight: 600; font-size: 0.9rem; }
.mp-topic-state { font-size: 0.8rem; color: var(--text-secondary); }
.mp-steps-road { list-style: none; display: flex; gap: 0.75rem; margin: 0; padding: 0; font-size: 0.75rem; color: var(--text-secondary); }
.mp-steps-road li { display: flex; align-items: center; gap: 0.3rem; }
.mp-steps-road i { width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--border); display: inline-block; }
.mp-steps-road li.on i { background: var(--success); border-color: var(--success); }
.mp-steps-road b { font-weight: 600; }
.mp-streak { display: flex; gap: 4px; }
.mp-streak i { width: 14px; height: 6px; border-radius: 3px; background: var(--border); display: block; }
.mp-streak i.on { background: var(--success); }
.mp-check-btn { min-height: 40px; padding: 0.35rem 0.6rem; font-size: 0.85rem; font-weight: 600; border: 1px solid var(--primary); border-radius: 8px; background: transparent; color: var(--primary); cursor: pointer; }
.mp-check-btn:disabled { color: var(--text-secondary); border-color: var(--border); cursor: default; }
.mp-badge { font-size: 0.85rem; font-weight: 700; color: var(--success); }
.mp-newbadge { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin: 0 0 0.75rem; padding: 0.6rem 0.9rem; border-radius: 10px; background: var(--success-bg); font-weight: 600; }
.mp-x { border: 0; background: none; color: inherit; font-size: 1.3rem; cursor: pointer; line-height: 1; min-width: 32px; min-height: 32px; }
.mp-badges { border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card); padding: 0.6rem 1rem; margin-bottom: 0.75rem; }
.mp-badges summary { cursor: pointer; font-weight: 600; margin-bottom: 0.5rem; }
.mp-card { border: 1px solid var(--border); border-radius: 14px; background: var(--bg-card); padding: 1.1rem 1.1rem 1.25rem; box-shadow: var(--shadow); }
.mp-qhead { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
.mp-chip { font-size: 0.8rem; font-weight: 600; padding: 0.15rem 0.6rem; border-radius: 999px; border: 1px solid var(--border); background: var(--bg-elevated, var(--bg-main)); color: var(--text-primary); }
.mp-timer { font-weight: 700; font-variant-numeric: tabular-nums; }
.mp-timer.low { color: var(--danger); }
.mp-link { font-size: 0.85rem; color: var(--primary); }
.mp-prompt { font-size: 1.15rem; line-height: 1.5; margin: 0.5rem 0 0.75rem; }
.mp-figure { margin: 0.5rem 0 1rem; }
.mp-figure.small { max-width: 320px; }
.mp-label { display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
.mp-input { width: 100%; box-sizing: border-box; padding: 0.7rem 0.8rem; font-size: 1.1rem; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-input, var(--bg-main)); color: var(--text-primary); }
.mp-keys { display: flex; flex-wrap: wrap; gap: 6px; margin: 0.6rem 0 0.9rem; }
.mp-key { min-width: 44px; min-height: 44px; font-size: 1.05rem; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-elevated, var(--bg-main)); color: var(--text-primary); cursor: pointer; }
.mp-key:hover { border-color: var(--primary); }
.mp-choices { border: 0; padding: 0; margin: 0 0 1rem; display: grid; gap: 0.5rem; }
.mp-choice { display: flex; gap: 0.6rem; align-items: center; padding: 0.7rem 0.8rem; border: 1px solid var(--border); border-radius: 10px; cursor: pointer; }
.mp-choice.picked { border-color: var(--primary); background: var(--primary-light, rgba(79, 70, 229, 0.08)); }
.mp-btn { display: inline-block; min-height: 44px; padding: 0.6rem 1.2rem; margin-right: 0.5rem; font-size: 1rem; font-weight: 600; border: 0; border-radius: 10px; background: var(--primary); color: #fff; cursor: pointer; text-decoration: none; }
.mp-btn.secondary { background: transparent; color: var(--text-primary); border: 1px solid var(--border); }
.mp-btn:disabled { opacity: 0.6; cursor: wait; }
.mp-notice { color: var(--danger); margin: 0 0 0.75rem; font-size: 0.9rem; }
.mp-result { padding: 0.75rem 0.9rem; border-radius: 10px; margin-top: 0.5rem; }
.mp-result.ok { background: var(--success-bg); }
.mp-result.no { background: var(--warning-bg); }
.mp-verdict { font-weight: 700; margin: 0 0 0.4rem; font-size: 1.05rem; }
.mp-note { margin: 0.25rem 0; }
.mp-steps { margin: 0.6rem 0; }
.mp-steps ol { margin: 0.4rem 0 0 1.2rem; padding: 0; line-height: 1.5; }
.mp-celebrate { font-weight: 700; margin: 0.5rem 0; }
.mp-rules { line-height: 1.6; padding-left: 1.2rem; margin: 0.5rem 0 1rem; }
.mp-score { font-size: 1.3rem; font-weight: 700; margin: 0 0 0.5rem; }
.mp-review { padding-left: 1.2rem; display: grid; gap: 0.75rem; margin: 1rem 0; }
.mp-review li.ok strong { color: var(--success); }
.mp-review li.no strong { color: var(--danger); }
.mp-review p { margin: 0.2rem 0; }
.mp-yours { font-size: 0.9rem; color: var(--text-secondary); }
.mp-calc { margin-top: 1rem; border-top: 1px solid var(--border-light, var(--border)); padding-top: 0.75rem; }
.mp-calc summary { cursor: pointer; font-size: 0.9rem; color: var(--text-secondary); }
.mp-calc-out { font-size: 1.1rem; margin: 0.4rem 0 0; min-height: 1.5rem; }
.mp-muted { color: var(--text-secondary); font-size: 0.85rem; }
.mp-foot { margin-top: 1rem; line-height: 1.5; }
.mp-done { text-align: center; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 480px) { .mp-topics { grid-template-columns: repeat(2, 1fr); } }
@media print {
  .mp.printing-slip > :not(.completion-slip) { display: none !important; }
}
</style>
