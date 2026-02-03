import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import StatsAdmin from './StatsAdmin';
import SearchFilter from '../../components/SearchFilter';

const DashboardAdmin = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [stats, setStats] = useState({
    projets: [],
    formations: [],
    evenements: [],
    insertions: [],
    temoignages: [],
    blogPosts: [],
    galleryItems: [],
    totalUsers: 0,
    totalFormateurs: 0,
    totalAdherents: 0,
    totalMessages: 0,
    totalFormations: 0, // Ajoutez ceci
    loading: true

  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ✅ FIX: Use full API paths with /api/v1 prefix
      const [projetsRes, formationsRes, evenementsRes, insertionsRes, 
             temoignagesRes, blogRes, galleryRes, statsRes] = await Promise.allSettled
             ([
        axios.get('/api/v1/projets'),      // Admin protected route
        axios.get('/api/v1/formations'),   // Admin protected route
        axios.get('/api/v1/evenements'),   // Admin protected route
        axios.get('/api/v1/insertions'),   // Admin protected route
        axios.get('/api/v1/temoignages'),  // Admin protected route
        axios.get('/api/v1/blog'),         // Public route
        axios.get('/api/v1/gallery'),      // Public route
        axios.get('/api/v1/stats'),
        axios.get('/api/v1/aprops')
      ]);

      setStats({
        projets: projetsRes.data.data || [], // Added fallback to empty array
        formations: formationsRes.data.data || [],
        evenements: evenementsRes.data.data || [],
        insertions: insertionsRes.data.data || [],
        temoignages: temoignagesRes.data.data || [],
        blogPosts: blogRes.data.data || [],
        galleryItems: galleryRes.data.data || [],
       // RÉCUPÉRATION DES COMPTEURS DEPUIS LE ADMIN_CONTROLLER
      totalUsers: statsRes.data.total_users || 0,
      totalAdherents: statsRes.data.total_adherents || 0,
      totalFormations: statsRes.data.total_formations || 0, // 👈 RÉCUPÉRATION ICI
      totalProjets: statsRes.data.total_projets || 0,       // 👈 AJOUTÉ
      totalEvenements: statsRes.data.total_evenements || 0, // 👈 AJOUTÉ
      totalMessages: statsRes.data.total_messages || 0,
      loading: false
      });
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
      // Optional: don't show error notification if it's just empty data
      // addNotification('Erreur lors du chargement du dashboard', 'error');
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
    addNotification('Données du dashboard mises à jour', 'success');
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
            <p className="mt-1 text-sm text-gray-500">Bienvenue, {user?.first_name}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Rafraîchir
          </button>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Projets</h3>
          <p className="text-3xl font-semibold text-blue-900">{stats.projets?.length || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Formations</h3>
<p className="text-3xl font-semibold text-green-900">
    {stats.totalFormations} {/* 👈 Utilisez la valeur directe ici */}
  </p>        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Événements</h3>
          <p className="text-3xl font-semibold text-purple-900">{stats.evenements?.length || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Insertions</h3>
          <p className="text-3xl font-semibold text-orange-900">{stats.insertions?.length || 0}</p>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Statistiques détaillées</h2>
        <StatsAdmin stats={stats} />
      </div>

      {/* Messages et notifications */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Messages et notifications</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Messages non lus</h3>
              <p className="text-xl font-semibold text-red-600">{stats.totalMessages}</p>
            </div>
            {/* Fix link to match react-router path */}
            <a href="/admin/temoignages" className="text-sm text-blue-600 hover:text-blue-800">Voir tous</a>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Nouveau projet</h3>
            <a href="/admin/projets/new" className="text-blue-600 hover:text-blue-800">Créer un projet</a>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-2">Nouvelle formation</h3>
            <a href="/admin/formations/new" className="text-green-600 hover:text-green-800">Créer une formation</a>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800 mb-2">Nouvel événement</h3>
            <a href="/admin/evenements/new" className="text-purple-600 hover:text-purple-800">Créer un événement</a>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-orange-800 mb-2">Nouvelle insertion</h3>
            <a href="/admin/insertions/new" className="text-orange-600 hover:text-orange-800">Créer une insertion</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;