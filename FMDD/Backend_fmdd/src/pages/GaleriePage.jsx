import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lightbox from '../components/commun/Lightbox';

const categories = ["Tous", "Projets", "Formations", "Evenements"];

export default function GaleriePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/gallery`);
        // Transformer les données pour correspondre au format attendu
        const transformedData = response.data.data.map(item => ({
          id: item.id,
          src: item.image,
          alt: item.titre,
          category: item.categories[0], // Prendre la première catégorie
          description: item.description
        }));
        setGalleries(transformedData);
      } catch (err) {
        console.error('Erreur lors du chargement de la galerie:', err);
        setError('Une erreur est survenue lors du chargement de la galerie.');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const filteredImages = selectedCategory === "Tous"
    ? galleries
    : galleries.filter(image => image.category === selectedCategory);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  if (loading) {
    return (
      <div className="py-12 bg-blue-light min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-blue-light min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-blue-light min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-poppins font-bold text-blue-950 mb-6">Galerie Médias</h1>

        <p className="mb-8 text-gray-700 max-w-3xl">
          Explorez notre galerie de photos illustrant les activités, événements et projets du FMDD.
        </p>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer h-64"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-dark bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <span className="text-white font-medium block">{image.alt}</span>
                  <span className="text-yellow-500 text-sm">{image.category}</span>
                  {image.description && (
                    <p className="text-white text-sm mt-2 line-clamp-2">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aucun résultat */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Aucune image dans cette catégorie.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={filteredImages}
          selectedImageIndex={selectedImageIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
} 