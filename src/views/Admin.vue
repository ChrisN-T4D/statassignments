<template>
  <div class="admin-page">
    <div class="container">
      <div class="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>System administration and data management</p>
        </div>
        <div class="header-actions">
          <router-link to="/bkt-tester" class="btn-secondary">BKT Tester</router-link>
          <router-link to="/profile" class="btn-secondary">Profile</router-link>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-button"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Dataset Viewer -->
      <div v-if="activeTab === 'datasets'" class="content-section">
        <div class="section-header">
          <h2>Dataset Viewer</h2>
          <div class="actions">
            <button @click="exportAllData" class="btn-primary">Export All Data</button>
            <button @click="refreshData" class="btn-secondary">Refresh</button>
          </div>
        </div>

        <div class="dataset-selector">
          <label>Select Collection:</label>
          <select v-model="selectedCollection" @change="loadCollectionData">
            <option value="">-- Choose a collection --</option>
            <option value="users">Users</option>
            <option value="attempts">Attempts</option>
            <option value="classes">Classes</option>
            <option value="courses">Courses</option>
            <option value="items">Items</option>
            <option value="modules">Modules</option>
            <option value="roster">Roster</option>
            <option value="semesters">Semesters</option>
            <option value="practice_attempts">Practice Attempts</option>
            <option value="practice_problems">Practice Problems</option>
            <option value="read_topics">Read Topics</option>
          </select>
        </div>

        <div v-if="selectedCollection && collectionData.length > 0" class="data-table-container">
          <div class="table-info">
            <span>Showing {{ collectionData.length }} records</span>
            <button @click="exportCollection" class="btn-sm">Export {{ selectedCollection }}</button>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th v-for="column in tableColumns" :key="column">{{ column }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in collectionData" :key="row.id || idx">
                  <td v-for="column in tableColumns" :key="column">
                    {{ formatCellValue(row[column]) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="selectedCollection && collectionData.length === 0" class="empty-state">
          No data found in {{ selectedCollection }}
        </div>
      </div>

      <!-- BKT Analytics -->
      <div v-if="activeTab === 'bkt'" class="content-section">
        <div class="section-header">
          <h2>BKT Analytics</h2>
          <div class="actions">
            <button @click="migrateBKTToDatabase" class="btn-primary" :disabled="migrationStatus === 'migrating'">
              {{ migrationStatus === 'migrating' ? 'Migrating...' : 'Migrate to Database' }}
            </button>
            <button @click="loadBKTData" class="btn-secondary">Refresh</button>
          </div>
        </div>

        <!-- Migration Result -->
        <div v-if="migrationResult" class="alert" :class="migrationResult.type">
          <strong>{{ migrationResult.message }}</strong>
          <p v-if="migrationResult.details">{{ migrationResult.details }}</p>
          <button @click="migrationResult = null" class="btn-sm">Dismiss</button>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ bktStats.totalObjectives }}</div>
            <div class="stat-label">Total Objectives Tracked</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ bktStats.averageMastery }}%</div>
            <div class="stat-label">Average Mastery</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ bktStats.totalAttempts }}</div>
            <div class="stat-label">Total Attempts</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ bktStats.accuracyRate }}%</div>
            <div class="stat-label">Overall Accuracy</div>
          </div>
        </div>

        <div class="bkt-data-table">
          <h3>All BKT States</h3>
          <p class="note">
            BKT data can be stored in PocketBase for persistence across devices.
            Use "Migrate to Database" to transfer any localStorage data to the database.
          </p>
          <div v-if="Object.keys(allBKTStates).length > 0" class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Objective ID</th>
                  <th>Mastery (P(L))</th>
                  <th>Prior (P(L0))</th>
                  <th>Learning Rate (P(T))</th>
                  <th>Slip (P(S))</th>
                  <th>Guess (P(G))</th>
                  <th>Attempts</th>
                  <th>Correct</th>
                  <th>Incorrect</th>
                  <th>Accuracy</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(state, objId) in allBKTStates" :key="objId">
                  <td><strong>{{ objId }}</strong></td>
                  <td>{{ (state.pL * 100).toFixed(1) }}%</td>
                  <td>{{ (state.pL0 * 100).toFixed(1) }}%</td>
                  <td>{{ (state.pT * 100).toFixed(1) }}%</td>
                  <td>{{ ((state.pS || 0.1) * 100).toFixed(1) }}%</td>
                  <td>{{ ((state.pG || 0.25) * 100).toFixed(1) }}%</td>
                  <td>{{ state.attempts }}</td>
                  <td>{{ state.correct }}</td>
                  <td>{{ state.incorrect }}</td>
                  <td>{{ state.attempts > 0 ? ((state.correct / state.attempts) * 100).toFixed(1) : 0 }}%</td>
                  <td>{{ formatDate(state.lastUpdated) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="empty-state">
            No BKT data found. Complete some practice questions to generate BKT states.
          </div>
        </div>
      </div>

      <!-- Question Analytics -->
      <div v-if="activeTab === 'questions'" class="content-section">
        <div class="section-header">
          <h2>Question Analytics</h2>
          <button @click="loadQuestionStats" class="btn-secondary">Refresh</button>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ questionStats.totalQuestions }}</div>
            <div class="stat-label">Total Questions</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ questionStats.module1 }}</div>
            <div class="stat-label">Module 1</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ questionStats.module2 }}</div>
            <div class="stat-label">Module 2</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ questionStats.module3 }}</div>
            <div class="stat-label">Module 3</div>
          </div>
        </div>

        <div class="question-objectives-map">
          <h3>Question-Objective Mappings</h3>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Question ID</th>
                  <th>Module</th>
                  <th>Mapped Objectives</th>
                  <th>Difficulty</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="q in questionsWithMappings" :key="q.id">
                  <td>{{ q.id }}</td>
                  <td>{{ q.module }}</td>
                  <td>{{ q.objectives.join(', ') || 'None' }}</td>
                  <td>
                    <span class="badge" :class="`badge-${q.difficulty}`">
                      {{ q.difficulty }}
                    </span>
                  </td>
                  <td>{{ q.type }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- User Management -->
      <div v-if="activeTab === 'users'" class="content-section">
        <div class="section-header">
          <h2>User Management</h2>
          <button @click="loadUsers" class="btn-secondary">Refresh</button>
        </div>

        <div v-if="users.length > 0" class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Created</th>
                <th>Last Login</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td><code>{{ user.id.substring(0, 8) }}</code></td>
                <td>{{ user.email }}</td>
                <td>{{ user.username || '-' }}</td>
                <td>
                  <span class="badge" :class="`badge-${user.role || 'student'}`">
                    {{ user.role || 'student' }}
                  </span>
                </td>
                <td>{{ formatDate(user.created) }}</td>
                <td>{{ formatDate(user.updated) }}</td>
                <td>{{ user.verified ? '✓' : '✗' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="empty-state">
          No users found or unable to load user data.
        </div>
      </div>

      <!-- System Info -->
      <div v-if="activeTab === 'system'" class="content-section">
        <div class="section-header">
          <h2>System Information</h2>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <h3>Content Statistics</h3>
            <dl>
              <dt>Total Modules:</dt>
              <dd>{{ systemInfo.totalModules }}</dd>
              <dt>Total Topics:</dt>
              <dd>{{ systemInfo.totalTopics }}</dd>
              <dt>Total Questions:</dt>
              <dd>{{ systemInfo.totalQuestions }}</dd>
              <dt>Total Objectives:</dt>
              <dd>{{ systemInfo.totalObjectives }}</dd>
            </dl>
          </div>

          <div class="info-card">
            <h3>LocalStorage Info</h3>
            <dl>
              <dt>BKT States:</dt>
              <dd>{{ systemInfo.bktStatesCount }}</dd>
              <dt>Read Topics:</dt>
              <dd>{{ systemInfo.readTopicsCount }}</dd>
              <dt>Preferred Software:</dt>
              <dd>{{ systemInfo.preferredSoftware }}</dd>
            </dl>
          </div>

          <div class="info-card">
            <h3>Database Connection</h3>
            <dl>
              <dt>PocketBase URL:</dt>
              <dd><code>{{ pb.baseUrl }}</code></dd>
              <dt>Auth Status:</dt>
              <dd>{{ pb.authStore.isValid ? 'Authenticated ✓' : 'Not authenticated ✗' }}</dd>
              <dt>Current User:</dt>
              <dd>{{ pb.authStore.record?.email || 'None' }}</dd>
            </dl>
          </div>

          <div class="info-card">
            <h3>Quick Actions</h3>
            <button @click="initializeClasses" class="btn-success full-width" :disabled="classesInitializing">
              {{ classesInitializing ? 'Initializing...' : 'Setup Classes Collection' }}
            </button>
            <button @click="clearLocalStorage" class="btn-warning full-width">
              Clear All LocalStorage
            </button>
            <button @click="resetBKTStates" class="btn-warning full-width">
              Reset All BKT States
            </button>
            <button @click="exportSystemConfig" class="btn-primary full-width">
              Export System Config
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { pb } from '../lib/pocketbase'
import { useBKT } from '../composables/useBKT'
import { objectives } from '../data/objectives'
import { questionObjectiveMap, getObjectivesForQuestion } from '../data/questionObjectiveMap'
import { allStatisticsQuestions } from '../data/conceptQuestions'
import { getContentModulesByClass, getAllTopics } from '../data/modules'

const { getAllBKTStates, resetBKT } = useBKT()

// Tab state
const tabs = [
  { id: 'datasets', label: 'Datasets' },
  { id: 'bkt', label: 'BKT Analytics' },
  { id: 'questions', label: 'Questions' },
  { id: 'users', label: 'Users' },
  { id: 'system', label: 'System Info' }
]
const activeTab = ref('datasets')

// Dataset viewer state
const selectedCollection = ref('')
const collectionData = ref([])
const tableColumns = computed(() => {
  if (collectionData.value.length === 0) return []
  return Object.keys(collectionData.value[0])
})

// BKT state
const allBKTStates = ref({})
const migrationStatus = ref('idle') // 'idle', 'migrating', 'complete'
const migrationResult = ref(null)
const bktStats = computed(() => {
  const states = Object.values(allBKTStates.value)
  if (states.length === 0) {
    return {
      totalObjectives: 0,
      averageMastery: 0,
      totalAttempts: 0,
      accuracyRate: 0
    }
  }

  const totalAttempts = states.reduce((sum, s) => sum + s.attempts, 0)
  const totalCorrect = states.reduce((sum, s) => sum + s.correct, 0)
  const avgMastery = states.reduce((sum, s) => sum + s.pL, 0) / states.length

  return {
    totalObjectives: states.length,
    averageMastery: Math.round(avgMastery * 100),
    totalAttempts,
    accuracyRate: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0
  }
})

// Question stats
const questionStats = computed(() => {
  const m1 = allStatisticsQuestions.filter(q => q.moduleId === 'stats-module-1').length
  const m2 = allStatisticsQuestions.filter(q => q.moduleId === 'stats-module-2').length
  const m3 = allStatisticsQuestions.filter(q => q.moduleId === 'stats-module-3').length

  return {
    totalQuestions: allStatisticsQuestions.length,
    module1: m1,
    module2: m2,
    module3: m3
  }
})

const questionsWithMappings = computed(() => {
  return allStatisticsQuestions.map(q => ({
    id: q.id,
    module: q.moduleId,
    objectives: getObjectivesForQuestion(q.id),
    difficulty: q.difficulty || 'medium',
    type: q.type
  }))
})

// Users state
const users = ref([])

// Classes initialization state
const classesInitializing = ref(false)

// System info
const systemInfo = computed(() => {
  const modules = getContentModulesByClass('statistics')
  const topics = getAllTopics()

  let readTopicsCount = 0
  let bktStatesCount = 0
  try {
    const readTopics = localStorage.getItem('readTopics')
    readTopicsCount = readTopics ? JSON.parse(readTopics).length : 0

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('bkt-')) {
        bktStatesCount++
      }
    }
  } catch (err) {
    console.error('Error reading localStorage:', err)
  }

  return {
    totalModules: modules.length,
    totalTopics: topics.length,
    totalQuestions: allStatisticsQuestions.length,
    totalObjectives: objectives.length,
    bktStatesCount,
    readTopicsCount,
    preferredSoftware: localStorage.getItem('preferredSoftware') || 'jamovi'
  }
})

// Functions
async function loadCollectionData() {
  if (!selectedCollection.value) {
    collectionData.value = []
    return
  }

  try {
    const records = await pb.collection(selectedCollection.value).getFullList({
      sort: '-created'
    })
    collectionData.value = records
  } catch (err) {
    console.error(`Error loading ${selectedCollection.value}:`, err)
    collectionData.value = []
    alert(`Failed to load ${selectedCollection.value}: ${err.message}`)
  }
}

function formatCellValue(value) {
  if (value === null || value === undefined) return '-'
  if (typeof value === 'boolean') return value ? '✓' : '✗'
  if (typeof value === 'object') return JSON.stringify(value)
  if (typeof value === 'string' && value.length > 50) {
    return value.substring(0, 47) + '...'
  }
  return value
}

function formatDate(dateString) {
  if (!dateString) return '-'
  try {
    return new Date(dateString).toLocaleString()
  } catch (err) {
    return dateString
  }
}

async function loadBKTData() {
  allBKTStates.value = await getAllBKTStates()
}

/**
 * Migrate BKT data from localStorage to PocketBase
 */
async function migrateBKTToDatabase() {
  if (!pb.authStore.isValid) {
    migrationResult.value = {
      type: 'error',
      message: 'You must be logged in to migrate BKT data.'
    }
    return
  }

  migrationStatus.value = 'migrating'
  migrationResult.value = null

  try {
    // Get all BKT states from localStorage
    const localStates = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('bkt-')) {
        const objectiveId = key.replace('bkt-', '')
        try {
          const data = localStorage.getItem(key)
          if (data) {
            localStates[objectiveId] = JSON.parse(data)
          }
        } catch (err) {
          console.warn(`Failed to parse BKT state for ${objectiveId}:`, err)
        }
      }
    }

    const totalStates = Object.keys(localStates).length

    if (totalStates === 0) {
      migrationResult.value = {
        type: 'info',
        message: 'No BKT data found in localStorage to migrate.'
      }
      migrationStatus.value = 'idle'
      return
    }

    let successCount = 0
    let errorCount = 0
    const userId = pb.authStore.record.id

    // Migrate each state to PocketBase
    for (const [objectiveId, state] of Object.entries(localStates)) {
      try {
        const dbState = {
          user: userId,
          objective_id: objectiveId,
          pL: state.pL,
          pL0: state.pL0,
          pT: state.pT,
          pS: state.pS || 0.1,
          pG: state.pG || 0.25,
          attempts: state.attempts,
          correct: state.correct,
          incorrect: state.incorrect,
          last_updated: state.lastUpdated
        }

        // Check if record already exists
        const filter = `user = "${userId}" && objective_id = "${objectiveId}"`
        const existingRecords = await pb.collection('bkt_states').getList(1, 1, { filter })

        if (existingRecords.items.length > 0) {
          // Update existing record
          await pb.collection('bkt_states').update(existingRecords.items[0].id, dbState)
        } else {
          // Create new record
          await pb.collection('bkt_states').create(dbState)
        }

        successCount++
      } catch (err) {
        console.error(`Failed to migrate BKT state for ${objectiveId}:`, err)
        errorCount++
      }
    }

    migrationStatus.value = 'complete'

    if (errorCount === 0) {
      migrationResult.value = {
        type: 'success',
        message: `Successfully migrated ${successCount} BKT states to database!`,
        details: 'Your BKT data is now stored in PocketBase and will persist across devices.'
      }
    } else {
      migrationResult.value = {
        type: 'warning',
        message: `Migrated ${successCount} of ${totalStates} BKT states.`,
        details: `${errorCount} states failed to migrate. Check console for details.`
      }
    }

    // Refresh BKT data display
    await loadBKTData()
  } catch (err) {
    console.error('Migration error:', err)
    migrationResult.value = {
      type: 'error',
      message: 'Failed to migrate BKT data.',
      details: err.message
    }
    migrationStatus.value = 'idle'
  }
}

async function loadUsers() {
  try {
    const records = await pb.collection('users').getFullList({
      sort: '-created'
    })
    users.value = records
  } catch (err) {
    console.error('Error loading users:', err)
    users.value = []
    alert(`Failed to load users: ${err.message}`)
  }
}

function loadQuestionStats() {
  // Question stats are computed, just trigger a refresh by toggling
  console.log('Question stats refreshed')
}

function refreshData() {
  if (selectedCollection.value) {
    loadCollectionData()
  }
}

function exportCollection() {
  if (collectionData.value.length === 0) return

  const dataStr = JSON.stringify(collectionData.value, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${selectedCollection.value}-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
}

function exportAllData() {
  const allData = {
    bkt: getAllBKTStates(),
    objectives: objectives,
    questionMappings: questionObjectiveMap,
    questions: allStatisticsQuestions,
    localStorage: {
      preferredSoftware: localStorage.getItem('preferredSoftware'),
      readTopics: localStorage.getItem('readTopics')
    },
    exportedAt: new Date().toISOString()
  }

  const dataStr = JSON.stringify(allData, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `admin-export-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
}

function exportSystemConfig() {
  const config = {
    modules: getContentModulesByClass('statistics'),
    topics: getAllTopics(),
    objectives: objectives,
    systemInfo: systemInfo.value,
    exportedAt: new Date().toISOString()
  }

  const dataStr = JSON.stringify(config, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `system-config-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
}

async function initializeClasses() {
  const INITIAL_CLASSES = [
    {
      name: 'Research Methods',
      short_name: 'RM',
      slug: 'research-methods',
      description: 'Introduction to research methodology in psychology, including experimental design, measurement, and ethics.',
      color: '#3b82f6',
      icon: '🔬',
      topics: ['sampling', 'hypothesis-testing', 'correlation'],
      order: 1,
      is_active: true
    },
    {
      name: 'Statistics',
      short_name: 'Stats',
      slug: 'statistics',
      description: 'Core statistical concepts and analysis techniques for psychological research.',
      color: '#8b5cf6',
      icon: '📊',
      topics: ['descriptive-stats', 'visualizations', 'normal-distribution', 'z-scores', 't-tests', 'correlation', 'regression'],
      order: 2,
      is_active: true
    },
    {
      name: 'Statistics for Assessment',
      short_name: 'S4A',
      slug: 'stats-assessment',
      description: 'Statistical methods for psychological assessment and testing, including reliability and validity.',
      color: '#10b981',
      icon: '📋',
      topics: ['descriptive-stats', 'normal-distribution', 'z-scores', 'correlation'],
      order: 3,
      is_active: true
    },
    {
      name: 'Intro to Research',
      short_name: 'Intro',
      slug: 'intro-research',
      description: 'Foundational concepts in psychological research and scientific inquiry.',
      color: '#f59e0b',
      icon: '📚',
      topics: ['descriptive-stats', 'visualizations', 'probability'],
      order: 4,
      is_active: true
    }
  ]

  if (!confirm('This will create the classes collection and add 4 default classes. Continue?')) {
    return
  }

  classesInitializing.value = true

  let successCount = 0
  let existsCount = 0
  let errorCount = 0

  for (const classData of INITIAL_CLASSES) {
    try {
      await pb.collection('classes').create(classData)
      successCount++
      console.log(`✓ Created class: ${classData.name}`)
    } catch (err) {
      if (err.status === 400 && err.data?.data?.slug) {
        existsCount++
        console.log(`⚠ Class already exists: ${classData.name}`)
      } else {
        errorCount++
        console.error(`✗ Failed to create class ${classData.name}:`, err.message, err)
      }
    }
  }

  classesInitializing.value = false

  let message = `Classes initialization complete!\n\n`
  if (successCount > 0) message += `✓ Created: ${successCount}\n`
  if (existsCount > 0) message += `⚠ Already existed: ${existsCount}\n`
  if (errorCount > 0) message += `✗ Errors: ${errorCount}\n`

  alert(message)

  // Refresh the dataset if classes collection is selected
  if (selectedCollection.value === 'classes') {
    await loadCollectionData()
  }
}

function clearLocalStorage() {
  if (confirm('Are you sure you want to clear ALL localStorage? This will remove BKT states, preferences, and read topics.')) {
    localStorage.clear()
    alert('LocalStorage cleared!')
    loadBKTData()
  }
}

function resetBKTStates() {
  if (confirm('Are you sure you want to reset ALL BKT states? This cannot be undone.')) {
    const states = getAllBKTStates()
    Object.keys(states).forEach(objectiveId => {
      resetBKT(objectiveId)
    })
    alert('All BKT states reset!')
    loadBKTData()
  }
}

onMounted(() => {
  loadBKTData()
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.page-header p {
  margin: 0;
  color: var(--text-secondary);
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.tab-navigation {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--border);
  overflow-x: auto;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-button:hover {
  color: var(--text-primary);
  background: var(--bg-card);
}

.tab-button.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.content-section {
  background: var(--bg-card);
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  color: var(--text-primary);
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.dataset-selector {
  margin-bottom: 1.5rem;
}

.dataset-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.dataset-selector select {
  width: 100%;
  max-width: 400px;
  padding: 0.625rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: var(--bg-main);
  color: var(--text-primary);
  font-size: 0.875rem;
}

.table-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--bg-main);
  border-radius: 0.375rem;
}

.data-table-container {
  margin-top: 1.5rem;
}

.table-scroll {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table th {
  background: var(--bg-main);
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 2px solid var(--border);
  white-space: nowrap;
}

.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
}

.data-table tbody tr:hover {
  background: var(--bg-main);
}

.data-table code {
  background: var(--bg-main);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.8em;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-main);
  border-radius: 0.375rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-main);
  padding: 1.5rem;
  border-radius: 0.5rem;
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

.bkt-data-table {
  margin-top: 2rem;
}

.bkt-data-table h3 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.note {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-style: italic;
}

.question-objectives-map {
  margin-top: 2rem;
}

.question-objectives-map h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-easy {
  background: #d1fae5;
  color: #065f46;
}

.badge-medium {
  background: #fef3c7;
  color: #92400e;
}

.badge-hard {
  background: #fee2e2;
  color: #991b1b;
}

.badge-student {
  background: #dbeafe;
  color: #1e40af;
}

.badge-instructor {
  background: #e0e7ff;
  color: #3730a3;
}

.badge-admin {
  background: #fce7f3;
  color: #831843;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: var(--bg-main);
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.info-card h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1rem;
}

.info-card dl {
  margin: 0;
}

.info-card dt {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.info-card dd {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-weight: 500;
}

.info-card dd code {
  background: var(--bg-card);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8em;
}

.btn-primary, .btn-secondary, .btn-warning, .btn-success, .btn-sm {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.btn-success:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  text-decoration: none;
  display: inline-block;
}

.btn-secondary:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background: #d97706;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  background: var(--primary);
  color: white;
}

.full-width {
  width: 100%;
  margin-bottom: 0.75rem;
}

.full-width:last-child {
  margin-bottom: 0;
}

/* Alert styles */
.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid;
}

.alert strong {
  display: block;
  margin-bottom: 0.5rem;
}

.alert p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
}

.alert.success {
  background: #d1fae5;
  border-color: #10b981;
  color: #065f46;
}

.alert.error {
  background: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}

.alert.warning {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #92400e;
}

.alert.info {
  background: #dbeafe;
  border-color: #3b82f6;
  color: #1e40af;
}

.alert .btn-sm {
  margin-top: 0.5rem;
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
