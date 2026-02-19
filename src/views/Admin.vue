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
          <div class="header-actions">
            <button type="button" class="btn-primary" @click="openAddUserModal">Add user</button>
            <button @click="loadUsers" class="btn-secondary">Refresh</button>
          </div>
        </div>

        <div v-if="users.length > 0" class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Classes</th>
                <th>Created</th>
                <th>Last Login</th>
                <th>Verified</th>
                <th>Actions</th>
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
                <td class="classes-cell">
                  {{ userClassNames(user) || '—' }}
                </td>
                <td>{{ formatDate(user.created) }}</td>
                <td>{{ formatDate(user.updated) }}</td>
                <td>{{ user.verified ? '✓' : '✗' }}</td>
                <td>
                  <button type="button" class="btn-sm btn-secondary" @click="openAssignClasses(user)">
                    {{ user.classes?.length ? 'Edit classes' : 'Assign classes' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="empty-state">
          No users found or unable to load user data.
        </div>
      </div>

      <!-- Modal: Assign classes to user -->
      <div v-if="editingUser" class="modal-overlay" @click.self="editingUser = null">
        <div class="modal assign-classes-modal">
          <h3>Assign classes: {{ editingUser.email }}</h3>
          <p class="modal-hint">Select the classes this user can access on the home page. Admins see all classes regardless.</p>
          <div class="classes-checkbox-list">
            <label v-for="cls in adminClasses" :key="cls.id" class="checkbox-row">
              <input type="checkbox" :value="cls.id" v-model="selectedClassIdsForEdit" />
              <span>{{ cls.name }}</span>
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="editingUser = null">Cancel</button>
            <button type="button" class="btn-primary" @click="saveUserClasses" :disabled="savingUserClasses">
              {{ savingUserClasses ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Modal: Add user(s) with dummy credentials -->
      <div v-if="showAddUserModal" class="modal-overlay" @click.self="closeAddUserModal">
        <div class="modal add-user-modal" :class="{ 'modal-wide': createdCredentials.length > 0 }">
          <h3>{{ createdCredentials.length > 0 ? 'Credentials created' : 'Add users' }}</h3>

          <!-- Step 1: Form -->
          <template v-if="createdCredentials.length === 0">
            <p class="modal-hint">Create placeholder users with temporary login credentials. Send each student their email and password; they sign in and can then set their own email and password in Profile.</p>
            <form @submit.prevent="createUsers" class="add-user-form">
              <div class="form-group">
                <label for="new-user-count">Number of users to create</label>
                <input id="new-user-count" v-model.number="newUserCount" type="number" min="1" max="100" />
                <p class="field-hint">Create multiple users at once for a class (e.g. 25). Each gets a unique temporary email and password.</p>
              </div>
              <div class="form-group">
                <label>Role</label>
                <select v-model="newUserRole">
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div class="form-group">
                <label>Classes</label>
                <p class="field-hint">Select classes these users can access. Admins see all classes.</p>
                <div class="classes-checkbox-list">
                  <label v-for="cls in adminClasses" :key="cls.id" class="checkbox-row">
                    <input type="checkbox" :value="cls.id" v-model="newUserClassIds" />
                    <span>{{ cls.name }}</span>
                  </label>
                </div>
              </div>
              <p v-if="addUserError" class="form-error">{{ addUserError }}</p>
              <div class="modal-actions">
                <button type="button" class="btn-secondary" @click="closeAddUserModal">Cancel</button>
                <button type="submit" class="btn-primary" :disabled="savingNewUser">
                  {{ savingNewUser ? 'Creating...' : 'Create user' + (newUserCount > 1 ? 's' : '') }}
                </button>
              </div>
            </form>
          </template>

          <!-- Step 2: Show credentials to copy/send -->
          <template v-else>
            <p class="modal-hint">Send each student their temporary email and password. They sign in, then go to Profile to set their own email and password.</p>
            <div class="credentials-actions">
              <button type="button" class="btn-secondary btn-sm" @click="copyAllCredentials">Copy all</button>
              <button type="button" class="btn-secondary btn-sm" @click="downloadCredentialsCsv">Download CSV</button>
            </div>
            <div class="credentials-list">
              <table class="credentials-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email (temporary)</th>
                    <th>Password (temporary)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cred, i) in createdCredentials" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td><code>{{ cred.email }}</code></td>
                    <td><code>{{ cred.password }}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-secondary" @click="closeAddUserModal">Close</button>
              <button type="button" class="btn-primary" @click="createdCredentials = []; addUserError = ''">Create more</button>
            </div>
          </template>
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
import { ref, computed, watch, onMounted } from 'vue'
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
const adminClasses = ref([])
const editingUser = ref(null)
const selectedClassIdsForEdit = ref([])
const savingUserClasses = ref(false)

// Add user modal state
const showAddUserModal = ref(false)
const newUserCount = ref(1)
const newUserRole = ref('student')
const newUserClassIds = ref([])
const savingNewUser = ref(false)
const addUserError = ref('')
const createdCredentials = ref([])

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

async function loadAdminClasses() {
  try {
    const records = await pb.collection('classes').getFullList({
      filter: 'is_active = true',
      sort: 'order'
    })
    adminClasses.value = records
  } catch (err) {
    console.error('Error loading classes for admin:', err)
    adminClasses.value = []
  }
}

async function loadUsers() {
  try {
    const records = await pb.collection('users').getFullList({
      sort: '-created',
      expand: 'classes'
    })
    users.value = records
    if (adminClasses.value.length === 0) {
      await loadAdminClasses()
    }
  } catch (err) {
    console.error('Error loading users:', err)
    users.value = []
    alert(`Failed to load users: ${err.message}`)
  }
}

function userClassNames(user) {
  const expanded = user.expand?.classes
  if (expanded && Array.isArray(expanded) && expanded.length > 0) {
    return expanded.map(c => c.name).join(', ')
  }
  const ids = user.classes
  if (ids && Array.isArray(ids) && ids.length > 0 && adminClasses.value.length > 0) {
    return ids.map(id => adminClasses.value.find(c => c.id === id)?.name || id).filter(Boolean).join(', ') || '—'
  }
  return null
}

function openAssignClasses(user) {
  editingUser.value = user
  selectedClassIdsForEdit.value = Array.isArray(user.classes) ? [...user.classes] : []
  if (adminClasses.value.length === 0) loadAdminClasses()
}

async function saveUserClasses() {
  if (!editingUser.value) return
  savingUserClasses.value = true
  try {
    await pb.collection('users').update(editingUser.value.id, {
      classes: selectedClassIdsForEdit.value
    })
    await loadUsers()
    editingUser.value = null
  } catch (err) {
    console.error('Error saving user classes:', err)
    alert(`Failed to save: ${err.message}`)
  } finally {
    savingUserClasses.value = false
  }
}

function openAddUserModal() {
  showAddUserModal.value = true
  newUserCount.value = 1
  newUserRole.value = 'student'
  newUserClassIds.value = []
  addUserError.value = ''
  createdCredentials.value = []
  if (adminClasses.value.length === 0) loadAdminClasses()
}

function closeAddUserModal() {
  showAddUserModal.value = false
  addUserError.value = ''
  createdCredentials.value = []
}

function generateRandomString(length, chars = 'abcdefghjkmnpqrstuvwxyz23456789') {
  let s = ''
  for (let i = 0; i < length; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return s
}

function generateDummyCredentials() {
  const id = generateRandomString(8) + '-' + Date.now().toString(36)
  const email = `temp-${id}@placeholder.local`
  const password = generateRandomString(12)
  return { email, password }
}

async function createUsers() {
  addUserError.value = ''
  const count = Math.min(100, Math.max(1, Number(newUserCount.value) || 1))
  newUserCount.value = count

  const classCount = newUserClassIds.value.length
  const confirmMessage = count === 1
    ? 'Create 1 user with a temporary email and password? You will get the credentials to send to the student.'
    : `Create ${count} users with temporary credentials? Each will get a unique email and password. You will get a list to copy or download and send to students.`
  if (!window.confirm(confirmMessage)) return

  savingNewUser.value = true
  const credentials = []
  try {
    for (let i = 0; i < count; i++) {
      const { email, password } = generateDummyCredentials()
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        role: newUserRole.value,
        classes: newUserClassIds.value
      })
      credentials.push({ email, password })
    }
    createdCredentials.value = credentials
    await loadUsers()
    window.alert(count === 1 ? '1 user created. Send the credentials below to the student.' : `${count} users created. Copy or download the credentials below to send to students.`)
  } catch (err) {
    console.error('Error creating user(s):', err)
    addUserError.value = err.data?.data?.email?.message || err.data?.data?.password?.message || err.message || 'Failed to create user(s).'
  } finally {
    savingNewUser.value = false
  }
}

function copyAllCredentials() {
  const text = createdCredentials.value
    .map((c, i) => `${i + 1}. Email: ${c.email}  Password: ${c.password}`)
    .join('\n')
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard.')
  }).catch(() => {
    alert('Could not copy. Use Download CSV instead.')
  })
}

function downloadCredentialsCsv() {
  const header = 'Number,Email (temporary),Password (temporary)\n'
  const rows = createdCredentials.value
    .map((c, i) => `${i + 1},${c.email},${c.password}`)
    .join('\n')
  const blob = new Blob([header + rows], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `user-credentials-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
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

watch(activeTab, (tab) => {
  if (tab === 'users') {
    loadUsers()
  }
})

onMounted(() => {
  loadBKTData()
  if (activeTab.value === 'users') loadUsers()
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

.classes-cell {
  max-width: 200px;
  font-size: 0.8125rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.assign-classes-modal {
  background: var(--bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 420px;
  width: 100%;
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.assign-classes-modal h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.modal-hint {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.classes-checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  max-height: 280px;
  overflow-y: auto;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.checkbox-row:hover {
  background: var(--bg-main);
}

.checkbox-row input {
  margin: 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.add-user-modal {
  max-width: 440px;
  background: var(--bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 100%;
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.add-user-modal h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.add-user-form .form-group {
  margin-bottom: 1rem;
}

.add-user-form .form-group:last-of-type {
  margin-bottom: 1.25rem;
}

.add-user-form label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.add-user-form .required {
  color: var(--danger, #dc2626);
}

.add-user-form input[type="email"],
.add-user-form input[type="password"],
.add-user-form input[type="text"],
.add-user-form input[type="number"],
.add-user-form select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: var(--bg-main);
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.add-user-modal.modal-wide {
  max-width: 560px;
}

.credentials-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.credentials-list {
  max-height: 320px;
  overflow: auto;
  margin-bottom: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
}

.credentials-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.credentials-table th,
.credentials-table td {
  padding: 0.5rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.credentials-table th {
  background: var(--bg-main);
  font-weight: 600;
  color: var(--text-primary);
}

.credentials-table code {
  font-size: 0.75rem;
  word-break: break-all;
}

.add-user-form .field-hint {
  margin: 0 0 0.5rem 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.add-user-form .form-error {
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
  color: var(--danger, #dc2626);
}

.add-user-form .classes-checkbox-list {
  max-height: 200px;
  margin-bottom: 0;
}

.content-section .header-actions {
  display: flex;
  gap: 0.75rem;
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
