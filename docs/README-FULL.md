# Methods Market

Research methods modules, statistics support, and software how-tos for psychology.

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

### 3. Set Environment Variables

Copy `.env.example` to `.env` and add your credentials:

```bash
cp .env.example .env
# Edit .env with your actual credentials
```

Or export them directly:

```bash
export PB_ADMIN_EMAIL="your-admin@email.com"
export PB_ADMIN_PASSWORD="your-password"
```

### 4. Import Seed Data

**Option A: Automatic (recommended)**

```bash
node scripts/import/import-seed-data.js
```

**Option B: Manual**

1. Go to `https://pb.c.robpneu.com/_/`
2. Create a semester in the `semesters` collection
3. Import modules from `scripts/seed-data/seed-data.json`
4. Import items from `scripts/seed-data/seed-data.json` (link to module IDs)

### 5. Verify Setup

```bash
node scripts/setup/test-connection.js
```

Should show:
```
✓ All collections accessible
✓ Semesters: 1 found
✓ Modules: 23 found (11 Statistics + 12 Research Methods)
✓ Items: 23 found
```

### 6. Run the Frontend

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
statassignments/
├── docs/                       # Documentation
│   ├── README-FULL.md          # This file
│   ├── SETUP.md                # Detailed setup guide
│   ├── QUICK-FIX.md            # Troubleshooting
│   └── pocketbase-schema.md    # Database schema docs
├── scripts/                    # Setup and import scripts
│   ├── setup/                  # Database setup scripts
│   │   ├── setup-classes.js
│   │   ├── add-class-slugs.js
│   │   └── test-connection.js
│   ├── import/                 # Data import scripts
│   │   ├── import-seed-data.js
│   │   └── import-research-methods-modules.js
│   └── seed-data/              # Seed data files
│       ├── seed-data.json
│       ├── seed-problems.json
│       └── pocketbase-schema.json
├── src/                        # Frontend source code
│   ├── router/                 # Vue Router configuration
│   ├── composables/            # Vue composables
│   │   ├── useAuth.js          # Authentication
│   │   ├── useProfile.js       # Student profile claiming
│   │   ├── useModules.js       # Fetch modules/items
│   │   ├── useAttempts.js      # Log attempts & stats
│   │   └── useInstructorAnalytics.js # CSV exports & roster
│   ├── views/                  # Page components
│   │   ├── Auth.vue            # Login/signup
│   │   ├── ClaimProfile.vue    # Claim student key
│   │   ├── Practice.vue        # Practice problems
│   │   ├── Profile.vue         # Student progress
│   │   └── InstructorDashboard.vue # Analytics & roster
│   ├── components/             # Reusable components
│   │   ├── questions/          # Question type components
│   │   └── simulators/         # Software simulators
│   ├── data/                   # Static data files
│   ├── content/                # Course content
│   │   ├── concepts/           # Concept explanations
│   │   └── software/           # Software tutorials
│   ├── lib/                    # Third-party integrations
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── pb_migrations/              # PocketBase migrations
└── ...
```

## Documentation

- [SETUP.md](SETUP.md) - Detailed setup guide
- [QUICK-FIX.md](QUICK-FIX.md) - Fix common issues
- [pocketbase-schema.md](pocketbase-schema.md) - Database schema reference

## Tech Stack

- **Frontend:** Vue 3 + Vite + Vue Router
- **Backend:** PocketBase (SQLite + realtime subscriptions)
- **Auth:** PocketBase built-in (email/password)
- **Deployment:**
  - Backend: Docker (Portainer)
  - Frontend: Static build (nginx/Caddy/Vercel/Netlify)

## License

MIT
