<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temoignage extends Model
{
    use HasFactory;

    // Table مرتبط بهاد الـ Model
    protected $table = 'temoignages';

    // الحقول اللي يمكن نعمرها (mass assignable)
    protected $fillable = [
        'nom',
        'poste',
        'message',
        'photo',
        'rating',
        'is_visible',
        'statut',        // enum: en_attente, accepte, refuse
        'is_a_la_une'    // boolean
    ];
}
