import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages admin
import ProjetsAdmin from '../pages/admin/ProjetsAdmin';
import FormationsAdmin from '../pages/admin/FormationsAdmin';
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import EvenementsAdmin from '../pages/admin/EvenementsAdmin';
import InsertionsAdmin from '../pages/admin/InsertionsAdmin';
import TemoignagesAdmin from '../pages/admin/TemoignagesAdmin';
import GalleryAdmin from '../pages/admin/GalleryAdmin';
import BlogAdmin from '../pages/admin/BlogAdmin';
import AProposAdmin from '../pages/admin/AProposAdmin';
import StatsAdmin from '../pages/admin/StatsAdmin';

// Formulaires
import ProjetForm from '../components/admin/ProjetForm';
import FormationForm from '../components/admin/FormationForm';
import EvenementForm from '../components/admin/EvenementForm';
import InsertionForm from '../components/admin/InsertionForm';
import TemoignageForm from '../components/admin/TemoignageForm';
import BlogPostForm from '../components/admin/BlogPostForm';
import GalleryItemForm from '../components/admin/GalleryItemForm';
import AProposForm from '../components/admin/AProposForm';

const AdminRoutes = () => {
  const { user } = useAuth();

  // FIX 1: Allow Super Admins to see the dashboard too!
  const allowedRoles = ['admin', 'super_admin', 'superadmin'];
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <Routes>
      {/* FIX 2: REMOVE "/admin" from all paths. 
          The parent route in App.jsx already handles the "/admin" part. */}
      
      {/* Pages principales */}
      <Route path="projets" element={<ProjetsAdmin />} />
      <Route path="formations" element={<FormationsAdmin />} />
      <Route path="evenements" element={<EvenementsAdmin />} />
      <Route path="insertions" element={<InsertionsAdmin />} />
      <Route path="temoignages" element={<TemoignagesAdmin />} />
      <Route path="galerie" element={<GalleryAdmin />} />
      <Route path="blog" element={<BlogAdmin />} />
      <Route path="apropos" element={<AProposAdmin />} />
      <Route path="stats" element={<StatsAdmin />} />

      {/* Pages de formulaire */}
      <Route path="projets/new" element={<ProjetForm />} />
      <Route path="projets/:id/edit" element={<ProjetForm />} />
      <Route path="formations/new" element={<FormationForm />} />
      <Route path="formations/:id/edit" element={<FormationForm />} />
      <Route path="evenements/new" element={<EvenementForm />} />
      <Route path="evenements/:id/edit" element={<EvenementForm />} />
      <Route path="insertions/new" element={<InsertionForm />} />
      <Route path="insertions/:id/edit" element={<InsertionForm />} />
      <Route path="temoignages/new" element={<TemoignageForm />} />
      <Route path="temoignages/:id/edit" element={<TemoignageForm />} />
      <Route path="galerie/new" element={<GalleryItemForm />} />
      <Route path="galerie/:id/edit" element={<GalleryItemForm />} />
      <Route path="blog/new" element={<BlogPostForm />} />
      <Route path="blog/:id/edit" element={<BlogPostForm />} />
      <Route path="apropos/apropos/edit" element={<AProposForm type="apropos" />} />
      <Route path="apropos/equipe/edit" element={<AProposForm type="equipe" />} />
      <Route path="apropos/objectifs/edit" element={<AProposForm type="objectifs" />} />
      <Route path="apropos/histoire/edit" element={<AProposForm type="histoire" />} />
      <Route path="apropos/histoire/:id/edit" element={<AProposForm type="histoire" />} />

      {/* Tableau de bord - This must be "dashboard", not "/admin/dashboard" */}
      <Route path="dashboard" element={<DashboardAdmin />} />

      {/* Route par défaut - Redirect to dashboard relative path */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;