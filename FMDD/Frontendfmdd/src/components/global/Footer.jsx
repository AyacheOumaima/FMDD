import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send, MapPin, Phone, Mail, Globe } from "lucide-react";
import Logo from "../commun/Logo";
import axios from "../../axios";
import { API_ROUTES } from "../../config/api.config";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language, setLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const translations = {
    FR: {
      aboutTitle: "À propos",
      aboutText: "Le Forum Marocain pour le Développement Durable œuvre pour promouvoir les pratiques durables et la sensibilisation environnementale au Maroc.",
      quickLinks: "Liens Rapides",
      links: [
        { path: "/", label: "Accueil" },
        { path: "/formations", label: "Formations" },
        { path: "/a-propos", label: "À propos" },
        { path: "/temoignages", label: "Témoignages" },
        { path: "/contact", label: "Contact" },
        { path: "/actualites", label: "Actualités" }
      ],
      contactTitle: "Contact",
      address: "Avenue des FAR, Casablanca, Maroc",
      newsletterTitle: "Newsletter",
      newsletterText: "Abonnez-vous pour recevoir les dernières nouvelles.",
      emailPlaceholder: "Votre email",
      subscribeAria: "S'abonner à la newsletter",
      errorEmail: "Veuillez entrer un email.",
      errorValidEmail: "Veuillez entrer un email valide.",
      successSub: "Merci de vous être abonné(e) !",
      serverError: "Impossible de se connecter au serveur.",
      genericError: "Une erreur est survenue. Veuillez réessayer.",
      copyright: "Tous droits réservés.",
      legalMentions: "Mentions légales",
      privacyPolicy: "Politique de confidentialité"
    },
    EN: {
      aboutTitle: "About",
      aboutText: "The Moroccan Forum for Sustainable Development works to promote sustainable practices and environmental awareness in Morocco.",
      quickLinks: "Quick Links",
      links: [
        { path: "/", label: "Home" },
        { path: "/formations", label: "Trainings" },
        { path: "/a-propos", label: "About" },
        { path: "/temoignages", label: "Testimonials" },
        { path: "/contact", label: "Contact" },
        { path: "/actualites", label: "News" }
      ],
      contactTitle: "Contact",
      address: "FAR Avenue, Casablanca, Morocco",
      newsletterTitle: "Newsletter",
      newsletterText: "Subscribe to receive the latest news.",
      emailPlaceholder: "Your email",
      subscribeAria: "Subscribe to newsletter",
      errorEmail: "Please enter an email.",
      errorValidEmail: "Please enter a valid email.",
      successSub: "Thank you for subscribing!",
      serverError: "Unable to connect to the server.",
      genericError: "An error occurred. Please try again.",
      copyright: "All rights reserved.",
      legalMentions: "Legal notices",
      privacyPolicy: "Privacy policy"
    },
    AR: {
      aboutTitle: "حول",
      aboutText: "يعمل المنتدى المغربي للتنمية المستدامة على تعزيز الممارسات المستدامة والتوعية البيئية في المغرب.",
      quickLinks: "روابط سريعة",
      links: [
        { path: "/", label: "الرئيسية" },
        { path: "/formations", label: "التدريبات" },
        { path: "/a-propos", label: "حول" },
        { path: "/temoignages", label: "الشهادات" },
        { path: "/contact", label: "اتصال" },
        { path: "/actualites", label: "الأخبار" }
      ],
      contactTitle: "اتصال",
      address: "شارع القوات المسلحة الملكية، الدار البيضاء، المغرب",
      newsletterTitle: "النشرة الإخبارية",
      newsletterText: "اشترك لتلقي آخر الأخبار.",
      emailPlaceholder: "بريدك الإلكتروني",
      subscribeAria: "الاشتراك في النشرة الإخبارية",
      errorEmail: "يرجى إدخال بريد إلكتروني.",
      errorValidEmail: "يرجى إدخال بريد إلكتروني صالح.",
      successSub: "شكراً لاشتراكك!",
      serverError: "تعذر الاتصال بالخادم.",
      genericError: "حدث خطأ. يرجى المحاولة مرة أخرى.",
      copyright: "جميع الحقوق محفوظة.",
      legalMentions: "إشعارات قانونية",
      privacyPolicy: "سياسة الخصوصية"
    }
  };

  const t = translations[language] || translations.FR;

  const socialLinks = [
    { icon: Facebook, href: 'https://web.facebook.com/profile.php?id=61573191698612', label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/forum-marocain-pour-le-d%C3%A9veloppement-durable/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/f.m.d.d?igsh=MTliaHV1YjBnMW03Mg==', label: 'Instagram' },
  ];
  // Récupérer le token CSRF au chargement du composant
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await axios.get('/sanctum/csrf-cookie');
        // Vérifier que le cookie XSRF-TOKEN est bien présent
        const cookies = document.cookie.split(';');
        const xsrfToken = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
        if (!xsrfToken) {
          console.warn('XSRF-TOKEN cookie not found after CSRF request');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    };
    getCsrfToken();
  }, []);

  // Fonction pour valider l'email avec une regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    if (!email) {
      setIsError(true);
      setMessage(t.errorEmail);
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setIsError(true);
      setMessage(t.errorValidEmail);
      setIsLoading(false);
      return;
    }

    try {
      // 1. Refresh CSRF cookie before post
      await axios.get('/sanctum/csrf-cookie');

      // 2. Submit using the configured axios instance
      const response = await axios.post(API_ROUTES.newsletter.subscribe, {
        email: email
      });

      if (response.data.status === 'success' || response.status === 200 || response.status === 201) {
        setIsError(false);
        setMessage(t.successSub);
        setEmail("");
      } else {
        setIsError(true);
        setMessage(response.data.message || t.genericError);
      }
    } catch (error) {
      setIsError(true);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.data?.errors?.email) {
        setMessage(error.response.data.errors.email[0]);
      } else if (error.code === 'ERR_NETWORK') {
        setMessage(t.serverError);
      } else {
        setMessage(t.genericError);
      }
      console.error('Erreur newsletter:', error);
    } finally {
      setIsLoading(false);
      // Faire disparaître le message après 5 secondes
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <footer className="bg-blue-950 text-white shadow-lg">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* À propos */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-1">
                <Logo className="h-10 w-auto" />
              </div>
              <span className="ml-2 font-bold text-lg">FMDD</span>
            </div>
            <p className="text-sm md:text-base mb-4">
              {t.aboutText}
            </p>
            <div className="flex space-x-3 justify-start">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-all duration-200"
                  aria-label={link.label}
                >
                  <link.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              {t.links.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="hover:text-yellow-500 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.contactTitle}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1" />
                <span>{t.address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3" />
                <span>+212 645 466 188</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3" />
                <span>contact@fmdd.ma</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div id="newsletter">
            <h3 className="font-semibold text-lg mb-4">{t.newsletterTitle}</h3>
            <p className="text-sm md:text-base mb-4">
              {t.newsletterText}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage(""); // Réinitialiser le message lors de la saisie
                  }}
                  className="px-3 py-2 bg-white rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black border border-gray-300"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-yellow-500 rounded-r-md px-3 py-2 text-blue-900 hover:bg-opacity-90 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  aria-label={t.subscribeAria}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
              {message && (
                <p className={`text-sm ${isError ? "text-red-400" : "text-green-400"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm md:text-base">
          <p>© {currentYear} FMDD. {t.copyright}</p>
          <div className="mt-2 space-x-4">
            <Link
              to="/mentions-legales"
              className="hover:text-yellow-500 transition-all duration-200"
            >
              {t.legalMentions}
            </Link>
            <Link
              to="/politique-confidentialite"
              className="hover:text-yellow-500 transition-all duration-200"
            >
              {t.privacyPolicy}
            </Link>
          </div>

          {/* Sélecteur de langue */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-sm border-t border-gray-800 pt-4">
            <div className="flex items-center text-gray-400 mr-2">
              <Globe size={16} className="mr-2" />
              <span>Langues :</span>
            </div>
            <button
              onClick={() => setLanguage('FR')}
              className={`transition-colors duration-200 ${language === 'FR' ? 'text-yellow-500 font-bold' : 'text-gray-300 hover:text-yellow-500'}`}
            >
              Français
            </button>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <button
              onClick={() => setLanguage('EN')}
              className={`transition-colors duration-200 ${language === 'EN' ? 'text-yellow-500 font-bold' : 'text-gray-300 hover:text-yellow-500'}`}
            >
              Anglais
            </button>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <button
              onClick={() => setLanguage('AR')}
              className={`transition-colors duration-200 ${language === 'AR' ? 'text-yellow-500 font-bold' : 'text-gray-300 hover:text-yellow-500'}`}
            >
              Arabe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}