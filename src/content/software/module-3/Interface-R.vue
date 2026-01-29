<template>
  <div class="software-content">
    <h2>The RStudio Interface</h2>

    <section class="content-section">
      <h3>Overview</h3>
      <p>
        RStudio is an integrated development environment (IDE) for R. While R is the programming language,
        RStudio provides a user-friendly interface to write code, view results, and manage your projects.
      </p>
    </section>

    <section class="content-section">
      <h3>Four Main Panes</h3>

      <h4>1. Source Editor (Top Left)</h4>
      <p>
        Where you write and edit R scripts (.R files) and R Markdown documents.
      </p>
      <ul>
        <li>Write multi-line code</li>
        <li>Save your work as scripts for reproducibility</li>
        <li>Run code line-by-line or entire scripts</li>
        <li>Syntax highlighting helps identify errors</li>
        <li>Use <kbd>Ctrl+Enter</kbd> to run selected code</li>
      </ul>

      <h4>2. Console (Bottom Left)</h4>
      <p>
        Where R code executes and displays results immediately.
      </p>
      <ul>
        <li>Type commands directly for quick tests</li>
        <li>See output from scripts run in the Source pane</li>
        <li>View error messages and warnings</li>
        <li>The <code>&gt;</code> prompt indicates R is ready for input</li>
      </ul>

      <h4>3. Environment/History (Top Right)</h4>
      <p>
        <strong>Environment tab</strong>: Shows all objects currently in memory
      </p>
      <ul>
        <li>Data frames (datasets)</li>
        <li>Variables and values</li>
        <li>Functions you've created</li>
        <li>Click on data frames to view them</li>
      </ul>
      <p>
        <strong>History tab</strong>: Lists previously run commands
      </p>

      <h4>4. Files/Plots/Packages/Help (Bottom Right)</h4>
      <p>Multiple tabs provide different functions:</p>
      <ul>
        <li><strong>Files</strong>: Browse project files</li>
        <li><strong>Plots</strong>: View graphs and visualizations</li>
        <li><strong>Packages</strong>: Install and load R packages</li>
        <li><strong>Help</strong>: Access documentation</li>
        <li><strong>Viewer</strong>: Preview HTML outputs</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Key Features</h3>

      <h4>Projects</h4>
      <p>
        RStudio Projects keep your work organized. Create a new project via:
        <em>File → New Project</em>
      </p>
      <ul>
        <li>Automatically sets working directory</li>
        <li>Keeps related files together</li>
        <li>Saves workspace state</li>
      </ul>

      <h4>Code Completion</h4>
      <p>
        RStudio offers intelligent auto-completion:
      </p>
      <ul>
        <li>Press <kbd>Tab</kbd> while typing to see suggestions</li>
        <li>Function arguments appear automatically</li>
        <li>Variable names auto-complete</li>
      </ul>

      <h4>R Markdown</h4>
      <p>
        Create documents that combine code, output, and narrative text.
        Useful for reports and reproducible research.
      </p>
    </section>

    <section class="content-section">
      <h3>Essential Commands</h3>
      <div class="code-block">
        <pre><code># Get help
?function_name

# View data
View(dataframe_name)

# Check working directory
getwd()

# Set working directory
setwd("path/to/folder")

# Install packages
install.packages("package_name")

# Load packages
library(package_name)

# Clear console
Ctrl+L

# Clear environment
rm(list = ls())</code></pre>
      </div>
    </section>

    <section class="content-section">
      <h3>Navigation Tips</h3>
      <ul>
        <li>Use <kbd>Ctrl+1</kbd> to focus on Source pane</li>
        <li>Use <kbd>Ctrl+2</kbd> to focus on Console</li>
        <li>Run code with <kbd>Ctrl+Enter</kbd></li>
        <li>Comment code with <kbd>Ctrl+Shift+C</kbd></li>
        <li>Find and replace with <kbd>Ctrl+F</kbd></li>
        <li>Restart R session with <kbd>Ctrl+Shift+F10</kbd></li>
        <li>Customize pane layout in Tools → Global Options → Pane Layout</li>
      </ul>
    </section>

    <div class="key-takeaways">
      <h3>Key Takeaways</h3>
      <ul>
        <li>RStudio has 4 panes: Source, Console, Environment, and Files/Plots/Help</li>
        <li>Write scripts in Source pane, run in Console</li>
        <li>Environment shows your loaded data and variables</li>
        <li>R is a programming language - everything is done with code</li>
        <li>Use Projects to stay organized</li>
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

.content-section ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

.content-section li {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.code-block {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

.code-block code {
  color: var(--color-text);
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
