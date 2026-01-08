// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { toast } from 'react-toastify';

// const AdminSidebar = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { path: 'dashboard', icon: '📊', label: 'Tableau de bord' },
//     { path: 'projets', icon: '🏗️', label: 'Projets' },
//     { path: 'formations', icon: '🎓', label: 'Formations' },
//     { path: 'evenements', icon: '📅', label: 'Événements' },
//     { path: 'insertions', icon: '💼', label: 'Insertions' },
//     { path: 'temoignages', icon: '💬', label: 'Témoignages' },
//     { path: 'galerie', icon: '🖼️', label: 'Galerie' },
//     { path: 'blog', icon: '📝', label: 'Blog' },
//     { path: 'apropos', icon: 'ℹ️', label: 'À propos' },
//   ];

//   return (
//     <aside className="w-64 bg-white shadow-lg">
//       <div className="p-4 border-b">
//         <h2 className="text-xl font-bold text-blue-800">FMDD Admin</h2>
//         <p className="text-sm text-gray-500">{user?.first_name} {user?.last_name}</p>
//       </div>

//       <nav className="mt-4">
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item.path} className="px-4 py-2 hover:bg-blue-50">
//               <button
//                 onClick={() => {
//                   // Si on est déjà sur cette page, on recharge
//                   const currentPath = location.pathname.replace('/admin/', '');
//                   if (currentPath === item.path) {
//                     window.location.reload();
//                   } else {
//                     navigate(`/admin/${item.path}`, { replace: true });
//                   }
//                 }}
//                 className="flex items-center w-full"
//               >
//                 <span className="mr-2 text-xl">{item.icon}</span>
//                 {item.label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default AdminSidebar;


import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Calendar,
  FolderOpen,
  MessageSquare,
  Image,
  FileText,
  Info,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Search,
  PieChart,
  Users,
  HelpCircle,
  Home
} from 'lucide-react';
import LogoutButton from './LogoutButton';

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { path: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Tableau de bord' },
    { path: 'projets', icon: <Briefcase className="w-5 h-5" />, label: 'Projets' },
    { path: 'formations', icon: <GraduationCap className="w-5 h-5" />, label: 'Formations' },
    { path: 'evenements', icon: <Calendar className="w-5 h-5" />, label: 'Événements' },
    { path: 'insertions', icon: <FolderOpen className="w-5 h-5" />, label: 'Insertions' },
    { path: 'temoignages', icon: <MessageSquare className="w-5 h-5" />, label: 'Témoignages' },
    { path: 'galerie', icon: <Image className="w-5 h-5" />, label: 'Galerie' },
    { path: 'blog', icon: <FileText className="w-5 h-5" />, label: 'Blog' },
    { path: 'apropos', icon: <Info className="w-5 h-5" />, label: 'À propos' },
  ];

  const secondaryItems = [
    { path: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Paramètres' },
    { path: 'help', icon: <HelpCircle className="w-5 h-5" />, label: 'Aide & Support' },
  ];

  const isActive = (path) => {
    const currentPath = location.pathname.replace('/admin/', '');
    return currentPath === path;
  };

  const handleNavigation = (path) => {
    if (isActive(path)) {
      window.location.reload();
    } else {
      navigate(`/admin/${path}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-screen sticky top-0`}>
    
      {/* Informations utilisateur */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'Administrateur'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu principal */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          <p className={`text-xs font-semibold text-gray-400 uppercase tracking-wider ${collapsed ? 'text-center' : 'px-3'} mb-2`}>
            {collapsed ? '···' : 'Navigation'}
          </p>
          
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center ${collapsed ? 'justify-center p-3' : 'px-3 py-2.5'} rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            
            </button>
          ))}
        </div>

        {/* Séparateur */}
        {!collapsed && <div className="my-4 border-t border-gray-200"></div>}

      </nav>

      {/* Pied de page */}
      <div className="p-4 border-t border-gray-200">
        {/* <button
          onClick={handleLogout}
          className={`w-full flex items-center ${collapsed ? 'justify-center p-3' : 'px-3 py-2.5'} rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3 font-medium">Déconnexion</span>}
        </button> */}
        <LogoutButton variant="sidebar" />
        
      </div>
    </aside>
  );
};

export default AdminSidebar;