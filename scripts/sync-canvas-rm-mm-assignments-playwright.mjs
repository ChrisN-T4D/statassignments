#!/usr/bin/env node
/**
 * Update PSYC 4223 Canvas assignment descriptions via Playwright MCP (neu1 SSO session).
 * No CANVAS_TOKEN required when the Playwright browser is logged into Canvas.
 *
 * Usage:
 *   node scripts/sync-canvas-rm-mm-assignments-playwright.mjs          # dry-run
 *   node scripts/sync-canvas-rm-mm-assignments-playwright.mjs --apply
 */
import { PlaywrightMcpClient } from './lib/playwrightMcpClient.mjs'
import { wantedRmMmAssignments } from './lib/canvasRmMmAssignmentCopy.mjs'
import { CANVAS_RESEARCH_METHODS_COURSE_ID } from '../src/data/researchMethodsCanvasLinks.js'

const apply = process.argv.includes('--apply')
const COURSE_ID = CANVAS_RESEARCH_METHODS_COURSE_ID
const CANVAS_SSO = 'https://nwosu.instructure.com/login/saml/206'
const BASE = `https://nwosu.instructure.com/courses/${COURSE_ID}`

async function ensureCanvasSession (mcp) {
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
}

async function updateAssignment (mcp, spec) {
  const editUrl = `${BASE}/assignments/${spec.id}/edit`
  const specJson = JSON.stringify(spec)

  if (!apply) {
    console.log(`[dry-run] update assignment ${spec.id}: ${spec.name}`)
    console.log(`  edit: ${editUrl}`)
    console.log(`  description length: ${spec.description.length} chars`)
    return { ok: true, dryRun: true }
  }

  const code = `
async (page) => {
  const spec = ${specJson};
  await page.goto('${editUrl}', { waitUntil: 'networkidle', timeout: 45000 });
  if (!page.url().includes('/edit')) {
    return { ok: false, error: 'Not on edit page', url: page.url() };
  }

  await page.waitForFunction(
    () => typeof tinymce !== 'undefined' && tinymce.get('assignment_description'),
    { timeout: 20000 }
  );

  const setResult = await page.evaluate(({ name, description }) => {
    const nameInput = document.querySelector('#assignment_name');
    if (nameInput) nameInput.value = name;
    const ed = tinymce.get('assignment_description');
    if (!ed) return { ok: false, error: 'TinyMCE editor not found' };
    ed.setContent(description);
    ed.save();
    return { ok: true, descLen: document.querySelector('#assignment_description')?.value?.length || 0 };
  }, spec);

  if (!setResult.ok) {
    return { ok: false, error: setResult.error || 'Failed to set editor content', url: page.url() };
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 45000 }).catch(() => null),
    page.locator('#edit_assignment_form button.btn-primary[type="submit"]').click()
  ]);

  const verify = await page.evaluate(() => ({
    url: location.href,
    errors: [...document.querySelectorAll('.error_text, .form-errors, .ic-Flash-error')]
      .map((e) => e.textContent.trim())
      .filter(Boolean),
    nameOnPage: (document.querySelector('.title-content h1, .assignment-title h1, h1.title')?.textContent || '')
      .trim()
      .split('\\n')[0],
    bodyPreview: (document.querySelector('#assignment_show .user_content, .description .user_content')?.innerText || '').slice(0, 200)
  }));

  if (verify.url.includes('/edit') || verify.errors.length) {
    return { ok: false, error: verify.errors.join('; ') || 'Save did not leave edit page', ...verify };
  }

  return { ok: true, ...verify };
}
`

  const text = await mcp.callTool('browser_run_code_unsafe', { code })
  return mcp.parseResult(text)
}

async function main () {
  const specs = wantedRmMmAssignments()
  const mcp = await new PlaywrightMcpClient().init()
  await ensureCanvasSession(mcp)

  console.log(`\n=== Course ${COURSE_ID} Playwright ${apply ? 'APPLY' : 'DRY-RUN'} ===`)
  for (const spec of specs) {
    console.log(`\n→ ${spec.id} ${spec.name}`)
    const result = await updateAssignment(mcp, spec)
    if (result.dryRun) continue
    if (!result.ok) {
      console.error('  FAILED:', result.error || result)
      process.exitCode = 1
      continue
    }
    console.log('  updated:', result.nameOnPage || spec.name)
    console.log('  preview:', result.bodyPreview)
  }

  if (!apply) {
    console.log('\nDry-run complete. Re-run with --apply to push descriptions to Canvas.')
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
