import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Comp from '../components/Comp.vue'
import LoginCallback from '../components/LoginCallback.vue'
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



export default router
