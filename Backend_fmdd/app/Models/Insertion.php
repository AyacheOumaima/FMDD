<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insertion extends Model
{
    use HasFactory;
      protected $fillable = [
        'poste',
        'entreprise',
        'ville',
        'date_début',
        'type_contrat',
        'image',
        'description',
    ];
}
