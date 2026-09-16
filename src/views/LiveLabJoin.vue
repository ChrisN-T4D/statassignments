<template>
  <div class="live-join-page">
    <div class="container">
      <div class="join-card">
        <p class="eyebrow">Live lab</p>
        <h1 class="code-display">{{ normalizedCode }}</h1>

        <form
          v-if="!guestToken"
          class="join-form"
          @submit.prevent="handleJoin"
        >
          <p class="subtitle">Enter a display name to join this session.</p>
          <div class="form-group">
            <label for="displayName">Display name</label>
            <input
              id="displayName"
              v-model="nameInput"
              type="text"
              maxlength="40"
              placeholder="e.g. Alex"
              required
              autocomplete="nickname"
            />
          </div>
          <p v-if="joinError" class="error-message">{{ joinError }}</p>
          <button type="submit" class="btn-primary" :disabled="joining">
            {{ joining ? 'Joining…' : 'Join' }}
          </button>
        </form>

        <template v-else>
          <LiveLabStudentChrome
            :live-state="state"
            :display-name="displayName"
            :vote="vote"
            :contribute="contribute"
          />
          <component
            :is="labComponent"
            v-if="labComponent"
            mode="student"
            :live-state="state"
          />
          <p v-else-if="state?.lab_type" class="error-message">
            Unknown lab type: {{ state.lab_type }}
          </p>
          <p v-else class="hint">Connecting to session…</p>
          <p v-if="sessionError" class="error-message">{{ sessionError }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useLiveLabSession } from '../composables/useLiveLabSession'
import LiveLabStudentChrome from '../components/labs/LiveLabStudentChrome.vue'
import CentralTendencyLab from '../components/labs/CentralTendencyLab.vue'
import CoinFlipLab from '../components/labs/CoinFlipLab.vue'
import MarblesLab from '../components/labs/MarblesLab.vue'
import CentralLimitLab from '../components/labs/CentralLimitLab.vue'

const props = defineProps({
  code: { type: String, required: true },
})

const LAB_COMPONENTS = {
  'central-tendency': CentralTendencyLab,
  coin: CoinFlipLab,
  marbles: MarblesLab,
  clt: CentralLimitLab,
}

const normalizedCode = computed(() => String(props.code || '').toUpperCase())

const {
  state,
  error,
  guestToken,
  displayName,
  join,
  vote,
  contribute,
} = useLiveLabSession({ code: props.code, role: 'student' })

const nameInput = ref('')
const joining = ref(false)
const joinError = ref('')

const labComponent = computed(() => {
  const type = state.value?.lab_type
  return type ? LAB_COMPONENTS[type] || null : null
})

const sessionError = computed(() => {
  if (!error.value) return ''
  return error.value?.message || String(error.value)
})

async function handleJoin() {
  joinError.value = ''
  joining.value = true
  try {
    await join(nameInput.value.trim())
  } catch (err) {
    joinError.value = err?.message || 'Could not join this lab.'
  } finally {
    joining.value = false
  }
}
</script>

<style scoped>
.live-join-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem 0 2.5rem;
}

.join-card {
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  padding: 1.5rem;
  max-width: 480px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.code-display {
  margin: 0;
  font-size: 2.25rem;
  letter-spacing: 0.12em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.subtitle,
.hint {
  margin: 0;
  color: var(--text-secondary);
}

.join-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  font-size: 0.875rem;
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--bg-input);
  color: var(--text-primary);
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: var(--focus-ring);
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: var(--danger-bg);
  color: var(--danger);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid var(--danger);
  margin: 0;
}
</style>
