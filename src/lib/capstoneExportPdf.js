/**
 * Client-side PDF export for Study Plan sections (browser download).
 */

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { buildExportText } from './capstoneValidation.js'

const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const MARGIN = 54

function sanitizeForPdf (text) {
  return String(text)
    .replace(/\u2192/g, '->')
    .replace(/\u2014/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/\u201c|\u201d/g, '"')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/[^\x00-\xFF]/g, '?')
}

function wrapText (text, font, fontSize, maxWidth) {
  const words = sanitizeForPdf(text).split(/\s+/).filter(Boolean)
  if (!words.length) return ['']
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

function sectionFilename (sectionId) {
  const stamp = new Date().toISOString().slice(0, 10)
  return `study-plan-${sectionId}-${stamp}.pdf`
}

/**
 * @param {string} sectionId
 * @param {object} project
 * @returns {Promise<Uint8Array>}
 */
export async function buildStudyPlanPdfBytes (sectionId, project) {
  const body = buildExportText(sectionId, project)
  if (!body.trim()) {
    throw new Error('Nothing to export yet — add some content first.')
  }

  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
  const contentWidth = PAGE_WIDTH - MARGIN * 2
  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  let y = PAGE_HEIGHT - MARGIN

  function newPageIfNeeded (needed = 14) {
    if (y - needed < MARGIN) {
      page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
      y = PAGE_HEIGHT - MARGIN
    }
  }

  function drawWrapped (text, size, bold = false) {
    const f = bold ? fontBold : font
    for (const line of wrapText(text, f, size, contentWidth)) {
      newPageIfNeeded(size + 4)
      page.drawText(line, { x: MARGIN, y, size, font: f, color: rgb(0.12, 0.12, 0.12) })
      y -= size + 4
    }
  }

  const lines = body.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const next = (lines[i + 1] ?? '').trim()

    if (/^=+$/.test(line.trim())) continue

    if (/^=+$/.test(next)) {
      y -= 6
      drawWrapped(line.trim(), 12, true)
      i++
      continue
    }

    if (!line.trim()) {
      y -= 8
      continue
    }

    drawWrapped(line.trim(), 10, false)
  }

  y -= 8
  newPageIfNeeded(24)
  drawWrapped(
    'Draft exported from Methods Market Study Plan. Paste sections into Canvas or keep as your working copy. Attach article PDFs separately in Canvas.',
    8,
    false
  )

  return doc.save()
}

/**
 * @param {string} sectionId
 * @param {object} project
 * @param {string} [filename]
 */
export async function downloadStudyPlanPdf (sectionId, project, filename) {
  const bytes = await buildStudyPlanPdfBytes(sectionId, project)
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || sectionFilename(sectionId)
  a.click()
  URL.revokeObjectURL(url)
}
