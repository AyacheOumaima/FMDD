<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ProjetController extends Controller
{
    // 1. LISTE
    public function index(Request $request): JsonResponse
    {
        $projets = Projet::latest()->paginate(12);
        return response()->json([
            'data' => $projets->items(),
            'current_page' => $projets->currentPage(),
            'last_page' => $projets->lastPage(),
            'per_page' => $projets->perPage(),
            'total' => $projets->total(),
        ]);
    }

    // 2. CRÉER (Store)
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'theme' => 'nullable|string',
            'date' => 'nullable|date',
            'statut' => 'nullable|string',
            // Optional fields logic
            'localisation' => 'nullable|string',
            'duree' => 'nullable|string',
            'image' => 'nullable|image|max:4096' 
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        // --- MAPPING FIX (Complete) ---
        $projetData = [
            'titre_projet' => $request->titre,
            'description_projet' => $request->description,
            'theme' => $request->theme,
            'date' => $request->date,
            'statut' => $request->statut ?? 'En cours',
            
            // ✅ FIX: Provide defaults for ALL potential missing fields
            'localisation' => $request->localisation ?? 'Non spécifié', 
            'duree' => $request->duree ?? 'Non spécifiée', // Fix for Error 1364 'duree'
            
            // Just in case your DB asks for these next:
            'budget' => $request->budget ?? '0',
            'nombre_beneficiaires' => $request->nombre_beneficiaires ?? 0,
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projets', 'public');
            $projetData['image'] = 'storage/' . $path;
        }

        $projet = Projet::create($projetData);

        return response()->json([
            'status' => 'success',
            'message' => 'Projet créé avec succès',
            'data' => $projet
        ], 201);
    }

    // 3. SHOW
    public function show($id): JsonResponse
    {
        $projet = Projet::find($id);
        if (!$projet) return response()->json(['message' => 'Projet non trouvé'], 404);
        return response()->json(['data' => $projet]);
    }

    // 4. UPDATE
    public function update(Request $request, $id): JsonResponse
    {
        $projet = Projet::find($id);
        if (!$projet) return response()->json(['message' => 'Projet non trouvé'], 404);

        // Handle Image
        if ($request->hasFile('image')) {
            if ($projet->image && File::exists(public_path($projet->image))) {
                File::delete(public_path($projet->image));
            }
            $path = $request->file('image')->store('projets', 'public');
            $projet->image = 'storage/' . $path;
        }

        // Update Fields
        if ($request->has('titre')) $projet->titre_projet = $request->titre;
        if ($request->has('description')) $projet->description_projet = $request->description;
        if ($request->has('theme')) $projet->theme = $request->theme;
        if ($request->has('date')) $projet->date = $request->date;
        if ($request->has('statut')) $projet->statut = $request->statut;
        
        // Update optional fields if provided
        if ($request->has('localisation')) $projet->localisation = $request->localisation;
        if ($request->has('duree')) $projet->duree = $request->duree;

        $projet->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Projet mis à jour',
            'data' => $projet
        ]);
    }

    // 5. DESTROY
    public function destroy($id): JsonResponse
    {
        $projet = Projet::find($id);
        if (!$projet) return response()->json(['message' => 'Projet non trouvé'], 404);

        if ($projet->image && File::exists(public_path($projet->image))) {
            File::delete(public_path($projet->image));
        }

        $projet->delete();
        return response()->json(['message' => 'Projet supprimé avec succès']);
    }
}