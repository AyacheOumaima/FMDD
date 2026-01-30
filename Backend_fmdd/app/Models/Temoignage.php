<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temoignage extends Model
{
    use HasFactory;

    protected $table = 'temoignages';

   
    protected $fillable = [
        'nom',
        'poste',
        'message',
        'photo',
        'rating',
        'is_visible',
        'statut',       
        'is_a_la_une'   
    ];
}
