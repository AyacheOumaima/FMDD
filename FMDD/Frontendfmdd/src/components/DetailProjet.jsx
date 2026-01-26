import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../axios';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { API_ROUTES } from '../config/api.config';

import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link as MuiLink,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import {
  AccessTime,
  ArrowBack,
  CalendarToday,
  Close,
  Email,
  Groups,
  LocationOn,
  Phone,
  PersonAdd,
  Work
} from '@mui/icons-material';

import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  User,
  Mail,
  Phone as PhoneLucide,
  Building,
  DollarSign,
  Handshake,
  Heart,
  Loader2,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Clock,
  X
} from 'lucide-react';

// ■ Schémas de validation Yup
const schemas = {
  volunteer: yup.object({
    competences: yup.string().required('Compétences requises'),
    disponibilite: yup.string().required('Disponibilités requises'),
    motivation: yup.string().required('Motivation requise')
  }),
  sponsor: yup.object({
    organisation: yup.string().required('Organisation requise'),
    contact_nom: yup.string().required('Nom requis'),
    email: yup.string().email('Email invalide').required('Email requis'),
    telephone: yup.string().required('Téléphone requis'),
    montant_propose: yup
      .number()
      .typeError('Montant invalide')
      .positive('Doit être positif'),
    type_sponsoring_souhaite: yup.string().required('Type requis')
  }),
  partnership: yup.object({
    organisation: yup.string().required('Organisation requise'),
    contact_nom: yup.string().required('Nom requis'),
    email: yup.string().email('Email invalide').required('Email requis'),
    telephone: yup.string().required('Téléphone requis'),
    type_partenariat_souhaite: yup.string().required('Type requis'),
    engagement_propose: yup.string().required('Engagement requis'),
    retour_demande: yup.string()
  })
};

export default function DetailProjet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // ■ States
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formType, setFormType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasVolunteerRequest, setHasVolunteerRequest] = useState(false);
  const [volunteerRequestData, setVolunteerRequestData] = useState(null);
  const [hasPartnershipRequest, setHasPartnershipRequest] = useState(false);
  const [partnershipRequestData, setPartnershipRequestData] = useState(null);
  const [hasSponsorRequest, setHasSponsorRequest] = useState(false);
  const [sponsorRequestData, setSponsorRequestData] = useState(null);

  // ■ Forms
  const forms = {
    volunteer: useForm({ resolver: yupResolver(schemas.volunteer) }),
    sponsor: useForm({ resolver: yupResolver(schemas.sponsor) }),
    partnership: useForm({ resolver: yupResolver(schemas.partnership) })
  };

  // ■ Fetch projet
  const fetchProject = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/projets/${id}`);
      const data = res.data.data || res.data.projet || res.data;
      setProject({
        ...data,
        benevoles: data.benevoles || [],
        partenaires: data.partenaires || [],
        sponsors: data.sponsors || [],
        categorie: data.categorie?.nom || data.theme || '—'
      });
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, error]);

  // ✅ CORRECTION : Vérifier les vraies demandes (pas les bénévoles acceptés)
  const checkExistingRequests = useCallback(async () => {
    if (!id) return;

    // 1. Vérifier demande bénévolat (si utilisateur connecté)
    if (isAuthenticated && user?.id) {
      try {
        const response = await axios.get(`/projets/${id}/my-benevolat-request`);
        const hasRequest = response.data.has_request;
        const requestData = response.data.demande;

        setHasVolunteerRequest(hasRequest);
        setVolunteerRequestData(requestData);

        console.log('🔍 Vérification demande bénévolat:', { hasRequest, requestData });
      } catch (error) {
        console.error('Erreur vérification demande bénévole:', error);
        setHasVolunteerRequest(false);
        setVolunteerRequestData(null);
      }
    } else {
      setHasVolunteerRequest(false);
      setVolunteerRequestData(null);
    }
  }, [isAuthenticated, id, user?.id]);

  // Vérifier demande partenariat par email
  const checkPartnershipRequest = useCallback(async (email) => {
    if (!id || !email) return false;

    try {
      const response = await axios.post(`/projets/${id}/check-partenariat`, { email });
      const hasRequest = response.data.has_request;
      const requestData = response.data.demande;

      setHasPartnershipRequest(hasRequest);
      setPartnershipRequestData(requestData);

      console.log('🔍 Vérification demande partenariat:', { email, hasRequest, requestData });
      return hasRequest;
    } catch (error) {
      console.error('Erreur vérification demande partenariat:', error);
      setHasPartnershipRequest(false);
      setPartnershipRequestData(null);
      return false;
    }
  }, [id]);

  // Vérifier demande sponsoring par email
  const checkSponsorRequest = useCallback(async (email) => {
    if (!id || !email) return false;

    try {
      const response = await axios.post(`/projets/${id}/check-sponsoring`, { email });
      const hasRequest = response.data.has_request;
      const requestData = response.data.demande;

      setHasSponsorRequest(hasRequest);
      setSponsorRequestData(requestData);

      console.log('🔍 Vérification demande sponsoring:', { email, hasRequest, requestData });
      return hasRequest;
    } catch (error) {
      console.error('Erreur vérification demande sponsoring:', error);
      setHasSponsorRequest(false);
      setSponsorRequestData(null);
      return false;
    }
  }, [id]);

  // Effets
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  // ✅ CORRECTION : Vérifier les demandes existantes au chargement
  useEffect(() => {
    if (id) {
      checkExistingRequests();
    }
  }, [id, checkExistingRequests]);



  // ✅ CORRECTION : Ouvre le formulaire avec vérification des demandes existantes
  const handleOpen = async (type) => {
    // Vérification d'authentification SEULEMENT pour les bénévoles
    if (type === 'volunteer') {
      if (!isAuthenticated) {
        toast.warning('Veuillez vous connecter pour devenir bénévole', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      // Vérifier si une demande existe déjà
      if (hasVolunteerRequest) {
        const status = volunteerRequestData?.statut || 'En attente';
        toast.info(`Vous avez déjà une demande de bénévolat (${status}) pour ce projet`, {
          position: 'top-center',
          autoClose: 5000
        });
        return;
      }
    }

    // Pour sponsor et partenaire : vérification par email dans le formulaire
    setFormType(type);
  };
  const handleClose = () => { setFormType(null); Object.values(forms).forEach(f => f.reset()); };

  // ✅ CORRECTION : Soumission avec vérification des demandes existantes
  const onSubmit = async (formData) => {
    setSubmitting(true);
    const toastId = toast.loading('Vérification en cours...');

    try {
      // ✅ Vérifier les demandes existantes avant soumission
      if (formType === 'partnership' && formData.email) {
        const hasExisting = await checkPartnershipRequest(formData.email);
        if (hasExisting) {
          toast.update(toastId, {
            render: 'Une demande de partenariat existe déjà avec cet email pour ce projet',
            type: 'warning',
            isLoading: false,
            autoClose: 5000
          });
          setSubmitting(false);
          return;
        }
      }

      if (formType === 'sponsor' && formData.email) {
        const hasExisting = await checkSponsorRequest(formData.email);
        if (hasExisting) {
          toast.update(toastId, {
            render: 'Une demande de sponsoring existe déjà avec cet email pour ce projet',
            type: 'warning',
            isLoading: false,
            autoClose: 5000
          });
          setSubmitting(false);
          return;
        }
      }

      // Mettre à jour le toast pour l'envoi
      toast.update(toastId, { render: 'Envoi en cours...' });

      // Préparer les données selon le type de formulaire
      const payload = { ...formData };

      // Pour le bénévolat, ajouter l'ID utilisateur si disponible
      if (formType === 'volunteer' && user?.id) {
        payload.user_id = user.id;
      }

      // Déterminer l'URL de l'API
      const endpoints = {
        volunteer: API_ROUTES.projets.benevolat(id),
        sponsor: API_ROUTES.projets.sponsoring(id),
        partnership: API_ROUTES.projets.partenariat(id)
      };

      // Envoyer la requête avec ou sans credentials selon le type
      const requestConfig = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      // Ajouter withCredentials seulement pour les bénévoles (authentification requise)
      if (formType === 'volunteer') {
        requestConfig.withCredentials = true;
      }

      const response = await axios.post(endpoints[formType], payload, requestConfig);

      // ✅ Gérer la réponse avec toast de succès amélioré
      toast.update(toastId, {
        render: `🎉 ${response.data?.message || 'Votre demande a été envoyée avec succès !'}`,
        type: 'success',
        isLoading: false,
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        position: 'top-center'
      });

      // ✅ Rafraîchir les vérifications de demandes (pas tout le projet)
      await checkExistingRequests();
      handleClose();

    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      
      // Extraire le message d'erreur de la réponse
      let errorMessage = 'Une erreur est survenue lors de l\'envoi du formulaire';
      
      if (error.response) {
        // Erreur avec réponse du serveur
        errorMessage = error.response.data?.message || 
                     error.response.data?.error ||
                     (error.response.data?.errors && 
                      Object.values(error.response.data.errors).flat().join(' ')) ||
                     `Erreur ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        errorMessage = 'Pas de réponse du serveur. Vérifiez votre connexion internet.';
      }
      
      toast.update(toastId, {
        render: errorMessage,
        type: 'error',
        isLoading: false,
        autoClose: 5000
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ■ Format date FR
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { day:'numeric',month:'long',year:'numeric' }) : '—';

  // États de chargement et d'erreur avec design FMDD
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <Loader2 className="animate-spin h-16 w-16 text-teal-500 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-blue-950 mb-2">Chargement en cours</h2>
          <p className="text-gray-600">Récupération des détails du projet...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-950 mb-3">Projet non trouvé</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {error || 'Le projet demandé n\'existe pas ou n\'est plus disponible.'}
          </p>
          <button
            onClick={() => navigate('/projets')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  // ■ Choix du formulaire
  const formConfig = {
    volunteer: { title: 'Devenir bénévole', form: forms.volunteer, fields: [
      { name:'competences', label:'Compétences', multiline:true, rows:3 },
      { name:'disponibilite', label:'Disponibilités', multiline:true, rows:3 },
      { name:'motivation', label:'Motivation', multiline:true, rows:4 },
    ]},
    sponsor: { title: 'Devenir sponsor', form: forms.sponsor, fields: [
      { name:'organisation', label:'Organisation' },
      { name:'contact_nom', label:'Votre nom' },
      { name:'email', label:'Email', type:'email' },
      { name:'montant_propose', label:'Montant proposé', type:'number' },
      { name:'type_sponsoring_souhaite', label:'Type sponsoring', type:'select',
        options:[ 'Financier','Matériel','En nature'] },
      { name:'contreparties_demandees', label:'Contreparties', multiline:true, rows:3 },
    ]},
    partnership: { title: 'Devenir partenaire', form: forms.partnership, fields: [
      { name:'organisation', label:'Organisation' },
      { name:'contact_nom', label:'Votre nom' },
      { name:'email', label:'Email', type:'email' },
      { name:'telephone', label:'Téléphone' },
      { name:'type_partenariat_souhaite', label:'Type partenariat', type:'select',
        options:['Technique','Financier','Logistique','Média'] },
      { name:'engagement_propose', label:'Engagement proposé', multiline:true, rows:4 }
    ]},
  }[formType] || {};

  // Fonctions utilitaires pour le statut
  const getStatusColor = (status) => {
    if (!status) return 'bg-green-100 text-green-800';

    const normalizedStatus = status.toLowerCase().trim();
    switch (normalizedStatus) {
      case 'en_cours':
      case 'en cours':
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'a_venir':
      case 'à venir':
      case 'planifie':
        return 'bg-yellow-100 text-yellow-800';
      case 'termine':
      case 'terminé':
      case 'fini':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return <PlayCircle className="w-4 h-4" />;

    const normalizedStatus = status.toLowerCase().trim();
    switch (normalizedStatus) {
      case 'en_cours':
      case 'en cours':
      case 'actif':
        return <PlayCircle className="w-4 h-4" />;
      case 'a_venir':
      case 'à venir':
      case 'planifie':
        return <Clock className="w-4 h-4" />;
      case 'termine':
      case 'terminé':
      case 'fini':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-blue-200 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/projets" className="hover:text-white transition-colors">Projets</Link>
            <span>/</span>
            <span className="text-white">{project.titre_projet}</span>
          </nav>

          {/* Bouton retour */}
          <button
            onClick={() => navigate('/projets')}
            className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux projets
          </button>

          {/* Titre et statut */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.statut_projet)}`}>
                {getStatusIcon(project.statut_projet)}
                <span className="ml-2">
                  {project.statut_projet?.replace('_', ' ') || 'En cours'}
                </span>
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-blue-950">
                {project.categorie}
              </span>
              {project.localisation && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                  <MapPin className="w-4 h-4 mr-1" />
                  {project.localisation}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.titre_projet}
            </h1>

            <p className="text-xl text-blue-100 max-w-3xl">
              {project.description_projet}
            </p>

            {/* Dates */}
            {project.date_projet && (
              <div className="flex items-center mt-6 text-blue-200">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  Début : {fmtDate(project.date_projet)}
                  {project.duree && ` • Durée : ${project.duree}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image principale */}
            {project.image && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={project.image}
                  alt={project.titre_projet}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            {/* Description détaillée */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-blue-950 mb-6">Description du projet</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="leading-relaxed">
                  {project.description_detaillee || project.description_projet || 'Description non disponible.'}
                </p>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations du projet */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-blue-950 mb-4">Informations</h3>
              <div className="space-y-4">
                {/* Date et durée */}
                {project.date_projet && (
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Projet</div>
                      <div className="text-gray-600">
                        Début : {fmtDate(project.date_projet)}
                        {project.duree && (
                          <div className="text-sm text-gray-500">Durée : {project.duree}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Organisateur */}
                {project.organisateur && (
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Organisateur</div>
                      <div className="text-gray-600">{project.organisateur}</div>
                    </div>
                  </div>
                )}

                {/* Contact */}
                {(project.contact_email || project.contact_telephone) && (
                  <div className="space-y-2">
                    {project.contact_email && (
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-teal-500 mr-3" />
                        <a href={`mailto:${project.contact_email}`} className="text-blue-600 hover:underline">
                          {project.contact_email}
                        </a>
                      </div>
                    )}
                    {project.contact_telephone && (
                      <div className="flex items-center">
                        <PhoneLucide className="w-5 h-5 text-teal-500 mr-3" />
                        <a href={`tel:${project.contact_telephone}`} className="text-blue-600 hover:underline">
                          {project.contact_telephone}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Participants */}
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-teal-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Participants</div>
                    <div className="text-gray-600">
                      {project.benevoles?.length || 0} bénévole{project.benevoles?.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partenaires et Sponsors */}
            {(project.partenaires?.length > 0 || project.sponsors?.length > 0) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-blue-950 mb-4">Partenaires & Sponsors</h3>

                {project.partenaires?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Partenaires</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.partenaires.map((p, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {p.nom || p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.sponsors?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Sponsors</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.sponsors.map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          {s.nom || s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Boutons d'action */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-blue-950 mb-4">Participer</h3>

              {/* Section Bénévolat (nécessite une connexion) */}
              <div className="mb-4">
                {isAuthenticated ? (
                  hasVolunteerRequest ? (
                    <div className={`border rounded-lg p-4 ${
                      volunteerRequestData?.statut === 'approuve'
                        ? 'bg-green-50 border-green-200'
                        : volunteerRequestData?.statut === 'refuse'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center">
                        {volunteerRequestData?.statut === 'approuve' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : volunteerRequestData?.statut === 'refuse' ? (
                          <X className="w-5 h-5 text-red-600 mr-2" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                        )}
                        <span className={`font-medium ${
                          volunteerRequestData?.statut === 'approuve'
                            ? 'text-green-800'
                            : volunteerRequestData?.statut === 'refuse'
                            ? 'text-red-800'
                            : 'text-yellow-800'
                        }`}>
                          {volunteerRequestData?.statut === 'approuve'
                            ? 'Demande acceptée'
                            : volunteerRequestData?.statut === 'refuse'
                            ? 'Demande refusée'
                            : 'Demande en attente'}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${
                        volunteerRequestData?.statut === 'approuve'
                          ? 'text-green-700'
                          : volunteerRequestData?.statut === 'refuse'
                          ? 'text-red-700'
                          : 'text-yellow-700'
                      }`}>
                        {volunteerRequestData?.statut === 'approuve'
                          ? 'Félicitations ! Votre demande de bénévolat a été acceptée.'
                          : volunteerRequestData?.statut === 'refuse'
                          ? 'Votre demande de bénévolat a été refusée.'
                          : 'Votre demande de bénévolat est en cours de validation par les administrateurs.'}
                      </p>
                      {volunteerRequestData?.commentaire && (
                        <p className="text-sm mt-2 italic text-gray-600">
                          <strong>Commentaire :</strong> {volunteerRequestData.commentaire}
                        </p>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpen('volunteer')}
                      disabled={submitting}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Devenir bénévole
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => handleOpen('volunteer')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Devenir bénévole
                  </button>
                )}
              </div>

              {/* Section Partenariat et Sponsoring (pas besoin de connexion) */}
              <div>
                <p className="text-gray-600 text-sm mb-3">
                  Soutenez ce projet en tant que partenaire ou sponsor
                </p>

                {/* Messages informatifs si demandes existantes */}
                {hasPartnershipRequest && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center">
                      <Handshake className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-blue-800 font-medium text-sm">
                        Demande de partenariat déjà soumise
                      </span>
                    </div>
                    <p className="text-blue-700 text-xs mt-1">
                      Statut : {partnershipRequestData?.statut || 'En attente'}
                    </p>
                  </div>
                )}

                {hasSponsorRequest && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-purple-800 font-medium text-sm">
                        Demande de sponsoring déjà soumise
                      </span>
                    </div>
                    <p className="text-purple-700 text-xs mt-1">
                      Statut : {sponsorRequestData?.statut || 'En attente'}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleOpen('partnership')}
                    disabled={submitting}
                    className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    <Handshake className="w-4 h-4 mr-1" />
                    Partenaire
                  </button>
                  <button
                    onClick={() => handleOpen('sponsor')}
                    disabled={submitting}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    <DollarSign className="w-4 h-4 mr-1" />
                    Sponsor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Modal Formulaire FMDD */}
      {formType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header avec gradient FMDD */}
            <div className="bg-gradient-to-r from-blue-950 to-teal-800 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {formType === 'sponsor' ? (
                    <DollarSign className="w-6 h-6 mr-3" />
                  ) : formType === 'partnership' ? (
                    <Handshake className="w-6 h-6 mr-3" />
                  ) : (
                    <Heart className="w-6 h-6 mr-3" />
                  )}
                  <h3 className="text-xl font-bold">
                    {formConfig.title || ''}
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="text-blue-200 hover:text-white transition-colors p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-blue-100 mt-2">
                {formType === 'sponsor'
                  ? 'Soutenez financièrement ce projet et contribuez à son succès'
                  : formType === 'partnership'
                  ? 'Devenez partenaire et apportez votre expertise à ce projet'
                  : 'Rejoignez notre équipe de bénévoles passionnés'
                }
              </p>
            </div>

            {/* Contenu du formulaire */}
            <div className="p-6">
              <form onSubmit={forms[formType].handleSubmit(onSubmit)} className="space-y-6">
                {/* Informations personnelles (seulement pour sponsor et partenaire) */}
                {(formType === 'sponsor' || formType === 'partnership') && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-950 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-teal-500" />
                      Informations de contact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organisation *
                        </label>
                        <input
                          {...forms[formType].register('organisation')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                          placeholder="Nom de votre organisation"
                        />
                        {forms[formType].formState.errors.organisation && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms[formType].formState.errors.organisation?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Votre nom *
                        </label>
                        <input
                          {...forms[formType].register('contact_nom')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                          placeholder="Votre nom complet"
                        />
                        {forms[formType].formState.errors.contact_nom && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms[formType].formState.errors.contact_nom?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          {...forms[formType].register('email')}
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                          placeholder="votre.email@exemple.com"
                          onBlur={async (e) => {
                            const email = e.target.value;
                            if (email && formType === 'partnership') {
                              const hasExisting = await checkPartnershipRequest(email);
                              if (hasExisting) {
                                toast.warning('Une demande de partenariat existe déjà avec cet email pour ce projet', {
                                  position: 'top-center',
                                  autoClose: 5000
                                });
                              }
                            } else if (email && formType === 'sponsor') {
                              const hasExisting = await checkSponsorRequest(email);
                              if (hasExisting) {
                                toast.warning('Une demande de sponsoring existe déjà avec cet email pour ce projet', {
                                  position: 'top-center',
                                  autoClose: 5000
                                });
                              }
                            }
                          }}
                        />
                        {forms[formType].formState.errors.email && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms[formType].formState.errors.email?.message}
                          </p>
                        )}

                        {/* Message si demande existante détectée */}
                        {formType === 'partnership' && hasPartnershipRequest && (
                          <div className="bg-orange-50 border border-orange-200 rounded-md p-2 mt-2">
                            <p className="text-orange-800 text-sm">
                              ⚠️ Une demande de partenariat existe déjà avec cet email (Statut: {partnershipRequestData?.statut || 'En attente'})
                            </p>
                          </div>
                        )}

                        {formType === 'sponsor' && hasSponsorRequest && (
                          <div className="bg-orange-50 border border-orange-200 rounded-md p-2 mt-2">
                            <p className="text-orange-800 text-sm">
                              ⚠️ Une demande de sponsoring existe déjà avec cet email (Statut: {sponsorRequestData?.statut || 'En attente'})
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone *
                        </label>
                        <input
                          {...forms[formType].register('telephone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                          placeholder="+212 6 XX XX XX XX"
                        />
                        {forms[formType].formState.errors.telephone && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms[formType].formState.errors.telephone?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Section spécifique selon le type */}
                {formType === 'sponsor' && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-950 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
                      Détails du sponsoring
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Montant proposé (MAD)
                        </label>
                        <input
                          {...forms.sponsor.register('montant_propose')}
                          type="number"
                          min="0"
                          step="100"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                          placeholder="Ex: 5000"
                        />
                        {forms.sponsor.formState.errors.montant_propose && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms.sponsor.formState.errors.montant_propose?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type de sponsoring *
                        </label>
                        <select
                          {...forms.sponsor.register('type_sponsoring_souhaite')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Sélectionnez un type</option>
                          <option value="Financier">Financier</option>
                          <option value="Matériel">Matériel</option>
                          <option value="En nature">En nature</option>
                        </select>
                        {forms.sponsor.formState.errors.type_sponsoring_souhaite && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms.sponsor.formState.errors.type_sponsoring_souhaite?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contreparties demandées
                      </label>
                      <textarea
                        {...forms.sponsor.register('contreparties_demandees')}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                        placeholder="Décrivez les contreparties que vous souhaitez (logo, mention, stand, etc.)"
                      />
                    </div>
                  </div>
                )}

                {formType === 'partnership' && (
                  <div className="bg-teal-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-950 mb-4 flex items-center">
                      <Handshake className="w-5 h-5 mr-2 text-teal-600" />
                      Détails du partenariat
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type de partenariat *
                        </label>
                        <select
                          {...forms.partnership.register('type_partenariat_souhaite')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Sélectionnez un type</option>
                          <option value="Technique">Technique</option>
                          <option value="Financier">Financier</option>
                          <option value="Logistique">Logistique</option>
                          <option value="Média">Média</option>
                        </select>
                        {forms.partnership.formState.errors.type_partenariat_souhaite && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms.partnership.formState.errors.type_partenariat_souhaite?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Engagement proposé *
                        </label>
                        <textarea
                          {...forms.partnership.register('engagement_propose')}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                          placeholder="Décrivez votre engagement et ce que vous pouvez apporter au projet"
                        />
                        {forms.partnership.formState.errors.engagement_propose && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms.partnership.formState.errors.engagement_propose?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Retour attendu
                        </label>
                        <textarea
                          {...forms.partnership.register('retour_demande')}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                          placeholder="Qu'attendez-vous de ce partenariat ? (optionnel)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section spécialisée pour bénévole (simplifiée) */}
                {formType === 'volunteer' && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-950 mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-green-600" />
                      Votre profil de bénévole
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vos compétences *
                        </label>
                        <textarea
                          {...forms.volunteer.register('competences')}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="Décrivez vos compétences et expériences pertinentes pour ce projet"
                        />
                        {forms.volunteer.formState.errors.competences && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms.volunteer.formState.errors.competences?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vos disponibilités *
                        </label>
                        <textarea
                          {...forms.volunteer.register('disponibilite')}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="Indiquez vos créneaux de disponibilité (jours, heures, fréquence)"
                        />
                        {forms.volunteer.formState.errors.disponibilite && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms.volunteer.formState.errors.disponibilite?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Votre motivation *
                        </label>
                        <textarea
                          {...forms.volunteer.register('motivation')}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="Pourquoi souhaitez-vous participer à ce projet ?"
                        />
                        {forms.volunteer.formState.errors.motivation && (
                          <p className="text-red-600 text-sm mt-1">
                            {forms.volunteer.formState.errors.motivation?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 rounded-lg font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting ||
                      (formType === 'partnership' && hasPartnershipRequest) ||
                      (formType === 'sponsor' && hasSponsorRequest)
                    }
                    className={`px-6 py-3 text-white font-medium rounded-lg transition-colors flex items-center ${
                      formType === 'sponsor'
                        ? 'bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300'
                        : formType === 'partnership'
                        ? 'bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300'
                        : 'bg-green-500 hover:bg-green-600 disabled:bg-gray-300'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Envoi en cours...
                      </>
                    ) : (formType === 'partnership' && hasPartnershipRequest) ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Demande déjà soumise
                      </>
                    ) : (formType === 'sponsor' && hasSponsorRequest) ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Demande déjà soumise
                      </>
                    ) : (
                      <>
                        {formType === 'sponsor' ? (
                          <DollarSign className="w-4 h-4 mr-2" />
                        ) : formType === 'partnership' ? (
                          <Handshake className="w-4 h-4 mr-2" />
                        ) : (
                          <Heart className="w-4 h-4 mr-2" />
                        )}
                        Envoyer ma demande
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
