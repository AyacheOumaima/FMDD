import React, { useState, useEffect, useMemo } from 'react';
import Lightbox from '../components/commun/Lightbox'; // Adjust the path if necessary
import api from '../axios'; // Assuming you have an axios instance configured

export default function GaleriePage() {
  const [allImages, setAllImages] = useState([]); // Stores all fetched images
  const [categories, setCategories] = useState([]); // Stores all fetched categories
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Index within filteredImages
  const [loading, setLoading] = useState(true); // Add loading state for initial fetch
  const [error, setError] = useState(null); // Add error state

  // Effect to fetch ALL data ONCE on component mount
  useEffect(() => {
    const fetchInitialGalleryData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch categories
        const categoriesResponse = await api.get('/gallery/categories');
        // The backend already adds 'Tous', so use response.data.data directly
        setCategories(categoriesResponse.data.data);

        // Fetch ALL images (without category filter initially)
        const imagesResponse = await api.get('/gallery');
        // Transform images for Lightbox if needed (e.g., ensure 'src' property)
        // Ensure that each image object passed to lightbox has a 'src' property
        const transformedImages = imagesResponse.data.data.map(img => ({
          ...img,
          src: img.image, // Map your backend 'image' field to 'src' for common lightbox compatibility
        }));
        setAllImages(transformedImages); // Store all images
      } catch (err) {
        console.error('Error fetching initial gallery data:', err);
        setError('Failed to load gallery data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialGalleryData();
  }, []); // Empty dependency array: runs only once on mount

  // Use useMemo to filter images only when allImages or selectedCategory changes
  // This will be very fast as it doesn't involve network requests
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'Tous') {
      return allImages;
    }
    return allImages.filter(image =>
      image.categories && image.categories.includes(selectedCategory)
    );
  }, [allImages, selectedCategory]);

  const openLightbox = (index) => {
    // The index here refers to the index within the currently 'filteredImages' array
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="py-12 bg-blue-light min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-poppins font-bold text-blue-950 mb-6">Galerie Médias</h1>

        <p className="mb-8 text-gray-700 max-w-3xl">
          Explorez notre galerie de photos illustrant les activités, événements et projets du FMDD.
        </p>

        {/* Filters by category */}
        {loading && <div className="text-center text-gray-600">Chargement des catégories...</div>}
        {error && !loading && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}
        {!loading && !error && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white' // Active style
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300' // Inactive style
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Grid of images */}
        {loading && !error && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Chargement des images...</p>
          </div>
        )}

        {!loading && !error && filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              {selectedCategory === 'Tous'
                ? 'Aucune image disponible.'
                : `Aucune image dans la catégorie "${selectedCategory}".`}
            </p>
          </div>
        )}

        {!loading && !error && filteredImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer h-64"
                onClick={() => openLightbox(index)} // Pass index within filteredImages
              >
                <img
                  src={image.src} // Use the transformed 'src' property (image.image from backend)
                  alt={image.titre || 'Image de la galerie'} // Use titre for alt text
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-dark bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <span className="text-white font-medium block">{image.titre}</span>
                    <span className="text-yellow-500 text-sm">{image.categories && image.categories.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && filteredImages.length > 0 && (
        <Lightbox
          images={filteredImages} // Pass the *currently filtered* images
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex} // <--- Pass the setter for internal navigation
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}