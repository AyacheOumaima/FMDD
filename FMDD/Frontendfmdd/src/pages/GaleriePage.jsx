import { useState, useMemo } from 'react';
import Lightbox from '../components/commun/Lightbox';
import { Camera, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const STATIC_GALLERY_IMAGES = {
  FR: [
    { id: 1, src: "https://images.unsplash.com/photo-1539437829698-1ea40963f29d?auto=format&fit=crop&q=80&w=1200", titre: "Agriculture Durable", alt: "Agriculture Durable à travers le Maroc", categories: ["Environnement", "Terrain"] },
    { id: 2, src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200", titre: "Innovation Sociale", alt: "Ateliers d'innovation sociale", categories: ["Social", "Ateliers"] },
    { id: 3, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200", titre: "Formation & Capacité", alt: "Sessions de formation FMDD", categories: ["Formation"] },
    { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVU-W94CbY15UYSV8ZnSMVK18VERadvGrLQ&s", titre: "Énergies Renouvelables", alt: "Promotion des énergies vertes", categories: ["Environnement"] },
    { id: 5, src: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1200", titre: "Patrimoine & Écologie", alt: "Architecture durable marocaine", categories: ["Environnement", "Culture"] },
    { id: 6, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200", titre: "Coaching de Projets", alt: "Accompagnement de porteurs de projets", categories: ["Social", "Formation"] },
    { id: 7, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200", titre: "Préservation Forêt", alt: "Action de reforestation", categories: ["Environnement", "Terrain"] },
    { id: 8, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200", titre: "Équipe Innovation", alt: "L'équipe FMDD en action", categories: ["Social"] }
  ],
  EN: [
    { id: 1, src: "https://images.unsplash.com/photo-1539437829698-1ea40963f29d?auto=format&fit=crop&q=80&w=1200", titre: "Sustainable Agriculture", alt: "Sustainable Agriculture across Morocco", categories: ["Environment", "Field"] },
    { id: 2, src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200", titre: "Social Innovation", alt: "Social innovation workshops", categories: ["Social", "Workshops"] },
    { id: 3, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200", titre: "Training & Capacity", alt: "FMDD training sessions", categories: ["Training"] },
    { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVU-W94CbY15UYSV8ZnSMVK18VERadvGrLQ&s", titre: "Renewable Energy", alt: "Promotion of green energy", categories: ["Environment"] },
    { id: 5, src: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1200", titre: "Heritage & Ecology", alt: "Sustainable Moroccan architecture", categories: ["Environment", "Culture"] },
    { id: 6, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200", titre: "Project Coaching", alt: "Supporting project leaders", categories: ["Social", "Training"] },
    { id: 7, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200", titre: "Forest Preservation", alt: "Reforestation action", categories: ["Environment", "Field"] },
    { id: 8, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200", titre: "Innovation Team", alt: "FMDD team in action", categories: ["Social"] }
  ],
  AR: [
    { id: 1, src: "https://images.unsplash.com/photo-1539437829698-1ea40963f29d?auto=format&fit=crop&q=80&w=1200", titre: "الزراعة المستدامة", alt: "الزراعة المستدامة في جميع أنحاء المغرب", categories: ["البيئة", "الميدان"] },
    { id: 2, src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200", titre: "الابتكار الاجتماعي", alt: "ورش عمل الابتكار الاجتماعي", categories: ["اجتماعي", "ورش عمل"] },
    { id: 3, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200", titre: "التدريب والقدرات", alt: "دورات تدريبية FMDD", categories: ["تدريب"] },
    { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVU-W94CbY15UYSV8ZnSMVK18VERadvGrLQ&s", titre: "الطاقة المتجددة", alt: "تعزيز الطاقة الخضراء", categories: ["البيئة"] },
    { id: 5, src: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1200", titre: "التراث والبيئة", alt: "العمارة المغربية المستدامة", categories: ["البيئة", "الثقافة"] },
    { id: 6, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200", titre: "تدريب المشاريع", alt: "دعم قادة المشاريع", categories: ["اجتماعي", "تدريب"] },
    { id: 7, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200", titre: "الحفاظ على الغابات", alt: "عملية إعادة التشجير", categories: ["البيئة", "الميدان"] },
    { id: 8, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200", titre: "فريق الابتكار", alt: "فريق FMDD في العمل", categories: ["اجتماعي"] }
  ]
};

const CATEGORIES = {
  FR: ["Tous", "Environnement", "Social", "Formation", "Terrain", "Ateliers"],
  EN: ["All", "Environment", "Social", "Training", "Field", "Workshops"],
  AR: ["الكل", "البيئة", "اجتماعي", "تدريب", "الميدان", "ورش عمل"]
};

const TRANSLATIONS = {
  FR: {
    title: "Galerie Médias",
    description: "Un aperçu immersif de nos actions sur le terrain. Découvrez comment nous œuvrons chaque jour pour un Maroc plus durable et inclusif.",
    filterBy: "Filtrer par :",
    noImages: "Aucune image ne correspond à ce filtre."
  },
  EN: {
    title: "Media Gallery",
    description: "An immersive overview of our actions in the field. Discover how we work every day for a more sustainable and inclusive Morocco.",
    filterBy: "Filter by:",
    noImages: "No images match this filter."
  },
  AR: {
    title: "معرض الوسائط",
    description: "نظرة عامة غامرة على أعمالنا في الميدان. اكتشف كيف نعمل كل يوم من أجل مغرب أكثر استدامة وشمولية.",
    filterBy: "تصفية حسب:",
    noImages: "لا توجد صور تطابق هذا الفلتر."
  }
};

export default function GaleriePage() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.FR;
  const categories = CATEGORIES[language] || CATEGORIES.FR;

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = STATIC_GALLERY_IMAGES[language] || STATIC_GALLERY_IMAGES.FR;

  const filteredImages = useMemo(() => {
    if (selectedCategory === categories[0]) return images;
    return images.filter(image =>
      image.categories.includes(selectedCategory)
    );
  }, [selectedCategory, images, categories]);

  // Use useEffect to reset category when language changes
  useMemo(() => {
    setSelectedCategory(categories[0]);
  }, [language, categories]);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <div className={`flex items-center justify-center md:justify-start gap-3 mb-4 ${language === 'AR' ? 'md:flex-row-reverse text-right' : ''}`}>
            <div className="p-2 bg-teal-600 text-white rounded-lg">
              <Camera size={24} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 font-poppins">{t.title}</h1>
          </div>
          <p className={`text-gray-600 text-lg max-w-2xl leading-relaxed ${language === 'AR' ? 'text-right mr-auto' : ''}`}>
            {t.description}
          </p>
        </div>

        {/* Filters */}
        <div className={`bg-white p-4 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 ${language === 'AR' ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 text-gray-500 font-medium ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
            <Filter size={20} />
            <span>{t.filterBy}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-100 scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square bg-gray-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className={`absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 ${language === 'AR' ? 'text-right' : ''}`}>
                <h3 className="text-white font-bold text-lg mb-1">{image.titre}</h3>
                <div className={`flex flex-wrap gap-1 ${language === 'AR' ? 'flex-row-reverse' : ''}`}>
                  {image.categories.map(cat => (
                    <span key={cat} className="text-[10px] uppercase tracking-wider font-bold bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-xl text-gray-500">{t.noImages}</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={filteredImages}
          selectedImageIndex={selectedImageIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
