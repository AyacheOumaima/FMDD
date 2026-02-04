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
} 