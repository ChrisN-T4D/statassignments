<template>
  <div class="question-ms">
    <p class="question-text">{{ question.question }}</p>

    <div class="options">
      <label
        v-for="option in question.options"
        :key="option.id"
        class="option"
        :class="{
          selected: isSelected(option.id),
          correct: submitted && question.correct.includes(option.id),
          incorrect: submitted && isSelected(option.id) && !question.correct.includes(option.id),
          missed: submitted && !isSelected(option.id) && question.correct.includes(option.id),
          disabled: submitted
        }"
      >
        <input
          type="checkbox"
          :value="option.id"
          :checked="isSelected(option.id)"
          :disabled="submitted"
          @change="toggleOption(option.id)"
        />
        <span class="checkbox-marker">
          <span v-if="isSelected(option.id)" class="check">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“</span>
        </span>
        <span class="option-text">{{ option.text }}</span>
        <span v-if="submitted && question.correct.includes(option.id)" class="result-icon correct">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“</span>
        <span v-if="submitted && isSelected(option.id) && !question.correct.includes(option.id)" class="result-icon incorrect">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â</span>
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
  answer: { type: Array, default: () => [] },
  submitted: { type: Boolean, default: false }
})

const emit = defineEmits(['answer'])

function isSelected(optionId) {
  return props.answer?.includes(optionId) || false
}

function toggleOption(optionId) {
  const current = props.answer || []
  let newAnswer
  if (current.includes(optionId)) {
    newAnswer = current.filter(id => id !== optionId)
  } else {
    newAnswer = [...current, optionId]
  }
  emit('answer', newAnswer)
}

const isCorrect = computed(() => {
  if (!props.answer) return false
  const sortedAnswer = [...props.answer].sort()
  const sortedCorrect = [...props.question.correct].sort()
  return JSON.stringify(sortedAnswer) === JSON.stringify(sortedCorrect)
})
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

.option.missed {
  border-color: var(--warning);
  background: color-mix(in srgb, var(--warning) 10%, var(--bg-card));
}

.option.disabled {
  cursor: default;
}

.option input {
  display: none;
}

.checkbox-marker {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-main);
  border: 2px solid var(--border);
  border-radius: 4px;
  flex-shrink: 0;
}

.option.selected .checkbox-marker {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.option.correct .checkbox-marker {
  background: var(--success);
  border-color: var(--success);
  color: white;
}

.option.incorrect .checkbox-marker {
  background: var(--danger);
  border-color: var(--danger);
  color: white;
}

.check {
  font-size: 0.875rem;
  font-weight: bold;
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

.feedback p {
  color: #111827;
  margin: 0;
  font-size: 0.9375rem;
}
</style>
