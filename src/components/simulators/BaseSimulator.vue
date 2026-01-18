<template>
  <div class="simulator-container">
    <div class="simulator-header">
      <div class="software-badge" :class="software">
        {{ softwareLabel }}
      </div>
      <div class="task-info">
        <h3>{{ task.title }}</h3>
        <p>{{ task.instructions }}</p>
      </div>
    </div>

    <div class="simulator-body">
      <slot></slot>
    </div>

    <div class="simulator-footer">
      <div v-if="showHint" class="hint-box">
        <strong>Hint:</strong> {{ task.hint }}
      </div>

      <div class="actions">
        <button
          v-if="task.hint && !showHint"
          class="btn-hint"
          @click="$emit('show-hint')"
        >
          Show Hint
        </button>
        <button
          class="btn-check"
          :disabled="!canCheck"
          @click="$emit('check-answer')"
        >
          Check Answer
        </button>
        <button
          v-if="showReset"
          class="btn-reset"
          @click="$emit('reset')"
        >
          Reset
        </button>
      </div>

      <div v-if="feedback" class="feedback" :class="feedback.type">
        <div class="feedback-icon">
          {{ feedback.type === 'correct' ? '✓' : '✗' }}
        </div>
        <div class="feedback-content">
          <strong>{{ feedback.type === 'correct' ? 'Correct!' : 'Not quite right' }}</strong>
          <p v-if="feedback.message">{{ feedback.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  software: {
    type: String,
    required: true,
    validator: (v) => ['jamovi', 'spss', 'r', 'stata', 'excel'].includes(v)
  },
  task: {
    type: Object,
    required: true
  },
  canCheck: {
    type: Boolean,
    default: false
  },
  showHint: {
    type: Boolean,
    default: false
  },
  showReset: {
    type: Boolean,
    default: false
  },
  feedback: {
    type: Object,
    default: null
  }
})

defineEmits(['check-answer', 'reset', 'show-hint'])

const softwareLabel = computed(() => {
  const labels = {
    jamovi: 'jamovi',
    spss: 'SPSS',
    r: 'R',
    stata: 'Stata',
    excel: 'Excel'
  }
  return labels[props.software] || props.software
})
</script>

<style scoped>
.simulator-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  overflow: hidden;
}

.simulator-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
  background: #f8fafc;
}

.software-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.software-badge.jamovi {
  background: #f3e8ff;
  color: #7c3aed;
}

.software-badge.spss {
  background: #fee2e2;
  color: #dc2626;
}

.software-badge.r {
  background: #dbeafe;
  color: #2563eb;
}

.software-badge.stata {
  background: #e0e7ff;
  color: #4338ca;
}

.software-badge.excel {
  background: #dcfce7;
  color: #16a34a;
}

.task-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.task-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.simulator-body {
  padding: 1.5rem;
  min-height: 300px;
}

.simulator-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border);
  background: #f8fafc;
}

.hint-box {
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-check {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-check:hover:not(:disabled) {
  background: var(--primary-dark);
}

.btn-check:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-hint {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-hint:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.btn-reset {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn-reset:hover {
  border-color: var(--danger);
  color: var(--danger);
}

.feedback {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
}

.feedback.correct {
  background: #ecfdf5;
  border: 1px solid #10b981;
}

.feedback.incorrect {
  background: #fef2f2;
  border: 1px solid #ef4444;
}

.feedback-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.feedback.correct .feedback-icon {
  background: #10b981;
  color: white;
}

.feedback.incorrect .feedback-icon {
  background: #ef4444;
  color: white;
}

.feedback-content strong {
  display: block;
  margin-bottom: 0.25rem;
}

.feedback-content p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}
</style>
