import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const translations = {
  FR: {
    title: 'Connexion',
    subtitle: 'Accédez à votre espace personnel',
    email: 'Email',
    password: 'Mot de passe',
    emailPlaceholder: 'exemple@email.com',
    passwordPlaceholder: 'Votre mot de passe',
    login: 'Se connecter',
    loading: 'Chargement...',
    noAccount: "Vous n'avez pas de compte ?",
    signup: 'Créer un compte',
    emailRequired: "L'email est requis",
    passwordRequired: 'Le mot de passe est requis',
    invalid: 'Identifiants incorrects. Veuillez réessayer.',
    error: 'Une erreur est survenue lors de la connexion',
    success: 'Connexion réussie !',
  },
  EN: {
    title: 'Login',
    subtitle: 'Access your personal space',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'example@email.com',
    passwordPlaceholder: 'Your password',
    login: 'Login',
    loading: 'Loading...',
    noAccount: "Don't have an account?",
    signup: 'Create an account',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    invalid: 'Invalid credentials. Please try again.',
    error: 'An error occurred during login',
    success: 'Login successful!',
  },
  AR: {
    title: 'تسجيل الدخول',
    subtitle: 'الوصول إلى حسابك الشخصي',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    emailPlaceholder: 'example@email.com',
    passwordPlaceholder: 'كلمة المرور',
    login: 'دخول',
    loading: 'جاري التحميل...',
    noAccount: 'ليس لديك حساب؟',
    signup: 'إنشاء حساب',
    emailRequired: 'البريد الإلكتروني مطلوب',
    passwordRequired: 'كلمة المرور مطلوبة',
    invalid: 'بيانات الدخول غير صحيحة',
    error: 'حدث خطأ أثناء تسجيل الدخول',
    success: 'تم تسجيل الدخول بنجاح!',
  },
};

const LoginPage = () => {
  const { login, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const lang = (language && ['FR', 'EN', 'AR'].includes(language.toUpperCase()))
    ? language.toUpperCase()
    : 'FR';

  const t = translations[lang];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', global: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = { email: '', password: '', global: '' };
    let valid = true;

    if (!email) {
      newErrors.email = t.emailRequired;
      valid = false;
    }
    if (!password) {
      newErrors.password = t.passwordRequired;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await login({ email, password });
      toast.success(t.success);
    } catch (error) {
      const message =
        error.response?.status === 401 ? t.invalid : t.error;

      setErrors(prev => ({ ...prev, global: message }));
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center py-12 px-4"
        dir={lang === 'AR' ? 'rtl' : 'ltr'}
      >
        <div className="max-w-md w-full bg-white p-6 md:p-8 rounded-lg shadow-md space-y-8">
          <div>
            <h1 className="text-center text-3xl font-bold text-blue-950">
              {t.title}
            </h1>
            <p className="mt-2 text-center text-gray-600">
              {t.subtitle}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-1">{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border p-2 rounded ${errors.email && 'border-red-500'}`}
                placeholder={t.emailPlaceholder}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">{t.password}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border p-2 rounded pr-10 ${errors.password && 'border-red-500'}`}
                  placeholder={t.passwordPlaceholder}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 ${
                loading && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {loading ? t.loading : t.login}
            </button>

            {errors.global && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-center">
                {errors.global}
              </div>
            )}

            <p className="text-center text-sm text-gray-600">
              {t.noAccount}{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-800">
                {t.signup}
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default LoginPage;