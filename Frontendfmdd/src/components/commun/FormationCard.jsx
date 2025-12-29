// src/components/commun/FormationCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';

const FormationCard = ({
  id,
  title,
  instructor,
  date,
  duration,
  cost,
  image,
  category
}) => (
  <Card className="h-full flex flex-col">
    {/* visuel */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="absolute top-0 right-0 bg-yellow-400 text-indigo-700 font-semibold px-3 py-1">
        {cost}
      </div>
    </div>

    {/* contenu */}
    <CardBody className="flex flex-col flex-grow">
      <span className="text-xs font-medium text-teal-500 mb-2 flex items-center">
        <Tag size={12} className="mr-1" />
        {category}
      </span>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <User size={16} className="mr-2 text-teal-500" />
        <span>{instructor}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-2">
        <Clock size={16} className="mr-2 text-teal-500" />
        <span>{duration}</span>
      </div>
      <div className="text-gray-600 mb-4 text-sm">{date}</div>

      <div className="mt-auto">
        <Link to={`/formations/${id}`}>
          <Button variant="accent" rightIcon={<ArrowRight size={16} />} isFullWidth>
            S'inscrire
          </Button>
        </Link>
      </div>
    </CardBody>
  </Card>
);

export default FormationCard;
