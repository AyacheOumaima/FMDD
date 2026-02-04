import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/commun/EventCard";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ROUTES } from "../config/api.config";
import api from "../axios";

// Fonction pour obtenir les informations d'un mois donné
const getMonthInfo = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Nombre de jours dans le mois
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  return {
    name: monthNames[month],
    days: daysInMonth,
    firstDay: firstDay,
    year: year,
    month: month
  };
};

const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

// Fonction pour formater la date au format "jour mois" (ex: "15 septembre")
const formatDateToDayMonth = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('fr-FR', { month: 'long' });
  return `${day} ${month}`.toLowerCase();
};

// Fonction pour formater la date complète (ex: "15 septembre 2025")
const formatFullDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

export default function EvenementsPage() {
  const [currentDate, setCurrentDate] = useState(new Date()); // Date actuelle pour le calendrier
  const currentMonthInfo = getMonthInfo(currentDate);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Récupérer tous les événements avec leurs détails
        const response = await api.get(API_ROUTES.events.index, {
          params: { with_details: true } // Ajouter un paramètre pour indiquer qu'on veut les détails complets
        });
        console.log('Réponse de l\'API événements:', response);
        
        // S'assurer que nous avons bien un tableau d'événements
        const eventsData = response.data.data || [];
        console.log('Événements extraits:', eventsData);
        
        // Stocker les événements dans le state
        setEvents(eventsData);
        
        // Stocker également dans le localStorage pour la page de détail
        localStorage.setItem('cachedEvents', JSON.stringify(eventsData));
      } catch (error) {
        toast.error("Erreur lors de la récupération des événements");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  }; 
  
  // Vérifie si une date donnée a un événement
  const hasEvent = (day) => {
    if (!Array.isArray(events) || !events.length) return false;
    
    const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    return events.some(event => {
      if (!event || !event.date) return false;
      
      const eventDateObj = new Date(event.date);
      return (
        eventDate.getDate() === eventDateObj.getDate() &&
        eventDate.getMonth() === eventDateObj.getMonth() &&
        eventDate.getFullYear() === eventDateObj.getFullYear()
      );
    });
  };
  
  // Récupère le titre de l'événement pour un jour donné
  const getEventTitle = (day) => {
    if (!Array.isArray(events) || !events.length) return null;
    
    const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const event = events.find(event => {
      if (!event || !event.date) return false;
      
      const eventDateObj = new Date(event.date);
      return (
        eventDate.getDate() === eventDateObj.getDate() &&
        eventDate.getMonth() === eventDateObj.getMonth() &&
        eventDate.getFullYear() === eventDateObj.getFullYear()
      );
    });
    
    return event ? event.titre : null;
  };



  const handleEventClick = (eventId) => {
    navigate(`/evenements/${eventId}`);
  };

  return (
    <div className="py-12 bg-blue-light min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-poppins font-bold text-blue-dark mb-6">
          Nos Événements
        </h1>
        <p className="mb-8 text-gray-700 max-w-3xl">
          Découvrez les événements à venir du FMDD. Conférences, ateliers, formations et rencontres
          sont organisés régulièrement pour promouvoir le développement durable et créer un réseau d'acteurs engagés.
        </p>

        {/* Calendrier interactif */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-poppins font-semibold">
              {currentMonthInfo.name} {currentMonthInfo.year}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="text-center font-medium p-2">{day}</div>
            ))}
            {Array.from({ length: currentMonthInfo.firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12 p-1"></div>
            ))}
            {Array.from({ length: currentMonthInfo.days }).map((_, i) => {
              const day = i + 1;
              const hasEvt = hasEvent(day);
              return (
                <div
                  key={`day-${day}`}
                  className={`h-12 p-1 relative rounded-md ${hasEvt ? 'bg-yellow-400  bg-opacity-20 cursor-pointer' : ''}`}
                  title={hasEvt ? getEventTitle(day) : undefined}
                >
                  <div className="text-center">
                    {day}
                    {hasEvt && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-2 h-2 bg-yellow rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Liste des événements */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 size={40} className="text-gray-500" />
            </div>
          ) : (
            events.length > 0 ? (
              events.map((event) => (
                <div 
                  key={event.id} 
                  onClick={() => handleEventClick(event.id)}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <EventCard
                    id={event.id}
                    title={event.titre}
                    date={formatFullDate(event.date)}
                    location={`${event.ville}, Maroc`}
                    description={event.description}
                    image={event.image || "https://via.placeholder.com/600x400?text=Événement"}
                    category={event.categorie || "Événement"}
                    price={event.type_evenement === 'gratuit' ? 'Gratuit' : `${event.prix} DH`}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun événement à venir pour le moment</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}