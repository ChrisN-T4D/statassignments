<template>
  <div class="app">
    <header class="header">
      <div class="container header-content">
        <router-link to="/" class="logo">
          Stats<span>Psych</span>
        </router-link>

        <div class="header-center">
          <ClassSelector />
        </div>

        <nav class="nav">
          <router-link to="/">Home</router-link>
          <router-link v-if="selectedClass" :to="`/class/${selectedClassId}`">
            {{ selectedClass.shortName }}
          </router-link>
          <router-link to="/practice">Practice</router-link>
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
import { useClass } from './composables/useClass'
import ThemeToggle from './components/ThemeToggle.vue'
import ClassSelector from './components/ClassSelector.vue'

const router = useRouter()
const { user, isAuthenticated, signOut } = useAuth()
const { selectedClass, selectedClassId } = useClass()

const isInstructor = computed(() => user.value?.role === 'instructor')

function handleSignOut() {
  signOut()
  router.push('/')
}
</script>

<style scoped>
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
