<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemandeSponsoringProjet extends Model
{
    protected $table = 'demandes_sponsoring_projet';
    protected $fillable = [
        'organisation',
        'contact_nom',
        'email',
        'telephone',
        'projet_id',
        'type_sponsoring_souhaite',
        'montant_propose',
        'contreparties_demandees',
        'date_demande',
        'statut',
        'commentaire',
        'date_approbation',
    ];
    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }
}
