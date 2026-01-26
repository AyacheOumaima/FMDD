import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { CheckCircle, Upload, ArrowRight } from 'lucide-react';
import InsertionCard from '../components/InsertionCard';

const InsertionPage = () => {
  const [file, setFile] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [searchPost, setSearchPost] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchContract, setSearchContract] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted(true);
    }, 1000);
  };

  const offres = [
    {
      id: 1,
      image: '/images/offre1.jpg',
      title: 'Développeur Web',
      company: 'TechCorp',
      city: 'Casablanca',
      startDate: '01 Juin 2025',
      contractType: 'CDI'
    },
    {
      id: 2,
      image: '/images/offre2.jpg',
      title: 'Chargé de communication',
      company: 'ComMedia',
      city: 'Rabat',
      startDate: '15 Mai 2025',
      contractType: 'Stage'
    },
    {
      id: 3,
      image: '/images/offre3.jpg',
      title: 'Designer UX/UI',
      company: 'DesignPro',
      city: 'Marrakech',
      startDate: '10 Juil. 2025',
      contractType: 'CDD'
    },
    {
      id: 4,
      image: '/images/offre4.jpg',
      title: 'Chef de projet digital',
      company: 'InnovaTech',
      city: 'Fès',
      startDate: '20 Août 2025',
      contractType: 'CDI'
    },
    {
      id: 5,
      image: '/images/offre5.jpg',
      title: 'Spécialiste SEO',
      company: 'RankBoost',
      city: 'Tanger',
      startDate: '05 Sept. 2025',
      contractType: 'Stage'
    },
    {
      id: 6,
      image: '/images/offre6.jpg',
      title: 'Analyste de données',
      company: 'DataCorp',
      city: 'Casablanca',
      startDate: '15 Sept. 2025',
      contractType: 'CDD'
    },
    {
      id: 7,
      image: '/images/offre7.jpg',
      title: 'Responsable Marketing',
      company: 'MarketMasters',
      city: 'Rabat',
      startDate: '30 Sept. 2025',
      contractType: 'CDI'
    },
    {
      id: 8,
      image: '/images/offre8.jpg',
      title: 'Ingénieur Logiciel',
      company: 'SoftSolutions',
      city: 'Marrakech',
      startDate: '12 Oct. 2025',
      contractType: 'CDI'
    },
    {
      id: 9,
      image: '/images/offre9.jpg',
      title: 'Social Media Manager',
      company: 'ConnectHub',
      city: 'Fès',
      startDate: '01 Nov. 2025',
      contractType: 'Freelance'
    },
    {
      id: 10,
      image: '/images/offre10.jpg',
      title: 'Consultant en stratégie',
      company: 'StratView',
      city: 'Tanger',
      startDate: '25 Nov. 2025',
      contractType: 'CDI'
    }
  ];

  const filteredOffres = offres.filter((job) =>
    job.title.toLowerCase().includes(searchPost.toLowerCase()) &&
    job.city.toLowerCase().includes(searchCity.toLowerCase()) &&
    (searchContract === '' || job.contractType === searchContract)
  );

  return (
    <div className="bg-blue-light min-h-screen pb-16">
      {/* Image de fond en pleine largeur */}
      <div className="relative w-full bg-cover bg-center overflow-hidden h-[300px] md:h-[350px]">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-blue-dark opacity-70"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center max-w-5xl mx-auto px-4 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-4 md:mb-6">
            Insertion Professionnelle
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mb-6">
            Le FMDD s'engage à faciliter l'insertion professionnelle des jeunes dans les secteurs liés 
            au développement durable.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto pt-10 px-4">
        {/* Processus */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* Étape 1 - Formation */}
            <div className="text-center  p-3">
              <div className="w-14 h-14 bg-[#00A99D] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">1</div>
              <h3 className="font-poppins font-semibold mb-1 text-sm md:text-base">Formation</h3>
              <p className="text-gray-600 text-xs md:text-sm">Acquisition de compétences techniques</p>
            </div>

            <ArrowRight size={24} className="text-[#00A99D] hidden md:block" />

            {/* Étape 2 - Accompagnement */}
            <div className="text-center p-3">
              <div className="w-14 h-14 bg-[#00A99D] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">2</div>
              <h3 className="font-poppins font-semibold mb-1 text-sm md:text-base">Accompagnement</h3>
              <p className="text-gray-600 text-xs md:text-sm">Coaching individuel et réseau</p>
            </div>

            <ArrowRight size={24} className="text-[#00A99D] hidden md:block" />

            {/* Étape 3 - Insertion */}
            <div className="text-center p-3">
              <div className="w-14 h-14 bg-[#00A99D] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">3</div>
              <h3 className="font-poppins font-semibold mb-1 text-sm md:text-base">Insertion</h3>
              <p className="text-gray-600 text-xs md:text-sm">Stages et emplois verts</p>
            </div>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8 flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md">
          {/* Recherche par poste */}
          <div className="flex items-center border border-gray-300 px-4 py-2 w-full md:w-1/3">
            <FaSearch className="text-[#FFB347] mr-2" />
            <input
              type="text"
              placeholder="Rechercher par poste"
              value={searchPost}
              onChange={(e) => setSearchPost(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          {/* Recherche par ville */}
          <div className="flex items-center border-t md:border-t-0 border-l md:border-l-0 border border-gray-300 px-4 py-2 w-full md:w-1/3">
            <FaMapMarkerAlt className="text-[#FFB347] mr-2" />
            <input
              type="text"
              placeholder="Rechercher par ville"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          {/* Filtre par type de contrat */}
          <div className="border-t md:border-t-0 border-l md:border-l-0 border border-gray-300 w-full md:w-1/3">
            <select
              value={searchContract}
              onChange={(e) => setSearchContract(e.target.value)}
              className="w-full px-4 py-2 outline-none"
            >
              <option value="">Tous les contrats</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Freelance">Alternance</option>
            </select>
          </div>
        </div>

        {/* Liste des offres filtrées */}
        {filteredOffres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffres.map((job) => (
              <InsertionCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Aucune offre ne correspond à vos critères.</p>
        )}
      </div>

    
    </div>
  );
};

export default InsertionPage;