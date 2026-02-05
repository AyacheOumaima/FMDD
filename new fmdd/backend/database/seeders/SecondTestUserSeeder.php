<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SecondTestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'test@fmdd.ma'],
            [
                'username' => 'TestAccount',
                'first_name' => 'Demo',
                'last_name' => 'Account',
                'password' => Hash::make('test1234'),
                'role' => User::ROLE_USER,
                'email_verified_at' => now(),
            ]
        );
    }
}
