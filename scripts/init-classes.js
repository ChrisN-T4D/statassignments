/**
 * Script to initialize the classes collection in PocketBase
 *
 * This script can be run from the browser console on the admin dashboard
 * or executed via PocketBase JavaScript migrations
 */

const INITIAL_CLASSES = [
  {
    id: 'research-methods',
    name: 'Research Methods',
    short_name: 'RM',
    slug: 'research-methods',
    description: 'Introduction to research methodology in psychology, including experimental design, measurement, and ethics.',
    color: '#3b82f6',
    icon: '🔬',
    topics: ['sampling', 'hypothesis-testing', 'correlation'],
    order: 1,
    is_active: true
  },
  {
    id: 'experimental',
    name: 'Experimental Design',
    short_name: 'Exp',
    slug: 'experimental',
    description: 'Experimental and quasi-experimental design, factorials, and analyzing group-comparison data.',
    color: '#0ea5e9',
    icon: '🧪',
    topics: ['hypothesis-testing'],
    order: 2,
    is_active: true
  },
  {
    id: 'statistics',
    name: 'Statistics',
    short_name: 'Stats',
    slug: 'statistics',
    description: 'Core statistical concepts and analysis techniques for psychological research.',
    color: '#8b5cf6',
    icon: '📊',
    topics: ['descriptive-stats', 'visualizations', 'normal-distribution', 'z-scores', 't-tests', 'correlation', 'regression'],
    order: 3,
    is_active: true
  },
  {
    id: 'intro-research',
    name: 'Intro to Research',
    short_name: 'Intro',
    slug: 'intro-research',
    description: 'Foundational concepts in psychological research and scientific inquiry.',
    color: '#f59e0b',
    icon: '📚',
    topics: ['descriptive-stats', 'visualizations', 'probability'],
    order: 4,
    is_active: true
  }
]

// For use in browser console (paste this into the console on any page of your app)
async function initClassesFromBrowser() {
  // Import PocketBase client
  const { pb } = await import('./src/lib/pocketbase.js')

  console.log('Initializing classes...')

  for (const classData of INITIAL_CLASSES) {
    try {
      await pb.collection('classes').create(classData)
      console.log(`✓ Created class: ${classData.name}`)
    } catch (err) {
      if (err.status === 400 && err.data?.id) {
        console.log(`⚠ Class already exists: ${classData.name}`)
      } else {
        console.error(`✗ Failed to create class ${classData.name}:`, err.message)
      }
    }
  }

  console.log('Done!')
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INITIAL_CLASSES, initClassesFromBrowser }
}
