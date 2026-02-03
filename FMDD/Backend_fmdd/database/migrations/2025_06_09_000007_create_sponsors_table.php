<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSponsorsTable extends Migration
{
    public function up(): void
    {
        Schema::create('sponsors', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom');
            $table->string('logo')->nullable();
            $table->string('site_web')->nullable();
            $table->string('secteur', 100)->nullable();
            $table->text('description')->nullable();
            $table->string('contact_nom', 100)->nullable();
            $table->string('contact_email', 100)->nullable();
            $table->date('date_debut_collaboration')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('sponsors');
    }
}
