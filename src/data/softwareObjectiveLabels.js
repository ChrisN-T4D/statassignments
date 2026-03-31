/**
 * Display names for substituting "jamovi" / "Jamovi" in UI copy (objectives, etc.).
 */
export const SOFTWARE_DISPLAY = {
  jamovi: { name: 'jamovi', title: 'Jamovi' },
  spss: { name: 'SPSS', title: 'IBM SPSS Statistics' },
  r: { name: 'R', title: 'R / RStudio' },
  excel: { name: 'Excel', title: 'Microsoft Excel' },
  stata: { name: 'Stata', title: 'Stata' }
}

const DEFAULT = SOFTWARE_DISPLAY.jamovi

/**
 * Replace jamovi-specific wording with the learner's package (objectives, labels).
 */
export function applySoftwareLabelsToText(text, softwareId) {
  if (text == null || typeof text !== 'string') return text
  const sw = SOFTWARE_DISPLAY[softwareId] || DEFAULT
  if (softwareId === 'jamovi') return text

  let s = text
  s = s.replace(/\bLearning Statistics with jamovi\b/gi, `Learning Statistics with ${sw.title}`)
  s = s.replace(/\bjamovi and data handling\b/gi, `${sw.title} and data handling`)
  s = s.replace(/\bJamovi & data handling\b/g, `${sw.title} & data handling`)
  s = s.replace(/\bthe jamovi interface\b/gi, `the ${sw.title} interface`)
  s = s.replace(/\bin jamovi\b/gi, `in ${sw.name}`)
  s = s.replace(/\bfrom jamovi\b/gi, `from ${sw.name}`)
  s = s.replace(/\bwith jamovi\b/gi, `with ${sw.name}`)
  s = s.replace(/\busing jamovi\b/gi, `using ${sw.name}`)
  s = s.replace(/\binto jamovi\b/gi, `into ${sw.name}`)
  s = s.replace(/\bjamovi file\b/gi, `${sw.name} data file`)
  s = s.replace(/\bjamovi's\b/gi, `${sw.name}'s`)
  s = s.replace(/\bjamovi\b/g, sw.name)
  s = s.replace(/\bJamovi\b/g, sw.title)
  return s
}
