# Système de Gestion des Événements - Documentation Complète

Ce document décrit en détail le système de gestion des événements, son architecture, son workflow et les points d'API disponibles.

## Table des Matières

1. [Architecture du Système](#architecture-du-système)
2. [Workflow Complet](#workflow-complet)
3. [API Documentation](#api-documentation)
4. [Configuration Requise](#configuration-requise)
5. [Sécurité](#sécurité)
6. [Extensions Futures](#extensions-futures)

## Architecture du Système

### Modèles de Données

#### 1. Modèle Event
Représente un événement avec les propriétés suivantes :
- Informations générales (titre, description)
- Dates et lieux (date, heure, lieu, ville)
- Configuration (type d'événement, prix, limite de places)
- Gestion des inscriptions (dates d'ouverture/fermeture, nombre d'inscrits)

#### 2. Modèle EventRegistration
Gère les inscriptions des utilisateurs avec :
- Informations personnelles (nom, email, téléphone)
- Statuts (inscription, paiement)
- Relations (utilisateur, événement)

### Contrôleurs

1. **EventController**
   - Gestion CRUD des événements
   - Liste des événements avec filtres
   - Détails d'un événement

2. **EventRegistrationController**
   - Inscription aux événements
   - Gestion des inscriptions utilisateur
   - Vérification des statuts

3. **AdminEventController**
   - Validation/refus des inscriptions
   - Gestion des listes d'attente
   - Statistiques

4. **PaymentController**
   - Initialisation des paiements
   - Gestion des webhooks
   - Vérification des statuts

## Workflow Complet

### 1. Consultation des Événements
- **Endpoint**: `GET /api/events`
- **Filtres disponibles** :
  - Type d'événement (gratuit/payant)
  - Recherche par mot-clé
  - Pagination

### 2. Inscription à un Événement

#### Pour les Membres (is_adherent = true)
1. Inscription directe
2. Statut : Accepté automatiquement
3. Si événement payant → Lien de paiement immédiat

#### Pour les Non-Membres
1. Soumission du formulaire
2. Statut : En attente de validation admin
3. Après validation → Lien de paiement (si payant)

### 3. Processus de Paiement
1. Initialisation du paiement
2. Redirection vers la passerelle
3. Retour et confirmation
4. Mise à jour du statut

### 4. Administration
1. Vue des inscriptions en attente
2. Validation/Refus manuel
3. Gestion des places
4. Suivi des paiements

## API Documentation

*[La documentation précédente des endpoints API reste inchangée ici...]*

## Configuration Requise

### Variables d'Environnement

```env
# Configuration Email
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email@example.com
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="${APP_NAME}"
ADMIN_EMAIL=admin@example.com

# Configuration Base de Données
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Fichier de Configuration

`config/events.php` contient les paramètres globaux :
- Types d'événements
- Statuts d'inscription
- Paramètres de pagination
- Configuration des paiements
- Paramètres de notification

## Sécurité

### Mesures Implémentées
1. Authentification par token (Sanctum)
2. Middleware d'administration
3. Validation des données
4. Protection CSRF
5. Gestion des rôles

### Bonnes Pratiques
- Toujours utiliser HTTPS
- Limiter les tentatives de connexion
- Journaliser les activités sensibles
- Mettre à jour régulièrement les dépendances

## Extensions Futures

1. **Intégration de Paiement**
   - Stripe
   - PayPal
   - Virement bancaire

2. **Fonctionnalités Avancées**
   - Liste d'attente automatique
   - Codes promo
   - Certificats de participation
   - Export des données

3. **Améliorations**
   - Tableau de bord administrateur
   - Rappels automatiques
   - Système de parrainage
   - Intégration calendrier

## Support

Pour toute question ou problème, veuillez contacter l'équipe technique à support@example.com.

## Table des matières

1. [Authentification](#authentification)
2. [Liste des événements](#liste-des-événements)
3. [Détails d'un événement](#détails-dun-événement)
4. [S'inscrire à un événement](#sinscrire-à-un-événement)
5. [Mes inscriptions](#mes-inscriptions)
6. [Paiement](#paiement)
7. [Administration](#administration)

## Authentification

Toutes les routes, sauf mention contraire, nécessitent une authentification via un token Bearer.

```
Authorization: Bearer VOTRE_TOKEN_ICI
```

## Liste des événements

### GET /api/events

Récupère la liste des événements à venir avec pagination.

#### Paramètres de requête

- `per_page` (optionnel): Nombre d'éléments par page (défaut: 10)
- `page` (optionnel): Numéro de page (défaut: 1)
- `type` (optionnel): Filtrer par type (`gratuit` ou `payant`)
- `search` (optionnel): Terme de recherche dans le titre et la description

#### Réponse

```json
{
    "data": [
        {
            "id": 1,
            "titre": "Événement de test",
            "description": "Description de l'événement",
            "date": "2025-07-15",
            "heure": "19:00:00",
            "lieu": "Paris",
            "ville": "Paris",
            "type_evenement": "payant",
            "prix": 25.5,
            "limite_de_places": 100,
            "nombre_inscrits": 42,
            "date_ouverture_inscription": "2025-01-01",
            "date_fermeture_inscription": "2025-07-10",
            "is_registration_open": true,
            "places_restantes": 58,
            "user_registered": false
        }
    ],
    "links": {
        "first": "http://example.com/api/events?page=1",
        "last": "http://example.com/api/events?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "path": "http://example.com/api/events",
        "per_page": 10,
        "to": 1,
        "total": 1
    }
}
```

## Détails d'un événement

### GET /api/events/{id}

Récupère les détails d'un événement spécifique.

#### Réponse

```json
{
    "id": 1,
    "titre": "Événement de test",
    "description": "Description de l'événement",
    "date": "2025-07-15",
    "heure": "19:00:00",
    "lieu": "Salle des fêtes",
    "ville": "Paris",
    "type_evenement": "payant",
    "prix": 25.5,
    "limite_de_places": 100,
    "nombre_inscrits": 42,
    "date_ouverture_inscription": "2025-01-01",
    "date_fermeture_inscription": "2025-07-10",
    "is_registration_open": true,
    "places_restantes": 58,
    "user_registered": false
}
```

## S'inscrire à un événement

### POST /api/events/{event}/register

Permet à un utilisateur de s'inscrire à un événement.

#### Corps de la requête

```json
{
    "full_name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "telephone": "0612345678"
}
```

#### Réponse en cas de succès (201)

```json
{
    "message": "Votre inscription a été enregistrée avec succès.",
    "registration": {
        "id": 1,
        "event_id": 1,
        "user_id": 1,
        "full_name": "Jean Dupont",
        "email": "jean.dupont@example.com",
        "telephone": "0612345678",
        "statut": "accepté",
        "statut_paiement": "non_payé",
        "created_at": "2025-06-05T12:00:00.000000Z",
        "updated_at": "2025-06-05T12:00:00.000000Z"
    }
}
```

## Mes inscriptions

### GET /api/events/my/registrations

Récupère la liste des inscriptions de l'utilisateur connecté.

#### Réponse

```json
{
    "data": [
        {
            "id": 1,
            "event_id": 1,
            "user_id": 1,
            "full_name": "Jean Dupont",
            "email": "jean.dupont@example.com",
            "telephone": "0612345678",
            "statut": "accepté",
            "statut_paiement": "non_payé",
            "created_at": "2025-06-05T12:00:00.000000Z",
            "updated_at": "2025-06-05T12:00:00.000000Z",
            "event": {
                "id": 1,
                "titre": "Événement de test",
                "date": "2025-07-15",
                "heure": "19:00:00",
                "lieu": "Salle des fêtes",
                "ville": "Paris"
            }
        }
    ]
}
```

## Paiement

### POST /api/events/payments/{registration}/initiate

Initialise un paiement pour une inscription à un événement payant.

#### Réponse en cas de succès (200)

```json
{
    "message": "Paiement initialisé avec succès",
    "payment_reference": "PAY-ABC123DEF4",
    "amount": 25.5,
    "currency": "EUR",
    "description": "Inscription à l'événement: Événement de test",
    "payment_url": "https://payment-gateway.example.com/pay/PAY-ABC123DEF4"
}
```

### GET /api/events/payments/status/{paymentReference}

Vérifie le statut d'un paiement.

#### Réponse

```json
{
    "payment_reference": "PAY-ABC123DEF4",
    "status": "succeeded",
    "paid_at": "2025-06-05 12:05:00",
    "amount": 25.5,
    "currency": "EUR"
}
```

## Administration

### GET /api/admin/events/pending-registrations

Liste des inscriptions en attente de validation (admin uniquement).

#### Réponse

```json
{
    "data": [
        {
            "id": 1,
            "event_id": 1,
            "user_id": 2,
            "full_name": "Marie Martin",
            "email": "marie.martin@example.com",
            "telephone": "0698765432",
            "statut": "en attente",
            "statut_paiement": "non_payé",
            "created_at": "2025-06-05T12:00:00.000000Z",
            "updated_at": "2025-06-05T12:00:00.000000Z",
            "event": {
                "id": 1,
                "titre": "Événement de test",
                "date": "2025-07-15"
            }
        }
    ]
}
```

### PUT /api/admin/registrations/{registration}/status

Met à jour le statut d'une inscription (admin uniquement).

#### Corps de la requête

```json
{
    "statut": "accepté"
}
```

#### Réponse en cas de succès (200)

```json
{
    "message": "Statut de l'inscription mis à jour avec succès",
    "registration": {
        "id": 1,
        "statut": "accepté",
        "statut_paiement": "en attente",
        "updated_at": "2025-06-05T12:15:00.000000Z"
    }
}
```

### POST /api/admin/registrations/{registration}/send-payment-link

Envoie un lien de paiement à l'utilisateur (admin uniquement).

#### Réponse en cas de succès (200)

```json
{
    "message": "Lien de paiement envoyé avec succès",
    "payment_link": "https://payment-gateway.example.com/pay/PAY-ABC123DEF4"
}
```
