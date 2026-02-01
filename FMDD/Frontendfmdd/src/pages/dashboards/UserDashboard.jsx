import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  ArrowTrendingUpIcon,
  UserCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const UserDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  const [courses, setCourses] = useState({
    en_cours: 0,
    termines: 0,
    certificats: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, [retryCount]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer les statistiques des cours
      const statsResponse = await axios.get('/user/courses/stats');
      setCourses(statsResponse.data || {
        en_cours: 0,
        termines: 0,
        certificats: 0
      });

      // Récupérer l'activité récente (optionnel)
      try {
        const activityResponse = await axios.get('/user/recent-activity');
        setRecentActivity(activityResponse.data || []);
      } catch (activityError) {
        // L'activité récente est optionnelle, ne pas bloquer si elle échoue
        console.warn('Activité récente non disponible:', activityError);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données utilisateur:', error);
      setError(error.response?.data?.message || 'Impossible de charger vos données. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  // État de chargement
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Chargement de vos données...</p>
      </div>
    );
  }

  // État d'erreur
 

  const statsCards = [
    {
      title: 'Cours en cours',
      value: courses.en_cours || 0,
      icon: BookOpenIcon,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      description: 'Formation(s) active(s)'
    },
    {
      title: 'Cours terminés',
      value: courses.termines || 0,
      icon: ClipboardDocumentCheckIcon,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
      description: 'Formation(s) complétée(s)'
    },
    {
      title: 'Certificats',
      value: courses.certificats || 0,
      icon: AcademicCapIcon,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900',
      description: 'Certificat(s) obtenu(s)'
    }
  ];

  const quickActions = [
    {
      title: 'Explorer les formations',
      description: 'Découvrez nos formations disponibles',
      icon: BookOpenIcon,
      action: () => navigate('/formations'),
      color: 'indigo'
    },
    {
      title: 'Mon profil',
      description: 'Gérer mes informations personnelles',
      icon: UserCircleIcon,
      action: () => navigate('/profile'),
      color: 'teal'
    },
    {
      title: 'Mes progrès',
      description: 'Suivre mon évolution',
      icon: ArrowTrendingUpIcon,
      action: () => navigate('/progress'),
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête du dashboard */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Bienvenue, {user?.first_name || 'Utilisateur'} 👋
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Dashboard Utilisateur
              </p>
            </div>
            {user?.email && (
              <div className="text-sm text-gray-500">
                <p className="font-medium">{user.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Statistiques */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ArrowTrendingUpIcon className="h-6 w-6 text-indigo-600" />
            Mes statistiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`${stat.bgColor} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                      <Icon className={`h-8 w-8 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </h3>
                  <p className={`text-4xl font-bold ${stat.textColor} mb-2`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left group`}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-${action.color}-50 mb-4 group-hover:bg-${action.color}-100 transition-colors`}>
                    <Icon className={`h-6 w-6 text-${action.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message de motivation si aucun cours */}
        {courses.en_cours === 0 && courses.termines === 0 && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-3">
              Commencez votre parcours d'apprentissage ! 🚀
            </h3>
            <p className="text-indigo-100 mb-6">
              Explorez nos formations et commencez à développer vos compétences dès aujourd'hui.
            </p>
            <button
              onClick={() => navigate('/formations')}
              className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
            >
              <BookOpenIcon className="h-5 w-5" />
              Découvrir les formations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
