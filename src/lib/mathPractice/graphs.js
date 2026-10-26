/**
 * Tiny SVG chart builders for the "reading graphs" practice questions.
 * Output is a self-contained <svg> string built only from numbers and the fixed labels passed in by
 * generators.js, so it is safe to render with v-html. Colors use CSS variables so dark mode works.
 */

const W = 380
const H = 240
const PAD = { l: 52, r: 16, t: 28, b: 54 }

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

function frame(title, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" style="width:100%;max-width:440px;height:auto;font-family:system-ui,sans-serif;font-size:11px">
<title>${esc(title)}</title>${inner}</svg>`
}

function axes({ yTicks, yMin, yMax, yLabel, xLabel }) {
  const plotH = H - PAD.t - PAD.b
  const y = (v) => PAD.t + plotH * (1 - (v - yMin) / (yMax - yMin))
  let s = `<rect x="0" y="0" width="${W}" height="${H}" fill="var(--bg-card,#fff)"/>`
  for (const t of yTicks) {
    s += `<line x1="${PAD.l}" y1="${y(t)}" x2="${W - PAD.r}" y2="${y(t)}" stroke="var(--border,#ddd)" stroke-width="1"/>`
    s += `<text x="${PAD.l - 6}" y="${y(t) + 4}" text-anchor="end" fill="var(--text-secondary,#555)">${t}</text>`
  }
  s += `<line x1="${PAD.l}" y1="${PAD.t}" x2="${PAD.l}" y2="${H - PAD.b}" stroke="var(--text-secondary,#555)"/>`
  s += `<line x1="${PAD.l}" y1="${H - PAD.b}" x2="${W - PAD.r}" y2="${H - PAD.b}" stroke="var(--text-secondary,#555)"/>`
  if (yLabel) s += `<text x="14" y="${PAD.t + plotH / 2}" text-anchor="middle" transform="rotate(-90 14 ${PAD.t + plotH / 2})" fill="var(--text-secondary,#555)">${esc(yLabel)}</text>`
  if (xLabel) s += `<text x="${(PAD.l + W - PAD.r) / 2}" y="${H - 6}" text-anchor="middle" fill="var(--text-secondary,#555)">${esc(xLabel)}</text>`
  return { svg: s, y }
}

function ticks(min, max, step) {
  const out = []
  for (let v = min; v <= max + 1e-9; v += step) out.push(Math.round(v * 100) / 100)
  return out
}

export function barChartSvg({ labels, values, yLabel, min = 0, max = 60, step = 10, title = 'Bar chart' }) {
  const { svg, y } = axes({ yTicks: ticks(min, max, step), yMin: min, yMax: max, yLabel })
  const plotW = W - PAD.l - PAD.r
  const slot = plotW / labels.length
  const bw = slot * 0.6
  let bars = ''
  labels.forEach((lab, i) => {
    const x = PAD.l + slot * i + (slot - bw) / 2
    const top = y(values[i])
    bars += `<rect x="${x}" y="${top}" width="${bw}" height="${H - PAD.b - top}" fill="var(--primary,#4f46e5)" rx="2"/>`
    bars += `<text x="${x + bw / 2}" y="${H - PAD.b + 16}" text-anchor="middle" fill="var(--text-primary,#111)">${esc(lab)}</text>`
  })
  return frame(title, svg + bars)
}

export function scatterSvg({ points, xLabel, yLabel, max = 10 }) {
  const { svg, y } = axes({ yTicks: ticks(0, max, 2), yMin: 0, yMax: max, yLabel, xLabel })
  const plotW = W - PAD.l - PAD.r
  const x = (v) => PAD.l + (plotW * v) / max
  let s = svg
  for (const t of ticks(0, max, 2)) {
    s += `<text x="${x(t)}" y="${H - PAD.b + 14}" text-anchor="middle" fill="var(--text-secondary,#555)">${t}</text>`
    s += `<line x1="${x(t)}" y1="${PAD.t}" x2="${x(t)}" y2="${H - PAD.b}" stroke="var(--border,#ddd)" stroke-width="1"/>`
  }
  for (const p of points) {
    s += `<circle cx="${x(p.x)}" cy="${y(p.y)}" r="5" fill="var(--primary,#4f46e5)"/>`
    s += `<text x="${x(p.x) + 8}" y="${y(p.y) - 6}" fill="var(--text-primary,#111)" font-weight="600">${esc(p.l)}</text>`
  }
  return frame('Scatterplot', s)
}

export function histogramSvg({ edges, counts, xLabel, yLabel, max = 10, title = 'Histogram' }) {
  const { svg, y } = axes({ yTicks: ticks(0, max, 2), yMin: 0, yMax: max, yLabel, xLabel })
  const plotW = W - PAD.l - PAD.r
  const bw = plotW / counts.length
  let s = svg
  counts.forEach((c, i) => {
    const x = PAD.l + bw * i
    s += `<rect x="${x}" y="${y(c)}" width="${bw}" height="${H - PAD.b - y(c)}" fill="var(--primary,#4f46e5)" stroke="var(--bg-card,#fff)" stroke-width="1"/>`
  })
  edges.forEach((e, i) => {
    s += `<text x="${PAD.l + bw * i}" y="${H - PAD.b + 14}" text-anchor="middle" fill="var(--text-secondary,#555)">${e}</text>`
  })
  return frame(title, s)
}
