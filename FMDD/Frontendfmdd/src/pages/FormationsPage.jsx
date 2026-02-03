import React, { useEffect, useState } from 'react';
import FormationCard from '../components/commun/FormationCard';
import api from '../axios';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  FR: {
    placeholder: "Rechercher une formation...",
    loading: "Chargement...",
    error: "Impossible de charger les formations.",
    noResults: "Aucune formation trouvée.",
    locationDefault: "Lieu non défini",
    startDate: "Début le : ",
    dateToDefine: "Date à venir",
    costFree: "Gratuit",
    category: "Formation"
  },
  EN: {
    placeholder: "Search for a course...",
    loading: "Loading...",
    error: "Unable to load courses.",
    noResults: "No courses found.",
    locationDefault: "Location not defined",
    startDate: "Starts on: ",
    dateToDefine: "To be defined",
    costFree: "Free",
    category: "Training"
  },
  AR: {
    placeholder: "ابحث عن دورة تدريبية...",
    loading: "جارٍ التحميل...",
    error: "تعذر تحميل الدورات التدريبية.",
    noResults: "لم يتم العثور على دورات تدريبية.",
    locationDefault: "المكان غير محدد",
    startDate: "يبدأ في: ",
    dateToDefine: "سيتم تحديده لاحقاً",
    costFree: "مجاني",
    category: "تكوين"
  }
};

const FormationsPage = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.FR;

  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true);
        const res = await api.get('api/v1/formations');
        console.log("Données reçues:", res.data);
        setFormations(res.data.data || []);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, [t.error]);

  const filteredFormations = formations.filter(f =>
    f.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-20">{t.loading}</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12" dir={language === 'AR' ? 'rtl' : 'ltr'}>
      <input
        type="text"
        placeholder={t.placeholder}
        className="w-full mb-8 px-4 py-3 border rounded shadow-sm focus:ring-2 focus:ring-teal-500 outline-none"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {filteredFormations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map(f => (
            <FormationCard
              key={f.id}
              id={f.id}
              title={f.titre}
              instructor={f.lieu ?? t.locationDefault}
              date={f.date_debut ? `${t.startDate}${f.date_debut}` : t.dateToDefine}
              duration={t.category}
              cost={f.prix ? `${f.prix} MAD` : t.costFree}
              image={
                f.image
                  ? f.image.startsWith('http')
                    ? f.image
                    : `${api.defaults.baseURL}/storage/${f.image}`
                  : '/default-formation.jpg'
              }
              category={t.category}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          {t.noResults}
        </div>
      )}
    </div>
  );
};

export default FormationsPage;
