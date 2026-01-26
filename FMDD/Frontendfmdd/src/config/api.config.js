export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
// ✅ RESTORED THIS EXPORT (Required by AProposPage.jsx)
export const API_URL = `${API_BASE_URL}/api/v1`; 

export const SANCTUM_COOKIE_URL = `${API_BASE_URL}/sanctum/csrf-cookie`;

// Helper for route definitions below
const API_PREFIX = '/api/v1'; 

export const API_CONFIG = {
    // ✅ Keep this at ROOT so Login/Sanctum works
    baseURL: API_BASE_URL, 
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

// export const API_CONFIG = {
//     // ✅ MODIFICATION : Ajoutez /api à la fin
//     baseURL: `${API_BASE_URL}/api`, 
//     withCredentials: true,
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest'
//     }
// };

export const API_ROUTES = {
    // ✅ AUTH (Root Level)
    login: '/login',
    logout: '/logout',
    register: '/register',
    
    // ✅ DATA (API Level - uses /api/v1 prefix)
    // Adjust '/me' if your backend uses '/api/user'
    me: `${API_PREFIX}/me`, 

    events: {
        index:`${API_PREFIX}/events`,
        show: (id) => `${API_PREFIX}/events/${id}`,
        register: (id) => `${API_PREFIX}/events/${id}/register`,
        myRegistrations: () => `${API_PREFIX}/events/my/registrations`
    },
    projets: {
        index: () => `${API_PREFIX}/projets`,
        show: (id) => `${API_PREFIX}/projets/${id}`,
        benevolat: (id) => `${API_PREFIX}/projets/${id}/benevolat`,
        sponsoring: (id) => `${API_PREFIX}/projets/${id}/sponsoring`,
        partenariat: (id) => `${API_PREFIX}/projets/${id}/partenariat`
    },
    paiements: {
        create: `${API_PREFIX}/paiements`,
        verify: (id) => `${API_PREFIX}/paiements/verify/${id}`
    }
};