import React, { useState, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Logo from '../commun/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import defaultAvatar from '../../assets/images/g2.jpg';
import { MdAccountCircle } from 'react-icons/md';

function Dropdown({ title, links, isActive, onLinkClick }) {
  const location = useLocation();

  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-1 font-medium transition-colors
        ${isActive(links) ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
      >
        {title} <ChevronDown size={16} className="mt-[2px]" />
      </button>

      <div className="absolute left-0 top-full mt-2 w-52 rounded-xl bg-white text-gray-800 shadow-xl border border-gray-100 opacity-0 scale-95 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={onLinkClick}
            className={`block px-4 py-2 text-sm rounded-lg m-1
              hover:bg-teal-500 hover:text-white transition
              ${location.pathname === link.path ? 'bg-teal-500 text-white' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

const Navbar = memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const dashboardLink = user?.role ? `/dashboard/${user.role}` : '/dashboard';

  const isActive = path =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const isDropdownActive = links => links.some(l => location.pathname.startsWith(l.path));

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileOpen(false);
  };

  const t = {
    FR: {
      home: 'Accueil',
      formations: 'Formations',
      aboutUs: 'Qui sommes-nous ?',
      about: 'À propos',
      contact: 'Contact',
      gallery: 'Galerie',
      testimonials: 'Témoignages',
      activities: 'Activités',
      projects: 'Projets',
      events: 'Événements',
      job: 'Insertion pro',
      news: 'Actualités',
      blog: 'Blog',
      newsletter: 'Newsletter',
      elearning: 'E-learning',
      login: 'Connexion',
      profile: 'Profil',
      logout: 'Déconnexion',
    },
    EN: {
      home: 'Home',
      formations: 'Trainings',
      aboutUs: 'About Us',
      about: 'About',
      contact: 'Contact',
      gallery: 'Gallery',
      testimonials: 'Testimonials',
      activities: 'Activities',
      projects: 'Projects',
      events: 'Events',
      job: 'Job Placement',
      news: 'News',
      blog: 'Blog',
      newsletter: 'Newsletter',
      elearning: 'E-learning',
      login: 'Login',
      profile: 'Profile',
      logout: 'Logout',
    },
    AR: {
      home: 'الرئيسية',
      formations: 'التكوينات',
      aboutUs: 'من نحن',
      about: 'حول',
      contact: 'اتصال',
      gallery: 'المعرض',
      testimonials: 'الشهادات',
      activities: 'الأنشطة',
      projects: 'المشاريع',
      events: 'الفعاليات',
      job: 'الإدماج المهني',
      news: 'الأخبار',
      blog: 'المدونة',
      newsletter: 'النشرة',
      elearning: 'التعليم الإلكتروني',
      login: "تسجيل الدخول",
      profile: "الملف الشخصي",
      logout: "تسجيل الخروج"
    },
  };

  const subtitle = {
    FR: 'Développement Durable',
    EN: 'Sustainable Development',
    AR: 'التنمية المستدامة',
  };

  const languages = [
    { code: 'FR', label: 'Français' },
    { code: 'EN', label: 'English' },
    { code: 'AR', label: 'العربية' },
  ];

  const dropdownLinks = {
    aboutUs: [
      { path: '/a-propos', label: t[language].about },
      { path: '/contact', label: t[language].contact },
      { path: '/galerie', label: t[language].gallery },
      { path: '/temoignages', label: t[language].testimonials },
    ],
    activities: [
      { path: '/projets', label: t[language].projects },
      { path: '/evenements', label: t[language].events },
      { path: '/insertion', label: t[language].job },
    ],
    news: [
      { path: '/actualites', label: t[language].blog },
      { path: '#newsletter', label: t[language].newsletter },
    ],
  };

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-950/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white/80">FMDD</span>
              <span className="text-[10px] text-white/80 leading-none">{subtitle[language]}</span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8 text-sm text-white">
            <Link to="/" className={isActive('/') ? 'text-yellow-400' : 'hover:text-yellow-400'}>
              {t[language].home}
            </Link>

            <Link
              to="/formations"
              className={isActive('/formations') ? 'text-yellow-400' : 'hover:text-yellow-400'}
            >
              {t[language].formations}
            </Link>

            <Dropdown
              title={t[language].aboutUs}
              links={dropdownLinks.aboutUs}
              isActive={isDropdownActive}
            />

            <Dropdown
              title={t[language].activities}
              links={dropdownLinks.activities}
              isActive={isDropdownActive}
            />

            <Dropdown
              title={t[language].news}
              links={dropdownLinks.news}
              isActive={isDropdownActive}
            />

            {/* LANGUAGE */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 hover:text-yellow-400"
              >
                <Globe size={16} /> {language}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-3 w-36 bg-white rounded-xl shadow-xl overflow-hidden z-50">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                        setMobileOpen(false);
                      }}
                      className="w-full text-gray-800 px-4 py-2 text-left text-sm hover:bg-teal-500 hover:text-white"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* USER */}
            {isAuthenticated ? (
              <div className="relative group">
                <img
                  src={user?.image || defaultAvatar}
                  onError={e => (e.currentTarget.src = defaultAvatar)}
                  className="h-9 w-9 rounded-full object-cover cursor-pointer border"
                />
                <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                  <Link
                    to={dashboardLink}
                    className="block px-4 py-2 hover:bg-teal-500 hover:text-white"
                  >
                    {t[language].profile}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
                  >
                    {t[language].logout}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-500 transition flex items-center gap-1"
              >
                <MdAccountCircle size={18} />
                {t[language].login}
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg bg-teal-500"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-blue-950 px-6 pb-6 space-y-2 animate-slideDown">
          {/* Direct Links */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="block py-2 border-b border-white/10 text-white hover:text-yellow-400"
          >
            {t[language].home}
          </Link>
          <Link
            to="/formations"
            onClick={handleLinkClick}
            className="block py-2 border-b border-white/10 text-white hover:text-yellow-400"
          >
            {t[language].formations}
          </Link>

          {/* Dropdown links flattened */}
          {Object.values(dropdownLinks)
            .flat()
            .map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={handleLinkClick}
                className="block py-2 border-b border-white/10 text-white hover:text-yellow-400"
              >
                {link.label}
              </Link>
            ))}

          {/* Auth buttons */}
          {isAuthenticated ? (
            <>
              <Link
                to={dashboardLink}
                onClick={handleLinkClick}
                className="block py-2 text-center bg-teal-500 rounded-lg text-white hover:bg-teal-600"
              >
                {t[language].profile}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full py-2 text-center bg-red-500 rounded-lg text-white hover:bg-red-600"
              >
                {t[language].logout}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={handleLinkClick}
              className=" py-2 text-center bg-yellow-500 rounded-lg text-white hover:bg-teal-500 flex items-center justify-center gap-1"
            >
              <MdAccountCircle size={18} />
              {t[language].login}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
});

export default Navbar;
