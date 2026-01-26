import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { useNotification } from '../../contexts/NotificationContext';

const ProjetForm = ({ projet = null }) => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const isEditing = projet !== null;
  const [loading, setLoading] = useState(false);
  // Initialisation avec les champs de la base de données
  const [formData, setFormData] = useState({
    titre_projet: projet?.titre_projet || '',
    description_projet: projet?.description_projet || '',
    theme: projet?.theme || '',
    date_projet: projet?.date_projet ? projet.date_projet.split(' ')[0] : '',
    statut_projet: projet?.statut_projet || 'en_cours',
    localisation: projet?.localisation || '', // Obligatoire
    duree: projet?.duree || '',     // Obligatoire
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      // On ajoute tous les champs au FormData
      Object.keys(formData).forEach(key => {
        if (key === 'image') {
          if (formData[key] instanceof File) data.append(key, formData[key]);
        } else {
          data.append(key, formData[key]);}});
      if (isEditing) {
        data.append('_method', 'PUT'); // Indispensable pour Laravel avec FormData
        await api.post(`api/v1/projets/${projet.id}`, data ,{
        headers: { 'Content-Type': 'multipart/form-data' }
      });
        addNotification('Projet mis à jour avec succès', 'success');
      } else {
        await api.post('api/v1/projets', data ,{
        headers: { 'Content-Type': 'multipart/form-data' }
      });
        addNotification('Projet créé avec succès', 'success');
      }
      navigate('/admin/projets');
    } catch (error) {
      console.error(error);
      addNotification('Erreur lors de la sauvegarde', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        {isEditing ? 'Modifier le projet' : 'Nouveau projet'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="titre_projet" value={formData.titre_projet} onChange={handleChange} placeholder="Titre" className="border p-2 rounded" required />
          <input type="text" name="theme" value={formData.theme} onChange={handleChange} placeholder="Thème" className="border p-2 rounded" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="localisation" value={formData.localisation} onChange={handleChange} placeholder="Localisation (ex: Casablanca)" className="border p-2 rounded" required />
          <input type="text" name="duree" value={formData.duree} onChange={handleChange} placeholder="Durée (ex: 6 mois)" className="border p-2 rounded" required />
        </div>

        <textarea name="description_projet" value={formData.description_projet} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" rows="4" required />

        <div className="grid grid-cols-3 gap-4">
          <input type="date" name="date_projet" value={formData.date_projet} onChange={handleChange} className="border p-2 rounded" />
          <select name="statut_projet" value={formData.statut_projet} onChange={handleChange} className="border p-2 rounded">
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
          </select>
          <input type="file" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} className="p-1" />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button type="button" onClick={() => navigate('/admin/projets')} className="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
          <button type="submit" disabled={loading} className="bg-blue-800 text-white px-6 py-2 rounded">
            {loading ? 'Traitement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjetForm;