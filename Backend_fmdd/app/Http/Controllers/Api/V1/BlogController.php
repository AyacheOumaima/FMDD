<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Récupérer la liste des articles publiés
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Blog::query()->publie();

            // Filtrage par tag
            if ($request->has('tag')) {
                $query->whereJsonContains('tags', $request->tag);
            }

            // Recherche par titre ou contenu
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('titre', 'like', "%{$search}%")
                      ->orWhere('contenu', 'like', "%{$search}%")
                      ->orWhere('resume', 'like', "%{$search}%");
                });
            }

            // Tri
            $sort = $request->get('sort', 'recent');
            switch ($sort) {
                case 'populaire':
                    $query->populaire();
                    break;
                case 'ancien':
                    $query->orderBy('date_publication', 'asc');
                    break;
                default:
                    $query->orderBy('date_publication', 'desc');
            }

            $articles = $query->paginate(12);

            return response()->json([
                'articles' => $articles,
                'meta' => [
                    'total' => $articles->total(),
                    'page' => $articles->currentPage(),
                    'last_page' => $articles->lastPage()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des articles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer un article spécifique
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $article = Blog::publie()
                ->where('slug', $slug)
                ->firstOrFail();

            // Incrémenter le compteur de vues
            $article->incrementVues();

            // Récupérer les articles similaires
            $articlesSimilaires = Blog::publie()
                ->where('id', '!=', $article->id)
                ->whereJsonContains('tags', $article->tags)
                ->limit(3)
                ->get();

            return response()->json([
                'article' => $article,
                'articles_similaires' => $articlesSimilaires
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Article non trouvé',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Récupérer les articles populaires
     */
    public function populaires(): JsonResponse
    {
        try {
            $articles = Blog::publie()
                ->populaire()
                ->limit(5)
                ->get();

            return response()->json($articles);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des articles populaires',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer tous les tags uniques
     */
    public function tags(): JsonResponse
    {
        try {
            $articles = Blog::publie()->get();
            $tags = collect();

            foreach ($articles as $article) {
                if (!empty($article->tags)) {
                    $tags = $tags->concat($article->tags);
                }
            }

            return response()->json([
                'tags' => $tags->unique()->values()->all()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des tags',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 