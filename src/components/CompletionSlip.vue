<template>
  <div v-if="visible" class="completion-slip">
    <div class="slip-card" id="mm-completion-slip">
      <h3>PSYC 4213 · Methods Market completion slip</h3>
      <p class="slip-status">Status: Completed</p>
      <dl class="slip-details">
        <div><dt>Student key</dt><dd>{{ studentKey || 'Not linked — claim your key to use this slip' }}</dd></div>
        <div><dt>Activity</dt><dd>Concept Review</dd></div>
        <div><dt>Module</dt><dd>{{ moduleLabel }}</dd></div>
        <div v-if="scoreLabel"><dt>Score</dt><dd>{{ scoreLabel }}</dd></div>
        <div><dt>Completed</dt><dd>{{ completedAtLabel }}</dd></div>
      </dl>
      <p class="slip-instruction">Upload this slip to the matching Canvas assignment</p>
    </div>
    <div class="slip-actions print-hide">
      <button type="button" class="btn-primary" :disabled="!canPrint" @click="printSlip">Print / Save PDF</button>
      <button type="button" class="btn-secondary" :disabled="!canPrint" @click="copySlip">Copy summary</button>
    </div>
    <p v-if="!canPrint" class="slip-note print-hide">
      Sign in and link your student key before you can print a slip for Canvas.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  studentKey: { type: String, default: '' },
  moduleLabel: { type: String, default: '' },
  correct: { type: Number, default: null },
  total: { type: Number, default: null },
  completedAt: { type: String, default: '' }
})

const emit = defineEmits(['print'])

const canPrint = computed(() => Boolean(props.studentKey))

const scoreLabel = computed(() => {
  if (props.correct == null || props.total == null) return ''
  return `${props.correct}/${props.total}`
})

const completedAtLabel = computed(() => {
  if (!props.completedAt) return ''
  try {
    return new Date(props.completedAt).toLocaleString()
  } catch {
    return props.completedAt
  }
})

function slipText() {
  return [
    'PSYC 4213 · Methods Market completion slip',
    `Student key: ${props.studentKey}`,
    'Activity: Concept Review',
    `Module: ${props.moduleLabel}`,
    scoreLabel.value ? `Score: ${scoreLabel.value}` : null,
    `Completed: ${completedAtLabel.value}`,
    'Upload this slip to the matching Canvas assignment'
  ].filter(Boolean).join('\n')
}

function printSlip() {
  emit('print')
}

async function copySlip() {
  try {
    await navigator.clipboard.writeText(slipText())
  } catch (err) {
    console.warn('Unable to copy slip:', err)
  }
}
</script>

<style scoped>
.completion-slip {
  margin-top: 1.5rem;
}
.slip-card {
  border: 1px solid var(--border, #ccc);
  padding: 1.25rem;
  background: var(--bg-card, #fff);
  color: var(--text-primary, #111);
  max-width: 36rem;
}
.slip-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}
.slip-status {
  font-weight: 600;
  margin: 0 0 0.75rem;
}
.slip-details {
  margin: 0;
}
.slip-details > div {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}
.slip-details dt {
  font-weight: 600;
}
.slip-details dd {
  margin: 0;
}
.slip-instruction {
  margin: 1rem 0 0;
  font-weight: 600;
}
.slip-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}
.slip-note {
  color: var(--text-secondary, #555);
  margin-top: 0.5rem;
}
@media print {
  .print-hide {
    display: none !important;
  }
  .slip-card {
    border: 1px solid #000;
    max-width: none;
  }
}
</style>
