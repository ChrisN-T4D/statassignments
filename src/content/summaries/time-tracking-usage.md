# Smart Time Tracking Implementation Guide

## Overview

The smart time tracking system tracks user engagement time while filtering out idle/away periods. It automatically detects when users leave tabs open and excludes that time from analytics.

## Features

✅ **Active Time Tracking** - Only counts time when user is engaged
✅ **Idle Detection** - Pauses when no activity for 30 seconds
✅ **Tab Visibility** - Pauses when tab is hidden/minimized
✅ **Maximum Time Caps** - Prevents runaway tracking (5-30 min per question)
✅ **Outlier Filtering** - Stats exclude times near maximum (likely left open)
✅ **BKT Integration** - Time data fed to Neural BKT for better predictions

## Quick Start

### Basic Usage in a Practice Question Component

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useTimeTracking } from '@/composables/useTimeTracking'
import { useAttempts } from '@/composables/useAttempts'
import { useBKT } from '@/composables/useBKT'

// Question data
const questionId = 'q-central-tendency-1'
const objectiveId = 'central-tendency'
const difficulty = 'medium'

// Setup time tracking
const timeTracker = useTimeTracking('multiple-choice') // or 'short-answer', 'problem-solving', 'essay'
const { submitAttempt } = useAttempts()
const { updateBKT } = useBKT()

// Start tracking when question is displayed
onMounted(() => {
  timeTracker.start()
})

// When user submits answer
async function handleSubmit(userAnswer, isCorrect) {
  // Stop timer and get time data
  const timeData = timeTracker.stop()

  console.log('Time Data:', {
    activeTime: timeData.activeTimeSeconds + 's',
    totalTime: timeData.totalTimeSeconds + 's',
    wasIdle: timeData.idleDetected,
    maxedOut: timeData.wasMaxedOut
  })

  // Submit attempt with time data
  await submitAttempt({
    itemId: questionId,
    moduleId: 'module-4',
    softwareType: 'jamovi',
    response: userAnswer,
    isCorrect: isCorrect,
    activeTimeSeconds: timeData.activeTimeSeconds,
    totalTimeSeconds: timeData.totalTimeSeconds,
    timeMaxedOut: timeData.wasMaxedOut,
    idleDetected: timeData.idleDetected
  })

  // Update BKT with time data
  await updateBKT(objectiveId, isCorrect, difficulty, timeData)
}
</script>

<template>
  <div class="question">
    <p>Question text here...</p>

    <!-- Show time info (optional) -->
    <div class="time-info">
      <span v-if="timeTracker.isPaused">⏸️ Paused (idle)</span>
      <span v-else-if="timeTracker.isTracking">⏱️ {{ timeTracker.activeTime }}s</span>
    </div>

    <button @click="handleSubmit(answer, true)">Submit</button>
  </div>
</template>
```

## Time Thresholds by Question Type

```javascript
const MAX_TIME = {
  'multiple-choice': 300,      // 5 minutes
  'short-answer': 600,          // 10 minutes
  'problem-solving': 900,       // 15 minutes
  'essay': 1800,                // 30 minutes
  'default': 600                // 10 minutes
}

const IDLE_TIMEOUT = 30000 // 30 seconds of no activity = pause
```

## API Reference

### `useTimeTracking(questionType)`

Creates a smart time tracker instance.

**Parameters:**
- `questionType` (string): 'multiple-choice', 'short-answer', 'problem-solving', 'essay', or 'default'

**Returns:**
```javascript
{
  // Reactive state
  isTracking: Ref<boolean>,      // Is timer running?
  isPaused: Ref<boolean>,         // Is timer paused (idle)?
  activeTime: Ref<number>,        // Active engagement seconds
  totalTime: Ref<number>,         // Total elapsed seconds

  // Controls
  start(),                        // Start tracking
  pause(),                        // Manually pause
  resume(),                       // Resume after pause
  stop(),                         // Stop and return data
  reset(),                        // Reset to zero

  // Data
  getTimeData(),                  // Get current time stats

  // Config
  maxTime: number,                // Max time for this question type
  idleTimeout: number             // Idle detection threshold (ms)
}
```

### `getTimeData()` Return Value

```javascript
{
  activeTimeSeconds: number,      // Time user was engaged
  totalTimeSeconds: number,       // Total elapsed time
  isIdle: boolean,                // Currently paused?
  wasMaxedOut: boolean,           // Hit maximum time?
  maxTimeSeconds: number,         // Maximum allowed time
  idleDetected: boolean           // Was significant idle time detected?
}
```

## Activity Detection

The tracker monitors these user activities to detect engagement:
- Mouse movement, clicks, scrolling
- Keyboard input
- Touch events (mobile)
- Window focus/blur
- Tab visibility changes

**Idle State Triggered By:**
- No activity for 30+ seconds
- Tab becomes hidden/minimized
- Window loses focus
- User switches applications

## Why Neural Networks Excel at Time Interpretation

**The "Fast Correct" Ambiguity Problem:**

Time alone can't distinguish between:
- 🎯 **Confident mastery** - Student knows it cold, answers immediately
- 🎲 **Lucky guess** - Student guesses quickly, happens to be right

**How the Neural Network Solves This:**

The NN learns complex patterns across multiple dimensions:

```
Input Features to Neural BKT:
├── is_correct (boolean)
├── difficulty (easy/medium/hard)
├── active_time_seconds (engagement time)
├── total_time_seconds (elapsed time)
├── was_maxed_out (timeout flag)
├── idle_detected (distraction flag)
├── Previous performance history
├── Difficulty sequence patterns
└── Time consistency patterns
```

**Example Learning Patterns:**

| Pattern | Fast Correct Interpretation |
|---------|----------------------------|
| Student A: Consistently 15-20s, high accuracy | **Mastery** - Confident knowledge |
| Student B: Varies wildly (5s, 180s, 12s), 50% accuracy | **Guessing** - Inconsistent, unreliable |
| Student C: Was slow (60s), now fast (15s), high accuracy | **Learning** - Progressing toward mastery |
| Student D: Always <5s on hard questions, 60% accuracy | **Random guessing** - Not engaged |
| Student E: Fast on easy (10s), slow on hard (90s), both correct | **Appropriate effort** - Good calibration |

**The NN learns:**
- What "confident fast" looks like vs "lucky fast"
- How time patterns change as students learn
- When slow = struggling vs slow = being careful
- Student-specific tendencies (some naturally work faster/slower)

This is why rule-based systems fail and neural networks excel!

## Integration with BKT Neural Network

Time data is sent to the Neural BKT backend:

```javascript
// BKT Update API Call
POST /bkt/update
{
  "user_id": "user123",
  "objective_id": "central-tendency",
  "is_correct": true,
  "difficulty": "medium",
  "active_time_seconds": 45,        // NEW
  "total_time_seconds": 52,          // NEW
  "was_maxed_out": false,            // NEW
  "idle_detected": false             // NEW
}
```

### What Neural BKT Can Learn from Time:

Time alone doesn't tell the full story - the Neural Network learns patterns by combining time with other signals:

**Fast Correct (< 15s)**
- ✅ **IF** consistently fast + correct → High mastery, confident knowledge
- ⚠️ **IF** inconsistently fast + correct → Lucky guess, not reliable

**Medium Correct (15-60s)**
- ✅ Thoughtful problem-solving, likely understands concept
- 📝 Working through steps, applying knowledge

**Slow Correct (60-180s)**
- ⚠️ Lower confidence, possibly calculating/guessing
- 🤔 Struggling but finding answer (borderline mastery)

**Very Fast Incorrect (< 5s)**
- ❌ Disengaged, rushing through, or giving up
- 🎲 Random guessing without reading

**Slow Incorrect (120s+)**
- 📉 Struggling with misconceptions
- 💪 Trying hard but needs help

**The Neural Network Distinguishes by:**
1. **Consistency**: One fast correct = maybe guess. Ten fast correct = probably mastery.
2. **Difficulty context**: Fast correct on hard questions > fast correct on easy questions
3. **Time patterns**: Always ~20s = confident. Varies wildly (5s, 180s, 15s) = inconsistent/guessing
4. **Performance trends**: Fast → slow over time = fatigue. Slow → fast = learning!
5. **Question sequence**: Fast correct after multiple incorrect = lucky guess

## Time Statistics & Analytics

### Calculate Average Time (with Outlier Filtering)

```javascript
import { calculateTimeStats } from '@/composables/useTimeTracking'

const attempts = [45, 52, 38, 295, 61, 48, 300, 55] // Some hit max time (300s)
const stats = calculateTimeStats(attempts, 300)

console.log(stats)
// {
//   mean: 50,              // Only non-outliers
//   median: 50,
//   count: 8,              // Total attempts
//   filteredCount: 6       // Used for stats (excluded 2 outliers)
// }
```

### Format Time for Display

```javascript
import { formatTime } from '@/composables/useTimeTracking'

formatTime(45)    // "45s"
formatTime(125)   // "2m 5s"
formatTime(3665)  // "1h 1m"
```

## Database Schema Updates Needed

Add these fields to the `attempts` collection in PocketBase:

```javascript
{
  // Existing fields...
  time_spent_seconds: number,        // Keep for backwards compatibility

  // New fields:
  active_time_seconds: number,       // Active engagement time
  total_time_seconds: number,        // Total elapsed time
  time_maxed_out: boolean,           // Hit maximum time threshold
  idle_detected: boolean             // Significant idle time detected
}
```

## Backend Updates Needed

Update FastAPI Neural BKT to accept time features:

```python
# backend/models.py
class BKTUpdateRequest(BaseModel):
    user_id: str
    objective_id: str
    is_correct: bool
    difficulty: str
    active_time_seconds: Optional[int] = None      # NEW
    total_time_seconds: Optional[int] = None       # NEW
    was_maxed_out: Optional[bool] = False          # NEW
    idle_detected: Optional[bool] = False          # NEW
```

## Example: Full Practice Question Component

See `/src/components/PracticeQuestionExample.vue` for a complete implementation example with:
- Time tracking
- BKT integration
- Attempt submission
- UI feedback
- Statistics display

## Best Practices

✅ **Start timer onMounted** - Begin tracking when question appears
✅ **Stop timer on submit** - End tracking when user submits answer
✅ **Handle navigation** - Stop timer if user navigates away
✅ **Show timer feedback** - Display pause icon when idle detected
✅ **Filter outliers** - Use provided stats functions to exclude left-open cases
✅ **Set appropriate maxes** - Use longer times for complex problems
❌ **Don't track during loading** - Only track when question is visible
❌ **Don't double-start** - Check `isTracking` before calling `start()`

## Troubleshooting

**Q: Timer keeps pausing even when I'm active**
A: Check idle timeout setting. 30s default may be too aggressive for reading-heavy questions.

**Q: Times seem too high**
A: Use `activeTimeSeconds` instead of `totalTimeSeconds` - it excludes idle periods.

**Q: Timer doesn't stop when I navigate away**
A: Add `onUnmounted` hook or use `beforeRouteLeave` to call `stop()`.

**Q: Neural BKT not receiving time data**
A: Check network console - ensure backend is updated to accept new time fields.

## Future Enhancements

- ⏱️ **Pause/Resume UI** - Let users manually pause timer
- 📊 **Time Heatmap** - Visualize when students struggle most
- 🎯 **Adaptive Timeouts** - Adjust max time based on question complexity
- 📈 **Time-to-Mastery** - Track how time decreases as students learn
- 🔔 **Time Warnings** - Alert when approaching maximum time
