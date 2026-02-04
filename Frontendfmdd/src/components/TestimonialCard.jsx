
import React from 'react';
import PropTypes from 'prop-types';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, role }) => {
  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const bgColors = [
    'bg-[#00A99D]', 
    'bg-blue-500', 
    'bg-indigo-500', 
    'bg-purple-500', 
    'bg-orange-500'
  ];
  
  const colorIndex =author.charCodeAt(0) % bgColors.length;
  const avatarBg = bgColors[colorIndex];
  return (
    <div className="relative bg-white rounded-2xl shadow-xl p-8 mt-10 transition-transform hover:scale-105 duration-300">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className={`w-20 h-20 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-2xl font-bold ${avatarBg}`}>
            {getInitials(author)}
          </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#00A99D] p-2 rounded-full text-white shadow-md">
            <Quote size={14} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="pt-8 text-center">
        <p className="text-gray-600 italic leading-relaxed mb-6">
          "{quote}"
        </p>
        
        <div className="border-t border-gray-100 pt-4">
          <h4 className="font-bold text-lg text-gray-800">{author}</h4>
          <p className="text-[#00A99D] font-medium text-sm uppercase tracking-wider">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default TestimonialCard;