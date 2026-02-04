import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const LogoutButton = ({ variant = 'sidebar' }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Variant pour sidebar (dans le menu latéral)
  if (variant === 'sidebar') {
    return (
      <button
        onClick={handleLogout}
        className="w-full flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
      >
        <div className="relative">
          <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600" />
        </div>
        <span className="ml-3 font-medium">Déconnexion</span>
      </button>
    );
  }

  // Variant pour header (dans l'en-tête)
  if (variant === 'header') {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
      >
        <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
        <span className="font-medium">Déconnexion</span>
      </button>
    );
  }

  // Variant compact (pour les petits espaces)
  if (variant === 'compact') {
    return (
      <button
        onClick={handleLogout}
        className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors relative group"
        title="Déconnexion"
      >
        <LogOut className="w-5 h-5" />
        <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </button>
    );
  }

  // Variant par défaut (bouton simple)
  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-sm hover:shadow"
    >
      <LogOut className="w-4 h-4" />
      <span>Se déconnecter</span>
    </button>
  );
};

export default LogoutButton;