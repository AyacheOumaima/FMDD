<?php

namespace Database\Seeders;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();
        $twoWeeksFromNow = Carbon::now()->addWeeks(2);
        $oneMonthFromNow = Carbon::now()->addMonth();
        
        $events = [
            [
                'titre' => 'Conférence sur le Développement Durable',
                'description' => 'Une conférence sur les enjeux du développement durable au Maroc.',
                'is_a_venir' => true,
                'date_limite_d\'inscription' => $twoWeeksFromNow->format('Y-m-d'),
                'heure_limite_d\'inscription' => '18:00:00',
                'date' => $twoWeeksFromNow->addDays(3)->format('Y-m-d'),
                'heure' => '09:00:00',
                'limite_de_places' => 150,
                'ville' => 'Casablanca',
                'image' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                'prix' => 250.00,
                'categorie' => 'Conférence',
                'type_evenement' => 'payant',
                'description_detaillee' => 'Cette conférence réunira des experts internationaux pour discuter des défis et opportunités du développement durable au Maroc. Au programme : tables rondes, ateliers et networking.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'titre' => 'Atelier Recyclage Créatif',
                'description' => 'Apprenez à créer des objets utiles à partir de matériaux recyclés.',
                'is_a_venir' => true,
                'date_limite_d\'inscription' => $oneMonthFromNow->format('Y-m-d'),
                'heure_limite_d\'inscription' => '20:00:00',
                'date' => $oneMonthFromNow->addDay()->format('Y-m-d'),
                'heure' => '14:00:00',
                'limite_de_places' => 30,
                'ville' => 'Rabat',
                'image' => 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
                'prix' => null, // Gratuit
                'categorie' => 'Atelier',
                'type_evenement' => 'gratuit',
                'description_detaillee' => 'Venez découvrir comment donner une seconde vie à vos déchets en créant des objets utiles et décoratifs. Matériel fourni sur place.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'titre' => 'Forum des Métiers Verts',
                'description' => 'Découvrez les opportunités professionnelles dans le secteur des énergies renouvelables.',
                'is_a_venir' => true,
                'date_limite_d\'inscription' => Carbon::now()->addDays(5)->format('Y-m-d'),
                'heure_limite_d\'inscription' => '12:00:00',
                'date' => Carbon::now()->addDays(7)->format('Y-m-d'),
                'heure' => '10:00:00',
                'limite_de_places' => 200,
                'ville' => 'Marrakech',
                'image' => 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
                'prix' => 100.00,
                'categorie' => 'Forum',
                'type_evenement' => 'payant',
                'description_detaillee' => 'Rencontrez des professionnels du secteur des énergies renouvelables et découvrez les formations et opportunités d\'emploi disponibles.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'titre' => 'Nettoyage de Plage',
                'description' => 'Action citoyenne pour nettoyer la plage de Sidi Bouzid.',
                'is_a_venir' => false, // Événement passé
                'date_limite_d\'inscription' => Carbon::now()->subDays(10)->format('Y-m-d'),
                'heure_limite_d\'inscription' => '18:00:00',
                'date' => Carbon::now()->subDays(7)->format('Y-m-d'),
                'heure' => '08:00:00',
                'limite_de_places' => 100,
                'ville' => 'El Jadida',
                'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                'prix' => null, // Gratuit
                'categorie' => 'Bénévolat',
                'type_evenement' => 'gratuit',
                'description_detaillee' => 'Rejoignez-nous pour une matinée de nettoyage de la plage. Gants et sacs fournis. Pensez à apporter de l\'eau et une casquette.',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        // Insérer les événements dans la base de données
        foreach ($events as $event) {
            Event::create($event);
        }

        $this->command->info(count($events) . ' événements créés avec succès !');
    }
}
