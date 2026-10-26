<template>
  <section class="bc" :class="{ compact }" :aria-label="`${set.title} badges`">
    <div class="bc-module">
      <svg class="bc-hex big" :class="moduleTier" viewBox="0 0 100 110" role="img" :aria-label="`${set.moduleBadge.name} badge: ${tierLabel(moduleTier)}`">
        <polygon points="50,4 94,28 94,82 50,106 6,82 6,28" class="bc-shape" />
        <polygon points="50,14 85,33 85,77 50,96 15,77 15,33" class="bc-inner" />
        <polygon v-if="set.moduleBadge.glyph === '★'" :points="STAR" class="bc-draw" />
        <text v-else x="50" y="62" text-anchor="middle" class="bc-glyph big">{{ set.moduleBadge.glyph }}</text>
      </svg>
      <div class="bc-module-text">
        <strong>{{ set.moduleBadge.name }}</strong>
        <span v-if="moduleTier === 'mastered'">Every {{ set.title }} topic mastered</span>
        <span v-else>{{ doneCount }} of {{ set.topics.length }} topics mastered</span>
      </div>
    </div>

    <ul class="bc-slots">
      <li v-for="t in topicSlots" :key="t.awardId" class="bc-slot" :class="t.tier">
        <svg class="bc-hex" :class="t.tier" viewBox="0 0 100 110" role="img" :aria-label="`${t.name}: ${tierLabel(t.tier)}`">
          <polygon points="50,4 94,28 94,82 50,106 6,82 6,28" class="bc-shape" />
          <polygon points="50,14 85,33 85,77 50,96 15,77 15,33" class="bc-inner" />
          <polyline v-if="t.glyph === '↗'" points="30,68 44,54 54,62 72,40" class="bc-draw line" />
          <text v-else x="50" y="62" text-anchor="middle" class="bc-glyph">{{ t.glyph }}</text>
        </svg>
        <span class="bc-name">{{ t.name }}</span>
        <span class="bc-state">{{ tierLabel(t.tier) }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { studentTier, tierLabel } from '../data/badges.js'

const props = defineProps({
  set: { type: Object, required: true },
  /** Awards from the server: [{ award_id, state }] */
  awards: { type: Array, default: () => [] },
  compact: { type: Boolean, default: false }
})

// Drawn, not typed, so it shows on every device regardless of fonts
const STAR = Array.from({ length: 10 }, (_, i) => {
  const r = i % 2 === 0 ? 24 : 10
  const a = (Math.PI / 5) * i - Math.PI / 2
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(55 + r * Math.sin(a)).toFixed(1)}`
}).join(' ')

const byId = computed(() => Object.fromEntries(props.awards.map((a) => [a.award_id, a])))
const topicSlots = computed(() => props.set.topics.map((t) => ({ ...t, tier: studentTier(byId.value[t.awardId]?.state) })))
const moduleTier = computed(() => studentTier(byId.value[props.set.moduleBadge.awardId]?.state))
const doneCount = computed(() => topicSlots.value.filter((t) => t.tier === 'mastered').length)
</script>

<style scoped>
.bc { display: grid; gap: 1rem; }
.bc-module { display: flex; align-items: center; gap: 1rem; }
.bc-module-text { display: grid; gap: 0.15rem; }
.bc-module-text span { color: var(--text-secondary); font-size: 0.9rem; }
.bc-slots { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 0.75rem; }
.bc-slot { display: grid; justify-items: center; gap: 0.2rem; text-align: center; }
.bc-name { font-size: 0.78rem; font-weight: 600; line-height: 1.2; }
.bc-state { font-size: 0.72rem; color: var(--text-secondary); }
.bc-slot.mastered .bc-state { color: var(--success); font-weight: 600; }
.bc-hex { width: 64px; height: 70px; }
.bc-hex.big { width: 96px; height: 106px; flex: none; }
.bc-shape { fill: var(--bg-elevated, #222); stroke: var(--border, #666); stroke-width: 3; }
.bc-inner { fill: none; stroke: var(--border, #666); stroke-width: 1.5; }
.bc-glyph { font-size: 26px; font-weight: 700; fill: var(--text-secondary, #888); font-family: system-ui, sans-serif; }
.bc-glyph.big { font-size: 40px; }
.bc-draw { fill: var(--text-secondary, #888); stroke: none; }
.bc-draw.line { fill: none; stroke: var(--text-secondary, #888); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
.bc-hex.practice .bc-draw { fill: #f1c9a5; }
.bc-hex.practice .bc-draw.line { fill: none; stroke: #f1c9a5; }
.bc-hex.mastered .bc-draw { fill: #fff4c7; }
.bc-hex.mastered .bc-draw.line { fill: none; stroke: #fff4c7; }
.bc-hex.locked .bc-shape { stroke-dasharray: 6 5; }
.bc-hex.locked { opacity: 0.55; }
.bc-hex.practice .bc-shape { fill: #6b4a2f; stroke: #c98c5a; }
.bc-hex.practice .bc-inner { stroke: #c98c5a; }
.bc-hex.practice .bc-glyph { fill: #f1c9a5; }
.bc-hex.mastered .bc-shape { fill: #8a6a12; stroke: #f2c94c; filter: drop-shadow(0 0 6px rgba(242, 201, 76, 0.45)); }
.bc-hex.mastered .bc-inner { stroke: #f2c94c; }
.bc-hex.mastered .bc-glyph { fill: #fff4c7; }
.compact .bc-module { gap: 0.6rem; }
.compact .bc-hex.big { width: 64px; height: 70px; }
.compact .bc-slots { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 0.5rem; }
.compact .bc-hex { width: 46px; height: 51px; }
.compact .bc-state { display: none; }
.compact .bc-name { font-size: 0.7rem; }
</style>
