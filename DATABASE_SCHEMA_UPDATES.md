# Database Schema Updates for Learning Analytics

This document outlines the new fields that need to be added to PocketBase collections to support enhanced learning analytics.

## Collection: `practice_attempts`

Add the following fields to track answer confidence and sequence/spacing context:

### Answer Confidence Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `time_to_first_selection` | Number | No | Time in seconds from question display to first answer selection. Lower values may indicate guessing or high confidence. |
| `answer_changes` | Number | No | Number of times the student changed their answer before submitting. Higher values indicate lower confidence/hesitation. |

### Sequence/Spacing Context Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `time_since_reading` | Number | No | Time in seconds since the student last read the topic. Null if they haven't read the topic. Spacing effect predictor. |
| `time_since_last_attempt` | Number | No | Time in seconds since the student's last practice attempt in this topic. Null for first attempt. Spacing effect predictor. |
| `has_read_topic_before` | Bool | No | Whether the student has read the topic before attempting this question. Indicates if they're jumping directly to practice. |

## Collection: `topic_readings`

Add the following fields to track reading engagement quality and return visits:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `max_scroll_depth` | Number | No | Maximum scroll depth percentage (0-100) the student reached while reading. 100% means they scrolled to the bottom. Indicates engagement quality. |
| `triggered_by_error` | Bool | No | Whether this reading session was triggered by getting an incorrect answer on a practice problem. True indicates metacognitive self-remediation behavior. |

## Implementation Notes

### Answer Confidence Heuristics

The system uses these heuristics to classify confidence:

- **High Confidence**: Quick response (< 5s) with no answer changes, and correct
- **Medium Confidence**: Appropriate time for difficulty, few changes
- **Low Confidence**: Many answer changes OR very slow response (> 30s)
- **Guessing**: Very quick response (< 5s) but incorrect

### Sequence/Spacing Context Use Cases

1. **Immediate Review**: `time_since_reading < 300` (< 5 min) - Testing right after reading
2. **Same Session**: `time_since_reading < 3600` (< 1 hour) - Working through module in one sitting
3. **Next Day**: `time_since_reading` 86400-172800 (1-2 days) - Optimal spacing for retention
4. **Distributed Practice**: `time_since_last_attempt > 86400` (> 1 day) - Spaced repetition

### Scroll Depth Interpretation

- **0-25%**: Barely engaged, likely skimmed or abandoned
- **25-50%**: Partial engagement, may have skimmed key sections
- **50-75%**: Moderate engagement, read most content
- **75-100%**: High engagement, read through to the end

### Return Visit Interpretation

Return visits (`triggered_by_error = true`) indicate metacognitive awareness and self-remediation:

- **Positive Signal**: Student recognizes knowledge gap and returns to review material
- **Learning Indicator**: Shows active learning strategy, not just trial-and-error
- **Prediction Value**: Students who return to review after errors tend to have better long-term retention
- **Time Window**: Errors trigger a 5-minute window; if student navigates to the topic within this window, it's marked as a return visit

## Adding Fields in PocketBase

1. Navigate to your PocketBase admin panel
2. Go to Collections
3. Select the collection to update
4. Click "New field"
5. Choose the field type (Number or Bool)
6. Enter the field name exactly as shown above
7. Set "Required" to "No" (optional field)
8. Add the description for documentation
9. Save the field

Repeat for each field in the table above.

## Data Flow

### Practice Attempts
```
User answers question
  → Frontend tracks confidence metrics (Practice.vue)
  → Frontend queries sequence context (Practice.vue)
  → Data passed to usePractice.submitAnswer()
  → Saved to practice_attempts collection
  → Used by Neural BKT for mastery estimation
```

### Topic Readings
```
User reads topic
  → Frontend tracks scroll events (TopicView.vue)
  → Max scroll depth updated on scroll
  → checkIfTriggeredByError() checks for recent errors
  → On navigation away, saveTopicReadingTime() called
  → Data saved to topic_readings collection (with scroll depth and return visit flag)
  → Used for sequence context queries in practice
```

### Return Visit Tracking
```
User gets incorrect answer in practice
  → recordIncorrectAnswer() saves error to localStorage with 5-min expiry
  → User navigates to topic page (within 5 minutes)
  → checkIfTriggeredByError() detects recent error for this topic
  → triggeredByError flag set to true
  → Saved with topic_readings record when user leaves page
  → Indicates metacognitive self-remediation behavior
```

## Future Neural BKT Integration

These fields will be used to train the Neural BKT model to better predict mastery:

- **Confidence indicators** → Adjust guess/slip probabilities
- **Spacing context** → Apply spacing effect multipliers
- **Scroll depth** → Weight reading time by engagement quality

The heuristic-based adjustments are already implemented in `backend/models/neural_bkt.py` for time-based data. Future updates will integrate confidence and spacing features into the neural network.
