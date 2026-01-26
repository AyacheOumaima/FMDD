import axios from 'axios';

console.log('Initialisation du CSRF...');

// Configuration de base
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Intercepteur pour ajouter le token CSRF à chaque requête
api.interceptors.request.use(config => {
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
        if (error.response?.status === 419) {
            console.log('Erreur CSRF détectée, tentative de récupération d\'un nouveau token...');
            try {
                // Si erreur CSRF, récupérer un nouveau token
                await axios.get('http://localhost:8000/sanctum/csrf-cookie', { 
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                console.log('Nouveau token CSRF récupéré, réessai de la requête...');
                // Réessayer la requête originale
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
        // Récupérer le cookie CSRF au démarrage
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', { 
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        console.log('Token CSRF initial récupéré avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation CSRF:', error);
    }
};

export default api; 