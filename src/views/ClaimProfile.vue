<template>
  <div class="claim-page">
    <div class="container">
      <div class="claim-card">
        <h1>Link Your Student Profile</h1>
        <p class="claim-subtitle">
          Enter the student key provided by your instructor to link your account
          and start tracking your progress.
        </p>

        <form @submit.prevent="handleClaim" class="claim-form">
          <div class="form-group">
            <label for="semester">Semester</label>
            <select id="semester" v-model="semesterCode" required>
              <option value="" disabled>Select your semester</option>
              <option v-for="sem in semesters" :key="sem.id" :value="sem.code">
                {{ sem.name || sem.code }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="studentKey">Student Key</label>
            <input
              id="studentKey"
              v-model="studentKey"
              type="text"
              placeholder="e.g., SP26-4KQ9P2"
              required
            />
            <span class="hint">This was provided by your instructor</span>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="success" class="success-message">
            {{ success }}
          </div>

          <button type="submit" class="btn-primary" :disabled="submitting">
            {{ submitting ? 'Linking...' : 'Link My Profile' }}
          </button>
        </form>

        <div class="claim-footer">
          <p>
            Don't have a student key?
            Contact your instructor to get one.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pb } from '../lib/pocketbase'
import { useProfile } from '../composables/useProfile'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { isAuthenticated } = useAuth()
const { claimByStudentKey, hasProfile } = useProfile()

const semesters = ref([])
const semesterCode = ref('')
const studentKey = ref('')
const error = ref('')
const success = ref('')
const submitting = ref(false)

async function fetchSemesters() {
  try {
    const records = await pb.collection('semesters').getFullList({
      filter: 'is_active = true',
      sort: '-start_date'
    })
    semesters.value = records

    // Default to first semester if only one
    if (records.length === 1) {
      semesterCode.value = records[0].code
    }
  } catch (err) {
    console.error('Error fetching semesters:', err)
  }
}

async function handleClaim() {
  error.value = ''
  success.value = ''
  submitting.value = true

  try {
    await claimByStudentKey(studentKey.value.trim(), semesterCode.value)
    success.value = 'Profile linked successfully! Redirecting...'
    setTimeout(() => {
      router.push('/profile')
    }, 1500)
  } catch (e) {
    error.value = e.message || 'Failed to link profile. Please check your student key.'
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push('/auth')
    return
  }

  if (hasProfile.value) {
    router.push('/profile')
    return
  }

  await fetchSemesters()
})
</script>

<style scoped>
.claim-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.claim-card {
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  padding: 2.5rem;
  max-width: 450px;
  width: 100%;
  box-shadow: var(--shadow-lg);
}

.claim-card h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.claim-subtitle {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.5;
}

.claim-form {
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

.form-group input,
.form-group select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
}

.form-group .hint {
  font-size: 0.75rem;
  color: var(--text-secondary);
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

.claim-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>
