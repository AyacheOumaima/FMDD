<?php

namespace Database\Seeders;

use App\Models\Histoire;
use Illuminate\Database\Seeder;

class HistoireSeeder extends Seeder
{
    public function run(): void
    {
        $evenements = [
            [
                'titre' => 'Création de la FMDD',
                'description' => 'Fondation de la Fondation Marocaine pour le Développement Durable par un groupe d\'experts et de passionnés.',
                'date_evenement' => '2020-01-15',
                'image' => 'histoire/creation.jpg',
                'ordre_affichage' => 1,
                'actif' => true
            ],
            [
                'titre' => 'Premier Projet Majeur',
                'description' => 'Lancement du premier projet d\'envergure : "Villes Vertes Maroc" dans trois villes pilotes.',
                'date_evenement' => '2020-06-01',
                'image' => 'histoire/projet1.jpg',
                'ordre_affichage' => 2,
                'actif' => true
            ],
            [
                'titre' => 'Partenariat International',
                'description' => 'Signature d\'un accord de partenariat majeur avec le Programme des Nations Unies pour le Développement (PNUD).',
                'date_evenement' => '2021-03-20',
                'image' => 'histoire/partenariat.jpg',
                'ordre_affichage' => 3,
                'actif' => true
            ],
            [
                'titre' => 'Prix de l\'Innovation Durable',
                'description' => 'La FMDD reçoit le prix national de l\'innovation pour ses solutions durables.',
                'date_evenement' => '2022-11-10',
                'image' => 'histoire/prix.jpg',
                'ordre_affichage' => 4,
                'actif' => true
            ],
            [
                'titre' => 'Extension Nationale',
                'description' => 'Ouverture de bureaux régionaux dans 5 grandes villes du Maroc.',
                'date_evenement' => '2023-09-01',
                'image' => 'histoire/extension.jpg',
                'ordre_affichage' => 5,
                'actif' => true
            ]
        ];

        foreach ($evenements as $evenement) {
            Histoire::firstOrCreate(
                [
                    'titre' => $evenement['titre'],
                    'date_evenement' => $evenement['date_evenement']
                ],
                $evenement
            );
        }
    }
} 