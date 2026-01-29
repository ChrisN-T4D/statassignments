<template>
  <div class="software-content">
    <h2>The Stata Interface</h2>

    <section class="content-section">
      <h3>Overview</h3>
      <p>
        Stata is a powerful statistical software package widely used in economics, biostatistics,
        and social sciences. Its interface combines point-and-click menus with command-line functionality.
      </p>
    </section>

    <section class="content-section">
      <h3>Main Windows</h3>

      <h4>1. Results Window</h4>
      <p>
        The central window where command output appears.
      </p>
      <ul>
        <li>Shows statistical output, tables, and messages</li>
        <li>Commands you run appear in blue</li>
        <li>Results appear in black</li>
        <li>Errors appear in red</li>
        <li>Scroll up to review previous analyses</li>
      </ul>

      <h4>2. Command Window</h4>
      <p>
        Where you type Stata commands directly (bottom of screen).
      </p>
      <ul>
        <li>Type commands and press <kbd>Enter</kbd></li>
        <li>Use <kbd>Page Up</kbd> to recall previous commands</li>
        <li>Commands execute immediately</li>
        <li>Efficient for experienced users</li>
      </ul>

      <h4>3. Variables Window</h4>
      <p>
        Lists all variables in your current dataset (right side).
      </p>
      <ul>
        <li>Shows variable names</li>
        <li>Displays variable labels</li>
        <li>Double-click to insert variable name into command</li>
        <li>Right-click for variable properties</li>
      </ul>

      <h4>4. Properties Window</h4>
      <p>
        Shows detailed information about selected variables.
      </p>
      <ul>
        <li>Variable type (numeric, string)</li>
        <li>Format</li>
        <li>Value labels</li>
        <li>Notes and metadata</li>
      </ul>

      <h4>5. Review Window</h4>
      <p>
        Shows a history of commands you've run.
      </p>
      <ul>
        <li>Click to re-run a previous command</li>
        <li>Useful for repeating analyses</li>
        <li>Can save command history</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>The Data Editor</h3>
      <p>
        Access via toolbar or command <code>edit</code> (edit mode) or <code>browse</code> (view only).
      </p>
      <ul>
        <li>Spreadsheet view of your data</li>
        <li>Rows are observations</li>
        <li>Columns are variables</li>
        <li>Click cells to edit (in edit mode)</li>
        <li>Can sort and filter data</li>
        <li><strong>Warning:</strong> Changes are immediate - use carefully!</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Menu Bar and Toolbar</h3>

      <h4>Menus</h4>
      <ul>
        <li><strong>File</strong>: Open, save, import/export data</li>
        <li><strong>Edit</strong>: Preferences and settings</li>
        <li><strong>Data</strong>: Data manipulation, variable management</li>
        <li><strong>Statistics</strong>: All statistical analyses</li>
        <li><strong>Graphics</strong>: Create charts and plots</li>
        <li><strong>Window</strong>: Manage open windows</li>
        <li><strong>Help</strong>: Documentation and examples</li>
      </ul>

      <h4>Toolbar Icons</h4>
      <ul>
        <li>Data Editor (spreadsheet icon)</li>
        <li>Graph Editor</li>
        <li>Do-file Editor (for scripts)</li>
        <li>Viewer (for help and results)</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Do-File Editor</h3>
      <p>
        Stata's script editor for writing reusable code. Access via toolbar or <code>doedit</code> command.
      </p>
      <ul>
        <li>Write multiple commands in sequence</li>
        <li>Save as .do files for reproducibility</li>
        <li>Run entire script or selected lines</li>
        <li>Add comments with <code>//</code> or <code>/* */</code></li>
        <li>Essential for complex or repeated analyses</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Basic Command Structure</h3>
      <div class="code-block">
        <pre><code>// General format
command varlist, options

// Examples
summarize age weight height
describe
list in 1/10
tabulate gender
correlate age income</code></pre>
      </div>
    </section>

    <section class="content-section">
      <h3>Essential Commands</h3>
      <ul>
        <li><code>help command</code> - Get help on any command</li>
        <li><code>describe</code> - Describe dataset and variables</li>
        <li><code>summarize</code> - Descriptive statistics</li>
        <li><code>list</code> - View data</li>
        <li><code>clear</code> - Clear data from memory</li>
        <li><code>use filename</code> - Load a dataset</li>
        <li><code>save filename</code> - Save your dataset</li>
        <li><code>log using filename</code> - Save output to log file</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Navigation Tips</h3>
      <ul>
        <li>Use menus to learn commands, then type them for speed</li>
        <li>Press <kbd>Page Up</kbd> in Command window to recall commands</li>
        <li><kbd>Ctrl+1</kbd> focuses on Command window</li>
        <li>Right-click in Results to copy or save output</li>
        <li>Keep a do-file open to document your work</li>
        <li>Use <code>help</code> command liberally</li>
      </ul>
    </section>

    <div class="key-takeaways">
      <h3>Key Takeaways</h3>
      <ul>
        <li>Results Window shows output, Command Window for typing commands</li>
        <li>Variables Window lists your dataset variables</li>
        <li>Data Editor provides spreadsheet view (use cautiously)</li>
        <li>Do-file Editor for writing reusable scripts</li>
        <li>Can use menus or type commands directly</li>
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
