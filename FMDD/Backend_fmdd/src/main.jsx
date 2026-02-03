import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { initializeApi } from './utils/axios'
import App from './App.jsx'
import './index.css'

// Initialiser l'API avec CSRF avant le rendu
initializeApi().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}); 