/**
 * Assignment Help — Spring 2026 Statistics (LMS)
 * Maps each LMS assignment to tips, in-app resources, and where to get help.
 * Used by the Assignment Help page so students have one place to go when stuck.
 */

export const assignmentHelpByModule = [
  {
    moduleNumber: 1,
    moduleTitle: 'Introductions and Why Learn Stats',
    assignments: [
      {
        id: 'm1-intro-videos',
        name: 'Introduction Videos',
        type: 'assignment',
        tips: [
          'Record with whatever you have (phone, webcam). No minimum length or professional quality expected.',
          'Upload to YouTube/Vimeo and paste the link, or use the LMS "insert/embed media" to upload directly.',
          'Cover: who you are, where you\'re from, program, goals, and something you\'re passionate about.'
        ],
        getHelp: 'If you have technical trouble (upload, embed, or privacy), post in the Module 1 Discussion Board or email your instructor.'
      },
      {
        id: 'm1-discussion',
        name: 'Module 1 Discussion Board',
        type: 'discussion',
        tips: [
          'Use two different AI tools (e.g., ChatGPT + Claude) and ask: "What does statistics mean to you?"',
          'Paste both responses and label which model gave which answer.',
          'Critique the responses: what do we learn about statistics and about each AI? Then reply to a classmate.'
        ],
        getHelp: 'Stuck on interpreting AI responses or writing your critique? Reply in the discussion or ask in office hours.'
      }
    ]
  },
  {
    moduleNumber: 2,
    moduleTitle: 'Research Design & Measurement',
    assignments: [
      {
        id: 'm2-levels-quiz',
        name: 'Levels of Measurement (Quiz)',
        type: 'practice',
        tips: [
          'Review nominal, ordinal, interval, and ratio. Know which allow means and which don\'t.',
          'Practice with examples: eye color (nominal), Likert scale (ordinal), temperature in °C (interval), height in cm (ratio).'
        ],
        practiceLinks: ['variables-measurement', 'scales-of-measurement'],
        getHelp: 'Use the Topics tab for this module (Research Design) to review scales of measurement before the quiz.'
      },
      {
        id: 'm2-pss-reliability-validity',
        name: 'Evaluating PSS for Reliability and Validity',
        type: 'assignment',
        tips: [
          'Screen record (screen + camera/mic). Work through each part while speaking your answers; refer to the chapter or AI, then summarize in your own words.',
          'Use the PSS PDF and the PSS article. For each question, find the exact place in the article that supports your answer.',
          'Part 3 (Synthesis): State clearly whether you\'d recommend the PSS and why, using reliability and validity evidence.'
        ],
        practiceLinks: ['validity', 'reliability'],
        getHelp: 'If reliability vs validity is confusing, review the Topics under Research Design and use the Module 2 Discussion (AI prompt on reliability vs validity). Post in the discussion or come to office hours for the PSS questions.'
      },
      {
        id: 'm2-discussion',
        name: 'Module 2 Discussion Board',
        type: 'discussion',
        tips: [
          'Ask two AI models: "What is the difference between reliability and validity and why are those differences important?"',
          'Summarize each model\'s response, note similarities and differences, then reply to someone about how they examine validity and reliability of AI.'
        ],
        getHelp: 'Use this discussion to clarify reliability vs validity before the PSS assignment.'
      }
    ]
  },
  {
    moduleNumber: 3,
    moduleTitle: 'Jamovi and Data Handling',
    assignments: [
      {
        id: 'm3-jamovi-exploration',
        name: 'Jamovi Exploration & Data Familiarization (Week 4)',
        type: 'assignment',
        tips: [
          'Import Personality Data CSV from Files > DATA > Personality Data (or the link in the assignment).',
          'Use Analyses > Exploration > Descriptives. For two variables, report mean, median, SD; for one variable add a histogram or bar chart.',
          'Turn in: short paragraph on what was easy/challenging + screenshot of Jamovi with dataset, descriptives table, and graphs.'
        ],
        practiceLinks: ['software-interface', 'data-entry', 'variable-types'],
        getHelp: 'Use the Software lessons for this module (Jamovi interface, importing data, variable types). If the CSV won\'t import or Descriptives is unclear, check the screen-recording tutorial or ask in office hours.'
      },
      {
        id: 'm3-video-jamovi',
        name: 'Video of Jamovi Work (Week 5)',
        type: 'assignment',
        tips: [
          'Screen record: import same Personality Data CSV, show spreadsheet view, name variables, describe variable types.',
          'Rename at least one variable to your name. Create a computed variable = mean of agreeableness. Save/export as .omv and upload video + .omv file.'
        ],
        formulas: [
          { name: 'Mean of a variable (Jamovi Compute)', formula: 'VMEAN(agreeableness)', note: 'Data > Compute; use VMEAN for one column (mean of all values in that column). MEAN(A, B, C) is for the mean of several variables per row.' }
        ],
        practiceLinks: ['software-interface', 'variable-types'],
        getHelp: 'Computed variable: use Data > Compute and the formula for mean (e.g. mean of the agreeableness column). Software lessons in Module 3 cover this.'
      }
    ],
    noDiscussion: true
  },
  {
    moduleNumber: null,
    moduleTitle: 'Benchmark 1',
    assignments: [
      {
        id: 'benchmark-1',
        name: 'Benchmark 1 (Test/Quiz)',
        type: 'benchmark',
        tips: [
          'Covers Chapters 1–3 (intro, research design, software/data).',
          'Review levels of measurement, reliability, validity, and basic Jamovi/data concepts.'
        ],
        getHelp: 'Review Module 1–3 topics and practice. If you\'re unsure on specific concepts, use the Topics and Software tabs for those modules before the benchmark.'
      }
    ]
  },
  {
    moduleNumber: 4,
    moduleTitle: 'Descriptive Statistics',
    assignments: [
      {
        id: 'm4-descriptives',
        name: 'Descriptive Statistics (Week 6)',
        type: 'assignment',
        tips: [
          'Enter the height data in one column in Jamovi (e.g. column name "Height"). Use Descriptives for N, mean, median, mode, range, variance, SD.',
          'Use Data > Compute for each formula below; replace "Height" with your column name. For one column use VMEAN/VSTDEV/VSUM; MEAN(A,B,C) is mean of several variables per row. SS = sum of squared deviations — use VSUM on that column or add manually.',
          'Interpret SD in your own words in a note. For z = 2.5, calculate raw score with X = mean + 2.5×SD (show your work). Export .omv and submit.'
        ],
        formulas: [
          { name: 'Deviation score (each value minus mean)', formula: 'Height - VMEAN(Height)', note: 'VMEAN = mean of that single column. Use your column name instead of Height.' },
          { name: 'Squared deviation score', formula: '(Height - VMEAN(Height))^2', note: 'Use ^2 in Jamovi. Same column name as above.' },
          { name: 'Z-score', formula: 'Z = (X - mean) / SD', note: 'In Jamovi Compute: (Height - VMEAN(Height)) / VSTDEV(Height). VMEAN/VSTDEV = one column; MEAN(A,B) = mean of several variables per row.' },
          { name: 'Sum of squared deviations (SS)', formula: 'SS = Σ(X - mean)²', note: 'Sum all squared deviation scores. In Jamovi use VSUM on the squared-deviation column (one column).' },
          { name: 'Raw score from z (e.g. z = 2.5)', formula: 'X = mean + z × SD', note: 'Example: X = mean + 2.5 × SD. Get mean and SD from Descriptives (or VMEAN/VSTDEV); show your work.' }
        ],
        practiceLinks: ['central-tendency', 'variability', 'standard-scores'],
        getHelp: 'Topics for this module (central tendency, variability, standard scores) align with this assignment. Stuck on z-scores or SS? Review those topics or ask in office hours.'
      },
      {
        id: 'm4-normality-quiz',
        name: 'Week 7 Practice (Normality Quiz)',
        type: 'practice',
        tips: [
          'Import Normality-data.csv and follow the instructions at the top of the assignment, then answer the quiz questions.'
        ],
        practiceLinks: ['skew-kurtosis'],
        getHelp: 'Review skewness/kurtosis and normality in the Module 4 topics before the quiz.'
      },
      {
        id: 'm4-discussion',
        name: 'Module 4 Discussion Board',
        type: 'discussion',
        tips: [
          'Share how you see descriptive stats (mean, median, SD, z-scores) in everyday life: written scenario, short audio/video, or small dataset + graph. Then comment on someone else\'s post.'
        ],
        getHelp: 'Need ideas for "in the wild" examples? Check the discussion for others\' posts or the textbook examples.'
      }
    ]
  },
  {
    moduleNumber: 5,
    moduleTitle: 'Graphing and Visualization',
    assignments: [
      {
        id: 'm5-week8-9',
        name: 'Week 8 & 9 Assignment (Screen Record)',
        type: 'assignment',
        tips: [
          'Use Normality-data.csv. Part 1: Descriptives for Num_Media_Posts (mean, median, SD, min, max) + histogram.',
          'Part 2: Recode Num_Media_Posts into Posts_Bands_Text using Transform > Add recode condition rows (see formulas). Order levels: 0, 1-5, 6-15, 16+. Verify with frequency tables.',
          'Part 3: Histogram for Test_Scores; bar chart for Posts_Bands. State which band is most common and write caption sentences. Part 4: Brief summary. Submit as one 6–10 min MP4.'
        ],
        formulas: [
          { name: 'Recode: Posts_Bands_Text from Num_Media_Posts', formula: 'if $source == 0 use "0"', note: 'Row 1. In Transform recode, $source is the source variable (Num_Media_Posts).' },
          { name: '', formula: 'if $source >= 1 and $source <= 5 use "1-5"', note: 'Row 2.' },
          { name: '', formula: 'if $source >= 6 and $source <= 15 use "6-15"', note: 'Row 3.' },
          { name: '', formula: 'else use "16+"', note: 'Row 4. Set Output type = Text, Measure = Ordinal; order levels 0, 1-5, 6-15, 16+.' }
        ],
        practiceLinks: ['histograms', 'bar-charts', 'transforming-variables', 'tabulating-data'],
        getHelp: 'Software lessons for transforming variables and building histograms/bar charts match this assignment. If recode conditions are tricky, review the lesson on logical expressions and recodes.'
      }
    ],
    noDiscussion: true
  },
  {
    moduleNumber: null,
    moduleTitle: 'Benchmark 2',
    assignments: [
      {
        id: 'benchmark-2',
        name: 'Benchmark 2 (Test/Quiz)',
        type: 'benchmark',
        tips: [
          'Covers Chapters 4–6: descriptives, graphing, visualization, levels of measurement, Jamovi tables/graphs.',
          'Use the Benchmark 2 Study Guide in the LMS: central tendency, frequency distributions, distribution shapes, variability, boxplots, levels of measurement, Jamovi applications.'
        ],
        getHelp: 'Review Modules 4–5 topics and the study guide. Practice choosing the right graph for categorical vs continuous data.'
      }
    ]
  },
  {
    moduleNumber: 6,
    moduleTitle: 'Probability and Sampling',
    assignments: [
      {
        id: 'm6-week11a',
        name: 'Week 11 Part A: Dice (Probability & Sampling)',
        type: 'assignment',
        tips: [
          'Install Demonstrations module in Jamovi (+ > Library > Demonstrations > Install). Use Throwing Dice.',
          'A1: Fix Dices=3, Sides=6; change Trials (10 vs 2000). A2: Fix Trials=2000, Sides=6; change Dices (1 vs 6). A3: Fix Trials=2000, Dices=3; change Sides (2 vs 10). Answer the written questions for each. One 4–6 min MP4.'
        ],
        practiceLinks: ['probability-concepts', 'law-of-large-numbers'],
        getHelp: 'This illustrates sample size and scale effects. Review probability/sampling topics if the questions are unclear.'
      },
      {
        id: 'm6-week11b',
        name: 'Week 11 Part B: Normal Distribution',
        type: 'assignment',
        tips: [
          'Use Normality-data.csv. B1: Pick one normal-like, one right-skewed, one left-skewed variable. Use Descriptives (histogram, density, Q-Q), get skewness and kurtosis with SEs; compute z-skew and z-kurt (see formulas). If |z| < 1.96, note "not statistically different from 0".',
          'B2: Use Test_Scores with distrACTION > Normal Distribution. Find P(X≥95), P(mean−SD to mean+SD), P(X≤75). Create indicator columns (e.g. Test_Scores >= 95) and use Descriptives to get means as empirical proportions. One 5–7 min MP4.'
        ],
        formulas: [
          { name: 'Z-score for skewness (test if skew ≠ 0)', formula: 'z-skew = skew / SE(skew)', note: 'Get skewness and SE(skew) from Jamovi Descriptives. Compare |z-skew| to 1.96.' },
          { name: 'Z-score for kurtosis (test if kurt ≠ 0)', formula: 'z-kurt = kurt / SE(kurt)', note: 'Get kurtosis and SE(kurt) from Jamovi Descriptives. Compare |z-kurt| to 1.96.' },
          { name: 'Interpretation', formula: 'If |z| < 1.96 → not statistically different from 0', note: 'Say this in your recording for each variable.' }
        ],
        practiceLinks: ['normal-distribution', 'parameter-estimation'],
        getHelp: 'Install distrACTION module if needed. Topics on normal distribution and parameter estimation align with this.'
      },
      {
        id: 'm6-week12',
        name: 'Week 12: Estimating Population Mean from Sample Means',
        type: 'assignment',
        tips: [
          'Part A: New dataset, 30 rows. Add 10 columns X1–X10; each cell uses NORM(100, 15) so each column has 30 values from a normal distribution (mean=100, SD=15).',
          'Part B: Descriptives for X1–X10; create a Means10 variable with the 10 sample means and plot. Part C: For X1, write down sample mean, SD, n=30; compute SE and 95% CI by hand (see formulas). Part D: Use CLT Demonstrations add-on; run n=5, 30, 100. One screen recording.'
        ],
        formulas: [
          { name: 'Simulated normal data (Jamovi Compute, per cell)', formula: 'NORM(100, 15)', note: 'One value per row. Create 10 columns (X1–X10), 30 rows each. Mean=100, SD=15.' },
          { name: 'Standard error of the mean', formula: 'SE = s / √n   or   SE = SD / sqrt(n)', note: 'Use sample SD (s) and n=30 from X1 Descriptives. In a calculator: SD / sqrt(30).' },
          { name: '95% confidence interval for the mean', formula: '95% CI = mean ± 1.96 × SE', note: 'Lower = mean - 1.96*SE; Upper = mean + 1.96*SE. Use X1 mean and the SE you computed.' }
        ],
        practiceLinks: ['central-limit-theorem', 'confidence-intervals'],
        getHelp: 'Central limit theorem and confidence interval topics match this assignment. Stuck on SE or CI formula? Review those topics.'
      }
    ],
    noDiscussion: true
  },
  {
    moduleNumber: 7,
    moduleTitle: 'Hypothesis Testing',
    assignments: [
      {
        id: 'm7-hypothesis-scenarios',
        name: 'Writing Hypotheses, Choosing t-test vs ANOVA',
        type: 'assignment',
        tips: [
          'For each scenario: (1) population and parameter, (2) H0 and H1 with symbols and direction, (3) one- vs two-sided and why, (4) Type I and Type II in context, (5) t-test vs ANOVA (two groups = t-test, three+ = ANOVA), (6) use AI to generate hypotheses and compare to yours.',
          'Scenarios: city vs national sugar intake; proportion walking vs last year; three teaching methods (ANOVA).'
        ],
        practiceLinks: ['hypothesis-testing', 'p-values', 'effect-size'],
        getHelp: 'Use Module 7 Topics for hypothesis testing and error types. The Module 7 Discussion uses similar AI prompts; check others\' posts for comparison.'
      },
      {
        id: 'm7-discussion',
        name: 'Module 7 Discussion Board',
        type: 'discussion',
        tips: [
          'Ask an AI: importance of testing null hypothesis, what\'s wrong with only p-values, mistakes if we ignore the null. Share and evaluate the response; reply to one classmate.'
        ],
        getHelp: 'Good place to clarify null hypothesis and p-values before the hypothesis assignment or exam.'
      }
    ]
  },
  {
    moduleNumber: 8,
    moduleTitle: 'Comparing Groups / Relationships (ANOVA, t-tests, regression)',
    assignments: [
      {
        id: 'm8-week15',
        name: 'Week 15 Assignment (Chi-square, t-tests, regression, ANOVA)',
        type: 'assignment',
        tips: [
          'Part 1: Create Posts_Bands and Age_Bands with recodes (see formulas); run Contingency Tables (Chi-square, Cramer\'s V). Report decision, effect size using anchors below, pattern in row/column %.',
          'Part 2: One-sample t-test (Test_Scores vs 85). Part 3: Create LowPosts (0–5) and HighPosts (6+); independent-samples t-test on Test_Scores; use Welch if variances unequal. Part 4: Correlation, simple regression, one-way ANOVA (3-level Posts_Bands). Report each with decision, CI, effect size (use anchors below), assumptions. Submit one .mp4 with voiced answers.'
        ],
        formulas: [
          { name: 'Recode: Posts_Bands from Num_Media_Posts', formula: 'if $source == 0 use "0"', note: 'Then: if $source >= 1 and $source <= 5 use "1-5"; if $source >= 6 and $source <= 15 use "6-15"; if $source >= 16 use "16+". Output type = Text, Measure = Ordinal; order 0, 1-5, 6-15, 16+.' },
          { name: 'Recode: Age_Bands from Age_Retirement', formula: '63-65 and else "66-70"', note: 'Two bands. Measure = Ordinal; order as listed.' },
          { name: 'Recode: LowPosts vs HighPosts (for t-test)', formula: 'LowPosts = 0–5; HighPosts = 6+', note: 'Two-level group from Posts_Bands for Part 3.' },
          { name: 'Cramer\'s V (effect size for chi-square)', formula: 'small ~ 0.10, medium ~ 0.30, large ~ 0.50', note: 'Use when interpreting Part 1 contingency table.' },
          { name: 'Cohen\'s d (effect size for t-tests)', formula: 'small ~ 0.20, medium ~ 0.50, large ~ 0.80', note: 'Use for one-sample (Part 2) and independent-samples (Part 3) t-tests.' },
          { name: 'Correlation r (strength)', formula: 'small ~ 0.10, medium ~ 0.30, large ~ 0.50', note: 'Sign indicates direction. Use for Part 4A correlation.' },
          { name: 'Eta² or omega² (effect size for ANOVA)', formula: 'small ~ 0.01, medium ~ 0.06, large ~ 0.14', note: 'Use for Part 4C one-way ANOVA.' }
        ],
        practiceLinks: ['chi-square-independence', 'one-sample-t-test', 'independent-t-test', 'welch-t-test'],
        getHelp: 'Software lessons for Module 8 (chi-square, t-tests, regression, ANOVA) walk through these analyses. Use them step-by-step; if output interpretation is confusing, review effect size and CI in the Topics.'
      },
      {
        id: 'm8-discussion',
        name: 'Module 8 Discussion Board',
        type: 'discussion',
        tips: [
          'Put the research-assistant prompt (Test_Scores, Group_Status, choose t-test vs ANOVA vs regression) into two AI models. Include both responses and your evaluation: correct? Explained why?'
        ],
        getHelp: 'Use this to reinforce when to use t-test vs ANOVA vs regression before the Week 15 assignment.'
      }
    ]
  },
  {
    moduleNumber: null,
    moduleTitle: 'Final Benchmark',
    assignments: [
      {
        id: 'final-benchmark',
        name: 'Final Benchmark Assignment',
        type: 'final',
        tips: [
          'Open note, open book, open resource. Use Final Benchmark Data.csv (Study_Mode: Solo/Pair/Group; Test_Scores 0–100).',
          'Follow "What to write": purpose and constructs, variables and scales, design and sampling, data screening, descriptives, visualizations, assumptions, preregistered hypotheses, run analysis in Jamovi, report results and plain-language conclusion, limitations.'
        ],
        formulas: [
          { name: 'One-way ANOVA (3 groups)', formula: 'H₀: μ₁ = μ₂ = μ₃; H₁: at least one mean differs', note: 'Three groups (Solo, Pair, Group) on Test_Scores → one-way ANOVA.' },
          { name: 'Eta² or omega² (effect size for ANOVA)', formula: 'small ~ 0.01, medium ~ 0.06, large ~ 0.14', note: 'Use when interpreting your ANOVA output.' },
          { name: 'Decision rule', formula: 'If p < .05, reject H₀; conclude study mode is associated with exam performance.', note: 'Report F, df, p, effect size, and group means with 95% CIs.' }
        ],
        practiceLinks: ['one-sample-t-test', 'independent-t-test', 'chi-square-independence'],
        getHelp: 'Three groups on one outcome → one-way ANOVA. Use Module 8 software lessons for ANOVA and assumptions. For writing structure, follow the numbered "What to write" sections exactly. Office hours are a good place to check your analysis choice and write-up.'
      }
    ]
  }
]

/**
 * Get assignment help for a class (e.g. statistics).
 * @param {string} classId - e.g. 'statistics'
 * @returns {Array} assignmentHelpByModule (or filtered by class if we add multiple classes later)
 */
export function getAssignmentHelp (classId) {
  return assignmentHelpByModule
}

/**
 * Get a single assignment by id for the detail page.
 * @param {string} classId - e.g. 'statistics'
 * @param {string} assignmentId - e.g. 'm4-descriptives'
 * @returns {{ assignment: object, block: object } | null}
 */
export function getAssignmentById (classId, assignmentId) {
  const blocks = getAssignmentHelp(classId)
  for (const block of blocks) {
    const assignment = block.assignments.find(a => a.id === assignmentId)
    if (assignment) return { assignment, block }
  }
  return null
}
