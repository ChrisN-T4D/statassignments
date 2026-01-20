<template>
  <div class="question-mc">
    <p class="question-text">{{ question.question }}</p>

    <div class="options">
      <label
        v-for="option in question.options"
        :key="option.id"
        class="option"
        :class="{
          selected: answer === option.id,
          correct: submitted && option.id === question.correct,
          incorrect: submitted && answer === option.id && option.id !== question.correct,
          disabled: submitted
        }"
      >
        <input
          type="radio"
          :name="question.id"
          :value="option.id"
          :checked="answer === option.id"
          :disabled="submitted"
          @change="$emit('answer', option.id)"
        />
        <span class="option-marker">{{ option.id.toUpperCase() }}</span>
        <span class="option-text">{{ option.text }}</span>
        <span v-if="submitted && option.id === question.correct" class="result-icon correct">âœ“</span>
        <span v-if="submitted && answer === option.id && option.id !== question.correct" class="result-icon incorrect">âœ—</span>
      </label>
    </div>

    <div v-if="submitted" class="feedback" :class="isCorrect ? 'correct' : 'incorrect'">
      <p>{{ isCorrect ? question.feedback.correct : question.feedback.incorrect }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  answer: { type: String, default: null },
  submitted: { type: Boolean, default: false }
})

defineEmits(['answer'])

const isCorrect = computed(() => props.answer === props.question.correct)
</script>

<style scoped>
.question-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: var(--bg-elevated);
  border: 2px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s;
}

.option:hover:not(.disabled) {
  background: var(--bg-card);
  border-color: var(--border);
}

.option.selected {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 10%, var(--bg-card));
}

.option.correct {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 10%, var(--bg-card));
}

.option.incorrect {
  border-color: var(--danger);
  background: color-mix(in srgb, var(--danger) 10%, var(--bg-card));
}

.option.disabled {
  cursor: default;
}

.option input {
  display: none;
}

.option-marker {
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

.option.selected .option-marker {
  background: var(--primary);
  color: white;
}

.option.correct .option-marker {
  background: var(--success);
  color: white;
}

.option.incorrect .option-marker {
  background: var(--danger);
  color: white;
}

.option-text {
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
</style>
