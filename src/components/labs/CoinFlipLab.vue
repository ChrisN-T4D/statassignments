<template>
  <div class="coin-lab">
    <header class="lab-header">
      <h2 class="lab-title">Coin flips</h2>
      <p class="lab-sub">
        {{
          mode === 'student'
            ? 'Watch the class proportion grow as phones contribute flips.'
            : 'Explore how sample proportion approaches p as flips accumulate.'
        }}
      </p>
    </header>

    <p v-if="actionError" class="error-banner">{{ actionError }}</p>

    <!-- Solo controls -->
    <section v-if="isSolo" class="controls">
      <label class="field">
        <span>P(heads)</span>
        <input
          v-model.number="soloP"
          type="range"
          min="0"
          max="1"
          step="0.05"
        />
        <strong>{{ soloP.toFixed(2) }}</strong>
      </label>
      <label class="field">
        <span>Batch size (N)</span>
        <input v-model.number="soloN" type="number" min="1" max="100" />
      </label>
      <div class="btn-row">
        <button type="button" class="btn-primary" @click="flipOne">Flip</button>
        <button type="button" class="btn-primary" @click="flipN">Flip N</button>
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

    <!-- Student vote/contribute when sessionApi provided (Join page uses StudentChrome) -->
    <section v-if="isStudent && sessionApi && phase === 'voting'" class="vote-panel">
      <h3>Vote</h3>
      <p v-if="voteLocked" class="hint">Voting is locked.</p>
      <div class="btn-row">
        <button
          v-for="n in nFlipOptions"
          :key="'n' + n"
          type="button"
          class="btn-ghost"
          :class="{ selected: myVotes.n_flips === n }"
          :disabled="voteLocked || busy"
          @click="castVote('n_flips', n)"
        >
          {{ n }} flips
        </button>
      </div>
      <div class="btn-row">
        <button
          type="button"
          class="btn-ghost"
          :class="{ selected: myVotes.p === 0.5 }"
          :disabled="voteLocked || busy"
          @click="castVote('p', 0.5)"
        >
          Fair 0.5
        </button>
        <button
          type="button"
          class="btn-ghost"
          :class="{ selected: myVotes.p === 0.7 }"
          :disabled="voteLocked || busy"
          @click="castVote('p', 0.7)"
        >
          Biased 0.7
        </button>
      </div>
    </section>

    <section v-if="isStudent && sessionApi && phase === 'contributing'" class="contribute-panel">
      <button
        type="button"
        class="btn-primary"
        :disabled="contributeLocked || busy"
        @click="contributeBatch"
      >
        {{ busy ? 'Sending…' : `Contribute ${appliedN} flip(s)` }}
      </button>
    </section>

    <!-- Settings summary (live) -->
    <section v-if="!isSolo" class="settings-bar">
      <span>p = {{ Number(appliedP).toFixed(2) }}</span>
      <span>N = {{ appliedN }}</span>
      <span v-if="phase">Phase: {{ phase }}</span>
    </section>

    <!-- Results viz -->
    <section class="results">
      <div class="stats-row">
        <div class="stat">
          <span class="stat-label">Flips</span>
          <span class="stat-value">{{ displayN }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Heads</span>
          <span class="stat-value">{{ displayHeads }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Proportion</span>
          <span class="stat-value">{{ proportionLabel }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Target p</span>
          <span class="stat-value">{{ Number(displayP).toFixed(2) }}</span>
        </div>
      </div>

      <div class="proportion-chart" aria-label="Running proportion of heads">
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: barPct + '%' }" />
          <div class="p-marker" :style="{ left: Number(displayP) * 100 + '%' }" title="Target p" />
        </div>
        <div class="bar-labels">
          <span>0</span>
          <span>0.5</span>
          <span>1</span>
        </div>
      </div>

      <div v-if="recentFlips.length" class="flip-list">
        <h3>{{ isSolo ? 'Recent flips' : 'Shared sequence (tail)' }}</h3>
        <ul>
          <li
            v-for="(f, i) in recentFlips"
            :key="i"
            :class="f === 1 ? 'heads' : 'tails'"
          >
            {{ f === 1 ? 'H' : 'T' }}
          </li>
        </ul>
      </div>
      <p v-else class="hint empty">
        {{ isSolo ? 'No flips yet — try Flip or Flip N.' : 'Waiting for contributions…' }}
      </p>
    </section>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { proportion } from '../../lib/statsLabMath.js'
import { liveLabApi } from '../../lib/liveLabApi.js'
import LiveLabHostChrome from './LiveLabHostChrome.vue'

const props = defineProps({
  mode: { type: String, default: 'solo' },
  liveState: { type: Object, default: null },
  sessionApi: { type: Object, default: null },
  classId: { type: String, default: 'statistics' },
  onStartLive: { type: Function, default: null },
})

const nFlipOptions = [5, 10, 20]
const MAX_RECENT = 40

const soloP = ref(0.5)
const soloN = ref(10)
const soloFlips = ref([])
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
  () => effectiveState.value?.applied_settings || { n_flips: 10, p: 0.5 }
)
const appliedP = computed(() => Number(appliedSettings.value.p) || 0.5)
const appliedN = computed(() => {
  const n = Number(appliedSettings.value.n_flips) || 10
  return Math.min(Math.max(1, n), 20)
})

const liveFlips = computed(() => {
  const agg = effectiveState.value?.contributions_aggregate
  return Array.isArray(agg?.flips) ? agg.flips : []
})

const displayFlips = computed(() =>
  isSolo.value ? soloFlips.value : liveFlips.value
)
const displayN = computed(() => {
  if (isSolo.value) return soloFlips.value.length
  const agg = effectiveState.value?.contributions_aggregate
  return agg?.n ?? liveFlips.value.length
})
const displayHeads = computed(() =>
  displayFlips.value.reduce((s, f) => s + (f === 1 ? 1 : 0), 0)
)
const displayProportion = computed(() => {
  if (isSolo.value) return proportion(soloFlips.value, 1)
  const agg = effectiveState.value?.contributions_aggregate
  if (agg && typeof agg.proportion_heads === 'number') return agg.proportion_heads
  return proportion(liveFlips.value, 1)
})
const displayP = computed(() => (isSolo.value ? soloP.value : appliedP.value))
const proportionLabel = computed(() =>
  displayN.value ? displayProportion.value.toFixed(3) : '—'
)
const barPct = computed(() =>
  displayN.value ? Math.min(100, displayProportion.value * 100) : 0
)
const recentFlips = computed(() => displayFlips.value.slice(-MAX_RECENT))

function simulateFlip(p) {
  return Math.random() < p ? 1 : 0
}

function flipOne() {
  soloFlips.value = [...soloFlips.value, simulateFlip(soloP.value)]
}

function flipN() {
  const n = Math.min(Math.max(1, Number(soloN.value) || 1), 100)
  const batch = Array.from({ length: n }, () => simulateFlip(soloP.value))
  soloFlips.value = [...soloFlips.value, ...batch]
}

function clearSolo() {
  soloFlips.value = []
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
        labType: 'coin',
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
      labType: 'coin',
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

async function contributeBatch() {
  if (!props.sessionApi?.contribute) return
  busy.value = true
  actionError.value = ''
  try {
    const flips = Array.from({ length: appliedN.value }, () =>
      simulateFlip(appliedP.value)
    )
    await props.sessionApi.contribute({ flips })
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
.coin-lab {
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
  grid-template-columns: 7rem 1fr auto;
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

.proportion-chart {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.bar-track {
  position: relative;
  height: 1.5rem;
  border-radius: 999px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.25s ease;
}

.p-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--text-primary);
  transform: translateX(-1px);
  opacity: 0.7;
}

.bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.flip-list h3 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}

.flip-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.flip-list li {
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid var(--border);
}

.flip-list li.heads {
  background: color-mix(in srgb, var(--primary) 18%, var(--bg-card));
  color: var(--primary);
}

.flip-list li.tails {
  background: var(--bg-input);
  color: var(--text-secondary);
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
}
</style>
