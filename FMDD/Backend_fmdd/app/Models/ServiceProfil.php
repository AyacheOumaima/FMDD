<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceProfil extends Model
{
    use HasFactory;

    protected $table = 'services_profils';
    
    protected $fillable = [
        'profil',
        'services_offerts',
        'modalites_acces',
        'ordre_affichage',
        'actif'
    ];

    protected $casts = [
        'services_offerts' => 'array',
        'actif' => 'boolean'
    ];

    /**
     * Récupérer les services offerts sous forme de tableau
     */
    public function getServicesOffertsAttribute($value)
    {
        if (is_string($value)) {
            return json_decode($value, true);
        }
        return $value;
    }

    /**
     * Définir les services offerts
     */
    public function setServicesOffertsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['services_offerts'] = json_encode($value);
        } else {
            $this->attributes['services_offerts'] = $value;
        }
    }
}
