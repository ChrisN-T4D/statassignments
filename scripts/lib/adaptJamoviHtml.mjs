/**
 * Adapt LSJ/jamovi HTML into a parallel chapter for another statistics package.
 * Uses phrase-level replacements; URLs to jamovi.org are swapped for package home pages.
 */

const SOFTWARE = {
  spss: {
    display: 'SPSS',
    displayLong: 'IBM SPSS Statistics',
    lower: 'SPSS',
    downloadUrl: 'https://www.ibm.com/products/spss-statistics'
  },
  r: {
    display: 'R',
    displayLong: 'R and RStudio',
    lower: 'R',
    downloadUrl: 'https://cran.r-project.org/'
  },
  excel: {
    display: 'Excel',
    displayLong: 'Microsoft Excel',
    lower: 'Excel',
    downloadUrl: 'https://www.microsoft.com/microsoft-365/excel'
  },
  stata: {
    display: 'Stata',
    displayLong: 'Stata',
    lower: 'Stata',
    downloadUrl: 'https://www.stata.com/'
  }
}

const URL_PLACEHOLDER_PREFIX = '__URL_ESC_'
const URL_PLACEHOLDER_SUFFIX = '__'

/**
 * @param {string} html
 * @param {'spss'|'r'|'excel'|'stata'} softwareKey
 */
export function adaptJamoviHtml(html, softwareKey) {
  const cfg = SOFTWARE[softwareKey]
  if (!cfg || !html) return html

  const urls = []
  let h = html.replace(/https?:\/\/[^\s"'<>]+/gi, match => {
    const i = urls.length
    urls.push(match)
    return `${URL_PLACEHOLDER_PREFIX}${i}${URL_PLACEHOLDER_SUFFIX}`
  })

  // Book / product naming
  h = h.replace(/Learning Statistics with jamovi/gi, `Learning Statistics with ${cfg.displayLong}`)
  h = h.replace(/\bLSJ\b/g, `LSJ (${cfg.display} edition)`)
  h = h.replace(/\bJASP\b/g, 'JASP') // keep

  // UI / prose (order: longer phrases first)
  h = h.replace(/\bthe jamovi GUI\b/gi, `the ${cfg.display} interface`)
  h = h.replace(/\bjamovi file \(\.omv\)/gi, `${cfg.display} data file`)
  h = h.replace(/\bjamovi file\b/gi, `${cfg.display} file`)
  h = h.replace(/\bthe jamovi\b/gi, `the ${cfg.display}`)
  h = h.replace(/\bin jamovi\b/gi, `in ${cfg.display}`)
  h = h.replace(/\bfrom jamovi\b/gi, `from ${cfg.display}`)
  h = h.replace(/\bto jamovi\b/gi, `to ${cfg.display}`)
  h = h.replace(/\bwith jamovi\b/gi, `with ${cfg.display}`)
  h = h.replace(/\busing jamovi\b/gi, `using ${cfg.display}`)
  h = h.replace(/\binto jamovi\b/gi, `into ${cfg.display}`)
  h = h.replace(/\bon jamovi\b/gi, `on ${cfg.display}`)
  h = h.replace(/\bjamovi's\b/gi, `${cfg.display}'s`)
  h = h.replace(/\bjamovi\b/g, cfg.lower)
  h = h.replace(/\bJamovi\b/g, cfg.display)

  // Restore URLs — swap jamovi.org for package home when generic
  h = h.replace(
    new RegExp(`${URL_PLACEHOLDER_PREFIX}(\\d+)${URL_PLACEHOLDER_SUFFIX}`, 'g'),
    (_, i) => {
      const u = urls[Number(i)]
      if (!u) return _
      if (/jamovi\.org/i.test(u)) {
        if (u.includes('download')) return cfg.downloadUrl
        return cfg.downloadUrl
      }
      return u
    }
  )

  const note = `<div class="software-adaptation-note" role="note"><p><strong>Note (${cfg.display} track):</strong> This chapter follows the structure and wording of <em>Learning Statistics with jamovi</em> (CC BY-SA 4.0). Software-specific menus, file formats, and clicks refer to <strong>${cfg.displayLong}</strong> where the original refers to jamovi. Verify dialog names against your software version.</p></div>\n\n`

  // Insert after first heading or start of section
  const insertAt = h.indexOf('<section')
  if (insertAt >= 0) {
    const close = h.indexOf('>', insertAt)
    if (close > insertAt) {
      h = h.slice(0, close + 1) + note + h.slice(close + 1)
    } else {
      h = note + h
    }
  } else {
    h = note + h
  }

  return h
}
