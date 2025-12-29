<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Benevole;
use App\Models\DemandeBenevolat;
use App\Models\Projet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DemandeBenevolatController extends Controller
{
    // Soumission d'une demande de bénévolat (auth requise)
    public function store(Request $request, $projet_id): JsonResponse
    {
        $request->validate([
            'competences' => 'required|string',
            'disponibilite' => 'required|string',
            'motivation' => 'required|string',
        ]);
        $demande = DemandeBenevolat::create([
            'user_id' => Auth::id(),
            'projet_id' => $projet_id,
            'competences' => $request->competences,
            'disponibilite' => $request->disponibilite,
            'motivation' => $request->motivation,
            'date_demande' => now(),
            'statut' => 'En attente',
        ]);
        return response()->json(['demande' => $demande], 201);
    }

    // Lister les bénévoles d'un projet
    public function index(Request $request, $projet_id)
    {
        $projet = Projet::with(['benevoles.user', 'benevoles.demande'])->findOrFail($projet_id);
        return response()->json(['benevoles' => $projet->benevoles], 200);
    }

    // Vérifier si l'utilisateur connecté a déjà une demande de bénévolat pour ce projet
    public function checkMyRequest($projet_id): JsonResponse
    {
        $demande = DemandeBenevolat::where('user_id', Auth::id())
                                  ->where('projet_id', $projet_id)
                                  ->first();

        return response()->json([
            'has_request' => !!$demande,
            'demande' => $demande
        ]);
    }

    // Validation admin : approuver/refuser une demande de bénévolat
    public function valider(Request $request, $benevole_id)
    {
        $request->validate([
            'statut' => 'required|in:approuve,refuse',
            'commentaire' => 'nullable|string',
        ]);
        $benevole = Benevole::findOrFail($benevole_id);
        $benevole->statut = $request->statut;
        $benevole->commentaire = $request->commentaire;
        $benevole->date_approbation = now();
        $benevole->save();
        return response()->json(['benevole' => $benevole], 200);
    }

    // Simulation d'ajout manuel d'un bénévole (admin)
    public function ajouter(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'demande_id' => 'required|exists:demandes_benevolat,id',
            'statut' => 'required|in:approuve,refuse,en_attente',
            'commentaire' => 'nullable|string',
        ]);
        $benevole = Benevole::create([
            'user_id' => $request->user_id,
            'demande_id' => $request->demande_id,
            'statut' => $request->statut,
            'commentaire' => $request->commentaire,
            'date_approbation' => $request->statut === 'approuve' ? now() : null,
        ]);
        return response()->json(['benevole' => $benevole], 201);
    }
}
