import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import WeatherForecast from '../components/WeatherForecast.vue'
import { isAuthenticated, logout } from '@/oauth2/session'
import LoginCallbackPage from '@/oauth2/LoginCallbackPage.vue'
import LogoutPage from '@/oauth2/LogoutPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/comp',
      name: 'comp',
      component: WeatherForecast
    },
    {
      path: '/login-callback',
      name: 'login-callback',
      component: LoginCallbackPage
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutPage
    }
  ]
})

router.beforeEach(async (to, _) => {
  if (
    to.name != 'logout' &&
    to.name != 'login-callback' &&
    !isAuthenticated.value
  ) {
    await logout(true)
  }
})

export default router
