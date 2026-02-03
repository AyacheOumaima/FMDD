import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusColor = (status) => {
  switch (status) {
    case 'en_cours':
      return 'bg-blue-100 text-blue-800';
    case 'termine':
      return 'bg-green-100 text-green-800';
    case 'suspendu':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'en_cours':
      return 'En cours';
    case 'termine':
      return 'Terminé';
    case 'suspendu':
      return 'Suspendu';
    default:
      return 'Inconnu';
  }
};

const ProjetCard = ({
  id,
  titre_projet,
  description_projet,
  theme,
  date_projet,
  statut_projet,
  image,
  duree,
}) => {
  const imageUrl = image
    ? `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`
    : 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={titre_projet || 'Image du projet'}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
          }}
        />

        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              statut_projet
            )}`}
          >
            {getStatusLabel(statut_projet)}
          </span>

          {theme && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
              {theme}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-blue-950 mb-3 line-clamp-2">
          {titre_projet || 'Titre non disponible'}
        </h3>

        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {description_projet || 'Description non disponible'}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {date_projet
              ? new Date(date_projet).toLocaleDateString('fr-FR')
              : 'Date non spécifiée'}
            {duree && ` • ${duree}`}
          </div>
        </div>

        <Link
          to={`/projets/${id}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          Voir le projet
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default ProjetCard;
