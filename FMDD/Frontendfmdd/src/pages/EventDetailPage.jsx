import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../axios'; // Utiliser l'instance axios configurée
import { useAuth } from '../contexts/AuthContext';
import IntervenantCard from '../components/commun/IntervenantCard';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Timer,
  CheckCircle,
  UserPlus,
  User,
  Eye,
  X,
  XCircle,
  Clock,
  CheckCircle2,
  CreditCard,
  Loader2,
  AlarmClock,
  AlertCircle
} from 'lucide-react';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // États
  const [event, setEvent] = useState(null);
  const [intervenants, setIntervenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Ajout de l'état manquant eventData
  const [eventData, setEventData] = useState({
    titre: 'Chargement...',
    description: '',
    dateHeure: '',
    lieu: '',
    categorie: 'Général',
    type_evenement: 'gratuit',
    limite_de_places: 0,
    nombre_inscrits: 0,
    date_limite_inscription: null
  });

  // États pour le profil adhérent
  const [adherentProfile, setAdherentProfile] = useState(null);
  const [isAdherentActive, setIsAdherentActive] = useState(false);

  // Calculer le pourcentage de remplissage
  const fillPercentage = eventData.limite_de_places > 0
    ? Math.min((eventData.nombre_inscrits / eventData.limite_de_places) * 100, 100)
    : 0;

  // Vérifier si les inscriptions sont ouvertes
  const isRegistrationOpen = event?.["date_limite_d'inscription"] ?
    new Date() <= new Date(event["date_limite_d'inscription"]) : true;

  // Récupérer les détails de l'événement
  const fetchEventDetails = async () => {
    console.log('🔍 === DÉBUT fetchEventDetails ===');
    console.log('📋 Contexte initial:', {
      eventId: id,
      isAuthenticated,
      user: user ? { id: user.id, role: user.role, email: user.email } : 'Non connecté'
    });
    
    // Vérifier que l'ID est défini
    if (!id || id === 'undefined') {
      console.error('❌ ID de l\'événement manquant ou undefined');
      setError('ID de l\'événement manquant');
      setLoading(false);
      return;
    }

    console.log('📡 === RÉCUPÉRATION DÉTAILS ÉVÉNEMENT ===');
    console.log('🎫 ID événement:', id);
    console.log('👤 Utilisateur connecté:', isAuthenticated ? 'Oui' : 'Non');
    console.log('🔍 En-têtes de la requête:', {
      'Authorization': `Bearer ${localStorage.getItem('token')?.substring(0, 10)}...`,
      'Accept': 'application/json'
    });

    try {
      setLoading(true);
      const response = await api.get(`/events/${id}`);

      console.log('✅ Réponse API événement reçue:', {
        status: response.status,
        statusText: response.statusText,
        dataKeys: response.data ? Object.keys(response.data) : 'null',
        data: response.data
      });

      // 🔍 LOG SPÉCIAL pour debug date/lieu
      console.log('🔍 DEBUG DATE/LIEU - Champs disponibles:', {
        date: response.data.date,
        heure: response.data.heure,
        lieu: response.data.lieu,
        ville: response.data.ville,
        date_debut: response.data.date_debut,
        date_fin: response.data.date_fin,
        allFields: Object.keys(response.data)
      });

      if (response.data) {
        console.log('✅ Données de l\'événement reçues:', {
          titre: response.data.titre,
          type_evenement: response.data.type_evenement,
          date: response.data.date,
          is_registered: response.data.is_registered,
          statut_inscription: response.data.registration?.statut,
          statut_paiement: response.data.registration?.statut_paiement,
          user_role: user?.role,
          is_adherent: response.data.is_adherent
        });
        console.log('📊 Réponse complète de l\'API:', JSON.stringify(response.data, null, 2));
        setEvent(response.data);
        
        // Extraire les données importantes
        const processedData = {
          titre: response.data.titre || 'Événement sans titre',
          description: response.data.description || '',
          date_debut: response.data.date_debut || response.data.date || null,
          date_fin: response.data.date_fin || null,
          lieu: response.data.lieu || response.data.ville || '',
          type_evenement: response.data.type_evenement || 'gratuit',
          limite_de_places: response.data.limite_de_places || 0,
          nombre_inscrits: response.data.nombre_inscrits || 0,
          prix: response.data.prix || 0,
          dateHeure: (() => {
            // 🔧 CORRECTION : Essayer plusieurs combinaisons de champs date/heure
            const dateField = response.data.date || response.data.date_debut;
            const heureField = response.data.heure || response.data.time;

            console.log('🔍 DEBUG formatage date:', {
              dateField,
              heureField,
              dateType: typeof dateField,
              heureType: typeof heureField
            });

            if (dateField && heureField) {
              try {
                // Essayer différents formats de combinaison
                let dateTime;

                // Format ISO ou standard
                if (dateField.includes('T') || dateField.includes(' ')) {
                  dateTime = new Date(dateField);
                } else {
                  // Combiner date et heure
                  dateTime = new Date(`${dateField}T${heureField}`);

                  // Si ça ne marche pas, essayer avec un espace
                  if (isNaN(dateTime.getTime())) {
                    dateTime = new Date(`${dateField} ${heureField}`);
                  }
                }

                if (!isNaN(dateTime.getTime())) {
                  return dateTime.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                } else {
                  console.warn('Date invalide, utilisation du format brut');
                  return `${dateField} à ${heureField}`;
                }
              } catch (error) {
                console.error('Erreur formatage date:', error);
                return `${dateField} à ${heureField}`;
              }
            } else if (dateField) {
              try {
                const date = new Date(dateField);
                if (!isNaN(date.getTime())) {
                  return date.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });
                } else {
                  return dateField; // Retourner la date brute si le parsing échoue
                }
              } catch (error) {
                console.error('Erreur formatage date seule:', error);
                return dateField;
              }
            }
            return 'Date non spécifiée';
          })(),
          categorie: response.data.categorie || 'Général',
          date_limite_inscription: response.data["date_limite_d'inscription"] ?
            new Date(response.data["date_limite_d'inscription"]).toLocaleDateString('fr-FR') : null
        };
        
        // Maintenant setEventData est défini, donc cette ligne fonctionnera
        setEventData(processedData);
        
        // Vérifier si l'utilisateur est inscrit
        let isUserRegistered = false;
        let userRegistrationStatus = null;
        let userPaymentStatus = null;
        let registrationId = null;

        // Méthode 1: Vérifier user_registration_status
        if (response.data.user_registration_status) {
          isUserRegistered = response.data.user_registration_status.is_registered === true;
          userRegistrationStatus = response.data.user_registration_status.status || 'en_attente';
          userPaymentStatus = response.data.user_registration_status.payment_status || 'en_attente';
          registrationId = response.data.user_registration_status.registration_id || null;
          console.log('📊 Statut d\'inscription trouvé dans user_registration_status:', {
            isUserRegistered,
            userRegistrationStatus,
            userPaymentStatus,
            registrationId
          });
        }

        // Méthode 2: Vérifier is_registered directement
        if (response.data.is_registered !== undefined) {
          isUserRegistered = response.data.is_registered === true;
          console.log('📊 Statut d\'inscription trouvé dans is_registered:', isUserRegistered);
        }

        // Méthode 3: Vérifier registration
        if (response.data.registration) {
          isUserRegistered = true;
          userRegistrationStatus = response.data.registration.statut || response.data.registration.status || 'en_attente';
          userPaymentStatus = response.data.registration.statut_paiement || response.data.registration.payment_status || 'en_attente';
          registrationId = response.data.registration.id || null;
          console.log('📊 Statut d\'inscription trouvé dans registration:', {
            userRegistrationStatus,
            userPaymentStatus,
            registrationId
          });
        }

        console.log('📊 Statut d\'inscription final:', {
          isUserRegistered,
          userRegistrationStatus,
          userPaymentStatus,
          registrationId
        });

        // Mettre à jour l'état avec les informations d'inscription
        setIsRegistered(isUserRegistered);

        if (isUserRegistered) {
          // Récupérer d'abord le profil adhérent, puis les détails d'inscription
          if (isAuthenticated) {
            await fetchAdherentProfile();
            // Attendre un peu pour que isAdherentActive soit mis à jour
            setTimeout(() => {
              fetchRegistrationDetails();
            }, 500);
          }
        } else {
          setRegistrationDetails(null);
        }

        // Récupérer les intervenants si disponibles
        if (response.data.intervenants && Array.isArray(response.data.intervenants)) {
          setIntervenants(response.data.intervenants);
        }
      } else {
        setError('Aucune donnée d\'événement trouvée');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des détails de l\'événement:', error);
      setError('Erreur lors du chargement de l\'événement');
    } finally {
      setLoading(false);
      console.log('📡 === FIN RÉCUPÉRATION ÉVÉNEMENT ===');
    }
  };

  // Récupérer les détails d'inscription depuis l'API myRegistrations
  const fetchRegistrationDetails = async () => {
    console.log('🔍 === DÉBUT fetchRegistrationDetails ===');
    console.log('📋 Contexte:', {
      isAuthenticated,
      eventId: id,
      user: user ? {
        id: user.id,
        role: user.role,
        isAdherent: user.is_adherent
      } : 'Non connecté'
    });
    
    if (!isAuthenticated || !id) {
      console.log('❌ fetchRegistrationDetails: Conditions non remplies', {
        isAuthenticated,
        eventId: id
      });
      return;
    }

    try {
      console.log('📡 === RÉCUPÉRATION DÉTAILS INSCRIPTION VIA MY REGISTRATIONS ===');
      const response = await api.get('/events/my/registrations');

      console.log('✅ Réponse API my registrations:', {
        status: response.status,
        data: response.data,
        dataKeys: response.data ? Object.keys(response.data) : 'null'
      });

      if (response.data && response.data.registrations) {
        // Chercher l'inscription pour cet événement spécifique
        const currentEventRegistration = response.data.registrations.find(reg =>
          reg.event && (reg.event.id == id || reg.event.id === parseInt(id))
        );

        console.log('🎯 Inscription trouvée pour cet événement:', currentEventRegistration);

        if (currentEventRegistration) {
          setRegistrationDetails({
            registration_status: currentEventRegistration.statut || 'en_attente',
            payment_status: currentEventRegistration.statut_paiement || 'non_paye',
            user_membership_status: isAdherentActive ? 'actif' : 'non_actif',
            registration_id: currentEventRegistration.id || null,
            message_statut: currentEventRegistration.message_statut || '',
            action_required: currentEventRegistration.action_required || null
          });
          console.log('✅ Détails d\'inscription mis à jour depuis myRegistrations');
        } else {
          console.log('⚠️ Aucune inscription trouvée pour cet événement dans myRegistrations');
          setRegistrationDetails(null);
        }
      }
    } catch (error) {
      console.log('❌ === ERREUR API MY REGISTRATIONS ===');
      console.log('🔍 Type d\'erreur:', error.constructor.name);
      console.log('📊 Détails erreur:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      });

      // En cas d'erreur, utiliser les données simulées comme fallback
      if (event?.is_registered) {
        console.log('⚠️ Utilisation des données simulées en fallback');
        const simulatedDetails = getSimulatedRegistrationDetails();
        setRegistrationDetails(simulatedDetails);
      }
      console.log('❌ === FIN GESTION ERREUR ===');
    }
  };

  // Fonction pour obtenir des données simulées (fallback)
  const getSimulatedRegistrationDetails = () => {
    return {
      registration_status: 'accepte',
      payment_status: eventData.type_evenement === 'payant' ? 'non_paye' : 'gratuit',
      user_membership_status: isAdherentActive ? 'actif' : 'non_actif',
      registration_id: 'simulated-id'
    };
  };

  // Récupérer le profil adhérent
  const fetchAdherentProfile = async () => {
    console.log('🔍 === DÉBUT fetchAdherentProfile ===');
    console.log('👤 Informations utilisateur:', {
      isAuthenticated,
      user: user ? {
        id: user.id,
        email: user.email,
        role: user.role,
        isAdherent: user.is_adherent
      } : 'Non connecté'
    });
    
    if (!isAuthenticated || !user) {
      console.log('❌ fetchAdherentProfile: Conditions non remplies', {
        isAuthenticated,
        user: !!user
      });
      return;
    }

    try {
      console.log('📡 === RÉCUPÉRATION PROFIL ADHÉRENT ===');
      const response = await api.get('/adherent/profile');

      console.log('✅ Réponse API profil adhérent:', {
        status: response.status,
        data: response.data,
        dataKeys: response.data ? Object.keys(response.data) : 'null'
      });

      // 🔍 LOG DÉTAILLÉ pour debug
      console.log('🔍 DÉTAIL RÉPONSE API /adherent/profile:', JSON.stringify(response.data, null, 2));

      if (response.data) {
        setAdherentProfile(response.data);

        console.log('🔍 Analyse complète de la réponse:', JSON.stringify(response.data, null, 2));

        // Vérifier d'abord si l'utilisateur a un rôle adhérent
        const hasAdherentRole = user?.role === 'adherent' || user?.role === 'admin' || user?.role === 'super_admin';

        let isActive = false;

        if (!hasAdherentRole) {
          // Si l'utilisateur n'a pas le rôle adhérent, il est inactif
          isActive = false;
          console.log('👤 Utilisateur non adhérent → Inactif');
        }
        // ✅ CORRECTION : Utiliser la vraie structure retournée par l'API
        else if (response.data.is_active !== undefined) {
          // L'API retourne directement is_active calculé par le backend
          isActive = response.data.is_active === true;
          console.log('👤 Statut déterminé par is_active du backend:', response.data.is_active, '→', isActive);
        }
        // Fallback : vérifier adherent.statut_cotisation si is_active n'est pas présent
        else if (response.data.adherent && response.data.adherent.statut_cotisation) {
          // Le backend utilise 'payée' comme statut de cotisation valide
          isActive = response.data.adherent.statut_cotisation.toLowerCase() === 'payée';
          console.log('👤 Statut déterminé par adherent.statut_cotisation (fallback):', response.data.adherent.statut_cotisation, '→', isActive);
        }
        // Fallback final : vérifier la date de fin d'adhésion
        else if (response.data.adherent && response.data.adherent.date_fin_adhesion) {
          const dateFinAdhesion = new Date(response.data.adherent.date_fin_adhesion);
          isActive = dateFinAdhesion > new Date();
          console.log('👤 Statut déterminé par date_fin_adhesion (fallback):', response.data.adherent.date_fin_adhesion, '→', isActive);
        }
        // Si aucune des conditions ci-dessus n'est remplie, l'utilisateur n'est pas actif
        else {
          isActive = false;
          console.log('👤 Aucune preuve d\'adhésion active trouvée → Inactif');
        }

        // Mettre à jour l'état avec le statut déterminé
        setIsAdherentActive(isActive);
        console.log('✅ Statut adhérent final:', isActive ? 'Actif' : 'Inactif');

        // Log détaillé pour debug
        console.log('🔍 Détails de l\'analyse:', {
          hasAdherentRole,
          userRole: user?.role,
          responseIsActive: response.data.is_active,
          adherentData: response.data.adherent,
          finalIsActive: isActive
        });

        // 🔧 CORRECTION FORCÉE : Si les données montrent que l'adhérent est actif
        if (response.data.adherent && response.data.adherent.statut_cotisation === 'payée' && !isActive) {
          console.log('🔧 CORRECTION: Forçage du statut actif car statut_cotisation = payée');
          isActive = true;
          setIsAdherentActive(true);
        }
      }
    } catch (error) {
      console.log('❌ Erreur lors de la récupération du profil adhérent:', error);
      console.log('📊 Détails erreur:', {
        status: error.response?.status,
        data: error.response?.data
      });

      // Fallback: utiliser le rôle utilisateur
      const fallbackActive = user?.role === 'adherent' || user?.role === 'admin' || user?.role === 'super_admin';
      setIsAdherentActive(fallbackActive);
      console.log('👤 Statut adhérent (fallback):', fallbackActive ? 'Actif' : 'Inactif');
    }
  };

  // Utiliser les données de l'événement pour déterminer le statut d'inscription
  useEffect(() => {
    console.log('🔍 === ANALYSE DES DONNÉES UTILISATEUR ET ÉVÉNEMENT ===');
    console.log('👤 Données utilisateur complètes:', {
      user: user,
      userKeys: user ? Object.keys(user) : 'null',
      isAuthenticated: isAuthenticated,
      userRole: user?.role,
      userType: typeof user,
      userStringified: JSON.stringify(user, null, 2)
    });

    console.log('🎫 Données événement complètes:', {
      event: event,
      eventKeys: event ? Object.keys(event) : 'null',
      is_registered: event?.is_registered,
      eventStringified: event ? JSON.stringify(event, null, 2) : 'null'
    });

    if (event && event.is_registered !== undefined) {
      console.log('✅ Utilisateur inscrit détecté, récupération des détails...');
      setIsRegistered(event.is_registered);
      if (event.is_registered) {
        // Récupérer les détails d'inscription si l'utilisateur est inscrit
        fetchRegistrationDetails();
      } else {
        setRegistrationDetails(null);
      }
    }
    console.log('🔍 === FIN ANALYSE DONNÉES ===');
  }, [event, isAuthenticated, user]); // Ajout de user dans les dépendances

  // Charger les données au montage du composant
  useEffect(() => {
    const loadData = async () => {
      await fetchEventDetails();
      if (isAuthenticated) {
        await fetchAdherentProfile();
      }
    };
    loadData();
  }, [id, isAuthenticated]);

  // Fonction pour déterminer le statut d'inscription selon la logique métier
  const getRegistrationStatusInfo = () => {
    console.log('🔄 === DÉBUT getRegistrationStatusInfo ===');
    console.log('📋 registrationDetails:', registrationDetails);

    if (!registrationDetails) {
      console.log('❌ Pas de registrationDetails, retour null');
      return null;
    }

    const { registration_status, payment_status } = registrationDetails;
    console.log('📊 Extraction des statuts:', { registration_status, payment_status });
    const userRole = user?.role || 'user';
    
    // Vérifier si l'utilisateur a le rôle adhérent
    const hasAdherentRole = userRole === 'adherent' || userRole === 'admin' || userRole === 'super_admin';
    
    console.log('🔍 === ANALYSE STATUT INSCRIPTION ===');
    console.log('👤 Statut adhérent:', {
      role: userRole,
      hasAdherentRole,
      isAdherentActive
    });
    console.log('📊 Statut inscription:', {
      registration_status,
      payment_status,
      type_evenement: eventData.type_evenement
    });
    
    const isPayantEvent = eventData.type_evenement === 'payant' && event?.prix && parseFloat(event.prix) > 0;

    // Objet pour stocker les informations de statut
    const statusInfo = {
      status: registration_status,
      paymentStatus: payment_status,
      title: '',
      message: '',
      bgColor: '',
      borderColor: '',
      icon: null,
      actionButton: null
    };

    // Logique de statut selon l'état d'inscription
    if (registration_status === 'accepte') {
      // Inscription acceptée (adhérent actif uniquement)
      if (isPayantEvent) {
        if (payment_status === 'paye' || payment_status === 'valide') {
          // Événement payant avec paiement validé
          statusInfo.title = '✅ Inscription confirmée';
          statusInfo.message = 'Votre inscription est confirmée et votre paiement a été validé. Vous êtes inscrit(e) à cet événement !';
          statusInfo.bgColor = 'bg-green-50';
          statusInfo.borderColor = 'border-green-200';
          statusInfo.icon = <CheckCircle className="w-8 h-8 text-green-600" />;
          statusInfo.actionButton = {
            text: 'Annuler mon inscription',
            action: 'cancel',
            className: 'bg-red-500 hover:bg-red-600 text-white'
          };
        } else {
          // Événement payant sans paiement (adhérent actif)
          statusInfo.title = '💳 Paiement requis';
          statusInfo.message = 'Félicitations ! Votre inscription est acceptée car vous êtes adhérent actif. Procédez maintenant au paiement pour finaliser votre inscription.';
          statusInfo.bgColor = 'bg-blue-50';
          statusInfo.borderColor = 'border-blue-200';
          statusInfo.icon = <CreditCard className="w-8 h-8 text-blue-600" />;
          statusInfo.actionButton = {
            text: 'Payer maintenant',
            action: 'pay',
            className: 'bg-blue-500 hover:bg-blue-600 text-white'
          };
        }
      } else {
        // Événement gratuit (adhérent actif)
        statusInfo.title = '✅ Inscription confirmée';
        statusInfo.message = 'Parfait ! Votre inscription est automatiquement confirmée car vous êtes adhérent actif. Nous vous attendons avec impatience !';
        statusInfo.bgColor = 'bg-green-50';
        statusInfo.borderColor = 'border-green-200';
        statusInfo.icon = <CheckCircle className="w-8 h-8 text-green-600" />;
        statusInfo.actionButton = {
          text: 'Annuler mon inscription',
          action: 'cancel',
          className: 'bg-red-500 hover:bg-red-600 text-white'
        };
      }
    } else if (registration_status === 'en_attente' || registration_status === 'en attente') {
      // Inscription en attente
      console.log('🔍 Analyse inscription en attente:', {
        hasAdherentRole,
        isAdherentActive,
        isPayantEvent,
        messageFromBackend: registrationDetails.message_statut
      });

      // Messages clairs selon le type d'utilisateur et d'événement
      const backendMessage = registrationDetails.message_statut || '';

      // 🔍 DEBUG : Log détaillé pour comprendre le problème
      console.log('🚨 DEBUG STATUT ADHÉRENT:', {
        hasAdherentRole,
        isAdherentActive,
        userRole: user?.role,
        adherentProfile,
        registrationDetails
      });

      if (hasAdherentRole && isAdherentActive === false) {
        // Adhérent avec cotisation non à jour
        statusInfo.title = '⏳ En attente - Adhésion expirée';
        statusInfo.message = isPayantEvent
          ? 'Votre inscription est en attente car votre adhésion a expiré. Renouvelez votre adhésion pour accéder directement au paiement.'
          : 'Votre inscription est en attente car votre adhésion a expiré. Renouvelez votre adhésion pour une validation automatique.';
        statusInfo.bgColor = 'bg-orange-50';
        statusInfo.borderColor = 'border-orange-200';
        statusInfo.icon = <AlertCircle className="w-8 h-8 text-orange-600" />;
        statusInfo.actionButton = {
          text: 'Renouveler mon adhésion',
          action: 'membership',
          className: 'bg-orange-500 hover:bg-orange-600 text-white'
        };
      } else if (hasAdherentRole && isAdherentActive) {
        // Adhérent actif - devrait être accepté automatiquement
        console.error('⚠️ ERREUR: Un adhérent actif ne devrait pas être en statut "en attente"');
        
        // Corriger le statut côté frontend
        statusInfo.status = 'accepte';
        
        if (isPayantEvent) {
          // Pour les événements payants, afficher le bouton de paiement
          statusInfo.title = '💳 Paiement requis';
          statusInfo.message = 'Félicitations ! Votre inscription est acceptée car vous êtes adhérent actif. Procédez maintenant au paiement pour finaliser votre inscription.';
          statusInfo.bgColor = 'bg-blue-50';
          statusInfo.borderColor = 'border-blue-200';
          statusInfo.icon = <CreditCard className="w-8 h-8 text-blue-600" />;
          statusInfo.actionButton = {
            text: 'Payer maintenant',
            action: 'pay',
            className: 'bg-blue-500 hover:bg-blue-600 text-white'
          };
        } else {
          // Pour les événements gratuits, confirmer l'inscription
          statusInfo.title = '✅ Inscription confirmée';
          statusInfo.message = 'Parfait ! Votre inscription est automatiquement confirmée car vous êtes adhérent actif. Nous vous attendons avec impatience !';
          statusInfo.bgColor = 'bg-green-50';
          statusInfo.borderColor = 'border-green-200';
          statusInfo.icon = <CheckCircle className="w-8 h-8 text-green-600" />;
          statusInfo.actionButton = {
            text: 'Annuler mon inscription',
            action: 'cancel',
            className: 'bg-red-500 hover:bg-red-600 text-white'
          };
        }
      } else if (!hasAdherentRole) {
        // Non adhérent (user simple)
        statusInfo.title = '⏳ En attente - Validation admin';
        statusInfo.message = isPayantEvent
          ? 'Votre inscription est en attente de validation par un administrateur. Une fois validée, vous pourrez procéder au paiement. Devenez adhérent pour un accès direct !'
          : 'Votre inscription est en attente de validation par un administrateur. Devenez adhérent pour une inscription automatique aux événements gratuits !';
        statusInfo.bgColor = 'bg-amber-50';
        statusInfo.borderColor = 'border-amber-200';
        statusInfo.icon = <Clock className="w-8 h-8 text-amber-600" />;
        statusInfo.actionButton = {
          text: 'Devenir adhérent',
          action: 'membership',
          className: 'bg-blue-500 hover:bg-blue-600 text-white'
        };
      } else {
        // Cas inattendu - log l'erreur
        console.error('❌ Cas inattendu dans la gestion du statut d\'inscription:', {
          hasAdherentRole,
          isAdherentActive,
          isPayantEvent,
          registration_status,
          payment_status
        });
        
        statusInfo.title = '⏳ Statut en attente';
        statusInfo.message = backendMessage || 'Votre inscription est en cours de traitement. Si ce message persiste, veuillez contacter le support.';
        statusInfo.bgColor = 'bg-amber-50';
        statusInfo.borderColor = 'border-amber-200';
        statusInfo.icon = <AlertCircle className="w-8 h-8 text-amber-600" />;
      }
    } else if (registration_status === 'refuse' || registration_status === 'refusé') {
      // Inscription refusée
      statusInfo.title = 'Inscription refusée';
      statusInfo.message = 'Votre inscription a été refusée. Contactez l\'administrateur pour plus d\'informations.';
      statusInfo.bgColor = 'bg-red-50';
      statusInfo.borderColor = 'border-red-200';
      statusInfo.icon = <XCircle className="w-8 h-8 text-red-600" />;
    } else if (registration_status === 'annule') {
      // Inscription annulée
      statusInfo.title = 'Inscription annulée';
      statusInfo.message = 'Votre inscription a été annulée.';
      statusInfo.bgColor = 'bg-gray-50';
      statusInfo.borderColor = 'border-gray-200';
      statusInfo.icon = <XCircle className="w-8 h-8 text-gray-600" />;
      statusInfo.actionButton = {
        text: 'S\'inscrire à nouveau',
        action: 'register',
        className: 'bg-blue-500 hover:bg-blue-600 text-white'
      };
    }

    console.log('📊 Statut info généré:', statusInfo);
    console.log('🔍 === FIN ANALYSE STATUT INSCRIPTION ===');

    return statusInfo;
  };

  // Fonction pour gérer les actions selon le statut
  const handleStatusAction = async (action) => {
    switch (action) {
      case 'pay':
        await handlePayment();
        break;
      case 'membership':
        navigate('/adhesion');
        break;
      case 'cancel':
        await handleCancelRegistration();
        break;
      case 'register':
        await handleRegister();
        break;
      default:
        break;
    }
  };

  // Fonction pour gérer le paiement
  const handlePayment = async () => {
    if (!registrationDetails) return;

    try {
      setIsSubmitting(true);
      const paymentResponse = await api.post(`/events/payments/${registrationDetails.registration_id}/initiate`);

      if (paymentResponse.data.payment_url) {
        window.location.href = paymentResponse.data.payment_url;
      } else {
        toast.error('Erreur lors de l\'initiation du paiement');
      }
    } catch (error) {
      console.error('Erreur paiement:', error);
      toast.error('Erreur lors de l\'initiation du paiement');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour annuler l'inscription
  const handleCancelRegistration = async () => {
    console.log('🔍 === DÉBUT handleCancelRegistration ===');
    console.log('📋 Contexte:', {
      isAuthenticated,
      user: user ? { id: user.id, role: user.role } : 'Non connecté',
      event: event ? { id: event.id, titre: event.titre } : 'Non chargé',
      registrationDetails: registrationDetails ? {
        registration_id: registrationDetails.registration_id,
        registration_status: registrationDetails.registration_status,
        payment_status: registrationDetails.payment_status
      } : 'Non chargé'
    });

    if (!window.confirm('Êtes-vous sûr de vouloir annuler votre inscription ?')) {
      return;
    }

    try {
      setIsSubmitting(true);
      await api.delete(`/events/${id}/register`);

      console.log('✅ Inscription annulée avec succès');
      toast.success('Inscription annulée avec succès');
      setIsRegistered(false);
      setRegistrationDetails(null);
      await fetchEventDetails(); // Recharger les données
    } catch (error) {
      console.error('❌ Erreur annulation:', error);
      toast.error('Erreur lors de l\'annulation de l\'inscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    console.log('🎯 === DÉBUT DU PROCESSUS D\'INSCRIPTION ===');
    console.log('📊 Informations utilisateur détaillées:', {
      isAuthenticated,
      user: user,
      userKeys: user ? Object.keys(user) : 'null',
      userRole: user?.role || 'user',
      isAdherentActive,
      userStringified: JSON.stringify(user, null, 2)
    });
    console.log('🎫 Informations événement pour inscription:', {
      eventId: id,
      event: event,
      eventKeys: event ? Object.keys(event) : 'null',
      eventDataProcessed: eventData
    });

    if (!isAuthenticated) {
      console.log('❌ Utilisateur non connecté - arrêt du processus');
      toast.warning('Veuillez vous connecter pour vous inscrire');
      return;
    }

    // Vérifier les permissions utilisateur
    const userRole = user?.role || 'user';
    const isAdherent = userRole === 'adherent' || userRole === 'admin' || userRole === 'super_admin';

    // Vérifier si l'événement est payant
    const isPayantEvent = eventData.type_evenement === 'payant' && event.prix && parseFloat(event.prix) > 0;

    console.log('🎫 Informations événement:', {
      eventId: id,
      titre: eventData.titre,
      type_evenement: eventData.type_evenement,
      prix: event.prix,
      isPayantEvent,
      limite_de_places: eventData.limite_de_places,
      nombre_inscrits: eventData.nombre_inscrits
    });

    console.log('🔐 Vérification des permissions selon les règles métier FMDD:', {
      userRole,
      isAdherent,
      isAdherentActive,
      isPayantEvent,
      canRegister: true // Tous les utilisateurs peuvent s'inscrire selon les règles FMDD
    });

    // RÈGLES MÉTIER FMDD : Tous les utilisateurs peuvent s'inscrire
    // - Adhérents actifs : inscription acceptée automatiquement
    // - Adhérents non-actifs et utilisateurs simples : en attente de validation admin
    console.log('✅ Inscription autorisée selon les règles métier FMDD');

    try {
      setIsSubmitting(true);

      console.log('📡 Envoi de la requête d\'inscription...');
      const response = await api.post(`/events/${id}/register`);

      console.log('✅ === RÉPONSE INSCRIPTION REÇUE ===');
      console.log('📊 Statut réponse:', response.status);
      console.log('📋 Données réponse complètes:', JSON.stringify(response.data, null, 2));
      console.log('🔑 Clés de la réponse:', response.data ? Object.keys(response.data) : 'null');

      // Gérer différentes structures de réponse
      if (response.data.success || response.status === 200 || response.status === 201) {
        console.log('✅ Inscription réussie côté serveur');
        
        // Extraire les informations d'inscription de la réponse
        let registrationStatus = 'en_attente';
        let paymentStatus = 'en_attente';
        let registrationId = null;
        
        if (response.data.registration) {
          registrationStatus = response.data.registration.statut || response.data.registration.status || 'en_attente';
          paymentStatus = response.data.registration.statut_paiement || response.data.registration.payment_status || 'en_attente';
          registrationId = response.data.registration.id || null;
        } else if (response.data.statut) {
          registrationStatus = response.data.statut;
          paymentStatus = response.data.statut_paiement || 'en_attente';
          registrationId = response.data.id || null;
        }
        
        console.log('📊 Statuts extraits:', {
          registrationStatus,
          paymentStatus,
          registrationId
        });
        
        // Mettre à jour l'état local
        setIsRegistered(true);
        setRegistrationDetails({
          registration_status: registrationStatus,
          payment_status: paymentStatus,
          user_membership_status: isAdherentActive ? 'actif' : 'non_actif',
          registration_id: registrationId
        });

        // Si l'événement est payant et l'inscription est acceptée, rediriger vers le paiement
        if (isPayantEvent && registrationStatus === 'accepte' && paymentStatus === 'non_paye') {
          console.log('💳 Événement payant détecté, préparation du paiement...');
          toast.info('Inscription créée. Redirection vers le paiement...');

          try {
            // Initier le paiement
            const paymentResponse = await api.post(`/events/payments/${registrationId}/initiate`);

            if (paymentResponse.data.payment_url) {
              // Rediriger vers la page de paiement
              console.log('🔗 Redirection vers la page de paiement:', paymentResponse.data.payment_url);
              window.location.href = paymentResponse.data.payment_url;
              return;
            }
          } catch (paymentError) {
            console.error('Erreur lors de l\'initiation du paiement:', paymentError);
            toast.error('Erreur lors de l\'initiation du paiement. Contactez le support.');
          }
        } else {
          // Pour les événements gratuits ou si pas de redirection paiement
          toast.success(response.data.message || 'Inscription réussie !');
          
          // Recharger les données de l'événement
          await fetchEventDetails();
        }
      } else {
        // Gérer les cas où la réponse n'indique pas un succès
        console.log('⚠️ Réponse API sans indication de succès');
        toast.warning(response.data.message || 'Problème lors de l\'inscription');
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'inscription:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);

      // Si l'erreur indique que l'utilisateur est déjà inscrit
      if (error.response?.data?.message?.includes('déjà inscrit')) {
        console.log('⚠️ Utilisateur déjà inscrit selon l\'API');
        
        // Même si l'API dit "déjà inscrit", nous devons récupérer le statut réel
        toast.info('Vous avez déjà une demande d\'inscription pour cet événement');
        
        // Recharger les détails pour obtenir le statut d'inscription
        await fetchEventDetails();
      } else if (error.response?.status === 419) {
        console.log('❌ Erreur CSRF 419 - Tentative de récupération...');
        toast.error('Erreur de sécurité. Rechargement de la page...');
        // Recharger la page pour récupérer un nouveau token CSRF
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (error.response?.status === 401) {
        toast.error('Vous devez être connecté pour vous inscrire.');
      } else {
        toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription');
      }
    } finally {
      setIsSubmitting(false);
      console.log('🎯 === FIN DU PROCESSUS D\'INSCRIPTION ===');
    }
  };

  const handleBack = () => {
    navigate('/evenements');
  };

  if (loading) {
    return (
      <div className="py-12 bg-blue-light min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-8 h-8 text-teal-500" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-blue-light min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
            <button
              onClick={handleBack}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md"
            >
              Retour aux événements
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-blue-light min-h-screen">
      <div className="container mx-auto px-4">
        {/* Bouton retour */}
        <button
          onClick={handleBack}
          className="flex items-center text-blue-dark hover:text-teal-500 transition-colors mb-6 bg-white px-4 py-2 rounded-md shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour aux événements
        </button>

        {/* Card principale de l'événement */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Image de l'événement */}
          {event.image && (
            <div className="w-full h-64 md:h-80 overflow-hidden">
              <img
                src={event.image}
                alt={eventData.titre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x400?text=Événement";
                }}
              />
            </div>
          )}

          <div className="p-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold">
                {eventData.categorie}
              </span>
              <span className={`text-white text-xs px-3 py-1 rounded-full uppercase font-semibold ${
                eventData.type_evenement === 'gratuit' ? 'bg-green-500' : 'bg-yellow-500'
              }`}>
                {eventData.type_evenement === 'gratuit' ? 'Gratuit' : `${event.prix} MAD`}
              </span>
              {eventData.limite_de_places > 0 && (
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold">
                  {eventData.nombre_inscrits} / {eventData.limite_de_places} places
                </span>
              )}

              {/* Badge de statut d'inscription */}
              {isAuthenticated && isRegistered && (() => {
                const statusInfo = getRegistrationStatusInfo();
                if (!statusInfo) return null;

                let badgeColor = '';
                let badgeText = '';

                if (statusInfo.status === 'accepte') {
                  if (statusInfo.paymentStatus === 'valide' || statusInfo.paymentStatus === 'paye') {
                    badgeColor = 'bg-emerald-500';
                    badgeText = '✅ Confirmé';
                  } else if (statusInfo.paymentStatus === 'non_paye') {
                    badgeColor = 'bg-blue-500';
                    badgeText = '💳 Paiement requis';
                  }
                } else if (statusInfo.status === 'en_attente') {
                  // Différencier selon le type d'utilisateur
                  const userRole = user?.role || 'user';
                  const hasAdherentRole = userRole === 'adherent' || userRole === 'admin' || userRole === 'super_admin';

                  if (hasAdherentRole && isAdherentActive === false) {
                    badgeColor = 'bg-orange-500';
                    badgeText = '⏳ Adhésion expirée';
                  } else if (!hasAdherentRole) {
                    badgeColor = 'bg-amber-500';
                    badgeText = '⏳ Validation admin';
                  } else {
                    badgeColor = 'bg-amber-500';
                    badgeText = '⏳ En attente';
                  }
                } else if (statusInfo.status === 'refuse') {
                  badgeColor = 'bg-red-500';
                  badgeText = '❌ Refusé';
                }

                return (
                  <span className={`${badgeColor} text-white text-xs px-3 py-1 rounded-full uppercase font-semibold`}>
                    {badgeText}
                  </span>
                );
              })()}
            </div>

            {/* Titre */}
            <h1 className="font-poppins font-bold text-3xl md:text-4xl text-blue-dark mb-4">
              {eventData.titre}
            </h1>

            {/* Informations clés */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-teal-500" />
                <span>{eventData.dateHeure}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-teal-500" />
                <span>{eventData.lieu}</span>
              </div>
              {eventData.date_limite_inscription && (
                <div className="flex items-center text-gray-600 md:col-span-2">
                  <AlarmClock className="w-5 h-5 mr-3 text-yellow-500" />
                  <span>Inscription jusqu'au {eventData.date_limite_inscription}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-poppins font-semibold text-2xl text-blue-dark mb-4 flex items-center">
            <Eye className="w-6 h-6 mr-3 text-teal-500" />
            À propos de cet événement
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {eventData.description}
          </p>
        </div>

        {/* Section Intervenants */}
        {intervenants && intervenants.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="font-poppins font-semibold text-2xl text-blue-dark mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-teal-500" />
              {intervenants.length === 1 ? 'Intervenant' : 'Intervenants'}
              <span className="ml-2 text-sm font-normal text-gray-500 bg-teal-50 px-2 py-1 rounded-full">
                {intervenants.length}
              </span>
            </h2>
            <div className={`grid gap-6 ${
              intervenants.length === 1
                ? 'grid-cols-1'
                : intervenants.length === 2
                  ? 'grid-cols-1 lg:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {intervenants.map((intervenant) => (
                <IntervenantCard
                  key={intervenant.id}
                  intervenant={intervenant}
                />
              ))}
            </div>
          </div>
        )}

        {/* Informations détaillées */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-poppins font-semibold text-2xl text-blue-dark mb-6">
            Informations pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start p-4 rounded-lg bg-teal-50">
              <Calendar className="w-6 h-6 text-teal-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-dark mb-1">Date et heure</h3>
                <p className="text-gray-600">{eventData.dateHeure}</p>
              </div>
            </div>
            <div className="flex items-start p-4 rounded-lg bg-gray-50">
              <MapPin className="w-6 h-6 text-teal-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-dark mb-1">Lieu</h3>
                <p className="text-gray-600">{eventData.lieu}</p>
              </div>
            </div>
            <div className="flex items-start p-4 rounded-lg bg-gray-50">
              <Users className="w-6 h-6 text-teal-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-dark mb-1">Participants</h3>
                <p className="text-gray-600">
                  {eventData.limite_de_places > 0
                    ? `${eventData.nombre_inscrits} / ${eventData.limite_de_places} inscrits`
                    : `${eventData.nombre_inscrits} inscrits`}
                </p>
              </div>
            </div>
            {eventData.date_limite_inscription && (
              <div className="flex items-start p-4 rounded-lg bg-yellow-50">
                <AlarmClock className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-dark mb-1">Date limite</h3>
                  <p className="text-gray-600">{eventData.date_limite_inscription}</p>
                </div>
              </div>
            )}
          </div>

          {/* Barre de progression */}
          {eventData.limite_de_places > 0 && (
            <div className="mt-6 p-4 bg-teal-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-blue-dark">Places disponibles</h3>
                <span className="text-sm font-medium text-gray-600">
                  {eventData.limite_de_places - eventData.nombre_inscrits} restantes
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ease-out rounded-full ${
                    fillPercentage >= 90 ? 'bg-red-500' :
                    fillPercentage >= 70 ? 'bg-yellow-500' :
                    'bg-teal-500'
                  }`}
                  style={{ width: `${fillPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {fillPercentage.toFixed(0)}% des places réservées
              </p>
            </div>
          )}
        </div>

        {/* Section d'inscription */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h2 className="font-poppins font-semibold text-2xl text-blue-dark mb-4">
              Prêt à participer ?
            </h2>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                {eventData.type_evenement === 'gratuit'
                  ? 'Inscription gratuite et simple'
                  : `Inscription : ${event.prix} MAD`}
              </p>

              {/* Règles d'inscription explicites */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Règles d'inscription :</h4>
                <ul className="text-blue-700 space-y-1">
                  {eventData.type_evenement === 'gratuit' ? (
                    <>
                      <li>• <strong>Adhérents actifs</strong> : Inscription automatique confirmée</li>
                      <li>• <strong>Autres utilisateurs</strong> : En attente de validation par l'admin</li>
                    </>
                  ) : (
                    <>
                      <li>• <strong>Adhérents actifs</strong> : Inscription acceptée + accès direct au paiement</li>
                      <li>• <strong>Autres utilisateurs</strong> : En attente de validation avant paiement</li>
                    </>
                  )}
                  <li>• <strong>Devenez adhérent</strong> pour bénéficier d'un accès privilégié !</li>
                </ul>
              </div>
            </div>

            {isAuthenticated ? (
              (() => {
                const statusInfo = getRegistrationStatusInfo();

                if (isRegistered && statusInfo) {
                  return (
                    <div className={`p-6 rounded-lg border-2 ${statusInfo.bgColor} ${statusInfo.borderColor}`}>
                      {/* Icône du statut */}
                      <div className="flex items-center justify-center mb-3">
                        {statusInfo.icon}
                      </div>

                      {/* Titre et message */}
                      <h3 className="text-lg font-semibold mb-2 text-center">
                        {statusInfo.title}
                      </h3>
                      <p className="text-sm text-center mb-4">
                        {statusInfo.message}
                      </p>

                      {/* Badge de statut de paiement - SEULEMENT si inscription acceptée */}
                      {eventData.type_evenement === 'payant' && statusInfo.status === 'accepte' && (
                        <div className="flex justify-center mb-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            statusInfo.paymentStatus === 'valide' || statusInfo.paymentStatus === 'paye'
                              ? 'bg-green-100 text-green-800'
                              : statusInfo.paymentStatus === 'en_attente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {(statusInfo.paymentStatus === 'valide' || statusInfo.paymentStatus === 'paye') && <CheckCircle className="w-3 h-3 mr-1" />}
                            {statusInfo.paymentStatus === 'en_attente' && <Clock className="w-3 h-3 mr-1" />}
                            {statusInfo.paymentStatus === 'non_paye' && <X className="w-3 h-3 mr-1" />}
                            Paiement: {
                              (statusInfo.paymentStatus === 'valide' || statusInfo.paymentStatus === 'paye') ? 'Validé' :
                              statusInfo.paymentStatus === 'en_attente' ? 'En attente' :
                              'Non payé'
                            }
                          </span>
                        </div>
                      )}

                      {/* Bouton d'action si disponible */}
                      {statusInfo.actionButton && (
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleStatusAction(statusInfo.actionButton.action)}
                            disabled={isSubmitting}
                            className={`inline-flex items-center px-6 py-2 rounded-lg font-semibold transition-colors ${statusInfo.actionButton.className} ${
                              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {isSubmitting ? (
                              <Loader2 className="animate-spin w-4 h-4 mr-2" />
                            ) : statusInfo.actionButton.action === 'pay' ? (
                              <CreditCard className="w-4 h-4 mr-2" />
                            ) : statusInfo.actionButton.action === 'membership' ? (
                              <UserPlus className="w-4 h-4 mr-2" />
                            ) : statusInfo.actionButton.action === 'cancel' ? (
                              <X className="w-4 h-4 mr-2" />
                            ) : null}
                            {statusInfo.actionButton.text}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                // Si pas inscrit, afficher le bouton d'inscription
                return (() => {
                // Logique de permissions pour l'affichage du bouton selon les règles métier FMDD
                const userRole = user?.role || 'user';
                const isAdherent = userRole === 'adherent' || userRole === 'admin' || userRole === 'super_admin';
                const isPayantEvent = eventData.type_evenement === 'payant' && event.prix && parseFloat(event.prix) > 0;

                // RÈGLES MÉTIER FMDD : Tous les utilisateurs peuvent s'inscrire
                // - Adhérents actifs : accès direct (inscription acceptée automatiquement)
                // - Adhérents non-actifs et utilisateurs simples : en attente de validation admin

                // Conditions de désactivation du bouton (seulement pour les contraintes techniques)
                const isDisabled = isSubmitting || !isRegistrationOpen ||
                  (eventData.limite_de_places > 0 && eventData.nombre_inscrits >= eventData.limite_de_places);

                return (
                  <div>
                    {/* Message d'information selon le statut utilisateur */}
                    {isPayantEvent && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h3 className="font-semibold text-blue-800 mb-2">💳 Événement payant</h3>
                        <div className="text-blue-700 text-sm space-y-2">
                          {isAdherent && isAdherentActive ? (
                            <p>
                              <strong>✅ Adhérent actif :</strong> Votre inscription sera automatiquement acceptée et vous pourrez procéder directement au paiement.
                            </p>
                          ) : isAdherent && !isAdherentActive ? (
                            <p>
                              <strong>⏳ Adhérent (cotisation expirée) :</strong> Votre inscription sera en attente de validation par un administrateur. Renouvelez votre adhésion pour un accès direct !
                            </p>
                          ) : (
                            <p>
                              <strong>⏳ Utilisateur :</strong> Votre inscription sera en attente de validation par un administrateur. Une fois validée, vous pourrez procéder au paiement.
                            </p>
                          )}
                          <p className="text-xs">
                            💡 <strong>Astuce :</strong> Devenez adhérent actif pour bénéficier d'un accès privilégié à tous nos événements !
                          </p>
                        </div>
                        {(!isAdherent || !isAdherentActive) && (
                          <button
                            onClick={() => navigate('/adhesion')}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors text-xs mt-3"
                          >
                            <UserPlus className="w-3 h-3 mr-1" />
                            Devenir adhérent actif
                          </button>
                        )}
                      </div>
                    )}

                    <button
                      onClick={handleRegister}
                      disabled={isDisabled}
                      className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                        isDisabled
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5 mr-3" />
                          Inscription en cours...
                        </>
                      ) : !isRegistrationOpen ? (
                        <>
                          <XCircle className="w-5 h-5 mr-3" />
                          Inscriptions fermées
                        </>
                      ) : eventData.limite_de_places > 0 && eventData.nombre_inscrits >= eventData.limite_de_places ? (
                        <>
                          <X className="w-5 h-5 mr-3" />
                          Complet
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5 mr-3" />
                          {isPayantEvent
                            ? (isAdherent && isAdherentActive
                                ? `S'inscrire et payer (${event.prix} MAD)`
                                : `Demander l'inscription (${event.prix} MAD)`)
                            : 'S\'inscrire maintenant'}
                        </>
                      )}
                    </button>
                  </div>
                );
                })();
              })()
            ) : (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="font-poppins font-semibold text-lg text-blue-dark mb-2">Connexion requise</h3>
                <p className="text-gray-600 mb-4">
                  Connectez-vous à votre compte pour vous inscrire à cet événement.
                </p>
                <button
                  onClick={() => navigate('/login', { state: { from: location.pathname } })}
                  className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <User className="w-5 h-5 mr-2" />
                  Se connecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





