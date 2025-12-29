# FMDD - Forum Marocain pour le Développement Durable

## À propos
Le Forum Marocain pour le Développement Durable (FMDD) est une plateforme web moderne développée avec Laravel (backend) et React (frontend) qui vise à promouvoir et faciliter les discussions autour du développement durable au Maroc.

## Fonctionnalités Principales

### Blog
- Articles sur le développement durable
- Système de tags et catégories
- Compteur de vues
- Partage sur les réseaux sociaux
- Articles similaires
- Temps de lecture estimé
- Interface responsive et moderne

## Configuration Technique

### Prérequis
- PHP >= 8.1
- Node.js >= 14.x
- MySQL >= 8.0
- Composer
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone [url-du-projet]
cd fmdd
```

2. **Backend (Laravel)**
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
```

3. **Frontend (React)**
```bash
cd frontend
npm install
cp .env.example .env
```

4. **Configuration des variables d'environnement**

Backend (.env):
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fmdd
DB_USERNAME=root
DB_PASSWORD=

CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### Démarrage

1. **Backend**
```bash
php artisan serve
```

2. **Frontend**
```bash
npm start
```

L'application sera accessible sur :
- Frontend : http://localhost:3000
- Backend API : http://localhost:8000

## Documentation
- [Documentation API](./docs/API.md)
- [Guide de Développement](./docs/DEVELOPMENT.md)
- [Guide de Contribution](./docs/CONTRIBUTING.md)

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
