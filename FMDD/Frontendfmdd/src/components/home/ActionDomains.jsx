import { GraduationCap, Rocket, Leaf, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ActionDomains() {
  const { language } = useLanguage();
  const lang = ["FR", "EN", "AR"].includes(language) ? language : "FR";

  const texts = {
    FR: {
      title: "Nos domaines d'action",
      desc: "Quatre axes stratégiques pour transformer les défis du développement durable en opportunités concrètes pour le Maroc.",
      more: "En savoir plus",
      domains: [
        {
          icon: GraduationCap,
          title: "Formation & Compétences",
          description:
            "Développement des compétences dans les secteurs clés pour répondre aux besoins du marché de l'emploi et aux défis de demain.",
          color: "yellow",
          link: "/formations",
        },
        {
          icon: Rocket,
          title: "Entrepreneuriat & Innovation",
          description:
            "Insertion professionnelle, soutien aux startups et encouragement de l'innovation pour créer des opportunités.",
          color: "blue",
          link: "/projets",
        },
        {
          icon: Leaf,
          title: "Économie Responsable",
          description:
            "Promotion d'une économie responsable pour un développement économique et social durable.",
          color: "green",
          link: "/projets",
        },
        {
          icon: Users,
          title: "Mobilisation Citoyenne",
          description:
            "Sensibilisation du public engagé dans le développement durable pour créer un impact collectif.",
          color: "teal",
          link: "/evenements",
        },
      ],
    },

    EN: {
      title: "Our Action Areas",
      desc: "Four strategic pillars turning sustainability challenges into real opportunities in Morocco.",
      more: "Learn more",
      domains: [
        {
          icon: GraduationCap,
          title: "Training & Skills",
          description:
            "Develop key skills to meet job market needs and future challenges.",
          color: "yellow",
          link: "/formations",
        },
        {
          icon: Rocket,
          title: "Entrepreneurship & Innovation",
          description:
            "Support startups and innovation to create professional opportunities.",
          color: "blue",
          link: "/projets",
        },
        {
          icon: Leaf,
          title: "Responsible Economy",
          description:
            "Promote responsible economic and social development.",
          color: "green",
          link: "/projets",
        },
        {
          icon: Users,
          title: "Citizen Engagement",
          description:
            "Raise awareness and mobilize citizens for sustainable impact.",
          color: "teal",
          link: "/evenements",
        },
      ],
    },

    AR: {
      title: "مجالات عملنا",
      desc: "أربعة محاور استراتيجية لتحويل تحديات التنمية المستدامة إلى فرص حقيقية في المغرب.",
      more: "اكتشف المزيد",
      domains: [
        {
          icon: GraduationCap,
          title: "التكوين والمهارات",
          description: "تطوير المهارات لمواكبة متطلبات سوق العمل وتحديات المستقبل.",
          color: "yellow",
          link: "/formations",
        },
        {
          icon: Rocket,
          title: "ريادة الأعمال والابتكار",
          description: "دعم المشاريع الناشئة وتشجيع الابتكار لخلق فرص عمل.",
          color: "blue",
          link: "/projets",
        },
        {
          icon: Leaf,
          title: "الاقتصاد المسؤول",
          description: "تعزيز اقتصاد مسؤول لتحقيق تنمية مستدامة.",
          color: "green",
          link: "/projets",
        },
        {
          icon: Users,
          title: "المشاركة المجتمعية",
          description: "توعية المواطنين لتحقيق تأثير جماعي مستدام.",
          color: "teal",
          link: "/evenements",
        },
      ],
    },
  };

  const getColorClasses = (color) => ({
    yellow: { bg: "bg-amber-50", iconBg: "bg-amber-500", link: "text-amber-600" },
    blue: { bg: "bg-blue-50", iconBg: "bg-blue-600", link: "text-blue-600" },
    green: { bg: "bg-emerald-50", iconBg: "bg-emerald-600", link: "text-emerald-600" },
    teal: { bg: "bg-teal-50", iconBg: "bg-teal-600", link: "text-teal-600" },
  }[color]);

  return (
    <section className="py-16 bg-gray-50" dir={lang === "AR" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">{texts[lang].title}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">{texts[lang].desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {texts[lang].domains.map((d, i) => {
            const Icon = d.icon;
            const colors = getColorClasses(d.color);

            return (
              <div key={i} className={`${colors.bg} rounded-2xl p-8 hover:shadow-lg transition`}>
                <div className={`w-16 h-16 flex items-center justify-center ${colors.iconBg} rounded-2xl mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-blue-950 mb-4">{d.title}</h3>
                <p className="text-gray-600 mb-6">{d.description}</p>

                <Link to={d.link} className={`inline-flex items-center font-semibold ${colors.link}`}>
                  {texts[lang].more}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
