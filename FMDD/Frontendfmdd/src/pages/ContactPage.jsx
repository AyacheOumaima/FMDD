import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import Button from '../components/ui/Button';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Localisation from '../components/commun/Location';
import api from '../axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLanguage } from "../contexts/LanguageContext";

// Translations object
const texts = {
  FR: {
    title: "Contact | FMDD",
    metaDescription: "Contactez l'équipe du Forum Marocain pour le Développement Durable pour toute question ou collaboration.",
    headerTitle: "Contactez-nous",
    headerDescription: "Une question, une proposition de partenariat ou un besoin spécifique ? N'hésitez pas à nous contacter, notre équipe vous répondra dans les meilleurs délais.",
    contactDetails: "Nos coordonnées",
    addressTitle: "Adresse",
    address1: "Avenue des FAR, Centre ville",
    address2: "Casablanca, Maroc",
    phoneTitle: "Téléphone",
    emailTitle: "Email",
    hoursTitle: "Nos horaires",
    mondayFriday: "Lundi - Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
    closed: "Fermé",
    whatsapp: "Contactez-nous sur WhatsApp",
    sendMessage: "Envoyez-nous un message",
    fullName: "Nom complet",
    required: "requis",
    email: "Email",
    subject: "Sujet",
    message: "Message",
    send: "Envoyer le message",
    sending: "Envoi en cours…",
    localization: "Notre Localisation",
    selectSubject: "Sélectionnez un sujet",
    informationRequest: "Demande d'information",
    partnershipProposal: "Proposition de partenariat",
    technicalSupport: "Support technique",
    other: "Autre",
    loadingToast: "Envoi en cours...",
    successToast: "✅ Message envoyé avec succès !",
    errorToast: "❌ Erreur lors de l'envoi du message.",
    unexpectedError: "❌ Une erreur inattendue s'est produite.",
    tryAgain: "Veuillez réessayer plus tard.",
    invalidData: "📝 Données invalides.",
    serviceNotFound: "🔍 Service non trouvé.",
    missingFields: "🚫 Champs manquants ou incorrects.",
    serverError: "⚠️ Erreur serveur.",
    noResponse: "📡 Pas de réponse du serveur.",
    configError: "💡 Erreur de configuration.",
    contactAdmin: "Veuillez contacter l'administrateur si le problème persiste.",
    validation: {
      nameRequired: "Le nom complet est requis.",
      nameMinLength: "Le nom doit contenir au moins 2 caractères.",
      nameMaxLength: "Le nom ne peut pas dépasser 100 caractères.",
      emailRequired: "L'email est requis.",
      emailInvalid: "Veuillez saisir une adresse email valide.",
      subjectRequired: "Veuillez sélectionner un sujet.",
      messageRequired: "Le message est requis.",
      messageMinLength: "Le message doit contenir au moins 10 caractères.",
      messageMaxLength: "Le message ne peut pas dépasser 1000 caractères."
    }
  },
  EN: {
    title: "Contact | FMDD",
    metaDescription: "Contact the Moroccan Forum for Sustainable Development team for any questions or collaboration.",
    headerTitle: "Contact Us",
    headerDescription: "A question, a partnership proposal or a specific need? Feel free to contact us, our team will respond as soon as possible.",
    contactDetails: "Our Contact Details",
    addressTitle: "Address",
    address1: "Avenue des FAR, City Center",
    address2: "Casablanca, Morocco",
    phoneTitle: "Phone",
    emailTitle: "Email",
    hoursTitle: "Our Hours",
    mondayFriday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    whatsapp: "Contact us on WhatsApp",
    sendMessage: "Send us a message",
    fullName: "Full Name",
    required: "required",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    sending: "Sending…",
    localization: "Our Location",
    selectSubject: "Select a subject",
    informationRequest: "Information Request",
    partnershipProposal: "Partnership Proposal",
    technicalSupport: "Technical Support",
    other: "Other",
    loadingToast: "Sending...",
    successToast: "✅ Message sent successfully!",
    errorToast: "❌ Error sending message.",
    unexpectedError: "❌ An unexpected error occurred.",
    tryAgain: "Please try again later.",
    invalidData: "📝 Invalid data.",
    serviceNotFound: "🔍 Service not found.",
    missingFields: "🚫 Missing or incorrect fields.",
    serverError: "⚠️ Server error.",
    noResponse: "📡 No response from server.",
    configError: "💡 Configuration error.",
    contactAdmin: "Please contact the administrator if the problem persists.",
    validation: {
      nameRequired: "Full name is required.",
      nameMinLength: "Name must be at least 2 characters.",
      nameMaxLength: "Name cannot exceed 100 characters.",
      emailRequired: "Email is required.",
      emailInvalid: "Please enter a valid email address.",
      subjectRequired: "Please select a subject.",
      messageRequired: "Message is required.",
      messageMinLength: "Message must be at least 10 characters.",
      messageMaxLength: "Message cannot exceed 1000 characters."
    }
  },
  AR: {
    title: "اتصال | الفيدرالية المغربية للتنمية المستدامة",
    metaDescription: "اتصل بفريق المنتدى المغربي للتنمية المستدامة لأي سؤال أو تعاون.",
    headerTitle: "اتصل بنا",
    headerDescription: "هل لديك سؤال أو اقتراح شراكة أو حاجة محددة؟ لا تتردد في الاتصال بنا، سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.",
    contactDetails: "معلومات الاتصال",
    addressTitle: "العنوان",
    address1: "زنقة أحمد المنصور الذهبي",
    address2: "الدار البيضاء، المغرب",
    phoneTitle: "الهاتف",
    emailTitle: "البريد الإلكتروني",
    hoursTitle: "ساعات العمل",
    mondayFriday: "الإثنين - الجمعة",
    saturday: "السبت",
    sunday: "الأحد",
    closed: "مغلق",
    whatsapp: "تواصل معنا على واتساب",
    sendMessage: "أرسل لنا رسالة",
    fullName: "الاسم الكامل",
    required: "مطلوب",
    email: "البريد الإلكتروني",
    subject: "الموضوع",
    message: "الرسالة",
    send: "إرسال الرسالة",
    sending: "جاري الإرسال…",
    localization: "موقعنا",
    selectSubject: "اختر موضوعًا",
    informationRequest: "طلب معلومات",
    partnershipProposal: "اقتراح شراكة",
    technicalSupport: "دعم فني",
    other: "أخرى",
    loadingToast: "جاري الإرسال...",
    successToast: "✅ تم إرسال الرسالة بنجاح!",
    errorToast: "❌ خطأ في إرسال الرسالة.",
    unexpectedError: "❌ حدث خطأ غير متوقع.",
    tryAgain: "يرجى المحاولة مرة أخرى لاحقًا.",
    invalidData: "📝 بيانات غير صالحة.",
    serviceNotFound: "🔍 الخدمة غير موجودة.",
    missingFields: "🚫 حقول مفقودة أو غير صحيحة.",
    serverError: "⚠️ خطأ في الخادم.",
    noResponse: "📡 لا يوجد رد من الخادم.",
    configError: "💡 خطأ في التكوين.",
    contactAdmin: "يرجى الاتصال بالمسؤول إذا استمرت المشكلة.",
    validation: {
      nameRequired: "الاسم الكامل مطلوب.",
      nameMinLength: "يجب أن يحتوي الاسم على الأقل على حرفين.",
      nameMaxLength: "لا يمكن أن يتجاوز الاسم 100 حرف.",
      emailRequired: "البريد الإلكتروني مطلوب.",
      emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صالح.",
      subjectRequired: "يرجى اختيار موضوع.",
      messageRequired: "الرسالة مطلوبة.",
      messageMinLength: "يجب أن تحتوي الرسالة على الأقل على 10 أحرف.",
      messageMaxLength: "لا يمكن أن تتجاوز الرسالة 1000 حرف."
    }
  }
};

// Subject options for each language
const sujets = {
  FR: [
    { value: '', label: 'Sélectionnez un sujet' },
    { value: 'information', label: 'Demande d\'information' },
    { value: 'partenariat', label: 'Proposition de partenariat' },
    { value: 'support', label: 'Support technique' },
    { value: 'autre', label: 'Autre' },
  ],
  EN: [
    { value: '', label: 'Select a subject' },
    { value: 'information', label: 'Information Request' },
    { value: 'partenariat', label: 'Partnership Proposal' },
    { value: 'support', label: 'Technical Support' },
    { value: 'autre', label: 'Other' },
  ],
  AR: [
    { value: '', label: 'اختر موضوعًا' },
    { value: 'information', label: 'طلب معلومات' },
    { value: 'partenariat', label: 'اقتراح شراكة' },
    { value: 'support', label: 'دعم فني' },
    { value: 'autre', label: 'أخرى' },
  ]
};

export default function ContactPage() {
  const { language } = useLanguage();
  const lang = texts[language] ? language : "FR";
  const t = texts[lang];
  const currentSujets = sujets[lang];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const loadingToastId = useRef(null);

  const onSubmit = async (data) => {
    try {
      loadingToastId.current = toast.loading(t.loadingToast, {
        position: lang === 'AR' ? 'top-left' : 'top-right',
        theme: 'colored',
      });

      const response = await api.post('/contact', {
        nom_complet: data.name,
        email: data.email,
        objet: data.subject,
        message: data.message,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.update(loadingToastId.current, {
          render: t.successToast,
          type: 'success',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        reset();
      } else {
        toast.update(loadingToastId.current, {
          render: t.errorToast,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        console.error('Server responded with non-success status:', response.status, response.data);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);

      let errorMessage = t.unexpectedError;
      let detailedError = t.tryAgain;

      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message || 'Réponse du serveur inconnue.';

        if (status === 400) {
          errorMessage = t.invalidData;
          detailedError = `Vérifiez les informations saisies. (${serverMessage})`;
        } else if (status === 404) {
          errorMessage = t.serviceNotFound;
          detailedError = 'Le service de contact n\'est pas disponible.';
        } else if (status === 422) {
          errorMessage = t.missingFields;
          detailedError = `Vérifiez les données du formulaire. (${serverMessage})`;
        } else if (status >= 500) {
          errorMessage = t.serverError;
          detailedError = `Un problème est survenu côté serveur. (${serverMessage})`;
        } else {
          errorMessage = `❌ Erreur (${status}).`;
          detailedError = `Problème avec votre requête. (${serverMessage})`;
        }
      } else if (error.request) {
        errorMessage = t.noResponse;
        detailedError = 'Le serveur ne répond pas. Vérifiez votre connexion internet.';
      } else {
        errorMessage = t.configError;
        detailedError = t.contactAdmin;
      }

      if (loadingToastId.current) {
        toast.update(loadingToastId.current, {
          render: `${errorMessage} ${detailedError}`,
          type: 'error',
          isLoading: false,
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      } else {
        toast.error(`${errorMessage} ${detailedError}`, {
          position: lang === 'AR' ? 'top-left' : 'top-right',
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
    <div dir={lang === "AR" ? "rtl" : "ltr"}>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
      </Helmet>

      {/* Header */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className={`text-4xl font-poppins font-bold text-white mb-4 ${lang === 'AR' ? 'text-right font-arabic' : ''}`}>
            {t.headerTitle}
          </h1>
          <p className={`text-xl text-gray-200 max-w-3xl ${lang === 'AR' ? 'text-right font-arabic' : ''}`}>
            {t.headerDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* For Arabic: Contact Form first, Contact Details second */}
          {lang === 'AR' ? (
            <>
              {/* Contact Form (on the LEFT for Arabic) */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  <div>
                    <h2 className={`text-2xl font-poppins font-bold text-blue-dark mb-6 ${lang === 'AR' ? 'text-right font-arabic' : ''}`}>
                      {t.sendMessage}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                            {t.fullName} <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            dir="rtl"
                            {...register('name', {
                              required: t.validation.nameRequired,
                              minLength: { value: 2, message: t.validation.nameMinLength },
                              maxLength: { value: 100, message: t.validation.nameMaxLength },
                            })}
                            className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise text-right ${errors.name ? 'border-red-500 focus:ring-red-500' : ''
                              }`}
                            aria-invalid={errors.name ? 'true' : 'false'}
                          />
                          {errors.name && (
                            <p role="alert" className={`text-red-600 text-sm mt-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                            {t.email} <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            dir="rtl"
                            {...register('email', {
                              required: t.validation.emailRequired,
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t.validation.emailInvalid,
                              },
                            })}
                            className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise text-right ${errors.email ? 'border-red-500 focus:ring-red-500' : ''
                              }`}
                            aria-invalid={errors.email ? 'true' : 'false'}
                          />
                          {errors.email && (
                            <p role="alert" className={`text-red-600 text-sm mt-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                          {t.subject} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          dir="rtl"
                          {...register('subject', { required: t.validation.subjectRequired })}
                          className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise text-right ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                          aria-invalid={errors.subject ? 'true' : 'false'}
                        >
                          {currentSujets.map((sujet) => (
                            <option key={sujet.value} value={sujet.value} disabled={sujet.value === ''}>
                              {sujet.label}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p role="alert" className={`text-red-600 text-sm mt-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className={`block text-sm font-medium text-gray-700 mb-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                          {t.message} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows="5"
                          dir="rtl"
                          {...register('message', {
                            required: t.validation.messageRequired,
                            minLength: { value: 10, message: t.validation.messageMinLength },
                            maxLength: { value: 1000, message: t.validation.messageMaxLength },
                          })}
                          className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise text-right ${errors.message ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                          aria-invalid={errors.message ? 'true' : 'false'}
                        ></textarea>
                        {errors.message && (
                          <p role="alert" className={`text-red-600 text-sm mt-1 ${lang === 'AR' ? 'text-right' : ''}`}>
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          rightIcon={<Send size={18} />}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? t.sending : t.send}
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Localisation Section */}
                  <div>
                    <h2 className={`text-2xl font-poppins font-bold text-blue-950 mb-6 ${lang === 'AR' ? 'text-right font-arabic' : ''}`}>
                      {t.localization}
                    </h2>
                    <Localisation />
                  </div>
                </div>
              </div>

              {/* Contact Details (on the RIGHT for Arabic) */}
              <div className="lg:col-span-1 space-y-10">
                <h2 className={`text-2xl font-poppins font-bold text-blue-dark mb-6 ${lang === 'AR' ? 'text-right font-arabic' : ''}`}>
                  {t.contactDetails}
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 ml-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-turquoise text-white">
                        <MapPin size={24} />
                      </div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-lg font-medium text-blue-dark mb-1">{t.addressTitle}</h3>
                      <p className="text-gray-700">
                        {t.address1}
                        <br />
                        {t.address2}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 ml-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-turquoise text-white">
                        <Phone size={24} />
                      </div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-lg font-medium text-blue-dark mb-1">{t.phoneTitle}</h3>
                      <a href="tel:+212645466188" className="text-gray-700 hover:text-blue-dark">
                        +212 6 45 46 61 88
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 ml-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-turquoise text-white">
                        <Mail size={24} />
                      </div>
                    </div>
                    <div className="text-right">
                      <h3 className="text-lg font-medium text-blue-dark mb-1">{t.emailTitle}</h3>
                      <a href="mailto:contact@fmdd.ma" className="text-gray-700 hover:text-blue-dark">
                        contact@fmdd.ma
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className={`text-lg font-medium text-blue-dark mb-4 ${lang === 'AR' ? 'text-right' : ''}`}>
                    {t.hoursTitle}
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 text-right">
                      <div className="font-medium">{t.mondayFriday}</div>
                      <div>9h00 - 18h00</div>
                      <div className="font-medium">{t.saturday}</div>
                      <div>9h00 - 13h00</div>
                      <div className="font-medium">{t.sunday}</div>
                      <div>{t.closed}</div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="text-right">
                  <a
                    href="https://wa.me/212645766188"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition flex-row-reverse"
                  >
                    <Send size={18} className="ml-2" />
                    {t.whatsapp}
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* For FR and EN: Contact Details first, Contact Form second */}
              <div className="lg:col-span-1 space-y-10">
                <h2 className="text-2xl font-poppins font-bold text-blue-dark mb-6">
                  {t.contactDetails}
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-turquoise text-white">
                        <MapPin size={24} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-blue-dark mb-1">{t.addressTitle}</h3>
                      <p className="text-gray-700">
                        {t.address1}
                        <br />
                        {t.address2}
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
                      <h3 className="text-lg font-medium text-blue-dark mb-1">{t.phoneTitle}</h3>
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
                      <h3 className="text-lg font-medium text-blue-dark mb-1">{t.emailTitle}</h3>
                      <a href="mailto:contact@fmdd.ma" className="text-gray-700 hover:text-blue-dark">
                        contact@fmdd.ma
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className="text-lg font-medium text-blue-dark mb-4">
                    {t.hoursTitle}
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div className="font-medium">{t.mondayFriday}</div>
                      <div>9h00 - 18h00</div>
                      <div className="font-medium">{t.saturday}</div>
                      <div>9h00 - 13h00</div>
                      <div className="font-medium">{t.sunday}</div>
                      <div>{t.closed}</div>
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
                    {t.whatsapp}
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-poppins font-bold text-blue-dark mb-6">
                      {t.sendMessage}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {t.fullName} <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            {...register('name', {
                              required: t.validation.nameRequired,
                              minLength: { value: 2, message: t.validation.nameMinLength },
                              maxLength: { value: 100, message: t.validation.nameMaxLength },
                            })}
                            className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise ${errors.name ? 'border-red-500 focus:ring-red-500' : ''
                              }`}
                            aria-invalid={errors.name ? 'true' : 'false'}
                          />
                          {errors.name && (
                            <p role="alert" className="text-red-600 text-sm mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t.email} <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            {...register('email', {
                              required: t.validation.emailRequired,
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t.validation.emailInvalid,
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
                          {t.subject} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          {...register('subject', { required: t.validation.subjectRequired })}
                          className={`w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-turquoise ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''
                            }`}
                          aria-invalid={errors.subject ? 'true' : 'false'}
                        >
                          {currentSujets.map((sujet) => (
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
                          {t.message} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows="5"
                          {...register('message', {
                            required: t.validation.messageRequired,
                            minLength: { value: 10, message: t.validation.messageMinLength },
                            maxLength: { value: 1000, message: t.validation.messageMaxLength },
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
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? t.sending : t.send}
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Localisation Section */}
                  <div>
                    <h2 className="text-2xl font-poppins font-bold text-blue-950 mb-6">
                      {t.localization}
                    </h2>
                    <Localisation />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position={lang === 'AR' ? 'top-left' : 'top-right'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={lang === 'AR'}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}