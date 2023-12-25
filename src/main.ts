import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import App from './App.vue'
import router from './router'
import { useSessionStore } from '@/stores/session'
import './assets/main.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
app.use(pinia)
const sessionStore = useSessionStore()

router.beforeEach((to, from) => {
    console.log(sessionStore.isAuthenticated)
    if (!sessionStore.isAuthenticated && to.name != 'login-callback') {
        const resumeLocation = to
        sessionStore.loginRedirect(resumeLocation)
    }
})

app.use(router)

app.mount('#app')
