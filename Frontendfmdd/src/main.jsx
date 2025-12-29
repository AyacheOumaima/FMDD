import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 
// import { initializeApi } from './axios';  <-- REMOVED THIS LINE
import App from './App.jsx';
import './index.css';

// Configuration des futures fonctionnalités de React Router
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

// Démarrer l'application immédiatement
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter {...router}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);

// REMOVED THE CALL AT THE BOTTOM
// The new AuthContext handles CSRF automatically now.