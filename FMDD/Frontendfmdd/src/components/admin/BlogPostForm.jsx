// src/components/admin/BlogPostForm.jsx
import React from 'react';
import AdminForm from './AdminForm';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react';
const BlogPostForm = () => {
   const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

const [article, setArticle] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  if (isEditing) {
    fetchArticle();
  }
}, [id]);

const fetchArticle = async () => {
  try {
    setLoading(true);
    const res = await api.get(`/api/v1/admin/blog/${id}`);
    setArticle(res.data.article);
  } catch (err) {
    console.error(err);
    alert("Erreur chargement article");
    navigate('/admin/blog');
  } finally {
    setLoading(false);
  }

};
const initialValues = article
  ? {
      ...article,
      tags: Array.isArray(article.tags)
        ? article.tags.join(', ')
        : article.tags || ''
    }
  : {
      resume: '',
      titre: '',
      auteur: '',
      contenu: '',
      image: null,
      categorie: '',
      tags: '',
      statut: '',
      is_a_la_une: false
    };


 const handleSubmit = async (formData) => {
  const data = new FormData();
  
  // On remplit le FormData
  Object.keys(formData).forEach(key => {
    if (key === 'tags' && Array.isArray(formData[key])) {
      // Si c'est un tableau, on le joint par des virgules pour le contrôleur PHP
      data.append(key, formData[key].join(', '));
    } else if (formData[key] !== null) {
      data.append(key, formData[key]);
    }
  });

  try {
    if (isEditing) {
      // Pour Laravel, pour envoyer des fichiers en PUT, on utilise POST + _method=PUT
      data.append('_method', 'PUT');
      await api.post(`/api/v1/admin/blog/${article.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      // Création : api/v1/blog
      await api.post('/api/v1/blog', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    navigate('/admin/blog');
  } catch (error) {
    console.error("Erreur détails:", error.response?.data);
    alert(error.response?.data?.message || "Erreur lors de l'enregistrement");
  }
};

  return (
    <AdminForm 
      onSubmit={handleSubmit}
      onCancel={() => navigate('/admin/blog')}
      title={isEditing ? 'Modifier l\'article' : 'Nouvel article'}
      initialValues={initialValues}
    >
      {({ handleChange, formData, setFormData }) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
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
              <label className="block text-sm font-medium text-gray-700">Auteur</label>
              <input
                type="text"
                name="auteur"
                value={formData.auteur}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
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
            </select>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Tags (séparés par des virgules)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ex: formation, emploi"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Contenu</label>
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
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="mt-6 flex gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Statut</label>
                <select
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                >
                    <option value="brouillon">Brouillon</option>
                    <option value="publie">Publié</option>
                </select>
            </div>
            <div className="flex items-end pb-2">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="is_a_la_une"
                        checked={formData.is_a_la_une}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-600">Mettre à la une</span>
                </label>
            </div>
            <div className="mt-6">
              <br/>
  <label className="block text-sm font-medium text-gray-700">Résumé</label>
  <textarea
    name="resume"
    value={formData.resume}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded-lg"
    rows="3"
  />
</div>

          </div>
        </>
      )}
    </AdminForm>
  );
};

export default BlogPostForm;