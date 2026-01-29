import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users, Compass, BookOpen, Leaf, Hammer, UserCheck, DollarSign
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

import LoadingSpinner from "../components/commun/LoadingSpinner";
import TeamMember from "../components/commun/TeamMember";
import { API_URL } from "../config/api.config";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

const iconMap = {
  users: Users,
  compass: Compass,
  "book-open": BookOpen,
  leaf: Leaf,
  hammer: Hammer,
  "user-check": UserCheck,
  "dollar-sign": DollarSign,
};

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
    title: "حول FMDD",
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
      "تأسس FMDD سنة 2019 لدعم التنمية المستدامة والشباب في المغرب. منذ 2020 توسعت أنشطته عبر برامج ريادة الأعمال والشراكات وتأثير وطني.",
    presidentTitle: "رئيس FMDD",
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
        const res = await api.get("/apropos");
        setApropos(res.data.apropos);
        setEquipe(res.data.equipe || []);
        setServices(res.data.services_profils || []);
      } catch (e) {
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };
    fetchApropos();
  }, [lang]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const president = equipe.find(m => m.poste === "Président");

  return (
    <div className="min-h-screen bg-blue-light py-12" dir={lang === "AR" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 space-y-12">

        <h1 className="text-4xl font-bold text-blue-950">
          {apropos?.titre || t.title}
        </h1>

        {president && (
          <section className="bg-white p-8 rounded-lg shadow flex flex-col md:flex-row items-center gap-8">
            <img
              src={president.photo || "https://via.placeholder.com/200"}
              alt="President"
              className="w-48 h-48 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t.presidentWord}</h2>
              <p className="text-gray-700 mb-4">{apropos?.description}</p>
              <p className="font-medium text-gray-800">
                {president.prenom} {president.nom} – {t.presidentTitle}
              </p>
            </div>
          </section>
        )}

        <section className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">{t.mission}</h2>
          <p className="text-gray-700 mb-6">{t.missionText}</p>
          <h2 className="text-2xl font-semibold mb-4">{t.vision}</h2>
          <p className="text-gray-700">{t.visionText}</p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">{t.target}</h2>
          <table className="w-full border-collapse">
            <thead className="bg-blue-950 text-white">
              <tr>
                <th className="p-3 text-left">{t.profile}</th>
                <th className="p-3 text-left">{t.services}</th>
                <th className="p-3 text-left">{t.access}</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 font-medium">{s.profil}</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside">
                      {(Array.isArray(s.services_offerts) ? s.services_offerts : [s.services_offerts])
                        .map((x, j) => <li key={j}>{x}</li>)}
                    </ul>
                  </td>
                  <td className="p-3">{s.modalites_acces}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">{t.team}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipe.map((m, i) => (
              <TeamMember
                key={i}
                name={`${m.prenom} ${m.nom}`}
                role={m.poste}
                image={m.photo}
                linkedin={m.reseaux_sociaux?.linkedin}
                email={m.email}
              />
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">{t.history}</h2>
          <p>{t.historyText}</p>
        </section>

      </div>
    </div>
  );
};

export default AProposPage;
