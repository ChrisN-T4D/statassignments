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
</style>
