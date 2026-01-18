<template>
  <div class="home">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero">
        <h1>Statistics for Psychology</h1>
        <p>Learn introductory statistics with practical examples in SPSS, R, Excel, Stata, and jamovi.</p>
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
            :to="`/class/${cls.id}`"
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

      <!-- Quick Info -->
      <div class="info-section">
        <div class="info-card">
          <div class="info-icon">📖</div>
          <h3>Learn Concepts</h3>
          <p>Clear explanations of statistical concepts with real psychology examples.</p>
        </div>
        <div class="info-card">
          <div class="info-icon">💻</div>
          <h3>Software Tutorials</h3>
          <p>Step-by-step guides for jamovi, SPSS, R, Stata, and Excel.</p>
        </div>
        <div class="info-card">
          <div class="info-icon">✏️</div>
          <h3>Practice Until Mastery</h3>
          <p>Interactive exercises with unlimited retries until you get it right.</p>
        </div>
      </div>

      <!-- Software Badges -->
      <div class="software-section">
        <h3>Software Covered</h3>
        <div class="software-badges">
          <span v-for="sw in software" :key="sw.id" class="software-badge" :style="{ backgroundColor: sw.color }">
            {{ sw.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useClasses } from '../composables/useClasses'
import { software } from '../data/topics.js'

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
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.info-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}

.info-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.info-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.info-card p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.software-section {
  text-align: center;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
}

.software-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--text-secondary);
}

.software-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.software-badge {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.75rem;
  }

  .classes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
