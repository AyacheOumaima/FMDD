<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Paramètres des événements
    |--------------------------------------------------------------------------
    |
    | Ce fichier contient les paramètres par défaut pour la gestion des événements.
    |
    */


    /*
    |--------------------------------------------------------------------------
    | Types d'événements
    |--------------------------------------------------------------------------
    |
    | Liste des types d'événements disponibles dans l'application.
    |
    */
    'types' => [
        'gratuit' => 'Gratuit',
        'payant' => 'Payant',
    ],

    /*
    |--------------------------------------------------------------------------
    | Statuts d'inscription
    |--------------------------------------------------------------------------
    |
    | Liste des statuts possibles pour une inscription à un événement.
    |
    */
    'registration_statuses' => [
        'en attente' => 'En attente',
        'accepté' => 'Accepté',
        'refusé' => 'Refusé',
    ],

    /*
    |--------------------------------------------------------------------------
    | Statuts de paiement
    |--------------------------------------------------------------------------
    |
    | Liste des statuts possibles pour un paiement.
    |
    */
    'payment_statuses' => [
        'non_payé' => 'Non payé',
        'en attente' => 'En attente de paiement',
        'validé' => 'Paiement validé',
        'annulé' => 'Paiement annulé',
        'refusé' => 'Paiement refusé',
    ],

    /*
    |--------------------------------------------------------------------------
    | Paramètres de pagination
    |--------------------------------------------------------------------------
    |
    | Nombre d'éléments par page pour les listes d'événements.
    |
    */
    'pagination' => [
        'per_page' => 10,
    ],

    /*
    |--------------------------------------------------------------------------
    | Paramètres de paiement
    |--------------------------------------------------------------------------
    |
    | Configuration pour les paiements en ligne.
    |
    */
    'payment' => [
        'currency' => 'EUR',
        'currency_symbol' => '€',
        'payment_link_expiry_days' => 7, // Durée de validité d'un lien de paiement en jours
    ],

    /*
    |--------------------------------------------------------------------------
    | Notifications
    |--------------------------------------------------------------------------
    |
    | Configuration pour les notifications par email.
    |
    */
    'notifications' => [
        'send_emails' => true, // Activer/désactiver l'envoi d'emails
        'admin_email' => env('ADMIN_EMAIL', 'admin@example.com'),
        'from_email' => env('MAIL_FROM_ADDRESS', 'noreply@example.com'),
        'from_name' => env('MAIL_FROM_NAME', 'Événements'),
    ],
];
