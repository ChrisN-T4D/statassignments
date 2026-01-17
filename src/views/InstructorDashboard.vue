<template>
  <div class="instructor-page">
    <div class="container">
      <div class="page-header">
        <h1>Instructor Analytics</h1>
        <p>Export pseudonymous student performance data for analysis.</p>
      </div>

      <div v-if="!isInstructor()" class="access-denied">
        <h2>Access Denied</h2>
        <p>This page is only available to instructors.</p>
        <router-link to="/" class="btn-primary">Return Home</router-link>
      </div>

      <div v-else>
        <!-- Filters -->
        <div class="content-section">
          <h2>Export Filters</h2>

          <div class="filters-grid">
            <div class="form-group">
              <label for="semester">Semester</label>
              <select id="semester" v-model="filters.semesterId">
                <option value="">All Semesters</option>
                <option v-for="sem in semesters" :key="sem.id" :value="sem.id">
                  {{ sem.name || sem.code }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="software">Software Track</label>
              <select id="software" v-model="filters.softwareType">
                <option value="">All Software</option>
                <option value="jamovi">jamovi</option>
                <option value="r">R</option>
                <option value="stata">Stata</option>
                <option value="spss">SPSS</option>
              </select>
            </div>

            <div class="form-group">
              <label for="startDate">Start Date</label>
              <input id="startDate" type="date" v-model="filters.startDate" />
            </div>

            <div class="form-group">
              <label for="endDate">End Date</label>
              <input id="endDate" type="date" v-model="filters.endDate" />
            </div>
          </div>
        </div>

        <!-- Export Options -->
        <div class="content-section">
          <h2>Export Data</h2>

          <div class="export-options">
            <div class="export-card">
              <h3>Attempt-Level Export</h3>
              <p>One row per attempt. Includes individual responses, timestamps, and item details.</p>
              <button
                class="btn-primary"
                @click="handleExportAttempts"
                :disabled="loading"
              >
                {{ loading ? 'Exporting...' : 'Download CSV' }}
              </button>
            </div>

            <div class="export-card">
              <h3>Student Summary Export</h3>
              <p>One row per student. Aggregated stats including accuracy by software track.</p>
              <button
                class="btn-primary"
                @click="handleExportSummary"
                :disabled="loading"
              >
                {{ loading ? 'Exporting...' : 'Download CSV' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Preview Stats -->
        <div class="content-section">
          <h2>Quick Stats</h2>
          <button class="btn-secondary" @click="loadPreviewStats" :disabled="loading">
            {{ loading ? 'Loading...' : 'Load Preview' }}
          </button>

          <div v-if="previewStats" class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">{{ previewStats.totalAttempts }}</div>
              <div class="stat-label">Total Attempts</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ previewStats.uniqueStudents }}</div>
              <div class="stat-label">Unique Students</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ previewStats.overallAccuracy }}%</div>
              <div class="stat-label">Overall Accuracy</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ previewStats.uniqueItems }}</div>
              <div class="stat-label">Items Attempted</div>
            </div>
          </div>
        </div>

        <!-- Data Privacy Notice -->
        <div class="privacy-notice">
          <h3>Data Privacy</h3>
          <p>
            Exports contain only pseudonymous identifiers (student_key).
            No names, emails, or other personally identifiable information is included.
            Student keys cannot be traced back to individual students without the roster mapping.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useInstructorAnalytics } from '../composables/useInstructorAnalytics'

const {
  loading,
  isInstructor,
  fetchSemesters,
  fetchAttempts,
  exportAttemptsCSV,
  exportStudentSummaryCSV,
  downloadCSV
} = useInstructorAnalytics()

const semesters = ref([])
const previewStats = ref(null)

const filters = reactive({
  semesterId: '',
  softwareType: '',
  startDate: '',
  endDate: ''
})

async function loadSemesters() {
  semesters.value = await fetchSemesters()
}

async function handleExportAttempts() {
  const csv = await exportAttemptsCSV(filters)
  const timestamp = new Date().toISOString().slice(0, 10)
  downloadCSV(csv, `attempts-export-${timestamp}.csv`)
}

async function handleExportSummary() {
  const csv = await exportStudentSummaryCSV(filters)
  const timestamp = new Date().toISOString().slice(0, 10)
  downloadCSV(csv, `student-summary-${timestamp}.csv`)
}

async function loadPreviewStats() {
  const attempts = await fetchAttempts(filters)

  const uniqueStudents = new Set(attempts.map(a => a.profile))
  const uniqueItems = new Set(attempts.map(a => a.item))
  const correctAttempts = attempts.filter(a => a.is_correct).length
  const overallAccuracy = attempts.length > 0
    ? Math.round((correctAttempts / attempts.length) * 100)
    : 0

  previewStats.value = {
    totalAttempts: attempts.length,
    uniqueStudents: uniqueStudents.size,
    uniqueItems: uniqueItems.size,
    overallAccuracy
  }
}

onMounted(() => {
  if (isInstructor()) {
    loadSemesters()
  }
})
</script>

<style scoped>
.access-denied {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-card);
  border-radius: 1rem;
  border: 1px solid var(--border);
}

.access-denied h2 {
  margin-bottom: 1rem;
}

.access-denied p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
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
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
}

.export-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.export-card {
  background: var(--bg-main);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.export-card h3 {
  margin-bottom: 0.5rem;
}

.export-card p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-card {
  background: var(--bg-main);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.privacy-notice {
  background: #eff6ff;
  border-left: 4px solid var(--primary);
  padding: 1rem 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
  margin-top: 2rem;
}

.privacy-notice h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.privacy-notice p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
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
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}
</style>
