import React, { useState, useEffect } from 'react';

const SearchFilter = ({ 
  onSearch,
  onFilter,
  filterOptions = [],
  placeholder = 'Rechercher...',
  debounceTime = 500
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceTime]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    onFilter(value);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <div className="flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filterOptions.length > 0 && (
        <div className="flex-1">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous</option>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
