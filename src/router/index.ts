import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Comp from '../components/Comp.vue'


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
  ]
})

export default router
