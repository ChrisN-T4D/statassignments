<template>
  <div class="class-mastery-panel content-section">
    <h2>Class Mastery</h2>
    <p class="section-description">
      Overall module mastery and per-objective stats for claimed roster students (BKT pL ≥ 0.90 = mastered).
    </p>

    <div class="filters-grid">
      <div class="form-group">
        <label for="cm-semester">Semester</label>
        <select id="cm-semester" v-model="semesterId">
          <option value="">Select semester</option>
          <option v-for="sem in semesters" :key="sem.id" :value="sem.id">
            {{ sem.name || sem.code }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="cm-class">Class</label>
        <select id="cm-class" v-model="classId">
          <option value="statistics">Statistics</option>
          <option value="research-methods">Research Methods</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cm-module">Module</label>
        <select id="cm-module" v-model="moduleId" :disabled="!modulesList.length">
          <option value="">Select module</option>
          <option v-for="mod in modulesList" :key="mod.id" :value="mod.id">
            {{ mod.title || mod.name || mod.id }}
          </option>
        </select>
      </div>
    </div>

    <div class="actions-row">
      <button
        type="button"
        class="btn-secondary"
        :disabled="loading || !semesterId || !classId || !moduleId"
        @click="load"
      >
        {{ loading ? 'Loading...' : 'Load' }}
      </button>
      <button
        v-if="result"
        type="button"
        class="btn-primary"
        :disabled="loading"
        @click="exportModule"
      >
        Export this module CSV
      </button>
      <button
        v-if="onExportAll"
        type="button"
        class="btn-primary"
        :disabled="loading || !semesterId"
        @click="onExportAll(semesterId)"
      >
        Export all research data
      </button>
    </div>

    <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>

    <template v-if="result">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">
            {{ result.avgMasteryPct == null ? '—' : `${result.avgMasteryPct}%` }}
          </div>
          <div class="stat-label">Avg mastery</div>
          <div class="stat-sub">
            {{ result.withDataCount }} / {{ result.claimedCount }} with data
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ result.moduleReadyPct }}%</div>
          <div class="stat-label">Module-ready</div>
          <div class="stat-sub">
            {{ result.moduleReadyCount }} students (≥75% of objectives mastered)
          </div>
        </div>
      </div>

      <div class="preview-table-wrapper">
        <table class="preview-table">
          <thead>
            <tr>
              <th>Objective</th>
              <th>Description</th>
              <th>% mastered</th>
              <th>Avg pL</th>
              <th>n with attempts</th>
              <th>n mastered</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in result.objectives" :key="row.objectiveId">
              <td><code>{{ row.objectiveId }}</code></td>
              <td class="obj-text">{{ truncate(row.objective, 80) }}</td>
              <td>{{ row.pctMastered }}%</td>
              <td>{{ row.avgPL == null ? '—' : row.avgPL }}</td>
              <td>{{ row.nWithAttempts }}</td>
              <td>{{ row.nMastered }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <p v-else-if="!loading" class="preview-note">
      Select semester, class, and module, then Load.
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getContentModulesByClass } from '../data/modules.js'
import { useClassMasteryAnalytics } from '../composables/useClassMasteryAnalytics.js'

const props = defineProps({
  semesters: { type: Array, default: () => [] },
  onExportAll: { type: Function, default: null }
})

const { fetchClassMastery, exportClassMasteryModuleCSV, downloadCSV } = useClassMasteryAnalytics()

const semesterId = ref('')
const classId = ref('statistics')
const moduleId = ref('')
const loading = ref(false)
const errorMsg = ref('')
const result = ref(null)

const modulesList = computed(() => getContentModulesByClass(classId.value) || [])

watch(classId, () => {
  const first = modulesList.value[0]
  moduleId.value = first?.id || ''
  result.value = null
})

watch(
  () => props.semesters,
  (list) => {
    if (!semesterId.value && list?.length) {
      const active = list.find(s => s.is_active) || list[0]
      semesterId.value = active?.id || ''
    }
  },
  { immediate: true }
)

function truncate(text, n) {
  const s = String(text || '')
  return s.length <= n ? s : `${s.slice(0, n - 1)}…`
}

async function load() {
  if (!semesterId.value || !classId.value || !moduleId.value) return
  loading.value = true
  errorMsg.value = ''
  result.value = null
  try {
    result.value = await fetchClassMastery({
      semesterId: semesterId.value,
      classId: classId.value,
      moduleId: moduleId.value
    })
  } catch (err) {
    console.error(err)
    errorMsg.value = err?.message || 'Failed to load class mastery'
  } finally {
    loading.value = false
  }
}

function exportModule() {
  if (!result.value) return
  const csv = exportClassMasteryModuleCSV(result.value)
  downloadCSV(csv, `class-mastery-${moduleId.value}.csv`)
}
</script>

<style scoped>
.class-mastery-panel {
  margin-bottom: 1.5rem;
}
.section-description {
  color: #64748b;
  margin: 0 0 1rem;
  font-size: 0.95rem;
}
.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.form-group select {
  width: 100%;
  padding: 0.5rem 0.65rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
}
.actions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.btn-primary {
  background: #2563eb;
  color: #fff;
}
.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}
.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
.stat-card {
  background: var(--bg-main);
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}
.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stat-sub {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}
.preview-table-wrapper {
  overflow-x: auto;
  margin-top: 0.5rem;
}
.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.preview-table th,
.preview-table td {
  text-align: left;
  padding: 0.5rem 0.65rem;
  border-bottom: 1px solid #e2e8f0;
}
.obj-text {
  max-width: 28rem;
}
.error-message {
  color: #b91c1c;
  margin: 0.5rem 0;
}
.preview-note {
  color: #64748b;
  font-size: 0.9rem;
}
</style>
