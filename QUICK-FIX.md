# Quick Fix Guide

## Issue 1: Fix Semesters Collection API Rules

The `semesters` collection is currently locked down. It needs to allow public read access.

**Steps:**
1. Go to `https://pb.c.robpneu.com/_/`
2. Click on the **semesters** collection
3. Click the **API Rules** tab (gear icon)
4. Set these rules:
   - **List/Search rule:** Leave empty (allows public read)
   - **View rule:** Leave empty (allows public read)
   - **Create rule:** Leave as `null` (admin only)
   - **Update rule:** Leave as `null` (admin only)
   - **Delete rule:** Leave as `null` (admin only)
5. Click **Save**

## Issue 2: Add Seed Data

You need to create at least one semester and import the modules/items.

### Step 1: Create a Semester

1. In PocketBase Admin, go to **Collections → semesters**
2. Click **New Record**
3. Fill in:
   - **code:** `2026SP`
   - **name:** `Spring 2026`
   - **start_date:** `2026-01-12`
   - **end_date:** `2026-05-08`
   - **is_active:** `true` (check the box)
4. Click **Create**

### Step 2: Import Modules

The `seed-data.json` file has the data, but you need to import it manually or via the API.

**Option A: Import via Admin UI**

1. Go to **Collections → modules**
2. Click **Import**
3. Copy the modules from `seed-data.json` and paste/upload

**Option B: Use this script**

I'll create a script that imports the data automatically.

### Step 3: Import Items

After modules are imported, import items the same way.

---

## Quick Test

After fixing the API rules and adding a semester, run:

```bash
node test-connection.js
```

You should see:
```
✓ Collection 'semesters' exists
Semesters: 1 found
  - 2026SP (Spring 2026) [ACTIVE]
```
