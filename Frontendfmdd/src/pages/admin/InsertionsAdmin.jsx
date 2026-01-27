
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

const InsertionsAdmin = () => {
  const [insertions, setInsertions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsertions();
  }, []);

  const fetchInsertions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/insertions');
      setInsertions(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des insertions.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette insertion ?')) return;

    try {
      await axios.delete(`/api/v1/insertions/${id}`);
      setInsertions(insertions.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Gestion des Insertions</h1>
        <Link
          to="/admin/insertions/new"
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nouvelle Insertion
        </Link>
      </div>

      {loading && <div className="text-center py-4">Chargement...</div>}
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
                <th className="px-6 py-3 text-left">Poste</th>
                <th className="px-6 py-3 text-left">Entreprise</th>
                <th className="px-6 py-3 text-left">Ville</th>
                <th className="px-6 py-3 text-left">Début</th>
                <th className="px-6 py-3 text-left">Type de contrat</th>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {insertions.length > 0 ? (
                insertions.map((ins) => (
                  <tr key={ins.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{ins.poste}</td>
                    <td className="px-6 py-4">{ins.entreprise}</td>
                    <td className="px-6 py-4">{ins.ville}</td>
                    <td className="px-6 py-4">
                      {ins.date_début ? new Date(ins.date_début).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">{ins.type_contrat}</td>
                    <td className="px-6 py-4">
                      {ins.image ? (
                        <img
                          src={`http://localhost:8000/storage/${ins.image}`}
                          alt={ins.poste}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : '-'}
                    </td>
                     <td className="px-6 py-4">{ins.description}</td>
                    <td className="px-6 py-4 flex space-x-2">
                  <Link
                    to={`/admin/insertions/${ins.id}/edit`}
                    state={{ insertion: ins }} // envoyer données
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Modifier
                  </Link>

                      <button
                        onClick={() => handleDelete(ins.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Aucune insertion trouvée.
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

export default InsertionsAdmin;
