import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const AProposAdmin = () => {
  const [sections, setSections] = useState({
    equipe: [],
    objectifs: [],
    services: [],
    histoire: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Changed '/admin/apropos' to '/apropos'
      const response = await axios.get('/apropos');
      
      // ✅ FIXED: Handle data safely (in case API returns nested data or partial data)
      const data = response.data.data || response.data;
      
      setSections({
        equipe: data.equipe || [],
        objectifs: data.objectifs || [],
        services: data.services || [],
        histoire: data.histoire || []
      });
      
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des données "À propos".');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Gestion "À propos"</h1>

      {loading && (
        <div className="text-center py-4">Chargement...</div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && (
      <div className="space-y-8">
        {/* Section Équipe */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.equipe.length > 0 ? (
                sections.equipe.map((membre) => (
                <div key={membre.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="relative aspect-square">
                    <img 
                        src={membre.image} 
                        alt={membre.nom} 
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Avatar'; }}
                    />
                    </div>
                    <div className="mt-4">
                    <h3 className="font-semibold text-lg">{membre.nom}</h3>
                    <p className="text-gray-600">{membre.role}</p>
                    <div className="flex space-x-4 mt-2">
                        {membre.linkedin && (
                            <a href={membre.linkedin} target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6 text-blue-600 hover:text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            </a>
                        )}
                        {membre.email && (
                            <a href={`mailto:${membre.email}`}>
                            <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14c1.657 0 3-1.343 3-3V5c0-1.657-1.343-3-3-3S9 3.343 9 5v6c0 1.657 1.343 3 3 3zm5.303.172l1.141 4.562c.052.205.078.422.078.636 0 .414-.339.753-.752.753h-15c-.413 0-.752-.339-.752-.753 0-.214.027-.431.078-.636l1.14-4.562c.189-.747.766-1.246 1.41-.986l7.105 2.841 7.109-2.841c.649-.261 1.224.24.987 1.003z"/>
                            </svg>
                            </a>
                        )}
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-500 col-span-3">Aucun membre d'équipe.</p>
            )}
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/apropos/equipe/new" 
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ajouter un membre
            </Link>
          </div>
        </div>

        {/* Section Objectifs */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Objectifs</h2>
          <div className="space-y-4">
            {sections.objectifs.length > 0 ? (
                sections.objectifs.map((objectif) => (
                <div key={objectif.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg">{objectif.titre}</h3>
                    <p className="text-gray-600 mt-1">{objectif.description}</p>
                    <div className="flex justify-end mt-2">
                    <Link 
                        to={`/admin/apropos/objectifs/${objectif.id}/edit`} 
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Modifier
                    </Link>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-500">Aucun objectif défini.</p>
            )}
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/apropos/objectifs/new" 
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ajouter un objectif
            </Link>
          </div>
        </div>

        {/* Section Services */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Services</h2>
          <div className="space-y-4">
            {sections.services.length > 0 ? (
                sections.services.map((service) => (
                <div key={service.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg text-blue-700">{service.profil}</h3>
                    <p className="text-gray-800 font-medium mt-1">Service: {service.service}</p>
                    <p className="text-gray-600 text-sm mt-1">Modalité: {service.modalite}</p>
                    <div className="flex justify-end mt-2">
                    <Link 
                        to={`/admin/apropos/services/${service.id}/edit`} 
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Modifier
                    </Link>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-500">Aucun service listé.</p>
            )}
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/apropos/services/new" 
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ajouter un service
            </Link>
          </div>
        </div>

        {/* Section Histoire */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Histoire</h2>
          <div className="space-y-4">
            {sections.histoire.length > 0 ? (
                sections.histoire.map((annee) => (
                <div key={annee.annee || Math.random()} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl text-blue-800">{annee.annee}</h3>
                    <p className="text-gray-600 mt-1">{annee.description}</p>
                    <div className="flex justify-end mt-2">
                    <Link 
                        to={`/admin/apropos/histoire/${annee.annee}/edit`} 
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Modifier
                    </Link>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-500">Aucune historique.</p>
            )}
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/apropos/histoire/new" 
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ajouter une année
            </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default AProposAdmin;