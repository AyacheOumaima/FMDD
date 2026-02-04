// src/pages/dashboard/DashboardPage.jsx
import React from 'react';
import { useUser } from '../../data/UserContext';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/AdminFMDD/mise_en_page/Barre_latérale';
import { Header } from '../../components/AdminFMDD/mise_en_page/En-tête';
import Dashboard from '../../components/AdminFMDD/page/Dashboard';

const DashboardPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
