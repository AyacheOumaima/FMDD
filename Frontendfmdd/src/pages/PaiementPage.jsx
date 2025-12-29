import React from 'react';
import Layout from './Layout';

const PaiementPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Paiement</h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Informations de paiement</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Montant</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Moyen de paiement</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Sélectionnez un moyen de paiement</option>
                <option value="cb">Carte bancaire</option>
                <option value="paypal">PayPal</option>
                <option value="virement">Virement bancaire</option>
              </select>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Valider le paiement
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PaiementPage;
