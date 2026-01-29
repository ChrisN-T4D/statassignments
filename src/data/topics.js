// Topics data - organized to match course modules
// Each topic belongs to a specific module defined in modules.js

export const topics = [
  // Module 1: Introductions and Why Learn Stats
  {
    id: 'intro-to-stats',
    moduleId: 'module-1',
    title: 'Why Do We Learn Statistics?',
    description: 'What is statistics and why does it matter for psychology?',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/01-Why-do-we-learn-statistics.html',
    keyPoints: [
      'Statistics is needed because human reasoning is limited and biased; we should not rely on intuition alone.',
      'Statistics acts as a safeguard against belief-driven errors when evaluating evidence.',
      'Belief bias: conclusions that seem believable can distort judgments of logical validity.',
      'Classic syllogism studies (Evans, Barston, & Pollard, 1983) show systematic errors when belief conflicts with logic.',
      "Simpson's paradox shows aggregated data can reverse conclusions compared with disaggregated data.",
      'Real-world examples (e.g., admissions data by group) show how confounding can flip apparent effects.',
      'Psychology relies on statistics to make sense of noisy human data.',
      'Reading psychological research requires understanding statistical analyses and interpretation.',
      'Statistical literacy supports everyday decisions and critical reading of media reports.',
      'Statistics appears early in psychology curricula and supports later course performance.'
    ]
  },

  // Module 2: Research Design & Measurement
  {
    id: 'variables-measurement',
    moduleId: 'module-2',
    title: 'Variables and Measurement',
    description: 'Independent vs dependent variables, operationalization.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="vars-measurement-title">
  <h2 id="vars-measurement-title">Variables and Measurement</h2>
  <p>
    In research, data collection is a form of <strong>measurement</strong>: assigning numbers or labels to something about behavior or the mind in a well-defined way.
    The goal is to create variables that can be analyzed. [page:0]
  </p>

  <h3>Independent vs. Dependent Variables</h3>
  <p>
    Studies usually include many variables, but they play different roles in an analysis: some variables help explain other variables. [page:0]
  </p>
  <ul>
    <li>
      <strong>Dependent variable (DV)</strong> (also called the <em>outcome</em>) is the variable to be explained - often written as <code>Y</code>. [page:0]
    </li>
    <li>
      <strong>Independent variable (IV)</strong> (also called the <em>predictor</em>) is the variable used to do the explaining - often written as <code>X</code>, <code>X1</code>, <code>X2</code>, etc. [page:0]
    </li>
  </ul>
  <p>
    The predictor/outcome labels can be easier to remember because the idea is to use <code>X</code> to make predictions about <code>Y</code>. [page:0]
  </p>

  <div class="callout">
    <h4>Quick check</h4>
    <p>
      Ask: "What is being predicted or explained?" That is the <strong>DV/outcome</strong>.
      "What is doing the predicting or explaining?" That is the <strong>IV/predictor</strong>. [page:0]
    </p>
  </div>

  <h3>Operationalization</h3>
  <p>
    <strong>Operationalisation</strong> is the process of taking a meaningful but somewhat vague concept and turning it into a precise measurement. [page:0]
  </p>

  <h4>What operationalization requires</h4>
  <ul>
    <li>
      <strong>Clarify the construct</strong>: Be precise about what you are trying to measure (e.g., does "age" mean time since birth or time since conception?). [page:0]
    </li>
    <li>
      <strong>Choose a method (measure)</strong>: Decide how you will measure it (e.g., self-report, parent/authority report, official records). [page:0]
    </li>
    <li>
      <strong>Define allowable values</strong>: Specify what values the measurement can take (e.g., years vs months vs days; or which response options appear on a survey). [page:0]
    </li>
  </ul>
  <p>
    There is no single "correct" operationalization; the best choice depends on what the measurement is for and the standards in the relevant research community. [page:0]
  </p>

  <h3>Worked Example (DV/IV + operationalization)</h3>
  <p>
    Suppose a study asks whether sleep affects exam performance. A reasonable setup would be:
  </p>
  <ul>
    <li><strong>IV/predictor</strong>: Sleep (operationalized as hours slept last night based on a sleep diary or tracker). [page:0]</li>
    <li><strong>DV/outcome</strong>: Exam performance (operationalized as percent correct on a specific test). [page:0]</li>
  </ul>

  <div class="knowledge-check">
    <h4>Knowledge Check</h4>
    <p><strong>Prompt:</strong> Write one sentence identifying the IV and DV in your own study idea, then list how each variable will be operationalized (method + allowable values). [page:0]</p>
  </div>
</section>
`
  },
  {
    id: 'scales-of-measurement',
    moduleId: 'module-2',
    title: 'Scales of Measurement',
    description: 'Nominal, Ordinal, Interval, and Ratio (NOIR) scales.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="scales-title">
  <h2 id="scales-title">Scales of Measurement (NOIR)</h2>

  <p>
    When you collect data, the outcome is a <strong>variable</strong>, but variables come in different qualitative types. [page:0]
    The <strong>scale of measurement</strong> helps you decide what comparisons and calculations make sense for a variable. [page:0]
  </p>

  <h3>Nominal (Categorical)</h3>
  <p>
    A <strong>nominal</strong> variable (also called <strong>categorical</strong>) has categories with no meaningful ordering. [page:0]
    For nominal variables, the only thing you can say is that categories are different; it does not make sense to say one is "bigger" or to compute an average. [page:0]
  </p>
  <ul>
    <li><strong>Example:</strong> Eye color (blue, green, brown, etc.). [page:0]</li>
    <li><strong>Example:</strong> Transportation type (train, bus, car, bicycle). [page:0]</li>
    <li><strong>Common mistake:</strong> Asking for an "average" category (e.g., average transportation type). [page:0]</li>
  </ul>

  <h3>Ordinal</h3>
  <p>
    An <strong>ordinal</strong> variable has a meaningful order, but you cannot interpret the size of the differences between adjacent levels. [page:0]
    You can say one value is higher/lower than another, but you cannot say how much higher/lower in a precise numerical way. [page:0]
  </p>
  <ul>
    <li><strong>Example:</strong> Finishing position in a race (1st, 2nd, 3rd): order is meaningful, but the gaps may not be equal. [page:0]</li>
    <li><strong>Example:</strong> Ordered attitude response options (e.g., climate-change statements with increasing endorsement of the science). [page:0]</li>
    <li><strong>Important limit:</strong> Averaging ordinal codes can produce results that are hard to interpret (e.g., an "average" response like 1.97). [page:0]</li>
  </ul>

  <h3>Interval</h3>
  <p>
    With <strong>interval</strong> variables, numerical differences are interpretable (equal-sized steps), but the variable has no "natural" zero. [page:0]
    That means addition and subtraction are meaningful, but ratios (multiplication/division) are not. [page:0]
  </p>
  <ul>
    <li><strong>Example:</strong> Temperature in degrees Celsius: a 3 degrees change means the same anywhere on the scale, but 0 degrees C does not mean "no temperature." [page:0]</li>
    <li><strong>Example:</strong> Calendar year: differences are meaningful (2003 vs 2008 is 5 years), but dividing years is meaningless. [page:0]</li>
  </ul>

  <h3>Ratio</h3>
  <p>
    A <strong>ratio</strong> variable has a true zero (zero means none of the quantity), so both differences and ratios are meaningful. [page:0]
    This makes it sensible to say one value is "twice as much" as another when the ratio supports it. [page:0]
  </p>
  <ul>
    <li><strong>Example:</strong> Response time (RT) in seconds: 0 seconds means no time elapsed, and it makes sense to say one person took 1.35 times as long as another. [page:0]</li>
  </ul>

  <h3>Continuous vs. Discrete</h3>
  <p>
    Another distinction is whether a variable is <strong>continuous</strong> (values can, in principle, include something between any two values) or <strong>discrete</strong>
    (sometimes there is nothing "in between"). [page:0]
  </p>
  <ul>
    <li><strong>Nominal</strong> variables are always discrete (there is no mathematical "in between" category). [page:0]</li>
    <li><strong>Ordinal</strong> variables are always discrete (there is nothing between 1st and 2nd place). [page:0]</li>
    <li><strong>Interval</strong> and <strong>ratio</strong> variables can be continuous (e.g., temperature, response time) or discrete (e.g., calendar year; number correct on a test). [page:0]</li>
  </ul>

  <div class="callout">
    <h4>Real-world complexity: Likert scales</h4>
    <p>
      Likert items are ordered and discrete, so they are not nominal and they are not ratio (no true zero). [page:0]
      They can be treated as ordinal, but many researchers treat them as approximately interval in practice because responses often behave "close enough" to equal steps
      (sometimes described as <strong>quasi-interval</strong>). [page:0]
    </p>
  </div>

  <div class="knowledge-check">
    <h4>Knowledge Check</h4>
    <p><strong>Classify each variable (NOIR) and indicate whether it is continuous or discrete:</strong></p>
    <ul>
      <li>Transportation type (train, bus, car, bicycle). [page:0]</li>
      <li>Finishing position (1st, 2nd, 3rd). [page:0]</li>
      <li>Temperature in degrees Celsius. [page:0]</li>
      <li>Response time (seconds). [page:0]</li>
      <li>Calendar year of university entry. [page:0]</li>
    </ul>
  </div>
</section>
`
  },
  {
    id: 'research-design',
    moduleId: 'module-2',
    title: 'Research Design Basics',
    description: 'Experimental, quasi-experimental, and correlational designs.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="design-basics-title">
  <h2 id="design-basics-title">Research Design Basics</h2>

  <p>
    A major distinction in research design is whether a study is <strong>experimental</strong> or <strong>non-experimental</strong>, which mainly differs in how much
    control the researcher has over what happens in the study. [page:0]
  </p>

  <h3>Experimental vs. Non-experimental</h3>

  <h4>Experimental research</h4>
  <p>
    The key feature of <strong>experimental research</strong> is that the researcher controls all aspects of the study, especially what participants experience. [page:0]
    In particular, the researcher deliberately manipulates (varies) the predictor variables (IVs) and allows the outcome variable (DV) to vary naturally, to test whether
    changing the predictors causes changes in the outcomes. [page:0]
  </p>
  <ul>
    <li><strong>Core goal:</strong> Identify possible causal effects of IVs (predictors) on DVs (outcomes). [page:0]</li>
    <li><strong>Key practice:</strong> Keep other influences constant or "balanced" so they do not drive the result. [page:0]</li>
  </ul>

  <h4>Randomization (why it matters)</h4>
  <p>
    Because it is almost impossible to identify and hold constant every possible influence on an outcome, a standard solution is <strong>randomisation</strong>:
    randomly assign participants to groups, then give each group a different treatment (different predictor values). [page:0]
  </p>
  <p>
    Randomisation helps minimise (but does not eliminate) systematic differences between groups that could otherwise explain the outcome. [page:0]
  </p>

  <h4>Non-experimental research</h4>
  <p>
    <strong>Non-experimental research</strong> is a broad term for studies where the researcher does not have as much control as in an experiment. [page:0]
    Sometimes this is necessary because experimental control can be unethical or impractical, and sometimes it can produce results that do not reflect how things work in
    the "natural" world. [page:0]
  </p>

  <div class="callout">
    <h4>Key term: Confounders</h4>
    <p>
      When groups differ on many things (not just the predictor of interest), the extra differences are potential <strong>confounders</strong> that could explain the
      outcome instead of the predictor. [page:0]
    </p>
  </div>

  <h3>Types of Non-experimental Designs</h3>

  <h4>Quasi-experimental research</h4>
  <p>
    <strong>Quasi-experimental</strong> designs resemble experiments, but the researcher does not control the predictors (IVs). [page:0]
    These designs can still be analyzed statistically, but they require more caution when drawing conclusions. [page:0]
  </p>

  <h4>Case studies</h4>
  <p>
    <strong>Case studies</strong> provide detailed description of one or a few instances. [page:0]
    In general, case studies are difficult to analyze statistically and it is usually hard to generalize to "people in general" from a few cases, but they can be
    valuable when large samples are unavailable and when deep understanding of specific cases is needed. [page:0]
  </p>

  <h3>Design Takeaways</h3>
  <ul>
    <li><strong>Experiments:</strong> Highest control; manipulate IVs to test causal effects on DVs; use randomization to reduce systematic group differences. [page:0]</li>
    <li><strong>Quasi-experiments:</strong> Similar logic, but IVs are not controlled; interpret causality more carefully due to confounds. [page:0]</li>
    <li><strong>Case studies:</strong> Deep detail on few cases; limited statistical analysis and generalization, but strong for understanding context and rare phenomena. [page:0]</li>
  </ul>

  <div class="knowledge-check">
    <h4>Knowledge Check</h4>
    <p><strong>For each scenario, identify the design and justify your choice:</strong></p>
    <ul>
      <li>A researcher assigns participants randomly to a mindfulness training group or a control group, then compares stress scores. [page:0]</li>
      <li>A researcher compares stress scores for people who already practice mindfulness vs. those who do not. [page:0]</li>
      <li>A researcher writes a detailed report describing the recovery of a single patient with a rare brain injury. [page:0]</li>
    </ul>
  </div>
</section>
`
  },
  {
    id: 'validity',
    moduleId: 'module-2',
    title: 'Validity',
    description: 'Threats to internal, external, construct, face, and ecological validity.',
    icon: 'T',
    contentHtml: `
<section class="module-content" aria-labelledby="validity-title">
  <h2 id="validity-title">Threats to Validity (Internal vs. External, etc.)</h2>

  <p>
    More than anything else, researchers want studies to be <strong>valid</strong>. [page:0]
    In simple terms, validity asks: <strong>Can you trust the results of your study?</strong> If you cannot, the study is invalid. [page:0]
  </p>

  <p>
    Validity is harder to evaluate than reliability, and there is not one single, universally agreed definition - there are multiple "kinds" of validity that raise different issues. [page:0]
    Not every type of validity matters equally for every study. [page:0]
  </p>

  <h3>Five types of validity</h3>
  <p>
    This chapter describes five types of validity: internal, external, construct, face, and ecological validity. [page:0]
    It also notes a practical priority: internal and external validity are typically the most important because they connect directly to whether a study really works. [page:0]
  </p>
  <ul>
    <li><strong>Internal validity:</strong> Can you draw the correct causal conclusions about relationships between variables within the study? [page:0]</li>
    <li><strong>External validity:</strong> Do the results generalize beyond the specific study (generalizability/applicability)? [page:0]</li>
    <li><strong>Construct validity:</strong> Are you actually measuring what you think you are measuring? [page:0]</li>
    <li><strong>Face validity:</strong> Does it "look like" you measured what you meant to measure (appearance-based; often less important scientifically)? [page:0]</li>
    <li><strong>Ecological validity:</strong> A special case of face validity focused on whether the study resembles real life in ways you care about. [page:0]</li>
  </ul>

  <h3>Internal validity (what can go wrong)</h3>
  <p>
    <strong>Internal validity</strong> refers to whether the study allows correct conclusions about <em>causal</em> relationships between variables "inside" the study. [page:0]
    A major threat is when alternative explanations (confounds) could be responsible for the observed effect. [page:0]
  </p>

  <div class="callout">
    <h4>Example: Confounding alternative explanations</h4>
    <p>
      The chapter illustrates an internal validity problem with a comparison of first-year and third-year university students' writing:
      if third-years make fewer errors, it is unclear whether education caused the difference, or whether age and writing experience (among other differences) explain it. [page:0]
    </p>
  </div>

  <h3>External validity (what can go wrong)</h3>
  <p>
    <strong>External validity</strong> is about <strong>generalizability</strong> - whether the same pattern of results would appear in "real life," not just under the specific study conditions. [page:0]
    The chapter highlights that studies occur with specific tasks, in specific environments, and with participants from specific subgroups, which can limit applicability. [page:0]
  </p>

  <h3>Construct validity (measurement matters)</h3>
  <p>
    <strong>Construct validity</strong> asks whether the study's measures and procedures actually capture the theoretical construct of interest. [page:0]
    This links directly to operationalization: if a construct is defined or measured poorly, conclusions may not reflect what the researcher intended to study. [page:0]
  </p>

  <h3>Knowledge Check</h3>
  <ul>
    <li>
      <strong>Internal validity:</strong> In a study comparing two groups, list one plausible confound (an alternative explanation) and how you might control or rule it out. [page:0]
    </li>
    <li>
      <strong>External validity:</strong> Name one way the study setting, tasks, or sample might limit generalizability to real-world populations or contexts. [page:0]
    </li>
    <li>
      <strong>Construct validity:</strong> Identify the construct and describe how you would operationalize it so the measurement matches the construct. [page:0]
    </li>
  </ul>
</section>
`
  },

  // Module 3: Jamovi and Data Handling
  {
    id: 'software-interface',
    moduleId: 'module-3',
    title: 'The Software Interface',
    description: 'Navigate the workspace, menus, and key features of your statistical software.',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/03-Getting-started-with-jamovi.html',
    isDynamicSoftware: true  // Content adapts to software preference
  },
  {
    id: 'data-entry',
    moduleId: 'module-3',
    title: 'Entering and Importing Data',
    description: 'Manual entry, CSV import, and data validation.',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/03-Getting-started-with-jamovi.html',
    isDynamicSoftware: true  // Content adapts to software preference
  },
  {
    id: 'variable-types',
    moduleId: 'module-3',
    title: 'Variable Types and Measurement Levels',
    description: 'Setting measurement levels and data types correctly.',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/03-Getting-started-with-jamovi.html',
    isDynamicSoftware: true  // Content adapts to software preference
  },

  // Module 4: Descriptive Statistics
  {
    id: 'central-tendency',
    moduleId: 'module-4',
    title: 'Measures of Central Tendency',
    description: 'Mean, median, and mode - when to use each.',
    icon: 'T'
  },
  {
    id: 'variability',
    moduleId: 'module-4',
    title: 'Measures of Variability',
    description: 'Range, variance, standard deviation, and IQR.',
    icon: 'T'
  },
  {
    id: 'descriptive-stats',
    moduleId: 'module-4',
    title: 'Descriptive Statistics in Practice',
    description: 'Running and interpreting descriptives in Jamovi.',
    icon: 'T'
  },

  // Module 5: Graphing and Visualization
  {
    id: 'histograms',
    moduleId: 'module-5',
    title: 'Histograms',
    description: 'Visualize distributions and identify shape, center, spread.',
    icon: 'T'
  },
  {
    id: 'boxplots',
    moduleId: 'module-5',
    title: 'Box Plots',
    description: 'Display five-number summary and identify outliers.',
    icon: 'T'
  },
  {
    id: 'bar-charts',
    moduleId: 'module-5',
    title: 'Bar Charts',
    description: 'Visualize categorical data with bar and pie charts.',
    icon: 'T'
  },
  {
    id: 'scatterplots',
    moduleId: 'module-5',
    title: 'Scatter Plots',
    description: 'Visualize relationships between two continuous variables.',
    icon: 'T'
  },

  // Module 6: Probability and Sampling
  {
    id: 'probability-basics',
    moduleId: 'module-6',
    title: 'Probability Basics',
    description: 'Fundamental probability rules and calculations.',
    icon: 'T'
  },
  {
    id: 'normal-distribution',
    moduleId: 'module-6',
    title: 'The Normal Distribution',
    description: 'Properties of the bell curve and the empirical rule.',
    icon: 'T'
  },
  {
    id: 'z-scores',
    moduleId: 'module-6',
    title: 'Z-Scores and Standardization',
    description: 'Converting raw scores and using z-tables.',
    icon: 'T'
  },
  {
    id: 'sampling-distributions',
    moduleId: 'module-6',
    title: 'Sampling Distributions',
    description: 'The central limit theorem and standard error.',
    icon: 'T'
  },

  // Module 7: Hypothesis Testing
  {
    id: 'hypothesis-testing',
    moduleId: 'module-7',
    title: 'Hypothesis Testing Logic',
    description: 'Null and alternative hypotheses, decision making.',
    icon: 'T'
  },
  {
    id: 'p-values',
    moduleId: 'module-7',
    title: 'Understanding P-Values',
    description: 'What p-values mean and common misinterpretations.',
    icon: 'T'
  },
  {
    id: 'effect-size',
    moduleId: 'module-7',
    title: 'Effect Sizes',
    description: "Cohen's d, r, and practical significance.",
    icon: 'T'
  },
  {
    id: 'confidence-intervals',
    moduleId: 'module-7',
    title: 'Confidence Intervals',
    description: 'Estimating population parameters with uncertainty.',
    icon: 'T'
  },

  // Module 8: Comparing Groups/Relationships
  {
    id: 't-tests',
    moduleId: 'module-8',
    title: 'T-Tests',
    description: 'One-sample, independent, and paired t-tests.',
    icon: 'T'
  },
  {
    id: 'correlation',
    moduleId: 'module-8',
    title: 'Correlation',
    description: 'Pearson and Spearman correlation coefficients.',
    icon: 'T'
  },
  {
    id: 'regression',
    moduleId: 'module-8',
    title: 'Simple Linear Regression',
    description: 'Predicting outcomes with regression equations.',
    icon: 'T'
  }
]

export const software = [
  { id: 'spss', name: 'SPSS', color: '#cc0000' },
  { id: 'r', name: 'R', color: '#276dc3' },
  { id: 'excel', name: 'Excel', color: '#217346' },
  { id: 'stata', name: 'Stata', color: '#1a476f' },
  { id: 'jamovi', name: 'jamovi', color: '#8b5cf6' }
]

// Helper functions
export function getTopicById(topicId) {
  return topics.find(t => t.id === topicId)
}

export function getTopicsByModule(moduleId) {
  return topics.filter(t => t.moduleId === moduleId)
}

export function getAllTopics() {
  return topics
}
