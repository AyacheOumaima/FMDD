import { GraduationCap, Rocket, Leaf, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ActionDomains() {
  const domains = [
    {
      icon: GraduationCap,
      title: "Formation & Compétences",
      description: "Développement des compétences dans les secteurs clés pour répondre aux besoins du marché de l'emploi et aux défis de demain.",
      color: "yellow",
      link: "/formations"
    },
    {
      icon: Rocket,
      title: "Entrepreneuriat & Innovation",
      description: "Insertion professionnelle, soutien aux startups et encouragement de l'innovation pour créer des opportunités d'emploi et d'auto-emploi.",
      color: "blue",
      link: "/projets"
    },
    {
      icon: Leaf,
      title: "Économie Responsable",
      description: "Innovation territoriale et promotion d'une économie responsable pour un développement économique et social durable.",
      color: "green",
      link: "/projets"
    },
    {
      icon: Users,
      title: "Mobilisation Citoyenne",
      description: "Sensibilisation et mobilisation du grand public engagé dans le développement durable pour créer un impact collectif.",
      color: "teal",
      link: "/evenements"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      yellow: {
        bg: "bg-amber-50",
        iconBg: "bg-amber-500",
        iconColor: "text-white",
        hoverBg: "hover:bg-amber-100",
        linkColor: "text-amber-600 hover:text-amber-700"
      },
      blue: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-600",
        iconColor: "text-white",
        hoverBg: "hover:bg-blue-100",
        linkColor: "text-blue-600 hover:text-blue-700"
      },
      green: {
        bg: "bg-emerald-50",
        iconBg: "bg-emerald-600",
        iconColor: "text-white",
        hoverBg: "hover:bg-emerald-100",
        linkColor: "text-emerald-600 hover:text-emerald-700"
      },
      teal: {
        bg: "bg-teal-50",
        iconBg: "bg-teal-600",
        iconColor: "text-white",
        hoverBg: "hover:bg-teal-100",
        linkColor: "text-teal-600 hover:text-teal-700"
      }
    };
    return colorMap[color];
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Nos domaines d'action
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quatre axes stratégiques pour transformer les défis du développement durable 
              en opportunités concrètes pour le Maroc.
            </p>
          </div>

          {/* Grille des domaines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {domains.map((domain, index) => {
              const colors = getColorClasses(domain.color);
              const IconComponent = domain.icon;
              
              return (
                <div 
                  key={index}
                  className={`${colors.bg} ${colors.hoverBg} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg group`}
                >
                  {/* Icône */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${colors.iconColor}`} />
                  </div>

                  {/* Contenu */}
                  <h3 className="text-2xl font-bold text-blue-950 mb-4">
                    {domain.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {domain.description}
                  </p>

                  {/* Lien d'action */}
                  <Link 
                    to={domain.link}
                    className={`inline-flex items-center font-semibold ${colors.linkColor} transition-colors group-hover:translate-x-1 transform duration-300`}
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
