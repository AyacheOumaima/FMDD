<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'user@fmdd.ma'],
            [
                'username' => 'RegularUser',
                'first_name' => 'Test',
                'last_name' => 'User',
                'password' => Hash::make('user123'),
                'role' => User::ROLE_USER,
                'email_verified_at' => now(),
            ]
        );
    }
}
