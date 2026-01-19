import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pb } from '../lib/pocketbase'

// Static fallback data for development when PocketBase collection doesn't exist yet
const FALLBACK_CLASSES = [
  {
    id: 'research-methods',
    name: 'Research Methods',
    short_name: 'RM',
    description: 'Introduction to research methodology in psychology, including experimental design, measurement, and ethics.',
    color: '#3b82f6',
    icon: '🔬',
    topics: ['sampling', 'hypothesis-testing', 'correlation'],
    order: 1,
    is_active: true
  },
  {
    id: 'statistics',
    name: 'Statistics',
    short_name: 'Stats',
    description: 'Core statistical concepts and analysis techniques for psychological research.',
    color: '#8b5cf6',
    icon: '📊',
    topics: ['descriptive-stats', 'visualizations', 'normal-distribution', 'z-scores', 't-tests', 'correlation', 'regression'],
    order: 2,
    is_active: true
  },
  {
    id: 'stats-assessment',
    name: 'Statistics for Assessment',
    short_name: 'S4A',
    description: 'Statistical methods for psychological assessment and testing, including reliability and validity.',
    color: '#10b981',
    icon: '📋',
    topics: ['descriptive-stats', 'normal-distribution', 'z-scores', 'correlation'],
    order: 3,
    is_active: true
  },
  {
    id: 'intro-research',
    name: 'Intro to Research',
    short_name: 'Intro',
    description: 'Foundational concepts in psychological research and scientific inquiry.',
    color: '#f59e0b',
    icon: '📚',
    topics: ['descriptive-stats', 'visualizations', 'probability'],
    order: 4,
    is_active: true
  }
]

// localStorage helpers
const STORAGE_KEY = 'selectedClassId'

function getStoredClassId() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY) || null
}

function storeClassId(id) {
  if (id) {
    localStorage.setItem(STORAGE_KEY, id)
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

// Global state
const classes = ref([])
const loading = ref(false)
const initialized = ref(false)
const selectedClassId = ref(getStoredClassId())

// Persist selection
watch(selectedClassId, (newId) => {
  storeClassId(newId)
})

export function useClasses() {
  // Router/route are optional - only used for navigation functions
  // Use try-catch because these can fail if called outside component setup
  let router = null
  let route = null
  try {
    router = useRouter()
    route = useRoute()
  } catch {
    // Not in a component context - navigation functions won't work
  }

  const selectedClass = computed(() => {
    if (!selectedClassId.value) return null
    return classes.value.find(c => c.id === selectedClassId.value) || null
  })

  const activeClasses = computed(() => {
    return classes.value.filter(c => c.is_active)
  })

  const classTopics = computed(() => {
    return selectedClass.value?.topics || []
  })

  // Fetch classes from PocketBase (or use fallback)
  async function fetchClasses() {
    if (initialized.value) return classes.value

    loading.value = true
    try {
      const records = await pb.collection('classes').getFullList({
        filter: 'is_active = true',
        sort: 'order'
      })
      classes.value = records
      initialized.value = true

      // If stored class doesn't exist in fetched data, clear it
      if (selectedClassId.value && !records.find(c => c.id === selectedClassId.value)) {
        selectedClassId.value = records.length > 0 ? records[0].id : null
      }

      return records
    } catch (err) {
      // Collection might not exist yet - use fallback
      console.warn('Could not fetch classes from PocketBase, using fallback data:', err.message)
      classes.value = FALLBACK_CLASSES
      initialized.value = true

      // Validate stored class against fallback
      if (selectedClassId.value && !FALLBACK_CLASSES.find(c => c.id === selectedClassId.value)) {
        selectedClassId.value = FALLBACK_CLASSES[0]?.id || null
      }

      return FALLBACK_CLASSES
    } finally {
      loading.value = false
    }
  }

  // Get a single class by ID
  async function getClassById(classId) {
    if (!initialized.value) {
      await fetchClasses()
    }
    return classes.value.find(c => c.id === classId) || null
  }

  // Select a class
  function selectClass(classId) {
    const cls = classes.value.find(c => c.id === classId)
    if (cls?.is_active) {
      selectedClassId.value = classId
    }
  }

  // Clear selection
  function clearSelection() {
    selectedClassId.value = null
  }

  // Sync selection with route params
  function syncWithRoute() {
    if (!route) return
    const urlClassId = route.params.classId
    if (urlClassId && urlClassId !== selectedClassId.value) {
      const cls = classes.value.find(c => c.id === urlClassId)
      if (cls?.is_active) {
        selectedClassId.value = urlClassId
      }
    }
  }

  // Navigate to a class
  function navigateToClass(classId) {
    selectClass(classId)
    if (router) {
      router.push({ name: 'class-home', params: { classId } })
    }
  }

  return {
    classes: activeClasses,
    allClasses: classes,
    selectedClassId,
    selectedClass,
    classTopics,
    loading,
    initialized,
    fetchClasses,
    getClassById,
    selectClass,
    clearSelection,
    syncWithRoute,
    navigateToClass
  }
}
