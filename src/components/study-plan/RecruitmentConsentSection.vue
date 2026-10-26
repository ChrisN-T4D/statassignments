<template>
  <div class="rc-section">
    <div class="arc-banner">
      <p class="section-intro">{{ RC_META.objective }}</p>
      <p class="source-note">{{ RC_META.source }}</p>
      <p class="progress-chip">{{ progressLabel }}</p>
    </div>

    <IrbPacketPanel :project="project" :class-id="classId" hide-link />

    <section class="worksheet-block">
      <h2 class="block-title">Part A: Who you will recruit, and where</h2>
      <SchemaField
        v-for="field in WHO_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`rc-${field.id}`"
        :model-value="rc[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
      <fieldset class="check-group">
        <legend class="check-legend">How will you reach them? Pick every channel you plan to use.</legend>
        <label v-for="c in CHANNELS" :key="c.id" class="check-row">
          <input type="checkbox" :checked="Boolean(rc.channels?.[c.id])" @change="setNested('channels', c.id, $event.target.checked)" />
          <span>{{ c.label }}</span>
        </label>
        <p v-if="rc.channels?.email" class="warn-note">{{ RC_META.emailNote }}</p>
      </fieldset>
    </section>

    <section class="worksheet-block">
      <h2 class="block-title">Part B: Your scripts</h2>
      <p class="block-intro">
        Fill in the facts once. The builders below write a first version of your flier and social media post from them, using the wording the
        IRB sample uses. Then edit the result so it sounds like you.
      </p>
      <SchemaField
        v-for="field in MESSAGE_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`rc-${field.id}`"
        :model-value="rc[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />

      <p v-if="!channels.length" class="empty-note">Pick at least one channel in Part A and its script will appear here.</p>

      <div v-if="channels.includes('oral')" class="script-block">
        <SchemaField
          :field="SCRIPT_BY_ID.oralScript"
          input-id="rc-oralScript"
          :model-value="rc.oralScript ?? ''"
          @update:model-value="setField('oralScript', $event)"
        />
      </div>

      <div v-if="channels.includes('flier')" class="script-block">
        <SchemaField
          :field="SCRIPT_BY_ID.flierScript"
          input-id="rc-flierScript"
          :model-value="rc.flierScript ?? ''"
          @update:model-value="setField('flierScript', $event)"
        />
        <button type="button" class="build-btn" @click="setField('flierScript', buildFlierScript(rc))">
          {{ (rc.flierScript ?? '').trim() ? 'Replace with a fresh draft from my facts' : 'Write a first draft of my flier' }}
        </button>
      </div>

      <div v-if="channels.includes('social')" class="script-block">
        <SchemaField
          :field="SCRIPT_BY_ID.socialPost"
          input-id="rc-socialPost"
          :model-value="rc.socialPost ?? ''"
          @update:model-value="setField('socialPost', $event)"
        />
        <button type="button" class="build-btn" @click="setField('socialPost', buildSocialPost(rc))">
          {{ (rc.socialPost ?? '').trim() ? 'Replace with a fresh draft from my facts' : 'Write a first draft of my post' }}
        </button>
        <div class="req-check" aria-label="What the IRB checks a social media post for">
          <h3 class="req-title">What the IRB checks a post for</h3>
          <ul class="req-list">
            <li v-for="r in postStatus" :key="r.id" :class="{ done: r.done }">
              <span aria-hidden="true">{{ r.done ? '✓' : '○' }}</span> {{ r.label }}
            </li>
          </ul>
          <p class="req-note">These tick when the facts above are filled in. Check that your final post actually says each one.</p>
        </div>
      </div>

      <div v-if="channels.includes('email')" class="script-block">
        <SchemaField
          :field="SCRIPT_BY_ID.emailStatement"
          input-id="rc-emailStatement"
          :model-value="rc.emailStatement ?? ''"
          @update:model-value="setField('emailStatement', $event)"
        />
      </div>
    </section>

    <section v-if="channels.includes('social')" class="worksheet-block">
      <h2 class="block-title">Part C: Social media protocol</h2>
      <p class="block-intro">
        If you recruit on social media, the application needs a protocol: the platforms, how you will share, and how you will document it.
        Any method you do not list here cannot be used without an amendment.
      </p>
      <SchemaField
        v-for="field in SOCIAL_PROTOCOL_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`rc-${field.id}`"
        :model-value="rc[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
      <fieldset class="check-group">
        <legend class="check-legend">Ethical commitments</legend>
        <label v-for="c in SOCIAL_COMMITMENTS" :key="c.id" class="check-row">
          <input type="checkbox" :checked="Boolean(rc.socialCommitments?.[c.id])" @change="setNested('socialCommitments', c.id, $event.target.checked)" />
          <span>{{ c.label }}</span>
        </label>
      </fieldset>
      <p class="req-note">The online survey must contain the full informed consent, and people must agree before they can continue.</p>
    </section>

    <section class="worksheet-block">
      <h2 class="block-title">Part D: Informed consent form (Appendix A)</h2>
      <p class="block-intro">
        Answer the questions and the form below fills in with the IRB’s own wording. The online survey must show this whole form before the first
        question, and a paper survey needs a signature line. Check the result against the template in Canvas.
      </p>
      <fieldset class="check-group">
        <legend class="check-legend">Survey mode</legend>
        <label class="check-row"><input type="radio" name="rc-mode" value="online" :checked="mode === 'online'" @change="setField('consentMode', 'online')" /><span>Online survey</span></label>
        <label class="check-row"><input type="radio" name="rc-mode" value="paper" :checked="mode === 'paper'" @change="setField('consentMode', 'paper')" /><span>Paper or in person</span></label>
      </fieldset>
      <p class="req-note">Your email, your advisor’s email, and the time to complete come from Part B.</p>
      <SchemaField
        v-for="field in CONSENT_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`rc-${field.id}`"
        :model-value="rc[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
      <details class="preview" open>
        <summary class="preview-summary">Your consent form</summary>
        <pre class="preview-text">{{ consentText }}</pre>
        <button type="button" class="build-btn" @click="copy(consentText, 'consent')">{{ copied === 'consent' ? 'Copied!' : 'Copy consent form' }}</button>
      </details>
    </section>

    <section v-if="facility" class="worksheet-block">
      <h2 class="block-title">Part E: Facility consent form (Appendix C)</h2>
      <p class="block-intro">
        You named a facility outside NWOSU, so you need its authorized agent’s signed consent. The IRB sees the form you will use, not the signature.
      </p>
      <SchemaField
        v-for="field in FACILITY_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`rc-${field.id}`"
        :model-value="rc[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
      <details class="preview" open>
        <summary class="preview-summary">Your facility consent form</summary>
        <pre class="preview-text">{{ facilityText }}</pre>
        <button type="button" class="build-btn" @click="copy(facilityText, 'facility')">{{ copied === 'facility' ? 'Copied!' : 'Copy facility consent' }}</button>
      </details>
    </section>

    <section class="worksheet-block">
      <h2 class="block-title">Part {{ facility ? 'F' : 'E' }}: Your survey and instruments (Appendix B)</h2>
      <p class="block-intro">
        The IRB needs every instrument a participant will see, with the active online link. Build the survey from your Measures worksheet, then check it here.
      </p>
      <SchemaField
        v-for="field in SURVEY_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`rc-${field.id}`"
        :model-value="rc[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
      <fieldset class="check-group">
        <legend class="check-legend">Checks before you submit</legend>
        <label v-for="c in SURVEY_CHECKS" :key="c.id" class="check-row">
          <input type="checkbox" :checked="Boolean(rc.surveyChecks?.[c.id])" @change="setNested('surveyChecks', c.id, $event.target.checked)" />
          <span>{{ c.label }}</span>
        </label>
      </fieldset>
      <router-link :to="`/class/${classId}/study-plan/measures-draft`" class="resource-link">← Back to Measures</router-link>
    </section>

    <div class="resource-links">
      <router-link to="/topic/rm-chapter-3" class="resource-link">Ch. 3: research ethics and consent</router-link>
      <router-link to="/topic/rm-chapter-7" class="resource-link">Ch. 7: survey research</router-link>
    </div>

    <StudyPlanExportPanel section-id="recruitment-consent" :project="project" :class-id="classId" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  RC_META,
  CHANNELS,
  WHO_FIELDS,
  MESSAGE_FIELDS,
  SCRIPT_FIELDS,
  SOCIAL_PROTOCOL_FIELDS,
  SOCIAL_COMMITMENTS,
  CONSENT_FIELDS,
  FACILITY_FIELDS,
  SURVEY_FIELDS,
  SURVEY_CHECKS,
  buildSocialPost,
  buildFlierScript,
  buildConsentForm,
  buildFacilityConsent,
  postRequirementStatus,
  usesFacility,
  channelsChosen,
  recruitmentConsentProgress
} from '../../data/capstoneRecruitmentConsentWorksheet.js'
import SchemaField from './SchemaField.vue'
import IrbPacketPanel from './IrbPacketPanel.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true },
  classId: { type: String, default: 'research-methods' }
})

const emit = defineEmits(['update'])

const SCRIPT_BY_ID = Object.fromEntries(SCRIPT_FIELDS.map((f) => [f.id, f]))
const rc = computed(() => props.project.recruitmentConsent ?? {})
const channels = computed(() => channelsChosen(rc.value))
const facility = computed(() => usesFacility(rc.value))
const mode = computed(() => rc.value.consentMode || 'online')
const postStatus = computed(() => postRequirementStatus(rc.value))
const consentText = computed(() => buildConsentForm(rc.value))
const facilityText = computed(() => buildFacilityConsent(rc.value))
const copied = ref('')

const progressLabel = computed(() => {
  const p = recruitmentConsentProgress(props.project)
  return p.ready ? 'Packet pieces ready' : `${p.done}/${p.total} packet pieces done`
})

function update (next) {
  emit('update', { recruitmentConsent: next })
}

function setField (id, value) {
  update({ ...rc.value, [id]: value })
}

function setNested (group, id, value) {
  update({ ...rc.value, [group]: { ...(rc.value[group] ?? {}), [id]: value } })
}

async function copy (text, which) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = which
    setTimeout(() => { copied.value = '' }, 1800)
  } catch (err) {
    console.warn('Unable to copy:', err)
  }
}
</script>

<style scoped>
.section-intro {
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0 0 0.75rem;
}

.source-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 0 0.75rem;
}

.progress-chip {
  display: inline-block;
  font-size: 0.85rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  margin: 0;
}

.worksheet-block {
  margin: 2rem 0 1.5rem;
}

.block-title {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
}

.block-intro {
  margin: 0 0 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.check-group {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.6rem;
}

.check-legend {
  padding: 0 0.4rem;
  font-weight: 600;
}

.check-row {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  margin: 0.45rem 0;
  line-height: 1.4;
}

.check-row input {
  margin-top: 0.3rem;
}

.warn-note {
  margin: 0.6rem 0 0;
  padding: 0.5rem 0.7rem;
  border-radius: 0.45rem;
  background: rgba(245, 158, 11, 0.1);
  font-size: 0.9rem;
}

.empty-note {
  color: var(--text-secondary);
  font-style: italic;
}

.script-block {
  margin: 1.25rem 0;
}

.build-btn {
  margin-top: 0.4rem;
  font-size: 0.88rem;
  padding: 0.35rem 0.8rem;
  border-radius: 0.4rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--primary);
  cursor: pointer;
}

.req-check {
  margin-top: 0.9rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.6rem;
}

.req-title {
  margin: 0 0 0.4rem;
  font-size: 0.95rem;
}

.req-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.2rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.req-list li.done {
  color: var(--text-primary);
}

.req-note {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.preview {
  margin: 1rem 0;
  border: 1px solid var(--border);
  border-radius: 0.6rem;
  padding: 0.6rem 1rem 0.9rem;
}

.preview-summary {
  cursor: pointer;
  font-weight: 600;
}

.preview-text {
  white-space: pre-wrap;
  font-family: inherit;
  font-size: 0.92rem;
  line-height: 1.55;
  margin: 0.75rem 0 0.25rem;
}

.resource-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 1.5rem 0;
}

.resource-link {
  color: var(--primary);
  text-decoration: none;
}
</style>
