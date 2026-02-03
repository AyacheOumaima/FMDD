<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $galleries = [
            [
                'titre' => 'Atelier de sensibilisation environnementale',
                'description' => 'Formation et sensibilisation sur les enjeux environnementaux',
                'image' => 'https://images.pexels.com/photos/6457515/pexels-photo-6457515.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Formations'],
                'type' => 'image',
                'ordre' => 1
            ],
            [
                'titre' => 'Projet de développement durable',
                'description' => 'Mise en œuvre de solutions durables pour l\'environnement',
                'image' => 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Projets'],
                'type' => 'image',
                'ordre' => 2
            ],
            [
                'titre' => 'Événement sur le recyclage',
                'description' => 'Sensibilisation aux pratiques de recyclage et gestion des déchets',
                'image' => 'https://images.pexels.com/photos/135019/pexels-photo-135019.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Evenements'],
                'type' => 'image',
                'ordre' => 3
            ],
            [
                'titre' => 'Session de formation interactive',
                'description' => 'Formation interactive sur les pratiques durables',
                'image' => 'https://images.pexels.com/photos/732183/pexels-photo-732183.jpeg',
                'categories' => ['Formations'],
                'type' => 'image',
                'ordre' => 4
            ],
            [
                'titre' => 'Projet communautaire innovant',
                'description' => 'Installation de panneaux solaires dans les communautés',
                'image' => 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Projets'],
                'type' => 'image',
                'ordre' => 5
            ],
            [
                'titre' => 'Conférence sur l\'économie verte',
                'description' => 'Discussion sur les opportunités de l\'économie verte',
                'image' => 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Evenements'],
                'type' => 'image',
                'ordre' => 6
            ],
            [
                'titre' => 'Atelier pratique en développement durable',
                'description' => 'Formation pratique sur les principes du développement durable',
                'image' => 'https://images.pexels.com/photos/7641829/pexels-photo-7641829.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Formations'],
                'type' => 'image',
                'ordre' => 7
            ],
            [
                'titre' => 'Présentation d\'un projet écologique',
                'description' => 'Présentation des résultats d\'un projet environnemental',
                'image' => 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Projets'],
                'type' => 'image',
                'ordre' => 8
            ],
            [
                'titre' => 'Rassemblement pour l\'économie circulaire',
                'description' => 'Événement dédié à la promotion de l\'économie circulaire',
                'image' => 'https://images.pexels.com/photos/3182835/pexels-photo-3182835.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Evenements'],
                'type' => 'image',
                'ordre' => 9
            ],
            [
                'titre' => 'Formation sur les énergies renouvelables',
                'description' => 'Session de formation sur les différentes sources d\'énergie renouvelable',
                'image' => 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
                'categories' => ['Formations'],
                'type' => 'image',
                'ordre' => 10
            ]
        ];

        $slugs = [];
        foreach ($galleries as $gallery) {
            $slug = Str::slug($gallery['titre']);
            // Si le slug existe déjà, on ajoute un suffixe unique
            $originalSlug = $slug;
            $i = 2;
            while (in_array($slug, $slugs)) {
                $slug = $originalSlug . '-' . $i;
                $i++;
            }
            $slugs[] = $slug;
            Gallery::create(array_merge($gallery, [
                'slug' => $slug,
                'actif' => true
            ]));
        }
    }
}