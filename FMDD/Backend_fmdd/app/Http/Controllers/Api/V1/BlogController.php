<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
                      ->orWhere('resume', 'like', "%{$search}%");});}

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

    
         public function store(Request $request): JsonResponse
{
    $validated = $request->validate([
        'titre' => 'required|string|max:255',
        'contenu' => 'required|string',
        'auteur' => 'nullable|string',
        'categorie' => 'nullable|string',
        'statut' => 'required|in:brouillon,publie',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'tags' => 'nullable'
    ]);

    try {
        $data = $request->all();
        // L'ID de l'admin connecté via Sanctum
        $data['user_id'] = auth()->id(); 
        
        $data['slug'] = Str::slug($request->titre) . '-' . time();
        
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('blogs', 'public');
        }

        $article = Blog::create($data);
        return response()->json($article, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    /**
     * Modifier un article
     */
    public function update(Request $request, $id): JsonResponse
    {
        $article = Blog::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'contenu' => 'sometimes|required|string',
            'statut' => 'sometimes|required|in:brouillon,publie',
            'image' => 'nullable|image|max:2048'
        ]);
        try {
            $data = $request->all();
            if ($request->hasFile('image')) {
                // Supprimer l'ancienne image si elle existe
                if ($article->image) {
                    Storage::disk('public')->delete($article->image);}
                $data['image'] = $request->file('image')->store('blogs', 'public');}
            if ($request->has('tags') && is_string($request->tags)) {
                $data['tags'] = array_map('trim', explode(',', $request->tags));
            }
            $article->update($data);
            return response()->json(['message' => 'Article mis à jour', 'article' => $article]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur modification', 'error' => $e->getMessage()], 500);}}

    /**
     * Supprimer un article
     */
    public function destroy($id): JsonResponse
    {
        try {
            $article = Blog::findOrFail($id);
            if ($article->image) {
                Storage::disk('public')->delete($article->image);}
            $article->delete();
            return response()->json(['message' => 'Article supprimé']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur suppression'], 500);
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