<template>
  <div class="home">
    <div class="container">
      <div class="page-header">
        <h1>Statistics for Psychology</h1>
        <p>Learn introductory statistics with practical examples in SPSS, R, Excel, Stata, and jamovi.</p>
      </div>

      <div class="topic-grid">
        <router-link
          v-for="topic in topics"
          :key="topic.id"
          :to="`/topic/${topic.id}`"
          class="card card-link"
        >
          <div class="card-icon">{{ topic.icon }}</div>
          <h3>{{ topic.title }}</h3>
          <p>{{ topic.description }}</p>
        </router-link>
      </div>

      <div class="content-section" style="margin-top: 3rem;">
        <h2>Software Covered</h2>
        <p>Each topic includes step-by-step instructions for multiple statistical software packages:</p>
        <div class="software-list">
          <div v-for="sw in software" :key="sw.id" class="software-item">
            <span class="software-badge" :style="{ backgroundColor: sw.color }">{{ sw.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { topics, software } from '../data/topics.js'
</script>

<style scoped>
.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.software-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.software-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
}
</style>
