<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactUs extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'contact_us';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'nom_complet',
        'email',
        'objet',
        'message',
        'statut',
        'date_lecture'
    ];

    protected $casts = [
        'date_lecture' => 'datetime'
    ];

    /**
     * Get the user that owns the contact message.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
