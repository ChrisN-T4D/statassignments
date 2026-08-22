<template>
  <div v-if="user" class="modal-overlay" @click.self="emit('close')">
    <div class="modal reset-password-modal">
      <template v-if="!generatedPassword">
        <h3>Reset password</h3>
        <p class="modal-hint">
          This immediately replaces the current password for
          <code>{{ user.email }}</code>.
          Copy the new password and give it to the student. They sign in with the same email, then can change it in Profile.
        </p>
        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="emit('close')">Cancel</button>
          <button
            type="button"
            class="btn-primary"
            :disabled="saving"
            @click="generateAndReset"
          >
            {{ saving ? 'Resetting...' : 'Generate and reset' }}
          </button>
        </div>
      </template>
      <template v-else>
        <h3>Temporary password</h3>
        <p class="modal-hint">Give the student this email and password. It is shown only once.</p>
        <p>Email: <code>{{ user.email }}</code></p>
        <p>Password: <code>{{ generatedPassword }}</code></p>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="copyCredentials">
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
          <button type="button" class="btn-primary" @click="emit('close')">Done</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { pb } from '../lib/pocketbase'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const generatedPassword = ref('')
const errorMessage = ref('')
const saving = ref(false)
const copied = ref(false)

watch(
  () => props.user,
  () => {
    generatedPassword.value = ''
    errorMessage.value = ''
    saving.value = false
    copied.value = false
  }
)

function generateRandomString(length) {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789'
  let s = ''
  for (let i = 0; i < length; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return s
}

async function generateAndReset() {
  if (!props.user?.id) return
  errorMessage.value = ''
  saving.value = true
  try {
    const password = generateRandomString(12)
    await pb.collection('users').update(props.user.id, {
      password,
      passwordConfirm: password
    })
    generatedPassword.value = password
  } catch (err) {
    errorMessage.value = err.message || 'Failed to reset password.'
  } finally {
    saving.value = false
  }
}

function copyCredentials() {
  const text = `Email: ${props.user.email}  Password: ${generatedPassword.value}`
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
  }).catch(() => {
    errorMessage.value = 'Could not copy. Select the password and copy it manually.'
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.reset-password-modal {
  background: var(--bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 440px;
  width: 100%;
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.reset-password-modal h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.modal-hint {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.reset-password-modal code {
  font-size: 0.875rem;
  word-break: break-all;
}

.form-error {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--danger, #dc2626);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--bg-main);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
</style>
