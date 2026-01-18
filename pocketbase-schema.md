# PocketBase Schema for StatsPsych

This document describes the collections needed in PocketBase.

---

## Core Collections

### users
- Standard PocketBase auth collection
- Added field: `role` (select: 'student', 'instructor')

### classes

Courses/classes that organize all content.

| Field | Type | Description |
|-------|------|-------------|
| `name` | text | Full name (e.g., "Research Methods") |
| `short_name` | text | Abbreviated name (e.g., "RM") |
| `description` | text | Course description |
| `color` | text | Hex color for UI (e.g., "#3b82f6") |
| `icon` | text | Emoji icon (e.g., "🔬") |
| `semester` | relation → semesters | Optional: limit to specific semester |
| `order` | number | Display order |
| `is_active` | bool | Whether class is available |

**Sample data:**
```json
[
  {
    "name": "Research Methods",
    "short_name": "RM",
    "description": "Introduction to research methodology in psychology",
    "color": "#3b82f6",
    "icon": "🔬",
    "order": 1,
    "is_active": true
  },
  {
    "name": "Statistics",
    "short_name": "Stats",
    "description": "Core statistical concepts and analysis techniques",
    "color": "#8b5cf6",
    "icon": "📊",
    "order": 2,
    "is_active": true
  },
  {
    "name": "Statistics for Assessment",
    "short_name": "S4A",
    "description": "Statistical methods for psychological assessment",
    "color": "#10b981",
    "icon": "📋",
    "order": 3,
    "is_active": true
  },
  {
    "name": "Intro to Research",
    "short_name": "Intro",
    "description": "Foundational concepts in psychological research",
    "color": "#f59e0b",
    "icon": "📚",
    "order": 4,
    "is_active": true
  }
]
```

### semesters
- `code` (text) - e.g., "SP2025"
- `name` (text) - e.g., "Spring 2025"
- `start_date` (date)
- `end_date` (date)
- `is_active` (bool)

### roster
- `semester` (relation → semesters)
- `student_key` (text) - pseudonymous identifier e.g., "SP2025-X7K9M2"
- `claim_token` (text) - for claiming profiles
- `bb_username` (text) - Blackboard username
- `bb_id` (text) - Blackboard student ID
- `user` (relation → users) - linked after claiming
- `claimed_at` (date)

### modules
- `class` (relation → classes) - **Required**: which class this module belongs to
- `topic_id` (text) - e.g., "descriptive-stats"
- `title` (text)
- `description` (text)
- `software_type` (select: 'jamovi', 'spss', 'r', 'stata', 'excel', 'all')
- `semester` (relation → semesters, optional)
- `order` (number)

### items
- `module` (relation → modules)
- `title` (text)
- `question` (text)
- `question_type` (select: 'multiple_choice', 'true_false', 'numeric', 'text')
- `options` (json) - for multiple choice
- `correct_answer` (text)
- `explanation` (text)
- `hint` (text)
- `tags` (json)
- `order` (number)

### attempts
- `semester` (relation → semesters)
- `profile` (relation → roster)
- `module` (relation → modules)
- `item` (relation → items)
- `software_type` (text)
- `response` (text)
- `is_correct` (bool)
- `score` (number, optional)
- `time_spent_seconds` (number, optional)
- `attempt_no` (number)
- `hint_used` (bool)

---

## New Collections for Software Simulation

### simulation_exercises

Stores the simulation practice exercises.

| Field | Type | Description |
|-------|------|-------------|
| `class` | relation → classes | Which class this exercise belongs to |
| `topic` | text | Topic ID (e.g., "descriptive-stats", "t-tests") |
| `title` | text | Exercise title |
| `description` | text | Brief description shown in list |
| `instructions` | text | Full instructions shown during exercise |
| `software_type` | select | 'jamovi', 'spss', 'r', 'stata', 'excel' |
| `exercise_type` | select | 'menu_navigation', 'code', 'output_interpretation' |
| `hint` | text | Optional hint for students |
| `expected_selections` | json | For menu navigation: `[{menu, option, subOption}]` |
| `expected_code` | json | For code: `{patterns, requiredFunctions, requiredArgs}` |
| `starter_code` | text | Initial code for code exercises |
| `sample_data` | json | `{columns: [], rows: []}` for preview |
| `highlight_path` | json | Menu items to highlight when hint shown |
| `variables` | json | Variables list for code editors |
| `success_message` | text | Message shown on correct answer |
| `failure_message` | text | Message shown on incorrect answer |
| `order` | number | Display order within topic+software |
| `is_active` | bool | Whether exercise is available |

**API Rules:**
- List/View: Public (or authenticated only if you prefer)
- Create/Update/Delete: Admin or instructor only

### simulation_attempts

Tracks student attempts on simulation exercises.

| Field | Type | Description |
|-------|------|-------------|
| `profile` | relation → roster | Student's profile |
| `exercise` | relation → simulation_exercises | The exercise attempted |
| `software_type` | text | Software used |
| `is_correct` | bool | Whether attempt was correct |
| `attempt_no` | number | Which attempt number this was |
| `hint_used` | bool | Whether student used the hint |
| `time_spent_seconds` | number | Time from start to submission |
| `response` | json/text | Student's response (selections or code) |
| `created` | auto | Timestamp |

**API Rules:**
- Create: Authenticated users (own profile only)
- List/View: Own records only (students), All records (instructors)

---

## Sample Data for Testing

You can use the exercises defined in `src/data/sampleExercises.js` to seed the `simulation_exercises` collection.

### Quick Seed Script

Run this in your PocketBase Admin UI → Collections → simulation_exercises → Import:

```json
[
  {
    "topic": "descriptive-stats",
    "title": "Calculate Mean and Standard Deviation",
    "description": "Navigate to the correct menu to calculate descriptive statistics",
    "instructions": "You have a dataset with exam scores. Find the menu path in jamovi to calculate the mean and standard deviation.",
    "software_type": "jamovi",
    "exercise_type": "menu_navigation",
    "hint": "Look under the Analyses menu for Exploration options",
    "expected_selections": [{"menu": "analyses", "option": "exploration", "subOption": "descriptives"}],
    "sample_data": {"columns": ["StudentID", "ExamScore", "StudyHours"], "rows": [{"StudentID": 1, "ExamScore": 85, "StudyHours": 4}]},
    "highlight_path": [{"menu": "analyses"}, {"menu": "analyses", "option": "exploration"}],
    "success_message": "Correct! Analyses → Exploration → Descriptives is where you find measures of central tendency and variability.",
    "order": 1,
    "is_active": true
  },
  {
    "topic": "descriptive-stats",
    "title": "Calculate Mean in R",
    "description": "Write R code to calculate the mean of a variable",
    "instructions": "You have a vector called 'scores' containing exam scores. Write the R code to calculate its mean.",
    "software_type": "r",
    "exercise_type": "code",
    "hint": "Use the mean() function with the variable name as the argument",
    "starter_code": "# Calculate the mean of scores\n",
    "expected_code": {"patterns": ["mean\\\\s*\\\\(\\\\s*scores\\\\s*\\\\)"], "requiredFunctions": ["mean"]},
    "success_message": "Correct! mean(scores) returns the arithmetic mean of the scores vector.",
    "order": 1,
    "is_active": true
  },
  {
    "topic": "t-tests",
    "title": "Independent Samples T-Test",
    "description": "Navigate to run an independent samples t-test",
    "instructions": "You want to compare test scores between two groups (Control vs Treatment). Find the correct analysis.",
    "software_type": "jamovi",
    "exercise_type": "menu_navigation",
    "hint": "T-Tests are under Analyses, and you need the Independent Samples version",
    "expected_selections": [{"menu": "analyses", "option": "ttests", "subOption": "independent"}],
    "sample_data": {"columns": ["ID", "Score", "Group"], "rows": [{"ID": 1, "Score": 78, "Group": "Control"}]},
    "order": 1,
    "is_active": true
  }
]
```

---

## Recommended Indexes

For better query performance, add indexes on:

- `simulation_exercises`: `topic`, `software_type`, `order`
- `simulation_attempts`: `profile`, `exercise`, `is_correct`

---

## API Collection Rules Examples

### simulation_exercises (List Rule)
```
// Allow all authenticated users to view active exercises
@request.auth.id != "" && is_active = true
```

### simulation_attempts (Create Rule)
```
// Users can only create attempts for their own profile
@request.auth.id != "" &&
@request.data.profile.user = @request.auth.id
```

### simulation_attempts (List Rule)
```
// Users see own attempts, instructors see all
@request.auth.id != "" && (
  profile.user = @request.auth.id ||
  @request.auth.role = "instructor"
)
```
