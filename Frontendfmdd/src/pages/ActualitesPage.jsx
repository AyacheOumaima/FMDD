import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import BlogCard from '../components/commun/BlogCard';
import api from '../axios';

export default function ActualitesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 9,
    total: 0,
  });
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('date_publication');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction utilitaire pour formater les URLs d'images (Adaptée pour la Prod)
  const formatImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/800x450/ffffff/cccccc?text=Image+non+disponible';
    
    if (imagePath.startsWith('http')) return imagePath;
    
    // Récupérer l'URL de base depuis l'environnement ou utiliser localhost par défaut
    // On retire '/api/v1' pour obtenir la racine du serveur
    const baseUrl = import.meta.env.VITE_API_BASE_URL 
      ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/v1\/?$/, '') 
      : 'http://localhost:8000';

    // Nettoyer le chemin
    const cleanPath = imagePath.startsWith('/storage') ? imagePath : `/storage/${imagePath.replace(/^\/+/, '')}`;
    
    return `${baseUrl}${cleanPath}`;
  };

  // Récupérer les paramètres d'URL au chargement
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    
    const loadData = async () => {
      try {
        const page = parseInt(searchParams.get('page')) || 1;
        const search = searchParams.get('search') || '';
        const tags = searchParams.get('tags') ? searchParams.get('tags').split(',').filter(Boolean) : [];
        const sort = searchParams.get('sort') || 'date_publication';
        const order = searchParams.get('order') || 'desc';

        if (isMounted) {
          setSearchQuery(search);
          setSelectedTags(tags);
          setSortBy(sort);
          setSortOrder(order);
          setLoading(true);
          
          // Charger les tags et les articles en parallèle
          const [tagsResponse] = await Promise.allSettled([
            fetchTags(),
            fetchArticles(page, search, tags, sort, order, controller.signal)
          ]);
          
          // Si le chargement des tags a échoué, on continue quand même
          if (tagsResponse.status === 'rejected') {
            console.warn('Échec du chargement des tags:', tagsResponse.reason);
          }
        }
      } catch (error) {
        if (error.name !== 'CanceledError' && isMounted) {
          console.error('Erreur lors du chargement initial des données:', error);
          setError('Une erreur est survenue lors du chargement des données. Veuillez réessayer.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [searchParams]);

  // Récupérer les articles depuis l'API avec pagination, recherche et filtrage
  const fetchArticles = async (page = 1, search = '', tags = [], sort = 'date_publication', order = 'desc', signal = null) => {
    let isMounted = true;
    const controller = signal || new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout réduit à 10 secondes

    try {
      // Construire les paramètres de requête de manière optimisée
      const params = new URLSearchParams();
      
      // Ajouter uniquement les paramètres nécessaires
      if (page > 1) params.set('page', page);
      if (search) params.set('search', search);
      if (sort !== 'date_publication') params.set('sort', sort);
      if (order !== 'desc') params.set('order', order);
      if (tags.length > 0) params.set('tags', tags.join(','));
      
      // Toujours limiter le nombre de résultats
      params.set('per_page', 9);

      const response = await api.get(`/blog?${params.toString()}`, {
        signal: controller.signal,
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!isMounted) return;
      
      // Vérifier si la réponse contient les données attendues
      if (!response.data?.articles?.data) {
        throw new Error('Format de réponse inattendu de l\'API');
      }
      
      // Formater les données des articles
      const formattedArticles = response.data.articles.data.map(article => ({
        id: article.id,
        slug: article.slug,
        title: article.titre,
        excerpt: article.resume,
        date: article.date_publication || article.date || article.created_at,
        author: article.user?.name || article.auteur || 'Auteur inconnu',
        image: formatImageUrl(article.image_principale),
        tags: Array.isArray(article.tags) ? article.tags : []
      }));

      if (isMounted) {
        setArticles(formattedArticles);
        setPagination({
          current_page: response.data.articles.current_page,
          last_page: response.data.articles.last_page,
          per_page: response.data.articles.per_page,
          total: response.data.articles.total,
        });
      }
    } catch (err) {
      if (isMounted) {
        if (err.name === 'AbortError' || err.code === 'ECONNABORTED') {
          setError('La requête a pris trop de temps. Vérifiez votre connexion et réessayez.');
        } else if (err.response) {
          setError(`Erreur serveur (${err.response.status}): ${err.response.data?.message || 'Veuillez réessayer plus tard'}`);
        } else if (err.request) {
          setError('Impossible de se connecter au serveur. Vérifiez votre connexion Internet.');
        } else {
          setError('Une erreur est survenue lors de la préparation de la requête.');
        }
        console.error('Erreur lors de la récupération des articles:', err);
      }
    } finally {
      clearTimeout(timeoutId);
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  // Récupérer la liste des tags
  const fetchTags = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); 
    
    try {
      const response = await api.get('/blog/tags', {
        signal: controller.signal,
        timeout: 10000
      });
      
      if (response.data?.tags) {
        setTags(Array.isArray(response.data.tags) ? response.data.tags : []);
      }
    } catch (err) {
      if (err.name !== 'AbortError' && err.code !== 'ECONNABORTED') {
        console.warn('Erreur lors de la récupération des tags:', err);
        setTags([]);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  // Gérer la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    const newSearch = e.target.search.value;
    updateSearchParams({ search: newSearch, page: 1 });
  };

  // Gérer le changement de page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      updateSearchParams({ page: newPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Gérer le tri
  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    updateSearchParams({ sort: field, order: newOrder, page: 1 });
  };

  // Gérer la sélection des tags
  const handleTagToggle = (tag) => {
    let newTags = [...selectedTags];
    if (newTags.includes(tag)) {
      newTags = newTags.filter(t => t !== tag);
    } else {
      newTags.push(tag);
    }
    updateSearchParams({ tags: newTags, page: 1 });
  };

  // Mettre à jour les paramètres de recherche
  const updateSearchParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || (Array.isArray(value) && value.length === 0)) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.set(key, value.join(','));
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams, { replace: true });
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    updateSearchParams({
      search: '',
      tags: [],
      sort: 'date_publication',
      order: 'desc',
      page: 1
    });
  };

  if (loading && articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Actualités - FMDD</title>
        <meta 
          name="description" 
          content="Découvrez les dernières actualités, événements et initiatives du FMDD." 
        />
      </Helmet>
      <div className="py-12 bg-blue-light min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-poppins font-bold text-blue-dark mb-6">
          Actualités
        </h1>

          <p className="mb-8 text-gray-700 max-w-3xl">
            Découvrez les dernières actualités, événements et initiatives du FMDD.
            Restez informé des avancées et des projets dans le domaine du développement durable au Maroc.
          </p>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                placeholder="Rechercher des articles..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise"
                defaultValue={searchQuery}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Rechercher
            </button>
          </form>

          {/* Filtres et tris */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filtres par tags */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {tags.length > 5 && (
                  <span className="text-gray-500 text-sm self-center">+{tags.length - 5} autres</span>
                )}
              </div>
            </div>

            {/* Tri */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Trier par :</span>
              <div className="relative">
                <select
                  value={`${sortBy}_${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('_');
                    handleSort(field);
                  }}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise"
                >
                  <option value="date_publication_desc">Plus récent</option>
                  <option value="date_publication_asc">Plus ancien</option>
                  <option value="titre_asc">Titre (A-Z)</option>
                  <option value="titre_desc">Titre (Z-A)</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowUpDown size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Filtres actifs */}
          {(selectedTags.length > 0 || searchQuery) && (
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <span className="text-sm text-gray-600">Filtres :</span>
              {searchQuery && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                  Recherche: {searchQuery}
                  <button
                    onClick={() => updateSearchParams({ search: '' })}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </span>
              )}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => handleTagToggle(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800 ml-2"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>

        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <BlogCard
                  key={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={article.date}
                  author={article.author}
                  image={article.image}
                  tags={article.tags}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.last_page > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className={`p-2 rounded-md ${
                    pagination.current_page === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                  let pageNum;
                  if (pagination.last_page <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.current_page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.current_page >= pagination.last_page - 2) {
                    pageNum = pagination.last_page - 4 + i;
                  } else {
                    pageNum = pagination.current_page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-md flex items-center justify-center ${
                        pagination.current_page === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                  className={`p-2 rounded-md ${
                    pagination.current_page === pagination.last_page
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>

                
                <span className="text-sm text-gray-600 ml-4">
                  {pagination.total} article{pagination.total !== 1 ? 's' : ''} au total
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600 mb-6">
              Aucun article ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}