import React from 'react';

const Banner = ({ 
  imageUrl, 
  title, 
  description, 
  height = '500px',
  overlayColor = 'bg-blue-900/70'
}) => {
  return (
    <div className="relative w-full" style={{ height }}>
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-contain"
      />
      <div className={`absolute inset-0 ${overlayColor} flex items-center`}>
        <div className="text-white px-8 md:px-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {description && (
            <p className="text-xl max-w-3xl">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;