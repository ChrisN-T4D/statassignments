<template>
  <div v-if="toast" class="badge-toast" role="status" aria-live="polite">
    <span>{{ toast }}</span>
    <router-link to="/profile" class="badge-toast-link" @click="dismiss">See badges</router-link>
    <button type="button" class="badge-toast-x" aria-label="Dismiss" @click="dismiss">×</button>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useAwards } from '../composables/useAwards.js'

const { toast } = useAwards()
let timer = null

function dismiss() {
  toast.value = ''
}

watch(toast, (v) => {
  clearTimeout(timer)
  if (v) timer = setTimeout(dismiss, 9000)
})
</script>

<style scoped>
.badge-toast {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: calc(100vw - 32px);
  padding: 0.65rem 0.9rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.35));
  font-weight: 600;
}
.badge-toast-link { color: var(--primary-text); font-size: 0.9rem; white-space: nowrap; }
.badge-toast-x { border: 0; background: none; color: inherit; font-size: 1.3rem; cursor: pointer; min-width: 32px; min-height: 32px; line-height: 1; }
</style>
