import React, { useState, useEffect } from 'react';
import api from '../../axios';
import { Link } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';

const EvenementsAdmin = () => {
  const { addNotification } = useNotification();
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null); // Pour désactiver le bouton pendant la suppression

  useEffect(() => {
    fetchEvenements();
  }, []);

  const fetchEvenements = async () => {
    try {
      setLoading(true);
      const response = await api.get('api/v1/events');
      
      console.log('📊 Réponse API:', response.data);
      
      let dataReceived;
      if (response.data.data) {
        dataReceived = response.data.data;
      } else if (Array.isArray(response.data)) {
        dataReceived = response.data;
      } else {
        dataReceived = [];
      }
      
      console.log('✅ Événements chargés:', dataReceived);
      setEvenements(dataReceived);
      setError(null);
    } catch (err) {
      console.error('❌ Erreur chargement:', err);
      setError('Impossible de charger les événements.');
      addNotification('Erreur lors du chargement des événements', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Confirmation
    if (!window.confirm('⚠️ Êtes-vous sûr de vouloir supprimer définitivement cet événement ?\n\nCette action est irréversible.')) {
      return;
    }

    try {
      setDeleting(id); // Désactive le bouton pendant la suppression
      
      console.log(`🗑️ Suppression de l'événement ID: ${id}`);
      
      // Appel API - Utilisez 'evenements' et non 'events'
      await api.delete(`api/v1/evenements/${id}`);
      
      console.log('✅ Événement supprimé avec succès');
      
      // Notification de succès
      addNotification('✅ Événement supprimé avec succès', 'success');
      
      // Mise à jour immédiate de l'affichage (suppression locale)
      setEvenements(prev => prev.filter(e => e.id !== id));
      
    } catch (err) {
      console.error('❌ Erreur suppression:', err);
      console.error('❌ Response:', err.response?.data);
      
      // Gestion des erreurs spécifiques
      if (err.response?.status === 404) {
        addNotification('❌ Événement introuvable', 'error');
      } else if (err.response?.status === 403) {
        addNotification('❌ Vous n\'avez pas la permission de supprimer cet événement', 'error');
      } else {
        addNotification('❌ Erreur lors de la suppression de l\'événement', 'error');
      }
    } finally {
      setDeleting(null); // Réactive le bouton
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Gestion des Événements</h1>
        <Link 
          to="/admin/evenements/new" 
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Nouvel Événement
        </Link>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Ville
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {evenements.length > 0 ? (
                evenements.map((evenement) => (
                  <tr key={evenement.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {evenement.titre || 'Sans titre'}
                    </td>
                    
                    <td className="px-6 py-4 text-gray-600">
                      {evenement.date 
                        ? new Date(evenement.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        : '-'
                      }
                    </td>
                    
                    <td className="px-6 py-4 text-gray-600">
                      {evenement.ville || '-'}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">
                          {evenement.nombre_inscrits || 0} / {evenement.limite_de_places || 'Illimité'}
                        </span>
                        {evenement.has_available_spots === false && (
                          <span className="text-red-500 text-xs font-bold uppercase mt-1">
                            Complet
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <Link 
                          to={`/admin/evenements/${evenement.id}/edit`} 
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          ✏️ Modifier
                        </Link>
                        <button 
                          onClick={() => handleDelete(evenement.id)}
                          disabled={deleting === evenement.id}
                          className={`font-medium transition-colors ${
                            deleting === evenement.id
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-red-600 hover:text-red-800'
                          }`}
                        >
                          {deleting === evenement.id ? (
                            <span className="flex items-center">
                              <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Suppression...
                            </span>
                          ) : (
                            '🗑️ Supprimer'
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg 
                        className="w-12 h-12 text-gray-400 mb-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      <p className="italic mb-2">Aucun événement enregistré dans la base de données.</p>
                      <Link 
                        to="/admin/evenements/new"
                        className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Créer le premier événement
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EvenementsAdmin;