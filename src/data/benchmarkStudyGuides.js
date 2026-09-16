/**
 * Benchmark study guide copy — aligned to PSYC 4213 Canvas benchmarks (3177 / 2405)
 * and Methods Market modules. Used to build public/study-guides/*.pdf
 */

export const BENCHMARK_STUDY_GUIDES = {
  'benchmark-1': {
    title: 'Benchmark 1 Study Guide',
    subtitle: 'PSYC 4213 Statistics · Modules 1–3 (Chapters 1–3)',
    examNote:
      'Graded Benchmark 1 is proctored in Canvas (Respondus LockDown Browser + Webcam). No notes, textbook, or other aids on the real exam. Use this guide and Methods Market Concept Review to prepare.',
    sections: [
      {
        heading: 'What this benchmark covers',
        bullets: [
          'Module 1 — Why we learn statistics (Chapter 1)',
          'Module 2 — Research design & measurement (Chapter 2)',
          'Module 3 — Statistical software basics & data handling (Chapter 3)',
          'Not on Benchmark 1: descriptive statistics, graphs, probability, or hypothesis tests (those come later).'
        ]
      },
      {
        heading: 'Module 1 — Why statistics?',
        bullets: [
          'Why psychologists and researchers use statistics; everyday vs scientific claims.',
          'Population vs sample; descriptive vs inferential statistics (intro level).',
          'Growth mindset about statistics anxiety; statistics as a learnable skill.'
        ]
      },
      {
        heading: 'Module 2 — Research design & measurement',
        bullets: [
          'Independent vs dependent variables; operational definitions.',
          'Four scales of measurement (NOIR): nominal, ordinal, interval, ratio — know examples and which summaries are allowed.',
          'Experimental vs correlational designs; what causal language each supports.',
          'Validity (internal, external, construct, statistical conclusion) and reliability (test–retest, internal consistency).',
          'Threats to validity and ways to improve measurement quality.'
        ]
      },
      {
        heading: 'Module 3 — Software & data handling',
        bullets: [
          'Navigate your software (Jamovi / SPSS / R / Excel / Stata per your preference).',
          'Enter data, set variable types and measurement levels correctly.',
          'Import CSV/data files; save project files (.omv, .sav, etc.).',
          'Variable view vs data view; value labels vs numeric codes.',
          'Basic workflow: open data → check types → run simple descriptives later in the course.'
        ]
      },
      {
        heading: 'How to study',
        bullets: [
          'Complete Concept Review for Modules 1–3 in Methods Market until objectives are mastered.',
          'Take the Benchmark 1 practice test (unlimited retakes) for strengths/weaknesses feedback.',
          'Re-read textbook Ch. 1–3 and Methods Market Topics for modules you miss on practice.',
          'Offline primary: download this PDF, print the practice packet, enter answers when back online.'
        ]
      }
    ]
  },
  'benchmark-2': {
    title: 'Benchmark 2 Study Guide',
    subtitle: 'PSYC 4213 Statistics · Modules 4–5 (Chapters 4–6)',
    examNote:
      'Graded Benchmark 2 is proctored in Canvas (Respondus LockDown Browser + Webcam). No aids on the real exam. This guide matches the LMS Benchmark 2 study topics.',
    sections: [
      {
        heading: 'What this benchmark covers',
        bullets: [
          'Module 4 — Descriptive statistics (Chapter 4)',
          'Module 5 — Graphing & visualization (Chapters 5–6 pragmatic matters)',
          'Central tendency, variability, distribution shape, standard scores, and choosing graphs.',
          'Jamovi (or your software) applications for descriptives and basic graphs.'
        ]
      },
      {
        heading: 'Module 4 — Descriptive statistics',
        bullets: [
          'Mean, median, mode — when each is appropriate; effect of outliers and skew.',
          'Range, IQR, variance, standard deviation; sum of squared deviations (SS).',
          'Z-scores: formula Z = (X − mean) / SD; converting z to raw scores (X = mean + z × SD).',
          'Skewness and kurtosis; normal vs non-normal distributions (intro).',
          'Grouped descriptives; comparing summaries across groups.',
          'Levels of measurement: which descriptives/graphs are valid for nominal vs ordinal vs continuous data.'
        ]
      },
      {
        heading: 'Module 5 — Graphing & visualization',
        bullets: [
          'Histograms for continuous distributions; reading shape, center, spread.',
          'Box plots: median, IQR, outliers, comparing groups.',
          'Bar charts / pie charts for categorical counts (not for continuous means without context).',
          'Scatterplots for two continuous variables; direction and strength of association (visual).',
          'Frequency tables and contingency tables.',
          'Filtering data, logical expressions, transforming variables (compute, recode, log, etc.).',
          'Choose the right graph: categorical vs continuous; one vs two variables.'
        ]
      },
      {
        heading: 'Common exam pitfalls',
        bullets: [
          'Using a bar chart of means when a histogram of the raw distribution is needed (or vice versa).',
          'Reporting the mean for ordinal or highly skewed data without justification.',
          'Confusing SD with range; forgetting units when interpreting z-scores.',
          'Mislabeling axes or measurement level when importing data into software.'
        ]
      },
      {
        heading: 'How to study',
        bullets: [
          'Review Methods Market Topics: central tendency, variability, skew/kurtosis, standard scores, histograms, boxplots, bar charts, scatterplots.',
          'Complete Module 4–5 Concept Review and Software Practice.',
          'Practice Benchmark 2 formative test in Methods Market (30 questions per attempt).',
          'Work Module 4 Descriptive Statistics assignment-style problems (Compute formulas in Jamovi).'
        ]
      }
    ]
  },
  'final-benchmark': {
    title: 'Final Benchmark Study Guide',
    subtitle: 'PSYC 4213 Statistics · Modules 6–8 (Chapters 7–13)',
    examNote:
      'Final Benchmark / Benchmark 3 covers Modules 6–8 only — NOT a comprehensive final over the whole semester. It is proctored in Canvas. The separate Final Benchmark written assignment (open book) uses Final Benchmark Data.csv; this guide focuses on the proctored multiple-choice style benchmark on Modules 6–8.',
    sections: [
      {
        heading: 'Scope reminder',
        bullets: [
          'In scope: probability & sampling (Module 6), hypothesis testing (Module 7), comparing groups & relationships (Module 8).',
          'Out of scope: Modules 1–5 content is not retested comprehensively (only where it supports M6–8 items).',
          'Textbook: LSJ Chapters 7–13 (probability through one-way ANOVA intro).'
        ]
      },
      {
        heading: 'Module 6 — Probability & sampling',
        bullets: [
          'Basic probability rules; frequentist vs Bayesian (intro).',
          'Binomial and normal distributions; z-scores in probability context.',
          'Sampling methods; sampling error; law of large numbers; central limit theorem (conceptual).',
          'Point estimates; confidence intervals — interpret “we are 95% confident…” correctly.'
        ]
      },
      {
        heading: 'Module 7 — Hypothesis testing',
        bullets: [
          'Null (H₀) and alternative (H₁) hypotheses; one- vs two-tailed tests.',
          'Type I and Type II errors; alpha and power (intro).',
          'p-values: what they are and are not (not probability H₀ is true).',
          'Effect sizes (Cohen’s d, eta² / omega² intro) alongside p-values.',
          'Decision rule: reject H₀ when p < α; state conclusions in context.'
        ]
      },
      {
        heading: 'Module 8 — Choosing an analysis (overview)',
        bullets: [
          'Two groups, one continuous outcome → independent or paired t-test (Welch when variances differ).',
          'Three or more groups, one outcome → one-way ANOVA (F test); post-hoc comparisons.',
          'Two categorical variables → chi-square test of independence; expected counts & assumptions.',
          'Two continuous variables → correlation / simple regression (predict Y from X).',
          'Check assumptions at a “recognize the issue” level: normality, independence, homogeneity of variance.',
          'Match research question → test: know when ANOVA vs t vs χ² vs regression is appropriate.'
        ]
      },
      {
        heading: 'How to study',
        bullets: [
          'Complete Concept Review and Software Practice for Modules 6–8.',
          'Take Final Benchmark practice test in Methods Market (36 questions per attempt).',
          'Review Module 7 hypothesis scenarios assignment patterns (H₀/H₁, test choice, error types).',
          'For the written Final Benchmark assignment: use Final Benchmark Data.csv (Study_Mode × Score) and follow the “What to write” checklist in Assignment Help.'
        ]
      }
    ]
  }
}

export function getBenchmarkStudyGuideContent (slug) {
  return BENCHMARK_STUDY_GUIDES[slug] ?? null
}
