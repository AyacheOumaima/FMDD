<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreContactRequest;
use App\Models\ContactUs;
use App\Models\InfoContact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Afficher la liste des messages de contact
     */
    public function index(): JsonResponse
    {
        $messages = ContactUs::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'messages' => $messages,
            'meta' => [
                'total' => $messages->total(),
                'page' => $messages->currentPage(),
                'last_page' => $messages->lastPage()
            ]
        ]);
    }

    /**
     * Récupérer les informations de contact de FMDD
     */
    public function getInfoContact(): JsonResponse
    {
        $info = InfoContact::first();
        
        if (!$info) {
            return response()->json([
                'message' => 'Informations de contact non trouvées'
            ], 404);
        }

        return response()->json($info);
    }

    /**
     * Envoyer un message de contact
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = ContactUs::create([
            'user_id' => auth()->id(), // null si non authentifié
            'nom_complet' => $request->nom_complet,
            'email' => $request->email,
            'objet' => $request->objet,
            'message' => $request->message,
            'statut' => 'non_lu'
        ]);

        return response()->json([
            'message' => 'Message envoyé avec succès',
            'contact' => $contact
        ], 201);
    }

    /**
     * Afficher un message de contact spécifique
     */
    public function show(string $id): JsonResponse
    {
        try {
            $message = ContactUs::with('user')->findOrFail($id);
            
            // Marquer comme lu si ce n'est pas déjà fait
            if ($message->statut === 'non_lu') {
                $message->update([
                    'statut' => 'lu',
                    'date_lecture' => now()
                ]);
            }

            return response()->json($message);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Message non trouvé'
            ], 404);
        }
    }

    /**
     * Mettre à jour le statut d'un message
     */
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $message = ContactUs::findOrFail($id);
            
            $request->validate([
                'statut' => ['required', 'string', 'in:non_lu,lu,traite,archive']
            ]);

            $message->update([
                'statut' => $request->statut,
                'date_lecture' => $request->statut === 'lu' ? now() : $message->date_lecture
            ]);

            return response()->json([
                'message' => 'Statut mis à jour avec succès',
                'contact' => $message
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du statut',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un message de contact (soft delete)
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $message = ContactUs::findOrFail($id);
            $message->delete();

            return response()->json([
                'message' => 'Message supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression du message',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
