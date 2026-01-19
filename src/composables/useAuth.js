import { ref, computed } from 'vue'
import { pb } from '../lib/pocketbase'

const user = ref(pb.authStore.record)
const loading = ref(false)
const initialized = ref(false)
const authError = ref(null)

// Debug logging helper (can be disabled in production)
const DEBUG_AUTH = import.meta.env.DEV

function logAuth(action, data = null) {
  if (DEBUG_AUTH) {
    console.log(`[Auth] ${action}`, data || '')
  }
}

// Listen for auth changes
pb.authStore.onChange((token, record) => {
  logAuth('Auth state changed', { hasToken: !!token, hasRecord: !!record, userId: record?.id })
  user.value = record
})

export function useAuth() {
  const isAuthenticated = computed(() => pb.authStore.isValid)

  // Initialize auth state on app startup
  // Validates persisted auth and optionally refreshes token
  async function initAuth() {
    if (initialized.value) return

    loading.value = true
    authError.value = null
    logAuth('Initializing auth...')

    try {
      // Check if we have a stored auth token
      const hasStoredAuth = pb.authStore.token
      logAuth('Stored auth check', { hasToken: !!hasStoredAuth, isValid: pb.authStore.isValid })

      if (pb.authStore.isValid) {
        // Refresh the token to ensure it's still valid on the server
        // Use a timeout to avoid hanging if server is unreachable
        try {
          logAuth('Refreshing auth token...')
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Auth refresh timeout')), 5000)
          )
          const refreshed = await Promise.race([
            pb.collection('users').authRefresh(),
            timeoutPromise
          ])
          logAuth('Auth refresh successful', { userId: refreshed.record?.id, role: refreshed.record?.role })
        } catch (err) {
          // Token refresh failed
          logAuth('Auth refresh failed', { error: err.message, status: err.status })
          // Only clear auth if it's an actual auth error, not a network timeout
          if (err.status === 401 || err.status === 403) {
            authError.value = 'Session expired. Please sign in again.'
            pb.authStore.clear()
          } else {
            // Network error - keep existing auth, user can try again
            logAuth('Network error during refresh, keeping existing auth')
          }
        }
      } else if (hasStoredAuth) {
        // Had a token but it's not valid
        logAuth('Stored token is invalid, clearing')
        pb.authStore.clear()
      }
    } catch (err) {
      logAuth('Init auth error', err)
      authError.value = 'Failed to initialize authentication.'
    } finally {
      loading.value = false
      initialized.value = true
      logAuth('Auth initialized', { isAuthenticated: pb.authStore.isValid, userId: user.value?.id })
    }
  }

  async function signUp(email, password, fullName) {
    loading.value = true
    authError.value = null
    logAuth('Signing up...', { email })

    try {
      const data = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name: fullName
      })
      logAuth('Signup successful', { userId: data.id })

      // Auto login after signup
      await signIn(email, password)
      return { data, error: null }
    } catch (err) {
      logAuth('Signup failed', { error: err.message, data: err.data })
      const errorMessage = parseAuthError(err)
      authError.value = errorMessage
      return { data: null, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  async function signIn(email, password) {
    loading.value = true
    authError.value = null
    logAuth('Signing in...', { email })

    try {
      const authData = await pb.collection('users').authWithPassword(email, password)
      logAuth('Sign in successful', { userId: authData.record?.id, role: authData.record?.role })
      return { data: authData, error: null }
    } catch (err) {
      logAuth('Sign in failed', { error: err.message, status: err.status })
      const errorMessage = parseAuthError(err)
      authError.value = errorMessage
      return { data: null, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  function signOut() {
    logAuth('Signing out...')
    pb.authStore.clear()
    authError.value = null
    logAuth('Signed out')
  }

  async function resetPassword(email) {
    loading.value = true
    authError.value = null
    logAuth('Requesting password reset...', { email })

    try {
      await pb.collection('users').requestPasswordReset(email)
      logAuth('Password reset email sent')
      return { success: true, error: null }
    } catch (err) {
      logAuth('Password reset failed', { error: err.message })
      const errorMessage = parseAuthError(err)
      authError.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Parse PocketBase errors into user-friendly messages
  function parseAuthError(err) {
    if (err.status === 400) {
      if (err.data?.data?.email) {
        return 'Invalid email address or email already in use.'
      }
      if (err.data?.data?.password) {
        return 'Password must be at least 8 characters.'
      }
      return 'Invalid credentials. Please check your email and password.'
    }
    if (err.status === 401) {
      return 'Invalid email or password.'
    }
    if (err.status === 403) {
      return 'Access denied. Your account may be disabled.'
    }
    if (err.status === 404) {
      return 'Account not found. Please check your email or sign up.'
    }
    if (err.status === 0 || err.message?.includes('fetch')) {
      return 'Unable to connect to server. Please check your internet connection.'
    }
    return err.message || 'An unexpected error occurred. Please try again.'
  }

  // Clear any auth errors
  function clearError() {
    authError.value = null
  }

  return {
    user,
    loading,
    isAuthenticated,
    initialized,
    authError,
    initAuth,
    signUp,
    signIn,
    signOut,
    resetPassword,
    clearError
  }
}
