/**
 * PocketBase-compatible API client backed by FastAPI + Postgres.
 * Keeps the same `pb` interface so composables need no changes.
 */

const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_FASTAPI_URL ||
  'http://localhost:8000'

const TOKEN_KEY = 'pb_auth_token'
const RECORD_KEY = 'pb_auth_record'

const listeners = new Set()

function loadStoredAuth() {
  try {
    const token = localStorage.getItem(TOKEN_KEY) || ''
    const record = JSON.parse(localStorage.getItem(RECORD_KEY) || 'null')
    return { token, record }
  } catch {
    return { token: '', record: null }
  }
}

function saveAuth(token, record) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(RECORD_KEY, JSON.stringify(record))
  } else {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(RECORD_KEY)
  }
  listeners.forEach((fn) => fn(token, record))
}

const stored = loadStoredAuth()

const authStore = {
  token: stored.token,
  record: stored.record,
  get isValid() {
    return Boolean(this.token && this.record?.id)
  },
  clear() {
    this.token = ''
    this.record = null
    saveAuth('', null)
  },
  onChange(callback) {
    listeners.add(callback)
    return () => listeners.delete(callback)
  },
}

async function apiFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  if (authStore.token) {
    headers.Authorization = `Bearer ${authStore.token}`
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

function buildQuery(params) {
  const q = new URLSearchParams()
  if (params.filter) q.set('filter', params.filter)
  if (params.sort) q.set('sort', params.sort)
  if (params.expand) q.set('expand', params.expand)
  return q.toString()
}

class CollectionClient {
  constructor(name) {
    this.name = name
  }

  async authWithPassword(identity, password) {
    const data = await apiFetch(`/api/collections/users/auth-with-password`, {
      method: 'POST',
      body: { identity, password },
    })
    authStore.token = data.token
    authStore.record = data.record
    saveAuth(data.token, data.record)
    return data
  }

  async authRefresh() {
    const data = await apiFetch(`/api/collections/users/auth-refresh`, {
      method: 'POST',
    })
    authStore.token = data.token
    authStore.record = data.record
    saveAuth(data.token, data.record)
    return data
  }

  async requestPasswordReset(email) {
    return apiFetch(`/api/collections/users/request-password-reset`, {
      method: 'POST',
      body: { email },
    })
  }

  async getFullList(options = {}) {
    const qs = buildQuery(options)
    const data = await apiFetch(
      `/api/collections/${this.name}/records?perPage=2000${qs ? `&${qs}` : ''}`
    )
    return data.items || []
  }

  async getList(page = 1, perPage = 50, options = {}) {
    const qs = buildQuery(options)
    const data = await apiFetch(
      `/api/collections/${this.name}/records?page=${page}&perPage=${perPage}${qs ? `&${qs}` : ''}`
    )
    return data
  }

  async getOne(id, options = {}) {
    const qs = buildQuery(options)
    return apiFetch(
      `/api/collections/${this.name}/records/${id}${qs ? `?${qs}` : ''}`
    )
  }

  async create(body) {
    if (this.name === 'users' && body.password) {
      return apiFetch(`/api/collections/users/records`, {
        method: 'POST',
        body,
      })
    }
    return apiFetch(`/api/collections/${this.name}/records`, {
      method: 'POST',
      body,
    })
  }

  async update(id, body) {
    return apiFetch(`/api/collections/${this.name}/records/${id}`, {
      method: 'PATCH',
      body,
    })
  }

  async delete(id) {
    return apiFetch(`/api/collections/${this.name}/records/${id}`, {
      method: 'DELETE',
    })
  }
}

export const pb = {
  baseUrl: API_BASE,
  authStore,
  autoCancellation() {
    // no-op; PocketBase SDK compatibility
  },
  collection(name) {
    return new CollectionClient(name)
  },
}
