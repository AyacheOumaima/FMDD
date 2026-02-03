import axios from 'axios';
import { API_URL, SANCTUM_COOKIE_URL, API_CONFIG } from '../config/api.config';

console.log('Initialisation du CSRF...');

// Configuration de base
const api = axios.create({
    baseURL: API_URL,
    ...API_CONFIG
});

// Intercepteur pour les requêtes
api.interceptors.request.use(config => {
    if (config.method === 'get') {
        return config;
    }
    
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
});

// Intercepteur pour gérer les erreurs CSRF
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.config.method !== 'get' && 
            (error.response?.status === 419 || error.response?.status === 401)) {
            console.log('Erreur CSRF détectée, tentative de récupération d\'un nouveau token...');
            try {
                await axios.get(SANCTUM_COOKIE_URL, API_CONFIG);
                console.log('Nouveau token CSRF récupéré, réessai de la requête...');
                return api(error.config);
            } catch (retryError) {
                console.error('Échec de la récupération du token CSRF:', retryError);
                return Promise.reject(retryError);
            }
        }
        return Promise.reject(error);
    }
);

// Fonction d'initialisation
export const initializeApi = async () => {
    try {
        await axios.get(SANCTUM_COOKIE_URL, API_CONFIG);
        console.log('Token CSRF initial récupéré avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation CSRF:', error);
        throw error; // Propager l'erreur pour la gestion en amont
    }
};

export default api; 