<?php

namespace Database\Seeders;

use App\Models\Objectif;
use Illuminate\Database\Seeder;

class ObjectifSeeder extends Seeder
{
    public function run(): void
    {
        $objectifs = [
            [
                'titre' => 'Accompagnement',
                'description' => 'Aider les individus et organisations dans leurs projets de développement durable.',
                'icone' => 'users',
                'ordre_affichage' => 1,
                'actif' => true
            ],
            [
                'titre' => 'Orientation',
                'description' => 'Guider les jeunes et professionnels vers des carrières durables.',
                'icone' => 'compass',
                'ordre_affichage' => 2,
                'actif' => true
            ],
            [
                'titre' => 'Formation',
                'description' => 'Offrir des programmes éducatifs pour promouvoir les compétences durables.',
                'icone' => 'book-open',
                'ordre_affichage' => 3,
                'actif' => true
            ],
            [
                'titre' => 'Durabilité',
                'description' => 'Promouvoir des pratiques respectueuses de l\'environnement.',
                'icone' => 'leaf',
                'ordre_affichage' => 4,
                'actif' => true
            ],
            [
                'titre' => 'Workshop',
                'description' => 'Organiser des ateliers pratiques pour le développement des compétences.',
                'icone' => 'hammer',
                'ordre_affichage' => 5,
                'actif' => true
            ],
            [
                'titre' => 'Coaching',
                'description' => 'Accompagner les individus pour atteindre leurs objectifs professionnels.',
                'icone' => 'user-check',
                'ordre_affichage' => 6,
                'actif' => true
            ],
            [
                'titre' => 'Financement',
                'description' => 'Soutenir financièrement des initiatives durables.',
                'icone' => 'dollar-sign',
                'ordre_affichage' => 7,
                'actif' => true
            ]
        ];

        foreach ($objectifs as $objectif) {
            Objectif::firstOrCreate(
                ['titre' => $objectif['titre']],
                $objectif
            );
        }
    }
} 