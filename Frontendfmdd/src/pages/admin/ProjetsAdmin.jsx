import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminPageContent from '../../components/admin/AdminPageContent';
import AdminTable from '../../components/admin/AdminTable';
import axios from '../../axios'; // This instance already has /api/v1 as baseURL
import { useNotification } from '../../contexts/NotificationContext';

const ProjetsAdmin = () => {
  const { addNotification } = useNotification();
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Removed '/v1' because it's already in the baseURL configuration
      const response = await axios.get('/projets');
      
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
    { key: 'titre', label: 'Titre' },
    { key: 'statut', label: 'Statut' },
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' }
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

      <AdminTable
        columns={columns}
        data={projets}
        loading={loading} // Good practice to pass loading state if AdminTable supports it
      />
    </AdminPageContent>
  );
};

export default ProjetsAdmin;