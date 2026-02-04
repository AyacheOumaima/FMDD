import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // Afficher les pages de manière intelligente
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2) ||
      (i === currentPage - 3 && currentPage > 3) ||
      (i === currentPage + 3 && currentPage < totalPages - 2)
    ) {
      pages.push(i);
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-blue-100'
        }`}
      >
        Précédent
      </button>

      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === currentPage - 3 && currentPage > 3 && (
            <span className="px-3 py-1">...</span>
          )}
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'hover:bg-blue-100'
            }`}
          >
            {page}
          </button>
          {page === currentPage + 3 && currentPage < totalPages - 2 && (
            <span className="px-3 py-1">...</span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-blue-100'
        }`}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
