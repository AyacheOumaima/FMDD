import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Intercepteur pour gérer les erreurs
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 419) {
            // Erreur CSRF, recharger la page pour obtenir un nouveau token
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default instance; 