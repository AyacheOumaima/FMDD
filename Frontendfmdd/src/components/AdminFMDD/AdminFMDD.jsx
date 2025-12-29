import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // ✅ import obligatoire
import { Sidebar } from './mise_en_page/Barre_latérale';

export default function AdminFMDD() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Barre latérale */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Contenu principal */}
      <main className="flex-1 p-10">
        {/* Le composant enfant s'affichera ici selon la route */}
        <Outlet />

        <h1 className="text-3xl font-bold mb-6">
          Bienvenue sur l'espace d'administration FMDD
        </h1>
      </main>
    </div>
  );
}
