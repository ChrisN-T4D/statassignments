/**
 * Campus roster sampling simulation — pure functions for RM + Stats labs.
 */

export const N_DORMS = 40
export const N_STRATA = 4
export const SAMPLING_METHOD_KEYS = [
  'srs',
  'strat',
  'clust',
  'sys',
  'stage',
  'conv',
  'quota',
  'purposive',
]

export const SAMPLING_PLAN_META = {
  srs: {
    shortTitle: 'SRS',
    random: true,
    blurb: 'Every set of n* students equally likely (simple random sample).',
    howItWorks:
      'Each student on the roster gets the same chance to be picked. The simulation draws n* distinct people at random without replacement.',
    panelClass: 'samp-hist-srs',
    rectClass: 'samp-hist-rect-srs',
  },
  strat: {
    shortTitle: 'Stratified',
    random: true,
    blurb: 'Proportional n* from each class year, then SRS within year.',
    howItWorks:
      'The roster is grouped by class year. The sample size from each year matches its share of campus, then students are chosen randomly within each year.',
    panelClass: 'samp-hist-strat',
    rectClass: 'samp-hist-rect-strat',
  },
  clust: {
    shortTitle: 'Cluster (one-stage)',
    random: true,
    blurb: 'Random dorms; everyone in chosen halls (n* students total).',
    howItWorks:
      'A random set of dorms is chosen first; everyone living in those buildings is included.',
    panelClass: 'samp-hist-clust',
    rectClass: 'samp-hist-rect-clust',
  },
  sys: {
    shortTitle: 'Systematic',
    random: true,
    blurb: 'Random list start, then every kth student so n* fits the roster.',
    howItWorks:
      'After a random starting row on the ordered registrar list, the simulation takes every kth student until n* people are included.',
    panelClass: 'samp-hist-sys',
    rectClass: 'samp-hist-rect-sys',
  },
  stage: {
    shortTitle: 'Multi-stage',
    random: true,
    blurb: 'Random dorms, then SRS of n* from students in those halls only.',
    howItWorks:
      'First a random subset of dorms is selected, then n* students are drawn at random only from people in those halls.',
    panelClass: 'samp-hist-stage',
    rectClass: 'samp-hist-rect-stage',
  },
  conv: {
    shortTitle: 'Convenience',
    random: false,
    blurb: 'The first n* list positions—no skipping, no balancing across class years.',
    howItWorks:
      'Literally the first n* names on the registrar list: everyone in list positions 1…n* is in the sample.',
    panelClass: 'samp-hist-conv',
    rectClass: 'samp-hist-rect-conv',
  },
  quota: {
    shortTitle: 'Quota (list order)',
    random: false,
    blurb: 'Correct counts per class year, but who fills those slots is whoever appears first while you walk the list.',
    howItWorks:
      'You fix how many frosh, soph, … you want—but you read the list from the top and take the next person whose class-year quota still has room; otherwise you skip them.',
    panelClass: 'samp-hist-quota',
    rectClass: 'samp-hist-rect-quota',
  },
  purposive: {
    shortTitle: 'Purposive',
    random: false,
    blurb: 'The n* students with the highest scores (judgment sample).',
    howItWorks:
      'The researcher deliberately chooses the n* highest scores on the roster. That pulls the upper tail of scores.',
    panelClass: 'samp-hist-purposive',
    rectClass: 'samp-hist-rect-purposive',
  },
}

export const SAMPLING_POP_GRID_MAX = 200
export const SAMPLING_POP_PREVIEW_HARD_CAP = 420

export const STRATUM_NAMES = ['Freshman', 'Sophomore', 'Junior', 'Senior']

export function mean(arr) {
  if (!arr?.length) return 0
  return arr.reduce((s, x) => s + x, 0) / arr.length
}

export function stdev(arr) {
  if (arr.length < 2) return 0
  const m = mean(arr)
  const v = arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1)
  return Math.sqrt(v)
}

export function clampScore(x) {
  return Math.max(10, Math.min(100, x))
}

export function scoreColor(score) {
  const t = Math.max(0, Math.min(1, (score - 10) / 90))
  const h = 210 - t * 150
  const s = 55 + t * 25
  const l = 38 + t * 12
  return `hsl(${h} ${s}% ${l}%)`
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

export function shuffle(arr) {
  const copy = [...arr]
  shuffleInPlace(copy)
  return copy
}

function campusClusterSize(N) {
  return Math.max(1, Math.floor(N / N_DORMS))
}

export function generateCampusPopulation(Nraw) {
  const m = campusClusterSize(Nraw)
  const Nuse = N_DORMS * m
  const stratumMeans = [44, 50, 56, 62]
  const clusterEffect = Array.from({ length: N_DORMS }, () => (Math.random() - 0.5) * 10)
  const people = []
  for (let c = 0; c < N_DORMS; c++) {
    const dorm = []
    for (let j = 0; j < m; j++) {
      const stratum = j % N_STRATA
      const score = clampScore(
        stratumMeans[stratum] + clusterEffect[c] + (Math.random() - 0.5) * 12
      )
      const sex = Math.random() < 0.5 ? 'M' : 'F'
      const age = 18 + Math.floor(Math.random() * 7)
      dorm.push({ score, stratum, cluster: c, sex, age })
    }
    shuffleInPlace(dorm)
    for (const p of dorm) {
      p.rosterIndex = people.length
      people.push(p)
    }
  }
  return { people, Nuse, m }
}

export function meanPeople(arr) {
  if (!arr?.length) return 0
  return mean(arr.map((p) => p.score))
}

export function allocateProportional(counts, n) {
  const Ntot = counts.reduce((a, b) => a + b, 0)
  if (Ntot === 0) return counts.map(() => 0)
  const exact = counts.map((c) => (n * c) / Ntot)
  const base = exact.map((x) => Math.floor(x))
  let leftover = n - base.reduce((a, b) => a + b, 0)
  const rem = exact.map((x, i) => ({ i, r: x - Math.floor(x) })).sort((a, b) => b.r - a.r)
  for (let k = 0; k < leftover; k++) base[rem[k % rem.length].i]++
  return base
}

function sampleSRSIndices(N, n) {
  const idx = new Set()
  while (idx.size < n) {
    idx.add(Math.floor(Math.random() * N))
  }
  return [...idx]
}

export function sampleSRSFromPeople(people, n) {
  return sampleSRSDetailed(people, n).selected
}

/** SRS with step-by-step animation (random draws until n* distinct people). */
export function sampleSRSDetailed(people, n) {
  const N = people.length
  const target = Math.min(n, N)
  const selected = []
  const selectedSet = new Set()
  const steps = []

  while (selected.length < target) {
    const idx = Math.floor(Math.random() * N)
    if (selectedSet.has(idx)) {
      steps.push({ rosterIndex: idx, action: 'retry' })
    } else {
      selectedSet.add(idx)
      selected.push(people[idx])
      steps.push({ rosterIndex: idx, action: 'in', pick: selected.length })
    }
  }

  return {
    selected,
    rosterOrder: selected.map((p) => p.rosterIndex),
    skippedIndices: [],
    steps,
  }
}

export function sampleStratified(people, n) {
  return sampleStratifiedDetailed(people, n).selected
}

/** Stratified sample with stratum-by-stratum animation steps. */
export function sampleStratifiedDetailed(people, n) {
  const byS = Array.from({ length: N_STRATA }, () => [])
  for (const p of people) byS[p.stratum].push(p)
  const counts = byS.map((a) => a.length)
  const alloc = allocateProportional(counts, n)
  const out = []
  const steps = []
  for (let s = 0; s < N_STRATA; s++) {
    const pool = [...byS[s]]
    shuffleInPlace(pool)
    for (const p of pool.slice(0, alloc[s])) {
      out.push(p)
      steps.push({ rosterIndex: p.rosterIndex, action: 'in', pick: out.length, stratum: s })
    }
  }
  return {
    selected: out,
    rosterOrder: out.map((p) => p.rosterIndex),
    skippedIndices: [],
    steps,
  }
}

export function sampleCluster(people, k) {
  const ids = [...Array(N_DORMS).keys()]
  shuffleInPlace(ids)
  const chosen = new Set(ids.slice(0, k))
  return people.filter((p) => chosen.has(p.cluster))
}

export function sampleConvenience(people, n) {
  return people.slice(0, n)
}

export function sampleSystematic(people, n) {
  return sampleSystematicDetailed(people, n).selected
}

/** Systematic sample: random start, then every k-th roster position. */
export function sampleSystematicDetailed(people, n) {
  const N = people.length
  if (n >= N) {
    const steps = people.map((p, i) => ({
      rosterIndex: p.rosterIndex,
      action: 'in',
      pick: i + 1,
    }))
    return {
      selected: [...people],
      rosterOrder: people.map((p) => p.rosterIndex),
      skippedIndices: [],
      steps,
    }
  }
  const interval = Math.floor(N / n)
  if (interval < 1) return sampleSRSDetailed(people, n)
  const maxStart = N - 1 - (n - 1) * interval
  const start = maxStart >= 0 ? Math.floor(Math.random() * (maxStart + 1)) : 0
  const out = []
  const steps = []
  for (let i = 0; i < n; i++) {
    const p = people[start + i * interval]
    out.push(p)
    steps.push({
      rosterIndex: p.rosterIndex,
      action: 'in',
      pick: i + 1,
      sysStart: i === 0,
      sysInterval: interval,
    })
  }
  return {
    selected: out,
    rosterOrder: out.map((p) => p.rosterIndex),
    skippedIndices: [],
    steps,
  }
}

export function sampleMultistage(people, k, n) {
  const ids = [...Array(N_DORMS).keys()]
  shuffleInPlace(ids)
  const chosen = new Set(ids.slice(0, k))
  const pool = people.filter((p) => chosen.has(p.cluster))
  return sampleSRSFromPeople(pool, Math.min(n, pool.length))
}

export function sampleQuotaDetailed(people, n) {
  const byS = Array.from({ length: N_STRATA }, () => [])
  for (const p of people) byS[p.stratum].push(p)
  const counts = byS.map((a) => a.length)
  const alloc = allocateProportional(counts, n)
  const got = Array(N_STRATA).fill(0)
  const out = []
  const skippedIndices = []
  const steps = []
  let lastCheckedRosterIndex = -1
  for (const p of people) {
    if (out.length >= n) break
    lastCheckedRosterIndex = p.rosterIndex
    const s = p.stratum
    if (got[s] < alloc[s]) {
      out.push(p)
      got[s]++
      steps.push({
        rosterIndex: p.rosterIndex,
        action: 'in',
        pick: out.length,
        stratum: s,
        stratumSlot: got[s],
        stratumTarget: alloc[s],
      })
    } else {
      skippedIndices.push(p.rosterIndex)
      steps.push({ rosterIndex: p.rosterIndex, action: 'skip', stratum: s })
    }
  }
  const inSampleByStratum = [0, 0, 0, 0]
  for (const p of out) {
    if (typeof p.stratum === 'number' && p.stratum >= 0 && p.stratum < N_STRATA) {
      inSampleByStratum[p.stratum]++
    }
  }
  return {
    selected: out,
    skippedIndices,
    lastCheckedRosterIndex,
    targetByStratum: alloc,
    inSampleByStratum,
    checkedSlots: out.length + skippedIndices.length,
    steps,
  }
}

export function sampleQuota(people, n) {
  return sampleQuotaDetailed(people, n).selected
}

export function samplePurposiveHigh(people, n) {
  return [...people].sort((a, b) => b.score - a.score).slice(0, n)
}

export function clusterKForSample(nTarget, dormSize) {
  return Math.min(N_DORMS, Math.max(1, Math.ceil(nTarget / dormSize)))
}

export function sampleDrawForMethod(method, people, nTarget, k) {
  switch (method) {
    case 'srs':
      return sampleSRSFromPeople(people, nTarget)
    case 'strat':
      return sampleStratified(people, nTarget)
    case 'clust':
      return sampleCluster(people, k)
    case 'sys':
      return sampleSystematic(people, nTarget)
    case 'stage':
      return sampleMultistage(people, k, nTarget)
    case 'conv':
      return sampleConvenience(people, nTarget)
    case 'quota':
      return sampleQuota(people, nTarget)
    case 'purposive':
      return samplePurposiveHigh(people, nTarget)
    default:
      return sampleSRSFromPeople(people, nTarget)
  }
}

/**
 * Draw with animation steps for UI walkthrough.
 * @returns {{ selected, rosterOrder, skippedIndices, steps, quotaMeta, convenienceMeta, clusterBlocks }}
 */
export function sampleDrawDetailed(method, people, nTarget, k) {
  if (method === 'quota') {
    const detail = sampleQuotaDetailed(people, nTarget)
    return {
      selected: detail.selected,
      rosterOrder: detail.selected.map((p) => p.rosterIndex),
      skippedIndices: detail.skippedIndices,
      steps: detail.steps,
      quotaMeta: {
        n: nTarget,
        checkedSlots: detail.checkedSlots,
        skipped: detail.skippedIndices.length,
        lastRosterIndex: detail.lastCheckedRosterIndex,
        lastRosterDisplay: detail.lastCheckedRosterIndex + 1,
        targetByStratum: [...detail.targetByStratum],
        inSampleByStratum: [...detail.inSampleByStratum],
      },
      convenienceMeta: null,
      clusterBlocks: null,
    }
  }

  if (method === 'conv') {
    const selected = sampleConvenience(people, nTarget)
    const steps = []
    for (let i = 0; i < Math.min(nTarget, people.length); i++) {
      steps.push({ rosterIndex: i, action: 'in', pick: i + 1 })
    }
    return {
      selected,
      rosterOrder: selected.map((p) => p.rosterIndex),
      skippedIndices: [],
      steps,
      quotaMeta: null,
      convenienceMeta: { n: nTarget },
      clusterBlocks: null,
    }
  }

  if (method === 'clust') {
    const ids = shuffle([...Array(N_DORMS).keys()])
    const chosen = ids.slice(0, k)
    const chosenSet = new Set(chosen)
    const selected = people.filter((p) => chosenSet.has(p.cluster))
    const clusterBlocks = chosen.map((clusterId) => ({
      clusterId,
      rosterIndices: people.filter((p) => p.cluster === clusterId).map((p) => p.rosterIndex),
    }))
    const steps = clusterBlocks.map((block) => ({
      type: 'block',
      rosterIndices: block.rosterIndices,
      action: 'in',
      clusterId: block.clusterId,
    }))
    return {
      selected,
      rosterOrder: selected.map((p) => p.rosterIndex),
      skippedIndices: [],
      steps,
      quotaMeta: null,
      convenienceMeta: null,
      clusterBlocks,
    }
  }

  if (method === 'stage') {
    const ids = shuffle([...Array(N_DORMS).keys()])
    const chosenSet = new Set(ids.slice(0, k))
    const pool = people.filter((p) => chosenSet.has(p.cluster))
    const clusterBlocks = [...chosenSet].map((clusterId) => ({
      clusterId,
      rosterIndices: people.filter((p) => p.cluster === clusterId).map((p) => p.rosterIndex),
    }))
    const stageDraw = sampleSRSDetailed(pool, Math.min(nTarget, pool.length))
    const selected = stageDraw.selected
    const blockSteps = clusterBlocks.map((block) => ({
      type: 'block',
      rosterIndices: block.rosterIndices,
      action: 'stage-pool',
      clusterId: block.clusterId,
    }))
    const stage2Steps = stageDraw.steps.map((s) => ({ ...s, stage: 2 }))
    return {
      selected,
      rosterOrder: selected.map((p) => p.rosterIndex),
      skippedIndices: stageDraw.skippedIndices || [],
      steps: [...blockSteps, ...stage2Steps],
      quotaMeta: null,
      convenienceMeta: null,
      clusterBlocks,
    }
  }

  if (method === 'purposive') {
    const sorted = [...people].sort((a, b) => b.score - a.score)
    const selected = sorted.slice(0, nTarget)
    const steps = selected.map((p, rank) => ({
      rosterIndex: p.rosterIndex,
      action: 'in',
      rank: rank + 1,
    }))
    return {
      selected,
      rosterOrder: selected.map((p) => p.rosterIndex),
      skippedIndices: [],
      steps,
      quotaMeta: null,
      convenienceMeta: null,
      clusterBlocks: null,
    }
  }

  let detail
  if (method === 'strat') {
    detail = sampleStratifiedDetailed(people, nTarget)
  } else if (method === 'sys') {
    detail = sampleSystematicDetailed(people, nTarget)
  } else {
    detail = sampleSRSDetailed(people, nTarget)
  }

  return {
    selected: detail.selected,
    rosterOrder: detail.rosterOrder,
    skippedIndices: detail.skippedIndices,
    steps: detail.steps,
    quotaMeta: null,
    convenienceMeta: null,
    clusterBlocks: null,
  }
}

export function meanStatsForDraws(means, popMean) {
  if (!means?.length) return { meanOfMeans: 0, bias: 0, sd: 0, n: 0 }
  const m = mean(means)
  return { meanOfMeans: m, bias: m - popMean, sd: stdev(means), n: means.length }
}

export function isListWalkMethod(method) {
  return method === 'quota' || method === 'conv'
}

/** Full-roster grid columns — cell (row,col) maps to roster row (row * cols + col + 1). */
export const ROSTER_POS_COLS = 80

export function usesRosterPositionGrid(method) {
  return !isListWalkMethod(method)
}

/**
 * One slot per roster row, laid out in list order (left→right, top→bottom).
 * Selected rows appear at their true list position — not appended after a prefix block.
 */
export function buildRosterPositionGrid(
  lastPeople,
  highlightSet,
  skipSet,
  extraIndices = null,
  cols = ROSTER_POS_COLS
) {
  const N = lastPeople.length
  if (!N) return { cells: [], cols, rows: 0, mode: 'position', truncated: false }

  const hi = new Set()
  const sk = new Set()
  const extra = new Set()
  addValidRosterIndices(highlightSet, N, hi)
  addValidRosterIndices(skipSet, N, sk)
  addValidRosterIndices(extraIndices, N, extra)

  const cells = []
  for (let i = 0; i < N; i++) {
    const p = lastPeople[i]
    cells.push({
      rosterIndex: i,
      pos: i + 1,
      score: p.score,
      sex: p.sex ?? '—',
      age: p.age ?? '—',
      stratum: typeof p.stratum === 'number' ? p.stratum : 0,
      cluster: p.cluster,
      col: i % cols,
      row: Math.floor(i / cols),
      inSample: hi.has(i),
      skipped: sk.has(i),
      emphasized: extra.has(i),
    })
  }
  return {
    cells,
    cols,
    rows: Math.ceil(N / cols),
    mode: 'position',
    truncated: false,
  }
}

/** Binned roster strip — each bin’s horizontal position matches its segment of the list (1…N). */
export function buildRosterHeatmapBins(
  lastPeople,
  highlightSet,
  skipSet,
  pulseIndex = null,
  binCount = 120,
  poolSet = null
) {
  const N = lastPeople.length
  if (!N) return []

  const hi = new Set()
  const sk = new Set()
  const pool = new Set()
  addValidRosterIndices(highlightSet, N, hi)
  addValidRosterIndices(skipSet, N, sk)
  addValidRosterIndices(poolSet, N, pool)

  const bins = []
  for (let b = 0; b < binCount; b++) {
    const lo = Math.floor((b * N) / binCount)
    const hiRoster = Math.min(N - 1, Math.floor(((b + 1) * N) / binCount) - 1)
    let scoreSum = 0
    let n = 0
    let inCount = 0
    let skipCount = 0
    let poolCount = 0
    for (let i = lo; i <= hiRoster; i++) {
      scoreSum += lastPeople[i].score
      n++
      if (hi.has(i)) inCount++
      if (sk.has(i)) skipCount++
      if (pool.has(i) && !hi.has(i)) poolCount++
    }
    const parts = [`List rows ${lo + 1}–${hiRoster + 1}`]
    if (inCount) parts.push(`${inCount} in sample`)
    if (poolCount) parts.push(`${poolCount} in stage-1 pool`)
    if (skipCount) parts.push(`${skipCount} passed over`)
    bins.push({
      b,
      lo,
      hi: hiRoster,
      avgScore: n ? scoreSum / n : 0,
      inSample: inCount > 0,
      inCount,
      inPool: poolCount > 0,
      poolCount,
      skipped: skipCount > 0,
      skipCount,
      isPulse:
        pulseIndex != null &&
        Number.isFinite(pulseIndex) &&
        pulseIndex >= lo &&
        pulseIndex <= hiRoster,
      title: parts.join(' · '),
    })
  }
  return bins
}

function samplingPopGridCells(lastPeople, sortedIndices) {
  return sortedIndices.map((rosterIdx) => {
    const p = lastPeople[rosterIdx]
    return {
      rosterIndex: rosterIdx,
      pos: rosterIdx + 1,
      score: p.score,
      sex: p.sex ?? '—',
      age: p.age ?? '—',
      stratum: typeof p.stratum === 'number' ? p.stratum : 0,
      cluster: p.cluster,
    }
  })
}

function addValidRosterIndices(s, N, target) {
  if (!s) return
  for (const idx of s) {
    if (typeof idx === 'number' && Number.isFinite(idx) && idx >= 0 && idx < N) target.add(idx)
  }
}

/** Sliding window around the current draw — for random-method animation (avoids prefix-only illusion). */
export function buildSamplingPopGridWindow(
  lastPeople,
  centerIndex,
  windowHalf,
  highlightSet,
  skipSet,
  extraIndices = null
) {
  const N = lastPeople.length
  if (!N) return { cells: [], truncated: false, windowLo: 0, windowHi: 0 }

  const c =
    centerIndex != null && Number.isFinite(centerIndex)
      ? Math.max(0, Math.min(N - 1, centerIndex))
      : 0
  const half = Math.max(12, windowHalf ?? 45)
  const lo = Math.max(0, c - half)
  const hi = Math.min(N - 1, c + half)

  const ix = new Set()
  for (let i = lo; i <= hi; i++) ix.add(i)
  addValidRosterIndices(highlightSet, N, ix)
  addValidRosterIndices(skipSet, N, ix)
  addValidRosterIndices(extraIndices, N, ix)

  const sorted = [...ix].sort((a, b) => a - b)
  return {
    cells: samplingPopGridCells(lastPeople, sorted),
    truncated: lo > 0 || hi < N - 1,
    windowLo: lo,
    windowHi: hi,
  }
}

export function buildSamplingPopGridForPreview(
  lastPeople,
  leftSet,
  rightSet,
  quotaSkipLeft,
  quotaSkipRight,
  extraIndices = null
) {
  const N = lastPeople.length
  if (!N) return { cells: [], truncated: false }

  const prefixLen = Math.min(SAMPLING_POP_GRID_MAX, N)
  const ix = new Set()
  for (let i = 0; i < prefixLen; i++) ix.add(i)
  addValidRosterIndices(leftSet, N, ix)
  addValidRosterIndices(rightSet, N, ix)
  addValidRosterIndices(quotaSkipLeft, N, ix)
  addValidRosterIndices(quotaSkipRight, N, ix)
  addValidRosterIndices(extraIndices, N, ix)

  let sorted = [...ix].sort((a, b) => a - b)

  if (sorted.length > SAMPLING_POP_PREVIEW_HARD_CAP) {
    const must = new Set()
    addValidRosterIndices(leftSet, N, must)
    addValidRosterIndices(rightSet, N, must)
    addValidRosterIndices(quotaSkipLeft, N, must)
    addValidRosterIndices(quotaSkipRight, N, must)
    addValidRosterIndices(extraIndices, N, must)
    let mustArr = [...must].sort((a, b) => a - b)
    if (mustArr.length > SAMPLING_POP_PREVIEW_HARD_CAP) {
      mustArr = mustArr.slice(0, SAMPLING_POP_PREVIEW_HARD_CAP)
    }
    sorted = [...mustArr]
    const seen = new Set(sorted)
    for (let i = 0; i < prefixLen && sorted.length < SAMPLING_POP_PREVIEW_HARD_CAP; i++) {
      if (!seen.has(i)) {
        sorted.push(i)
        seen.add(i)
      }
    }
    sorted.sort((a, b) => a - b)
  }

  const lastShownRosterIdx = sorted.length ? sorted[sorted.length - 1] : -1
  const truncated = sorted.length < N || lastShownRosterIdx < N - 1

  return { cells: samplingPopGridCells(lastPeople, sorted), truncated }
}

export function histogramRectsForValues(values, lo, hi, nbins, innerW, innerH, pad) {
  const binW = (hi - lo) / nbins
  const bins = Array(nbins).fill(0)
  for (const v of values) {
    let b = Math.floor((v - lo) / binW)
    if (b >= nbins) b = nbins - 1
    if (b < 0) b = 0
    bins[b]++
  }
  const maxCount = Math.max(...bins, 1)
  const bw = innerW / nbins
  const rects = []
  for (let i = 0; i < nbins; i++) {
    const h = (bins[i] / maxCount) * innerH
    rects.push({
      x: pad + i * bw + 1,
      y: pad + innerH - h,
      w: bw - 2,
      h: Math.max(0, h),
    })
  }
  return rects
}

function numericMin(arr) {
  if (!arr?.length) return Infinity
  let m = arr[0]
  for (let i = 1; i < arr.length; i++) if (arr[i] < m) m = arr[i]
  return m
}

function numericMax(arr) {
  if (!arr?.length) return -Infinity
  let m = arr[0]
  for (let i = 1; i < arr.length; i++) if (arr[i] > m) m = arr[i]
  return m
}

export function buildCompareHistograms(popScores, scoresA, scoresB, popMean, histW = 380, histH = 148) {
  if (!popScores?.length) {
    return { population: [], planA: [], planB: [], muLineX: 0, lo: 0, hi: 100 }
  }
  const valsA = scoresA || []
  const valsB = scoresB || []
  const minM = Math.min(
    numericMin(popScores),
    valsA.length ? numericMin(valsA) : popMean,
    valsB.length ? numericMin(valsB) : popMean,
    popMean
  )
  const maxM = Math.max(
    numericMax(popScores),
    valsA.length ? numericMax(valsA) : popMean,
    valsB.length ? numericMax(valsB) : popMean,
    popMean
  )
  const span = Math.max(2, maxM - minM)
  const lo = minM - span * 0.05
  const hi = maxM + span * 0.05
  const nbins = 20
  const pad = 14
  const innerW = histW - pad * 2
  const innerH = histH - 36
  const xMu = pad + ((popMean - lo) / (hi - lo)) * innerW
  return {
    population: histogramRectsForValues(popScores, lo, hi, nbins, innerW, innerH, pad),
    planA: valsA.length
      ? histogramRectsForValues(valsA, lo, hi, nbins, innerW, innerH, pad)
      : [],
    planB: valsB.length
      ? histogramRectsForValues(valsB, lo, hi, nbins, innerW, innerH, pad)
      : [],
    muLineX: Math.max(pad, Math.min(histW - pad, xMu)),
    lo,
    hi,
    histW,
    histH,
  }
}

/** x̄ strip positions for SVG rug plot */
export function xbarStripDots(means, popMean, lo, hi, width = 360, height = 48) {
  if (!means?.length || hi <= lo) return []
  const pad = 8
  const innerW = width - pad * 2
  const muX = pad + ((popMean - lo) / (hi - lo)) * innerW
  return means.map((xbar, i) => ({
    x: pad + ((xbar - lo) / (hi - lo)) * innerW,
    y: 12 + (i % 3) * 10,
    xbar,
    i,
    muX,
  }))
}
