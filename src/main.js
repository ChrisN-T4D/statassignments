import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'
import { pb } from './lib/pocketbase'
import { useAuth } from './composables/useAuth'

// Import views
import Home from './views/Home.vue'
import TopicView from './views/TopicView.vue'
import Auth from './views/Auth.vue'
import Practice from './views/Practice.vue'
import SoftwarePractice from './views/SoftwarePractice.vue'
import Profile from './views/Profile.vue'
import ClaimProfile from './views/ClaimProfile.vue'
import InstructorDashboard from './views/InstructorDashboard.vue'
import ClassHome from './views/ClassHome.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/topic/:id', component: TopicView, props: true },
  { path: '/auth', component: Auth },
  { path: '/practice', component: Practice },
  { path: '/practice/:topicId', component: Practice, props: true },
  { path: '/software-practice/:topicId', component: SoftwarePractice, props: true },
  // Class routes
  {
    path: '/class/:classId',
    name: 'class-home',
    component: ClassHome,
    props: true
  },
  {
    path: '/class/:classId/topics',
    name: 'class-topics',
    component: Home, // Reuse Home with class filter for now
    props: true
  },
  {
    path: '/class/:classId/practice',
    name: 'class-practice',
    component: Practice,
    props: true
  },
  {
    path: '/class/:classId/software',
    name: 'class-software',
    component: SoftwarePractice,
    props: true
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/claim',
    component: ClaimProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/instructor',
    component: InstructorDashboard,
    meta: { requiresAuth: true, requiresInstructor: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = pb.authStore.isValid
  const userRole = pb.authStore.record?.role

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth')
    return
  }

  // Check if route requires instructor role
  if (to.meta.requiresInstructor && userRole !== 'instructor') {
    next('/')
    return
  }

  // Redirect authenticated users away from auth page
  if (to.path === '/auth' && isAuthenticated) {
    if (userRole === 'instructor') {
      next('/instructor')
    } else {
      next('/')
    }
    return
  }

  next()
})

const app = createApp(App)
app.use(router)

// Initialize auth before mounting
const { initAuth } = useAuth()
initAuth().then(() => {
  app.mount('#app')
})
