<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class NewsletterController extends Controller
{
    /**
     * Affiche la liste des abonnés
     */
    public function index()
    {
        try {
            $newsletters = Newsletter::latest()->get();
            return response()->json([
                'status' => 'success',
                'data' => $newsletters
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la récupération des abonnés'
            ], 500);
        }
    }

    /**
     * Ajoute un nouvel abonné
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email|unique:newsletters,email'
            ]);

            $newsletter = Newsletter::create([
                'email' => $validated['email'],
                'statut' => 'actif'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Inscription à la newsletter réussie',
                'data' => $newsletter
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cette adresse email est déjà inscrite à la newsletter',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de l\'inscription à la newsletter'
            ], 500);
        }
    }

    /**
     * Désabonne un utilisateur
     */
    public function unsubscribe(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email|exists:newsletters,email'
            ]);

            $newsletter = Newsletter::where('email', $validated['email'])->first();
            
            if ($newsletter->statut === 'desabonné') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cet email est déjà désabonné'
                ], 400);
            }

            $newsletter->update([
                'statut' => 'desabonné',
                'desabonement_date' => now()
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Désabonnement réussi'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors du désabonnement'
            ], 500);
        }
    }

    /**
     * Réabonne un utilisateur
     */
    public function resubscribe(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email|exists:newsletters,email'
            ]);

            $newsletter = Newsletter::where('email', $validated['email'])->first();
            
            if ($newsletter->statut === 'actif') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cet email est déjà abonné'
                ], 400);
            }

            $newsletter->update([
                'statut' => 'actif',
                'desabonement_date' => null
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Réabonnement réussi'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors du réabonnement'
            ], 500);
        }
    }

    /**
     * Supprime un abonné
     */
    public function destroy($id)
    {
        try {
            $newsletter = Newsletter::findOrFail($id);
            $newsletter->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Abonné supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la suppression de l\'abonné'
            ], 500);
        }
    }
} 