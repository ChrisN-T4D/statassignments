import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

// Import views
import Home from './views/Home.vue'
import TopicView from './views/TopicView.vue'
import Auth from './views/Auth.vue'
import Practice from './views/Practice.vue'
import Profile from './views/Profile.vue'
import ClaimProfile from './views/ClaimProfile.vue'
import InstructorDashboard from './views/InstructorDashboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/topic/:id', component: TopicView, props: true },
  { path: '/auth', component: Auth },
  { path: '/practice', component: Practice },
  { path: '/practice/:topicId', component: Practice, props: true },
  { path: '/profile', component: Profile },
  { path: '/claim', component: ClaimProfile },
  { path: '/instructor', component: InstructorDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
