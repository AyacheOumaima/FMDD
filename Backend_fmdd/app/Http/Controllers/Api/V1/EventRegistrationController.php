<?php


namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreEventRegistrationRequest;
use Illuminate\Support\Facades\DB;

class EventRegistrationController extends Controller
{
    public function register(StoreEventRegistrationRequest $request, $eventId)
    {
        $event = Event::findOrFail($eventId);
        $user = Auth::user();

        // Vérifier l'inscription existante et son statut
        $existingRegistration = $event->getUserRegistration($user);
        if ($existingRegistration) {
            if ($existingRegistration->statut === 'refuse') {
                return response()->json([
                    'message' => 'Votre précédente inscription a été refusée',
                    'registration' => $existingRegistration,
                    'status' => 'REFUSED'
                ], 400);
            }
            
            if ($existingRegistration->statut === 'en_attente') {
                return response()->json([
                    'message' => 'Votre inscription est en cours de validation',
                    'registration' => $existingRegistration,
                    'status' => 'PENDING'
                ], 400);
            }
            
            if ($existingRegistration->statut === 'accepte') {
                return response()->json([
                    'message' => 'Vous êtes déjà inscrit à cet événement',
                    'registration' => $existingRegistration,
                    'status' => 'ACCEPTED'
                ], 400);
            }
        }

        // Vérifier si l'inscription est ouverte
        if (!$event->isRegistrationOpen()) {
            return response()->json([
                'message' => 'Les inscriptions sont fermées pour cet événement',
                'status' => 'CLOSED'
            ], 400);
        }

        // Vérifier les places disponibles
        if (!$event->hasAvailableSpots()) {
            return response()->json([
                'message' => 'Désolé, l\'événement est complet',
                'status' => 'FULL'
            ], 400);
        }

        DB::beginTransaction();
        try {
            // Déterminer le statut initial selon le type d'utilisateur et d'événement
            $initialStatus = $this->determineInitialStatus($user, $event);
            
            // Créer l'inscription
            $registration = new EventRegistration();
            $registration->event_id = $event->id;
            $registration->user_id = $user->id;
            $registration->full_name = $user->first_name . ' ' . $user->last_name;
            $registration->email = $user->email;
            $registration->phone = $user->phone;
            $registration->is_adherent = $user->isAdherent();
            $registration->statut = $initialStatus['status'];
            $registration->statut_paiement = $initialStatus['payment_status'];
            $registration->save();

            // Mettre à jour le compteur uniquement si accepté directement
            if ($registration->statut === 'accepte' && 
            ($event->type_evenement === 'gratuit' || $registration->statut_paiement === 'valide')) {
            $event->increment('nombre_inscrits');
        }


            DB::commit();

            // Préparer la réponse
            $response = [
                'message' => 'Inscription enregistrée avec succès',
                'registration' => $registration,
                'status_message' => $this->getStatusMessage($registration),
                'action_required' => $this->getRequiredAction($registration, $event)
            ];

            // Ajouter les informations de paiement si nécessaire
            if ($registration->statut === 'accepte' && $event->type_evenement === 'payant') {
                $response['payment_info'] = [
                    'amount' => $event->prix,
                    'formatted_price' => $event->formatted_price
                ];
            }

            return response()->json($response, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'inscription',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function determineInitialStatus($user, $event): array
    {
        // Adhérent actif
        if ($user->isAdherentActif()) {
            return [
                'status' => 'accepte',
                'payment_status' => $event->type_evenement === 'gratuit' ? 'valide' : 'non_paye'
            ];
        }

        // User simple ou adhérent non actif
        return [
            'status' => 'en_attente',
            'payment_status' => 'en_attente'
        ];
    }

    public function myRegistrations()
    {
        $user = Auth::user();
        $registrations = EventRegistration::with(['event' => function($query) {
                $query->select('id', 'titre', 'date', 'heure', 'type_evenement', 'prix');
            }])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($registration) {
                return [
                    'id' => $registration->id,
                    'event' => $registration->event,
                    'statut' => $registration->statut,
                    'statut_paiement' => $registration->statut_paiement,
                    'date_inscription' => $registration->created_at->format('Y-m-d H:i:s'),
                    'message_statut' => $this->getStatusMessage($registration),
                    'action_required' => $this->getRequiredAction($registration, $registration->event),
                    'can_pay' => $this->canInitiatePayment($registration)
                ];
            });

        return response()->json([
            'registrations' => $registrations,
            'count' => $registrations->count()
        ]);
    }

    private function getRequiredAction(EventRegistration $registration, Event $event): ?string
    {
        if ($registration->statut === 'accepte' && 
            $event->type_evenement === 'payant' && 
            $registration->statut_paiement === 'non_paye') {
            return 'PAYMENT_REQUIRED';
        }
        
        if ($registration->statut === 'en_attente') {
            return 'WAITING_ADMIN_VALIDATION';
        }

        if ($registration->statut === 'refuse') {
            return 'REGISTRATION_REFUSED';
        }

        return null;
    }

    private function getStatusMessage(EventRegistration $registration): string
    {
        switch ($registration->statut) {
            case 'accepte':
                if ($registration->statut_paiement === 'non_paye') {
                    return 'Inscription acceptée. Paiement requis.';
                }
                if ($registration->statut_paiement === 'valide') {
                    return 'Inscription confirmée.';
                }
                return 'Inscription acceptée.';
                
            case 'en_attente':
                return 'En attente de validation par l\'administrateur.';
                
            case 'refuse':
                return 'Inscription refusée.';
                
            default:
                return 'Statut inconnu.';
        }
    }

    private function canInitiatePayment(EventRegistration $registration): bool
    {
        return $registration->statut === 'accepte' && 
               $registration->statut_paiement === 'non_paye' && 
               $registration->event->type_evenement === 'payant';
    }
}