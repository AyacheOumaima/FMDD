import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';

  return (
    <div className={`bg-white rounded-lg shadow-md ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>;
};

const CardBody = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

const CardFooter = ({ children, className = '' }) => {
  return <div className={`p-4 border-t border-gray-200 bg-gray-50 ${className}`}>{children}</div>;
};

export { CardHeader, CardBody, CardFooter };
export default Card;
