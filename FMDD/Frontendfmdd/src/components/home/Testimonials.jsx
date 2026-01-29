import React, { useState, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const testimonialsData = {
  FR: [
    {
      id: 1,
      name: "Fatima Zahra",
      role: "Étudiante en sciences environnementales",
      quote: "Les formations offertes par le FMDD m'ont permis d'acquérir des compétences pratiques que je n'aurais pas pu développer uniquement à travers mes études universitaires. L'approche terrain est exceptionnelle.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      name: "Youssef Bennani",
      role: "Entrepreneur en économie circulaire",
      quote: "Grâce au programme d'accompagnement du FMDD, j'ai pu transformer mon idée en un projet viable. Le réseau de professionnels et les ressources mises à disposition sont inestimables pour les jeunes entrepreneurs comme moi.",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "Nadia Alaoui",
      role: "Directrice d'ONG locale",
      quote: "Le partenariat avec le FMDD a décuplé l'impact de nos initiatives locales. Leur expertise technique et leur vision holistique du développement durable ont apporté une valeur ajoutée considérable à nos projets communautaires.",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ],
  EN: [
    {
      id: 1,
      name: "Fatima Zahra",
      role: "Environmental Science Student",
      quote: "The training offered by FMDD allowed me to acquire practical skills that I couldn't have developed through my university studies alone. The field approach is exceptional.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      name: "Youssef Bennani",
      role: "Circular Economy Entrepreneur",
      quote: "Thanks to the FMDD support program, I was able to turn my idea into a viable project. The network of professionals and available resources are invaluable for young entrepreneurs like me.",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "Nadia Alaoui",
      role: "Local NGO Director",
      quote: "The partnership with FMDD has multiplied the impact of our local initiatives. Their technical expertise and holistic vision of sustainable development have brought considerable added value to our community projects.",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ],
  AR: [
    {
      id: 1,
      name: "فاطمة الزهراء",
      role: "طالبة في العلوم البيئية",
      quote: "أتاحت لي التدريبات التي قدمها المنتدى المغربي للتنمية المستدامة اكتساب مهارات عملية لم يكن بإمكاني تطويرها من خلال دراستي الجامعية وحدها. المنهج الميداني استثنائي.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      name: "يوسف بناني",
      role: "رائد أعمال في الاقتصاد الدائري",
      quote: "بفضل برنامج المواكبة للمنتدى، تمكنت من تحويل فكرتي إلى مشروع قابل للتطبيق. شبكة المهنيين والموارد المتاحة لا تقدر بثمن لرواد الأعمال الشباب مثلي.",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "نادية العلوي",
      role: "مديرة منظمة غير حكومية محلية",
      quote: "لقد ضاعفت الشراكة مع المنتدى تأثير مبادراتنا المحلية. خبرتهم التقنية ورؤيتهم الشمولية للتنمية المستدامة أضافت قيمة كبيرة لمشاريعنا المجتمعية.",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ]
};

const texts = {
  FR: {
    title: "Ce que disent nos participants",
    desc: "Découvrez les expériences de ceux qui ont participé à nos programmes et initiatives.",
    prev: "Témoignage précédent",
    next: "Témoignage suivant"
  },
  EN: {
    title: "What our participants say",
    desc: "Discover the experiences of those who participated in our programs and initiatives.",
    prev: "Previous testimonial",
    next: "Next testimonial"
  },
  AR: {
    title: "ماذا يقول المشاركون",
    desc: "اكتشف تجارب أولئك الذين شاركوا في برامجنا ومبادراتنا.",
    prev: "الشهادة السابقة",
    next: "الشهادة التالية"
  }
};

const NextArrow = ({ onClick, lang }) => {
  return (
    <button
      className={`absolute ${lang === 'AR' ? 'left-20' : 'right-5'} -top-16 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10`}
      onClick={onClick}
      aria-label="Next"
    >
      <ChevronRight size={24} className="text-teal-600" />
    </button>
  );
};

const PrevArrow = ({ onClick, lang }) => {
  return (
    <button
      className={`absolute ${lang === 'AR' ? 'left-5' : 'right-20'} -top-16 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10`}
      onClick={onClick}
      aria-label="Previous"
    >
      <ChevronLeft size={24} className="text-teal-600" />
    </button>
  );
};

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { language } = useLanguage();
  const lang = (language && ["FR", "EN", "AR"].includes(language.toUpperCase())) ? language.toUpperCase() : "FR";

  const handleSlideChange = useCallback((_, next) => {
    setActiveSlide(next);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow lang={lang} />,
    prevArrow: <PrevArrow lang={lang} />,
    rtl: lang === 'AR',
    beforeChange: handleSlideChange,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  const currentTestimonials = testimonialsData[lang];
  const t = texts[lang];

  return (
    <section className="py-16 bg-gray-50" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="relative mb-20">
          <h2 className="text-3xl font-bold text-blue-950 mb-2">{t.title}</h2>
          <p className="text-gray-600 max-w-2xl">{t.desc}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Slider {...settings}>
            {currentTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="outline-none">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative">
                  <div className={`absolute -top-5 ${lang === 'AR' ? 'right-10' : 'left-10'} bg-teal-50 rounded-full p-3`}>
                    <Quote size={24} className="text-teal-600" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <blockquote className="text-gray-700 text-lg italic mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex flex-col">
                        <span className="font-semibold text-blue-900">{testimonial.name}</span>
                        <span className="text-gray-600 text-sm">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <div className="flex justify-center mt-8">
            {currentTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-3 h-3 rounded-full mx-1 transition-colors ${activeSlide === idx ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                aria-label={`${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
