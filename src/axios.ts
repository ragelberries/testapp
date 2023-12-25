import axios, { type AxiosInstance } from 'axios'

const $axios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})
$axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // console.log("request error", error);
        return Promise.reject(error);
    }
);

export default $axios
