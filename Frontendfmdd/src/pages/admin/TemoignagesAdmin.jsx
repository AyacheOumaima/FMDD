
import React, { useState, useEffect } from 'react';
import axios from '../../axios';

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
      const response = await axios.get('/api/v1/temoignages');
      setTemoignages(response.data.data ?? response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des témoignages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, statut) => {
    try {
      await axios.put(`/api/v1/temoignages/${id}`, { statut });

      setTemoignages(prev =>
        prev.map(t => t.id === id ? { ...t, statut } : t)
      );
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce témoignage ?')) return;

    try {
      await axios.delete(`/api/v1/temoignages/${id}`);
      setTemoignages(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
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
        <table className="w-full" border={1}>
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Auteur</th>
              <th className="px-4 py-2">Poste</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
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
              <tr key={t.id} className="border-b">
                <td className="px-4 py-2">{t.nom}</td>
                <td className="px-4 py-2">{t.poste ?? '-'}</td>
                <td className="px-4 py-2">{t.message}</td>

                <td className="px-4 py-2">
                  <select
                    value={t.statut}
                    onChange={(e) =>
                      handleStatusChange(t.id, e.target.value)
                    }
                    className={`border rounded px-2 py-1 text-sm transition-colors duration-200
    ${
      temoignages.statut === 'en_attente'
        ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
        : temoignages.statut === 'accepter'
        ? 'bg-green-100 text-green-800 border-green-300'
        : temoignages.statut === 'refuser'
        ? 'bg-red-100 text-red-800 border-red-300'
        : ''
    }`}
                  >
                    <option value="en_attente">En attente</option>
                    <option value="accepte">Accepter</option>
                    <option value="refuse">Refusé</option>
                  </select>
                </td>

                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TemoignagesAdmin;
