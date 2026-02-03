<?php

return [
    'event' => [
        'created' => 'Événement créé avec succès.',
        'updated' => 'Événement mis à jour avec succès.',
        'deleted' => 'Événement supprimé avec succès.',
        'not_found' => 'Événement non trouvé.',
        'registration_closed' => 'Les inscriptions pour cet événement sont fermées.',
        'registration_not_open' => 'Les inscriptions pour cet événement ne sont pas encore ouvertes.',
        'registration_full' => 'Désolé, il n\'y a plus de places disponibles pour cet événement.',
        'already_registered' => 'Vous êtes déjà inscrit à cet événement.',
        'registration_success' => 'Votre inscription a été enregistrée avec succès.',
        'registration_pending' => 'Votre inscription est en attente de validation par un administrateur.',
        'registration_approved' => 'Votre inscription a été approuvée.',
        'registration_rejected' => 'Votre inscription a été refusée.',
    ],
    
    'registration' => [
        'not_found' => 'Inscription non trouvée.',
        'status_updated' => 'Statut de l\'inscription mis à jour avec succès.',
        'payment_link_sent' => 'Lien de paiement envoyé avec succès.',
        'payment_required' => 'Un paiement est requis pour finaliser votre inscription.',
        'payment_pending' => 'Paiement en attente de validation.',
        'payment_completed' => 'Paiement effectué avec succès.',
        'payment_failed' => 'Le paiement a échoué. Veuillez réessayer.',
        'already_paid' => 'Cette inscription a déjà été payée.',
    ],
    
    'validation' => [
        'full_name_required' => 'Le nom complet est requis.',
        'email_required' => 'L\'adresse email est requise.',
        'email_email' => 'L\'adresse email doit être une adresse valide.',
        'phone_required' => 'Le numéro de téléphone est requis.',
        'event_required' => 'L\'événement est requis.',
        'event_exists' => 'L\'événement sélectionné est invalide.',
    ],
    
    'emails' => [
        'greeting' => 'Bonjour :name,',
        'regards' => 'Cordialement,',
        'team' => 'L\'équipe :app_name',
        'footer' => '© :year :app_name. Tous droits réservés.',
        'trouble_clicking_button' => 'Si vous avez des difficultés à cliquer sur le bouton ":actionText", copiez et collez l\'URL ci-dessous dans votre navigateur web:',
    ],
];
