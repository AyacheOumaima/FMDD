<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Adherent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'statut_cotisation',
        'date_debut_adhesion',
        'date_fin_adhesion',
        'notes'
    ];

    protected $casts = [
        'date_debut_adhesion' => 'date',
        'date_fin_adhesion' => 'date',
    ];

    const STATUT_PAYEE = 'payée';
    const STATUT_EN_ATTENTE = 'en attente';
    const STATUT_EXPIREE = 'expirée';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function estActif(): bool
    {
        return $this->statut_cotisation === self::STATUT_PAYEE;
    }
}
