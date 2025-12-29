import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axios';
import { Eye, EyeOff, Crown, User, Info } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'user',
    profession: '',
    date_naissance: '',
    adresse: '',
    ville: '',
    code_postal: '',
    pays: '',
    accepte_conditions: false
  });

  const [isAdherent, setIsAdherent] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'user', label: 'Utilisateur' },
    { value: 'formateur', label: 'Formateur' },
    { value: 'adherent', label: 'Adhérent' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'role') {
      setIsAdherent(value === 'adherent');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validation des champs de base
    const requiredFields = {
      username: "Nom d'utilisateur",
      first_name: 'Prénom',
      last_name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      password: 'Mot de passe',
      password_confirmation: 'Confirmation du mot de passe'
    };

    // Vérification des champs requis
    Object.entries(requiredFields).forEach(([field, name]) => {
      if (!form[field] || form[field].trim() === '') {
        newErrors[field] = `${name} est requis`;
      }
    });

    // Validation de l'email
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // Validation du mot de passe
    if (form.password) {
      if (form.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      if (form.password !== form.password_confirmation) {
        newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
      }
    }

    // Validation des champs spécifiques aux adhérents
    if (form.role === 'adherent') {
      const adherentFields = {
        profession: 'Profession',
        date_naissance: 'Date de naissance',
        adresse: 'Adresse',
        ville: 'Ville',
        code_postal: 'Code postal',
        pays: 'Pays'
      };

      Object.entries(adherentFields).forEach(([field, name]) => {
        if (!form[field] || form[field].trim() === '') {
          newErrors[field] = `${name} est requis`;
        }
      });

      if (!form.accepte_conditions) {
        newErrors.accepte_conditions = 'Vous devez accepter les conditions d\'adhésion';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Préparer les données à envoyer selon le rôle
    let data = { ...form };
    if (form.role !== 'adherent') {
      delete data.profession;
      delete data.date_naissance;
      delete data.adresse;
      delete data.ville;
      delete data.code_postal;
      delete data.pays;
      delete data.accepte_conditions;
    }

    try {
      setLoading(true);
      // console.log('Données envoyées au serveur:', data);
      const response = await axios.post('/api/v1/register', data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      // console.log('Réponse du serveur:', response.data);

      toast.success('Inscription réussie !');
      if (form.role === 'adherent') {
        const shouldPayNow = window.confirm('Voulez-vous payer votre adhésion maintenant ?');
        if (shouldPayNow) {
          navigate('/payment');
        } else {
          navigate('/adherent/dashboard');
        }
      } else {
        navigate('/login');
      }
    } catch (err) {
      // console.error('Erreur lors de la soumission du formulaire:', err);
      if (err.response) {
        // Erreur avec une réponse du serveur (4xx, 5xx)
        // console.error('Détails de l\'erreur:', err.response.data);
        if (err.response.status === 422 && err.response.data.errors) {
          // Erreurs de validation du backend
          const validationErrors = {};
          Object.entries(err.response.data.errors).forEach(([field, messages]) => {
            validationErrors[field] = Array.isArray(messages) ? messages[0] : messages;
          });
          setErrors(validationErrors);
          toast.error('Veuillez corriger les erreurs dans le formulaire');
        } else if (err.response.data.message) {
          // Message d'erreur général du serveur
          setErrors({ global: err.response.data.message });
          toast.error(err.response.data.message);
        } else {
          setErrors({ global: "Erreur lors de la communication avec le serveur" });
          toast.error('Erreur lors de la communication avec le serveur');
        }
      } else if (err.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setErrors({ global: "Pas de réponse du serveur. Vérifiez votre connexion internet." });
        toast.error('Pas de réponse du serveur');
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        setErrors({ global: "Erreur de configuration de la requête" });
        toast.error('Erreur de configuration de la requête');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <h1 className="text-center text-3xl font-bold text-blue-950">Créer un compte</h1>
            <p className="mt-2 text-center text-gray-600">Rejoignez notre plateforme</p>
          </div>

          {/* Bannière informative discrète */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Types de comptes disponibles</h3>
                <div className="space-y-2 text-xs text-blue-800">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span><strong>Profil simple :</strong> Accès aux formations et événements ouverts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-yellow-600" />
                    <span><strong>Adhérent :</strong> Accès privilégié, tarifs préférentiels, réseau exclusif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {errors.global && <p className="text-red-500 text-sm mb-4">{errors.global}</p>}

            <div className="space-y-4">
              <input 
                name="username" 
                placeholder="Nom d'utilisateur" 
                value={form.username} 
                onChange={handleChange} 
                className={`w-full border p-3 rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}

              <input 
                name="first_name" 
                placeholder="Prénom" 
                value={form.first_name} 
                onChange={handleChange} 
                className={`w-full border p-3 rounded-md ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}

              <input 
                name="last_name" 
                placeholder="Nom" 
                value={form.last_name} 
                onChange={handleChange} 
                className={`w-full border p-3 rounded-md ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}

              <input 
                name="phone" 
                placeholder="Téléphone" 
                value={form.phone} 
                onChange={handleChange} 
                className={`w-full border p-3 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border p-3 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Mot de passe"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full border p-3 rounded-md pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirmez le mot de passe"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className={`w-full border p-3 rounded-md ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
              </div>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={`w-full border border-gray-300 p-3 rounded-md text-gray-700 ${errors.role ? 'border-red-500' : ''}`}
              >
                {roleOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}

              {isAdherent && (
                <div className="mt-6 space-y-4">
                  <input 
                    name="profession" 
                    placeholder="Profession" 
                    value={form.profession} 
                    onChange={handleChange} 
                    className={`w-full border p-3 rounded-md ${errors.profession ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}

                  <input 
                    name="date_naissance" 
                    type="date" 
                    value={form.date_naissance} 
                    onChange={handleChange} 
                    className={`w-full border p-3 rounded-md ${errors.date_naissance ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.date_naissance && <p className="text-red-500 text-sm mt-1">{errors.date_naissance}</p>}

                  <input 
                    name="adresse" 
                    placeholder="Adresse" 
                    value={form.adresse} 
                    onChange={handleChange} 
                    className={`w-full border p-3 rounded-md ${errors.adresse ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}

                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      name="ville" 
                      placeholder="Ville" 
                      value={form.ville} 
                      onChange={handleChange} 
                      className={`w-full border p-3 rounded-md ${errors.ville ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ville && <p className="text-red-500 text-sm mt-1">{errors.ville}</p>}

                    <input 
                      name="code_postal" 
                      placeholder="Code postal" 
                      value={form.code_postal} 
                      onChange={handleChange} 
                      className={`w-full border p-3 rounded-md ${errors.code_postal ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.code_postal && <p className="text-red-500 text-sm mt-1">{errors.code_postal}</p>}
                  </div>

                  <input 
                    name="pays" 
                    placeholder="Pays" 
                    value={form.pays} 
                    onChange={handleChange} 
                    className={`w-full border p-3 rounded-md ${errors.pays ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.pays && <p className="text-red-500 text-sm mt-1">{errors.pays}</p>}

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="accepte_conditions" 
                      checked={form.accepte_conditions} 
                      onChange={handleChange} 
                      className="mr-2"
                    />
                    <label className="text-gray-600">
                      J'accepte les conditions d'adhésion
                    </label>
                  </div>
                  {errors.accepte_conditions && <p className="text-red-500 text-sm mt-1">{errors.accepte_conditions}</p>}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full mt-6 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Création du compte...' : 'Créer un compte'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-800">Se connecter</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

export default SignupPage;