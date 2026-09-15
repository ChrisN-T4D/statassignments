import { ref, watch, computed } from 'vue'
import { useAuth } from './useAuth.js'
import { emptyCapstoneProject } from '../data/capstoneWorksheetSchemas.js'
import { migrateStudyFocusToLitReviewOutline } from '../data/capstoneLitReviewOutlineWorksheet.js'

const STORAGE_PREFIX = 'study-plan-capstone'
const SAVE_DEBOUNCE_MS = 600

/** @type {import('vue').Ref<Record<string, object>>} */
const projectsByKey = ref({})
const loadedKeys = new Set()
let saveTimer = null

function storageKey (classId, userId) {
  const uid = userId || 'guest'
  return `${STORAGE_PREFIX}:${classId}:${uid}`
}

function loadFromStorage (key) {
  if (loadedKeys.has(key)) return
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw)
      projectsByKey.value[key] = migrateStudyFocusToLitReviewOutline({
        ...emptyCapstoneProject(),
        ...parsed
      })
    }
  } catch (err) {
    console.warn('Unable to load study plan draft:', err)
  }
  if (!projectsByKey.value[key]) {
    projectsByKey.value[key] = migrateStudyFocusToLitReviewOutline(emptyCapstoneProject())
  } else {
    projectsByKey.value[key] = migrateStudyFocusToLitReviewOutline(projectsByKey.value[key])
  }
  loadedKeys.add(key)
}

function saveToStorage (key, project) {
  try {
    localStorage.setItem(key, JSON.stringify({
      ...project,
      lastSavedAt: new Date().toISOString()
    }))
  } catch (err) {
    console.warn('Unable to save study plan draft:', err)
  }
}

export function useCapstoneProject (classId) {
  const { user } = useAuth()
  const key = computed(() => storageKey(classId, user.value?.id ?? null))

  watch(
    key,
    (k) => loadFromStorage(k),
    { immediate: true }
  )

  const project = computed(() => {
    const k = key.value
    if (!projectsByKey.value[k]) {
      projectsByKey.value[k] = emptyCapstoneProject()
    }
    return projectsByKey.value[k]
  })

  const lastSavedAt = computed(() => project.value.lastSavedAt ?? null)
  const isGuestDraft = computed(() => !user.value?.id)

  function updateProject (patch) {
    const k = key.value
    projectsByKey.value[k] = {
      ...project.value,
      ...patch,
      lastSavedAt: new Date().toISOString()
    }
  }

  function resetProject () {
    const k = key.value
    projectsByKey.value[k] = emptyCapstoneProject()
    saveToStorage(k, projectsByKey.value[k])
  }

  watch(
    () => projectsByKey.value[key.value],
    (val) => {
      if (!val) return
      if (saveTimer) clearTimeout(saveTimer)
      saveTimer = setTimeout(() => saveToStorage(key.value, val), SAVE_DEBOUNCE_MS)
    },
    { deep: true }
  )

  return {
    project,
    updateProject,
    resetProject,
    lastSavedAt,
    isGuestDraft
  }
}
