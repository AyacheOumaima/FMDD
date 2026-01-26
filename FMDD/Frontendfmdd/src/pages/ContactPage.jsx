import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Button from '../components/ui/Button';
import { Phone, Mail, MapPin, Send } from 'lucide-react'; // ArrowRight was imported but not used
import Localisation from '../components/commun/Location';
import api from '../axios'; // Ensure 'api' is properly configured for error handling
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  // No longer need apiError state if toast handles all error messages directly
  // const [apiError, setApiError] = useState('');

  // List of options for the "Sujet" dropdown menu
  const sujets = [
    { value: '', label: 'Sélectionnez un sujet' }, // Added a default, disabled option for better UX
    { value: 'information', label: 'Demande d\'information' },
    { value: 'partenariat', label: 'Proposition de partenariat' },
    { value: 'support', label: 'Support technique' },
    { value: 'autre', label: 'Autre' },
  ];

  // Ref for the loading toast ID
  const loadingToastId = useRef(null);

  // Removed useEffect for api.initializeApi() if it's not strictly necessary here.
  // axios instances are typically initialized once globally or handled within an interceptor.
  // If `api.initializeApi()` performs critical, page-specific setup, keep it, but consider
  // if it truly needs to be called on every mount of this component.
  /*
  useEffect(() => {
    if (api && typeof api.initializeApi === 'function') {
      api.initializeApi();
    }
  }, []);
  */

  const onSubmit = async (data) => {
    try {
      // Set loading toast
      loadingToastId.current = toast.loading('Envoi en cours...', {
        position: 'top-right',
        theme: 'colored', // Consistent theme
      });

      const response = await api.post('/contact', {
        nom_complet: data.name,
        email: data.email,
        objet: data.subject,
        message: data.message,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.update(loadingToastId.current, {
          render: '✅ Message envoyé avec succès !',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        reset(); // Reset form on success
      } else {
        // This block might be redundant if Axios throws an error for non-2xx responses by default.
        // If your Axios config explicitly resolves non-2xx, then this is needed.
        toast.update(loadingToastId.current, {
          render: '❌ Erreur lors de l\'envoi du message.',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        // You might want to log the specific non-2xx status for debugging if needed
        console.error('Server responded with non-success status:', response.status, response.data);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);

      let errorMessage = '❌ Une erreur inattendue s\'est produite.';
      let detailedError = 'Veuillez réessayer plus tard.'; // Default detailed message

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;
        const serverMessage = error.response.data?.message || 'Réponse du serveur inconnue.';

        if (status === 400) {
          errorMessage = '📝 Données invalides.';
          detailedError = `Vérifiez les informations saisies. (${serverMessage})`;
        } else if (status === 404) {
          errorMessage = '🔍 Service non trouvé.';
          detailedError = 'Le service de contact n\'est pas disponible.';
        } else if (status === 422) {
          errorMessage = '🚫 Champs manquants ou incorrects.';
          detailedError = `Vérifiez les données du formulaire. (${serverMessage})`;
        } else if (status >= 500) {
          errorMessage = '⚠️ Erreur serveur.';
          detailedError = `Un problème est survenu côté serveur. (${serverMessage})`;
        } else {
          errorMessage = `❌ Erreur (${status}).`;
          detailedError = `Problème avec votre requête. (${serverMessage})`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = '📡 Pas de réponse du serveur.';
        detailedError = 'Le serveur ne répond pas. Vérifiez votre connexion internet.';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = '💡 Erreur de configuration.';
        detailedError = 'Veuillez contacter l\'administrateur si le problème persiste.';
      }

      // Update the toast with the specific error message
      if (loadingToastId.current) {
        toast.update(loadingToastId.current, {
          render: `${errorMessage} ${detailedError}`, // Combine for a more informative toast
          type: 'error',
          isLoading: false,
          autoClose: 7000, // Give more time for error messages
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      } else {
        // Fallback if loading toast wasn't set for some reason
        toast.error(`${errorMessage} ${detailedError}`, {
          position: 'top-right',
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | FMDD</title>
        <meta
          name="description"
          content="Contactez l'équipe du Forum Marocain pour le Développement Durable pour toute question ou collaboration."
        />
      </Helmet>

      {/* Header */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-poppins font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Une question, une proposition de partenariat ou un besoin spécifique ? N'hésitez pas à nous contacter,
            notre équipe vous répondra dans les meilleurs délais.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-10">
            <h2 className="text-2xl font-poppins font-bold text-blue-dark mb-6">Nos coordonnées</h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-turquoise text-white">
                    <MapPin size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-blue-dark mb-1">Adresse</h3>
                  <p className="text-gray-700">
                    Avenue des FAR, Centre ville
                    <br />
                    Casablanca, Maroc
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-turquoise text-white">
                    <Phone size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-blue-dark mb-1">Téléphone</h3>
                  <a href="tel:+212645766188" className="text-gray-700 hover:text-blue-dark">
                    +212 6 45 76 61 88
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-turquoise text-white">
                    <Mail size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-blue-dark mb-1">Email</h3>
                  <a href="mailto:contact@fmdd.ma" className="text-gray-700 hover:text-blue-dark">
                    contact@fmdd.ma
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-lg font-medium text-blue-dark mb-4">Nos horaires</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div className="font-medium">Lundi - Vendredi</div>
                  <div>9h00 - 18h00</div>
                  <div className="font-medium">Samedi</div>
                  <div>9h00 - 13h00</div>
                  <div className="font-medium">Dimanche</div>
                  <div>Fermé</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div>
              <a
                href="https://wa.me/212645766188"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                <Send size={18} className="mr-2" />
                Contactez-nous sur WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-poppins font-bold text-blue-dark mb-6">Envoyez-nous un message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">

                  {/* {apiError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {apiError}
                    </div>
                  )} */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register('name', {
                          required: 'Le nom complet est requis.',
                          minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères.' },
                          maxLength: { value: 100, message: 'Le nom ne peut pas dépasser 100 caractères.' }, // Added max length
                        })}
                        className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise ${errors.name ? 'border-red-500 focus:ring-red-500' : ''
                          }`}
                        aria-invalid={errors.name ? 'true' : 'false'} // ARIA attribute for accessibility
                      />
                      {errors.name && (
                        <p role="alert" className="text-red-600 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email', {
                          required: 'L\'email est requis.',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Veuillez saisir une adresse email valide.',
                          },
                        })}
                        className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise ${errors.email ? 'border-red-500 focus:ring-red-500' : ''
                          }`}
                        aria-invalid={errors.email ? 'true' : 'false'}
                      />
                      {errors.email && (
                        <p role="alert" className="text-red-600 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      {...register('subject', { required: 'Veuillez sélectionner un sujet.' })}
                      className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                      aria-invalid={errors.subject ? 'true' : 'false'}
                    >
                      {sujets.map((sujet) => (
                        <option key={sujet.value} value={sujet.value} disabled={sujet.value === ''}>
                          {sujet.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p role="alert" className="text-red-600 text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      {...register('message', {
                        required: 'Le message est requis.',
                        minLength: { value: 10, message: 'Le message doit contenir au moins 10 caractères.' },
                        maxLength: { value: 1000, message: 'Le message ne peut pas dépasser 1000 caractères.' }, // Added max length
                      })}
                      className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise ${errors.message ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                      aria-invalid={errors.message ? 'true' : 'false'}
                    ></textarea>
                    {errors.message && (
                      <p role="alert" className="text-red-600 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      leftIcon={<Send size={18} />}
                      disabled={isSubmitting} // Disable button while submitting
                    >
                      {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
                    </Button>

                    {/* This success message is redundant if toast handles it. Keep only one. */}
                    {/* {isSubmitSuccessful && (
                      <p className="text-green-600 mt-3">
                        Votre message a été envoyé avec succès.
                      </p>
                    )} */}
                  </div>
                </form>
              </div>

              {/* Localisation Section */}
              <div>
                <h2 className="text-2xl font-poppins font-bold text-blue-950 mb-6">Notre Localisation</h2>
                <Localisation />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}