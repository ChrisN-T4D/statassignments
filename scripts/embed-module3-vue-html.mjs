/**
 * Writes spss/r/excel/stata.html for Module 3 software topics from Vue templates
 * (Interface-*, DataEntry-*, VariableTypes-*). jamovi.html remains the full LSJ extract.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const vueDir = join(root, 'src', 'content', 'software', 'module-3')
const topicsRoot = join(root, 'src', 'content', 'topics')

const MAP = [
  { slug: 'software-interface__module-3', prefix: 'Interface' },
  { slug: 'data-entry__module-3', prefix: 'DataEntry' },
  { slug: 'variable-types__module-3', prefix: 'VariableTypes' }
]

const VUE_SW = ['SPSS', 'Jamovi', 'R', 'Excel', 'Stata']

function extractTemplateInner(vueSource) {
  const m = vueSource.match(/<template>\s*([\s\S]*?)\s*<\/template>/)
  if (!m) return null
  return m[1].trim()
}

function vueFileName(prefix, swName) {
  return `${prefix}-${swName}.vue`
}

function softwareKeyFromVueName(swName) {
  if (swName === 'SPSS') return 'spss'
  return swName.toLowerCase()
}

for (const { slug, prefix } of MAP) {
  const outDir = join(topicsRoot, slug)
  if (!existsSync(join(outDir, 'jamovi.html'))) {
    console.warn(`embed-module3: missing ${slug}/jamovi.html — run extract first`)
  }
  mkdirSync(outDir, { recursive: true })

  for (const swName of VUE_SW) {
    if (swName === 'Jamovi') continue
    const vf = vueFileName(prefix, swName)
    const p = join(vueDir, vf)
    const raw = readFileSync(p, 'utf8')
    const body = extractTemplateInner(raw)
    if (!body) throw new Error(`No template body in ${vf}`)

    const swKey = softwareKeyFromVueName(swName)
    const html = `<section class="module-content topic-content software-guide-vue">
${body}
  <div class="attribution">
    <p><em>Interface guide for <strong>${swName}</strong>. The full conceptual chapter in the jamovi edition of <a href="https://davidfoxcroft.github.io/lsj-book/" target="_blank" rel="noopener">Learning Statistics with jamovi</a> (CC BY-SA 4.0) covers the same learning goals with jamovi-specific steps.</em></p>
  </div>
</section>
`

    writeFileSync(join(outDir, `${swKey}.html`), html, 'utf8')
  }
}

console.log('embed-module3-vue-html: wrote non-jamovi HTML for Module 3 software trio')
