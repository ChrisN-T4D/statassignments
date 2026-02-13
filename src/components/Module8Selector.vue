<template>
  <div class="module8-selector">
    <div class="selector-header">
      <h2>📚 Customize Your Module 8 Experience</h2>
      <p>Module 8 covers 21 statistical analyses across 4 chapters. Select the analyses you want to focus on this semester. You can always change your selection later.</p>
    </div>

    <div class="selection-summary">
      <div class="summary-badge">
        <span class="count">{{ selectedCount }}</span> of {{ totalTopics }} analyses selected
      </div>
      <div class="summary-actions">
        <button @click="selectAll" class="link-btn">Select All</button>
        <span class="separator">•</span>
        <button @click="deselectAll" class="link-btn">Deselect All</button>
      </div>
    </div>

    <div class="chapters-list">
      <div
        v-for="chapter in chapters"
        :key="chapter.key"
        class="chapter-section"
      >
        <div class="chapter-header">
          <label class="chapter-checkbox">
            <input
              type="checkbox"
              :checked="isChapterFullySelected(chapter.key)"
              :indeterminate.prop="isChapterPartiallySelected(chapter.key)"
              @change="toggleChapter(chapter.key)"
            />
            <span class="chapter-title">
              Chapter {{ chapter.number }}: {{ chapter.title }}
              <span class="topic-count">({{ chapter.topics.length }} analyses)</span>
            </span>
          </label>
        </div>

        <div class="chapter-topics">
          <label
            v-for="topicId in chapter.topics"
            :key="topicId"
            class="topic-checkbox"
          >
            <input
              type="checkbox"
              :checked="isTopicSelected(topicId)"
              @change="toggleTopic(topicId)"
            />
            <span class="topic-label">{{ getTopicTitle(topicId) }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="selector-actions">
      <button @click="handleSkip" class="btn-secondary">
        I'll Choose Later
      </button>
      <button
        @click="handleSave"
        class="btn-primary"
        :disabled="selectedCount === 0"
      >
        {{ selectedCount === 0 ? 'Select at least 1 analysis' : `Save ${selectedCount} Selection${selectedCount !== 1 ? 's' : ''}` }}
      </button>
    </div>

    <div class="selector-footer">
      <p>💡 <strong>Tip:</strong> Choose analyses relevant to your research or career goals. All content remains available if you change your mind later.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useModule8Preferences } from '../composables/useModule8Preferences'
import { topics } from '../data/topics'

const emit = defineEmits(['save', 'skip'])

const {
  selectedCount,
  totalTopics,
  isTopicSelected,
  isChapterFullySelected,
  toggleTopic,
  toggleChapter,
  selectAll,
  deselectAll,
  getChapters,
  savePreferences,
  skipSelection
} = useModule8Preferences()

const chapters = computed(() => getChapters())

// Check if chapter is partially selected
function isChapterPartiallySelected(chapterKey) {
  const chapter = chapters.value.find(c => c.key === chapterKey)
  if (!chapter) return false

  const selectedInChapter = chapter.topics.filter(topicId => isTopicSelected(topicId)).length
  return selectedInChapter > 0 && selectedInChapter < chapter.topics.length
}

// Get human-readable topic title
function getTopicTitle(topicId) {
  const topic = topics.find(t => t.id === topicId)
  if (!topic) return topicId

  // Remove chapter number prefix if present (e.g., "12.1 Correlation" -> "Correlation")
  let title = topic.title
  const match = title.match(/^\d+\.\d+\s+(.+)$/)
  if (match) {
    title = match[1]
  }

  return title
}

function handleSave() {
  if (selectedCount.value === 0) return

  const success = savePreferences()
  if (success) {
    emit('save')
  }
}

function handleSkip() {
  skipSelection()
  emit('skip')
}
</script>

<style scoped>
.module8-selector {
  background: var(--bg-card);
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.selector-header {
  margin-bottom: 1.5rem;
}

.selector-header h2 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.selector-header p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.selection-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-elevated);
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.summary-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.summary-badge .count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  background: var(--primary);
  color: white;
  border-radius: 0.375rem;
  font-weight: 600;
  padding: 0 0.5rem;
}

.summary-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.link-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: opacity 0.2s;
}

.link-btn:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.separator {
  color: var(--text-muted);
}

.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chapter-section {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
}

.chapter-header {
  background: var(--bg-elevated);
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
}

.chapter-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.chapter-checkbox input[type="checkbox"] {
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
  accent-color: var(--primary);
}

.chapter-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}

.topic-count {
  font-weight: 400;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.chapter-topics {
  padding: 1rem 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
}

.topic-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background 0.2s;
}

.topic-checkbox:hover {
  background: var(--bg-elevated);
}

.topic-checkbox input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: var(--primary);
}

.topic-label {
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.selector-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  margin-bottom: 1rem;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: var(--bg-elevated);
  border-color: var(--primary);
}

.selector-footer {
  padding: 1rem;
  background: var(--tip-bg);
  border-radius: 0.5rem;
  border-left: 3px solid var(--success);
}

.selector-footer p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .module8-selector {
    padding: 1.25rem;
  }

  .selection-summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .chapter-topics {
    grid-template-columns: 1fr;
  }

  .selector-actions {
    flex-direction: column-reverse;
  }

  .selector-actions button {
    width: 100%;
  }
}
</style>
