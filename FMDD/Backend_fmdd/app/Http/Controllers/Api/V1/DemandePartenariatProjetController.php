<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\DemandePartenariatProjet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DemandePartenariatProjetController extends Controller
{
    // Soumission d'une demande de partenariat (public)
    public function store(Request $request, $projet_id): JsonResponse
    {
        $request->validate([
            'organisation' => 'required|string',
            'contact_nom' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|string',
            'type_partenariat_souhaite' => 'required|string',
            'engagement_propose' => 'nullable|string',
        ]);
        
        $demande = DemandePartenariatProjet::create([
            'organisation' => $request->organisation,
            'contact_nom' => $request->contact_nom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'projet_id' => $projet_id,
            'type_partenariat_souhaite' => $request->type_partenariat_souhaite,
            'engagement_propose' => $request->engagement_propose,
            'date_demande' => now(),
            'statut' => 'En attente',
        ]);
        
        return response()->json(['demande' => $demande], 201);
    }

    // Lister les demandes de partenariat d'un projet
    public function index(Request $request, $projet_id)
    {
        $demandes = DemandePartenariatProjet::where('projet_id', $projet_id)->get();
        return response()->json(['demandes' => $demandes], 200);
    }

    // Vérifier si une demande de partenariat existe déjà pour cet email et ce projet
    public function checkExisting(Request $request, $projet_id): JsonResponse
    {
        $request->validate(['email' => 'required|email']);

        $demande = DemandePartenariatProjet::where('email', $request->email)
                                          ->where('projet_id', $projet_id)
                                          ->first();

        return response()->json([
            'has_request' => !!$demande,
            'demande' => $demande
        ]);
    }

    // Validation admin : approuver/refuser une demande de partenariat
    public function valider(Request $request, $demande_id)
    {
        $request->validate([
            'statut' => 'required|in:approuve,refuse',
            'commentaire' => 'nullable|string',
        ]);
        $demande = DemandePartenariatProjet::findOrFail($demande_id);
        $demande->statut = $request->statut;
        $demande->commentaire = $request->commentaire;
        $demande->date_approbation = now();
        $demande->save();
        return response()->json(['demande' => $demande], 200);
    }
}
