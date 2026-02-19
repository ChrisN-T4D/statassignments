import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'

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
  const { user } = useAuth()

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

  // Only classes the user is assigned to (or all for admins / when not authenticated)
  const assignedClasses = computed(() => {
    const active = activeClasses.value
    const u = user.value
    if (!u) return active
    if (u.role === 'admin') return active
    const ids = u.classes
    if (!ids || !Array.isArray(ids) || ids.length === 0) return []
    return active.filter(c => ids.includes(c.id))
  })

  const classTopics = computed(() => {
    return selectedClass.value?.topics || []
  })

  // Fetch classes from PocketBase (or use fallback)
  async function fetchClasses() {
    if (initialized.value) return classes.value

    loading.value = true
    console.log('[useClasses] Fetching classes from PocketBase...')
    try {
      const records = await pb.collection('classes').getFullList({
        filter: 'is_active = true',
        sort: 'order'
      })
      console.log('[useClasses] Fetched', records.length, 'classes:', records)
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
      console.log('[useClasses] Using', FALLBACK_CLASSES.length, 'fallback classes')
      classes.value = FALLBACK_CLASSES
      initialized.value = true

      // Validate stored class against fallback
      if (selectedClassId.value && !FALLBACK_CLASSES.find(c => c.id === selectedClassId.value)) {
        selectedClassId.value = FALLBACK_CLASSES[0]?.id || null
      }

      return FALLBACK_CLASSES
    } finally {
      loading.value = false
      console.log('[useClasses] Final classes array:', classes.value)
    }
  }

  // Get a single class by ID
  async function getClassById(classId) {
    if (!initialized.value) {
      await fetchClasses()
    }
    return classes.value.find(c => c.id === classId) || null
  }

  // Get a single class by slug
  async function getClassBySlug(slug) {
    if (!initialized.value) {
      await fetchClasses()
    }
    return classes.value.find(c => c.slug === slug) || null
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

  // Sync selection with route params (supports both ID and slug)
  async function syncWithRoute() {
    if (!route) return
    const urlClassId = route.params.classId
    if (urlClassId && urlClassId !== selectedClassId.value) {
      // Try to find by slug first, then by ID
      let cls = classes.value.find(c => c.slug === urlClassId)
      if (!cls) {
        cls = classes.value.find(c => c.id === urlClassId)
      }
      if (cls?.is_active) {
        selectedClassId.value = cls.id
      }
    }
  }

  // Navigate to a class (uses slug if available, falls back to ID)
  function navigateToClass(classIdOrSlug) {
    const cls = classes.value.find(c => c.slug === classIdOrSlug || c.id === classIdOrSlug)
    if (cls) {
      selectClass(cls.id)
      if (router) {
        // Use slug for URL if available
        const urlParam = cls.slug || cls.id
        router.push({ name: 'class-home', params: { classId: urlParam } })
      }
    }
  }

  // When assigned list shrinks, clear selection if current class is no longer in list
  watch(assignedClasses, (assigned) => {
    if (selectedClassId.value && !assigned.some(c => c.id === selectedClassId.value)) {
      selectedClassId.value = assigned.length > 0 ? assigned[0].id : null
    }
  }, { immediate: true })

  return {
    classes: assignedClasses,
    allClasses: classes,
    activeClasses,
    selectedClassId,
    selectedClass,
    classTopics,
    loading,
    initialized,
    fetchClasses,
    getClassById,
    getClassBySlug,
    selectClass,
    clearSelection,
    syncWithRoute,
    navigateToClass
  }
}
