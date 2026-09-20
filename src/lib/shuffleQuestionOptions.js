/** Fisher–Yates shuffle copy for multiple-choice option text arrays. */

export function shuffleMcOptions (options) {
  if (!Array.isArray(options)) return []
  const arr = [...options]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
