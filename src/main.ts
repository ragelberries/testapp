import { createApp } from 'vue'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
