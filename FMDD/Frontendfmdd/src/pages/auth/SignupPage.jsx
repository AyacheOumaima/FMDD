import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axios';
import { Eye, EyeOff, Crown, User, Info } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { useLanguage } from '../../contexts/LanguageContext';
import 'react-toastify/dist/ReactToastify.css';

const translations = {
  FR: {
    title: 'Créer un compte',
    subtitle: 'Rejoignez notre plateforme',

    infoTitle: 'Types de comptes',
    simpleProfile: 'Profil simple',
    simpleDesc: 'Accès aux formations et événements',
    adherentProfile: 'Adhérent',
    adherentDesc: 'Avantages exclusifs et réseau privilégié',

    username: "Nom d'utilisateur",
    firstName: 'Prénom',
    lastName: 'Nom',
    phone: 'Téléphone',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    role: 'Type de compte',

    profession: 'Profession',
    birth: 'Date de naissance',
    address: 'Adresse',
    city: 'Ville',
    postal: 'Code postal',
    country: 'Pays',
    accept: "J'accepte les conditions d'adhésion",

    create: 'Créer un compte',
    loading: 'Création...',
    already: 'Vous avez déjà un compte ?',
    login: 'Se connecter',

    required: 'est requis',
    invalidEmail: 'Email invalide',
    passLength: 'Minimum 6 caractères',
    passMatch: 'Les mots de passe ne correspondent pas',
    acceptError: 'Veuillez accepter les conditions',

    success: 'Inscription réussie !',
    fixErrors: 'Veuillez corriger les erreurs',
  },

  EN: {
    title: 'Create an account',
    subtitle: 'Join our platform',

    infoTitle: 'Account types',
    simpleProfile: 'Basic profile',
    simpleDesc: 'Access to trainings and events',
    adherentProfile: 'Member',
    adherentDesc: 'Exclusive benefits and network',

    username: 'Username',
    firstName: 'First name',
    lastName: 'Last name',
    phone: 'Phone',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    role: 'Account type',

    profession: 'Profession',
    birth: 'Date of birth',
    address: 'Address',
    city: 'City',
    postal: 'Postal code',
    country: 'Country',
    accept: 'I accept the membership conditions',

    create: 'Create account',
    loading: 'Creating...',
    already: 'Already have an account?',
    login: 'Login',

    required: 'is required',
    invalidEmail: 'Invalid email',
    passLength: 'Minimum 6 characters',
    passMatch: 'Passwords do not match',
    acceptError: 'You must accept conditions',

    success: 'Registration successful!',
    fixErrors: 'Please fix the errors',
  },

  AR: {
    title: 'إنشاء حساب',
    subtitle: 'انضم إلى منصتنا',

    infoTitle: 'أنواع الحسابات',
    simpleProfile: 'حساب عادي',
    simpleDesc: 'الوصول إلى الدورات والأنشطة',
    adherentProfile: 'منخرط',
    adherentDesc: 'مزايا وشبكة حصرية',

    username: 'اسم المستخدم',
    firstName: 'الاسم الشخصي',
    lastName: 'الاسم العائلي',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    role: 'نوع الحساب',

    profession: 'المهنة',
    birth: 'تاريخ الازدياد',
    address: 'العنوان',
    city: 'المدينة',
    postal: 'الرمز البريدي',
    country: 'الدولة',
    accept: 'أوافق على شروط الانخراط',

    create: 'إنشاء حساب',
    loading: 'جاري الإنشاء...',
    already: 'لديك حساب؟',
    login: 'تسجيل الدخول',

    required: 'مطلوب',
    invalidEmail: 'بريد إلكتروني غير صالح',
    passLength: '6 أحرف على الأقل',
    passMatch: 'كلمتا المرور غير متطابقتين',
    acceptError: 'يجب قبول الشروط',

    success: 'تم التسجيل بنجاح!',
    fixErrors: 'يرجى تصحيح الأخطاء',
  },
};

const SignupPage = () => {
  const { language } = useLanguage();
  const lang = language && ['FR','EN','AR'].includes(language.toUpperCase()) ? language.toUpperCase() : 'FR';
  const t = translations[lang];

  const [form, setForm] = useState({
    username: '', first_name:'', last_name:'', email:'', phone:'',
    password:'', password_confirmation:'', role:'user',
    profession:'', date_naissance:'', adresse:'', ville:'', code_postal:'', pays:'', accepte_conditions:false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAdherent = form.role === 'adherent';
  const roleOptions = [
    { value: 'user', label: t.simpleProfile },
    { value: 'formateur', label: 'Formateur' },
    { value: 'adherent', label: t.adherentProfile }
  ];

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type==='checkbox'?checked:value }));
  };

  const validateForm = () => {
    const newErrors = {};
    ['username','first_name','last_name','phone','email','password','password_confirmation'].forEach(f=>{
      if(!form[f]) newErrors[f]=`${t[f]||f} ${t.required}`;
    });
    if(form.email && !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email=t.invalidEmail;
    if(form.password && form.password.length<6) newErrors.password=t.passLength;
    if(form.password!==form.password_confirmation) newErrors.password_confirmation=t.passMatch;
    if(isAdherent){
      ['profession','date_naissance','adresse','ville','code_postal','pays'].forEach(f=>!form[f]&&(newErrors[f]=`${t[f]} ${t.required}`));
      if(!form.accepte_conditions) newErrors.accepte_conditions=t.acceptError;
    }
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const v = validateForm();
    setErrors(v);
    if(Object.keys(v).length) { toast.error(t.fixErrors); return; }
    try {
      setLoading(true);
      await axios.post('/api/v1/register', form);
      toast.success(t.success);
      navigate('/login');
    } catch {
      toast.error(t.fixErrors);
    } finally { setLoading(false); }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50" dir={lang==='AR'?'rtl':'ltr'}>
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
          <h1 className="text-center text-3xl font-bold text-blue-950">{t.title}</h1>
          <p className="text-center text-gray-600">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {['username','firstName','lastName','phone','email'].map(f=>(
              <div key={f}>
                <input name={f} placeholder={t[f]} value={form[f]} onChange={handleChange}
                  className={`w-full border p-3 rounded-md ${errors[f]?'border-red-500':'border-gray-300'}`} />
                {errors[f] && <p className="text-red-500 text-sm mt-1">{errors[f]}</p>}
              </div>
            ))}

            <div className="relative">
              <input type={showPassword?'text':'password'} name="password" placeholder={t.password}
                value={form.password} onChange={handleChange}
                className={`w-full border p-3 rounded-md pr-10 ${errors.password?'border-red-500':'border-gray-300'}`} />
              <button type="button" onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500">{showPassword?<Eye/>:<EyeOff/>}</button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <input type="password" name="password_confirmation" placeholder={t.confirmPassword} value={form.password_confirmation} onChange={handleChange}
              className={`w-full border p-3 rounded-md ${errors.password_confirmation?'border-red-500':'border-gray-300'}`} />
            {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}

            <select name="role" value={form.role} onChange={handleChange} className="w-full border p-3 rounded-md">
              {roleOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {isAdherent && (
              <div className="space-y-4 mt-4">
                {['profession','date_naissance','adresse','ville','code_postal','pays'].map(f=>(
                  <div key={f}>
                    <input type={f==='date_naissance'?'date':'text'} name={f} placeholder={t[f]} value={form[f]} onChange={handleChange}
                      className={`w-full border p-3 rounded-md ${errors[f]?'border-red-500':'border-gray-300'}`} />
                    {errors[f] && <p className="text-red-500 text-sm mt-1">{errors[f]}</p>}
                  </div>
                ))}
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="accepte_conditions" checked={form.accepte_conditions} onChange={handleChange} />
                  {t.accept}
                </label>
                {errors.accepte_conditions && <p className="text-red-500 text-sm mt-1">{errors.accepte_conditions}</p>}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md mt-4">
              {loading?t.loading:t.create}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default SignupPage;