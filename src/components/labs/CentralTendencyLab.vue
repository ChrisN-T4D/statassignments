<template>
  <div class="ct-lab">
    <header class="lab-header">
      <h2 class="lab-title">Central tendency</h2>
      <p class="lab-sub">
        {{
          mode === 'student'
            ? 'Watch class scores update mean, median, and mode together.'
            : 'See how shape and outliers pull mean, median, and mode apart.'
        }}
      </p>
    </header>

    <p v-if="actionError" class="error-banner">{{ actionError }}</p>

    <!-- Solo controls -->
    <section v-if="isSolo" class="controls">
      <div class="vote-group">
        <span class="vote-label">Distribution shape</span>
        <div class="btn-row">
          <button
            v-for="opt in shapeOptions"
            :key="opt.value"
            type="button"
            class="btn-ghost"
            :class="{ selected: soloShape === opt.value }"
            @click="soloShape = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
      <label class="check-field">
        <input v-model="soloOutliers" type="checkbox" />
        <span>Include outliers</span>
      </label>
      <label class="field">
        <span>Sample size</span>
        <input v-model.number="soloN" type="number" min="10" max="200" />
      </label>
      <div class="btn-row">
        <button type="button" class="btn-primary" @click="generateSolo">Generate</button>
        <button type="button" class="btn-ghost" @click="clearSolo">Clear</button>
      </div>
    </section>

    <!-- Host: start live -->
    <section v-if="isHost && !hostActive" class="start-live">
      <p class="hint">Project this view, then open a live session so phones can vote and contribute scores.</p>
      <button
        type="button"
        class="btn-primary"
        :disabled="starting"
        @click="startLive"
      >
        {{ starting ? 'Starting…' : 'Start live session' }}
      </button>
    </section>

    <LiveLabHostChrome
      v-if="isHost && hostActive && sessionCode"
      :code="sessionCode"
      :live-state="effectiveState"
      :set-phase="hostSetPhase"
      :set-locks="hostSetLocks"
      :apply-settings="hostApplySettings"
      :reset="hostReset"
      :end="hostEnd"
    />

    <!-- Student vote/contribute when sessionApi provided -->
    <section v-if="isStudent && sessionApi && phase === 'voting'" class="vote-panel">
      <h3>Vote</h3>
      <p v-if="voteLocked" class="hint">Voting is locked.</p>
      <div class="vote-group">
        <span class="vote-label">Shape</span>
        <div class="btn-row">
          <button
            v-for="opt in shapeOptions"
            :key="'v-' + opt.value"
            type="button"
            class="btn-ghost"
            :class="{ selected: myVotes.shape === opt.value }"
            :disabled="voteLocked || busy"
            @click="castVote('shape', opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
      <div class="vote-group">
        <span class="vote-label">Outliers</span>
        <div class="btn-row">
          <button
            type="button"
            class="btn-ghost"
            :class="{ selected: myVotes.include_outliers === true }"
            :disabled="voteLocked || busy"
            @click="castVote('include_outliers', true)"
          >
            Include
          </button>
          <button
            type="button"
            class="btn-ghost"
            :class="{ selected: myVotes.include_outliers === false }"
            :disabled="voteLocked || busy"
            @click="castVote('include_outliers', false)"
          >
            None
          </button>
        </div>
      </div>
    </section>

    <section v-if="isStudent && sessionApi && phase === 'contributing'" class="contribute-panel">
      <label class="field">
        <span>Your score</span>
        <input
          v-model.number="contribScore"
          type="number"
          min="0"
          max="100"
          step="1"
        />
      </label>
      <div class="btn-row">
        <button
          type="button"
          class="btn-ghost"
          :disabled="contributeLocked || busy"
          @click="rollContribScore"
        >
          Random from shape
        </button>
        <button
          type="button"
          class="btn-primary"
          :disabled="contributeLocked || busy"
          @click="contributeScore"
        >
          {{ busy ? 'Sending…' : 'Contribute score' }}
        </button>
      </div>
    </section>

    <section v-if="!isSolo" class="settings-bar">
      <span>Shape: {{ shapeLabel(appliedShape) }}</span>
      <span>{{ appliedOutliers ? 'Outliers on' : 'No outliers' }}</span>
      <span v-if="phase">Phase: {{ phase }}</span>
    </section>

    <section class="results">
      <div class="stats-row">
        <div class="stat">
          <span class="stat-label">n</span>
          <span class="stat-value">{{ displayN }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Mean</span>
          <span class="stat-value">{{ fmt(displayMean) }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Median</span>
          <span class="stat-value">{{ fmt(displayMedian) }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Mode</span>
          <span class="stat-value">{{ modeLabel }}</span>
        </div>
      </div>

      <div v-if="histBins.length" class="histogram" aria-label="Score histogram">
        <div
          v-for="(bin, i) in histBins"
          :key="i"
          class="hist-col"
          :title="`${bin.bin_start.toFixed(1)}–${bin.bin_end.toFixed(1)}: ${bin.count}`"
        >
          <div class="hist-bar-wrap">
            <div class="hist-bar" :style="{ height: histPct(bin.count) + '%' }" />
          </div>
          <span class="hist-label">{{ Math.round(bin.bin_start) }}</span>
        </div>
      </div>
      <p v-else class="hint empty">
        {{
          isSolo
            ? 'No scores yet — choose a shape and click Generate.'
            : 'Waiting for contributions…'
        }}
      </p>

      <div v-if="recentScores.length" class="score-list">
        <h3>{{ isSolo ? 'Sample (tail)' : 'Shared scores (tail)' }}</h3>
        <ul>
          <li v-for="(s, i) in recentScores" :key="i">{{ s }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { mean, median, mode, histogram } from '../../lib/statsLabMath.js'
import { liveLabApi } from '../../lib/liveLabApi.js'
import LiveLabHostChrome from './LiveLabHostChrome.vue'

const props = defineProps({
  mode: { type: String, default: 'solo' },
  liveState: { type: Object, default: null },
  sessionApi: { type: Object, default: null },
  classId: { type: String, default: 'statistics' },
  onStartLive: { type: Function, default: null },
})

const shapeOptions = [
  { label: 'Left skew', value: 'left-skew' },
  { label: 'Symmetric', value: 'symmetric' },
  { label: 'Right skew', value: 'right-skew' },
]
const MAX_RECENT = 24
const HIST_BINS = 10

const soloShape = ref('right-skew')
const soloOutliers = ref(true)
const soloN = ref(60)
const soloScores = ref([])
const contribScore = ref(70)
const actionError = ref('')
const busy = ref(false)
const starting = ref(false)
const myVotes = ref({})

const internalCode = ref('')
const internalState = ref(null)
let pollTimer = null

const isSolo = computed(() => props.mode === 'solo')
const isHost = computed(() => props.mode === 'host')
const isStudent = computed(() => props.mode === 'student')

const effectiveState = computed(() => props.liveState || internalState.value)
const sessionCode = computed(
  () => effectiveState.value?.code || internalCode.value || ''
)
const hostActive = computed(
  () => Boolean(sessionCode.value) && effectiveState.value?.status !== 'ended'
)

const phase = computed(() => effectiveState.value?.phase || 'lobby')
const voteLocked = computed(() => Boolean(effectiveState.value?.vote_locked))
const contributeLocked = computed(() =>
  Boolean(effectiveState.value?.contribute_locked)
)
const appliedSettings = computed(
  () =>
    effectiveState.value?.applied_settings || {
      shape: 'right-skew',
      include_outliers: true,
    }
)
const appliedShape = computed(() => appliedSettings.value.shape || 'right-skew')
const appliedOutliers = computed(
  () => appliedSettings.value.include_outliers !== false
)

const liveScores = computed(() => {
  const agg = effectiveState.value?.contributions_aggregate
  return Array.isArray(agg?.scores) ? agg.scores.map(Number) : []
})

const displayScores = computed(() =>
  isSolo.value ? soloScores.value : liveScores.value
)
const displayN = computed(() => displayScores.value.length)
const displayMean = computed(() => {
  if (isSolo.value) return mean(soloScores.value)
  const agg = effectiveState.value?.contributions_aggregate
  if (agg && typeof agg.mean === 'number') return agg.mean
  return mean(liveScores.value)
})
const displayMedian = computed(() => {
  if (isSolo.value) return median(soloScores.value)
  const agg = effectiveState.value?.contributions_aggregate
  if (agg && typeof agg.median === 'number') return agg.median
  return median(liveScores.value)
})
const displayMode = computed(() => {
  if (isSolo.value) return mode(soloScores.value)
  const agg = effectiveState.value?.contributions_aggregate
  if (agg && agg.mode != null) return agg.mode
  return mode(liveScores.value)
})
const modeLabel = computed(() => {
  const m = displayMode.value
  if (m == null) return '—'
  if (Array.isArray(m)) return m.map((v) => Number(v).toFixed(0)).join(', ')
  return Number(m).toFixed(0)
})
const histBins = computed(() =>
  displayScores.value.length ? histogram(displayScores.value, HIST_BINS) : []
)
const histMax = computed(() =>
  histBins.value.reduce((m, b) => Math.max(m, b.count), 0)
)
const recentScores = computed(() => displayScores.value.slice(-MAX_RECENT))

function shapeLabel(shape) {
  return shapeOptions.find((o) => o.value === shape)?.label || shape
}

function fmt(v) {
  if (v == null || Number.isNaN(v)) return '—'
  return Number(v).toFixed(1)
}

function histPct(count) {
  if (!histMax.value) return 0
  return Math.min(100, (count / histMax.value) * 100)
}

/** Draw one score in [0,100] matching shape ± rare outliers. */
function drawScore(shape, includeOutliers, rng = Math.random) {
  let score
  if (shape === 'symmetric') {
    // Box–Muller-ish around 70, clamped
    const u1 = Math.max(1e-9, rng())
    const u2 = rng()
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    score = 70 + z * 12
  } else if (shape === 'left-skew') {
    score = 50 + Math.pow(rng(), 0.4) * 50
  } else {
    // right-skew
    score = 40 + Math.pow(rng(), 2) * 50
  }
  if (includeOutliers && rng() < 0.08) {
    score = rng() < 0.5 ? 5 + rng() * 15 : 92 + rng() * 8
  }
  return Math.round(Math.min(100, Math.max(0, score)))
}

function generateScores(shape, includeOutliers, n) {
  const count = Math.min(Math.max(10, Math.floor(Number(n) || 60)), 200)
  return Array.from({ length: count }, () => drawScore(shape, includeOutliers))
}

function generateSolo() {
  soloScores.value = generateScores(soloShape.value, soloOutliers.value, soloN.value)
  actionError.value = ''
}

function clearSolo() {
  soloScores.value = []
  actionError.value = ''
}

function rollContribScore() {
  contribScore.value = drawScore(appliedShape.value, appliedOutliers.value)
}

function stopPoll() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

async function refreshInternal() {
  if (!internalCode.value) return
  try {
    internalState.value = await liveLabApi.getState(internalCode.value)
    actionError.value = ''
  } catch (err) {
    actionError.value = err?.message || 'Could not refresh session.'
  }
}

function startPoll() {
  stopPoll()
  if (!internalCode.value) return
  refreshInternal()
  pollTimer = setInterval(refreshInternal, 1000)
}

async function startLive() {
  actionError.value = ''
  starting.value = true
  try {
    if (typeof props.onStartLive === 'function') {
      await props.onStartLive()
      return
    }
    if (props.sessionApi?.create) {
      const data = await props.sessionApi.create({
        labType: 'central-tendency',
        classId: props.classId,
      })
      if (data?.code) {
        internalCode.value = data.code
        if (data.state) internalState.value = data.state
        else await refreshInternal()
        if (!props.liveState) startPoll()
      }
      return
    }
    const data = await liveLabApi.create({
      labType: 'central-tendency',
      classId: props.classId,
    })
    internalCode.value = data.code
    internalState.value = data.session
      ? { ...data.session, code: data.code }
      : { code: data.code }
    await refreshInternal()
    startPoll()
  } catch (err) {
    actionError.value = err?.message || 'Could not start live session.'
  } finally {
    starting.value = false
  }
}

async function hostCall(fn) {
  actionError.value = ''
  try {
    await fn()
    if (internalCode.value && !props.liveState) await refreshInternal()
  } catch (err) {
    actionError.value = err?.message || 'Host action failed.'
    throw err
  }
}

function hostSetPhase(phaseName) {
  if (props.sessionApi?.setPhase) return props.sessionApi.setPhase(phaseName)
  return hostCall(() => liveLabApi.setPhase(internalCode.value, { phase: phaseName }))
}

function hostSetLocks(locks) {
  if (props.sessionApi?.setLocks) return props.sessionApi.setLocks(locks)
  return hostCall(() => liveLabApi.setLocks(internalCode.value, locks))
}

function hostApplySettings(options) {
  if (props.sessionApi?.applySettings) return props.sessionApi.applySettings(options)
  return hostCall(() =>
    liveLabApi.applySettings(internalCode.value, {
      settings: options?.settings,
      fromTallies: options?.fromTallies ?? options?.from_tallies,
    })
  )
}

function hostReset() {
  if (props.sessionApi?.reset) return props.sessionApi.reset()
  return hostCall(() => liveLabApi.reset(internalCode.value))
}

async function hostEnd() {
  if (props.sessionApi?.end) return props.sessionApi.end()
  await hostCall(() => liveLabApi.end(internalCode.value))
  stopPoll()
}

async function castVote(settingKey, value) {
  if (!props.sessionApi?.vote) return
  busy.value = true
  actionError.value = ''
  try {
    await props.sessionApi.vote(settingKey, value)
    myVotes.value = { ...myVotes.value, [settingKey]: value }
  } catch (err) {
    actionError.value = err?.message || 'Vote failed.'
  } finally {
    busy.value = false
  }
}

async function contributeScore() {
  if (!props.sessionApi?.contribute) return
  busy.value = true
  actionError.value = ''
  try {
    const score = Math.round(
      Math.min(100, Math.max(0, Number(contribScore.value) || 0))
    )
    await props.sessionApi.contribute({ score })
  } catch (err) {
    actionError.value = err?.message || 'Contribute failed.'
  } finally {
    busy.value = false
  }
}

watch(
  () => props.liveState?.code,
  (code) => {
    if (code) {
      stopPoll()
      internalCode.value = code
    }
  }
)

onUnmounted(stopPoll)
</script>

<style scoped>
.ct-lab {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.25rem 0;
}

.lab-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.lab-title {
  margin: 0;
  font-size: 1.35rem;
}

.lab-sub,
.hint {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.error-banner {
  margin: 0;
  padding: 0.65rem 0.85rem;
  border-radius: 0.5rem;
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger);
  font-size: 0.875rem;
}

.controls,
.start-live,
.vote-panel,
.contribute-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
}

.field {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.9rem;
}

.field input[type='number'] {
  max-width: 5rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.4rem;
  background: var(--bg-input);
  color: var(--text-primary);
}

.check-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.vote-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.vote-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-primary,
.btn-ghost {
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
}

.btn-ghost {
  background: var(--bg-input);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-ghost.selected {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 12%, var(--bg-card));
}

.btn-primary:disabled,
.btn-ghost:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.settings-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
}

.stat {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.histogram {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 0.25rem;
  align-items: end;
  min-height: 8rem;
  padding: 0.5rem 0;
}

.hist-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 0;
}

.hist-bar-wrap {
  width: 100%;
  height: 6.5rem;
  display: flex;
  align-items: flex-end;
}

.hist-bar {
  width: 100%;
  min-height: 2px;
  border-radius: 0.25rem 0.25rem 0 0;
  background: var(--primary);
  transition: height 0.25s ease;
}

.hist-label {
  font-size: 0.65rem;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.score-list h3 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}

.score-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.score-list li {
  min-width: 2.25rem;
  padding: 0.25rem 0.4rem;
  text-align: center;
  border-radius: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  border: 1px solid var(--border);
  background: var(--bg-input);
}

.empty {
  font-style: italic;
}

.vote-panel h3 {
  margin: 0;
  font-size: 1rem;
}

@media (max-width: 640px) {
  .stats-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .field {
    grid-template-columns: 1fr;
  }

  .histogram {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
