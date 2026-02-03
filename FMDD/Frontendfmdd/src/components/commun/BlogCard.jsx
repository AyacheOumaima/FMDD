import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

// Fonction pour formater la date de manière cohérente
const formatDate = (dateString) => {
  if (!dateString) return 'Date inconnue';
  try {
    const date = new Date(dateString);
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      console.warn('Date invalide reçue dans BlogCard:', dateString);
      return 'Date inconnue';
    }
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error('Erreur lors du formatage de la date dans BlogCard:', e);
    return 'Date inconnue';
  }
};

export default function BlogCard({ slug, title, excerpt, date, author, image, tags = [] }) {
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <Link to={`/actualites/${slug}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image || 'https://placehold.co/800x450/ffffff/cccccc?text=Image+non+disponible'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/800x450/ffffff/cccccc?text=Image+non+disponible';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-3">
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{excerpt}</p>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <User size={14} className="mr-1.5" />
                <span>{author || 'Auteur inconnu'}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {formatDate(date)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-gray-100">
            <span className="inline-flex items-center text-blue-600 font-medium text-sm group-hover:underline">
              Lire l'article
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
