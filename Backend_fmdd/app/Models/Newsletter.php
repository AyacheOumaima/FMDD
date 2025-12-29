<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newsletter extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'subscription_date',
        'desabonement_date',
        'statut'
    ];

    protected $casts = [
        'subscription_date' => 'datetime',
        'desabonement_date' => 'datetime'
    ];
} 