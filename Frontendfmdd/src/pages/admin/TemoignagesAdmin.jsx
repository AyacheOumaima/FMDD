
import React, { useState, useEffect } from 'react';
import api from '../../axios'; 
import { API_ROUTES } from '../../config/api.config'; 
const TemoignagesAdmin = () => {
  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemoignages();
  }, []);

  const fetchTemoignages = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ROUTES.temoignages.all); 
      setTemoignages(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Erreur admin:', err.response?.data || err.message);
      setError('Erreur lors du chargement des témoignages');
    } finally {
      setLoading(false);
    }
  };

const handleStatusChange = async (id, newStatus) => {
  const oldTemoignages = [...temoignages];
  const oldStatus = temoignages.find(t => t.id === id)?.statut;
  setTemoignages(prev =>
    prev.map(t =>
      t.id === id ? { ...t, statut: newStatus } : t
    )
  );

  try {
    
    let response;
    if (newStatus === 'accepter') {
      response = await api.post(API_ROUTES.temoignages.accept(id));
    } else if (newStatus === 'refuser') {
      response = await api.post(API_ROUTES.temoignages.reject(id));
    } else {
      response = await api.put(API_ROUTES.temoignages.update(id), { 
        statut: newStatus 
      });
    }

  
    console.log('Statut changé avec succès:', response.data);
    
    setError(null);
    
  } catch (err) {
    console.error('Erreur API:', err);
    
    setTemoignages(oldTemoignages);
    
    setError(`Échec: ${err.response?.data?.message || err.message}`);
    
    setTimeout(() => {
      fetchTemoignages(); 
    }, 2000);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce témoignage ?')) return;

    try {
      await api.delete(API_ROUTES.temoignages.destroy(id));
      setTemoignages(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  const getStatusClass = (statut) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'accepter':
      case 'accepte':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'refuser':
      case 'refuse':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Gestion des Témoignages
      </h1>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Auteur</th>
                <th className="px-4 py-2 text-left">Poste</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Statut</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {temoignages.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Aucun témoignage
                  </td>
                </tr>
              )}

              {temoignages.map(t => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{t.nom}</td>
                  <td className="px-4 py-2">{t.poste ?? '-'}</td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    {t.message.substring(0, 80)}...
                  </td>

                  <td className="px-4 py-2">
                    <select
                      value={t.statut}
                      onChange={(e) => handleStatusChange(t.id, e.target.value)}
                      className={`border rounded px-2 py-1 text-sm transition-colors duration-200 ${getStatusClass(t.statut)}`}
                    >
                      <option value="en_attente">En attente</option>
                      <option value="accepte">Accepter</option>
                      <option value="refuser">Refuser</option>
                    </select>
                  </td>

                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TemoignagesAdmin;