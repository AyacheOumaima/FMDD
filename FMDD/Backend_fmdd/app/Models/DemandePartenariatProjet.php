<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemandePartenariatProjet extends Model
{
    protected $table = 'demandes_partenariat_projet';
    protected $fillable = [
        'organisation',
        'contact_nom',
        'email',
        'telephone',
        'projet_id',
        'type_partenariat_souhaite',
        'engagement_propose',
        'retour_demande',
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
