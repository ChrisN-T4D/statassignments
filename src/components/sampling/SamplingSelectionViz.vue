<template>
  <div class="sel-viz">
    <p v-if="animating" class="live-label">
      {{ pickLabel || 'Selecting now… watch the roster light up' }}
    </p>
    <div v-if="showRosterMap" class="roster-map-wrap">
      <p class="walk-caption">{{ rosterMapCaption }}</p>
      <div class="roster-map" role="img" :aria-label="'Pick positions on full roster'">
        <div class="roster-map-track">
          <span class="roster-map-end">1</span>
          <span class="roster-map-end roster-map-end-right">{{ rosterSize }}</span>
          <div
            v-if="method === 'sys' && sysInterval > 0"
            v-for="tick in sysTicks"
            :key="'tick' + tick"
            class="roster-map-tick"
            :style="{ left: rosterPct(tick) }"
          />
        </div>
        <div
          v-for="mark in rosterMapMarks"
          :key="'rm' + mark.rosterIndex + mark.action"
          class="roster-map-mark"
          :class="{
            'mark-in': mark.action === 'in',
            'mark-pool': mark.action === 'pool',
            'mark-skip': mark.action === 'skip',
            'mark-retry': mark.action === 'retry',
            'mark-strat-0': mark.stratum === 0,
            'mark-strat-1': mark.stratum === 1,
            'mark-strat-2': mark.stratum === 2,
            'mark-strat-3': mark.stratum === 3,
            'mark-pulse': mark.rosterIndex === pulseIndex,
          }"
          :style="{ left: rosterPct(mark.rosterIndex) }"
          :title="mapMarkTitle(mark)"
        />
      </div>
      <div class="walk-legend">
        <span><i class="leg leg-in" /> In sample</span>
        <span v-if="method === 'stage'"><i class="leg leg-pool" /> Stage-1 pool</span>
        <span v-if="method === 'quota' || skipIndices.length"><i class="leg leg-skip" /> Passed over</span>
        <span v-if="hasRetries"><i class="leg leg-retry" /> Duplicate draw</span>
        <span v-if="method === 'sys' && sysInterval">Every {{ sysInterval }} rows after random start</span>
      </div>
    </div>
    <div v-if="showListWalkStrip" class="walk-strip-wrap">
      <p class="walk-caption">{{ walkCaption }}</p>
      <div class="walk-strip" role="img" :aria-label="'Selection walk order'">
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
    </div>
    <div v-if="useHeatmap" ref="heatmapEl" class="roster-heatmap-wrap">
      <p class="heatmap-caption">{{ heatmapCaption }}</p>
      <div class="roster-heatmap" role="img" aria-label="Full roster segments in list order">
        <div
          v-for="bin in heatmapBins"
          :key="'hb' + bin.b"
          class="heatmap-bin"
          :class="{
            'bin-in': bin.inSample,
            'bin-pool': bin.inPool,
            'bin-skip': bin.skipped && !bin.inSample && !bin.inPool,
            'bin-pulse': bin.isPulse,
          }"
          :style="{ background: scoreColor(bin.avgScore) }"
          :title="bin.title"
        />
      </div>
      <p class="grid-note">{{ heatmapLegend }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { isListWalkMethod, scoreColor } from '../../lib/samplingSim.js'

const props = defineProps({
  highlightIndices: { type: Array, default: () => [] },
  skipIndices: { type: Array, default: () => [] },
  poolIndices: { type: Array, default: () => [] },
  pulseIndex: { type: Number, default: null },
  pickLabel: { type: String, default: '' },
  animating: { type: Boolean, default: false },
  method: { type: String, default: 'srs' },
  walkSteps: { type: Array, default: () => [] },
  heatmapBins: { type: Array, default: () => [] },
  sysInterval: { type: Number, default: null },
  rosterSize: { type: Number, default: 0 },
})

const walkSteps = computed(() => props.walkSteps.slice(-72))
const useHeatmap = computed(() => props.heatmapBins.length > 0)

const rosterMapMarks = computed(() => {
  const byIdx = new Map()
  for (const step of props.walkSteps) {
    if (step.action === 'retry') {
      byIdx.set(step.rosterIndex, { rosterIndex: step.rosterIndex, action: 'retry' })
    }
  }
  for (const idx of props.poolIndices) {
    if (!byIdx.has(idx)) byIdx.set(idx, { rosterIndex: idx, action: 'pool' })
  }
  for (const idx of props.skipIndices) {
    if (!byIdx.has(idx)) byIdx.set(idx, { rosterIndex: idx, action: 'skip' })
  }
  for (const idx of props.highlightIndices) {
    byIdx.set(idx, { rosterIndex: idx, action: 'in' })
  }
  return [...byIdx.values()].sort((a, b) => a.rosterIndex - b.rosterIndex)
})

const showListWalkStrip = computed(
  () => isListWalkMethod(props.method) && walkSteps.value.length > 0
)
const showRosterMap = computed(
  () =>
    props.rosterSize > 1 &&
    (rosterMapMarks.value.length > 0 || props.animating)
)
const hasRetries = computed(() => rosterMapMarks.value.some((s) => s.action === 'retry'))

const sysTicks = computed(() => {
  if (props.method !== 'sys' || !props.sysInterval || !props.highlightIndices.length) return []
  const sorted = [...props.highlightIndices].sort((a, b) => a - b)
  const start = sorted[0]
  const ticks = []
  for (let i = start; i < props.rosterSize; i += props.sysInterval) ticks.push(i)
  return ticks.slice(0, 120)
})

const walkCaption = computed(() => {
  if (props.method === 'quota') return 'Walk order: who entered the sample vs was passed over'
  return 'Walk order: first rows on the registrar list'
})

const rosterMapCaption = computed(() => {
  if (props.method === 'conv') return 'Convenience: sample fills from the top of the list'
  if (props.method === 'quota') return 'Quota: walk the list — blue = in sample, gray = passed over'
  if (props.method === 'sys') return 'Systematic: evenly spaced rows (after random start)'
  if (props.method === 'strat') return 'Stratified: random rows within each class year'
  if (props.method === 'stage') return 'Multi-stage: light dots = stage-1 pool dorms, blue = final sample'
  if (props.method === 'clust') return 'Cluster: whole dorms selected at once'
  if (props.method === 'purposive') return 'Purposive: highest scorers wherever they sit on the list'
  return 'SRS: each dot is one randomly chosen roster row'
})

const heatmapCaption = computed(() => {
  if (props.method === 'conv') return 'Convenience — sample from the left (top of list)'
  if (props.method === 'quota') return 'Quota — blue = in sample, gray stripe = passed over'
  if (props.method === 'sys') return 'Systematic — evenly spaced segments along the list'
  if (props.method === 'strat') return 'Stratified — picks within each class-year slice'
  if (props.method === 'stage') return 'Multi-stage — light blue = stage-1 pool, dark blue = final sample'
  if (props.method === 'clust') return 'Cluster — whole dorm blocks on the list'
  if (props.method === 'purposive') return 'Purposive — high-score students at their list positions'
  return 'Simple random sample — picks scattered along the full list'
})

const heatmapLegend = computed(() => {
  const base = `Left = list row 1, right = row ${props.rosterSize}.`
  if (props.method === 'stage') {
    return `${base} Light blue bottom = stage-1 pool; dark blue = in final sample.`
  }
  if (props.method === 'quota') {
    return `${base} Blue bottom = in sample; gray = passed over (quota full for that class year).`
  }
  return `${base} Blue bottom = someone from that segment is in the sample.`
})

function rosterPct(idx) {
  if (props.rosterSize <= 1) return '0%'
  return `${(idx / (props.rosterSize - 1)) * 100}%`
}

function mapMarkTitle(mark) {
  const row = mark.rosterIndex + 1
  if (mark.action === 'retry') return `Row #${row} — duplicate draw, not in sample`
  if (mark.action === 'skip') return `Row #${row} — passed over`
  if (mark.action === 'pool') return `Row #${row} — in stage-1 pool`
  return `Row #${row} — in sample`
}

const heatmapEl = ref(null)

watch(
  () => props.pulseIndex,
  async (idx) => {
    if (idx == null || !props.animating || !heatmapEl.value) return
    await nextTick()
    const binIdx = props.heatmapBins.findIndex((b) => idx >= b.lo && idx <= b.hi)
    if (binIdx >= 0) {
      const el = heatmapEl.value.querySelectorAll('.heatmap-bin')[binIdx]
      el?.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
    }
  }
)

watch(
  () => props.animating,
  async (on) => {
    if (on) return
    await nextTick()
    if (heatmapEl.value) heatmapEl.value.scrollLeft = 0
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
.walk-strip-wrap,
.roster-heatmap-wrap {
  margin-bottom: 0.65rem;
}
.walk-caption,
.heatmap-caption {
  font-size: 0.78rem;
  color: var(--text-muted, #64748b);
  margin: 0 0 0.35rem;
}
.roster-map {
  position: relative;
  height: 32px;
  margin: 0 2px 14px;
}
.roster-map-track {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 8px;
  transform: translateY(-50%);
  background: linear-gradient(90deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
}
.roster-map-tick {
  position: absolute;
  top: -4px;
  width: 1px;
  height: 16px;
  background: rgba(100, 116, 139, 0.45);
  transform: translateX(-50%);
}
.roster-map-end {
  position: absolute;
  top: 100%;
  font-size: 0.65rem;
  color: var(--text-muted, #64748b);
  margin-top: 2px;
}
.roster-map-end-right { right: 0; }
.roster-map-mark {
  position: absolute;
  top: 50%;
  width: 9px;
  height: 9px;
  margin-left: -4.5px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #2563eb;
  opacity: 0.9;
  z-index: 1;
}
.roster-map-mark.mark-pool { background: #93c5fd; }
.roster-map-mark.mark-skip { background: #94a3b8; opacity: 0.55; }
.roster-map-mark.mark-retry { background: #ef4444; width: 7px; height: 7px; margin-left: -3.5px; }
.roster-map-mark.mark-pulse {
  width: 13px;
  height: 13px;
  margin-left: -6.5px;
  box-shadow: 0 0 0 2px #f59e0b;
  z-index: 2;
}
.walk-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 36px;
  overflow: auto;
  padding: 4px;
  background: var(--bg-subtle, #f1f5f9);
  border-radius: 4px;
  margin-bottom: 0.35rem;
}
.walk-tile {
  width: 10px;
  height: 10px;
  border-radius: 1px;
  background: #cbd5e1;
}
.walk-tile.walk-in { background: #2563eb; }
.walk-tile.walk-skip {
  background: repeating-linear-gradient(-45deg, #94a3b8, #94a3b8 1px, #e2e8f0 1px, #e2e8f0 2px);
}
.walk-tile.walk-pulse { box-shadow: 0 0 0 2px #f59e0b; }
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
.leg-pool { background: #93c5fd; }
.leg-retry { background: #ef4444; border-radius: 50%; }
.leg-skip {
  background: repeating-linear-gradient(-45deg, #94a3b8, #94a3b8 1px, #e2e8f0 1px, #e2e8f0 2px);
}
.roster-heatmap {
  display: flex;
  width: 100%;
  height: 52px;
  gap: 1px;
  overflow-x: auto;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  padding: 2px;
  background: #fff;
}
.heatmap-bin {
  flex: 1 1 0;
  min-width: 3px;
  border-radius: 1px;
  opacity: 0.88;
}
.heatmap-bin.bin-in {
  box-shadow: inset 0 -4px 0 #2563eb;
  opacity: 1;
}
.heatmap-bin.bin-pool {
  box-shadow: inset 0 -4px 0 #93c5fd;
}
.heatmap-bin.bin-skip {
  box-shadow: inset 0 -4px 0 #94a3b8;
  opacity: 0.75;
}
.heatmap-bin.bin-pulse {
  outline: 2px solid #f59e0b;
  outline-offset: -1px;
  z-index: 1;
}
.grid-note {
  font-size: 0.75rem;
  color: var(--text-muted, #64748b);
  margin: 0.35rem 0 0;
}
</style>
