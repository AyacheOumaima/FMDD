import React from "react";
import Navbar from "../components/global/NavBar";
import Footer from "../components/global/Footer";
import { useLanguage } from "../contexts/LanguageContext";

const AuthLayout = ({ children }) => {
  const { language } = useLanguage();
  const lang = ["FR", "EN", "AR"].includes(language) ? language : "FR";

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col"
      dir={lang === "AR" ? "rtl" : "ltr"}
    >
      <Navbar />

      <main className="flex-grow">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export { AuthLayout };
export default AuthLayout;
