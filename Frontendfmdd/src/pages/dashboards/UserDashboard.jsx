
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaBook, 
  FaCheckCircle, 
  FaCertificate,
  FaSearch,
  FaUser,
  FaList,
  FaHome,
  FaCalendarAlt,
  FaChartLine,
  FaPlayCircle,
  FaFilter,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaFolderOpen,
  FaArrowLeft,
} from 'react-icons/fa';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const [stats, setStats] = useState({
    courses_in_progress: 0,
    completed_courses: 0,
    certificates: 0
  });

  // Données de démo pour les cours
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Avancé - Hooks & Performance",
      category: "Développement Web",
      status: "en_cours",
      lastActivity: "2024-01-15",
      certificateAvailable: false
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      category: "Design",
      status: "terminé",
      lastActivity: "2024-01-10",
      certificateAvailable: true,
      certificateId: "CERT-001"
    },
    {
      id: 3,
      title: "Python pour la Data Science",
      category: "Data Science",
      status: "en_cours",
      lastActivity: "2024-01-14",
      certificateAvailable: false
    },
    {
      id: 4,
      title: "Marketing Digital & SEO",
      category: "Marketing",
      status: "terminé",
      lastActivity: "2024-01-05",
      certificateAvailable: true,
      certificateId: "CERT-002"
    },
    {
      id: 5,
      title: "Gestion de Projet Agile",
      category: "Management",
      status: "en_cours",
      lastActivity: "2024-01-16",
      certificateAvailable: false
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      category: "Sécurité",
      status: "terminé",
      lastActivity: "2024-01-08",
      certificateAvailable: true,
      certificateId: "CERT-003"
    }
  ]);

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUserDashboardData = async () => {
      try {
        setLoading(true);
        setApiError(false);
        
        const statsResponse = await axios.get('/user/courses/stats', {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (statsResponse.data) {
          setStats({
            courses_in_progress: statsResponse.data.en_cours || 0,
            completed_courses: statsResponse.data.termines || 0,
            certificates: statsResponse.data.certificats || 0
          });
        }
        
      } catch (err) {
        console.error('Erreur API:', err);
        setApiError(true);
        setStats({
          courses_in_progress: 3,
          completed_courses: 3,
          certificates: 3
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDashboardData();
  }, []);

  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'in_progress') return course.status === 'en_cours';
    if (filter === 'completed') return course.status === 'terminé';
    if (filter === 'certified') return course.certificateAvailable;
    return true;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'en_cours':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <FaPlayCircle className="h-3 w-3 mr-1.5" />
            En cours
          </span>
        );
      case 'terminé':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <FaCheckCircle className="h-3 w-3 mr-1.5" />
            Terminé
          </span>
        );
      default:
        return null;
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleDownloadCertificate = (certificateId) => {
    console.log(`Téléchargement certificat: ${certificateId}`);
    alert(`Téléchargement du certificat: ${certificateId}`);
  };

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: <FaHome className="h-5 w-5" />,
      action: () => setActiveSection('dashboard')
    },
    {
      id: 'formations',
      label: 'Mes formations',
      icon: <FaBook className="h-5 w-5" />,
      action: () => setActiveSection('formations')
    },
    {
      id: 'certificats',
      label: 'Mes certificats',
      icon: <FaCertificate className="h-5 w-5" />,
      action: () => setActiveSection('certificats')
    },
    {
      id: 'explorer',
      label: 'Explorer les formations',
      icon: <FaSearch className="h-5 w-5" />,
      action: () => navigate('/formations')
    },
    {
      id: 'profil',
      label: 'Accueil',
      icon: <FaArrowLeft className="h-5 w-5 ml-1" />,
      action: () => navigate('/')
    }
  ];

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mobile */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 mr-3"
            >
              {sidebarOpen ? (
                <FaTimes className="h-5 w-5 text-gray-600" />
              ) : (
                <FaBars className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {user?.first_name ? `Bonjour, ${user.first_name}` : 'Tableau de bord'}
            </h1>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaCalendarAlt className="h-4 w-4 mr-2" />
            {new Date().toLocaleDateString('fr-FR', { 
              day: 'numeric',
              month: 'short'
            })}
          </div>
        </div>
      </div>

      <div className="flex">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="px-4 mb-8">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg mr-3">
                      <FaUser className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Espace Apprenant</h2>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <nav className="px-2 space-y-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`mr-3 ${activeSection === item.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="px-6 mb-8">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg mr-3">
                    <FaHome className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Espace Apprenant</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 px-4 space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-100 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className={`mr-3 ${activeSection === item.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                      {item.icon}
                    </span>
                    {item.label}
                    {item.id === 'formations' && filteredCourses.length > 0 && (
                      <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                        {filteredCourses.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1">
          <main className="py-6 sm:py-8 lg:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header du contenu */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeSection === 'dashboard' && 'Tableau de bord'}
                  {activeSection === 'formations' && 'Mes formations'}
                  {activeSection === 'certificats' && 'Mes certificats'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {activeSection === 'dashboard' && 'Vue d\'ensemble de vos activités'}
                  {activeSection === 'formations' && 'Gérez et suivez vos formations'}
                  {activeSection === 'certificats' && 'Consultez et téléchargez vos certificats'}
                </p>
              </div>

              {/* Section Tableau de bord */}
              {activeSection === 'dashboard' && (
                <>
                  {/* Stats Section */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Card Cours en cours */}
                      <div 
                        onClick={() => setActiveSection('formations')}
                        className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-blue-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                              <FaBook className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="font-medium text-gray-900">En apprentissage</h3>
                          </div>
                          <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-2">
                          {stats.courses_in_progress}
                        </p>
                        <p className="text-sm text-blue-600">
                          Cours actuellement suivis
                        </p>
                      </div>

                      {/*  Card Cours terminés  */}
                      <div 
                        onClick={() => {
                          setActiveSection('formations');
                          setFilter('completed');
                        }}
                        className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-green-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-lg mr-4 group-hover:bg-green-200 transition-colors">
                              <FaCheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="font-medium text-gray-900">Terminés</h3>
                          </div>
                          <span className="text-green-600 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-2">
                          {stats.completed_courses}
                        </p>
                        <p className="text-sm text-green-600">
                          Parcours complétés
                        </p>
                      </div>

                      {/* Card Certificats */}
                      <div 
                        onClick={() => setActiveSection('certificats')}
                        className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-amber-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-amber-100 p-3 rounded-lg mr-4 group-hover:bg-amber-200 transition-colors">
                              <FaCertificate className="h-6 w-6 text-amber-600" />
                            </div>
                            <h3 className="font-medium text-gray-900">Certificats</h3>
                          </div>
                          <span className="text-amber-600 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-2">
                          {stats.certificates}
                        </p>
                        <p className="text-sm text-amber-600">
                          Diplômes obtenus
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dernières formations */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FaList className="h-5 w-5 text-indigo-600 mr-2" />
                        Dernières formations
                      </h2>
                      <button
                        onClick={() => setActiveSection('formations')}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Voir tout →
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {courses.slice(0, 3).map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg flex items-center justify-center mr-4 border border-indigo-100">
                              <FaBook className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {course.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {course.category} • {new Date(course.lastActivity).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(course.status)}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Section Mes formations */}
              {activeSection === 'formations' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header du tableau */}
                  <div className="px-6 py-5 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaGraduationCap className="h-5 w-5 text-indigo-600 mr-2" />
                          Mes formations
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} trouvée{filteredCourses.length > 1 ? 's' : ''}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <FaFilter className="h-4 w-4 text-gray-400" />
                          <div className="flex bg-gray-100 rounded-lg p-1">
                            {['all', 'in_progress', 'completed'].map((filterType) => (
                              <button
                                key={filterType}
                                onClick={() => setFilter(filterType)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                  filter === filterType 
                                    ? 'bg-white text-indigo-600 shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                {filterType === 'all' && 'Tous'}
                                {filterType === 'in_progress' && 'En cours'}
                                {filterType === 'completed' && 'Terminés'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Liste des formations */}
                  <div className="divide-y divide-gray-200">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course) => (
                        <div key={course.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              <div className="h-12 w-12 flex-shrink-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl flex items-center justify-center mr-4 border border-indigo-100">
                                <FaBook className="h-6 w-6 text-indigo-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                      {course.title}
                                    </h3>
                                    <div className="flex items-center mt-1 space-x-4">
                                      <span className="text-xs text-gray-500">
                                        {course.category}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        Dernière activité : {new Date(course.lastActivity).toLocaleDateString('fr-FR')}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3 ml-4">
                                    {getStatusBadge(course.status)}
                                    {course.certificateAvailable && (
                                      <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                        <FaCertificate className="h-3 w-3 mr-1" />
                                        Certifié
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleViewCourse(course.id)}
                              className="ml-4 inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                            >
                              {course.status === 'en_cours' ? (
                                <>
                                  <FaPlayCircle className="h-4 w-4 mr-2" />
                                  Continuer
                                </>
                              ) : (
                                <>
                                  <FaFolderOpen className="h-4 w-4 mr-2" />
                                  Ouvrir
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <FaBook className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium text-gray-600">Aucune formation trouvée</p>
                          <p className="mt-2 text-gray-500">Commencez votre première formation</p>
                          <button
                            onClick={() => navigate('/formations')}
                            className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow"
                          >
                            <FaSearch className="h-5 w-5 mr-2" />
                            Explorer les formations
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section Mes certificats */}
              {activeSection === 'certificats' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <FaCertificate className="h-5 w-5 text-amber-600 mr-2" />
                      Mes certificats
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Téléchargez vos certificats de réussite
                    </p>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {courses.filter(c => c.certificateAvailable).length > 0 ? (
                      courses
                        .filter(c => c.certificateAvailable)
                        .map((course) => (
                          <div key={course.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-12 w-12 flex-shrink-0 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl flex items-center justify-center mr-4 border border-amber-100">
                                  <FaCertificate className="h-6 w-6 text-amber-600" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-semibold text-gray-900">
                                    {course.title}
                                  </h3>
                                  <div className="flex items-center mt-1 space-x-4">
                                    <span className="text-xs text-gray-500">
                                      {course.category}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      ID: {course.certificateId}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      Date d'obtention : {new Date(course.lastActivity).toLocaleDateString('fr-FR')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDownloadCertificate(course.certificateId)}
                                className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors text-sm font-medium"
                              >
                                <FaCertificate className="h-4 w-4 mr-2" />
                                Télécharger
                              </button>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <FaCertificate className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium text-gray-600">Aucun certificat disponible</p>
                          <p className="mt-2 text-gray-500">Terminez une formation pour obtenir votre premier certificat</p>
                          <button
                            onClick={() => setActiveSection('/formations')}
                            className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow"
                          >
                            <FaBook className="h-5 w-5 mr-2" />
                            Voir mes formations
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// *Composant Skeleton simplifié
const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="flex">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="animate-pulse p-6 space-y-8">
            <div className="flex items-center">
              <div className="bg-gray-200 p-3 rounded-lg mr-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1">
        <div className="py-6 sm:py-8 lg:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              {/* Header skeleton */}
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
              </div>
              {/* Content skeleton */}
              <div className="bg-white rounded-xl p-6">
                <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-40"></div>
                          <div className="h-3 bg-gray-200 rounded w-32"></div>
                        </div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserDashboard;