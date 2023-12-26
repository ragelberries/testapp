import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Comp from '../components/Comp.vue'
import { LoginCallback, isAuthenticated } from '@/oauth2'
import { oauth2LoginRedirect } from '@/helpers/helpers'
import Logout from '../components/Logout.vue'

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
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        }
    ]
})

router.beforeEach((to, from) => {
    if (to.name != 'login-callback' && !isAuthenticated.value) {
        localStorage.setItem('resumeLocation', to.fullPath)
        window.location.href = oauth2LoginRedirect()
    }
})



export default router
