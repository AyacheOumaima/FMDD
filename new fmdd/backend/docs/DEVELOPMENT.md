# Guide de Développement FMDD

## Structure du Projet

### Backend (Laravel)

```
├── app
│   ├── Http
│   │   ├── Controllers
│   │   │   └── BlogController.php
│   │   └── Resources
│   │       └── BlogResource.php
│   └── Models
│       └── Blog.php
├── database
│   ├── migrations
│   │   └── 2024_03_20_create_blogs_table.php
│   └── seeders
│       └── BlogSeeder.php
└── routes
    └── api.php
```

### Frontend (React)

```
├── src
│   ├── components
│   │   └── BlogCard.jsx
│   ├── pages
│   │   └── BlogArticlePage.jsx
│   └── services
│       └── api.js
```

## Conventions de Code

### Backend (Laravel)

1. **Modèles**
   - Noms en singulier et PascalCase
   - Définir les propriétés fillable/guarded
   - Documenter les relations et les attributs

```php
class Blog extends Model
{
    protected $fillable = [
        'titre',
        'slug',
        'contenu',
        // ...
    ];

    protected $casts = [
        'tags' => 'array',
        'date_publication' => 'datetime',
    ];
}
```

2. **Controllers**
   - Suivre les conventions RESTful
   - Utiliser les Form Requests pour la validation
   - Retourner des API Resources

```php
class BlogController extends Controller
{
    public function index(Request $request)
    {
        $blogs = Blog::query()
            ->when($request->search, function($query, $search) {
                $query->where('titre', 'like', "%{$search}%");
            })
            ->paginate();

        return BlogResource::collection($blogs);
    }
}
```

3. **Migrations**
   - Noms descriptifs
   - Inclure les méthodes up() et down()
   - Utiliser les types de colonnes appropriés

```php
public function up()
{
    Schema::create('blogs', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained();
        $table->string('titre');
        $table->string('slug')->unique();
        // ...
        $table->timestamps();
        $table->softDeletes();
    });
}
```

### Frontend (React)

1. **Components**
   - Un composant par fichier
   - Utiliser les hooks React
   - Props typées avec PropTypes ou TypeScript

```javascript
import PropTypes from 'prop-types';

function BlogCard({ title, excerpt, date }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{excerpt}</p>
            <span>{date}</span>
        </div>
    );
}

BlogCard.propTypes = {
    title: PropTypes.string.required,
    excerpt: PropTypes.string,
    date: PropTypes.string
};
```

2. **Styles**
   - Utiliser Tailwind CSS
   - Classes utilitaires pour le styling
   - BEM pour les classes personnalisées

3. **État et Effets**
   - Utiliser les hooks (useState, useEffect)
   - Gérer proprement le nettoyage des effets
   - Éviter les dépendances circulaires

```javascript
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/blog');
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);
```

## Tests

### Backend

```bash
# Exécuter tous les tests
php artisan test

# Exécuter un test spécifique
php artisan test --filter=BlogTest
```

### Frontend

```bash
# Exécuter les tests
npm test

# Mode watch
npm test -- --watch
```

## Déploiement

1. **Préparation**
```bash
# Backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Frontend
npm run build
```

2. **Variables d'environnement**
   - Configurer les variables de production
   - Sécuriser les clés API
   - Configurer les URLs de production

3. **Base de données**
```bash
php artisan migrate --force
```

## Bonnes Pratiques

1. **Sécurité**
   - Valider toutes les entrées utilisateur
   - Utiliser HTTPS en production
   - Implémenter CSRF protection
   - Sanitizer les sorties HTML

2. **Performance**
   - Mettre en cache les réponses API
   - Optimiser les requêtes SQL
   - Lazy loading des images
   - Code splitting React

3. **Maintenance**
   - Documenter les changements majeurs
   - Suivre les conventions de commit
   - Maintenir les dépendances à jour
   - Backup régulier des données 