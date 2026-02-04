
import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import api from '../axios';
import TemoignageCard from '../components/TestimonialCard';
import { API_ROUTES, SANCTUM_COOKIE_URL } from '../config/api.config';

const grande_Description =
  "Découvrez les témoignages de personnes qui ont bénéficié des programmes du FMDD. Ces histoires illustrent l'impact concret de nos actions sur les individus, les organisations et les communautés à travers le Maroc.";

const TemoignagesPage = () => {
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [nom, setNom] = useState('');
  const [poste, setPoste] = useState('');
  const [titre, setTitre] = useState('');
  const [temoignage, setTemoignage] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); 

  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
useEffect(() => {
  const fetchTemoignages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/temoignages');
      
      const acceptedTestimonials = response.data.data.filter(t => 
        t.statut === 'accepter' || t.statut === 'accepte' 
      );
      
      setTemoignages(acceptedTestimonials);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des témoignages');
    } finally {
      setLoading(false);
    }
  };

  fetchTemoignages();
}, []);
  const showToast = (message, type = 'success', duration = 3000) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(''), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await api.get(SANCTUM_COOKIE_URL);

      const data = {
        nom,
        poste,
        titre,
        message: temoignage,
        rating: 5,
        is_visible: false,
        statut: 'en_attente',
      };

      await api.post(API_ROUTES.temoignages.store, data);

      showToast('Témoignage envoyé avec succès (en attente de validation)', 'success');
      setNom('');
      setPoste('');
      setTitre('');
      setTemoignage('');
      setAfficherFormulaire(false);

    } catch (error) {
      console.error(error);
      showToast("Erreur lors de l'envoi du témoignage ", 'error');
    }
  };

  const toggleVideoPlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="bg-blue-light min-h-screen">
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white z-50 transition-all duration-300 ${
            toastType === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toastMessage}
        </div>
      )}

      <div className="relative">
        <img
          src="https://images.pexels.com/photos/3861467/pexels-photo-3861467.jpeg"
          alt="Image professionnelle"
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50 text-white p-6">
          <h1 className="ml-[60px] text-4xl font-bold mb-6">Témoignages</h1>
          <p className="ml-[60px] max-w-3xl">{grande_Description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-4">Témoignage Vedette</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3861448/pexels-photo-3861448.jpeg"
                className="w-full h-full object-cover opacity-70"
              />
              <button
                className="absolute inset-0 flex items-center justify-center"
                onClick={toggleVideoPlay}
              >
                <div className="bg-white rounded-full p-4">
                  {isPlaying ? <Pause /> : <Play />}
                </div>
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">L'impact du FMDD sur mon parcours</h3>
              <p className="italic mb-4">"Je suis venue au FMDD avec une idée simple..."</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : temoignages.length === 0 ? (
            <p className="text-center text-gray-600 col-span-3">Aucun témoignage disponible.</p>
          ) : (
            temoignages.map(t => (
              <TemoignageCard
                key={t.id}
                quote={t.message}
                author={t.nom}
                role={t.poste || 'N/A'}
              />
            ))
          )}
        </div>

        <div className="flex flex-col items-center mt-12">
          <button
            onClick={() => setAfficherFormulaire(!afficherFormulaire)}
            className="bg-[#FFB347] px-6 py-3 rounded-lg font-semibold"
          >
            Partager mon expérience
          </button>

          {afficherFormulaire && (
            <form
              onSubmit={handleSubmit}
              className="mt-8 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
            >
              <label className="block text-[#13335F] font-semibold mb-2">Votre nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full p-3 border border-[#00A99D] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
                placeholder="Ex. Karim Benali"
                required
              />

              <label className="block text-[#13335F] font-semibold mb-2">Votre poste</label>
              <input
                type="text"
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
                className="w-full p-3 border border-[#00A99D] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
                placeholder="Ex. Ingénieur en énergie renouvelable"
                required
              />

              <label className="font-semibold">Titre du témoignage</label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full p-3 border rounded mb-4"
                required
              />

              <label className="font-semibold">Votre témoignage</label>
              <textarea
                value={temoignage}
                onChange={(e) => setTemoignage(e.target.value)}
                className="w-full p-3 border rounded mb-4 h-32"
                required
              />

              <button
                type="submit"
                className="bg-[#00A99D] text-white px-4 py-2 rounded"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemoignagesPage;
