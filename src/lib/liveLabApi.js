/**
 * Live-lab session API client.
 * Mirrors the fetch/auth pattern from pocketbase.js (API_BASE + pb_auth_token).
 */

const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_FASTAPI_URL ||
  'http://localhost:8000'

const TOKEN_KEY = 'pb_auth_token'

function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

async function liveLabFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  const token = getAuthToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    if (typeof options.body !== 'string') {
      options.body = JSON.stringify(options.body)
    }
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  let data = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
  }

  if (!res.ok) {
    const err = new Error(data?.detail || data?.message || res.statusText)
    err.status = res.status
    err.data = { data }
    throw err
  }
  return data
}

function encodeCode(code) {
  return encodeURIComponent(String(code || '').toUpperCase())
}

export const liveLabApi = {
  create({ labType, classId }) {
    return liveLabFetch('/api/live-labs', {
      method: 'POST',
      body: { lab_type: labType, class_id: classId },
    })
  },

  join(code, { displayName }) {
    return liveLabFetch(`/api/live-labs/${encodeCode(code)}/join`, {
      method: 'POST',
      body: { display_name: displayName },
    })
  },

  getState(code, { guestToken } = {}) {
    const params = new URLSearchParams()
    if (guestToken) params.set('guest_token', guestToken)
    const qs = params.toString()
    return liveLabFetch(
      `/api/live-labs/${encodeCode(code)}/state${qs ? `?${qs}` : ''}`
    )
  },

  vote(code, { guestToken, settingKey, value }) {
    return liveLabFetch(`/api/live-labs/${encodeCode(code)}/vote`, {
      method: 'POST',
      body: {
        guest_token: guestToken,
        setting_key: settingKey,
        value,
      },
    })
  },

  contribute(code, { guestToken, payload }) {
    return liveLabFetch(`/api/live-labs/${encodeCode(code)}/contribute`, {
      method: 'POST',
      body: { guest_token: guestToken, payload },
    })
  },

  applySettings(code, { settings, fromTallies = false } = {}) {
    return liveLabFetch(`/api/live-labs/${encodeCode(code)}/apply-settings`, {
      method: 'POST',
      body: { settings, from_tallies: fromTallies },
    })
  },

  setPhase(code, { phase }) {
    return liveLabFetch(`/api/live-labs/${encodeCode(code)}/set-phase`, {
      method: 'POST',
      body: { phase },
    })
  },

  setLocks(code, { voteLocked, contributeLocked } = {}) {
    return liveLabFetch(`/api/live-labs/${encodeCode(code)}/set-locks`, {
      method: 'POST',
      body: {
        vote_locked: voteLocked,
        contribute_locked: contributeLocked,
      },
    })
  },

  reset(code) {
    return liveLabFetch(`/api/live-labs/${encodeCode(code)}/reset`, {
      method: 'POST',
    })
  },

  end(code) {
    return liveLabFetch(`/api/live-labs/${encodeCode(code)}/end`, {
      method: 'POST',
    })
  },
}
