import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminPageContent from '../../components/admin/AdminPageContent';
import api from '../../axios'; // Utilisez votre instance "api" ou "axios" configurée
import { useNotification } from '../../contexts/NotificationContext';
import AdminTable1 from '../../components/admin/AdminTable1';

const ProjetsAdmin = () => {
  const { addNotification } = useNotification();
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Removed '/v1' because it's already in the baseURL configuration
      const response = await api.get('api/v1/projets');
      
      setProjets(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des projets:', err);
      setError('Erreur lors du chargement des projets');
      addNotification('Erreur lors du chargement des projets', 'error');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
  { key: 'titre_projet', label: 'Titre' },
  { key: 'statut_projet', label: 'Statut' },
  { key: 'date_projet', label: 'Date' },
  { key: 'description_projet', label: 'Description' }
];
  // Options de filtre
  const filterOptions = [
    { value: 'en_cours', label: 'En cours' },
    { value: 'termine', label: 'Terminé' }
  ];

  // Gestion de la recherche
  const handleSearch = (searchTerm) => {
    console.log('Recherche:', searchTerm);
  };

  // Gestion du filtre
  const handleFilter = (filterValue) => {
    console.log('Filtre:', filterValue);
  };

  // Gestion de la pagination
  const handlePageChange = (page) => {
    console.log('Page:', page);
  };
const handleDelete = async (id) => {
  if (!window.confirm("Supprimer ce projet ?")) return;
  try {
    await api.delete(`api/v1/projets/${id}`);
    setProjets(prev => prev.filter(p => p.id !== id));
    addNotification('Projet supprimé', 'success');
  } catch (err) {
    addNotification('Erreur lors de la suppression', 'error');
  }
};

const handleEdit = (id) => {
  navigate(`/admin/projets/edit/${id}`);
};
  return (
    <AdminPageContent title="Gestion des Projets">
      <div className="flex justify-between items-center mb-4">
        <Link 
          to="/admin/projets/new" 
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nouveau Projet
        </Link>
      </div>

     <AdminTable1
  columns={columns}
  data={projets}
  loading={loading}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
    </AdminPageContent>
  );
};

export default ProjetsAdmin;