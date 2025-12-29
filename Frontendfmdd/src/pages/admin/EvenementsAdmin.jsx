import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';

const EvenementsAdmin = () => {
  const { addNotification } = useNotification();
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvenements();
  }, []);

  const fetchEvenements = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Removed '/v1' to avoid the double URL error
      const response = await axios.get('/evenements');
      
      // Handle the data structure (sometimes it's inside response.data.data)
      setEvenements(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des événements:', err);
      setError('Erreur lors du chargement des événements');
      addNotification('Erreur lors du chargement des événements', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    try {
      // ✅ This URL is already correct (Axios adds the /api/v1 automatically)
      await axios.delete(`/evenements/${id}`);
      addNotification('Événement supprimé avec succès', 'success');
      // Refresh the list locally to avoid a new API call
      setEvenements(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'événement:', err);
      addNotification('Erreur lors de la suppression de l\'événement', 'error');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Gestion des Événements</h1>
        <Link 
          to="/admin/evenements/new" 
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nouvel Événement
        </Link>
      </div>

      {loading && (
        <div className="text-center py-4">Chargement...</div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
                <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left">Titre</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Ville</th>
                <th className="px-6 py-3 text-left">Participants</th>
                <th className="px-6 py-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {evenements.length > 0 ? (
                    evenements.map((evenement) => (
                    <tr key={evenement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{evenement.titre}</td>
                        <td className="px-6 py-4">
                            {evenement.date ? new Date(evenement.date).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4">{evenement.ville}</td>
                        <td className="px-6 py-4">{evenement.participants_count || 0}</td>
                        <td className="px-6 py-4">
                        <div className="flex space-x-2">
                            <Link 
                            to={`/admin/evenements/${evenement.id}/edit`} 
                            className="text-blue-600 hover:text-blue-800"
                            >
                            Modifier
                            </Link>
                            <button 
                            onClick={() => handleDelete(evenement.id)}
                            className="text-red-600 hover:text-red-800"
                            >
                            Supprimer
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                            Aucun événement trouvé.
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