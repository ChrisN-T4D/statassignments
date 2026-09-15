<template>
  <section class="export-panel" aria-labelledby="export-panel-title">
    <h2 id="export-panel-title" class="export-title">Export for Canvas</h2>
    <p class="export-note">
      Methods Market is your draft workspace. Canvas is graded — copy your text below and paste into the
      worksheet or submission box when you are ready.
    </p>
    <button type="button" class="btn-secondary" @click="copyExport">
      {{ copied ? 'Copied!' : 'Copy export text' }}
    </button>
    <textarea
      class="export-preview"
      readonly
      rows="12"
      :value="exportText"
      aria-label="Export preview"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { buildExportText } from '../../lib/capstoneValidation.js'

const props = defineProps({
  sectionId: { type: String, required: true },
  project: { type: Object, required: true }
})

const copied = ref(false)

const exportText = computed(() => buildExportText(props.sectionId, props.project))

async function copyExport () {
  try {
    await navigator.clipboard.writeText(exportText.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    copied.value = false
  }
}
</script>

<style scoped>
.export-panel {
  margin-top: 2rem;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
}

.export-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.export-note {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.btn-secondary {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.export-preview {
  width: 100%;
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  line-height: 1.45;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-input, rgba(0, 0, 0, 0.15));
  color: var(--text-secondary);
  resize: vertical;
}
</style>
