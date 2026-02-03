import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const GalleryAdmin = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Removed '/admin' prefix
      const response = await axios.get('/gallery');
      
      // Handle Laravel resource wrapper (data.data) or simple array
      setImages(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement de la galerie.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADDED: The missing Delete function
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
        return;
    }

    try {
        await axios.delete(`/gallery/${id}`);
        setImages(prev => prev.filter(img => img.id !== id));
    } catch (err) {
        console.error(err);
        alert('Erreur lors de la suppression de l\'image');
    }
  };

  const handleReorder = async (newOrder) => {
    try {
      // ✅ FIXED: Removed '/admin' prefix
      await axios.post('/gallery/reorder', { newOrder });
      fetchImages();
    } catch (err) {
      console.error('Erreur lors du réordre:', err);
      alert('Erreur lors de la réorganisation');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Galerie Média</h1>
        <Link 
          to="/admin/gallery/new" 
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nouvelle Image
        </Link>
      </div>

      {loading && (
        <div className="text-center py-4">Chargement...</div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.length > 0 ? (
                images.map((image, index) => (
                <div key={image.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                    <div className="relative aspect-square">
                    <img 
                        src={image.url} 
                        alt={image.description || 'Image galerie'} 
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Image+Non+Trouvée'; }}
                    />
                    {image.description && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm rounded-b-lg">
                        {image.description}
                        </div>
                    )}
                    </div>
                    <div className="mt-4">
                    <p className="text-gray-600 text-sm mb-3">
                        <span className="font-bold">Catégorie:</span> {image.categorie || 'Aucune'}
                    </p>
                    <div className="flex justify-between items-center border-t pt-3">
                        {/* Note: This reorder button needs drag-and-drop logic to work fully, 
                            currently it just triggers the API call with the index */}
                        <button 
                        onClick={() => handleReorder(index)}
                        className="text-gray-500 hover:text-blue-600 text-sm"
                        title="Fonctionnalité à implémenter"
                        >
                        Réordonner
                        </button>
                        <div className="flex space-x-3">
                        <Link 
                            to={`/admin/gallery/${image.id}/edit`} 
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                            Modifier
                        </Link>
                        <button 
                            onClick={() => handleDelete(image.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                            Supprimer
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="col-span-3 text-center text-gray-500 py-10">
                    Aucune image dans la galerie.
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;