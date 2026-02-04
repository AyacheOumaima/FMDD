import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import {
  Calendar,
  User,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Eye
} from 'lucide-react';

// Définir l'URL de base de l'API
const API_BASE_URL = 'http://localhost:8000/api/v1';

export default function BlogArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Appel à l'API pour récupérer l'article
        const response = await axios.get(`${API_BASE_URL}/blog/${id}`);
        setArticle(response.data.data); // Ajout de .data car Laravel renvoie les données dans un objet data
        
        // Récupérer les articles similaires
        const relatedResponse = await axios.get(`${API_BASE_URL}/blog/related/${id}`);
        setRelatedArticles(relatedResponse.data.data || []); // Ajout de .data
        
        // Incrémenter le compteur de vues
        await axios.post(`${API_BASE_URL}/blog/${id}/view`);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'article:', err);
        setError(err.response?.data?.message || 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Fonction de copie de l'URL de l'article dans le presse-papiers
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Lien copié !");
  };

  if (loading) {
    return (
      <div className="py-12 container mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise mx-auto"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="py-12 container mx-auto text-center">
        <p className="text-red-600">Une erreur est survenue lors du chargement de l'article.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-blue-light min-h-screen">
      <div className="container mx-auto px-4">
        <Link
          to="/actualites"
          className="inline-flex items-center text-turquoise hover:text-blue-dark mb-6"
        >
          <ArrowLeft size={18} className="mr-2" /> Retour aux actualités
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image de couverture */}
          {article.image_principale && (
            <div className="h-64 md:h-96">
              <img
                src={article.image_principale}
                alt={article.titre}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Métadonnées */}
            <div className="flex flex-wrap items-center text-gray-600 mb-4 gap-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{new Date(article.date_publication).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{article.user?.first_name} {article.user?.last_name}</span>
              </div>
              <div className="flex items-center">
                <Eye size={16} className="mr-1" />
                <span>{article.vues} vues</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                  {article.temps_lecture} min de lecture
                </span>
              </div>
            </div>

            {/* Titre de l'article */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-bold text-blue-dark mb-6">
              {article.titre}
            </h1>

            {/* Résumé */}
            {article.resume && (
              <div className="text-lg text-gray-600 mb-6 italic">
                {article.resume}
              </div>
            )}

            {/* Contenu de l'article */}
            <div className="prose max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: article.contenu }} />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Zone de partage */}
            <div className="border-t pt-6">
              <h3 className="font-poppins font-semibold mb-4">
                Partager cet article
              </h3>
              <div className="flex space-x-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                  aria-label="Partager sur Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.titre)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                  aria-label="Partager sur Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                  aria-label="Partager sur LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <button
                  onClick={copyLinkToClipboard}
                  className="bg-gray-700 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                  aria-label="Copier le lien"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Articles similaires */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-poppins font-bold text-blue-dark mb-6">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <BlogCard
                  key={relatedArticle.id}
                  id={relatedArticle.id}
                  title={relatedArticle.titre}
                  excerpt={relatedArticle.resume}
                  date={new Date(relatedArticle.date_publication).toLocaleDateString('fr-FR')}
                  author={`${relatedArticle.user.first_name} ${relatedArticle.user.last_name}`}
                  image={relatedArticle.image_principale}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 