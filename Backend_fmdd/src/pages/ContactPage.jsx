import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../axios';
import Button from '../components/ui/Button';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Localisation from '../components/commun/Location';

// Configuration des options pour les notifications
const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light"
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const [serverErrors, setServerErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const onSubmit = async (data) => {
    try {
      setServerErrors(null);
      setSuccessMessage(null);
      setSuccessMessage('Envoi du message...');

      const response = await axios.post('/api/v1/contact', data);

      reset();
      toast.success('Votre message a été envoyé avec succès !', toastOptions);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 8000);

    } catch (error) {
      setSuccessMessage(null);
      
      if (error.response && error.response.status === 422) {
        setServerErrors(error.response.data.errors);
      } else {
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue, veuillez réessayer.';
        setServerErrors({ general: errorMessage });
        toast.error(errorMessage, toastOptions);
      }

      setTimeout(() => {
        setServerErrors(null);
      }, 5000);
    }
  };

  const sujets = [
    { value: 'information', label: 'Demande d\'information' },
    { value: 'partenariat', label: 'Proposition de partenariat' },
    { value: 'support', label: 'Support technique' },
    { value: 'autre', label: 'Autre' }
  ];

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/contact/info');
        console.log('Réponse brute:', response);
        console.log('Données reçues:', JSON.stringify(response.data, null, 2));
        
        if (response.data) {
          setContactInfo(response.data);
        } else {
          console.error('Format de réponse invalide:', response.data);
          setContactInfo({});
        }
      } catch (error) {
        console.error('Erreur lors du chargement des informations de contact:', error);
        toast.error('Erreur lors du chargement des informations de contact', toastOptions);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="bg-blue-950 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-poppins font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Une question, une proposition de partenariat ou un besoin spécifique ? N'hésitez pas à nous contacter, notre équipe vous répondra dans les meilleurs délais.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Coordonnées */}
          <div className="lg:col-span-2 space-y-10">
            <h2 className="text-2xl font-poppins font-bold text-blue-dark mb-6">Nos coordonnées</h2>
            
            {loading ? (
              <div className="animate-pulse space-y-8">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Adresse */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                      <MapPin size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-dark mb-1">Adresse</h3>
                    <p className="text-gray-700">{contactInfo?.adresse_fmdd}</p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                      <Phone size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-dark mb-1">Téléphone</h3>
                    <a href={`tel:${contactInfo?.telephone_fmdd}`} className="text-gray-700 hover:text-blue-dark">
                      {contactInfo?.telephone_fmdd}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                      <Mail size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-dark mb-1">Email</h3>
                    <a href={`mailto:${contactInfo?.email_fmdd}`} className="text-gray-700 hover:text-blue-dark">
                      {contactInfo?.email_fmdd}
                    </a>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                      <Send size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-dark mb-1">Heures d'ouverture</h3>
                    <p className="text-gray-700">{contactInfo?.horaire_fmdd}</p>
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp */}
            {contactInfo?.url_whatsapp && (
              <div className="mt-8">
                <a
                  href={contactInfo.url_whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                >
                  <Send size={18} className="mr-2" />
                  Contactez-nous sur WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-poppins font-bold text-blue-dark mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom complet */}
                <div>
                  <label htmlFor="nom_complet" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    id="nom_complet"
                    type="text"
                    {...register('nom_complet', {
                      required: 'Ce champ est requis',
                      minLength: { value: 2, message: 'Au moins 2 caractères' }
                    })}
                    className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 ${
                      errors.nom_complet ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.nom_complet && (
                    <p className="text-red-600 text-sm mt-1">{errors.nom_complet.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Ce champ est requis',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email invalide'
                      }
                    })}
                    className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Sujet */}
              <div>
                <label htmlFor="objet" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet *
                </label>
                <select
                  id="objet"
                  {...register('objet', { required: 'Ce champ est requis' })}
                  className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 ${
                    errors.objet ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                >
                  <option value="">Sélectionnez un sujet</option>
                  {sujets.map((sujet) => (
                    <option key={sujet.value} value={sujet.value}>
                      {sujet.label}
                    </option>
                  ))}
                </select>
                {errors.objet && (
                  <p className="text-red-600 text-sm mt-1">{errors.objet.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows="5"
                  {...register('message', {
                    required: 'Ce champ est requis',
                    minLength: { value: 10, message: 'Au moins 10 caractères' }
                  })}
                  className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 ${
                    errors.message ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Bouton d'envoi */}
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  leftIcon={<Send size={18} />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>

                {successMessage && (
                  <p className="text-green-600 mt-3 font-medium">{successMessage}</p>
                )}
                {serverErrors?.general && (
                  <p className="text-red-600 mt-3 font-medium">{serverErrors.general}</p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Carte de localisation */}
        <div className="mt-16">
          <h2 className="text-2xl font-poppins font-bold text-blue-950 mb-6">Notre Localisation</h2>
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Localisation />
          </div>
        </div>
      </div>
    </>
  );
} 