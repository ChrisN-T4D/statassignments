<template>
  <div class="bkt-tester">
    <div class="tester-header">
      <h2>BKT Testing Interface</h2>
      <p>Test and validate the Bayesian Knowledge Tracing algorithm</p>
    </div>

    <!-- Control Panel -->
    <div class="control-panel">
      <button @click="resetAllStates" class="btn-danger">Reset All BKT States</button>
      <button @click="loadStates" class="btn-primary">Refresh States</button>
    </div>

    <!-- Parameter Display -->
    <div class="param-display">
      <h3>Default Parameters</h3>
      <div class="param-grid">
        <div class="param-item">
          <span class="param-label">P(L0) - Prior:</span>
          <span class="param-value">{{ adaptivePrior.toFixed(2) }}</span>
        </div>
        <div class="param-item">
          <span class="param-label">P(T) - Learning Rate:</span>
          <span class="param-value">0.15</span>
        </div>
      </div>

      <h3>Difficulty Adjustments</h3>
      <div class="difficulty-grid">
        <div class="difficulty-card" v-for="diff in ['easy', 'medium', 'hard']" :key="diff">
          <h4>{{ diff.charAt(0).toUpperCase() + diff.slice(1) }}</h4>
          <div class="param-item">
            <span class="param-label">P(G) - Guess:</span>
            <span class="param-value">{{ getDifficultyParams(diff).pG.toFixed(2) }}</span>
          </div>
          <div class="param-item">
            <span class="param-label">P(S) - Slip:</span>
            <span class="param-value">{{ getDifficultyParams(diff).pS.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Objectives Testing -->
    <div class="objectives-section">
      <h3>Test Objectives</h3>

      <div v-if="objectives.length === 0" class="no-objectives">
        No objectives tracked yet. Complete some practice questions to initialize BKT states.
      </div>

      <div v-for="obj in objectivesWithStates" :key="obj.objectiveId" class="objective-card">
        <div class="objective-header">
          <div class="objective-info">
            <span class="objective-id">{{ obj.objectiveId }}</span>
            <span class="objective-text">{{ obj.objective }}</span>
          </div>
          <div class="mastery-display">
            <div class="mastery-bar">
              <div
                class="mastery-fill"
                :style="{ width: obj.masteryPercent + '%' }"
                :class="getMasteryClass(obj.masteryPercent)"
              ></div>
            </div>
            <span class="mastery-percent">{{ obj.masteryPercent }}%</span>
          </div>
        </div>

        <div class="objective-stats">
          <div class="stat">
            <span class="stat-label">Attempts:</span>
            <span class="stat-value">{{ obj.state?.attempts || 0 }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Correct:</span>
            <span class="stat-value">{{ obj.state?.correct || 0 }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Incorrect:</span>
            <span class="stat-value">{{ obj.state?.incorrect || 0 }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">P(L):</span>
            <span class="stat-value">{{ (obj.state?.pL || 0).toFixed(3) }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">P(G):</span>
            <span class="stat-value">{{ (obj.state?.pG || 0.25).toFixed(2) }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">P(S):</span>
            <span class="stat-value">{{ (obj.state?.pS || 0.1).toFixed(2) }}</span>
          </div>
        </div>

        <div class="test-controls">
          <h4>Simulate Response:</h4>
          <div class="button-group">
            <button
              @click="simulateResponse(obj.objectiveId, true, 'easy')"
              class="btn-success btn-sm"
            >
              ✓ Easy Correct
            </button>
            <button
              @click="simulateResponse(obj.objectiveId, true, 'medium')"
              class="btn-success btn-sm"
            >
              ✓ Medium Correct
            </button>
            <button
              @click="simulateResponse(obj.objectiveId, true, 'hard')"
              class="btn-success btn-sm"
            >
              ✓ Hard Correct
            </button>
          </div>
          <div class="button-group">
            <button
              @click="simulateResponse(obj.objectiveId, false, 'easy')"
              class="btn-error btn-sm"
            >
              ✗ Easy Incorrect
            </button>
            <button
              @click="simulateResponse(obj.objectiveId, false, 'medium')"
              class="btn-error btn-sm"
            >
              ✗ Medium Incorrect
            </button>
            <button
              @click="simulateResponse(obj.objectiveId, false, 'hard')"
              class="btn-error btn-sm"
            >
              ✗ Hard Incorrect
            </button>
          </div>
          <button
            @click="resetObjective(obj.objectiveId)"
            class="btn-warning btn-sm"
          >
            Reset This Objective
          </button>
        </div>
      </div>
    </div>

    <!-- Add Untracked Objectives -->
    <div v-if="untrackedObjectives.length > 0" class="untracked-section">
      <h3>Initialize Untracked Objectives</h3>
      <div class="untracked-grid">
        <div
          v-for="obj in untrackedObjectives"
          :key="obj.objectiveId"
          class="untracked-card"
        >
          <span class="objective-id">{{ obj.objectiveId }}</span>
          <span class="objective-text">{{ obj.objective }}</span>
          <button
            @click="initializeObjective(obj.objectiveId)"
            class="btn-primary btn-sm"
          >
            Initialize
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBKT } from '../composables/useBKT'
import { objectives as allObjectives } from '../data/objectives'

const {
  updateBKT,
  getMasteryPercent,
  getBKTState,
  resetBKT,
  getAllBKTStates,
  getAdjustedParams,
  adaptPrior,
  initializeBKT
} = useBKT()

const objectives = ref([])
const adaptivePrior = ref(0.1)

async function loadStates() {
  const states = await getAllBKTStates()
  const objArray = []
  for (const objectiveId of Object.keys(states)) {
    const state = states[objectiveId]
    const objectiveInfo = allObjectives.find(o => o.objectiveId === objectiveId)
    const masteryPercent = await getMasteryPercent(objectiveId)
    objArray.push({
      objectiveId,
      objective: objectiveInfo?.objective || 'Unknown objective',
      module: objectiveInfo?.module || 0,
      state,
      masteryPercent
    })
  }
  objectives.value = objArray
  adaptivePrior.value = await adaptPrior()
}

const objectivesWithStates = computed(() => {
  return objectives.value.sort((a, b) => {
    if (a.module !== b.module) return a.module - b.module
    return a.objectiveId.localeCompare(b.objectiveId)
  })
})

const untrackedObjectives = computed(() => {
  const trackedIds = new Set(objectives.value.map(o => o.objectiveId))
  return allObjectives.filter(obj => !trackedIds.has(obj.objectiveId))
})

function getDifficultyParams(difficulty) {
  return getAdjustedParams(difficulty)
}

function getMasteryClass(percent) {
  if (percent >= 90) return 'mastered'
  if (percent >= 75) return 'proficient'
  if (percent >= 60) return 'developing'
  return 'novice'
}

async function simulateResponse(objectiveId, isCorrect, difficulty) {
  const updatedState = await updateBKT(objectiveId, isCorrect, difficulty)
  console.log(`Simulated ${difficulty} ${isCorrect ? 'correct' : 'incorrect'} for ${objectiveId}:`, updatedState)
  await loadStates()
}

async function resetObjective(objectiveId) {
  await resetBKT(objectiveId)
  console.log(`Reset BKT state for ${objectiveId}`)
  await loadStates()
}

async function resetAllStates() {
  if (confirm('Are you sure you want to reset ALL BKT states? This cannot be undone.')) {
    const states = await getAllBKTStates()
    for (const objectiveId of Object.keys(states)) {
      await resetBKT(objectiveId)
    }
    console.log('All BKT states reset')
    await loadStates()
  }
}

async function initializeObjective(objectiveId) {
  await initializeBKT(objectiveId)
  console.log(`Initialized BKT state for ${objectiveId}`)
  await loadStates()
}

onMounted(async () => {
  await loadStates()
})
</script>

<style scoped>
.bkt-tester {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.tester-header {
  margin-bottom: 2rem;
}

.tester-header h2 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.tester-header p {
  color: var(--text-secondary);
}

.control-panel {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.param-display {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.param-display h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.param-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.param-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--background);
  border-radius: 0.25rem;
}

.param-label {
  font-weight: 500;
  color: var(--text-secondary);
}

.param-value {
  font-weight: 600;
  color: var(--text-primary);
}

.difficulty-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.difficulty-card {
  background: var(--background);
  padding: 1rem;
  border-radius: 0.5rem;
}

.difficulty-card h4 {
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.objectives-section {
  margin-bottom: 2rem;
}

.objectives-section h3 {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.no-objectives {
  padding: 2rem;
  text-align: center;
  background: var(--surface);
  border-radius: 0.5rem;
  color: var(--text-secondary);
}

.objective-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.objective-header {
  margin-bottom: 1rem;
}

.objective-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.objective-id {
  font-size: 0.75rem;
  font-weight: 600;
  color: #111827;
  background: #9ca3af;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.objective-text {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.mastery-display {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mastery-bar {
  flex: 1;
  height: 1.5rem;
  background: var(--background);
  border-radius: 0.75rem;
  overflow: hidden;
}

.mastery-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.mastery-fill.novice {
  background: #ef4444;
}

.mastery-fill.developing {
  background: #f59e0b;
}

.mastery-fill.proficient {
  background: #3b82f6;
}

.mastery-fill.mastered {
  background: #10b981;
}

.mastery-percent {
  font-weight: 600;
  min-width: 3rem;
  text-align: right;
  color: var(--text-primary);
}

.objective-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--background);
  border-radius: 0.375rem;
}

.stat {
  display: flex;
  justify-content: space-between;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.test-controls {
  border-top: 1px solid var(--border);
  padding-top: 1rem;
}

.test-controls h4 {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.button-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.btn-success {
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-success:hover {
  background: #059669;
}

.btn-error {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-error:hover {
  background: #dc2626;
}

.btn-warning {
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-warning:hover {
  background: #d97706;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-danger {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-danger:hover {
  background: #b91c1c;
}

.untracked-section {
  margin-top: 2rem;
}

.untracked-section h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.untracked-grid {
  display: grid;
  gap: 0.75rem;
}

.untracked-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.375rem;
}

.untracked-card .objective-text {
  flex: 1;
}
</style>
