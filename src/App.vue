<template>
  <div class="app">
    <header class="header">
      <div class="container header-content">
        <router-link to="/" class="logo">
          <img src="/logo_gif.gif" alt="Methods Market" class="logo-img" />
          <span class="logo-text">Methods<span class="logo-market">Market</span></span>
        </router-link>

        <div class="header-center">
          <ClassSelector />
        </div>

        <nav class="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link v-if="selectedClass" :to="`/class/${selectedClassId}`">
            {{ selectedClass.short_name }}
          </router-link>
          <router-link v-if="isAdmin" to="/admin">Admin</router-link>
          <router-link v-if="isInstructor" to="/instructor">Dashboard</router-link>
          <router-link v-if="isAuthenticated" to="/profile">Profile</router-link>
          <template v-if="isAuthenticated">
            <a href="#" @click.prevent="handleSignOut" class="nav-link">Sign Out</a>
          </template>
          <router-link v-else to="/auth">Sign In</router-link>
        </nav>

        <div class="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'
import { useClasses } from './composables/useClasses'
import ThemeToggle from './components/ThemeToggle.vue'
import ClassSelector from './components/ClassSelector.vue'

const router = useRouter()
const { user, isAuthenticated, signOut } = useAuth()
const { selectedClass, selectedClassId } = useClasses()

const isInstructor = computed(() => user.value?.role === 'instructor')
const isAdmin = computed(() => user.value?.role === 'admin')

function handleSignOut() {
  signOut()
  // Force full page reload to clear all state and refresh auth
  window.location.href = '/'
}
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  width: auto;
  border-radius: 8px;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.logo-market {
  color: var(--primary);
}

.header-center {
  display: flex;
  align-items: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 1rem;
}

@media (max-width: 768px) {
  .header-center {
    order: 3;
    width: 100%;
    margin-top: 0.75rem;
  }

  .header-actions {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>
