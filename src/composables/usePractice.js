import { ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'
import { allStatisticsQuestions, getQuestionsByModule } from '../data/conceptQuestions'
import { updateBKT } from './useBKT'
import { getObjectivesForQuestion } from '../data/questionObjectiveMap'
import { useModule8Preferences } from './useModule8Preferences'

export function usePractice() {
  const { user } = useAuth()
  const problems = ref([])
  const loading = ref(false)
  const currentProblem = ref(null)
  const masteryQueue = ref([])
  const masteryIndex = ref(0)
  const masteryTotal = ref(0)

  const masteryConfig = {
    easy: 2,
    medium: 2,
    hard: 2
  }

  // Convert static question format to the format expected by Practice.vue
  function convertQuestion(q) {
    if (!q) return null

    // Map question types
    let question_type = q.type
    if (q.type === 'multiple_choice') question_type = 'multiple_choice'
    else if (q.type === 'multiple_select') question_type = 'multiple_choice' // treat as MC for now
    else if (q.type === 'true_false') question_type = 'true_false'
    else if (q.type === 'fill_blank') question_type = 'numeric' // use numeric input
    else if (q.type === 'matching') question_type = 'multiple_choice' // simplified
    else if (q.type === 'ordering') question_type = 'multiple_choice' // simplified

    // Build options array
    let options = []
    let correct_answer = ''

    if (q.type === 'multiple_choice') {
      options = q.options.map(opt => opt.text)
      const correctOpt = q.options.find(opt => opt.id === q.correct)
      correct_answer = correctOpt?.text || ''
    } else if (q.type === 'multiple_select') {
      options = q.options.map(opt => opt.text)
      correct_answer = q.options
        .filter(opt => q.correct.includes(opt.id))
        .map(opt => opt.text)
    } else if (q.type === 'true_false') {
      options = ['True', 'False']
      correct_answer = q.correct ? 'True' : 'False'
    } else if (q.type === 'fill_blank') {
      correct_answer = Array.isArray(q.answer) ? q.answer[0] : q.answer
    } else if (q.type === 'matching') {
      // For matching, show first pair as a simplified question
      options = q.pairs.map(p => p.right)
      correct_answer = q.pairs[0]?.right || ''
    } else if (q.type === 'ordering') {
      options = q.items.map(item => item.text)
      correct_answer = q.items.find(item => item.id === q.correctOrder[0])?.text || ''
    }

    return {
      id: q.id,
      topic_id: q.moduleId,
      question: q.question,
      question_type: q.type === 'multiple_select' ? 'multiple_select' : question_type,
      options,
      correct_answer,
      explanation: q.feedback?.correct || '',
      hint: q.hint || q.feedback?.incorrect || null,
      difficulty: q.difficulty || 'medium'
    }
  }

  // Try PocketBase first, fallback to static questions
  async function fetchProblems(topicId = null) {
    loading.value = true

    // Handle Module 8 customization
    if (topicId === 'stats-module-8') {
      const module8Prefs = useModule8Preferences()

      // If topics are selected, fetch only selected topics
      if (module8Prefs.selectedTopics.value.size > 0) {
        const selectedTopicIds = Array.from(module8Prefs.selectedTopics.value)

        try {
          // Build filter for multiple topics
          const topicFilters = selectedTopicIds.map(tid => `topic_id = "${tid}"`).join(' || ')
          const filter = `(${topicFilters})`

          const records = await pb.collection('practice_problems').getFullList({
            filter,
            sort: 'created'
          })

          if (records.length > 0) {
            problems.value = records.map(p => {
              let options = typeof p.options === 'string' ? JSON.parse(p.options) : p.options

              // Safe JSON parsing for correct_answer
              let correctAnswer = p.correct_answer
              if (typeof p.correct_answer === 'string') {
                try {
                  correctAnswer = JSON.parse(p.correct_answer)
                } catch {
                  correctAnswer = p.correct_answer
                }
              }

              const originalOptions = [...(options || [])]
              if (options && Array.isArray(options) && options[0]?.text) {
                options = options.map(opt => opt.text)
              }

              if (correctAnswer && originalOptions[0]?.id) {
                if (Array.isArray(correctAnswer)) {
                  correctAnswer = correctAnswer.map(id => {
                    const opt = originalOptions.find(o => o.id === id)
                    return opt ? opt.text : id
                  })
                } else {
                  const opt = originalOptions.find(o => o.id === correctAnswer)
                  correctAnswer = opt ? opt.text : correctAnswer
                }
              }

              return {
                ...p,
                id: p.question_id || p.id,
                options,
                correct_answer: correctAnswer
              }
            })
          } else {
            // Fallback to static questions for selected topics
            let allSelectedQuestions = []
            for (const tid of selectedTopicIds) {
              const topicQuestions = getQuestionsByModule(tid)
              allSelectedQuestions.push(...topicQuestions)
            }
            problems.value = allSelectedQuestions.map(convertQuestion).filter(Boolean)
          }

          loading.value = false
          return problems.value
        } catch (err) {
          console.error('Error fetching Module 8 customized problems:', err)
          // Fallback to static questions
          let allSelectedQuestions = []
          for (const tid of selectedTopicIds) {
            const topicQuestions = getQuestionsByModule(tid)
            allSelectedQuestions.push(...topicQuestions)
          }
          problems.value = allSelectedQuestions.map(convertQuestion).filter(Boolean)
          loading.value = false
          return problems.value
        }
      }
      // If no selection, fall through to default behavior
    }

    try {
      let filter = ''
      if (topicId) {
        filter = `topic_id = "${topicId}"`
      }

      const records = await pb.collection('practice_problems').getFullList({
        filter,
        sort: 'created'
      })

      if (records.length > 0) {
        problems.value = records.map(p => {
          let options = typeof p.options === 'string' ? JSON.parse(p.options) : p.options

          // Safe JSON parsing for correct_answer
          let correctAnswer = p.correct_answer
          if (typeof p.correct_answer === 'string') {
            try {
              correctAnswer = JSON.parse(p.correct_answer)
            } catch {
              // If parsing fails, it's a plain string like "b" - keep as is
              correctAnswer = p.correct_answer
            }
          }

          // Store original options for ID mapping
          const originalOptions = [...(options || [])]

          // Extract text from option objects if needed
          if (options && Array.isArray(options) && options[0]?.text) {
            options = options.map(opt => opt.text)
          }

          // Map correct answer IDs to text
          if (correctAnswer && originalOptions[0]?.id) {
            if (Array.isArray(correctAnswer)) {
              correctAnswer = correctAnswer.map(id => {
                const opt = originalOptions.find(o => o.id === id)
                return opt ? opt.text : id
              })
            } else {
              const opt = originalOptions.find(o => o.id === correctAnswer)
              correctAnswer = opt ? opt.text : correctAnswer
            }
          }

          return {
            ...p,
            id: p.question_id || p.id, // Use question_id for BKT mapping, fallback to PocketBase id
            options,
            correct_answer: correctAnswer
          }
        })
      } else {
        // Fallback to static questions
        let staticQuestions = topicId
          ? getQuestionsByModule(topicId)
          : allStatisticsQuestions
        problems.value = staticQuestions.map(convertQuestion).filter(Boolean)
      }
    } catch (err) {
      console.error('Error fetching problems from PocketBase:', err)
      // Fallback to static questions
      let staticQuestions = topicId
        ? getQuestionsByModule(topicId)
        : allStatisticsQuestions
      problems.value = staticQuestions.map(convertQuestion).filter(Boolean)
    } finally {
      loading.value = false
    }
    return problems.value
  }

  async function fetchRandomProblem(topicId = null) {
    loading.value = true
    try {
      let filter = ''
      if (topicId) {
        filter = `topic_id = "${topicId}"`
      }

      const records = await pb.collection('practice_problems').getFullList({
        filter
      })

      if (records.length > 0) {
        const randomIndex = Math.floor(Math.random() * records.length)
        const problem = records[randomIndex]
        let options = typeof problem.options === 'string' ? JSON.parse(problem.options) : problem.options

        // Safe JSON parsing for correct_answer
        let correctAnswer = problem.correct_answer
        if (typeof problem.correct_answer === 'string') {
          try {
            correctAnswer = JSON.parse(problem.correct_answer)
          } catch {
            // If parsing fails, it's a plain string like "b" - keep as is
            correctAnswer = problem.correct_answer
          }
        }

        // Store original options for ID mapping
        const originalOptions = [...(options || [])]

        // Extract text from option objects if needed
        if (options && Array.isArray(options) && options[0]?.text) {
          options = options.map(opt => opt.text)
        }

        // Map correct answer IDs to text
        if (correctAnswer && originalOptions[0]?.id) {
          if (Array.isArray(correctAnswer)) {
            correctAnswer = correctAnswer.map(id => {
              const opt = originalOptions.find(o => o.id === id)
              return opt ? opt.text : id
            })
          } else {
            const opt = originalOptions.find(o => o.id === correctAnswer)
            correctAnswer = opt ? opt.text : correctAnswer
          }
        }

        currentProblem.value = {
          ...problem,
          id: problem.question_id || problem.id, // Use question_id for BKT mapping, fallback to PocketBase id
          options,
          correct_answer: correctAnswer
        }
      } else {
        // Fallback to static questions
        let staticQuestions = topicId
          ? getQuestionsByModule(topicId)
          : allStatisticsQuestions

        if (staticQuestions.length > 0) {
          const randomIndex = Math.floor(Math.random() * staticQuestions.length)
          currentProblem.value = convertQuestion(staticQuestions[randomIndex])
        } else {
          currentProblem.value = null
        }
      }
    } catch (err) {
      console.error('Error fetching random problem:', err)
      // Fallback to static questions
      let staticQuestions = topicId
        ? getQuestionsByModule(topicId)
        : allStatisticsQuestions

      if (staticQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * staticQuestions.length)
        currentProblem.value = convertQuestion(staticQuestions[randomIndex])
      } else {
        currentProblem.value = null
      }
    } finally {
      loading.value = false
    }
    return currentProblem.value
  }

  function shuffleList(items) {
    return [...items].sort(() => Math.random() - 0.5)
  }

  function normalizeDifficulty(problem) {
    return (problem.difficulty || 'medium').toLowerCase()
  }

  async function buildMasteryQueue(topicId = null) {
    const allProblems = await fetchProblems(topicId)
    const grouped = {
      easy: [],
      medium: [],
      hard: []
    }

    allProblems.forEach(problem => {
      const difficulty = normalizeDifficulty(problem)
      if (difficulty === 'easy') grouped.easy.push(problem)
      else if (difficulty === 'hard') grouped.hard.push(problem)
      else grouped.medium.push(problem)
    })

    const easy = shuffleList(grouped.easy)
    const medium = shuffleList(grouped.medium)
    const hard = shuffleList(grouped.hard)

    const queue = []
    queue.push(...easy.splice(0, masteryConfig.easy))
    queue.push(...medium.splice(0, masteryConfig.medium))
    queue.push(...hard.splice(0, masteryConfig.hard))

    masteryQueue.value = queue
    masteryIndex.value = 0
    masteryTotal.value = queue.length
    return queue
  }

  async function startMastery(topicId = null) {
    await buildMasteryQueue(topicId)
    currentProblem.value = masteryQueue.value[0] || null
    return currentProblem.value
  }

  async function nextMasteryProblem() {
    if (masteryQueue.value.length === 0) {
      currentProblem.value = null
      return currentProblem.value
    }

    masteryIndex.value += 1
    if (masteryIndex.value >= masteryQueue.value.length) {
      currentProblem.value = null
      return currentProblem.value
    }

    currentProblem.value = masteryQueue.value[masteryIndex.value]
    return currentProblem.value
  }

  async function submitAnswer(problemId, answer, isCorrect, difficulty = 'medium', timeData = null, confidenceData = null, sequenceData = null) {
    if (!user.value) return { data: null, error: 'Not authenticated' }

    try {
      // Update BKT for all objectives associated with this question
      // Use difficulty-adjusted parameters (IRT-based tuning) and time data
      const objectives = getObjectivesForQuestion(problemId)
      for (const objectiveId of objectives) {
        const updatedState = await updateBKT(objectiveId, isCorrect, difficulty, timeData)

        // Determine confidence level based on answer changes and deliberation time
        let confidenceLevel = 'unknown'
        if (confidenceData) {
          const hasChanges = confidenceData.answer_changes > 0
          const quickResponse = confidenceData.time_to_first_selection < 5
          const slowResponse = confidenceData.time_to_first_selection > 30

          if (hasChanges || slowResponse) {
            confidenceLevel = 'low'
          } else if (quickResponse && !hasChanges) {
            confidenceLevel = isCorrect ? 'high' : 'guessing'
          } else {
            confidenceLevel = 'medium'
          }
        }

        console.log(`BKT updated for ${objectiveId} (${difficulty}):`, {
          mastery: Math.round(updatedState.pL * 100) + '%',
          attempts: updatedState.attempts,
          correct: updatedState.correct,
          slip: updatedState.pS,
          guess: updatedState.pG,
          activeTime: timeData?.activeTimeSeconds,
          totalTime: timeData?.totalTimeSeconds,
          confidence: confidenceLevel,
          answerChanges: confidenceData?.answer_changes,
          timeSinceReading: sequenceData?.time_since_reading,
          timeSinceLastAttempt: sequenceData?.time_since_last_attempt,
          hasReadBefore: sequenceData?.has_read_topic_before
        })
      }

      // Store attempt in PocketBase with time tracking data
      const attemptData = {
        user: user.value.id,
        problem: problemId,
        answer: answer,
        is_correct: isCorrect
      }

      // Add time data if available
      if (timeData) {
        attemptData.active_time_seconds = timeData.activeTimeSeconds
        attemptData.total_time_seconds = timeData.totalTimeSeconds
        attemptData.time_maxed_out = timeData.wasMaxedOut
        attemptData.idle_detected = timeData.idleDetected
      }

      // Add confidence indicators if available
      if (confidenceData) {
        attemptData.time_to_first_selection = confidenceData.time_to_first_selection
        attemptData.answer_changes = confidenceData.answer_changes
      }

      // Add sequence/spacing context if available
      if (sequenceData) {
        attemptData.time_since_reading = sequenceData.time_since_reading
        attemptData.time_since_last_attempt = sequenceData.time_since_last_attempt
        attemptData.has_read_topic_before = sequenceData.has_read_topic_before
      }

      const data = await pb.collection('practice_attempts').create(attemptData)
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  async function fetchUserStats(topicId = null) {
    if (!user.value) return null

    try {
      const attempts = await pb.collection('practice_attempts').getFullList({
        filter: `user = "${user.value.id}"`,
        expand: 'problem'
      })

      let filteredAttempts = attempts
      if (topicId) {
        filteredAttempts = attempts.filter(a => a.expand?.problem?.topic_id === topicId)
      }

      const total = filteredAttempts.length
      const correct = filteredAttempts.filter(a => a.is_correct).length
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

      return {
        total,
        correct,
        incorrect: total - correct,
        accuracy
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
      return null
    }
  }

  return {
    problems,
    loading,
    currentProblem,
    fetchProblems,
    fetchRandomProblem,
    startMastery,
    nextMasteryProblem,
    masteryIndex,
    masteryTotal,
    submitAnswer,
    fetchUserStats
  }
}
