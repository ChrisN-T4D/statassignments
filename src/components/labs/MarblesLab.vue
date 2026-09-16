<template>
  <div class="marbles-lab">
    <header class="lab-header">
      <h2 class="lab-title">Marbles</h2>
      <p class="lab-sub">
        {{
          mode === 'student'
            ? 'Watch class draws accumulate from the shared urn.'
            : 'Draw from an urn with or without replacement and track color counts.'
        }}
      </p>
    </header>

    <p v-if="actionError" class="error-banner">{{ actionError }}</p>

    <!-- Solo controls -->
    <section v-if="isSolo" class="controls">
      <div class="urn-fields">
        <label v-for="color in COLORS" :key="color" class="urn-field">
          <span class="color-swatch" :data-color="color" />
          <span class="urn-color-name">{{ color }}</span>
          <input
            v-model.number="soloUrn[color]"
            type="number"
            min="0"
            max="200"
          />
        </label>
      </div>
      <label class="field">
        <span>Draw size (n)</span>
        <input v-model.number="soloN" type="number" min="1" max="50" />
      </label>
      <label class="check-field">
        <input v-model="soloWithReplacement" type="checkbox" />
        <span>With replacement</span>
      </label>
      <div class="btn-row">
        <button type="button" class="btn-primary" @click="drawSolo">Draw</button>
        <button type="button" class="btn-ghost" @click="resetSoloUrn">Reset urn</button>
        <button type="button" class="btn-ghost" @click="clearSolo">Clear draws</button>
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
        <span class="vote-label">Urn mix</span>
        <div class="btn-row">
          <button
            v-for="preset in urnPresets"
            :key="preset.id"
            type="button"
            class="btn-ghost"
            :class="{ selected: urnVoteSelected(preset.urn) }"
            :disabled="voteLocked || busy"
            @click="castVote('urn', preset.urn)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
      <div class="vote-group">
        <span class="vote-label">Draw size</span>
        <div class="btn-row">
          <button
            v-for="n in nOptions"
            :key="'n' + n"
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
      <div class="vote-group">
        <span class="vote-label">Replacement</span>
        <div class="btn-row">
          <button
            type="button"
            class="btn-ghost"
            :class="{ selected: myVotes.with_replacement === true }"
            :disabled="voteLocked || busy"
            @click="castVote('with_replacement', true)"
          >
            With
          </button>
          <button
            type="button"
            class="btn-ghost"
            :class="{ selected: myVotes.with_replacement === false }"
            :disabled="voteLocked || busy"
            @click="castVote('with_replacement', false)"
          >
            Without
          </button>
        </div>
      </div>
    </section>

    <section v-if="isStudent && sessionApi && phase === 'contributing'" class="contribute-panel">
      <button
        type="button"
        class="btn-primary"
        :disabled="contributeLocked || busy"
        @click="contributeDraw"
      >
        {{ busy ? 'Sending…' : `Contribute draw of ${appliedN}` }}
      </button>
    </section>

    <!-- Settings summary (live) -->
    <section v-if="!isSolo" class="settings-bar">
      <span>Urn: {{ formatUrn(appliedUrn) }}</span>
      <span>n = {{ appliedN }}</span>
      <span>{{ appliedWithReplacement ? 'With replacement' : 'Without replacement' }}</span>
      <span v-if="phase">Phase: {{ phase }}</span>
    </section>

    <!-- Results -->
    <section class="results">
      <div class="stats-row">
        <div class="stat">
          <span class="stat-label">Draws</span>
          <span class="stat-value">{{ displayDrawCount }}</span>
        </div>
        <div v-for="color in COLORS" :key="'count-' + color" class="stat">
          <span class="stat-label">{{ color }}</span>
          <span class="stat-value">{{ displayCounts[color] || 0 }}</span>
        </div>
      </div>

      <div v-if="isSolo" class="urn-panel">
        <h3>Urn (remaining)</h3>
        <ul class="urn-list">
          <li v-for="color in COLORS" :key="'urn-' + color">
            <span class="color-swatch" :data-color="color" />
            {{ color }}: {{ remainingUrn[color] ?? 0 }}
          </li>
        </ul>
        <p class="hint">Total marbles: {{ urnTotal(remainingUrn) }}</p>
      </div>

      <div v-if="lastSoloDraw.length" class="draw-list">
        <h3>Last draw</h3>
        <ul>
          <li
            v-for="(c, i) in lastSoloDraw"
            :key="'last-' + i"
            class="marble"
            :data-color="c"
          >
            {{ c[0].toUpperCase() }}
          </li>
        </ul>
      </div>

      <div v-if="recentDraws.length" class="draw-history">
        <h3>{{ isSolo ? 'Recent draws' : 'Shared draws (tail)' }}</h3>
        <div v-for="(draw, di) in recentDraws" :key="'draw-' + di" class="draw-row">
          <span class="draw-idx">#{{ di + 1 }}</span>
          <ul>
            <li
              v-for="(c, ci) in draw"
              :key="di + '-' + ci"
              class="marble"
              :data-color="c"
            >
              {{ c[0].toUpperCase() }}
            </li>
          </ul>
        </div>
      </div>
      <p v-else class="hint empty">
        {{ isSolo ? 'No draws yet — set the urn and click Draw.' : 'Waiting for contributions…' }}
      </p>

      <div v-if="Object.keys(displayCounts).length" class="count-bars" aria-label="Color counts">
        <div v-for="color in COLORS" :key="'bar-' + color" class="count-bar-row">
          <span class="bar-label">{{ color }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :data-color="color"
              :style="{ width: countBarPct(color) + '%' }"
            />
          </div>
          <span class="bar-num">{{ displayCounts[color] || 0 }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import { liveLabApi } from '../../lib/liveLabApi.js'
import LiveLabHostChrome from './LiveLabHostChrome.vue'

const COLORS = ['red', 'blue', 'green']
const DEFAULT_URN = { red: 40, blue: 30, green: 30 }
const MAX_RECENT = 12

const props = defineProps({
  mode: { type: String, default: 'solo' },
  liveState: { type: Object, default: null },
  sessionApi: { type: Object, default: null },
  classId: { type: String, default: 'statistics' },
  onStartLive: { type: Function, default: null },
})

const nOptions = [3, 5, 10]
const urnPresets = [
  { id: 'even', label: 'Even', urn: { red: 40, blue: 30, green: 30 } },
  { id: 'red', label: 'Mostly red', urn: { red: 70, blue: 15, green: 15 } },
  { id: 'blue', label: 'Mostly blue', urn: { red: 15, blue: 70, green: 15 } },
]

const soloUrn = reactive({ ...DEFAULT_URN })
const remainingUrn = reactive({ ...DEFAULT_URN })
const soloN = ref(5)
const soloWithReplacement = ref(false)
const soloDraws = ref([])
const lastSoloDraw = ref([])
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
      urn: { ...DEFAULT_URN },
      n: 5,
      with_replacement: false,
    }
)
const appliedUrn = computed(() => normalizeUrn(appliedSettings.value.urn))
const appliedN = computed(() => {
  const n = Number(appliedSettings.value.n) || 5
  return Math.min(Math.max(1, n), 20)
})
const appliedWithReplacement = computed(() =>
  Boolean(appliedSettings.value.with_replacement)
)

const liveDraws = computed(() => {
  const agg = effectiveState.value?.contributions_aggregate
  return Array.isArray(agg?.draws) ? agg.draws : []
})
const liveCounts = computed(() => {
  const agg = effectiveState.value?.contributions_aggregate
  return agg?.counts && typeof agg.counts === 'object' ? agg.counts : {}
})

const displayDraws = computed(() =>
  isSolo.value ? soloDraws.value : liveDraws.value
)
const displayDrawCount = computed(() => displayDraws.value.length)
const displayCounts = computed(() => {
  if (!isSolo.value) return liveCounts.value
  const counts = { red: 0, blue: 0, green: 0 }
  for (const draw of soloDraws.value) {
    for (const c of draw) {
      if (counts[c] != null) counts[c] += 1
      else counts[c] = 1
    }
  }
  return counts
})
const recentDraws = computed(() => displayDraws.value.slice(-MAX_RECENT))

function normalizeUrn(raw) {
  const src = raw && typeof raw === 'object' ? raw : DEFAULT_URN
  const out = {}
  for (const color of COLORS) {
    const n = Math.max(0, Math.floor(Number(src[color]) || 0))
    out[color] = n
  }
  return out
}

function urnTotal(urn) {
  return COLORS.reduce((s, c) => s + (Number(urn?.[c]) || 0), 0)
}

function formatUrn(urn) {
  return COLORS.map((c) => `${c[0].toUpperCase()}${urn?.[c] ?? 0}`).join(' ')
}

function cloneUrn(urn) {
  return normalizeUrn(urn)
}

/**
 * Draw n colors from urn. Returns { colors, remaining }.
 * Without replacement depletes remaining; with replacement leaves remaining unchanged.
 */
function drawFromUrn(urn, n, withReplacement, rng = Math.random) {
  const remaining = cloneUrn(urn)
  const colors = []
  const take = Math.max(0, Math.floor(Number(n) || 0))

  for (let i = 0; i < take; i += 1) {
    const bag = []
    for (const color of COLORS) {
      const count = remaining[color] || 0
      for (let j = 0; j < count; j += 1) bag.push(color)
    }
    if (!bag.length) break
    const idx = Math.floor(rng() * bag.length)
    const color = bag[idx]
    colors.push(color)
    if (!withReplacement) {
      remaining[color] = Math.max(0, (remaining[color] || 0) - 1)
    }
  }
  return { colors, remaining }
}

function syncRemainingFromSolo() {
  Object.assign(remainingUrn, cloneUrn(soloUrn))
}

function drawSolo() {
  actionError.value = ''
  const n = Math.min(Math.max(1, Number(soloN.value) || 1), 50)
  const source = soloWithReplacement.value ? cloneUrn(soloUrn) : cloneUrn(remainingUrn)
  if (urnTotal(source) === 0) {
    actionError.value = 'Urn is empty — reset or add marbles.'
    return
  }
  if (!soloWithReplacement.value && n > urnTotal(source)) {
    actionError.value = `Need at least ${n} marbles without replacement (have ${urnTotal(source)}).`
    return
  }
  const { colors, remaining } = drawFromUrn(source, n, soloWithReplacement.value)
  if (!colors.length) {
    actionError.value = 'Could not draw — urn is empty.'
    return
  }
  lastSoloDraw.value = colors
  soloDraws.value = [...soloDraws.value, colors]
  if (!soloWithReplacement.value) {
    Object.assign(remainingUrn, remaining)
  }
}

function resetSoloUrn() {
  Object.assign(soloUrn, { ...DEFAULT_URN })
  syncRemainingFromSolo()
  actionError.value = ''
}

function clearSolo() {
  soloDraws.value = []
  lastSoloDraw.value = []
  syncRemainingFromSolo()
  actionError.value = ''
}

function countBarPct(color) {
  const counts = displayCounts.value
  const total = Object.values(counts).reduce((s, v) => s + Number(v || 0), 0)
  if (!total) return 0
  return Math.min(100, ((counts[color] || 0) / total) * 100)
}

function urnVoteSelected(urn) {
  try {
    return JSON.stringify(myVotes.value.urn) === JSON.stringify(urn)
  } catch {
    return false
  }
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
        labType: 'marbles',
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
      labType: 'marbles',
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

async function contributeDraw() {
  if (!props.sessionApi?.contribute) return
  busy.value = true
  actionError.value = ''
  try {
    const { colors } = drawFromUrn(
      appliedUrn.value,
      appliedN.value,
      appliedWithReplacement.value
    )
    await props.sessionApi.contribute({ colors })
  } catch (err) {
    actionError.value = err?.message || 'Contribute failed.'
  } finally {
    busy.value = false
  }
}

watch(
  () => [soloUrn.red, soloUrn.blue, soloUrn.green],
  () => {
    if (soloWithReplacement.value || !soloDraws.value.length) {
      syncRemainingFromSolo()
    }
  }
)

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
.marbles-lab {
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

.urn-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.urn-field {
  display: grid;
  grid-template-columns: auto 5rem 1fr;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.9rem;
}

.urn-color-name {
  text-transform: capitalize;
}

.field {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.9rem;
}

.check-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.urn-field input[type='number'],
.field input[type='number'] {
  max-width: 5rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.4rem;
  background: var(--bg-input);
  color: var(--text-primary);
}

.color-swatch {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  display: inline-block;
}

.color-swatch[data-color='red'],
.marble[data-color='red'],
.bar-fill[data-color='red'] {
  background: #c0392b;
}

.color-swatch[data-color='blue'],
.marble[data-color='blue'],
.bar-fill[data-color='blue'] {
  background: #2980b9;
}

.color-swatch[data-color='green'],
.marble[data-color='green'],
.bar-fill[data-color='green'] {
  background: #27ae60;
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

.urn-panel,
.draw-list,
.draw-history {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.urn-panel h3,
.draw-list h3,
.draw-history h3 {
  margin: 0;
  font-size: 0.95rem;
}

.urn-list,
.draw-list ul,
.draw-row ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.urn-list li {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
}

.marble {
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  border: 1px solid var(--border);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);
}

.draw-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.draw-idx {
  font-size: 0.75rem;
  color: var(--text-secondary);
  min-width: 1.5rem;
}

.count-bars {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.count-bar-row {
  display: grid;
  grid-template-columns: 3.5rem 1fr 2rem;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.85rem;
}

.bar-track {
  height: 0.75rem;
  border-radius: 999px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.25s ease;
}

.bar-num {
  font-variant-numeric: tabular-nums;
  text-align: right;
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
