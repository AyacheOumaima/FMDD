<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Projet;
use Illuminate\Support\Str;

class ProjetSeeder extends Seeder
{
    public function run(): void
    {
        $projets = [
            [
                'titre_projet' => 'Projet Eau Solidaire',
                'description_projet' => 'Fournir de l’eau potable à un village isolé.',
                'theme' => 'Solidarité',
                'date_projet' => now()->subMonths(2),
                'statut_projet' => 'en cours',
                'image' => 'https://placehold.co/600x400',
                'description_detaillee' => 'Installation de puits et sensibilisation.',
                'organisateur' => 'Association Eau Pour Tous',
                'localisation' => 'Ouarzazate',
                'duree' => '6 mois',
                'image_partenaire' => null,
                'objectif_projet' => 'Améliorer l’accès à l’eau.',
                'grande_description' => 'Projet d’envergure régionale.',
            ],
            [
                'titre_projet' => 'Projet Éducation Numérique',
                'description_projet' => 'Former les jeunes au numérique.',
                'theme' => 'Éducation',
                'date_projet' => now()->subMonths(1),
                'statut_projet' => 'à venir',
                'image' => 'https://placehold.co/600x400',
                'description_detaillee' => 'Ateliers et dotation en matériel.',
                'organisateur' => 'Fondation Jeunesse',
                'localisation' => 'Casablanca',
                'duree' => '3 mois',
                'image_partenaire' => null,
                'objectif_projet' => 'Réduire la fracture numérique.',
                'grande_description' => 'Projet pilote pour 2025.',
            ]
        ];
        foreach ($projets as $projet) {
            Projet::create($projet);
        }
    }
}
