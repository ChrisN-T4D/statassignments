<template>
  <div class="concept">
    <p>
      Sampling is the process of selecting a subset of individuals from a population
      to estimate characteristics of the whole population. In psychology research,
      we almost never have access to the entire population, so understanding sampling
      is crucial.
    </p>

    <h3>Key Terms</h3>
    <ul>
      <li><strong>Population:</strong> The entire group you want to draw conclusions about</li>
      <li><strong>Sample:</strong> A subset of the population that you actually study</li>
      <li><strong>Parameter:</strong> A numerical characteristic of a population (μ, σ)</li>
      <li><strong>Statistic:</strong> A numerical characteristic of a sample (M, s)</li>
    </ul>

    <h3>Sampling Methods</h3>

    <h4>Probability Sampling</h4>
    <p>Every member of the population has a known chance of being selected:</p>
    <ul>
      <li><strong>Simple random sampling:</strong> Every individual has an equal chance</li>
      <li><strong>Stratified sampling:</strong> Population divided into subgroups, then randomly sampled from each</li>
      <li><strong>Cluster sampling:</strong> Randomly select groups, then include all members of selected groups</li>
      <li><strong>Systematic sampling:</strong> Select every nth person from a list</li>
    </ul>

    <h4>Non-Probability Sampling</h4>
    <p>Not everyone has a chance of being selected (common in psychology):</p>
    <ul>
      <li><strong>Convenience sampling:</strong> Whoever is available (e.g., intro psych students)</li>
      <li><strong>Snowball sampling:</strong> Participants recruit other participants</li>
      <li><strong>Purposive sampling:</strong> Researcher selects participants who meet specific criteria</li>
    </ul>

    <div class="note">
      <div class="note-title">WEIRD Problem</div>
      <p>
        Much psychology research uses samples that are Western, Educated, Industrialized,
        Rich, and Democratic. This limits how well findings generalize to other populations.
      </p>
    </div>

    <h3>Sampling Distribution</h3>
    <p>
      A <strong>sampling distribution</strong> is the distribution of a statistic
      (like the mean) calculated from all possible samples of a given size.
    </p>
    <p>
      If you took many samples and calculated the mean of each, those means would
      form a sampling distribution of the mean.
    </p>

    <h3>Central Limit Theorem</h3>
    <p>
      The Central Limit Theorem (CLT) states that:
    </p>
    <ul>
      <li>The sampling distribution of the mean approaches a normal distribution as sample size increases</li>
      <li>This happens regardless of the shape of the original population distribution</li>
      <li>Generally, n ≥ 30 is sufficient for the CLT to apply</li>
    </ul>

    <div class="tip">
      <div class="tip-title">Why the CLT Matters</div>
      <p>
        The CLT is why we can use normal-distribution-based tests (like t-tests)
        even when our data isn't perfectly normal. It's the foundation of
        inferential statistics.
      </p>
    </div>

    <h3>Standard Error</h3>
    <p>
      The <strong>standard error (SE)</strong> is the standard deviation of the
      sampling distribution. It tells us how much sample means vary from sample to sample.
    </p>
    <div class="formula">SE = s / √n</div>
    <p>Where s is the sample standard deviation and n is the sample size.</p>

    <p>Key insights about standard error:</p>
    <ul>
      <li>Larger samples → smaller SE → more precise estimates</li>
      <li>SE is used to calculate confidence intervals</li>
      <li>SE is used to calculate test statistics (like t)</li>
    </ul>

    <h3>Sampling Bias</h3>
    <p>
      <strong>Sampling bias</strong> occurs when some members of the population
      are more likely to be included than others:
    </p>
    <ul>
      <li><strong>Selection bias:</strong> How participants are chosen affects who's in the sample</li>
      <li><strong>Non-response bias:</strong> People who don't respond differ from those who do</li>
      <li><strong>Survivorship bias:</strong> Only including participants who "survived" to the end</li>
    </ul>
  </div>
</template>
