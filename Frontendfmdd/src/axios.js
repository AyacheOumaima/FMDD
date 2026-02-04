import axios from 'axios';
import { SANCTUM_COOKIE_URL, API_CONFIG } from './config/api.config';


// 1. Create the main instance
const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    withCredentials: true, // ESSENTIAL for Cookies/Sanctum
    headers: {
        ...API_CONFIG.headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    // Axios automatically looks for this cookie and adds it to the header
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withXSRFToken: true,
    timeout: 30000
});

// 2. Request Interceptor
api.interceptors.request.use((config) => {
    // Optional: If you ever switch to Bearer tokens in localStorage, this handles it.
    // If you strictly use Cookies, this block does no harm.
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 3. Response Interceptor (Handle 401/419)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (!originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        // Handle 419 (CSRF Token Mismatch) - Laravel specific
        if (error.response?.status === 419) {
            console.warn('🔄 Token CSRF expiré (419). Tentative de rafraîchissement...');
            originalRequest._retry = true;

            try {
                // Refresh the cookie
                await axios.get(SANCTUM_COOKIE_URL, { withCredentials: true });
                // Retry the original request
                return api(originalRequest);
            } catch (csrfError) {
                console.error('❌ Échec du rafraîchissement CSRF', csrfError);
                return Promise.reject(csrfError);
            }
        }

        // Handle 401 (Unauthorized) - User session expired
        if (error.response?.status === 401) {
             // You can optionally force a logout here if you want
             // localStorage.removeItem('ACCESS_TOKEN');
             // window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;

