<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Benevole;
use App\Models\Projet;
use App\Models\Partenaire;
use App\Models\Sponsor;
use Illuminate\Support\Facades\DB;

class CollaborationProjetSeeder extends Seeder
{
    public function run(): void
    {
        // Vérifie qu'il existe des projets, partenaires, sponsors, benevoles
        $projets = Projet::all();
        $partenaires = Partenaire::all();
        $sponsors = Sponsor::all();
        $benevoles = Benevole::all();

        if ($projets->isEmpty() || $partenaires->isEmpty() || $sponsors->isEmpty() || $benevoles->isEmpty()) {
            $this->command->warn('Aucune donnée trouvée pour projets, partenaires, sponsors ou bénévoles. Veuillez lancer les seeders correspondants avant.');
            return;
        }

        foreach ($projets as $projet) {
            foreach ($partenaires as $partenaire) {
                DB::table('projets_partenaires')->insertOrIgnore([
                    'projet_id' => $projet->id,
                    'partenaire_id' => $partenaire->id,
                    'type_partenariat' => 'technique',
                    'engagement' => 'Appui logistique',
                    'date_debut' => now()->subMonths(rand(1,6)),
                    'date_fin' => now()->addMonths(rand(1,6)),
                ]);
            }
            foreach ($sponsors as $sponsor) {
                DB::table('projets_sponsors')->insertOrIgnore([
                    'projet_id' => $projet->id,
                    'sponsor_id' => $sponsor->id,
                    'type_sponsoring' => 'argent',
                    'montant' => rand(1000,10000),
                    'contreparties' => 'Logo sur site',
                    'date_debut' => now()->subMonths(rand(1,6)),
                    'date_fin' => now()->addMonths(rand(1,6)),
                ]);
            }
            foreach ($benevoles as $benevole) {
                DB::table('projets_benevoles')->insertOrIgnore([
                    'projet_id' => $projet->id,
                    'benevole_id' => $benevole->id,
                    'role' => 'Support',
                    'date_debut' => now()->subWeeks(rand(1,10)),
                    'date_fin' => now()->addWeeks(rand(1,10)),
                    'heures_effectuees' => rand(5,40),
                ]);
            }
        }
    }
}