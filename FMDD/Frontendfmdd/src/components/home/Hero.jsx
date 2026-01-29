import { ArrowRight, Rocket, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Hero() {
  const { language } = useLanguage();
  const lang = (language && ["FR", "EN", "AR"].includes(language.toUpperCase())) ? language.toUpperCase() : "FR";

  const translations = {
    FR: {
      badge: "Moteur d'innovation sociale et environnementale",
      titleStart: "Forum Marocain pour le",
      titleEnd: " Développement Durable",
      subtitle: "Transformer les idées locales en solutions durables",
      description: "Nous agissons à travers la formation, l'incubation, le coaching et l'accompagnement pour bâtir une société durable, inclusive et équitable au Maroc.",
      former: "Former",
      accompagner: "Accompagner",
      inserer: "Insérer",
      ctaPrimary: "Rejoindre le mouvement",
      ctaSecondary: "Découvrir nos actions"
    },
    EN: {
      badge: "Engine of social and environmental innovation",
      titleStart: "Moroccan Forum for",
      titleEnd: " Sustainable Development",
      subtitle: "Turning local ideas into sustainable solutions",
      description: "We act through training, incubation, coaching and support to build a sustainable, inclusive and equitable society in Morocco.",
      former: "Train",
      accompagner: "Support",
      inserer: "Integrate",
      ctaPrimary: "Join the movement",
      ctaSecondary: "Discover our actions"
    },
    AR: {
      badge: "محرك للابتكار الاجتماعي والبيئي",
      titleStart: "المنتدى المغربي من أجل",
      titleEnd: " التنمية المستدامة",
      subtitle: "تحويل الأفكار المحلية إلى حلول مستدامة",
      description: "نعمل من خلال التدريب والاحتضان والتوجيه والمواكبة لبناء مجتمع مستدام وشامل وعادل في المغرب.",
      former: "تكوين",
      accompagner: "مواكبة",
      inserer: "إدماج",
      ctaPrimary: "انضم إلى الحركة",
      ctaSecondary: "اكتشف أعمالنا"
    }
  };

  const t = translations[lang];

  return (
    <div className="relative bg-cover bg-center bg-no-repeat min-h-[700px]"
      dir={lang === "AR" ? "rtl" : "ltr"}
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      }}>
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl">
          {/* Badge d'introduction */}
          <div className="inline-flex items-center px-4 py-2 bg-teal-500 bg-opacity-90 rounded-full text-white font-semibold text-sm mb-6">
            <Rocket className="w-4 h-4 mr-2" />
            {t.badge}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t.titleStart}
            <span className="text-yellow-400">{t.titleEnd}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-4 font-medium">
            {t.subtitle}
          </p>

          <p className="text-lg text-gray-300 mb-8 max-w-3xl">
            {t.description}
          </p>

          {/* Mission tripartite */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-white font-medium">{t.former}</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
              <span className="text-white font-medium">{t.accompagner}</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-white font-medium">{t.inserer}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              {t.ctaPrimary}
              <ArrowRight size={20} className={`ml-2 ${lang === 'AR' ? 'rotate-180' : ''}`} />
            </Link>

            <Link
              to="/projets"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-950 transition-all duration-300"
            >
              {t.ctaSecondary}
              <ArrowRight size={20} className={`ml-2 ${lang === 'AR' ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
