import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext'; // Don't forget this if you want notifications

const InsertionsAdmin = () => {
  // If you have a notification context, use it. If not, remove this line.
  // const { addNotification } = useNotification(); 
  
  const [insertions, setInsertions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsertions();
  }, []);

  const fetchInsertions = async () => {
    try {
      setLoading(true);
      // ✅ CORRECT: Using the clean endpoint without '/admin' or '/v1'
      const response = await axios.get('/insertions');
      
      // Handle different data structures (Laravel pagination vs Simple array)
      setInsertions(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des insertions.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADDED: The missing Delete function
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette insertion ?')) {
        return;
    }

    try {
        await axios.delete(`/insertions/${id}`);
        // Remove the item from the list without reloading the page
        setInsertions(insertions.filter(item => item.id !== id));
        // if (addNotification) addNotification('Insertion supprimée avec succès', 'success');
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
                <th className="px-6 py-3 text-left">Entreprise</th>
                <th className="px-6 py-3 text-left">Ville</th>
                <th className="px-6 py-3 text-left">Type de contrat</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {insertions.length > 0 ? (
                    insertions.map((insertion) => (
                    <tr key={insertion.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{insertion.entreprise}</td>
                        <td className="px-6 py-4">{insertion.ville}</td>
                        <td className="px-6 py-4">{insertion.type_contrat}</td>
                        <td className="px-6 py-4">
                            {insertion.date ? new Date(insertion.date).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4">
                        <div className="flex space-x-2">
                            <Link 
                            to={`/admin/insertions/${insertion.id}/edit`} 
                            className="text-blue-600 hover:text-blue-800"
                            >
                            Modifier
                            </Link>
                            <button 
                            onClick={() => handleDelete(insertion.id)}
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