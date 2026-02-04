import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';

const projects = [
  {
    id: 1,
    title: "Éco-Villages Durables",
    description:
      "Développement de solutions écologiques pour les communautés rurales, incluant des systèmes d'irrigation efficaces et des installations solaires.",
    image:
      "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Formation Jeunes Entrepreneurs Verts",
    description:
      "Programme de mentorat pour les jeunes porteurs de projets innovants dans le domaine de l'économie verte et des technologies propres.",
    image:
      "https://images.pexels.com/photos/7095954/pexels-photo-7095954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    title: "Littoral Propre",
    description:
      "Initiative de sensibilisation et action concrète pour la préservation du littoral marocain, en partenariat avec les communautés locales.",
    image:
      "https://images.pexels.com/photos/3738525/pexels-photo-3738525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const FeaturedProjects = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-950 mb-2">Nos projets phares</h2>
            <p className="text-gray-600 max-w-2xl">
              Découvrez nos initiatives les plus emblématiques en faveur du développement durable au Maroc.
            </p>
          </div>
          <Link to="/projets" className="mt-4 md:mt-0">
            <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
              Tous les projets
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="h-full flex flex-col">
              <div className="h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardBody className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-5 flex-grow">{project.description}</p>
                <Link to={`/projets/${project.id}`}>
                  <Button variant="accent" rightIcon={<ArrowRight size={16} />}>
                    Voir le projet
                  </Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
