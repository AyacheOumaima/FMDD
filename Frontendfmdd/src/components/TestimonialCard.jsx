import React from 'react';
import PropTypes from 'prop-types';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, role, image }) => {
  return (
    <>
      <div className="global rounded-lg shadow-lg overflow-hidden">
        <div className="bg-white p-4 shadow-md" style={{ backgroundColor: '#00A99D' }}>
          <div className="mb-3 text-[#FFB347]">
            <Quote size={60} />
          </div>
        </div>

        <div className="global2 p-6" style={{ backgroundColor: '#FFFFFF' }}>
          <p className="italic text-gray-700 mb-4">"{quote}"</p>
          <div className="flex items-center">
            <img
              src={image}
              alt={author}
              className="w-12 h-12 rounded-full object-cover mr-4 shadow-sm"
            />
            <div>
              <h4 className="font-semibold text-gray-900">{author}</h4>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Définir les types de props avec PropTypes
TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default TestimonialCard;
