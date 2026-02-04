<?php

namespace Database\Seeders;

use App\Models\Partenaire;
use Illuminate\Database\Seeder;

class PartenaireSeeder extends Seeder
{
    public function run(): void
    {
        $partenaires = [
            [
                'nom' => 'Ministère de la Transition Écologique',
                'description' => 'Partenaire institutionnel principal pour les projets environnementaux.',
                'logo' => 'partenaires/ministere.png',
                'site_web' => 'https://www.ministere-environnement.gov.ma',
                'type' => 'strategique',
                'ordre_affichage' => 1,
                'actif' => true
            ],
            [
                'nom' => 'Programme des Nations Unies pour le Développement',
                'description' => 'Partenaire international pour le développement durable.',
                'logo' => 'partenaires/pnud.png',
                'site_web' => 'https://www.undp.org',
                'type' => 'strategique',
                'ordre_affichage' => 2,
                'actif' => true
            ],
            [
                'nom' => 'GreenTech Maroc',
                'description' => 'Entreprise leader dans les solutions technologiques durables.',
                'logo' => 'partenaires/greentech.png',
                'site_web' => 'https://www.greentech.ma',
                'type' => 'technique',
                'ordre_affichage' => 3,
                'actif' => true
            ],
            [
                'nom' => 'Association des Jeunes pour l\'Environnement',
                'description' => 'Réseau national de jeunes engagés pour l\'environnement.',
                'logo' => 'partenaires/aje.png',
                'site_web' => 'https://www.aje.org',
                'type' => 'academique',
                'ordre_affichage' => 4,
                'actif' => true
            ]
        ];

        foreach ($partenaires as $partenaire) {
            Partenaire::firstOrCreate(
                [
                    'nom' => $partenaire['nom'],
                    'type' => $partenaire['type']
                ],
                $partenaire
            );
        }
    }
} 