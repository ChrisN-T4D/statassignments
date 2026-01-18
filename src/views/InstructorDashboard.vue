<template>
  <div class="instructor-page">
    <div class="container">
      <div class="page-header">
        <h1>Instructor Dashboard</h1>
        <p>Manage rosters and export pseudonymous student performance data.</p>
      </div>

      <div v-if="!isInstructor()" class="access-denied">
        <h2>Access Denied</h2>
        <p>This page is only available to instructors.</p>
        <router-link to="/" class="btn-primary">Return Home</router-link>
      </div>

      <div v-else>
        <!-- Tab Navigation -->
        <div class="tab-nav">
          <button
            :class="['tab-btn', { active: activeTab === 'roster' }]"
            @click="activeTab = 'roster'"
          >
            Roster Management
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'analytics' }]"
            @click="activeTab = 'analytics'"
          >
            Analytics & Export
          </button>
        </div>

        <!-- Roster Management Tab -->
        <div v-if="activeTab === 'roster'">
          <!-- Semester Selection for Roster -->
          <div class="content-section">
            <h2>Semester</h2>
            <div class="form-group" style="max-width: 300px;">
              <select v-model="rosterSemesterId" @change="loadRosterStats">
                <option value="">Select a semester</option>
                <option v-for="sem in semesters" :key="sem.id" :value="sem.id">
                  {{ sem.name || sem.code }} {{ sem.is_active ? '(Active)' : '' }}
                </option>
              </select>
            </div>
          </div>

          <!-- Roster Stats -->
          <div v-if="rosterSemesterId && rosterStats" class="content-section">
            <h2>Current Roster</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-value">{{ rosterStats.total }}</div>
                <div class="stat-label">Total Students</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ rosterStats.claimed }}</div>
                <div class="stat-label">Claimed</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">{{ rosterStats.unclaimed }}</div>
                <div class="stat-label">Unclaimed</div>
              </div>
            </div>

            <div style="margin-top: 1rem;">
              <button class="btn-secondary" @click="handleExportKeys" :disabled="loading">
                Download Student Keys CSV
              </button>
            </div>
          </div>

          <!-- CSV Upload -->
          <div v-if="rosterSemesterId" class="content-section">
            <h2>Import Roster from Blackboard</h2>
            <p class="section-description">
              Upload a CSV file exported from Blackboard. The file should contain columns for
              Username and/or Student ID.
            </p>

            <div class="upload-area">
              <input
                type="file"
                id="csvFile"
                accept=".csv"
                @change="handleFileSelect"
                class="file-input"
              />
              <label for="csvFile" class="file-label">
                <span v-if="!csvFile">Choose CSV file or drag here</span>
                <span v-else>{{ csvFile.name }}</span>
              </label>
            </div>

            <div v-if="parseError" class="error-message">
              {{ parseError }}
            </div>

            <!-- Preview Table -->
            <div v-if="parsedRows.length > 0" class="preview-section">
              <h3>Preview ({{ parsedRows.length }} students found)</h3>

              <div class="preview-table-wrapper">
                <table class="preview-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Student ID</th>
                      <th>Generated Key</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in parsedRows.slice(0, 10)" :key="idx">
                      <td>{{ row.bb_username || '-' }}</td>
                      <td>{{ row.bb_id || '-' }}</td>
                      <td><code>{{ row.previewKey }}</code></td>
                      <td>
                        <span v-if="row.isDuplicate" class="status-badge duplicate">Duplicate</span>
                        <span v-else class="status-badge new">New</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p v-if="parsedRows.length > 10" class="preview-note">
                Showing first 10 of {{ parsedRows.length }} students...
              </p>

              <div class="preview-summary">
                <p><strong>{{ newCount }}</strong> new students will be added</p>
                <p v-if="duplicateCount > 0">
                  <strong>{{ duplicateCount }}</strong> duplicates will be skipped
                </p>
              </div>

              <div class="preview-actions">
                <button
                  class="btn-primary"
                  @click="handleCreateRoster"
                  :disabled="loading || newCount === 0"
                >
                  {{ loading ? 'Creating...' : `Create ${newCount} Roster Entries` }}
                </button>
                <button class="btn-secondary" @click="clearUpload">
                  Cancel
                </button>
              </div>
            </div>

            <!-- Results -->
            <div v-if="createResults" class="results-section">
              <h3>Import Complete</h3>
              <div class="results-summary">
                <p class="result-success">{{ createResults.created.length }} entries created</p>
                <p v-if="createResults.skipped.length > 0" class="result-skipped">
                  {{ createResults.skipped.length }} duplicates skipped
                </p>
                <p v-if="createResults.errors.length > 0" class="result-error">
                  {{ createResults.errors.length }} errors
                </p>
              </div>

              <button class="btn-secondary" @click="handleExportKeys" style="margin-top: 1rem;">
                Download Student Keys CSV
              </button>

              <button class="btn-secondary" @click="clearResults" style="margin-left: 0.5rem;">
                Import More
              </button>
            </div>
          </div>
        </div>

        <!-- Analytics Tab -->
        <div v-if="activeTab === 'analytics'">
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
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useInstructorAnalytics } from '../composables/useInstructorAnalytics'

const {
  loading,
  isInstructor,
  fetchSemesters,
  fetchAttempts,
  exportAttemptsCSV,
  exportStudentSummaryCSV,
  downloadCSV,
  parseBlackboardCSV,
  generateStudentKey,
  fetchRoster,
  createRosterEntries,
  exportKeysCSV
} = useInstructorAnalytics()

// Tab state
const activeTab = ref('roster')

// Shared state
const semesters = ref([])

// Analytics tab state
const previewStats = ref(null)
const filters = reactive({
  semesterId: '',
  softwareType: '',
  startDate: '',
  endDate: ''
})

// Roster tab state
const rosterSemesterId = ref('')
const rosterStats = ref(null)
const csvFile = ref(null)
const parsedRows = ref([])
const parseError = ref('')
const createResults = ref(null)

// Computed for roster preview
const selectedSemester = computed(() =>
  semesters.value.find(s => s.id === rosterSemesterId.value)
)

const newCount = computed(() =>
  parsedRows.value.filter(r => !r.isDuplicate).length
)

const duplicateCount = computed(() =>
  parsedRows.value.filter(r => r.isDuplicate).length
)

// Load semesters on mount
async function loadSemesters() {
  semesters.value = await fetchSemesters()
}

// Roster management functions
async function loadRosterStats() {
  if (!rosterSemesterId.value) {
    rosterStats.value = null
    return
  }

  const roster = await fetchRoster(rosterSemesterId.value)
  const claimed = roster.filter(r => r.user).length

  rosterStats.value = {
    total: roster.length,
    claimed: claimed,
    unclaimed: roster.length - claimed
  }

  // Clear any previous upload state
  clearUpload()
}

async function handleFileSelect(event) {
  const file = event.target.files[0]
  if (!file) return

  csvFile.value = file
  parseError.value = ''
  parsedRows.value = []
  createResults.value = null

  try {
    const text = await file.text()
    const rows = parseBlackboardCSV(text)

    // Fetch existing roster to mark duplicates
    const existingRoster = await fetchRoster(rosterSemesterId.value)
    const existingBbIds = new Set(existingRoster.map(r => r.bb_id).filter(Boolean))
    const existingBbUsernames = new Set(existingRoster.map(r => r.bb_username).filter(Boolean))

    // Add preview keys and duplicate flags
    const semCode = selectedSemester.value?.code || 'XX'
    parsedRows.value = rows.map(row => ({
      ...row,
      previewKey: generateStudentKey(semCode),
      isDuplicate:
        (row.bb_id && existingBbIds.has(row.bb_id)) ||
        (row.bb_username && existingBbUsernames.has(row.bb_username))
    }))
  } catch (err) {
    parseError.value = err.message
  }
}

async function handleCreateRoster() {
  if (!rosterSemesterId.value || !selectedSemester.value) return

  const rowsToCreate = parsedRows.value.filter(r => !r.isDuplicate)

  createResults.value = await createRosterEntries(
    rowsToCreate,
    rosterSemesterId.value,
    selectedSemester.value.code,
    false // Not a dry run
  )

  // Clear parsed rows and refresh stats
  parsedRows.value = []
  csvFile.value = null
  await loadRosterStats()
}

async function handleExportKeys() {
  if (!rosterSemesterId.value) return

  const csv = await exportKeysCSV(rosterSemesterId.value)
  const semCode = selectedSemester.value?.code || 'roster'
  downloadCSV(csv, `student-keys-${semCode}.csv`)
}

function clearUpload() {
  csvFile.value = null
  parsedRows.value = []
  parseError.value = ''
  createResults.value = null
  // Reset file input
  const fileInput = document.getElementById('csvFile')
  if (fileInput) fileInput.value = ''
}

function clearResults() {
  createResults.value = null
}

// Analytics functions
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

/* Tab Navigation */
.tab-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0.5rem 0.5rem 0 0;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.tab-btn.active {
  color: var(--primary);
  background: rgba(37, 99, 235, 0.1);
  border-bottom: 2px solid var(--primary);
}

/* Section description */
.section-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

/* File upload area */
.upload-area {
  margin-top: 1rem;
}

.file-input {
  display: none;
}

.file-label {
  display: block;
  padding: 2rem;
  border: 2px dashed var(--border);
  border-radius: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-secondary);
}

.file-label:hover {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.02);
}

/* Preview section */
.preview-section {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-main);
  border-radius: 0.75rem;
}

.preview-section h3 {
  margin-bottom: 1rem;
}

.preview-table-wrapper {
  overflow-x: auto;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.preview-table th,
.preview-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.preview-table th {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
}

.preview-table code {
  background: var(--bg-card);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

.preview-note {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-style: italic;
  margin-top: 0.5rem;
}

.preview-summary {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 0.5rem;
}

.preview-summary p {
  margin: 0.25rem 0;
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.new {
  background: #ecfdf5;
  color: #059669;
}

.status-badge.duplicate {
  background: #fef3c7;
  color: #d97706;
}

/* Results section */
.results-section {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #ecfdf5;
  border-radius: 0.75rem;
  border: 1px solid #10b981;
}

.results-section h3 {
  color: #059669;
  margin-bottom: 1rem;
}

.results-summary p {
  margin: 0.5rem 0;
}

.result-success {
  color: #059669;
  font-weight: 500;
}

.result-skipped {
  color: #d97706;
}

.result-error {
  color: #dc2626;
}

/* Error message */
.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-top: 1rem;
}
</style>
