import { ref, onMounted, onUnmounted } from 'vue'
import { liveLabApi } from '../lib/liveLabApi'

const GUEST_KEY_PREFIX = 'liveLabGuest:'

function guestStorageKey(code) {
  return `${GUEST_KEY_PREFIX}${String(code || '').toUpperCase()}`
}

function applyStateFromResponse(stateRef, data) {
  if (data?.state) {
    stateRef.value = data.state
  }
}

export function useLiveLabSession({ code, role = 'student', pollMs = 1000 } = {}) {
  const state = ref(null)
  const error = ref(null)
  const guestToken = ref('')
  const displayName = ref('')

  let pollTimer = null

  function loadGuestToken() {
    if (!code) return
    try {
      const stored = localStorage.getItem(guestStorageKey(code))
      if (stored) guestToken.value = stored
    } catch {
      // ignore storage errors
    }
  }

  function saveGuestToken(token) {
    guestToken.value = token
    if (!code || !token) return
    try {
      localStorage.setItem(guestStorageKey(code), token)
    } catch {
      // ignore storage errors
    }
  }

  async function refreshState() {
    if (!code) return null
    try {
      const guest =
        role === 'student' && guestToken.value ? guestToken.value : undefined
      const data = await liveLabApi.getState(code, { guestToken: guest })
      state.value = data
      error.value = null
      return data
    } catch (err) {
      error.value = err
      throw err
    }
  }

  function startPoll() {
    stopPoll()
    if (!code || pollMs <= 0) return
    refreshState().catch(() => {})
    pollTimer = setInterval(() => {
      refreshState().catch(() => {})
    }, pollMs)
  }

  function stopPoll() {
    if (pollTimer) {
      clearInterval(pollTimer)
      pollTimer = null
    }
  }

  async function runAction(fn) {
    try {
      const data = await fn()
      applyStateFromResponse(state, data)
      error.value = null
      return data
    } catch (err) {
      error.value = err
      throw err
    }
  }

  async function create({ labType, classId }) {
    return runAction(() => liveLabApi.create({ labType, classId }))
  }

  async function join(name) {
    displayName.value = name
    const data = await runAction(() =>
      liveLabApi.join(code, { displayName: name })
    )
    if (data?.guest_token) {
      saveGuestToken(data.guest_token)
    }
    await refreshState().catch(() => {})
    return data
  }

  async function vote(settingKey, value) {
    return runAction(() =>
      liveLabApi.vote(code, {
        guestToken: guestToken.value,
        settingKey,
        value,
      })
    )
  }

  async function contribute(payload) {
    return runAction(() =>
      liveLabApi.contribute(code, {
        guestToken: guestToken.value,
        payload,
      })
    )
  }

  async function applySettings(options = {}) {
    const data = await runAction(() => liveLabApi.applySettings(code, options))
    await refreshState().catch(() => {})
    return data
  }

  async function setPhase(phase) {
    const data = await runAction(() => liveLabApi.setPhase(code, { phase }))
    await refreshState().catch(() => {})
    return data
  }

  async function setLocks(locks = {}) {
    const data = await runAction(() => liveLabApi.setLocks(code, locks))
    await refreshState().catch(() => {})
    return data
  }

  async function reset() {
    const data = await runAction(() => liveLabApi.reset(code))
    await refreshState().catch(() => {})
    return data
  }

  async function end() {
    const data = await runAction(() => liveLabApi.end(code))
    await refreshState().catch(() => {})
    return data
  }

  onMounted(() => {
    loadGuestToken()
    startPoll()
  })

  onUnmounted(() => {
    stopPoll()
  })

  return {
    state,
    error,
    guestToken,
    displayName,
    refreshState,
    create,
    join,
    vote,
    contribute,
    applySettings,
    setPhase,
    setLocks,
    reset,
    end,
    startPoll,
    stopPoll,
  }
}
