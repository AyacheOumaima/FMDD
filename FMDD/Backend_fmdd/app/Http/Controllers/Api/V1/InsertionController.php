<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Insertion;
use Illuminate\Support\Facades\Validator;

class InsertionController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => Insertion::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string', // emploi, stage, alternance
            'lieu' => 'nullable|string',
            'contact_email' => 'nullable|email',
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

    public function show($id)
    {
        $insertion = Insertion::find($id);
        if (!$insertion) return response()->json(['message' => 'Non trouvé'], 404);
        return response()->json(['data' => $insertion]);
    }

    public function update(Request $request, $id)
    {
        $insertion = Insertion::find($id);
        if (!$insertion) return response()->json(['message' => 'Non trouvé'], 404);

        $insertion->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Insertion mise à jour',
            'data' => $insertion
        ]);
    }

    public function destroy($id)
    {
        $insertion = Insertion::find($id);
        if (!$insertion) return response()->json(['message' => 'Non trouvé'], 404);
        $insertion->delete();
        return response()->json(['message' => 'Supprimé avec succès']);
    }
}