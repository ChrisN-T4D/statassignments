/**
 * Loads per-topic, per-software HTML from src/content/topics/<slug>/*.html
 * Slug format: `${topic.id}__${topic.moduleId}` (disambiguates duplicate topic ids).
 */
const modules = import.meta.glob('./*/*.html', {
  query: '?raw',
  import: 'default',
  eager: true
})

const VALID_SOFTWARE = new Set(['jamovi', 'spss', 'r', 'excel', 'stata'])

function buildRegistry() {
  const reg = new Map()
  for (const path of Object.keys(modules)) {
    const withoutDot = path.replace(/^\.\//, '')
    const parts = withoutDot.split('/')
    if (parts.length !== 2) continue
    const [slug, file] = parts
    const software = file.replace(/\.html$/u, '')
    if (!VALID_SOFTWARE.has(software)) continue
    reg.set(`${slug}/${software}`, modules[path])
  }
  return reg
}

const registry = buildRegistry()

export function topicContentSlug(topic) {
  if (!topic?.id || !topic?.moduleId) return ''
  return `${topic.id}__${topic.moduleId}`
}

/**
 * @param {object} topic - topic record (may include legacy contentHtml)
 * @param {string} softwareId - preferred software id
 * @returns {string}
 */
export function resolveTopicHtml(topic, softwareId) {
  if (!topic) return ''
  const slug = topicContentSlug(topic)
  if (!slug) return topic.contentHtml ?? ''

  const preferred = VALID_SOFTWARE.has(softwareId) ? softwareId : 'jamovi'
  const candidates = [preferred, 'jamovi']

  for (const sw of [...new Set(candidates)]) {
    const html = registry.get(`${slug}/${sw}`)
    if (html != null && String(html).trim() !== '') {
      if (
        import.meta.env.DEV &&
        sw !== preferred &&
        preferred !== 'jamovi'
      ) {
        console.warn(
          `[topics] Missing ${slug}/${preferred}.html — using ${sw} fallback.`
        )
      }
      return html
    }
  }

  if (import.meta.env.DEV && topic.contentHtml) {
    console.warn(
      `[topics] No HTML files for ${slug}; using legacy topics.js contentHtml.`
    )
  }
  return topic.contentHtml ?? ''
}
