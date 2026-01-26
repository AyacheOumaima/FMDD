import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../axios';
import ProjetForm from '../../components/admin/ProjetForm';

const ProjetEdit = () => {
  const { id } = useParams();
  const [projet, setProjet] = useState(null); // Changé formation -> projet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjet = async () => {
      try {
        setLoading(true);
        const response = await api.get(`api/v1/projets/${id}`);
        setProjet(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les détails du projet");
      } finally {
        setLoading(false);
      }
    };
    fetchProjet();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Chargement...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Important: on passe 'projet' et non 'formation' */}
      <ProjetForm projet={projet} />
    </div>
  );
};

export default ProjetEdit;