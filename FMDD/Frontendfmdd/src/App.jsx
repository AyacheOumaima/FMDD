// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Pages publiques
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import { AuthLayout } from './pages/AuthLayout';
import FormationsPage from './pages/FormationsPage';
import FormationDetail from './pages/FormationDetail';
import ProjetsPage from './pages/ProjetsPage';
import DetailProjet from './components/DetailProjet';
import EvenementsPage from './pages/EvenementsPage';
import EventDetailPage from './pages/EventDetailPage';
import InsertionPage from './pages/InsertionPage';
import DetailInsertion from './components/DetailInsertion';
import ActualitesPage from './pages/ActualitesPage';
import GaleriePage from './pages/GaleriePage';
import AProposPage from './pages/AProposPage';
import TemoignagesPage from './pages/TemoignagesPage';
import ContactPage from './pages/ContactPage';
import BlogArticlePage from './pages/BlogArticlePage';
import SignupPage from './pages/auth/SignupPage';
import PaiementPage from './pages/PaiementPage';
import SoutienPage from './pages/SoutienPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import EvenementForm from './components/admin/EvenementForm';
import FormationsAdmin from './pages/admin/FormationsAdmin';
import FormationForm from './components/admin/FormationForm';
import BlogPostForm from './components/admin/BlogPostForm';
// Dashboards
import UserDashboard from './pages/dashboards/UserDashboard';
import FormateurDashboard from './pages/dashboards/FormateurDashboard';
import AdminApp from './pages/admin/AdminApp';
import AdherentDashboard from './pages/dashboards/AdherentDashboard';

// Auth
import { ProtectedRoute, AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Notification from './components/Notification';
import LoginPage from './pages/auth/LoginPage';
import FormationEdit from './components/admin/FormationEdit';
import ProjetEdit from './components/admin/ProjetEdit';

// Composant de redirection intelligent
const DashboardRedirect = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const roleToPath = {
        admin: '/admin',
        // ✅ ADDED: Fix for Super Admin redirection
        super_admin: '/admin',
        superadmin: '/admin',
        user: '/dashboard/user',
        formateur: '/dashboard/formateur',
        adherent: '/dashboard/adherent'
    };

    const path = roleToPath[user.role] || '/login';
    return <Navigate to={path} replace />;
};

function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <LanguageProvider>
                    <div className="min-h-screen bg-gray-100">
                        <Routes>
                            {/* Pages publiques */}
                            <Route path="/" element={<Layout />}>
                                <Route index element={<HomePage />} />
                                <Route path="formations" element={<FormationsPage />} />
                                <Route path="formations/:id" element={<FormationDetail />} />
                                <Route path="projets" element={<ProjetsPage />} />
                                <Route path="projets/:id" element={<DetailProjet />} />
                                <Route path="evenements" element={<EvenementsPage />} />
                                <Route path="/admin/evenements/new" element={<EvenementForm />} />
                                <Route path="/admin/formations/edit/:id" element={<FormationEdit />} />
                                <Route path="/admin/projets/edit/:id" element={<ProjetEdit />} />
                                <Route path="evenements/:id" element={<EventDetailPage />} />
                                <Route path="insertion" element={<InsertionPage />} />
                                <Route path="insertion/:id" element={<DetailInsertion />} />
                                <Route path="actualites" element={<ActualitesPage />} />
                                <Route path="actualites/:slug" element={<BlogArticlePage />} />
                                <Route path="galerie" element={<GaleriePage />} />
                                <Route path="a-propos" element={<AProposPage />} />
                                <Route path="temoignages" element={<TemoignagesPage />} />
                                <Route path="contact" element={<ContactPage />} />
                                <Route path="blog/:slug" element={<BlogArticlePage />} />
                            </Route>

                            {/* Pages d'authentification */}
                            <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
                            <Route path="/signup" element={<AuthLayout><SignupPage /></AuthLayout>} />
                            <Route path="/paiement" element={<AuthLayout><PaiementPage /></AuthLayout>} />
                            <Route path="/soutien" element={<AuthLayout><SoutienPage /></AuthLayout>} />
                            <Route path="/unauthorized" element={<AuthLayout><UnauthorizedPage /></AuthLayout>} />

                            {/* Dashboards */}
                            <Route path="/dashboard" element={<DashboardRedirect />} />
                            <Route path="/dashboard/user" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
                            <Route path="/dashboard/formateur" element={<ProtectedRoute allowedRoles={['formateur']}><FormateurDashboard /></ProtectedRoute>} />
                            <Route path="/dashboard/adherent" element={<ProtectedRoute allowedRoles={['adherent']}><AdherentDashboard /></ProtectedRoute>} />

                            {/* Admin */}
                            {/* ✅ FIXED: Added super_admin to allowedRoles */}
                            <Route path="/admin/*" element={
                                <ProtectedRoute allowedRoles={['admin', 'super_admin', 'superadmin']}>
                                    <AdminApp />
                                </ProtectedRoute>
                            } />

                            {/* Route par défaut */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                    <Notification />

                    {/* ✅ Configuration React-Toastify avec décompte visuel */}
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        toastClassName="!bg-white !text-gray-800 !shadow-lg !border !border-gray-200"
                        progressClassName="!bg-gradient-to-r !from-yellow-400 !to-yellow-600"
                        closeButton={true}
                    />
                </LanguageProvider>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;