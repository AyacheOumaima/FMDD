<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gallery extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'titre',
        'slug',
        'description',
        'image',
        'categories',
        'type',
        'url_video',
        'thumbnail',
        'actif',
        'ordre'
    ];

    protected $casts = [
        'categories' => 'array',
        'actif' => 'boolean',
        'ordre' => 'integer'
    ];

    // Scope pour les éléments actifs
    public function scopeActif($query)
    {
        return $query->where('actif', true);
    }

    // Scope pour trier par ordre
    public function scopeOrdered($query)
    {
        return $query->orderBy('ordre', 'asc');
    }

    // Scope pour filtrer par type
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Scope pour filtrer par catégorie
    public function scopeInCategory($query, $category)
    {
        return $query->where('categories', 'like', '%' . $category . '%');
    }
} 