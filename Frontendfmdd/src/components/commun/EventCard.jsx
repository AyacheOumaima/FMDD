import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

const EventCard = ({ id, title, date, location, description, image, category, price }) => {
  return (
    <div className="card flex flex-col md:flex-row gap-4 group hover:translate-y-[-5px] bg-white shadow-md rounded-lg p-4">
      {image && (
        <div className="w-full md:w-1/4 min-h-[120px] md:h-auto rounded-md overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1">
        {/* Boutons de catégorie et tarif */}
        <div className="flex gap-2 mb-2">
          <button className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold">
            {category}
          </button>
          <button className="bg-green-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold">
            {price}
          </button>
        </div>
        <h3 className="font-poppins font-semibold text-lg text-blue-dark mb-2">{title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar size={16} className="mr-2 flex-shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span>{location}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Link 
          to={`/evenements/${id}`} 
          className="btn btn-primary bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md inline-block transition"
        >
          Détails
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
