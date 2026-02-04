export const API_BASE_URL = 'http://localhost:8000';
export const API_URL = `${API_BASE_URL}/api`;
export const SANCTUM_COOKIE_URL = `${API_BASE_URL}/sanctum/csrf-cookie`;

export const API_CONFIG = {
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
}; 