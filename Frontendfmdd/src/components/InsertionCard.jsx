
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Briefcase, Building2, ArrowRight } from 'lucide-react';

const InsertionCard = ({ insertion }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      
      {/* Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img 
          src={
            insertion.image
              ? `http://localhost:8000/storage/${insertion.image}`
              : '/images/default-job.jpg'
          }
          alt={insertion.poste}
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-0 right-0 bg-[#FFB347] text-[#13335F] px-3 py-1 rounded-bl-lg font-medium">
          {insertion.type_contrat}
        </div>
      </div>

      {/* Titre */}
      <h3 className="text-xl font-bold text-[#13335F] mb-4">
        {insertion.poste}
      </h3>

      {/* Infos */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-gray-600">
          <Building2 size={18} className="mr-2 text-[#FFB347]" />
          <span>{insertion.entreprise}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <MapPin size={18} className="mr-2 text-[#FFB347]" />
          <span>{insertion.ville || 'Non précisée'}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Calendar size={18} className="mr-2 text-[#FFB347]" />
          <span>
            Début : {insertion.date_début ?? 'À définir'}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Briefcase size={18} className="mr-2 text-[#FFB347]" />
          <span>{insertion.type_contrat}</span>
        </div>
      </div>

      {/* Lien */}
      <Link 
        to={`/insertion/${insertion.id}`}
        className="inline-flex items-center text-[#13335F] hover:text-[#FFB347] transition-colors font-medium"
      >
        Voir plus <ArrowRight size={18} className="ml-1 text-[#FFB347]" />
      </Link>
    </div>
  );
};

export default InsertionCard;
