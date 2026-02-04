import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy,
  Loader2
} from 'lucide-react';
import api from '../axios';

export default function BlogArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Récupérer les détails de l'article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Récupérer l'article par son slug
        // Supprimer le préfixe /v1/ car il est déjà inclus dans la configuration de base d'axios
        const endpoint = `/blog/${slug}`.replace(/^\/+v1\//, '/');
        console.log('Appel API vers:', endpoint);
        
        const response = await api.get(endpoint);
        const articleData = response.data.article || response.data.data;
        
        if (!articleData) {
          throw new Error('Aucune donnée d\'article reçue');
        }
        
        // Formater les données de l'article
        const formatImageUrl = (imagePath) => {
          // Si pas d'image, retourner un placeholder
          if (!imagePath) return 'https://placehold.co/1200x675/ffffff/cccccc?text=Image+non+disponible';
          
          // Si l'URL est déjà complète (commence par http ou /storage), la retourner telle quelle
          if (imagePath.startsWith('http') || imagePath.startsWith('/storage')) {
            // Si c'est un chemin relatif commençant par /storage, ajouter le domaine
            if (imagePath.startsWith('/storage')) {
              return `http://localhost:8000${imagePath}`;
            }
            return imagePath;
          }
          
          // Pour les chemins relatifs sans /storage au début
          return `http://localhost:8000/storage/${imagePath.replace(/^[\/\\]+/, '')}`;
        };

        const formattedArticle = {
          ...articleData,
          // Normalisation de la date de publication
          date_publication: (() => {
            const dateValue = articleData.date_publication || articleData.date || articleData.created_at;
            // Si c'est une date valide, la formater en ISO, sinon utiliser la date actuelle
            return dateValue ? new Date(dateValue).toISOString() : new Date().toISOString();
          })(),
          auteur: articleData.user?.name || articleData.auteur || 'Auteur inconnu',
          image_principale: formatImageUrl(articleData.image_principale),
          contenu: articleData.contenu || articleData.content || ''
        };
        
        setArticle(formattedArticle);
        
        // Récupérer les articles similaires ou populaires
        try {
          console.log('Récupération des articles populaires...');
          const relatedResponse = await api.get('/blog/populaires');
          console.log('Réponse des articles populaires:', relatedResponse);
          
          if (!relatedResponse.data || !relatedResponse.data.articles) {
            console.warn('Format de réponse inattendu pour les articles populaires');
            return;
          }
          
          const formattedRelated = relatedResponse.data.articles.data.slice(0, 3).map(article => {
            console.log('Article brut:', article); // Debug
            return {
              ...article,
              // Essayer différentes propriétés d'image possibles
              image_principale: formatImageUrl(
                article.image_principale || 
                article.image ||
                article.featured_image ||
                article.cover_image ||
                article.image_url
              ),
              // Assurer que les propriétés essentielles existent
              titre: article.titre || article.title || 'Sans titre',
              slug: article.slug || ''
            };
          });
          
          console.log('Articles formatés:', formattedRelated); // Debug
          setRelatedArticles(formattedRelated);
        } catch (err) {
          console.error('Erreur lors de la récupération des articles similaires:', err);
        }
        
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'article:', err);
        const errorDetails = {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: {
            url: err.config?.url,
            method: err.config?.method,
            baseURL: err.config?.baseURL
          }
        };
        console.error('Détails de l\'erreur:', errorDetails);
        
        setError('Article non trouvé ou erreur de chargement.');
        
        // Ne pas rediriger automatiquement pour permettre le débogage
        // setTimeout(() => {
        //   navigate('/404');
        // }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, navigate]);

  // Gérer le partage sur les réseaux sociaux
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.titre || '';
    const text = article?.resume || '';
    const image = article?.image_principale || '';

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  // Copier le lien dans le presse-papiers
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers !');
    } catch (err) {
      console.error('Erreur lors de la copie du lien :', err);
      toast.error('Impossible de copier le lien');
    }
  };

  // Fonction utilitaire pour formater la date de manière cohérente
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    try {
      const date = new Date(dateString);
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) {
        console.warn('Date invalide reçue:', dateString);
        return 'Date inconnue';
      }
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Erreur lors du formatage de la date:', e);
      return 'Date inconnue';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Article non trouvé'}</h2>
        <p>Vous allez être redirigé vers la page d'accueil...</p>
        <Link 
          to="/actualites" 
          className="mt-4 inline-flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux actualités
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{article.titre} - FMDD</title>
        <meta name="description" content={article.resume || article.titre} />
        <meta property="og:title" content={article.titre} />
        <meta property="og:description" content={article.resume || article.titre} />
        <meta property="og:image" content={article.image_principale} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
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
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden bg-gray-100">
              {article.image_principale ? (
                <img 
                  src={article.image_principale.startsWith('http') 
                    ? article.image_principale 
                    : `http://localhost:8000/storage/${article.image_principale.replace(/^[\/\\]+/, '')}`}
                  alt={article.titre} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Erreur de chargement de l\'image:', e.target.src);
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/1200x675/ffffff/cccccc?text=Image+non+disponible';
                    e.target.classList.add('object-contain', 'p-8');
                  }}
                  onLoad={(e) => {
                    // Si l'image est un placeholder, on la centre
                    if (e.target.src.includes('placehold.co')) {
                      e.target.classList.add('object-contain', 'p-8');
                      e.target.classList.remove('object-cover');
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">Image non disponible</span>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              {/* Titre */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.titre}</h1>

              {/* Métadonnées */}
              <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {article.auteur || 'Auteur inconnu'}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.date_publication)}
                </span>
                {Array.isArray(article.tags) && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {typeof tag === 'object' ? tag.name || tag.tag : tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Contenu de l'article */}
              <div className="prose max-w-none text-gray-700">
                {article.contenu ? (
                  <div dangerouslySetInnerHTML={{ __html: article.contenu }} />
                ) : article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <p>Le contenu de l'article n'est pas disponible.</p>
                )}
              </div>

              {/* Boutons de partage */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Partager cet article :</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    aria-label="Partager sur Facebook"
                  >
                    <Facebook size={20} />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                    aria-label="Partager sur Twitter"
                  >
                    <Twitter size={20} />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                    aria-label="Partager sur LinkedIn"
                  >
                    <Linkedin size={20} />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    aria-label="Copier le lien"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>

              {/* Articles similaires */}
              {relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Articles similaires</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((related) => (
                      <div key={related.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="w-full h-48 bg-gray-100 overflow-hidden">
                          <img
                            src={related.image_principale}
                            alt={related.titre}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.log('Erreur de chargement de l\'image:', related.image_principale); // Debug
                              e.target.onerror = null;
                              e.target.src = 'https://placehold.co/800x450/ffffff/cccccc?text=Image+non+disponible';
                              e.target.classList.add('object-contain', 'p-8');
                              e.target.classList.remove('object-cover');
                            }}
                            onLoad={(e) => {
                              if (e.target.src.includes('placehold.co')) {
                                e.target.classList.add('object-contain', 'p-8');
                                e.target.classList.remove('object-cover');
                              }
                            }}
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-lg mb-2 line-clamp-2">{related.titre}</h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{related.resume}</p>
                          <Link
                            to={`/actualites/${related.slug}`}
                            className="text-blue-600 hover:underline text-sm font-medium"
                          >
                            Lire la suite
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}