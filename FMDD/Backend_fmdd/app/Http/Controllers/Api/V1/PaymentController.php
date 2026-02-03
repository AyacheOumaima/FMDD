<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    /**
     * Initialise un paiement
     *
     * @param int $registrationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function initiatePayment($registrationId)
    {
        $registration = EventRegistration::with('event')
            ->where('id', $registrationId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Vérifier que l'inscription est approuvée et que le paiement est en attente
        if ($registration->statut !== 'accepté' || $registration->statut_paiement !== 'en attente') {
            return response()->json([
                'message' => 'Cette inscription ne nécessite pas de paiement ou a déjà été traitée.'
            ], 400);
        }

        // Générer une référence de paiement unique
        $paymentReference = 'PAY-' . Str::upper(Str::random(10));
        
        // Enregistrer la référence de paiement (à implémenter selon votre logique métier)
        // $registration->update(['payment_reference' => $paymentReference]);

        // Ici, vous intégrerez avec votre passerelle de paiement (Stripe, PayPal, etc.)
        // Pour l'instant, nous retournons une simulation de réponse
        
        return response()->json([
            'message' => 'Paiement initialisé avec succès',
            'payment_reference' => $paymentReference,
            'amount' => $registration->event->prix,
            'currency' => 'EUR',
            'description' => 'Inscription à l\'événement: ' . $registration->event->titre,
            'payment_url' => '#', // URL de la passerelle de paiement
            'registration' => $registration->load('event')
        ]);
    }

    /**
     * Webhook pour les retours de paiement
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function webhook(Request $request)
    {
        // Valider la signature du webhook (à implémenter selon votre passerelle de paiement)
        $payload = $request->all();
        
        // Logique de traitement du webhook
        // - Vérifier le statut du paiement
        // - Mettre à jour l'inscription en conséquence
        
        // Exemple de réponse (à adapter selon votre logique)
        return response()->json([
            'status' => 'success',
            'message' => 'Webhook traité avec succès'
        ]);
    }

    /**
     * Vérifie le statut d'un paiement
     * 
     * @param string $paymentReference
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkPaymentStatus($paymentReference)
    {
        // Récupérer la transaction à partir de la référence
        // Vérifier le statut auprès de la passerelle de paiement
        
        // Pour l'instant, nous retournons une simulation
        return response()->json([
            'payment_reference' => $paymentReference,
            'status' => 'succeeded', // ou 'pending', 'failed', etc.
            'paid_at' => now()->toDateTimeString(),
            'amount' => 0, // Montant réel à récupérer de la passerelle
            'currency' => 'EUR'
        ]);
    }
}
