
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
    projets: [], formations: [], evenements: [], insertions: [], 
    temoignages: [], blogPosts: [], galleryItems: [], 
    totalUsers: 0, totalFormateurs: 0, totalAdherents: 0, 
    totalMessages: 0, loading: true
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projetsRes, formationsRes, evenementsRes, insertionsRes, 
             temoignagesRes, blogRes, galleryRes, statsRes] = await Promise.all([
        axios.get('/api/v1/projets'),
        axios.get('/api/v1/formations'),
        axios.get('/api/v1/evenements'),
        axios.get('/api/v1/insertions'),
        axios.get('/api/v1/temoignages'),
        axios.get('/api/v1/blog'),
        axios.get('/api/v1/gallery'),
        axios.get('/api/v1/stats')
      ]);

      setStats({
        projets: projetsRes.data.data || [],
        formations: formationsRes.data.data || [],
        evenements: evenementsRes.data.data || [],
        insertions: insertionsRes.data.data || [],
        temoignages: temoignagesRes.data.data || [],
        blogPosts: blogRes.data.data || [],
        galleryItems: galleryRes.data.data || [],
        totalUsers: statsRes.data.total_users || 0,
        totalFormateurs: statsRes.data.total_formateurs || 0,
        totalAdherents: statsRes.data.total_adherents || 0,
        totalMessages: statsRes.data.total_messages || 0,
        loading: false
      });
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
    addNotification('Données du dashboard mises à jour', 'success');
  };

 
  const colorPalette = {
    primary: {
      bg: 'bg-gradient-to-r from-white-500 to-white-500',
      text: 'text-black',
      hover: 'hover:from-blue-600 hover:to-cyan-600'
    },
    secondary: {
      bg: 'bg-gradient-to-r from-blue-400 to-blue-400',
      text: 'text-black',
      hover: 'hover:from-blue-500 hover:to-blue-500'
    },
    cardColors: [
      { bg: 'bg-gradient-to-br from-blue-50 to-blue-100', border: 'border-blue-200', text: 'text-blue-700', accent: 'text-blue-600' },
      { bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100', border: 'border-emerald-200', text: 'text-emerald-700', accent: 'text-emerald-600' },
      { bg: 'bg-gradient-to-br from-white to-gray-50', border: 'border-violet-200', text: 'text-violet-700', accent: 'text-violet-600' },
      { bg: 'bg-gradient-to-br from-amber-50 to-amber-100', border: 'border-amber-200', text: 'text-amber-700', accent: 'text-amber-600' },
      { bg: 'bg-gradient-to-br from-rose-50 to-rose-100', border: 'border-rose-200', text: 'text-rose-700', accent: 'text-rose-600' },
      { bg: 'bg-gradient-to-br from-cyan-50 to-cyan-100', border: 'border-cyan-200', text: 'text-cyan-700', accent: 'text-cyan-600' }
    ]
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className={`rounded-2xl shadow-lg ${colorPalette.primary.bg} p-6`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-black">
            <h1 className="text-3xl font-bold mb-2">Tableau de bord administrateur</h1>
            <p className="text-black-100 opacity-90">
              Bonjour <span className="font-semibold">{user?.first_name}</span>, voici un aperçu de votre activité
            </p>
          </div>
          <button 
            onClick={handleRefresh}
            className={`flex items-center px-5 py-3 rounded-xl shadow-md ${colorPalette.secondary.bg} ${colorPalette.secondary.hover} transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            <svg className="w-5 h-5 mr-2 animate-spin-once" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-medium">Rafraîchir</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Projets', count: stats.projets?.length || 0, color: colorPalette.cardColors[0] },
          { title: 'Formations', count: stats.formations?.length || 0,  color: colorPalette.cardColors[1] },
          { title: 'Événements', count: stats.evenements?.length || 0, color: colorPalette.cardColors[2] },
          { title: 'Insertions', count: stats.insertions?.length || 0,  color: colorPalette.cardColors[3] },
          { title: 'Témoignages', count: stats.temoignages?.length || 0,  color: colorPalette.cardColors[2] },
          { title: 'Articles Blog', count: stats.blogPosts?.length || 0,  color: colorPalette.cardColors[3] },
          { title: 'Utilisateurs', count: stats.totalUsers, color: colorPalette.cardColors[0] },
          { title: 'Messages', count: stats.totalMessages,  color: colorPalette.cardColors[1] }
        ].map((item, index) => (
          <div 
            key={index}
            className={`${item.color.bg} border ${item.color.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`px-3 py-1 rounded-full ${item.color.bg} border ${item.color.border} text-xs font-medium ${item.color.accent}`}>
                {item.title}
              </div>
            </div>
            <p className={`text-4xl font-bold mb-1 ${item.color.text}`}>{item.count}</p>
            <p className={`text-sm ${item.color.text} opacity-75`}></p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Statistiques détaillées</h2>
              
            </div>
            <StatsAdmin stats={stats} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Messages</h2>
              <div className="relative">
                {stats.totalMessages > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {stats.totalMessages}
                  </span>
                )}

              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Messages non lus</h3>
                  <p className={`text-2xl font-bold ${stats.totalMessages > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                    {stats.totalMessages}
                  </p>
                </div>
                <a 
                  href="/admin/temoignages" 
                  className="text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                >
                  Voir
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Actions rapides</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { 
                  title: 'Nouveau projet', 
                  href: '/admin/projets/new', 
                  color: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
                  
                },
                { 
                  title: 'Nouvelle formation', 
                  href: '/admin/formations/new', 
                  color: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
                
                },
                { 
                  title: 'Nouvel événement', 
                  href: '/admin/evenements/new', 
                  color: 'from-gray-400 to-gray-500 hover:from-gray to-gray-50 hover:to-gray-600',
              
                },
                { 
                  title: 'Nouvelle insertion', 
                  href: '/admin/insertions/new', 
                  color: 'from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-600',
                
                }
              ].map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className={`group flex items-center justify-between p-4 bg-gradient-to-r ${action.color} rounded-xl text-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5`}
                >
                  <div className="flex items-center">
                  
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const globalStyles = `
@keyframes spin-once {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin-once {
  animation: spin-once 0.5s ease-in-out;
}
`;

export default DashboardAdmin;