<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        // Vider la table blog avant d'insérer (attention : suppression totale)
        Blog::truncate();
        // Utiliser l'admin existant
        $admin = User::where('role', 'admin')->first();

        if (!$admin) {
            // Si aucun admin n'existe (ce qui ne devrait pas arriver car UserSeeder est exécuté avant)
            return;
        }

        $articles = [
            [
                'titre' => 'Les enjeux du développement durable au Maroc',
                'auteur' => 'Fatima Zahra El Idrissi',
                'contenu' => "Le développement durable au Maroc représente un défi majeur pour notre société. Face aux changements climatiques et à la nécessité de préserver nos ressources naturelles, il est crucial d'adopter une approche intégrée qui prend en compte les aspects environnementaux, sociaux et économiques.

                Les principaux enjeux incluent :
                - La gestion durable des ressources en eau
                - La transition énergétique vers les énergies renouvelables
                - La préservation de la biodiversité
                - L'agriculture durable et la sécurité alimentaire
                - La gestion des déchets et l'économie circulaire

                Le Maroc s'est engagé dans plusieurs initiatives majeures pour relever ces défis, notamment le Plan Maroc Vert et la Stratégie Nationale de Développement Durable.",
                'resume' => 'Analyse des principaux enjeux du développement durable au Maroc.',
                'image_principale' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Nature, développement durable
                'tags' => ['Développement Durable', 'Maroc', 'Environnement'],
                'statut' => 'publie',
                'date_publication' => now(),
            ],
            [
                'titre' => 'Innovation et solutions durables',
                'auteur' => 'Youssef Benali',
                'contenu' => "Les innovations technologiques jouent un rôle crucial dans la transition vers un développement plus durable. Au Maroc, de nombreuses startups et entreprises développent des solutions innovantes pour répondre aux défis environnementaux.

                Parmi les innovations marquantes :
                - Les systèmes d'irrigation intelligente
                - Les solutions de recyclage innovantes
                - Les technologies de production d'énergie renouvelable
                - Les applications mobiles pour la sensibilisation environnementale
                - Les solutions de mobilité durable

                Ces innovations contribuent à créer un écosystème plus respectueux de l'environnement tout en générant des opportunités économiques.",
                'resume' => 'Découvrez les dernières innovations en matière de développement durable.',
                'image_principale' => 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80', // Innovation, technologie verte
                'tags' => ['Innovation', 'Technologie', 'Solutions Durables'],
                'statut' => 'publie',
                'date_publication' => now()->subDays(2),
            ],
            [
                'titre' => "L'éducation environnementale au Maroc",
                'auteur' => 'Amina Raji',
                'contenu' => "L'éducation environnementale est essentielle pour sensibiliser les générations actuelles et futures aux enjeux du développement durable. Au Maroc, de nombreuses initiatives sont mises en place pour promouvoir cette éducation.

                Les axes principaux de l'éducation environnementale :
                - L'intégration dans les programmes scolaires
                - Les campagnes de sensibilisation publique
                - Les formations professionnelles
                - Les activités pratiques et sorties pédagogiques
                - Les partenariats avec les associations environnementales

                Ces efforts contribuent à former des citoyens responsables et conscients des enjeux environnementaux.",
                'resume' => "État des lieux de l'éducation environnementale au Maroc.",
                'image_principale' => 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', // Éducation, sensibilisation environnementale
                'tags' => ['Éducation', 'Environnement', 'Sensibilisation'],
                'statut' => 'publie',
                'date_publication' => now()->subDays(5),
            ]
        ];

        foreach ($articles as $article) {
            Blog::create(array_merge($article, ['user_id' => $admin->id]));
        }
    }
}