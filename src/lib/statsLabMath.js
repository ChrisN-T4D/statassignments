/**
 * Pure stats helpers for Concept Labs (solo + live aggregates).
 * Node-importable; no Vue or browser globals.
 */

export function mean(arr) {
  if (!arr?.length) return null
  let sum = 0
  for (const v of arr) sum += Number(v)
  return sum / arr.length
}

export function median(arr) {
  if (!arr?.length) return null
  const ordered = [...arr].map(Number).sort((a, b) => a - b)
  const n = ordered.length
  const mid = Math.floor(n / 2)
  if (n % 2 === 1) return ordered[mid]
  return (ordered[mid - 1] + ordered[mid]) / 2
}

export function mode(arr) {
  if (!arr?.length) return null
  const counts = new Map()
  for (const v of arr) {
    const key = typeof v === 'object' ? JSON.stringify(v) : String(v)
    counts.set(key, { count: (counts.get(key)?.count || 0) + 1, value: v })
  }
  let maxCount = 0
  for (const { count } of counts.values()) {
    if (count > maxCount) maxCount = count
  }
  const winners = [...counts.values()]
    .filter(({ count }) => count === maxCount)
    .map(({ value }) => value)
    .sort((a, b) => {
      const sa = typeof a === 'object' ? JSON.stringify(a) : String(a)
      const sb = typeof b === 'object' ? JSON.stringify(b) : String(b)
      return sa.localeCompare(sb)
    })
  return winners.length === 1 ? winners[0] : winners
}

export function proportion(arr, value = 1) {
  if (!arr?.length) return 0
  let matches = 0
  for (const v of arr) {
    if (v === value) matches += 1
  }
  return matches / arr.length
}

export function histogram(values, binCount = 10) {
  if (!values?.length) return []
  let nBins = binCount < 1 ? 1 : Math.floor(binCount)
  const nums = values.map(Number)
  const lo = Math.min(...nums)
  const hi = Math.max(...nums)
  if (lo === hi) {
    return [{ bin_start: lo, bin_end: hi, count: nums.length }]
  }
  const width = (hi - lo) / nBins
  const bins = Array.from({ length: nBins }, (_, i) => ({
    bin_start: lo + i * width,
    bin_end: i < nBins - 1 ? lo + (i + 1) * width : hi,
    count: 0,
  }))
  for (const v of nums) {
    if (v === hi) {
      bins[bins.length - 1].count += 1
      continue
    }
    let idx = Math.floor((v - lo) / width)
    if (idx < 0) idx = 0
    else if (idx >= nBins) idx = nBins - 1
    bins[idx].count += 1
  }
  return bins
}

/**
 * Draw n values from population (with replacement) and return their mean.
 * @param {number[]} population
 * @param {number} n sample size
 * @param {() => number} rng returns value in [0, 1); defaults to Math.random
 */
export function sampleMean(population, n, rng = Math.random) {
  if (!population?.length || n <= 0) return null
  const draw = typeof rng === 'function' ? rng : Math.random
  const sample = []
  for (let i = 0; i < n; i += 1) {
    const idx = Math.floor(draw() * population.length)
    sample.push(Number(population[idx]))
  }
  return mean(sample)
}
