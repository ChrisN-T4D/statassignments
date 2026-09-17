<template>
  <div class="sel-viz">
    <p v-if="animating" class="live-label">
      {{ pickLabel || 'Selecting now… watch tiles light up' }}
    </p>
    <div v-if="walkSteps.length" class="walk-strip-wrap">
      <p class="walk-caption">{{ walkCaption }}</p>
      <div class="walk-strip" role="img" :aria-label="'Selection walk'">
        <div
          v-for="(step, i) in walkSteps"
          :key="'ws' + i"
          class="walk-tile"
          :class="{
            'walk-in': step.action === 'in',
            'walk-skip': step.action === 'skip',
            'walk-pool': step.action === 'pool',
            'walk-pulse': step.rosterIndex === pulseIndex,
          }"
          :title="'Row #' + (step.rosterIndex + 1)"
        />
      </div>
      <div class="walk-legend">
        <span><i class="leg leg-in" /> In sample</span>
        <span v-if="method === 'quota'"><i class="leg leg-skip" /> Passed over</span>
      </div>
    </div>
    <div ref="gridEl" class="roster-grid" role="img" aria-label="Roster selection preview">
      <div
        v-for="cell in cells"
        :key="'c' + cell.rosterIndex"
        :ref="(el) => setCellRef(cell.rosterIndex, el)"
        class="roster-cell"
        :class="{
          'dorm-start': dormSize > 0 && cell.rosterIndex % dormSize === 0,
          'cell-in': highlightIndices.includes(cell.rosterIndex),
          'cell-skip': skipIndices.includes(cell.rosterIndex),
          'cell-pulse': cell.rosterIndex === pulseIndex,
          'cell-retry': cell.rosterIndex === pulseIndex && pickLabel.toLowerCase().includes('again'),
        }"
        :style="{ background: scoreColor(cell.score) }"
        :title="'#' + cell.pos + ', score ' + cell.score.toFixed(1)"
      >
        <span v-if="rankMap.has(cell.rosterIndex)" class="rank-chip">
          #{{ rankMap.get(cell.rosterIndex) }}
        </span>
      </div>
    </div>
    <p v-if="truncated" class="grid-note">Prefix of roster plus selected rows; full N used in draws.</p>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { scoreColor } from '../../lib/samplingSim.js'

const props = defineProps({
  cells: { type: Array, default: () => [] },
  dormSize: { type: Number, default: 0 },
  highlightIndices: { type: Array, default: () => [] },
  skipIndices: { type: Array, default: () => [] },
  pulseIndex: { type: Number, default: null },
  pickLabel: { type: String, default: '' },
  animating: { type: Boolean, default: false },
  method: { type: String, default: 'srs' },
  walkSteps: { type: Array, default: () => [] },
  rankMap: { type: Map, default: () => new Map() },
  truncated: { type: Boolean, default: false },
})

const walkSteps = computed(() => props.walkSteps.slice(-72))

const walkCaption = computed(() => {
  if (props.method === 'quota') return 'List walk (in vs passed over)'
  if (props.method === 'conv') return 'First n* list positions'
  if (props.method === 'purposive') return 'Top scores selected (rank order)'
  if (props.method === 'clust' || props.method === 'stage') return 'Cluster members entering sample'
  return 'Sample building up (selection order)'
})

const gridEl = ref(null)
const cellRefs = ref({})

function setCellRef(rosterIndex, el) {
  if (el) cellRefs.value[rosterIndex] = el
}

watch(
  () => props.pulseIndex,
  async (idx) => {
    if (idx == null || !props.animating) return
    await nextTick()
    const el = cellRefs.value[idx]
    el?.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }
)
</script>

<style scoped>
.sel-viz {
  margin-top: 0.75rem;
}
.live-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 0.5rem;
  animation: pulse-text 1s ease-in-out infinite;
}
@keyframes pulse-text {
  50% { opacity: 0.65; }
}
.walk-strip-wrap {
  margin-bottom: 0.65rem;
}
.walk-caption {
  font-size: 0.78rem;
  color: var(--text-muted, #64748b);
  margin: 0 0 0.35rem;
}
.walk-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 48px;
  overflow: auto;
  padding: 4px;
  background: var(--bg-subtle, #f1f5f9);
  border-radius: 4px;
}
.walk-tile {
  width: 10px;
  height: 10px;
  border-radius: 1px;
  background: #cbd5e1;
}
.walk-tile.walk-in {
  background: #2563eb;
}
.walk-tile.walk-skip {
  background: repeating-linear-gradient(
    -45deg,
    #94a3b8,
    #94a3b8 1px,
    #e2e8f0 1px,
    #e2e8f0 2px
  );
}
.walk-tile.walk-pool {
  background: #93c5fd;
}
.walk-tile.walk-pulse {
  box-shadow: 0 0 0 2px #f59e0b;
  transform: scale(1.15);
}
.walk-legend {
  display: flex;
  gap: 0.75rem;
  font-size: 0.72rem;
  margin-top: 0.25rem;
  color: var(--text-muted, #64748b);
}
.leg {
  display: inline-block;
  width: 10px;
  height: 10px;
  vertical-align: middle;
  margin-right: 3px;
  border-radius: 1px;
}
.leg-in { background: #2563eb; }
.leg-skip {
  background: repeating-linear-gradient(-45deg, #94a3b8, #94a3b8 1px, #e2e8f0 1px, #e2e8f0 2px);
}
.roster-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 140px;
  overflow: auto;
  padding: 4px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  background: #fff;
}
.roster-cell {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  position: relative;
}
.roster-cell.dorm-start {
  outline: 1px solid rgba(0, 0, 0, 0.25);
}
.roster-cell.cell-in {
  box-shadow: 0 0 0 2px #2563eb;
  z-index: 1;
}
.roster-cell.cell-skip {
  opacity: 0.45;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.35) 2px,
    rgba(0, 0, 0, 0.35) 4px
  ) !important;
}
.roster-cell.cell-pulse {
  box-shadow: 0 0 0 3px #f59e0b;
  z-index: 2;
  transform: scale(1.2);
}
.roster-cell.cell-retry {
  box-shadow: 0 0 0 3px #ef4444;
}
.rank-chip {
  position: absolute;
  inset: 0;
  font-size: 7px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 2px #000;
}
.grid-note {
  font-size: 0.75rem;
  color: var(--text-muted, #64748b);
  margin: 0.35rem 0 0;
}
</style>
