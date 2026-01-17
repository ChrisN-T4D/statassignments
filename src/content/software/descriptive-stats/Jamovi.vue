<template>
  <div class="software-instructions">
    <h3>Calculating Descriptive Statistics in jamovi</h3>

    <p>
      jamovi is designed to be intuitive and user-friendly. Getting descriptive
      statistics is straightforward with its point-and-click interface.
    </p>

    <h4>Getting Descriptives</h4>
    <ol class="steps">
      <li>Open your data file in jamovi (or paste data directly)</li>
      <li>Go to <strong>Analyses → Exploration → Descriptives</strong></li>
      <li>Drag your variable(s) from the left panel to the <strong>Variables</strong> box</li>
      <li>Results appear automatically in the right panel</li>
    </ol>

    <h4>Choosing Statistics</h4>
    <p>Expand the sections below the Variables box to customize output:</p>

    <ul>
      <li>
        <strong>Statistics:</strong>
        <ul>
          <li>N, Missing</li>
          <li>Mean, Median, Mode</li>
          <li>Sum</li>
          <li>Std. deviation, Variance</li>
          <li>Range, Minimum, Maximum</li>
          <li>Std. error of mean</li>
        </ul>
      </li>
      <li>
        <strong>Percentiles:</strong>
        <ul>
          <li>Quartiles (25th, 50th, 75th)</li>
          <li>Custom percentiles</li>
        </ul>
      </li>
      <li>
        <strong>Distribution:</strong>
        <ul>
          <li>Skewness</li>
          <li>Kurtosis</li>
          <li>Shapiro-Wilk test (for normality)</li>
        </ul>
      </li>
    </ul>

    <div class="tip">
      <div class="tip-title">Live Results</div>
      <p>
        jamovi updates results in real-time as you make selections.
        No need to click "OK" or "Run"—just check the boxes you need.
      </p>
    </div>

    <h4>Descriptives by Group</h4>
    <ol class="steps">
      <li>In the Descriptives window, drag your <strong>dependent variable</strong> to Variables</li>
      <li>Drag your <strong>grouping variable</strong> to the <strong>Split by</strong> box</li>
      <li>Results will show statistics for each group separately</li>
    </ol>

    <h4>Adding Plots</h4>
    <p>Expand the <strong>Plots</strong> section to add visualizations:</p>
    <ul>
      <li><strong>Histograms:</strong> Check "Histogram" to see distribution shape</li>
      <li><strong>Density:</strong> Adds a smooth curve over the histogram</li>
      <li><strong>Box plot:</strong> Shows median, quartiles, and outliers</li>
      <li><strong>Violin:</strong> Combines box plot with density plot</li>
      <li><strong>Q-Q plot:</strong> For checking normality</li>
    </ul>

    <div class="note">
      <div class="note-title">Sample Output</div>
      <p>jamovi produces clean, APA-style tables:</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9rem;">
      <tr>
        <th style="border: 1px solid var(--border); padding: 0.5rem;"></th>
        <th style="border: 1px solid var(--border); padding: 0.5rem;">anxiety_score</th>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">N</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">50</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Missing</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">0</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Mean</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">28.5</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Median</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">28.0</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Std. deviation</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">8.23</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Minimum</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">12</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Maximum</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">45</td>
      </tr>
    </table>

    <h4>Copying Results</h4>
    <p>
      Right-click on any table or plot in the results panel to copy it.
      Tables copy in a format ready to paste into Word or Google Docs.
    </p>
  </div>
</template>
