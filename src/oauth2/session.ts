import axios from 'axios'
import { defineComponent, ref } from 'vue'

const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
export const isAuthenticated = ref(isAuthenticatedLocalStorage === 'true')
export const setIsAuthenticated = (value: boolean) => {
    isAuthenticated.value = value
    if (value) {
        localStorage.setItem('isAuthenticated', 'true')
    } else {
        localStorage.removeItem('isAuthenticated')
    }
}

export const name = ref('')

export const logout = async (redirect: boolean) => {
  const data = new URLSearchParams({
    client_id: 'testclient',
    id_token_hint: localStorage.getItem('idToken') ?? ''
  })

  try {
    await axios.get(
      `${import.meta.env.VITE_OAUTH2_BASE}/logout?${data.toString()}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
  } catch {
    // Do nothing
  }
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('idToken')
  localStorage.removeItem('isAuthenticated')
  if (redirect) {
    localStorage.setItem('resumeLocation', window.location.pathname)
  } else {
    localStorage.removeItem('resumeLocation')
  }
  window.location.href = oauth2LoginRedirect()
  setIsAuthenticated(false)
}

export const LoginCallback = defineComponent({
  setup() {}
})

const oauth2LoginRedirect = () => {
  return `${import.meta.env.VITE_OAUTH2_BASE}/auth?client_id=${
    import.meta.env.VITE_OAUTH2_CLIENT_ID
  }&redirect_uri=${
    window.location.origin
  }/login-callback&response_type=code&scope=openid`
}
