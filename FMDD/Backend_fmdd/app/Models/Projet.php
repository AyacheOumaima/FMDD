<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $table = 'projets';
    protected $fillable = [
        'titre_projet',
        'description_projet',
        'theme',
        'date_projet',
        'statut_projet',
        'image',
        'description_detaillee',
        'organisateur',
        'localisation',
        'duree',
        'image_partenaire',
        'objectif_projet',
        'grande_description',
    ];
   
   
    // Relations à ajouter plus tard (partenaires, sponsors, bénévoles)
    public function demandesBenevolat()
    {
        return $this->hasMany(DemandeBenevolat::class, 'projet_id');
    }
    public function benevoles()
    {
        return $this->hasManyThrough(Benevole::class, DemandeBenevolat::class, 'projet_id', 'demande_id');
    }
}
