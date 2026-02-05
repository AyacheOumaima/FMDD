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
     * Créer un nouvel article (Admin)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'contenu' => 'required|string',
            'resume' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'tags' => 'nullable|array',
            'statut' => 'nullable|string|in:publie,brouillon',
            'date_publication' => 'nullable|date',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blog', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        $validated['slug'] = \Illuminate\Support\Str::slug($validated['titre']);
        $validated['auteur_id'] = auth()->id();

        $article = Blog::create($validated);

        return response()->json([
            'message' => 'Article créé avec succès',
            'article' => $article
        ], 201);
    }

    /**
     * Mettre à jour un article (Admin)
     */
    public function update(Request $request, $id): JsonResponse
    {
        $article = Blog::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'contenu' => 'sometimes|string',
            'resume' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'tags' => 'nullable|array',
            'statut' => 'nullable|string|in:publie,brouillon',
        ]);

        if ($request->hasFile('image')) {
            if ($article->image && \Illuminate\Support\Facades\File::exists(public_path($article->image))) {
                \Illuminate\Support\Facades\File::delete(public_path($article->image));
            }
            $path = $request->file('image')->store('blog', 'public');
            $validated['image'] = 'storage/' . $path;
        }

        if (isset($validated['titre'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['titre']);
        }

        $article->update($validated);

        return response()->json([
            'message' => 'Article mis à jour avec succès',
            'article' => $article
        ]);
    }

    /**
     * Supprimer un article (Admin)
     */
    public function destroy($id): JsonResponse
    {
        $article = Blog::findOrFail($id);

        if ($article->image && \Illuminate\Support\Facades\File::exists(public_path($article->image))) {
            \Illuminate\Support\Facades\File::delete(public_path($article->image));
        }

        $article->delete();

        return response()->json(['message' => 'Article supprimé avec succès']);
    }
}