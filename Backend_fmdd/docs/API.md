# Documentation API FMDD

## Base URL
```
http://localhost:8000/api/v1
```

## Authentification
Toutes les requêtes doivent inclure un token JWT dans l'en-tête Authorization.

```
Authorization: Bearer <votre-token>
```

## Endpoints Blog

### Récupérer tous les articles
```http
GET /blog
```

#### Paramètres de requête
| Paramètre | Type | Description |
|-----------|------|-------------|
| page | number | Numéro de page (défaut: 1) |
| per_page | number | Nombre d'articles par page (défaut: 10) |
| search | string | Terme de recherche |
| tags | array | Filtrer par tags |
| sort | string | Trier par ('date', 'views', 'title') |
| order | string | Ordre de tri ('asc', 'desc') |

#### Réponse
```json
{
  "data": [
    {
      "id": 1,
      "titre": "Titre de l'article",
      "slug": "titre-de-l-article",
      "resume": "Résumé de l'article",
      "contenu": "Contenu de l'article",
      "image_principale": "url/vers/image.jpg",
      "tags": ["tag1", "tag2"],
      "date_publication": "2024-03-20T12:00:00Z",
      "temps_lecture": 5,
      "vues": 100,
      "user": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 50
  }
}
```

### Récupérer un article spécifique
```http
GET /blog/{id}
```

#### Réponse
```json
{
  "data": {
    "id": 1,
    "titre": "Titre de l'article",
    "slug": "titre-de-l-article",
    "resume": "Résumé de l'article",
    "contenu": "Contenu de l'article",
    "image_principale": "url/vers/image.jpg",
    "tags": ["tag1", "tag2"],
    "date_publication": "2024-03-20T12:00:00Z",
    "temps_lecture": 5,
    "vues": 100,
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe"
    }
  }
}
```

### Récupérer les articles similaires
```http
GET /blog/related/{id}
```

#### Réponse
```json
{
  "data": [
    {
      "id": 2,
      "titre": "Article similaire",
      "slug": "article-similaire",
      "resume": "Résumé de l'article similaire",
      "image_principale": "url/vers/image.jpg",
      "date_publication": "2024-03-20T12:00:00Z"
    }
  ]
}
```

### Incrémenter le compteur de vues
```http
POST /blog/{id}/view
```

#### Réponse
```json
{
  "success": true,
  "vues": 101
}
```

### Récupérer tous les tags
```http
GET /blog/tags
```

#### Réponse
```json
{
  "data": [
    "Développement Durable",
    "Environnement",
    "Innovation",
    "Maroc"
  ]
}
```

## Codes d'erreur

| Code | Description |
|------|-------------|
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Ressource non trouvée |
| 422 | Erreur de validation |
| 500 | Erreur serveur | 