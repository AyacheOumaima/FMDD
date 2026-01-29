import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

const TRANSLATIONS = {
  FR: { enroll: "S'inscrire" },
  EN: { enroll: "Enroll" },
  AR: { enroll: "سجل الآن" }
};

const FormationCard = ({
  id,
  title,
  instructor,
  date,
  duration,
  cost,
  image,
  category
}) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language] || TRANSLATIONS.FR;

  return (
    <Card className="h-full flex flex-col" dir={language === 'AR' ? 'rtl' : 'ltr'}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-0 ${language === 'AR' ? 'left-0' : 'right-0'} bg-yellow-400 text-indigo-700 px-3 py-1 font-semibold`}>
          {cost}
        </div>
      </div>

      <CardBody className="flex flex-col flex-grow">
        <span className="text-xs text-teal-600 mb-2 flex items-center">
          <Tag size={12} className={language === 'AR' ? 'ml-1' : 'mr-1'} />
          {category}
        </span>

        <h3 className="text-xl font-semibold mb-3">{title}</h3>

        <div className="text-gray-600 mb-2 flex items-center">
          <User size={16} className={`${language === 'AR' ? 'ml-2' : 'mr-2'} text-teal-500`} />
          {instructor}
        </div>

        <div className="text-gray-600 mb-2 flex items-center">
          <Clock size={16} className={`${language === 'AR' ? 'ml-2' : 'mr-2'} text-teal-500`} />
          {duration}
        </div>

        <div className="text-gray-600 mb-4 text-sm">{date}</div>

        <div className="mt-auto">
          <Link to={`/formations/${id}`}>
            <Button variant="accent" isFullWidth rightIcon={<ArrowRight size={16} className={language === 'AR' ? 'rotate-180' : ''} />}>
              {t.enroll}
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default FormationCard;
