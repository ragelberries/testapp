import { defineStore } from 'pinia'
import { oauth2LoginRedirect } from '../helpers/helpers'
import type { RouteLocationNormalized } from 'vue-router'
import router from '@/router'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import axios from 'axios'

export const useSessionStore = defineStore('session', {
    persist: true,
    state: () => ({
        isAuthenticated: false,
        name: 'Not logged in',
        resumeLocation: null as RouteLocationNormalized | null
    }),
    actions: {
        loginRedirect(resumeLocation: RouteLocationNormalized) {
            this.resumeLocation = resumeLocation
            window.location.href = oauth2LoginRedirect()
        },
        async loginCallback(code: string) {
            const data = new URLSearchParams({
                client_id: 'testclient',
                redirect_uri: `${import.meta.env.VITE_BASE_URL}/login-callback`,
                code: code,
                grant_type: 'authorization_code'
            })

            try {
                const response = await axios.post(`${import.meta.env.VITE_OAUTH2_BASE}/token`, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
                this.isAuthenticated = true
                localStorage.setItem('accessToken', response.data.access_token)
                localStorage.setItem('idToken', response.data.id_token)
                localStorage.setItem('refreshToken', response.data.refresh_token)
                interface IdToken extends JwtPayload {
                    name: string
                }
                const jwt = jwtDecode<IdToken>(response.data.id_token)
                this.name = jwt.name

                if (this.resumeLocation) {
                    router.replace(this.resumeLocation)
                } else {
                    router.replace('/')
                }
            } catch {
                this.isAuthenticated = false
            }

        },
        logout() {
            this.resumeLocation = null
            this.isAuthenticated = false
            localStorage.removeItem('accessToken')
            localStorage.removeItem('idToken')
            localStorage.removeItem('refreshToken')
            window.location.href = `${import.meta.env.VITE_OAUTH2_BASE}/logout`
        },
        refresh() {

        }
    }
})