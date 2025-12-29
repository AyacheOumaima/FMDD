import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', global: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = { email: '', password: '', global: '' };
    let valid = true;

    if (!email) {
      newErrors.email = "L'email est requis";
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrors({ email: '', password: '', global: '' });
    setLoading(true);

    try {
      console.log('Tentative de connexion avec:', { email });
      
      // ✅ Now this will Throw an error if login fails
      await login({ email, password });
      
      // This line is only reached if login is successful
      toast.success('Connexion réussie !');

    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      const errorMessage = error.response?.status === 401
        ? 'Identifiants incorrects. Veuillez réessayer.'
        : 'Une erreur est survenue lors de la connexion';

      setErrors(prev => ({ ...prev, global: errorMessage }));
      
      if (error.response?.status !== 401) {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-6 md:p-8 rounded-lg shadow-md">
          <div>
            <h1 className="text-center text-3xl font-bold text-blue-950">Connexion</h1>
            <p className="mt-2 text-center text-gray-600">
              Accédez à votre espace personnel
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  className={`w-full border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="exemple@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className={`w-full border p-2 rounded pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Chargement...' : 'Se connecter'}
              </button>

              {errors.global && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-center">
                  {errors.global}
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Vous n'avez pas de compte ? <Link to="/signup" className="text-blue-500 hover:text-blue-800">Créer un compte</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default LoginPage;