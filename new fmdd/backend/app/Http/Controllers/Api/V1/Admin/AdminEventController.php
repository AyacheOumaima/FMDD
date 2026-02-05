<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\EventRegistrationApproved;
use App\Mail\EventRegistrationRejected;
use App\Mail\PaymentLinkSent;

class AdminEventController extends Controller
{
    /**
     * Affiche les inscriptions en attente de validation
     *
     * @param int|null $eventId
     * @return \Illuminate\Http\JsonResponse
     */
    public function pendingRegistrations($eventId = null)
    {
        $query = EventRegistration::with(['event', 'user'])
            ->where('statut', 'en attente');

        if ($eventId) {
            $query->where('event_id', $eventId);
        }

        $registrations = $query->get();

        return response()->json($registrations);
    }

    /**
     * Met à jour le statut d'une inscription
     *
     * @param Request $request
     * @param int $registrationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateRegistrationStatus(Request $request, $registrationId)
    {
        $request->validate([
            'statut' => 'required|in:accepté,refusé',
            'send_email' => 'sometimes|boolean'
        ]);

        $registration = EventRegistration::with('event')->findOrFail($registrationId);
        $status = $request->input('statut');
        $sendEmail = $request->input('send_email', true);

        $registration->statut = $status;
        
        // Si l'événement est payant et que l'inscription est acceptée
        if ($status === 'accepté' && $registration->event->type_evenement === 'payant') {
            $registration->statut_paiement = 'en attente';
            // Générer et envoyer le lien de paiement
            $paymentLink = $this->generatePaymentLink($registration);
            
            if ($sendEmail) {
                Mail::to($registration->email)->send(new PaymentLinkSent($registration, $paymentLink));
            }
        }

        $registration->save();

        // Mettre à jour le compteur d'inscrits si nécessaire
        if ($status === 'accepté') {
            $registration->event->increment('nombre_inscrits');
        }

        // Envoyer un email de notification
        if ($sendEmail) {
            $email = $status === 'accepté' 
                ? new EventRegistrationApproved($registration)
                : new EventRegistrationRejected($registration);
            
            Mail::to($registration->email)->send($email);
        }

        return response()->json([
            'message' => 'Statut mis à jour avec succès',
            'registration' => $registration
        ]);
    }

    /**
     * Génère un lien de paiement pour une inscription
     * 
     * @param EventRegistration $registration
     * @return string
     */
    private function generatePaymentLink(EventRegistration $registration)
    {
        // TODO: Implémenter la génération d'un lien de paiement sécurisé
        // Par exemple, avec Stripe ou un autre processeur de paiement
        return url("/payments/initiate/{$registration->id}");
    }
}
