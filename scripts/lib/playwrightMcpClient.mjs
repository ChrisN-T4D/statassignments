/**
 * Minimal Playwright MCP HTTP client (neu1 @ :8931).
 */
const MCP_URL = process.env.PLAYWRIGHT_MCP_URL || 'http://192.168.50.194:8931/mcp'

function parseSseBody (text) {
  const lines = text.split('\n')
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      return JSON.parse(line.slice(6))
    }
  }
  throw new Error(`No SSE data in response: ${text.slice(0, 300)}`)
}

export class PlaywrightMcpClient {
  constructor () {
    this.sessionId = null
    this.nextId = 1
  }

  async init () {
    const res = await fetch(MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: this.nextId++,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'statassignments-canvas', version: '1.0' }
        }
      })
    })
    this.sessionId = res.headers.get('mcp-session-id')
    if (!this.sessionId) throw new Error('Playwright MCP did not return mcp-session-id')
    parseSseBody(await res.text())

    await this.notify('notifications/initialized', {})
    return this
  }

  async notify (method, params) {
    await fetch(MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
        'mcp-session-id': this.sessionId
      },
      body: JSON.stringify({ jsonrpc: '2.0', method, params })
    })
  }

  async callTool (name, args = {}) {
    const res = await fetch(MCP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
        'mcp-session-id': this.sessionId
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: this.nextId++,
        method: 'tools/call',
        params: { name, arguments: args }
      })
    })
    const msg = parseSseBody(await res.text())
    if (msg.error) throw new Error(msg.error.message || JSON.stringify(msg.error))
    const content = msg.result?.content || []
    const text = content.filter((c) => c.type === 'text').map((c) => c.text).join('\n')
    const errText = content.find((c) => c.type === 'text' && /error/i.test(c.text || ''))
    if (msg.result?.isError) throw new Error(text || 'Playwright tool error')
    return text
  }

  /** Parse JSON from browser_run_code_unsafe ### Result block. */
  parseResult (text) {
    const marker = '### Result\n'
    const start = text.indexOf(marker)
    if (start === -1) throw new Error(`No result marker in: ${text.slice(0, 200)}`)
    const body = text.slice(start + marker.length)
    const end = body.indexOf('\n### Ran Playwright code')
    const raw = end === -1 ? body.trim() : body.slice(0, end).trim()
    return JSON.parse(raw)
  }
}
