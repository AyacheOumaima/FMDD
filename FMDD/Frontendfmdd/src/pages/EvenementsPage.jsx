import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/commun/EventCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ROUTES } from "../config/api.config";
import api from "../axios";
import { useLanguage } from "../contexts/LanguageContext";

const texts = {
  FR: {
    title: "Nos Événements",
    description:
      "Découvrez les événements à venir du FMDD. Conférences, ateliers, formations et rencontres sont organisés régulièrement pour promouvoir le développement durable et créer un réseau d'acteurs engagés.",
    noEvents: "Aucun événement à venir"
  },
  EN: {
    title: "Our Events",
    description:
      "Discover upcoming FMDD events. Conferences, workshops, trainings and meetings are regularly organized to promote sustainable development and build a network of committed actors.",
    noEvents: "No upcoming events"
  },
  AR: {
    title: "فعالياتنا",
    description:
      "اكتشف الفعاليات القادمة لمنظمة FMDD من مؤتمرات وورشات وتكوينات ولقاءات تُنظم بانتظام لتعزيز التنمية المستدامة وبناء شبكة من الفاعلين الملتزمين.",
    noEvents: "لا توجد فعاليات قادمة"
  }
};

const CALENDAR_DATA = {
  FR: {
    months: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ],
    weekDays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    locale: "fr-FR"
  },
  EN: {
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    locale: "en-US"
  },
  AR: {
    months: [
      "يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو",
      "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"
    ],
    weekDays: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    locale: "ar-MA"
  }
};

const getMonthInfo = (date, lang) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return {
    name: CALENDAR_DATA[lang].months[month],
    days: new Date(year, month + 1, 0).getDate(),
    firstDay: new Date(year, month, 1).getDay(),
    year,
    month
  };
};

const formatFullDate = (dateString, lang) => {
  return new Date(dateString).toLocaleDateString(
    CALENDAR_DATA[lang].locale,
    { year: "numeric", month: "long", day: "numeric" }
  );
};

export default function EvenementsPage() {
  const { language } = useLanguage();
  const lang = texts[language] ? language : "FR";

  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonthInfo = getMonthInfo(currentDate, lang);
  const weekDays = CALENDAR_DATA[lang].weekDays;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(API_ROUTES.events.index, {
          params: { with_details: true }
        });
        setEvents(response.data.data || []);
        localStorage.setItem("cachedEvents", JSON.stringify(response.data.data || []));
      } catch {
        toast.error("Erreur lors de la récupération des événements");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const nextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  const prevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const hasEvent = (day) =>
    events.some(e => {
      const d = new Date(e.date);
      return (
        d.getDate() === day &&
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear()
      );
    });

  return (
    <div
      className="py-12 bg-blue-light min-h-screen"
      dir={lang === "AR" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">

        {/* Page title & description */}
        <h1 className="text-3xl md:text-4xl font-poppins font-bold text-blue-dark mb-6">
          {texts[lang].title}
        </h1>
        <p className="mb-8 text-gray-700 max-w-3xl">
          {texts[lang].description}
        </p>

        {/* Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth}><ChevronLeft size={20} /></button>
            <h2 className="text-xl font-semibold">
              {currentMonthInfo.name} {currentMonthInfo.year}
            </h2>
            <button onClick={nextMonth}><ChevronRight size={20} /></button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="text-center font-medium p-2">{day}</div>
            ))}

            {Array.from({ length: currentMonthInfo.firstDay }).map((_, i) => (
              <div key={`empty-${i}`}></div>
            ))}

            {Array.from({ length: currentMonthInfo.days }).map((_, i) => {
              const day = i + 1;
              return (
                <div
                  key={day}
                  className={`h-12 flex items-center justify-center rounded
                    ${hasEvent(day) ? "bg-yellow-200 cursor-pointer" : ""}`}
                  title={hasEvent(day) ? "Event" : undefined}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="mx-auto animate-spin" size={40} />
          </div>
        ) : (
          events.length > 0 ? (
            events.map(event => (
              <div
                key={event.id}
                onClick={() => navigate(`/evenements/${event.id}`)}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                <EventCard
                  title={event.titre}
                  date={formatFullDate(event.date, lang)}
                  location={`${event.ville}, Maroc`}
                  description={event.description}
                  image={event.image || "https://via.placeholder.com/600x400?text=Événement"}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              {texts[lang].noEvents}
            </p>
          )
        )}
      </div>
    </div>
  );
}
