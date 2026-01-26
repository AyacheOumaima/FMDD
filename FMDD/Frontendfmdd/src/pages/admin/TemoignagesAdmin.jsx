import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';
// Optional: Add notification context if you have it
// import { useNotification } from '../../contexts/NotificationContext';

const TemoignagesAdmin = () => {
  // const { addNotification } = useNotification(); 
  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemoignages();
  }, []);

  const fetchTemoignages = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Removed '/admin' prefix
      const response = await axios.get('/temoignages');
      
      // Handle Laravel resource wrapper (data.data) or simple array
      setTemoignages(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des témoignages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      // ✅ FIXED: Removed '/admin' prefix
      await axios.put(`/temoignages/${id}/status`, { status });
      
      // Update local state immediately to avoid reload
      setTemoignages(prev => prev.map(t => 
        t.id === id ? { ...t, statut: status } : t
      ));
      
      // if (addNotification) addNotification('Statut mis à jour', 'success');
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  // ✅ ADDED: The missing Delete function
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
        return;
    }

    try {
        await axios.delete(`/temoignages/${id}`);
        setTemoignages(prev => prev.filter(t => t.id !== id));
        // if (addNotification) addNotification('Témoignage supprimé', 'success');
    } catch (err) {
        console.error(err);
        alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Gestion des Témoignages</h1>
        <Link 
          to="/admin/temoignages/new" 
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nouveau Témoignage
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
                <th className="px-6 py-3 text-left">Auteur</th>
                <th className="px-6 py-3 text-left">Statut</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {temoignages.length > 0 ? (
                    temoignages.map((temoignage) => (
                    <tr key={temoignage.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{temoignage.auteur}</td>
                        <td className="px-6 py-4">
                        <select
                            value={temoignage.statut}
                            onChange={(e) => handleStatusChange(temoignage.id, e.target.value)}
                            className={`border rounded px-2 py-1 text-sm ${
                                temoignage.statut === 'approuve' ? 'bg-green-100 text-green-800 border-green-200' :
                                temoignage.statut === 'refuse' ? 'bg-red-100 text-red-800 border-red-200' :
                                'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }`}
                        >
                            <option value="en_attente">En attente</option>
                            <option value="approuve">Approuvé</option>
                            <option value="refuse">Refusé</option>
                        </select>
                        </td>
                        <td className="px-6 py-4">
                            {temoignage.created_at 
                                ? new Date(temoignage.created_at).toLocaleDateString() 
                                : (temoignage.date ? new Date(temoignage.date).toLocaleDateString() : '-')}
                        </td>
                        <td className="px-6 py-4">
                        <div className="flex space-x-2">
                            <Link 
                            to={`/admin/temoignages/${temoignage.id}/edit`} 
                            className="text-blue-600 hover:text-blue-800"
                            >
                            Modifier
                            </Link>
                            <button 
                            onClick={() => handleDelete(temoignage.id)}
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
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                            Aucun témoignage trouvé.
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

export default TemoignagesAdmin;