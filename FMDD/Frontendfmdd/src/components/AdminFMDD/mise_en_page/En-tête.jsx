import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

export const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-fmdd-primary"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-lg font-semibold text-fmdd-primary">Admin FMDD</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-fmdd-primary">
            <Bell size={20} />
          </button>
          <div className="relative">
            <button className="flex items-center text-gray-700 hover:text-fmdd-primary focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-fmdd-primary flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="ml-2 text-sm font-medium hidden md:block">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
