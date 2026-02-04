import React, { useState } from 'react';
import FormationCard from '../components/commun/FormationCard';
import { Search, Filter, BookOpen, Users, Award } from 'lucide-react';

const formationsData = [
  {
    id: 1,
    title: "Gestion durable des ressources en eau",
    instructor: "Dr. Nadia Fathi",
    date: "10 Sept - 15 Oct 2025",
    cost: "750 MAD",
    image: "https://images.pexels.com/photos/1774218/pexels-photo-1774218.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
    category: "Certification",
    duration: "20h"
  },
  {
    id: 2,
    title: "Entrepreneuriat vert et économie circulaire",
    instructor: "Prof. Hassan Alaoui",
    date: "5 Oct - 20 Nov 2025",
    cost: "950 MAD",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
    category: "Diplôme",
    duration: "25h"
  },
  {
    id: 3,
    title: "Initiation au développement durable",
    instructor: "Leila Benjelloun",
    date: "1 Sept - 30 Sept 2025",
    cost: "Gratuit",
    image: "https://images.pexels.com/photos/7641829/pexels-photo-7641829.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
   category: "Cours",
    duration: "10h"
  },
  {
    id: 4,
    title: "Énergies renouvelables : technologies et applications",
    instructor: "Dr. Youssef Benkirane",
    date: "15 Oct - 30 Nov 2025",
    cost: "850 MAD",
    image: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
   category: "Certification",
    duration: "18h"
  },
  {
    id: 5,
    title: "Agriculture biologique et agroécologie",
    instructor: "Amina Mansouri",
    date: "1 Nov - 20 Dec 2025",
    cost: "Gratuit",
    image: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
   categorie: "Atelier",
    duration: "12h"
  },
  {
    id: 6,
    title: "Technologies vertes pour les petites entreprises",
    instructor: "Prof. Samir El Amrani",
    date: "1 Dec - 15 Dec 2025",
    cost: "600 MAD",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
  category: "Atelier",
    duration: "15h"
  },
  {
    id: 7,
    title: "Gestion des déchets et recyclage avancé",
    instructor: "Dr. Fatima Zahra",
    date: "5 Dec - 20 Dec 2025",
    cost: "Gratuit",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
   category: "Cours",
    duration: "14h"
  },
  {
    id: 8,
    title: "Introduction à l'urbanisme durable",
    instructor: "Dr. Omar Bensaid",
    date: "10 Jan - 25 Jan 2026",
    cost: "1000 MAD",
    image: "https://images.pexels.com/photos/3182835/pexels-photo-3182835.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
   category: "Certification",
    duration: "16h"
  },
  {
    id: 9,
    title: "Éducation environnementale pour les jeunes",
    instructor: "Prof. Sara El Amrani",
    date: "15 Jan - 30 Jan 2026",
    cost: "Gratuit",
    image: "https://images.pexels.com/photos/135019/pexels-photo-135019.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
   category: "Cours",
    duration: "8h"
  },
  {
    id: 10,
    title: "Solutions innovantes pour l'énergie éolienne",
    instructor: "Dr. Youssef Chraibi",
    date: "1 Feb - 15 Feb 2026",
    cost: "1200 MAD",
    image: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
   category: "Certification",
    duration: "22h"
  }
];


const FormationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCost, setSelectedCost] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showMore, setShowMore] = useState(false);

  const filteredFormations = formationsData.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          formation.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || formation.category === selectedType;
    
    const matchesCost = selectedCost === '' || 
                      (selectedCost === 'free' && formation.isFree) || 
                      (selectedCost === 'paid' && !formation.isFree);
    
    const matchesDate = selectedDate === '' || 
                      (selectedDate === 'sept' && formation.date.includes('Sept')) ||
                      (selectedDate === 'oct' && formation.date.includes('Oct')) ||
                      (selectedDate === 'nov' && formation.date.includes('Nov')) ||
                      (selectedDate === 'dec' && formation.date.includes('Dec'));
    
    return matchesSearch && matchesType && matchesCost && matchesDate;
  });

  const displayedFormations = showMore ? filteredFormations : filteredFormations.slice(0, 6);

  const handleShowMoreToggle = () => {
    const newShowMoreState = !showMore;
    setShowMore(newShowMoreState);
    if (!newShowMoreState) {
      // Lorsque l'utilisateur clique sur "Voir moins", on remonte en haut de la page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section intégrée */}
      <div className="bg-blue-950 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Formations FMDD
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl">
              Développez vos compétences en développement durable avec nos formations
              certifiantes et nos programmes d'excellence.
            </p>

            {/* Stats simples style Coursera */}
            <div className="flex flex-wrap gap-8 text-blue-200">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>{formationsData.length} formations</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>5,000+ apprenants</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>Certifications reconnues</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Recherche & Filtres - Style Coursera */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {/* Recherche */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Rechercher une formation..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>

            {/* Filtres */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="flex items-center text-gray-700">
                <Filter size={18} className="mr-2 text-teal-600" />
                <span className="font-medium">Filtres</span>
              </div>

              {/* Sélecteur Type */}
              <select className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Tous les types</option>
                <option value="Cours">Cours</option>
                <option value="Certification">Certification</option>
                <option value="Diplôme">Diplôme</option>
                <option value="Atelier">Atelier</option>
              </select>

              {/* Sélecteur Prix */}
              <select className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={selectedCost} onChange={(e) => setSelectedCost(e.target.value)}>
                <option value="">Tous les prix</option>
                <option value="free">Gratuit</option>
                <option value="paid">Payant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des formations */}
        {displayedFormations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedFormations.map(formation => (
              <FormationCard key={formation.id} {...formation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Aucune formation ne correspond à vos critères.</p>
            <button 
              className="mt-4 btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                setSelectedCost('');
                setSelectedDate('');
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Bouton Voir plus / Voir moins */}
        {filteredFormations.length > 6 && (
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
              onClick={handleShowMoreToggle}
            >
              {showMore ? "Voir moins" : "Voir plus de formations"}
            </button>
          </div>
        )}

        {/* Section FMDD-SCHOOL */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-950 mb-4">
            FMDD-SCHOOL
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Accédez à notre plateforme de formation en ligne pour approfondir vos connaissances
            en développement durable avec des cours interactifs et des ressources exclusives.
          </p>
          <a
            href="http://fmdd-school"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold rounded-md transition-colors"
          >
            Accéder à FMDD-SCHOOL
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormationsPage;