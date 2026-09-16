#!/usr/bin/env node
/**
 * Fetch Benchmark study guide PDFs from Canvas course 3177 via Playwright MCP (neu1).
 *
 * Requires Playwright MCP with an authenticated Canvas profile:
 *   http://192.168.50.194:8931/mcp
 *
 *   node scripts/fetch-canvas-benchmark-study-guides-playwright.mjs
 *
 * Canvas pages (when present):
 *   benchmark-1  -> /pages/study-guide
 *   benchmark-2  -> /pages/benchmark-2-study-guide
 *   final-benchmark -> no Canvas page; keeps generated PDF (see build script)
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { PlaywrightMcpClient } from './lib/playwrightMcpClient.mjs'
import { CANVAS_STATISTICS_ONLINE_COURSE_ID } from '../src/data/statisticsCanvasLinks.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'study-guides')
const COURSE_ID = CANVAS_STATISTICS_ONLINE_COURSE_ID
const CANVAS_SSO = 'https://nwosu.instructure.com/login/saml/206'

/** slug -> Canvas wiki page slug (null = no Canvas page; keep/build generated). */
const CANVAS_PAGE_BY_SLUG = {
  'benchmark-1': 'study-guide',
  'benchmark-2': 'benchmark-2-study-guide',
  'final-benchmark': null
}

const OUT_NAME_BY_SLUG = {
  'benchmark-1': 'benchmark-1-study-guide.pdf',
  'benchmark-2': 'benchmark-2-study-guide.pdf',
  'final-benchmark': 'final-benchmark-study-guide.pdf'
}

async function exportCanvasPagePdf (mcp, pageSlug) {
  const code = `
async (page) => {
  await page.goto('https://nwosu.instructure.com/courses/${COURSE_ID}/pages/${pageSlug}', { waitUntil: 'networkidle' });
  const main = page.locator('.user_content, #wiki_page_show, .show-content').first();
  await main.waitFor({ state: 'visible', timeout: 20000 });
  const title = await page.title();
  const bytes = await page.pdf({
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' }
  });
  return { title, bytes: Array.from(bytes) };
}
`
  const text = await mcp.callTool('browser_run_code_unsafe', { code })
  return mcp.parseResult(text)
}

function buildGeneratedFinal () {
  const r = spawnSync(
    process.execPath,
    ['scripts/build-benchmark-study-guide-pdfs.mjs', '--only=final-benchmark'],
    { cwd: join(__dirname, '..'), encoding: 'utf8' }
  )
  if (r.status !== 0) {
    throw new Error(r.stderr || r.stdout || 'build-benchmark-study-guide-pdfs failed')
  }
}

async function main () {
  mkdirSync(OUT_DIR, { recursive: true })
  const mcp = await new PlaywrightMcpClient().init()

  console.log('Bootstrapping Canvas SSO session…')
  await mcp.callTool('browser_navigate', { url: CANVAS_SSO })

  const check = await mcp.callTool('browser_run_code_unsafe', {
    code: `async (page) => ({ url: page.url(), title: await page.title() })`
  })
  const session = mcp.parseResult(check)
  if (!String(session.url).includes('instructure.com')) {
    throw new Error(
      'Canvas SSO did not complete. Log in via noVNC: http://192.168.50.194:6081/vnc.html?autoconnect=1&resize=scale'
    )
  }
  console.log('Canvas session:', session.title)

  for (const [slug, pageSlug] of Object.entries(CANVAS_PAGE_BY_SLUG)) {
    const outName = OUT_NAME_BY_SLUG[slug]
    const outPath = join(OUT_DIR, outName)

    if (!pageSlug) {
      console.log(`${slug}: no Canvas study guide page — generating ${outName}`)
      buildGeneratedFinal()
      continue
    }

    console.log(`${slug}: exporting Canvas page /pages/${pageSlug}…`)
    const { title, bytes } = await exportCanvasPagePdf(mcp, pageSlug)
    writeFileSync(outPath, Buffer.from(bytes))
    console.log(`OK ${outName} (${bytes.length} bytes) from "${title}"`)
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
