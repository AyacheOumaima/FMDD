<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;

class AdminBlogController extends Controller
{
    public function index(Request $request)
    {
        $articles = Blog::latest()->paginate(12);

        return response()->json([
            'articles' => $articles
        ]);
    }
   public function destroy($id): JsonResponse
    {
        try {
            $article = Blog::findOrFail($id);
            if ($article->image) {
                Storage::disk('public')->delete($article->image);}
    $article->forceDelete(); // 💥 suppression définitive
            return response()->json(['message' => 'Article supprimé']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur suppression'], 500);
        }
    }
    public function show($id): JsonResponse
{
    $article = Blog::findOrFail($id);

    return response()->json([
        'article' => $article
    ]);
}

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
}
