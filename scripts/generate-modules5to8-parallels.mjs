/**
 * One-off generator: writes src/data/statisticsPracticesModules5to8Parallels.js
 * Run: node scripts/generate-modules5to8-parallels.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const out = path.join(__dirname, '..', 'src', 'data', 'statisticsPracticesModules5to8Parallels.js')

const SUB =
  "exercise_type: 'instructional',\n    is_active: true,\n    submission: 'Screenshot, console output, or brief write-up as appropriate for your package.'"

/** @param {object} o */
function quad(o) {
  const { key, module, topic, order, chapter } = o
  const ch = chapter != null ? `,\n    chapter: '${chapter}'` : ''
  const sws = ['r', 'spss', 'excel', 'stata']
  return sws
    .map(
      (sw, i) => `  {
    module: '${module}',
    topic: '${topic}',
    practiceObjectiveKey: '${key}',
    order: ${order},
    software_type: '${sw}',
    title: ${JSON.stringify(o.title[i])},
    description: ${JSON.stringify(o.desc[i])},
    instructions: ${JSON.stringify(o.inst[i])},
    hint: ${JSON.stringify(o.hint[i])},
    ${SUB}${ch}
  }`
    )
    .join(',\n')
}

/** Shorter Module 8 builder: same description for all four; inst/hint length 4 */
function q8(o) {
  const labs = ['R', 'SPSS', 'Excel', 'Stata']
  return quad({
    key: o.key,
    module: 'module-8',
    topic: o.topic,
    order: o.order,
    chapter: o.chapter,
    title: labs.map((s) => `${o.label} (${s})`),
    desc: labs.map(() => o.desc),
    inst: o.inst,
    hint: o.hint
  })
}

const blocks = []

// ---------- Module 5 ----------
blocks.push(`// --- m5-add-computed-variable ---\n${quad({
  key: 'm5-add-computed-variable',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 24,
  title: [
    'Add a computed column in R',
    'Compute a new variable in SPSS',
    'Add a formula column in Excel',
    'Generate a new variable in Stata'
  ],
  desc: [
    'Create a new numeric column (e.g. row mean or sum of items).',
    'Use Compute Variable to create a new column from an expression.',
    'Use a formula in a new column (e.g. average of adjacent item cells).',
    'Use generate or egen to create a new variable from an expression.'
  ],
  inst: [
    'With your BMI (or class) data: `data$newcol <- rowMeans(cbind(Item1, Item2, Item3), na.rm = TRUE)` or dplyr::mutate. Show head().',
    'Transform > Compute Variable. Target: NEWCOL. Numeric expression: mean of items (e.g. (Item1+Item2+Item3)/3). Run and verify in Data View.',
    'If items are in D2:F2, in G2 use =AVERAGE(D2:F2) and fill down.',
    '`egen rowmean = rowmean(item1 item2 item3)` or `gen total = item1 + item2 + item3`. list in 1/5.'
  ],
  hint: [
    'rowMeans handles NA with na.rm = TRUE.',
    'SPSS MEAN.2(a,b,c) counts non-missing values.',
    'Lock ranges with $ if needed.',
    'rowmean() needs multiple variables listed.'
  ]
})}`)

blocks.push(`// --- m5-center-bmi-computed ---\n${quad({
  key: 'm5-center-bmi-computed',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 20,
  title: ['Center BMI in R', 'Center BMI in SPSS', 'Center BMI in Excel', 'Center BMI in Stata'],
  desc: ['BMI minus its mean.', 'Compute BMI - MEAN(BMI).', 'BMI minus AVERAGE of BMI column.', 'gen bmi_c = BMI - r(mean) after summarize.'],
  inst: [
    '`mutate(bmi_c = BMI - mean(BMI, na.rm=TRUE))` or `data$bmi_c <- data$BMI - mean(data$BMI, na.rm=TRUE)`.',
    'Transform > Compute: BMICENT = BMI - MEAN(BMI).',
    'If BMI is column B: C2 = B2 - AVERAGE($B$2:$B$101).',
    '`summarize BMI` then `gen bmi_c = BMI - r(mean)`.'
  ],
  hint: ['mean(..., na.rm=TRUE)', 'MEAN(BMI) in Compute uses full sample.', 'Fix the average range.', 'r(mean) from last summarize.']
})}`)

blocks.push(`// --- m5-recode-bmi-categories ---\n${quad({
  key: 'm5-recode-bmi-categories',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 21,
  title: ['Recode BMI into categories (R)', 'Recode BMI (SPSS)', 'Recode BMI (Excel)', 'Recode BMI (Stata)'],
  desc: ['Cut BMI into Under/Normal/Over (or similar).', 'Recode into different variables or Compute with ranges.', 'Nested IF or IFS for BMI bands.', 'recode or separate cut points.'],
  inst: [
    '`dplyr::case_when(BMI < 18.5 ~ "Under", BMI < 25 ~ "Normal", TRUE ~ "Over")` into a factor column.',
    'Transform > Recode into Different Variables, or Compute with ranges and string labels.',
    '=IFS(B2<18.5,"Under",B2<25,"Normal",TRUE,"Over") in a new column.',
    '`gen bcat = cond(BMI<18.5,0, cond(BMI<25,1,2))` then add value labels, or `egen bcat = cut(BMI), at(0,18.5,25,40)`.'
  ],
  hint: ['case_when is readable for multiple cuts.', 'Define cutpoints clearly.', 'IFS available in newer Excel.', 'cut() needs interval boundaries.']
})}`)

blocks.push(`// --- m5-filter-compare-descriptives ---\n${quad({
  key: 'm5-filter-compare-descriptives',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 23,
  title: ['Subset and summarize in R', 'Select cases and descriptives (SPSS)', 'Filter and SUBTOTAL in Excel', 'if condition and summarize in Stata'],
  desc: ['Filter rows and compare mean/SD of BMI.', 'Use Select Cases then Descriptives.', 'AutoFilter + Descriptive stats on visible cells or helper columns.', 'summarize BMI if condition.'],
  inst: [
    '`dplyr::filter(BMI >= 25) |> summarize(m=mean(BMI), s=sd(BMI))` vs full data.',
    'Data > Select Cases > If (e.g. BMI >= 25). Run Analyze > Descriptives. Repeat with all cases.',
    'Turn on Filter; use SUBTOTAL or copy visible cells; compare to full column AVERAGE/STDEV.S.',
    '`summarize BMI if BMI>=25` vs `summarize BMI`. Note N and mean/SD change.'
  ],
  hint: ['filter drops rows; use same summarize code.', 'Remember to reset Select Cases to All.', 'SUBTOTAL(101,...) ignores hidden rows in filtered lists.', 'Clear filters with `summarize BMI` alone.']
})}`)

blocks.push(`// --- m5-histogram-menu ---\n${quad({
  key: 'm5-histogram-menu',
  module: 'module-5',
  topic: 'visualizations',
  order: 1,
  title: ['Histogram in R', 'Histogram in SPSS', 'Histogram in Excel', 'Histogram in Stata'],
  desc: ['Plot distribution of BMI.', 'Charts > Histogram or Explore.', 'Insert > Histogram (or Analysis ToolPak).', 'histogram BMI.'],
  inst: [
    '`hist(data$BMI, main="BMI", col="steelblue")` or ggplot2::geom_histogram().',
    'Graphs > Chart Builder > Histogram, or Analyze > Descriptive Statistics > Explore > Plots.',
    'Select BMI data > Insert > Statistic Chart > Histogram (Excel 2016+), or build bins with FREQUENCY.',
    '`histogram BMI, frequency normal` or `twoway histogram BMI`.'
  ],
  hint: ['Set breaks or bins if needed.', 'Explore gives normality plots too.', 'Bins may need adjustment.', 'frequency adds counts.']
})}`)

blocks.push(`// --- m5-bar-chart-menu ---\n${quad({
  key: 'm5-bar-chart-menu',
  module: 'module-5',
  topic: 'visualizations',
  order: 2,
  title: ['Bar chart of counts (R)', 'Bar chart (SPSS)', 'Column chart (Excel)', 'Bar chart (Stata)'],
  desc: ['Frequencies for a categorical variable.', 'Bar chart for nominal/ordinal variable.', 'PivotTable or bar of counts.', 'graph bar, over().'],
  inst: [
    '`barplot(table(data$Gender))` or ggplot2 geom_bar().',
    'Analyze > Descriptive Statistics > Frequencies > Charts > Bar charts.',
    'Insert bar chart from category counts (PivotTable: rows = category, values = Count).',
    '`graph bar (count), over(gender)` or `catplot` if installed.'
  ],
  hint: ['table() gives counts.', 'Use percentages option if required.', 'Sort categories for readability.', 'over() defines categories.']
})}`)

blocks.push(`// --- m5-boxplot-menu ---\n${quad({
  key: 'm5-boxplot-menu',
  module: 'module-5',
  topic: 'visualizations',
  order: 3,
  title: ['Boxplot in R', 'Boxplot in SPSS', 'Boxplot in Excel', 'Boxplot in Stata'],
  desc: ['BMI by group or single variable.', 'Explore or Chart Builder boxplot.', 'Insert box & whisker chart.', 'graph box.'],
  inst: [
    '`boxplot(BMI ~ Gender, data=data)` or ggplot geom_boxplot().',
    'Graphs > Chart Builder > Boxplot; drag DV and optional grouping variable.',
    'Select numeric column (and category if grouped) > Insert > Box and Whisker.',
    '`graph box BMI, over(gender)` or `graph box BMI` for one group.'
  ],
  hint: ['Formula interface BMI ~ Group.', 'Clustered boxplots via Chart Builder.', 'Excel 2016+ boxplots need long or wide layout.', 'over() for grouping factor.']
})}`)

blocks.push(`// --- m5-histogram-interpret ---\n${quad({
  key: 'm5-histogram-interpret',
  module: 'module-5',
  topic: 'visualizations',
  order: 4,
  title: ['Histogram + interpretation (R)', 'Histogram + interpretation (SPSS)', 'Histogram + interpretation (Excel)', 'Histogram + interpretation (Stata)'],
  desc: ['Produce histogram and describe shape.', 'Same as jamovi task in SPSS.', 'Same in Excel.', 'Same in Stata.'],
  inst: [
    'Plot BMI histogram; write 2–3 sentences: skew, modality, outliers.',
    'Create histogram via Explore or Chart Builder; attach written interpretation.',
    'Create histogram; comment on shape in 2–3 sentences.',
    '`histogram BMI`; describe symmetry/skew and any extreme tails.'
  ],
  hint: ['Combine visual + numeric skew if you compute it.', 'Copy plot into submission.', 'Note bin choice affects appearance.', 'Compare to normal overlay if used.']
})}`)

blocks.push(`// --- m5-frequency-table-menu ---\n${quad({
  key: 'm5-frequency-table-menu',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 8,
  title: ['Frequency table (R)', 'Frequencies (SPSS)', 'Pivot counts (Excel)', 'tabulate (Stata)'],
  desc: ['Counts for a categorical variable.', 'Frequencies procedure.', 'PivotTable count.', 'one-way table.'],
  inst: [
    '`table(data$gender)` or `dplyr::count(data, gender)`.',
    'Analyze > Descriptive Statistics > Frequencies.',
    'PivotTable: category in Rows, Count of ID in Values.',
    '`tabulate gender, missing` or `tab1 gender`.'
  ],
  hint: ['prop.table for proportions.', 'Charts optional.', 'Show % of column if needed.', 'missing option shows NA.']
})}`)

blocks.push(`// --- m5-contingency-table-menu ---\n${quad({
  key: 'm5-contingency-table-menu',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 9,
  title: ['Two-way table (R)', 'Crosstabs (SPSS)', 'Pivot crosstab (Excel)', 'twoway tab (Stata)'],
  desc: ['Cross-classify two categoricals.', 'Crosstabs.', 'PivotTable rows×columns.', 'tabulate a b.'],
  inst: [
    '`table(data$rowvar, data$colvar)` or tidyr::pivot_wider after count().',
    'Analyze > Descriptive Statistics > Crosstabs.',
    'PivotTable with two categoricals in Rows/Columns, Values = Count.',
    '`tabulate gender bmicat, chi2` optional.'
  ],
  hint: ['addmargins() for totals.', 'Cells > Percentages.', 'Row % vs column % differ.', 'chi2 tests association.']
})}`)

blocks.push(`// --- m5-logical-category-menu ---\n${quad({
  key: 'm5-logical-category-menu',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 10,
  title: ['Logical recode (R)', 'IF compute (SPSS)', 'IF/IFS (Excel)', 'cond/replace (Stata)'],
  desc: ['Binary or multi category from BMI threshold.', 'Compute with IF().', 'IF or IFS.', 'cond() or recode.'],
  inst: [
    '`ifelse(BMI >= 25, "Over", "Not")` or dplyr::case_when.',
    'Transform > Compute: overwt = (BMI >= 1)*1 or use IF(BMI >= 25, 1, 0).',
    '=IF(B2>=25,"Over","Not over")',
    '`gen over = BMI>=25` or `gen cat = cond(BMI>=25,1,0)` with labels.'
  ],
  hint: ['Vectorized ifelse is fast.', 'Logical expressions in SPSS use AND/AND & OR.', 'Coerce types consistently.', 'Stata true/false is 1/0.']
})}`)

blocks.push(`// --- m5-center-bmi-instructional ---\n${quad({
  key: 'm5-center-bmi-instructional',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 11,
  title: ['Center BMI (R)', 'Center BMI (SPSS)', 'Center BMI (Excel)', 'Center BMI (Stata)'],
  desc: ['Same objective as centered BMI practice.', 'Same.', 'Same.', 'Same.'],
  inst: [
    'Create bmi_c = BMI - mean(BMI); verify mean(bmi_c)≈0.',
    'Compute BMICENT = BMI - MEAN(BMI). Descriptives: mean ~0.',
    'New column = BMI cell - AVERAGE($B$2:$B$n).',
    '`egen bmi_c = center(BMI)` or manual gen as in m5-center-bmi-computed.'
  ],
  hint: ['center from psych or manual.', 'MEAN(BMI) in Compute.', '$ for fixed range.', 'ssc install center, replace if needed.']
})}`)

blocks.push(`// --- m5-abs-deviation-bmi ---\n${quad({
  key: 'm5-abs-deviation-bmi',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 12,
  title: ['Absolute deviation (R)', 'Absolute deviation (SPSS)', 'Absolute deviation (Excel)', 'Absolute deviation (Stata)'],
  desc: ['|BMI - mean(BMI)|.', 'ABS(BMI-MEAN(BMI)).', '=ABS(B2-AVERAGE(...)).', 'abs(BMI - r(mean)).'],
  inst: [
    '`mutate(ad = abs(BMI - mean(BMI, na.rm=TRUE)))`.',
    'Compute AD = ABS(BMI - MEAN(BMI)).',
    '=ABS(B2-$C$1) where C1 holds mean, or inline AVERAGE.',
    '`summarize BMI` then `gen ad = abs(BMI - r(mean))`.'
  ],
  hint: ['abs()', 'ABS()', 'ABS()', 'abs()']
})}`)

blocks.push(`// --- m5-recode-exercise-categories ---\n${quad({
  key: 'm5-recode-exercise-categories',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 13,
  title: ['Cut exercise into 3 levels (R)', 'Recode exercise (SPSS)', 'Exercise bands (Excel)', 'Exercise categories (Stata)'],
  desc: ['Low/Medium/High from hours.', 'Recode or Compute nested IF.', 'Nested IF/IFS.', 'recode or case_when style.'],
  inst: [
    'Use case_when on exercise hours with your cutpoints (e.g. <2, <5, else High).',
    'Transform > Recode into Different Variables with ranges.',
    'IFS for three bands.',
    '`gen exg = 1 if exercise<2; replace exg=2 if exercise<5 & mi(exg); replace exg=3 if mi(exg)` (adjust logic).'
  ],
  hint: ['Document cutpoints.', 'Value labels help.', 'Keep consistent with course rules.', 'Check missing handling.']
})}`)

blocks.push(`// --- m5-reusable-transform ---\n${quad({
  key: 'm5-reusable-transform',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 14,
  title: ['Center two columns (R)', 'Compute centered copy (SPSS)', 'Reuse formula pattern (Excel)', 'Loop or egen (Stata)'],
  desc: ['Apply same centering to BMI and exercise.', 'Repeat Compute for two variables.', 'Same pattern two columns.', 'foreach or separate egen.'],
  inst: [
    '`mutate(across(c(BMI, exercise), ~ .x - mean(.x, na.rm=TRUE), .names = "{.col}_c"))`.',
    'Compute BMIC, EXERC with each minus its MEAN().',
    'Two columns: each minus AVERAGE of that column.',
    '`foreach v of varlist bmi exercise { egen c_`v\' = center(`v\') }` or two gen lines.'
  ],
  hint: ['across() keeps DRY.', 'Scripting SPSS optional.', 'Column references differ per column.', 'foreach syntax.']
})}`)

blocks.push(`// --- m5-transform-bmi-categories ---\n${quad({
  key: 'm5-transform-bmi-categories',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 15,
  title: ['WHO BMI bands (R)', 'WHO BMI bands (SPSS)', 'WHO BMI bands (Excel)', 'WHO BMI bands (Stata)'],
  desc: ['Under 18.5 / 18.5–25 / 25+ labels.', 'Recode conditions.', 'IFS.', 'case_when style.'],
  inst: [
    'case_when(BMI<18.5 ~ "Underweight", BMI<25 ~ "Normal", TRUE ~ "Overweight").',
    'Recode or Compute string labels with nested conditions.',
    '=IFS(B2<18.5,"Under",B2<25,"Normal",TRUE,"Over")',
    'Same multi-branch cond as recode BMI task.'
  ],
  hint: ['Match course cutpoints.', 'String vs numeric choice.', 'TRUE catch-all in IFS.', 'value labels for numeric codes.']
})}`)

blocks.push(`// --- m5-filter-subset-descriptives ---\n${quad({
  key: 'm5-filter-subset-descriptives',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 16,
  title: ['Filter + summarize (R)', 'Select cases + descriptives (SPSS)', 'Filter + stats (Excel)', 'if + summarize (Stata)'],
  desc: ['Filter then mean/SD.', 'Select Cases.', 'Filtered AVERAGE.', 'if condition.'],
  inst: [
    'filter(BMI>=25) |> summarize(mean(BMI), sd(BMI), n=n()).',
    'Select Cases If BMI>=25; Descriptives on BMI; reset All cases.',
    'Filter rows; AVERAGE visible or helper column.',
    '`summarize BMI if BMI>=25`.'
  ],
  hint: ['n() counts rows.', 'Reset selection after.', 'SUBTOTAL for visible.', 'compare to full sample.']
})}`)

blocks.push(`// --- m5-math-transform-bmi ---\n${quad({
  key: 'm5-math-transform-bmi',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 17,
  title: ['LOG/SQRT transform (R)', 'LG10/SQRT (SPSS)', 'LN/SQRT (Excel)', 'log/sqrt (Stata)'],
  desc: ['Variance-stabilizing transform.', 'Compute new vars.', '=LN(B2), =SQRT(B2).', 'gen logbmi = log(BMI).'],
  inst: [
    'Create log_bmi = log(BMI) (natural log); note zeros/negatives invalid.',
    'Compute with LG10 or SQRT as appropriate; handle zeros.',
    'Use LN, LOG, SQRT functions; document skew rationale in 2–3 sentences.',
    '`gen lb = log(BMI)` or sqrt; explain when transform helps right skew.'
  ],
  hint: ['log1p for zeros if appropriate.', 'Check domain.', 'Excel LN vs LOG10.', 'Stata log is natural.']
})}`)

blocks.push(`// --- m5-contingency-row-column-pct ---\n${quad({
  key: 'm5-contingency-row-column-pct',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 18,
  title: ['Prop.table (R)', 'Crosstabs % (SPSS)', 'Pivot % (Excel)', 'tab, row col (Stata)'],
  desc: ['Row vs column percentages.', 'Cells options.', 'Show as % of row/column.', 'tabulate, row col.'],
  inst: [
    '`prop.table(table(a,b), margin=1)` vs margin=2; interpret difference.',
    'Crosstabs > Cells > Row and Column percentages; screenshot both.',
    'PivotTable > Show Values As > % of Row Parent / % of Column.',
    '`tab gender bmicat, row col` compare interpretations.'
  ],
  hint: ['margin 1 = rows.', 'Which denominator changes meaning.', 'Grand total % is another option.', 'chi2 optional.']
})}`)

blocks.push(`// --- m5-filter-complex-and-or ---\n${quad({
  key: 'm5-filter-complex-and-or',
  module: 'module-5',
  topic: 'data-manipulation',
  order: 19,
  title: ['Complex filter (R)', 'Complex select (SPSS)', 'Advanced filter (Excel)', 'compound if (Stata)'],
  desc: ['AND/OR logic on BMI and exercise.', 'Select Cases complex condition.', 'Custom AutoFilter or helper column.', 'if ( ) & ( ) | ( ).'],
  inst: [
    'filter((BMI>=25 & exercise<2) | BMI<18.5); summarize who remains.',
    'Select Cases: (BMI >= 25 AND exercise < 2) OR (BMI < 18.5).',
    'Helper column with TRUE/FALSE from AND/OR; filter TRUE.',
    '`count if (BMI>=25 & exercise<2) | BMI<18.5` and describe subset.'
  ],
  hint: ['Parentheses for precedence.', 'SPSS AND/OR keywords.', 'Excel AND() OR().', 'Stata & | with parentheses.']
})}`)

// Module 8 scatter trio (orders match jamovi rows 50–52)
blocks.push(`// --- m8-scatterplot-matrix ---\n${quad({
  key: 'm8-scatterplot-matrix',
  module: 'module-8',
  topic: 'correlation',
  order: 50,
  chapter: 'chapter-12',
  title: ['Pairs plot (R)', 'Scatterplot matrix (SPSS)', 'Scatter matrix (Excel)', 'scatter matrix (Stata)'],
  desc: ['3+ continuous variables.', 'Legacy dialogs or Chart Builder.', 'Limited; use add-in or many XY pairs.', 'graph matrix.'],
  inst: [
    '`pairs(df[c("x","y","z")])` or GGally::ggpairs().',
    'Graphs > Legacy Dialogs > Scatter/Dot > Matrix scatter (if available) or correlate variables then individual plots.',
    'Build multiple XY scatter mini-charts or use Statistic charts; note Excel limits.',
    '`graph matrix var1 var2 var3`.'
  ],
  hint: ['ggpairs is powerful.', 'Version-dependent in SPSS.', 'Document workaround if needed.', 'graph matrix is quick.']
})}`)

blocks.push(`// --- m8-scatterplot-regression-line ---\n${quad({
  key: 'm8-scatterplot-regression-line',
  module: 'module-8',
  topic: 'regression',
  order: 51,
  chapter: 'chapter-12',
  title: ['Scatter + LM line (R)', 'Scatter with fit line (SPSS)', 'Trendline (Excel)', 'twoway scatter lfit (Stata)'],
  desc: ['Bivariate plot with fitted line.', 'Chart Editor > Fit Line.', 'Add trendline.', 'lfit or lfitci.'],
  inst: [
    '`ggplot(df, aes(x,y)) + geom_point() + geom_smooth(method="lm", se=TRUE)`.',
    'Scatterplot > double-click chart > Add Fit Line > Linear.',
    'Insert Scatter > Chart Design > Add chart element > Trendline > Linear.',
    '`twoway (scatter y x) (lfit y x)`.'
  ],
  hint: ['geom_smooth se=FALSE if desired.', 'Linear vs Loess.', 'Display equation optional.', 'lfitci for CI band.']
})}`)

blocks.push(`// --- m8-scatterplot-grouped ---\n${quad({
  key: 'm8-scatterplot-grouped',
  module: 'module-8',
  topic: 'regression',
  order: 52,
  chapter: 'chapter-12',
  title: ['Color by group (R)', 'Grouped scatter (SPSS)', 'Series by group (Excel)', 'by() facets (Stata)'],
  desc: ['Compare XY by category.', 'Color or split by factor.', 'Multiple series.', 'twoway by group.'],
  inst: [
    'aes(color=group) or facet_wrap(~group).',
    'Chart Builder: set color/panel with grouping variable.',
    'Select data with category column for Legend/Series.',
    '`twoway scatter y x, by(group)` or separate scatters.'
  ],
  hint: ['Legends clear.', 'Group small n carefully.', 'Consistent axes.', 'by() vs overlaid.']
})}`)

// ---------- Module 6 ----------
blocks.push(`// --- m6-normal-probabilities ---\n${quad({
  key: 'm6-normal-probabilities',
  module: 'module-6',
  topic: 'normal-distribution',
  order: 1,
  title: ['Normal tail probs (R)', 'Normal CDF (SPSS)', 'NORM.DIST (Excel)', 'normal() (Stata)'],
  desc: ['P(Z>z) or cumulative normal.', 'CDF via Transform > Compute CDF.NORMAL.', 'NORM.DIST and complements.', 'display normal(z); invnormal.'],
  inst: [
    '`pnorm(1.5)` for Φ(1.5); `1-pnorm(z)` for upper tail; match your z from the exercise.',
    'Transform > Compute Variable: use CDF.NORMAL(q, mean, sd) for cumulative probability.',
    '=NORM.DIST(z,0,1,TRUE) for Φ(z); upper tail = 1 - that.',
    '`display normal(1.5)`; `display 1-normal(1.5)` for upper tail.'
  ],
  hint: ['pnorm vs qnorm.', 'CDF.NORMAL arguments order.', 'TRUE = cumulative.', 'Stata normal() is Φ.']
})}`)

blocks.push(`// --- m6-ci-mean-menu ---\n${quad({
  key: 'm6-ci-mean-menu',
  module: 'module-6',
  topic: 'sampling',
  order: 2,
  title: ['CI for mean (R)', 'CI for mean (SPSS)', 'CONFIDENCE (Excel)', 'ci means (Stata)'],
  desc: ['95% CI around mean.', 'Explore or Descriptives with CI.', 'CONFIDENCE.T or Data Analysis.', 'ci mean var.'],
  inst: [
    '`t.test(x)$conf.int` or `mean_cl_boot` in ggplot2; or manual mean ± t*SE.',
    'Analyze > Descriptive Statistics > Explore or Descriptives; check CI for mean.',
    'Use Descriptive Statistics tool or =AVERAGE±T.INV.2T(0.05,n-1)*STDEV.S/SQRT(n).',
    '`ci means score` or `ttest score` for one-sample CI.'
  ],
  hint: ['t.test default 95%.', 'Match variable.', 'n-1 for t.', 'Stata ci means is clear.']
})}`)

blocks.push(`// --- m6-random-variable-histogram ---\n${quad({
  key: 'm6-random-variable-histogram',
  module: 'module-6',
  topic: 'random-sampling',
  order: 3,
  title: ['Random draws + hist (R)', 'RV + chart (SPSS)', 'RAND + histogram (Excel)', 'runiform + hist (Stata)'],
  desc: ['Simulate random column; histogram.', 'Simulate via RV or syntax.', 'RAND() column; histogram.', 'gen x=runiform(); histogram.'],
  inst: [
    '`x <- runif(500); hist(x, main="Uniform")` or `rnorm`.',
    'Use Simulation or Compute with RV.UNIFORM / similar; graph histogram.',
    'Fill =RAND() in 500 cells; insert histogram.',
    '`clear; set obs 500; gen u=runiform(); histogram u`.'
  ],
  hint: ['Set seed with set.seed(123).', 'Syntax varies by version.', 'Volatile RAND recalculates.', 'set seed 12345 in Stata.']
})}`)

blocks.push(`// --- m6-compare-random-samples ---\n${quad({
  key: 'm6-compare-random-samples',
  module: 'module-6',
  topic: 'random-sampling',
  order: 4,
  title: ['Two random columns (R)', 'Two RV columns (SPSS)', 'Two RAND columns (Excel)', 'Two uniforms (Stata)'],
  desc: ['Two samples same n; compare mean/SD.', 'Two simulated variables.', 'Two columns RAND().', 'two vars.'],
  inst: [
    'Draw u1, u2 ~ Uniform; `summary(u1); summary(u2)`.',
    'Create two uniform RV columns; Descriptives on both.',
    'Two columns of RAND(); AVERAGE/STDEV each.',
    '`gen u1=runiform(); gen u2=runiform(); summarize u1 u2`.'
  ],
  hint: ['Expect similar means ~0.5 for Unif(0,1).', 'Note sampling variability.', 'Recalc issue in Excel.', 'Same seed control.']
})}`)

blocks.push(`// --- m6-sampling-distribution-mean ---\n${quad({
  key: 'm6-sampling-distribution-mean',
  module: 'module-6',
  topic: 'random-sampling',
  order: 5,
  title: ['Simulate x̄ (R)', 'Simulate means (SPSS)', 'Sample means (Excel)', 'simulate in Stata'],
  desc: ['Distribution of sample means.', 'Repeat sampling macro or manual batches.', 'Data Table or manual draws.', 'simulate or program.'],
  inst: [
    'For loop: many samples of size n, store `mean()`; `hist(means)`.',
    'Use OMS / syntax loop if available, or smaller classroom approximation with few batches.',
    'Use many rows of AVERAGE(RANDBETWEEN...) or Data Table to approximate.',
    '`simulate mean=r(mean), rep(1000): summarize x` style one-liner after defining program, or manual batches.'
  ],
  hint: ['CLT: means more normal.', 'Keep n consistent.', 'Excel is clunky—note limitation.', 'Stata simulate is ideal.']
})}`)

blocks.push(`// --- m6-binomial-probabilities ---\n${quad({
  key: 'm6-binomial-probabilities',
  module: 'module-6',
  topic: 'binomial-distribution',
  order: 6,
  title: ['dbinom (R)', 'PDF.BINOM (SPSS)', 'BINOM.DIST (Excel)', 'binomialp (Stata)'],
  desc: ['P(X=k) for Binomial(n,p).', 'Compute exact binomial prob.', 'BINOM.DIST(k,n,p,FALSE).', 'display Binomial...'],
  inst: [
    '`dbinom(7,10,0.5)` for P(X=7) with n=10,p=0.5.',
    'Transform > Compute: PDF.BINOM(k,n,p) or CDF as needed.',
    '=BINOM.DIST(7,10,0.5,FALSE) for exact; TRUE for cumulative.',
    '`display Binomial(7,10,0.5)` if supported; or `bitesti` / `binomialp` per version.'
  ],
  hint: ['dbinom vs pbinom.', 'Match k,n,p.', 'FALSE = probability mass.', 'Check Stata help binomial.']
})}`)

blocks.push(`// --- m6-empirical-rule ---\n${quad({
  key: 'm6-empirical-rule',
  module: 'module-6',
  topic: 'normal-distribution',
  order: 8,
  title: ['Empirical rule check (R)', 'Empirical rule (SPSS)', 'NORM rules (Excel)', 'normal calc (Stata)'],
  desc: ['μ±σ contains ~68% for normal.', 'Use CDF difference.', 'NORM.DIST bounds.', 'normal((115-100)/15)-normal((85-100)/15).'],
  inst: [
    'For N(100,15): `pnorm(115)-pnorm(85)` ≈ 0.68.',
    'Compute difference of CDF.NORMAL at 115 and 85 with mean 100 sd 15.',
    '=NORM.DIST(115,100,15,TRUE)-NORM.DIST(85,100,15,TRUE).',
    '`display normal((115-100)/15) - normal((85-100)/15)`.'
  ],
  hint: ['Standardize if using Z.', 'Same math all packages.', 'Interpret as ~68%.', 'Z bounds ±1.']
})}`)

blocks.push(`// --- m6-law-large-numbers ---\n${quad({
  key: 'm6-law-large-numbers',
  module: 'module-6',
  topic: 'law-of-large-numbers',
  order: 10,
  title: ['LLN demo (R)', 'LLN (SPSS)', 'LLN (Excel)', 'LLN (Stata)'],
  desc: ['Sample mean approaches μ as n grows.', 'Aggregate increasing N.', 'AVERAGE larger ranges.', 'increasing obs.'],
  inst: [
    'Draw N=10,50,200 from N(100,15); print `mean()` each.',
    'Sample subsets or use different case selections; compare means.',
    'Use different row counts from simulated N(100,15) via NORM.INV(RAND(),100,15).',
    '`set obs` 10/50/200; gen x=rnormal(100,15); tabstat x, s(mean).'
  ],
  hint: ['Expect more stability with large N.', 'Use same seed for fair compare.', 'Excel simulation optional.', 'rnormal in Stata 15+.']
})}`)

blocks.push(`// --- m6-central-limit-theorem ---\n${quad({
  key: 'm6-central-limit-theorem',
  module: 'module-6',
  topic: 'central-limit-theorem',
  order: 11,
  title: ['CLT sim (R)', 'CLT (SPSS)', 'CLT (Excel)', 'CLT (Stata)'],
  desc: ['Means of non-normal become normal-ish.', 'Simulate many x̄ from uniform.', 'Many sample averages.', 'simulate means.'],
  inst: [
    'Sample from runif, replicate 1000 means of n=30; `hist(means)`.',
    'Approximate with repeated sampling syntax or export to R.',
    'Approximate with many AVERAGE of RAND() blocks.',
    'Program: draw samples, save r(mean); histogram of means.'
  ],
  hint: ['Larger n → more normal.', 'SPSS loop advanced.', 'Excel heavy.', 'Stata program + simulate.']
})}`)

blocks.push(`// --- m6-sample-vs-population-sd ---\n${quad({
  key: 'm6-sample-vs-population-sd',
  module: 'module-6',
  topic: 'parameter-estimation',
  order: 12,
  title: ['sd vs σ̂ (R)', 'SD options (SPSS)', 'STDEV.S vs P (Excel)', 'sd vs sd with n-1 (Stata)'],
  desc: ['n-1 vs n denominator.', 'Descriptives shows sample SD.', 'STDEV.S sample; STDEV.P pop.', 'summarize; manual sqrt.'],
  inst: [
    '`sd(x)` uses n-1; compare to `sqrt(mean((x-mean(x))^2))` (population style on sample).',
    'Descriptives: SD is sample (n-1). Discuss bias correction.',
    'Compare STDEV.S and STDEV.P on same column.',
    '`summarize x`; explain divide-by N vs N-1; `egen popsd = ...` optional.'
  ],
  hint: ['Unbiased variance uses n-1.', 'Terminology matters.', 'P vs S in Excel.', 'Stata summarize sd is sample.']
})}`)

blocks.push(`// --- m6-interpret-ci ---\n${quad({
  key: 'm6-interpret-ci',
  module: 'module-6',
  topic: 'confidence-intervals',
  order: 13,
  title: ['CI interpretation + calc (R)', 'CI output (SPSS)', 'CI (Excel)', 'CI (Stata)'],
  desc: ['Compute CI; write frequentist interpretation.', 'Run test/CI; write interpretation.', 'Compute interval.', 'ci means; interpret.'],
  inst: [
    'Compute 95% CI for a mean; write correct interpretation (repeated sampling).',
    'Get CI from t-test or descriptives; write 2–3 sentences avoiding P(μ in interval).',
    'Build CI with T.INV; interpret in writing.',
    '`ci means x`; interpret in words.'
  ],
  hint: ['CI is about method, not this interval’s prob.', 'Common misinterpretations list.', 'Match α=0.05.', 'Use course wording.']
})}`)

blocks.push(`// --- m6-ci-width-sample-size ---\n${quad({
  key: 'm6-ci-width-sample-size',
  module: 'module-6',
  topic: 'confidence-intervals',
  order: 15,
  title: ['CI width vs N (R)', 'CI width vs N (SPSS)', 'CI width vs N (Excel)', 'CI width vs N (Stata)'],
  desc: ['N=10,30,100 same pop; compare CI width.', 'Three samples or split file.', 'Three simulations.', 'three ci means.'],
  inst: [
    'Draw three samples; `t.test` each; compare conf.int width.',
    'Three datasets or subsets; compare CI lengths in output.',
    'Three different n; compute margin = t*SE; compare.',
    'Run `ci means` on subsamples of sizes 10,30,100; compare widths.'
  ],
  hint: ['Width ∝ 1/√n.', 'Control randomness with seed.', 'Document each n.', 'Expect narrower for larger n.']
})}`)

// ---------- Module 7 ----------
blocks.push(`// --- m7-one-sample-t-menu ---\n${quad({
  key: 'm7-one-sample-t-menu',
  module: 'module-7',
  topic: 'hypothesis-testing',
  order: 1,
  title: ['One-sample t (R)', 'One-sample t (SPSS)', 'T.TEST one-sample (Excel)', 'ttest one-sample (Stata)'],
  desc: ['Test mean vs μ₀.', 'Analyze > Compare Means > One-Sample T Test.', 'T.TEST(array, μ₀ array, 1).', 'ttest var == 100.'],
  inst: [
    '`t.test(iq, mu=100)`.',
    'Analyze > Compare Means > One-Sample T Test; test value 100.',
    '=T.TEST(A2:A26,100,1,1) one-tailed example—adjust tails to match exercise.',
    '`ttest iq == 100`.'
  ],
  hint: ['two.sided default in R.', 'Two-tailed in SPSS dialog.', 'Excel tail codes.', 'Stata two-sided default.']
})}`)

blocks.push(`// --- m7-t-test-read-output ---\n${quad({
  key: 'm7-t-test-read-output',
  module: 'module-7',
  topic: 'hypothesis-testing',
  order: 2,
  title: ['Read t output (R)', 'Read t output (SPSS)', 'Read t output (Excel)', 'Read t output (Stata)'],
  desc: ['Locate t and p; interpret.', 'Same in SPSS.', 'Same in Excel.', 'Same in Stata.'],
  inst: [
    'Run one-sample t; screenshot t, df, p; 2 sentences decision at α=.05.',
    'Run One-Sample T Test; identify t and Sig. (two-tailed).',
    'Run T.TEST; document statistic and p if available or from Data Analysis.',
    '`ttest var==μ0`; report t, p, decision.'
  ],
  hint: ['p < α reject H0.', 'df = n-1.', 'Excel limitations—note.', 'Two-sided p in Stata.']
})}`)

blocks.push(`// --- m7-t-test-outlier-robustness ---\n${quad({
  key: 'm7-t-test-outlier-robustness',
  module: 'module-7',
  topic: 'hypothesis-testing',
  order: 4,
  title: ['t before/after filter (R)', 'Select cases t (SPSS)', 'Exclude outlier (Excel)', 'drop if + ttest (Stata)'],
  desc: ['Compare results removing outlier.', 'Split or filter.', 'Delete row or IF exclude.', 'drop one obs.'],
  inst: [
    'Run t.test full data; remove extreme row; re-run; compare t and p.',
    'Identify outlier; Select Cases; re-run t-test; reset all cases.',
    'Re-run T.TEST excluding outlier row.',
    '`ttest x==100`; `drop if x==...`; `ttest x==100` again.'
  ],
  hint: ['Document which case.', 'Transparency.', 'Backup data.', 'use preserve/restore optional.']
})}`)

blocks.push(`// --- m7-binomial-proportion-test ---\n${quad({
  key: 'm7-binomial-proportion-test',
  module: 'module-7',
  topic: 'hypothesis-testing',
  order: 5,
  title: ['binom.test (R)', 'Binomial test (SPSS)', 'BINOM.DIST manual (Excel)', 'bitesti (Stata)'],
  desc: ['Test π vs π₀ for binary.', 'Analyze > Nonparametric > Binomial or Proportions.', 'Exact calc or add-in.', 'bitesti n k p.'],
  inst: [
    '`binom.test(62,100,p=0.5)` for 62 heads in 100.',
    'Use One-Sample Proportions / Binomial per your SPSS version.',
    'Use BINOM.DIST for exact two-tailed p or describe limitation.',
    '`bitesti 100 62 0.5` or `prtesti 100 62 0.5`.'
  ],
  hint: ['Clopper-Pearson in binom.test.', 'Match jamovi proportion test.', 'Excel lacks one-click binomial test.', 'bitesti exact.']
})}`)

blocks.push(`// --- m7-interpret-p-value-output ---\n${quad({
  key: 'm7-interpret-p-value-output',
  module: 'module-7',
  topic: 'p-values',
  order: 7,
  title: ['p-value sentence (R)', 'p-value sentence (SPSS)', 'p-value sentence (Excel)', 'p-value sentence (Stata)'],
  desc: ['Run any test; write correct p interpretation.', 'Same.', 'Same.', 'Same.'],
  inst: [
    'Run a test; one sentence: if H0 true, chance of this extreme data.',
    'Paste output; write interpretation avoiding P(H0 true).',
    'From test output; write frequentist interpretation.',
    'From `ttest`/`prtest`; write one correct sentence.'
  ],
  hint: ['Never “probability null is true”.', 'Assume α if needed.', 'Match course phrasing.', 'Extreme = tail area.']
})}`)

blocks.push(`// --- m7-cohens-d-onesample ---\n${quad({
  key: 'm7-cohens-d-onesample',
  module: 'module-7',
  topic: 'effect-size',
  order: 10,
  title: ["Cohen's d one-sample (R)", "Cohen's d (SPSS)", "Cohen's d (Excel)", "Cohen's d (Stata)"],
  desc: ['Effect size for mean vs μ0.', 'Options > Effect sizes.', 'Manual (M-μ0)/s.', 'esize, cohensd.'],
  inst: [
    'Use `effectsize::cohens_d(x, mu=100)` or manual (mean(x)-mu)/sd(x).',
    'One-Sample T Test: Options > Effect sizes (Cohen d).',
    'Compute d = (AVERAGE-MU)/STDEV.S(range).',
    '`esize onewell iq, mu(100)` or manual.'
  ],
  hint: ['sd uses sample n-1.', 'Match jamovi d.', 'Document formula.', 'ssc install esize if needed.']
})}`)

blocks.push(`// --- m7-apa-results-onesample ---\n${quad({
  key: 'm7-apa-results-onesample',
  module: 'module-7',
  topic: 'hypothesis-testing',
  order: 15,
  title: ['APA one-sample t (R)', 'APA one-sample t (SPSS)', 'APA one-sample t (Excel)', 'APA one-sample t (Stata)'],
  desc: ['One sentence APA with M, SD, t, p, d.', 'Pull from output.', 'Assemble manually.', 'Pull from estout or by hand.'],
  inst: [
    'Run t.test; write APA: M, SD, t(df), p, d.',
    'Copy SPSS tables; one APA sentence.',
    'Compute stats; one APA sentence.',
    '`ttest x==μ`; write APA sentence with values.'
  ],
  hint: ['Leading zero p optional per APA 7.', 'Two-tailed unless noted.', 'Round sensibly.', 'Include test value.']
})}`)

// ---------- Module 8 (software-actionable jamovi parallels) ----------
const c10 = 'categorical-data-analysis'
const c11 = 'chapter-11'
const c12 = 'chapter-12'
const c13 = 'chapter-13'

blocks.push(`// --- m8-chisq-gof ---\n${q8({
  key: 'm8-chisq-gof',
  topic: c10,
  order: 1,
  chapter: 'chapter-10',
  label: 'Chi-square goodness-of-fit',
  desc: 'Test whether category counts match expected proportions.',
  inst: [
    '`chisq.test(observed, p=expected_probs)` with p summing to 1.',
    'Analyze > Nonparametric Tests > One Sample (legacy or new UI) for chi-square GOF.',
    'Compute (O−E)²/E manually or with helper columns; sum to χ²; compare to CHISQ.INV.RT.',
    '`csgof` user packages or manual expected counts; `tabulate` + matrix if needed.'
  ],
  hint: ['Check expected ≥5 rule.', 'SPSS UI varies by version.', 'Excel is manual for GOF.', 'Community-contributed commands optional.']
})}`)

blocks.push(`// --- m8-chisq-independence ---\n${q8({
  key: 'm8-chisq-independence',
  topic: c10,
  order: 2,
  chapter: 'chapter-10',
  label: 'Chi-square independence',
  desc: 'Test association between two categorical variables.',
  inst: [
    '`chisq.test(table(rowvar,colvar))` or `xtabs`.',
    'Descriptive Statistics > Crosstabs > Statistics > Chi-square.',
    'Contingency table + CHISQ.TEST(range) on observed counts.',
    '`tabulate row col, chi2`.'
  ],
  hint: ['Expected frequencies option.', 'Include χ² and p.', 'CHISQ.TEST needs counts only.', 'chi2 gives Pearson χ².']
})}`)

blocks.push(`// --- m8-chisq-expected-freq ---\n${q8({
  key: 'm8-chisq-expected-freq',
  topic: c10,
  order: 3,
  chapter: 'chapter-10',
  label: 'Expected frequencies check',
  desc: 'Verify E = (row total × column total) / N for one cell.',
  inst: [
    '`chisq.test(t)$expected` to view expected matrix.',
    'Crosstabs > Cells > Expected.',
    'Compute one cell expected from margin totals in sheet.',
    '`tabulate a b, chi2` then `predict` or manual from saved margins.'
  ],
  hint: ['Round-trip check formula.', 'Compare to hand calc.', 'Grand total N.', 'Focus one cell verification.']
})}`)

blocks.push(`// --- m8-chisq-continuity ---\n${q8({
  key: 'm8-chisq-continuity',
  topic: c10,
  order: 4,
  chapter: 'chapter-10',
  label: '2×2 continuity correction',
  desc: 'Compare χ² with/without Yates correction for 2×2.',
  inst: [
    '`chisq.test(t, correct=TRUE)` vs `correct=FALSE`.',
    'Crosstabs: check continuity correction if offered.',
    'Manual Yates: (|O−E|−0.5)²/E per cell.',
    '`tabi` / `csi` or manual correction; document both.'
  ],
  hint: ['Only for 2×2.', 'More conservative with correction.', 'Excel manual.', 'Exact tests alternative.']
})}`)

blocks.push(`// --- m8-chisq-cramers-v ---\n${q8({
  key: 'm8-chisq-cramers-v',
  topic: c10,
  order: 5,
  chapter: 'chapter-10',
  label: "Cramér's V",
  desc: 'Report effect size for association after χ².',
  inst: [
    '`rcompanion::cramerV(t)` or hand formula from χ², n, min(dim)-1.',
    'Crosstabs > Statistics > Phi and Cramer V.',
    'Compute V from χ² output manually.',
    '`tabulate ... , chi2 V` if available or `assoc` measures.'
  ],
  hint: ['0–1 scale.', 'SPSS labels Cramér.', 'df affects max V.', 'ssc packages for assoc.']
})}`)

blocks.push(`// --- m8-chisq-fisher ---\n${q8({
  key: 'm8-chisq-fisher',
  topic: c10,
  order: 6,
  chapter: 'chapter-10',
  label: 'Fisher exact test',
  desc: 'Exact test for small expected counts in 2×2 (or larger).',
  inst: [
    '`fisher.test(t)`.',
    'Crosstabs > Exact > Fisher (or Statistics > Fisher).',
    'Fisher not native; note jamovi vs Excel limitation.',
    '`tabulate a b, exact` or `cc a b, exact`.'
  ],
  hint: ['Two-sided p.', 'SPSS exact test add-on sometimes.', 'Use R/Stata if Excel missing.', 'exact option.']
})}`)

blocks.push(`// --- m8-chisq-mcnemar ---\n${q8({
  key: 'm8-chisq-mcnemar',
  topic: c10,
  order: 7,
  chapter: 'chapter-10',
  label: 'McNemar paired binary',
  desc: 'Test change in paired proportions.',
  inst: [
    '`mcnemar.test(matrix_2x2)`.',
    'Analyze > Nonparametric > Related Samples for McNemar (binary paired).',
    'Manual McNemar on 2×2 paired table.',
    '`mcc` or `symmetry` for paired binary; check Stata help.'
  ],
  hint: ['Paired 2×2 layout.', 'SPSS path varies.', 'Continuity optional.', '`ssc install tabchii` etc.']
})}`)

blocks.push(`// --- m8-chisq-assumptions ---\n${q8({
  key: 'm8-chisq-assumptions',
  topic: c10,
  order: 9,
  chapter: 'chapter-10',
  label: 'Chi-square assumptions',
  desc: 'Inspect expected counts; decide χ² vs Fisher.',
  inst: [
    'Print `chisq.test(...)$expected`; flag cells <5.',
    'Crosstabs expected counts.',
    'Compute expected grid in Excel.',
    '`tabulate ... , chi2` + expected via `predict` or manual.'
  ],
  hint: ['Rule of thumb ≥5.', 'Document violations.', 'Propose Fisher if needed.', 'Independence of obs.']
})}`)

blocks.push(`// --- m8-chisq-custom-proportions ---\n${q8({
  key: 'm8-chisq-custom-proportions',
  topic: c10,
  order: 10,
  chapter: 'chapter-10',
  label: 'GOF custom probabilities',
  desc: 'Goodness-of-fit with unequal expected proportions.',
  inst: [
    '`chisq.test(counts, p=c(...))` normalized to sum 1.',
    'Weight cases or custom expected in SPSS chi-square.',
    'Manual E = N×p per category.',
    'Manual or matrix approach with expected vector.'
  ],
  hint: ['p must sum to 1.', 'Match jamovi ratios.', 'Check totals.', 'Document hypothesized π.']
})}`)

blocks.push(`// --- m8-chisq-apa-writeup ---\n${q8({
  key: 'm8-chisq-apa-writeup',
  topic: c10,
  order: 11,
  chapter: 'chapter-10',
  label: 'APA chi-square write-up',
  desc: 'Full paragraph with χ², df, p, effect size.',
  inst: [
    'Run test in R; write APA results with values from output.',
    'Paste SPSS output; write APA paragraph.',
    'Assemble stats from sheet; write APA.',
    'Stata output → APA paragraph.'
  ],
  hint: ['Include N and expected check.', 'Cramér V or phi.', 'Exact test note if used.', 'Spell out analysis name.']
})}`)

blocks.push(`// --- m8-chisq-by-hand ---\n${q8({
  key: 'm8-chisq-by-hand',
  topic: c10,
  order: 13,
  chapter: 'chapter-10',
  label: 'Hand χ² + software check',
  desc: 'Compute χ² manually and verify in software.',
  inst: [
    'Hand calc then `chisq.test` on same table.',
    'Verify with Crosstabs output.',
    'Excel formula check vs package.',
    '`tabi` / `csi` to confirm.'
  ],
  hint: ['Show work.', 'Match to 2 decimals.', 'df = (r-1)(c-1).', 'Screenshot both.']
})}`)

blocks.push(`// --- m8-chisq-standardized-residuals ---\n${q8({
  key: 'm8-chisq-standardized-residuals',
  topic: c10,
  order: 14,
  chapter: 'chapter-10',
  label: 'Standardized residuals',
  desc: 'Identify cells contributing to χ².',
  inst: [
    '`chisq.test(t)$stdres` if available or compute (O−E)/√E.',
    'Crosstabs > Cells > Standardized residuals.',
    'Compute standardized residual grid.',
    '`tabulate ... , chi2` + community tools or manual z.'
  ],
  hint: ['|z|>2 noteworthy.', 'SPSS calls adjusted.', 'Watch expected in denominator.', 'Explain in words.']
})}`)

blocks.push(`// --- m8-chisq-survey-analysis ---\n${q8({
  key: 'm8-chisq-survey-analysis',
  topic: c10,
  order: 17,
  chapter: 'chapter-10',
  label: 'Full categorical analysis',
  desc: 'Hypotheses, test, assumptions, effect size, interpretation.',
  inst: [
    'Run independence χ²; check expected; Cramér V; write-up.',
    'SPSS Crosstabs pipeline with full options.',
    'Excel hybrid workflow with written assumptions.',
    'Stata tabulate + assoc measures + write-up.'
  ],
  hint: ['End-to-end like jamovi task.', 'APA style.', 'Assumptions first.', 'Practical significance.']
})}`)

blocks.push(`// --- m8-ttest-independent-nav ---\n${q8({
  key: 'm8-ttest-independent-nav',
  topic: 't-tests',
  order: 18,
  chapter: c11,
  label: 'Independent samples t-test',
  desc: 'Compare two unrelated groups on a continuous outcome.',
  inst: [
    '`t.test(y ~ group, data=df, var.equal=FALSE)` (Welch default in R).',
    'Analyze > Compare Means > Independent-Samples T Test.',
    'Data Analysis > t-Test Two-Sample Assuming Unequal Variances.',
    '`ttest y, by(group)`.'
  ],
  hint: ['Check equal vs Welch.', 'Define groups clearly.', 'Variable types.', '`welch` option in Stata.']
})}`)

blocks.push(`// --- m8-ttest-paired-nav ---\n${q8({
  key: 'm8-ttest-paired-nav',
  topic: 't-tests',
  order: 19,
  chapter: c11,
  label: 'Paired samples t-test',
  desc: 'Same participants measured twice.',
  inst: [
    '`t.test(pre, post, paired=TRUE)`.',
    'Analyze > Compare Means > Paired-Samples T Test.',
    't-Test: Paired Two Sample for Means.',
    '`ttest pre==post`.'
  ],
  hint: ['Pairs must align.', 'Check difference direction.', 'Excel Data Analysis.', 'Stata paired ==.']
})}`)

blocks.push(`// --- m8-correlation-pearson-nav ---\n${q8({
  key: 'm8-correlation-pearson-nav',
  topic: 'correlation',
  order: 20,
  chapter: c12,
  label: 'Pearson correlation',
  desc: 'Linear association between two continuous variables.',
  inst: [
    '`cor.test(x, y, method="pearson")` or `cor()`.',
    'Analyze > Correlate > Bivariate (Pearson).',
    'CORREL function or Data Analysis > Correlation.',
    '`pwcorr x y, sig` or `correlate`.'
  ],
  hint: ['Scatterplot first.', 'Check outliers.', 'Pairwise deletion default.', 'pwcorr for p-values.']
})}`)

blocks.push(`// --- m8-regression-simple-nav ---\n${q8({
  key: 'm8-regression-simple-nav',
  topic: 'regression',
  order: 21,
  chapter: c12,
  label: 'Simple linear regression',
  desc: 'Predict DV from one IV.',
  inst: [
    '`lm(y ~ x, data=df)`; `summary()`.',
    'Analyze > Regression > Linear.',
    'LINEST or Data Analysis > Regression.',
    '`regress y x`.'
  ],
  hint: ['Interpret slope.', 'R² in summary.', 'Residual plots optional.', 'robust SE optional.']
})}`)

blocks.push(`// --- m8-anova-oneway-nav ---\n${q8({
  key: 'm8-anova-oneway-nav',
  topic: 'anova',
  order: 22,
  chapter: c11,
  label: 'One-way ANOVA',
  desc: 'Compare means across 3+ independent groups.',
  inst: [
    '`aov(y ~ group)` or `oneway.test` (Welch).',
    'Analyze > Compare Means > One-Way ANOVA or GLM Univariate.',
    'Single factor ANOVA tool (limited).',
    '`oneway y group` or `anova y group`.'
  ],
  hint: ['Post-hoc if significant.', 'Check homogeneity.', 'Excel weak—note.', 'Stata oneway / anova.']
})}`)

blocks.push(`// --- m8-correlation-interpret ---\n${q8({
  key: 'm8-correlation-interpret',
  topic: 'correlation',
  order: 29,
  chapter: c12,
  label: 'Correlation + plot interpretation',
  desc: 'Numeric r plus visual evidence.',
  inst: [
    '`cor.test` + `ggplot` scatter.',
    'Bivariate correlation with scatter from Chart Builder.',
    'Scatter + CORREL.',
    '`pwcorr` + `twoway scatter y x`.'
  ],
  hint: ['Strength and direction.', 'Linearity.', 'Outliers.', 'N in interpretation.']
})}`)

blocks.push(`// --- m8-regression-simple-interpret ---\n${q8({
  key: 'm8-regression-simple-interpret',
  topic: 'regression',
  order: 30,
  chapter: c12,
  label: 'Regression slope & R²',
  desc: 'Interpret slope and R² from simple regression.',
  inst: [
    '`summary(lm(y~x))` for coef and R².',
    'Coefficients table in SPSS regression.',
    'Regression output LINEST/Data Analysis.',
    '`regress y x`.'
  ],
  hint: ['Units of slope.', 'R² as variance explained.', 'Significance.', 'F-test overall.']
})}`)

blocks.push(`// --- m8-anova-gamlj-oneway ---\n${q8({
  key: 'm8-anova-gamlj-oneway',
  topic: 'anova',
  order: 31,
  chapter: c11,
  label: 'One-way ANOVA + post-hoc',
  desc: 'Omnibus F and pairwise comparisons (GAMLj parallel).',
  inst: [
    '`aov` + `TukeyHSD()` or `emmeans`.',
    'One-Way ANOVA > Post Hoc (Tukey/Bonferroni).',
    'Limited post-hoc in Excel—use R note.',
    '`oneway y g, bonferroni` / `pwmean y, over(g) mcompare(bonf)`.'
  ],
  hint: ['Match jamovi post-hoc style.', 'Adjust for multiple.', 'Effect size η² optional.', 'Stata multiple comparisons.']
})}`)

blocks.push(`// --- m8-anova-factorial-gamlj ---\n${q8({
  key: 'm8-anova-factorial-gamlj',
  topic: 'anova',
  order: 32,
  chapter: c11,
  label: 'Factorial ANOVA + interaction plot',
  desc: 'Two factors with interaction.',
  inst: [
    '`aov(y ~ A*B)` + `interaction.plot` or `emmip`.',
    'GLM Univariate: two factors, profile plots.',
    'Excel not ideal—describe limitation; use R for plot.',
    '`anova y A##B` or `regress` with i.A##i.B; marginsplot.'
  ],
  hint: ['Interpret interaction.', 'Simple effects.', 'GAMLj analog.', 'marginsplot in Stata.']
})}`)

blocks.push(`// --- m8-ttest-student-welch ---\n${q8({
  key: 'm8-ttest-student-welch',
  topic: 't-tests-detailed',
  order: 27,
  chapter: c11,
  label: 'Student vs Welch t',
  desc: 'Run both; compare when variances unequal.',
  inst: [
    '`t.test(..., var.equal=TRUE)` vs `FALSE`.',
    'Independent t-test: equal variances assumed vs not assumed rows.',
    'Two Data Analysis runs if both available.',
    '`ttest y, by(g)` Welch default; `ttest y, by(g) unequal` etc.'
  ],
  hint: ['df differ.', 'Welch safer if unsure.', 'Report which used.', 'Stata displays both sometimes.']
})}`)

blocks.push(`// --- m8-ttest-levene ---\n${q8({
  key: 'm8-ttest-levene',
  topic: 't-tests-detailed',
  order: 28,
  chapter: c11,
  label: "Levene's test",
  desc: 'Test homogeneity of variance before t-test.',
  inst: [
    '`car::leveneTest(y ~ group)`.',
    'Independent T Test > Options > Levene (or One-Way ANOVA for test).',
    'Manual Levene cumbersome—use add-in or R.',
    '`robvar y, by(group)` or `oneway y group, tabulate`.'
  ],
  hint: ['p<.05 → unequal variances.', 'Use Welch.', 'SPSS path.', 'robvar median option.']
})}`)

blocks.push(`// --- m8-ttest-shapiro ---\n${q8({
  key: 'm8-ttest-shapiro',
  topic: 't-tests-assumptions',
  order: 29,
  chapter: c11,
  label: 'Shapiro-Wilk by group',
  desc: 'Normality check per group.',
  inst: [
    '`by(df, df$g, function(z) shapiro.test(z$y))`.',
    'Explore or Split File + Shapiro.',
    'Limited—note sample size; use QQ manually.',
    '`swilk y if g==1` for each group.'
  ],
  hint: ['Small n only for Shapiro.', 'Use plots too.', 'Excel weak.', 'Loop groups in Stata.']
})}`)

blocks.push(`// --- m8-ttest-qq-plot ---\n${q8({
  key: 'm8-ttest-qq-plot',
  topic: 't-tests-assumptions',
  order: 30,
  chapter: c11,
  label: 'Q–Q plot',
  desc: 'Visual normality check.',
  inst: [
    '`qqnorm(y); qqline(y)` by group with facet.',
    'Graphs > Q-Q; or Explore plots.',
    'QQ plot add-in or manual quantiles.',
    '`qnorm y` or `qqplot`.'
  ],
  hint: ['Points on line ≈ normal.', 'Heavy tails.', 'Compare groups.', 'Stata qnorm.']
})}`)

blocks.push(`// --- m8-ttest-one-sided ---\n${q8({
  key: 'm8-ttest-one-sided',
  topic: 't-tests-detailed',
  order: 32,
  chapter: c11,
  label: 'One-sided independent t',
  desc: 'Directional alternative.',
  inst: [
    '`t.test(y~g, alternative="greater")` (adjust side).',
    'Define one-tailed test in dialog if available.',
    'T.TEST with tails=1.',
    '`ttest y, by(g)` one-sided via `pr` option patterns.'
  ],
  hint: ['Direction must match theory.', 'Halve two-tailed p only if careful.', 'Document choice.', 'Stata one-sided syntax.']
})}`)

blocks.push(`// --- m8-ttest-cohens-d-nav ---\n${q8({
  key: 'm8-ttest-cohens-d-nav',
  topic: 'effect-size-ttests',
  order: 33,
  chapter: c11,
  label: "Cohen's d (two-sample)",
  desc: 'Standardized mean difference.',
  inst: [
    '`effectsize::cohens_d(y~g)`.',
    'Independent T Test > Options > Effect sizes.',
    'Manual from means and pooled SD.',
    '`esize twosample y, by(g)` or manual.'
  ],
  hint: ['Pooled vs glass delta.', 'Match jamovi.', 'Report with t.', 'ssc esize.']
})}`)

blocks.push(`// --- m8-ttest-ci-mean-diff ---\n${q8({
  key: 'm8-ttest-ci-mean-diff',
  topic: 't-tests-detailed',
  order: 35,
  chapter: c11,
  label: 'CI for mean difference',
  desc: 'Interpret CI for μ₁−μ₂.',
  inst: [
    '`t.test(y~g)` conf.int for difference.',
    'Independent T Test table: mean difference CI.',
    'From manual SE and t critical.',
    '`ttest y, by(g)` displays CI.'
  ],
  hint: ['Excludes 0 ↔ two-sided sig at α.', 'Units of Y.', 'Welch vs Student affects CI.', 'Stata shows diff.']
})}`)

blocks.push(`// --- m8-ttest-mann-whitney ---\n${q8({
  key: 'm8-ttest-mann-whitney',
  topic: 'nonparametric-tests',
  order: 36,
  chapter: c11,
  label: 'Mann–Whitney U',
  desc: 'Nonparametric two independent groups.',
  inst: [
    '`wilcox.test(y ~ g)`.',
    'Nonparametric Tests > 2 Independent Samples.',
    'Real Statistics add-in or R note.',
    '`ranksum y, by(group)`.'
  ],
  hint: ['Median shift interpretation.', 'Ties.', 'Exact vs asymptotic.', 'ranksum Stata.']
})}`)

blocks.push(`// --- m8-ttest-wilcoxon ---\n${q8({
  key: 'm8-ttest-wilcoxon',
  topic: 'nonparametric-tests',
  order: 37,
  chapter: c11,
  label: 'Wilcoxon signed-rank',
  desc: 'Nonparametric paired test.',
  inst: [
    '`wilcox.test(pre, post, paired=TRUE)`.',
    '2 Related Samples nonparametric.',
    'Paired add-in or R.',
    '`signrank pre=post`.'
  ],
  hint: ['Use differences.', 'Zeroes handling.', 'SPSS exact.', 'signrank.']
})}`)

blocks.push(`// --- m8-ttest-full-writeup ---\n${q8({
  key: 'm8-ttest-full-writeup',
  topic: 't-tests-practice',
  order: 39,
  chapter: c11,
  label: 'Full t-test analysis',
  desc: 'Assumptions, test, effect size, APA paragraph.',
  inst: [
    'Complete workflow in R with plots and `t.test`.',
    'SPSS output pack + write-up.',
    'Excel partial + acknowledge limits.',
    'Stata full pipeline + APA.'
  ],
  hint: ['Levene/Shapiro notes.', 'Welch default justify.', 'Effect size.', 'Assumption robustness sentence.']
})}`)

blocks.push(`// --- m8-ttest-difference-scores ---\n${q8({
  key: 'm8-ttest-difference-scores',
  topic: 't-tests-practice',
  order: 40,
  chapter: c11,
  label: 'Difference scores = paired t',
  desc: 'One-sample t on D = after−before vs 0 equals paired t.',
  inst: [
    '`d <- post-pre`; `t.test(d, mu=0)`.',
    'Compute D; One-Sample T on D.',
    'Column D then one-sample T.TEST to 0.',
    '`gen d=post-pre`; `ttest d==0`.'
  ],
  hint: ['Should match paired t.', 'Rounding.', 'df = n−1.', 'Show equality.']
})}`)

blocks.push(`// --- m8-ttest-pooled-vs-welch ---\n${q8({
  key: 'm8-ttest-pooled-vs-welch',
  topic: 't-tests-practice',
  order: 43,
  chapter: c11,
  label: 'Pooled vs Welch df',
  desc: 'Compare df and results.',
  inst: [
    'Run `t.test` var.equal T/F; compare df.',
    'SPSS equal vs unequal rows.',
    'Document from two analyses.',
    '`ttest, welch` vs default Stata behavior.'
  ],
  hint: ['Welch df non-integer.', 'Which SE used.', 'Student assumes σ₁=σ₂.', 'Report choice.']
})}`)

blocks.push(`// --- m8-ttest-manuscript-results ---\n${q8({
  key: 'm8-ttest-manuscript-results',
  topic: 't-tests-comprehensive',
  order: 46,
  chapter: c11,
  label: 'Journal-style Results',
  desc: 'Multi-paragraph Results for t-test study.',
  inst: [
    'Knit mini results from R outputs.',
    'SPSS tables + prose.',
    'Hybrid write-up.',
    'Stata esttab/inline values + prose.'
  ],
  hint: ['Descriptives table.', 'Assumptions brief.', 'Primary test.', 'Effect size + CI.']
})}`)

blocks.push(`// --- m8-anova-oneway-ch13 ---\n${q8({
  key: 'm8-anova-oneway-ch13',
  topic: 'one-way-anova',
  order: 47,
  chapter: c13,
  label: 'One-way ANOVA + η²',
  desc: 'F test and effect size.',
  inst: [
    '`summary(aov(y~g)); library(effectsize); eta_squared`.',
    'One-Way ANOVA > Options effect size.',
    'Limited—use R for η².',
    '`oneway y g`; `estat esize` if available.'
  ],
  hint: ['Post-hoc if F sig.', 'η² interpretation.', 'jamovi ANOVA module.', 'Stata contrasts.']
})}`)

blocks.push(`// --- m8-anova-posthoc-holm ---\n${q8({
  key: 'm8-anova-posthoc-holm',
  topic: 'post-hoc-tests',
  order: 49,
  chapter: c13,
  label: 'Post-hoc Holm',
  desc: 'Pairwise comparisons with Holm adjustment.',
  inst: [
    '`pairwise.t.test(y,g,p.adjust.method="holm")` or `emmeans` + `pairs(adjust="holm")`.',
    'ANOVA > Post Hoc > Holm.',
    'Manual Bonferroni/Holm adjust p in sheet.',
    '`pwmean y, over(g) mcompare(holm)`.'
  ],
  hint: ['Family-wise error.', 'Compare unadjusted vs adjusted.', 'emmeans flexible.', 'pwmean mcompare.']
})}`)

blocks.push(`// --- m8-anova-levene ---\n${q8({
  key: 'm8-anova-levene',
  topic: 'anova-assumptions',
  order: 51,
  chapter: c13,
  label: 'Levene (ANOVA)',
  desc: 'Homogeneity of variance for ANOVA.',
  inst: [
    '`car::leveneTest(y ~ g)`.',
    'One-Way ANOVA > Options > Homogeneity tests.',
    'Manual or R.',
    '`robvar y, by(g)` or `oneway y g, tabulate`.'
  ],
  hint: ['If violated consider Welch ANOVA.', 'Brown–Forsythe variant.', 'Report F and p.', 'robvar.']
})}`)

blocks.push(`// --- m8-anova-qq-residuals ---\n${q8({
  key: 'm8-anova-qq-residuals',
  topic: 'anova-assumptions',
  order: 52,
  chapter: c13,
  label: 'Residual Q–Q (ANOVA)',
  desc: 'Check residual normality.',
  inst: [
    '`plot(aov, which=2)` or `qqPlot(resid(lm(y~g)))`.',
    'GLM > Plots > Q-Q.',
    'Residuals from regression tool.',
    '`predict` residuals; `qnorm res`.'
  ],
  hint: ['Residuals not raw Y.', 'Moderate violation OK if balanced n.', 'Shapiro on residuals optional.', 'rvfplot.']
})}`)

blocks.push(`// --- m8-anova-welch ---\n${q8({
  key: 'm8-anova-welch',
  topic: 'anova-alternatives',
  order: 53,
  chapter: c13,
  label: "Welch's ANOVA",
  desc: 'Unequal variances one-way.',
  inst: [
    '`oneway.test(y ~ g, var.equal = FALSE)`.',
    'One-Way ANOVA Welch option if available.',
    'Note limitation; use R.',
    '`oneway y g, welch`.'
  ],
  hint: ['Games-Howell post-hoc pairs.', 'df adjusted.', 'SPSS version-dependent.', 'Stata oneway welch.']
})}`)

blocks.push(`// --- m8-anova-kruskal ---\n${q8({
  key: 'm8-anova-kruskal',
  topic: 'anova-alternatives',
  order: 54,
  chapter: c13,
  label: 'Kruskal–Wallis',
  desc: 'Nonparametric k-sample test.',
  inst: [
    '`kruskal.test(y ~ g)`.',
    'Nonparametric > K Independent Samples.',
    'Rank-based workaround or R.',
    '`kwallis y, by(g)`.'
  ],
  hint: ['Median interpretation.', 'Post-hoc Dunn with adjust.', 'Ties.', 'kwallis.']
})}`)

blocks.push(`// --- m8-anova-repeated-measures ---\n${q8({
  key: 'm8-anova-repeated-measures',
  topic: 'repeated-measures-anova',
  order: 55,
  chapter: c13,
  label: 'Repeated measures ANOVA',
  desc: 'Within-subject factor with 3+ levels.',
  inst: [
    '`aov(y ~ time + Error(id/time))` or `ezANOVA`; better: `afex::aov_ez`.',
    'GLM Repeated Measures.',
    'Excel not recommended—use long format in R.',
    '`anova y id time` wide or `anova` with repeated; `manova` patterns.'
  ],
  hint: ['Sphericity matters.', 'Long vs wide data.', 'GAMLj analog.', 'Stata anova repeated.']
})}`)

blocks.push(`// --- m8-anova-mauchly ---\n${q8({
  key: 'm8-anova-mauchly',
  topic: 'repeated-measures-anova',
  order: 56,
  chapter: c13,
  label: 'Mauchly sphericity',
  desc: 'Test sphericity; apply GG/HF corrections.',
  inst: [
    '`summary` of repeated aov shows Mauchly; use GG correction packages.',
    'GLM Repeated > Estimates > Sphericity tests and corrections.',
    'Document from software output.',
    '`manova` / `anova` repeated options for epsilon.'
  ],
  hint: ['ε < .75 use GG.', 'Report corrected p.', 'SPSS epsilons table.', 'Stata repeated help.']
})}`)

blocks.push(`// --- m8-anova-friedman ---\n${q8({
  key: 'm8-anova-friedman',
  topic: 'repeated-measures-anova',
  order: 57,
  chapter: c13,
  label: 'Friedman test',
  desc: 'Nonparametric repeated measures.',
  inst: [
    '`friedman.test(cbind(t1,t2,t3))`.',
    'Nonparametric related samples.',
    'R recommended.',
    '`friedman v1 v2 v3`.'
  ],
  hint: ['Ranks across times.', 'Post-hoc pairwise sign tests adjusted.', 'SPSS path.', 'friedman.']
})}`)

blocks.push(`// --- m8-anova-full-writeup ---\n${q8({
  key: 'm8-anova-full-writeup',
  topic: 'one-way-anova',
  order: 58,
  chapter: c13,
  label: 'Full ANOVA write-up',
  desc: 'Assumptions, F, η², post-hoc, APA.',
  inst: [
    'R: aov + car tests + Tukey + effectsize + narrative.',
    'SPSS full GLM output + APA.',
    'Describe limits; lean on R/Stata screenshots.',
    'Stata oneway + tests + pwmean + APA.'
  ],
  hint: ['Levene + QQ.', 'Holm/Tukey.', 'Practical effect.', 'Match jamovi checklist.']
})}`)

blocks.push(`// --- m8-independent-t-report ---\n${q8({
  key: 'm8-independent-t-report',
  topic: 't-tests-practice',
  order: 53,
  chapter: c11,
  label: 'Independent t APA sentence',
  desc: 'Group means, difference, p, effect size.',
  inst: [
    '`t.test` output → one APA sentence + d.',
    'SPSS Independent T tables → APA.',
    'Assemble means and p manually.',
    '`ttest` output → APA sentence.'
  ],
  hint: ['Equal vs unequal line.', 'Cohen d.', 'df from output.', 'Two-tailed default.']
})}`)

const header = `/**
 * Software practice parallels for Modules 5–8 (same learning goals as jamovi todos).
 * Generated by scripts/generate-modules5to8-parallels.mjs — re-run to regenerate; extend script for more blocks.
 */
export const modules5to8SoftwarePracticeParallels = [
`

const footer = `
]
`

fs.writeFileSync(out, header + blocks.join(',\n') + footer, 'utf8')
console.log('Wrote', out, 'blocks:', blocks.length)
