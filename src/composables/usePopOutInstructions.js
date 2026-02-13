import { ref } from 'vue'

/**
 * Composable for managing pop-out instruction windows
 * Allows students to open assignment/lesson instructions in a separate window
 * so they can arrange: Instructions | Jamovi | Main Browser
 */
export function usePopOutInstructions() {
  const popupWindow = ref(null)
  const isPopupOpen = ref(false)

  /**
   * Open a popup window with instruction content
   * @param {Object} options - Configuration options
   * @param {string} options.title - Window title
   * @param {string} options.content - HTML content to display
   * @param {number} options.width - Window width (default: 500)
   * @param {number} options.height - Window height (default: 600)
   */
  function openInstructions({ title = 'Instructions', content, width = 500, height = 600 }) {
    // Close existing popup if open
    if (popupWindow.value && !popupWindow.value.closed) {
      popupWindow.value.close()
    }

    // Calculate centered position
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    // Window features
    const features = [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      'menubar=no',
      'toolbar=no',
      'location=no',
      'status=no',
      'resizable=yes',
      'scrollbars=yes'
    ].join(',')

    // Open popup
    popupWindow.value = window.open('', title, features)

    if (!popupWindow.value) {
      console.error('Failed to open popup window. Please check popup blocker settings.')
      return false
    }

    // Write content to popup
    writePopupContent(popupWindow.value, title, content)

    isPopupOpen.value = true

    // Monitor popup close
    const checkInterval = setInterval(() => {
      if (popupWindow.value && popupWindow.value.closed) {
        isPopupOpen.value = false
        clearInterval(checkInterval)
      }
    }, 500)

    return true
  }

  /**
   * Write HTML content to the popup window
   */
  function writePopupContent(win, title, content) {
    // Detect current theme from parent window
    const isDarkMode = document.documentElement.classList.contains('dark')

    // Get the actual theme preference from localStorage for persistence
    let themePreference = 'light'
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') {
        themePreference = stored
      } else if (isDarkMode) {
        themePreference = 'dark'
      }
    } catch (e) {
      themePreference = isDarkMode ? 'dark' : 'light'
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en" class="${themePreference === 'dark' ? 'dark' : ''}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(title)}</title>
        <style>
          :root {
            --primary: #4f46e5;
            --primary-dark: #4338ca;
            --success: #10b981;
            --bg-primary: #ffffff;
            --bg-card: #f9fafb;
            --bg-elevated: #f3f4f6;
            --text-primary: #1f2937;
            --text-secondary: #6b7280;
            --text-muted: #9ca3af;
            --border: #e5e7eb;
            --tip-bg: #f0fdf4;
          }

          :root.dark {
            --bg-primary: #0f172a;
            --bg-card: #1e293b;
            --bg-elevated: #334155;
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
            --text-muted: #94a3b8;
            --border: #475569;
            --tip-bg: #1e3a2e;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            padding: 1.5rem;
            line-height: 1.6;
          }

          h1 {
            font-size: 1.5rem;
            color: var(--text-primary);
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid var(--primary);
          }

          h2 {
            font-size: 1.25rem;
            color: var(--text-primary);
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }

          h3 {
            font-size: 1.125rem;
            color: var(--text-primary);
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
          }

          p {
            margin-bottom: 0.75rem;
            color: var(--text-secondary);
          }

          ul, ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }

          li {
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
          }

          strong {
            color: var(--text-primary);
            font-weight: 600;
          }

          code {
            background: var(--bg-card);
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-family: 'Courier New', monospace;
            font-size: 0.875em;
            color: var(--primary);
          }

          pre {
            background: var(--bg-card);
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1rem;
            border: 1px solid var(--border);
          }

          pre code {
            background: none;
            padding: 0;
          }

          .content-box,
          .concept-box,
          .example-box,
          .tip-box {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }

          .concept-box {
            border-left: 3px solid var(--primary);
          }

          .tip-box {
            border-left: 3px solid #10b981;
          }

          .example-box {
            border-left: 3px solid #f59e0b;
          }

          img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }

          a {
            color: var(--primary);
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          /* Terminal Command Boxes */
          .terminal-command {
            position: relative;
            background: var(--bg-elevated);
            border: 1px solid var(--border);
            border-left: 3px solid var(--primary);
            border-radius: 0.5rem;
            padding: 1rem 3rem 1rem 1rem;
            margin: 1rem 0;
            font-family: 'Courier New', 'Consolas', monospace;
            font-size: 0.9375rem;
            color: var(--text-primary);
            overflow-x: auto;
            white-space: pre-wrap;
            word-break: break-all;
          }

          .terminal-command code {
            background: none;
            padding: 0;
            color: inherit;
          }

          .copy-command-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width: 2rem;
            height: 2rem;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 0.375rem;
            color: var(--text-secondary);
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
          }

          .copy-command-btn:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
          }

          .copy-command-btn.copied {
            background: #10b981;
            color: white;
            border-color: #10b981;
          }

          .close-hint {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            background: var(--bg-card);
            border: 1px solid var(--border);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            color: var(--text-muted);
          }

          @media print {
            .close-hint {
              display: none;
            }
          }
        </style>
        <script>
          // Sync theme with parent window
          function syncTheme() {
            try {
              // Method 1: Check parent window's localStorage
              let parentTheme = null
              if (window.opener) {
                try {
                  parentTheme = window.opener.localStorage.getItem('theme')
                } catch (e) {
                  // Cross-origin, try method 2
                }
              }

              // Method 2: Check parent window's document class
              if (!parentTheme && window.opener) {
                try {
                  const parentIsDark = window.opener.document.documentElement.classList.contains('dark')
                  parentTheme = parentIsDark ? 'dark' : 'light'
                } catch (e) {
                  // Cross-origin, try method 3
                }
              }

              // Method 3: Check our own localStorage (shared with parent)
              if (!parentTheme) {
                try {
                  parentTheme = localStorage.getItem('theme')
                } catch (e) {
                  // Fallback to light
                  parentTheme = 'light'
                }
              }

              // Apply the theme
              const currentIsDark = document.documentElement.classList.contains('dark')
              const shouldBeDark = parentTheme === 'dark'

              if (shouldBeDark !== currentIsDark) {
                if (shouldBeDark) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              }
            } catch (e) {
              console.error('Theme sync error:', e)
            }
          }

          // Sync immediately on load
          syncTheme()

          // Sync every 500ms for responsive updates
          setInterval(syncTheme, 500)

          // Also listen for storage events (works for different tabs)
          window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
              syncTheme()
            }
          })

          // Listen for focus events to sync when window is activated
          window.addEventListener('focus', syncTheme)

          // Attach copy buttons to terminal commands
          function attachCopyButtons() {
            const commandBoxes = document.querySelectorAll('.terminal-command:not(.has-copy-btn)')

            commandBoxes.forEach(box => {
              // Mark as processed
              box.classList.add('has-copy-btn')

              // Create copy button
              const copyBtn = document.createElement('button')
              copyBtn.className = 'copy-command-btn'
              copyBtn.innerHTML = '📋'
              copyBtn.title = 'Copy command'

              // Get the command text
              const command = box.getAttribute('data-command') || box.textContent.trim()

              // Copy functionality
              copyBtn.addEventListener('click', async (e) => {
                e.preventDefault()
                e.stopPropagation()

                try {
                  await navigator.clipboard.writeText(command)

                  // Visual feedback
                  copyBtn.innerHTML = '✓'
                  copyBtn.classList.add('copied')

                  setTimeout(() => {
                    copyBtn.innerHTML = '📋'
                    copyBtn.classList.remove('copied')
                  }, 2000)
                } catch (err) {
                  console.error('Failed to copy:', err)
                  copyBtn.innerHTML = '✗'
                  setTimeout(() => {
                    copyBtn.innerHTML = '📋'
                  }, 2000)
                }
              })

              // Add button to box
              box.appendChild(copyBtn)
            })
          }

          // Attach copy buttons when DOM is ready
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', attachCopyButtons)
          } else {
            attachCopyButtons()
          }
        </script>
      </head>
      <body>
        <div class="instructions-content">
          ${content}
        </div>
        <div class="close-hint">
          💡 Keep this window open while completing your assignment
        </div>
      </body>
      </html>
    `

    win.document.open()
    win.document.write(html)
    win.document.close()
  }

  /**
   * Close the popup window
   */
  function closeInstructions() {
    if (popupWindow.value && !popupWindow.value.closed) {
      popupWindow.value.close()
      isPopupOpen.value = false
    }
  }

  /**
   * Check if popup is currently open
   */
  function checkPopupStatus() {
    if (popupWindow.value) {
      isPopupOpen.value = !popupWindow.value.closed
    }
    return isPopupOpen.value
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  return {
    popupWindow,
    isPopupOpen,
    openInstructions,
    closeInstructions,
    checkPopupStatus
  }
}
