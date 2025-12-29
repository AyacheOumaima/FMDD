import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Calendar, MapPin, Users, Loader2, Lightbulb, Target, TrendingUp, MessageCircle, Rocket, HandHeart } from 'lucide-react';
import axios from '../axios';
import { API_ROUTES } from '../config/api.config';

// Composant pour afficher une carte de projet
const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'en_cours':
        return 'bg-green-100 text-green-800';
      case 'a_venir':
        return 'bg-yellow-100 text-yellow-800';
      case 'termine':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return 'En cours'; // Valeur par défaut plus logique

    const normalizedStatus = status.toLowerCase().trim();
    switch (normalizedStatus) {
      case 'en_cours':
      case 'en cours':
      case 'actif':
      case 'active':
        return 'En cours';
      case 'a_venir':
      case 'à venir':
      case 'planifie':
      case 'planifié':
        return 'À venir';
      case 'termine':
      case 'terminé':
      case 'fini':
      case 'complete':
      case 'complété':
        return 'Terminé';
      default:
        return status; // Afficher le statut tel quel s'il n'est pas reconnu
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      {/* Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={project.image || 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
          alt={project.titre_projet || project.titre || 'Image du projet'}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
          }}
        />
      </div>

      {/* Contenu */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.statut_projet || project.statut)}`}>
            {getStatusLabel(project.statut_projet || project.statut)}
          </span>
          {(project.theme || project.category || project.categorie) && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
              {project.theme || project.category || project.categorie}
            </span>
          )}
        </div>

        {/* Titre */}
        <h3 className="text-xl font-semibold text-blue-950 mb-3 line-clamp-2">
          {project.titre_projet || project.titre || 'Titre non disponible'}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {project.description_projet || project.description || 'Description non disponible'}
        </p>

        {/* Informations supplémentaires */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {project.date_projet ? (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {new Date(project.date_projet).toLocaleDateString('fr-FR')}
                {project.duree && ` • ${project.duree}`}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Date non spécifiée</span>
            </div>
          )}
        </div>

        {/* Bouton */}
        <Link
          to={`/projets/${project.id}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-colors"
        >
          Voir le projet
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default function ProjetsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  // Fonction pour normaliser le texte
  const normalize = useCallback((str = '') => {
    return String(str).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  }, []);

  // Chargement des projets depuis l'API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_ROUTES.projets.index);

        let projectsData = [];

        // Vérification de la structure de la réponse
        if (response.data && Array.isArray(response.data.data)) {
            projectsData = response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
            projectsData = response.data;
        } else if (response.data && response.data.projects) {
            projectsData = response.data.projects;
        } else {
            throw new Error('Format de données API inattendu');
        }

        setProjects(projectsData);
        setFilteredProjects(projectsData);

      } catch (err) {
        console.error('Erreur lors du chargement des projets:', err);
        setError('Erreur lors du chargement des projets. Veuillez réessayer.');
        setProjects([]);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Effet pour filtrer les projets
  useEffect(() => {
    if (!projects.length) {
      return;
    }

    const term = normalize(searchTerm || '');

    const filtered = projects.filter((project) => {
      const title = normalize(project.titre_projet || project.titre || '');
      const desc = normalize(project.description_projet || project.description || '');
      const theme = normalize(project.theme || project.category || project.categorie || '');
      const status = normalize(project.statut_projet || project.statut || '');

      const matchesSearch = !searchTerm ||
        title.includes(term) ||
        desc.includes(term) ||
        theme.includes(term);

      const matchesStatus = filterStatus === 'all' ||
        status === normalize(filterStatus);

      const matchesCategory = filterCategory === 'all' ||
        theme === normalize(filterCategory);

      return matchesSearch && matchesStatus && matchesCategory;
    });

    setFilteredProjects(filtered);
  }, [searchTerm, projects, filterStatus, filterCategory, normalize]);

  // Réinitialise tous les filtres
  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterCategory('all');
  };

  // Gestion du "Voir plus"
  const displayedProjects = showMore ? filteredProjects : filteredProjects.slice(0, 6);

  const handleShowMoreToggle = () => {
    const newShowMoreState = !showMore;
    setShowMore(newShowMoreState);
    if (!newShowMoreState) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <Loader2 className="animate-spin h-16 w-16 text-teal-500 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-blue-950 mb-2">Chargement en cours</h2>
          <p className="text-gray-600">Récupération des projets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Users className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-950 mb-3">Erreur de chargement</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-950 mb-4">Nos Projets</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos initiatives pour un développement durable au Maroc
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Barre de recherche */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Filtre par statut */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="en_cours">En cours</option>
              <option value="a_venir">À venir</option>
              <option value="termine">Terminé</option>
            </select>

            {/* Filtre par catégorie */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="all">Toutes les catégories</option>
              <option value="environnement">Environnement</option>
              <option value="social">Social</option>
              <option value="economique">Économique</option>
            </select>
          </div>

          {/* Bouton de réinitialisation */}
          {(searchTerm || filterStatus !== 'all' || filterCategory !== 'all') && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-gray-600 hover:text-gray-800 flex items-center"
            >
              <Filter className="h-4 w-4 mr-1" />
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bouton "Voir plus" */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={handleShowMoreToggle}
              className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors"
            >
              {showMore ? 'Voir moins' : 'Voir plus de projets'}
              <ArrowRight className={`w-5 h-5 ml-2 transform ${showMore ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Message si aucun projet trouvé */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-blue-950 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-600 mb-4">
                Aucun projet ne correspond à vos critères de recherche.
              </p>
              <button
                onClick={clearFilters}
                className="text-yellow-500 hover:text-yellow-600 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
