# Methods Market

Research methods modules, statistics support, and software how-tos for psychology.

## Features

- **Student Authentication** - Pseudonymous student tracking with claim keys
- **Interactive Practice** - SPSS, R, Stata, Excel, and Jamovi simulators
- **Progress Tracking** - Complete topic and practice tracking
- **Instructor Analytics** - CSV exports and roster management
- **Two Course Tracks** - Statistics (PSYC 4213) and Research Methods (PSYC 4223)

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PocketBase credentials

# Import seed data
node scripts/import/import-seed-data.js

# Run development server
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
statassignments/
├── docs/              # Full documentation
├── scripts/           # Setup and import scripts
├── src/               # Frontend source code
│   ├── router/        # Vue Router
│   ├── composables/   # Business logic
│   ├── views/         # Pages
│   ├── components/    # UI components
│   ├── data/          # Static data
│   └── content/       # Course content
└── public/            # Static assets
```

## Documentation

- **[Full Setup Guide](docs/README-FULL.md)** - Complete setup instructions
- **[Setup Guide](docs/SETUP.md)** - Detailed configuration steps
- **[Troubleshooting](docs/QUICK-FIX.md)** - Common issues and fixes
- **[Database Schema](docs/pocketbase-schema.md)** - PocketBase schema reference

## Tech Stack

- **Frontend:** Vue 3 + Vite + Vue Router
- **Backend:** PocketBase (SQLite)
- **Auth:** PocketBase email/password
- **Deployment:** Docker + Static hosting

## For Instructors

1. Create account at `/auth`
2. Set role to `instructor` in PocketBase admin panel
3. Import roster at `/instructor`
4. Distribute student claim keys

## For Students

1. Create account at `/auth`
2. Claim student key at `/claim`
3. Start practicing at `/practice`

## License

MIT
