import React, { useState } from 'react';
import { 
  Users, BookOpen, Calendar, Briefcase, Folder, 
  Star, ChevronUp, ChevronDown, Image
} from 'lucide-react';
import Card from "../../ui/Card";

const Dashboard = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Stats for the cards
  const statCards = [
    {
      title: "Projets actifs",
      value: 24,
      change: "+5%",
      icon: <Folder className="h-8 w-8 text-fmdd-primary" />,
      color: "text-fmdd-primary"
    },
    {
      title: "Formations",
      value: 18,
      change: "+12%",
      icon: <BookOpen className="h-8 w-8 text-fmdd-secondary" />,
      color: "text-fmdd-secondary"
    },
    {
      title: "Événements",
      value: 7,
      change: "+3%",
      icon: <Calendar className="h-8 w-8 text-fmdd-accent" />,
      color: "text-fmdd-accent"
    },
    {
      title: "Insertions pro",
      value: 15,
      change: "+9%",
      icon: <Briefcase className="h-8 w-8 text-fmdd-accent2" />,
      color: "text-fmdd-accent2"
    },
  ];

  // Mock data for featured content
  const featuredProjects = [
    {
      id: 1,
      titre: "Projet Reforestation",
      description: "Une initiative pour reboiser les zones urbaines et périurbaines de la région.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=500&auto=format&fit=crop",
      categorie: "Environnement",
      date: "10 Mai 2025",
    },
    {
      id: 2,
      titre: "Énergie Renouvelable Communautaire",
      description: "Installation de panneaux solaires dans des quartiers défavorisés pour réduire les coûts énergétiques.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=500&auto=format&fit=crop",
      categorie: "Énergie",
      date: "15 Mai 2025",
    },
    {
      id: 3,
      titre: "Agriculture Urbaine",
      description: "Création de jardins partagés dans les espaces urbains pour promouvoir l'agriculture locale.",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=500&auto=format&fit=crop",
      categorie: "Agriculture",
      date: "20 Mai 2025",
    }
  ];

  const featuredFormations = [
    {
      id: 1,
      titre: "Développement Durable en Entreprise",
      description: "Apprenez à intégrer les pratiques de développement durable dans votre entreprise.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&auto=format&fit=crop",
      date_debut: "1 Juin 2025",
      modalite: "Présentiel",
    },
    {
      id: 2,
      titre: "Gestion des Déchets",
      description: "Formation complète sur la gestion et la réduction des déchets en milieu professionnel.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=500&auto=format&fit=crop",
      date_debut: "15 Juin 2025",
      modalite: "Hybride",
    },
    {
      id: 3,
      titre: "Économie Circulaire",
      description: "Découvrez comment implémenter des modèles d'économie circulaire dans votre activité.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=500&auto=format&fit=crop",
      date_debut: "22 Juin 2025",
      modalite: "En ligne",
    }
  ];

  const featuredTemoignages = [
    {
      id: 1,
      texte: "Le programme de formation de la FMDD m'a permis d'acquérir des compétences essentielles pour ma carrière dans le développement durable.",
      role: "Ancien étudiant en formation",
      photo: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=100&auto=format&fit=crop",
    },
    {
      id: 2,
      texte: "Grâce au soutien de la FMDD, notre projet communautaire a pu obtenir le financement nécessaire pour son développement.",
      role: "Porteur de projet",
      photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=100&auto=format&fit=crop",
    },
    {
      id: 3,
      texte: "Les événements organisés par la fondation sont toujours enrichissants et permettent de créer des connexions avec d'autres acteurs du développement durable.",
      role: "Participant aux événements",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop",
    }
  ];

  const featuredMedia = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1602158123486-9c5a1a28abcf?q=80&w=500&auto=format&fit=crop",
      description: "Conférence sur l'économie circulaire",
      categorie: "Événements",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=500&auto=format&fit=crop",
      description: "Atelier de formation sur les énergies renouvelables",
      categorie: "Formations",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=500&auto=format&fit=crop",
      description: "Visite de notre projet de jardins communautaires",
      categorie: "Projets",
    }
  ];

  // Données d'exemple pour les statistiques
  const featuredData = [
    {
      title: "Répartition des projets",
      type: "Projets",
      count: 24,
    },
    {
      title: "Répartition des formations",
      type: "Formations",
      count: 18,
    },
    {
      title: "Répartition des événements",
      type: "Événements",
      count: 7,
    },
    {
      title: "Nouvelles insertions pro",
      type: "Insertions",
      count: 15,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-fmdd-primary">Tableau de bord</h1>
      
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card-stats">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
              </div>
              {stat.icon}
            </div>
            <div className="text-xs text-green-600">
              {stat.change} depuis le mois dernier
            </div>
          </div>
        ))}
      </div>

      {/* Featured Content Sections */}
      <div className="space-y-8">
        {/* Featured Projects Section */}
        <div className="card-dashboard">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-fmdd-primary">
                Projets à la une
              </h2>
              <button 
                onClick={() => toggleSection('projects')} 
                className="ml-2 p-1 rounded-full hover:bg-gray-100"
              >
                {expandedSection === 'projects' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          </div>

          {/* SUPPRESSION DU CAROUSEL PROJETS
          (expandedSection === 'projects' || expandedSection === null) && (
            <Carousel className="w-full">
              <CarouselContent>
                {featuredProjects.map((project) => (
                  <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                    ...
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="static translate-y-0 mr-2" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          )} */}
        </div>

        {/* Featured Formations Section */}
        <div className="card-dashboard">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-fmdd-secondary">
                Formations à la une
              </h2>
              <button 
                onClick={() => toggleSection('formations')} 
                className="ml-2 p-1 rounded-full hover:bg-gray-100"
              >
                {expandedSection === 'formations' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          </div>

          {/* SUPPRESSION DU CAROUSEL FORMATIONS
          (expandedSection === 'formations' || expandedSection === null) && (
            ...
          ) */}
        </div>

        {/* Featured Testimonials Section */}
        <div className="card-dashboard">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-fmdd-accent">
                Témoignages à la une
              </h2>
              <button 
                onClick={() => toggleSection('testimonials')} 
                className="ml-2 p-1 rounded-full hover:bg-gray-100"
              >
                {expandedSection === 'testimonials' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          </div>

          {(expandedSection === 'testimonials' || expandedSection === null) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTemoignages.map((temoignage) => (
                <div key={temoignage.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={temoignage.photo} 
                      alt={`Photo de ${temoignage.role}`} 
                      className="w-16 h-16 object-cover rounded-full" 
                    />
                    <div>
                      <p className="italic text-gray-600 line-clamp-4">"{temoignage.texte}"</p>
                      <p className="mt-2 font-medium text-sm">{temoignage.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Media Gallery Section */}
        <div className="card-dashboard">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-fmdd-accent2">
                Galerie média à la une
              </h2>
              <button 
                onClick={() => toggleSection('gallery')} 
                className="ml-2 p-1 rounded-full hover:bg-gray-100"
              >
                {expandedSection === 'gallery' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            <Image className="h-5 w-5 text-fmdd-accent2" />
          </div>

          {(expandedSection === 'gallery' || expandedSection === null) && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {featuredMedia.map((media) => (
                <div key={media.id} className="group relative overflow-hidden rounded-lg">
                  <img 
                    src={media.image} 
                    alt={media.description} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                    <p className="text-white text-sm font-medium line-clamp-2">{media.description}</p>
                    <span className="text-white/80 text-xs mt-1">{media.categorie}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Content Section (Original) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Items */}
        <div className="card-dashboard">
          <h2 className="text-lg font-semibold text-fmdd-primary mb-4">
            Contenu mis en avant
          </h2>
          <div className="space-y-4">
            {featuredData.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.type}</p>
                </div>
                <span className="badge badge-accent">{item.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="btn-outline text-sm">Voir tout</button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card-dashboard">
          <h2 className="text-lg font-semibold text-fmdd-primary mb-4">
            Activités récentes
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 border-b pb-3">
              <div className="h-8 w-8 rounded-full bg-fmdd-primary/10 flex items-center justify-center">
                <Users size={16} className="text-fmdd-primary" />
              </div>
              <div>
                <p className="font-medium">5 nouvelles inscriptions</p>
                <p className="text-sm text-gray-500">Formation web développement</p>
                <p className="text-xs text-gray-400">Il y a 3 heures</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b pb-3">
              <div className="h-8 w-8 rounded-full bg-fmdd-secondary/10 flex items-center justify-center">
                <BookOpen size={16} className="text-fmdd-secondary" />
              </div>
              <div>
                <p className="font-medium">Nouvelle formation ajoutée</p>
                <p className="text-sm text-gray-500">Gestion de projets écologiques</p>
                <p className="text-xs text-gray-400">Il y a 5 heures</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b pb-3">
              <div className="h-8 w-8 rounded-full bg-fmdd-accent/10 flex items-center justify-center">
                <Calendar size={16} className="text-fmdd-accent" />
              </div>
              <div>
                <p className="font-medium">Événement mis à jour</p>
                <p className="text-sm text-gray-500">Forum du développement durable</p>
                <p className="text-xs text-gray-400">Il y a 12 heures</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-fmdd-accent2/10 flex items-center justify-center">
                <Briefcase size={16} className="text-fmdd-accent2" />
              </div>
              <div>
                <p className="font-medium">Nouvelle insertion professionnelle</p>
                <p className="text-sm text-gray-500">Ingénieur en développement durable</p>
                <p className="text-xs text-gray-400">Il y a 1 jour</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div className="card-dashboard">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-fmdd-primary">
            Derniers articles de blog
          </h2>
          <button className="btn-outline text-sm">Voir tous</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-md overflow-hidden">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold">Article de blog {item}</h3>
                <p className="text-sm text-gray-500 my-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">15 Mai 2025</span>
                  <button className="text-fmdd-primary text-sm hover:underline">
                    Lire plus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
