import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [courses, setCourses] = useState({
    en_cours: 0,
    termines: 0,
    certificats: 0
  });

  useEffect(() => {
    // Récupérer les données spécifiques à l'utilisateur
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Récupérer les statistiques des cours
        const statsResponse = await axios.get('/user/courses/stats');
        setCourses(statsResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête du dashboard */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bienvenue, {user?.first_name}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Dashboard Utilisateur
              </p>
            </div>
          </div>
        </div>

        {/* Contenu spécifique à l'utilisateur */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Mes activités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Cours en cours
              </h3>
              <p className="text-3xl font-semibold text-blue-900">
                {courses.en_cours}
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Cours terminés
              </h3>
              <p className="text-3xl font-semibold text-green-900">
                {courses.termines}
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">
                Certificats
              </h3>
              <p className="text-3xl font-semibold text-yellow-900">
                {courses.certificats}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
            >
              Explorer les cours
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
            >
              Mon profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
