import { createRouter, createWebHistory } from 'vue-router'
import { pb } from '../lib/pocketbase'
import { useAuth } from '../composables/useAuth'

// Import views
import Home from '../views/Home.vue'
import TopicView from '../views/TopicView.vue'
import Auth from '../views/Auth.vue'
import Practice from '../views/Practice.vue'
import SoftwarePractice from '../views/SoftwarePractice.vue'
import Profile from '../views/Profile.vue'
import ClaimProfile from '../views/ClaimProfile.vue'
import InstructorDashboard from '../views/InstructorDashboard.vue'
import ClassHome from '../views/ClassHome.vue'
import SoftwareLesson from '../views/SoftwareLesson.vue'
import BKTTester from '../components/BKTTester.vue'
import Admin from '../views/Admin.vue'
import RoleChecker from '../views/RoleChecker.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
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
    path: '/lesson/:lessonId',
    name: 'lesson',
    component: SoftwareLesson,
    props: true
  },
  {
    path: '/class/:classId/lesson/:lessonId',
    name: 'class-lesson',
    component: SoftwareLesson,
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
  },
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/bkt-tester',
    component: BKTTester,
    meta: { requiresAuth: true }
  },
  {
    path: '/role-checker',
    component: RoleChecker,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
const { user: authUser } = useAuth()

router.beforeEach((to, from, next) => {
  const isAuthenticated = pb.authStore.isValid
  const userRole = authUser.value?.role

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth')
    return
  }

  // Check if route requires admin role
  if (to.meta.requiresAdmin && userRole !== 'admin') {
    next('/')
    return
  }

  // Check if route requires instructor role
  if (to.meta.requiresInstructor && userRole !== 'instructor') {
    next('/')
    return
  }

  // Redirect authenticated users away from auth page
  if (to.path === '/auth' && isAuthenticated) {
    if (userRole === 'admin') {
      next('/admin')
    } else if (userRole === 'instructor') {
      next('/instructor')
    } else {
      next('/')
    }
    return
  }

  next()
})

export default router
