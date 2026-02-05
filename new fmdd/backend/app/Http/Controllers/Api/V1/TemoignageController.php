<?php

// ? new 
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
    $temoignages = Temoignage::where('statut', 'accepte')
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json([
        'status' => 'success',
        'data' => $temoignages
    ]);
}

    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'poste' => 'nullable|string|max:255',
            'titre' => 'required|string|max:255',
            'message' => 'required|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'photo' => 'nullable|image|max:2048', 
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('temoignages', 'public');
        }

        $temoignage = Temoignage::create([
            'nom' => $data['nom'],
            'poste' => $data['poste'] ?? null,
            'titre' => $data['titre'],
            'message' => $data['message'],
            'photo' => $data['photo'] ?? null,
            'rating' => $data['rating'] ?? null,
            'is_visible' => false, 
            'statut' => 'en_attente',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Témoignage envoyé et en attente de validation',
            'data' => $temoignage
        ], 201);
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

        $temoignage->update([
            'nom' => $data['nom'] ?? $temoignage->nom,
            'poste' => $data['poste'] ?? $temoignage->poste,
            'titre' => $data['titre'] ?? $temoignage->titre,
            'message' => $data['message'] ?? $temoignage->message,
            'photo' => $data['photo'] ?? $temoignage->photo,
            'rating' => $data['rating'] ?? $temoignage->rating,
            'is_visible' => $data['is_visible'] ?? $temoignage->is_visible,
            'statut' => $data['statut'] ?? $temoignage->statut,
        ]);

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
    public function all(Request $request) 
{
    if (!$request->user() || $request->user()->role !== 'admin') {
        return response()->json(['message' => 'Unauthorized'], 401);
    }
    
    $temoignages = Temoignage::latest()->get();

    return response()->json([
        'status' => 'success',
        'data' => $temoignages
    ]);
}
public function accept($id)
{
    $temoignage = Temoignage::find($id);
    if (!$temoignage) {
        return response()->json(['message' => 'Témoignage non trouvé'], 404);
    }
    
    $temoignage->update([
        'statut' => 'accepter',
        'is_visible' => true
    ]);
    
    return response()->json([
        'status' => 'success',
        'message' => 'Témoignage accepté',
        'data' => $temoignage
    ]);
}

public function reject($id)
{
    $temoignage = Temoignage::find($id);
    if (!$temoignage) {
        return response()->json(['message' => 'Témoignage non trouvé'], 404);
    }
    
    $temoignage->update([
        'statut' => 'refuser',
        'is_visible' => false
    ]);
    
    return response()->json([
        'status' => 'success',
        'message' => 'Témoignage refusé',
        'data' => $temoignage
    ]);
}
}
