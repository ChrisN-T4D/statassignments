<template>
  <div class="app">
    <header class="header">
      <div class="container header-content">
        <router-link to="/" class="logo">
          Stats<span>Psych</span>
        </router-link>
        <nav class="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/topic/descriptive-stats">Topics</router-link>
          <router-link to="/practice">Practice</router-link>
          <router-link v-if="isAuthenticated" to="/profile">Profile</router-link>
          <router-link v-else to="/auth">Sign In</router-link>
        </nav>
      </div>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuth } from './composables/useAuth'

const { isAuthenticated } = useAuth()
</script>
