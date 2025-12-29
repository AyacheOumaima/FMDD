import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminPageContent from '../../components/admin/AdminPageContent';
import AdminTable from '../../components/admin/AdminTable';
import axios from '../../axios';
import { useNotification } from '../../contexts/NotificationContext';

const FormationsAdmin = () => {
  const { addNotification } = useNotification();
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/formations');
      setFormations(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des formations:', err);
      setError('Erreur lors du chargement des formations');
      addNotification('Erreur lors du chargement des formations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'titre', label: 'Titre' },
    { key: 'type', label: 'Type' },
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' }
  ];

  return (
    <AdminPageContent title="Gestion des Formations">
      <div className="flex justify-between items-center mb-4">
        <Link 
          to="/admin/formations/new" 
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nouvelle Formation
        </Link>
      </div>

      <AdminTable
        columns={columns}
        data={formations}
      />
    </AdminPageContent>
  );
};

export default FormationsAdmin;
