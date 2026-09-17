<template>
  <div class="strip-wrap">
    <div class="strip-title">{{ title }} — each dot is one x̄</div>
    <svg class="strip-svg" :viewBox="'0 0 ' + width + ' ' + height" xmlns="http://www.w3.org/2000/svg">
      <line :x1="muX" :x2="muX" y1="4" :y2="height - 4" class="mu-line" />
      <text :x="muX + 3" y="12" class="mu-label">μ</text>
      <circle
        v-for="dot in dots"
        :key="title + '-' + dot.i"
        :cx="dot.x"
        :cy="dot.y"
        r="3"
        class="xbar-dot"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { xbarStripDots } from '../../lib/samplingSim.js'

const props = defineProps({
  title: { type: String, required: true },
  means: { type: Array, default: () => [] },
  popMean: { type: Number, required: true },
  lo: { type: Number, required: true },
  hi: { type: Number, required: true },
  width: { type: Number, default: 360 },
  height: { type: Number, default: 48 },
})

const dots = computed(() =>
  xbarStripDots(props.means, props.popMean, props.lo, props.hi, props.width, props.height)
)

const muX = computed(() => {
  if (props.hi <= props.lo) return props.width / 2
  const pad = 8
  const innerW = props.width - pad * 2
  return pad + ((props.popMean - props.lo) / (props.hi - props.lo)) * innerW
})
</script>

<style scoped>
.strip-wrap {
  padding: 0.5rem;
  border: 1px dashed var(--border, #cbd5e1);
  border-radius: 0.5rem;
}
.strip-title {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.strip-svg {
  width: 100%;
  max-width: 380px;
  height: auto;
}
.mu-line {
  stroke: #dc2626;
  stroke-width: 1.5;
  stroke-dasharray: 3 2;
}
.mu-label {
  fill: #dc2626;
  font-size: 10px;
  font-weight: 700;
}
.xbar-dot {
  fill: #2563eb;
  opacity: 0.75;
}
</style>
