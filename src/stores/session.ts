import { defineStore } from 'pinia'
import { oauth2LoginRedirect } from '../helpers/helpers'
import type { RouteLocationNormalized } from 'vue-router'
import router from '@/router'
import { jwtDecode, type JwtPayload } from 'jwt-decode'

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

            const response = await fetch(`${import.meta.env.VITE_OAUTH2_BASE}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data
            })
            const json = await response.json()
            if (response.ok) {
                this.isAuthenticated = true
                interface IdToken extends JwtPayload {
                    name: string
                }
                const jwt = jwtDecode<IdToken>(json.id_token)
                this.name = jwt.name

                if (this.resumeLocation) {
                    router.replace(this.resumeLocation)
                } else {
                    router.replace('/')
                }
            } else {
                this.isAuthenticated = false
            }

        },
        logout() {
            this.resumeLocation = null
            this.isAuthenticated = false
            window.location.href = `${import.meta.env.VITE_OAUTH2_BASE}/logout`
        }
    }
})