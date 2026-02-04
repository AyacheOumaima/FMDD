import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../../components/global/NavBar';

const AdherentDashboard = () => {
  const [adherentData, setAdherentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdherentData();
  }, []);

  const fetchAdherentData = async () => {
    try {
      setLoading(true);
      // axios.js a déjà le préfixe /api/v1
      const response = await axios.get('/adherent/profile');
      setAdherentData(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      
      if (err.response?.data?.needs_setup) {
        toast.info('Veuillez compléter votre profil adhérent');
        navigate('/adherent/setup');
      } else if (err.response?.status === 401) {
        toast.error('Session expirée, veuillez vous reconnecter');
        navigate('/login');
      } else if (err.response?.status === 404) {
        toast.warning('Profil adhérent non trouvé');
        setError('Aucun profil adhérent trouvé. Contactez l\'administrateur.');
      } else {
        setError('Erreur lors du chargement des données');
        toast.error('Erreur lors du chargement des données');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'payée':
        return 'bg-green-100 text-green-800';
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'expirée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Erreur!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre de navigation */}
      <Navbar />
      
      {/* Contenu du tableau de bord avec marge pour la navbar fixe */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête du dashboard */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Bienvenue, {adherentData?.adherent?.user?.first_name || 'Adhérent'}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Dashboard Adhérent
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full ${getStatusColor(adherentData?.adherent?.statut_cotisation)}`}>
                  {adherentData?.adherent?.statut_cotisation || 'Non défini'}
                </div>
              </div>
            </div>

            {/* Informations d'adhésion */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Statut de l'adhésion
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date de début</p>
                  <p className="mt-1">
                    {adherentData?.adherent?.date_debut_adhesion
                      ? new Date(adherentData.adherent.date_debut_adhesion).toLocaleDateString()
                      : 'Non définie'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date de fin</p>
                  <p className="mt-1">
                    {adherentData?.adherent?.date_fin_adhesion
                      ? new Date(adherentData.adherent.date_fin_adhesion).toLocaleDateString()
                      : 'Non définie'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Statut</p>
                  <p className={`mt-1 inline-flex px-2 py-1 rounded-full text-sm ${getStatusColor(adherentData?.adherent?.statut_cotisation)}`}>
                    {adherentData?.adherent?.statut_cotisation || 'Non défini'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {adherentData?.adherent?.statut_cotisation === 'en attente' && (
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/payment')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Payer ma cotisation
                  </button>
                </div>
              )}

              {adherentData?.adherent?.statut_cotisation === 'expirée' && (
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/renew')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Renouveler mon adhésion
                  </button>
                </div>
              )}
            </div>

            {/* Informations personnelles */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Informations personnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nom complet</p>
                  <p className="mt-1">
                    {adherentData?.adherent?.user?.first_name} {adherentData?.adherent?.user?.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1">{adherentData?.adherent?.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Téléphone</p>
                  <p className="mt-1">{adherentData?.adherent?.user?.phone || 'Non renseigné'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Profession</p>
                  <p className="mt-1">{adherentData?.adherent?.profession || 'Non renseignée'}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Modifier mes informations
                </button>
              </div>
            </div>

            {/* Historique des paiements */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Historique des paiements
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Période
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adherentData?.payments?.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.amount} €
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.period}
                        </td>
                      </tr>
                    ))}
                    {(!adherentData?.payments || adherentData.payments.length === 0) && (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          Aucun paiement enregistré
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdherentDashboard;