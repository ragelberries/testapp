import axios from 'axios'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

export let isAuthenticated = ref(false)
export let name = ref('')

export const logout = async () => {
    const data = new URLSearchParams({
        client_id: 'testclient',
        id_token_hint: localStorage.getItem('idToken') ?? '',
    })

    try {
        const response = await axios.get(`${import.meta.env.VITE_OAUTH2_BASE}/logout?${data.toString()}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
    } catch {
        // Do nothing
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('idToken')
    window.location.href = '/'
    isAuthenticated.value = false
}

export const LoginCallback = defineComponent({
    setup() {
        onMounted(async () => {
            const route = useRoute()
            const data = new URLSearchParams({
                client_id: 'testclient',
                redirect_uri: `${window.location.origin}/login-callback`,
                code: route.query.code as string,
                grant_type: 'authorization_code'
            })

            try {
                const response = await axios.post(`${import.meta.env.VITE_OAUTH2_BASE}/token`, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                isAuthenticated.value = true
                localStorage.setItem('accessToken', response.data.access_token)
                localStorage.setItem('idToken', response.data.id_token)
                localStorage.setItem('refreshToken', response.data.refresh_token)
                interface IdToken extends JwtPayload {
                    name: string
                }
                const jwt = jwtDecode<IdToken>(response.data.id_token)
                name.value = jwt.name

                const resumeLocation = localStorage.getItem('resumeLocation')
                if (resumeLocation) {
                    router.replace(resumeLocation)

                } else {
                    router.replace('/')
                }
            } catch (e) {
                isAuthenticated.value = false
            }
        })
    }
})