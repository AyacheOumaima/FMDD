import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axios';
import FormationForm from '../../components/admin/FormationForm';

const FormationEdit = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        setLoading(true);
        // Appel GET /api/v1/formations/{id}
        const response = await api.get(`/api/v1/formations/${id}`);
        setFormation(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les détails de la formation");
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Chargement...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  // On passe la formation récupérée au formulaire
  return (
    <div className="max-w-4xl mx-auto p-4">
      <FormationForm formation={formation} />
    </div>
  );
};

export default FormationEdit;