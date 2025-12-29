<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\InfoContact;

class InfoContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InfoContact::create([
            'adresse_fmdd' => '123 Rue de la République, Dakar, Sénégal',
            'telephone_fmdd' => '+221 77 123 45 67',
            'email_fmdd' => 'contact@fmdd.org',
            'horaire_fmdd' => 'Lundi - Vendredi: 9h00 - 17h00',
            'localisation_fmdd' => 'https://maps.google.com/?q=123+Rue+de+la+République+Dakar+Sénégal',
            'url_whatsapp' => 'https://wa.me/221771234567'
        ]);
    }
}
