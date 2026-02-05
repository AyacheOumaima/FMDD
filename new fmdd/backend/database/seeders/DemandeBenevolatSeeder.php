<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Benevole;
use App\Models\DemandeBenevolat;

class DemandeBenevolatSeeder extends Seeder
{
    public function run(): void
    {
        // Création de plusieurs demandes de bénévolat
        for ($i = 1; $i <= 5; $i++) {
            $demande = DemandeBenevolat::create([
                'user_id' => $i,
                'projet_id' => 1,
                'competences' => 'Compétence ' . $i,
                'disponibilite' => 'Disponibilité ' . $i,
                'motivation' => 'Motivation ' . $i,
                'date_demande' => now()->subDays($i),
                'statut' => 'En attente',
            ]);
            // Création d'un bénévole lié à la demande
            Benevole::create([
                'user_id' => $i,
                'demande_id' => $demande->id,
                'statut' => $i % 2 === 0 ? 'approuve' : 'en_attente',
                'commentaire' => $i % 2 === 0 ? 'Validé par admin' : null,
                'date_approbation' => $i % 2 === 0 ? now()->subDays($i) : null,
            ]);
        }
    }
}
