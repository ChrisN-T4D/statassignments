<template>
  <div class="lab-stub">{{ labType }} mode={{ mode }}</div>
</template>

<script setup>
defineProps({
  mode: { type: String, default: 'solo' },
  liveState: { type: Object, default: null },
})
const labType = 'central-tendency'
</script>

<style scoped>
.lab-stub {
  padding: 1rem;
  color: var(--text-secondary);
  font-family: ui-monospace, monospace;
  font-size: 0.9rem;
}
</style>
