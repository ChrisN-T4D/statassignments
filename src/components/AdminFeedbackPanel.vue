<template>
  <div class="feedback-panel">
    <div class="panel-header">
      <h2>Student feedback</h2>
      <div class="panel-actions">
        <button type="button" class="btn-secondary" :disabled="loading" @click="loadReports">
          Refresh
        </button>
        <button type="button" class="btn-primary" :disabled="!reports.length" @click="exportCsv">
          Export CSV
        </button>
      </div>
    </div>

    <div class="filters">
      <label>
        Status
        <select v-model="statusFilter">
          <option value="open">Open</option>
          <option value="resolved">Resolved</option>
          <option value="all">All</option>
        </select>
      </label>
      <label>
        Category
        <select v-model="categoryFilter">
          <option value="all">All</option>
          <option v-for="opt in FEEDBACK_CATEGORIES" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </label>
    </div>

    <p v-if="loading" class="status-text">Loading reports...</p>
    <p v-else-if="error" class="error-text">{{ error }}</p>
    <p v-else-if="filteredReports.length === 0" class="status-text">No reports match these filters.</p>

    <div v-else class="report-list">
      <article
        v-for="report in filteredReports"
        :key="report.id"
        class="report-row"
        :class="{ resolved: report.status === 'resolved' }"
      >
        <div class="report-summary" @click="toggleExpanded(report.id)">
          <div class="report-meta">
            <span class="badge" :class="report.status">{{ report.status }}</span>
            <span class="badge category">{{ categoryLabel(report.category) }}</span>
            <time>{{ formatDate(report.created) }}</time>
          </div>
          <h3>{{ report.subject }}</h3>
          <p class="student-line">
            <strong>{{ report.student_key || 'no key' }}</strong>
            <span v-if="report.route_path"> · {{ report.route_path }}</span>
          </p>
        </div>

        <div v-if="expandedId === report.id" class="report-detail">
          <p class="message">{{ report.message }}</p>
          <dl class="context-dl">
            <dt>Page</dt>
            <dd>
              <a v-if="report.page_url" :href="report.page_url" target="_blank" rel="noopener">
                {{ report.page_url }}
              </a>
              <span v-else>—</span>
            </dd>
            <dt>Class</dt>
            <dd>{{ report.class_id || '—' }}</dd>
            <dt>Module</dt>
            <dd>{{ report.module_id || '—' }}</dd>
            <dt>User agent</dt>
            <dd class="mono">{{ report.context?.userAgent || '—' }}</dd>
          </dl>

          <label class="notes-label">
            Admin notes
            <textarea v-model="adminNotes[report.id]" rows="3" placeholder="Internal notes" />
          </label>

          <div class="detail-actions">
            <button
              v-if="report.status !== 'resolved'"
              type="button"
              class="btn-primary"
              :disabled="savingId === report.id"
              @click="markResolved(report)"
            >
              Mark resolved
            </button>
            <button
              v-else
              type="button"
              class="btn-secondary"
              :disabled="savingId === report.id"
              @click="reopen(report)"
            >
              Reopen
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { FEEDBACK_CATEGORIES, useFeedbackReports } from '../composables/useFeedbackReports'

const { fetchAllFeedbackReports, updateFeedbackReport } = useFeedbackReports()

const reports = ref([])
const loading = ref(false)
const error = ref('')
const statusFilter = ref('open')
const categoryFilter = ref('all')
const expandedId = ref(null)
const adminNotes = reactive({})
const savingId = ref(null)

const filteredReports = computed(() => {
  return reports.value.filter((report) => {
    if (statusFilter.value !== 'all' && report.status !== statusFilter.value) return false
    if (categoryFilter.value !== 'all' && report.category !== categoryFilter.value) return false
    return true
  })
})

function categoryLabel(value) {
  return FEEDBACK_CATEGORIES.find((c) => c.value === value)?.label || value
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleString()
}

function toggleExpanded(id) {
  expandedId.value = expandedId.value === id ? null : id
}

async function loadReports() {
  loading.value = true
  error.value = ''
  try {
    const rows = await fetchAllFeedbackReports()
    reports.value = rows
    for (const row of rows) {
      if (adminNotes[row.id] === undefined) {
        adminNotes[row.id] = row.admin_notes || ''
      }
    }
  } catch (err) {
    error.value = err?.message || 'Failed to load feedback reports'
  } finally {
    loading.value = false
  }
}

async function markResolved(report) {
  savingId.value = report.id
  try {
    const updated = await updateFeedbackReport(report.id, {
      status: 'resolved',
      admin_notes: adminNotes[report.id] || ''
    })
    Object.assign(report, updated)
  } catch (err) {
    error.value = err?.message || 'Failed to update report'
  } finally {
    savingId.value = null
  }
}

async function reopen(report) {
  savingId.value = report.id
  try {
    const updated = await updateFeedbackReport(report.id, {
      status: 'open',
      admin_notes: adminNotes[report.id] || ''
    })
    Object.assign(report, updated)
  } catch (err) {
    error.value = err?.message || 'Failed to update report'
  } finally {
    savingId.value = null
  }
}

function exportCsv() {
  const headers = [
    'id',
    'created',
    'student_key',
    'category',
    'subject',
    'status',
    'page_url',
    'route_path',
    'class_id',
    'module_id',
    'message',
    'admin_notes'
  ]
  const escape = (v) => {
    const s = v == null ? '' : String(v)
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  const rows = filteredReports.value.map((r) =>
    headers.map((h) => escape(r[h])).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `feedback-reports-${Date.now()}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

onMounted(loadReports)

watch([statusFilter, categoryFilter], () => {
  expandedId.value = null
})
</script>

<style scoped>
.feedback-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.panel-header h2 {
  margin: 0;
}

.panel-actions {
  display: flex;
  gap: 0.5rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.filters label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.filters select {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
}

.status-text,
.error-text {
  color: var(--text-secondary);
}

.error-text {
  color: #b91c1c;
}

.report-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.report-row {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-card);
}

.report-row.resolved {
  opacity: 0.85;
}

.report-summary {
  padding: 1rem;
  cursor: pointer;
}

.report-summary h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.report-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.badge {
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  background: #e2e8f0;
  color: #334155;
}

.badge.open {
  background: #fef3c7;
  color: #92400e;
}

.badge.resolved {
  background: #dcfce7;
  color: #166534;
}

.badge.category {
  text-transform: none;
}

.student-line {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.report-detail {
  border-top: 1px solid var(--border);
  padding: 1rem;
}

.message {
  white-space: pre-wrap;
  margin-top: 0;
}

.context-dl {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 0.25rem 0.75rem;
  font-size: 0.875rem;
  margin: 1rem 0;
}

.context-dl dt {
  font-weight: 600;
  color: var(--text-secondary);
}

.context-dl dd {
  margin: 0;
  word-break: break-word;
}

.mono {
  font-family: monospace;
  font-size: 0.75rem;
}

.notes-label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.notes-label textarea {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  font-family: inherit;
}

.detail-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  cursor: pointer;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.btn-secondary {
  background: var(--bg-card);
}
</style>
