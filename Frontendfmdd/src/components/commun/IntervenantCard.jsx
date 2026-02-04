import React from 'react';
import { Mail, Phone, User } from 'lucide-react';

const IntervenantCard = ({ intervenant }) => {
  // Construire l'URL de l'image si elle existe
  const imageUrl = intervenant.photo 
    ? `${process.env.REACT_APP_API_URL}/storage/${intervenant.photo}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center group hover:shadow-lg transition-all duration-300 intervenant-card">
      {/* Photo de l'intervenant */}
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl}
            alt={intervenant.nom_complet || `${intervenant.prenom} ${intervenant.nom}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        {/* Fallback si pas d'image */}
        <div 
          className={`w-full h-full bg-teal-100 flex items-center justify-center ${imageUrl ? 'hidden' : 'flex'}`}
          style={{ display: imageUrl ? 'none' : 'flex' }}
        >
          <User className="w-8 h-8 text-teal-500" />
        </div>
      </div>

      {/* Nom de l'intervenant */}
      <h3 className="font-poppins font-semibold text-blue-dark text-lg mb-1">
        {intervenant.nom_complet || `${intervenant.prenom || ''} ${intervenant.nom || ''}`.trim() || 'Nom non spécifié'}
      </h3>

      {/* Fonction/Rôle */}
      {intervenant.fonction && (
        <p className="text-teal-600 font-medium mb-3">
          {intervenant.fonction}
        </p>
      )}

      {/* Biographie (si présente) */}
      {intervenant.biographie && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {intervenant.biographie}
        </p>
      )}

      {/* Informations de contact */}
      <div className="flex justify-center space-x-3 mt-4">
        {intervenant.email && (
          <a 
            href={`mailto:${intervenant.email}`}
            className="text-blue-dark hover:text-teal-500 transition-colors p-2 rounded-full hover:bg-teal-50"
            aria-label={`Email de ${intervenant.nom_complet || intervenant.nom}`}
            title={intervenant.email}
          >
            <Mail size={18} />
          </a>
        )}
        {intervenant.telephone && (
          <a 
            href={`tel:${intervenant.telephone}`}
            className="text-blue-dark hover:text-teal-500 transition-colors p-2 rounded-full hover:bg-teal-50"
            aria-label={`Téléphone de ${intervenant.nom_complet || intervenant.nom}`}
            title={intervenant.telephone}
          >
            <Phone size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export default IntervenantCard;
