<?php

namespace Database\Seeders;

use App\Models\ServiceProfil;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceProfilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'profil' => 'Étudiants',
                'services_offerts' => json_encode([
                    'Formations gratuites',
                    'Ateliers pratiques',
                    'Stages et opportunités'
                ]),
                'modalites_acces' => 'Inscription simple avec email étudiant',
                'ordre_affichage' => 1,
                'actif' => true
            ],
            [
                'profil' => 'Non-abonnés',
                'services_offerts' => json_encode([
                    'Contenu informationnel',
                    'Formations basiques',
                    'Participation aux événements'
                ]),
                'modalites_acces' => 'Inscription gratuite',
                'ordre_affichage' => 2,
                'actif' => true
            ],
            [
                'profil' => 'Abonnés',
                'services_offerts' => json_encode([
                    'Formations avancées',
                    'Certification professionnelle',
                    'Accès privilégié aux experts'
                ]),
                'modalites_acces' => 'Cotisation annuelle',
                'ordre_affichage' => 3,
                'actif' => true
            ],
            [
                'profil' => 'Institutions & Entreprises',
                'services_offerts' => json_encode([
                    'Formations sur mesure',
                    'Conseil et expertise',
                    'Partenariats sur projets'
                ]),
                'modalites_acces' => 'Conventions de partenariat personnalisées',
                'ordre_affichage' => 4,
                'actif' => true
            ]
        ];

        foreach ($services as $service) {
            ServiceProfil::firstOrCreate(
                ['profil' => $service['profil']],
                $service
            );
        }
    }
}
