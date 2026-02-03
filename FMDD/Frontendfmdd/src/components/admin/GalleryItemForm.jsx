import React from 'react';
import AdminForm from './AdminForm';
import { useNavigate, useLocation } from 'react-router-dom';

const GalleryItemForm = ({ item = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = item !== null;
  const initialValues = item || {
    image: '',
    description: '',
    categorie: '',
    ordre: 0,
    is_a_la_une: false
  };

  const handleSubmit = async (formData) => {
    const url = isEditing 
      ? `/admin/gallery/${item.id}` 
      : '/admin/gallery';
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      await axios[method.toLowerCase()](url, formData);
      navigate('/admin/gallery');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminForm 
      onSubmit={handleSubmit}
      onCancel={() => navigate('/admin/gallery')}
      title={isEditing ? 'Modifier une image' : 'Nouvelle image'}
      initialValues={initialValues}
    >
      {({ handleChange, formData }) => (
        <div>
          {/* Image */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) => handleChange(e)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
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

          {/* Catégorie */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="projets">Projets</option>
              <option value="formations">Formations</option>
              <option value="evenements">Événements</option>
              <option value="insertions">Insertions</option>
              <option value="temoignages">Témoignages</option>
            </select>
          </div>

          {/* Ordre */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ordre d'affichage
            </label>
            <input
              type="number"
              name="ordre"
              value={formData.ordre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              min="0"
            />
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

export default GalleryItemForm;
