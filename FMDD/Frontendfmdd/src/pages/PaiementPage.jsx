import React from 'react';
import Layout from './Layout';
import { useLanguage } from '../contexts/LanguageContext';

const PaiementPage = () => {
  const { language } = useLanguage();
  const t = translateData[language] || translateData.fr;

  const translateData = {
    fr : {
      title : "Paiement",
      subtitle : "Informations de paiement",
      amount : "Montant",
      paymentMethod : "Moyen de paiement",
      option0:"Sélectionnez un moyen de paiement",
      option1:"Carte bancaire",
      option2:"PayPal",
      option3:"Virement bancaire",
      submit : "Valider le paiement"
    },
    en : {
      title : "Payment",
      subtitle : "Payment information",
      amount : "Amount",
      paymentMethod : "Payment method",
      option0:"Select a payment method",
      option1:"Credit card",
      option2:"PayPal",
      option3:"Bank transfer",
      submit : "Validate payment"
    },
    ar : {
      title : "الدفع",
      subtitle : "معلومات الدفع",
      amount : "المبلغ",
      paymentMethod : "طريقة الدفع",
      option0:"اختر طريقة الدفع",
      option1:"الائتمان",
      option2:"PayPal",
      option3:"تحويل بنكي",
      submit : "تأكيد الدفع"
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t.subtitle}</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.amount}</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.paymentMethod}</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">{t.option0}</option>
                <option value="cb">{t.option1}</option>
                <option value="paypal">{t.option2}</option>
                <option value="virement">{t.option3}</option>
              </select>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PaiementPage;
