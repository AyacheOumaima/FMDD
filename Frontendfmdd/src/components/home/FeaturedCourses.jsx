import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';

const courses = [
  {
    id: 1,
    title: "Fondamentaux du développement durable",
    instructor: "Prof. Ahmed Benani",
    duration: "10 heures",
    price: "Gratuit",
    image: "https://source.unsplash.com/400x320/?sustainability"
  },
  {
    id: 2,
    title: "Gestion environnementale des projets",
    instructor: "Dr. Leila Zaoui",
    duration: "15 heures",
    price: "350 MAD",
    image: "https://source.unsplash.com/400x320/?environment"
  },
  {
    id: 3,
    title: "Énergies renouvelables au Maroc",
    instructor: "Ing. Karim Tazi",
    duration: "12 heures",
    price: "200 MAD",
    image: "https://source.unsplash.com/400x320/?renewable-energy"
  }
];

const FeaturedCourses = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-950 mb-2">Formations à la une</h2>
            <p className="text-gray-600 max-w-2xl">
              Développez vos compétences et contribuez au développement durable avec nos formations spécialisées.
            </p>
          </div>
          <Link to="/formations" className="mt-4 md:mt-0">
            <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
              Toutes les formations
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
                      S'inscrire
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
};

export default FeaturedCourses;
