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
  public function index(): \Illuminate\Http\JsonResponse
{
    // On fait comme pour les formations : latest()->get()
    return response()->json([
        'status' => 'success',
        'data' => Projet::latest()->get()
    ]);
}


    // 2. CRÉER (Store)
  public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'titre_projet' => 'required|string|max:255',
        'description_projet' => 'required|string',
        'localisation' => 'required|string',
        'duree' => 'required|string',
        'statut_projet' => 'nullable|string',
        'date_projet' => 'nullable|date',
        'image' => 'nullable|image|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $validator->validated();

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('projets', 'public');
    }

    $projet = Projet::create($data);

    return response()->json(['status' => 'success', 'data' => $projet], 201);
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

    // Validation
    $validator = Validator::make($request->all(), [
        'titre_projet' => 'sometimes|string|max:255',
        'description_projet' => 'sometimes|string',
        'localisation' => 'sometimes|string',
        'duree' => 'sometimes|string',
        'image' => 'nullable|image|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Gestion de l'image
    if ($request->hasFile('image')) {
        // Supprimer l'ancienne
        if ($projet->image) {
            Storage::disk('public')->delete($projet->image);
        }
        $path = $request->file('image')->store('projets', 'public');
        $projet->image = $path;
    }

    // Mise à jour simplifiée des champs
    $projet->fill($request->only([
        'titre_projet', 'description_projet', 'theme', 
        'date_projet', 'statut_projet', 'localisation', 'duree'
    ]));

    $projet->save();

    return response()->json([
        'status' => 'success',
        'message' => 'Projet mis à jour avec succès',
        'data' => $projet
    ]);
}

    // 5. DESTROY
    public function destroy($id): JsonResponse
{
    $projet = Projet::find($id);
    if (!$projet) return response()->json(['message' => 'Projet non trouvé'], 404);

    if ($projet->image) {
        // Utiliser Storage au lieu de File pour être cohérent avec l'upload
        Storage::disk('public')->delete($projet->image);
    }

    $projet->delete();
    return response()->json(['message' => 'Projet supprimé avec succès']);
}
}