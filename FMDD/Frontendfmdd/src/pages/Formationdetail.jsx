import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import api from '../axios';
import { useLanguage } from "../contexts/LanguageContext";

// Translations object
const texts = {
  FR: {
    backToFormations: "Retour aux formations",
    formationNotFound: "Formation non trouvée.",
    title: "Formation | FMDD",
    instructor: "Instructeur",
    dates: "Dates",
    cost: "Coût",
    free: "Gratuit",
    program: "📌 Programme",
    advantages: "🌟 Avantages",
    readyToRegister: "Prêt à vous inscrire ?",
    closeForm: "Fermer le formulaire",
    register: "S'inscrire",
    registrationForm: "📝 Formulaire d'inscription",
    fullName: "Nom complet",
    email: "Email",
    phone: "Téléphone",
    phonePlaceholder: "Votre numéro de téléphone (ex: +212612345678)",
    submit: "S'inscrire",
    validation: {
      required: "Ce champ est requis",
      nameMinLength: "Au moins 2 caractères",
      invalidEmail: "Format d'email invalide",
      invalidPhone: "Format invalide (ex: +212612345678)"
    },
    successAlert: "Inscription réussie 🎉",
    errorAlert: "Erreur lors de l'inscription"
  },
  EN: {
    backToFormations: "Back to formations",
    formationNotFound: "Formation not found.",
    title: "Formation | FMDD",
    instructor: "Instructor",
    dates: "Dates",
    cost: "Cost",
    free: "Free",
    program: "📌 Program",
    advantages: "🌟 Advantages",
    readyToRegister: "Ready to register?",
    closeForm: "Close form",
    register: "Register",
    registrationForm: "📝 Registration Form",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    phonePlaceholder: "Your phone number (ex: +212612345678)",
    submit: "Register",
    validation: {
      required: "This field is required",
      nameMinLength: "At least 2 characters",
      invalidEmail: "Invalid email format",
      invalidPhone: "Invalid format (ex: +212612345678)"
    },
    successAlert: "Registration successful 🎉",
    errorAlert: "Error during registration"
  },
  AR: {
    backToFormations: "العودة إلى التكوينات",
    formationNotFound: "التكوين غير موجود.",
    title: "تكوين | الفيدرالية المغربية للتنمية المستدامة",
    instructor: "المكون",
    dates: "التواريخ",
    cost: "التكلفة",
    free: "مجاني",
    program: "📌 البرنامج",
    advantages: "🌟 المميزات",
    readyToRegister: "مستعد للتسجيل؟",
    closeForm: "إغلاق النموذج",
    register: "سجل الآن",
    registrationForm: "📝 نموذج التسجيل",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    phonePlaceholder: "رقم هاتفك (مثال: +212612345678)",
    submit: "تسجيل",
    validation: {
      required: "هذا الحقل مطلوب",
      nameMinLength: "على الأقل حرفين",
      invalidEmail: "صيغة البريد الإلكتروني غير صالحة",
      invalidPhone: "الصيغة غير صالحة (مثال: +212612345678)"
    },
    successAlert: "تم التسجيل بنجاح 🎉",
    errorAlert: "خطأ أثناء التسجيل"
  }
};

const formationsData = [
  { 
    id: 1, 
    title: "Gestion durable des ressources en eau", 
    titleAR: "الإدارة المستدامة للموارد المائية",
    titleEN: "Sustainable Water Resources Management",
    instructor: "Dr. Nadia Fathi", 
    date: "10 Sept - 15 Oct 2025", 
    cost: "750 MAD", 
    image: "https://images.pexels.com/photos/1774218/pexels-photo-1774218.jpeg?auto=compress&cs=tinysrgb&w=600", 
    isFree: false, 
    type: "Certification", 
    description: "Cette formation offre une introduction complète aux pratiques durables en gestion des ressources en eau.",
    descriptionAR: "هذا التكوين يقدم مقدمة شاملة للممارسات المستدامة في إدارة الموارد المائية.",
    descriptionEN: "This training offers a comprehensive introduction to sustainable water resources management practices.",
    content: "Programme :\n- Introduction aux enjeux\n- Gestion et optimisation des ressources\n- Études de cas pratiques\n\nAvantages :\n- Certification reconnue\n- Encadrement par des experts du secteur",
    contentAR: "البرنامج:\n- مقدمة للتحديات\n- إدارة وتحسين الموارد\n- دراسات حالة عملية\n\nالمميزات:\n- شهادة معترف بها\n- تأطير من قبل خبراء القطاع",
    contentEN: "Program:\n- Introduction to challenges\n- Resource management and optimization\n- Practical case studies\n\nAdvantages:\n- Recognized certification\n- Supervision by sector experts"
  },
  { 
    id: 2, 
    title: "Entrepreneuriat vert et économie circulaire", 
    titleAR: "ريادة الأعمال الخضراء والاقتصاد الدائري",
    titleEN: "Green Entrepreneurship and Circular Economy",
    instructor: "Prof. Hassan Alaoui", 
    date: "5 Oct - 20 Nov 2025", 
    cost: "950 MAD", 
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600", 
    isFree: false, 
    type: "Diplôme", 
    description: "Développez vos compétences en entrepreneuriat vert afin de promouvoir des modèles économiques circulaires.",
    descriptionAR: "طور مهاراتك في ريادة الأعمال الخضراء لتعزيز النماذج الاقتصادية الدائرية.",
    descriptionEN: "Develop your skills in green entrepreneurship to promote circular economic models.",
    content: "Programme :\n- Concepts clés de l'économie circulaire\n- Stratégies entrepreneuriales\n- Ateliers pratiques et mentoring\n\nAvantages :\n- Networking\n- Projets collaboratifs",
    contentAR: "البرنامج:\n- مفاهيم أساسية في الاقتصاد الدائري\n- استراتيجيات ريادة الأعمال\n- ورشات عملية وتوجيه\n\nالمميزات:\n- التواصل\n- مشاريع تعاونية",
    contentEN: "Program:\n- Key concepts of circular economy\n- Entrepreneurial strategies\n- Practical workshops and mentoring\n\nAdvantages:\n- Networking\n- Collaborative projects"
  },
  { 
    id: 3, 
    title: "Initiation au développement durable", 
    titleAR: "مقدمة في التنمية المستدامة",
    titleEN: "Introduction to Sustainable Development",
    instructor: "Leila Benjelloun", 
    date: "1 Sept - 30 Sept 2025", 
    cost: "Gratuit", 
    image: "https://images.pexels.com/photos/7641829/pexels-photo-7641829.jpeg?auto=compress&cs=tinysrgb&w=600", 
    isFree: true, 
    type: "Cours", 
    description: "Un parcours d'introduction idéal pour découvrir les fondamentaux du développement durable.",
    descriptionAR: "مسار تمهيدي مثالي لاكتشاف أساسيات التنمية المستدامة.",
    descriptionEN: "An ideal introductory course to discover the fundamentals of sustainable development.",
    content: "Programme :\n- Bases du développement durable\n- Exemples et bonnes pratiques\n- Travaux interactifs\n\nAvantages :\n- Formateur expérimenté\n- Approche pédagogique adaptée aux débutants",
    contentAR: "البرنامج:\n- أساسيات التنمية المستدامة\n- أمثلة وممارسات جيدة\n- أعمال تفاعلية\n\nالمميزات:\n- مكون ذو خبرة\n- نهج تربوي ملائم للمبتدئين",
    contentEN: "Program:\n- Basics of sustainable development\n- Examples and best practices\n- Interactive work\n\nAdvantages:\n- Experienced trainer\n- Teaching approach suitable for beginners"
  },
  { 
    id: 4, 
    title: "Énergies renouvelables : technologies et applications", 
    titleAR: "الطاقات المتجددة: التقنيات والتطبيقات",
    titleEN: "Renewable Energies: Technologies and Applications",
    instructor: "Dr. Youssef Benkirane", 
    date: "15 Oct - 30 Nov 2025", 
    cost: "850 MAD", 
    image: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=600", 
    isFree: false, 
    type: "Certification", 
    description: "Plongez dans les technologies des énergies renouvelables et leurs multiples applications pratiques.",
    descriptionAR: "انغمس في تقنيات الطاقات المتجددة وتطبيقاتها العملية المتعددة.",
    descriptionEN: "Dive into renewable energy technologies and their multiple practical applications.",
    content: "Programme :\n- Introduction aux énergies renouvelables\n- Technologies solaires, éoliennes et autres\n- Ateliers pratiques et simulations\n\nAvantages :\n- Accompagnement personnalisé\n- Accès à des ressources exclusives",
    contentAR: "البرنامج:\n- مقدمة في الطاقات المتجددة\n- التقنيات الشمسية والريحية وغيرها\n- ورشات عملية ومحاكاة\n\nالمميزات:\n- مرافقة مخصصة\n- الوصول إلى موارد حصرية",
    contentEN: "Program:\n- Introduction to renewable energies\n- Solar, wind and other technologies\n- Practical workshops and simulations\n\nAdvantages:\n- Personalized support\n- Access to exclusive resources"
  },
  { 
    id: 5, 
    title: "Agriculture biologique et agroécologie", 
    titleAR: "الزراعة البيولوجية والإيكولوجيا الزراعية",
    titleEN: "Organic Farming and Agroecology",
    instructor: "Amina Mansouri", 
    date: "1 Nov - 20 Dec 2025", 
    cost: "Gratuit", 
    image: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=600", 
    isFree: true, 
    type: "Atelier", 
    description: "Formation pratique dédiée à l'agriculture biologique et aux principes de l'agroécologie pour une production durable.",
    descriptionAR: "تكوين عملي مخصص للزراعة البيولوجية ومبادئ الإيكولوجيا الزراعية للإنتاج المستدام.",
    descriptionEN: "Practical training dedicated to organic farming and agroecology principles for sustainable production.",
    content: "Programme :\n- Introduction à l'agroécologie\n- Méthodes de production biologique\n- Visites de fermes et ateliers techniques\n\nAvantages :\n- Formation pratique sur le terrain\n- Certification de participation",
    contentAR: "البرنامج:\n- مقدمة في الإيكولوجيا الزراعية\n- طرق الإنتاج البيولوجي\n- زيارات للمزارع وورشات تقنية\n\nالمميزات:\n- تكوين عملي ميداني\n- شهادة مشاركة",
    contentEN: "Program:\n- Introduction to agroecology\n- Organic production methods\n- Farm visits and technical workshops\n\nAdvantages:\n- Practical field training\n- Participation certificate"
  }
];

const FormationDetail = () => {
  const { language } = useLanguage();
  const lang = texts[language] ? language : "FR";
  const t = texts[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const foundFormation = formationsData.find(f => f.id === parseInt(id));
    setFormation(foundFormation || null);
  }, [id]);

  const toggleForm = () => setShowForm(prev => !prev);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/v1/formations/inscription', {
        formation_id: formation.id,
        nom_complet: data.fullName,
        email: data.email,
        telephone: data.phone
      });

      alert(t.successAlert);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert(t.errorAlert);
    }
  };

  const handleBack = () => {
    navigate("/formations");
  };

  if (!formation) {
    return (
      <div className="py-12 bg-blue-light min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">{t.formationNotFound}</p>
      </div>
    );
  }

  // Get the right content based on language
  const getFormationTitle = () => {
    if (lang === 'AR') return formation.titleAR || formation.title;
    if (lang === 'EN') return formation.titleEN || formation.title;
    return formation.title;
  };

  const getFormationDescription = () => {
    if (lang === 'AR') return formation.descriptionAR || formation.description;
    if (lang === 'EN') return formation.descriptionEN || formation.description;
    return formation.description;
  };

  const getFormationContent = () => {
    if (lang === 'AR') return formation.contentAR || formation.content;
    if (lang === 'EN') return formation.contentEN || formation.content;
    return formation.content;
  };

  const content = getFormationContent();
  const programLines = content.split("\n").filter(line => line.includes("Programme") || line.includes("Program") || line.includes("البرنامج"));
  const advantagesLines = content.split("\n").filter(line => line.includes("Avantages") || line.includes("Advantages") || line.includes("المميزات"));

  return (
    <div className="py-12 bg-blue-light min-h-screen" dir={lang === "AR" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className={`mb-6 flex items-center text-blue-dark hover:text-turquoise transition-colors ${lang === 'AR' ? 'flex-row-reverse' : ''}`}
        >
          <ChevronLeft size={20} className={lang === 'AR' ? 'ml-2' : 'mr-2'} />
          {t.backToFormations}
        </button>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Image principale */}
          <img
            src={formation.image}
            alt={getFormationTitle()}
            className="w-full h-72 object-cover rounded-md mb-6"
          />
          {/* Informations essentielles */}
          <h1 className={`text-4xl font-bold text-blue-dark mb-6 font-poppins border-b-2 border-blue-300 pb-2 ${lang === 'AR' ? 'text-right font-arabic' : ''}`}>
            {getFormationTitle()}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className={`bg-blue-100 rounded-lg shadow-md p-4 flex items-center ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
              <span className={`text-xl font-semibold text-blue-800 ${lang === 'AR' ? 'ml-2' : 'mr-2'}`}>🎓 {t.instructor} :</span>
              <span className="text-gray-700">{formation.instructor}</span>
            </div>
            <div className={`bg-yellow-100 rounded-lg shadow-md p-4 flex items-center ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
              <span className={`text-xl font-semibold text-yellow-800 ${lang === 'AR' ? 'ml-2' : 'mr-2'}`}>📅 {t.dates} :</span>
              <span className="text-gray-700">{formation.date}</span>
            </div>
            <div className={`bg-green-100 rounded-lg shadow-md p-4 flex items-center ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
              <span className={`text-xl font-semibold text-green-800 ${lang === 'AR' ? 'ml-2' : 'mr-2'}`}>💰 {t.cost} :</span>
              <span className={`text-gray-700 ${formation.isFree ? "text-green-600 font-bold" : ""}`}>
                {formation.isFree ? t.free : formation.cost}
              </span>
            </div>
          </div>

          <p className={`text-gray-800 mb-6 text-lg leading-relaxed ${lang === 'AR' ? 'text-right' : ''}`}>
            {getFormationDescription()}
          </p>

          {/* Section Programme */}
          <div className="mb-6 p-6 bg-blue-50 rounded-md shadow-sm">
            <h2 className={`text-2xl font-bold text-blue-dark mb-3 ${lang === 'AR' ? 'text-right' : ''}`}>
              {t.program}
            </h2>
            <ul className={`list-disc ${lang === 'AR' ? 'list-inside text-right' : 'list-inside'} text-gray-700`}>
              {programLines.map((item, index) => {
                // Extract bullet points after the program header
                const lines = content.split("\n");
                let inProgramSection = false;
                const programItems = [];
                
                for (const line of lines) {
                  if (line.includes("Programme") || line.includes("Program") || line.includes("البرنامج")) {
                    inProgramSection = true;
                    continue;
                  }
                  if (line.includes("Avantages") || line.includes("Advantages") || line.includes("المميزات")) {
                    break;
                  }
                  if (inProgramSection && line.trim().startsWith("-")) {
                    programItems.push(line.replace("- ", "").trim());
                  }
                }
                
                return programItems.map((item, idx) => (
                  <li key={idx} className={lang === 'AR' ? 'text-right' : ''}>{item}</li>
                ));
              })}
            </ul>
          </div>

          {/* Section Avantages */}
          <div className="mb-6 p-6 bg-green-50 rounded-md shadow-sm">
            <h2 className={`text-2xl font-bold text-blue-dark mb-3 ${lang === 'AR' ? 'text-right' : ''}`}>
              {t.advantages}
            </h2>
            <ul className={`list-disc ${lang === 'AR' ? 'list-inside text-right' : 'list-inside'} text-gray-700`}>
              {advantagesLines.map((item, index) => {
                // Extract bullet points after the advantages header
                const lines = content.split("\n");
                let inAdvantagesSection = false;
                const advantagesItems = [];
                
                for (const line of lines) {
                  if (line.includes("Avantages") || line.includes("Advantages") || line.includes("المميزات")) {
                    inAdvantagesSection = true;
                    continue;
                  }
                  if (inAdvantagesSection && line.trim().startsWith("-")) {
                    advantagesItems.push(line.replace("- ", "").trim());
                  }
                }
                
                return advantagesItems.map((item, idx) => (
                  <li key={idx} className={lang === 'AR' ? 'text-right' : ''}>{item}</li>
                ));
              })}
            </ul>
          </div>

          {/* Bouton d'inscription */}
          <div className={`text-center ${lang === 'AR' ? 'text-right' : ''}`}>
            <p className="text-xl font-semibold text-blue-dark mb-4">
              {t.readyToRegister}
            </p>
            <button
              onClick={toggleForm}
              className="inline-block bg-yellow-400 text-blue-950 px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors"
            >
              {showForm ? t.closeForm : t.register}
            </button>
          </div>

          {/* Formulaire d'inscription avec validations */}
          {showForm && (
            <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md transition-all duration-500">
              <h2 className={`text-2xl font-bold text-blue-dark mb-4 ${lang === 'AR' ? 'text-right' : ''}`}>
                {t.registrationForm}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className={`block text-gray-700 mb-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder={t.fullName}
                    dir={lang === 'AR' ? 'rtl' : 'ltr'}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${lang === 'AR' ? 'text-right' : ''} ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    {...register('fullName', {
                      required: t.validation.required,
                      minLength: { value: 2, message: t.validation.nameMinLength }
                    })}
                  />
                  {errors.fullName && <p className={`text-red-500 text-sm mt-1 ${lang === 'AR' ? 'text-right' : ''}`}>{errors.fullName.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={`block text-gray-700 mb-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                    {t.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder={t.email}
                    dir={lang === 'AR' ? 'rtl' : 'ltr'}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${lang === 'AR' ? 'text-right' : ''} ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    {...register('email', {
                      required: t.validation.required,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t.validation.invalidEmail
                      }
                    })}
                  />
                  {errors.email && <p className={`text-red-500 text-sm mt-1 ${lang === 'AR' ? 'text-right' : ''}`}>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={`block text-gray-700 mb-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder={t.phonePlaceholder}
                    dir={lang === 'AR' ? 'rtl' : 'ltr'}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${lang === 'AR' ? 'text-right' : ''} ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    {...register('phone', {
                      required: t.validation.required,
                      pattern: {
                        value: /^\+212[0-9]{9}$/,
                        message: t.validation.invalidPhone
                      }
                    })}
                  />
                  {errors.phone && <p className={`text-red-500 text-sm mt-1 ${lang === 'AR' ? 'text-right' : ''}`}>{errors.phone.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {t.submit}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormationDetail;