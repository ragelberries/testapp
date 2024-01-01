import axios, { type AxiosInstance } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { logout } from './session'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = localStorage.getItem('refreshToken')

  const data = new URLSearchParams({
    client_id: 'testclient',
    refresh_token: refreshToken ?? '',
    grant_type: 'refresh_token'
  })
  try {
    const response = await axios.post(`${import.meta.env.VITE_OAUTH2_BASE}/token`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    localStorage.setItem('accessToken', response.data.access_token)
    localStorage.setItem('refreshToken', response.data.refresh_token)
    failedRequest.response.config.headers['Authorization'] =
      'Bearer ' + response.data.access_token
  } catch {
    await logout(true)
  }
}

createAuthRefreshInterceptor(apiClient, refreshAuthLogic)

export default apiClient
