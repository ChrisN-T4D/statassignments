/**
 * Phase 7: clicks-to-task for six student tasks, run as a NON-admin student.
 *
 *   BASE=https://mm-dev.lab.clneu.com EMAIL=test.student@example.edu PW_FILE=/tmp/pw.txt \
 *     node click-count.cjs
 *
 * Needs playwright-core and a chromium (run it inside the openclaw-gateway:chromium image, see
 * docs/STUDENT-NAVIGATION-PLAN.md). Every task starts from the page the student lands on after
 * login. A click is one link/button press; typing and scrolling are not counted. Exit code 1 if a
 * task fails or goes over budget, so it can run after each navigation change.
 */
const fs = require('fs')
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/app/node_modules/playwright-core')

const BASE = process.env.BASE || 'https://mm-dev.lab.clneu.com'
if (!process.env.EMAIL || !process.env.PW_FILE) {
  console.error('Set EMAIL and PW_FILE (path to a file holding the password)')
  process.exit(2)
}
const EMAIL = process.env.EMAIL
const PW = fs.readFileSync(process.env.PW_FILE, 'utf8').trim()
const CLASS = process.env.CLASS_SLUG || 'research-methods'

// step: { click: <playwright selector> } ; done: selector or text that must be visible at the end
const TASKS = [
  { id: 1, name: 'See what is due this week', budget: 0, steps: [], done: 'text=/Due \\w+, \\w+ \\d+/' },
  { id: 2, name: 'Start this week\'s reading', budget: 1, steps: [{ click: '.rm-week a.rm-item-read' }], done: '.wcb' },
  { id: 3, name: 'Find help for this week\'s assignment', budget: 1, steps: [{ click: '.rm-week a.rm-item-help' }], done: 'text=/Need help|Still stuck|Tips/i' },
  { id: 4, name: 'Open a Concept Review and see what comes next', budget: 1, steps: [{ click: '.rm-week a.rm-item-check' }], done: '.wcb-next' },
  { id: 5, name: 'Open a software guide, then return to the week', budget: 2, steps: [{ click: 'a:has-text("Jamovi guides")' }, { click: '.wcb-week' }], done: '.rm-week' },
  { id: 6, name: 'Find the FAQ and instructor contact', budget: 2, steps: [{ click: 'button:has-text("Menu")' }, { click: 'a:has-text("stuck")' }], done: 'a[href^="mailto:"]' }
]

;(async () => {
  let browser
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] })
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(`${BASE}/auth`, { waitUntil: 'networkidle' })
  await page.fill('input[type=email]', EMAIL)
  await page.fill('input[type=password]', PW)
  await page.click('button[type=submit]')
  await page.waitForURL((u) => !u.pathname.startsWith('/auth'), { timeout: 15000 })
  await page.waitForSelector('.rm-week', { timeout: 15000 })
  const landing = page.url()
  console.log(`Landing page after login: ${landing.replace(BASE, '')}`)

  let failed = false
  const selected = TASKS.filter((x) => !process.env.ONLY || String(x.id) === process.env.ONLY)
  if (!selected.length) {
    console.error(`No task matches ONLY=${process.env.ONLY}`)
    await browser.close()
    process.exit(2)
  }
  for (const t of selected) {
    let clicks = 0
    let error = ''
    try {
      await page.goto(landing, { waitUntil: 'networkidle' })
      await page.waitForSelector('.rm-week', { timeout: 15000 })
      for (const s of t.steps) {
        await page.locator(s.click).first().click({ timeout: 5000 })
        clicks += 1
        await page.waitForTimeout(700)
      }
      await page.locator(t.done).first().waitFor({ state: 'visible', timeout: 5000 })
    } catch (e) {
      error = `${String(e.message).split('\n').slice(0, 6).join(' ')} (at ${page.url().replace(BASE, '')})`
    }
    const over = clicks > t.budget
    const ok = !error && !over
    if (!ok) failed = true
    console.log(`${ok ? 'PASS' : 'FAIL'}  T${t.id} ${t.name}: ${clicks} click${clicks === 1 ? '' : 's'} (budget ${t.budget})${error ? ' | ' + error : ''}`)
  }
  await browser.close()
  process.exit(failed ? 1 : 0)
})().catch((e) => {
  console.error(e.message)
  process.exit(2)
})
