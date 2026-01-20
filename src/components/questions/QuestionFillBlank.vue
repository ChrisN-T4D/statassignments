<template>
  <div class="question-fill">
    <p class="question-text" v-html="formattedQuestion"></p>

    <div class="input-container">
      <input
        type="text"
        v-model="localAnswer"
        :disabled="submitted"
        :class="{
          correct: submitted && isCorrect,
          incorrect: submitted && !isCorrect
        }"
        placeholder="Type your answer..."
        @input="onInput"
        @keyup.enter="$emit('submit')"
      />
      <span v-if="submitted && isCorrect" class="result-icon correct">âœ“</span>
      <span v-if="submitted && !isCorrect" class="result-icon incorrect">âœ—</span>
    </div>

    <div v-if="submitted" class="feedback" :class="isCorrect ? 'correct' : 'incorrect'">
      <p>{{ isCorrect ? question.feedback.correct : question.feedback.incorrect }}</p>
      <p v-if="!isCorrect" class="accepted-answers">
        <strong>Accepted answers:</strong> {{ question.answer.join(', ') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  answer: { type: String, default: '' },
  submitted: { type: Boolean, default: false }
})

const emit = defineEmits(['answer', 'submit'])

const localAnswer = ref(props.answer || '')

watch(() => props.answer, (newVal) => {
  localAnswer.value = newVal || ''
})

function onInput() {
  emit('answer', localAnswer.value)
}

const formattedQuestion = computed(() => {
  // Replace ____ with a visible blank indicator
  return props.question.question.replace(/____/g, '<span class="blank-indicator">______</span>')
})

const isCorrect = computed(() => {
  if (!localAnswer.value) return false
  const normalized = localAnswer.value.trim().toLowerCase()
  const caseSensitive = props.question.caseSensitive || false

  return props.question.answer.some(accepted => {
    if (caseSensitive) {
      return localAnswer.value.trim() === accepted
    }
    return normalized === accepted.toLowerCase()
  })
})
</script>

<style scoped>
.question-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.question-text :deep(.blank-indicator) {
  background: var(--bg-elevated);
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  border-bottom: 2px solid var(--primary);
  font-family: monospace;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.input-container input {
  flex: 1;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-elevated);
  color: var(--text-primary);
  transition: all 0.15s;
}

.input-container input:focus {
  outline: none;
  border-color: var(--primary);
}

.input-container input:disabled {
  cursor: default;
}

.input-container input.correct {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 10%, var(--bg-card));
}

.input-container input.incorrect {
  border-color: var(--danger);
  background: color-mix(in srgb, var(--danger) 10%, var(--bg-card));
}

.result-icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.result-icon.correct {
  color: var(--success);
}

.result-icon.incorrect {
  color: var(--danger);
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
  margin: 0;
  font-size: 0.9375rem;
}

.accepted-answers {
  margin-top: 0.5rem !important;
  font-size: 0.875rem !important;
  color: var(--text-secondary);
}
</style>
