<template>
  <div class="board" :class="{ 'board-page': page }">
    <header class="board-head">
      <button v-if="view !== 'list'" class="board-back" type="button" @click="showList">← All questions</button>
      <h2 v-else class="board-title">Ask the class <span class="board-course">{{ courseName }}</span></h2>
      <slot name="actions" />
    </header>

    <!-- LIST -->
    <section v-if="view === 'list'" class="board-body">
      <p class="board-note">Questions here go to classmates in this course and your professor. Answers can come later.</p>
      <div class="board-toolbar">
        <input v-model="search" class="board-input" type="search" placeholder="Search questions" aria-label="Search questions" @input="debouncedLoad" />
        <button class="board-primary" type="button" @click="startNew">Ask a question</button>
      </div>
      <div class="board-filters" role="tablist">
        <button v-for="f in filters" :key="f.key" type="button" class="board-chip" :class="{ on: filter === f.key }" @click="setFilter(f.key)">{{ f.label }}</button>
        <button v-if="weekTag" type="button" class="board-chip" :class="{ on: tagOnly }" @click="toggleTag">{{ weekTagLabel }}</button>
      </div>

      <div v-if="isStaff && reports.length" class="board-reports">
        <strong>{{ reports.length }} reported</strong>
        <button v-for="r in reports" :key="r.id" type="button" class="board-link" @click="openThread(r.thread_id)">
          {{ r.thread_title }}: "{{ r.excerpt }}" <span v-if="r.reason">({{ r.reason }})</span>
        </button>
      </div>

      <p v-if="error" class="board-error">{{ error }}</p>
      <p v-else-if="loading && !threads.length" class="board-empty">Loading…</p>
      <p v-else-if="!threads.length" class="board-empty">
        <template v-if="search || filter !== 'all' || tagOnly">Nothing matches. Try clearing the filters, or ask the question yourself.</template>
        <template v-else>No questions yet. Be the first to ask, and your classmates and professor will see it.</template>
      </p>
      <ul v-else class="board-list">
        <li v-for="t in threads" :key="t.id">
          <button type="button" class="board-row" :class="{ unread: t.unread }" @click="openThread(t.id)">
            <span class="board-row-title">
              <span v-if="t.answered" class="board-badge ok" title="Answered">Answered</span>
              <span v-if="t.hidden" class="board-badge warn">Hidden</span>
              {{ t.title }}
            </span>
            <span class="board-row-meta">
              {{ t.author.name }}<span v-if="t.author.is_staff" class="board-badge staff">Professor</span>
              · {{ timeAgo(t.last_activity) }} · {{ t.reply_count }} {{ t.reply_count === 1 ? 'reply' : 'replies' }}
              <span v-if="t.tag_label" class="board-tag">{{ t.tag_label }}</span>
              <span v-if="t.unread" class="board-new">New</span>
            </span>
          </button>
        </li>
      </ul>
    </section>

    <!-- NEW THREAD -->
    <section v-else-if="view === 'new'" class="board-body">
      <h3 class="board-sub">Ask a question</h3>
      <p v-if="draftTagLabel" class="board-note">Tagged: <span class="board-tag">{{ draftTagLabel }}</span> <button type="button" class="board-link" @click="draftTagLabel = ''; draftTag = ''">remove</button></p>
      <label class="board-label" for="board-new-title">Title</label>
      <input id="board-new-title" v-model="draftTitle" class="board-input" maxlength="150" placeholder="What are you stuck on?" />
      <label class="board-label" for="board-new-body">Details</label>
      <textarea id="board-new-body" v-model="draftBody" class="board-textarea" rows="6" maxlength="5000" placeholder="What did you try, and where did it stop working?"></textarea>
      <p class="board-note">Ask about your approach. Please don't post your answers or finished work.</p>
      <p v-if="error" class="board-error">{{ error }}</p>
      <div class="board-actions">
        <button class="board-primary" type="button" :disabled="busy || !draftTitle.trim() || !draftBody.trim()" @click="submitThread">Post question</button>
        <button class="board-secondary" type="button" @click="showList">Cancel</button>
      </div>
    </section>

    <!-- THREAD -->
    <section v-else class="board-body">
      <p v-if="error" class="board-error">{{ error }}</p>
      <template v-if="thread">
        <article class="board-post op">
          <h3 class="board-sub">
            <span v-if="thread.answered" class="board-badge ok">Answered</span>
            <span v-if="thread.hidden" class="board-badge warn">Hidden</span>
            {{ thread.title }}
          </h3>
          <p class="board-row-meta">
            {{ thread.author.name }}<span v-if="thread.author.is_staff" class="board-badge staff">Professor</span>
            · {{ timeAgo(thread.created) }}
            <span v-if="thread.tag_label" class="board-tag">{{ thread.tag_label }}</span>
          </p>
          <p class="board-text">{{ thread.body }}</p>
          <div class="board-post-actions">
            <button v-if="!thread.mine" type="button" class="board-link" @click="report(thread)">Report</button>
            <template v-if="isStaff">
              <button type="button" class="board-link" @click="hideThread">{{ thread.hidden ? 'Unhide' : 'Hide' }}</button>
              <button type="button" class="board-link danger" @click="deleteThread">Delete</button>
            </template>
          </div>
        </article>

        <h4 class="board-replies-h">{{ thread.posts.length }} {{ thread.posts.length === 1 ? 'reply' : 'replies' }}</h4>
        <article v-for="p in thread.posts" :key="p.id" class="board-post" :class="{ answer: p.is_answer, hiddenpost: p.hidden }">
          <p class="board-row-meta">
            <span v-if="p.is_answer" class="board-badge ok">Answer</span>
            {{ p.author.name }}<span v-if="p.author.is_staff" class="board-badge staff">Professor</span>
            · {{ timeAgo(p.created) }}
            <span v-if="p.hidden" class="board-badge warn">Hidden</span>
          </p>
          <p class="board-text">{{ p.body }}</p>
          <div class="board-post-actions">
            <button v-if="!p.mine" type="button" class="board-link" :class="{ on: p.helpful_by_me }" @click="toggleHelpful(p)">
              {{ p.helpful_by_me ? 'Marked helpful' : 'Helpful' }}<span v-if="p.helpful"> ({{ p.helpful }})</span>
            </button>
            <span v-else-if="p.helpful" class="board-note">{{ p.helpful }} found this helpful</span>
            <button v-if="canMarkAnswer" type="button" class="board-link" @click="markAnswer(p)">{{ p.is_answer ? 'Unmark answer' : 'This answered it' }}</button>
            <button v-if="!p.mine" type="button" class="board-link" @click="report(p)">Report</button>
            <template v-if="isStaff">
              <button type="button" class="board-link" @click="hidePost(p)">{{ p.hidden ? 'Unhide' : 'Hide' }}</button>
              <button type="button" class="board-link danger" @click="deletePost(p)">Delete</button>
            </template>
          </div>
        </article>

        <div class="board-reply">
          <label class="board-label" for="board-reply-body">Your reply</label>
          <textarea id="board-reply-body" v-model="replyBody" class="board-textarea" rows="4" maxlength="5000" placeholder="Share a hint or point to the right page. Please don't post finished answers."></textarea>
          <button class="board-primary" type="button" :disabled="busy || !replyBody.trim()" @click="sendReply">Post reply</button>
        </div>
      </template>
      <p v-else-if="!error" class="board-empty">Loading…</p>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { boardApi } from '../lib/boardApi'
import { timeAgo } from '../lib/boardFormat'
import { useAuth } from '../composables/useAuth'
import { useBoard } from '../composables/useBoard'
import { useClasses } from '../composables/useClasses'

const props = defineProps({
  classId: { type: String, required: true },
  page: { type: Boolean, default: false }
})

const { user } = useAuth()
const { prefill, unread } = useBoard()
const { getClassBySlug } = useClasses()

const isStaff = computed(() => ['instructor', 'admin'].includes(user.value?.role))
const courseName = ref('')

const filters = [
  { key: 'all', label: 'All' },
  { key: 'unanswered', label: 'Unanswered' },
  { key: 'mine', label: 'Mine' }
]

const view = ref('list')
const filter = ref('all')
const search = ref('')
const tagOnly = ref(false)
const threads = ref([])
const reports = ref([])
const thread = ref(null)
const loading = ref(false)
const busy = ref(false)
const error = ref('')

const draftTitle = ref('')
const draftBody = ref('')
const draftTag = ref('')
const draftTagLabel = ref('')
const replyBody = ref('')

const weekTag = computed(() => prefill.value.tag)
const weekTagLabel = computed(() => prefill.value.tagLabel || 'This page')
const canMarkAnswer = computed(() => !!thread.value && (thread.value.mine || isStaff.value))

let timer = null
let searchTimer = null
let loadSeq = 0

function fail(e) {
  error.value = e?.message || 'Something went wrong. Try again.'
}

async function loadList() {
  const seq = ++loadSeq
  loading.value = true
  try {
    const res = await boardApi.listThreads(props.classId, {
      filter: filter.value,
      q: search.value.trim(),
      tag: tagOnly.value ? weekTag.value : ''
    })
    if (seq !== loadSeq) return
    threads.value = res.threads
    error.value = ''
    if (isStaff.value) reports.value = (await boardApi.reports(props.classId)).reports
  } catch (e) {
    if (seq === loadSeq) fail(e)
  } finally {
    if (seq === loadSeq) loading.value = false
  }
  refreshUnread()
}

async function refreshUnread() {
  try {
    unread.value = (await boardApi.unread(props.classId)).unread
  } catch {
    // the badge is a convenience
  }
}

function debouncedLoad() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(loadList, 300)
}

function setFilter(key) {
  filter.value = key
  loadList()
}

function toggleTag() {
  tagOnly.value = !tagOnly.value
  loadList()
}

function showList() {
  view.value = 'list'
  thread.value = null
  error.value = ''
  loadList()
}

function startNew() {
  draftTitle.value = ''
  draftBody.value = ''
  draftTag.value = prefill.value.tag
  draftTagLabel.value = prefill.value.tagLabel
  error.value = ''
  view.value = 'new'
}

async function openThread(id) {
  view.value = 'thread'
  thread.value = null
  error.value = ''
  replyBody.value = ''
  try {
    thread.value = await boardApi.getThread(id)
    refreshUnread()
  } catch (e) {
    fail(e)
  }
}

async function run(fn) {
  busy.value = true
  error.value = ''
  try {
    await fn()
  } catch (e) {
    fail(e)
  } finally {
    busy.value = false
  }
}

const submitThread = () => run(async () => {
  const created = await boardApi.createThread(props.classId, {
    title: draftTitle.value.trim(),
    body: draftBody.value.trim(),
    tag: draftTag.value,
    tagLabel: draftTagLabel.value
  })
  await openThread(created.id)
})

const sendReply = () => run(async () => {
  thread.value = await boardApi.reply(thread.value.id, replyBody.value.trim())
  replyBody.value = ''
})

const markAnswer = (p) => run(async () => {
  thread.value = await boardApi.markAnswer(thread.value.id, p.is_answer ? null : p.id)
})

const toggleHelpful = (p) => run(async () => {
  thread.value = await boardApi.toggleHelpful(p.id)
})

async function report(target) {
  const isThread = target.posts !== undefined
  const reason = window.prompt('Why are you reporting this? (optional)') 
  if (reason === null) return
  await run(async () => {
    if (isThread) await boardApi.reportThread(target.id, reason)
    else await boardApi.reportPost(target.id, reason)
    error.value = ''
    window.alert('Thanks. Your professor will take a look.')
  })
}

const hideThread = () => run(async () => {
  await boardApi.hideThread(thread.value.id, !thread.value.hidden)
  thread.value = await boardApi.getThread(thread.value.id)
})

const hidePost = (p) => run(async () => {
  await boardApi.hidePost(p.id, !p.hidden)
  thread.value = await boardApi.getThread(thread.value.id)
})

const deleteThread = () => run(async () => {
  if (!window.confirm('Delete this thread and all replies for good?')) return
  await boardApi.deleteThread(thread.value.id)
  showList()
})

const deletePost = (p) => run(async () => {
  if (!window.confirm('Delete this reply for good?')) return
  await boardApi.deletePost(p.id)
  thread.value = await boardApi.getThread(thread.value.id)
})

// Keep the open view fresh while the panel is showing (no websockets; a class-sized board doesn't need them)
async function poll() {
  if (document.hidden || busy.value) return
  if (view.value === 'list') await loadList()
  else if (view.value === 'thread' && thread.value && !replyBody.value) {
    try {
      thread.value = await boardApi.getThread(thread.value.id)
    } catch {
      // keep showing what we have
    }
  }
}

async function init() {
  search.value = prefill.value.search || ''
  tagOnly.value = false
  view.value = 'list'
  const cls = await getClassBySlug(props.classId).catch(() => null)
  courseName.value = cls?.name || ''
  loadList()
}

onMounted(() => {
  init()
  timer = setInterval(poll, 15000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  clearTimeout(searchTimer)
})

watch(() => props.classId, init)
</script>

<style scoped>
.board { display: flex; flex-direction: column; min-height: 0; height: 100%; color: var(--text-primary); }
.board-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); }
.board-title { margin: 0; font-size: 1.05rem; }
.board-course { font-weight: 400; color: var(--text-secondary); font-size: 0.85rem; margin-left: 0.25rem; }
.board-body { flex: 1; overflow-y: auto; padding: 0.75rem 1rem 1rem; }
.board-back { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0.25rem 0; font: inherit; }
.board-back:hover { color: var(--text-primary); }
.board-note { color: var(--text-secondary); font-size: 0.85rem; margin: 0 0 0.75rem; }
.board-toolbar { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
.board-input, .board-textarea { width: 100%; box-sizing: border-box; background: var(--bg-input); color: var(--text-primary); border: 1px solid var(--border-light); border-radius: 0.5rem; padding: 0.5rem 0.65rem; font: inherit; }
.board-textarea { resize: vertical; }
.board-input:focus, .board-textarea:focus { outline: none; box-shadow: var(--focus-ring); }
.board-label { display: block; font-size: 0.85rem; font-weight: 600; margin: 0.75rem 0 0.25rem; }
.board-primary { background: var(--primary); color: #fff; border: none; border-radius: 0.5rem; padding: 0.5rem 0.9rem; font: inherit; font-weight: 600; cursor: pointer; white-space: nowrap; }
.board-primary:hover:not(:disabled) { background: var(--primary-dark); }
.board-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.board-secondary { background: transparent; color: var(--text-primary); border: 1px solid var(--border-light); border-radius: 0.5rem; padding: 0.5rem 0.9rem; font: inherit; cursor: pointer; }
.board-actions { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
.board-filters { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.25rem 0 0.75rem; }
.board-chip { background: var(--bg-elevated); color: var(--text-secondary); border: 1px solid var(--border); border-radius: 999px; padding: 0.2rem 0.7rem; font: inherit; font-size: 0.8rem; cursor: pointer; }
.board-chip.on { background: var(--primary); border-color: var(--primary); color: #fff; }
.board-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.board-row { width: 100%; text-align: left; background: var(--bg-card); color: inherit; border: 1px solid var(--border); border-radius: 0.6rem; padding: 0.6rem 0.75rem; font: inherit; cursor: pointer; display: flex; flex-direction: column; gap: 0.25rem; }
.board-row:hover { border-color: var(--border-light); background: var(--bg-elevated); }
.board-row.unread { border-left: 3px solid var(--primary); }
.board-row-title { font-weight: 600; }
.board-row-meta { font-size: 0.78rem; color: var(--text-secondary); margin: 0; display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center; }
.board-tag { background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 0.35rem; padding: 0 0.4rem; font-size: 0.72rem; }
.board-new { color: var(--primary); font-weight: 700; }
.board-badge { display: inline-block; border-radius: 0.35rem; padding: 0 0.4rem; font-size: 0.72rem; font-weight: 600; margin-right: 0.25rem; }
.board-badge.ok { background: var(--success-bg); color: var(--success); }
.board-badge.warn { background: var(--warning-bg); color: var(--warning); }
.board-badge.staff { background: var(--primary); color: #fff; margin-left: 0.3rem; }
.board-empty { color: var(--text-secondary); text-align: center; padding: 1.5rem 0.5rem; }
.board-error { color: var(--danger); background: var(--danger-bg); border-radius: 0.5rem; padding: 0.5rem 0.75rem; }
.board-sub { margin: 0 0 0.25rem; font-size: 1.05rem; }
.board-post { border: 1px solid var(--border); background: var(--bg-card); border-radius: 0.6rem; padding: 0.65rem 0.8rem; margin-bottom: 0.6rem; }
.board-post.answer { border-color: var(--success); }
.board-post.hiddenpost { opacity: 0.6; }
.board-text { white-space: pre-wrap; overflow-wrap: anywhere; margin: 0.4rem 0; line-height: 1.5; }
.board-post-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }
.board-link { background: none; border: none; padding: 0; font: inherit; font-size: 0.8rem; color: var(--text-secondary); cursor: pointer; text-decoration: underline; text-align: left; }
.board-link:hover, .board-link.on { color: var(--primary); }
.board-link.danger:hover { color: var(--danger); }
.board-replies-h { margin: 1rem 0 0.5rem; font-size: 0.9rem; color: var(--text-secondary); }
.board-reply { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
.board-reports { background: var(--warning-bg); border-radius: 0.5rem; padding: 0.5rem 0.75rem; margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.85rem; }
.board-page .board-body { overflow: visible; }
</style>
