<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('info_contact', function (Blueprint $table) {
            $table->id();
            $table->string('adresse_fmdd');
            $table->string('telephone_fmdd');
            $table->string('email_fmdd');
            $table->string('horaire_fmdd');
            $table->string('localisation_fmdd');
            $table->string('url_whatsapp')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('info_contact');
    }
}; 