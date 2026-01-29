// Bayesian Knowledge Tracing (BKT) implementation
// Tracks student mastery of learning objectives based on performance

import { pb } from '../lib/pocketbase'

/**
 * BKT Model Parameters:
 * - P(L): Current probability that the skill is learned (0-1)
 * - P(L0): Prior probability (initial knowledge state)
 * - P(T): Transition probability (learning rate per opportunity)
 * - P(S): Slip probability (knows skill but answers incorrectly)
 * - P(G): Guess probability (doesn't know skill but answers correctly)
 */

// Default BKT parameters
const DEFAULT_PARAMS = {
  pL0: 0.1,    // Low prior knowledge (10%)
  pT: 0.15,    // Moderate learning rate (15% per correct answer)
  pS: 0.1,     // Low slip rate (10% chance of slip)
  pG: 0.25     // Moderate guess rate (25% chance of guessing correctly)
}

/**
 * Difficulty-based parameter adjustments (IRT-inspired tuning)
 * Adjusts slip and guess probabilities based on question difficulty
 */
const DIFFICULTY_ADJUSTMENTS = {
  easy: {
    pG: 0.35,    // Higher chance of guessing correctly on easy questions
    pS: 0.05     // Lower slip rate on easy questions
  },
  medium: {
    pG: 0.25,    // Moderate guess rate
    pS: 0.10     // Moderate slip rate
  },
  hard: {
    pG: 0.15,    // Lower chance of guessing correctly on hard questions
    pS: 0.15     // Higher slip rate on hard questions (even experts make mistakes)
  }
}

/**
 * Adapt prior probability (P(L0)) based on overall student performance
 * Students who perform well overall start with higher priors on new objectives
 */
export async function adaptPrior() {
  const allStates = await getAllBKTStates()
  const stateArray = Object.values(allStates)

  if (stateArray.length === 0) {
    return DEFAULT_PARAMS.pL0
  }

  // Calculate average mastery across all objectives
  const avgMastery = stateArray.reduce((sum, state) => sum + state.pL, 0) / stateArray.length

  // Adapt P(L0) based on average mastery
  // Higher overall mastery suggests higher prior for new objectives
  if (avgMastery >= 0.7) {
    return 0.2  // High performers start at 20%
  } else if (avgMastery >= 0.4) {
    return 0.15  // Medium performers start at 15%
  } else {
    return 0.1  // Low performers start at default 10%
  }
}

/**
 * Get difficulty-adjusted parameters for a question
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {object} Adjusted BKT parameters
 */
export function getAdjustedParams(difficulty = 'medium') {
  const adjustments = DIFFICULTY_ADJUSTMENTS[difficulty] || DIFFICULTY_ADJUSTMENTS.medium
  return {
    ...DEFAULT_PARAMS,
    ...adjustments
  }
}

/**
 * Initialize BKT state for an objective with adaptive prior
 */
export async function initializeBKT(objectiveId, customParams = {}) {
  // Use adaptive prior if no custom P(L0) provided
  const adaptivePL0 = customParams.pL0 !== undefined ? customParams.pL0 : await adaptPrior()
  const params = { ...DEFAULT_PARAMS, pL0: adaptivePL0, ...customParams }

  const state = {
    objectiveId,
    pL: params.pL0,        // Current mastery probability
    pL0: params.pL0,       // Prior (possibly adapted)
    pT: params.pT,         // Transition (learning rate)
    pS: params.pS,         // Slip
    pG: params.pG,         // Guess
    attempts: 0,
    correct: 0,
    incorrect: 0,
    lastUpdated: new Date().toISOString()
  }

  await saveBKTState(objectiveId, state)
  return state
}

/**
 * Update BKT model after an assessment response
 * @param {string} objectiveId - The objective being assessed
 * @param {boolean} isCorrect - Whether the answer was correct
 * @param {string} difficulty - Question difficulty ('easy', 'medium', 'hard')
 * @returns {object} Updated BKT state with new mastery probability
 */
export async function updateBKT(objectiveId, isCorrect, difficulty = 'medium') {
  let state = await loadBKTState(objectiveId)

  // Initialize if doesn't exist
  if (!state) {
    state = await initializeBKT(objectiveId)
  }

  // Get difficulty-adjusted slip and guess rates
  const adjustedParams = getAdjustedParams(difficulty)
  const pS = adjustedParams.pS
  const pG = adjustedParams.pG

  // Use state's learning rate (pT) and current mastery (pL)
  const { pL, pT } = state

  // Step 1: Update probability based on evidence (correct/incorrect)
  let pL_given_evidence

  if (isCorrect) {
    // P(L | correct) using Bayes' theorem
    // P(L | correct) = P(correct | L) * P(L) / P(correct)
    // P(correct | L) = 1 - P(S)
    // P(correct) = P(L) * (1 - P(S)) + (1 - P(L)) * P(G)
    const p_correct = pL * (1 - pS) + (1 - pL) * pG
    pL_given_evidence = (pL * (1 - pS)) / p_correct
  } else {
    // P(L | incorrect) using Bayes' theorem
    // P(L | incorrect) = P(incorrect | L) * P(L) / P(incorrect)
    // P(incorrect | L) = P(S)
    // P(incorrect) = P(L) * P(S) + (1 - P(L)) * (1 - P(G))
    const p_incorrect = pL * pS + (1 - pL) * (1 - pG)
    pL_given_evidence = (pL * pS) / p_incorrect
  }

  // Step 2: Apply learning transition
  // P(L_new) = P(L_given_evidence) + (1 - P(L_given_evidence)) * P(T)
  const pL_new = pL_given_evidence + (1 - pL_given_evidence) * pT

  // Update state
  state.pL = Math.min(0.99, Math.max(0.01, pL_new)) // Clamp between 0.01 and 0.99
  state.pS = pS  // Store difficulty-adjusted slip rate
  state.pG = pG  // Store difficulty-adjusted guess rate
  state.attempts++
  if (isCorrect) {
    state.correct++
  } else {
    state.incorrect++
  }
  state.lastUpdated = new Date().toISOString()

  // Save updated state
  await saveBKTState(objectiveId, state)

  return state
}

/**
 * Get current mastery percentage (0-100) for an objective
 */
export async function getMasteryPercent(objectiveId) {
  const state = await loadBKTState(objectiveId)
  if (!state) return 0
  return Math.round(state.pL * 100)
}

/**
 * Get mastery level label based on probability
 */
export async function getMasteryLevel(objectiveId) {
  const percent = await getMasteryPercent(objectiveId)
  if (percent >= 90) return 'Mastered'
  if (percent >= 75) return 'Proficient'
  if (percent >= 60) return 'Developing'
  return 'Not Yet Mastered'
}

/**
 * Check if objective has been mastered (>= 90%)
 */
export async function isMastered(objectiveId) {
  const percent = await getMasteryPercent(objectiveId)
  return percent >= 90
}

/**
 * Get full BKT state for an objective
 */
export async function getBKTState(objectiveId) {
  const state = await loadBKTState(objectiveId)
  return state || null
}

/**
 * Reset BKT state for an objective (for testing or retry)
 */
export async function resetBKT(objectiveId) {
  const userId = pb.authStore.record?.id

  // Remove from localStorage
  localStorage.removeItem(`bkt-${objectiveId}`)

  // Delete from PocketBase if authenticated
  if (userId) {
    try {
      const filter = `user = "${userId}" && objective_id = "${objectiveId}"`
      const records = await pb.collection('bkt_states').getList(1, 1, { filter })

      if (records.items.length > 0) {
        await pb.collection('bkt_states').delete(records.items[0].id)
      }
    } catch (err) {
      console.warn('Failed to delete BKT state from PocketBase:', err)
    }
  }

  return await initializeBKT(objectiveId)
}

/**
 * Get all BKT states (for reporting/analytics)
 * Fetches from PocketBase if authenticated, falls back to localStorage
 */
export async function getAllBKTStates() {
  const userId = pb.authStore.record?.id

  // Try to load from PocketBase first if authenticated
  if (userId) {
    try {
      const filter = `user = "${userId}"`
      const records = await pb.collection('bkt_states').getFullList({ filter })

      const states = {}
      for (const dbState of records) {
        const state = {
          objectiveId: dbState.objective_id,
          pL: dbState.pL,
          pL0: dbState.pL0,
          pT: dbState.pT,
          pS: dbState.pS,
          pG: dbState.pG,
          attempts: dbState.attempts,
          correct: dbState.correct,
          incorrect: dbState.incorrect,
          lastUpdated: dbState.last_updated
        }
        states[dbState.objective_id] = state

        // Update localStorage cache
        try {
          localStorage.setItem(`bkt-${dbState.objective_id}`, JSON.stringify(state))
        } catch (err) {
          console.warn('Failed to update localStorage cache:', err)
        }
      }

      return states
    } catch (err) {
      console.warn('Failed to load all BKT states from PocketBase, falling back to localStorage:', err)
    }
  }

  // Fallback to localStorage
  const states = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('bkt-')) {
      const objectiveId = key.replace('bkt-', '')
      try {
        const data = localStorage.getItem(key)
        if (data) {
          states[objectiveId] = JSON.parse(data)
        }
      } catch (err) {
        console.warn(`Failed to parse BKT state for ${objectiveId}:`, err)
      }
    }
  }
  return states
}

// Private helper functions

/**
 * Save BKT state to both PocketBase and localStorage
 * PocketBase is the source of truth, localStorage is the cache
 */
async function saveBKTState(objectiveId, state) {
  const userId = pb.authStore.record?.id

  // Save to localStorage (cache) immediately
  try {
    localStorage.setItem(`bkt-${objectiveId}`, JSON.stringify(state))
  } catch (err) {
    console.warn('Failed to save BKT state to localStorage:', err)
  }

  // Save to PocketBase if user is authenticated
  if (!userId) {
    console.warn('User not authenticated, BKT state saved to localStorage only')
    return
  }

  try {
    // Prepare data for PocketBase
    const dbState = {
      user: userId,
      objective_id: objectiveId,
      pL: state.pL,
      pL0: state.pL0,
      pT: state.pT,
      pS: state.pS,
      pG: state.pG,
      attempts: state.attempts,
      correct: state.correct,
      incorrect: state.incorrect,
      last_updated: state.lastUpdated
    }

    // Try to update existing record, or create new one
    const filter = `user = "${userId}" && objective_id = "${objectiveId}"`
    const existingRecords = await pb.collection('bkt_states').getList(1, 1, { filter })

    if (existingRecords.items.length > 0) {
      // Update existing record
      await pb.collection('bkt_states').update(existingRecords.items[0].id, dbState)
    } else {
      // Create new record
      await pb.collection('bkt_states').create(dbState)
    }
  } catch (err) {
    console.warn('Failed to sync BKT state to PocketBase:', err)
    // Continue silently - localStorage cache still works
  }
}

/**
 * Load BKT state from PocketBase (preferred) or localStorage (fallback)
 */
async function loadBKTState(objectiveId) {
  const userId = pb.authStore.record?.id

  // Try to load from PocketBase first if user is authenticated
  if (userId) {
    try {
      const filter = `user = "${userId}" && objective_id = "${objectiveId}"`
      const records = await pb.collection('bkt_states').getList(1, 1, { filter })

      if (records.items.length > 0) {
        const dbState = records.items[0]

        // Convert to app format
        const state = {
          objectiveId: dbState.objective_id,
          pL: dbState.pL,
          pL0: dbState.pL0,
          pT: dbState.pT,
          pS: dbState.pS,
          pG: dbState.pG,
          attempts: dbState.attempts,
          correct: dbState.correct,
          incorrect: dbState.incorrect,
          lastUpdated: dbState.last_updated
        }

        // Update localStorage cache
        try {
          localStorage.setItem(`bkt-${objectiveId}`, JSON.stringify(state))
        } catch (err) {
          console.warn('Failed to update localStorage cache:', err)
        }

        return state
      }
    } catch (err) {
      console.warn('Failed to load BKT state from PocketBase, falling back to localStorage:', err)
    }
  }

  // Fallback to localStorage
  try {
    const data = localStorage.getItem(`bkt-${objectiveId}`)
    return data ? JSON.parse(data) : null
  } catch (err) {
    console.error('Failed to load BKT state:', err)
    return null
  }
}

/**
 * Export for use in Vue components
 */
export function useBKT() {
  return {
    initializeBKT,
    updateBKT,
    getMasteryPercent,
    getMasteryLevel,
    isMastered,
    getBKTState,
    resetBKT,
    getAllBKTStates,
    getAdjustedParams,
    adaptPrior
  }
}
