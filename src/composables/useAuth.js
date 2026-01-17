import { ref, computed } from 'vue'
import { pb } from '../lib/pocketbase'

const user = ref(pb.authStore.model)
const loading = ref(false)

// Listen for auth changes
pb.authStore.onChange((token, model) => {
  user.value = model
})

export function useAuth() {
  const isAuthenticated = computed(() => pb.authStore.isValid)

  async function signUp(email, password, fullName) {
    loading.value = true
    try {
      const data = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name: fullName
      })
      // Auto login after signup
      await signIn(email, password)
      return data
    } finally {
      loading.value = false
    }
  }

  async function signIn(email, password) {
    loading.value = true
    try {
      const authData = await pb.collection('users').authWithPassword(email, password)
      return authData
    } finally {
      loading.value = false
    }
  }

  function signOut() {
    pb.authStore.clear()
  }

  async function resetPassword(email) {
    await pb.collection('users').requestPasswordReset(email)
  }

  return {
    user,
    loading,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    resetPassword
  }
}
