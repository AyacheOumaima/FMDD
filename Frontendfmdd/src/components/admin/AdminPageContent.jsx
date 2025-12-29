import React from 'react';

const AdminPageContent = ({ title, children }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">{title}</h1>
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default AdminPageContent;
