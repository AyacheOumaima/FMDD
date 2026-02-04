
import { useState } from 'react';
import { X, ArrowRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const GALLERY_DATA = {
  FR: [
    {
      id: 1,
      image: "https://lematin.ma/lematin/uploads/images/2025/05/27/412055.webp",
      titre: "Agriculture Durable",
      description: "Accompagnement des coopératives locales dans le développement de pratiques agricoles durables."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
      titre: "Innovation Sociale",
      description: "Ateliers collaboratifs pour imaginer les solutions de demain face aux défis environnementaux."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
      titre: "Formation & Capacité",
      description: "Programmes de formation intensive pour renforcer les compétences des jeunes acteurs du changement."
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVU-W94CbY15UYSV8ZnSMVK18VERadvGrLQ&s?auto=format&fit=crop&q=80&w=800",
      titre: "Énergies Renouvelables",
      description: "Promotion et sensibilisation aux technologies d'énergie propre pour un avenir bas carbone."
    }
  ],
  EN: [
    {
      id: 1,
      image: "https://lematin.ma/lematin/uploads/images/2025/05/27/412055.webp",
      titre: "Sustainable Agriculture",
      description: "Supporting local cooperatives in developing sustainable agricultural practices."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
      titre: "Social Innovation",
      description: "Collaborative workshops to imagine tomorrow's solutions for environmental challenges."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
      titre: "Training & Capacity",
      description: "Intensive training programs to strengthen the skills of young change agents."
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVU-W94CbY15UYSV8ZnSMVK18VERadvGrLQ&s?auto=format&fit=crop&q=80&w=800",
      titre: "Renewable Energy",
      description: "Promotion and awareness of clean energy technologies for a low-carbon future."
    }
  ],
  AR: [
    {
      id: 1,
      image: "https://lematin.ma/lematin/uploads/images/2025/05/27/412055.webp",
      titre: "الزراعة المستدامة",
      description: "دعم التعاونيات المحلية في تطوير ممارسات زراعية مستدامة."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
      titre: "الابتكار الاجتماعي",
      description: "ورش عمل تعاونية لتصور حلول الغد لمواجهة التحديات البيئية."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
      titre: "التدريب والقدرات",
      description: "برامج تدريبية مكثفة لتعزيز مهارات وكلاء التغيير الشباب."
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVU-W94CbY15UYSV8ZnSMVK18VERadvGrLQ&s?auto=format&fit=crop&q=80&w=800",
      titre: "الطاقة المتجددة",
      description: "الترويج والتوعية بتقنيات الطاقة النظيفة لمستقبل منخفض الكربون."
    }
  ]
};

const TRANSLATIONS = {
  FR: {
    badge: "Aperçu Visuel",
    title: "Notre Impact en ",
    titleSpan: "Images",
    description: "Explorez nos activités à travers le Maroc. De la formation sur le terrain à l'incubation de projets innovants, chaque image témoigne de notre engagement pour le développement durable.",
    viewAll: "Voir toute la galerie"
  },
  EN: {
    badge: "Visual Overview",
    title: "Our Impact in ",
    titleSpan: "Images",
    description: "Explore our activities across Morocco. From field training to incubating innovative projects, each image testifies to our commitment to sustainable development.",
    viewAll: "View full gallery"
  },
  AR: {
    badge: "نظرة عامة بصرية",
    title: "تأثيرنا في ",
    titleSpan: "صور",
    description: "استكشف أنشطتنا في جميع أنحاء المغرب. من التدريب الميداني إلى احتضان المشاريع المبتكرة، تشهد كل صورة على التزامنا بالتنمية المستدامة.",
    viewAll: "عرض المعرض الكامل"
  }
};

export default function GalleryPreview() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const { language } = useLanguage();
  const lang = (language && ["FR", "EN", "AR"].includes(language.toUpperCase())) ? language.toUpperCase() : "FR";

  const currentGalleryData = GALLERY_DATA[lang];
  const t = TRANSLATIONS[lang];

  const openLightbox = (index) => {
    setActiveImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm font-semibold mb-4">
              {t.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.title} <span className="text-teal-600">{t.titleSpan}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t.description}
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <Link
              to="/galerie"
              className="group inline-flex items-center text-teal-600 font-bold hover:text-teal-700 transition-colors"
            >
              {t.viewAll}
              <ArrowRight size={20} className={`ml-2 transform group-hover:translate-x-1 transition-transform ${language === 'AR' ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentGalleryData.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3] bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.image}
                alt={item.titre}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{item.titre}</h3>
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


        {lightboxOpen && activeImage !== null && (
          <div
            className="fixed inset-0 z-[100] bg-gray-950/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X size={24} />
            </button>

            <div
              className="max-w-5xl w-full animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentGalleryData[activeImage].image}
                alt={currentGalleryData[activeImage].titre}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-6 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{currentGalleryData[activeImage].titre}</h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  {currentGalleryData[activeImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
