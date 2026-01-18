<template>
  <div class="class-selector">
    <button
      class="selector-trigger"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-label="`Select class. Currently: ${selectedClass?.name || 'None selected'}`"
    >
      <span v-if="selectedClass" class="selected-class">
        <span class="class-icon" :style="{ background: selectedClass.color + '20', color: selectedClass.color }">
          {{ selectedClass.icon }}
        </span>
        <span class="class-name">{{ selectedClass.short_name }}</span>
      </span>
      <span v-else class="placeholder">Select Class</span>
      <svg class="chevron" :class="{ open: isOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown" role="listbox">
        <button
          v-for="cls in classes"
          :key="cls.id"
          class="dropdown-item"
          :class="{ active: selectedClassId === cls.id }"
          role="option"
          :aria-selected="selectedClassId === cls.id"
          @click="handleSelect(cls.id)"
        >
          <span class="class-icon" :style="{ background: cls.color + '20', color: cls.color }">
            {{ cls.icon }}
          </span>
          <div class="class-info">
            <span class="class-name">{{ cls.name }}</span>
            <span class="class-description">{{ cls.description }}</span>
          </div>
          <svg v-if="selectedClassId === cls.id" class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </Transition>

    <!-- Click outside to close -->
    <div v-if="isOpen" class="backdrop" @click="isOpen = false"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useClasses } from '../composables/useClasses'

const { classes, selectedClassId, selectedClass, selectClass, navigateToClass, fetchClasses } = useClasses()

// Ensure classes are loaded
onMounted(() => {
  fetchClasses()
})

const isOpen = ref(false)

function handleSelect(classId) {
  navigateToClass(classId)
  isOpen.value = false
}

// Close on Escape key
function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.class-selector {
  position: relative;
}

.selector-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.selector-trigger:hover {
  border-color: var(--primary);
}

.selector-trigger:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.selected-class {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.class-icon {
  width: 28px;
  height: 28px;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.class-name {
  font-weight: 500;
}

.placeholder {
  color: var(--text-muted);
}

.chevron {
  color: var(--text-secondary);
  transition: transform 0.2s;
  margin-left: 0.25rem;
}

.chevron.open {
  transform: rotate(180deg);
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
}

.dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 300px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-lg);
  z-index: 50;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  color: var(--text-primary);
}

.dropdown-item:hover {
  background: var(--bg-elevated);
}

.dropdown-item.active {
  background: var(--note-bg);
}

.dropdown-item .class-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.class-info {
  flex: 1;
  min-width: 0;
}

.class-info .class-name {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.class-description {
  display: block;
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.check-icon {
  flex-shrink: 0;
  color: var(--primary);
  margin-top: 0.125rem;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
