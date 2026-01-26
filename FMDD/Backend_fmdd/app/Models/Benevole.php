<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Benevole extends Model
{
    protected $table = 'benevoles';
    public $timestamps = true;
    protected $fillable = [
        'user_id',
        'demande_id',
        'date_approbation',
        'statut',
        'commentaire',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function demande()
    {
        return $this->belongsTo(DemandeBenevolat::class, 'demande_id');
    }
}
