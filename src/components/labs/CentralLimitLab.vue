<template>
  <div class="clt-lab">
    <header class="lab-header">
      <h2 class="lab-title">Central Limit Theorem</h2>
      <p class="lab-sub">
        {{
          mode === 'student'
            ? 'Contribute sample means so the class sampling distribution grows.'
            : 'Draw many sample means from a non-normal population and watch the histogram of means.'
        }}
      </p>
    </header>

    <p v-if="actionError" class="error-banner">{{ actionError }}</p>

    <!-- Solo controls -->
    <section v-if="isSolo" class="controls">
      <div class="vote-group">
        <span class="vote-label">Population</span>
        <div class="btn-row">
          <button
            v-for="opt in populationOptions"
            :key="opt.value"
            type="button"
            class="btn-ghost"
            :class="{ selected: soloPopulation === opt.value }"
            @click="soloPopulation = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
      <label class="field">
        <span>Sample size (n)</span>
        <input v-model.number="soloN" type="number" min="1" max="100" />
      </label>
      <label class="field">
        <span>Samples to draw</span>
        <input v-model.number="soloBatch" type="number" min="1" max="1000" />
      </label>
      <div class="btn-row">
        <button type="button" class="btn-primary" @click="runSoloBatch">Draw means</button>
        <button type="button" class="btn-ghost" @click="clearSolo">Clear</button>
      </div>
    </section>

    <!-- Host: start live -->
    <section v-if="isHost && !hostActive" class="start-live">
      <p class="hint">Project this view, then open a live session so phones can vote and contribute.</p>
      <button
        type="button"
        class="btn-primary"
        :disabled="starting"
        @click="startLive"
      >
        {{ starting ? 'Starting…' : 'Start live session' }}
      </button>
    </section>

    <!-- Host chrome -->
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
        <span class="vote-label">Population</span>
        <div class="btn-row">
          <button
            v-for="opt in populationOptions"
            :key="'vote-pop-' + opt.value"
            type="button"
            class="btn-ghost"
            :class="{ selected: myVotes.population === opt.value }"
            :disabled="voteLocked || busy"
            @click="castVote('population', opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
      <div class="vote-group">
        <span class="vote-label">Sample size n</span>
        <div class="btn-row">
          <button
            v-for="n in nOptions"
            :key="'vote-n-' + n"
            type="button"
            class="btn-ghost"
            :class="{ selected: myVotes.n === n }"
            :disabled="voteLocked || busy"
            @click="castVote('n', n)"
          >
            n = {{ n }}
          </button>
        </div>
      </div>
    </section>

    <section v-if="isStudent && sessionApi && phase === 'contributing'" class="contribute-panel">
      <button
        type="button"
        class="btn-primary"
        :disabled="contributeLocked || busy"
        @click="contributeMeans"
      >
        {{
          busy
            ? 'Sending…'
            : `Contribute ${samplesPerContrib} mean(s) (n=${appliedN})`
        }}
      </button>
    </section>

    <!-- Settings summary (live) -->
    <section v-if="!isSolo" class="settings-bar">
      <span>Population: {{ appliedPopulation }}</span>
      <span>n = {{ appliedN }}</span>
      <span>per contrib: {{ samplesPerContrib }}</span>
      <span v-if="phase">Phase: {{ phase }}</span>
    </section>

    <!-- Results -->
    <section class="results">
      <div class="stats-row">
        <div class="stat">
          <span class="stat-label">Means</span>
          <span class="stat-value">{{ displayMeanCount }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Mean of means</span>
          <span class="stat-value">{{ grandMeanLabel }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Population</span>
          <span class="stat-value pop-value">{{ displayPopulation }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">n</span>
          <span class="stat-value">{{ displayN }}</span>
        </div>
      </div>

      <div v-if="histBins.length" class="histogram" aria-label="Histogram of sample means">
        <h3>Sampling distribution of means</h3>
        <div class="hist-bars">
          <div
            v-for="(bin, i) in histBins"
            :key="'bin-' + i"
            class="hist-col"
            :title="binTooltip(bin)"
          >
            <div class="hist-bar-wrap">
              <div
                class="hist-bar"
                :style="{ height: histBarPct(bin) + '%' }"
              />
            </div>
            <span class="hist-tick">{{ formatTick(bin.bin_start) }}</span>
          </div>
        </div>
        <div class="hist-axis">
          <span>{{ formatTick(histBins[0]?.bin_start) }}</span>
          <span>{{ formatTick(histBins[histBins.length - 1]?.bin_end) }}</span>
        </div>
      </div>
      <p v-else class="hint empty">
        {{
          isSolo
            ? 'No sample means yet — choose a population and click Draw means.'
            : 'Waiting for contributions…'
        }}
      </p>
    </section>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { histogram, mean, sampleMean } from '../../lib/statsLabMath.js'
import { liveLabApi } from '../../lib/liveLabApi.js'
import { useAuth } from '../../composables/useAuth'
import LiveLabHostChrome from './LiveLabHostChrome.vue'

const props = defineProps({
  mode: { type: String, default: 'solo' },
  liveState: { type: Object, default: null },
  sessionApi: { type: Object, default: null },
  classId: { type: String, default: 'statistics' },
  onStartLive: { type: Function, default: null },
})

const populationOptions = [
  { label: 'Uniform', value: 'uniform' },
  { label: 'Skew', value: 'skew' },
  { label: 'Bimodal', value: 'bimodal' },
]
const nOptions = [5, 10, 30]
const POP_SIZE = 2000
const HIST_BINS = 12

const soloPopulation = ref('skew')
const soloN = ref(5)
const soloBatch = ref(100)
const soloMeans = ref([])
const actionError = ref('')
const busy = ref(false)
const starting = ref(false)
const myVotes = ref({})

const internalCode = ref('')
const internalState = ref(null)
let pollTimer = null

const { user } = useAuth()
const isStudent = computed(() => props.mode === 'student')
const canStartLive = computed(() => {
  const role = user.value?.role
  return role === 'instructor' || role === 'admin'
})
const isHost = computed(() => canStartLive.value && !isStudent.value)

const effectiveState = computed(() => props.liveState || internalState.value)
const sessionCode = computed(
  () => effectiveState.value?.code || internalCode.value || ''
)
const hostActive = computed(
  () => Boolean(sessionCode.value) && effectiveState.value?.status !== 'ended'
)
/** Solo UI when not in an active live session (and not student phone view). */
const isSolo = computed(() => !isStudent.value && !hostActive.value)

const phase = computed(() => effectiveState.value?.phase || 'lobby')
const voteLocked = computed(() => Boolean(effectiveState.value?.vote_locked))
const contributeLocked = computed(() =>
  Boolean(effectiveState.value?.contribute_locked)
)
const appliedSettings = computed(
  () =>
    effectiveState.value?.applied_settings || {
      population: 'skew',
      n: 5,
      samples_per_contrib: 1,
    }
)
const appliedPopulation = computed(
  () => appliedSettings.value.population || 'skew'
)
const appliedN = computed(() => {
  const n = Number(appliedSettings.value.n) || 5
  return Math.min(Math.max(1, n), 100)
})
const samplesPerContrib = computed(() => {
  const c = Number(appliedSettings.value.samples_per_contrib) || 1
  return Math.min(Math.max(1, c), 20)
})

const liveMeans = computed(() => {
  const agg = effectiveState.value?.contributions_aggregate
  return Array.isArray(agg?.means) ? agg.means : []
})
const liveHistogram = computed(() => {
  const agg = effectiveState.value?.contributions_aggregate
  return Array.isArray(agg?.histogram) ? agg.histogram : []
})

const displayMeans = computed(() =>
  isSolo.value ? soloMeans.value : liveMeans.value
)
const displayMeanCount = computed(() => displayMeans.value.length)
const displayPopulation = computed(() =>
  isSolo.value ? soloPopulation.value : appliedPopulation.value
)
const displayN = computed(() =>
  isSolo.value
    ? Math.min(Math.max(1, Number(soloN.value) || 1), 100)
    : appliedN.value
)
const grandMean = computed(() => mean(displayMeans.value))
const grandMeanLabel = computed(() =>
  displayMeanCount.value && grandMean.value != null
    ? Number(grandMean.value).toFixed(2)
    : '—'
)

const histBins = computed(() => {
  if (!isSolo.value && liveHistogram.value.length) return liveHistogram.value
  return histogram(displayMeans.value, HIST_BINS)
})

const histMaxCount = computed(() =>
  histBins.value.reduce((m, b) => Math.max(m, Number(b.count) || 0), 0)
)

function drawPopulationValue(shape, rng = Math.random) {
  if (shape === 'uniform') return rng() * 100
  if (shape === 'bimodal') {
    return rng() < 0.5 ? 20 + rng() * 15 : 75 + rng() * 15
  }
  // skew (right): more mass near 0
  return Math.pow(rng(), 2) * 100
}

function buildPopulation(shape, size = POP_SIZE, rng = Math.random) {
  return Array.from({ length: size }, () => drawPopulationValue(shape, rng))
}

function drawSampleMeans(shape, n, count) {
  const population = buildPopulation(shape)
  const size = Math.max(1, Math.floor(Number(n) || 1))
  const k = Math.max(0, Math.floor(Number(count) || 0))
  return Array.from({ length: k }, () => {
    const m = sampleMean(population, size)
    return m == null ? 0 : Number(m.toFixed(2))
  })
}

function runSoloBatch() {
  actionError.value = ''
  const n = Math.min(Math.max(1, Number(soloN.value) || 1), 100)
  const batch = Math.min(Math.max(1, Number(soloBatch.value) || 1), 1000)
  const means = drawSampleMeans(soloPopulation.value, n, batch)
  soloMeans.value = [...soloMeans.value, ...means]
}

function clearSolo() {
  soloMeans.value = []
  actionError.value = ''
}

function histBarPct(bin) {
  const max = histMaxCount.value
  if (!max) return 0
  return Math.min(100, ((Number(bin.count) || 0) / max) * 100)
}

function formatTick(v) {
  if (v == null || Number.isNaN(Number(v))) return '—'
  return Number(v).toFixed(0)
}

function binTooltip(bin) {
  const a = Number(bin.bin_start).toFixed(1)
  const b = Number(bin.bin_end).toFixed(1)
  return `[${a}, ${b}]: ${bin.count}`
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
        labType: 'clt',
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
      labType: 'clt',
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

async function contributeMeans() {
  if (!props.sessionApi?.contribute) return
  busy.value = true
  actionError.value = ''
  try {
    const means = drawSampleMeans(
      appliedPopulation.value,
      appliedN.value,
      samplesPerContrib.value
    )
    await props.sessionApi.contribute({ means })
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
.clt-lab {
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
  grid-template-columns: 8rem 1fr;
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

.pop-value {
  font-size: 1rem;
  text-transform: capitalize;
}

.histogram h3 {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
}

.hist-bars {
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
  height: 10rem;
  padding: 0.25rem 0;
}

.hist-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  height: 100%;
}

.hist-bar-wrap {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
}

.hist-bar {
  width: 100%;
  min-height: 2px;
  border-radius: 0.2rem 0.2rem 0 0;
  background: var(--primary);
  transition: height 0.25s ease;
}

.hist-tick {
  font-size: 0.65rem;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.hist-axis {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
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

  .hist-tick {
    display: none;
  }
}
</style>
