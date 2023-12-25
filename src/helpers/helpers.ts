export const oauth2LoginRedirect = () => {
    return `${import.meta.env.VITE_OAUTH2_BASE}/auth?client_id=${import.meta.env.VITE_OAUTH2_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_BASE_URL}/login-callback&response_type=code`
}