import React from 'react';
import AdminForm from './AdminForm';
import { useNavigate, useLocation } from 'react-router-dom';

const InsertionForm = ({ insertion = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = insertion !== null;
  const initialValues = insertion || {
    entreprise: '',
    ville: '',
    type_contrat: '',
    date: '',
    description: '',
    photo: '',
    statut: 'en_attente',
    is_a_la_une: false
  };

  const handleSubmit = async (formData) => {
    const url = isEditing 
      ? `/admin/insertions/${insertion.id}` 
      : '/admin/insertions';
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      await axios[method.toLowerCase()](url, formData);
      navigate('/admin/insertions');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminForm 
      onSubmit={handleSubmit}
      onCancel={() => navigate('/admin/insertions')}
      title={isEditing ? 'Modifier une insertion' : 'Nouvelle insertion'}
      initialValues={initialValues}
    >
      {({ handleChange, formData }) => (
        <div>
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entreprise
              </label>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Type de contrat et date */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de contrat
              </label>
              <select
                name="type_contrat"
                value={formData.type_contrat}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Sélectionnez un type</option>
                <option value="stage">Stage</option>
                <option value="alternance">Alternance</option>
                <option value="cdd">CDD</option>
                <option value="cdi">CDI</option>
              </select>
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
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows="4"
            />
          </div>

          {/* Photo */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo
            </label>
            <input
              type="file"
              name="photo"
              onChange={(e) => handleChange(e)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Statut */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="en_attente">En attente</option>
              <option value="approuve">Approuvé</option>
              <option value="refuse">Refusé</option>
            </select>
          </div>

          {/* Options */}
          <div className="mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_a_la_une"
                checked={formData.is_a_la_une}
                onChange={handleChange}
                className="mr-2"
              />
              <span>À la une</span>
            </div>
          </div>
        </div>
      )}
    </AdminForm>
  );
};

export default InsertionForm;
