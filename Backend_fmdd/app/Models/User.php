<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'phone',
        'role',
        'avatar',
        'bio',
        'first_name',
        'last_name',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Constantes pour les rôles
    const ROLE_USER = 'user';
    const ROLE_ADMIN = 'admin';
    const ROLE_SUPER_ADMIN = 'super_admin';
    const ROLE_FORMATEUR = 'formateur';
    const ROLE_ADHERENT = 'adherent';

    // Liste des rôles disponibles
    public static function availableRoles(): array
    {
        return [
            self::ROLE_USER,
            self::ROLE_ADMIN,
            self::ROLE_SUPER_ADMIN,
            self::ROLE_FORMATEUR,
            self::ROLE_ADHERENT,
        ];
    }

    // Vérifie si l'utilisateur a un rôle spécifique
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    // Vérifie si l'utilisateur a l'un des rôles donnés
    public function hasAnyRole(array $roles): bool
    {
        return in_array($this->role, $roles);
    }

    // Vérifie si l'utilisateur est un admin ou super admin
    public function isAdmin(): bool
    {
        return $this->hasAnyRole([self::ROLE_ADMIN, self::ROLE_SUPER_ADMIN]);
    }

    // Vérifie si l'utilisateur est un super admin
    public function isSuperAdmin(): bool
    {
        return $this->hasRole(self::ROLE_SUPER_ADMIN);
    }

    // Vérifie si l'utilisateur est un formateur
    public function isFormateur(): bool
    {
        return $this->hasRole(self::ROLE_FORMATEUR);
    }

    // Vérifie si l'utilisateur est un adhérent
    public function isAdherent(): bool
    {
        return $this->hasRole(self::ROLE_ADHERENT);
    }

    // Vérifie si l'utilisateur est un adhérent avec cotisation payée
    public function isAdherentActif(): bool
    {
        return $this->isAdherent() && $this->adherent && $this->adherent->estActif();
    }

    /**
     * Get the adherent associated with the user.
     */
    public function adherent(): HasOne
    {
        return $this->hasOne(Adherent::class);
    }

    /**
     * Get the admin associated with the user.
     */
    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    /**
     * Get the formateur associated with the user.
     */
    public function formateur()
    {
        return $this->hasOne(Formateur::class);
    }

    /**
     * Get the learner associated with the user.
     */
    public function learner()
    {
        return $this->hasOne(Learner::class);
    }

    /**
     * Get the instructor associated with the user.
     */
    public function instructor()
    {
        return $this->hasOne(Instructor::class);
    }

    /**
     * Get the user settings associated with the user.
     */
    public function settings()
    {
        return $this->hasOne(UserSettings::class);
    }

    /**
     * Get the courses that the user teaches.
     */
    public function coursesTeaching()
    {
        return $this->hasMany(Course::class, 'instructor_id');
    }

    /**
     * Get the feedback provided by the user.
     */
    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }

    /**
     * Get the contact messages sent by the user.
     */
    public function contactMessages()
    {
        return $this->hasMany(ContactUs::class);
    }

    /**
     * Get the testimonials provided by the user.
     */
    public function testimonials()
    {
        return $this->hasMany(FormulaireTemoignage::class);
    }

    /**
     * Get the availabilities of the user.
     */
    public function availabilities()
    {
        return $this->hasMany(Availability::class, 'instructor_id');
    }

    /**
     * Get the sessions associated with the user.
     */
    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    /**
     * Get the payments made by the user.
     */
    public function payments()
    {
        return $this->hasMany(Paiement::class);
    }
}
