
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from '../../axios';

const InsertionsAdmin = () => {
  const location = useLocation(); 
  const [insertions, setInsertions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [toastMessage, setToastMessage] = useState(location.state?.successMessage || '');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    fetchInsertions();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

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
      setToastMessage('Insertion supprimée avec succès ');
      setToastType('success');
    } catch (err) {
      console.error(err);
      setToastMessage('Erreur lors de la suppression ');
      setToastType('error');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 relative">
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white z-50 transition-all duration-300 ${
            toastType === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toastMessage}
        </div>
      )}

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
                        state={{ insertion: ins }}
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
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
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
