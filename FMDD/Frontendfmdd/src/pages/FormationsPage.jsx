import React, { useEffect, useState } from 'react';
import FormationCard from '../components/commun/FormationCard';
import api from '../axios'; // IMPORTZ VOTRE INSTANCE CONFIGURÉE (comme dans Admin)

const FormationsPage = () => {
  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true);
        // Utilisez l'instance "api" qui a déjà le baseURL
        const res = await api.get('api/v1/formations');
        console.log("Données reçues:", res.data); // Pour débugger
        setFormations(res.data.data || []);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError("Impossible de charger les formations.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  const filteredFormations = formations.filter(f =>
    f.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <input
        type="text"
        placeholder="Rechercher une formation..."
        className="w-full mb-8 px-4 py-3 border rounded shadow-sm focus:ring-2 focus:ring-teal-500 outline-none"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {filteredFormations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map(f => (
            <FormationCard
              key={f.id}
              id={f.id}
              title={f.titre}
              instructor={f.lieu ?? 'Lieu non défini'}
              date={f.date_debut ? `Début le : ${f.date_debut}` : 'Date à venir'}
              duration="Formation"
              cost={f.prix ? `${f.prix} MAD` : 'Gratuit'}
              image={
  f.image
    ? f.image.startsWith('http')
      ? f.image
      : `${api.defaults.baseURL}/storage/${f.image}`
    : '/default-formation.jpg'
}
              category="Formation"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Aucune formation trouvée.
        </div>
      )}
    </div>
  );
};

export default FormationsPage;