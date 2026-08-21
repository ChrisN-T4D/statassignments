<template>
  <div class="content-section">
    <h2>Add one student</h2>
    <p class="section-description">
      Enter an email to generate a student key for the selected semester. The key also appears in Download Student Keys CSV.
    </p>

    <div class="add-one-fields">
      <div class="form-group">
        <label for="add-one-class">Class</label>
        <select id="add-one-class" v-model="classId">
          <option value="">Select a class</option>
          <option v-for="cls in classes" :key="cls.id" :value="cls.id">
            {{ cls.name || cls.short_name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="add-one-email">Email</label>
        <input id="add-one-email" v-model="email" type="email" autocomplete="off" />
      </div>
    </div>

    <button
      class="btn-primary"
      :disabled="loading || !classId || !email.trim()"
      @click="generateKey"
    >
      {{ loading ? 'Working...' : 'Generate key' }}
    </button>

    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="matches.length > 0" class="detection-block">
      <ul class="match-list">
        <li v-for="match in matches" :key="match.id">
          Detected on roster ({{ detectionSemester(match) }}, {{ detectionClass(match) }})
        </li>
      </ul>
      <div class="preview-actions">
        <button class="btn-secondary" type="button" @click="showExistingKeys">
          Show existing key
        </button>
        <button class="btn-primary" type="button" :disabled="loading || !classId" @click="createNewKey">
          Create new key
        </button>
      </div>
    </div>

    <div v-if="revealedKeys.length > 0" class="key-result">
      <h3>Existing key</h3>
      <div v-for="key in revealedKeys" :key="key" class="key-row">
        <code>{{ key }}</code>
        <button class="btn-secondary" type="button" @click="copyKey(key)">
          {{ copiedKey === key ? 'Copied' : 'Copy' }}
        </button>
      </div>
    </div>

    <div v-if="createdEntry" class="key-result">
      <h3>New key</h3>
      <p>{{ createdEntry.bb_username }}</p>
      <div class="key-row">
        <code>{{ createdEntry.student_key }}</code>
        <button class="btn-secondary" type="button" @click="copyKey(createdEntry.student_key)">
          {{ copiedKey === createdEntry.student_key ? 'Copied' : 'Copy' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAddOneStudent } from '../composables/useAddOneStudent'
import { isValidRosterEmail } from '../utils/rosterEmail'

const props = defineProps({
  semesterId: { type: String, required: true },
  semesterCode: { type: String, required: true }
})

const emit = defineEmits(['roster-updated'])

const { loading, fetchClasses, findRosterByEmail, createOneRosterEntry } = useAddOneStudent()

const classes = ref([])
const classId = ref('')
const email = ref('')
const error = ref('')
const matches = ref([])
const createdEntry = ref(null)
const revealedKeys = ref([])
const copiedKey = ref('')

onMounted(async () => {
  classes.value = await fetchClasses()
})

function detectionSemester(row) {
  return row.expand?.semester?.name || row.expand?.semester?.code || 'Unknown semester'
}

function detectionClass(row) {
  return row.expand?.class?.short_name || row.expand?.class?.name || 'Unassigned'
}

async function generateKey() {
  error.value = ''
  createdEntry.value = null
  revealedKeys.value = []
  matches.value = []

  if (!isValidRosterEmail(email.value)) {
    error.value = 'Enter a valid email.'
    return
  }

  const found = await findRosterByEmail(email.value)
  if (found.length > 0) {
    matches.value = found
    return
  }

  await createAndShow()
}

function showExistingKeys() {
  revealedKeys.value = matches.value.map(m => m.student_key).filter(Boolean)
}

async function createNewKey() {
  error.value = ''
  await createAndShow()
}

async function createAndShow() {
  try {
    createdEntry.value = await createOneRosterEntry({
      semesterId: props.semesterId,
      semesterCode: props.semesterCode,
      classId: classId.value,
      email: email.value
    })
    emit('roster-updated')
  } catch (err) {
    error.value = err.message || 'Could not create roster entry.'
  }
}

async function copyKey(text) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = text
  } catch {
    error.value = 'Could not copy the key.'
  }
}
</script>

<style scoped>
.section-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.add-one-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 640px;
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

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
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

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.detection-block {
  margin-top: 1.5rem;
}

.match-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.match-list li {
  margin: 0.35rem 0;
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.key-result {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--bg-main);
  border-radius: 0.75rem;
}

.key-result h3 {
  margin-bottom: 0.75rem;
}

.key-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.key-row code {
  background: var(--bg-card);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
}
</style>
