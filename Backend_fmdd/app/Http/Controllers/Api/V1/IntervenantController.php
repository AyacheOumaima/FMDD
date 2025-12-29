<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Intervenant;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class IntervenantController extends Controller
{
    /**
     * Affiche la liste des intervenants d'un événement
     *
     * @param int $eventId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($eventId)
    {
        $event = Event::findOrFail($eventId);
        $intervenants = $event->intervenants;
        
        return response()->json($intervenants);
    }

    /**
     * Affiche les détails d'un intervenant
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $intervenant = Intervenant::findOrFail($id);
        
        return response()->json($intervenant);
    }

    /**
     * Ajoute un nouvel intervenant à un événement (admin seulement)
     *
     * @param Request $request
     * @param int $eventId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, $eventId)
    {
        $event = Event::findOrFail($eventId);
        
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'fonction' => 'nullable|string|max:100',
            'email' => 'required|email|unique:intervenants,email',
            'telephone' => 'nullable|string|max:20',
            'biographie' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
        ]);
        
        // Traitement de l'image si elle est fournie
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('intervenants', 'public');
            $validated['photo'] = $path;
        }
        
        $intervenant = $event->intervenants()->create($validated);
        
        return response()->json([
            'message' => 'Intervenant ajouté avec succès',
            'intervenant' => $intervenant
        ], 201);
    }

    /**
     * Met à jour un intervenant existant (admin seulement)
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $intervenant = Intervenant::findOrFail($id);
        
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'prenom' => 'sometimes|required|string|max:255',
            'fonction' => 'nullable|string|max:100',
            'email' => 'sometimes|required|email|unique:intervenants,email,' . $id,
            'telephone' => 'nullable|string|max:20',
            'biographie' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
        ]);
        
        // Traitement de l'image si elle est fournie
        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne image si elle existe
            if ($intervenant->photo) {
                Storage::disk('public')->delete($intervenant->photo);
            }
            
            $path = $request->file('photo')->store('intervenants', 'public');
            $validated['photo'] = $path;
        }
        
        $intervenant->update($validated);
        
        return response()->json([
            'message' => 'Intervenant mis à jour avec succès',
            'intervenant' => $intervenant
        ]);
    }

    /**
     * Supprime un intervenant (admin seulement)
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $intervenant = Intervenant::findOrFail($id);
        
        // Supprimer l'image si elle existe
        if ($intervenant->photo) {
            Storage::disk('public')->delete($intervenant->photo);
        }
        
        $intervenant->delete();
        
        return response()->json([
            'message' => 'Intervenant supprimé avec succès'
        ]);
    }
}