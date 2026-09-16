#!/usr/bin/env node
/**
 * Build benchmark study guide PDFs into public/study-guides/.
 *
 *   node scripts/build-benchmark-study-guide-pdfs.mjs
 *
 * With CANVAS_TOKEN set, tries to download existing Canvas PDFs first:
 *   CANVAS_TOKEN=... node scripts/build-benchmark-study-guide-pdfs.mjs --from-canvas
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import {
  BENCHMARK_STUDY_GUIDES,
  getBenchmarkStudyGuideContent
} from '../src/data/benchmarkStudyGuides.js'
import { STATISTICS_BENCHMARK_LINKS } from '../src/data/statisticsCanvasLinks.js'
import { canvasListAll, canvasDownload } from './lib/canvasApi.js'
import { CANVAS_STATISTICS_ONLINE_COURSE_ID } from '../src/data/statisticsCanvasLinks.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'study-guides')
const fromCanvas = process.argv.includes('--from-canvas')
const onlyIdx = process.argv.findIndex((a) => a.startsWith('--only='))
const onlySlug = onlyIdx >= 0 ? process.argv[onlyIdx].slice('--only='.length) : null

const SLUG_TO_CANVAS_SEARCH = {
  'benchmark-1': ['benchmark 1 study', 'benchmark 1'],
  'benchmark-2': ['benchmark 2 study', 'benchmark 2'],
  'final-benchmark': ['final benchmark study', 'benchmark 3', 'final benchmark']
}

function sanitizeForPdf (text) {
  return String(text)
    .replace(/\u2192/g, '->')
    .replace(/\u2014/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/\u201c|\u201d/g, '"')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u03b1/g, 'alpha')
    .replace(/\u03c7/g, 'chi')
    .replace(/\u03b7/g, 'eta')
    .replace(/\u03c9/g, 'omega')
    .replace(/[^\x00-\xFF]/g, '?')
}

function wrapText (text, font, fontSize, maxWidth) {
  const words = sanitizeForPdf(text).split(/\s+/)
  const lines = []
  let line = ''
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(test, fontSize) > maxWidth) {
      if (line) lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

async function buildPdf (guide) {
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
  const margin = 54
  const pageWidth = 612
  const pageHeight = 792
  const contentWidth = pageWidth - margin * 2
  let page = doc.addPage([pageWidth, pageHeight])
  let y = pageHeight - margin

  function newPageIfNeeded (needed = 14) {
    if (y - needed < margin) {
      page = doc.addPage([pageWidth, pageHeight])
      y = pageHeight - margin
    }
  }

  function drawLines (lines, size, bold = false, color = rgb(0.1, 0.1, 0.1), leading = 4) {
    const f = bold ? fontBold : font
    for (const line of lines) {
      newPageIfNeeded(size + leading)
      page.drawText(line, { x: margin, y, size, font: f, color })
      y -= size + leading
    }
  }

  drawLines([sanitizeForPdf(guide.title)], 18, true, rgb(0.15, 0.2, 0.45))
  y -= 4
  drawLines([sanitizeForPdf(guide.subtitle)], 11, false, rgb(0.35, 0.35, 0.35))
  y -= 8
  drawLines(wrapText(guide.examNote, font, 10, contentWidth), 10, false, rgb(0.25, 0.25, 0.25))
  y -= 10

  for (const section of guide.sections) {
    y -= 6
    drawLines([sanitizeForPdf(section.heading)], 13, true)
    y -= 2
    for (const bullet of section.bullets) {
      const wrapped = wrapText(bullet, font, 10, contentWidth - 14)
      newPageIfNeeded(12 * wrapped.length)
      for (let i = 0; i < wrapped.length; i++) {
        const prefix = i === 0 ? '- ' : '  '
        page.drawText(prefix + wrapped[i], { x: margin, y, size: 10, font, color: rgb(0.15, 0.15, 0.15) })
        y -= 14
      }
    }
  }

  y -= 8
  newPageIfNeeded(30)
  drawLines(
    wrapText(
      'Methods Market: https://methods-market.clneu.com/class/statistics — Concept Review, practice tests, and Assignment Help for each module.',
      font,
      9,
      contentWidth
    ),
    9,
    false,
    rgb(0.4, 0.4, 0.4)
  )

  return doc.save()
}

async function tryDownloadFromCanvas (slug, outPath) {
  if (!process.env.CANVAS_TOKEN) return false
  const needles = SLUG_TO_CANVAS_SEARCH[slug] || [slug.replace(/-/g, ' ')]
  const courseId = CANVAS_STATISTICS_ONLINE_COURSE_ID

  const files = await canvasListAll(`/courses/${courseId}/files`, { sort: 'updated_at', order: 'desc' })
  const match = files.find((f) => {
    const name = (f.display_name || f.filename || '').toLowerCase()
    const isPdf = name.endsWith('.pdf') || f['content-type']?.includes('pdf')
    return isPdf && needles.some((n) => name.includes(n) && name.includes('study'))
  })
  if (!match?.url) return false

  console.log(`Canvas: downloading ${match.display_name || match.filename}`)
  await canvasDownload(match.url, outPath)
  return true
}

async function main () {
  mkdirSync(OUT_DIR, { recursive: true })

  for (const bench of STATISTICS_BENCHMARK_LINKS) {
    const slug = bench.slug
    if (onlySlug && slug !== onlySlug) continue
    const outName = bench.studyGuidePdf.replace(/^\/study-guides\//, '')
    const outPath = join(OUT_DIR, outName)
    let source = 'generated'

    if (fromCanvas) {
      try {
        if (await tryDownloadFromCanvas(slug, outPath)) {
          console.log(`OK ${outName} (from Canvas)`)
          continue
        }
      } catch (err) {
        console.warn(`Canvas fetch skipped for ${slug}: ${err.message}`)
      }
    }

    const guide = getBenchmarkStudyGuideContent(slug)
    if (!guide) {
      console.warn(`Skip ${slug}: no guide content`)
      continue
    }
    const bytes = await buildPdf(guide)
    writeFileSync(outPath, bytes)
    console.log(`OK ${outName} (${source})`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
