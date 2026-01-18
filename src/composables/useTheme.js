import { ref, watch } from 'vue'

// Theme state (reactive)
const theme = ref(getInitialTheme())

// Get initial theme from localStorage or default to dark
function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  return localStorage.getItem('theme') || 'dark'
}

// Apply theme to document
function applyTheme(newTheme) {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}

// Watch for changes and apply
watch(theme, (newTheme) => {
  applyTheme(newTheme)
}, { immediate: true })

export function useTheme() {
  const isDark = ref(theme.value === 'dark')

  // Keep isDark in sync with theme
  watch(theme, (newTheme) => {
    isDark.value = newTheme === 'dark'
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function setTheme(newTheme) {
    if (newTheme === 'dark' || newTheme === 'light') {
      theme.value = newTheme
    }
  }

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme
  }
}
