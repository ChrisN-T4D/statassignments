<template>
  <div
    class="mcb"
    role="img"
    :aria-label="`${workshopLegend} and ${controlLegend} pre means approximately ${a.toFixed(1)} and ${b.toFixed(1)}`"
  >
    <div class="mcb-axis">
      <span>10</span>
      <span>55</span>
      <span>100</span>
    </div>
    <div class="mcb-track">
      <div
        class="mcb-marker mcb-a"
        :style="{ left: pct(a) + '%' }"
        :title="workshopTitle + ' ' + a.toFixed(1)"
      />
      <div
        class="mcb-marker mcb-b"
        :style="{ left: pct(b) + '%' }"
        :title="controlTitle + ' ' + b.toFixed(1)"
      />
    </div>
    <div class="mcb-legend">
      <span><i class="mcb-dot mcb-dot-a" /> {{ workshopLegend }}</span>
      <span><i class="mcb-dot mcb-dot-b" /> {{ controlLegend }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  a: { type: Number, required: true },
  b: { type: Number, required: true },
  max: { type: Number, default: 100 },
  workshopTitle: { type: String, default: 'Workshop group mean pre score' },
  controlTitle: { type: String, default: 'Control group mean pre score' },
  workshopLegend: { type: String, default: 'Workshop' },
  controlLegend: { type: String, default: 'Control' }
})

function pct(v) {
  const lo = 10
  const hi = props.max
  return Math.max(0, Math.min(100, ((v - lo) / (hi - lo)) * 100))
}
</script>

<style scoped>
.mcb {
  width: 100%;
}

.mcb-axis {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}

.mcb-track {
  position: relative;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    hsl(210 55% 38% / 0.35),
    hsl(60 70% 48% / 0.35)
  );
  border: 1px solid var(--border);
}

.mcb-marker {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 18px;
  margin-left: -2px;
  border-radius: 2px;
  transform: translateY(-50%);
}

.mcb-a {
  background: #2563eb;
  box-shadow: 0 0 0 2px var(--bg-card);
}

.mcb-b {
  background: #ea580c;
  box-shadow: 0 0 0 2px var(--bg-card);
}

.mcb-legend {
  display: flex;
  gap: 1rem;
  font-size: 0.72rem;
  margin-top: 0.35rem;
  color: var(--text-secondary);
}

.mcb-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  margin-right: 0.25rem;
  vertical-align: middle;
}

.mcb-dot-a {
  background: #2563eb;
}

.mcb-dot-b {
  background: #ea580c;
}
</style>
