import { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';


export default function OffreEmploi() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const lang = (language && ["FR", "EN", "AR"].includes(language.toUpperCase())) ? language.toUpperCase() : "FR";

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    formation: '',
    experience: '',
    lettre_motivation: '',
    cv: null,
  });

  const detaillinsertionData = {
    FR: {
      behindLink: "← Retour",
      companyName: "Nom de l'entreprise",
      jobTitle: "Intitulé du poste",
      contratType: "CDI",
      salary: "3500 MAD",
      city: "Casablanca",
      experienceYears: "2 ans d'expérience",
      postDescriptionTitle:"Description du poste",
      profilSearchdTitle:"Profil recherché",
      postDescription: "Nous recherchons un développeur passionné pour rejoindre notre équipe et contribuer à des projets innovants.",
      profilSearchd: "Titulaire d'un Bac+3 minimum, vous justifiez d'une première expérience en développement web.",
      postintresing: "Ce poste vous intéresse ?",
      postuled: "Postuler",
      candidature: "Candidature",
      lastName: "Nom",
      firstName: "Prénom",
      email: "Email",
      phoneNumber: "Téléphone",
      formationDiplomat: "Formation/Diplôme",
      experience: "Expérience Professionnelle",
      lettreMotivation: "Lettre de motivation",
      cv: "CV (PDF ou DOCX)",
      loadingTrue: "Envoi en cours...",
      loadingFalse: "Envoyer ma candidature",
      msg: "✅ Votre candidature a été envoyée avec succès !"
    },
    EN: {
      behindLink: "← Return",
      companyName: "Company Name",
      jobTitle: "Job Title",
      contratType: "CDI",
      salary: "3500 MAD",
      city: "Casablanca",
      experienceYears: "2 years of experience",
      postDescriptionTitle: "Job Description",
      profilSearchdTitle: "Profile recherché",
      postDescription: "We are looking for a passionate developer to join our team and contribute to innovative projects.",
      profilSearchd: "Holder of a Bac+3 minimum, you have a first experience in web development.",
      postintresing: "This position interests you?",
      postuled: "Apply",
      candidature: "Application",
      lastName: "Last Name",
      firstName: "First Name",
      email: "Email",
      phoneNumber: "Phone Number",
      formationDiplomat: "Training/Diploma",
      experience: "Professional Experience",
      lettreMotivation: "Cover Letter",
      cv: "CV (PDF or DOCX)",
      loadingTrue: "Sending...",
      loadingFalse: "Send my application",
      msg: "✅ Your application has been sent successfully!"
    },
    AR: {
      behindLink: "← العودة",
      companyName: "اسم الشركة",
      jobTitle: "عنوان الوظيفة",
      contratType: "CDI",
      salary: "3500 درهم",
      city: "الدار البيضاء",
      experienceYears: "سنتان من الخبرة",
      postDescriptionTitle: "وصف الوظيفة",
      profilSearchdTitle: "الملف الشخصي المطلوب",
      postDescription: "نبحث عن مطور شغوف للانضمام إلى فريقنا والمساهمة في مشاريع مبتكرة.",
      profilSearchd: "حاصل على شهادة Bac+3 كحد أدنى، ولديك خبرة أولى في تطوير الويب.",
      postintresing: "هل يهمك هذا المنصب؟",
      postuled: "قدم",
      candidature: "طلب",
      lastName: "الاسم",
      firstName: "الاسم الأول",
      email: "البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      formationDiplomat: "التدريب/الشهادة",
      experience: "الخبرة المهنية",
      lettreMotivation: "رسالة الدافع",
      cv: "السيرة الذاتية (PDF أو DOCX)",
      loadingTrue: "جاري الإرسال...",
      loadingFalse: "أرسل طلبي",
      msg: "✅ تم إرسال طلبك بنجاح!"
    }
  }

  const t = detaillinsertionData[lang];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFormData((prev) => ({ ...prev, cv: file }));
      setError('');
    } else {
      setError('Veuillez sélectionner un fichier PDF ou DOCX valide');
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const response = await axios.post('http://localhost:8000/api/v1/candidatures', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        withCredentials: true
      });

      if (response.status === 201) {
        setSubmitted(true);
        setShowForm(false);
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          formation: '',
          experience: '',
          lettre_motivation: '',
          cv: null,
        });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Une erreur est survenue lors de l'envoi de la candidature.");
      } else {
        setError("Erreur réseau ou serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* 🔙 Lien de retour */}
      <div>
        <a
          href="#"
          onClick={() => window.history.back()}
          className="inline-block bg-[#00A99D] text-[#13335F] px-4 py-2 rounded-full text-sm"
        >
          {t.behindLink}
        </a>
      </div>

      {/* 🖼️ Informations générales */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src="/logo-entreprise.png"
            alt="Logo entreprise"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h2 className="text-xl font-bold text-[#13335F]">{t.companyName}</h2>
            <p className="text-[#13335F] text-lg">{t.jobTitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Briefcase color="#FFB347" />
            <span>{t.contratType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign color="#FFB347" />
            <span>{t.salary}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin color="#FFB347" />
            <span>{t.city}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock color="#FFB347" />
            <span>{t.experienceYears}</span>
          </div>
        </div>
      </div>

      {/* 📋 Description & Profil */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#13335F] mb-2">{t.postDescriptionTitle}</h3>
          <p>
            {t.postDescription}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#13335F] mb-2">{t.profilSearchdTitle}</h3>
          <p>
            {t.profilSearchd}
          </p>
        </div>
      </div>

      {/* 📩 Section de candidature */}
      <div className="text-center">
        <h4 className="text-[#00A99D] text-xl font-semibold mb-4">{t.postintresing}</h4>

        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#FFB347] text-[#13335F] font-semibold px-6 py-2 rounded hover:opacity-90 transition"
          >
            {t.postuled}
          </button>
        )}

        {/* Formulaire de candidature */}
        {showForm && !submitted && (
          <div className="min-h-screen bg-[#F4F9FF] flex items-center justify-center p-4">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-center text-[#13335F] mb-6">{t.candidature}</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              {/* NOM */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="nom">
                  {t.lastName}
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* PRENOM */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="prenom">
                  {t.firstName}
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="email">
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* TELEPHONE */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="telephone">
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* FORMATION */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="formation">
                  {t.formationDiplomat}
                </label>
                <input
                  type="text"
                  id="formation"
                  name="formation"
                  value={formData.formation}
                  onChange={handleInputChange}
                  placeholder="Ex. : Licence"
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* EXPÉRIENCE */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="experience">
                  {t.experience}
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                ></textarea>
              </div>

              {/* LETTRE DE MOTIVATION */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="lettre_motivation">
                  {t.lettreMotivation}
                </label>
                <textarea
                  id="lettre_motivation"
                  name="lettre_motivation"
                  value={formData.lettre_motivation}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                ></textarea>
              </div>

              {/* CV */}
              <div className="mb-6">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="cv">
                  {t.cv}
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  required
                  className="w-full p-2 border border-gray-300 rounded bg-white file:bg-[#FFB347] file:text-white file:rounded file:px-4 file:py-1 file:border-0 focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* BOUTON ENVOYER */}
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#FFB347] text-white font-semibold px-6 py-2 rounded hover:bg-[#e0a033] transition w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? t.loadingTrue : t.loadingFalse}
              </button>
            </form>
          </div>
        )}

        {/* Message succès */}
        {submitted && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            {t.msg}
          </div>
        )}
      </div>
    </div>
  );
}