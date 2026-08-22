<template>
  <div v-if="user" class="modal-overlay" @click.self="emit('close')">
    <div class="modal reset-password-modal">
      <div v-if="!generatedPassword">
        <h2>Reset password</h2>
        <p>
          This immediately replaces the current password for
          <code>{{ user.email }}</code>. Copy the new password and give it to the
          student. They sign in with the same email, then can change it in Profile.
        </p>
        <div class="button-group">
          <button class="btn-secondary btn-sm" @click="emit('close')">Cancel</button>
          <button
            class="btn-primary btn-sm"
            :disabled="saving"
            @click="generateAndResetPassword"
          >
            Generate and reset
          </button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
      <div v-else>
        <h2>Temporary password</h2>
        <p>Email: <code>{{ user.email }}</code></p>
        <p>Password: <code>{{ generatedPassword }}</code></p>
        <button
          class="btn-secondary btn-sm"
          @click="copyToClipboard"
          :disabled="copied"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </button>
        <button class="btn-primary btn-sm" @click="emit('close')">Done</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { pb } from '../lib/pocketbase';

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close']);

const generatedPassword = ref('');
const errorMessage = ref('');
const saving = ref(false);
const copied = ref(false);

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      generatedPassword.value = '';
      errorMessage.value = '';
      saving.value = false;
      copied.value = false;
    }
  }
);

const generateRandomString = (length) => {
  const charset = 'abcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

const generateAndResetPassword = async () => {
  saving.value = true;
  try {
    const password = generateRandomString(12);
    await pb.collection('users').update(props.user.id, {
      password,
      passwordConfirm: password,
    });
    generatedPassword.value = password;
  } catch (err) {
    errorMessage.value = err.message || 'Failed to reset password.';
  } finally {
    saving.value = false;
  }
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(
    `Email: ${props.user.email} Password: ${generatedPassword.value}`
  );
  copied.value = true;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.reset-password-modal {
  background-color: var(--bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 440px;
  width: 100%;
  border: 1px solid var(--border);
}

.error-message {
  color: var(--danger, #dc2626);
}
</style>
