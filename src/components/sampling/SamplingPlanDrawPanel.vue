<template>
  <div class="plan-panel" :class="meta.panelClass">
    <div class="plan-head">
      <span class="badge" :class="meta.random ? 'rand' : 'norand'">
        {{ meta.random ? 'Random' : 'Non-random' }}
      </span>
      <strong>{{ label }}: {{ meta.shortTitle }}</strong>
    </div>
    <p class="blurb">{{ meta.blurb }}</p>
    <div v-if="plan.lastXbar != null" class="xbar-row">
      <span>This draw: <strong>x̄ = {{ plan.lastXbar.toFixed(2) }}</strong></span>
      <span :class="deltaClass">Δ from μ: {{ deltaFromMu >= 0 ? '+' : '' }}{{ deltaFromMu.toFixed(2) }}</span>
    </div>
    <p v-else class="waiting">Click “Take another sample” to run this plan.</p>
    <SamplingSelectionViz
      v-if="showViz"
      :highlight-indices="highlightIndices"
      :skip-indices="skipIndices"
      :pool-indices="poolIndices"
      :pulse-index="pulseIndex"
      :pick-label="pickLabel"
      :animating="animating"
      :method="plan.method"
      :walk-steps="walkSteps"
      :heatmap-bins="heatmapBins"
      :sys-interval="sysInterval"
      :roster-size="rosterSize"
    />
    <p class="draw-count">{{ plan.drawCount }} draw{{ plan.drawCount === 1 ? '' : 's' }} so far</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SamplingSelectionViz from './SamplingSelectionViz.vue'

const props = defineProps({
  label: { type: String, required: true },
  plan: { type: Object, required: true },
  meta: { type: Object, required: true },
  popMean: { type: Number, required: true },
  highlightIndices: { type: Array, default: () => [] },
  skipIndices: { type: Array, default: () => [] },
  poolIndices: { type: Array, default: () => [] },
  animating: { type: Boolean, default: false },
  pulseIndex: { type: Number, default: null },
  pickLabel: { type: String, default: '' },
  walkSteps: { type: Array, default: () => [] },
  heatmapBins: { type: Array, default: () => [] },
  sysInterval: { type: Number, default: null },
  rosterSize: { type: Number, default: 0 },
})

const showViz = computed(
  () => props.heatmapBins.length > 0 || props.animating
)

const deltaFromMu = computed(() =>
  props.plan.lastXbar != null ? props.plan.lastXbar - props.popMean : 0
)

const deltaClass = computed(() => {
  const d = Math.abs(deltaFromMu.value)
  if (d < 0.5) return 'delta-ok'
  if (d < 2) return 'delta-warn'
  return 'delta-bad'
})
</script>

<style scoped>
.plan-panel {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--bg-subtle, #f8fafc);
}
.plan-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}
.badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
}
.badge.rand { background: #dbeafe; color: #1d4ed8; }
.badge.norand { background: #ffedd5; color: #c2410c; }
.blurb {
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
  color: var(--text-muted, #64748b);
}
.xbar-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.95rem;
}
.delta-ok { color: #15803d; }
.delta-warn { color: #ca8a04; }
.delta-bad { color: #dc2626; }
.waiting,
.draw-count {
  font-size: 0.85rem;
  margin: 0.25rem 0 0;
  color: var(--text-muted, #64748b);
}
</style>
