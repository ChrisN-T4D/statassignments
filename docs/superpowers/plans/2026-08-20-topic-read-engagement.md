# Topic Read via Engagement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mark a topic as UI-read whenever the student leaves after ≥10 seconds of active reading time, on any navigation path—not only Next / Mark as Read.

**Architecture:** Reuse the existing engagement gate inside `saveTopicReadingTime()` in `TopicView.vue`. After the ≥10s check passes, call `recordTopicRead(topicId)` before the auth gate so guests get `localStorage.readTopics` updates even when `topic_readings` is not written. Keep Mark as Read as an explicit no-time override.

**Tech Stack:** Vue 3 (`TopicView.vue`), browser `localStorage` key `readTopics`

**Spec:** `docs/superpowers/specs/2026-08-20-topic-read-engagement-design.md`

## Global Constraints

- Do not change the 10-second active-time threshold.
- Do not change idle detection, max reading time, scroll depth, or `topic_readings` / learning-event payloads.
- Do not implement server-driven badges (Approach B).
- Mark as Read must still work with no time requirement.
- Guests (≥10s leave) must update `readTopics` without requiring auth.

## File map

| File | Role |
|------|------|
| `src/views/TopicView.vue` | Only file to modify: reorder `saveTopicReadingTime`, call `recordTopicRead` on engagement; optionally drop redundant call in `goToNext` |
| `docs/superpowers/specs/2026-08-20-topic-read-engagement-design.md` | Spec (read-only context) |

This repo has no Vitest/Jest harness for Vue views; verification is a short node assert on a extracted helper logic pattern plus manual UI checks listed in Task 2.

---

### Task 1: Call `recordTopicRead` from the engagement gate

**Files:**
- Modify: `src/views/TopicView.vue` (`saveTopicReadingTime`, optionally `goToNext`)
- Spec (context only): `docs/superpowers/specs/2026-08-20-topic-read-engagement-design.md`

**Interfaces:**
- Consumes: existing `recordTopicRead(topicId)`, `timeTracker.stop()`, `isAuthenticated`, `user`, `topicId`
- Produces: after ≥10s active leave, `localStorage.readTopics` contains the topic id regardless of auth

- [ ] **Step 1: Replace `saveTopicReadingTime` so UI mark is not gated on auth**

Current function (auth-first — this is the bug for guests and the missing UI mark for all leave paths):

```javascript
async function saveTopicReadingTime() {
  if (!isAuthenticated.value || !user.value || !topicId.value) return

  const timeData = timeTracker.stop()

  // Only save if there was meaningful engagement (> 10 seconds active time)
  if (timeData.activeTimeSeconds < 10) return

  try {
    await pb.collection('topic_readings').create({
      // ...existing fields...
    })
    // ...logLearningEvent...
  } catch (err) {
    console.warn('Unable to save topic reading time:', err)
  }
}
```

Replace the **entire** `saveTopicReadingTime` function with:

```javascript
async function saveTopicReadingTime() {
  if (!topicId.value) return

  const timeData = timeTracker.stop()

  // Only count / save if there was meaningful engagement (≥ 10 seconds active time)
  if (timeData.activeTimeSeconds < 10) return

  // UI progress: any leave path with enough engagement marks the topic read
  recordTopicRead(topicId.value)

  if (!isAuthenticated.value || !user.value) return

  try {
    await pb.collection('topic_readings').create({
      user: user.value.id,
      topic_id: topicId.value,
      module_id: moduleId.value,
      active_time_seconds: timeData.activeTimeSeconds,
      total_time_seconds: timeData.totalTimeSeconds,
      time_maxed_out: timeData.wasMaxedOut,
      idle_detected: timeData.idleDetected,
      max_scroll_depth: maxScrollDepth.value,
      triggered_by_error: triggeredByError.value
    })
    await logLearningEvent({
      class_id: inferClassId({ moduleId: moduleId.value, hint: route.params.classId }),
      source: 'topic_read',
      module_id: moduleId.value,
      item_id: topicId.value,
      active_time_seconds: timeData.activeTimeSeconds,
      total_time_seconds: timeData.totalTimeSeconds,
      time_maxed_out: timeData.wasMaxedOut,
      idle_detected: timeData.idleDetected,
      last_reading_max_scroll_depth: maxScrollDepth.value,
      last_reading_triggered_by_error: triggeredByError.value,
      extra: { max_scroll_depth: maxScrollDepth.value, triggered_by_error: triggeredByError.value }
    })
    console.log(`[Topic Reading] Saved ${timeData.activeTimeSeconds}s for topic ${topicId.value}, scroll depth: ${maxScrollDepth.value}%, return visit: ${triggeredByError.value}`)
  } catch (err) {
    console.warn('Unable to save topic reading time:', err)
  }
}
```

- [ ] **Step 2: Remove redundant `recordTopicRead` from `goToNext`**

In `goToNext`, change:

```javascript
async function goToNext() {
  await saveTopicReadingTime()
  recordTopicRead(topicId.value)
  if (nextTopic.value) {
```

to:

```javascript
async function goToNext() {
  await saveTopicReadingTime()
  if (nextTopic.value) {
```

Leave `markRead()` → `recordTopicRead(topicId.value)` unchanged (explicit override, no time required).

- [ ] **Step 3: Static sanity check**

Run from repo root:

```bash
node -e "const fs=require('fs'); const s=fs.readFileSync('src/views/TopicView.vue','utf8'); const i=s.indexOf('async function saveTopicReadingTime'); const chunk=s.slice(i, i+900); if(!chunk.includes('recordTopicRead(topicId.value)')) process.exit(1); if(chunk.indexOf('recordTopicRead')>chunk.indexOf('isAuthenticated')) process.exit(2); if(/goToNext[\s\S]*?recordTopicRead/.test(s) && /async function goToNext\(\) \{[\s\S]*?recordTopicRead/.test(s)) { const g=s.match(/async function goToNext\(\) \{[\s\S]*?\n\}/); if(g && g[0].includes('recordTopicRead')) process.exit(3); } console.log('ok')"
```

Expected: prints `ok` and exit code 0.

- [ ] **Step 4: Commit**

```bash
git add src/views/TopicView.vue
git commit -m "Mark topics read after 10s engagement on any leave path."
```

---

### Task 2: Manual acceptance (spec checklist)

**Files:** none (manual)

- [ ] **Step 1: Clear prior state for a test topic**

In the browser console on Methods Market:

```javascript
localStorage.setItem('readTopics', JSON.stringify([]))
```

Hard-refresh class home; confirm the chosen topic does not show **Read**.

- [ ] **Step 2: ≥10s + Back to Module → Read**

Open a topic, stay active ≥10s (mouse/keyboard/scroll so the reading tracker stays active), click **Back to Module**. Confirm that topic shows **Read** and “Topics read” increased.

- [ ] **Step 3: &lt;10s leave → not Read**

Clear `readTopics` again. Open a topic, leave via Back within a few seconds. Confirm still not **Read**.

- [ ] **Step 4: Mark as Read under 10s → Read**

Open a topic, immediately click **Mark as Read**, go back. Confirm **Read** without waiting 10s.

- [ ] **Step 5: Guest path (optional if easy)**

Logged out, ≥10s, Back to Module → `readTopics` in localStorage contains the topic id (Application → Local Storage).

No further commit unless Task 1 needed a follow-up fix.

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| ≥10s active → `recordTopicRead` on any leave | Task 1 Step 1 |
| Guests get UI mark without DB | Task 1 Step 1 (auth after mark) |
| Mark as Read override, no time | Task 1 Step 2 (leave `markRead` alone) + Task 2 Step 4 |
| Unchanged threshold / analytics payloads | Task 1 (same create body) |
| Back / Prev / unmount covered via existing callers | Task 1 (no new hooks) |
| Acceptance criteria 1–6 | Task 2 |
