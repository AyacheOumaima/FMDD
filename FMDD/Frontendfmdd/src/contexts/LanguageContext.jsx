import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Load language from localStorage or default to FR
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'FR';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        // Handle RTL for Arabic
        if (language === 'AR') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = language.toLowerCase();
        }
    }, [language]);

    const value = {
        language,
        setLanguage,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
