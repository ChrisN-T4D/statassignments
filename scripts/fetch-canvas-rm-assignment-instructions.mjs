#!/usr/bin/env node
/**
 * Fetch PSYC 4223 assignment instructions (Phase 3, Phase 4, Article Review) from Canvas 2406.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PlaywrightMcpClient } from './lib/playwrightMcpClient.mjs'
import { CANVAS_RESEARCH_METHODS_COURSE_ID } from '../src/data/researchMethodsCanvasLinks.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_JSON = join(__dirname, 'canvas-rm-assignment-instructions.json')
const OUT_DIR = join(__dirname, 'canvas-rm-assignment-snapshots')
const COURSE_ID = CANVAS_RESEARCH_METHODS_COURSE_ID
const BASE = `https://nwosu.instructure.com/courses/${COURSE_ID}`

const TARGET_NAMES = [
  /phase\s*3/i,
  /phase\s*4/i,
  /article\s*review/i
]

async function listAssignments (mcp) {
  const code = `
async (page) => {
  await page.goto('${BASE}/assignments', { waitUntil: 'networkidle', timeout: 45000 });
  const rows = await page.locator('#assignments-list a.ig-title, .assignment-list a, a[href*="/assignments/"]').evaluateAll((els) => {
    const out = [];
    const seen = new Set();
    for (const a of els) {
      const href = a.getAttribute('href') || '';
      if (!href.includes('/assignments/') || href.endsWith('/assignments')) continue;
      const m = href.match(/\\/assignments\\/(\\d+)/);
      if (!m) continue;
      const id = m[1];
      if (seen.has(id)) continue;
      seen.add(id);
      out.push({ id, href: href.startsWith('http') ? href : 'https://nwosu.instructure.com' + href, title: (a.textContent || '').trim() });
    }
    return out;
  });
  return rows;
}
`
  const text = await mcp.callTool('browser_run_code_unsafe', { code })
  return mcp.parseResult(text)
}

async function fetchAssignment (mcp, href) {
  const safeHref = href.replace(/'/g, "\\'")
  const code = `
async (page) => {
  await page.goto('${safeHref}', { waitUntil: 'networkidle', timeout: 45000 });
  const title = await page.title();
  const selectors = ['#assignment_show .user_content', '.description .user_content', '.assignment-description', '.user_content.enhanced', '.user_content'];
  let text = '';
  let html = '';
  for (const sel of selectors) {
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      const t = (await loc.innerText().catch(() => '')).trim();
      if (t.length > text.length) {
        text = t;
        html = await loc.innerHTML().catch(() => '');
      }
    }
  }
  if (!text) {
    text = (await page.locator('#content').innerText().catch(() => '')).trim();
  }
  return { title, text, htmlLen: html.length, textLen: text.length };
}
`
  const text = await mcp.callTool('browser_run_code_unsafe', { code })
  return mcp.parseResult(text)
}

async function main () {
  mkdirSync(OUT_DIR, { recursive: true })
  const mcp = await new PlaywrightMcpClient().init()
  const all = await listAssignments(mcp)
  console.log(`Found ${all.length} assignment links`)

  const targets = all.filter((a) => TARGET_NAMES.some((re) => re.test(a.title)))
  console.log('Targets:', targets.map((t) => t.title).join(' | '))

  const results = []
  for (const row of targets) {
    console.log('Fetching', row.title)
    const detail = await fetchAssignment(mcp, row.href)
    const slug = row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    writeFileSync(join(OUT_DIR, `${slug}.md`), `# ${detail.title}\n\n${detail.text}\n`)
    results.push({ ...row, ...detail })
  }

  writeFileSync(OUT_JSON, JSON.stringify({ courseId: COURSE_ID, fetchedAt: new Date().toISOString(), assignments: results }, null, 2))
  console.log('Wrote', OUT_JSON)
}

main().catch((e) => { console.error(e.message || e); process.exit(1) })
