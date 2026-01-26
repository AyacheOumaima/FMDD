import React from 'react';
import Layout from './Layout';

const SoutienPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Soutien</h1>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Comment nous soutenir ?</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Soutien financier</h3>
                <p className="text-gray-600">
                  Vous pouvez nous soutenir financièrement en faisant un don ou en devenant mécène.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Soutien en compétences</h3>
                <p className="text-gray-600">
                  Partagez vos compétences en nous aidant dans nos projets ou en formant nos bénéficiaires.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Soutien matériel</h3>
                <p className="text-gray-600">
                  Vous pouvez nous aider en nous fournissant du matériel ou des ressources pour nos formations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">4. Partenariat</h3>
                <p className="text-gray-600">
                  Devenez partenaire de FMDD et participez à notre mission d'insertion professionnelle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SoutienPage;
