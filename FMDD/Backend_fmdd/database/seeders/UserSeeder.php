<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Création d'un super admin
        if (!User::where('username', 'superadmin')->exists()) {
            User::create([
                'username' => 'superadmin',
                'email' => 'superadmin@example.com',
                'password' => Hash::make('password123'),
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'role' => User::ROLE_SUPER_ADMIN,
                'phone' => '0600000010',
            ]);
        }

        // Création d'un admin
        if (!User::where('username', 'admin1')->exists()) {
            User::create([
                'username' => 'admin1',
                'email' => 'admin1@example.com',
                'password' => Hash::make('password123'),
                'first_name' => 'Admin',
                'last_name' => 'User',
                'role' => User::ROLE_ADMIN,
                'phone' => '0600000011',
            ]);
        }

        // Création d'un formateur
        if (!User::where('username', 'formateur1')->exists()) {
            User::create([
                'username' => 'formateur1',
                'email' => 'formateur1@example.com',
                'password' => Hash::make('password123'),
                'first_name' => 'John',
                'last_name' => 'Formateur',
                'role' => User::ROLE_FORMATEUR,
                'phone' => '0600000012',
            ]);
        }

        // Création d'un adhérent
        if (!User::where('username', 'adherent1')->exists()) {
            User::create([
                'username' => 'adherent1',
                'email' => 'adherent1@example.com',
                'password' => Hash::make('password123'),
                'first_name' => 'Marie',
                'last_name' => 'Adhérent',
                'role' => User::ROLE_ADHERENT,
                'phone' => '0600000013',
            ]);
        }

        // Création d'un utilisateur standard
        if (!User::where('username', 'user1')->exists()) {
            User::create([
                'username' => 'user1',
                'email' => 'user1@example.com',
                'password' => Hash::make('password123'),
                'first_name' => 'Regular',
                'last_name' => 'User',
                'role' => User::ROLE_USER,
                'phone' => '0600000014',
            ]);
        }

        // Création d'utilisateurs aléatoires avec différents rôles
        User::factory(3)->create(); // Users standards
        User::factory(2)->admin()->create(); // Admins
        User::factory(2)->formateur()->create(); // Formateurs
        User::factory(3)->adherent()->create(); // Adhérents
    }
}