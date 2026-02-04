<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'user_id',
        'full_name',
        'email',
        'phone',
        'is_adherent',
        'statut',
        'statut_paiement'
    ];

    protected $casts = [
        'is_adherent' => 'boolean',
    ];

    // Constantes pour les statuts
    const STATUS_ACCEPTED = 'accepte';
    const STATUS_WAITING = 'en_attente';
    const STATUS_REJECTED = 'refuse';

    // Constantes pour les statuts de paiement
    const PAYMENT_VALIDATED = 'valide';
    const PAYMENT_WAITING = 'en_attente';
    const PAYMENT_REQUIRED = 'non_paye';

    /**
     * Crée une nouvelle inscription à partir d'un user et d'un event
     */
    public static function createFromUserAndEvent(User $user, Event $event): self
    {
        $registration = new self();
        $registration->event_id = $event->id;
        $registration->user_id = $user->id;
        $registration->full_name = $user->first_name . ' ' . $user->last_name;
        $registration->email = $user->email;
        $registration->phone = $user->phone;
        $registration->is_adherent = $user->isAdherentActif();

        // Définir le statut initial
        if ($user->isAdherentActif()) {
            $registration->statut = self::STATUS_ACCEPTED;
            $registration->statut_paiement = $event->type_evenement === 'gratuit' ? 
                self::PAYMENT_VALIDATED : self::PAYMENT_REQUIRED;
        } else {
            $registration->statut = self::STATUS_WAITING;
            $registration->statut_paiement = self::PAYMENT_WAITING;
        }

        return $registration;
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isAccepted(): bool
    {
        return $this->statut === self::STATUS_ACCEPTED;
    }

    public function isWaiting(): bool
    {
        return $this->statut === self::STATUS_WAITING;
    }

    public function requiresPayment(): bool
    {
        return $this->statut === self::STATUS_ACCEPTED && 
               $this->statut_paiement === self::PAYMENT_REQUIRED;
    }
}