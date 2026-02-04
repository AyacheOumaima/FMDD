<?php

namespace Database\Seeders;

use App\Models\EquipeFmdd;
use Illuminate\Database\Seeder;

class EquipeFmddSeeder extends Seeder
{
    public function run(): void
    {
        $membres = [
            [
                'nom' => 'Essafi',
                'prenom' => 'Naim',
                'poste' => 'Président',
                'bio' => 'Président du FMDD',
                'photo' => 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
                'email' => 'president@fmdd.ma',
                'telephone' => null,
                'reseaux_sociaux' => json_encode([
                    'linkedin' => '#'
                ]),
                'ordre_affichage' => 1,
                'actif' => true
            ],
            [
                'nom' => 'El Amrani',
                'prenom' => 'Fatima Zahra',
                'poste' => 'Directrice Exécutive',
                'bio' => 'Directrice Exécutive du FMDD',
                'photo' => 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=600',
                'email' => 'direction@fmdd.ma',
                'telephone' => null,
                'reseaux_sociaux' => json_encode([
                    'linkedin' => '#'
                ]),
                'ordre_affichage' => 2,
                'actif' => true
            ],
            [
                'nom' => 'Benkirane',
                'prenom' => 'Youssef',
                'poste' => 'Responsable Projets',
                'bio' => 'Responsable des projets au FMDD',
                'photo' => 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
                'email' => 'projets@fmdd.ma',
                'telephone' => null,
                'reseaux_sociaux' => json_encode([
                    'linkedin' => '#'
                ]),
                'ordre_affichage' => 3,
                'actif' => true
            ],
            [
                'nom' => 'Mansouri',
                'prenom' => 'Leila',
                'poste' => 'Responsable Formation',
                'bio' => 'Responsable de la formation au FMDD',
                'photo' => 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
                'email' => 'formation@fmdd.ma',
                'telephone' => null,
                'reseaux_sociaux' => json_encode([
                    'linkedin' => '#'
                ]),
                'ordre_affichage' => 4,
                'actif' => true
            ]
        ];

        foreach ($membres as $membre) {
            EquipeFmdd::firstOrCreate(
                [
                    'nom' => $membre['nom'],
                    'prenom' => $membre['prenom'],
                    'email' => $membre['email']
                ],
                $membre
            );
        }
    }
} 