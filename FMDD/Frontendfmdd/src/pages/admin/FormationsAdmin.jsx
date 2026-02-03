import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminPageContent from '../../components/admin/AdminPageContent';
import AdminTable from '../../components/admin/AdminTable';
import api from '../../axios'; // Utilisez votre instance "api" ou "axios" configurée
import { useNotification } from '../../contexts/NotificationContext';

const FormationsAdmin = () => {
  const { addNotification } = useNotification();
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
 const fetchFormations = async () => {
    try {
      setLoading(true);
      // ✅ FIX 1 : L'URL doit inclure le préfixe v1
      const response = await api.get('api/v1/formations');
      
      // ✅ FIX 2 : Votre contrôleur renvoie { data: [...] }
      // On s'assure de récupérer le tableau
      setFormations(response.data.data || []);
    } catch (err) {
      console.error('Erreur:', err);
      addNotification('Erreur lors du chargement des formations', 'error');
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    fetchFormations();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      return;
    }

    try {
      await api.delete(`api/v1/formations/${id}`);
      // Mise à jour locale de la liste après suppression réussie
      setFormations(prev => prev.filter(f => f.id !== id));
      addNotification('Formation supprimée avec succès', 'success');
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      addNotification('Erreur lors de la suppression', 'error');
    }
  };

  // ✅ LOGIQUE DE MODIFICATION (Redirection)
  // Dans FormationsAdmin.jsx
const handleEdit = (id) => {
  navigate(`/admin/formations/edit/${id}`);
};

  // ✅ FIX 3 : Les clés doivent correspondre EXACTEMENT à la migration PHP
  // Migration : titre, description, date_debut, prix, lieu

  const columns = [
    { key: 'titre', label: 'Titre' },
    { key: 'date_debut', label: 'Date Début' },
    { key: 'prix', label: 'Prix (MAD)' },
    { key: 'lieu', label: 'Lieu' },
    { key: 'description', label: 'Description' }
  ];

  return (
    <AdminPageContent title="Gestion des Formations">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Liste des formations</h2>
        <Link 
to="/admin/formations/new" 
className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
          + Nouvelle Formation
        </Link>
      </div>

      <AdminTable
        columns={columns}
        data={formations}
        loading={loading}
         onDelete={handleDelete} // On passe la fonction en prop
        onEdit={handleEdit}   
      />
    </AdminPageContent>
  );
};

export default FormationsAdmin;