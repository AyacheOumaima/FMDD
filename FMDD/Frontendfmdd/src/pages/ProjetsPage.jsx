import React, { useEffect, useMemo, useState } from 'react';
import ProjetCard from '../components/ProjetCard';
import api from '../axios'; // IMPORTZ VOTRE INSTANCE CONFIGURÉE (comme dans Admin)

const normalize = (str) =>
  str
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
const fetchProjets = async () => {
  const response = await api.get('api/v1/projets');
  return response.data.data; // 👈 TRÈS IMPORTANT
};
const ProjetsPage = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Load projects from backend
  useEffect(() => {
    const loadProjets = async () => {
      try {
        const data = await fetchProjets();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les projets");
      } finally {
        setLoading(false);
      }
    };

    loadProjets();
  }, []);

  const displayedProjects = useMemo(() => {
    if (!search) return projects;
    const term = normalize(search);

    return projects.filter((project) => {
      const title = normalize(project.titre_projet || '');
      const desc = normalize(project.description_projet || '');
      const theme = normalize(project.theme || '');
      const status = normalize(project.statut_projet || '');

      return (
        title.includes(term) ||
        desc.includes(term) ||
        theme.includes(term) ||
        status.includes(term)
      );
    });
  }, [projects, search]);

  if (loading) {
    return <p className="text-center mt-20">Chargement des projets...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-600">{error}</p>;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Search */}
      <input
        type="text"
        placeholder="Rechercher un projet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project) => (
          <ProjetCard key={project.id} {...project} />
        ))}
      </div>

      {displayedProjects.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Aucun projet trouvé.
        </p>
      )}
    </section>
  );
};

export default ProjetsPage;
