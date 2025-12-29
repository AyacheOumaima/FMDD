import { Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  // Function to get the status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-light-green';
      case 'ongoing':
        return 'bg-turquoise';
      case 'upcoming':
        return 'bg-[#FFB347]'; // Changé pour la nouvelle couleur orange
      default:
        return 'bg-gray-500';
    }
  };

  // Function to translate status to French
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'ongoing':
        return 'En cours';
      case 'upcoming':
        return 'À venir';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
      <div className="relative rounded-lg overflow-hidden mb-4">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
        />
        <div className={`absolute top-0 right-0 ${getStatusBadgeColor(project.status)} text-white px-3 py-1 rounded-bl-lg font-medium`}>
          {getStatusText(project.status)}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-[#13335F] mb-2">{project.title}</h3>
      
      <div className="flex space-x-4 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-1 text-[#FFB347]" />
          <span>{project.year}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Tag size={16} className="mr-1 text-[#FFB347]" />
          <span>{project.theme}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
      
      <Link
        to={`/projets/${project.id}`}
        className="mt-auto text-center block text-[#13335F] hover:text-[#FFB347] transition-colors font-medium"
      >
        En savoir plus
      </Link>
    </div>
  );
};

export default ProjectCard;