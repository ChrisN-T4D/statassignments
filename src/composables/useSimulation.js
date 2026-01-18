import { ref, computed } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'
import { useProfile } from './useProfile'

export function useSimulation() {
  const { user } = useAuth()
  const { profile } = useProfile()

  const currentExercise = ref(null)
  const attemptCount = ref(0)
  const isCorrect = ref(false)
  const loading = ref(false)
  const hintUsed = ref(false)
  const startTime = ref(null)

  // Track mastery state
  const exerciseHistory = ref([]) // Track recent attempts for this exercise

  const isMastered = computed(() => isCorrect.value)

  // Fetch a simulation exercise by ID or get next in sequence
  async function fetchExercise(exerciseId) {
    loading.value = true
    try {
      const record = await pb.collection('simulation_exercises').getOne(exerciseId, {
        expand: 'module,topic'
      })

      currentExercise.value = parseExercise(record)
      attemptCount.value = 0
      isCorrect.value = false
      hintUsed.value = false
      startTime.value = Date.now()
      exerciseHistory.value = []

      return currentExercise.value
    } catch (err) {
      console.error('Error fetching exercise:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Fetch exercises for a topic and software type
  async function fetchExercises(topicId, softwareType = null) {
    loading.value = true
    try {
      const filters = [`topic = "${topicId}"`]
      if (softwareType) {
        filters.push(`software_type = "${softwareType}"`)
      }

      const records = await pb.collection('simulation_exercises').getFullList({
        filter: filters.join(' && '),
        sort: 'order,created'
      })

      return records.map(parseExercise)
    } catch (err) {
      console.error('Error fetching exercises:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // Parse exercise data from database format
  function parseExercise(record) {
    return {
      ...record,
      // Parse JSON fields if stored as strings
      expectedSelections: parseJSON(record.expected_selections),
      expectedCode: parseJSON(record.expected_code),
      sampleData: parseJSON(record.sample_data),
      highlightPath: parseJSON(record.highlight_path),
      variables: parseJSON(record.variables)
    }
  }

  function parseJSON(value) {
    if (!value) return null
    if (typeof value === 'string') {
      try {
        return JSON.parse(value)
      } catch {
        return null
      }
    }
    return value
  }

  // Record an attempt (for mastery tracking)
  async function recordAttempt(correct, response = null) {
    attemptCount.value++
    exerciseHistory.value.push({
      attempt: attemptCount.value,
      correct,
      timestamp: Date.now()
    })

    if (correct) {
      isCorrect.value = true
    }

    // Save to database if user is authenticated
    if (user.value && profile.value && currentExercise.value) {
      const timeSpent = startTime.value
        ? Math.round((Date.now() - startTime.value) / 1000)
        : null

      try {
        await pb.collection('simulation_attempts').create({
          profile: profile.value.id,
          exercise: currentExercise.value.id,
          software_type: currentExercise.value.software_type,
          is_correct: correct,
          attempt_no: attemptCount.value,
          hint_used: hintUsed.value,
          time_spent_seconds: timeSpent,
          response: typeof response === 'object' ? JSON.stringify(response) : response
        })
      } catch (err) {
        console.error('Error recording attempt:', err)
      }
    }

    return {
      attemptCount: attemptCount.value,
      isCorrect: correct,
      isMastered: correct
    }
  }

  // Mark that hint was used (affects scoring/tracking)
  function useHint() {
    hintUsed.value = true
  }

  // Reset for a new exercise
  function resetExercise() {
    attemptCount.value = 0
    isCorrect.value = false
    hintUsed.value = false
    startTime.value = Date.now()
    exerciseHistory.value = []
  }

  // Get user's progress on simulation exercises
  async function getSimulationProgress(topicId = null, softwareType = null) {
    if (!profile.value) {
      return { completed: 0, total: 0, exercises: [] }
    }

    try {
      // Get all exercises
      const exerciseFilters = []
      if (topicId) exerciseFilters.push(`topic = "${topicId}"`)
      if (softwareType) exerciseFilters.push(`software_type = "${softwareType}"`)

      const exercises = await pb.collection('simulation_exercises').getFullList({
        filter: exerciseFilters.length > 0 ? exerciseFilters.join(' && ') : undefined,
        sort: 'order'
      })

      // Get user's correct attempts
      const attemptFilters = [`profile = "${profile.value.id}"`, `is_correct = true`]
      const attempts = await pb.collection('simulation_attempts').getFullList({
        filter: attemptFilters.join(' && ')
      })

      const completedIds = new Set(attempts.map(a => a.exercise))

      const exercisesWithStatus = exercises.map((ex, index) => ({
        ...ex,
        isCompleted: completedIds.has(ex.id),
        isUnlocked: index === 0 || completedIds.has(exercises[index - 1]?.id),
        isCurrent: (index === 0 || completedIds.has(exercises[index - 1]?.id)) && !completedIds.has(ex.id)
      }))

      return {
        completed: completedIds.size,
        total: exercises.length,
        exercises: exercisesWithStatus
      }
    } catch (err) {
      console.error('Error getting simulation progress:', err)
      return { completed: 0, total: 0, exercises: [] }
    }
  }

  // Get next unlocked exercise
  async function getNextExercise(topicId, softwareType = null) {
    const progress = await getSimulationProgress(topicId, softwareType)
    const next = progress.exercises.find(ex => ex.isCurrent)
    if (next) {
      return fetchExercise(next.id)
    }
    return null
  }

  return {
    currentExercise,
    attemptCount,
    isCorrect,
    isMastered,
    loading,
    hintUsed,
    exerciseHistory,
    fetchExercise,
    fetchExercises,
    recordAttempt,
    useHint,
    resetExercise,
    getSimulationProgress,
    getNextExercise
  }
}
