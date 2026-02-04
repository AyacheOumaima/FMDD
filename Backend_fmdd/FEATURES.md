# FMDD Backend - Suivi des Fonctionnalités

## 1. Structure du Projet
- [x] Initialisation du projet Laravel 10
- [x] Configuration de base (.env.example)
- [x] Configuration des dépendances

## 2. Base de Données & Models
- [ ] Migration des tables depuis db_dd.sql
- [ ] Création des Models Eloquent avec relations
- [ ] Seeders pour données initiales

## 3. API Routes & Controllers
### Routes Publiques
- [ ] GET /api/v1/home
- [ ] GET /api/v1/about
- [ ] POST /api/v1/contact
- [ ] GET /api/v1/gallery
- [ ] GET /api/v1/blog
- [ ] POST /api/v1/newsletter
- [ ] GET /api/v1/courses + /{id}
- [ ] GET /api/v1/events + /{id}
- [ ] GET /api/v1/projects + /{id}
- [ ] POST /api/v1/projects/{id}/sponsor
- [ ] POST /api/v1/projects/{id}/soutien
- [ ] POST /api/v1/projects/{id}/partenariat
- [ ] POST /api/v1/events/{id}/sponsor
- [ ] POST /api/v1/events/{id}/benevole
- [ ] POST /api/v1/events/{id}/participation

### Routes Authentifiées
- [ ] POST /api/v1/courses/{id}/enroll
- [ ] POST /api/v1/events/{id}/participate
- [ ] POST /api/v1/projects/{id}/volunteer
- [ ] POST /api/v1/testimonials
- [ ] GET /api/v1/user/dashboard

### Routes Admin
- [ ] CRUD Users
- [ ] CRUD Courses
- [ ] CRUD Events
- [ ] CRUD Projects
- [ ] CRUD Blog
- [ ] CRUD Gallery
- [ ] CRUD Testimonials
- [ ] Statistiques

## 4. Authentification
- [x] Configuration Sanctum/JWT
- [ ] POST /api/v1/auth/register
- [ ] POST /api/v1/auth/login
- [ ] POST /api/v1/auth/logout
- [ ] POST /api/v1/auth/refresh

## 5. Sécurité
- [x] Configuration CORS
- [x] Configuration CSRF
- [ ] Rate Limiting
- [ ] Form Requests pour validation
- [ ] Policies et Gates
- [ ] Headers de sécurité
- [ ] Exception Handler JSON
- [x] Configuration Logging

## 6. Documentation
- [ ] README.md
- [ ] PHPDoc
- [ ] Documentation API
- [ ] Exemples de réponses JSON 