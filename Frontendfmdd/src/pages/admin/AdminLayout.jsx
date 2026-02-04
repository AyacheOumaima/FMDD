import React from 'react';
import { Outlet } from 'react-router-dom';

// 👇 CHANGE THESE TWO LINES 👇
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;