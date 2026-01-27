

  import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { Navigate } from 'react-router-dom';
import api from '../axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Prevent double fetch in StrictMode
  const mountedRef = useRef(true);

  /* ============================
     1. FETCH USER (SESSION CHECK)
  ============================ */
  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get('/api/v1/me');

      const userData = res.data.user || res.data.data || res.data;

      if (mountedRef.current && userData?.id) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      if (mountedRef.current) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  /* ============================
     2. INITIAL LOAD
  ============================ */
  useEffect(() => {
    mountedRef.current = true;
    fetchUser();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchUser]);

  /* ============================
     3. LOGIN
  ============================ */
  const login = useCallback(
    async (credentials) => {
      try {
        setLoading(true);
        setError(null);

        // CSRF required for Sanctum
        await api.get('/sanctum/csrf-cookie');

        const res = await api.post('/api/v1/login', credentials);
        const userData =
          res.data.user || res.data.data?.user || res.data;

        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          await fetchUser();
        }

        return true;
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          'Erreur de connexion.';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchUser]
  );

  /* ============================
     4. LOGOUT
  ============================ */
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await api.post('/api/v1/logout');
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('ACCESS_TOKEN');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ============================
     5. UPDATE USER (🔥 IMPORTANT)
  ============================ */
  const updateUser = useCallback((newUser) => {
    setUser(newUser);
    setIsAuthenticated(true);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  /* ============================
     CONTEXT VALUE
  ============================ */
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    updateUser, // ✅ الحل ديال الفورم
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* ============================
   USE AUTH HOOK
============================ */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};

/* ============================
   PROTECTED ROUTE
============================ */
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Chargement...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && user) {
    const role = user.role || user.roles?.[0];
    if (!allowedRoles.includes(role) && role !== 'super_admin') {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default AuthContext;
