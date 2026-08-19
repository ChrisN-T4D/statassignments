<template>
  <div class="student-progress-viewer">
    <div class="section-header">
      <h2>Student Progress</h2>
      <button class="btn-secondary" @click="refresh" :disabled="loading || !selectedUserId">
        {{ loading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <p class="section-description">
      View individual student answers for Concept Review and Software Practice (I Do / We Do / You Do).
      Only claimed roster students or registered student accounts with activity will show data.
    </p>

    <div class="filters-grid">
      <div class="form-group">
        <label for="sp-semester">Semester</label>
        <select id="sp-semester" v-model="semesterId" @change="onSemesterChange">
          <option value="">Select semester</option>
          <option v-for="sem in semesters" :key="sem.id" :value="sem.id">
            {{ sem.name || sem.code }} {{ sem.is_active ? '(Active)' : '' }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="sp-student">Student (roster key)</label>
        <select id="sp-student" v-model="selectedRosterKey" @change="onRosterSelect" :disabled="!semesterId">
          <option value="">Select student</option>
          <option
            v-for="s in rosterStudents"
            :key="s.id"
            :value="s.student_key"
            :disabled="!s.claimed"
          >
            {{ s.student_key }}{{ s.claimed ? '' : ' (unclaimed)' }}{{ s.bb_username ? ` — ${s.bb_username}` : '' }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="sp-user">Or select user account</label>
        <select id="sp-user" v-model="selectedUserIdDirect" @change="onUserDirectSelect">
          <option value="">Select user</option>
          <option v-for="u in studentUsers" :key="u.user_id" :value="u.user_id">
            {{ u.email || u.username || u.user_id }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="sp-course">Filter by course</label>
        <select id="sp-course" v-model="courseFilter">
          <option value="">All courses</option>
          <option value="research-methods">Research Methods</option>
          <option value="statistics">Statistics</option>
        </select>
      </div>

      <div class="form-group">
        <label for="sp-module">Filter by module</label>
        <select id="sp-module" v-model="moduleFilter">
          <option value="">All modules</option>
          <option v-for="mod in availableModules" :key="mod" :value="mod">{{ mod }}</option>
        </select>
      </div>
    </div>

    <div v-if="selectedStudentLabel" class="selected-student-banner">
      Viewing: <code>{{ selectedStudentLabel }}</code>
      <span v-if="rosterClassSlug" class="summary-inline">
        · Roster class: <strong>{{ rosterClassSlug }}</strong>
      </span>
      <span v-if="summaryStats" class="summary-inline">
        · {{ summaryStats.conceptAttempts }} concept answers shown
        · {{ summaryStats.softwareAnswers }} software answers shown
        · {{ summaryStats.objectivesTracked }} objectives tracked
      </span>
    </div>

    <div v-if="crossClassWarning" class="cross-class-alert">
      {{ crossClassWarning }}
    </div>

    <div v-if="!selectedUserId" class="empty-state">
      Select a semester and student, or pick a user account directly.
    </div>

    <template v-else>
      <div class="sub-tab-nav">
        <button
          v-for="tab in subTabs"
          :key="tab.id"
          :class="['sub-tab-btn', { active: activeSubTab === tab.id }]"
          @click="activeSubTab = tab.id"
        >
          {{ tab.label }}
          <span v-if="tab.count != null" class="tab-count">{{ tab.count }}</span>
        </button>
      </div>

      <!-- Concept Review -->
      <div v-if="activeSubTab === 'concept'" class="progress-panel">
        <div v-if="filteredConceptAttempts.length === 0" class="empty-state">
          No Concept Review answers recorded for this student.
        </div>
        <div v-else class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Course</th>
                <th>Module</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Correct</th>
                <th>Time (active)</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredConceptAttempts" :key="row.id">
                <td class="nowrap">{{ formatDate(row.created) }}</td>
                <td>{{ row.course_id || '—' }}</td>
                <td><code>{{ row.module_id || '—' }}</code></td>
                <td class="question-cell">
                  <div class="question-id"><code>{{ row.question_id }}</code></div>
                  <div v-if="row.question_text" class="question-text">{{ truncate(row.question_text, 120) }}</div>
                </td>
                <td>{{ row.formatted_answer }}</td>
                <td>
                  <span :class="['result-badge', row.is_correct ? 'correct' : 'incorrect']">
                    {{ row.is_correct ? 'Yes' : 'No' }}
                  </span>
                </td>
                <td>{{ row.active_time_seconds != null ? `${row.active_time_seconds}s` : '—' }}</td>
                <td>{{ row.difficulty || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Software Practice (I / We / You Do) -->
      <div v-if="activeSubTab === 'software'" class="progress-panel">
        <div v-if="softwareLessonGroups.length === 0 && enrichedMetrics.length === 0" class="empty-state">
          No Software Practice activity recorded for this student.
        </div>

        <div v-if="enrichedMetrics.length" class="metrics-section">
          <h3>Lesson activity</h3>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Lesson</th>
                  <th>Module</th>
                  <th>Event</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in filteredMetrics" :key="m.id">
                  <td class="nowrap">{{ formatDate(m.created) }}</td>
                  <td>{{ m.lesson_title }}</td>
                  <td><code>{{ m.module_id || '—' }}</code></td>
                  <td>{{ m.event_type }}</td>
                  <td class="details-cell">{{ formatPayload(m.event_payload) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-for="group in softwareLessonGroups" :key="group.lesson_id || group.lesson_title" class="lesson-group">
          <h3>{{ group.lesson_title }}</h3>
          <p class="lesson-meta">
            <code>{{ group.lesson_id }}</code>
            <span v-if="group.module_id"> · {{ group.module_id }}</span>
            <span v-if="group.software"> · {{ group.software }}</span>
          </p>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Phase</th>
                  <th>Item</th>
                  <th>Answer</th>
                  <th>Correct</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ev in group.events" :key="ev.id">
                  <td class="nowrap">{{ formatDate(ev.created) }}</td>
                  <td>{{ ev.phase_label }}</td>
                  <td><code>{{ ev.item_id || '—' }}</code></td>
                  <td>{{ ev.formatted_answer }}</td>
                  <td>
                    <span v-if="ev.is_correct != null" :class="['result-badge', ev.is_correct ? 'correct' : 'incorrect']">
                      {{ ev.is_correct ? 'Yes' : 'No' }}
                    </span>
                    <span v-else>—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- BKT Mastery -->
      <div v-if="activeSubTab === 'mastery'" class="progress-panel">
        <div v-if="bktStates.length === 0" class="empty-state">
          No BKT mastery data for this student.
        </div>
        <div v-else class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>Objective</th>
                <th>Mastery (pL)</th>
                <th>Attempts</th>
                <th>Correct</th>
                <th>Incorrect</th>
                <th>Accuracy</th>
                <th>Last updated</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in bktStates" :key="s.id">
                <td><code>{{ s.objective_id }}</code></td>
                <td>{{ s.pL != null ? `${(s.pL * 100).toFixed(1)}%` : '—' }}</td>
                <td>{{ s.attempts ?? 0 }}</td>
                <td>{{ s.correct ?? 0 }}</td>
                <td>{{ s.incorrect ?? 0 }}</td>
                <td>
                  {{ s.attempts > 0 ? `${Math.round((s.correct / s.attempts) * 100)}%` : '—' }}
                </td>
                <td class="nowrap">{{ formatDate(s.last_updated || s.updated) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStudentProgress } from '../composables/useStudentProgress'

const {
  loading,
  fetchSemesters,
  fetchRosterStudents,
  fetchStudentUsers,
  fetchProgressForUser,
  enrichConceptAttempts,
  enrichSoftwareEvents,
  groupSoftwareByLesson,
  enrichSoftwareMetrics
} = useStudentProgress()

const semesters = ref([])
const rosterStudents = ref([])
const studentUsers = ref([])

const semesterId = ref('')
const selectedRosterKey = ref('')
const selectedUserIdDirect = ref('')
const selectedUserId = ref('')
const selectedStudentLabel = ref('')
const rosterClassSlug = ref('')

const courseFilter = ref('')
const moduleFilter = ref('')
const activeSubTab = ref('concept')

const conceptAttempts = ref([])
const softwareEvents = ref([])
const bktStates = ref([])
const softwareMetrics = ref([])

const enrichedConcept = computed(() => enrichConceptAttempts(conceptAttempts.value))
const enrichedSoftware = computed(() => enrichSoftwareEvents(softwareEvents.value))
const enrichedMetrics = computed(() => enrichSoftwareMetrics(softwareMetrics.value))

function matchesCourseFilter(row) {
  if (!courseFilter.value) return true
  return (row.course_id || row.class_id) === courseFilter.value
}

const filteredConceptAttempts = computed(() => {
  let rows = enrichedConcept.value
  if (courseFilter.value) rows = rows.filter(matchesCourseFilter)
  if (moduleFilter.value) rows = rows.filter(r => r.module_id === moduleFilter.value)
  return rows
})

const filteredSoftwareEvents = computed(() => {
  let rows = enrichedSoftware.value
  if (courseFilter.value) rows = rows.filter(matchesCourseFilter)
  if (moduleFilter.value) rows = rows.filter(r => r.module_id === moduleFilter.value)
  return rows
})

const filteredMetrics = computed(() => {
  let rows = enrichedMetrics.value
  if (moduleFilter.value) rows = rows.filter(r => r.module_id === moduleFilter.value)
  return rows
})

const softwareLessonGroups = computed(() => {
  const groups = groupSoftwareByLesson(filteredSoftwareEvents.value)
  if (!moduleFilter.value) return groups
  return groups.filter(g => g.module_id === moduleFilter.value)
})

const availableModules = computed(() => {
  const mods = new Set()
  enrichedConcept.value.forEach(r => { if (r.module_id) mods.add(r.module_id) })
  enrichedSoftware.value.forEach(r => { if (r.module_id) mods.add(r.module_id) })
  enrichedMetrics.value.forEach(r => { if (r.module_id) mods.add(r.module_id) })
  return [...mods].sort()
})

const summaryStats = computed(() => {
  if (!selectedUserId.value) return null
  return {
    conceptAttempts: filteredConceptAttempts.value.length,
    softwareAnswers: filteredSoftwareEvents.value.filter(e =>
      ['software_selfcheck', 'software_youdo', 'software_apply'].includes(e.source)
    ).length,
    objectivesTracked: bktStates.value.length
  }
})

const crossClassCounts = computed(() => {
  const counts = { 'research-methods': 0, statistics: 0 }
  for (const row of enrichedConcept.value) {
    if (row.course_id && counts[row.course_id] != null) counts[row.course_id]++
  }
  return counts
})

const crossClassWarning = computed(() => {
  if (!rosterClassSlug.value) return ''
  const other = rosterClassSlug.value === 'research-methods' ? 'statistics' : 'research-methods'
  const otherCount = crossClassCounts.value[other] || 0
  if (otherCount === 0) return ''
  return `This student is rostered for ${rosterClassSlug.value} only, but has ${otherCount} Concept Review answer(s) from ${other} — likely from visiting that course URL before access restrictions were added. Use the course filter to focus on roster activity.`
})

const subTabs = computed(() => [
  { id: 'concept', label: 'Concept Review', count: filteredConceptAttempts.value.length },
  { id: 'software', label: 'Software (I/We/You Do)', count: filteredSoftwareEvents.value.length },
  { id: 'mastery', label: 'Mastery (BKT)', count: bktStates.value.length }
])

async function loadSemesters() {
  semesters.value = await fetchSemesters()
  const active = semesters.value.find(s => s.is_active)
  if (active && !semesterId.value) {
    semesterId.value = active.id
    await onSemesterChange()
  }
}

async function onSemesterChange() {
  selectedRosterKey.value = ''
  if (semesterId.value) {
    rosterStudents.value = await fetchRosterStudents(semesterId.value)
  } else {
    rosterStudents.value = []
  }
}

function onRosterSelect() {
  selectedUserIdDirect.value = ''
  const entry = rosterStudents.value.find(s => s.student_key === selectedRosterKey.value)
  rosterClassSlug.value = entry?.class_slug || ''
  courseFilter.value = entry?.class_slug || ''
  if (entry?.user_id) {
    selectedUserId.value = entry.user_id
    selectedStudentLabel.value = entry.student_key + (entry.email ? ` (${entry.email})` : '')
    loadProgress()
  } else {
    selectedUserId.value = ''
    selectedStudentLabel.value = selectedRosterKey.value ? `${selectedRosterKey.value} (not claimed — no data)` : ''
    clearProgress()
  }
}

function onUserDirectSelect() {
  selectedRosterKey.value = ''
  rosterClassSlug.value = ''
  courseFilter.value = ''
  selectedUserId.value = selectedUserIdDirect.value
  const user = studentUsers.value.find(u => u.user_id === selectedUserIdDirect.value)
  selectedStudentLabel.value = user?.email || user?.username || selectedUserIdDirect.value
  if (selectedUserId.value) loadProgress()
  else clearProgress()
}

function clearProgress() {
  conceptAttempts.value = []
  softwareEvents.value = []
  bktStates.value = []
  softwareMetrics.value = []
}

async function loadProgress() {
  if (!selectedUserId.value) return
  const data = await fetchProgressForUser(selectedUserId.value)
  conceptAttempts.value = data.practiceAttempts
  softwareEvents.value = data.learningEvents
  bktStates.value = data.bktStates
  softwareMetrics.value = data.softwareMetrics
}

function refresh() {
  loadProgress()
}

function formatDate(dateString) {
  if (!dateString) return '—'
  try {
    return new Date(dateString).toLocaleString()
  } catch {
    return dateString
  }
}

function truncate(text, max) {
  if (!text || text.length <= max) return text
  return text.slice(0, max - 1) + '…'
}

function formatPayload(payload) {
  if (!payload || typeof payload !== 'object') return '—'
  const parts = []
  if (payload.phase) parts.push(`phase: ${payload.phase}`)
  if (payload.score != null) parts.push(`score: ${payload.score}`)
  if (payload.total != null) parts.push(`total: ${payload.total}`)
  if (payload.exerciseId) parts.push(`exercise: ${payload.exerciseId}`)
  if (parts.length) return parts.join(', ')
  return JSON.stringify(payload).slice(0, 80)
}

watch(selectedUserId, (id) => {
  if (!id) clearProgress()
})

onMounted(async () => {
  await Promise.all([loadSemesters(), fetchStudentUsers().then(u => { studentUsers.value = u })])
})
</script>

<style scoped>
.student-progress-viewer {
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.section-header h2 {
  margin: 0;
}

.section-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0 0 1.25rem 0;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-group select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: var(--bg-main);
  color: var(--text-primary);
}

.selected-student-banner {
  padding: 0.75rem 1rem;
  background: var(--bg-main);
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.summary-inline {
  color: var(--text-secondary);
}

.sub-tab-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}

.sub-tab-btn {
  padding: 0.625rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  font-weight: 500;
}

.sub-tab-btn.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.tab-count {
  margin-left: 0.35rem;
  background: var(--bg-main);
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  font-size: 0.75rem;
}

.progress-panel {
  margin-top: 0.5rem;
}

.table-scroll {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.data-table th,
.data-table td {
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
}

.data-table th {
  background: var(--bg-main);
  font-weight: 600;
}

.data-table tbody tr:hover {
  background: var(--bg-main);
}

.nowrap {
  white-space: nowrap;
}

.question-cell {
  max-width: 280px;
}

.question-id {
  margin-bottom: 0.25rem;
}

.question-text {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.result-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.result-badge.correct {
  background: #d1fae5;
  color: #065f46;
}

.result-badge.incorrect {
  background: #fee2e2;
  color: #991b1b;
}

.lesson-group {
  margin-top: 1.5rem;
}

.lesson-group h3,
.metrics-section h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.lesson-meta {
  margin: 0 0 0.75rem 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.details-cell {
  max-width: 240px;
  word-break: break-word;
}

.cross-class-alert {
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.375rem;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  color: #92400e;
  font-size: 0.875rem;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-main);
  border-radius: 0.375rem;
}

.btn-secondary {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
