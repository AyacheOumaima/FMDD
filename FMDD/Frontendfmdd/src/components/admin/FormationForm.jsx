import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';

const FormationForm = ({ formation = null }) => {
  const navigate = useNavigate();
  const isEditing = formation !== null;

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    lieu: '',
    prix: '',
    image: null
  });

  const [preview, setPreview] = useState(null);

  // ✅ CRUCIAL : Mettre à jour le formulaire quand l'objet "formation" est chargé
  useEffect(() => {
    if (formation) {
      setFormData({
        titre: formation.titre || '',
        description: formation.description || '',
        date_debut: formation.date_debut || '',
        date_fin: formation.date_fin || '',
        lieu: formation.lieu || '',
        prix: formation.prix || '',
        image: null // On ne pré-remplit pas le input file
      });
      
      if (formation.image) {
        // Ajustez selon votre URL de stockage
        setPreview(`http://localhost:8000/storage/${formation.image}`);
      }
    }
  }, [formation]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData(prev => ({ ...prev, image: file }));
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // On ajoute tous les champs au FormData
    Object.keys(formData).forEach(key => {
      if (key === 'image') {
        if (formData[key] instanceof File) {
          data.append('image', formData[key]);
        }
      } else {
        // Laravel nécessite parfois des chaînes vides pour écraser des données
        data.append(key, formData[key] || '');
      }
    });

    try {
      if (isEditing) {
        // Simulation PUT pour Laravel avec FormData
        data.append('_method', 'PUT');
        await api.post(`api/v1/formations/${formation.id}`, data);
        alert('Formation mise à jour !');
      } else {
        await api.post('api/v1/formations', data);
        alert('Formation créée !');
      }
      navigate('/admin/formations');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? `Modifier : ${formation.titre}` : 'Nouvelle formation'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">        
         <div>
    <label className="block text-sm font-medium mb-1">Titre</label>
    <input
      type="text"
      name="titre"
      value={formData.titre}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg"
      required
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium mb-1">Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg"
      rows="4"
    />
  </div>

  {/* Date début */}
  <div>
    <label className="block text-sm font-medium mb-1">Date début</label>
    <input
      type="date"
      name="date_debut"
      value={formData.date_debut}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg"
    />
  </div>

  {/* Date fin */}
  <div>
    <label className="block text-sm font-medium mb-1">Date fin</label>
    <input
      type="date"
      name="date_fin"
      value={formData.date_fin}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg"
    />
  </div>

  {/* Lieu */}
  <div>
    <label className="block text-sm font-medium mb-1">Lieu</label>
    <input
      type="text"
      name="lieu"
      value={formData.lieu}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg"
    />
  </div>

  {/* Prix */}
  <div>
    <label className="block text-sm font-medium mb-1">Prix</label>
    <input
      type="number"
      name="prix"
      value={formData.prix}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg"
    />
  </div>

  {/* Image */}
  <div>
    <label className="block text-sm font-medium mb-1">Image</label>
    <input
      type="file"
      name="image"
      onChange={handleChange}
      className="w-full"
      accept="image/*"
    />

    {preview && (
      <img
        src={preview}
        alt="Preview"
        className="mt-3 h-32 object-cover rounded"
      />
    )}
  </div>

  {/* Boutons */}
  <div className="flex justify-end space-x-3 pt-4">
    <button
      type="button"
      onClick={() => navigate('/admin/formations')}
      className="px-4 py-2 border rounded-lg"
    >
      Annuler
    </button>

    <button
      type="submit"
      className="px-5 py-2 bg-blue-600 text-white rounded-lg"
    >
      {isEditing ? 'Enregistrer les modifications' : 'Créer la formation'}
    </button>
  </div>

      </form>
    </div>
  );
};

export default FormationForm;