#!/usr/bin/env node
import { writeFileSync } from 'node:fs'
import { PlaywrightMcpClient } from './lib/playwrightMcpClient.mjs'

const COURSE_ID = 2406
const BASE = `https://nwosu.instructure.com/courses/${COURSE_ID}`

async function grab (mcp, url) {
  const code = `
async (page) => {
  const res = await page.goto('${url}', { waitUntil: 'networkidle', timeout: 45000 });
  const status = res?.status?.() ?? 0;
  const title = await page.title();
  const selectors = [
    '.user_content.enhanced',
    '.user_content',
    '#wiki_page_show .show-content',
    '.description',
    '#assignment_show .user_content',
    '#content .user_content'
  ];
  const hits = [];
  for (const sel of selectors) {
    const loc = page.locator(sel).first();
    if (await loc.count() && await loc.isVisible().catch(() => false)) {
      const text = (await loc.innerText()).trim();
      if (text.length > 20) hits.push({ sel, len: text.length, preview: text.slice(0, 500) });
    }
  }
  return { url: '${url}', status, title, hits };
}
`
  const text = await mcp.callTool('browser_run_code_unsafe', { code })
  return mcp.parseResult(text)
}

async function main () {
  const mcp = await new PlaywrightMcpClient().init()
  const urls = [
    `${BASE}/pages/phase-3-worksheet`,
    `${BASE}/pages/phase-4-worksheet`,
    `${BASE}/assignments`,
  ]
  const out = []
  for (const url of urls) {
    console.log('URL', url)
    out.push(await grab(mcp, url))
  }
  writeFileSync('scripts/debug-phase-pages.json', JSON.stringify(out, null, 2))
  console.log('wrote scripts/debug-phase-pages.json')
}

main().catch((e) => { console.error(e); process.exit(1) })
