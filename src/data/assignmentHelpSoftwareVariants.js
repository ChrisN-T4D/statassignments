/**
 * Optional per-software overrides for assignment help (statistics class).
 * jamovi: null means use the base assignment text in assignmentHelp.js.
 */
export const ASSIGNMENT_HELP_BY_SOFTWARE = {
  'm4-descriptives': {
    jamovi: null,
    spss: {
      tips: [
        'Enter height in one column in SPSS Data View (e.g. variable name Height, Numeric).',
        'Analyze → Descriptive Statistics → Descriptives for N, mean, median, mode, range, variance, SD.',
        'Transform → Compute Variable for each formula; use your variable name instead of Height. For deviation: Height - [mean from Descriptives]. For squared deviation: (Height - mean)^2. Sum squared column via Descriptives with Sum in Options for SS.',
        'Z-score: use Descriptives “Save standardized values as variables” if available, or Compute (Height - mean) / SD using the sample mean and SD from Descriptives.',
        'Interpret SD in your own words. For z = 2.5, raw score X = mean + 2.5×SD. Save .sav and submit per LMS.'
      ],
      formulas: [
        {
          name: 'Deviation score',
          formula: 'Height - [sample mean of Height]',
          note: 'In Compute: use the numeric mean from Descriptives, or Aggregate to add a constant mean column first.'
        },
        {
          name: 'Squared deviation',
          formula: '(Height - [mean])**2',
          note: 'SPSS uses ** or ^ for power in some versions; use ** in Compute.'
        },
        {
          name: 'Z-score',
          formula: 'Z = (X - mean) / SD',
          note: 'Compute: (Height - mean) / SD using sample mean and SD, or use saved z-scores from Descriptives.'
        },
        {
          name: 'Sum of squared deviations (SS)',
          formula: 'SS = Σ(X - mean)²',
          note: 'Sum the squared-deviation column; Descriptives on that column with Sum in Options.'
        },
        {
          name: 'Raw score from z (e.g. z = 2.5)',
          formula: 'X = mean + z × SD',
          note: 'Use mean and SD from Descriptives on Height.'
        }
      ],
      getHelp:
        'Review Topics: central tendency, variability, standard scores. SPSS: Descriptives and Compute are under Analyze and Transform. Office hours for z-scores or SS if stuck.'
    },
    r: {
      tips: [
        'Store height in a vector or column, e.g. data$Height from CSV.',
        '`summary(data$Height)`; `mean(data$Height, na.rm=TRUE)`; `sd(...)`; `var(...)`; min/max.',
        'Deviations: `data <- data %>% dplyr::mutate(dev = Height - mean(Height, na.rm=TRUE))`. Squared: `mutate(sqdev = dev^2)`. SS: `sum(data$sqdev, na.rm=TRUE)`.',
        'Z-scores: `scale(Height)` or manual `(Height - mean(Height))/sd(Height)`.',
        'Interpret SD; for z = 2.5 use X = mean + 2.5*SD. Submit script snippet or output per LMS.'
      ],
      formulas: [
        {
          name: 'Deviation score',
          formula: 'Height - mean(Height, na.rm = TRUE)',
          note: 'dplyr: mutate(dev = Height - mean(Height, na.rm = TRUE))'
        },
        {
          name: 'Squared deviation',
          formula: '(Height - mean(Height, na.rm = TRUE))^2',
          note: 'mutate after deviation or one mutate with nested mean.'
        },
        {
          name: 'Z-score',
          formula: 'as.numeric(scale(Height))',
          note: 'Or (Height - mean(Height))/sd(Height) with na.rm as needed.'
        },
        {
          name: 'SS',
          formula: 'sum((Height - mean(Height))^2, na.rm = TRUE)',
          note: 'Matches sum of squared deviations about the sample mean.'
        },
        {
          name: 'Raw score from z',
          formula: 'mean(Height) + 2.5 * sd(Height)',
          note: 'Replace 2.5 with your z if different.'
        }
      ],
      getHelp:
        'Topics: central tendency, variability, standard scores. R: dplyr mutate and scale() are covered in Software lessons. Ask in office hours for SS vs variance notation.'
    },
    excel: {
      tips: [
        'Put Height in a column (e.g. B2:B50).',
        'Use =AVERAGE(B2:B50), =STDEV.S(B2:B50), =MIN, =MAX, =MEDIAN, =MODE.SNGL (if applicable).',
        'Deviation: =B2-AVERAGE($B$2:$B$50) fill down. Squared: =C2^2. SS: =SUM(D2:D50).',
        'Z: =(B2-AVERAGE($B$2:$B$50))/STDEV.S($B$2:$B$50) fill down.',
        'Interpret SD; X for z=2.5: =AVERAGE(...)+2.5*STDEV.S(...). Submit workbook or screenshots per LMS.'
      ],
      formulas: [
        { name: 'Deviation', formula: '=B2 - AVERAGE($B$2:$B$100)', note: 'Adjust column/row range; lock $ for fill-down.' },
        { name: 'Squared deviation', formula: '=(B2 - AVERAGE($B$2:$B$100))^2', note: 'Or reference deviation cell ^2.' },
        { name: 'Z-score', formula: '=(B2-AVERAGE($B$2:$B$100))/STDEV.S($B$2:$B$100)', note: 'STDEV.S = sample SD.' },
        { name: 'SS', formula: '=SUM(D2:D100)', note: 'D column = squared deviations.' },
        { name: 'Raw from z', formula: '=AVERAGE($B$2:$B$100) + 2.5 * STDEV.S($B$2:$B$100)', note: 'Shows X when z = 2.5.' }
      ],
      getHelp:
        'Topics: central tendency, variability, standard scores. Excel lacks some tests; descriptives use built-in functions or Data Analysis ToolPak. Office hours for formula checks.'
    },
    stata: {
      tips: [
        '`import delimited` or use Data Editor; variable Height.',
        '`summarize Height, detail` for mean, SD, min, max, etc.',
        '`summarize Height` then `gen dev = Height - r(mean)`; `gen sqdev = dev^2`; `tabstat sqdev, statistics(sum)` for SS.',
        'Z: `egen z_h = std(Height)` or manual gen using mean/sd from summarize.',
        'Interpret SD; display mean + 2.5*r(sd) after summarize. Submit .do log and/or dataset per LMS.'
      ],
      formulas: [
        { name: 'Deviation', formula: 'gen dev = Height - r(mean)', note: 'Run summarize Height immediately before; r(mean) is the sample mean.' },
        { name: 'Squared deviation', formula: 'gen sqdev = dev^2', note: 'After dev exists.' },
        { name: 'Z-score', formula: 'egen z_h = std(Height)', note: 'Or gen z = (Height - r(mean))/r(sd) with care after summarize.' },
        { name: 'SS', formula: 'tabstat sqdev, statistics(sum)', note: 'After sqdev = (Height-mean)^2.' },
        { name: 'Raw from z', formula: 'display r(mean) + 2.5*r(sd)', note: 'After summarize Height.' }
      ],
      getHelp:
        'Topics: central tendency, variability, standard scores. Stata: summarize, generate, egen std. Software lessons Module 4 + office hours.'
    }
  },
  'm3-jamovi-exploration': {
    jamovi: null,
    spss: {
      tips: [
        'Import Personality Data CSV: File → Import Data → CSV (or read in Text Wizard).',
        'Analyze → Descriptive Statistics → Descriptives (or Frequencies for categorical). For two variables report mean, median, SD; for one variable add a chart via Graphs (e.g. Histogram, Bar).',
        'Turn in: short paragraph + screenshot of Data View, descriptives output, and chart.'
      ],
      getHelp:
        'Software lessons (Module 3, SPSS track): importing, variable properties, descriptives. If import fails, check delimiter and first row as variable names.'
    },
    r: {
      tips: [
        '`read.csv()` the Personality Data; `str(data)` for types; `summary()` or `skimr` for descriptives.',
        'For two numeric variables: means/SDs; for one variable: `hist()` or `ggplot` bar.',
        'Turn in: paragraph + screenshot of console/plots or Quarto/HTML output.'
      ],
      getHelp: 'Module 3 R lessons + dplyr/summary. Post in discussion if paths or packages fail.'
    },
    excel: {
      tips: [
        'Data → From Text/CSV for Personality Data; set types in Power Query or format cells.',
        'Use AVERAGE, MEDIAN, STDEV.S; insert Histogram or Column chart.',
        'Turn in: paragraph + workbook screenshot with data and chart.'
      ],
      getHelp: 'Module 3 Excel guides (Get Data Ready). Office hours for Pivot vs raw formulas.'
    },
    stata: {
      tips: [
        '`import delimited "PersonalityData.csv", clear`',
        '`describe`; `summarize Extraversion Agreeableness` (adjust names); `histogram Extraversion` or `graph bar`.',
        'Turn in: paragraph + screenshot of Results/Graph.'
      ],
      getHelp: 'Module 3 Stata lessons; Statalist or office hours for import options.'
    }
  },
  'm3-video-jamovi': {
    jamovi: null,
    spss: {
      tips: [
        'Screen record: import Personality CSV, show Variable View/Data View, set variable types/labels.',
        'Rename one variable to your name. Compute mean of agreeableness: Transform → Compute, e.g. MEAN.1(agreeableness) if single column mean is just the value — for column mean use **Aggregate** or note: *mean of the agreeableness column* = constant; assignment may want row mean across items — use **Compute** with (A1+A2+A3)/n or **MEAN.n** functions for multiple columns.',
        'Save .sav; upload video + file.'
      ],
      formulas: [
        {
          name: 'Mean across several item columns (example)',
          formula: '(A1 + A2 + A3) / 3',
          note: 'If agreeableness is one column, “mean of agreeableness” is that column’s mean — use Aggregate or report Descriptives mean; if multiple items, average per row in Compute.'
        }
      ],
      getHelp: 'Clarify with instructor if the assignment expects row-wise mean of several items vs column mean; SPSS Compute and Aggregate differ from jamovi VMEAN.'
    },
    r: {
      tips: [
        'Record: read.csv, rename column (`dplyr::rename`), `mutate` row mean across agreeableness items if multiple columns, or show `mean(data$agreeableness)`.',
        'Save `.RData` or write_csv snapshot; upload with video.'
      ],
      formulas: [
        {
          name: 'Column mean (one variable)',
          formula: 'mean(data$agreeableness, na.rm = TRUE)',
          note: 'For row mean across items: rowMeans across selected columns.'
        }
      ],
      getHelp: 'Module 3 R content; dplyr rename/mutate.'
    },
    excel: {
      tips: [
        'Import CSV; rename column header to your name.',
        'If one Agreeableness column: cell = AVERAGE(that column) as a constant cell; if multiple items: =AVERAGE(D2:F2) filled down.',
        'Save .xlsx; upload with video.'
      ],
      formulas: [{ name: 'Row mean across items', formula: '=AVERAGE(D2:F2)', note: 'Adjust columns.' }],
      getHelp: 'Excel Module 3 guides.'
    },
    stata: {
      tips: [
        'import delimited; `rename`; `egen rowmean = rowmean(a1 a2 a3)` or `summarize agreeableness` for column mean.',
        'save "submission.dta"; upload with video.'
      ],
      formulas: [
        { name: 'Row mean', formula: 'egen rowmean = rowmean(a1 a2 a3)', note: 'Replace with your item variable names.' }
      ],
      getHelp: 'Stata Module 3 lessons.'
    }
  }
}
