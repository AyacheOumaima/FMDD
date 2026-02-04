import React from 'react';
import Layout from './Layout';

const UnauthorizedPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-red-600 mb-4">403</h1>
            <h2 className="text-xl font-semibold mb-4">Accès non autorisé</h2>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas les droits nécessaires pour accéder à cette page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Retour en arrière
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;
