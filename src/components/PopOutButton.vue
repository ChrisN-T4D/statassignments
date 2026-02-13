<template>
  <button
    @click="handlePopOut"
    class="pop-out-btn"
    :class="{ active: isPopupOpen }"
    :title="isPopupOpen ? 'Instructions window is open' : 'Open instructions in new window'"
  >
    <span class="btn-icon">{{ isPopupOpen ? '📖' : '🔗' }}</span>
    {{ isPopupOpen ? 'Instructions Open' : 'Pop Out Instructions' }}
  </button>
</template>

<script setup>
import { usePopOutInstructions } from '../composables/usePopOutInstructions'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 600
  }
})

const { isPopupOpen, openInstructions, checkPopupStatus } = usePopOutInstructions()

// Check popup status on mount
checkPopupStatus()

function handlePopOut() {
  if (isPopupOpen.value) {
    // Already open - focus the window
    checkPopupStatus()
    return
  }

  const success = openInstructions({
    title: props.title,
    content: props.content,
    width: props.width,
    height: props.height
  })

  if (!success) {
    alert('Failed to open instructions window. Please check your popup blocker settings.')
  }
}
</script>

<style scoped>
.pop-out-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: white;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.pop-out-btn:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-1px);
}

.pop-out-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.btn-icon {
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .pop-out-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
