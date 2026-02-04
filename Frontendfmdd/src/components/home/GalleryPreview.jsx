import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../axios'; // Assurez-vous que le chemin vers votre configuration axios est correct

export default function GalleryPreview() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/v1/gallery'); // L'URL sera http://localhost:8000/api/v1/gallery grâce à la baseURL d'axios
        
        let itemsToDisplay = [];
        if (Array.isArray(response.data)) {
          itemsToDisplay = response.data.slice(0, 4);
        } else if (response.data && Array.isArray(response.data.data)) {
          // Gérer les réponses paginées ou enveloppées (fréquent avec Laravel)
          itemsToDisplay = response.data.data.slice(0, 4);
        } else {
          console.warn('Structure de réponse API inattendue pour la galerie:', response.data);
        }
        setGalleryItems(itemsToDisplay);
      } catch (err) {
        console.error("Erreur lors du chargement de la galerie:", err);
        setError("Impossible de charger les images de la galerie pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []); // Le tableau de dépendances vide assure que cela ne s'exécute qu'au montage

  const openLightbox = (index) => {
    setActiveImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImage(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Chargement de la galerie...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!galleryItems || galleryItems.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-blue-950 mb-2">Notre galerie</h2>
                <p className="text-gray-600 max-w-2xl">
                  Un aperçu visuel de nos activités, événements et projets sur le terrain.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-blue-950 text-blue-950 rounded-md hover:bg-blue-900 hover:text-white transition"
                ><Link to="/galerie">
                  Voir la galerie complète</Link>
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          <p className="text-center text-gray-600">Aucune image à afficher dans la galerie pour le moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-950 mb-2">Notre galerie</h2>
            <p className="text-gray-600 max-w-2xl">
              Un aperçu visuel de nos activités, événements et projets sur le terrain.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              className="inline-flex items-center px-4 py-2 border border-blue-950 text-blue-950 rounded-md hover:bg-blue-900 hover:text-white transition"
            ><Link to="/galerie">
              Voir la galerie complète</Link>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} // Assurez-vous que votre API fournit un 'id' unique
              className="relative overflow-hidden rounded-lg cursor-pointer group aspect-square" // Style pour survol et ratio carré
              onClick={() => openLightbox(index)}
            >
              <img 
                src={item.image} // Assurez-vous que votre API fournit 'image' pour l'URL
                alt={item.title} // Assurez-vous que votre API fournit 'title'
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-md font-semibold text-white mb-1" title={item.titre}>{item.titre}</h3>
                <p className="text-xs text-gray-300 truncate">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {lightboxOpen && activeImage !== null && galleryItems[activeImage] && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 text-white hover:text-green-400"
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              <X size={30} />
            </button>
            
            <div className="max-w-4xl w-full">
              <img 
                src={galleryItems[activeImage].image} 
                alt={galleryItems[activeImage].titre}
                className="w-full h-auto max-h-screen object-contain"
              />
              <div className="text-white py-4 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">{galleryItems[activeImage].titre}</h3>
                <p className="text-sm text-gray-300">{galleryItems[activeImage].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}