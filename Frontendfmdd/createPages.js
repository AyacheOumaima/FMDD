import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Définir __dirname correctement pour ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dictionnaire des pages avec leur chemin
const pages = {
  HomePage: 'pages',
  FormationsPage: 'pages',
  ProjetsPage: 'pages',
  EvenementsPage: 'pages',
  InsertionPage: 'pages',
  ActualitesPage: 'pages',
  GaleriePage: 'pages',
  AProposPage: 'pages',
  TemoignagesPage: 'pages',
  ContactPage: 'pages',
  BlogArticlePage: 'pages',

  // Auth
  LoginPage: 'pages/auth',
  SignupPage: 'pages/auth',

  // Dashboard
  DashboardPage: 'pages/dashboard',

  // Paiement et soutien
  PaiementPage: 'pages',
  SoutienPage: 'pages',

  // Admin
  AdminDashboardPage: 'pages/admin',
};

// Fonction de génération du composant
const createComponent = (name, dir) => {
  const content = `import React from 'react';

const ${name} = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-dark">${name}</h1>
      <p>Contenu de la page ${name}</p>
    </div>
  );
};

export default ${name};
`;

  const filePath = path.join(dir, `${name}.jsx`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Page créée : ${filePath}`);
};

// Création des fichiers
for (const [pageName, folder] of Object.entries(pages)) {
  const fullPath = path.join(__dirname, folder);
  
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const filePath = path.join(fullPath, `${pageName}.jsx`);
  if (!fs.existsSync(filePath)) {
    createComponent(pageName, fullPath);
  } else {
    console.log(`⏭️ Déjà existant : ${filePath}`);
  }
}
