<template>
  <div class="question-matching">
    <p class="question-text">{{ question.question }}</p>

    <div class="matching-container">
      <!-- Left column: Terms -->
      <div class="terms-column">
        <div
          v-for="(pair, index) in question.pairs"
          :key="'term-' + index"
          class="term-item"
          :class="{
            correct: submitted && isCorrect(index),
            incorrect: submitted && !isCorrect(index)
          }"
        >
          <span class="term-label">{{ index + 1 }}.</span>
          <span class="term-text">{{ pair.left }}</span>
          <span v-if="submitted" class="result-icon">
            {{ isCorrect(index) ? '✓' : '✗' }}
          </span>
        </div>
      </div>

      <!-- Right column: Dropdowns -->
      <div class="definitions-column">
        <div
          v-for="(pair, index) in question.pairs"
          :key="'def-' + index"
          class="definition-item"
        >
          <select
            v-model="localMatches[index]"
            :disabled="submitted"
            class="match-select"
            :class="{
              correct: submitted && isCorrect(index),
              incorrect: submitted && !isCorrect(index)
            }"
            @change="onMatchChange"
          >
            <option value="">Select a match...</option>
            <option
              v-for="(option, optIndex) in shuffledOptions"
              :key="optIndex"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="submitted" class="feedback" :class="allCorrect ? 'correct' : 'incorrect'">
      <p>{{ allCorrect ? question.feedback.correct : question.feedback.incorrect }}</p>
      <div v-if="!allCorrect" class="correct-answers">
        <strong>Correct matches:</strong>
        <ul>
          <li v-for="(pair, index) in question.pairs" :key="'answer-' + index">
            {{ pair.left }} → {{ pair.right }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  answer: { type: Array, default: () => [] },
  submitted: { type: Boolean, default: false }
})

const emit = defineEmits(['answer', 'submit'])

// Local matches: array of selected values matching each pair index
const localMatches = ref([])

// Shuffled options for the dropdowns
const shuffledOptions = ref([])

onMounted(() => {
  initializeComponent()
})

watch(() => props.question, () => {
  initializeComponent()
}, { deep: true })

watch(() => props.answer, (newVal) => {
  if (newVal && newVal.length > 0) {
    localMatches.value = [...newVal]
  }
}, { deep: true })

function initializeComponent() {
  // Initialize matches from props or empty
  if (props.answer && props.answer.length > 0) {
    localMatches.value = [...props.answer]
  } else {
    // Initialize with empty values for each pair
    localMatches.value = props.question.pairs.map(() => '')
  }

  // Shuffle the right-side options
  shuffledOptions.value = props.question.pairs
    .map(p => p.right)
    .sort(() => Math.random() - 0.5)
}

function onMatchChange() {
  emit('answer', [...localMatches.value])
}

function isCorrect(index) {
  return localMatches.value[index] === props.question.pairs[index].right
}

const allCorrect = computed(() => {
  return props.question.pairs.every((pair, index) => isCorrect(index))
})
</script>

<style scoped>
.question-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.matching-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.terms-column,
.definitions-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.term-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  background: var(--bg-elevated);
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  transition: all 0.15s;
  min-height: 3.25rem;
}

.term-item.correct {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 10%, var(--bg-card));
}

.term-item.incorrect {
  border-color: var(--danger);
  background: color-mix(in srgb, var(--danger) 10%, var(--bg-card));
}

.term-label {
  font-weight: 600;
  color: var(--primary);
  min-width: 1.5rem;
}

.term-text {
  flex: 1;
}

.result-icon {
  font-weight: bold;
  font-size: 1.25rem;
}

.term-item.correct .result-icon {
  color: var(--success);
}

.term-item.incorrect .result-icon {
  color: var(--danger);
}

.definition-item {
  height: 100%;
}

.match-select {
  width: 100%;
  height: 100%;
  min-height: 3.25rem;
  padding: 0.875rem 1rem;
  font-size: 0.9375rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-elevated);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.15s;
}

.match-select:focus {
  outline: none;
  border-color: var(--primary);
}

.match-select:disabled {
  cursor: default;
}

.match-select.correct {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 10%, var(--bg-card));
}

.match-select.incorrect {
  border-color: var(--danger);
  background: color-mix(in srgb, var(--danger) 10%, var(--bg-card));
}

.feedback {
  margin-top: 1.5rem;
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
  margin: 0;
  font-size: 0.9375rem;
}

.correct-answers {
  margin-top: 1rem;
  font-size: 0.875rem;
}

.correct-answers ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.25rem;
}

.correct-answers li {
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .matching-container {
    grid-template-columns: 1fr;
  }

  .term-item {
    margin-bottom: 0;
  }

  .definitions-column {
    margin-top: 0.5rem;
  }
}
</style>
