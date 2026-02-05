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
        Schema::create('histoire', function (Blueprint $table) {
            $table->id();
            $table->string('titre', 200);
            $table->text('description');
            $table->date('date_evenement');
            $table->string('image')->nullable();
            $table->integer('ordre_affichage')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histoire');
    }
}; 