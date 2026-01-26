<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Adherent;
use Carbon\Carbon;

class AdherentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer des utilisateurs adhérents avec différents statuts
        $adherents = [
            [
                'username' => 'adherent_actif',
                'email' => 'adherent.actif@example.com',
                'password' => bcrypt('password123'),
                'role' => User::ROLE_ADHERENT,
                'first_name' => 'Jean',
                'last_name' => 'Actif',
                'phone' => '0600000001',
                'adherent_data' => [
                    'statut_cotisation' => Adherent::STATUT_PAYEE,
                    'date_debut_adhesion' => Carbon::now(),
                    'date_fin_adhesion' => Carbon::now()->addYear(),
                    'notes' => 'Adhérent avec cotisation payée'
                ]
            ],
            [
                'username' => 'adherent_attente',
                'email' => 'adherent.attente@example.com',
                'password' => bcrypt('password123'),
                'role' => User::ROLE_ADHERENT,
                'first_name' => 'Marie',
                'last_name' => 'Attente',
                'phone' => '0600000002',
                'adherent_data' => [
                    'statut_cotisation' => Adherent::STATUT_EN_ATTENTE,
                    'notes' => 'Adhérent en attente de paiement'
                ]
            ],
            [
                'username' => 'adherent_expire',
                'email' => 'adherent.expire@example.com',
                'password' => bcrypt('password123'),
                'role' => User::ROLE_ADHERENT,
                'first_name' => 'Pierre',
                'last_name' => 'Expiré',
                'phone' => '0600000003',
                'adherent_data' => [
                    'statut_cotisation' => Adherent::STATUT_EXPIREE,
                    'date_debut_adhesion' => Carbon::now()->subYear(),
                    'date_fin_adhesion' => Carbon::now()->subMonth(),
                    'notes' => 'Adhérent avec cotisation expirée'
                ]
            ],
            [
                'username' => 'adherent_renouvellement',
                'email' => 'adherent.renouvellement@example.com',
                'password' => bcrypt('password123'),
                'role' => User::ROLE_ADHERENT,
                'first_name' => 'Sophie',
                'last_name' => 'Renouvellement',
                'phone' => '0600000004',
                'adherent_data' => [
                    'statut_cotisation' => Adherent::STATUT_EXPIREE,
                    'date_debut_adhesion' => Carbon::now()->subYear(),
                    'date_fin_adhesion' => Carbon::now()->subDay(),
                    'notes' => 'Adhérent nécessitant un renouvellement'
                ]
            ]
        ];

        foreach ($adherents as $adherentData) {
            $adherentUserData = collect($adherentData)->except('adherent_data')->toArray();
            $user = User::create($adherentUserData);

            $user->adherent()->create($adherentData['adherent_data']);
        }
    }
}
