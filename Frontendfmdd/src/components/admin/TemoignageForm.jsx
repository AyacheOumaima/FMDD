import React from 'react';
import AdminForm from './AdminForm';
import { useNavigate, useLocation } from 'react-router-dom';

const TemoignageForm = ({ temoignage = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = temoignage !== null;
  const initialValues = temoignage || {
    auteur: '',
    profession: '',
    contenu: '',
    photo: '',
    statut: 'en_attente',
    is_a_la_une: false
  };

  const handleSubmit = async (formData) => {
    const url = isEditing 
      ? `/admin/temoignages/${temoignage.id}` 
      : '/admin/temoignages';
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      await axios[method.toLowerCase()](url, formData);
      navigate('/admin/temoignages');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminForm 
      onSubmit={handleSubmit}
      onCancel={() => navigate('/admin/temoignages')}
      title={isEditing ? 'Modifier un témoignage' : 'Nouveau témoignage'}
      initialValues={initialValues}
    >
      {({ handleChange, formData }) => (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auteur
              </label>
              <input
                type="text"
                name="auteur"
                value={formData.auteur}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profession
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenu
            </label>
            <textarea
              name="contenu"
              value={formData.contenu}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows="6"
              required
            />
          </div>

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

export default TemoignageForm;
