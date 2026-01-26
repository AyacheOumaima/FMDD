<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'blog';

    protected $fillable = [
        'user_id',
        'auteur',
        'titre',
        'slug',
        'contenu',
        'image_principale',
        'resume',
        'tags',
        'meta_data',
        'statut',
        'date_publication',
        'temps_lecture',
        'vues',
        'actif'
    ];

    protected $casts = [
        'tags' => 'array',
        'meta_data' => 'array',
        'date_publication' => 'datetime',
        'actif' => 'boolean'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blog) {
            if (empty($blog->slug)) {
                $blog->slug = Str::slug($blog->titre);
            }
            if (empty($blog->temps_lecture)) {
                // Calcul approximatif du temps de lecture (1 mot = 0.2 seconde)
                $blog->temps_lecture = ceil(str_word_count(strip_tags($blog->contenu)) * 0.2 / 60);
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopePublie($query)
    {
        return $query->where('statut', 'publie')
            ->where('actif', true)
            ->where('date_publication', '<=', now());
    }

    public function scopePopulaire($query)
    {
        return $query->orderBy('vues', 'desc');
    }

    public function incrementVues()
    {
        $this->increment('vues');
    }
}