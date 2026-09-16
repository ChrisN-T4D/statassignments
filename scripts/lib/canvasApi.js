/**
 * Minimal Canvas REST helpers for statassignments scripts.
 * Requires CANVAS_TOKEN. Optional CANVAS_BASE_URL (default NWOSU Instructure).
 */

const BASE = (process.env.CANVAS_BASE_URL || 'https://nwosu.instructure.com').replace(/\/$/, '')

export function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function canvasApi (method, path, body) {
  const token = process.env.CANVAS_TOKEN
  if (!token) {
    throw new Error('CANVAS_TOKEN is not set')
  }
  const url = path.startsWith('http') ? path : `${BASE}/api/v1${path}`
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Canvas ${method} ${path} -> ${res.status}: ${text.slice(0, 400)}`)
  }
  if (res.status === 204) return null
  return res.json()
}

/** Follow Link: rel="next" pagination. */
export async function canvasListAll (path, params = {}) {
  const token = process.env.CANVAS_TOKEN
  if (!token) throw new Error('CANVAS_TOKEN is not set')

  const qs = new URLSearchParams({ per_page: '100', ...params })
  let url = `${BASE}/api/v1${path}${path.includes('?') ? '&' : '?'}${qs}`
  const out = []

  while (url) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Canvas GET ${url} -> ${res.status}: ${text.slice(0, 400)}`)
    }
    const chunk = await res.json()
    out.push(...chunk)
    const link = res.headers.get('link') || ''
    const next = link.split(',').map((s) => s.trim()).find((s) => s.includes('rel="next"'))
    url = next ? next.match(/<([^>]+)>/)?.[1] : null
  }
  return out
}

export async function canvasDownload (fileUrl, destPath) {
  const token = process.env.CANVAS_TOKEN
  if (!token) throw new Error('CANVAS_TOKEN is not set')
  const res = await fetch(fileUrl, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${fileUrl}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const { writeFileSync } = await import('node:fs')
  writeFileSync(destPath, buf)
  return destPath
}
