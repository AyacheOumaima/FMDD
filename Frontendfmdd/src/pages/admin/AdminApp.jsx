import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from './AdminLayout';
import DashboardAdmin from './DashboardAdmin';
import ProjetsAdmin from './ProjetsAdmin';
import FormationsAdmin from './FormationsAdmin';
import EvenementsAdmin from './EvenementsAdmin';
import InsertionsAdmin from './InsertionsAdmin';
import TemoignagesAdmin from './TemoignagesAdmin';
import GalleryAdmin from './GalleryAdmin';
import BlogAdmin from './BlogAdmin';
import AProposAdmin from './AProposAdmin';
import ProjetForm from '../../components/admin/ProjetForm';
import FormationForm from '../../components/admin/FormationForm';
import EvenementForm from '../../components/admin/EvenementForm';
import InsertionForm from '../../components/admin/InsertionForm';
import TemoignageForm from '../../components/admin/TemoignageForm';
import BlogPostForm from '../../components/admin/BlogPostForm';
import GalleryItemForm from '../../components/admin/GalleryItemForm';
import AProposForm from '../../components/admin/AProposForm';
import AdminRoutes from '../../routes/AdminRoutes';

const AdminApp = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <AdminLayout>
      <Routes>
        {/* Dashboard */}
        <Route path="dashboard" element={<DashboardAdmin />} />

        {/* Projets */}
        <Route path="projets" element={<ProjetsAdmin />} />
        <Route path="projets/new" element={<ProjetForm />} />
        <Route path="projets/:id/edit" element={<ProjetForm />} />

        {/* Formations */}
        <Route path="formations" element={<FormationsAdmin />} />
        <Route path="formations/new" element={<FormationForm />} />
        <Route path="formations/:id/edit" element={<FormationForm />} />

        {/* Evenements */}
        <Route path="evenements" element={<EvenementsAdmin />} />
        <Route path="evenements/new" element={<EvenementForm />} />
        <Route path="evenements/:id/edit" element={<EvenementForm />} />

        {/* Insertions */}
        <Route path="insertions" element={<InsertionsAdmin />} />
        <Route path="insertions/new" element={<InsertionForm />} />
        <Route path="insertions/:id/edit" element={<InsertionForm />} />

        {/* Temoignages */}
        <Route path="temoignages" element={<TemoignagesAdmin />} />
        <Route path="temoignages/new" element={<TemoignageForm />} />
        <Route path="temoignages/:id/edit" element={<TemoignageForm />} />

        {/* Galerie */}
        <Route path="galerie" element={<GalleryAdmin />} />
        <Route path="galerie/new" element={<GalleryItemForm />} />
        <Route path="galerie/:id/edit" element={<GalleryItemForm />} />

        {/* Blog */}
        <Route path="blog" element={<BlogAdmin />} />
        <Route path="blog/new" element={<BlogPostForm />} />
        <Route path="blog/:id/edit" element={<BlogPostForm />} />

        {/* A Propos */}
        <Route path="apropos" element={<AProposAdmin />} />
        <Route path="apropos/edit" element={<AProposForm />} />
        <Route path="apropos/apropos/edit" element={<AProposForm type="apropos" />} />
        <Route path="apropos/equipe/edit" element={<AProposForm type="equipe" />} />
        <Route path="apropos/objectifs/edit" element={<AProposForm type="objectifs" />} />
        <Route path="apropos/histoire/edit" element={<AProposForm type="histoire" />} />
        <Route path="apropos/histoire/:id/edit" element={<AProposForm type="histoire" />} />

        {/* Redirections */}
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminApp;
