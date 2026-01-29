import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import { useAuth } from './composables/useAuth'

const app = createApp(App)
app.use(router)

// Initialize auth before mounting
const { initAuth } = useAuth()
initAuth()
  .then(() => {
    app.mount('#app')
  })
  .catch(err => {
    console.warn('Auth initialization failed:', err)
    // Mount anyway on error
    app.mount('#app')
  })
