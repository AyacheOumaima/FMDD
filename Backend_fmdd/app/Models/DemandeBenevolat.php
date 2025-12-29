<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemandeBenevolat extends Model
{
    protected $table = 'demandes_benevolat';
    protected $fillable = [
        'user_id',
        'projet_id',
        'competences',
        'disponibilite',
        'motivation',
        'date_demande',
        'statut',
    ];

    public function benevoles()
    {
        return $this->hasMany(Benevole::class, 'demande_id');
    }
}
