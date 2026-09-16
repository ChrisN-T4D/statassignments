<template>
  <div class="host-chrome">
    <div class="join-panel">
      <div class="code-block">
        <span class="code-label">Join code</span>
        <span class="join-code">{{ code }}</span>
        <button type="button" class="btn-copy" :disabled="!code" @click="copyCode">
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
      <div class="qr-block">
        <img
          v-if="qrUrl"
          :src="qrUrl"
          width="160"
          height="160"
          alt="QR code to join live session"
          class="qr-img"
        />
        <p class="join-url">{{ liveUrl }}</p>
      </div>
      <div class="participant-count">
        <span class="count-num">{{ participantCount }}</span>
        <span class="count-label">{{ participantCount === 1 ? 'phone connected' : 'phones connected' }}</span>
      </div>
    </div>

    <p v-if="sessionEnded" class="status-banner ended">Session ended</p>
    <p v-if="actionError" class="status-banner error">{{ actionError }}</p>
    <p v-if="busy" class="status-banner busy">Updating…</p>

    <section class="controls-section">
      <h2>Phase</h2>
      <div class="phase-buttons">
        <button
          v-for="p in phases"
          :key="p.id"
          type="button"
          class="phase-btn"
          :class="{ active: currentPhase === p.id }"
          :disabled="sessionEnded || busy"
          @click="changePhase(p.id)"
        >
          {{ p.label }}
        </button>
      </div>
    </section>

    <section class="controls-section">
      <h2>Locks</h2>
      <div class="lock-toggles">
        <label class="lock-toggle">
          <input
            type="checkbox"
            :checked="voteLocked"
            :disabled="sessionEnded || busy"
            @change="toggleVoteLock($event.target.checked)"
          />
          Vote locked
        </label>
        <label class="lock-toggle">
          <input
            type="checkbox"
            :checked="!contributeLocked"
            :disabled="sessionEnded || busy"
            @change="toggleContributeLock(!$event.target.checked)"
          />
          Contributions open
        </label>
      </div>
    </section>

    <section v-if="tallyGroups.length" class="tallies-section">
      <div class="tallies-header">
        <h2>Vote tallies</h2>
        <button
          type="button"
          class="btn-apply"
          :disabled="sessionEnded || busy || !hasTallies"
          @click="applyFromTallies"
        >
          Apply from tallies
        </button>
      </div>
      <div v-for="group in tallyGroups" :key="group.key" class="tally-group">
        <h3>{{ formatSettingKey(group.key) }}</h3>
        <ul class="tally-list">
          <li v-for="(row, idx) in group.options" :key="`${group.key}-${idx}`" class="tally-row">
            <span class="tally-value">{{ formatValue(row.value) }}</span>
            <span class="tally-count">{{ row.count }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="participants.length" class="participants-section">
      <h2>Participants</h2>
      <ul class="participant-list">
        <li v-for="name in participants" :key="name">{{ name }}</li>
      </ul>
    </section>

    <div class="host-actions">
      <button
        type="button"
        class="btn-secondary"
        :disabled="sessionEnded || busy"
        @click="doReset"
      >
        Reset round
      </button>
      <button
        type="button"
        class="btn-danger"
        :disabled="sessionEnded || busy"
        @click="doEnd"
      >
        End session
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  liveState: { type: Object, default: null },
  setPhase: { type: Function, required: true },
  setLocks: { type: Function, required: true },
  applySettings: { type: Function, required: true },
  reset: { type: Function, required: true },
  end: { type: Function, required: true },
})

const phases = [
  { id: 'lobby', label: 'Lobby' },
  { id: 'voting', label: 'Voting' },
  { id: 'contributing', label: 'Contributing' },
  { id: 'revealing', label: 'Revealing' },
]

const copied = ref(false)
const busy = ref(false)
const actionError = ref('')

const currentPhase = computed(() => props.liveState?.phase || 'lobby')
const voteLocked = computed(() => Boolean(props.liveState?.vote_locked))
const contributeLocked = computed(() => Boolean(props.liveState?.contribute_locked))
const participantCount = computed(() => props.liveState?.participant_count ?? 0)
const participants = computed(() => props.liveState?.participants || [])
const sessionEnded = computed(() => props.liveState?.status === 'ended')

const liveUrl = computed(() => {
  if (!props.code) return ''
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return `${origin}/live/${encodeURIComponent(props.code)}`
})

const qrUrl = computed(() => {
  if (!liveUrl.value) return ''
  return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(liveUrl.value)}`
})

const tallyGroups = computed(() => {
  const tallies = props.liveState?.vote_tallies
  if (!tallies || typeof tallies !== 'object') return []
  return Object.entries(tallies).map(([key, options]) => ({
    key,
    options: Array.isArray(options) ? options : [],
  }))
})

const hasTallies = computed(() =>
  tallyGroups.value.some((g) => g.options.some((o) => o.count > 0))
)

async function runAction(fn) {
  actionError.value = ''
  busy.value = true
  try {
    await fn()
  } catch (err) {
    actionError.value = err?.message || 'Action failed.'
  } finally {
    busy.value = false
  }
}

async function copyCode() {
  if (!props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    actionError.value = 'Could not copy code.'
  }
}

function changePhase(phase) {
  runAction(() => props.setPhase(phase))
}

function toggleVoteLock(locked) {
  runAction(() => props.setLocks({ vote_locked: locked }))
}

function toggleContributeLock(locked) {
  runAction(() => props.setLocks({ contribute_locked: locked }))
}

function applyFromTallies() {
  runAction(() => props.applySettings({ fromTallies: true }))
}

function doReset() {
  if (!window.confirm('Reset this round? Votes clear; contribution history is kept.')) return
  runAction(() => props.reset())
}

function doEnd() {
  if (!window.confirm('End this live session? Students will no longer be able to join.')) return
  runAction(() => props.end())
}

function formatSettingKey(key) {
  return String(key).replace(/_/g, ' ')
}

function formatValue(value) {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}
</script>

<style scoped>
.host-chrome {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
}

.join-panel {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: start;
}

.code-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.code-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.join-code {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 800;
  letter-spacing: 0.15em;
  font-family: ui-monospace, monospace;
  line-height: 1;
}

.btn-copy {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-input);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
}

.btn-copy:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qr-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.qr-img {
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: white;
}

.join-url {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-secondary);
  word-break: break-all;
  max-width: 12rem;
  text-align: center;
}

.participant-count {
  grid-column: 1 / -1;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.count-num {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
}

.count-label {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.status-banner {
  margin: 0;
  padding: 0.65rem 0.85rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.status-banner.ended {
  background: var(--bg-input);
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.status-banner.error {
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger);
}

.status-banner.busy {
  background: color-mix(in srgb, var(--primary) 10%, var(--bg-card));
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.controls-section h2,
.tallies-section h2,
.participants-section h2 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.phase-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.phase-btn {
  flex: 1 1 45%;
  min-height: 2.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-input);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
}

.phase-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.phase-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.lock-toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.lock-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  cursor: pointer;
}

.tallies-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.tallies-header h2 {
  margin: 0;
}

.btn-apply {
  padding: 0.45rem 0.85rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary);
  background: color-mix(in srgb, var(--primary) 12%, var(--bg-card));
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
}

.btn-apply:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.tally-group {
  margin-top: 0.65rem;
}

.tally-group h3 {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  text-transform: capitalize;
}

.tally-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
}

.tally-row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.45rem 0.65rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
}

.tally-row:last-child {
  border-bottom: none;
}

.tally-value {
  word-break: break-word;
}

.tally-count {
  font-weight: 700;
  color: var(--primary);
  flex-shrink: 0;
}

.participant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.participant-list li {
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  font-size: 0.8rem;
}

.host-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 0.25rem;
}

.btn-secondary,
.btn-danger {
  flex: 1 1 45%;
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-secondary {
  background: var(--bg-input);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-danger {
  background: var(--danger, #dc2626);
  color: white;
}

.btn-secondary:disabled,
.btn-danger:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .join-panel {
    grid-template-columns: 1fr;
  }

  .qr-block {
    align-items: flex-start;
  }
}
</style>
