<template>
  <div class="nav-menu">
    <button
      class="menu-trigger"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      :aria-label="isOpen ? 'Close menu' : 'Open menu'"
    >
      <span class="trigger-label">Menu</span>
      <svg class="chevron" :class="{ open: isOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown" role="menu">
        <router-link to="/" class="dropdown-item" role="menuitem" @click="close">Home</router-link>
        <router-link to="/about" class="dropdown-item" role="menuitem" @click="close">About</router-link>
        <router-link
          v-if="selectedClass"
          :to="`/class/${selectedClassId}`"
          class="dropdown-item dropdown-item-class"
          role="menuitem"
          @click="close"
        >
          <span class="class-icon" :style="{ background: selectedClass.color + '20', color: selectedClass.color }">
            {{ selectedClass.icon }}
          </span>
          <span>{{ selectedClass.short_name }}</span>
        </router-link>
        <router-link v-if="isAdmin" to="/admin" class="dropdown-item" role="menuitem" @click="close">Admin</router-link>
        <router-link v-if="isInstructor" to="/instructor" class="dropdown-item" role="menuitem" @click="close">Dashboard</router-link>
        <router-link v-if="isAuthenticated" to="/profile" class="dropdown-item" role="menuitem" @click="close">Profile</router-link>
        <template v-if="isAuthenticated">
          <button type="button" class="dropdown-item dropdown-item-action" role="menuitem" @click="handleSignOut">
            Sign Out
          </button>
        </template>
        <router-link v-else to="/auth" class="dropdown-item" role="menuitem" @click="close">Sign In</router-link>
      </div>
    </Transition>

    <div v-if="isOpen" class="backdrop" @click="isOpen = false" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useClasses } from '../composables/useClasses'

const { user, isAuthenticated, signOut } = useAuth()
const { selectedClass, selectedClassId, fetchClasses } = useClasses()

onMounted(() => {
  fetchClasses()
})

const isOpen = ref(false)
const isInstructor = computed(() => user.value?.role === 'instructor')
const isAdmin = computed(() => user.value?.role === 'admin')

function close() {
  isOpen.value = false
}

function handleSignOut() {
  signOut()
  isOpen.value = false
  window.location.href = '/'
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) isOpen.value = false
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.nav-menu {
  position: relative;
}

.menu-trigger {
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

.menu-trigger:hover {
  border-color: var(--primary);
}

.menu-trigger:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.trigger-label {
  font-weight: 500;
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
  right: 0;
  min-width: 180px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-lg);
  z-index: 50;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 0.875rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: background 0.15s;
  font-family: inherit;
}

.dropdown-item:hover {
  background: var(--bg-elevated);
}

.dropdown-item-class .class-icon {
  width: 24px;
  height: 24px;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.dropdown-item-action {
  color: var(--primary);
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
