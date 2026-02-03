<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Appeler les seeders (évite la création manuelle d'admin et testuser ici, car UserSeeder s'en charge)
        $this->call([
            EventSeeder::class,
            IntervenantSeeder::class, // Ajout du seeder d'intervenants
            UserSeeder::class,
            InfoContactSeeder::class,
            AproposSeeder::class,
            EquipeFmddSeeder::class,
            ObjectifSeeder::class,
            HistoireSeeder::class,
            PartenaireSeeder::class,
            BlogSeeder::class,
            GallerySeeder::class,
            ServiceProfilSeeder::class,
            AdherentSeeder::class,
            ProjetSeeder::class,
            DemandeBenevolatSeeder::class,
            CollaborationProjetSeeder::class,
            FormationSeeder::class,

        ]);
    }
}

