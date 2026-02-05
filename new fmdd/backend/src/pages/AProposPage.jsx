import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Compass, BookOpen, Leaf, Hammer, UserCheck, DollarSign } from 'lucide-react';
import TeamMember from '../components/commun/TeamMember';

const AProposPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/apropos');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) {
    return <div>Chargement...</div>;
  }

  // Mapping des icônes pour les objectifs
  const iconMapping = {
    'Accompagnement': <Users className="mx-auto text-orange-400 mb-4" size={40} />,
    'Orientation': <Compass className="mx-auto text-blue-400 mb-4" size={40} />,
    'Formation': <BookOpen className="mx-auto text-green-400 mb-4" size={40} />,
    'Durabilité': <Leaf className="mx-auto text-teal-400 mb-4" size={40} />,
    'Workshop': <Hammer className="mx-auto text-yellow-400 mb-4" size={40} />,
    'Coaching': <UserCheck className="mx-auto text-purple-400 mb-4" size={40} />,
    'Financement': <DollarSign className="mx-auto text-red-400 mb-4" size={40} />
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-semibold font-poppins text-blue-950 mb-8">À Propos du FMDD</h1>

        {/* Mot du Président */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-12 flex items-center">
          <div className="w-1/3">
            <img
              src={data.equipe.find(m => m.poste === "Président")?.photo || ""}
              alt={data.equipe.find(m => m.poste === "Président")?.prenom || "Président"}
              className="rounded-full w-48 h-48 object-cover"
            />
          </div>
          <div className="w-2/3 pl-6">
            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Mot du Président</h2>
            <p className="text-gray-700 mb-6">
              {data.apropos.description}
            </p>
            <p className="text-gray-700">
              -{data.equipe.find(m => m.poste === "Président")?.prenom} {data.equipe.find(m => m.poste === "Président")?.nom}, Président du FMDD
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-blue-950 mb-4">Notre Mission</h2>
          <p className="text-gray-700 mb-6">{data.apropos.mission}</p>
          <h2 className="text-2xl font-semibold text-blue-950 mb-4">Notre Vision</h2>
          <p className="text-gray-700">{data.apropos.vision}</p>
        </section>

        {/* Objectifs */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-950 mb-6">Nos Objectifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.objectifs.map((objectif) => (
              <div key={objectif.id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center">
                {iconMapping[objectif.titre]}
                <h3 className="text-lg font-medium mb-2">{objectif.titre}</h3>
                <p className="text-gray-600">{objectif.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services par Profil */}
        <section className="bg-white border border-gray-200 p-6 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-semibold text-blue-950 mb-6">Nos Services par Profil</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-blue-950 text-white">
                <tr>
                  <th className="p-4">Profil</th>
                  <th className="p-4">Services offerts</th>
                  <th className="p-4">Modalités d'accès</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.services_profils?.map((profil) => (
                  <tr key={profil.id}>
                    <td className="p-4 font-medium">{profil.profil}</td>
                    <td className="p-4">
                      <ul className="list-disc list-inside text-gray-700">
                        {profil.services_offerts.map((service, idx) => (
                          <li key={idx}>{service}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 text-gray-700">{profil.modalites_acces}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Équipe */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-950 mb-6">Notre Équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.equipe.map((member) => (
              <TeamMember
                key={member.id}
                name={`${member.prenom} ${member.nom}`}
                role={member.poste}
                image={member.photo}
                linkedin={JSON.parse(member.reseaux_sociaux).linkedin}
                email={member.email}
              />
            ))}
          </div>
        </section>

        {/* Histoire */}
        <section className="bg-white border border-gray-200 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-950 mb-6">Notre Histoire</h2>
          <div className="relative">
            <div className="absolute h-full w-0.5 bg-blue-950 left-4"></div>
            <div className="space-y-8">
              {data.histoire.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 border-4 border-blue-950 mt-1 mr-4"></div>
                  <div>
                    <h3 className="text-xl font-medium text-blue-950">
                      {new Date(item.date_evenement).getFullYear()}
                    </h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AProposPage; 