<template>
  <div class="software-instructions">
    <h3>Calculating Descriptive Statistics in Excel</h3>

    <h4>Method 1: Individual Functions</h4>
    <p>Use Excel formulas directly in cells. Assuming your data is in column A (A1:A50):</p>

    <div class="code-block">
      <code>=AVERAGE(A1:A50)      # Mean
=MEDIAN(A1:A50)       # Median
=MODE.SNGL(A1:A50)    # Mode (single value)
=STDEV.S(A1:A50)      # Standard deviation (sample, uses n-1)
=VAR.S(A1:A50)        # Variance (sample)
=MAX(A1:A50)-MIN(A1:A50)  # Range
=MIN(A1:A50)          # Minimum
=MAX(A1:A50)          # Maximum
=COUNT(A1:A50)        # Count of numbers
=QUARTILE.INC(A1:A50, 1)  # First quartile (Q1)
=QUARTILE.INC(A1:A50, 3)  # Third quartile (Q3)</code>
    </div>

    <div class="note">
      <div class="note-title">.S vs .P</div>
      <p>
        <strong>STDEV.S / VAR.S:</strong> Sample statistics (divides by n-1) - USE THIS<br>
        <strong>STDEV.P / VAR.P:</strong> Population statistics (divides by n) - rarely used
      </p>
    </div>

    <h4>Method 2: Data Analysis ToolPak</h4>
    <p>The Analysis ToolPak add-in provides comprehensive descriptive statistics:</p>

    <ol class="steps">
      <li>
        <strong>Enable the ToolPak</strong> (if not already):
        <ul>
          <li>Go to <strong>File → Options → Add-ins</strong></li>
          <li>At the bottom, select "Excel Add-ins" and click <strong>Go...</strong></li>
          <li>Check <strong>Analysis ToolPak</strong> and click OK</li>
        </ul>
      </li>
      <li>Go to <strong>Data → Data Analysis</strong></li>
      <li>Select <strong>Descriptive Statistics</strong> and click OK</li>
      <li>Select your <strong>Input Range</strong> (e.g., A1:A50)</li>
      <li>Check <strong>Labels in first row</strong> if applicable</li>
      <li>Check <strong>Summary statistics</strong></li>
      <li>Choose output location and click <strong>OK</strong></li>
    </ol>

    <p>The output includes:</p>
    <ul>
      <li>Mean, Standard Error, Median, Mode</li>
      <li>Standard Deviation, Sample Variance</li>
      <li>Kurtosis, Skewness</li>
      <li>Range, Minimum, Maximum, Sum, Count</li>
    </ul>

    <div class="tip">
      <div class="tip-title">Quick Tip</div>
      <p>
        If you don't see "Data Analysis" in the Data tab, you need to enable
        the Analysis ToolPak add-in first (Step 1 above).
      </p>
    </div>

    <h4>Descriptive Statistics by Group</h4>
    <p>To get descriptives for different groups, use AVERAGEIF and related functions:</p>

    <div class="code-block">
      <code># Mean for a specific group
=AVERAGEIF(B1:B50, "Treatment", A1:A50)

# Count for a specific group
=COUNTIF(B1:B50, "Treatment")

# For multiple conditions
=AVERAGEIFS(A1:A50, B1:B50, "Treatment", C1:C50, "Male")</code>
    </div>

    <h4>Creating a Summary Table</h4>
    <p>Set up a summary table like this:</p>

    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
      <tr>
        <th style="border: 1px solid var(--border); padding: 0.5rem;">Statistic</th>
        <th style="border: 1px solid var(--border); padding: 0.5rem;">Formula</th>
        <th style="border: 1px solid var(--border); padding: 0.5rem;">Value</th>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">N</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">=COUNT(A:A)</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">50</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Mean</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">=AVERAGE(A:A)</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">28.5</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">SD</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">=STDEV.S(A:A)</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">8.23</td>
      </tr>
    </table>
  </div>
</template>
