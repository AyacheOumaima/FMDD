<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Candidature;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class CandidatureController extends Controller
{
    public function index()
    {
        try {
            $candidatures = Candidature::all();
            return response()->json($candidatures);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Échec de la récupération des candidatures'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'telephone' => 'required|string|max:255',
                'formation' => 'required|string|max:255',
                'experience' => 'required|string',
                'lettre_motivation' => 'required|string',
                'cv' => 'required|file|mimes:pdf|max:10240', // Max 10MB
            ]);
            
            // Gestion du fichier CV
            if ($request->hasFile('cv')) {
                $file = $request->file('cv');
                $fileName = time() . '_' . $file->getClientOriginalName();
                
                // Stockage du fichier
                $path = $file->storeAs('public/cvs', $fileName);
                
                // Sauvegarde du chemin dans la base de données
                $validated['cv_path'] = 'cvs/' . $fileName;
            }
            
            // Création de la candidature
            $candidature = Candidature::create($validated);
            
            return response()->json([
                'message' => 'Candidature créée avec succès',
                'data' => $candidature
            ], 201);
            
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la création de la candidature',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $candidature = Candidature::findOrFail($id);
            return response()->json($candidature);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Candidature non trouvée'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la récupération de la candidature'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $candidature = Candidature::findOrFail($id);
            
            $validated = $request->validate([
                'nom' => 'sometimes|string|max:255',
                'prenom' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|max:255',
                'telephone' => 'sometimes|string|max:255',
                'formation' => 'sometimes|string|max:255',
                'experience' => 'sometimes|string',
                'lettre_motivation' => 'sometimes|string',
                'cv' => 'sometimes|file|mimes:pdf|max:10240',
            ]);

            // Gestion du nouveau CV si fourni
            if ($request->hasFile('cv')) {
                // Supprimer l'ancien CV
                if ($candidature->cv_path) {
                    Storage::delete('public/' . $candidature->cv_path);
                }

                $file = $request->file('cv');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('public/cvs', $fileName);
                $validated['cv_path'] = 'cvs/' . $fileName;
            }

            $candidature->update($validated);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Statut de la candidature mis à jour',
                'data' => $candidature
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
                'message' => 'Erreur lors de la mise à jour de la candidature'
            ], 500);
        }
    }

    /**
     * Supprime une candidature
     */
    public function destroy($id)
    {
        try {
            $candidature = Candidature::findOrFail($id);
            
            // Supprimer le fichier CV
            if ($candidature->cv_path) {
                Storage::delete('public/' . $candidature->cv_path);
            }
            
            $candidature->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Candidature supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la suppression de la candidature'
            ], 500);
        }
    }
} 