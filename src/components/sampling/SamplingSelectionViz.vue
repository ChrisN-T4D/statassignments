<template>
  <div class="sel-viz">
    <p v-if="animating" class="live-label">
      {{ pickLabel || 'Selecting now… watch tiles light up' }}
    </p>
    <div v-if="showRosterMap" class="roster-map-wrap">
      <p class="walk-caption">{{ rosterMapCaption }}</p>
      <div class="roster-map" role="img" :aria-label="'Pick positions on full roster'">
        <div class="roster-map-track">
          <span class="roster-map-end">1</span>
          <span class="roster-map-end roster-map-end-right">{{ rosterSize }}</span>
        </div>
        <div
          v-for="(step, i) in mapSteps"
          :key="'rm' + i"
          class="roster-map-mark"
          :class="{
            'mark-in': step.action === 'in' || step.action === 'pool',
            'mark-retry': step.action === 'retry',
            'mark-pulse': step.rosterIndex === pulseIndex,
          }"
          :style="{ left: rosterPct(step.rosterIndex) }"
          :title="mapMarkTitle(step)"
        />
      </div>
      <div class="walk-legend">
        <span><i class="leg leg-in" /> In sample</span>
        <span v-if="hasRetries"><i class="leg leg-retry" /> Duplicate draw (SRS)</span>
      </div>
    </div>
    <div v-else-if="showListWalkStrip" class="walk-strip-wrap">
      <p class="walk-caption">{{ walkCaption }}</p>
      <div class="walk-strip" role="img" :aria-label="'Selection walk'">
        <div
          v-for="(step, i) in walkSteps"
          :key="'ws' + i"
          class="walk-tile"
          :class="{
            'walk-in': step.action === 'in',
            'walk-skip': step.action === 'skip',
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
          'cell-retry': cell.rosterIndex === pulseIndex && pickLabel.toLowerCase().includes('redraw'),
        }"
        :style="{ background: scoreColor(cell.score) }"
        :title="'#' + cell.pos + ', score ' + cell.score.toFixed(1)"
      >
        <span v-if="rankMap.has(cell.rosterIndex)" class="rank-chip">
          #{{ rankMap.get(cell.rosterIndex) }}
        </span>
      </div>
    </div>
    <p v-if="gridWindowNote" class="grid-note">{{ gridWindowNote }}</p>
    <p v-else-if="truncated" class="grid-note">Prefix of roster plus selected rows; full N used in draws.</p>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { isListWalkMethod, scoreColor } from '../../lib/samplingSim.js'

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
  gridWindow: { type: Object, default: null },
  rosterSize: { type: Number, default: 0 },
})

const walkSteps = computed(() => props.walkSteps.slice(-72))
const mapSteps = computed(() => props.walkSteps.slice(-80))

const showListWalkStrip = computed(
  () => isListWalkMethod(props.method) && walkSteps.value.length > 0
)
const showRosterMap = computed(
  () => !isListWalkMethod(props.method) && mapSteps.value.length > 0 && props.rosterSize > 1
)
const hasRetries = computed(() => mapSteps.value.some((s) => s.action === 'retry'))

const walkCaption = computed(() => {
  if (props.method === 'quota') return 'List walk (in vs passed over)'
  return 'First n* list positions'
})

const rosterMapCaption = computed(() => {
  if (props.method === 'sys') return 'Systematic: random start, then every k-th roster row (positions on full list)'
  if (props.method === 'strat') return 'Stratified: random picks within each class year (positions on full list)'
  if (props.method === 'clust' || props.method === 'stage') return 'Cluster sample: roster positions of selected halls / picks'
  if (props.method === 'purposive') return 'Purposive: highest scores (positions on full list)'
  return 'Simple random sample: each pick jumps to a random roster row'
})

const gridWindowNote = computed(() => {
  if (!props.gridWindow) return ''
  const { lo, hi, total } = props.gridWindow
  return `Zoomed to roster rows ${lo + 1}–${hi + 1} of ${total} (follows current pick; full N used in draws).`
})

function rosterPct(idx) {
  if (props.rosterSize <= 1) return '0%'
  return `${(idx / (props.rosterSize - 1)) * 100}%`
}

function mapMarkTitle(step) {
  const row = step.rosterIndex + 1
  if (step.action === 'retry') return `Row #${row} — duplicate draw, not in sample`
  if (step.action === 'pool') return `Row #${row} — in stage-1 pool`
  return `Row #${row} — in sample`
}

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
.roster-map-wrap,
.walk-strip-wrap {
  margin-bottom: 0.65rem;
}
.walk-caption {
  font-size: 0.78rem;
  color: var(--text-muted, #64748b);
  margin: 0 0 0.35rem;
}
.roster-map {
  position: relative;
  height: 28px;
  margin: 0 2px;
}
.roster-map-track {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 6px;
  transform: translateY(-50%);
  background: linear-gradient(90deg, #e2e8f0, #cbd5e1);
  border-radius: 3px;
}
.roster-map-end {
  position: absolute;
  top: 100%;
  font-size: 0.65rem;
  color: var(--text-muted, #64748b);
  margin-top: 2px;
}
.roster-map-end-right {
  right: 0;
}
.roster-map-mark {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #2563eb;
  opacity: 0.85;
  z-index: 1;
}
.roster-map-mark.mark-retry {
  background: #ef4444;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  opacity: 0.9;
}
.roster-map-mark.mark-pulse {
  width: 12px;
  height: 12px;
  margin-left: -6px;
  box-shadow: 0 0 0 2px #f59e0b;
  z-index: 2;
  opacity: 1;
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
.walk-tile.walk-pulse {
  box-shadow: 0 0 0 2px #f59e0b;
  transform: scale(1.15);
}
.walk-legend {
  display: flex;
  flex-wrap: wrap;
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
.leg-retry { background: #ef4444; border-radius: 50%; }
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
