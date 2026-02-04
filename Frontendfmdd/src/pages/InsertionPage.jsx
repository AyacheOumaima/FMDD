
import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { ArrowRight } from 'lucide-react';
import InsertionCard from '../components/InsertionCard';
import api from '../axios'; 

const InsertionPage = () => {
  const [insertions, setInsertions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchPost, setSearchPost] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchContract, setSearchContract] = useState('');

  useEffect(() => {
     console.log('Token actuel:', localStorage.getItem('token'));
    const fetchInsertions = async () => {
      try {
        const response = await api.get('/api/v1/insertions');
        setInsertions(response.data.data); 
      } catch (error) {
        console.error('Erreur chargement insertions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsertions();
  }, []);
  const filteredInsertions = insertions.filter((item) =>
    item.poste.toLowerCase().includes(searchPost.toLowerCase()) &&
    (item.ville ?? '').toLowerCase().includes(searchCity.toLowerCase()) &&
    (searchContract === '' || item.type_contrat === searchContract)
  );
  return (
    <div className="bg-blue-light min-h-screen pb-16">

      <div className="relative w-full h-[300px] md:h-[350px] bg-cover bg-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216')] bg-cover bg-center">
          <div className="absolute inset-0 bg-blue-dark opacity-70"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center max-w-5xl mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold mb-4">Insertion Professionnelle</h1>
          <p className="max-w-3xl">
            Le FMDD facilite l’accès aux opportunités professionnelles.
          </p>
        </div>
      </div>

      <div className="container mx-auto pt-10 px-4">

        <div className="bg-white rounded-xl shadow-md p-6 mb-12 flex justify-center gap-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="text-center">
              <div className="w-14 h-14 bg-[#00A99D] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                {step}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 flex flex-col md:flex-row bg-white rounded-lg shadow-md">
          <div className="flex items-center px-4 py-2 w-full md:w-1/3 border">
            <FaSearch className="text-[#FFB347] mr-2" />
            <input
              type="text"
              placeholder="Rechercher par poste"
              value={searchPost}
              onChange={(e) => setSearchPost(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          <div className="flex items-center px-4 py-2 w-full md:w-1/3 border">
            <FaMapMarkerAlt className="text-[#FFB347] mr-2" />
            <input
              type="text"
              placeholder="Rechercher par ville"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          <div className="w-full md:w-1/3 border">
            <select
              value={searchContract}
              onChange={(e) => setSearchContract(e.target.value)}
              className="w-full px-4 py-2 outline-none"
            >
              <option value="">Tous les contrats</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : filteredInsertions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInsertions.map((item) => (
              <InsertionCard key={item.id} insertion={item} />
            ))}
          </div>
        ) : (
          <p>Aucune insertion trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default InsertionPage;
