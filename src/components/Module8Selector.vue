<template>
<section class="module8-selector">
 <h2>Choose at least two complete chapters</h2>
 <p>You are not expected to complete every chapter in Module 8. Choose a minimum of two chapters. For each selected chapter, complete its readings, walkthroughs, practice activities, and required submission. Additional chapters are optional.</p>
 <p>Earlier individual-analysis selections must be confirmed as whole chapters. Your existing completed work is preserved.</p>
 <p role="status">{{ draft.length }} of 4 chapters selected · minimum 2</p>
 <div class="chapters">
  <article v-for="chapter in chapters" :key="chapter.key">
   <label><input type="checkbox" :value="chapter.key" v-model="draft"> Chapter {{chapter.number}}: {{chapter.title}}</label>
   <p>{{chapter.why}}</p><p><strong>Example:</strong> {{chapter.example}}</p>
   <p><strong>The complete chapter includes:</strong> {{chapter.includes}}</p>
   <ol><li>Read all topics in this chapter.</li><li>Complete its Learn walkthroughs and guided practice.</li><li>Complete its self-check and all assigned Apply tasks.</li><li>Record and submit the required evidence using the existing submission workflow.</li></ol>
  </article>
 </div>
 <p>Unselected chapters do not count as unfinished work. You can change chapters later; completed work is kept.</p>
 <p v-if="error" role="alert">{{error}}</p>
 <button type="button" :disabled="draft.length < 2" @click="save">{{draft.length < 2 ? 'Choose at least 2 chapters' : 'Continue with my chapters'}}</button>
</section>
</template>
<script setup>
import {ref} from 'vue';
import {useModule8Preferences} from '../composables/useModule8Preferences.js';
const emit=defineEmits(['save']);
const prefs=useModule8Preferences(),chapters=prefs.getChapters(),draft=ref([...prefs.selectedChapters.value]),error=ref('');
function save(){if(prefs.saveChapters(draft.value))emit('save');else error.value='Choose at least two chapters. If your choices cannot be saved, enable browser storage and try again.';}
</script>
<style scoped>
.module8-selector{padding:1.5rem;background:var(--bg-card);color:var(--text-primary);max-width:900px;margin:auto}
p,li{line-height:1.6}.chapters{display:grid;gap:1rem}article{border:1px solid var(--border);border-radius:.6rem;padding:1rem}label{font-weight:700}input{margin-right:.6rem}button{margin-top:1rem;padding:.8rem 1.2rem}button:disabled{opacity:.55}
</style>
