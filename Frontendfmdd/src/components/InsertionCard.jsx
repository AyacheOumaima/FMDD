import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Briefcase, Building2, ArrowRight } from 'lucide-react';

const InsertionCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img 
          src={job.image} 
          alt={job.title} 
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-0 right-0 bg-[#FFB347] text-[#13335F] px-3 py-1 rounded-bl-lg font-medium">
          {job.contractType}
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#13335F] mb-4">{job.title}</h3>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-gray-600">
          <Building2 size={18} className="mr-2 text-[#FFB347]" />
          <span>{job.company}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <MapPin size={18} className="mr-2 text-[#FFB347]" />
          <span>{job.city}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Calendar size={18} className="mr-2 text-[#FFB347]" />
          <span>Début : {job.startDate}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Briefcase size={18} className="mr-2 text-[#FFB347]" />
          <span>{job.contractType}</span>
        </div>
      </div>

      <Link 
        to={`/insertion/${job.id}`}
        className="inline-flex items-center text-[#13335F] hover:text-[#FFB347] transition-colors font-medium"
      >
        Voir plus <ArrowRight size={18} className="ml-1 text-[#FFB347]" />
      </Link>
    </div>
  );
};

export default InsertionCard;