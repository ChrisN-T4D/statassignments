import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import { useAuth } from './composables/useAuth'

const app = createApp(App)
app.use(router)

// Initialize auth before mounting (with fallback to mount anyway on error)
const { initAuth } = useAuth()
initAuth()
  .catch(err => {
    console.warn('Auth initialization failed:', err)
  })
  .finally(() => {
    app.mount('#app')
  })
