<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Intervenant extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'intervenants';
    
    protected $fillable = [
        'evenement_id',
        'nom',
        'prenom',
        'fonction',
        'email',
        'telephone',
        'biographie',
        'photo'
    ];

    // Assurez-vous que ces champs ne sont pas cachés
    protected $hidden = [
        'deleted_at'
    ];

    /**
     * Relation avec l'événement
     */
    public function event()
    {
        return $this->belongsTo(Event::class, 'evenement_id');
    }
    
    /**
     * Accesseur pour obtenir le nom complet
     */
    public function getNomCompletAttribute()
    {
        return $this->prenom . ' ' . $this->nom;
    }
}



