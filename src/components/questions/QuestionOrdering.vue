<template>
  <div class="question-ordering">
    <p class="question-text">{{ question.question }}</p>

    <div class="ordering-container">
      <draggable
        v-model="localItems"
        item-key="id"
        :disabled="submitted"
        class="sortable-list"
        ghost-class="ghost"
        @end="onDragEnd"
      >
        <template #item="{ element, index }">
          <div
            class="sortable-item"
            :class="{
              correct: submitted && isItemCorrect(index),
              incorrect: submitted && !isItemCorrect(index)
            }"
          >
            <span class="drag-handle" v-if="!submitted">â‹®â‹®</span>
            <span class="item-number">{{ index + 1 }}</span>
            <span class="item-text">{{ element.text }}</span>
            <span v-if="submitted && isItemCorrect(index)" class="result-icon correct">âœ“</span>
            <span v-if="submitted && !isItemCorrect(index)" class="result-icon incorrect">âœ—</span>
          </div>
        </template>
      </draggable>

      <p class="drag-hint" v-if="!submitted">Drag items to reorder them</p>
    </div>

    <div v-if="submitted" class="feedback" :class="isCorrect ? 'correct' : 'incorrect'">
      <p>{{ isCorrect ? question.feedback.correct : question.feedback.incorrect }}</p>
      <div v-if="!isCorrect" class="correct-order">
        <strong>Correct order:</strong>
        <ol>
          <li v-for="id in question.correctOrder" :key="id">
            {{ getItemText(id) }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
  question: { type: Object, required: true },
  answer: { type: Array, default: null },
  submitted: { type: Boolean, default: false }
})

const emit = defineEmits(['answer'])

const localItems = ref([])

onMounted(() => {
  initializeItems()
})

watch(() => props.question, () => {
  initializeItems()
})

function initializeItems() {
  if (props.answer && props.answer.length > 0) {
    // Restore from saved answer
    localItems.value = props.answer.map(id =>
      props.question.items.find(item => item.id === id)
    ).filter(Boolean)
  } else {
    // Shuffle items initially
    localItems.value = [...props.question.items].sort(() => Math.random() - 0.5)
    emitAnswer()
  }
}

function onDragEnd() {
  emitAnswer()
}

function emitAnswer() {
  emit('answer', localItems.value.map(item => item.id))
}

function isItemCorrect(index) {
  return localItems.value[index]?.id === props.question.correctOrder[index]
}

function getItemText(id) {
  return props.question.items.find(item => item.id === id)?.text || id
}

const isCorrect = computed(() => {
  const currentOrder = localItems.value.map(item => item.id)
  return JSON.stringify(currentOrder) === JSON.stringify(props.question.correctOrder)
})
</script>

<style scoped>
.question-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.ordering-container {
  margin-bottom: 1rem;
}

.sortable-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sortable-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--bg-elevated);
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  cursor: grab;
  transition: all 0.15s;
  user-select: none;
}

.sortable-item:hover {
  border-color: var(--primary);
}

.sortable-item.correct {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 10%, var(--bg-card));
  cursor: default;
}

.sortable-item.incorrect {
  border-color: var(--danger);
  background: color-mix(in srgb, var(--danger) 10%, var(--bg-card));
  cursor: default;
}

.sortable-item.ghost {
  opacity: 0.5;
  background: var(--primary);
  border-color: var(--primary);
}

.drag-handle {
  color: var(--text-muted);
  cursor: grab;
  font-size: 1rem;
  letter-spacing: -2px;
}

.item-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-main);
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.sortable-item.correct .item-number {
  background: var(--success);
  color: white;
}

.sortable-item.incorrect .item-number {
  background: var(--danger);
  color: white;
}

.item-text {
  flex: 1;
}

.result-icon {
  font-size: 1.25rem;
  font-weight: bold;
}

.result-icon.correct {
  color: var(--success);
}

.result-icon.incorrect {
  color: var(--danger);
}

.drag-hint {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-top: 0.75rem;
}

.feedback {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
}

.feedback.correct {
  background: color-mix(in srgb, var(--success) 10%, var(--bg-card));
  border: 1px solid var(--success);
}

.feedback.incorrect {
  background: color-mix(in srgb, var(--danger) 10%, var(--bg-card));
  border: 1px solid var(--danger);
}

.feedback p {\n  color: #111827;
  margin: 0 0 0.75rem 0;
  font-size: 0.9375rem;
}

.correct-order {
  font-size: 0.875rem;
}

.correct-order ol {
  margin: 0.5rem 0 0 1.25rem;
  padding: 0;
}

.correct-order li {
  margin: 0.25rem 0;
}
</style>
