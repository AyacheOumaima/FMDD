<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipe_fmdd', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('poste', 150);
            $table->text('bio')->nullable();
            $table->string('photo')->nullable();
            $table->string('email')->nullable();
            $table->string('telephone', 20)->nullable();
            $table->json('reseaux_sociaux')->nullable();
            $table->integer('ordre_affichage')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipe_fmdd');
    }
};
