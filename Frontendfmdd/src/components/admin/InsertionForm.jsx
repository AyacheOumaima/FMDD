
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../axios';
import { API_ROUTES } from '../../config/api.config';
import { useAuth } from '../../contexts/AuthContext';

const InsertionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const insertion = location.state?.insertion || null;
  const isEditing = insertion !== null;
const initialValues = insertion || {
  poste: '',
  entreprise: '',
  ville: '',
  date_début: '',
  type_contrat: '',
  image: null,
  description: '',
};

  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    if (isEditing) {
      await api.post(`/api/v1/insertions/${insertion.id}?_method=PUT`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin/insertions', { state: { successMessage: 'Insertion modifiée avec succès ' } });
    } else {
      await api.post('/api/v1/insertions', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin/insertions', { state: { successMessage: 'Insertion ajoutée avec succès ' } });
    }

  } catch (error) {
    console.error(' Erreur insertion:', error.response?.data || error);
    alert('Erreur lors de la sauvegarde de l’insertion');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Modifier une insertion' : 'Nouvelle insertion'}
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Poste</label>
          <input
            type="text"
            name="poste"
            value={formData.poste}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Entreprise</label>
          <input
            type="text"
            name="entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Ville</label>
          <input
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date_début"
            value={formData.date_début}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Type de contrat</label>
          <select
            name="type_contrat"
            value={formData.type_contrat}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Sélectionnez un type</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Alternance">Alternance</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            accept="image/*"
          />
          {isEditing && formData.image && typeof formData.image === 'string' && (
            <img
              src={`http://localhost:8000/storage/${formData.image}`}
              alt={formData.poste}
              className="w-24 h-24 object-cover mt-2 rounded"
            />
          )}
        </div>
        <div>
  <label className="block font-medium">Description</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2"
    rows="4"
    required
  />
</div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/insertions')}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertionForm;
