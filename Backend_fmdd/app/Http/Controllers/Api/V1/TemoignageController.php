<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Temoignage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class TemoignageController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => Temoignage::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'message' => 'required|string',
            'poste' => 'nullable|string',
            'rating' => 'integer|min:1|max:5',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('temoignages', 'public');
        }

        $temoignage = Temoignage::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Témoignage ajouté',
            'data' => $temoignage
        ], 201);
    }

    public function show($id)
    {
        $temoignage = Temoignage::find($id);
        if (!$temoignage) return response()->json(['message' => 'Non trouvé'], 404);
        return response()->json(['data' => $temoignage]);
    }

    public function update(Request $request, $id)
    {
        $temoignage = Temoignage::find($id);
        if (!$temoignage) return response()->json(['message' => 'Non trouvé'], 404);

        $data = $request->all();
        
        if ($request->hasFile('photo')) {
            if ($temoignage->photo) Storage::disk('public')->delete($temoignage->photo);
            $data['photo'] = $request->file('photo')->store('temoignages', 'public');
        }

        $temoignage->update($data);

        return response()->json(['status' => 'success', 'data' => $temoignage]);
    }

    public function destroy($id)
    {
        $temoignage = Temoignage::find($id);
        if (!$temoignage) return response()->json(['message' => 'Non trouvé'], 404);
        if ($temoignage->photo) Storage::disk('public')->delete($temoignage->photo);
        $temoignage->delete();
        return response()->json(['message' => 'Supprimé avec succès']);
    }
}