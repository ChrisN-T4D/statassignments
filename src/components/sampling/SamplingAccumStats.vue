<template>
  <div class="accum">
    <div class="accum-head">
      <span class="badge" :class="meta.random ? 'rand' : 'norand'">
        {{ meta.random ? 'Random' : 'Non-random' }}
      </span>
      <strong>{{ label }}: {{ meta.shortTitle }}</strong>
    </div>
    <ul class="stats">
      <li>Draws: <strong>{{ stats.n }}</strong></li>
      <li>Avg x̄: <strong>{{ stats.meanOfMeans.toFixed(3) }}</strong></li>
      <li>Bias vs μ: <strong>{{ stats.bias >= 0 ? '+' : '' }}{{ stats.bias.toFixed(3) }}</strong></li>
      <li>SD of x̄: <strong>{{ stats.sd.toFixed(3) }}</strong></li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  stats: { type: Object, required: true },
  meta: { type: Object, required: true },
})
</script>

<style scoped>
.accum {
  padding: 0.75rem;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 0.5rem;
}
.accum-head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
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
.stats {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
