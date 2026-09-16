<template>
  <div class="report-page">
    <div class="container">
      <div class="report-card">
        <h1>Report an issue</h1>
        <p class="report-subtitle">
          Tell us about bugs, confusing content, or access problems. Reports are linked to your
          account so we can follow up. We also save the page you were on to help us debug.
        </p>

        <div v-if="submitted" class="success-panel">
          <h2>Thank you</h2>
          <p>We received your report.</p>
          <p v-if="referenceId" class="reference">Reference: {{ referenceId }}</p>
          <router-link to="/profile" class="btn-primary">Back to profile</router-link>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="report-form">
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" v-model="category" required>
              <option value="" disabled>Select a category</option>
              <option v-for="opt in FEEDBACK_CATEGORIES" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              id="subject"
              v-model="subject"
              type="text"
              maxlength="120"
              placeholder="Short summary"
              required
            />
            <span class="hint">{{ subject.length }}/120</span>
          </div>

          <div class="form-group">
            <label for="message">What happened?</label>
            <textarea
              id="message"
              v-model="message"
              rows="6"
              maxlength="4000"
              placeholder="Describe what you expected, what you saw, and any steps to reproduce."
              required
            />
            <span class="hint">{{ message.length }}/4000</span>
          </div>

          <p v-if="error" class="error-message">{{ error }}</p>

          <button type="submit" class="btn-primary" :disabled="submitting">
            {{ submitting ? 'Sending...' : 'Submit report' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFeedbackReports } from '../composables/useFeedbackReports'

const route = useRoute()
const { FEEDBACK_CATEGORIES, submitFeedbackReport } = useFeedbackReports()

const category = ref('')
const subject = ref('')
const message = ref('')
const error = ref('')
const submitting = ref(false)
const submitted = ref(false)
const referenceId = ref('')

async function handleSubmit() {
  error.value = ''
  submitting.value = true
  try {
    const record = await submitFeedbackReport(
      {
        category: category.value,
        subject: subject.value,
        message: message.value
      },
      route
    )
    referenceId.value = record?.id ? String(record.id).slice(-8) : ''
    submitted.value = true
  } catch (err) {
    error.value = err?.message || 'Failed to submit report. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.report-page {
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
}

.report-card {
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  padding: 2rem;
  max-width: 640px;
  margin: 0 auto;
  box-shadow: var(--shadow-lg);
}

.report-card h1 {
  margin-bottom: 0.5rem;
}

.report-subtitle {
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.report-form {
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
.form-group select,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-group .hint {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.error-message {
  color: #b91c1c;
  font-size: 0.875rem;
}

.success-panel {
  text-align: center;
  padding: 1rem 0;
}

.success-panel h2 {
  margin-bottom: 0.5rem;
}

.reference {
  font-family: monospace;
  margin: 1rem 0;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
