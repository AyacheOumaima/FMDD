import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import axios from 'axios';
import TemoignageCard from '../components/TestimonialCard';

axios.defaults.withCredentials = true; // Pour envoyer les cookies
axios.defaults.baseURL = 'http://localhost:8000'; // Base URL backend Laravel
// Données constantes
const grande_Description = "Découvrez les témoignages de personnes qui ont bénéficié des programmes du FMDD. Ces histoires illustrent l'impact concret de nos actions sur les individus, les organisations et les communautés à travers le Maroc.";

const testimonial =[
{
 
    id: 1,
    quote: "Les formations du FMDD m'ont aidé à développer des compétences essentielles pour l'économie verte. Aujourd'hui, je travaille dans une entreprise qui valorise le développement durable.",
    author: "Karim Benali",
    role: "Ingénieur en énergies renouvelables",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Professionnels"
  },
  {
    id: 2,
    quote: "Grâce aux ateliers du FMDD, j'ai pu lancer mon entreprise sociale qui recycle les déchets plastiques...",
    author: "Fatima Zahra",
    role: "Fondatrice de EcoPlast",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Entrepreneurs"
  },
  {
    id: 3,
    quote: "Le programme d'insertion professionnelle du FMDD a été une révélation pour moi...",
    author: "Omar Tazi",
    role: "Responsable RSE",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Professionnels"
  },
  {
    id: 4,
    quote: "En tant qu'enseignante, j'ai pu intégrer les concepts du développement durable dans mes cours...",
    author: "Amina Boudiab",
    role: "Enseignante en sciences",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Éducateurs"
  },
  {
    id: 5,
    quote: "Le soutien du FMDD a été crucial pour notre communauté...",
    author: "Hassan Oumari",
    role: "Président d'association villageoise",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Communautés"
  },
  {
    id: 6,
    quote: "Les formations en ligne du FMDD sont exceptionnelles...",
    author: "Leila Mansouri",
    role: "Étudiante en master",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    video: "https://player.vimeo.com/video/76979871?background=1",
    category: "Étudiants"
  }
];

const TemoignagesPage = () => {
  // États pour le formulaire
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [titre, setTitre] = useState('');
  const [temoignage, setTemoignage] = useState('');
  const [messageRetour, setMessageRetour] = useState(''); // <-- Pour afficher message de succès/erreur

  // États pour les témoignages
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Préparer les données à envoyer au backend
    const data = {
      Titre: titre,
      Description: temoignage,
      Image_url: '' // tu peux ajouter un champ image dans le formulaire si besoin
    };

    try {
      // Requête POST vers API Laravel
      const response = await axios.post('http://localhost:8000/api/temoignages', data);

      setMessageRetour('Témoignage envoyé avec succès !');
      setTitre('');
      setTemoignage('');
      setAfficherFormulaire(false);

      console.log('Réponse API :', response.data);

      // Tu peux ici recharger la liste ou mettre à jour localement
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setMessageRetour('Erreur lors de l\'envoi du témoignage.');
    }
  };

  // Filtrage des témoignages selon la catégorie choisie
  const filteredTestimonials = selectedCategory === "Tous"
    ? testimonial
    : testimonial.filter(t => t.category === selectedCategory);

  // Fonction pour gérer la lecture/pause de la vidéo vedette
  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-blue-light min-h-screen">
      <div className="relative">
        {/* Image de fond */}
        <img
          src="https://images.pexels.com/photos/3861467/pexels-photo-3861467.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Image professionnelle"
          className="w-full h-[400px] object-cover rounded-lg"
        />

        {/* Texte sur l'image */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center bg-black bg-opacity-50 text-white p-6">
          <h1 className="ml-[60px] mt-30 text-white text-3xl md:text-4xl font-poppins font-bold mb-6">
            Témoignages
          </h1>
          <p className="ml-[60px] mt-0 text-white text-center max-w-3xl">
            {grande_Description}
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Témoignage vedette */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-poppins font-semibold text-blue-dark mb-4">Témoignage Vedette</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-blue-dark">
                <img
                  src="https://images.pexels.com/photos/3861448/pexels-photo-3861448.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Témoignage vidéo"
                  className="w-full h-full object-cover opacity-70"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={toggleVideoPlay}
                  aria-label={isPlaying ? "Pause la vidéo" : "Jouer la vidéo"}
                >
                  <div className="bg-white bg-opacity-90 rounded-full p-4">
                    {isPlaying ? <Pause size={32} className="text-blue-dark" /> : <Play size={32} className="text-blue-dark" />}
                  </div>
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-poppins font-semibold text-lg mb-2">L'impact du FMDD sur mon parcours</h3>
              <p className="italic text-gray-700 mb-4">
                "Je suis venue au FMDD avec une idée simple pour réduire les déchets plastiques...
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fatima Zahra"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-poppins font-semibold">Fatima Zahra</h4>
                  <p className="text-sm text-gray-600">Fondatrice de EcoPlast</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de témoignages */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TemoignageCard
            quote="C'était une expérience incroyable grâce au FMDD !"
            author="Leila 🌸 Benali"
            role="Chercheuse en développement durable"
            image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
          />
          
          <TemoignageCard
            quote="j'ai beaucoup appris grace a cette formation"
            author="Luca Benali"
            role="Manager IT"
            image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
          />
        </div>

        {/* Formulaire */}
        <div className="flex flex-col items-center mt-12">
          <button
            onClick={() => setAfficherFormulaire(!afficherFormulaire)}
            className="bg-[#FFB347] text-[#13335F] py-3 px-6 rounded-lg text-lg font-poppins font-semibold shadow-lg hover:bg-[#FEC20E] transition duration-300"
          >
            Partager mon expérience
          </button>

          {afficherFormulaire && (
            <form
              onSubmit={handleSubmit}
              className="mt-8 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
            >
              <label className="block text-[#13335F] font-semibold mb-2">Titre du témoignage</label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full p-3 border border-[#00A99D] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
                placeholder="Ex. Mon expérience au forum"
                required
              />

              <label className="block text-[#13335F] font-semibold mb-2">Votre témoignage</label>
              <textarea
                value={temoignage}
                onChange={(e) => setTemoignage(e.target.value)}
                className="w-full p-3 border border-[#00A99D] rounded mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
                placeholder="Décrivez votre expérience ici..."
                required
              />

              <button
                type="submit"
                className="bg-[#00A99D] text-white py-2 px-4 rounded hover:bg-[#007C73] transition duration-300"
              >
                Envoyer le témoignage
              </button>
            </form>
          )}
        </div>

        {/* Message si aucun témoignage trouvé */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Aucun témoignage dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemoignagesPage;