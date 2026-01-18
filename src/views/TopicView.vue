<template>
  <div class="topic-view" v-if="topic">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span>/</span>
        <span>{{ topic.title }}</span>
      </div>

      <div class="page-header">
        <h1>{{ topic.icon }} {{ topic.title }}</h1>
        <p>{{ topic.description }}</p>
      </div>

      <!-- Topic Navigation -->
      <div class="topic-nav">
        <router-link
          v-for="t in topics"
          :key="t.id"
          :to="`/topic/${t.id}`"
          class="topic-nav-item"
          :class="{ active: t.id === id }"
        >
          {{ t.title }}
        </router-link>
      </div>

      <!-- Concept Explanation -->
      <div class="content-section">
        <h2>Understanding {{ topic.title }}</h2>
        <component :is="conceptComponent" />
      </div>

      <!-- Software Instructions -->
      <div class="content-section">
        <h2>How to Calculate in Software</h2>

        <div class="software-tabs">
          <button
            v-for="sw in software"
            :key="sw.id"
            class="software-tab"
            :class="{ active: activeSoftware === sw.id }"
            @click="activeSoftware = sw.id"
          >
            {{ sw.name }}
          </button>
        </div>

        <component :is="softwareComponent" />
      </div>

      <!-- Practice Section -->
      <div class="content-section practice-section">
        <h2>Let's Practice!</h2>
        <p class="practice-intro">
          Ready to apply what you've learned? Practice using statistical software
          in our interactive simulator. Keep trying until you master each concept!
        </p>

        <div class="practice-cards">
          <router-link
            v-for="sw in software"
            :key="sw.id"
            :to="`/software-practice/${id}?software=${sw.id}`"
            class="practice-card"
            :style="{ '--sw-color': sw.color }"
          >
            <div class="practice-card-icon">{{ getSoftwareIcon(sw.id) }}</div>
            <div class="practice-card-content">
              <h3>Practice in {{ sw.name }}</h3>
              <p>Interactive {{ sw.id === 'r' || sw.id === 'stata' ? 'code' : 'menu' }} exercises</p>
            </div>
            <span class="practice-arrow">→</span>
          </router-link>
        </div>

        <router-link
          :to="`/software-practice/${id}`"
          class="practice-all-link"
        >
          View all practice exercises for this topic →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { topics, software } from '../data/topics.js'

// Concept explanations
import DescriptiveStatsConcept from '../content/concepts/DescriptiveStats.vue'
import VisualizationsConcept from '../content/concepts/Visualizations.vue'
import NormalDistributionConcept from '../content/concepts/NormalDistribution.vue'
import ZScoresConcept from '../content/concepts/ZScores.vue'
import ProbabilityConcept from '../content/concepts/Probability.vue'
import SamplingConcept from '../content/concepts/Sampling.vue'
import HypothesisTestingConcept from '../content/concepts/HypothesisTesting.vue'
import TTestsConcept from '../content/concepts/TTests.vue'
import CorrelationConcept from '../content/concepts/Correlation.vue'
import RegressionConcept from '../content/concepts/Regression.vue'

// Software instructions
import DescriptiveStatsSPSS from '../content/software/descriptive-stats/SPSS.vue'
import DescriptiveStatsR from '../content/software/descriptive-stats/R.vue'
import DescriptiveStatsExcel from '../content/software/descriptive-stats/Excel.vue'
import DescriptiveStatsStata from '../content/software/descriptive-stats/Stata.vue'
import DescriptiveStatsJamovi from '../content/software/descriptive-stats/Jamovi.vue'

import VisualizationsSPSS from '../content/software/visualizations/SPSS.vue'
import VisualizationsR from '../content/software/visualizations/R.vue'
import VisualizationsExcel from '../content/software/visualizations/Excel.vue'
import VisualizationsStata from '../content/software/visualizations/Stata.vue'
import VisualizationsJamovi from '../content/software/visualizations/Jamovi.vue'

import DefaultSoftware from '../content/software/Default.vue'

const props = defineProps({
  id: String
})

const activeSoftware = ref('spss')

const topic = computed(() => topics.find(t => t.id === props.id))

const conceptComponents = {
  'descriptive-stats': DescriptiveStatsConcept,
  'visualizations': VisualizationsConcept,
  'normal-distribution': NormalDistributionConcept,
  'z-scores': ZScoresConcept,
  'probability': ProbabilityConcept,
  'sampling': SamplingConcept,
  'hypothesis-testing': HypothesisTestingConcept,
  't-tests': TTestsConcept,
  'correlation': CorrelationConcept,
  'regression': RegressionConcept
}

const softwareComponents = {
  'descriptive-stats': {
    spss: DescriptiveStatsSPSS,
    r: DescriptiveStatsR,
    excel: DescriptiveStatsExcel,
    stata: DescriptiveStatsStata,
    jamovi: DescriptiveStatsJamovi
  },
  'visualizations': {
    spss: VisualizationsSPSS,
    r: VisualizationsR,
    excel: VisualizationsExcel,
    stata: VisualizationsStata,
    jamovi: VisualizationsJamovi
  }
}

const conceptComponent = computed(() => {
  return conceptComponents[props.id] || DescriptiveStatsConcept
})

const softwareComponent = computed(() => {
  const topicSoftware = softwareComponents[props.id]
  if (topicSoftware && topicSoftware[activeSoftware.value]) {
    return topicSoftware[activeSoftware.value]
  }
  return DefaultSoftware
})

watch(() => props.id, () => {
  activeSoftware.value = 'spss'
})

function getSoftwareIcon(swId) {
  const icons = {
    spss: '📊',
    r: '📈',
    excel: '📗',
    stata: '📉',
    jamovi: '🔬'
  }
  return icons[swId] || '💻'
}
</script>

<style scoped>
.topic-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.topic-nav-item {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.topic-nav-item:hover {
  text-decoration: none;
  border-color: var(--primary);
  color: var(--primary);
}

.topic-nav-item.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* Practice Section Styles */
.practice-section {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem;
}

.practice-intro {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.practice-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.practice-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: white;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.practice-card:hover {
  border-color: var(--sw-color, var(--primary));
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.practice-card-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 0.5rem;
}

.practice-card-content h3 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
}

.practice-card-content p {
  margin: 0.25rem 0 0 0;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.practice-arrow {
  margin-left: auto;
  color: var(--text-secondary);
  font-size: 1.25rem;
  transition: transform 0.2s;
}

.practice-card:hover .practice-arrow {
  transform: translateX(4px);
  color: var(--sw-color, var(--primary));
}

.practice-all-link {
  display: inline-block;
  color: var(--primary);
  font-weight: 500;
  font-size: 0.875rem;
}

.practice-all-link:hover {
  text-decoration: underline;
}
</style>
