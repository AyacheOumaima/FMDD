<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use App\Http\Resources\GalleryResource;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Gallery::query()->actif()->ordered();

        // Filtrer par catégorie si spécifié
        if ($request->has('category') && $request->category !== 'Tous') {
            $query->inCategory($request->category);
        }

        // Filtrer par type si spécifié
        if ($request->has('type')) {
            $query->ofType($request->type);
        }

        $galleries = $query->get();

        return GalleryResource::collection($galleries);
    }

    public function show($id)
    {
        $gallery = Gallery::findOrFail($id);
        return new GalleryResource($gallery);
    }

    public function categories()
    {
        $categories = Gallery::actif()
            ->pluck('categories')
            ->flatten()
            ->unique()
            ->values()
            ->all();

        return response()->json([
            'data' => array_merge(['Tous'], $categories)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'required|file|max:10240', // 10MB max
            'type' => 'required|in:image,video',
            'categories' => 'nullable|array',
            'ordre' => 'nullable|integer',
            'is_actif' => 'nullable|boolean',
        ]);

        if ($request->hasFile('url')) {
            $path = $request->file('url')->store('gallery', 'public');
            $validated['url'] = 'storage/' . $path;
        }

        $gallery = Gallery::create($validated);

        return response()->json([
            'message' => 'Média ajouté à la galerie',
            'data' => $gallery
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|file|max:10240',
            'type' => 'sometimes|in:image,video',
            'categories' => 'nullable|array',
            'ordre' => 'nullable|integer',
            'is_actif' => 'nullable|boolean',
        ]);

        if ($request->hasFile('url')) {
            if ($gallery->url && \Illuminate\Support\Facades\File::exists(public_path($gallery->url))) {
                \Illuminate\Support\Facades\File::delete(public_path($gallery->url));
            }
            $path = $request->file('url')->store('gallery', 'public');
            $validated['url'] = 'storage/' . $path;
        }

        $gallery->update($validated);

        return response()->json([
            'message' => 'Média mis à jour',
            'data' => $gallery
        ]);
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);

        if ($gallery->url && \Illuminate\Support\Facades\File::exists(public_path($gallery->url))) {
            \Illuminate\Support\Facades\File::delete(public_path($gallery->url));
        }

        $gallery->delete();

        return response()->json(['message' => 'Média supprimé de la galerie']);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:galleries,id',
            'orders.*.ordre' => 'required|integer',
        ]);

        foreach ($request->orders as $order) {
            Gallery::where('id', $order['id'])->update(['ordre' => $order['ordre']]);
        }

        return response()->json(['message' => 'Ordre mis à jour']);
    }
}