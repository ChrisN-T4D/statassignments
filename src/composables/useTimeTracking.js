// Smart Time Tracking with Idle Detection
// Tracks active engagement time while filtering out idle/away periods

import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Configuration for time tracking
 */
const CONFIG = {
  // Maximum reasonable time per activity type (seconds)
  MAX_TIME: {
    'multiple-choice': 300,      // 5 minutes
    'short-answer': 600,          // 10 minutes
    'problem-solving': 900,       // 15 minutes
    'essay': 1800,                // 30 minutes
    'reading': 3600,              // 60 minutes (textbook chapters)
    'default': 600                // 10 minutes default
  },

  // Idle timeout per activity type (milliseconds)
  // Reading requires much longer timeout - students read without interacting
  IDLE_TIMEOUT: {
    'multiple-choice': 30000,     // 30 seconds
    'short-answer': 45000,        // 45 seconds
    'problem-solving': 60000,     // 1 minute
    'essay': 90000,               // 1.5 minutes
    'reading': 600000,            // 10 minutes (reading textbooks)
    'default': 30000              // 30 seconds default
  },

  // Update interval for tracking (milliseconds)
  UPDATE_INTERVAL: 1000 // 1 second
}

/**
 * Smart time tracker that detects and excludes idle time
 *
 * Features:
 * - Tracks active engagement time vs total elapsed time
 * - Pauses when tab is hidden/inactive
 * - Detects user idle state (no mouse/keyboard activity)
 * - Caps maximum time to prevent runaway tracking
 * - Provides both active and total time metrics
 *
 * @param {string} questionType - Type of question for max time threshold
 * @returns {object} Time tracking state and controls
 */
export function useTimeTracking(questionType = 'default') {
  const isTracking = ref(false)
  const isPaused = ref(false)
  const activeTime = ref(0)        // Time user was actively engaged (seconds)
  const totalTime = ref(0)         // Total elapsed time (seconds)
  const startTimestamp = ref(null)
  const lastActivityTime = ref(null)

  let updateIntervalId = null
  let idleCheckIntervalId = null
  let lastActiveTime = Date.now()

  const maxTime = CONFIG.MAX_TIME[questionType] || CONFIG.MAX_TIME.default
  const idleTimeout = CONFIG.IDLE_TIMEOUT[questionType] || CONFIG.IDLE_TIMEOUT.default

  /**
   * Start tracking time
   */
  function start() {
    if (isTracking.value) return

    isTracking.value = true
    isPaused.value = false
    startTimestamp.value = Date.now()
    lastActivityTime.value = Date.now()
    lastActiveTime = Date.now()

    // Start update interval
    updateIntervalId = setInterval(updateTime, CONFIG.UPDATE_INTERVAL)

    // Start idle detection
    idleCheckIntervalId = setInterval(checkIdle, 1000)

    // Setup activity listeners
    setupActivityListeners()

    console.log('[TimeTracking] Started', { questionType, maxTime })
  }

  /**
   * Pause tracking (e.g., when tab becomes hidden)
   */
  function pause() {
    if (!isTracking.value || isPaused.value) return

    isPaused.value = true
    console.log('[TimeTracking] Paused', {
      activeTime: activeTime.value,
      totalTime: totalTime.value
    })
  }

  /**
   * Resume tracking
   */
  function resume() {
    if (!isTracking.value || !isPaused.value) return

    isPaused.value = false
    lastActiveTime = Date.now()
    lastActivityTime.value = Date.now()
    console.log('[TimeTracking] Resumed')
  }

  /**
   * Stop tracking and return final times
   */
  function stop() {
    if (!isTracking.value) return getTimeData()

    // Final update
    updateTime()

    // Cleanup
    isTracking.value = false
    isPaused.value = false

    if (updateIntervalId) {
      clearInterval(updateIntervalId)
      updateIntervalId = null
    }

    if (idleCheckIntervalId) {
      clearInterval(idleCheckIntervalId)
      idleCheckIntervalId = null
    }

    cleanupActivityListeners()

    const timeData = getTimeData()
    console.log('[TimeTracking] Stopped', timeData)
    return timeData
  }

  /**
   * Reset tracking to zero
   */
  function reset() {
    stop()
    activeTime.value = 0
    totalTime.value = 0
    startTimestamp.value = null
    lastActivityTime.value = null
  }

  /**
   * Update time counters
   */
  function updateTime() {
    if (!isTracking.value || isPaused.value) return

    const now = Date.now()

    // Update total time
    if (startTimestamp.value) {
      const elapsed = Math.floor((now - startTimestamp.value) / 1000)
      totalTime.value = Math.min(elapsed, maxTime)
    }

    // Update active time only if not idle
    const timeSinceActivity = now - lastActiveTime
    if (timeSinceActivity < idleTimeout) {
      activeTime.value = Math.min(activeTime.value + 1, maxTime)
    }

    // Auto-stop if max time reached
    if (activeTime.value >= maxTime || totalTime.value >= maxTime) {
      console.log('[TimeTracking] Max time reached, auto-stopping')
      stop()
    }
  }

  /**
   * Check for idle state
   */
  function checkIdle() {
    if (!isTracking.value) return

    const now = Date.now()
    const timeSinceActivity = now - lastActiveTime

    // If idle for too long, pause tracking
    if (timeSinceActivity >= idleTimeout && !isPaused.value) {
      console.log('[TimeTracking] User idle, pausing')
      pause()
    }
  }

  /**
   * Record user activity
   */
  function recordActivity() {
    lastActiveTime = Date.now()
    lastActivityTime.value = Date.now()

    // Resume if was paused due to idle
    if (isPaused.value && isTracking.value) {
      resume()
    }
  }

  /**
   * Get current time data
   */
  function getTimeData() {
    return {
      activeTimeSeconds: activeTime.value,
      totalTimeSeconds: totalTime.value,
      isIdle: isPaused.value,
      wasMaxedOut: activeTime.value >= maxTime || totalTime.value >= maxTime,
      maxTimeSeconds: maxTime,
      idleDetected: totalTime.value > activeTime.value + 5 // More than 5 sec difference
    }
  }

  // Activity event handlers
  const activityHandler = () => recordActivity()

  /**
   * Setup event listeners for activity detection
   */
  function setupActivityListeners() {
    // Mouse activity
    window.addEventListener('mousemove', activityHandler, { passive: true })
    window.addEventListener('mousedown', activityHandler, { passive: true })
    window.addEventListener('click', activityHandler, { passive: true })

    // Keyboard activity
    window.addEventListener('keydown', activityHandler, { passive: true })
    window.addEventListener('keypress', activityHandler, { passive: true })

    // Scroll activity
    window.addEventListener('scroll', activityHandler, { passive: true })

    // Touch activity (mobile)
    window.addEventListener('touchstart', activityHandler, { passive: true })
    window.addEventListener('touchmove', activityHandler, { passive: true })

    // Page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Window focus changes
    window.addEventListener('focus', resume)
    window.addEventListener('blur', pause)
  }

  /**
   * Cleanup activity listeners
   */
  function cleanupActivityListeners() {
    window.removeEventListener('mousemove', activityHandler)
    window.removeEventListener('mousedown', activityHandler)
    window.removeEventListener('click', activityHandler)
    window.removeEventListener('keydown', activityHandler)
    window.removeEventListener('keypress', activityHandler)
    window.removeEventListener('scroll', activityHandler)
    window.removeEventListener('touchstart', activityHandler)
    window.removeEventListener('touchmove', activityHandler)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('focus', resume)
    window.removeEventListener('blur', pause)
  }

  /**
   * Handle page visibility changes
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      pause()
    } else {
      recordActivity()
      // Will auto-resume if activity detected
    }
  }

  // Auto-cleanup on component unmount
  onUnmounted(() => {
    stop()
  })

  return {
    // State
    isTracking,
    isPaused,
    activeTime,
    totalTime,

    // Controls
    start,
    pause,
    resume,
    stop,
    reset,

    // Data
    getTimeData,

    // Config
    maxTime,
    idleTimeout
  }
}

/**
 * Calculate average time statistics with outlier filtering
 *
 * @param {Array<number>} times - Array of time values in seconds
 * @param {number} maxTime - Maximum reasonable time (outlier threshold)
 * @returns {object} Statistics
 */
export function calculateTimeStats(times, maxTime = 600) {
  if (!times || times.length === 0) {
    return {
      mean: 0,
      median: 0,
      count: 0,
      filteredCount: 0
    }
  }

  // Filter outliers (times at or near max are likely left-open cases)
  const filtered = times.filter(t => t < maxTime * 0.95)

  if (filtered.length === 0) {
    return {
      mean: 0,
      median: 0,
      count: times.length,
      filteredCount: 0
    }
  }

  // Calculate mean
  const mean = filtered.reduce((a, b) => a + b, 0) / filtered.length

  // Calculate median
  const sorted = [...filtered].sort((a, b) => a - b)
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)]

  return {
    mean: Math.round(mean),
    median: Math.round(median),
    count: times.length,
    filteredCount: filtered.length
  }
}

/**
 * Format seconds to human-readable time
 *
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatTime(seconds) {
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  if (minutes < 60) {
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`
  }

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours}h ${mins}m`
}
