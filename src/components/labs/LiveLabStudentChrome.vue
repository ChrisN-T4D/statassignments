<template>
  <div class="student-chrome">
    <div class="chrome-header">
      <div class="phase-pill" :data-phase="phase">{{ phaseLabel }}</div>
      <div class="meta">
        <span v-if="displayName">{{ displayName }}</span>
        <span>{{ participantCount }} joined</span>
      </div>
    </div>

    <p v-if="statusMessage" class="status-message">{{ statusMessage }}</p>
    <p v-if="actionError" class="error-message">{{ actionError }}</p>

    <section v-if="phase === 'voting'" class="vote-section">
      <h2>Vote on settings</h2>
      <p v-if="voteLocked" class="locked-note">Voting is locked by the host.</p>
      <div
        v-for="group in voteGroups"
        :key="group.key"
        class="vote-group"
      >
        <h3>{{ group.label }}</h3>
        <div class="vote-buttons">
          <button
            v-for="opt in group.options"
            :key="optionKey(group.key, opt.value)"
            type="button"
            class="vote-btn"
            :class="{ selected: isSelected(group.key, opt.value) }"
            :disabled="voteLocked || voting"
            @click="castVote(group.key, opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </section>

    <section v-else-if="phase === 'contributing'" class="contribute-section">
      <h2>Contribute</h2>
      <p v-if="contributeLocked" class="locked-note">Contributions are locked.</p>
      <button
        type="button"
        class="btn-primary contribute-btn"
        :disabled="contributeLocked || contributing"
        @click="doContribute"
      >
        {{ contributing ? 'Sending…' : 'Contribute' }}
      </button>
    </section>

    <section v-else-if="phase === 'revealing'" class="reveal-section">
      <h2>Results</h2>
      <p class="hint">Watch the shared demo on the projector.</p>
    </section>

    <section v-else class="lobby-section">
      <h2>Lobby</h2>
      <p class="hint">Waiting for the instructor to start voting or contributing.</p>
    </section>

    <section v-if="appliedSettings" class="settings-summary">
      <h3>Applied settings</h3>
      <pre>{{ settingsPreview }}</pre>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  liveState: { type: Object, default: null },
  displayName: { type: String, default: '' },
  vote: { type: Function, required: true },
  contribute: { type: Function, required: true },
})

const voting = ref(false)
const contributing = ref(false)
const actionError = ref('')
const myVotes = ref({})

const VOTE_SCHEMAS = {
  'central-tendency': [
    {
      key: 'shape',
      label: 'Shape',
      options: [
        { label: 'Left skew', value: 'left-skew' },
        { label: 'Symmetric', value: 'symmetric' },
        { label: 'Right skew', value: 'right-skew' },
      ],
    },
    {
      key: 'include_outliers',
      label: 'Outliers',
      options: [
        { label: 'Include', value: true },
        { label: 'None', value: false },
      ],
    },
  ],
  coin: [
    {
      key: 'n_flips',
      label: 'Flips',
      options: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '20', value: 20 },
      ],
    },
    {
      key: 'p',
      label: 'P(heads)',
      options: [
        { label: 'Fair 0.5', value: 0.5 },
        { label: 'Biased 0.7', value: 0.7 },
      ],
    },
  ],
  marbles: [
    {
      key: 'urn',
      label: 'Urn mix',
      options: [
        { label: 'Even', value: { red: 40, blue: 30, green: 30 } },
        { label: 'Mostly red', value: { red: 70, blue: 15, green: 15 } },
        { label: 'Mostly blue', value: { red: 15, blue: 70, green: 15 } },
      ],
    },
    {
      key: 'n',
      label: 'Draw size',
      options: [
        { label: '3', value: 3 },
        { label: '5', value: 5 },
        { label: '10', value: 10 },
      ],
    },
    {
      key: 'with_replacement',
      label: 'Replacement',
      options: [
        { label: 'With', value: true },
        { label: 'Without', value: false },
      ],
    },
  ],
  clt: [
    {
      key: 'population',
      label: 'Population',
      options: [
        { label: 'Uniform', value: 'uniform' },
        { label: 'Skew', value: 'skew' },
        { label: 'Bimodal', value: 'bimodal' },
      ],
    },
    {
      key: 'n',
      label: 'Sample size n',
      options: [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '30', value: 30 },
      ],
    },
  ],
}

const phase = computed(() => props.liveState?.phase || 'lobby')
const voteLocked = computed(() => Boolean(props.liveState?.vote_locked))
const contributeLocked = computed(() => Boolean(props.liveState?.contribute_locked))
const participantCount = computed(() => props.liveState?.participant_count ?? 0)
const appliedSettings = computed(() => props.liveState?.applied_settings || null)
const labType = computed(() => props.liveState?.lab_type || '')

const voteGroups = computed(() => VOTE_SCHEMAS[labType.value] || [])

const phaseLabel = computed(() => {
  const labels = {
    lobby: 'Lobby',
    voting: 'Voting',
    contributing: 'Contributing',
    revealing: 'Revealing',
  }
  return labels[phase.value] || phase.value
})

const statusMessage = computed(() => {
  if (props.liveState?.status === 'ended') return 'This session has ended.'
  return ''
})

const settingsPreview = computed(() => {
  try {
    return JSON.stringify(appliedSettings.value, null, 2)
  } catch {
    return String(appliedSettings.value)
  }
})

function optionKey(settingKey, value) {
  try {
    return `${settingKey}:${JSON.stringify(value)}`
  } catch {
    return `${settingKey}:${value}`
  }
}

function valuesEqual(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch {
    return a === b
  }
}

function isSelected(settingKey, value) {
  return valuesEqual(myVotes.value[settingKey], value)
}

async function castVote(settingKey, value) {
  actionError.value = ''
  voting.value = true
  try {
    await props.vote(settingKey, value)
    myVotes.value = { ...myVotes.value, [settingKey]: value }
  } catch (err) {
    actionError.value = err?.message || 'Vote failed.'
  } finally {
    voting.value = false
  }
}

const MARBLE_COLORS = ['red', 'blue', 'green']
const DEFAULT_MARBLE_URN = { red: 40, blue: 30, green: 30 }

function normalizeMarbleUrn(raw) {
  const src = raw && typeof raw === 'object' ? raw : DEFAULT_MARBLE_URN
  const out = {}
  for (const color of MARBLE_COLORS) {
    out[color] = Math.max(0, Math.floor(Number(src[color]) || 0))
  }
  return out
}

function drawMarbleColors(urn, n, withReplacement) {
  const remaining = normalizeMarbleUrn(urn)
  const colors = []
  const take = Math.max(0, Math.floor(Number(n) || 0))

  for (let i = 0; i < take; i += 1) {
    const bag = []
    for (const color of MARBLE_COLORS) {
      const count = remaining[color] || 0
      for (let j = 0; j < count; j += 1) bag.push(color)
    }
    if (!bag.length) break
    const idx = Math.floor(Math.random() * bag.length)
    const color = bag[idx]
    colors.push(color)
    if (!withReplacement) {
      remaining[color] = Math.max(0, (remaining[color] || 0) - 1)
    }
  }
  return colors
}

function drawPopulationValue(population) {
  if (population === 'uniform') return Math.random() * 100
  if (population === 'bimodal') {
    return Math.random() < 0.5 ? 20 + Math.random() * 15 : 75 + Math.random() * 15
  }
  return Math.pow(Math.random(), 2) * 100
}

function sampleMeanFromPopulation(population, n) {
  const size = Math.max(1, Math.floor(Number(n) || 1))
  let sum = 0
  for (let i = 0; i < size; i += 1) sum += drawPopulationValue(population)
  return Number((sum / size).toFixed(2))
}

function stubCentralTendencyScore(settings) {
  const shape = settings.shape || 'right-skew'
  const includeOutliers = settings.include_outliers !== false
  let score
  if (shape === 'symmetric') {
    score = 40 + Math.random() * 60
  } else if (shape === 'left-skew') {
    score = 50 + Math.pow(Math.random(), 0.4) * 50
  } else {
    score = 40 + Math.pow(Math.random(), 2) * 50
  }
  if (includeOutliers && Math.random() < 0.08) {
    score = Math.random() < 0.5 ? 10 + Math.random() * 15 : 92 + Math.random() * 8
  }
  return Math.round(score)
}

function stubContributePayload() {
  const settings = appliedSettings.value || {}
  switch (labType.value) {
    case 'coin': {
      const n = Number(settings.n_flips) || 10
      const flips = Array.from({ length: Math.min(n, 20) }, () =>
        Math.random() < (Number(settings.p) || 0.5) ? 1 : 0
      )
      return { flips }
    }
    case 'marbles': {
      const urn = settings.urn || DEFAULT_MARBLE_URN
      const n = Number(settings.n) || 5
      const withReplacement = settings.with_replacement === true
      return { colors: drawMarbleColors(urn, n, withReplacement) }
    }
    case 'central-tendency':
      return { score: stubCentralTendencyScore(settings) }
    case 'clt': {
      const population = settings.population || 'skew'
      const n = Number(settings.n) || 5
      const count = Number(settings.samples_per_contrib) || 1
      return {
        means: Array.from({ length: count }, () => sampleMeanFromPopulation(population, n)),
      }
    }
    default:
      return {}
  }
}

async function doContribute() {
  actionError.value = ''
  contributing.value = true
  try {
    await props.contribute(stubContributePayload())
  } catch (err) {
    actionError.value = err?.message || 'Contribute failed.'
  } finally {
    contributing.value = false
  }
}
</script>

<style scoped>
.student-chrome {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chrome-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.phase-pill {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.875rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  text-transform: capitalize;
}

.phase-pill[data-phase='voting'] {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.phase-pill[data-phase='contributing'] {
  background: var(--success, #16a34a);
  color: white;
  border-color: transparent;
}

.meta {
  display: flex;
  gap: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.vote-section h2,
.contribute-section h2,
.reveal-section h2,
.lobby-section h2 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

.vote-group {
  margin-top: 0.75rem;
}

.vote-group h3 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.vote-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.vote-btn {
  flex: 1 1 40%;
  min-height: 3rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.vote-btn.selected {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 12%, var(--bg-card));
}

.vote-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contribute-btn {
  width: 100%;
  min-height: 3.25rem;
  font-size: 1.1rem;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.locked-note,
.hint {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 0.75rem;
}

.error-message,
.status-message {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.error-message {
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger);
}

.status-message {
  background: var(--bg-input);
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.settings-summary h3 {
  margin: 0 0 0.35rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.settings-summary pre {
  margin: 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  font-size: 0.75rem;
  overflow-x: auto;
}
</style>
