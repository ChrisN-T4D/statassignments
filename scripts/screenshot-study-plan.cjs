const { chromium } = require('playwright')
const { mkdir } = require('node:fs/promises')
const path = require('node:path')

const BASE = process.env.MM_BASE_URL || 'http://127.0.0.1:5173'
const OUT_DIR = process.env.SCREENSHOT_DIR || path.join(__dirname, '../artifacts/screenshots')

const PAGES = [
  { name: 'study-plan-hub', path: '/class/research-methods/study-plan', wait: 800 },
  { name: 'study-plan-article-review', path: '/class/research-methods/study-plan/article-review', wait: 1200 },
  { name: 'study-plan-study-focus', path: '/class/research-methods/study-plan/study-focus', wait: 800 },
  { name: 'study-plan-phase-3', path: '/class/research-methods/study-plan/phase-3', wait: 800 },
  { name: 'study-plan-phase-4', path: '/class/research-methods/study-plan/phase-4', wait: 1200 }
]

async function seedAuth (page) {
  await page.addInitScript(() => {
    localStorage.setItem('pb_auth_token', 'screenshot-demo-token')
    localStorage.setItem('pb_auth_record', JSON.stringify({
      id: 'screenshot-demo',
      email: 'instructor@demo.local',
      role: 'instructor',
      name: 'Demo Instructor'
    }))
    localStorage.setItem('theme', 'dark')
  })
}

async function main () {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: 'dark'
  })
  const page = await context.newPage()
  await seedAuth(page)

  const saved = []
  for (const { name, path: route, wait } of PAGES) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(wait)
    const file = path.join(OUT_DIR, `${name}.png`)
    await page.screenshot({ path: file, fullPage: true })
    saved.push(file)
    console.log('saved', file)
  }

  await browser.close()
  console.log(JSON.stringify({ saved, count: saved.length }))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
