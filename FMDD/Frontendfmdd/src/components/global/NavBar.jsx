import React, { useState, memo } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Logo from "../commun/Logo";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import defaultAvatar from "../../assets/images/g2.jpg"; // Assurez-vous que ce fichier existe

function DropdownMenu({ title, links, isActive }) {
  const location = useLocation();

  const handleScroll = (e, path) => {
    e.preventDefault();
    // Utiliser un identifiant unique pour le scroll
    const id = path.replace('#', '');
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="group relative">
      <button
        className={`flex items-center transition-all ${isActive(links)
          ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
          : "hover:text-yellow-500"
          }`}
      >
        {title} <ChevronDown size={16} className="ml-2" />
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {links.map((link, index) =>
          link.path.startsWith("#") ? (
            <a
              key={index}
              href={link.path}
              onClick={(e) => handleScroll(e, link.path)}
              className="block px-4 py-2 hover:bg-teal-500 hover:text-white rounded transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={index}
              to={link.path}
              className={`block px-4 py-2 hover:bg-teal-500 hover:text-white rounded transition-colors ${location.pathname === link.path ? "bg-teal-500 text-white" : ""
                }`}
            >
              {link.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

const Navbar = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const dashboardLink = user?.role ? `/dashboard/${user.role}` : '/dashboard';

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isDropdownActive = (dropdownLinks) =>
    dropdownLinks.some((link) => location.pathname.startsWith(link.path));

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const translations = {
    FR: {
      home: "Accueil",
      formations: "Formations",
      aboutUs: "Qui sommes-nous ?",
      about: "À propos",
      contact: "Contact",
      gallery: "Galerie",
      testimonials: "Témoignages",
      activities: "Activités",
      projects: "Projets",
      events: "Événements",
      jobPlacement: "Insertion pro",
      news: "Actualités",
      blog: "Blog",
      newsletter: "Newsletter",
      eLearning: "E-learning",
      login: "Connexion",
      profile: "Profil",
      logout: "Déconnexion"
    },
    EN: {
      home: "Home",
      formations: "Trainings",
      aboutUs: "About Us",
      about: "About",
      contact: "Contact",
      gallery: "Gallery",
      testimonials: "Testimonials",
      activities: "Activities",
      projects: "Projects",
      events: "Events",
      jobPlacement: "Job Placement",
      news: "News",
      blog: "Blog",
      newsletter: "Newsletter",
      eLearning: "E-learning",
      login: "Login",
      profile: "Profile",
      logout: "Logout"
    },
    AR: {
      home: "الرئيسية",
      formations: "التدريبات",
      aboutUs: "من نحن؟",
      about: "حول",
      contact: "اتصال",
      gallery: "معرض الصور",
      testimonials: "الشهادات",
      activities: "الأنشطة",
      projects: "المشاريع",
      events: "الفعاليات",
      jobPlacement: "الإدماج المهني",
      news: "الأخبار",
      blog: "مدونة",
      newsletter: "النشرة الإخبارية",
      eLearning: "التعليم الإلكتروني",
      login: "تسجيل الدخول",
      profile: "الملف الشخصي",
      logout: "Déconnexion"
    },
  };

  const languages = [
    { code: "FR", label: "Français" },
    { code: "EN", label: "English" },
    { code: "AR", label: "العربية" },
  ];

  return (
    <nav className="bg-blue-950 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo et lien E-learning */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1">
                <Logo className="h-10 w-auto" />
              </div>
              <span className="font-bold text-xl">FMDD</span>
            </Link>
            <Link
              to="/fmdd-school"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-500 transition-colors"
            >
              {translations[language].eLearning}
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`hover:text-yellow-500 transition-all ${isActive("/") ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]" : ""
                }`}
            >
              {translations[language].home}
            </Link>
            <Link
              to="/formations"
              className={`hover:text-yellow-500 transition-all ${isActive("/formations")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].formations}
            </Link>
            <DropdownMenu
              title={translations[language].aboutUs}
              links={[
                { path: "/a-propos", label: translations[language].about },
                { path: "/contact", label: translations[language].contact },
                { path: "/galerie", label: translations[language].gallery },
                { path: "/temoignages", label: translations[language].testimonials },
              ]}
              isActive={isDropdownActive}
            />
            <DropdownMenu
              title={translations[language].activities}
              links={[
                { path: "/projets", label: translations[language].projects },
                { path: "/evenements", label: translations[language].events },
                { path: "/insertion", label: translations[language].jobPlacement },
              ]}
              isActive={isDropdownActive}
            />
            <DropdownMenu
              title={translations[language].news}
              links={[
                { path: "/actualites", label: translations[language].blog },
                { path: "#newsletter", label: translations[language].newsletter },
              ]}
              isActive={isDropdownActive}
            />
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center hover:text-yellow-500 transition-all"
              >
                <Globe size={18} className="mr-2" /> {language}
                <ChevronDown size={16} className="ml-2" />
              </button>
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-teal-500 hover:text-white rounded transition-colors"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isAuthenticated && user ? (
              <div className="relative group">
                <Link to={dashboardLink} className="flex items-center gap-2">
                  <img
                    src={user?.image || defaultAvatar}
                    alt="Profil"
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = defaultAvatar;
                    }}
                  />
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to={dashboardLink}
                    className="block px-4 py-2 hover:bg-teal-500 hover:text-white rounded transition-colors"
                  >
                    {translations[language].profile}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded transition-colors"
                  >
                    {translations[language].logout}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
              >
                {translations[language].login}
              </Link>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <button
            className="lg:hidden p-2 bg-teal-500 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-950 py-6">
          <div className="container mx-auto px-6 space-y-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/") ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]" : ""
                }`}
            >
              {translations[language].home}
            </Link>
            <Link
              to="/formations"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/formations")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].formations}
            </Link>
            {/* Pour simplifier, on retourne ici des liens directs pour les items du menu déroulant */}
            <Link
              to="/a-propos"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/a-propos")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].about}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/contact")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].contact}
            </Link>
            <Link
              to="/galerie"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/galerie")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].gallery}
            </Link>
            <Link
              to="/temoignages"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/temoignages")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].testimonials}
            </Link>
            <Link
              to="/projets"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/projets")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].projects}
            </Link>
            <Link
              to="/evenements"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/evenements")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].events}
            </Link>
            <Link
              to="/insertion"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/insertion")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].jobPlacement}
            </Link>
            <Link
              to="/actualites"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-white hover:text-yellow-500 transition-all ${isActive("/actualites")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : ""
                }`}
            >
              {translations[language].blog}
            </Link>
            {/* Lien Newsletter utilisant le scroll fluide */}
            <a
              href="#newsletter"
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector("#newsletter");
                if (section) section.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-white hover:text-yellow-500 transition-all"
            >
              {translations[language].newsletter}
            </a>
            <Link
              to="/fmdd-school"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-center bg-yellow-500 text-white rounded-md transition-colors ${isActive("/fmdd-school")
                ? "text-yellow-500 border-b-2 border-yellow-500 mb-[-2px]"
                : "hover:bg-teal-500"
                }`}
            >
              {translations[language].eLearning}
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  to={dashboardLink}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-center bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                >
                  {translations[language].profile}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  {translations[language].logout}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-center bg-yellow-500 text-white rounded-md hover:bg-teal-600 transition-colors"
              >
                {translations[language].login}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
});

export default Navbar;