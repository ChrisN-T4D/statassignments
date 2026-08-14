<template>
  <div class="sp-print-packet">
    <header class="packet-header">
      <h2>Software Practice print packet</h2>
      <p>{{ lessonTitle }} · {{ softwareLabel }} · {{ moduleLabel }}</p>
      <p class="packet-note">Work in your statistics software. Keep I do / We do for yourself. Record You do, then upload the video to Canvas (Module Software Practice). Do not upload this packet.</p>
    </header>

    <section v-if="learnSections.length" class="packet-section">
      <h3>I do — Learn</h3>
      <article v-for="section in learnSections" :key="section.id" class="learn-section">
        <h4>{{ section.title }}</h4>
        <ul v-if="section.objectives?.length">
          <li v-for="(obj, i) in section.objectives" :key="i">{{ obj }}</li>
        </ul>
        <div v-for="(block, i) in section.blocks" :key="i" class="learn-block">
          <p v-if="block.text" v-html="block.text"></p>
          <ol v-if="block.steps?.length">
            <li v-for="(step, si) in block.steps" :key="si">
              <strong v-if="step.title">{{ step.title }}: </strong>
              <span v-html="step.description || step.instruction || ''"></span>
            </li>
          </ol>
        </div>
      </article>
    </section>

    <section v-if="weDoSteps.length" class="packet-section">
      <h3>We do — Practice</h3>
      <ol>
        <li v-for="(step, i) in weDoSteps" :key="i" class="we-step">
          <p v-html="step.instruction"></p>
          <p v-if="step.checkpoint" class="checkpoint"><strong>Checkpoint:</strong> {{ step.checkpoint }}</p>
          <p class="q-blank">What you saw: ________________________________</p>
        </li>
      </ol>
    </section>

    <section class="packet-section">
      <h3>You do — Apply (record this)</h3>
      <ol class="record-steps">
        <li>Start recording (Methods Market Tools if you have internet, or your phone / computer recorder).</li>
        <li>Complete the independent tasks below while you talk through what you are doing.</li>
        <li>Stop, save the file, and upload the video to Canvas: <strong>{{ canvasAssignmentName }}</strong>.</li>
      </ol>
      <ol v-if="youDoTasks.length" class="you-tasks">
        <li v-for="(task, i) in youDoTasks" :key="i">
          <strong>{{ task.title }}</strong>
          <p>{{ task.instructions || task.description }}</p>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup>
defineProps({
  lessonTitle: { type: String, default: 'Software Practice' },
  softwareLabel: { type: String, default: 'jamovi' },
  moduleLabel: { type: String, default: '' },
  canvasAssignmentName: { type: String, default: 'Module N: Software Practice' },
  learnSections: { type: Array, default: () => [] },
  weDoSteps: { type: Array, default: () => [] },
  youDoTasks: { type: Array, default: () => [] }
})
</script>

<style scoped>
.sp-print-packet {
  color: #111;
  background: #fff;
  padding: 1rem;
}
.packet-section {
  margin-top: 1.5rem;
  break-inside: avoid;
}
.we-step,
.you-tasks li {
  margin-bottom: 0.85rem;
}
.q-blank {
  margin-top: 0.25rem;
}
@media print {
  .sp-print-packet {
    padding: 0;
  }
}
</style>
