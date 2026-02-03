import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const TeamMember = ({ name, role, image, linkedin, email }) => {
  return (
    <div className="card text-center group">
      <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="font-poppins font-semibold text-blue-dark">{name}</h3>
      <p className="text-gray-600 mb-3">{role}</p>
      <div className="flex justify-center space-x-3">
        {linkedin && (
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-dark hover:text-turquoise transition-colors"
            aria-label={`LinkedIn de ${name}`}
          >
            <Linkedin size={18} />
          </a>
        )}
        {email && (
          <a 
            href={`mailto:${email}`}
            className="text-blue-dark hover:text-turquoise transition-colors"
            aria-label={`Email de ${name}`}
          >
            <Mail size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
