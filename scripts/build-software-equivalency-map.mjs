import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { statisticsExercises } from '../src/data/statisticsPractices.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'docs', 'SOFTWARE_EQUIVALENCY_MAP.md')
const SOFTWARE_ORDER = ['jamovi', 'r', 'spss', 'excel', 'stata']
const SOFTWARE_LABEL = {
  jamovi: 'Jamovi',
  r: 'R',
  spss: 'SPSS',
  excel: 'Excel',
  stata: 'Stata',
  conceptual: 'Conceptual'
}

function md(s = '') {
  return String(s).replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim()
}

const keyed = statisticsExercises
  .filter((ex) => ex.practiceObjectiveKey)
  .reduce((acc, ex) => {
    const key = ex.practiceObjectiveKey
    if (!acc.has(key)) {
      acc.set(key, {
        key,
        module: ex.module,
        topic: ex.topic,
        chapter: ex.chapter || '',
        rows: []
      })
    }
    acc.get(key).rows.push(ex)
    return acc
  }, new Map())

const sorted = [...keyed.values()].sort((a, b) => {
  if (a.module !== b.module) return a.module.localeCompare(b.module)
  return a.key.localeCompare(b.key)
})

const lines = []
lines.push('# Software Equivalency Map')
lines.push('')
lines.push('Task-by-task source of truth keyed by `practiceObjectiveKey`.')
lines.push('')
lines.push('## Coverage summary')
lines.push('')
lines.push(`- Objectives with key: **${sorted.length}**`)
lines.push(`- Software tracks expected for parity: ${SOFTWARE_ORDER.map((s) => `\`${s}\``).join(', ')}`)
lines.push('- This matrix includes all rows with `practiceObjectiveKey` (including `menu_navigation` where keyed).')
lines.push('')

for (const item of sorted) {
  const bySoftware = new Map(item.rows.map((r) => [r.software_type, r]))
  const present = SOFTWARE_ORDER.filter((s) => bySoftware.has(s))
  const missing = SOFTWARE_ORDER.filter((s) => !bySoftware.has(s))
  lines.push(`## \`${item.key}\``)
  lines.push('')
  lines.push(`- Module: \`${item.module}\`${item.chapter ? ` | Chapter: \`${item.chapter}\`` : ''} | Topic: \`${item.topic}\``)
  lines.push(`- Present: ${present.map((s) => `\`${s}\``).join(', ') || 'none'}`)
  lines.push(`- Missing: ${missing.length ? missing.map((s) => `\`${s}\``).join(', ') : 'none'}`)
  lines.push('')
  lines.push('| Software | Title | Canonical method/instruction | Verification checkpoint |')
  lines.push('|---|---|---|---|')
  for (const sw of [...SOFTWARE_ORDER, 'conceptual']) {
    const row = bySoftware.get(sw)
    if (!row) continue
    const checkpoint = row.submission || row.success_message || row.expected_output || row.expected_answer_format || 'Confirm objective outcome from output/screenshot.'
    lines.push(`| ${SOFTWARE_LABEL[sw] || sw} | ${md(row.title)} | ${md(row.instructions)} | ${md(checkpoint)} |`)
  }
  lines.push('')
}

lines.push('## Canonical tutorial sources')
lines.push('')
lines.push('- Jamovi: [User Guide](https://www.jamovi.org/user-manual.html), [Analyses Overview](https://docs.jamovi.org/_pages/jg_00_analyses-overview.html)')
lines.push('- R: [R4DS Import](http://r4ds.hadley.nz/data-import.html), [R4DS Visualization](https://r4ds.had.co.nz/data-visualisation.html), [UCLA OARC R](https://stats.oarc.ucla.edu/r/whatstat/what-statistical-analysis-should-i-usestatistical-analyses-using-r), [R `t.test` docs](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/t.test.html)')
lines.push('- SPSS: [IBM SPSS docs](https://www.ibm.com/docs/en/spss-statistics), [Independent t test](https://www.ibm.com/docs/en/spss-statistics/29.0.0?topic=test-independent-samples-t), [Crosstabs significance](https://www.ibm.com/docs/en/spss-statistics/30.0.0?topic=tables-significance-testing-crosstabulations), [UCLA OARC SPSS](https://stats.oarc.ucla.edu/spss/seminars/notes-pac/spss-class-notesanalyzing-data)')
lines.push('- Excel: [Analysis ToolPak](https://support.office.microsoft.com/en-us/article/use-the-analysis-toolpak-to-perform-complex-data-analysis-6c67ccf0-f4a9-487c-8dec-bdb5a2cefab6), [Load ToolPak](https://support.microsoft.com/en-us/office/load-the-analysis-toolpak-in-excel-6a63e598-cd6d-42e3-9317-6b40ba1a66b4?CorrelationId=c), [Stat functions reference](https://support.microsoft.com/en-us/office/statistical-functions-reference-624dac86-a375-4435-bc25-76d659719ffd)')
lines.push('- Stata: [Data management manual](https://stata.com/manuals/ddatamanagement.pdf), [Histogram reference](https://stata.com/manuals/rhistogram.pdf), [UCLA OARC Stata notes](https://stats.oarc.ucla.edu/stata/seminars/stata-16-class-notes/stata-class-notes-analyzing-data/), [UCLA code fragments](https://stats.oarc.ucla.edu/stata/code/descriptives-ttests-anova-and-regression/)')
lines.push('')

fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8')
console.log(`Wrote ${outPath}`)
