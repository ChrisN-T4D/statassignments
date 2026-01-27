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

The full set of exercises is in `src/data/statisticsPractices.js`. Below are a few examples.

### Statistics Class - Jamovi Exercises (Sample)

Run this in your PocketBase Admin UI → Collections → simulation_exercises → Import:

**Note:** Replace `CLASS_ID` with the actual ID of your Statistics class from the `classes` collection.

```json
[
  {
    "class": "CLASS_ID",
    "topic": "descriptive-stats",
    "title": "Calculate Basic Descriptive Statistics",
    "description": "Find the menu to calculate mean, median, and standard deviation",
    "instructions": "Calculate the mean, median, and standard deviation for exam scores. Navigate to the correct analysis.",
    "software_type": "jamovi",
    "exercise_type": "menu_navigation",
    "hint": "Descriptive statistics are under Analyses > Exploration",
    "expected_selections": [{"menu": "analyses", "option": "exploration", "subOption": "descriptives"}],
    "sample_data": {"columns": ["StudentID", "ExamScore"], "rows": [{"StudentID": 1, "ExamScore": 78}, {"StudentID": 2, "ExamScore": 85}]},
    "success_message": "Correct! Analyses > Exploration > Descriptives provides measures of central tendency (mean, median, mode) and variability (SD, variance, range).",
    "order": 1,
    "is_active": true
  },
  {
    "class": "CLASS_ID",
    "topic": "z-scores",
    "title": "Calculate Z-Scores in Jamovi",
    "description": "Standardize scores by converting them to z-scores",
    "instructions": "You need to convert raw test scores to z-scores (standardized scores). Find how to create z-scores in Jamovi.",
    "software_type": "jamovi",
    "exercise_type": "menu_navigation",
    "hint": "Z-scores can be calculated through Exploration > Descriptives with the 'Z-scores' option checked",
    "expected_selections": [{"menu": "analyses", "option": "exploration", "subOption": "descriptives"}],
    "sample_data": {"columns": ["StudentID", "TestScore"], "rows": [{"StudentID": 1, "TestScore": 85}, {"StudentID": 2, "TestScore": 72}]},
    "success_message": "Correct! In Descriptives, check 'Z-scores' under the options to add a standardized version of your variable to the dataset.",
    "order": 2,
    "is_active": true
  },
  {
    "class": "CLASS_ID",
    "topic": "t-tests",
    "title": "Run an Independent Samples T-Test",
    "description": "Compare means between two independent groups",
    "instructions": "Compare test scores between the treatment and control groups using an independent samples t-test.",
    "software_type": "jamovi",
    "exercise_type": "menu_navigation",
    "hint": "Independent Samples T-Test is under Analyses > T-Tests",
    "expected_selections": [{"menu": "analyses", "option": "ttests", "subOption": "independent"}],
    "sample_data": {"columns": ["ID", "Group", "Score"], "rows": [{"ID": 1, "Group": "Treatment", "Score": 85}, {"ID": 2, "Group": "Control", "Score": 72}]},
    "success_message": "Correct! Analyses > T-Tests > Independent Samples T-Test. Add your DV to 'Dependent Variables' and your grouping variable to 'Grouping Variable'.",
    "order": 1,
    "is_active": true
  },
  {
    "class": "CLASS_ID",
    "topic": "correlation",
    "title": "Calculate Pearson Correlation",
    "description": "Measure the linear relationship between two continuous variables",
    "instructions": "Calculate the correlation between study hours and exam scores.",
    "software_type": "jamovi",
    "exercise_type": "menu_navigation",
    "hint": "Correlation is under Analyses > Regression",
    "expected_selections": [{"menu": "analyses", "option": "regression", "subOption": "correlation"}],
    "sample_data": {"columns": ["ID", "StudyHours", "ExamScore"], "rows": [{"ID": 1, "StudyHours": 5, "ExamScore": 85}, {"ID": 2, "StudyHours": 3, "ExamScore": 72}]},
    "success_message": "Correct! Analyses > Regression > Correlation Matrix. Add both variables to see Pearson's r.",
    "order": 1,
    "is_active": true
  },
  {
    "class": "CLASS_ID",
    "topic": "anova",
    "title": "Run One-Way ANOVA",
    "description": "Compare means across three or more groups",
    "instructions": "Compare test scores across three teaching methods (Traditional, Online, Hybrid) using ANOVA.",
    "software_type": "jamovi",
    "exercise_type": "menu_navigation",
    "hint": "ANOVA is under Analyses > ANOVA",
    "expected_selections": [{"menu": "analyses", "option": "anova", "subOption": "oneway"}],
    "sample_data": {"columns": ["ID", "Method", "Score"], "rows": [{"ID": 1, "Method": "Traditional", "Score": 78}, {"ID": 2, "Method": "Online", "Score": 82}]},
    "success_message": "Correct! Analyses > ANOVA > One-Way ANOVA. Add your DV to 'Dependent Variable' and grouping variable to 'Fixed Factors'.",
    "order": 1,
    "is_active": true
  }
]
```

See `src/data/statisticsPractices.js` for the complete list of 20+ exercises covering all modules.

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
