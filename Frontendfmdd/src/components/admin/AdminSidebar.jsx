import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const AdminSidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: 'dashboard', icon: '📊', label: 'Tableau de bord' },
    { path: 'projets', icon: '🏗️', label: 'Projets' },
    { path: 'formations', icon: '🎓', label: 'Formations' },
    { path: 'evenements', icon: '📅', label: 'Événements' },
    { path: 'insertions', icon: '💼', label: 'Insertions' },
    { path: 'temoignages', icon: '💬', label: 'Témoignages' },
    { path: 'galerie', icon: '🖼️', label: 'Galerie' },
    { path: 'blog', icon: '📝', label: 'Blog' },
    { path: 'apropos', icon: 'ℹ️', label: 'À propos' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-blue-800">FMDD Admin</h2>
        <p className="text-sm text-gray-500">{user?.first_name} {user?.last_name}</p>
      </div>

      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="px-4 py-2 hover:bg-blue-50">
              <button
                onClick={() => {
                  // Si on est déjà sur cette page, on recharge
                  const currentPath = location.pathname.replace('/admin/', '');
                  if (currentPath === item.path) {
                    window.location.reload();
                  } else {
                    navigate(`/admin/${item.path}`, { replace: true });
                  }
                }}
                className="flex items-center w-full"
              >
                <span className="mr-2 text-xl">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
