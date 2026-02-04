import React from 'react';
import Layout from './Layout';
import { useLanguage } from '../contexts/LanguageContext';


export default function UnauthorizedPage () {
  
    const { language } = useLanguage();
    const lang = ["FR","EN","AR"].includes(language) ? language : "FR";
    const texts = {
      FR:{
        h2:"Accès non autorisé",
        p:"Vous n'avez pas les droits nécessaires pour accéder à cette page.",
        button:"Retour en arrière"
      },
      AN:{
        h2:"Unauthorized access",
        p:"You do not have the necessary rights to access this page.",
        button:"Backtracking"
      },
      AR:{
        h2:"الوصول غير المصرح به",
        p:"ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة.",
        button:"التراجع"
      }
    }
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-red-600 mb-4">403</h1>
            <h2 className="text-xl font-semibold mb-4">{texts[lang].h2}</h2>
            <p className="text-gray-600 mb-6">
              {texts[lang].p}
            </p>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {texts[lang].button}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}