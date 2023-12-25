import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Comp from '../components/Comp.vue'
import LoginCallback from '../components/LoginCallback.vue'
import { oauth2LoginRedirect } from '../helpers/helpers'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/comp',
            name: 'comp',
            component: Comp
        },
        {
            path: '/login-callback',
            name: 'login-callback',
            component: LoginCallback
        }
    ]
})
router.beforeEach((to, from) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') ?? "false")
    if (!isAuthenticated && to.name != 'login-callback') {
        const toRaw = to.name?.toString()
        if (toRaw) {
            localStorage.setItem('state', toRaw)
        } else {
            localStorage.removeItem('state')
        }
        window.location.href = oauth2LoginRedirect()
    }
})

export default router
