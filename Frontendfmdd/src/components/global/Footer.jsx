import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Send, MapPin, Phone, Mail } from "lucide-react";
import Logo from "../commun/Logo";
import axios from "axios";

// Configuration globale d'axios
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentYear = new Date().getFullYear();

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
      setMessage("Veuillez entrer un email.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setIsError(true);
      setMessage("Veuillez entrer un email valide.");
      setIsLoading(false);
      return;
    }

    try {
      // Récupérer un nouveau token CSRF avant chaque soumission
      await axios.get('/sanctum/csrf-cookie');

      // Récupérer le token XSRF-TOKEN du cookie
      const cookies = document.cookie.split(';');
      const xsrfToken = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
      const token = xsrfToken ? decodeURIComponent(xsrfToken.split('=')[1]) : '';

      const response = await axios.post('/api/v1/newsletter/subscribe', {
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': token
        }
      });

      if (response.data.status === 'success') {
        setIsError(false);
        setMessage("Merci de vous être abonné(e) !");
        setEmail("");
      } else {
        setIsError(true);
        setMessage(response.data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setIsError(true);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.code === 'ERR_NETWORK') {
        setMessage("Impossible de se connecter au serveur. Veuillez vérifier que le serveur est en cours d'exécution.");
      } else {
        setMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
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
              Le Forum Marocain pour le Développement Durable œuvre pour promouvoir les pratiques durables et la sensibilisation environnementale au Maroc.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="hover:text-yellow-500 transition-all duration-200" 
                  aria-label={`Lien vers ${Icon.name}`}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              {[
                { path: "/", label: "Accueil" },
                { path: "/formations", label: "Formations" },
                { path: "/a-propos", label: "À propos" },
                { path: "/contact", label: "Contact" },
                { path: "/actualites", label: "Actualités" }
              ].map((item, i) => (
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
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1" />
                <span>123 Av. Mohammed V, Rabat, Maroc</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3" />
                <span>+212 645 466 188</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3" />
                <span>fmdd.contact@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div id="newsletter">
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm md:text-base mb-4">
              Abonnez-vous pour recevoir les dernières nouvelles.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
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
                  className={`bg-yellow-500 rounded-r-md px-3 py-2 text-blue-900 hover:bg-opacity-90 transition-all duration-200 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label="S'abonner à la newsletter"
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
          <p>© {currentYear} FMDD. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <Link 
              to="/mentions-legales" 
              className="hover:text-yellow-500 transition-all duration-200"
            >
              Mentions légales
            </Link>
            <Link 
              to="/politique-confidentialite" 
              className="hover:text-yellow-500 transition-all duration-200"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}