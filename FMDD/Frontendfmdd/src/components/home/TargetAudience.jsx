import { GraduationCap, Lightbulb, Building, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';


export default function TargetAudience() {
  const { language } = useLanguage();
  
  const audiences = {
    FR:[{
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
    }],
    EN:[{
      icon: GraduationCap,
      title: "Recent graduates & Job seekers",
      description: "Specialized training, support for professional integration and development of skills adapted to the job market.",
      benefits: ["Certified training courses", "Career coaching", "Professional network", "Job opportunities"],
      color: "blue",
      cta: "Discover our training programs",
      link: "/formations"
    },
    {
      icon: Lightbulb,
      title: "Entrepreneurs & Project Leaders",
      description: "Incubation, personalized coaching, fundraising and support until the success of your innovative projects.",
      benefits: ["Project incubation", "Funding assistance", "Expert mentoring", "Networking"],
      color: "yellow",
      cta: "Propose my project",
      link: "/contact"
    },
    {
      icon: Building,
      title: "Institutions & Communities",
      description: "Strategic partnerships, sustainable development consulting and collaboration on territorial impact projects.",
      benefits: ["Consulting expertise", "Sustainable partnerships", "Territorial projects", "Team training"],
      color: "teal",
      cta: "Become a partner",
      link: "/contact"
    },
    {
      icon: Heart,
      title: "Engaged citizens",
      description: "Awareness-raising, participatory events and citizen mobilization for sustainable and inclusive development.",
      benefits: ["Exclusive events", "Engaged community", "Concrete actions", "Collective impact"],
      color: "green",
      cta: "join the community",
      link: "/adhesion"
    }],
    AR:[
      {
      icon: GraduationCap,
      title: "الخريجون الجدد والباحثون عن عمل",
      description: "التدريب المتخصص، ودعم الاندماج المهني، وتطوير المهارات الملائمة لسوق العمل.",
      benefits: ["دورات تدريبية معتمدة"," وتوجيه مهني"," وشبكة علاقات مهنية","وفرص عمل"],
      color: "blue",
      cta: "اكتشف برامجنا التدريبية",
      link: "/formations"
    },
    {
      icon: Lightbulb,
      title: "رواد الأعمال وقادة المشاريع",
      description: "الاحتضان، والتدريب الشخصي، وجمع التبرعات، والدعم حتى نجاح مشاريعك الابتكارية.",
      benefits: ["حضانة المشروع", "البحث عن التمويل", "توجيه الخبراء", "الشبكات"],
      color: "yellow",
      cta: "أقترح مشروعي",
      link: "/contact"
    },
    {
      icon: Building,
      title: "المؤسسات والمجتمعات",
      description: "الشراكات الاستراتيجية، والاستشارات في مجال التنمية المستدامة، والتعاون في مشاريع التأثير الإقليمي.",
      benefits: ["الخبرة الاستشارية", "الشراكات المستدامة", "المشاريع الإقليمية", "تدريب الفريق"],
      color: "teal",
      cta: "كن شريكا",
      link: "/contact"
    },
    {
      icon: Heart,
      title: "المواطنين المنخرطين",
      description: "التوعية، والفعاليات التشاركية، وتعبئة المواطنين من أجل التنمية المستدامة والشاملة.",
      benefits: ["أحداث حصرية", "مجتمع منخرط", "إجراءات ملموسة", "التأثير الجماعي"],
      color: "green",
      cta: "انضم إلى المجتمع",
      link: "/adhesion"
    }
    ]
  };
  const currentAudiences = audiences[language] || audiences.FR;
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

  const StatsSection = {
    h2E:{
      FR:"À qui s'adresse le FMDD ?",
      EN:"Who is the FMDD for?",
      AR:"من هو FMDD؟"
    },
    pE:{
      FR:"Que vous soyez étudiant, entrepreneur, institution ou citoyen engagé, le FMDD vous accompagne dans votre démarche de développement durable.",
      EN:"Whether you are a student, entrepreneur, institution, or engaged citizen, the FMDD supports you in your sustainable development journey.",
      AR:"سواء كنت طالبًا أو رائد أعمال أو مؤسسة أو مواطنًا منخرطًا، فإن FMDD يدعمك في مسيرتك نحو التنمية المستدامة."
    },
    h4A:{
      FR:"Ce que nous vous offrons :",
      EN:"What we offer you:",
      AR:"ماذا نقدم لك:"
    },
    h3AG:{
      FR:"Prêt à faire partie du changement ?",
      EN:"Ready to be part of the change?",
      AR:"هل أنت مستعد لتكون جزءًا من التغيير؟"
    },
    pAG:{
      FR:"Rejoignez une communauté dynamique d'acteurs du développement durable et contribuez à bâtir un avenir meilleur pour le Maroc.",
      EN:"Join a dynamic community of sustainable development actors and help build a better future for Morocco.",
      AR:"انضم إلى مجتمع ديناميكي من الفاعلين في التنمية المستدامة وساهم في بناء مستقبل أفضل للمغرب."
    },
    HeartAG:{
      FR:"Devenir membre",
      EN:"Become a member",
      AR:"كن عضواً"
    },
    ContactAG:{
      FR:"Nous contacter",
      EN:"Contact us",
      AR:"اتصل بنا"
    }

  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              {StatsSection.h2E[language] || StatsSection.h2E.FR}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {StatsSection.pE[language] || StatsSection.pE.FR}
            </p>
          </div>

          {/* Grille des publics cibles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentAudiences.map((audience, index) => {
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
                    <h4 className="font-semibold text-blue-950 mb-3">{StatsSection.h4A[language] || StatsSection.h4A.FR}</h4>
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
                {StatsSection.h3AG[language] || StatsSection.h3AG.FR}

              </h3>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                {StatsSection.pAG[language] || StatsSection.pAG.FR}

              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {StatsSection.HeartAG[language] || StatsSection.HeartAG.FR}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-950 font-semibold rounded-xl transition-all duration-300"
                >
                  {StatsSection.ContactAG[language] || StatsSection.ContactAG.FR}
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
