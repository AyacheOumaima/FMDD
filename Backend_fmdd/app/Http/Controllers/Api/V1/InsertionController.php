<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Insertion;
use Illuminate\Support\Facades\Validator;

class InsertionController extends Controller
{
    // -------------------------
    // Liste toutes les insertions
    // -------------------------
    public function index()
    {
        $insertions = Insertion::latest()->get();
        return response()->json([
            'status' => 'success',
            'data' => $insertions
        ]);
    }

    // -------------------------
    // Créer une nouvelle insertion
    // -------------------------
    public function store(Request $request)
    {
        $input = $request->all();

        // gérer image
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public', $filename);
            $input['image'] = $filename;
        }

        // validator
        $validator = Validator::make($input, [
            'poste' => 'required|string|max:255',
            'entreprise' => 'required|string|max:255',
            'ville' => 'nullable|string|max:255',
            'date_début' => 'nullable|date',
            'type_contrat' => 'required|string|max:50',
            'image' => 'nullable|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $insertion = Insertion::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Insertion créée avec succès',
            'data' => $insertion
        ], 201);
    }

    // -------------------------
    // Afficher une insertion
    // -------------------------
    public function show($id)
    {
        $insertion = Insertion::find($id);
        if (!$insertion) {
            return response()->json(['message' => 'Non trouvé'], 404);
        }

        return response()->json(['data' => $insertion]);
    }

    // -------------------------
    // Mettre à jour une insertion
    // -------------------------
    public function update(Request $request, $id)
    {
        $insertion = Insertion::find($id);
        if (!$insertion) {
            return response()->json(['message' => 'Non trouvé'], 404);
        }

        $input = $request->all();

        // gérer image
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public', $filename);
            $input['image'] = $filename;
        }

      
        // validator
        $validator = Validator::make($input, [
            'poste' => 'required|string|max:255',
            'entreprise' => 'required|string|max:255',
            'ville' => 'nullable|string|max:255',
            'date_début' => 'nullable|date',
            'type_contrat' => 'required|string|max:50',
            'image' => 'nullable|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $insertion->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Insertion mise à jour',
            'data' => $insertion
        ]);
    }

    // -------------------------
    // Supprimer une insertion
    // -------------------------
    public function destroy($id)
    {
        $insertion = Insertion::find($id);
        if (!$insertion) {
            return response()->json(['message' => 'Non trouvé'], 404);
        }

        $insertion->delete();

        return response()->json(['message' => 'Supprimé avec succès']);
    }
}
