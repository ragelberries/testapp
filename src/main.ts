import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vueKeycloak } from '@baloise/vue-keycloak'

const app = createApp(App)

app.use(router)

app.use(vueKeycloak, {
  initOptions: {
    flow: 'standard', // default
    checkLoginIframe: false, // default
    onLoad: 'login-required', // default
  },
  config: {
    url: 'https://keycloak.ragelberries.net/auth',
    realm: 'minrealm',
    clientId: 'api'
  }
})

app.mount('#app')
