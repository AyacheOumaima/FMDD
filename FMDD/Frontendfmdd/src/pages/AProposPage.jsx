import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users, Compass, BookOpen, Leaf, Hammer, UserCheck, DollarSign
} from 'lucide-react';

import LoadingSpinner from '../components/commun/LoadingSpinner';
import TeamMember from '../components/commun/TeamMember';
import { API_URL } from '../config/api.config';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

const iconMap = {
  users: Users,
  compass: Compass,
  'book-open': BookOpen,
  leaf: Leaf,
  hammer: Hammer,
  'user-check': UserCheck,
  'dollar-sign': DollarSign,
};

const AProposPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [apropos, setApropos] = useState(null);
  const [equipe, setEquipe] = useState([]);
  const [objectifs, setObjectifs] = useState([]);
  const [histoire, setHistoire] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchApropos = async () => {
      try {
        const res = await api.get('/apropos');

        setApropos(res.data.apropos);
        setEquipe(res.data.equipe || []);
        setObjectifs(res.data.objectifs || []);
        setHistoire(res.data.histoire || []);
        setServices(res.data.services_profils || []);
      } catch (e) {
        console.error(e);
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchApropos();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const president = equipe.find(m => m.poste === 'Président');

  return (
    <div className="min-h-screen bg-blue-light py-12">
      <div className="container mx-auto px-4 space-y-12">

        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-950">
          {apropos?.titre || "À propos du FMDD"}
        </h1>

        {/* Mot du Président */}
        {president && (
          <section className="bg-white p-8 rounded-lg shadow flex flex-col md:flex-row items-center gap-8">
            <img
              src={president.photo || "https://via.placeholder.com/200"}
              alt="Président FMDD"
              className="w-48 h-48 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-4">Mot du Président</h2>
              <p className="text-gray-700 mb-4">
                {apropos?.description}
              </p>
              <p className="font-medium text-gray-800">
                {president.prenom} {president.nom} – Président du FMDD
              </p>
            </div>
          </section>
        )}

        {/* Mission & Vision */}
        <section className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
          <p className="text-gray-700 mb-6">
            Accompagner le développement durable au Maroc en renforçant les compétences, en soutenant l’entrepreneuriat responsable et en mobilisant les citoyens autour de projets à fort impact social, économique et environnemental.
</p>

          <h2 className="text-2xl font-semibold mb-4">Notre Vision</h2>
          <p className="text-gray-700">
            Devenir une référence nationale en matière de développement durable et d’innovation sociale, en contribuant à l’émergence d’une génération engagée, qualifiée et consciente des enjeux de demain.
          </p>
        </section>

        {/* Domaines d'action */}
      

        {/* Services par Profil */}
        <section className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">À qui s'adresse le FMDD ?</h2>
          <table className="w-full border-collapse">
            <thead className="bg-blue-950 text-white">
              <tr>
                <th className="p-3 text-left">Profil</th>
                <th className="p-3 text-left">Services</th>
                <th className="p-3 text-left">Modalités</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">{s.profil}</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside">
                      {Array.isArray(s.services_offerts)
                        ? s.services_offerts.map((x, j) => <li key={j}>{x}</li>)
                        : <li>{s.services_offerts}</li>
                      }
                    </ul>
                  </td>
                  <td className="p-3">{s.modalites_acces}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Équipe */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Notre équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipe.map((m, i) => (
              <TeamMember
                key={i}
                name={`${m.prenom} ${m.nom}`}
                role={m.poste}
                image={m.photo}
                linkedin={m.reseaux_sociaux?.linkedin}
                email={m.email}
              />
            ))}
          </div>
        </section>

        {/* Histoire */}
        <section className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">Notre histoire</h2>
          <div className="space-y-6">
Fondé en 2019, le Forum Marocain pour le Développement Durable (FMDD) œuvre pour la promotion du développement durable et l’accompagnement des jeunes au Maroc. Depuis le lancement de ses premières formations en 2020, le FMDD n’a cessé d’élargir ses actions à travers des programmes d’entrepreneuriat, des partenariats institutionnels et le renforcement de son impact à l’échelle nationale.          </div>
        </section>

      </div>
    </div>
  );
};

export default AProposPage;
