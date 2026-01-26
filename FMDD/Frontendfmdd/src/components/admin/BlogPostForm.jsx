import React from 'react';
import AdminForm from './AdminForm';
import { useNavigate, useLocation } from 'react-router-dom';

const BlogPostForm = ({ article = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = article !== null;
  const initialValues = article || {
    titre: '',
    auteur: '',
    contenu: '',
    image: '',
    categorie: '',
    tags: [],
    statut: 'brouillon',
    is_a_la_une: false
  };

  const handleSubmit = async (formData) => {
    const url = isEditing 
      ? `/admin/blog/${article.id}` 
      : '/admin/blog';
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      await axios[method.toLowerCase()](url, formData);
      navigate('/admin/blog');
    } catch (error) {
      throw error;
    }
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    const newTags = value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags: newTags
    }));
  };

  return (
    <AdminForm 
      onSubmit={handleSubmit}
      onCancel={() => navigate('/admin/blog')}
      title={isEditing ? 'Modifier un article' : 'Nouvel article'}
      initialValues={initialValues}
    >
      {({ handleChange, formData }) => (
        <div>
          {/* Titre et auteur */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Auteur
              </label>
              <input
                type="text"
                name="auteur"
                value={formData.auteur}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
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
              <option value="actualites">Actualités</option>
              <option value="formations">Formations</option>
              <option value="insertion">Insertion</option>
              <option value="temoignages">Témoignages</option>
            </select>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={handleTagChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ex: formation, insertion, emploi"
            />
          </div>

          {/* Contenu */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenu
            </label>
            <textarea
              name="contenu"
              value={formData.contenu}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows="8"
              required
            />
          </div>

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
              <option value="brouillon">Brouillon</option>
              <option value="publie">Publié</option>
              <option value="archive">Archivé</option>
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

export default BlogPostForm;
