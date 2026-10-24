/**
 * Class discussion board API client ("Ask the class").
 * Same fetch/auth pattern as liveLabApi.js.
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

async function boardFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  const token = getAuthToken()
  if (token) headers.Authorization = `Bearer ${token}`
  let body = options.body
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(body)
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers, body })
  const text = await res.text()
  let data = null
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
    throw err
  }
  return data
}

const seg = (v) => encodeURIComponent(String(v))

export const boardApi = {
  listThreads(classId, { filter = 'all', tag = '', q = '' } = {}) {
    const params = new URLSearchParams({ filter })
    if (tag) params.set('tag', tag)
    if (q) params.set('q', q)
    return boardFetch(`/api/board/${seg(classId)}/threads?${params}`)
  },
  createThread(classId, { title, body, tag, tagLabel }) {
    return boardFetch(`/api/board/${seg(classId)}/threads`, {
      method: 'POST',
      body: { title, body, tag: tag || null, tag_label: tagLabel || null }
    })
  },
  unread(classId) {
    return boardFetch(`/api/board/${seg(classId)}/unread`)
  },
  getThread(threadId) {
    return boardFetch(`/api/board/threads/${seg(threadId)}`)
  },
  reply(threadId, body) {
    return boardFetch(`/api/board/threads/${seg(threadId)}/posts`, { method: 'POST', body: { body } })
  },
  markAnswer(threadId, postId) {
    return boardFetch(`/api/board/threads/${seg(threadId)}/answer`, { method: 'POST', body: { post_id: postId || null } })
  },
  toggleHelpful(postId) {
    return boardFetch(`/api/board/posts/${seg(postId)}/helpful`, { method: 'POST' })
  },
  reportThread(threadId, reason) {
    return boardFetch(`/api/board/threads/${seg(threadId)}/report`, { method: 'POST', body: { reason } })
  },
  reportPost(postId, reason) {
    return boardFetch(`/api/board/posts/${seg(postId)}/report`, { method: 'POST', body: { reason } })
  },
  hideThread(threadId, hidden) {
    return boardFetch(`/api/board/threads/${seg(threadId)}/hide`, { method: 'POST', body: { hidden } })
  },
  hidePost(postId, hidden) {
    return boardFetch(`/api/board/posts/${seg(postId)}/hide`, { method: 'POST', body: { hidden } })
  },
  deleteThread(threadId) {
    return boardFetch(`/api/board/threads/${seg(threadId)}`, { method: 'DELETE' })
  },
  deletePost(postId) {
    return boardFetch(`/api/board/posts/${seg(postId)}`, { method: 'DELETE' })
  },
  reports(classId) {
    return boardFetch(`/api/board/${seg(classId)}/reports`)
  }
}
