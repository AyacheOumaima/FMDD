import { GraduationCap, Lightbulb, Building, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TargetAudience() {
  const audiences = [
    {
      icon: GraduationCap,
      title: "Jeunes diplômés & Chercheurs d'emploi",
      description: "Formations spécialisées, accompagnement à l'insertion professionnelle et développement de compétences adaptées au marché du travail.",
      benefits: ["Formations certifiantes", "Coaching carrière", "Réseau professionnel", "Opportunités d'emploi"],
      color: "blue",
      cta: "Découvrir nos formations",
      link: "/formations"
    },
    {
      icon: Lightbulb,
      title: "Entrepreneurs & Porteurs de projets",
      description: "Incubation, coaching personnalisé, recherche de financements et accompagnement jusqu'à la réussite de vos projets innovants.",
      benefits: ["Incubation de projets", "Recherche de financement", "Mentorat expert", "Mise en réseau"],
      color: "yellow",
      cta: "Proposer mon projet",
      link: "/contact"
    },
    {
      icon: Building,
      title: "Institutions & Collectivités",
      description: "Partenariats stratégiques, conseil en développement durable et collaboration sur des projets d'impact territorial.",
      benefits: ["Expertise conseil", "Partenariats durables", "Projets territoriaux", "Formation équipes"],
      color: "teal",
      cta: "Devenir partenaire",
      link: "/contact"
    },
    {
      icon: Heart,
      title: "Citoyens engagés",
      description: "Sensibilisation, événements participatifs et mobilisation citoyenne pour un développement durable et inclusif.",
      benefits: ["Événements exclusifs", "Communauté engagée", "Actions concrètes", "Impact collectif"],
      color: "green",
      cta: "Rejoindre la communauté",
      link: "/adhesion"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-600",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-700",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      yellow: {
        bg: "bg-amber-50",
        iconBg: "bg-amber-500",
        badgeBg: "bg-amber-100",
        badgeText: "text-amber-700",
        button: "bg-amber-500 hover:bg-amber-600"
      },
      teal: {
        bg: "bg-teal-50",
        iconBg: "bg-teal-600",
        badgeBg: "bg-teal-100",
        badgeText: "text-teal-700",
        button: "bg-teal-600 hover:bg-teal-700"
      },
      green: {
        bg: "bg-emerald-50",
        iconBg: "bg-emerald-600",
        badgeBg: "bg-emerald-100",
        badgeText: "text-emerald-700",
        button: "bg-emerald-600 hover:bg-emerald-700"
      }
    };
    return colorMap[color];
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              À qui s'adresse le FMDD ?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Que vous soyez étudiant, entrepreneur, institution ou citoyen engagé, 
              le FMDD vous accompagne dans votre démarche de développement durable.
            </p>
          </div>

          {/* Grille des publics cibles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {audiences.map((audience, index) => {
              const colors = getColorClasses(audience.color);
              const IconComponent = audience.icon;
              
              return (
                <div 
                  key={index}
                  className={`${colors.bg} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group`}
                >
                  {/* En-tête */}
                  <div className="flex items-start mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 ${colors.iconBg} rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-950 mb-2">
                        {audience.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {audience.description}
                  </p>

                  {/* Avantages */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-blue-950 mb-3">Ce que nous vous offrons :</h4>
                    <div className="flex flex-wrap gap-2">
                      {audience.benefits.map((benefit, idx) => (
                        <span 
                          key={idx}
                          className={`px-3 py-1 ${colors.badgeBg} ${colors.badgeText} text-sm font-medium rounded-full`}
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <Link 
                    to={audience.link}
                    className={`inline-flex items-center px-6 py-3 ${colors.button} text-white font-semibold rounded-xl transition-all duration-300 transform group-hover:scale-105`}
                  >
                    {audience.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Call to Action global */}
          <div className="mt-16 text-center">
            <div className="bg-blue-950 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Prêt à faire partie du changement ?
              </h3>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez une communauté dynamique d'acteurs du développement durable 
                et contribuez à bâtir un avenir meilleur pour le Maroc.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Devenir membre
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-950 font-semibold rounded-xl transition-all duration-300"
                >
                  Nous contacter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
