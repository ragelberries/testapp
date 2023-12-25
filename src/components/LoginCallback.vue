<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router/index'
import { oauth2LoginRedirect } from '../helpers/helpers'

onMounted(async () => {
    const route = useRoute()
    const data = new URLSearchParams({
        'client_id': 'testclient',
        'redirect_uri': `${import.meta.env.VITE_BASE_URL}/login-callback`,
        'code': route.query.code as string,
        'grant_type': 'authorization_code'
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
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('accessToken', json.access_token)
        localStorage.setItem('refreshToken', json.refresh_token)
        const state = localStorage.getItem('state')
        if (state) {
            router.replace(state)
        } else {
            router.replace('/')
        }
    } else {
        localStorage.setItem('isAuthenticated', 'false')
        window.location.href = oauth2LoginRedirect()
    }
})
</script>
<template></template>