<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandesBenevolatTable extends Migration
{
    public function up(): void
    {
        Schema::create('demandes_benevolat', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('projet_id');
            $table->text('competences')->nullable();
            $table->text('disponibilite')->nullable();
            $table->text('motivation')->nullable();
            $table->date('date_demande')->nullable();
            $table->enum('statut', ['En attente', 'Approuvée', 'Rejetée'])->default('En attente');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('projet_id')->references('id')->on('projets')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demandes_benevolat');
    }
}
