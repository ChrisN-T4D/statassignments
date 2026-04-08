// Module 7 — Hypothesis testing intro (SPSS, R, Excel, Stata). P-values lesson is software-agnostic; binomial & one-sample t are adapted.

const P_VALUE_PHASES = {
  iDo: {
    type: 'demonstration',
    title: 'What p-values mean',
    content: [
      {
        type: 'text',
        content:
          '<p><strong>Correct:</strong> p = probability of data this extreme (or more) <em>if H₀ is true</em>.</p><p><strong>Wrong:</strong> p is NOT P(H₀ true), NOT “probability due to chance,” NOT effect size.</p>'
      },
      {
        type: 'text',
        content:
          '<p>Decision: if p ≤ α (often .05), reject H₀; if p > α, fail to reject H₀. “Not significant” ≠ “no effect.”</p>'
      },
      {
        type: 'table',
        headers: ['p', 'α=.05', 'Decision'],
        rows: [
          ['0.001', 'Significant', 'Reject H₀'],
          ['0.04', 'Significant', 'Reject H₀'],
          ['0.06', 'Not significant', 'Fail to reject H₀']
        ]
      },
      {
        type: 'text',
        content:
          '<p>95% CI excludes null value ⇒ two-sided p < .05; includes null ⇒ p > .05 (for that test).</p>'
      }
    ]
  },
  weDo: {
    type: 'guided_practice',
    title: 'Practice interpreting p',
    scenario: 'Same ideas in every package.',
    steps: [
      {
        instruction: 'p = 0.032: if H₀ were true, how often would we see data this extreme?',
        hint: 'About 3.2% of the time.',
        checkpoint: 'Small p → surprising under H₀.'
      },
      {
        instruction: 'p = 0.089 at α = 0.05: decision?',
        hint: 'Compare to .05',
        checkpoint: 'Fail to reject H₀.'
      },
      {
        instruction: 'p = 0.048 vs p = 0.052: materially different?',
        hint: 'Bright-line .05',
        checkpoint: 'Essentially similar evidence; report p and effect size.'
      }
    ],
    assessment: {
      type: 'multiple_choice',
      question: 'p = 0.06 at α = 0.05. Which is correct?',
      options: [
        'H₀ is true',
        '6% chance results are “due to chance”',
        'Fail to reject H₀ at α = 0.05',
        'Effect is small'
      ],
      correctAnswer: 2,
      feedback: {
        correct: 'Correct.',
        incorrect: 'p > α ⇒ fail to reject H₀; that is not proof H₀ is true.'
      }
    }
  },
  youDo: {
    type: 'independent_practice',
    title: 'P-value quiz',
    scenario: 'Check understanding.',
    assessment: [
      {
        type: 'multiple_choice',
        question: 'Best interpretation of p = 0.037?',
        options: [
          '3.7% chance treatment does nothing',
          'If H₀ holds, ~3.7% chance of this extreme data',
          'Treatment improves by 3.7%',
          '96.3% chance treatment works'
        ],
        correctAnswer: 1,
        feedback: { correct: 'Good.', incorrect: 'Frequentist p is not P(H₀).' }
      },
      {
        type: 'multiple_choice',
        question: 'p = 0.16, means differ descriptively. Conclusion?',
        options: [
          'Groups are identical',
          'No difference exists',
          'Insufficient evidence of a difference',
          'Study is invalid'
        ],
        correctAnswer: 2,
        feedback: { correct: 'Good.', incorrect: 'Non-significant ≠ no effect.' }
      }
    ]
  }
}

export const module7LessonsOther = [
  {
    id: 'spss-interpreting-pvalues',
    module: 'stats-module-7',
    title: 'Interpreting P-Values and Making Decisions',
    software: 'spss',
    objectives: [
      'Interpret p in context',
      'Compare p to α',
      'Avoid common misinterpretations'
    ],
    estimatedTime: 20,
    phases: { ...P_VALUE_PHASES }
  },
  {
    id: 'r-interpreting-pvalues',
    module: 'stats-module-7',
    title: 'Interpreting P-Values and Making Decisions',
    software: 'r',
    objectives: [
      'Interpret p in context',
      'Compare p to α',
      'Avoid common misinterpretations'
    ],
    estimatedTime: 20,
    phases: { ...P_VALUE_PHASES }
  },
  {
    id: 'excel-interpreting-pvalues',
    module: 'stats-module-7',
    title: 'Interpreting P-Values and Making Decisions',
    software: 'excel',
    objectives: [
      'Interpret p in context',
      'Compare p to α',
      'Avoid common misinterpretations'
    ],
    estimatedTime: 20,
    phases: { ...P_VALUE_PHASES }
  },
  {
    id: 'stata-interpreting-pvalues',
    module: 'stats-module-7',
    title: 'Interpreting P-Values and Making Decisions',
    software: 'stata',
    objectives: [
      'Interpret p in context',
      'Compare p to α',
      'Avoid common misinterpretations'
    ],
    estimatedTime: 20,
    phases: { ...P_VALUE_PHASES }
  },

  // --- Binomial ---
  {
    id: 'spss-binomial-test',
    module: 'stats-module-7',
    title: 'Running a Binomial Test in SPSS',
    software: 'spss',
    objectives: ['Binomial test for proportion', 'Interpret p', 'Set test proportion'],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Binomial test',
        content: [
          {
            type: 'text',
            content:
              'Tests whether the proportion of one outcome differs from a hypothesized value (e.g. 0.5 for guessing). **Analyze → Nonparametric Tests → Legacy Dialogs → Binomial** (or One Sample Nonparametric depending on version). Move binary variable; set Test Proportion.'
          },
          {
            type: 'code',
            language: 'text',
            code: 'Example output: Test proportion = 0.5, Observed prop = 0.62, p = 0.021 → reject H₀ at α=.05.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Coin flip example',
        scenario: '52 heads of 80 flips.',
        data: { description: '0/1 outcome variable', file: '' },
        steps: [
          { instruction: 'Legacy Dialogs → Binomial.', hint: 'Nonparametric', checkpoint: 'Dialog open' },
          { instruction: 'Outcome variable in Test Variable List.', hint: '', checkpoint: 'Variable set' },
          { instruction: 'Test proportion = 0.5, two-sided.', hint: '', checkpoint: 'Run' },
          { instruction: 'Read p and proportion.', hint: '', checkpoint: 'Interpret' }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'p = 0.264 for 52/80 heads vs 0.5. Conclusion?',
          options: ['Biased coin proved', 'Fair coin proved', 'Do not reject H₀', 'Invalid test'],
          correctAnswer: 2,
          feedback: { correct: 'Yes — p > .05.', incorrect: 'Fail to reject when p > α.' }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Treatment proportion',
        scenario: '58/120 vs 0.40 baseline.',
        task: 'Run binomial with test value 0.40.',
        data: { description: 'Binary improved', file: '', variables: [] },
        assessment: [
          {
            type: 'multiple_choice',
            question: 'Test value for “different from old 40%”?',
            options: ['0.50', '0.40', '0.58', '0.48'],
            correctAnswer: 1,
            feedback: { correct: 'H₀: π = 0.40', incorrect: 'Match the reference proportion.' }
          },
          {
            type: 'multiple_choice',
            question: 'p = 0.091 at α = 0.05?',
            options: ['Reject H₀', 'Fail to reject H₀', 'Invalid', 'Need χ²'],
            correctAnswer: 1,
            feedback: { correct: 'p > .05', incorrect: 'Fail to reject when p > α.' }
          }
        ]
      }
    }
  },
  {
    id: 'r-binomial-test',
    module: 'stats-module-7',
    title: 'Running a Binomial Test in R',
    software: 'r',
    objectives: ['binom.test', 'Interpret p'],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Binomial in R',
        content: [
          {
            type: 'text',
            content: '`binom.test(x, n, p = 0.5)` where x successes of n trials, or pass two-level factor. For 62/100: `binom.test(62, 100, p = 0.5)`.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice',
        scenario: '52 heads, 80 trials.',
        steps: [
          { instruction: '`binom.test(52, 80, p = 0.5)`', hint: 'stats package', checkpoint: 'p-value read' }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'Large p means?',
          options: ['Strong evidence against H₀', 'Weak evidence against H₀', 'H₀ must be true', 'Error'],
          correctAnswer: 1,
          feedback: { correct: 'Large p → data not surprising under H₀.', incorrect: '' }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Your turn',
        scenario: '58/120 vs π = 0.40',
        task: '`binom.test(58, 120, p = 0.4)`',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'Correct p argument?',
            options: ['0.5', '0.40', '58', '120'],
            correctAnswer: 1,
            feedback: { correct: '', incorrect: '' }
          }
        ]
      }
    }
  },
  {
    id: 'excel-binomial-test',
    module: 'stats-module-7',
    title: 'Binomial reasoning in Excel',
    software: 'excel',
    objectives: ['Use BINOM.DIST for exact p', 'Interpret'],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Excel binomial',
        content: [
          {
            type: 'text',
            content:
              '`BINOM.DIST(x, n, p, TRUE)` for cumulative probability. Two-sided p for H₀: π=0.5 requires combining tails; easier to report one-sided or use R/SPSS for two-sided exact test. For class: use **Data Analysis** or add-in, or compute one tail and double (symmetric case).'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Try BINOM.DIST',
        scenario: 'Explore cumulative probs.',
        steps: [
          {
            instruction: '=BINOM.DIST(52,80,0.5,TRUE) for P(X≤52).',
            hint: 'Compare to 0.025 one-sided',
            checkpoint: 'Formula works'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'Excel is weaker for two-sided exact binomial; best practice?',
          options: [
            'Always use SPSS/R/Stata for exact two-sided binomial',
            'Excel cannot do any binomial',
            'Use only t-tests',
            'Ignore p-values'
          ],
          correctAnswer: 0,
          feedback: { correct: 'Prefer dedicated stats software for textbook binomial.', incorrect: '' }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Concept',
        scenario: 'Know when to use binomial vs proportion z-test.',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'Binomial test is for:',
            options: [
              'Comparing means of 3 groups',
              'One proportion vs constant',
              'Two continuous variables',
              'Regression'
            ],
            correctAnswer: 1,
            feedback: { correct: '', incorrect: '' }
          }
        ]
      }
    }
  },
  {
    id: 'stata-binomial-test',
    module: 'stats-module-7',
    title: 'Running a Binomial Test in Stata',
    software: 'stata',
    objectives: ['bitest / binomial', 'Interpret p'],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Stata binomial',
        content: [
          {
            type: 'text',
            content: '`bitesti n x p0` for x successes in n trials vs H₀: π = p0 (e.g. `bitesti 80 52 0.5`). See `help bitesti`.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice',
        scenario: '52 successes of 80.',
        steps: [{ instruction: '`bitesti 80 52 0.5`', hint: 'n, successes, π under H₀', checkpoint: 'p read' }],
        assessment: {
          type: 'multiple_choice',
          question: 'bitesti first argument is:',
          options: ['Number of trials n', 'The p-value', 'The z-score', 'Degrees of freedom'],
          correctAnswer: 0,
          feedback: { correct: '`bitesti n x p0`', incorrect: 'See help bitesti.' }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Your turn',
        scenario: '58 of 120 vs 0.40',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'H₀ proportion?',
            options: ['0.5', '0.40', '0.58'],
            correctAnswer: 1,
            feedback: { correct: '', incorrect: '' }
          }
        ]
      }
    }
  },

  // --- One-sample t ---
  {
    id: 'spss-one-sample-t-test',
    module: 'stats-module-7',
    title: 'One-Sample t-Test in SPSS',
    software: 'spss',
    objectives: ['One-sample t', 'Effect size', 'Assumptions'],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'One-sample t',
        content: [
          {
            type: 'text',
            content:
              '**Analyze → Compare Means → One-Sample T Test** (or **Analyze → Compare Proportions** menu paths vary). Move dependent variable; set Test Value = hypothesized μ. Request effect size if available (version-dependent).'
          },
          {
            type: 'code',
            language: 'text',
            code: 't(df) = ..., p = ..., mean difference vs test value; Cohen d if printed.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Reaction time vs 250 ms',
        scenario: '30 students.',
        data: { description: 'reaction_time ms', file: '' },
        steps: [
          { instruction: 'One-Sample T Test; variable reaction_time.', hint: '', checkpoint: '' },
          { instruction: 'Test Value = 250.', hint: '', checkpoint: '' },
          { instruction: 'Two-tailed; check options for CI and effect size.', hint: '', checkpoint: '' }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'p = 0.069, α = 0.05?',
          options: ['Reject H₀', 'Fail to reject H₀'],
          correctAnswer: 1,
          feedback: { correct: '', incorrect: '' }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Body temp vs 98.6',
        scenario: '40 adults.',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'Test value (°F)?',
            options: ['98.6', '37', '0', '40'],
            correctAnswer: 0,
            feedback: { correct: '', incorrect: '' }
          },
          {
            type: 'fill_blank',
            question: 'df for one-sample t with n=40 is ____',
            answer: ['39'],
            caseSensitive: false,
            feedback: { correct: 'n-1', incorrect: '39' }
          }
        ]
      }
    }
  },
  {
    id: 'r-one-sample-t-test',
    module: 'stats-module-7',
    title: 'One-Sample t-Test in R',
    software: 'r',
    objectives: ['t.test(x, mu=...)', 'Interpret'],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 't.test',
        content: [{ type: 'text', content: '`t.test(x, mu = 100, alternative = "two.sided")`' }]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice',
        scenario: 'Compare to 250.',
        steps: [{ instruction: '`t.test(rt, mu = 250)`', hint: '', checkpoint: 'p-value' }],
        assessment: {
          type: 'multiple_choice',
          question: 'Argument for H₀ mean?',
          options: ['sigma', 'mu', 'df', 'alpha'],
          correctAnswer: 1,
          feedback: { correct: '', incorrect: '' }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Your turn',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'Shapiro p = 0.16 for normality?',
            options: [
              'Data normal for sure',
              'No evidence of strong non-normality; t often OK',
              'Cannot use t',
              'Use ANOVA'
            ],
            correctAnswer: 1,
            feedback: { correct: '', incorrect: '' }
          }
        ]
      }
    }
  },
  {
    id: 'excel-one-sample-t-test',
    module: 'stats-module-7',
    title: 'One-Sample t in Excel',
    software: 'excel',
    objectives: ['Data Analysis t-Test', 'Interpret'],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Excel',
        content: [
          {
            type: 'text',
            content:
              '**Data → Data Analysis → t-Test: One-Sample for Mean** (Microsoft 365) or use **T.TEST** with array and mu via manual formula; older Excel may lack one-sample — use `=T.INV.2T` with manual t statistic or use SPSS/R for reporting.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'If ToolPak available',
        scenario: 'Run one-sample t on a column.',
        steps: [
          {
            instruction: 'Data Analysis → one-sample t; range and hypothesized mean.',
            hint: 'Enable ToolPak',
            checkpoint: 'Output'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'If your Excel build has no one-sample t?',
          options: [
            'Compute t manually: (mean-mu)/(s/sqrt(n)) and use T.DIST.2T',
            'Give up',
            'Use chi-square',
            'Sort the column'
          ],
          correctAnswer: 0,
          feedback: { correct: 'Manual t + T.DIST.2T is standard fallback.', incorrect: '' }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Concept',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'One-sample t compares:',
            options: [
              'Two groups',
              'Sample mean to a constant',
              'Three groups',
              'Two categorical vars'
            ],
            correctAnswer: 1,
            feedback: { correct: '', incorrect: '' }
          }
        ]
      }
    }
  },
  {
    id: 'stata-one-sample-t-test',
    module: 'stats-module-7',
    title: 'One-Sample t-Test in Stata',
    software: 'stata',
    objectives: ['ttest var == #', 'Interpret'],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Stata',
        content: [{ type: 'text', content: '`ttest iq == 100` or `ttest iq = 100` (syntax per version).' }]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice',
        steps: [{ instruction: '`ttest reaction == 250`', hint: '', checkpoint: 'p' }],
        assessment: {
          type: 'multiple_choice',
          question: 'Stata reports two-sided p by default?',
          options: ['Usually yes', 'Never'],
          correctAnswer: 0,
          feedback: { correct: '', incorrect: '' }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Your turn',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'df = ?',
            options: ['n', 'n-1', 'n+1'],
            correctAnswer: 1,
            feedback: { correct: '', incorrect: '' }
          }
        ]
      }
    }
  }
]
