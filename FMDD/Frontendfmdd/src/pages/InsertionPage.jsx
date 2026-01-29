import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { CheckCircle, Upload, ArrowRight } from 'lucide-react';
import InsertionCard from '../components/InsertionCard';
import { useLanguage } from '../contexts/LanguageContext';

const TRANSLATIONS = {
  FR: {
    heroTitle: "Insertion Professionnelle",
    heroSubtitle: "Le FMDD s'engage à faciliter l'insertion professionnelle des jeunes dans les secteurs liés au développement durable.",
    process: [
      { step: "1", title: "Formation", desc: "Acquisition de compétences techniques" },
      { step: "2", title: "Accompagnement", desc: "Coaching individuel et réseau" },
      { step: "3", title: "Insertion", desc: "Stages et emplois verts" }
    ],
    searchPost: "Rechercher par poste",
    searchCity: "Rechercher par ville",
    contractAll: "Tous les contrats",
    noResults: "Aucune offre ne correspond à vos critères.",
    offres: [
      { id: 1, title: 'Développeur Web', company: 'TechCorp', city: 'Casablanca', startDate: '01 Juin 2025', contractType: 'CDI' },
      { id: 2, title: 'Chargé de communication', company: 'ComMedia', city: 'Rabat', startDate: '15 Mai 2025', contractType: 'Stage' },
      { id: 3, title: 'Designer UX/UI', company: 'DesignPro', city: 'Marrakech', startDate: '10 Juil. 2025', contractType: 'CDD' },
      { id: 4, title: 'Chef de projet digital', company: 'InnovaTech', city: 'Fès', startDate: '20 Août 2025', contractType: 'CDI' },
      { id: 5, title: 'Spécialiste SEO', company: 'RankBoost', city: 'Tanger', startDate: '05 Sept. 2025', contractType: 'Stage' },
      { id: 6, title: 'Analyste de données', company: 'DataCorp', city: 'Casablanca', startDate: '15 Sept. 2025', contractType: 'CDD' },
      { id: 7, title: 'Responsable Marketing', company: 'MarketMasters', city: 'Rabat', startDate: '30 Sept. 2025', contractType: 'CDI' },
      { id: 8, title: 'Ingénieur Logiciel', company: 'SoftSolutions', city: 'Marrakech', startDate: '12 Oct. 2025', contractType: 'CDI' },
      { id: 9, title: 'Social Media Manager', company: 'ConnectHub', city: 'Fès', startDate: '01 Nov. 2025', contractType: 'Freelance' },
      { id: 10, title: 'Consultant en stratégie', company: 'StratView', city: 'Tanger', startDate: '25 Nov. 2025', contractType: 'CDI' }
    ]
  },
  EN: {
    heroTitle: "Professional Integration",
    heroSubtitle: "FMDD is committed to facilitating professional integration for young people in sectors related to sustainable development.",
    process: [
      { step: "1", title: "Training", desc: "Acquisition of technical skills" },
      { step: "2", title: "Support", desc: "Individual coaching and networking" },
      { step: "3", title: "Integration", desc: "Internships and green jobs" }
    ],
    searchPost: "Search by position",
    searchCity: "Search by city",
    contractAll: "All contracts",
    noResults: "No offers match your criteria.",
    offres: [
      { id: 1, title: 'Web Developer', company: 'TechCorp', city: 'Casablanca', startDate: 'June 01, 2025', contractType: 'CDI' },
      { id: 2, title: 'Communication Officer', company: 'ComMedia', city: 'Rabat', startDate: 'May 15, 2025', contractType: 'Internship' },
      { id: 3, title: 'UX/UI Designer', company: 'DesignPro', city: 'Marrakech', startDate: 'July 10, 2025', contractType: 'CDD' },
      { id: 4, title: 'Digital Project Manager', company: 'InnovaTech', city: 'Fez', startDate: 'Aug 20, 2025', contractType: 'CDI' },
      { id: 5, title: 'SEO Specialist', company: 'RankBoost', city: 'Tangier', startDate: 'Sept 05, 2025', contractType: 'Internship' },
      { id: 6, title: 'Data Analyst', company: 'DataCorp', city: 'Casablanca', startDate: 'Sept 15, 2025', contractType: 'CDD' },
      { id: 7, title: 'Marketing Manager', company: 'MarketMasters', city: 'Rabat', startDate: 'Sept 30, 2025', contractType: 'CDI' },
      { id: 8, title: 'Software Engineer', company: 'SoftSolutions', city: 'Marrakech', startDate: 'Oct 12, 2025', contractType: 'CDI' },
      { id: 9, title: 'Social Media Manager', company: 'ConnectHub', city: 'Fez', startDate: 'Nov 01, 2025', contractType: 'Freelance' },
      { id: 10, title: 'Strategy Consultant', company: 'StratView', city: 'Tangier', startDate: 'Nov 25, 2025', contractType: 'CDI' }
    ]
  },
  AR: {
    heroTitle: "الإدماج المهني",
    heroSubtitle: "يلتزم المنتدى المغربي للتنمية المستدامة بتسهيل الإدماج المهني للشباب في القطاعات المتعلقة بالتنمية المستدامة.",
    process: [
      { step: "1", title: "التكوين", desc: "اكتساب المهارات التقنية" },
      { step: "2", title: "المواكبة", desc: "التدريب الفردي والتشبيك" },
      { step: "3", title: "الإدماج", desc: "التدريبات والوظائف الخضراء" }
    ],
    searchPost: "البحث عن طريق المنصب",
    searchCity: "البحث عن طريق المدينة",
    contractAll: "جميع العقود",
    noResults: "لا توجد عروض تتوافق مع معاييرك.",
    offres: [
      { id: 1, title: 'مطور ويب', company: 'TechCorp', city: 'الدار البيضاء', startDate: '01 يونيو 2025', contractType: 'CDI' },
      { id: 2, title: 'مسؤول تواصل', company: 'ComMedia', city: 'الرباط', startDate: '15 مايو 2025', contractType: 'تدريب' },
      { id: 3, title: 'مصمم UX/UI', company: 'DesignPro', city: 'مراكش', startDate: '10 يوليو 2025', contractType: 'CDD' },
      { id: 4, title: 'مدير مشروع رقمي', company: 'InnovaTech', city: 'فاس', startDate: '20 أغسطس 2025', contractType: 'CDI' },
      { id: 5, title: 'أخصائي سيو SEO', company: 'RankBoost', city: 'طنجة', startDate: '05 سبتمبر 2025', contractType: 'تدريب' },
      { id: 6, title: 'محلل بيانات', company: 'DataCorp', city: 'الدار البيضاء', startDate: '15 سبتمبر 2025', contractType: 'CDD' },
      { id: 7, title: 'مسؤول تسويق', company: 'MarketMasters', city: 'الرباط', startDate: '30 سبتمبر 2025', contractType: 'CDI' },
      { id: 8, title: 'مهندس برمجيات', company: 'SoftSolutions', city: 'مراكش', startDate: '12 أكتوبر 2025', contractType: 'CDI' },
      { id: 9, title: 'مدير وسائل التواصل الاجتماعي', company: 'ConnectHub', city: 'فاس', startDate: '01 نوفمبر 2025', contractType: 'عمل حر' },
      { id: 10, title: 'مستشار استراتيجي', company: 'StratView', city: 'طنجة', startDate: '25 نوفمبر 2025', contractType: 'CDI' }
    ]
  }
};

const InsertionPage = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.FR;

  const [searchPost, setSearchPost] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchContract, setSearchContract] = useState('');

  const filteredOffres = t.offres.filter((job) =>
    job.title.toLowerCase().includes(searchPost.toLowerCase()) &&
    job.city.toLowerCase().includes(searchCity.toLowerCase()) &&
    (searchContract === '' || job.contractType === searchContract)
  );

  return (
    <div className="bg-blue-light min-h-screen pb-16" dir={language === 'AR' ? 'rtl' : 'ltr'}>
      {/* Image de fond en pleine largeur */}
      <div className="relative w-full bg-cover bg-center overflow-hidden h-[300px] md:h-[350px]">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-blue-dark opacity-70"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center max-w-5xl mx-auto px-4 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-4 md:mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mb-6">
            {t.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto pt-10 px-4">
        {/* Processus */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {t.process.map((step, index) => (
              <React.Fragment key={index}>
                <div className="text-center p-3">
                  <div className="w-14 h-14 bg-[#00A99D] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">{step.step}</div>
                  <h3 className="font-poppins font-semibold mb-1 text-sm md:text-base">{step.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{step.desc}</p>
                </div>
                {index < t.process.length - 1 && (
                  <ArrowRight size={24} className={`text-[#00A99D] hidden md:block ${language === 'AR' ? 'rotate-180' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8 flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md">
          {/* Recherche par poste */}
          <div className="flex items-center border border-gray-300 px-4 py-2 w-full md:w-1/3">
            <FaSearch className={`text-[#FFB347] ${language === 'AR' ? 'ml-2' : 'mr-2'}`} />
            <input
              type="text"
              placeholder={t.searchPost}
              value={searchPost}
              onChange={(e) => setSearchPost(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          {/* Recherche par ville */}
          <div className="flex items-center border-t md:border-t-0 border-l md:border-l-0 border border-gray-300 px-4 py-2 w-full md:w-1/3">
            <FaMapMarkerAlt className={`text-[#FFB347] ${language === 'AR' ? 'ml-2' : 'mr-2'}`} />
            <input
              type="text"
              placeholder={t.searchCity}
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          {/* Filtre par type de contrat */}
          <div className="border-t md:border-t-0 border-l md:border-l-0 border border-gray-300 w-full md:w-1/3">
            <select
              value={searchContract}
              onChange={(e) => setSearchContract(e.target.value)}
              className="w-full px-4 py-2 outline-none"
            >
              <option value="">{t.contractAll}</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Freelance">Alternance</option>
            </select>
          </div>
        </div>

        {/* Liste des offres filtrées */}
        {filteredOffres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffres.map((job) => (
              <InsertionCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">{t.noResults}</p>
        )}
      </div>
    </div>
  );
};

export default InsertionPage;
