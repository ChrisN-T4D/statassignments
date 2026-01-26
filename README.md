# Statistics Teaching Site

A Vue 3 + PocketBase web application for teaching introductory statistics in psychology with pseudonymous student tracking.

## Features

- **Student Authentication** - Students create accounts and link to roster via claim keys
- **Pseudonymous Tracking** - All analytics use `student_key`, no PII in exports
- **Practice System** - Interactive practice problems for SPSS, R, Stata, Excel, jamovi
- **Progress Tracking** - Students track completed topics and practice stats
- **Instructor Analytics** - Export attempt-level or student-summary CSVs
- **Roster Management** - Import Blackboard exports, generate student keys

## Quick Start

### 1. PocketBase is Running ✓

Your PocketBase is deployed at: `https://pb.c.robpneu.com`

### 2. Fix API Rules

Follow the steps in [QUICK-FIX.md](QUICK-FIX.md) to:
- Allow public read access to the `semesters` collection

### 3. Import Seed Data

**Option A: Automatic (recommended)**

```bash
# Set your admin credentials
export PB_ADMIN_EMAIL="your-admin@email.com"
export PB_ADMIN_PASSWORD="your-password"

# Run import script
node import-seed-data.js
```

**Option B: Manual**

1. Go to `https://pb.c.robpneu.com/_/`
2. Create a semester in the `semesters` collection
3. Import modules from `seed-data.json`
4. Import items from `seed-data.json` (link to module IDs)

### 4. Verify Setup

```bash
node test-connection.js
```

Should show:
```
✓ All collections accessible
✓ Semesters: 1 found
✓ Modules: 23 found (11 Statistics + 12 Research Methods)
✓ Items: 23 found
```

### 5. Run the Frontend

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Next Steps

### For Instructors

1. **Create your account** at `/auth`
2. **Set your role** to `instructor`:
   - Go to PocketBase Admin `https://pb.c.robpneu.com/_/`
   - Click **Collections → users**
   - Find your user record
   - Set `role` = `instructor`
3. **Import roster** at `/instructor`:
   - Upload Blackboard CSV export
   - Download student keys CSV
   - Distribute keys to students

### For Students

1. **Create account** at `/auth`
2. **Claim student key** at `/claim` (enter key from instructor)
3. **Start practicing** at `/practice`

## Project Structure

```
src/
├── composables/
│   ├── useAuth.js              # Authentication
│   ├── useProfile.js           # Student profile claiming
│   ├── useModules.js           # Fetch modules/items
│   ├── useAttempts.js          # Log attempts & stats
│   └── useInstructorAnalytics.js # CSV exports & roster management
├── views/
│   ├── Auth.vue                # Login/signup
│   ├── ClaimProfile.vue        # Claim student key
│   ├── Practice.vue            # Practice problems
│   ├── Profile.vue             # Student progress
│   └── InstructorDashboard.vue # Analytics & roster
└── ...
```

## Documentation

- [SETUP.md](SETUP.md) - Detailed setup guide
- [QUICK-FIX.md](QUICK-FIX.md) - Fix common issues

## Tech Stack

- **Frontend:** Vue 3 + Vite + Vue Router
- **Backend:** PocketBase (SQLite + realtime subscriptions)
- **Auth:** PocketBase built-in (email/password)
- **Deployment:**
  - Backend: Docker (Portainer)
  - Frontend: Static build (nginx/Caddy/Vercel/Netlify)

## License

MIT
