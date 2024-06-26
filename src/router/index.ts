import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AboutView',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'CreateNewsletter',
          name: 'CreateNewsletter',
          component: () => import('../components/CreateNewsletter.vue')
        },
        {
          path: 'NewsletterDashboard',
          name: 'NewsletterDashboard',
          component: () => import('../components/NewsletterDashboard.vue')
        },
        {
          path: 'LaunchNewsletter',
          name: 'LaunchNewsletter',
          component: () => import('../components/LaunchNewsletter.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.name !== 'login' && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})
export default router
