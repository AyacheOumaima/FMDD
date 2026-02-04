import axios from 'axios';

// Configuration de base d'axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true; // Important pour les cookies

// Récupérer le token CSRF du cookie
const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = decodeURIComponent(token.split('=')[1]);
}

export default axios; 