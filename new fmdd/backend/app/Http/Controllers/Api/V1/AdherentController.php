<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Adherent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdherentController extends Controller
{
    public function profile()
    {
        $user = Auth::user();
        $adherent = $user->adherent;
        
        if (!$adherent) {
            return response()->json([
                'message' => 'Aucun profil adhérent n\'a été créé pour ce compte',
                'needs_setup' => true
            ], 404);
        }

        return response()->json([
            'adherent' => $adherent,
            'is_active' => $adherent->estActif()
        ]);
    }

    public function createInitialProfile(Request $request)
    {
        $user = Auth::user();
        
        if ($user->adherent) {
            return response()->json([
                'message' => 'Un profil adhérent existe déjà'
            ], 400);
        }

        $validated = $request->validate([
            'statut_cotisation' => 'required|string|in:' . implode(',', [
                Adherent::STATUT_PAYEE,
                Adherent::STATUT_EN_ATTENTE,
                Adherent::STATUT_EXPIREE
            ]),
            'date_debut_adhesion' => 'required|date',
            'date_fin_adhesion' => 'required|date|after:date_debut_adhesion',
            'notes' => 'nullable|string',
        ]);

        $adherent = Adherent::create([
            'user_id' => $user->id,
            'statut_cotisation' => $validated['statut_cotisation'],
            'date_debut_adhesion' => $validated['date_debut_adhesion'],
            'date_fin_adhesion' => $validated['date_fin_adhesion'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json([
            'message' => 'Profil adhérent créé avec succès',
            'adherent' => $adherent
        ], 201);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $adherent = $user->adherent;

        $validated = $request->validate([
            'notes' => 'nullable|string',
            'statut_cotisation' => 'nullable|string|in:' . implode(',', [
                Adherent::STATUT_PAYEE,
                Adherent::STATUT_EN_ATTENTE,
                Adherent::STATUT_EXPIREE
            ]),
        ]);

        if ($adherent) {
            $adherent->update($validated);
            return response()->json(['message' => 'Profil mis à jour avec succès']);
        }

        return response()->json(['message' => 'Aucun adhérent trouvé'], 404);
    }

    public function payments()
    {
        $user = Auth::user();
        $adherent = $user->adherent;

        if ($adherent) {
            return response()->json([
                'statut_cotisation' => $adherent->statut_cotisation,
                'date_debut_adhesion' => $adherent->date_debut_adhesion,
                'date_fin_adhesion' => $adherent->date_fin_adhesion,
                'est_actif' => $adherent->estActif()
            ]);
        }

        return response()->json(['message' => 'Aucun adhérent trouvé'], 404);
    }

    public function index()
    {
        $adherents = Adherent::with('user')->get();
        return response()->json($adherents);
    }

    public function show($id)
    {
        $adherent = Adherent::with('user')->find($id);
        
        if (!$adherent) {
            return response()->json(['message' => 'Adhérent non trouvé'], 404);
        }

        return response()->json($adherent);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'statut_cotisation' => 'required|string|in:' . implode(',', [
                Adherent::STATUT_PAYEE,
                Adherent::STATUT_EN_ATTENTE,
                Adherent::STATUT_EXPIREE
            ]),
            'date_debut_adhesion' => 'required|date',
            'date_fin_adhesion' => 'required|date|after:date_debut_adhesion',
            'notes' => 'nullable|string',
        ]);

        $adherent = Adherent::create($validated);
        return response()->json($adherent, 201);
    }

    public function destroy($id)
    {
        $adherent = Adherent::find($id);
        
        if (!$adherent) {
            return response()->json(['message' => 'Adhérent non trouvé'], 404);
        }

        $adherent->delete();
        return response()->json(['message' => 'Adhérent supprimé avec succès']);
    }
}
