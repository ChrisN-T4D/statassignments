<template>
  <div class="change-password-card">
    <h2>Change password</h2>
    <p class="card-hint">
      Use at least 8 characters. After an admin reset, enter the temporary password as your current password.
    </p>
    <form @submit.prevent="updatePassword" class="change-password-form">
      <div class="form-group">
        <label for="current-password">Current password</label>
        <input
          id="current-password"
          v-model="currentPassword"
          type="password"
          autocomplete="current-password"
          required
        />
      </div>
      <div class="form-group">
        <label for="new-password">New password</label>
        <input
          id="new-password"
          v-model="newPassword"
          type="password"
          autocomplete="new-password"
          required
          minlength="8"
        />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm new password</label>
        <input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          autocomplete="new-password"
          required
          minlength="8"
        />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <button type="submit" class="btn-primary" :disabled="saving">
        {{ saving ? 'Saving...' : 'Update password' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const saving = ref(false)

async function updatePassword() {
  errorMessage.value = ''
  successMessage.value = ''

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'New passwords do not match.'
    return
  }
  if (newPassword.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters.'
    return
  }
  if (!user.value?.email || !user.value?.id) {
    errorMessage.value = 'You must be signed in.'
    return
  }

  saving.value = true
  try {
    try {
      await pb.collection('users').authWithPassword(user.value.email, currentPassword.value)
    } catch {
      errorMessage.value = 'Current password is incorrect.'
      return
    }

    await pb.collection('users').update(user.value.id, {
      password: newPassword.value,
      passwordConfirm: newPassword.value
    })

    successMessage.value = 'Password updated. Use the new password the next time you sign in.'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    errorMessage.value = err.message || 'Could not update password.'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.change-password-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.change-password-card h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.card-hint {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: var(--bg-main);
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
}

.success-message {
  color: #059669;
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
}

.btn-primary {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  background: var(--primary);
  color: white;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
