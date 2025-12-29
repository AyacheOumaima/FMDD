import React from 'react';
import Navbar from '../components/global/NavBar';
import Footer from '../components/global/Footer';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { AuthLayout };
export default AuthLayout;
