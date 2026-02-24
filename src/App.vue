<template>
  <div class="app">
    <header class="header">
      <div class="container header-content">
        <router-link to="/" class="logo">
          <img src="/logo_gif.gif" alt="Methods Market" class="logo-img" />
          <span class="logo-text">Methods<span class="logo-market">Market</span></span>
        </router-link>

        <div class="header-actions">
          <NavMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <!-- Global Resources Drawer (Available on all pages) -->
    <ResourcesDrawer
      :show-tools="true"
      :show-recording="true"
      :show-software-links="true"
    />
  </div>
</template>

<script setup>
import ThemeToggle from './components/ThemeToggle.vue'
import NavMenu from './components/NavMenu.vue'
import ResourcesDrawer from './components/ResourcesDrawer.vue'
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

@media (max-width: 768px) {
  .header-actions {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>
