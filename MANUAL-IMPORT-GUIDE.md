# Manual Import Guide for PocketBase

Since the automated import script cannot authenticate, follow these steps to manually import the seed data through the PocketBase UI.

## Current Status
✅ Semesters collection is accessible and has 1 semester (SP25)
❌ Need to import 10 modules
❌ Need to import 22 items

## Step 1: Import Modules

Go to `https://pb.c.robpneu.com/_/` → Collections → **modules** → Click "New record"

Create these 10 modules (copy the data for each):

### Module 1: Descriptive Statistics (All software)
- **software_type**: all
- **topic_id**: descriptive-stats
- **title**: Descriptive Statistics
- **description**: Calculate and interpret measures of central tendency and variability
- **order**: 1

### Module 2: Visualizations (All software)
- **software_type**: all
- **topic_id**: visualizations
- **title**: Data Visualizations
- **description**: Create and interpret histograms, boxplots, and scatterplots
- **order**: 2

### Module 3: SPSS Practice
- **software_type**: spss
- **topic_id**: spss-basics
- **title**: SPSS Basics
- **description**: Navigate SPSS interface and run basic analyses
- **order**: 10

### Module 4: R Practice
- **software_type**: r
- **topic_id**: r-basics
- **title**: R Basics
- **description**: Write R scripts and use basic functions
- **order**: 20

### Module 5: Excel Practice
- **software_type**: excel
- **topic_id**: excel-basics
- **title**: Excel Basics
- **description**: Use Excel formulas for statistical analysis
- **order**: 30

### Module 6: Stata Practice
- **software_type**: stata
- **topic_id**: stata-basics
- **title**: Stata Basics
- **description**: Run Stata commands for data analysis
- **order**: 40

### Module 7: jamovi Practice
- **software_type**: jamovi
- **topic_id**: jamovi-basics
- **title**: jamovi Basics
- **description**: Use jamovi for statistical analysis
- **order**: 50

### Module 8: Normal Distribution
- **software_type**: all
- **topic_id**: normal-distribution
- **title**: Normal Distribution
- **description**: Calculate probabilities and percentiles
- **order**: 3

### Module 9: Hypothesis Testing
- **software_type**: all
- **topic_id**: hypothesis-testing
- **title**: Hypothesis Testing
- **description**: Conduct and interpret hypothesis tests
- **order**: 4

### Module 10: Correlation
- **software_type**: all
- **topic_id**: correlation
- **title**: Correlation
- **description**: Calculate and interpret correlations
- **order**: 5

## Step 2: Note Module IDs

After creating each module, **write down its ID**. You'll need these IDs to link items to modules.

Example:
- descriptive-stats module → ID: abc123xyz
- visualizations module → ID: def456uvw
- etc.

## Step 3: Import Items (22 total)

Go to Collections → **items** → Click "New record"

For each item below, you'll need to:
1. Select the **module** (use the ID you noted above)
2. Fill in all the fields

### Items for Descriptive Statistics Module

**Item 1:**
- **module**: [Select descriptive-stats module]
- **item_type**: multiple_choice
- **prompt**: What is the mean of these values: 2, 4, 6, 8, 10?
- **options**: `["4", "5", "6", "7"]` (JSON format)
- **answer_key**: 6
- **explanation**: Sum all values (30) and divide by count (5) = 6
- **difficulty**: easy
- **order**: 1

**Item 2:**
- **module**: [Select descriptive-stats module]
- **item_type**: multiple_choice
- **prompt**: Which measure is most affected by outliers?
- **options**: `["Mean", "Median", "Mode", "All equally"]` (JSON format)
- **answer_key**: Mean
- **explanation**: The mean uses all values in its calculation, so extreme values have a large effect
- **difficulty**: medium
- **order**: 2

### Items for Visualizations Module

**Item 3:**
- **module**: [Select visualizations module]
- **item_type**: multiple_choice
- **prompt**: Which graph is best for showing the distribution of a single variable?
- **options**: `["Histogram", "Scatterplot", "Line graph", "Pie chart"]` (JSON format)
- **answer_key**: Histogram
- **explanation**: Histograms show the frequency distribution of a continuous variable
- **difficulty**: easy
- **order**: 1

**Item 4:**
- **module**: [Select visualizations module]
- **item_type**: true_false
- **prompt**: A boxplot displays the median, quartiles, and potential outliers.
- **options**: `["True", "False"]` (JSON format)
- **answer_key**: True
- **explanation**: Boxplots show the five-number summary and outliers
- **difficulty**: easy
- **order**: 2

## Faster Alternative: Import via JavaScript Console

If you're comfortable with the browser console, you can paste this script while logged into PocketBase:

```javascript
// This script will be in a separate file
```

## Need Help?

If manual import is too tedious, we can:
1. Create a simpler import method that doesn't require admin auth
2. Investigate why admin authentication isn't working
3. Start with just a few modules/items for testing

## After Import

Run this to verify:
```bash
node test-connection.js
```

Should show:
- ✓ Semesters: 1 found
- ✓ Modules: 10 found
- ✓ Items: 22 found
