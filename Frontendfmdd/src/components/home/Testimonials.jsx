import React, { useState, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
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
];

const NextArrow = ({ onClick }) => {
  return (
    <button 
      className="absolute right-5 -top-16 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
      onClick={onClick}
      aria-label="Témoignage suivant"
    >
      <ChevronRight size={24} className="text-primary" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button 
      className="absolute right-20 -top-16 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
      onClick={onClick}
      aria-label="Témoignage précédent"
    >
      <ChevronLeft size={24} className="text-primary" />
    </button>
  );
};

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = useCallback((_, next) => {
    setActiveSlide(next);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

  return (
    <section className="py-16 bg-secondary bg-opacity-10">
      <div className="container mx-auto px-4">
        <div className="relative mb-20">
          <h2 className="text-3xl font-bold text-primary mb-2">Ce que disent nos participants</h2>
          <p className="text-gray-600 max-w-2xl">
            Découvrez les expériences de ceux qui ont participé à nos programmes et initiatives.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="outline-none">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative">
                  <div className="absolute -top-5 left-10 bg-accent rounded-full p-3">
                    <Quote size={24} className="text-primary" />
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
                        <span className="font-semibold text-primary">{testimonial.name}</span>
                        <span className="text-gray-600 text-sm">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                  activeSlide === idx ? 'bg-accent' : 'bg-gray-300'
                }`}
                aria-label={`Aller au témoignage ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
