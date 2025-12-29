import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'; // ✅ Import axios
import { useNotification } from '../../contexts/NotificationContext'; // ✅ Import notification

const ProjetForm = ({ projet = null }) => {
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // ✅ Use notification hook
  const isEditing = projet !== null;
  const [loading, setLoading] = useState(false); // ✅ Add loading state

  const [formData, setFormData] = useState(projet || {
    titre: '',
    description: '',
    theme: '',
    date: '',
    statut: 'en_cours'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        // ✅ Update existing project
        // Note: URL is just '/projets/ID', axios config adds /api/v1 automatically
        await axios.put(`/projets/${projet.id}`, formData);
        addNotification('Projet modifié avec succès', 'success');
      } else {
        // ✅ Create new project
        // Note: URL is just '/projets', not '/v1/projets'
        await axios.post('/projets', formData);
        addNotification('Projet créé avec succès', 'success');
      }
      
      navigate('/admin/projets');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      const message = error.response?.data?.message || 'Erreur lors de la sauvegarde';
      addNotification(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        {isEditing ? 'Modifier un projet' : 'Nouveau projet'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre
          </label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thème
          </label>
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="a_venir">À venir</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button 
            type="button" 
            onClick={() => navigate('/admin/projets')}
            className="px-4 py-2 border rounded hover:bg-gray-50"
            disabled={loading}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className={`bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </>
            ) : (
              'Enregistrer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjetForm;