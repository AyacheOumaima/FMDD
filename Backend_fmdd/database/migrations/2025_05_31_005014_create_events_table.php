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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('titre', 255);
            $table->text('description');
            $table->boolean('is_a_venir')->default(false);
            $table->date("date_limite_d'inscription");
            $table->time("heure_limite_d'inscription");
            $table->date('date');
            $table->time('heure');
            $table->unsignedInteger('nombre_inscrits')->default(0);
            $table->integer('limite_de_places')->default(0);
            $table->string('ville', 100);
            $table->string('image', 255)->nullable();
            $table->decimal('prix', 10, 2)->nullable(); // Null = gratuit
            $table->string('categorie', 100)->nullable();
            $table->text('description_detaillee')->nullable();
            $table->enum('type_evenement', ['gratuit', 'payant'])->default('gratuit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
