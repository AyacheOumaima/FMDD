<?php

namespace Database\Seeders;

use App\Models\Apropos;
use Illuminate\Database\Seeder;

class AproposSeeder extends Seeder
{
    public function run(): void
    {
        Apropos::firstOrCreate(
            ['titre' => 'À propos de FMDD'],
            [
                'description' => 'La Fondation Marocaine pour le Développement Durable (FMDD) est une organisation à but non lucratif dédiée à la promotion du développement durable au Maroc.',
                'mission' => 'Notre mission est de catalyser et accompagner la transition du Maroc vers un développement durable en mobilisant tous les acteurs de la société.',
                'vision' => 'Notre vision est celle d\'un Maroc prospère où le développement économique s\'harmonise avec la préservation de l\'environnement et le progrès social.',
                'valeurs' => 'Engagement, Innovation, Collaboration, Transparence, Excellence',
                'image_principale' => 'apropos/main-image.jpg',
                'meta_data' => json_encode([
                    'annee_creation' => '2020',
                    'nombre_projets' => '50+',
                    'beneficiaires' => '10000+',
                    'partenaires' => '30+'
                ])
            ]
        );
    }
} 