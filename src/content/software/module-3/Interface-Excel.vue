<template>
  <div class="software-content">
    <h2>The Excel Interface for Statistical Analysis</h2>

    <section class="content-section">
      <h3>Overview</h3>
      <p>
        While Excel is primarily a spreadsheet program, it includes basic statistical functions
        and the Data Analysis ToolPak for more advanced analyses. Understanding Excel's interface
        is essential for data management and simple statistics.
      </p>
    </section>

    <section class="content-section">
      <h3>Main Components</h3>

      <h4>1. The Worksheet Grid</h4>
      <p>
        Excel's main area is organized into rows and columns.
      </p>
      <ul>
        <li>Rows are numbered (1, 2, 3...)</li>
        <li>Columns are lettered (A, B, C...)</li>
        <li>Each cell has an address (e.g., A1, B5)</li>
        <li>One row should contain variable names (headers)</li>
        <li>Each subsequent row represents one case/participant</li>
      </ul>

      <h4>2. The Ribbon</h4>
      <p>
        The top of Excel contains tabs with different functions:
      </p>
      <ul>
        <li><strong>Home</strong>: Formatting, basic functions</li>
        <li><strong>Insert</strong>: Charts, pivot tables</li>
        <li><strong>Formulas</strong>: Mathematical and statistical functions</li>
        <li><strong>Data</strong>: Sort, filter, Data Analysis ToolPak</li>
        <li><strong>Review</strong>: Comments and protection</li>
      </ul>

      <h4>3. Formula Bar</h4>
      <p>
        Located above the worksheet, shows the contents of the selected cell.
        Use it to enter or edit formulas and functions.
      </p>
    </section>

    <section class="content-section">
      <h3>Excel for Statistics</h3>

      <h4>Data Analysis ToolPak</h4>
      <p>
        Excel's add-in for statistical analysis. To enable it:
      </p>
      <ol>
        <li>Go to <em>File → Options → Add-ins</em></li>
        <li>Select "Excel Add-ins" and click Go</li>
        <li>Check "Analysis ToolPak" and click OK</li>
        <li>Access it via <em>Data → Data Analysis</em></li>
      </ol>
      <p>Available analyses:</p>
      <ul>
        <li>Descriptive Statistics</li>
        <li>t-Tests</li>
        <li>ANOVA</li>
        <li>Correlation</li>
        <li>Regression</li>
      </ul>

      <h4>Statistical Functions</h4>
      <p>
        Excel has built-in formulas for common statistics. Start any formula with <code>=</code>:
      </p>
      <ul>
        <li><code>=AVERAGE(A2:A100)</code> - Mean</li>
        <li><code>=MEDIAN(A2:A100)</code> - Median</li>
        <li><code>=STDEV.S(A2:A100)</code> - Standard deviation (sample)</li>
        <li><code>=CORREL(A2:A100, B2:B100)</code> - Correlation</li>
        <li><code>=COUNT(A2:A100)</code> - Count of numbers</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Data Organization Best Practices</h3>
      <ul>
        <li>Put variable names in the first row</li>
        <li>Use one column per variable</li>
        <li>Use one row per participant/case</li>
        <li>Don't merge cells in your data</li>
        <li>Avoid blank rows or columns</li>
        <li>Use consistent data entry (e.g., all dates in same format)</li>
        <li>Keep raw data separate from calculations</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Charts and Visualization</h3>
      <p>
        Create graphs via the <em>Insert</em> tab:
      </p>
      <ul>
        <li>Select your data first</li>
        <li>Choose chart type (Column, Line, Scatter, etc.)</li>
        <li>Customize with Chart Tools</li>
        <li>Right-click elements to format them</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Keyboard Shortcuts</h3>
      <ul>
        <li><kbd>Ctrl+Home</kbd> - Go to cell A1</li>
        <li><kbd>Ctrl+Arrow</kbd> - Jump to edge of data</li>
        <li><kbd>Ctrl+Shift+Arrow</kbd> - Select to edge of data</li>
        <li><kbd>F2</kbd> - Edit active cell</li>
        <li><kbd>Ctrl+C</kbd> / <kbd>Ctrl+V</kbd> - Copy/Paste</li>
        <li><kbd>Ctrl+Z</kbd> - Undo</li>
        <li><kbd>Alt+E+S</kbd> - Paste Special</li>
      </ul>
    </section>

    <div class="key-takeaways">
      <h3>Key Takeaways</h3>
      <ul>
        <li>Excel is a spreadsheet with add-on statistical capabilities</li>
        <li>Enable Data Analysis ToolPak for statistical tests</li>
        <li>Organize data with variables in columns, cases in rows</li>
        <li>Use formulas starting with = for calculations</li>
        <li>Best for basic statistics and data management</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// No special logic needed for static content
</script>

<style scoped>
.software-content {
  max-width: 800px;
  margin: 0 auto;
}

.content-section {
  margin: 2rem 0;
}

.content-section h3 {
  color: var(--color-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.content-section h4 {
  color: var(--color-text);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.content-section ul, .content-section ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.content-section li {
  margin: 0.5rem 0;
  line-height: 1.6;
}

code {
  background-color: var(--color-surface);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

kbd {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 3px;
  padding: 2px 6px;
  font-family: monospace;
  font-size: 0.9em;
}

.key-takeaways {
  background-color: var(--color-surface-elevated);
  border-left: 4px solid var(--color-primary);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 4px;
}

.key-takeaways h3 {
  margin-top: 0;
  color: var(--color-primary);
}

strong {
  color: var(--color-text-strong);
  font-weight: 600;
}
</style>
