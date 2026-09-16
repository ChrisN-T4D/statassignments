<template>
  <div class="source-self-check">
    <h3 class="panel-title">{{ title }}</h3>
    <p v-if="intro" class="panel-intro">{{ intro }}</p>

    <div
      v-for="item in SOURCE_SELF_CHECK_ITEMS"
      :key="item.id"
      class="check-block"
    >
      <label class="check-main">
        <input
          type="checkbox"
          :checked="modelValue?.[item.id]"
          @change="onToggle(item.id, $event.target.checked)"
        />
        <span class="check-label">{{ item.label }}</span>
      </label>
      <p v-if="item.helpNote" class="check-help">{{ item.helpNote }}</p>
      <ul v-if="item.lookFor?.length" class="look-for-list">
        <li v-for="(line, i) in item.lookFor" :key="i">{{ line }}</li>
      </ul>
      <router-link
        v-if="item.helpTopicId"
        :to="`/topic/${item.helpTopicId}`"
        class="chapter-link"
      >
        Open {{ topicLabel(item.helpTopicId) }} →
      </router-link>
    </div>

    <div v-if="showPdfSniff" class="pdf-sniff">
      <h4 class="sniff-title">{{ PDF_SNIFF_TEST.title }}</h4>
      <ul class="look-for-list">
        <li v-for="(line, i) in PDF_SNIFF_TEST.items" :key="i">{{ line }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {
  SOURCE_SELF_CHECK_ITEMS,
  PDF_SNIFF_TEST
} from '../../data/capstoneArticleReviewWorksheet.js'

const props = defineProps({
  title: {
    type: String,
    default: 'Source self-check (Methods Market only)'
  },
  intro: {
    type: String,
    default: 'Look at your PDF, then check each box you can honestly confirm. Methods Market does not grade these.'
  },
  modelValue: { type: Object, default: () => ({}) },
  showPdfSniff: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue'])

function onToggle (id, checked) {
  emit('update:modelValue', { ...props.modelValue, [id]: checked })
}

function topicLabel (topicId) {
  if (topicId === 'rm-chapter-11') return 'Ch. 11'
  if (topicId === 'rm-chapter-2') return 'Ch. 2'
  return 'chapter help'
}
</script>

<style scoped>
.source-self-check {
  margin-top: 1rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
}

.panel-title {
  font-size: 1rem;
  margin: 0 0 0.35rem;
}

.panel-intro {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.45;
}

.check-block {
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.check-block:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.check-main {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  cursor: pointer;
  font-weight: 600;
  line-height: 1.4;
}

.check-main input {
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.check-label {
  font-size: 0.95rem;
}

.check-help {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0.5rem 0 0.5rem 1.5rem;
  line-height: 1.45;
}

.look-for-list {
  margin: 0.35rem 0 0.5rem 1.5rem;
  padding-left: 1.1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.look-for-list li {
  margin-bottom: 0.35rem;
}

.chapter-link {
  display: inline-block;
  margin-left: 1.5rem;
  font-size: 0.85rem;
  color: var(--primary);
  text-decoration: none;
}

.chapter-link:hover {
  text-decoration: underline;
}

.pdf-sniff {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px dashed var(--border);
}

.sniff-title {
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
  color: var(--text-secondary);
}
</style>
