#!/usr/bin/env node
/**
 * Fetch PSYC 4223 (course 2406) worksheet instruction pages via Playwright MCP.
 * Writes scripts/canvas-rm-worksheet-pages.json and markdown snapshots.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PlaywrightMcpClient } from './lib/playwrightMcpClient.mjs'
import { CANVAS_RESEARCH_METHODS_COURSE_ID } from '../src/data/researchMethodsCanvasLinks.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_JSON = join(__dirname, 'canvas-rm-worksheet-pages.json')
const OUT_DIR = join(__dirname, 'canvas-rm-worksheet-snapshots')
const COURSE_ID = CANVAS_RESEARCH_METHODS_COURSE_ID
const CANVAS_SSO = 'https://nwosu.instructure.com/login/saml/206'
const BASE = `https://nwosu.instructure.com/courses/${COURSE_ID}`

/** Candidate wiki slugs — script also discovers links from course modules. */
const CANDIDATE_SLUGS = [
  'phase-3-worksheet',
  'phase-3',
  'phase-3-research-question',
  'phase-4-worksheet',
  'phase-4',
  'phase-4-operationalization-exploration',
  'operationalization-exploration',
  'helpful-table',
  'path-1-survey-methodology',
  'path-2-qualitative-interview',
  'path-3-experimental-design',
  'path-4-archival-data'
]

async function extractPage (mcp, pageSlug) {
  const code = `
async (page) => {
  const url = '${BASE}/pages/${pageSlug}';
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  const status = res?.status?.() ?? 0;
  const title = await page.title();
  if (status >= 400 || title.toLowerCase().includes('not found')) {
    return { slug: '${pageSlug}', ok: false, status, title, text: '', html: '' };
  }
  const main = page.locator('.user_content, #wiki_page_show, .show-content').first();
  const visible = await main.isVisible().catch(() => false);
  if (!visible) {
    return { slug: '${pageSlug}', ok: false, status, title, text: '', html: '' };
  }
  const text = (await main.innerText()).trim();
  const html = await main.innerHTML();
  return { slug: '${pageSlug}', ok: true, status, title, text, html };
}
`
  const text = await mcp.callTool('browser_run_code_unsafe', { code })
  return mcp.parseResult(text)
}

async function discoverSlugs (mcp) {
  const code = `
async (page) => {
  await page.goto('${BASE}/modules', { waitUntil: 'networkidle', timeout: 30000 });
  const links = await page.locator('a[href*="/pages/"]').evaluateAll((els) =>
    els.map((a) => {
      const href = a.getAttribute('href') || '';
      const m = href.match(/\\/pages\\/([^?#/]+)/);
      return m ? { slug: decodeURIComponent(m[1]), label: (a.textContent || '').trim() } : null;
    }).filter(Boolean)
  );
  const seen = new Set();
  const out = [];
  for (const row of links) {
    if (seen.has(row.slug)) continue;
    seen.add(row.slug);
    out.push(row);
  }
  return out;
}
`
  const text = await mcp.callTool('browser_run_code_unsafe', { code })
  return mcp.parseResult(text)
}

async function main () {
  mkdirSync(OUT_DIR, { recursive: true })
  const mcp = await new PlaywrightMcpClient().init()

  console.log('Bootstrapping Canvas SSO…')
  await mcp.callTool('browser_navigate', { url: CANVAS_SSO })
  const check = await mcp.callTool('browser_run_code_unsafe', {
    code: `async (page) => ({ url: page.url(), title: await page.title() })`
  })
  const session = mcp.parseResult(check)
  if (!String(session.url).includes('instructure.com')) {
    throw new Error('Canvas SSO not ready — log in via neu1 noVNC')
  }
  console.log('Session:', session.title)

  const discovered = await discoverSlugs(mcp)
  console.log(`Discovered ${discovered.length} wiki page links from modules`)

  const slugSet = new Set(CANDIDATE_SLUGS)
  for (const row of discovered) slugSet.add(row.slug)

  const pages = []
  for (const slug of slugSet) {
    process.stdout.write(`Fetching /pages/${slug} … `)
    try {
      const row = await extractPage(mcp, slug)
      if (row.ok) {
        console.log('OK')
        writeFileSync(join(OUT_DIR, `${slug}.md`), `# ${row.title}\n\n${row.text}\n`)
      } else {
        console.log(`skip (${row.status} ${row.title})`)
      }
      pages.push(row)
    } catch (err) {
      console.log(`error: ${err.message}`)
      pages.push({ slug, ok: false, error: err.message })
    }
  }

  const payload = {
    courseId: COURSE_ID,
    fetchedAt: new Date().toISOString(),
    discoveredModulePages: discovered,
    pages: pages.filter((p) => p.ok)
  }
  writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2))
  console.log(`Wrote ${OUT_JSON} (${payload.pages.length} pages)`)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
