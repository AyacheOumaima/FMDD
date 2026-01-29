import React, { useEffect, useState } from "react";
import {
  Users, Compass, BookOpen, Leaf, Hammer, UserCheck, DollarSign,
  History, Award, Target, MessageCircle
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import api from "../axios"; // Use global api instance

import LoadingSpinner from "../components/commun/LoadingSpinner";
import TeamMember from "../components/commun/TeamMember";

const texts = {
  FR: {
    title: "À propos du FMDD",
    presidentWord: "Mot du Président",
    mission: "Notre Mission",
    missionText:
      "Accompagner le développement durable au Maroc en renforçant les compétences, en soutenant l’entrepreneuriat responsable et en mobilisant les citoyens autour de projets à fort impact social, économique et environnemental.",
    vision: "Notre Vision",
    visionText:
      "Devenir une référence nationale en matière de développement durable et d’innovation sociale, en contribuant à l’émergence d’une génération engagée, qualifiée et consciente des enjeux de demain.",
    target: "À qui s'adresse le FMDD ?",
    profile: "Profil",
    services: "Services",
    access: "Modalités",
    team: "Notre équipe",
    history: "Notre histoire",
    historyText:
      "Fondé en 2019, le FMDD œuvre pour la promotion du développement durable et l’accompagnement des jeunes au Maroc. Depuis 2020, le FMDD a élargi ses actions à travers des programmes d’entrepreneuriat, des partenariats institutionnels et un impact national.",
    presidentTitle: "Président du FMDD",
    error: "Erreur lors du chargement des données.",
  },
  EN: {
    title: "About FMDD",
    presidentWord: "President’s Message",
    mission: "Our Mission",
    missionText:
      "Support sustainable development in Morocco by strengthening skills, promoting responsible entrepreneurship, and engaging citizens in high-impact social, economic, and environmental projects.",
    vision: "Our Vision",
    visionText:
      "Become a national reference in sustainable development and social innovation by contributing to an engaged and skilled generation aware of future challenges.",
    target: "Who is FMDD for?",
    profile: "Profile",
    services: "Services",
    access: "Access",
    team: "Our Team",
    history: "Our History",
    historyText:
      "Founded in 2019, FMDD promotes sustainable development and youth support in Morocco. Since 2020, FMDD expanded its work through entrepreneurship programs, institutional partnerships, and national impact.",
    presidentTitle: "FMDD President",
    error: "Error loading data.",
  },
  AR: {
    title: "حول المنتدى المغربي للتنمية المستدامة",
    presidentWord: "كلمة الرئيس",
    mission: "مهمتنا",
    missionText:
      "دعم التنمية المستدامة في المغرب من خلال تعزيز المهارات ودعم ريادة الأعمال المسؤولة وإشراك المواطنين في مشاريع ذات تأثير اجتماعي واقتصادي وبيئي.",
    vision: "رؤيتنا",
    visionText:
      "أن نصبح مرجعًا وطنيًا في التنمية المستدامة والابتكار الاجتماعي والمساهمة في تكوين جيل واعٍ ومؤهل.",
    target: "لمن يوجّه FMDD خدماته؟",
    profile: "الفئة",
    services: "الخدمات",
    access: "طريقة الاستفادة",
    team: "فريقنا",
    history: "تاريخنا",
    historyText:
      "تأسس المنتدى المغربي للتنمية المستدامة سنة 2019 لدعم التنمية المستدامة والشباب في المغرب. منذ 2020 توسعت أنشطته عبر برامج ريادة الأعمال والشراكات وتأثير وطني.",
    presidentTitle: "رئيس المنتدى",
    error: "حدث خطأ أثناء تحميل البيانات.",
  },
};

const AProposPage = () => {
  const { language } = useLanguage();
  const lang = ["FR", "EN", "AR"].includes(language) ? language : "FR";
  const t = texts[lang];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apropos, setApropos] = useState(null);
  const [equipe, setEquipe] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchApropos = async () => {
      try {
        setLoading(true);
        // Use global api instance with correct v1 prefix
        const res = await api.get("api/v1/apropos");
        setApropos(res.data.apropos || res.data.data?.[0]); // Handle different response structures
        setEquipe(res.data.equipe || []);
        setServices(res.data.services_profils || []);
      } catch (e) {
        console.error("Fetch error:", e);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };
    fetchApropos();
  }, [lang, t.error]);

  if (loading) return <LoadingSpinner />;

  const president = equipe.find(m => m.poste?.toLowerCase().includes("président") || m.poste?.toLowerCase().includes("president"));

  const getImageUrl = (path) => {
    if (!path) return "/default-avatar.jpg";
    if (path.startsWith('http')) return path;
    return `${api.defaults.baseURL}/storage/${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir={lang === "AR" ? "rtl" : "ltr"}>
      {/* Hero Section Simplified */}
      <div className="bg-blue-950 text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            {apropos?.titre || t.title}
          </h1>
          <div className="w-24 h-1.5 bg-yellow-400 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 space-y-16">

        {/* President Section */}
        {president && (
          <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-transform hover:scale-[1.01] duration-300">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 h-80 md:h-auto overflow-hidden">
                <img
                  src={getImageUrl(president.photo)}
                  alt="President"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 p-8 lg:p-12">
                <div className="flex items-center gap-2 mb-4 text-teal-600">
                  <MessageCircle size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wider">{t.presidentWord}</h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                  "{apropos?.description || t.missionText}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-blue-950">{president.prenom} {president.nom}</h4>
                  <p className="text-teal-600 font-medium">{t.presidentTitle}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-lg border-t-8 border-teal-500 hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-teal-600">
              <Award size={32} />
            </div>
            <h2 className="text-2xl font-bold text-blue-950 mb-4">{t.mission}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{t.missionText}</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-lg border-t-8 border-yellow-400 hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 text-yellow-600">
              <Target size={32} />
            </div>
            <h2 className="text-2xl font-bold text-blue-950 mb-4">{t.vision}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{t.visionText}</p>
          </div>
        </div>

        {/* Target Profiles Section */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-teal-600" size={32} />
            <h2 className="text-3xl font-bold text-blue-950">{t.target}</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left">
              <thead className="bg-blue-950 text-white">
                <tr>
                  <th className={`p-5 text-lg font-semibold ${lang === 'AR' ? 'text-right' : ''}`}>{t.profile}</th>
                  <th className={`p-5 text-lg font-semibold ${lang === 'AR' ? 'text-right' : ''}`}>{t.services}</th>
                  <th className={`p-5 text-lg font-semibold ${lang === 'AR' ? 'text-right' : ''}`}>{t.access}</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((s, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-5 font-bold text-blue-950">{s.profil}</td>
                      <td className="p-5">
                        <ul className={`space-y-1 ${lang === 'AR' ? 'list-inside' : ''}`}>
                          {(Array.isArray(s.services_offerts) ? s.services_offerts : [s.services_offerts])
                            .map((x, j) => (
                              <li key={j} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></span>
                                <span className="text-gray-600">{x}</span>
                              </li>
                            ))}
                        </ul>
                      </td>
                      <td className="p-5">
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {s.modalites_acces}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">Chargement des données détaillées...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <Users className="text-teal-600" size={32} />
            <h2 className="text-3xl font-bold text-blue-950">{t.team}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipe.map((m, i) => (
              <TeamMember
                key={i}
                name={`${m.prenom} ${m.nom}`}
                role={m.poste}
                image={getImageUrl(m.photo)}
                linkedin={m.reseaux_sociaux?.linkedin}
                email={m.email}
              />
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          <History className="absolute bottom-0 right-0 text-white/5 w-64 h-64 -mb-10 -mr-10 transition-transform group-hover:rotate-12 duration-700" />
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-2xl">
              <History size={32} />
            </div>
            <h2 className="text-3xl font-bold">{t.history}</h2>
          </div>
          <p className="text-xl leading-relaxed text-blue-50 max-w-4xl opacity-90">
            {t.historyText}
          </p>
        </section>

      </div>

      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default AProposPage;
