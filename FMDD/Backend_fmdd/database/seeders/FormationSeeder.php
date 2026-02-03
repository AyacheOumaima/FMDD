<?php

namespace Database\Seeders;

use App\Models\Formation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     $formations = [
            [
                'titre' => "Gestion durable des ressources en eau",
                'description' => "Cette formation offre une introduction complète aux pratiques durables en gestion des ressources en eau. Programme : Introduction aux enjeux, Gestion et optimisation, Études de cas.",
                'date_debut' => '2025-09-10',
                'date_fin' => '2025-10-15',
                'prix' => 750.00,
                'image' => "https://images.pexels.com/photos/1774218/pexels-photo-1774218.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            [
                'titre' => "Entrepreneuriat vert et économie circulaire",
                'description' => "Développez vos compétences en entrepreneuriat vert afin de promouvoir des modèles économiques circulaires.",
                'date_debut' => '2025-10-05',
                'date_fin' => '2025-11-20',
                'prix' => 950.00,
                'image' => "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            [
                'titre' => "Initiation au développement durable",
                'description' => "Un parcours d'introduction idéal pour découvrir les fondamentaux du développement durable.",
                'date_debut' => '2025-09-01',
                'date_fin' => '2025-09-30',
                'prix' => 0.00,
                'image' => "https://images.pexels.com/photos/7641829/pexels-photo-7641829.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            [
                'titre' => "Énergies renouvelables : technologies et applications",
                'description' => "Plongez dans les technologies des énergies renouvelables et leurs multiples applications pratiques.",
                'date_debut' => '2025-10-15',
                'date_fin' => '2025-11-30',
                'prix' => 850.00,
                'image' => "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=600"
            ],
            [
                'titre' => "Agriculture biologique et agroécologie",
                'description' => "Formation pratique dédiée à l'agriculture biologique et aux principes de l'agroécologie.",
                'date_debut' => '2025-11-01',
                'date_fin' => '2025-12-20',
                'prix' => 0.00,
                'image' => "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=600"
            ]
        ];

        foreach ($formations as $f) {
            Formation::create($f);
        }
    }
}
