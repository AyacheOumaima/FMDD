import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const BlogAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Changed '/admin/blog' to '/blog' (or '/posts' depending on your backend route)
      const response = await axios.get('/blog');
      
      // Handle Laravel resource wrapper (data.data) or simple array
      setArticles(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des articles.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADDED: The missing Delete function
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        return;
    }

    try {
        await axios.delete(`/blog/${id}`);
        // Remove article from list immediately
        setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression de l'article");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Gestion du Blog</h1>
        <Link 
          to="/admin/blog/new" 
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nouvel Article
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
                <th className="px-6 py-3 text-left">Titre</th>
                <th className="px-6 py-3 text-left">Auteur</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Statut</th>
                <th className="px-6 py-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {articles.length > 0 ? (
                    articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{article.titre}</td>
                        <td className="px-6 py-4">{article.auteur || 'Admin'}</td>
                        <td className="px-6 py-4">
                            {article.date 
                                ? new Date(article.date).toLocaleDateString() 
                                : (article.created_at ? new Date(article.created_at).toLocaleDateString() : '-')}
                        </td>
                        <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                            article.statut === 'publie' || article.status === 'published' ? 'bg-green-100 text-green-800' :
                            article.statut === 'brouillon' || article.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                            {article.statut || article.status || 'Inconnu'}
                        </span>
                        </td>
                        <td className="px-6 py-4">
                        <div className="flex space-x-2">
                            <Link 
                            to={`/admin/blog/${article.id}/edit`} 
                            className="text-blue-600 hover:text-blue-800"
                            >
                            Modifier
                            </Link>
                            <button 
                            onClick={() => handleDelete(article.id)}
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
                            Aucun article trouvé.
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

export default BlogAdmin;