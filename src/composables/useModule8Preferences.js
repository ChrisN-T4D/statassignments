import { ref, computed } from 'vue'

// Module 8 topics organized by chapter
const CHAPTER_10_TOPICS = [
  'chi-square-goodness-of-fit',
  'chi-square-independence',
  'chi-square-corrections-effect-size',
  'chi-square-assumptions-fisher',
  'mcnemar-test'
]

const CHAPTER_11_TOPICS = [
  'one-sample-z-test',
  'one-sample-t-test',
  'independent-t-test',
  'welch-t-test',
  'paired-t-test'
]

const CHAPTER_12_TOPICS = [
  'correlation',
  'scatterplots',
  'simple-regression',
  'multiple-regression',
  'regression-inference',
  'regression-assumptions',
  'model-selection'
]

const CHAPTER_13_TOPICS = [
  'one-way-anova-basics',
  'post-hoc-tests-anova',
  'anova-assumptions',
  'repeated-measures-anova'
]

const ALL_MODULE_8_TOPICS = [
  ...CHAPTER_10_TOPICS,
  ...CHAPTER_11_TOPICS,
  ...CHAPTER_12_TOPICS,
  ...CHAPTER_13_TOPICS
]

// Chapter metadata
const CHAPTERS = {
  'chapter-10': {
    number: 10,
    title: 'Categorical Data Analysis',
    topics: CHAPTER_10_TOPICS
  },
  'chapter-11': {
    number: 11,
    title: 'Comparing Two Means (T-Tests)',
    topics: CHAPTER_11_TOPICS
  },
  'chapter-12': {
    number: 12,
    title: 'Correlation and Linear Regression',
    topics: CHAPTER_12_TOPICS
  },
  'chapter-13': {
    number: 13,
    title: 'Comparing Several Means (ANOVA)',
    topics: CHAPTER_13_TOPICS
  }
}

const STORAGE_KEY = 'module8SelectedTopics'

// Shared state
const selectedTopics = ref(new Set())
const hasCompletedSelection = ref(false)

// Load from localStorage on initialization
function loadPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      selectedTopics.value = new Set(data.selectedTopics || [])
      hasCompletedSelection.value = data.hasCompleted || false
    }
  } catch (err) {
    console.warn('Unable to load Module 8 preferences:', err)
  }
}

// Initialize on first import
loadPreferences()

export function useModule8Preferences() {
  // Computed: Check if topic is selected
  const isTopicSelected = (topicId) => {
    // If no selection made yet, show all topics
    if (selectedTopics.value.size === 0) return true
    return selectedTopics.value.has(topicId)
  }

  // Computed: Get selected topics for a specific chapter
  const getSelectedTopicsForChapter = (chapterKey) => {
    const chapter = CHAPTERS[chapterKey]
    if (!chapter) return []

    if (selectedTopics.value.size === 0) {
      return chapter.topics
    }

    return chapter.topics.filter(topicId => selectedTopics.value.has(topicId))
  }

  // Computed: Check if all topics in a chapter are selected
  const isChapterFullySelected = (chapterKey) => {
    const chapter = CHAPTERS[chapterKey]
    if (!chapter) return false
    return chapter.topics.every(topicId => selectedTopics.value.has(topicId))
  }

  // Computed: Count selected topics
  const selectedCount = computed(() => selectedTopics.value.size)

  // Computed: Total topics
  const totalTopics = computed(() => ALL_MODULE_8_TOPICS.length)

  // Select a topic
  function selectTopic(topicId) {
    selectedTopics.value.add(topicId)
  }

  // Deselect a topic
  function deselectTopic(topicId) {
    selectedTopics.value.delete(topicId)
  }

  // Toggle topic selection
  function toggleTopic(topicId) {
    if (selectedTopics.value.has(topicId)) {
      deselectTopic(topicId)
    } else {
      selectTopic(topicId)
    }
  }

  // Select all topics in a chapter
  function selectAllInChapter(chapterKey) {
    const chapter = CHAPTERS[chapterKey]
    if (!chapter) return

    chapter.topics.forEach(topicId => {
      selectedTopics.value.add(topicId)
    })
  }

  // Deselect all topics in a chapter
  function deselectAllInChapter(chapterKey) {
    const chapter = CHAPTERS[chapterKey]
    if (!chapter) return

    chapter.topics.forEach(topicId => {
      selectedTopics.value.delete(topicId)
    })
  }

  // Toggle all topics in a chapter
  function toggleChapter(chapterKey) {
    if (isChapterFullySelected(chapterKey)) {
      deselectAllInChapter(chapterKey)
    } else {
      selectAllInChapter(chapterKey)
    }
  }

  // Select all topics
  function selectAll() {
    ALL_MODULE_8_TOPICS.forEach(topicId => {
      selectedTopics.value.add(topicId)
    })
  }

  // Deselect all topics
  function deselectAll() {
    selectedTopics.value.clear()
  }

  // Save preferences to localStorage
  function savePreferences() {
    try {
      const data = {
        selectedTopics: Array.from(selectedTopics.value),
        lastUpdated: new Date().toISOString(),
        hasCompleted: true
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      hasCompletedSelection.value = true
      return true
    } catch (err) {
      console.error('Unable to save Module 8 preferences:', err)
      return false
    }
  }

  // Reset preferences
  function resetPreferences() {
    selectedTopics.value.clear()
    hasCompletedSelection.value = false
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.warn('Unable to remove Module 8 preferences:', err)
    }
  }

  // Get all chapters metadata
  function getChapters() {
    return Object.entries(CHAPTERS).map(([key, data]) => ({
      key,
      ...data
    }))
  }

  // Skip selection (mark as completed but don't filter)
  function skipSelection() {
    hasCompletedSelection.value = true
    try {
      const data = {
        selectedTopics: [],
        lastUpdated: new Date().toISOString(),
        hasCompleted: true
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (err) {
      console.warn('Unable to save skip preference:', err)
    }
  }

  return {
    // State
    selectedTopics: computed(() => selectedTopics.value),
    hasCompletedSelection: computed(() => hasCompletedSelection.value),
    selectedCount,
    totalTopics,

    // Methods
    isTopicSelected,
    getSelectedTopicsForChapter,
    isChapterFullySelected,
    selectTopic,
    deselectTopic,
    toggleTopic,
    selectAllInChapter,
    deselectAllInChapter,
    toggleChapter,
    selectAll,
    deselectAll,
    savePreferences,
    resetPreferences,
    getChapters,
    skipSelection,

    // Constants
    ALL_MODULE_8_TOPICS
  }
}
