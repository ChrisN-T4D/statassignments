<template>
  <div class="home">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero">
        <h1>Methods<span>Market</span></h1>
        <p>Research methods modules, statistics support, and software how-tos for psychology.</p>
      </div>

      <!-- Class Selection -->
      <div class="classes-section">
        <h2>Select Your Course</h2>
        <p class="section-subtitle">Choose your course to access relevant topics and practice exercises.</p>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <span>Loading courses...</span>
        </div>

        <div v-else class="classes-grid">
            <router-link
              v-for="cls in classes"
              :key="cls.id"
              :to="`/class/${cls.slug || cls.id}`"
              class="class-card"
              :style="{ '--class-color': cls.color }"
              @click="selectClass(cls.id)"
            >
              <div class="class-icon">{{ cls.icon }}</div>
              <div class="class-content">
                <h3>{{ cls.name }}</h3>
                <p>{{ cls.description }}</p>
              </div>
              <span class="class-arrow">→</span>
            </router-link>
        </div>
      </div>

      <!-- Footer: About, FAQ, Help for professors -->
      <footer class="home-footer">
        <div class="footer-links">
          <router-link to="/about">About</router-link>
          <span class="footer-sep">·</span>
          <router-link to="/about#faq">FAQ</router-link>
        </div>
        <p class="footer-help">
          Need help? Professors using this platform:
          <a href="mailto:support@methodsmartet.com">contact support</a>.
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useClasses } from '../composables/useClasses'

const { classes, loading, fetchClasses, selectClass } = useClasses()

onMounted(() => {
  fetchClasses()
})
</script>

<style scoped>
.home {
  padding-bottom: 3rem;
}

.hero {
  text-align: center;
  padding: 3rem 0 2rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.hero h1 span {
  color: var(--primary);
}

.hero p {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}

.classes-section {
  margin-bottom: 3rem;
}

.classes-section h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem;
  color: var(--text-secondary);
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.classes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.class-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.class-card:hover {
  border-color: var(--class-color, var(--primary));
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.class-icon {
  width: 56px;
  height: 56px;
  background: color-mix(in srgb, var(--class-color, var(--primary)) 15%, transparent);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
}

.class-content {
  flex: 1;
  min-width: 0;
}

.class-content h3 {
  margin: 0 0 0.375rem 0;
  font-size: 1.125rem;
}

.class-content p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.class-arrow {
  font-size: 1.25rem;
  color: var(--text-muted);
  transition: transform 0.2s, color 0.2s;
}

.class-card:hover .class-arrow {
  transform: translateX(4px);
  color: var(--class-color, var(--primary));
}

.home-footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 2rem;
  border-top: 1px solid var(--border);
}

.footer-links {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-sep {
  margin: 0 0.5rem;
  color: var(--text-muted);
}

.footer-help {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.footer-help a {
  color: var(--primary);
  text-decoration: none;
}

.footer-help a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .classes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
