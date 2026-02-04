import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Ajout de useNavigate
import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';

const formationsData = [
  { id: 1, title: "Gestion durable des ressources en eau", instructor: "Dr. Nadia Fathi", date: "10 Sept - 15 Oct 2025", cost: "750 MAD", image: "https://images.pexels.com/photos/1774218/pexels-photo-1774218.jpeg?auto=compress&cs=tinysrgb&w=600", isFree: false, type: "Certification", description: "Cette formation offre une introduction complète aux pratiques durables en gestion des ressources en eau.", content: "Programme :\n- Introduction aux enjeux\n- Gestion et optimisation des ressources\n- Études de cas pratiques\n\nAvantages :\n- Certification reconnue\n- Encadrement par des experts du secteur" },
  { id: 2, title: "Entrepreneuriat vert et économie circulaire", instructor: "Prof. Hassan Alaoui", date: "5 Oct - 20 Nov 2025", cost: "950 MAD", image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600", isFree: false, type: "Diplôme", description: "Développez vos compétences en entrepreneuriat vert afin de promouvoir des modèles économiques circulaires.", content: "Programme :\n- Concepts clés de l'économie circulaire\n- Stratégies entrepreneuriales\n- Ateliers pratiques et mentoring\n\nAvantages :\n- Networking\n- Projets collaboratifs" },
  { id: 3, title: "Initiation au développement durable", instructor: "Leila Benjelloun", date: "1 Sept - 30 Sept 2025", cost: "Gratuit", image: "https://images.pexels.com/photos/7641829/pexels-photo-7641829.jpeg?auto=compress&cs=tinysrgb&w=600", isFree: true, type: "Cours", description: "Un parcours d'introduction idéal pour découvrir les fondamentaux du développement durable.", content: "Programme :\n- Bases du développement durable\n- Exemples et bonnes pratiques\n- Travaux interactifs\n\nAvantages :\n- Formateur expérimenté\n- Approche pédagogique adaptée aux débutants" },
  { id: 4, title: "Énergies renouvelables : technologies et applications", instructor: "Dr. Youssef Benkirane", date: "15 Oct - 30 Nov 2025", cost: "850 MAD", image: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=600", isFree: false, type: "Certification", description: "Plongez dans les technologies des énergies renouvelables et leurs multiples applications pratiques.", content: "Programme :\n- Introduction aux énergies renouvelables\n- Technologies solaires, éoliennes et autres\n- Ateliers pratiques et simulations\n\nAvantages :\n- Accompagnement personnalisé\n- Accès à des ressources exclusives" },
  { id: 5, title: "Agriculture biologique et agroécologie", instructor: "Amina Mansouri", date: "1 Nov - 20 Dec 2025", cost: "Gratuit", image: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=600", isFree: true, type: "Atelier", description: "Formation pratique dédiée à l'agriculture biologique et aux principes de l'agroécologie pour une production durable.", content: "Programme :\n- Introduction à l'agroécologie\n- Méthodes de production biologique\n- Visites de fermes et ateliers techniques\n\nAvantages :\n- Formation pratique sur le terrain\n- Certification de participation" }
];

const FormationDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate(); // Ajout de useNavigate pour définir navigate
  const [formation, setFormation] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const foundFormation = formationsData.find(f => f.id === parseInt(id));
    setFormation(foundFormation || null);
  }, [id]);

  const toggleForm = () => setShowForm(prev => !prev);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Formulaire soumis avec succès !", data);
    // Ajoutez ici la logique pour envoyer les données au serveur si nécessaire
  };

  const handleBack = () => {
    navigate("/formations"); // Utilisation de navigate pour rediriger
  };

  if (!formation) {
    return (
      <div className="py-12 bg-blue-light min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Formation non trouvée.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-blue-light min-h-screen">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-blue-dark hover:text-turquoise transition-colors"
        >
          <ChevronLeft size={20} className="mr-2" />
          Retour aux formations {/* Correction du texte */}
        </button>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Image principale */}
          <img
            src={formation.image}
            alt={formation.title}
            className="w-full h-72 object-cover rounded-md mb-6"
          />
          {/* Informations essentielles */}
          <h1 className="text-4xl font-bold text-blue-dark mb-6 font-poppins border-b-2 border-blue-300 pb-2">
            {formation.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-100 rounded-lg shadow-md p-4 flex items-center">
              <span className="text-xl font-semibold text-blue-800 mr-2">🎓 Instructeur :</span>
              <span className="text-gray-700">{formation.instructor}</span>
            </div>
            <div className="bg-yellow-100 rounded-lg shadow-md p-4 flex items-center">
              <span className="text-xl font-semibold text-yellow-800 mr-2">📅 Dates :</span>
              <span className="text-gray-700">{formation.date}</span>
            </div>
            <div className="bg-green-100 rounded-lg shadow-md p-4 flex items-center">
              <span className="text-xl font-semibold text-green-800 mr-2">💰 Coût :</span>
              <span className={`text-gray-700 ${formation.isFree ? "text-green-600 font-bold" : ""}`}>
                {formation.isFree ? "Gratuit" : formation.cost}
              </span>
            </div>
          </div>

          <p className="text-gray-800 mb-6 text-lg leading-relaxed">{formation.description}</p>

          {/* Section Programme */}
          <div className="mb-6 p-6 bg-blue-50 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-blue-dark mb-3">📌 Programme</h2>
            <ul className="list-disc list-inside text-gray-700">
              {formation.content.split("\n").map((item, index) =>
                item.startsWith("-") ? <li key={index}>{item.replace("- ", "").trim()}</li> : null
              )}
            </ul>
          </div>

          {/* Section Avantages */}
          <div className="mb-6 p-6 bg-green-50 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-blue-dark mb-3">🌟 Avantages</h2>
            <ul className="list-disc list-inside text-gray-700">
              {formation.content.split("\n").map((item, index) =>
                item.startsWith("-") && formation.content.includes("Avantages") ? <li key={index}>{item.replace("- ", "").trim()}</li> : null
              )}
            </ul>
          </div>

          {/* Bouton d'inscription */}
          <div className="text-center">
            <p className="text-xl font-semibold text-blue-dark mb-4">
              Prêt à vous inscrire ?
            </p>
            <button
              onClick={toggleForm}
              className="inline-block bg-yellow-400 text-blue-950 px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors"
            >
              {showForm ? "Fermer le formulaire" : "S'inscrire"}
            </button>
          </div>

          {/* Formulaire d'inscription avec validations */}
          {showForm && (
            <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md transition-all duration-500">
              <h2 className="text-2xl font-bold text-blue-dark mb-4">📝 Formulaire d'inscription</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Votre nom complet"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    {...register('fullName', {
                      required: 'Ce champ est requis',
                      minLength: { value: 2, message: 'Au moins 2 caractères' }
                    })}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Votre email"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    {...register('email', {
                      required: 'Ce champ est requis',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Format d\'email invalide'
                      }
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Votre numéro de téléphone (ex: +212612345678)"
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
                    }`}
                    {...register('phone', {
                      required: 'Ce champ est requis',
                      pattern: {
                        value: /^\+212[0-9]{9}$/,
                        message: 'Format invalide (ex: +212612345678)'
                      }
                    })}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
                >
                  S'inscrire
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormationDetail;