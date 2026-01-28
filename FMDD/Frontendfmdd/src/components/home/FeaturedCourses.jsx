import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import Card, { CardBody } from "../ui/Card";
import Button from "../ui/Button";
import { useLanguage } from "../../contexts/LanguageContext";

export default function FeaturedCourses() {
  const { language } = useLanguage();
  const lang = (language && ["FR", "EN", "AR"].includes(language.toUpperCase())) ? language.toUpperCase() : "FR";

  const texts = {
    FR: {
      title: "Formations à la une",
      desc: "Développez vos compétences et contribuez au développement durable avec nos formations spécialisées.",
      allCourses: "Toutes les formations",
      enroll: "S'inscrire",
      free: "Gratuit",
      hours: "heures",
      courses: [
        {
          id: 1,
          title: "Fondamentaux du développement durable",
          instructor: "Prof. Ahmed Benani",
          duration: "10 heures",
          price: "Gratuit",
          image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: 2,
          title: "Gestion environnementale des projets",
          instructor: "Dr. Leila Zaoui",
          duration: "15 heures",
          price: "350 MAD",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: 3,
          title: "Énergies renouvelables au Maroc",
          instructor: "Ing. Karim Tazi",
          duration: "12 heures",
          price: "200 MAD",
          image: "https://images.unsplash.com/photo-1466611653911-954554331f4a?auto=format&fit=crop&q=80&w=800",
        },
      ],
    },

    EN: {
      title: "Featured Courses",
      desc: "Build your skills and support sustainable development through our specialized training.",
      allCourses: "All courses",
      enroll: "Enroll",
      free: "Free",
      hours: "hours",
      courses: [
        {
          id: 1,
          title: "Sustainable Development Fundamentals",
          instructor: "Prof. Ahmed Benani",
          duration: "10 hours",
          price: "Free",
          image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: 2,
          title: "Environmental Project Management",
          instructor: "Dr. Leila Zaoui",
          duration: "15 hours",
          price: "350 MAD",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: 3,
          title: "Renewable Energy in Morocco",
          instructor: "Ing. Karim Tazi",
          duration: "12 hours",
          price: "200 MAD",
          image: "https://images.unsplash.com/photo-1466611653911-954554331f4a?auto=format&fit=crop&q=80&w=800",
        },
      ],
    },

    AR: {
      title: "الدورات المميزة",
      desc: "طور مهاراتك وساهم في التنمية المستدامة من خلال دوراتنا المتخصصة.",
      allCourses: "كل الدورات",
      enroll: "سجل الآن",
      free: "مجاني",
      hours: "ساعات",
      courses: [
        {
          id: 1,
          title: "أساسيات التنمية المستدامة",
          instructor: "الأستاذ أحمد بناني",
          duration: "10 ساعات",
          price: "مجاني",
          image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: 2,
          title: "إدارة المشاريع البيئية",
          instructor: "الدكتورة ليلى الزاوي",
          duration: "15 ساعة",
          price: "350 درهم",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: 3,
          title: "الطاقات المتجددة في المغرب",
          instructor: "المهندس كريم تازي",
          duration: "12 ساعة",
          price: "200 درهم",
          image: "https://images.unsplash.com/photo-1466611653911-954554331f4a?auto=format&fit=crop&q=80&w=800",
        },
      ],
    },
  };

  return (
    <section className="py-16 bg-gray-50" dir={lang === "AR" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-950 mb-2">{texts[lang].title}</h2>
            <p className="text-gray-600 max-w-2xl">{texts[lang].desc}</p>
          </div>
          <Link to="/formations" className="mt-4 md:mt-0">
            <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
              {texts[lang].allCourses}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {texts[lang].courses.map((course) => (
            <Card key={course.id} className="h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
                <div className="absolute top-0 right-0 bg-blue-400 text-white font-semibold px-3 py-1">
                  {course.price}
                </div>
              </div>

              <CardBody className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <User size={16} className="mr-2" />
                  <span>{course.instructor}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Clock size={16} className="mr-2" />
                  <span>{course.duration}</span>
                </div>

                <div className="mt-auto">
                  <Link to={`/formations/${course.id}`}>
                    <Button variant="accent" rightIcon={<ArrowRight size={16} />}>
                      {texts[lang].enroll}
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
