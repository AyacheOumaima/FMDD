<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'events';

    protected $fillable = [
        'titre',
        'description',
        'is_a_venir',
        'date_limite_d_inscription',
        'heure_limite_d_inscription',
        'date',
        'heure',
        'nombre_inscrits',
        'limite_de_places',
        'ville',
        'image',
        'prix',
        'categorie',
        'description_detaillee',
        'type_evenement'
    ];

    protected $with = ['intervenants'];

    protected $appends = ['is_registration_open', 'has_available_spots'];

    protected $casts = [
        'is_a_venir' => 'boolean',
        'date' => 'date',
        'date_limite_d_inscription' => 'date',
        'prix' => 'decimal:2'
    ];

    public function intervenants()
    {
        return $this->hasMany(Intervenant::class, 'evenement_id');
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function acceptedRegistrations()
    {
        return $this->registrations()->where('statut', 'accepte');
    }

    public function pendingRegistrations()
    {
        return $this->registrations()->where('statut', 'en_attente');
    }

    public function isRegistrationOpen(): bool
    {
        if (!$this->date_limite_d_inscription) {
            return true;
        }

        $limitDate = $this->date_limite_d_inscription;
        if ($this->heure_limite_d_inscription) {
            $limitDate .= ' ' . $this->heure_limite_d_inscription;
        }

        return now() <= $limitDate;
    }

    public function hasAvailableSpots(): bool
    {
        if ($this->limite_de_places <= 0) {
            return true;
        }

        return $this->nombre_inscrits < $this->limite_de_places;
    }

    public function isUserRegistered(User $user): bool
    {
        return $this->registrations()
            ->where('user_id', $user->id)
            ->exists();
    }

    public function getUserRegistration(User $user): ?EventRegistration
    {
        return $this->registrations()
            ->where('user_id', $user->id)
            ->first();
    }

    public function incrementRegistrations(): void
    {
        $this->increment('nombre_inscrits');
    }

    public function decrementRegistrations(): void
    {
        if ($this->nombre_inscrits > 0) {
            $this->decrement('nombre_inscrits');
        }
    }

    public function updateRegistrationsCount(): void
    {
        $this->nombre_inscrits = $this->acceptedRegistrations()->count();
        $this->save();
    }

    public function getIsRegistrationOpenAttribute(): bool
    {
        return $this->isRegistrationOpen();
    }

    public function getHasAvailableSpotsAttribute(): bool
    {
        return $this->hasAvailableSpots();
    }

    public function getTotalRegistrationsAttribute(): int
    {
        return $this->registrations()->count();
    }

    public function getPendingRegistrationsCountAttribute(): int
    {
        return $this->pendingRegistrations()->count();
    }

    public function getAcceptedRegistrationsCountAttribute(): int
    {
        return $this->acceptedRegistrations()->count();
    }

    public function getFormattedPriceAttribute(): string
    {
        return $this->prix > 0 ? number_format($this->prix, 2) . ' MAD' : 'Gratuit';
    }

    public function getIsPayantAttribute(): bool
    {
        return $this->type_evenement === 'payant' && $this->prix > 0;
    }
}