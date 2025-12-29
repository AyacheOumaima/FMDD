import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import api from '../axios'; // Ensure this points to the file above
import { Navigate } from 'react-router-dom';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  login: () => Promise.resolve(false),
  logout: () => {},
  clearError: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Ref to prevent double-fetching in React StrictMode
  const mountedRef = useRef(true);

  // 1. Fetch User (Check Session)
  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get('/api/v1/me'); // Ensure route matches Laravel (usually /api/user)
      
      const userData = response.data.user || response.data.data || response.data;
      
      if (mountedRef.current) {
        if (userData && (userData.id || userData.email)) {
          console.log('✅ Utilisateur authentifié:', userData.email || userData.name);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
            // Data returned but no valid user object found
            setUser(null);
            setIsAuthenticated(false);
        }
      }
    } catch (error) {
      if (mountedRef.current) {
        // 401 is expected if not logged in; don't log as "Error"
        if (error.response && error.response.status === 401) {
            console.log('ℹ️ Visiteur non connecté (401)');
        } else {
            console.warn('⚠️ Erreur fetchUser:', error.message);
        }
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // 2. Initial Load
  useEffect(() => {
    mountedRef.current = true;
    fetchUser();
    return () => { mountedRef.current = false; };
  }, [fetchUser]);

  // 3. Login Function (FIXED)
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      // ➤ CRITICAL: Initialize CSRF protection before logging in
      console.log('🍪 Initialisation CSRF...');
      await api.get('/sanctum/csrf-cookie');

      console.log('🔐 Envoi des identifiants...');
      const response = await api.post('/api/v1/login', credentials);

      const userPayload = response.data.user || response.data.data?.user || response.data;

      if (userPayload) {
        setUser(userPayload);
        setIsAuthenticated(true);
        return true;
      } else {
        // If login succeeded but no user data returned, fetch it manually
        await fetchUser();
        return true;
      }
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      const msg = error.response?.data?.message || 'Identifiants incorrects ou erreur serveur.';
      setError(msg);
      throw error; 
    } finally {
      setLoading(false);
    }
  }, [fetchUser]);

  // 4. Logout Function
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await api.post('/api/v1/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    } finally {
      setLoading(false);
      // Optional: Clear local storage if you used it
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth outside AuthProvider');
  return context;
};

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
             Chargement...
        </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && user) {
    const userRole = user.role || user.roles?.[0]; // Handle different role structures
    if (!allowedRoles.includes(userRole) && userRole !== 'super_admin') {
         // Redirect to a "Not Authorized" page or home
         return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default AuthContext;