import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

// Utilisateur simulé
const fakeUser = {
  email: 'Leila@gmail.com',
  password: '123',
  role: 'admin'
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation des champs
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "L'email est requis";
    if (!password) newErrors.password = "Le mot de passe est requis";
    return newErrors;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Authentification simulée (insensible à la casse)
    if (
      email.trim().toLowerCase() === fakeUser.email.toLowerCase() &&
      password === fakeUser.password
    ) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      setErrors({ global: 'Identifiants incorrects' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#13335F]">Connexion</h1>
          <p className="text-gray-600 mt-2">Simulez votre authentification</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.global && <p className="text-red-500 text-sm">{errors.global}</p>}

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Leila@gmail.com"
              className={`w-full border p-3 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className={`w-full border p-3 pr-10 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#00A99D] text-white p-3 rounded-md hover:bg-[#019286]"
          >
            Se connecter
          </button>

          <p className="text-center text-sm text-gray-600">
            Pas de compte ?{' '}
            <Link to="/signup" className="text-[#FFB347] hover:underline">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
