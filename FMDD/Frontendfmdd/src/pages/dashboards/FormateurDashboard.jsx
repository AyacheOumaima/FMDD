import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const FormateurDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    etudiants_actifs: 0,
    notes_moyennes: 0,
    feedbacks: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Récupérer les cours assignés
        const coursesResponse = await axios.get('/courses/assigned');
        setCourses(coursesResponse.data);

        // Récupérer les statistiques
        const statsResponse = await axios.get('/formateur/stats');
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête du dashboard */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bienvenue, {user?.first_name || 'Formateur'}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Dashboard Formateur
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Mes statistiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Cours assignés
              </h3>
              <p className="text-3xl font-semibold text-blue-900">
                {courses.length}
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Étudiants actifs
              </h3>
              <p className="text-3xl font-semibold text-green-900">
                {stats.etudiants_actifs}
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">
                Notes moyennes
              </h3>
              <p className="text-3xl font-semibold text-yellow-900">
                {(stats.notes_moyennes || 0).toFixed(1)}
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-purple-800 mb-2">
                Feedbacks
              </h3>
              <p className="text-3xl font-semibold text-purple-900">
                {stats.feedbacks}
              </p>
            </div>
          </div>
        </div>

        {/* Liste des cours */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Mes cours
          </h2>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">
                      {course.students_count} étudiants
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/course/${course.id}/dashboard`)}
                    className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    Voir le cours
                  </button>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="text-center text-gray-500">
                Aucun cours assigné pour le moment
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormateurDashboard;
