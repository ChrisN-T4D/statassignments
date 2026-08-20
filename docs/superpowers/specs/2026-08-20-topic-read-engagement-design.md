# Topic “Read” via Engagement (Approach A)

**Date:** 2026-08-20  
**Status:** Approved  
**Primary file:** `src/views/TopicView.vue`

## Problem

Module UI “Topics read” / topic-card **Read** badges come from browser `localStorage` key `readTopics`. Today that list is only updated when the student:

- clicks **Mark as Read**, or
- clicks **Next Topic** (`goToNext` → `recordTopicRead`)

Students who leave via **Back to Module**, **Previous**, breadcrumbs, other in-app links, browser back, or closing the tab never get the UI credit, even when they spent meaningful time on the page.

Separately, analytics already records a `topic_readings` row when the student leaves with **≥10 seconds active time** (`saveTopicReadingTime`). Practice uses that for `has_read_topic_before`. UI progress and analytics disagree.

## Goal

Count a topic as read in the **module UI** whenever the student shows the same engagement already required for a successful reading session save (≥10s active time), on **any** leave path—not only Next / Mark as Read.

## Non-goals

- Driving the badge from the server / `topic_readings` queries (Approach B) — out of scope
- Changing the 10s threshold, idle detection, max reading time, scroll-depth fields, or BKT sequence features
- Cross-device sync of `readTopics`

## Design

### Engagement rule (UI)

When a topic view ends and active reading time is **≥ 10 seconds**, call `recordTopicRead(topicId)` so the topic id is added to `localStorage.readTopics`.

This runs from the same code path that already decides whether the visit was meaningful: the engagement gate inside `saveTopicReadingTime()` (or a shared helper called from there).

**Important:** Call `recordTopicRead` whenever `activeTimeSeconds >= 10`, **even if** the student is not authenticated and the DB `topic_readings` create is skipped. Guests still get local UI progress.

### Mark as Read (explicit override)

Keep **Mark as Read** as an explicit override: clicking it still calls `recordTopicRead` with **no** time requirement.

### Leave paths

No new navigation hooks required. Existing callers of `saveTopicReadingTime` already cover:

- Back to Module (`goToModule`)
- Previous (`goToPrev`)
- Next (`goToNext`)
- Topic id change (`watch(topicId)`)
- Unmount / tab close (`onUnmounted`)

After the change, Next’s separate `recordTopicRead` call is redundant but harmless; it may be left or removed for clarity.

### Unchanged consumers

- `ClassHome.vue` / `Profile.vue` continue to read `readTopics` via `getReadTopicIds` / `isTopicRead`
- `topic_readings` schema, learning events, and Practice `has_read_topic_before` logic stay as they are

## Data flow (after)

```
Student leaves topic page (any path)
  → timeTracker.stop()
  → if activeTimeSeconds >= 10:
       recordTopicRead(topicId)          // UI badge / progress
       if authenticated: create topic_readings + learning event
  → else: no UI mark, no DB row
```

## Acceptance criteria

1. Spend ≥10s active on a topic, leave via **Back to Module** → topic shows **Read** on class home (same browser).
2. Spend ≥10s, leave via **Previous** or unmount → same.
3. Spend &lt;10s active, leave without Mark as Read → still **not** read.
4. Click **Mark as Read** with &lt;10s → still marked read.
5. Logged-out student with ≥10s active leave → `readTopics` updated; no crash if DB write is skipped.
6. Authenticated ≥10s leave → both `readTopics` and `topic_readings` as today (plus UI mark).

## Implementation sketch

In `src/views/TopicView.vue`, inside `saveTopicReadingTime`:

1. Stop the tracker and compute `timeData` (unchanged).
2. If `timeData.activeTimeSeconds < 10`, return (unchanged).
3. **New:** `recordTopicRead(topicId.value)` before or after the auth check.
4. If not authenticated, return after step 3 (today the function returns earlier on `!isAuthenticated`; reorder so engagement mark is not gated on auth).
5. Existing `topic_readings` create + `logLearningEvent` unchanged for signed-in users.

## Risks / notes

- Still device-local (`localStorage`); switching browsers will not show prior reads until Approach B.
- Students who idle out before 10s active still won’t count — intentional for engagement-based policy.
