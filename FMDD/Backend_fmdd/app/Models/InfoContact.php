<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoContact extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'info_contact';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'adresse_fmdd',
        'telephone_fmdd',
        'email_fmdd',
        'horaire_fmdd',
        'localisation_fmdd',
        'url_whatsapp'
    ];
}
