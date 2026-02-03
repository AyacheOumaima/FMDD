<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class IntervenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('fr_FR');

        // Récupérer tous les événements existants
        $evenements = Event::all();

        if ($evenements->count() > 0) {
            // Pour chaque événement, créer entre 1 et 3 intervenants
            foreach ($evenements as $evenement) {
                $nombreIntervenants = rand(1, 3);

                for ($i = 0; $i < $nombreIntervenants; $i++) {
                    DB::table('intervenants')->insert([
                        'evenement_id' => $evenement->id,
                        'nom' => $faker->lastName(),
                        'prenom' => $faker->firstName(),
                        'fonction' => $faker->jobTitle(),
                        'email' => $faker->unique()->safeEmail(),
                        'telephone' => $faker->phoneNumber(),
                        'biographie' => $faker->paragraphs(2, true),
                        'photo' => null, // Pas de photo par défaut
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            if (isset($this->command)) {
                $this->command->info('Intervenants créés avec succès pour ' . $evenements->count() . ' événements.');
            }
        } else {
            if (isset($this->command)) {
                $this->command->error('Aucun événement trouvé. Veuillez d\'abord créer des événements.');
            }
        }
    }
}