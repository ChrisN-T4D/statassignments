<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <h1>{{ isLogin ? 'Sign In' : 'Create Account' }}</h1>
        <p class="auth-subtitle">
          {{ isLogin ? 'Welcome back! Sign in to track your progress.' : 'Join to track your learning progress.' }}
        </p>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div v-if="!isLogin" class="form-group">
            <label for="name">Full Name</label>
            <input
              id="name"
              v-model="fullName"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              minlength="6"
            />
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="success" class="success-message">
            {{ success }}
          </div>

          <button type="submit" class="btn-primary" :disabled="submitting">
            {{ submitting ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account') }}
          </button>
        </form>

        <div class="auth-footer">
          <p v-if="isLogin">
            Don't have an account?
            <a href="#" @click.prevent="isLogin = false">Sign up</a>
          </p>
          <p v-else>
            Already have an account?
            <a href="#" @click.prevent="isLogin = true">Sign in</a>
          </p>
          <p v-if="isLogin">
            <a href="#" @click.prevent="showResetPassword = true">Forgot password?</a>
          </p>
        </div>

        <!-- Password Reset Modal -->
        <div v-if="showResetPassword" class="modal-overlay" @click.self="showResetPassword = false">
          <div class="modal">
            <h2>Reset Password</h2>
            <p>Enter your email and we'll send you a reset link.</p>
            <form @submit.prevent="handleResetPassword">
              <div class="form-group">
                <input
                  v-model="resetEmail"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div v-if="resetSuccess" class="success-message">
                {{ resetSuccess }}
              </div>
              <button type="submit" class="btn-primary">Send Reset Link</button>
              <button type="button" class="btn-secondary" @click="showResetPassword = false">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signIn, signUp, resetPassword } = useAuth()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const fullName = ref('')
const error = ref('')
const success = ref('')
const submitting = ref(false)

const showResetPassword = ref(false)
const resetEmail = ref('')
const resetSuccess = ref('')

async function handleSubmit() {
  error.value = ''
  success.value = ''
  submitting.value = true

  try {
    if (isLogin.value) {
      await signIn(email.value, password.value)
      router.push('/')
    } else {
      await signUp(email.value, password.value, fullName.value)
      success.value = 'Account created! Check your email to confirm your account.'
    }
  } catch (e) {
    error.value = e.message
  } finally {
    submitting.value = false
  }
}

async function handleResetPassword() {
  try {
    await resetPassword(resetEmail.value)
    resetSuccess.value = 'Check your email for the reset link!'
  } catch (e) {
    error.value = e.message
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.auth-card {
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  padding: 2.5rem;
  max-width: 400px;
  width: 100%;
  box-shadow: var(--shadow-lg);
}

.auth-card h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.success-message {
  background: #ecfdf5;
  color: #059669;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.auth-footer a {
  color: var(--primary);
  font-weight: 500;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 400px;
  width: 90%;
}

.modal h2 {
  margin-bottom: 0.5rem;
}

.modal p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}
</style>
