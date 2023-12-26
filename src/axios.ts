import axios, { type AxiosInstance } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useSessionStore } from '@/stores/session'
import { jwtDecode, type JwtPayload } from 'jwt-decode';

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
        return Promise.reject(error);
    }
);

const refreshAuthLogic = async (failedRequest: any) => {
    const sessionStore = useSessionStore()
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken)
        return false

    const data = new URLSearchParams({
        client_id: 'testclient',
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
    })
    const response = await axios.post(`${import.meta.env.VITE_OAUTH2_BASE}/token`, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    sessionStore.isAuthenticated = true
    localStorage.setItem('accessToken', response.data.access_token)
    localStorage.setItem('idToken', response.data.id_token)
    localStorage.setItem('refreshToken', response.data.refresh_token)
    interface IdToken extends JwtPayload {
        name: string
    }
    const jwt = jwtDecode<IdToken>(response.data.id_token)
    sessionStore.name = jwt.name
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
}

// Instantiate the interceptor
createAuthRefreshInterceptor(apiClient, refreshAuthLogic);
apiClient.interceptors.response.use(response => response, error => {
    if (error.config.url === import.meta.env.VITE_OAUTH2_BASE + '/token' &&
        error.response && error.response.status === 400) {
            useSessionStore().logout()
        }
})


export default apiClient

