FMDD – Front-End (ReactJS)

Application web du projet FMDD permettant la gestion et la consultation des formations, événements, projets, galerie, blog, inscriptions, bénévolat et espace utilisateur.

| Technologie                                | Description                                 |
| ------------------------------------------ | ------------------------------------------- |
| **ReactJS (Vite ou CRA selon ton projet)** | Framework front-end principal               |
| **React Router DOM**                       | Gestion de la navigation                    |
| **Axios / Fetch**                          | Requêtes API vers le back-end Laravel        |
| **TailwindCSS / CSS modules**              | Style des pages                             |
| **Context API /    REST**                  | Gestion de l'état global (auth, user, etc.) |
| **JWT localStorage**                       | Authentification côté front                 |

Le fichier Readme_Auth pour plus de detail sur l'authentification

# Frontendfmdd


## 📁 Project Structure

```
.
├── createPages.js
├── eslint.config.js
├── index.html
├── npm
├── package.json
├── pages
├── postcss.config.cjs
├── public
│   ├── assets
│   │   └── LOGO.jpg
│   ├── images
│   │   └── default-avatar.png
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   ├── LOGO.jpg
│   │   └── images
│   │       ├── g1.jpg
│   │       ├── g2.jpg
│   │       ├── g3.jpg
│   │       ├── g4.jpg
│   │       ├── g5.jpg
│   │       ├── g6.jpg
│   │       └── g7.jpg
│   ├── axios.js
│   ├── components
│   │   ├── AdminFMDD
│   │   │   ├── AdminFMDD.jsx
│   │   │   ├── mise_en_page
│   │   │   │   ├── Barre_latérale.jsx
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   └── En-tête.jsx
│   │   │   └── page
│   │   │       ├── APropos.jsx
│   │   │       ├── Benevoles.jsx
│   │   │       ├── Blogs.jsx
│   │   │       ├── ContactsNewsletter.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Evenements.jsx
│   │   │       ├── Formations.jsx
│   │   │       ├── Galerie.jsx
│   │   │       ├── Insertions.jsx
│   │   │       ├── Projets.jsx
│   │   │       └── Temoignages.jsx
│   │   ├── DetailInsertion.jsx
│   │   ├── DetailProjet.jsx
│   │   ├── InsertionCard.jsx
│   │   ├── Notification.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProjetCard.jsx
│   │   ├── SearchFilter.jsx
│   │   ├── TestimonialCard.jsx
│   │   ├── admin
│   │   │   ├── AProposForm.jsx
│   │   │   ├── AdminForm.jsx
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── AdminPageContent.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminTable.jsx
│   │   │   ├── BlogPostForm.jsx
│   │   │   ├── EvenementForm.jsx
│   │   │   ├── FormationForm.jsx
│   │   │   ├── GalleryItemForm.jsx
│   │   │   ├── InsertionForm.jsx
│   │   │   ├── ProjetForm.jsx
│   │   │   └── TemoignageForm.jsx
│   │   ├── commun
│   │   │   ├── Banner.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── FormationCard.jsx
│   │   │   ├── IntervenantCard.jsx
│   │   │   ├── Lightbox.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Location.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── TeamMember.jsx
│   │   ├── global
│   │   │   ├── API
│   │   │   ├── API.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── NavBar.jsx
│   │   ├── home
│   │   │   ├── AboutFMDD.jsx
│   │   │   ├── ActionDomains.jsx
│   │   │   ├── FeaturedCourses.jsx
│   │   │   ├── FeaturedProjects.jsx
│   │   │   ├── GalleryPreview.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── TargetAudience.jsx
│   │   │   └── Testimonials.jsx
│   │   └── ui
│   │       ├── Button.jsx
│   │       └── Card.jsx
│   ├── config
│   │   ├── api.config.js
│   │   └── axios.js
│   ├── contexts
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── data
│   │   ├── ConfigContext.jsx
│   │   └── users.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── AProposPage.jsx
│   │   ├── ActualitesPage.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── BlogArticlePage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── EvenementsPage.jsx
│   │   ├── EventDetailPage.jsx
│   │   ├── Formationdetail.jsx
│   │   ├── FormationsPage.jsx
│   │   ├── GaleriePage.jsx
│   │   ├── HomePage.jsx
│   │   ├── InsertionPage.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── MonEspace.jsx
│   │   ├── PaiementPage.jsx
│   │   ├── ProjetsPage.jsx
│   │   ├── SoutienPage.jsx
│   │   ├── TemoignagesPage.jsx
│   │   ├── UnauthorizedPage.jsx
│   │   ├── admin
│   │   │   ├── AProposAdmin.jsx
│   │   │   ├── AdminApp.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── BlogAdmin.jsx
│   │   │   ├── DashboardAdmin.jsx
│   │   │   ├── EvenementsAdmin.jsx
│   │   │   ├── FormationsAdmin.jsx
│   │   │   ├── GalleryAdmin.jsx
│   │   │   ├── InsertionsAdmin.jsx
│   │   │   ├── ProjetsAdmin.jsx
│   │   │   ├── StatsAdmin.jsx
│   │   │   └── TemoignagesAdmin.jsx
│   │   ├── auth
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── dashboard
│   │   │   └── DashboardPage.jsx
│   │   ├── dashboards
│   │   │   ├── AdherentDashboard.jsx
│   │   │   ├── FormateurDashboard.jsx
│   │   │   └── UserDashboard.jsx
│   │   └── dashbordUser.jsx
│   └── routes
│       └── AdminRoutes.jsx
├── tailwind.config.cjs
└── vite.config.js





Roadmap (ce qui reste à faire)

Finaliser la partie "Formations" (inscription + affichage)

Compléter les pages événements et projets

Ajouter les validations de formulaire

Sécuriser le système d’authentification

Intégrer l’espace utilisateur complet

Optimiser le responsive design

Préparer la version PRO ultérieure


