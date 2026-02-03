import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export const Sidebar = ({ isOpen }) => {
  const navItems = [
    { name: 'Événements', path: '/admin/evenements', icon: <Calendar className="sidebar-link-icon" /> },
  ];

  return (
    <div className={`bg-[#13335F] ${isOpen ? 'w-64' : 'w-20'} flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden`}>
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
        <h2 className={`text-white font-bold ${isOpen ? 'block' : 'hidden'}`}>FMDD Admin</h2>
        {!isOpen && <span className="text-white font-bold">FM</span>}
      </div>
      <nav className="mt-6">
        <div className="px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              <span className={`${isOpen ? 'block' : 'hidden'}`}>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
